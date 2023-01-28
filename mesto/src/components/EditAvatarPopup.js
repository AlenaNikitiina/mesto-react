import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup (props) {

  const avatarRef = useRef();
  
  ////* Значение инпута, полученное с помощью рефа */,
  function handleSubmit(evt) {
  
    evt.preventDefault();
    console.log("11111", avatarRef.current)
    props.onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value=""
  }


  return (
    <PopupWithForm 
    name ="change-avatar" title="Обновить аватар" 
    isOpen ={props.isOpen} 
    onClose={props.onClose}
    onOverlayClick={props.handleOverlayClick}
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