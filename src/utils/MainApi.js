import {NEWS_EXPLORER_API_URL} from "../utils/constants"

export const register = (email, password, name) =>
  fetch(`${NEWS_EXPLORER_API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 409) {
      throw new Error("Пользователь с таким email уже зарегистрирован");
    }
    throw new Error("Некорректно заполнено одно из полей");
  });

export const authorize = (email, password) =>
  fetch(`${NEWS_EXPLORER_API_URL}/signin/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error("Не передано одно из полей");
    }
    if (res.status === 401) {
      throw new Error("Пользователь с email не найден");
    }
    throw new Error(`Ошибка авторизации: ${res.status}`);
  });

export const getUserInfo = () =>
  fetch(`${NEWS_EXPLORER_API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    credentials: "same-origin",
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error("Токен не передан или передан не в том формате");
    }
    if (res.status === 401) {
      throw new Error("Переданный токен некорректен");
    }
    throw new Error(`Ошибка токена: ${res.status}`);
  });

export const saveArticle = ({keyword, title, text, date, source, link, image}) =>
{
  fetch(`${NEWS_EXPLORER_API_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    }),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error("Токен не передан или передан не в том формате");
    }
    if (res.status === 401) {
      throw new Error("Переданный токен некорректен");
    }
    throw new Error(`Ошибка токена: ${res.status}`);
  });
}

  export const getSavedArticles = () => 
    fetch(`${NEWS_EXPLORER_API_URL}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
    .then((res) => 
        res.json()
  );
  
  export const deleteArticle = (article) => {
    return fetch(`${NEWS_EXPLORER_API_URL}/articles/${article._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
  }
