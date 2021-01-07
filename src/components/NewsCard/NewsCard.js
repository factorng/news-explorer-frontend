import React from "react";
import { useLocation } from "react-router-dom";
import "./NewsCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function NewsCard({ article, handleButton, savedArticles }) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const [bookmarkMarked, setBookmarkMarked] = React.useState(false);

  function dateFormat(publishedAt) {
    let date = new Date(publishedAt);
    const options = { month: "long", day: "numeric" };
    return `${date.toLocaleDateString("ru", options)}, ${date.getFullYear()}`;
  }

  

  React.useEffect(() => {
    if (currentUser.name && savedArticles) {
      setBookmarkMarked(
        savedArticles.find((i) => i.title === article.title) !== undefined
      );
    }
  }, [article.title, currentUser, savedArticles]);

  let buttonClassName = `${
    pathname === "/news-explorer-frontend/saved-news"
      ? "news-card__button-delete"
      : currentUser.name
      ? `${
          bookmarkMarked
            ? "news-card__button-bookmark_loggedIn news-card__button-bookmark_marked"
            : "news-card__button-bookmark_loggedIn"
        }`
      : "news-card__button-bookmark"
  }`;
  const keywordClassName = `${
    pathname === "/news-explorer-frontend/saved-news"
      ? "news-card__keyword news-card__keyword_active"
      : "news-card__keyword"
  }`;

  return (
    <div className="news-card">
      <p className={keywordClassName}>{article.keyword}</p>
      <button
        className={buttonClassName}
        onClick={() => {
          handleButton(article);
        }}
      ></button>

      <img
        className="news-card__image"
        src={article.urlToImage || article.image}
        alt={article.title}
      ></img>
      <div className="news-card__info">
        <p className="news-card__date">
          {dateFormat(article.publishedAt || article.date)}
        </p>
        <h3 className="news-card__header">{article.title}</h3>
        <p className="news-card__text">{article.description || article.text}</p>
        <p className="news-card__source">
          {article.source.name || article.source}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
