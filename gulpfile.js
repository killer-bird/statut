const gulp = require('gulp')
const sass =  require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin =require('gulp-htmlmin')
const del = require('del')
const autroprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const sync = require('browser-sync');
const { series } = require('gulp');


function html(){
  return gulp.src('index.html')
  .pipe(include({
    prefix:'@@'
  }))
  .pipe(gulp.dest('dist'))
}
function scss(){
  return gulp.src(['src/scss/**.scss', 'node_modules/'])
  .pipe(sass({
    includePaths: ['node_modules'] 
  }))
  .pipe(csso())
  .pipe(concat('index.css'))
  .pipe(gulp.dest('dist/css'))
}
function images(){
  return gulp.src(['src/img/png/**.png'])
  .pipe(gulp.dest('dist/images'))
}
function clear(){
  return del('dist')
}
function serve(){
  sync.init({
    server:'./dist'
  })
  gulp.watch(['index.html', 'src/includes/**.html'], series(clear,scss,html)).on('change', sync.reload)
  gulp.watch('src/scss/**.scss', series(clear,scss,html)).on('change', sync.reload)
}

exports.build = gulp.series(clear, scss, html, images)
exports.serve = series(clear, scss, html, serve, images)
exports.clear = clear
