export default function Card (props) {

  function handleCardClick() {
    props.onCardClick(props.card);
  } 

  return (
    <div className="element-template">
      <li className="elements__card">
        <article className="element">
          <button className="element__trash-button" type="button"></button>
          <img className="element__foto" src={props.link} alt={props.name} onClick={handleCardClick} />
          <h2 className="element__title">{props.name}</h2>
          <button className="element__like" type="button"></button>
          <span className="element__like-counter">{props.likes.length}</span>
        </article>
      </li>
    </div>
  );
}



// тег не работает <template></>

// alt={`изображение: ${card.name}`}