// Main block typing
let typed = new Typed('#element', {
    strings: [
        'I create web interfaces.',
        'I`am engaged in the development and modification of websites.',
    ],
    typeSpeed: 80,
    loop: true,
});

// Say hello button
let sayHello = new Typed('#contact', {
    strings: ['Say Hello...'],
    typeSpeed: 130,
    loop: true,
});

// Highlight mouse hover
let originalBGplaypen = $('#playpen').css('background-color'),
    x,
    y,
    xy,
    bgWebKit,
    bgMoz,
    lightColor = 'rgba(101,255,127,0.1)',
    gradientSize = 377;

$('#playpen')
    .mousemove(function (e) {
        x = e.pageX - this.offsetLeft;
        y = e.pageY - this.offsetTop;
        xy = x + ' ' + y;

        bgWebKit =
            '-webkit-gradient(radial, ' +
            xy +
            ', 0, ' +
            xy +
            ', ' +
            gradientSize +
            ', from(' +
            lightColor +
            '), to(rgba(255,255,255,0.0))), ' +
            originalBGplaypen;
        bgMoz =
            '-moz-radial-gradient(' +
            x +
            'px ' +
            y +
            'px 45deg, circle, ' +
            lightColor +
            ' 0%, ' +
            originalBGplaypen +
            ' ' +
            gradientSize +
            'px)';

        $(this).css({ background: bgWebKit }).css({ background: bgMoz });
    })
    .mouseleave(function () {
        $(this).css({ background: originalBGplaypen });
    });

// Gradient animation E-mail
function changeGradient() {
    const email = document.querySelector('.email__mail');
    email.classList.toggle('change-color');
}
setInterval(changeGradient, 1000);

window.addEventListener('scroll', fadeIn);

function fadeIn() {
    const footerEmail = document.querySelector('.footer__email');
    const footerContacts = document.querySelector('.footer__contacts');
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > 130) {
        footerEmail.classList.add('fade-in');
        footerContacts.classList.add('fade-in');
    } else {
        footerEmail.classList.remove('fade-in');
        footerContacts.classList.remove('fade-in');
    }
}
// Анимация элементов при scroll

// Функция для выезда с лево
function handleScrollAnimationLeft() {
    let elementsLeft = document.querySelectorAll('.scroll-animation-left');
    let windowHeight = window.innerHeight;

    elementsLeft.forEach(function(element) {
        let position = element.getBoundingClientRect().top;

        if (position < windowHeight) {
        element.classList.add('fade-in');
    }
    });
}

// Функция для выезда с право
function handleScrollAnimationRight() {
    let elementsRight = document.querySelectorAll('.scroll-animation-right');
    let windowHeight = window.innerHeight;

    elementsRight.forEach(function(element) {
        let position = element.getBoundingClientRect().top;

        if (position < windowHeight) {
        element.classList.add('fade-in');
    }
    });
}
// left
window.addEventListener('scroll', handleScrollAnimationLeft);
window.addEventListener('load', handleScrollAnimationLeft);
// right
window.addEventListener('scroll', handleScrollAnimationRight);
window.addEventListener('load', handleScrollAnimationRight);