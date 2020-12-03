import React, { useCallback, useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import "./NewsCardList.css";
import { useLocation } from "react-router-dom";

function NewsCardList({ articles, handleButton, savedArticles, searchQuery }) {
  const [news, setNews] = useState([]);
  const [isAddMoreButtonDisabled, setIsAddMoreButtonDisabled] = useState(false);
  const { pathname } = useLocation();

  function addNews() {
    setNews(articles.slice(0, news.length + 3));
    if (news.length >= articles.length - 3) {
      setIsAddMoreButtonDisabled(true);
    }
  }

  useEffect(() => {
    setNews(articles.slice(0, 3));
  }, [articles]);

  return (
    <>
      {searchQuery || localStorage.getItem("articles") ? 
      <section className="search-results">
        <h2 className="search-results__header">Результаты поиска</h2>
        {articles.length === 0 ? "Ничего не найдено." : ""}

        <div className="news-card-list">
          {news.map((news, key) => {
            let keyword =''
            if (pathname === "/saved-news") keyword = news.keyword;
            return (
              <NewsCard
                article={news}
                key={key}
                keyword={keyword}
                handleButton={handleButton}
                savedArticles={savedArticles}
              />
            );
          })}
        </div>
        {articles.length > 3 ? (
          <button
            className="search-results__show-more"
            onClick={addNews}
            disabled={isAddMoreButtonDisabled}
          >
            Показать ещё
          </button>
        ) : (
          ""
        )}
      </section>
      : ''
      }      
    </>
  );
}

export default NewsCardList;
