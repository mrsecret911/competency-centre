var gulp = require('gulp'),
    bower = require('gulp-bower'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp.src('./src/styles/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(minifyCss())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('libs', function() {
  return gulp.src([
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/responsive-images.js/responsive-img.min.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('scripts', function() {
  return gulp.src("./src/scripts/**/*.js")
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('html', function() { 
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('img', function() { 
    return gulp.src('./src/img/**/**')
    .pipe(gulp.dest('./public/img/'));
});
gulp.task('fonts', function() { 
    return gulp.src('./src/fonts/**/**')
    .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('watch', function () {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/scripts/*.js', ['scripts']);
});

gulp.task('connect', function () {
  connect.server({
    root: 'public',
    port: 8080,
    livereload: true
  });
});

gulp.task("default", ["sass", "html", "img", "libs", "scripts", "fonts"]);

gulp.task("serve", ["watch", "connect"]);

