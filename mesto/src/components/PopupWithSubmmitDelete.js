import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithSubmmitDelete ( {currentCard, handleOverlayClick, onConfirmDelete, renderLoading, isOpen, onClose} ) {
  
  // обработчик удаления карточки, в кот вызвали ф из пропсов
  function handleSubmit (e) {
    e.preventDefault();
    onConfirmDelete(currentCard);
  }

  return (
    <PopupWithForm 
      name="delete-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={handleOverlayClick}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
    >
    </ PopupWithForm>
  )

}
