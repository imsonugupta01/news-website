import React, { useEffect, useState } from "react";
import './Homepage.css';

// Generate the current date in YYYY-MM-DD format
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// API URL for India
const TOP_IN_NEWS_API = `https://api.worldnewsapi.com/top-news?source-country=in&date=${getCurrentDate()}&language=en&api-key=56a4e07ce36046ccbe195d0c5e73f104`;

function Homepage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(TOP_IN_NEWS_API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const newsArray = data.top_news.flatMap(newsCategory => newsCategory.news);
                setArticles(newsArray || []);
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="homepage">
            <div id="header">
                <h1>Top News in India</h1>
            </div>

            <div className="articles">
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        article.title !== "[Removed]" && (
                            <div key={article.id || index} className="article">
                                <img src={article.image} alt={article.title} className="article-image" />
                                <h2>{article.title}</h2>
                                <p>{truncateText(article.summary || article.text, 150)}</p>
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

// Truncate text to a specific length
const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};

export default Homepage;
