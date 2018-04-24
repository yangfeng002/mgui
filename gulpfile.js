/* 
*Created by fengyang on 2018/4/10
* 该文件是打包工具必须的
**/

//获取gulp对象
var gulp = require('gulp');
//less编译任务
var less = require('gulp-less');
//代码合并
var useref = require('gulp-useref');
//js代码压缩
var uglify = require('gulp-uglify');
//css代码压缩
var cleanCSS = require('gulp-clean-css');
//自动添加前缀
var autoprefixer = require('gulp-autoprefixer');
//gulp-if
var gulpIf = require('gulp-if');
//压缩图片
var imagemin = require('gulp-imagemin');
var cache  = require('gulp-cache');//没有更新的就不会压缩
//删除文件
var del = require('del');
//代码执行顺序
var runSequence = require('run-sequence');
//gulp-autoprefixer 自动添加前缀
 var autoprefixer = require('gulp-autoprefixer');


//修改html,js，css代码保存后，浏览器自动刷新
var browserSync = require('browser-sync');


/* 默认任务*/
gulp.task("default",['watch'],function () {
    console.log("默认任务");
});

/* task1:less转换成css任务 */
gulp.task("less",function () {
  //此处表示返回一个stream
  return gulp.src("src/less/mgui.less")
       .pipe(less())
       .pipe(gulp.dest('src/css'))
       .pipe(browserSync.reload({
          stream: true
       }))
});

/*  task2  css代码压缩合并*/
gulp.task('csscompress', function() {
    // 1. 找到文件
    return  gulp.src('dist/css/*.css')
    // 2. 压缩文件
        .pipe(cleanCSS())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/css'));
});

/*  task3 图片压缩 */
gulp.task('imageMin',function () {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg|ico)')
       // Caching images that ran through imagemin
        .pipe(cache(imagemin({progressive: true})))
        .pipe(gulp.dest('dist/images'))
});

/*task4:js压缩 (单个压缩可以实现)*/
gulp.task('jscompress', function() {
    // 1. 找到文件
    return gulp.src('dist/js/main.min.js')
    // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'));
});


/*task 5 useref 代码合并(包括js、css代码合并)*/
gulp.task('useref', function(){
    //实现代码压缩uglify()合并useref()
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify',['useref'],function () {
    //先压缩js文件
    return gulp.src('dist/js/main.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

/* task6 清除文件目录 */
gulp.task('clean',function () {
    del('dist');
});
//images变化小，选择排除
gulp.task('clean:dist', function(callback){
    del(['dist/**/*', '!dist/images', '!dist/images/**/*'], function () {
    })
});

// 设置任务---架设静态服务器（browser-sync）
gulp.task('browserSync', function () {
    browserSync({
        server:{
            baseDir:'src'// 设置服务器的根目录
        },
        port:9000
    });
});

/*gulp watch 监控任务,执行watch之前先执行browserSync和less任务 */
gulp.task("watch",function (event) {
    console.log(event);
    gulp.watch("src/less/**/*.less",['less']);//监控less文件
    gulp.watch('src/*.html', browserSync.reload);//监控html
    gulp.watch('src/js/**/*.js', browserSync.reload);//监控js文件

});

/* task7按顺序执行 */
gulp.task('runSequence', function(callback) {
    runSequence('clean','useref',['csscompress','jscompress','imageMin'],'watch',
        callback);
});
