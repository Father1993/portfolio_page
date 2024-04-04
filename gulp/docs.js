const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const fs = require('fs');
const server = require('gulp-server-livereload');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// HTML
const htmlclean = require('gulp-htmlclean');

// Styles
const sass = require('sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const groupMedia = require('gulp-group-css-media-queries');
const webpCss = require('gulp-webp-css');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

// JS
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

// Images
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

// const sourceMaps = require('gulp-sourcemaps');

// Префиксы для подключения шаблонов
const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file',
};

const serverOptions = {
    livereload: true,
    open: true,
};

// Очищаем папку dist если она имеется
gulp.task('clean:docs', (done) => {
    if (fs.existsSync('./docs/')) {
        return gulp
            .src('./docs/', { read: false })
            .pipe(clean({ force: true }));
    }
    done();
});

const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false,
        }),
    };
};

// Подключаем шаблоны html (header, footer)
gulp.task('html:docs', () => {
    return gulp
        .src('./src/*.html')
        .pipe(changed('./docs/'))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(htmlclean())
        .pipe(gulp.dest('./docs/'));
});

// Обработка sass файлов + sourcemaps
gulp.task('css:docs', () => {
    return (
        gulp
            .src('./src/styles/**/*.css')
            .pipe(changed('./docs/styles/'))
            .pipe(plumber(plumberNotify('css')))
            // .pipe(sourceMaps.init())
            .pipe(cssmin())
            .pipe(autoprefixer())
            .pipe(webpCss())
            .pipe(groupMedia())
            // .pipe(sass())
            .pipe(csso())
            // .pipe(sourceMaps.write())
            //.pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./docs/styles/'))
    );
});

// Копирование изображений
gulp.task('images:docs', () => {
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./docs/img/'))
        .pipe(webp())
        .pipe(gulp.dest('./docs/img/'))
        .pipe(gulp.src('./docs/**/*'))
        .pipe(changed('./docs/img/'))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./docs/img/'));
});

// Копирование шрифтов
gulp.task('fonts:docs', () => {
    return gulp
        .src('./src/styles/fonts/**/*')
        .pipe(changed('./docs/styles/fonts/'))
        .pipe(gulp.dest('./docs/styles/fonts/'));
});

//
gulp.task('js:docs', () => {
    return gulp
        .src('./src/js/**/*.js')
        .pipe(changed('./docs/js/'))
        .pipe(plumber(plumberNotify('JS')))
        .pipe(babel())
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./docs/js'));
});

// Запуск сервера с hotreload
gulp.task('server:docs', () => {
    return gulp.src('./docs/').pipe(server(serverOptions));
});
