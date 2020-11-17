document.addEventListener('DOMContentLoaded', function(){
  const push = document.getElementsByClassName('push')[0];
  const close = document.getElementsByClassName('popup__close')[0];
  const popup = document.getElementsByClassName('popup')[0];

  push.addEventListener('click', popupOn.bind(this, 'popup'));
  close.addEventListener('click', popupOff.bind(this, 'popup'));
  popup.addEventListener('click', function(e) {
    if (e.target === popup) popupOff('popup');
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