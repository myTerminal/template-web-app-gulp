/* global require */

const sourceDir = 'src/client';
const outputDir = 'public';
const configs = require('./configs.json');

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    copy = require('gulp-copy'),
    that = require('gulp-that'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-cleancss'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    gulpSync = require('gulp-sync')(gulp),
    watchNow = require('gulp-watch-now'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify');

gulp.task('clean', function () {
    return gulp.src(outputDir, { read: false })
        .pipe(clean());
});

gulp.task('copy-bootstrap-css', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]).pipe(copy(outputDir + '/styles/vendor/bootstrap/css', {
        prefix: 4
    }));
});

gulp.task('copy-bootstrap-fonts', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/fonts/**/*'
    ]).pipe(copy(outputDir + '/styles/vendor/bootstrap/fonts', {
        prefix: 4
    }));
});

gulp.task('copy-font-awesome-css', function () {
    return gulp.src([
        'node_modules/font-awesome/css/font-awesome.min.css'
    ]).pipe(copy(outputDir + '/styles/vendor/font-awesome/css', {
        prefix: 4
    }));
});

gulp.task('copy-font-awesome-fonts', function () {
    return gulp.src([
        'node_modules/font-awesome/fonts/**/*'
    ]).pipe(copy(outputDir + '/styles/vendor/font-awesome/fonts', {
        prefix: 4
    }));
});

gulp.task('copy-others', function () {
    return gulp.src([
        sourceDir + '/data/**/*',
        sourceDir + '/fonts/**/*',
        sourceDir + '/images/**/*',
        sourceDir + '/icons/**/*',
        sourceDir + '/manifest.json',
        sourceDir + '/favicon.ico'
    ]).pipe(copy(outputDir, {
        prefix: 2
    }));
});

gulp.task('copy', [
    'copy-bootstrap-css',
    'copy-bootstrap-fonts',
    'copy-font-awesome-css',
    'copy-font-awesome-fonts',
    'copy-others'
]);

gulp.task('templates', function () {
    return gulp.src(sourceDir + '/scripts/templates/*.html')
        .pipe(angularTemplateCache({
            root: 'scripts/templates',
            module: 'templateWeb'
        }))
        .pipe(gulp.dest(outputDir + '/scripts'));
});

gulp.task('styles', function () {
    return gulp.src(sourceDir + '/styles/**/*.less')
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(outputDir + '/styles'));
});

gulp.task('scripts-debug', function () {
    return browserify({
        entries: sourceDir + '/scripts/app.js',
        debug: true
    })
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(gulp.dest(outputDir + '/scripts/'));
});

gulp.task('scripts', function () {
    return browserify({
        entries: sourceDir + '/scripts/app.js'
    })
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(outputDir + '/scripts/'));
});

gulp.task('html-debug', function () {
    return gulp.src([
        sourceDir + '/*.html'
    ]).pipe(that(function (input) {
        return input
            .replace(/#cache-buster-token#/g, '');
    })).pipe(gulp.dest(outputDir));
});

gulp.task('html', function () {
    return gulp.src([
        sourceDir + '/*.html'
    ]).pipe(that(function (input) {
        return input
            .replace(/#cache-buster-token#/g, (new Date()).getTime());
    })).pipe(gulp.dest(outputDir));
});

gulp.task('copy-service-worker', function () {
    return gulp.src([
        sourceDir + '/sw.js'
    ]).pipe(that(function (input) {
        return input
            .replace(/#sw-cache-string#/g, (new Date().getTime()))
            .replace(/#sw-origin#/g, configs.origin);
    })).pipe(gulp.dest(outputDir));
});

gulp.task('lint', function () {
    return gulp.src(sourceDir + '/scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('debug', gulpSync.sync([
    'clean',
    'copy',
    'templates',
    'styles',
    'scripts-debug',
    'html-debug',
    'lint'
]));

gulp.task('build', gulpSync.sync([
    'clean',
    'copy',
    'templates',
    'styles',
    'scripts',
    'html',
    'copy-service-worker'
]));

gulp.task('develop', function() {
    watchNow.watch(gulp, [
        sourceDir + '/*.html'
    ], [
        'html-debug'
    ]);

    watchNow.watch(gulp, [
        sourceDir + '/scripts/templates/**/*.html'
    ], [
        'templates',
        'scripts-debug'
    ]);

    watchNow.watch(gulp, [
        sourceDir + '/styles/**/*.less'
    ], [
        'styles'
    ]);

    watchNow.watch(gulp, [
        sourceDir + '/scripts/**/*.js'
    ], [
        'scripts-debug'
    ]);
});

gulp.task('default', ['build']);
