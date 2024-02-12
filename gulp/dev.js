const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('sass');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

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
gulp.task('clean:dev', (done) => {
    if (fs.existsSync('./build/')) {
        return gulp
            .src('./build/', { read: false })
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
gulp.task('html:dev', () => {
    return gulp
        .src('./src/*.html')
        .pipe(changed('./build/', { hasChanged: changed.compareContents }))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./build/'));
});

// Обработка sass и css файлов + sourcemaps
gulp.task('css:dev', () => {
    return (
        gulp
            .src('./src/styles/**/*.css')
            .pipe(changed('./docs/styles/'))
            .pipe(plumber(plumberNotify('css')))
            .pipe(sourceMaps.init())
            .pipe(cssmin())
            .pipe(autoprefixer())
            .pipe(webpCss())
            .pipe(groupMedia())
            // .pipe(sass())
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('./docs/styles/'))
    );
});

// Копирование изображений
gulp.task('images:dev', () => {
    return (
        gulp
            .src('./src/img/**/*')
            .pipe(changed('./build/img/'))
            // .pipe(imagemin({ verbose: true }))
            .pipe(gulp.dest('./build/img/'))
    );
});

// Копирование шрифтов
gulp.task('fonts:dev', () => {
    return gulp
        .src('./src/styles/fonts/**/*')
        .pipe(changed('./build/fonts/'))
        .pipe(gulp.dest('./build/fonts/'));
});

//
gulp.task('js:dev', () => {
    return (
        gulp
            .src('./src/js/*.js')
            .pipe(changed('./build/js/'))
            .pipe(plumber(plumberNotify('JS')))
            // .pipe(babel())
            .pipe(webpack(require('../webpack.config.js')))
            .pipe(gulp.dest('./build/js'))
    );
});

// Запуск сервера с hotreload
gulp.task('server:dev', () => {
    return gulp.src('./build/').pipe(server(serverOptions));
});

// Следит за изменениями в dev файлах
gulp.task('watch:dev', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('css:dev'));
    gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
    gulp.watch('./src/styles/fonts/**/*', gulp.parallel('fonts:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});
