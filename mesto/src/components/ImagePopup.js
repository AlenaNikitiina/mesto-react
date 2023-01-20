export default function ImagePopup (props) {
  return (
    <div className={`popup popup_zoom ${props.card && 'popup_opened'}`} onMouseDown={props.onOverlayClick}>
      <div className="popup__box">
        <figure className="popup__figure">
          <button className="popup__close-button" onClick={props.onClose} aria-label="закрыть фотографию" type="button" />
          <img className="popup__image" src={props.card && props.card.link} alt={`${props.card && props.card.name}`} />
          <figcaption className="popup__figcaption">{props.card && props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
