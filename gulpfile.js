/* global require */

const sourceDir = 'src/client';
const outputDir = 'public';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    copy = require('gulp-copy'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-cleancss'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
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

gulp.task('copy-html', function () {
    return gulp.src([
        sourceDir + '/*.html'
    ]).pipe(copy(outputDir, {
        prefix: 4
    }));
});

gulp.task('copy-others', function () {
    return gulp.src([
        sourceDir + '/data/**/*',
        sourceDir + '/fonts/**/*',
        sourceDir + '/images/**/*',
        sourceDir + '/favicon.ico'
    ]).pipe(copy(outputDir, {
        prefix: 2
    }));
});

gulp.task('copy', [
    'copy-bootstrap-css',
    'copy-bootstrap-fonts',
    'copy-html',
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
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(gulp.dest(outputDir + '/scripts/'));
});

gulp.task('scripts', function () {
    return browserify({
        entries: sourceDir + '/scripts/app.js',
        debug: true
    })
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(outputDir + '/scripts/'));
});

gulp.task('build', gulpSync.sync([
    'clean',
    'copy',
    'templates',
    'styles',
    'scripts'
]));

gulp.task('debug', gulpSync.sync([
    'clean',
    'copy',
    'templates',
    'styles',
    'scripts-debug'
]));

gulp.task('develop', function() {
    watchNow.watch(gulp, [
        sourceDir + '/*.html'
    ], [
        'copy-html'
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
