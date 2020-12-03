import React, { useCallback, useEffect, useState } from 'react';
import './SearchForm.css';

function SearchForm({handleQuery, searchQuery}) {
  const [query, setQuery] = React.useState('');
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    handleQuery(query);
  }
  
  
  return (
    <main className="search">
        <section className="search__info">
            <h2 className="search__title">Что творится в мире?</h2>
            <p className="search__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        </section>
        <form className="search__form" onSubmit={handleSubmit}>
            <input type="text" className="search__input" required
             onChange={(e) => setQuery(e.target.value)} value={query || ''}/>
            <button className="search__button" type="submit">Искать</button>
        </form>
    </main>
  );
}

export default SearchForm;