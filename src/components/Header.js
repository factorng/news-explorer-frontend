import React, { useCallback, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./Header.css";
import logoutPic from "../images/logout.svg";

function Header({ handleMobileOpen, popupAuthOpen }) {
  const { pathname } = useLocation();
  return (
    <div
      className={pathname === "/saved-news" ? "header header_black" : "header"}
    >
      <p className="header__logo"> NewsExplorer </p>
      <nav className="header__nav">
        <ul className="header__menu">
          <li>
            <NavLink
              exact
              to="/"
              className={
                pathname === "/saved-news"
                  ? "header__menu-item header__menu-item_black"
                  : "header__menu-item"
              }
              activeClassName={
                pathname === "/saved-news"
                  ? "header__menu-item_underlined header__menu-item_underlined_black"
                  : "header__menu-item_underlined"
              }
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-news"
              className={
                pathname === "/saved-news"
                  ? "header__menu-item header__menu-item_black"
                  : "header__menu-item"
              }
              activeClassName={
                pathname === "/saved-news"
                  ? "header__menu-item_underlined header__menu-item_underlined_black"
                  : "header__menu-item_underlined"
              }
            >
              Сохраненные статьи
            </NavLink>
          </li>
        </ul>
        <button
          className={
            pathname === "/saved-news"
              ? "header__login-button header__login-button_black"
              : "header__login-button"
          }
          onClick={popupAuthOpen}
        >
          Авторизоваться
          <span
            className={
              pathname === "/saved-news"
                ? "header__login-pic header__login-pic_black"
                : "header__login-pic"
            }
          ></span>
        </button>
      </nav>
      <button
        className={
          pathname === "/saved-news"
            ? "header__mobile-menu-button header__mobile-menu-button_black"
            : "header__mobile-menu-button header__mobile-menu-button_white"
        }
        onClick={handleMobileOpen}
      ></button>
    </div>
  );
}

export default Header;
