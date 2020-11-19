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
  // popup успешного ответа на форму
  const popupAnswer = document.querySelector('.js-show-answer');

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
  pushElement.addEventListener('click', popupShow.bind(popupForm));

  // закрыть попап по кнопке
  Array.prototype.forEach.call(closeElements, function (el) {

    el.addEventListener('click', function () {
      let activePopup = document.querySelector('.' + popupConfig.popupActiveName);

      popupHide.call(activePopup);
    });
  });

  // закрытие попапа по клику вне контента окна
  Array.prototype.forEach.call(popupBlocks, function (el) {

    el.addEventListener('click', function (e) {
      if (e.target === this) popupHide.call(el);
    });
  });

  // отправка формы
  const urlForm = 
  $('.popup__form').on('submit', function(e) {
    e.preventDefault();

    const form = $(this);
    const formData = form.serialize();
    const preloader = $('.popup__preloader');
    const answerError = $('.popup__error');
    
    form.hide();
    answerError.hide();
    preloader.show();      

    $.post('/src/form.php', formData, function(answer) {
      // успех        
      if (answer.result == 'success') {
        popupHide.call(popupForm);
        popupShow.call(popupAnswer);
        pushElement.removeEventListener('click', popupShow.bind(popupForm));
        pushElement.addEventListener('click', popupShow.bind(popupAnswer));
      }
      //ошибка
      if (answer.result == 'error') {
        let errorText = 'Ошибка:\r\n' + answer.status;
        answerError.html(errorText);
        preloader.hide();
        form.show();
        answerError.show();
      }
    }, 'json');
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