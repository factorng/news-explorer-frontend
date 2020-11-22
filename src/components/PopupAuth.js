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
              className="popup__input edit-profile__input-email"
              type="email"
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              name="name"
              placeholder="Введите email"
              minLength={2}
              maxLength={40}
              pattern="^[^@]+@[^@.]+\.[^@]+$"
              required
            />
            
          </div>
          <div className="popup__input-field">
            <input
              className="popup__input edit-profile__input-password"
              type="text"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              name="occupation"
              placeholder="Ведите пароль"
              minLength={2}
              maxLength={20}
              required
            />
            
          </div>
        </>
    </PopupWithForm>
  );
}

export default PopupAuth;
