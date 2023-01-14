import profileAvatar from '../images/profile__avatar.jpg' // базовый аватар

function Main () {
  return (
  <>
  <div className="page">
    <section className="profile">
      <div className="profile__description">
        <img className="profile__avatar" src={profileAvatar} alt="Ваш аватар" />
        <div className="profile__info">
          <h1 className="profile__name titleName">name</h1>
          <p className="profile__job titleJob">job</p>
          <button className="profile__edit-button" type="button"></button>
        </div>
      </div>
        <button className="profile__add-button" type="button"></button>
    </section>
  
    <section className="elements" aria-label="ваши фотографии">
      <ul className="elements__list">
      </ul>
    </section>
  
    <div className="popup popup_edit">
      <div className="popup__container form">
        <button className="popup__close-button" type="button"></button>
        <h3 className="popup__title">Редактировать профиль</h3>
        <form action="#" name="form_edit" className="form__edit popup__form" novalidate>
          <input className="form__input popup__input nameInput" id="nickName" type="text" required minlength="2" maxlength="40" placeholder="Имя" />
          <span className="form__input-error nickName-error"></span>
          <input className="form__input popup__input jobInput" id="about" type="text" required minlength="2" maxlength="200" placeholder="О себе" />
          <span className="form__input-error about-error"></span>
          <button className="popup__save-button popup__button form__submit" type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <div className="popup popup_add">
      <div className="popup__container form">
        <button className="popup__close-button" type="button"></button>
        <h3 className="popup__title">Новое место</h3>
        <form action="#" name="form_add" novalidate className="form__add popup__form">
          <input className="form__input popup__input titleInput" type="text" id="title" minlength="2" maxlength="30" required placeholder="Название" autocomplete="off" />
          <span className="form__input-error title-error"></span>
          <input className="form__input popup__input linkInput" type="url" id="link" required placeholder="Ссылка на картинку" />
          <span className="form__input-error link-error"></span>
          <button className="popup__save-button popup__button form__submit" type="submit">Создать</button>
        </form>
      </div>
    </div>

    <div className="popup popup_zoom">
      <div className="popup__box">
        <figure className="popup__figure">
          <button className="popup__close-button" type="button"></button>
          <img className="popup__image" />
          <figcaption className="popup__figcaption"></figcaption>
        </figure>
      </div>
    </div>

    <div className="popup popup_delete-card">
      <div className="popup__container form">
        <form action="#" className="popup__form" id="delete-card">
          <button className="popup__close-button" type="button"></button>
          <h3 className="popup__title">Вы уверены?</h3>
          <button className="popup__save-button popup__button form__submit" name="delete-card" type="submit">Да</button>
        </form>
      </div>
    </div>

    <div className="popup popup_change-avatar">
      <div className="popup__container form">
        <button className="popup__close-button" type="button"></button>
        <h3 className="popup__title">Обновить аватар</h3>
        <form action="#" name="form_avatar" novalidate className="form__avatar popup__form">
          <input className="form__input popup__input linkInput" type="url" id="avatarlink" required placeholder="Ссылка на картинку" />
          <span className="form__input-error avatarlink-error"></span>
          <button className="popup__save-button popup__button form__submit" type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <template className="element-template">
      <li className="elements__card">
        <article className="element">
          <button className="element__trash-button" type="button"></button>
          <img className="element__foto" />
          <h2 className="element__title"></h2>
          <button className="element__like" type="button"></button>
          <span className="element__like-counter"></span>
        </article>
      </li>
    </template>

  </div>
  </>
  )
}

export default Main;