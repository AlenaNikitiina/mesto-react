import React from "react";
import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

export default function EditAvatarPopup ( {onUpdateAvatar, onOverlayClick, isOpen, onClose} ) {
  const currentUser = useContext(CurrentUserContext);
 
  const [avatar, setAvatar] = useState(''); // Стейт, в котором содержится значение инпута

  /*
  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
      setAvatar(currentUser.avatar);
      setAvatar(''); //
    }, [currentUser] ); 
*/
  //
  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(avatar); // Значение инпута, полученное с помощью рефа
    //avatar.current.value='';
  }

   // Обработчик изменения инпута, обновляет стейт
   function handleChangeAvatar (evt) {
    setAvatar(evt.target.value);
  }

    
  // очищаем импуты
  useEffect(() => {
    setAvatar('');
  }, [isOpen] );

  return (
    <PopupWithForm 
      name ="change-avatar"
      title="Обновить аватар"
      isOpen ={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeAvatar}
        value={avatar || ''}
        className="form__input popup__input linkInput" type="url" id="avatarlink" placeholder="Ссылка на картинку" required
      />
      <span className="form__input-error avatarlink-error"></span>
  </ PopupWithForm>
  )
}











/*
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
*/