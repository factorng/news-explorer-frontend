import React from "react";
import "./PopupWithForm.css";
import "./InfoTooltipPopup.css";

function InfoTooltip({ onOpen, isOpen, onClose, handleButtonCLick }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => onOpen(), [isOpen]);
  return (
    <div className={isOpen ? "popup  popup_open" : "popup "}>
      <div className="info-tooltip">
        <button
          onClick={onClose}
          type="button"
          className="popup__button-close"
        ></button>
        <h3 className="popup__title">Пользователь успешно зарегистрирован!</h3>
        <button
          onClick={() => handleButtonCLick()}
          type="button"
          className="info-tooltip__button"
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
