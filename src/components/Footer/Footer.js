import React, { useCallback, useEffect, useState } from "react";
import { NavLink  } from "react-router-dom";
import "./Footer.css";
import gitIcon from "../../images/git.png";
import facebookIcon from "../../images/facebook.png";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <footer className="footer">
      <section className="footer__copyright">
      © 2020 Supersite, Powered by News API
      </section>
      <ul className="footer__menu">
          <li>
            <NavLink exact to="/" className="footer__menu-item" onClick={scrollToTop}>
             Главная</NavLink>
          </li>
          <li>
            <NavLink exact to="/saved-news" className="footer__menu-item" onClick={scrollToTop}>
                Сохраненные статьи</NavLink>
          </li>
      </ul>
      <section className="footer__social">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><img className="footer__icon" src={gitIcon} alt="иконка Гитхаб"/></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img className="footer__icon" src={facebookIcon} alt="иконка Фейсбук"/></a>
      </section>
    </footer>
  );
}

export default Footer;
