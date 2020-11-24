import React, { useCallback, useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import "./NewsCardList.css";
import ApiCards from "../ApiData/ApiCards";


function NewsCardList() {
  return (
    <section className="search-results">
      <h2 className="search-results__header">Результаты поиска</h2>
      <div className="news-card-list">
        {
          ApiCards.map((news, key) => (
            <NewsCard {...news} key={key}/>
          ))
        }
      </div>
      <button className="search-results__show-more">Показать ещё</button>
    </section>
  );
}

export default NewsCardList;
