import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function Card (props) {
  const currentUser = React.createContext(CurrentUserContext);
  
  const isOwn = props.card.owner._id === currentUser._id; // мы ли владельцы текущей карточки ?

  const isLiked = props.card.likes.some(i => i._id === currentUser._id); // есть ли у карточки лайк, поставленный текущим пользователем ?
  const cardLikeButton = ( `element__like 
    ${isLiked && 'element__like_active' }` ); // Создаём переменную, кот после зададим в `className` для кнопки лайка

  // увеличить карточку, zoom
  function handleCardClickZoom() {
    props.onCardClick(props.card);
  } 

  // обработчик клика лайка
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  // удалить карточку
  function handleDeleteClick() {
    props.onClickDeleteCard(props.card);
  }

  return (
    <div className="element-template">
      <li className="elements__card">
        <article className="element">
          {isOwn && (
            <button 
              className="element__trash-button" 
              type="button" 
              aria-label="удалить карточку"
              onClick={handleDeleteClick} />
          )}
          <img 
            className="element__foto" 
            src={props.link} 
            alt={`изображение: ${props.name}`} 
            onClick={handleCardClickZoom} />
          <h2 className="element__title">{props.name}</h2>
          <button 
            className={cardLikeButton}
            type="button"
            aria-label="поставить лайк карточке" 
            onClick={handleLikeClick} />
          <span className="element__like-counter">{props.likes.length}</span>
        </article>
      </li>
    </div>
  );
}


// <button className="element__like cardLikeButton" ,.????????????????????????????

// тег <template></> не работает
// isOwn Далее в разметке используем переменную для условного рендеринга
// alt={`изображение: ${card.name}`}  /  {props.name}
