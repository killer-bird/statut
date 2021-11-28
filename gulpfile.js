const gulp = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin =require('gulp-htmlmin')
const del = require('del')
const sync = require('browser-sync')

function html(){
  return gulp.src('index.html')
  .pipe(include({
    prefix:'@@'
  }))
  .pipe(gulp.dest('dist'))
}
  
exports.html = html