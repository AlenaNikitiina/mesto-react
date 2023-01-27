import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'


export default function EditProfilePopup (props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName]               = useState(''); // Стейт, в котором содержится значение инпута
  const [description, setDescription] = useState('');
  //const nameRef        = React.useRef();
  //const descriptionRef = React.useRef();

  /*
  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser] ); 
*/
useEffect(() => { 
  if (props.isOpen) { 
    setName(currentUser.name); 
    setDescription(currentUser.about); 
  } 
}, [props.isOpen, currentUser]);


  // отправка формы ?
  function handleSubmit (e) {
    e.preventDefault();  // Запрещаем браузеру переходить по адресу формы
    props.onUpdateUser({  // Передаём значения управляемых компонентов во внешний обработчик
      name,
      about: description,
    });
  } 

  // Обработчик изменения инпута, обновляет стейт
  function handleChangeName (evt) {
    setName(evt.target.value);

  }

  // Обработчик изменения инпута обновляет стейт
  function handleChangeDescription (evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm 
      name ="edit" title="Редактировать профиль" 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.handleOverlayClick}
      onSubmit={handleSubmit}
      handleEditProfileClick = {props.handleEditProfileClick}
      >
        <input 
          value={name}
          onChange={handleChangeName} // Значение элемента «привязывается» к значению стейта
          className="form__input popup__input nameInput" id="nickName" type="text" minLength="2" maxLength="40" placeholder="Имя" required />
        <span className="form__input-error nickName-error"></span>
      
        <input 
          value={description} 
          onChange={handleChangeDescription}
          className="form__input popup__input jobInput" id="about" type="text" minLength="2" maxLength="200" placeholder="О себе" required />
        <span className="form__input-error about-error"></span>
    </ PopupWithForm>
  )

}
