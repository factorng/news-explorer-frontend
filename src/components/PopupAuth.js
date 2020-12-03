import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/formWithValidation";

function PopupAuth({ isOpen, onClose, handlePopupRegisterOpen, handleLogin }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  function handleClose() {
    onClose();
    resetForm({email: '', password: ''},{},false);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    const email = values.email;
    const password = values.password;
    if (!email || !password) {
      return;
    }
    // Передаём значения управляемых компонентов во внешний обработчик
    handleLogin(email, password);
    handleClose();
  }
  function handlePopupOpen() {
    onClose();
    handlePopupRegisterOpen(true);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Вход"
      onSubmit={handleSubmit}
      buttonText="Войти"
      bottomButtonText="Зарегистрироваться"
      onClickBottomButton={handlePopupOpen}
      submitEnable={isValid}
    >
      <>
        <div className="popup__input-field">
          <input
            id="email"
            className="popup__input edit-profile__input-email"
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            name="email"
            minLength="5"
            maxLength="40"
            placeholder="Введите email"
            pattern="^[^@]+@[^@.]+\.[^@]+$"
            required
          />
          <span
            className={`popup__input-error popup__name-error ${
              !isValid && "popup__input-error_active"
            }`}
          >
            {errors.email || ""}
          </span>
        </div>
        <div className="popup__input-field">
          <input
            id="password"
            className="popup__input edit-profile__input-password"
            type="text"
            value={values.password || ""}
            onChange={handleChange}
            name="password"
            minLength="5"
            maxLength="40"
            placeholder="Ведите пароль"
            required
          />
          <span
            className={`popup__input-error popup__name-error ${
              !isValid && "popup__input-error_active"
            }`}
          >
            {errors.password || ""}
          </span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default PopupAuth;
