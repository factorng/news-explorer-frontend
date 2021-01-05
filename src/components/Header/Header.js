import React, { useCallback, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import "./Header.css";

function Header({ handleMobileOpen, popupAuthOpen, handleLogOut }) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div
      className={pathname === "/news-explorer-frontend/saved-news" ? "header header_black" : "header"}
    >
      <p className="header__logo"> NewsExplorer </p>
      <nav className="header__nav">
        <ul className="header__menu">
          <li>
            <NavLink
              exact
              to="/news-explorer-frontend/"
              className={
                pathname === "/news-explorer-frontend/saved-news"
                  ? "header__menu-item header__menu-item_black"
                  : "header__menu-item"
              }
              activeClassName={
                pathname === "/news-explorer-frontend/saved-news"
                  ? "header__menu-item_underlined header__menu-item_underlined_black"
                  : "header__menu-item_underlined"
              }
            >
              Главная
            </NavLink>
          </li>
          {currentUser.name ?
          <li>
            <NavLink
              to="/news-explorer-frontend/saved-news"
              className={
                pathname === "/news-explorer-frontend/saved-news"
                  ? "header__menu-item header__menu-item_black"
                  : "header__menu-item"
              }
              activeClassName={
                pathname === "/news-explorer-frontend/saved-news"
                  ? "header__menu-item_underlined header__menu-item_underlined_black"
                  : "header__menu-item_underlined"
              }
            >
              Сохраненные статьи
            </NavLink>
          </li>
          : ''} 
        </ul>
        <button
          className={
            pathname === "/news-explorer-frontend/saved-news"
              ? "header__login-button header__login-button_black"
              : "header__login-button"
          }
          onClick={currentUser.name ? handleLogOut : popupAuthOpen}
        >
          {currentUser.name || "Авторизоваться"}
          <span
            className={
              pathname === "/news-explorer-frontend/saved-news"
                ? "header__login-pic header__login-pic_black"
                : "header__login-pic"
            }
          ></span>
        </button>
      </nav>
      <button
        className={
          pathname === "/news-explorer-frontend/saved-news"
            ? "header__mobile-menu-button header__mobile-menu-button_black"
            : "header__mobile-menu-button header__mobile-menu-button_white"
        }
        onClick={handleMobileOpen}
      ></button>
    </div>
  );
}

export default Header;
