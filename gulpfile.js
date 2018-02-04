const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const config = {
  cssPath: 'src/css',
  scssPath: 'src/scss',
  jsPath: 'src/js',
  nodeModulesPath: 'node_modules'
}

// Compile Sass & inject into the browser
gulp.task('sass', function() {
  return gulp.src(config.scssPath + '/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        config.scssPath,
        config.nodeModulesPath + '/bootstrap-sass/assets/stylesheets',
        config.nodeModulesPath + '/font-awesome/scss'
      ]
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.cssPath))
    .pipe(browserSync.stream());
});

// Move Js files to js folder
gulp.task('js', function() {
  return gulp.src([config.nodeModulesPath + '/bootstrap-sass/assets/javascripts/bootstrap.min.js', config.nodeModulesPath + '/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(config.jsPath))
    .pipe(browserSync.stream());
})

// Watch Sass and HTML files and serve
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './src'
  });

  gulp.watch(config.scssPath + '/*.scss', ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Move fonts to /src/fonts
gulp.task('fonts', function() {
  return gulp.src(config.nodeModulesPath + '/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('default', ['js', 'serve', 'fonts']);
