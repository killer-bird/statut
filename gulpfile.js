const gulp = require('gulp')
const sass =  require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const twig = require('gulp-twig')
const include = require('gulp-file-include')
const htmlmin =require('gulp-htmlmin')
const del = require('del')
const autroprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const sync = require('browser-sync');


function twigCompale(){
  return gulp.src('src/index.twig')
  .pipe(twig())
  .pipe(gulp.dest('dist'))
}
function scss(){
  return gulp.src(['src/assets/scss/**.scss', 'node_modules/'])
  .pipe(sass({
    includePaths: ['node_modules'] 
  }))
  .pipe(csso())
  .pipe(concat('index.css'))
  .pipe(gulp.dest('dist/assets/css'))
}
function images(){
  return gulp.src(['src/assets/img/**'])
  .pipe(gulp.dest('dist/assets/img'))
}
function fonts(){
  return gulp.src('src/assets/fonts/**')
  .pipe(gulp.dest('dist/assets/fonts'))
}
function clear(){
  return del('dist')
}
function serve(){
  sync.init({
    server:'./dist'
  })
  gulp.watch(['src/index.twig', 'src/blocks/**.twig'], gulp.series(clear,scss,twigCompale, fonts, images)).on('change', sync.reload)
  gulp.watch('src/assets/scss/**.scss', gulp.series(clear,scss,twigCompale,fonts, images)).on('change', sync.reload)
}

exports.build = gulp.series(clear, scss, twigCompale, images, fonts)
exports.serve = gulp.series(clear, scss, twigCompale,images, fonts, serve  )

