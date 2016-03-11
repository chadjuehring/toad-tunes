var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var paths = {
  js: [
    'bower_components/angular/angular.js', 
    './src/js/app.js'
  ],
  sass : ['./src/sass/*.sass'],
  images : ['./src/images/*.*'],
  html : [
    './src/*.html' 
  ],
  templates : [
    './src/templates/*.html'
  ]
};

var outPaths = {
  html : './dist/',
  images : './dist/images/',
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

gulp.task('imageCopy', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest(outPaths.images))
});

gulp.task('htmlCopy', function(){
  return gulp.src(paths.html)
    .pipe(gulp.dest(outPaths.html))
});

gulp.task('templateCopy', function(){
  return gulp.src(paths.templates)
    .pipe(gulp.dest(outPaths.templates))
});

gulp.task('html', ['htmlCopy', 'templateCopy', 'imageCopy']);

gulp.task('default', ['sass', 'js', 'html', 'imageCopy'], function(){
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['htmlCopy']);
  gulp.watch(paths.templates, ['templateCopy']);
  gulp.watch(paths.images, ['imageCopy']);
});
