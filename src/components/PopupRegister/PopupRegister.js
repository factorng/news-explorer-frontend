import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormWithValidation from "../../hooks/formWithValidation";

function PopupRegister({
  isOpen,
  onClose,
  handlePopupAuthOpen,
  handleRegister,
  isError
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  function handleClose() {
    onClose();
    resetForm({ email: "", password: "", name: "" }, {}, false);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    const email = values.email;
    const password = values.password;
    const name = values.name;
    if (!email || !password || !name) {
      return;
    }

    // Передаём значения управляемых компонентов во внешний обработчик
    handleRegister(email, password, name);
  }

  function handlePopupOpen() {
    onClose();
    handlePopupAuthOpen(true);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Вход"
      onSubmit={handleSubmit}
      buttonText="Зарегистрироваться"
      bottomButtonText="Войти"
      onClickBottomButton={handlePopupOpen}
      submitEnable={isValid}
    >
      <>
        <div className="popup__input-field">
          <input
            id="email-registration"
            className="popup__input edit-profile__input-email"
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            name="email"
            placeholder="Введите email"
            minLength={2}
            maxLength={40}
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
            id="password-registration"
            className="popup__input edit-profile__input-password"
            type="password"
            value={values.password || ""}
            onChange={handleChange}
            name="password"
            placeholder="Ведите пароль"
            minLength={2}
            maxLength={20}
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
        <div className="popup__input-field">
          <input
            id="name-registration"
            className="popup__input edit-profile__input-name"
            type="text"
            value={values.name || ""}
            onChange={handleChange}
            name="name"
            placeholder="Введите имя"
            minLength={2}
            maxLength={20}
            required
          />
          <span
            className={`popup__input-error popup__name-error ${
              !isValid && "popup__input-error_active"
            }`}
          >
            {errors.name || ""}
          </span>
          <span
            className={`popup__error_registration ${
              isError && "popup__error_registration_active"
            } `}
          >
            Такой пользователь уже есть
          </span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default PopupRegister;
