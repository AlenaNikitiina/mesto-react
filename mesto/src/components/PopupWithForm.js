import React from "react"

export default function PopupWithForm (props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ""}  popup_edit popup_add popup_change-avatar popup_delete-card`} 
    onMouseDown={props.onOverlayClick} >
      <div className="popup__container form">
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <h3 className="popup__title">{`${props.title}`}</h3>

        <form 
        name={`popup_${props.name}`}
        onSubmit={props.onSubmit}
        className="popup__form form__edit form__add form__avatar" noValidate>
          {props.children}
          <button className="popup__save-button popup__button form__submit" type="submit" >Сохранить</button>
        </form>
      </div>
    </div>
  )
}

