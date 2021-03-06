import React from "react";
import "./PopupWithForm.css";

function PopupWithForm({
  isOpen,
  className,
  formName,
  onSubmit,
  onClose,
  title,
  children,
  buttonText,
  onClickBottomButton,
  bottomButtonText,
  submitEnable,
}) {
  return (
    <div
      className={
        isOpen ? `popup  ${className} popup_open` : `popup  ${className}`
      }
    >
      <h1 className="popup__logo"> NewsExplorer </h1>
      <form
        className={`popup__form ${formName}`}
        method="post"
        action="#"
        onSubmit={onSubmit}
        noValidate
      >
        <button
          className="popup__button-close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        {children}

        <button
          className={
            submitEnable
              ? "popup__button-submit"
              : "popup__button-submit popup__button-submit_disabled"
          }
          disabled={!submitEnable}
          type="submit"
        >
          {buttonText}
        </button>
        <p className="popup__bottom-button">
          или
          <span
            className="popup__bottom-button-text"
            onClick={onClickBottomButton}
          >
            {bottomButtonText}
          </span>
        </p>
      </form>
    </div>
  );
}

export default PopupWithForm;
