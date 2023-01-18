export default function ImagePopup () {
  return (
    <div className="popup popup_zoom" >
      <div className="popup__box">
        <figure className="popup__figure">
          <button className="popup__close-button" onClick={onClose} aria-label="закрыть фотографию" type="button"></button>
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
