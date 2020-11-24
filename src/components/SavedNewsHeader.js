import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__wrapper">
        <h3 className="saved-news-header__header">Сохранённые статьи</h3>
        <h1 className="saved-news-header__articles-count">Грета, у вас 5 сохраненных статей</h1>
        <p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keywords-black">Природа, Тайга</span> и <span className="saved-news-header__keywords-black">2-м другим</span> </p>
      </div>
    </section>
  )
}

export default SavedNewsHeader;