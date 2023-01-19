import {useEffect, useState} from "react";
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api.js';


export default function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]             = useState (false); // форма поменять имя работу
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen]           = useState (false); // форма доб фотку
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen]              = useState (false); // форма смена аватара
  const [isWithSubmmitDeletePopupOpen, setIsWithSubmmitDeletePopupOpen] = useState (false); // форма подтверждения удаления карточки
  const [isCloseAllPopups, setIsCloseAllPopups]                         = useState (true); // закрыть попапы
  const [selectedCard, setSelectedCard]                                 = useState (null); // zoom

  const [userInfo, setUserInfo] = useState({});
  const [cards, setCard]        = useState([]);

  //
  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(( [data, cards] ) => {
        setUserInfo (data);
        setCard (cards);
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи: ${err}`);
      })
    }, [])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen (true)
  }

  function handleAddPlaceClick () {
    setIsEditAddPlacePopupOpen (true)
  }

  function handleWithSubmmitDeleteClick () {
    setIsWithSubmmitDeletePopupOpen (true)
  }
 
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups () {
    setIsCloseAllPopups (false);
    setSelectedCard(null);
  }

  return (
    <div className="App page">
      <Header />
      <Main 
        onEditAvatar = {handleEditAvatarClick} 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick} 
        onSubmitDelete = {handleWithSubmmitDeleteClick}
        onCardClick={handleCardClick}

        userName = {userInfo.name}
        userDescription = {userInfo.about}
        userAvatar = {userInfo.avatar}
        cards = {cards}
      />
      <Footer />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={setSelectedCard}>
      </ImagePopup>

      {isEditProfilePopupOpen && isCloseAllPopups && (
        <PopupWithForm name ="edit" title="Редактировать профиль" isOpen = "popup_opened" onClose={closeAllPopups} >
          <input className="form__input popup__input nameInput" id="nickName" type="text" minLength="2" maxLength="40" placeholder="Имя" required/>
          <span className="form__input-error nickName-error"></span>
          <input className="form__input popup__input jobInput" id="about" type="text" minLength="2" maxLength="200" placeholder="О себе" required />
          <span className="form__input-error about-error"></span>
        </ PopupWithForm>
      )}

      {isEditAddPlacePopupOpen && isCloseAllPopups && (
        <PopupWithForm name="add" title="Новое место" isOpen = "popup_opened" onClose={closeAllPopups} >
          <input className="form__input popup__input titleInput" type="text" id="title" minLength="2" maxLength="30" placeholder="Название" required />
          <span className="form__input-error title-error"></span>
          <input className="form__input popup__input linkInput" type="url" id="link" placeholder="Ссылка на картинку" required/>
          <span className="form__input-error link-error"></span>
        </ PopupWithForm>
      )}

      {isEiditAvatarPopupOpen && isCloseAllPopups && (
        <PopupWithForm name ="change-avatar" title="Обновить аватар" isOpen = "popup_opened" onClose={closeAllPopups} >
          <input className="form__input popup__input linkInput" type="url" id="avatarlink" placeholder="Ссылка на картинку" required/>
          <span className="form__input-error avatarlink-error"></span>
        </ PopupWithForm>
      )}

     {isWithSubmmitDeletePopupOpen && isCloseAllPopups && (
        <PopupWithForm name="delete-card" title="Вы уверены?" isOpen = "popup_opened" onClose={closeAllPopups} >
        </ PopupWithForm>
      )}

    </div>
  )

}




/* 
  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) closeAllPopups();
  };

  onOverlayClick={handleOverlayClick}
*/
