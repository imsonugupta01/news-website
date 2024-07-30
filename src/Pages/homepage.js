import React, { useEffect, useState } from "react";
import './Homepage.css';

const TOP_US_NEWS_API = "https://api.worldnewsapi.com/top-news?source-country=us&date=2024-07-30&language=en&api-key=56a4e07ce36046ccbe195d0c5e73f104";

function Homepage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(TOP_US_NEWS_API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Adjusting the data extraction according to the new structure
                const newsArray = data.top_news.flatMap(newsCategory => newsCategory.news);
                setArticles(newsArray || []);
            } catch (error) {
                console.error('Error fetching data: ', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="homepage">
            <div id="header">
                <h1>Top 10 News in the US</h1>
            </div>

            <div className="articles">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        article.title !== "[Removed]" && (
                            <div key={article.id || index} className="article">
                                <img src={article.image} alt={article.title} className="article-image" />
                                <h2>{article.title}</h2>
                                <p>{article.summary || article.text}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                <p id="aa">{new Date(article.publish_date).toLocaleDateString()}</p>
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
