import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithSubmmitDelete (props) {
  
  // обработчик удаления карточки, в кот вызвали ф из пропсов
  function handleSubmit (e) {
    e.preventDefault();
    props.onConfirmDelete(props.currentCard);
  }

  return (
    <PopupWithForm 
      name="delete-card"
      title="Вы уверены?" 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.handleOverlayClick}
      >
        <button className="popup__close-button" 
        type="button"
        onClick={handleSubmit}
        />
  </ PopupWithForm>
  )

}

/*
<div class="popup popup_delete-card">
<div class="popup__container form">
  <form action="#" class="popup__form" id="delete-card">
    <button class="popup__close-button" type="button"></button>
    <h3 class="popup__title">Вы уверены?</h3>
    <button class="popup__save-button popup__button form__submit" name="delete-card" type="submit">Да</button>
  </form>
</div>
</div>
*/