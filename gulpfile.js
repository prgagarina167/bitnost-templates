var gulp = require('gulp');
var less = require('gulp-less');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var lessFiles = ['./src/less/**'];
var handlebarsFiles = ['./src/**/**.handlebars'];
var jsFiles = './src/js/**.js';

gulp.task('default', ['bowercopy', 'browser-sync', 'less', 'js', 'handlebars'], function() {


  gulp.watch(lessFiles, { interval: 1000 }, ['less']);
  gulp.watch(htmlFiles, { interval: 1000 }, ['handlebars']);
  gulp.watch(jsFiles, { interval: 1000 }, ['js']);

});

gulp.task('less', function() {
  gulp.src('src/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream:true})); 
  });

gulp.task('bowercopy', function(){
  gulp.src([
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/jquery/dist/jquery.min.js'
    ])
  .pipe(gulp.dest('build/js/'))
});

gulp.task('js', function(){
  gulp.src(jsFiles)
  .pipe(gulp.dest('build/js'))
  .pipe(reload({stream:true}));
});

gulp.task('handlebars', function(){
var templateData = {},
options = {
  batch : ['./src/partials'],
}

gulp.src('src/index.handlebars')
  .pipe(handlebars(templateData, options))
  .pipe(rename('index.html'))
  .pipe(gulp.dest('build'));


  gulp.src(htmlFiles)
  .pipe(gulp.dest('build'))
  .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
});