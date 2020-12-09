import React from "react";
import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard';
import "../NewsCard/NewsCard.css";

function SavedNews({ article, handleButton, savedArticles }) {
  const savedNewsContainer = `${
    savedArticles.length > 0 ? "saved-news__container" : ""
  }`;

  return (
    <section className="saved-news">
      <div className={savedNewsContainer}>
        <div className="news-card-list">
          {savedArticles.map((article, key) => {
            return (
              <NewsCard
                article={article}
                key={key}
                keyword = {article.keyword}
                handleButton={handleButton}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
