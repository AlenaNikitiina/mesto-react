import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'


export default function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName]               = useState('');
  const [description, setDescription] = useState('');
  //const nameRef        = React.useRef();
  //const descriptionRef = React.useRef();

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser] ); 

  function handleChange() {}

  // отправка формы ?
  function handleSubmit (e) {
    e.preventDefault();  // Запрещаем браузеру переходить по адресу формы
    props.onUpdateUser({  // Передаём значения управляемых компонентов во внешний обработчик
      name,
      about: description,
    });
  } 


  return (
    <PopupWithForm 
      name ="edit" title="Редактировать профиль" 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.handleOverlayClick}
      onSubmit={handleSubmit} 
      >
        <input 
          value={name}
          onChange={handleChange}
          className="form__input popup__input nameInput" id="nickName" type="text" minLength="2" maxLength="40" placeholder="Имя" required />
        <span className="form__input-error nickName-error"></span>
      
        <input 
          value={description}
          onChange={handleChange}
          className="form__input popup__input jobInput" id="about" type="text" minLength="2" maxLength="200" placeholder="О себе" required />
        <span className="form__input-error about-error"></span>
    </ PopupWithForm>
  )

}
