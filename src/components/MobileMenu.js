import React, { useCallback, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "./MobileMenu.css";

function MobileMenu({
  isOpen,
  handleClose,
  handlePopupAuthOpen,
  handleLogOut,
}) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  function popupAuthOpen() {
    handlePopupAuthOpen(true);
  }

  return (
    <div
      className={
        isOpen
          ? "mobile-menu__overlay  mobile-menu_open"
          : "mobile-menu__overlay"
      }
    >
      <nav className="mobile-menu">
        <div className="mobile-menu__header">
          <h1 className="mobile-menu__logo"> NewsExplorer</h1>
          <button
            className="mobile-menu__close-button"
            onClick={handleClose}
          ></button>
        </div>
        <ul className="mobile-menu__links">
          <li>
            <NavLink
              exact
              to="/"
              className="mobile-menu__link"
              onClick={handleClose}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/saved-news"
              className="mobile-menu__link"
              onClick={handleClose}
            >
              Сохраненные статьи
            </NavLink>
          </li>
        </ul>
        <button
          className={
            pathname === "/saved-news"
              ? "mobile-menu__login-button mobile-menu__login-button_black"
              : "mobile-menu__login-button"
          }
          onClick={currentUser.name ? handleLogOut : popupAuthOpen}
        >
          {currentUser.name || "Авторизоваться"}
          {currentUser.name ? (
            <span className="mobile-menu__login-pic"></span>
          ) : (
            " "
          )}
        </button>
      </nav>
    </div>
  );
}

export default MobileMenu;
