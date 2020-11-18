$(function () {
  $('.expand__title').on('click', function () {
    expand.call(this, 'expand__text');
  });
});


// target (string) = имя класса скрываемого/показываемого контента
// duration (integer) = скорость анимации слайда
// в this должен передаваться элемент, по которому произведён клик
function expand(target, duration = 400) {
  const targetClass = '.' + target;
  const visible = target + '_visible';
  const visibleClass = '.' + visible;

  $(visibleClass).slideUp(duration).removeClass(visible);
  $(this).parent().find(targetClass).slideDown(duration).addClass(visible);
}