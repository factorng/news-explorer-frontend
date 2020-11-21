import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupAuth({
  isOpen, onClose, handlePopupRegisterOpen
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

 

  function handleClose() {
    onClose();
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик

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
    >
        <>
          <div className="popup__input-field">
            <input
              id="input-email"
              className="popup__input edit-profile__input-email"
              type="email"
              value={email || ''}
              onChange={(e) => console.log(e.target.value)}
              name="name"
              placeholder="Введите email"
              minLength={2}
              maxLength={40}
              pattern="^[^@]+@[^@.]+\.[^@]+$"
              required
            />
            <span id="input-email-error" className="popup__input-error" />
          </div>
          <div className="popup__input-field">
            <input
              id="input-password"
              className="popup__input edit-profile__input-password"
              type="text"
              value={password || ''}
              onChange={(e) => console.log(e.target.value)}
              name="occupation"
              placeholder="Ведите пароль"
              minLength={2}
              maxLength={20}
              required
            />
            <span id="input-password-error" className="popup__input-error" />
          </div>
        </>
    </PopupWithForm>
  );
}

export default PopupAuth;
