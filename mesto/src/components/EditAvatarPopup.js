import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup ( {onUpdateAvatar, handleOverlayClick, isOpen, onClose} ) {

  const avatarRef = useRef();

  //
  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(avatarRef.current.value); // Значение инпута, полученное с помощью рефа
    avatarRef.current.value="";
  }

  return (
    <PopupWithForm 
      name ="change-avatar"
      title="Обновить аватар"
      isOpen ={isOpen}
      onClose={onClose}
      handleOverlayClick={handleOverlayClick}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="form__input popup__input linkInput" type="url" id="avatarlink" placeholder="Ссылка на картинку" required
      />
      <span className="form__input-error avatarlink-error"></span>
  </ PopupWithForm>
  )
}