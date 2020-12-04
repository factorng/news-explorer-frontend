import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import { useLocation } from "react-router-dom";
import { ARTICLES_TO_SHOW } from "../../utils/constants"; 

function NewsCardList({ articles, handleButton, savedArticles, searchQuery }) {
  const [news, setNews] = useState([]);
  const [isAddMoreButtonDisabled, setIsAddMoreButtonDisabled] = useState(false);
  const { pathname } = useLocation();

  function addNews() {
    setNews(articles.slice(0, news.length + ARTICLES_TO_SHOW));
    if (news.length >= articles.length - ARTICLES_TO_SHOW) {
      setIsAddMoreButtonDisabled(true);
    }
  }

  useEffect(() => {
    setNews(articles.slice(0, ARTICLES_TO_SHOW));
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
        {articles.length > ARTICLES_TO_SHOW ? (
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
