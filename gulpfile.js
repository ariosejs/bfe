var version = 'v1.0.0';

var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var swig = require('gulp-swig');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var server = require('gulp-express');


gulp.task('lint', function() {
    gulp.src('./static/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
    gulp.src('./static/styles/*.less')
        .pipe(concat('main.css'))
        .pipe(less())
        .pipe(minifyCSS())
        // .pipe(rev())
        .pipe(gulp.dest('./build/public/'+version+'/css'));
});

gulp.task('scripts', function() {
    gulp.src('./static/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/public/'+version+'/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./build/public/'+version+'/js'));
});

gulp.task('images', function(){
    gulp.src('./static/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/public/'+version+'/img'));
});

gulp.task('templates',function() {
    gulp.src('./template/**/*.tpl')
        .pipe(swig())
        // .pipe(revReplace())
        .pipe(gulp.dest('./build/app/'));
});

gulp.task('clean-public', function(){
    return gulp.src('./build/public', {read: false})
        .pipe(clean());
});
gulp.task('clean-app', function(){
    return gulp.src('./build/app', {read: false})
        .pipe(clean());
});


gulp.task('default',['clean-public','clean-app'],function(){
    server.run(['app.js']);
    gulp.start('lint', 'less', 'scripts', 'images');
    gulp.start('watch');
});


gulp.task('watch',function(){

    gulp.watch('./static/styles/*.less',['less']);
    gulp.watch('./static/scripts/*.js',['scripts']);
    gulp.watch('./static/images/*',['images']);
    
    // gulp.start('lint', 'less', 'scripts', 'images');



});
