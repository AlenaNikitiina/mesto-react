// import

function Main () {
  return (
  <>
    <section className="profile">
      <div className="profile__description">
        <img className="profile__avatar" src="<%=require('./images/profile__avatar.jpg')%>"alt="Ваш аватар" />
          <div className="profile__info">
            <h1 className="profile__name titleName"></h1>
            <p className="profile__job titleJob"></p>
            <button className="profile__edit-button" type="button"></button>
          </div>
        </div>
        <button className="profile__add-button" type="button"></button>
    </section>
    
    <section className="elements" aria-label="ваши фотографии">
      <ul className="elements__list">
      </ul>
    </section>
  </>
  )
}

export default Main;