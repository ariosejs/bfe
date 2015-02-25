var version = 'v1.0.0';
// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var swig = require('gulp-swig');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./static/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Less
gulp.task('less', function() {
    gulp.src('./static/styles/*.less')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.dest('./build/public/'+version+'/css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./static/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/public/'+version+'/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/public/'+version+'/js'));
});

//swig
gulp.task('templates', function() {
  gulp.src('./template/*/*.tpl')
    .pipe(swig())
    .pipe(gulp.dest('./build/app/'))
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'less', 'scripts', 'templates');

    // 监听文件变化
    // gulp.watch('./js/*.js', function(){
    //     gulp.run('lint', 'less', 'scripts');
    // });
});