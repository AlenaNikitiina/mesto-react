import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from "./EditProfilePopup";
import PopupWithSubmmitDelete from "./PopupWithSubmmitDelete";
import EditAvatarPopup from "./EditAvatarPopup";


export default function App () {
  // стейты(переменные) (привязан к одной ф и не выходит за пределы, выше)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]             = useState (false); // форма поменять имя работу \ ф-ия юз возвр массив в кот 2 элемента; текущие значение и ф-ия сеттер для его изм
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen]           = useState (false); // форма доб фотку
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen]              = useState (false); // форма смена аватара
  const [isWithSubmmitDeletePopupOpen, setIsWithSubmmitDeletePopupOpen] = useState (false); // форма подтверждения удаления карточки
  const [selectedCard, setSelectedCard]                                 = useState (null);  // zoom при клике на фото
  const [deletingCard, setDeletingCard]                                 = useState(null) // 

  const [cards, setCard]              = useState([]); // для апи ssss
  const [currentUser, setCurrentUser] = useState({}) // переменную состояния currentUser
  const [isLoading, setIsLoading]     = useState(false) // идет сохранение загрузка

  // ф состоит из колбэка(в кот находится запрос) и массива
  //(он не обязан-й, но без будет на любое нажатие вызываться useEffect. А с пустым массивом ток один раз при загрузке отработает)
  // а если положить конкретный is... будет следить за ним [isEditProfilePopupOpe] и перерис

  // от сервера получили данные о юзере и карточки
  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(( [data, cards] ) => {
        setCurrentUser (data);
        setCard (cards);
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи: ${err}`);
      })
  }, [] )

  //
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true)
  }
  
  // 6 меняем аватар
  function handleUpdateAvatar (data) {
  setIsLoading(true);
  api.updateAvatar(data)
    .then((newavatar) => {
      setCurrentUser(newavatar);
      closeAllPopups();
  })
  .catch(err => {
    console.log("Не получилось обновить аватар: ", err);
  })
  .finally(() => {
    setIsLoading(false);
  })
  }


  function handleEditProfileClick () {
    //console.log(11111111111)
    setIsEditProfilePopupOpen (true) // при этом перерисуется
  }

  function handleAddPlaceClick () {
    setIsEditAddPlacePopupOpen (true)
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

  //клик на оверлэй
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
    setDeletingCard(null);
  }



  
  //const [userInfo, setUserInfo] = useState({}); // для апи
  // обработчик изменения данных пользователя. имя работа. from EditProfilePopup
  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api.editingProfile(name, about)
      .then ((newUserData) => {
        setCurrentUser(newUserData); // обновили
        closeAllPopups();
      })
      .catch(err => {
        console.log("Не получилось изменить данные: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // 7 Функция поставить и снять лайк
  function handlePutLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    if (!isLiked) {
      api.addLike(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
        .then((newCard) => {
          setCard((state) => 
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Не получилось поставить like: ", err);
        });
    } else {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCard((state) => 
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Не получилось снять like: ", err);
        });
    }
  }

  // удалить карточку 
  function handleCardDelete(card) {
    setIsLoading(true); 
      api.removeCard(card._id)
        .then(() => {
          setCard((cards) => cards.filter((c) => c._id !== card._id));
          //console.log(setCard)
          closeAllPopups();
        })
        .catch((err) => {
          console.log("Ошибка при удалении карточки: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        })
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

      <ImagePopup
        card={selectedCard}
        isOpen={setSelectedCard}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick} >
      </ImagePopup>

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onOverlayClick={handleOverlayClick}
        isLoading={isLoading}
      />

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

      <EditAvatarPopup
        isOpen={isEiditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

     <PopupWithSubmmitDelete
        isOpen ={isWithSubmmitDeletePopupOpen}
        onClose={closeAllPopups}
        onConfirmDelete={handleCardDelete}
        onOverlayClick={handleOverlayClick}
        isLoading={isLoading}
        currentCard={deletingCard}
      />

    </div>
  </CurrentUserContext.Provider>
  )

}

