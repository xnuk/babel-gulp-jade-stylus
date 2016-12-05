const {argv} = require('yargs')

const gulp       = require('gulp')
const pug        = require('gulp-pug')
const babel      = require('gulp-babel')
const stylus     = require('gulp-stylus')
const plumber    = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')

const browserSync = require('browser-sync')
const {reload} = browserSync

const babelrc = JSON.parse(require('fs').readFileSync('./.babelrc', 'utf8'))

const dest = argv.dir || './index.html'

gulp.task('default', ['compile'])

gulp.task('compile', ['assets', 'pug', 'babel', 'stylus', 'browser-sync'])


gulp.task('assets', () =>
  gulp.src('src/assets/*')
    .pipe(gulp.dest(dest))
)

gulp.task('pug', () =>
  gulp.src('src/jade/*.jade')
    .pipe(pug())
    .pipe(gulp.dest(dest))
)

gulp.task('babel', () =>
  gulp.src('src/babel/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel(babelrc))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
)

gulp.task('stylus', () =>
  gulp.src('src/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
)

gulp.task('browser-sync', () => {
  browserSync.init(['./index.html/**.*'], {
    server: {
      baseDir: "./index.html"
    }
  })
})

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('index.html/*.js', reload)
  gulp.watch('src/assets/*', ['assets'])
  gulp.watch('src/jade/*.jade', ['pug'])
  gulp.watch('src/babel/*.js', ['babel'])
  gulp.watch('src/stylus/*.styl', ['stylus'])
})
