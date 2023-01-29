import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'


export default function AddPlacePopup ( {handleOverlayClick,onAddPlace, isOpen, onClose} ) {
  const currentUser = useContext(CurrentUserContext);

  const [placeName, setPlaceName] = useState(''); // Стейт, в котором содержится значение инпута
  const [placeLink, setPlaceLink] = useState('');

    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
      setPlaceName(currentUser.placeName);
      setPlaceLink(currentUser.placeLink);
    }, [currentUser] );

    // Обработчик изменения инпута, обновляет стейт
    function handleChangePlaceName (evt) {
      setPlaceName(evt.target.value);
    }
  
  // Обработчик изменения инпута обновляет стейт
  function handleChangePlaceLink (evt) {
    setPlaceLink(evt.target.value);
  }
  
  function handleSubmit (e) {
    e.preventDefault();
    onAddPlace(placeName,placeLink);
  } 


  return (
    <PopupWithForm 
      name="add"
      title="Новое место" 
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={handleOverlayClick}
      onSubmit={handleSubmit}
    >
        <input
          //name={namePlace}
          value={placeName}
          className="form__input popup__input titleInput" type="text" id="title" minLength="2" maxLength="30" placeholder="Название" required
          onChange={handleChangePlaceName}
        />
        <span className="form__input-error title-error"></span>
        <input
          //name={linkPlace}
          value={placeLink}
          className="form__input popup__input linkInput" type="url" id="link" placeholder="Ссылка на картинку" required
          onChange={handleChangePlaceLink}
        />
        <span className="form__input-error link-error"></span>
    </ PopupWithForm>
  )

}