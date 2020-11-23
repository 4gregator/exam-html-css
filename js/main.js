class PopupConfig {
  constructor(className, classNameActive) {
    // имя класса попап окон
    this.className = className;
    // имя класса видимого попапа
    this.classNameActive = classNameActive;
  }
  
  /* показать попап */
  //popup = объект попап окна
  show(popup) {
    this.hide();
    popup.classList.add(this.classNameActive);
  }

  /* закрыть открытый попап */
  hide() {
    const target = document.querySelector('.' + this.classNameActive);
    if (target) target.classList.remove(this.classNameActive);
  }
}



// объект для хранения данных кнопки вызова попап окна с формой
let initFormPopup = {
  element: undefined,
  hideHadler: undefined
};


document.addEventListener('DOMContentLoaded', function () {
/* элементы popup */
  // инициализируем конфиг попап окон
  const popupControl = new PopupConfig('popup', 'popup_visible');
  // кнопка вызова формы
  initFormPopup.element = document.querySelector('.js-open-form');
  // коллекция кнопок закрытия popup
  const closeElements = document.querySelectorAll('.js-close-popup');
  // коллекция попап окон
  const popupBlocks = document.querySelectorAll('.' + popupControl.className);
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

  // добавляем ивент открытия попапа с формой
  initFormPopup.element.addEventListener('click', function () {
    popupControl.show(popupForm);
  });
  // changePopup(initFormPopup, popupForm);
  // launcherData.hideHadler = showPopup.bind(newPopup);
  // launcherData.element.addEventListener('click', launcherData.hideHadler);

  // закрыть попап по кнопке
  Array.prototype.forEach.call(closeElements, function(el) {

    el.addEventListener('click', function () {
      let activePopup = document.querySelector('.' + popupControl.classNameActive);

      popupControl.hide();
    });
  });

  // закрытие попапа по клику вне контента окна
  Array.prototype.forEach.call(popupBlocks, function(el) {

    el.addEventListener('click', function (e) {
      if (e.target === this) popupControl.hide();
    });
  });

  // отправка формы
  $('.popup__form').on('submit', function (e) {
    const urlForm = '/src/form.php';
    const self = this;
    const onSuccess = function () {
      popupControl.show(popupAnswer);
    };
    const onError = function (status) {
      popupControl.show(popupError);
      setTimeout(function () {
        showInputErrors.call(self, status, 'popup__input_error', 'popup__error-msg');
        popupControl.show(popupForm);
      }, 1500);
    };
    
    e.preventDefault();

    popupControl.show(popupPreloader);
    submitForm.call(this, urlForm, onSuccess, onError);
  });

  // появление эелементов с плавной загрузкой видимые при открытии страницы
  loadSmooth('js-smooth-scroll__item', 'js-smooth-scroll__item_visible');
  // плавная загрузка для оставшихся элементов
  window.addEventListener('scroll', function () {
    loadSmooth('js-smooth-scroll__item', 'js-smooth-scroll__item_visible', 300)
  });
  
  // раскрывающиеся списки
  $('.js-expand__title').on('click', function () {
    expandElement.call(this, 'js-expand__text', 'js-expand__text_visible');
  });
});

/* функция обработки сабмита формы*/
// контекст - сама форма
// url = url post запроса
// onSuccess = функция обработки успешной отправки
// onError = функция обработки ошибки отправки
function submitForm(url, onSuccess, onError) {  
  const formData = $(this).serialize();

  // отправляем данные, ждём ответ
  // answer.success - ответ с сервера об успешности отправки формы true == success || false == error
  // answer.status - данные по ошибке, если нет ошибки = 200
  $.post(url, formData, function (answer) {
    // обрабатываем ответ
    if (answer.success) {
      onSuccess();
    } else {
      onError(answer.status);
    }
  }, 'json');
}

// контекст = форма
// errors = массив имён инпутов с ошибкой
// className = имя класса ошибки инпута
// errorClassName = имя класса с текстом ошибки
function showInputErrors(errors, className, errorClassName) {
  let self = this;
  errors.forEach(function (name, index) {
    let input = $(self).find('[name="' + name + '"]');
    let errorMsg = input.siblings('.' + errorClassName);
    
    errorMsg.show();
    input.addClass(className)
      .on('keydown', function () {
        input.removeClass(className);
        errorMsg.hide();
      });
  });
}

/* меняем активное попап окно, вызываемое попап лаунчером */
// launcherData = объект для хранения данных кнопки вызова попап
// newPopup = активриуемый попап
// oldPopup = текущий попап
// function changePopup(launcherData, newPopup, oldPopup = false) {
//   if (oldPopup) {
//     launcherData.element.removeEventListener('click', launcherData.hideHadler);
//   }
//   //showPopup.bind
//   launcherData.hideHadler = popupControl.show(newPopup);
//   launcherData.element.addEventListener('click', launcherData.hideHadler);
// }

/* функиця плавной загрузки элементов */
// className = имя класса для элемента с плавным появлением
// classNameVisible = имя класса для видимого элемента
// timeout = задержка перед появлением в мс (дефолтное 0)
function loadSmooth(className, classNameVisible, timeout = 0) {
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