document.addEventListener( 'DOMContentLoaded', smoothEmerging.bind(this, 'smooth-scroll__item', 0) );
window.addEventListener( 'scroll', smoothEmerging.bind(this, 'smooth-scroll__item', 300) );


function smoothEmerging(clas, timeout) {
  const scroll = window.pageYOffset + window.innerHeight;
  const elems = document.getElementsByClassName(clas);
  const visible = clas + '_visible';

  Array.prototype.forEach.call(elems, function (el) {
    let offset = el.offsetTop;

    if (!el.classList.contains(visible) && scroll > offset) {
      setTimeout(function() {
        el.classList.add(visible);
      }, timeout);
    }
  });
  
}