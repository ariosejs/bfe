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
var _swig = require('swig');

var path = require('path');
var express = require('express');
var app = express();
var appbase = path.join(__dirname);
app.engine('tpl' , _swig.renderFile);
app.set('view engine' , 'tpl');
app.set('views' , appbase+'/template' );
app.set('view cache', false);

app.use( '/', express.static( path.join(appbase )));
app.use('/public', express.static(__dirname + '/build/public'));
app.get( /^\/(.+?)\/(.*?).html$/ , function(req,res){
    var appname = req.params[0];
    var tplname = req.params[1];
    res.render( path.join(appname , tplname) , {
        appname:appname,
        tplname: tplname
    } );
} );

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

gulp.task('templates', function() {
    gulp.src('./template/**/*.tpl')
        .pipe(swig())
        .pipe(revReplace())
        .pipe(gulp.dest('./build/app/'));
});

gulp.task('clean', function(){
    return gulp.src('./build/public', {read: false})
        .pipe(clean());
});


gulp.task('default',['clean'], function(){
    gulp.start('lint', 'less', 'scripts', 'images', 'templates');
});

gulp.task('watch',['clean'],function(){
    
    gulp.watch('./static/styles/*.less',['less']);
    gulp.watch('./static/scripts/*.js',['scripts']);
    gulp.watch('./static/images/*',['images']);
    gulp.watch('./template/**/*.tpl',['templates']);
    gulp.start('lint', 'less', 'scripts', 'images', 'templates');
    var port = 8080;
    app.listen(port);
    console.log('Server start at port ' + port);

});