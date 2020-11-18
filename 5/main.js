document.addEventListener('DOMContentLoaded', function(){
  const pushElem = document.getElementsByClassName('push')[0];
  const closeElem = document.getElementsByClassName('popup__close')[0];
  const popupElem = document.getElementsByClassName('popup')[0];

  pushElem.addEventListener('click', popupOn.bind(this, 'popup'));
  closeElem.addEventListener('click', popupOff.bind(this, 'popup'));
  popupElem.addEventListener('click', function(e) {
    if (e.target === popupElem) popupOff('popup');
  });
});

function popupOn(clas) {
  const elem = document.getElementsByClassName(clas)[0];
  elem.classList.add(clas + '_active');
}

function popupOff(clas) {
  const elem = document.getElementsByClassName(clas)[0];
  elem.classList.remove(clas + '_active');
}