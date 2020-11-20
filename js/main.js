const popupConfig = {
  // имя класса попап окон
  popupClassName: 'popup',
  // имя класса видимого попапа
  popupActiveName: 'popup_visible'
};

document.addEventListener('DOMContentLoaded', function () {
/* элементы popup */
  // кнопка вызова формы
  const pushElement = document.querySelector('.js-open-form');
  // коллекция кнопок закрытия popup
  const closeElements = document.querySelectorAll('.js-close-popup');
  // коллекция попап окон
  const popupBlocks = document.querySelectorAll('.' + popupConfig.popupClassName);
  // popup с формой
  const popupForm = document.querySelector('.js-show-form');
  // popup с прелоадером
  const popupPreloader = document.querySelector('.js-show-preloader');
  // popup успешного ответа на форму
  const popupAnswer = document.querySelector('.js-show-answer');
  // popup ошибки ответа на форму
  const popupError = document.querySelector('.js-show-error');

  // каруселька
  $('.owl-carousel').owlCarousel({
    items: 3,
    margin: 10,
    loop: true,
    autoplay: true,
    nav: true,
    navText: ['', ''],
    dots: false
  });

  // открыть попап с формой
  changePopup.call(pushElement, false, popupForm);
  //pushElement.addEventListener('click', popupShow.bind(popupForm));

  // закрыть попап по кнопке
  Array.prototype.forEach.call(closeElements, function(el) {

    el.addEventListener('click', function () {
      let activePopup = document.querySelector('.' + popupConfig.popupActiveName);

      popupHide.call(activePopup);
    });
  });

  // закрытие попапа по клику вне контента окна
  Array.prototype.forEach.call(popupBlocks, function(el) {

    el.addEventListener('click', function (e) {
      if (e.target === this) popupHide.call(el);
    });
  });

  // отправка формы
  
  $('.popup__form').on('submit', function (e) {
    e.preventDefault();
    const urlForm = '/src/form.php';

    submitForm.call(this, urlForm, pushElement, popupForm, popupAnswer, popupError, popupPreloader);
  });

  // появление эелементов с плавной загрузкой видимые при открытии страницы
  smoothLoading('js-smooth-scroll__item', 'js-smooth-scroll__item_visible');
  // плавная загрузка для оставшихся элементов
  window.addEventListener('scroll', function () {
    smoothLoading('js-smooth-scroll__item', 'js-smooth-scroll__item_visible', 300)
  });
  
  // раскрывающиеся списки
  $('.js-expand__title').on('click', function () {
    expandElement.call(this, 'js-expand__text', 'js-expand__text_visible');
  });
});

/* функции вызова и скрытия popup */
// в контексте объект попап окна
function popupShow() {
  this.classList.add(popupConfig.popupActiveName);
}

function popupHide() {
  this.classList.remove(popupConfig.popupActiveName);
}

/* функция обработки сабмита формы*/
// контекст - сама форма
// url = url post запроса
// launcher = элемент, открывающий попап
// form = попап с формой
// success = попап с успешным ответом
// error = попап с ошибкой
// preloader = попап с прелоадером (необязательно)
function submitForm(url, launcher, form, success, error, preloader = false) {  
  const formData = $(this).serialize();

  //пярчем форму
  popupHide.call(form);
  // показываем прелоадер
  if (preloader) {
    popupShow.call(preloader);
    changePopup.call(launcher, form, preloader);
  }
  // отправляем данные, ждём ответ
  // answer.result = 'success' || 'error'
  // answer.status - данные по ошибке, если нет ошибки = 200
  $.post(url, formData, function (answer) {
    // убираем прелоадер
    if (preloader) popupHide.call(preloader);
    // обрабатываем ответ
    if (answer.result == 'success') {
      let popup = preloader ? preloader : form;
      popupShow.call(success);
      changePopup.call(launcher, popup, success);
    }
    if (answer.result == 'error') {
      popupShow.call(error);
      setTimeout(function () {
        popupHide.call(error);
        popupShow.call(form);
      }, 2500);
    }
  }, 'json');
}
/* смена вызова попап окна по клику на элемент */
// this = элемент, вызывающий попап
// oldPopup = текущий попап
// newPopup = активриуемый попап
function changePopup(oldPopup, newPopup) {
  this.removeEventListener('click', popupShow.bind(oldPopup));
  this.addEventListener('click', popupShow.bind(newPopup));
}

/* функиця плавной загрузки элементов */
// className = имя класса для элемента с плавным появлением
// classNameVisible = имя класса для видимого элемента
// timeout = задержка перед появлением в мс (дефолтное 0)
function smoothLoading(className, classNameVisible, timeout = 0) {
  const smoothElements = document.querySelectorAll('.' + className);

  Array.prototype.forEach.call(smoothElements, function (el) {

    if (!el.classList.contains(classNameVisible) && isVisible(el)) {
      setTimeout(function() {
        el.classList.add(classNameVisible);
      }, timeout);
    }
  });
}

/* проверка видимости элемента в окне браузера */
// element = элемент, который надо проверить
function isVisible(element) {
  let offset = element.offsetTop;
  let parent = element.offsetParent;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return window.pageYOffset + window.innerHeight > offset;
}

/* функция раскрывающихся списков */
// target = имя класса скрываемого/показываемого контента
// visible = имя класса раскрытого элемента
// duration = скорость анимации слайда в мс (по дефолту 400)
// в this должен передаваться элемент, по которому произведён клик
function expandElement(target, visible, duration = 400) {
  const targetClass = '.' + target;
  const visibleClass = '.' + visible;
  const elemID = $(this).attr('data-expand-id');
  const expandingElement = $(targetClass + '[data-expand-id="' + elemID + '"]');
  const targetSelf = ( $(this).attr('data-expanded') === 'true' ) ? true : false;

  $(visibleClass).slideUp(duration).removeClass(visible);
  $('[data-expanded="true"').attr('data-expanded', 'false');
  if (!targetSelf) {
    expandingElement.slideDown(duration).addClass(visible);
    $(this).attr('data-expanded', 'true');
  }
}

// ЗАДАНИЕ №9
var matrixExample = [
  [ 1, 2, 3, 4 ],
  [ 4, 5, 6, 5 ],
  [ 7, 8, 9, 7 ],
  [ 7, 8, 9, 7 ]
];

function sumUpDiagonals(matrix) {
  const length = matrix.length - 1;
  let main = 0;
  let scnd = 0;

  matrix.forEach( (el, index) => {
    console.log(el);
    main += el[index];
    scnd += el[length - index];
  });

  let answer = 'Сумма основной диагонали = ' + main + ';\r\nСумма вторичной диагонали = ' + scnd;

  return answer;
}

console.log(sumUpDiagonals(matrixExample));