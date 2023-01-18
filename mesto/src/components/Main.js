import React from "react";

export default function Main (props) {
  return (
  <>
  <div className="page">
    <section className="profile">
      <div className="profile__description">
        <img className="profile__avatar" src={props.userAvatar} alt="Ваш аватар" onClick={props.onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name titleName">{props.userName}</h1>
          <p className="profile__job titleJob">{props.userDescription}</p>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
      </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
    </section>
  
    <section className="elements" aria-label="ваши фотографии">
      <ul className="elements__list">
      </ul>
    </section>
  
    <template className="element-template">
      <li className="elements__card">
        <article className="element">
          <button className="element__trash-button" type="button"></button>
          <img className="element__foto" />
          <h2 className="element__title"></h2>
          <button className="element__like" type="button"></button>
          <span className="element__like-counter"></span>
        </article>
      </li>
    </template>

  </div>
  </>
  )
}


/*
    //стейт
    const [userName, setUserName] =               useState({});
    const [userDescription, setUserDescription] = useState({});
    const [userAvatar, setUserAvatar] =           useState({});
    const [cards, setCard] =                    useState([]);\
  */