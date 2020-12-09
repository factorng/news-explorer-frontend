import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ savedArticles }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [keyWords, setKeyWords] = React.useState([]);

  React.useEffect(() => {
    const keyWords = savedArticles
      .map((elem) => elem.keyword)
      .reduce((sum, el) => {
        sum[el] = (sum[el] || 0) + 1;
        return sum;
      }, {});
    setKeyWords(keyWords);
  }, [savedArticles]);

  function getEnding(keyWordsCount) {
    let ending = "-и другим";

    if (
      keyWordsCount.toString().endsWith("1") &&
      !keyWordsCount.toString().endsWith("11")
    ) {
      ending = "-му другому";
    } else if (
      keyWordsCount.toString().endsWith("2") &&
      !keyWordsCount.toString().endsWith("12")
    ) {
      ending = "-м другим";
    } else if (
      keyWordsCount.toString().endsWith("3") &&
      !keyWordsCount.toString().endsWith("13")
    ) {
      ending = "-м другим";
    } else if (
      keyWordsCount.toString().endsWith("4") &&
      !keyWordsCount.toString().endsWith("14")
    ) {
      ending = "-м другим";
    }
    return ending;
  }

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__wrapper">
        <h3 className="saved-news-header__header">Сохранённые статьи</h3>
        <h1 className="saved-news-header__articles-count">
          {currentUser.name}, у вас &nbsp;
          {savedArticles.length} сохраненных статей
        </h1>
        <p className="saved-news-header__keywords">
          По ключевым словам:&nbsp;
          {Object.keys(keyWords).length <= 3 ? (
            <>
              <span className="saved-news-header__keywords-black">
                {Object.keys(keyWords).map((key) => key + " ")}
              </span>
            </>
          ) : (
            <>
              <span className="saved-news-header__keywords-black">
                {Object.keys(keyWords)
                  .slice(0, 3)
                  .map((key) => key + " ")}
              </span>
              &nbsp;и&nbsp;
              <span className="saved-news-header__keywords-black">
                {Object.keys(keyWords).length - 3}
                {getEnding(Object.keys(keyWords).length - 3)}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
