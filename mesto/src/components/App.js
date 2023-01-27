import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from "./EditProfilePopup";



export default function App () {
  // стейты(переменные) (привязан к одной ф и не выходит за пределы, выше)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]             = useState (false); // форма поменять имя работу \ ф-ия юз возвр массив в кот 2 элемента; текущие значение и ф-ия сеттер для его изм
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen]           = useState (false); // форма доб фотку
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen]              = useState (false); // форма смена аватара
  const [isWithSubmmitDeletePopupOpen, setIsWithSubmmitDeletePopupOpen] = useState (false); // форма подтверждения удаления карточки
  const [selectedCard, setSelectedCard]                                 = useState (null); // zoom при клике на фото

  //const [userInfo, setUserInfo] = useState({}); // для апи dont need
  const [cards, setCard]              = useState([]); // для апи
  const [currentUser, setCurrentUser] = useState({}) // переменную состояния currentUser
  const [isLoading, setIsLoading]     = useState(false) // идет сохранение загрузка

  // ф состоит из колбэка(в кот находится запрос) и массива
  //(он не обязан-й, но без будет на любое нажатие вызываться useEffect. А с пустым массивом ток один раз при загрузке отработает)
  // а если положить конкретный is... будет следить за ним [isEditProfilePopupOpen] и перерис
  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(( [data, cards] ) => {
        //setUserInfo (data);
        setCurrentUser (data);
        setCard (cards);
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи: ${err}`);
      })
    }, [])
  

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true)
  }

/*

// 3 редактирования профиля
function handlerSubmitProfile(value) {
  setIsLoading(true);
  api.editingProfile (value.name, value.about) // м из апи - изм имя, работу и сохранить
    .then((result) => {
      setCurrentUser(result.name, result.about, result.avatar); // вызвали М из UserInfo кот принимает новые данные чела и добавляет их на страницу
      closeAllPopups();
    })
    .catch(err => {
      console.log("Не получилось изменить данные: ", err);
    })
    .finally(() => {
      setIsLoading(false);
    })
}

/*
  // 6 меняем аватар
  function handleChangeAvatar (value) {
  setIsLoading(true);
  api.updateAvatar(value)
    .then((result) => {
      setCurrentUser(result.avatar);
      closeAllPopups();
  })
  .catch(err => {
    console.log("Не получилось обновить аватар: ", err);
  })
  .finally(() => {
    setIsLoading(false);
  })
}

handleChangeAvatar={handleChangeAvatar}
*/


  function handleEditProfileClick () {
    setIsEditProfilePopupOpen (true) // при этом перерисуется
  }

  function handleAddPlaceClick () {
    setIsEditAddPlacePopupOpen (true)
  }

 // удалить карточку
  function handleConfimDeleteCard (card) {
    setIsWithSubmmitDeletePopupOpen (true);
    setSelectedCard(card);
  }
 
  // для zoom
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

  // from EditProfilePopup обработчика 
  function handleUpdateUser (userData) {
    setIsLoading(true);
    api.setUserInfo (userData)
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

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App page">
      <Header />
      <Main 
        handleEditAvatarClick = {handleEditAvatarClick} // передаем через пропс ф-ии, лучше одинаковые
        handleEditProfileClick = {handleEditProfileClick} // поппапы
        handleAddPlaceClick = {handleAddPlaceClick} 
        onCardClick={handleCardClick} // zoom f

        cards = {cards}
        onClickDeleteCard={handleConfimDeleteCard} // удалить карточку
        onCardLike={handlePutLike} // лайк
      />
      <Footer />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={setSelectedCard}
        onOverlayClick={handleOverlayClick} >
      </ImagePopup>

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
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

      {isEiditAvatarPopupOpen && closeAllPopups && (
        <PopupWithForm 
          name ="change-avatar" title="Обновить аватар" 
          isOpen = "popup_opened" onClose={closeAllPopups} onOverlayClick={handleOverlayClick} >
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
  </CurrentUserContext.Provider>
  )

}


//<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
