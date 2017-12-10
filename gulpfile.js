let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browser = require('browser-sync'),
    prefixer = require('gulp-autoprefixer');

let src = './src';
let dist = './dist';

let path = {
    dev: {
        html: [
            src + '/*.html'
        ],
        css: [
            src + '/css/*.css'
        ],
        sass: [
            src + '/sass/style.scss'
        ],
        js: [
            src + '/js/*.js'
        ],
        app: src + '/',
    },
    dist: {
        html: [
            dist + '/*.html'
        ],
        css: [
            dist + '/css/*.css'
        ],
        sass: [
            dist + '/sass/style.scss'
        ],
        js: [
            dist + '/js/*.js'
        ],
        app: dist + '/',
    }
}

gulp.task('sass:dev', function(){
    return gulp.src(path.dev.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src + '/css'))
        .pipe(browser.stream());
});

gulp.task('watch',function() {
	return gulp.watch(src + '/**/**/*', ['sass:dev', browser.reload]);
});

gulp.task('serve', ['sass:dev'], function() {
    browser.init({
        server: path.dev.app
    });
});

gulp.task('default', ['serve', 'watch']);