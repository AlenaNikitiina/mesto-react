import {useEffect, useState} from "react";
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api.js';


export default function App () {
  // стейты(переменные) (привязан к одной ф и не выходит за пределы )
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]             = useState (false); // форма поменять имя работу \ ф-ия юз возвр массив в кот 2 элемента; текущие значение и ф-ия сеттер для его изм
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen]           = useState (false); // форма доб фотку
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen]              = useState (false); // форма смена аватара
  const [isWithSubmmitDeletePopupOpen, setIsWithSubmmitDeletePopupOpen] = useState (false); // форма подтверждения удаления карточки
  const [selectedCard, setSelectedCard]                                 = useState (null); // zoom при клике на фото

  const [userInfo, setUserInfo] = useState({}); // для апи
  const [cards, setCard]        = useState([]);

  // ф состоит из колбэка(в кот находится запрос) и массива
  //(он не обязан-й, но без будет на любое нажатие вызываться useEffect. А с пустым массивом ток один раз при загрузке отработает)
  // а если положить конкретный is... будет следить за ним [isEditProfilePopupOpen] и перерис
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
    setIsEditProfilePopupOpen (true) // при этом перерисуется
  }

  function handleAddPlaceClick () {
    setIsEditAddPlacePopupOpen (true)
  }

  //function handleWithSubmmitDeleteClick () {
    //setIsWithSubmmitDeletePopupOpen (true)}
 
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleOverlayClick (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen (false);
    setIsEditAvatarPopupOpen (false);
    setIsEditAddPlacePopupOpen (false);
    setIsWithSubmmitDeletePopupOpen (false);
    setSelectedCard (null);
  }


  return (
    <div className="App page">
      <Header />
      <Main 
        handleEditAvatarClick = {handleEditAvatarClick} // передаем через пропс ф-ии, лучше одинаковые
        handleEditProfileClick = {handleEditProfileClick}
        handleAddPlaceClick = {handleAddPlaceClick} 
        //handleWithSubmmitDeleteClick = {handleWithSubmmitDeleteClick}
        onCardClick={handleCardClick} // zoom f

        userName = {userInfo.name}
        userDescription = {userInfo.about}
        userAvatar = {userInfo.avatar}
        cards = {cards}
      />
      <Footer />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={setSelectedCard}
        onOverlayClick={handleOverlayClick}>
      </ImagePopup>

      {isEditProfilePopupOpen && closeAllPopups && (
        <PopupWithForm 
          name ="edit" title="Редактировать профиль" 
          isOpen = "popup_opened" onClose={closeAllPopups} onOverlayClick={handleOverlayClick} >
            <input className="form__input popup__input nameInput" id="nickName" type="text" minLength="2" maxLength="40" placeholder="Имя" required/>
            <span className="form__input-error nickName-error"></span>
            <input className="form__input popup__input jobInput" id="about" type="text" minLength="2" maxLength="200" placeholder="О себе" required />
            <span className="form__input-error about-error"></span>
        </ PopupWithForm>
      )}

      {isEditAddPlacePopupOpen && closeAllPopups && (
        <PopupWithForm 
          name="add" title="Новое место" 
          isOpen = "popup_opened" onClose={closeAllPopups} onOverlayClick={handleOverlayClick}>
            <input className="form__input popup__input titleInput" type="text" id="title" minLength="2" maxLength="30" placeholder="Название" required />
            <span className="form__input-error title-error"></span>
            <input className="form__input popup__input linkInput" type="url" id="link" placeholder="Ссылка на картинку" required/>
            <span className="form__input-error link-error"></span>
        </ PopupWithForm>
      )}

      {isEiditAvatarPopupOpen && closeAllPopups && (
        <PopupWithForm 
          name ="change-avatar" title="Обновить аватар" 
          isOpen = "popup_opened" onClose={closeAllPopups} onOverlayClick={handleOverlayClick}>
            <input className="form__input popup__input linkInput" type="url" id="avatarlink" placeholder="Ссылка на картинку" required/>
            <span className="form__input-error avatarlink-error"></span>
        </ PopupWithForm>
      )}

     {isWithSubmmitDeletePopupOpen && closeAllPopups && (
        <PopupWithForm 
          name="delete-card" title="Вы уверены?" 
          isOpen = "popup_opened" onClose={closeAllPopups} onOverlayClick={handleOverlayClick}>
        </ PopupWithForm>
      )}

    </div>
  )

}

