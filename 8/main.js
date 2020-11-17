$(function () {
  $('.expand__title').on('click', function () {
    $('.expand__text_visible').slideUp().removeClass('expand__text_visible');
    $(this).parent().find('.expand__text').slideDown().addClass('expand__text_visible');

    // второй вариант через вызов функции
    //expand.call(this, 'expand__text');
  });
});


// target (string) = имя класса скрываемого/показываемого контента
// duration (integer) = скорость анимации слайда
function expand(target, duration = 400) {
  const targetClass = '.' + target;
  const visible = target + '_visible';
  const visibleClass = '.' + visible;

  $(visibleClass).slideUp(duration).removeClass(visible);
  $(this).parent().find(targetClass).slideDown(duration).addClass(visible);
}