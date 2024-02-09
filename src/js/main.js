let typed = new Typed('#element', {
    strings: [
        'Создаю web интерфейсы.',
        'Занимаюсь разработкой и доработкой сайтов.',
    ],
    typeSpeed: 80,
    loop: true,
});

// Highlight mouse hover

let originalBGplaypen = $('#playpen').css('background-color'),
    x,
    y,
    xy,
    bgWebKit,
    bgMoz,
    lightColor = 'rgba(101,255,127,0.077)',
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
