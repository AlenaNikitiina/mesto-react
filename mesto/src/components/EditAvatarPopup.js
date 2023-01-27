import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup (props) {

  const avatarRef = useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      //avatar: avatarRef /* Значение инпута, полученное с помощью рефа */,
    });
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
        //value={avatar}
        className="form__input popup__input linkInput" type="url" id="avatarlink" placeholder="Ссылка на картинку" required
      />
      <span className="form__input-error avatarlink-error"></span>
  </ PopupWithForm>
  )
}