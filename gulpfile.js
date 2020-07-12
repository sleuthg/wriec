
// Dependencies
// ------------
var gulp = require('gulp');

var cache         = require('gulp-cached'),
  concat          = require('gulp-concat'),
  filter          = require('gulp-filter'),
  jshint          = require('gulp-jshint'),
  less            = require('gulp-less'),
  notify          = require('gulp-notify'),
  plumber         = require('gulp-plumber'),
  rename          = require('gulp-rename'),
  uglify          = require('gulp-uglify');

//imagemin        = require('gulp-imagemin'),

// Configuration
// -------------

// File paths
var src     = 'src',
  dest    = 'public';

// Error handling
// --------------
function onError(error) {
  var errorTitle = '[' + error.plugin + ']',
    errorString = error.message;

  if (error.lineNumber) {
    errorString += ' on line ' + error.lineNumber;
  }
  if (error.fileName) {
    errorString += ' in ' + error.fileName;
  }

  notify.onError({
    title:    errorTitle,
    message:  errorString,
    sound:    "Beep"
  })(error);
  this.emit('end');
}

// Styles task
// -----------
gulp.task('styles', function() {
  //return gulp.src(src + '/less/**/*.less')
  return gulp.src(src + '/less/customStyles.less')
    .pipe(plumber({errorHandler: onError}))

    // Cache
    .pipe(cache())

    // Compile
    .pipe(less({}))

    // Write css
    .pipe(gulp.dest(dest + '/css'))

    // CSS Injection
    .pipe(filter('**/*.css'))

    // Notification
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts task
// ------------
gulp.task('scripts', function() {
  return gulp.src(src + '/js/**/*.js')

    // Cache
    .pipe(cache())

    // JSHint & compile
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .on('error', onError)

    // Compile
    .pipe(concat('main.js'))

    // Minify
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + '/js'))

    // Notification
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images task
// -----------
gulp.task('images', function() {
  return gulp.src(src + '/img/**/*')
    .pipe(plumber({errorHandler: onError}))

    // Cache
    .pipe(cache())

    // Compress & cache
    // .pipe(imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true
    // }))
    .pipe(gulp.dest(dest + '/img'))

    // Notification
    .pipe(notify({ message: 'Images task complete' }));
});

// Data task
// ---------
gulp.task('data', function() {
  return gulp.src(src + '/csv/*.json')
    .pipe(cache())
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('app/routes'))
    .pipe(notify({ message: 'Data task complete' }));
})

// Default task
// ------------
gulp.task('default', gulp.parallel('styles', 'scripts', 'images', 'data'));
