import Card from "./Card.js";

export default function Main (props) {
  return (
  <>
  <div className="page">
    <section className="profile">
      <div className="profile__description">
        <img className="profile__avatar" src={props.userAvatar} alt="Ваш аватар" onClick={props.handleEditAvatarClick} />
        <div className="profile__info">
          <h1 className="profile__name titleName">{props.userName}</h1>
          <p className="profile__job titleJob">{props.userDescription}</p>
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
                card={card}        key={card._id}
                name={card.name}   link={card.link} 
                likes={card.likes} onCardClick={props.onCardClick}/>)
          })}
        </ul>
    </section>
    
  </div>
  </>
  )
}

// компонент это ф кот возвр джсх разметку