var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var paths = {
  js: [
    'bower_components/angular/angular.js', 
    './src/js/app.js'
  ],
  sass : ['./src/sass/*.sass'],
  html : [
    './src/*.html' 
  ],
  templates : [
    './src/templates/*.html'
  ]
};

var outPaths = {
  html : './dist/',
  templates: './dist/templates/',
  js: './dist/js/',
  css: './dist/css/'
}

gulp.task('sass', function(){
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(outPaths.css))
})

gulp.task('js', function(){
  return gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(outPaths.js))
});

gulp.task('htmlCopy', function(){
  return gulp.src(paths.html)
    .pipe(gulp.dest(outPaths.html))
});

gulp.task('templateCopy', function(){
  return gulp.src(paths.templates)
    .pipe(gulp.dest(outPaths.templates))
});

gulp.task('html', ['htmlCopy', 'templateCopy']);

gulp.task('default', ['sass', 'js', 'html'], function(){
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['htmlCopy']);
  gulp.watch(paths.templates, ['templateCopy']);
});
