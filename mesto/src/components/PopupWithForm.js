export default function PopupWithForm (props) {
  return (
      <div className={` popup popup__container form popup_type_${props.name} ${props.isOpen} `} >
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{`${props.title}`}</h3>
      
        <form action="#" className={`popup__form form_type_${props.name}`} noValidate>
          {props.children}
          <button className="popup__save-button popup__button form__submit" type="submit" onClick={props.onClose}>Сохранить</button>
        </form>
      </div>
  )
}



//name={name} 
/* хтмл
<div className="popup popup_edit">

      <div className="popup__container form">
        <button className="popup__close-button" type="button"></button>
        <h3 className="popup__title">Редактировать профиль</h3>

        <form action="#" name="form_edit" className="form__edit popup__form" novalidate>
          <input className="form__input popup__input nameInput" id="nickName" type="text" required minlength="2" maxlength="40" placeholder="Имя" />
          <span className="form__input-error nickName-error"></span>
          <input className="form__input popup__input jobInput" id="about" type="text" required minlength="2" maxlength="200" placeholder="О себе" />
          <span className="form__input-error about-error"></span>
          <button className="popup__save-button popup__button form__submit" type="submit">Сохранить</button>
        </form>

      </div>
    </div>
*/




