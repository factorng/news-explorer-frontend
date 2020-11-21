import React, { useCallback, useEffect, useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <main className="search">
        <section className="search__info">
            <h2 className="search__title">Что творится в мире?</h2>
            <p className="search__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        </section>
        <form className="search__form">
            <input type="text" className="search__input"></input>
            <button className="search__button">Искать</button>
        </form>
    </main>
  );
}

export default SearchForm;