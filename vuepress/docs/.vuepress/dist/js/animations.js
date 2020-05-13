var scroll = window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        };

var elementsToShow = document.querySelectorAll('\
.show-on-scroll,\n\
.left-image img,\n\
.right-image img.img-responsive,\n\
.left-image h2,\n\
.left-image p,\n\
.paragrafo-flex .card,\n\
.left-image a.entando-banner-btn\n\
\n\
     ');

function loop() {

    elementsToShow.forEach(function (element) {
        if (isElementInViewport(element)) {
            element.classList.add('start-animation');
        } else {
            element.classList.remove('start-animation');
        }
    });

    scroll(loop);
}
loop();

function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
            (rect.top <= 0
                    && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            );
}