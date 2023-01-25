import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function Card (props) {
  const currentUser = React.createContext(CurrentUserContext);
  
  const isOwn = props.card.owner._id === currentUser._id; // являемся ли мы владельцем текущей карточки ?

  const isLiked = props.card.likes.some(i => i._id === currentUser._id); // есть ли у карточки лайк, поставленный текущим пользователем ?
  const cardLikeButtonClassName = ( `card__like-button ${isLiked && 'card__like-button_active'}` ); // Создаём переменную, кот после зададим в `className` для кнопки лайка
  
  // увеличить zoom
  function handleCardClickZoom() {
    props.onCardClick(props.card);
  } 

  // удалить карточку
  function handleDeleteClick() {

  }

  return (
    <div className="element-template">
      <li className="elements__card">
        <article className="element">
          {isOwn && <button 
            className="element__trash-button button_del" type="button" aria-label="удалить карточку" onClick={handleDeleteClick}/> }
          <img className="element__foto" src={props.link}  alt={`изображение: ${props.name}`} onClick={handleCardClickZoom} />
          <h2 className="element__title">{props.name}</h2>
          <button className="element__like cardLikeButtonClassName" type="button" />
          <span className="element__like-counter">{props.likes.length}</span>
        </article>
      </li>
    </div>
  );
}



// тег <template></> не работает
// isOwn Далее в разметке используем переменную для условного рендеринга
// alt={`изображение: ${card.name}`}  /  {props.name}
