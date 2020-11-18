document.addEventListener('DOMContentLoaded', function () {
  /* элементы popup */
  const pushElem = document.getElementsByClassName('push')[0];// кнопка вызова
  const closeElem = document.getElementsByClassName('popup__close')[0];// кнопка закрытия
  const popupElem = document.getElementsByClassName('popup')[0];// сам popup


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

  // popup
  pushElem.addEventListener('click', popupShow.bind(this, 'popup'));
  closeElem.addEventListener('click', popupHide.bind(this, 'popup'));
  popupElem.addEventListener('click', function(e) {
    if (e.target === popupElem) popupHide('popup');
  });

  // отправка формы
  $('.popup__form').on('submit', function(e) {
    e.preventDefault();
    
    const form = $(e.target);
    const formData = {};
    const preloader = $('.popup__preloader');
    const answerSuccess = $('.popup__success');
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
          preloader.hide();
          answerSuccess.show();
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
  smoothLoading('smooth-scroll__item');
  // плавная загрузка для оставшихся элементов
  window.addEventListener('scroll', smoothLoading.bind(this, 'smooth-scroll__item', 300));
  
  // раскрывающиеся списки
  $('.expand__title').on('click', function () {
    expandElement.call(this, 'expand__text');
  });
});

/* функции вызова и скрытия popup */
// className = имя класса popup контейнера
function popupShow(className) {
  const elem = document.getElementsByClassName(className)[0];
  elem.classList.add(className + '_visible');
}
function popupHide(className) {
  const elem = document.getElementsByClassName(className)[0];
  elem.classList.remove(className + '_visible');
}

function sendForm(e) {
  e.preventDefault();
  console.log(this);
}

/* функиця плавной загрузки элементов */
// className = имя класса для элемента с плавным появлением
// timeout = задержка перед появлением в мс (дефолтное 0)
function smoothLoading(className, timeout = 0) {
  const pageOffset = window.pageYOffset + window.innerHeight;
  const smoothElements = document.getElementsByClassName(className);
  const visible = className + '_visible';

  Array.prototype.forEach.call(smoothElements, function (el) {
    let elemOffset = el.offsetTop;

    if (!el.classList.contains(visible) && pageOffset > elemOffset) {
      setTimeout(function() {
        el.classList.add(visible);
      }, timeout);
    }
  });
}

/* функция раскрывающихся списков */
// target (string) = имя класса скрываемого/показываемого контента
// duration (integer) = скорость анимации слайда в мс (по дефолту 400)
// в this должен передаваться элемент, по которому произведён клик
function expandElement(target, duration = 400) {
  const targetClass = '.' + target;
  const visibleName = target + '_visible';
  const visibleClass = '.' + visibleName;
  const expandingElement = $(this).parent().find(targetClass);
  const targetSelf = expandingElement.hasClass(visibleName) ? true : false;

  $(visibleClass).slideUp(duration).removeClass(visibleName);
  if (!targetSelf) {
    expandingElement.slideDown(duration).addClass(visibleName);
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