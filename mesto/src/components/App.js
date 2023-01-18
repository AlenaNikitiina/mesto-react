import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import {useEffect, useState} from "react";
import api from '../utils/api.js';


export default function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState (false); // форма поменять имя работу
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState (false); // форма доб фотку
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState (false); // форма смена аватара
  const [isWithSubmmitDeletePopupOpen, setIsWithSubmmitDeletePopupOpen] = useState (false); // форма подтверждения удаления карточки
  const [isCloseAllPopups, setIsCloseAllPopups] = useState (true); // закрыть попапы

  const [userInfo, setUserInfo] = useState({});
  const [cards, setCard] =                    useState([]);

  //
  useEffect (() => {
    api.getUserInfo()
      .then((data) => {
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

    //
    useEffect (() => {
      api.getInitialCards()
        .then((data) => {
          setUserInfo(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen (true)
  };

  function handleAddPlaceClick() {
    setIsEditAddPlacePopupOpen (true)
  };

  function handleWithSubmmitDeleteClick () {
    setIsWithSubmmitDeletePopupOpen (true)
  };

  function closeAllPopups() {
    setIsCloseAllPopups (false)
  };

  return (
    <div className="App page">
      <Header />
      <Main 
        onEditAvatar = {handleEditAvatarClick} 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick} 
        //onSubmitDelete = {handleWithSubmmitDeleteClick}

        userName = {userInfo.name}
        userDescription = {userInfo.about}
        userAvatar = {userInfo.avatar}
        cards = {cards}
      />
      <Footer />

      {isEditProfilePopupOpen && isCloseAllPopups && (
        <PopupWithForm name ="edit" title="Редактировать профиль" isOpen = "popup_opened" onClose={closeAllPopups} >
          <input className="form__input popup__input nameInput" id="nickName" type="text" minLength="2" maxLength="40" placeholder="Имя" required/>
          <span className="form__input-error nickName-error"></span>
          <input className="form__input popup__input jobInput" id="about" type="text" minLength="2" maxLength="200" placeholder="О себе" required />
          <span className="form__input-error about-error"></span>
        </ PopupWithForm>
      )};

      {isEditAddPlacePopupOpen && isCloseAllPopups && (
        <PopupWithForm name="add" title="Новое место" isOpen = "popup_opened" onClose={closeAllPopups} >
          <input className="form__input popup__input titleInput" type="text" id="title" minLength="2" maxLength="30" placeholder="Название" required />
          <span className="form__input-error title-error"></span>
          <input className="form__input popup__input linkInput" type="url" id="link" placeholder="Ссылка на картинку" required/>
          <span className="form__input-error link-error"></span>
        </ PopupWithForm>
      )};

      {isEiditAvatarPopupOpen && isCloseAllPopups && (
        <PopupWithForm name ="change-avatar" title="Обновить аватар" isOpen = "popup_opened" onClose={closeAllPopups} >
          <input className="form__input popup__input linkInput" type="url" id="avatarlink" placeholder="Ссылка на картинку" required/>
          <span className="form__input-error avatarlink-error"></span>
        </ PopupWithForm>
      )};

     {isWithSubmmitDeletePopupOpen && isCloseAllPopups && (
        <PopupWithForm name="delete-card" title="Вы уверены?" isOpen = "popup_opened" onClose={closeAllPopups} >
        </ PopupWithForm>
      )};

    </div>
  )

}

/* 
  const handleOnOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) closeAllPopups();
  };

  onOverlayClick={handleOnOverlayClick}
  /*
        */