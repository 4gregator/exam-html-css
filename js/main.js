const popupConfig = {
  // класс попап окон
  popupClassName: 'popup',
  // постфикс видимого попапа
  popupActivePostfix: '_visible'
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
      let activePopup = document.querySelector('.' + popupConfig.popupClassName + popupConfig.popupActivePostfix);

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
  $('.popup__form').on('submit', function(e) {
    e.preventDefault();
    
    const form = $(e.target);
    const formData = {};
    const preloader = $('.popup__preloader');
    const answerError = $('.popup__error');

    $(form).find('.popup__input').each(function() {
      formData[this.name] = $(this).val();
    });
    

    if (form[0].reportValidity()) {
      form.hide();
      answerError.hide();
      preloader.show();      

      $.post('/src/form.php', formData, function(answer) {
        // успех        
        if (answer.result == 'success') {
          popupHide.call(popupForm);
          popupShow.call(popupAnswer);
        }
        //ошибка
        if (answer.result == 'error') {
          let errorText = 'Ошибка:<br>' + answer.status;
          answerError.html(errorText);
          preloader.hide();
          form.show();
          answerError.show();
        }
      }, 'json');
    }
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

  /* функция раскрывающихся списков */
  // target = имя класса скрываемого/показываемого контента
  // visible = имя класса видимого объекта
  // duration = скорость анимации слайда в мс (по дефолту 400)
  // в this должен передаваться элемент, по которому произведён клик
  function expandElement(target, visible, duration = 400) {
    const targetClass = '.' + target;
    const visibleClass = '.' + visible;
    const expandingElement = $(this).parent().find(targetClass);
    const targetSelf = expandingElement.hasClass(visibleName) ? true : false;
  
    $(visibleClass).slideUp(duration).removeClass(visibleName);
    if (!targetSelf) {
      expandingElement.slideDown(duration).addClass(visibleName);
    }
  }
});

/* функции вызова и скрытия popup */
// в контексте объект попап окна
function popupShow() {
  this.classList.add(popupConfig.popupClassName + popupConfig.popupActivePostfix);
}

function popupHide() {
  this.classList.remove(popupConfig.popupClassName + popupConfig.popupActivePostfix);
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