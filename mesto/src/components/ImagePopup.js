function ImagePopup () {
  return (
    <section onClick={onClose} className={`popup popup_type_images" ${isOpen ? `popup_opened` : ""} aria-label="всплывающее акно с картинкой`}>
      <figure className="popup__container-images">
        <button className="popup__close-icon popup__close-icon_type_images links" aria-label="закрыть карточку" type="button"/>
        <img className="popup__picture" src={card.link} alt={`Картинка города: ${card.name}`}/>
        <figcaption className="popup__picture-caption">{card.name}</figcaption>
      </figure>
    </section>
  );
}

<figure className="popup__figure">
  <button className="popup__close-button" type="button"></button>
  <img className="popup__image" />
  <figcaption className="popup__figcaption"></figcaption>
</figure>