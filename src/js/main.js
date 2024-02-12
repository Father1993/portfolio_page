// Main block typing
let typed = new Typed('#element', {
    strings: [
        'Создаю web интерфейсы.',
        'Занимаюсь разработкой и доработкой сайтов.',
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
