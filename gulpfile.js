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
//代码压缩
var uglify = require('gulp-uglify');


//修改html,js，css代码保存后，浏览器自动刷新
var browserSync = require('browser-sync');

//演示一下任务，执行命令行 gulp hello
/*gulp.task('hello',function () {
   console.log("hello world");
});*/

//默认任务
gulp.task("default",['watch'],function () {
    console.log("默认任务");
});

//task1:less转换成css任务
gulp.task("less",function () {
  //此处表示返回一个stream
  return gulp.src("src/less/mgui.less")
       .pipe(less())
       .pipe(gulp.dest('src/css'))
       .pipe(browserSync.reload({
          stream: true
       }))
});

//task2  css代码压缩合并



//task3 图片压缩



//task4:js压缩 (单个压缩可以实现)
gulp.task('uglify',['useref'],function () {
     //先压缩js文件
    return gulp.src('dist/js/main.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('src/js/'));
});


// task 5 useref 代码合并(包括js、css代码合并)
gulp.task('useref', function(){
    //实现代码压缩uglify()合并useref()
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
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

//gulp watch 监控任务,执行watch之前先执行browserSync和less任务
gulp.task("watch",['browserSync','less'],function (event) {
    console.log(event);
    gulp.watch("src/less/**/*.less",['less']);//监控less文件
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);

});
