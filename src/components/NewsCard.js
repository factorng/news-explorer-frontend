import React from "react";
import { useLocation } from "react-router-dom";
import "./NewsCard.css";

function NewsCard({keyword, image, date, header, text, source}) {
  const { pathname } = useLocation();
  const buttonClassName = `${
    pathname === "/saved-news"
      ? "news-card__button-delete"
      : "news-card__button-bookmark"
  }`;
  const keywordClassName = `${
    pathname === "/saved-news"
      ? "news-card__keyword news-card__keyword_active"
      : "news-card__keyword"
  }`;

  return (
    <div className="news-card">
      <p className={keywordClassName}>{keyword}</p>
      <button className={buttonClassName}></button>
      <img className="news-card__image" src={image}></img>
      <div className="news-card__info">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__header">
            {header}
        </h3>
        <p className="news-card__text">
          {text}
        </p>
        <p className="news-card__source">{source}</p>
      </div>
    </div>
  );
}

export default NewsCard;
