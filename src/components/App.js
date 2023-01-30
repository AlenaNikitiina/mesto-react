import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from "./EditProfilePopup";
import PopupWithSubmmitDelete from "./PopupWithSubmmitDelete";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function App () {
  // стейты(переменные) (привязан к одной ф и не выходит за пределы, выше)
  // ф-ия юз возвр массив в кот 2 элемента; текущие значение и ф-ия сеттер для его изм

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState (false); // форма поменять имя работу
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState (false); // форма доб фотку
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState (false); // форма смена аватара
  const [isWithSubmmitDeletePopupOpen, setIsWithSubmmitDeletePopupOpen] = useState (false); // форма подтверждения удаления карточки
  const [selectedCard, setSelectedCard] = useState (null);  // zoom при клике на фото
  const [deletingCard, setDeletingCard] = useState(null) // = false

  const [cards, setCards]                 = useState([]); // для апи ssss
  const [currentUser, setCurrentUser]     = useState({}) // переменную состояния currentUser
  const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка

  // ф состоит из колбэка(в кот находится запрос) и массива
  //(он не обязан-й, но без будет на любое нажатие вызываться useEffect. А с пустым массивом ток один раз при загрузке отработает)
  // а если положить конкретный is... будет следить за ним [isEditProfilePopupOpe] и перерис

  // от сервера получили данные о юзере и карточки
  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(( [data, cards] ) => {
        setCurrentUser (data);
        setCards (cards);
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи: ${err}`);
      })
  }, [] )

    
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen (true) // при этом перерисуется
  }

  function handleAddPlaceClick () {
    setIsEditAddPlacePopupOpen (true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true)
  }

 // удалить карточку
  function handleConfimDeleteCard (card) {
    setIsWithSubmmitDeletePopupOpen (true);
    setDeletingCard(card);
  }
 
  // для zoom
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //клик на оверлэй, вне формы
  function handleOverlayClick (evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }
  /* if (evt.target.classList.contains('popup_opened')) // (evt.target === evt.currentTarget)*/

  function closeAllPopups () {
    setIsEditProfilePopupOpen (false);
    setIsEditAddPlacePopupOpen (false);
    setIsEditAvatarPopupOpen (false);
    setIsWithSubmmitDeletePopupOpen (false);
    setSelectedCard (null);
    setDeletingCard(null);
  }

  // обработчик изменения данных пользователя. имя работа. from EditProfilePopup
  function handleUpdateUser(name, about) {
    setRenderLoading(true);

    api.editingProfile(name, about)
      .then ((newUserData) => {
        setCurrentUser(newUserData); // обновили
        closeAllPopups();
      })
      .catch(err => {
        console.log("Не получилось изменить данные: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  // меняем аватар
  function handleUpdateAvatar (data) {
    setRenderLoading(true);

    api.updateAvatar(data)
      .then((newavatar) => {
        setCurrentUser(newavatar);
        closeAllPopups();
      })
      .catch(err => {
        console.log("Не получилось обновить аватар: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  // добавить новую карточку
  function handleAddPlaceSubmit (name, link) {
    setRenderLoading(true);

    api.uploadNewCard (name, link) // метод из апи - добавить нов карточку с именем и ссылкой
    .then((newCard) => {
      setCards( [newCard, ...cards] );
      closeAllPopups();
    })
    .catch(err => {
      console.log("Не получилось добавить новую карточку: ", err);
    })
    .finally(() => {
      setRenderLoading(false);
    })
  };

  // удалить карточку 
  function handleCardDelete(card) {
    setRenderLoading(true); 

    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при удалении карточки: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  // поставить и снять лайк
  function handlePutLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
  
    if (!isLiked) {
      api.addLike(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
        .then((newCard) => {
          setCards((state) => 
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Не получилось поставить like: ", err);
        });
    } else {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => 
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Не получилось снять like: ", err);
        });
    }
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App page">
      <Header />
      <Main
        handleEditAvatarClick = {handleEditAvatarClick}   // передаем через пропс ф-ии, лучше одинаковые
        handleEditProfileClick = {handleEditProfileClick} // поппап редактирования
        handleAddPlaceClick = {handleAddPlaceClick}       // попап доб нов карточку
        onCardClick={handleCardClick} // zoom f

        cards = {cards}
        onClickDeleteCard={handleConfimDeleteCard} // удалить карточку
        onCardLike={handlePutLike} // лайк
      />
      <Footer />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onOverlayClick={handleOverlayClick}
        renderLoading={renderLoading}
      />

      <AddPlacePopup
        isOpen={isEditAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onAddPlace={handleAddPlaceSubmit}
        renderLoading={renderLoading}
      />

      <EditAvatarPopup
        isOpen={isEiditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onOverlayClick={handleOverlayClick}
        renderLoading={renderLoading}
      />

     <PopupWithSubmmitDelete
        isOpen ={isWithSubmmitDeletePopupOpen}
        onClose={closeAllPopups}
        onConfirmDelete={handleCardDelete}
        currentCard={deletingCard}
        onOverlayClick={handleOverlayClick}
        renderLoading={renderLoading}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={setSelectedCard}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      />

    </div>
  </CurrentUserContext.Provider>
  )

}
