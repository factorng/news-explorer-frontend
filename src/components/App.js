import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import "./App.css";
import SearchForm from "./SearchForm";
import About from "./About";
import Footer from "./Footer";
import NewsCardList from "./NewsCardList";
import PopupAuth from "./PopupAuth";
import PopupRegister from "./PopupRegister";
import SavedNewsHeader from "./SavedNewsHeader";
import MobileMenu from "./MobileMenu";
import Preloader from "./Preloader";

function App() {
  const [isPopupAuthOpen, setIsPopupAuthOpen] = React.useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const escClosePopup = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };
  const overlayClosePopup = (evt) => {
    if (evt.target.classList.contains("popup_open")) {
      closeAllPopups();
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", escClosePopup);
    document.addEventListener("click", overlayClosePopup);
    return () => {
      document.removeEventListener("keydown", escClosePopup);
      document.removeEventListener("click", overlayClosePopup);
    };
  });
  const closeAllPopups = () => {
    setIsPopupAuthOpen(false);
    setIsPopupRegisterOpen(false);
  };
  const hahdleMobileOpen = () => {
    console.log("open");
    setIsMobileMenuOpen(true);
  };
  const hahdleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="wrapper">
      <Header handleMobileOpen={hahdleMobileOpen} popupAuthOpen={setIsPopupAuthOpen}/>
      <Switch>
        <Route exact path="/">
          <SearchForm />
          <NewsCardList />
          <About />
        </Route>
        <Route path="/saved-news">
          <SavedNewsHeader />
          <NewsCardList />
        </Route>
      </Switch>
      <Footer />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        handleClose={hahdleMobileClose}
        handlePopupAuthOpen={setIsPopupAuthOpen}
      />
      <PopupAuth
        isOpen={isPopupAuthOpen}
        onClose={closeAllPopups}
        handlePopupRegisterOpen={setIsPopupRegisterOpen}
      ></PopupAuth>
      <PopupRegister
        isOpen={isPopupRegisterOpen}
        onClose={closeAllPopups}
        handlePopupAuthOpen={setIsPopupAuthOpen}
      ></PopupRegister>
    </div>
  );
}

export default App;
