var gulp = require('gulp');
var less = require('gulp-less');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var faker = require('faker');

var lessFiles = ['./src/less/**'];
var handlebarsFiles = ['./src/**/**.handlebars'];
var jsFiles = './src/js/**.js';
var imgFiles = './src/img/**';

gulp.task('default', ['bowercopy', 'browser-sync', 'less', 'js', 'img', 'handlebars'], function() {


  gulp.watch(lessFiles, { interval: 1000 }, ['less']);
  gulp.watch(handlebarsFiles, { interval: 1000 }, ['handlebars']);
  gulp.watch(jsFiles, { interval: 1000 }, ['js']);
  gulp.watch(imgFiles, { interval: 1000}, ['img'])

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

gulp.task('img', function(){
  gulp.src(imgFiles)
  .pipe(gulp.dest('build/img'))
  .pipe(reload({stream:true}));
});

gulp.task('handlebars', function(){
var templateData = {albuns: []},
options = {
  batch : ['./src/partials'],
}
var albumCount = 30;
var releaseTypes = ['CD', 'LP', 'EP', 'MC', '7"'];
for(var i = 0; i < albumCount; i++ ){
  releaseTypes.sort( function() { return 0.5 - Math.random() } );
  var releaseCount = Math.floor((Math.random() * releaseTypes.length) + 1);
  var releases = []
  for(var j = 0; j < releaseCount; j++){
    releases.push({
      type: releaseTypes[j],
      price: (faker.finance.amount()/10).toFixed(2),      
      });
  } 
  templateData.albuns.push({
    cover: faker.image.image(),
    title: faker.lorem.sentence(),
    author: faker.name.firstName()+' '+faker.name.lastName(),
    releases: releases,
    releaseCount: releaseCount-1
  }
  );
}

gulp.src('src/index.handlebars')
  .pipe(handlebars(templateData, options))
  .pipe(rename('index.html'))
  .pipe(gulp.dest('build'));


  gulp.src(handlebarsFiles)
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