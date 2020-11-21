import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupRegister({
  isOpen, onClose, handlePopupAuthOpen
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

 

  function handleClose() {
    onClose();
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    console.log(email, name, password)
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
    >
        <>
          <div className="popup__input-field">
            <input
              id="input-email"
              className="popup__input edit-profile__input-email"
              type="email"
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
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
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Ведите пароль"
              minLength={2}
              maxLength={20}
              required
            />
            <span id="input-password-error" className="popup__input-error" />
          </div>
          <div className="popup__input-field">
            <input
              id="input-name"
              className="popup__input edit-profile__input-name"
              type="text"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Введите имя"
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

export default PopupRegister;
