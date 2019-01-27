/* global require */

const sourceDir = 'src/client',
    outputDir = 'public',
    configs = require('./configs.json');

const gulp = require('gulp'),
    del = require('del'),
    gulpEjs = require('gulp-ejs'),
    gulpCopy = require('gulp-copy'),
    gulpThat = require('gulp-that'),
    gulpLess = require('gulp-less'),
    gulpCleanCss = require('gulp-cleancss'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
    gulpEslint = require('gulp-eslint'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify');

const clean = (done) =>
    del([outputDir], done);

const copyBootstrapCss = () =>
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]).pipe(gulpCopy(outputDir + '/styles/vendor/bootstrap/css', {
        prefix: 4
    }));

const copyBootstrapFonts = () =>
    gulp.src([
        'node_modules/bootstrap/dist/fonts/**/*'
    ]).pipe(gulpCopy(outputDir + '/styles/vendor/bootstrap/fonts', {
        prefix: 4
    }));

const copyFontAwesomeCss = () =>
    gulp.src([
        'node_modules/font-awesome/css/font-awesome.min.css'
    ]).pipe(gulpCopy(outputDir + '/styles/vendor/font-awesome/css', {
        prefix: 4
    }));

const copyFontAwesomeFonts = () =>
    gulp.src([
        'node_modules/font-awesome/fonts/**/*'
    ]).pipe(gulpCopy(outputDir + '/styles/vendor/font-awesome/fonts', {
        prefix: 4
    }));

const copyOthers = () =>
    gulp.src([
        sourceDir + '/fonts/**/*',
        sourceDir + '/images/**/*',
        sourceDir + '/icons/**/*',
        sourceDir + '/favicon.ico'
    ]).pipe(gulpCopy(outputDir, {
        prefix: 2
    }));

const copy = gulp.parallel(
    copyBootstrapCss,
    copyBootstrapFonts,
    copyFontAwesomeCss,
    copyFontAwesomeFonts,
    copyOthers
);

const manifestDebug = () =>
    gulp.src([
        sourceDir + '/manifest.json'
    ]).pipe(gulpThat(function (input) {
        return input
            .replace(/#manifest-origin#/g, '/');
    })).pipe(gulp.dest(outputDir));

const manifest = () =>
    gulp.src([
        sourceDir + '/manifest.json'
    ]).pipe(gulpThat(function (input) {
        return input
            .replace(/#manifest-origin#/g, configs.origin);
    })).pipe(gulp.dest(outputDir));

const styles = () =>
    gulp.src(sourceDir + '/styles/**/*.less')
        .pipe(gulpLess())
        .pipe(gulpConcat('styles.css'))
        .pipe(gulpCleanCss())
        .pipe(gulp.dest(outputDir + '/styles'));

const scriptsDebug = () =>
    browserify({
        entries: sourceDir + '/scripts/index.jsx',
        debug: true,
        insertGlobalVars: {
            baseUrl: () => JSON.stringify('/')
        }
    }).transform('babelify')
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(gulp.dest(outputDir + '/scripts/'));

const scripts = () =>
    browserify({
        entries: sourceDir + '/scripts/index.jsx',
        insertGlobalVars: {
            baseUrl: () => JSON.stringify(configs.origin)
        }
    }).transform('babelify')
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(gulpUglify())
        .pipe(gulp.dest(outputDir + '/scripts/'));

const htmlDebug = () =>
    gulp.src([
        sourceDir + '/*.html'
    ]).pipe(gulpEjs({
        titlePrefix: '[DEBUG] ',
        baseUrl: '/'
    })).pipe(gulpThat(function (input) {
        return input
            .replace(/#cache-buster-token#/g, '');
    })).pipe(gulp.dest(outputDir));

const html = () =>
    gulp.src([
        sourceDir + '/*.html'
    ]).pipe(gulpEjs({
        titlePrefix: '',
        baseUrl: configs.domain + configs.origin
    })).pipe(gulpThat(function (input) {
        return input
            .replace(/#cache-buster-token#/g, (new Date()).getTime());
    })).pipe(gulp.dest(outputDir));

const copyServiceWorker = () =>
    gulp.src([
        sourceDir + '/sw.js'
    ]).pipe(gulpThat(function (input) {
        return input
            .replace(/#sw-cache-string#/g, (new Date().getTime()))
            .replace(/#sw-origin#/g, configs.origin);
    })).pipe(gulp.dest(outputDir));

const lint = () =>
    gulp.src(sourceDir + '/scripts/**/*.js')
        .pipe(gulpEslint())
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.failAfterError());

const debug = gulp.series(
    clean,
    copy,
    manifestDebug,
    styles,
    scriptsDebug,
    htmlDebug,
    lint
);

const build = gulp.series(
    clean,
    copy,
    manifest,
    styles,
    scripts,
    html,
    copyServiceWorker
);

const develop = () => {
    gulp.watch(
        [
            sourceDir + '/*.html'
        ],
        htmlDebug
    );

    gulp.watch(
        [
            sourceDir + '/styles/**/*.less'
        ],
        styles
    );

    gulp.watch(
        [
            sourceDir + '/scripts/**/*.js',
            sourceDir + '/scripts/**/*.jsx'
        ],
        scriptsDebug
    );
};

export {
    debug,
    build,
    develop,
    lint
}

export default build;
