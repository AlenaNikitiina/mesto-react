import Card from "./Card.js";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";


export default function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
  <>
    <div className="page">
      <section className="profile">
        <div className="profile__description">
          <img className="profile__avatar" src={currentUser.avatar} alt="Ваш аватар" onClick={props.handleEditAvatarClick} />
          <div className="profile__info">
            <h1 className="profile__name titleName">{currentUser.name}</h1>
            <p className="profile__job titleJob">{currentUser.about}</p>
            <button className="profile__edit-button" type="button" onClick={props.handleEditProfileClick} />
          </div>
        </div>
          <button className="profile__add-button" type="button" onClick={props.handleAddPlaceClick} />
      </section>

      <section className="elements" aria-label="ваши фотографии">
          <ul className="elements__list">
            {props.cards.map(card => {
              return (
                <Card 
                  card={card}         key={card._id}
                  name={card.name}    link={card.link} 
                  likes={card.likes}  onCardClick={props.onCardClick} 
                  onCardLike={props.onCardLike} />)
            })}
          </ul>
      </section>
    
    </div>
  </>
  )
}

// компонент это ф кот возвр джсх разметку