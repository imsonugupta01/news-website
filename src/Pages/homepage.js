import React, { useEffect, useState } from "react";
import './Homepage.css';

function Homepage() {
    const [d, setD] = useState("");
    const [val, setVal] = useState([]);
    
    const getCurrentFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        const formattedDate = getCurrentFormattedDate();
        setD(formattedDate);
    }, []);

    // https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY
    // https://newsapi.org/v2/top-headlines?country=india&apiKey=a1f132740bdf4850b41c09a6acc92434
    useEffect(() => {
        const fetchData = async () => {
            if (!d) return;

            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?q=Apple&from=${d}&sortBy=popularity&apiKey=a1f132740bdf4850b41c09a6acc92434`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setVal(data.articles || []);
            } catch (error) {
                console.error('Error fetching data: ', error.message);
            }
        };

        fetchData();
    }, [d]);

    
    return (
        <div className="homepage">
            <div id="header">
                <h1>Headlines</h1>
            </div>

            <div className="articles">
                {val.length > 0 ? (
                    val.map((article, index) => (
                        article.title !== "[Removed]" && (
                            <div key={index} className="article">
                                <img src={article.urlToImage} alt={article.title} className="article-image" />
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                <p id="aa">{new Date(article.publishedAt).toLocaleDateString()}</p>
                            </div>
                        )
                    ))
                ) : (
                    <div>No headlines available</div>
                )}
            </div>

           
        </div>
    );
}

export default Homepage;
