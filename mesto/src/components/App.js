import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import {useState} from "react";


export default function App () {
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState (false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState (false);
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState (false);
  const [isCloseAllPopups, setIsCloseAllPopups] = useState (true);

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen (true)
  };

  function handleAddPlaceClick() {
    setIsEditAddPlacePopupOpen (true)
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
      />
      <Footer />
      {isEditProfilePopupOpen && (
        <PopupWithForm name ="profile" title="Редактировать профиль" isOpen = "popup_opened" onClose={closeAllPopups} >
          <input className="form__input popup__input nameInput" id="nickName" type="text" required minLength="2" maxLength="40" placeholder="Имя" />
          <span className="form__input-error nickName-error"></span>
          <input className="form__input popup__input jobInput" id="about" type="text" required minLength="2" maxLength="200" placeholder="О себе" />
          <span className="form__input-error about-error"></span>
        </ PopupWithForm>
      )}

    </div>
  )

}


//isEditProfilePopupOpen && isCloseAllPopups &&
    //setIsEditAvatarPopupOpen (false)
    //setIsEditProfilePopupOpen (false)
    //setIsEditAddPlacePopupOpen (false)