import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import "./App.css";
import SearchForm from "./SearchForm";
import About from "./About";
import Footer from "./Footer";
import NewsCardList from "./NewsCardList";
import PopupAuth from "./PopupAuth";
import PopupRegister from "./PopupRegister";
import SavedNewsHeader from "./SavedNewsHeader";
import SavedNews from "./SavedNews";
import MobileMenu from "./MobileMenu";
import Preloader from "./Preloader";
import newsApi from "../utils/NewsApi";
import ProtectedRoute from "./ProtectedRoute";
import {
  register,
  authorize,
  getUserInfo,
  saveArticle,
  getSavedArticles,
  deleteArticle,
} from "../utils/MainApi";
import InfoTooltip from "./InfoTooltipPopup";
import useFormWithValidation from "../hooks/formWithValidation";

function App() {
  const [isPopupAuthOpen, setIsPopupAuthOpen] = React.useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [newsCards, setNewsCards] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticles, setSavedArticles] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationError, setIsRegistrationError] = useState(false);
  const [keyWords, setKeyWords] = useState([]);
  const history = useHistory();
  const { resetForm } = useFormWithValidation();

  function getNews() {
    if (searchQuery) {
      setIsLoading(true);
      localStorage.removeItem("articles");
      localStorage.removeItem("keyword");
      newsApi
        .getNews(searchQuery, new Date())
        .then((apiCards) => {
          setNewsCards(apiCards.articles);
          if(loggedIn) {
            localStorage.setItem("articles", JSON.stringify(apiCards.articles));
            localStorage.setItem("keyword", JSON.stringify(searchQuery));
          }
        })
        .then(() => setIsLoading(false));
    } 
  }
  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (loggedIn) {
      getSavedArticles().then((articles) => {
        setSavedArticles(articles);
        const localStorageArticles = JSON.parse(
          localStorage.getItem("articles")
        );
        if (localStorageArticles)
          setNewsCards(localStorageArticles);
        
        let keyWords = [];
        articles.map((elem) => keyWords.push(elem.keyword));
        setKeyWords(keyWords);
      });
    }
  }, [currentUser, loggedIn]);

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
    setIsRegistrationError(false);
    setIsInfoTooltipOpen(false);
  };
  const hahdleMobileOpen = () => {
    setIsMobileMenuOpen(true);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  function handleLogin(email, password) {
    return authorize(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }

  function handleRegister(email, password, name) {
    return register(email, password, name)
      .then((res) => {
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setIsRegistrationError(true);
        console.log(err);
      });
  }

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserInfo()
        .then((currentUser) => {
          setCurrentUser({
            email: currentUser.email,
            name: currentUser.name,
            id: currentUser._id,
          });
          localStorage.setItem("user", JSON.stringify(currentUser));
        })
        .then(() => {
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }, [history]);

  function handleLogOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("articles");
    localStorage.removeItem("user");
    localStorage.removeItem("keyword");
    history.push("/");
    setLoggedIn(false);
    setNewsCards([]);
    setCurrentUser({});
    setSearchQuery('');
  }

  function handleArticleSave(article) {
    if(loggedIn){
      const articleToSaveOrDelete = savedArticles.find((i) => i.title === article.title);
      if(!articleToSaveOrDelete) {
        saveArticle({
          image: article.urlToImage,
          date: article.publishedAt,
          title: article.title,
          text: article.description,
          source: article.source.name,
          keyword: searchQuery || localStorage.getItem("keyword"),
          link: article.url,
        });
        getSavedArticles()
          .then((articles) => {
            setSavedArticles(articles);
          })
          .catch((err) => {
            console.log(err.message);
        }); 
      } else {
        handleDeleteArticle(articleToSaveOrDelete);
      }
    }

  }

  function handleDeleteArticle(article) {
    deleteArticle(article)
      .then(() => {
        setSavedArticles(savedArticles.filter((elem) => elem._id !== article._id));
      })
      .catch((err) => {
        console.log(err.message);
      });    
  }

  function handleInfoTooltipClose() {
    setIsInfoTooltipOpen(false)
    setIsPopupAuthOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsPopupRegisterOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Header
          handleMobileOpen={hahdleMobileOpen}
          popupAuthOpen={setIsPopupAuthOpen}
          handleLogOut={handleLogOut}
        />
        <Switch>
          <Route exact path="/">
            <SearchForm
              handleQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
            {isLoading ? (
              <Preloader />
            ) : (
              <NewsCardList
                articles={newsCards}
                handleButton={handleArticleSave}
                savedArticles={savedArticles}
                searchQuery={searchQuery}
              />
            )}
            <About />
          </Route>
          <ProtectedRoute
            exact
            path="/saved-news"
            loggedIn={loggedIn}
            header={SavedNewsHeader}
            component={SavedNews}
            savedArticles={savedArticles}
            articles={savedArticles}
            handleButton={handleDeleteArticle}
          />
        </Switch>
        <Footer />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          handleClose={handleMobileClose}
          handlePopupAuthOpen={setIsPopupAuthOpen}
          handleLogOut={handleLogOut}
        />
        <PopupAuth
          isOpen={isPopupAuthOpen}
          onClose={closeAllPopups}
          handlePopupRegisterOpen={setIsPopupRegisterOpen}
          handleLogin={handleLogin}
        ></PopupAuth>
        <PopupRegister
          isOpen={isPopupRegisterOpen}
          onClose={closeAllPopups}
          handleRegister={handleRegister}
          handlePopupAuthOpen={setIsPopupAuthOpen}
          isError={isRegistrationError}
        ></PopupRegister>
        <InfoTooltip
          onOpen={handleInfoTooltipOpen}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          handleButtonCLick={handleInfoTooltipClose}
        ></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
