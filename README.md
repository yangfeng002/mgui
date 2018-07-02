# mgui---前端UI模块化工具
目的：方便前端开发新项目的时候较少相关插件和组件的开发时间，使模块统一，采用主流的响应式开发方案和相关流行的技术框架
开发方案：
一、.搜集并确定需要开发的模块
  1）布局，采用栅格系统方式实现网格布局，响应式
   参照了 Bootstrap的响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl




  2）色彩

  3）icons---iconfont
    常见的一些字体图标集锦

  4）按钮

二、nodeJs环境
    1.安装nodejs
     首先，我们需要搭建node环境。访问http://nodejs.org/，然后点击绿色的install按钮（一般安装左边的常用版本），
     下载完成后直接运行程序，依据提示逐步安装。npm会随着安装包一起安装，稍后会用到它,详见npm介绍部分。

    2.使用命令行
    命令行是Windows中的命令提示符（Commend Prompt），打开方式：window+r -> 输入cmd -> 回车。
    node -v查看安装的nodejs版本，出现版本号，说明刚刚已正确安装nodejs。PS：未能出现版本号，请尝试注销电脑重试；
    npm -v查看npm的版本号，npm是在安装nodejs时一同安装的nodejs包管理器，那它有什么用呢？详见npm介绍；
    cd定位到目录，用法：cd + 路径 ；
    更多的基础命令行知识参见Windows 命令行基础

    3、npm介绍
    npm（node package manager）nodejs的包管理器，用于node插件管理（包括安装、卸载、管理依赖等）；

    使用npm安装插件：命令提示符执行 npm install <name> [-g] [--save-dev]

    <name>：node插件名称。例：npm install gulp-less --save-dev

    -g：全局安装。将会安装在C:\Users\Administrator\AppData\Roaming\npm，并且写入系统环境变量；
        非全局安装：将会安装在当前定位目录；
        全局安装可以通过命令行在任何地方调用它，本地安装将安装在定位目录的node_modules文件夹下，通过require()调用；
    --save：将保存配置信息至package.json
    -dev：保存至package.json的devDependencies节点，不指定-dev将保存至dependencies节点；
          一般保存在dependencies的像这些express/ejs/body-parser等等。
          devDependencies 里面的插件只用于开发环境，不用于生产环境
          dependencies 是需要发布到生产环境的。

    为什么要保存至package.json？因为node插件包相对来说非常庞大，所以不加入版本管理，
    将配置信息写入package.json并将其加入版本管理，其他开发者对应下载即可
    ****（命令提示符执行npm install（cnpm install 淘宝镜像），则会根据package.json下载所有需要的包，npm install --production只下载dependencies节点的包）***。

    -------npm命令-------
    使用npm卸载插件：npm uninstall <name> [-g] [--save-dev]  PS：不要直接删除本地插件包
    删除全部插件：npm uninstall gulp-less gulp-uglify gulp-concat ……
    借助rimraf：npm install rimraf -g 用法：rimraf node_modules
    使用npm更新插件：npm update <name> [-g] [--save-dev]
    更新全部插件：npm update [--save-dev]
    查看npm帮助：npm help
    当前目录已安装插件：npm list

    更多npm知识参见npm模块安装机制简介，JavaScript 标准参考教程。

三、自动化打包工具
    1.gulp的全局安装
        npm install gulp  -g   全局安装
        gulp -v  查看

    2.创建Gulp项目（本地安装）
      mkdir gulp-imgmin-demo
      cd gulp-imgmin-demo
      npm init
      npm init会在项目下创建一个package.json文件，以保存项目相关信息，如项目名，项目依赖包等。
      (根据npm init的提示逐步回车，填入name：（自己的项目名称），version：(自己项目的版本号)，description：（自己项目的描述），
      entry point：（入口文件） test command：（测试命令），git repository：（git地址），keywords：（关键字），
      author：（作者信息），license：<ISC>（许可协议）。以上根据提示输入相应内容即可（可留空）)

    3.gulp的本地安装
     npm install gulp --save-dev

     注：我们全局安装了gulp，项目也安装了gulp，全局安装gulp是为了执行gulp任务，本地（项目）安装gulp则是为了调用gulp插件的功能。
    4.安装相关的gulp插件
     cnpm install gulp-uglify --save-dev //js压缩
     cnpm install gulp-sass --save-dev //sass转换
     cnpm install gulp-less --save-dev //less转换
     cnpm install gulp-clean-css --save-dev  css代码压缩
     cnpm install gulp-htmlmin --save-dev //html压缩
     cnpm install gulp-imagemin --save-dev //图片压缩
     cnpm install gulp-cache --save-dev  //使用 gulp-cache 插件可以减少重复压缩
     cnpm install gulp-concat --save-dev //代码合并(使用比较困难)
     cnpm install gulp-useref --save-dev  //将多个文件压缩
     cnpm install gulp-jshint --save-dev //js检查
     cnpm install gulp-autoprefixer --save-dev //为css自动加前缀
     cnpm install --save-dev gulp-babel babel-preset-env //将ES6代码编译成ES5
     cnpm install gulp-core --save-dev
     cnpm install gulp-csso --save-dev  //压缩优化css代码
     cnpm install del --save-dev  //由于我们是自动生成文件，我们不想旧文件掺杂进来
     cnpm install run-sequence --save-dev //保证任务执行的顺序
     cnpm install gulp-rename --save-dev 修改文件名，例如将demo.css修改为demo.min.css，一般配合gulp-minify-css/gulp-uglify压缩插件一起使用

     npm install browser-sync --save-dev  //使用浏览器自动刷新

    5.gulp的使用
    gulp主要有5个方法：task，run，watch，src，dest
    详细介绍见：https://segmentfault.com/a/1190000002408159
                https://www.gulpjs.com.cn/docs/api/
    5.1 task
       语法：gulp.task(name[, deps], fn)
       --name
         类型：string
         任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。
       --deps
         类型： Array
         一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。
         注意： 你的任务是否在这些前置依赖的任务完成之前运行了？
         请一定要确保你所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream。
    5.2 watch
      gulp.watch(glob[, opts], tasks)
          glob  类型： String or Array
              一个 glob 字符串，或者一个包含多个glob 字符串的数组，用来指定具体监控哪些文件的变动。
          opts   类型： Object
          tasks  类型： Array  需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字
          例如：
            gulp.watch('js/**/*.js', ['uglify','reload']);

       gulp.watch(glob[, opts, cb])
       glob 类型： String or Array
         一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。
      opts
       类型： Object
       传给 gaze 的参数。

       cb(event) 类型： Function
       每次变动需要执行的 callback。
       gulp.watch('js/**/*.js', function(event) {
         console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
       });
     5.3 src

     5.4 dest




   6.项目运用---mgui
     1)创建目录结构
      mgui
         ---dist
         ---src
             ---css
             ---js
             ---less
             ---fonts
             ---images
             ---index.html
         ---gulpfile.js
         ---package.json
         ---README.md
    2)创建任务
      a)默认的任务：
          gulp.task("default",function(){
             //执行gulp，则会调用该段代码

          })
      b)sass/less转换代码
        gulp.task("less",function () {
          return gulp.src("src/less/mgui.less")
               .pipe(less())
               .pipe(gulp.dest('src/css'));
        });

      c)合并js代码、css代码
        gulp-useref语法：
        <!-- build:<type> <path> -->
        ... HTML Markup, list of script / link tags.
        <!-- endbuild -->

        gulpfile.js中
        var useref = require('gulp-useref');
        useref()

      d)压缩js代码
      var uglify = require('gulp-uglify');
          uglify()

      e)压缩css代码
        var cleanCSS = require('gulp-clean-css');
        cleanCss()

      f)压缩图片
        var imagemin = require('gulp-imagemin');
        var cache  = require('gulp-cache');

        gulp-imagemin方法调用时的相关属性
         optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
         progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
         interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
         multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化


      g)gulp-if 条件判断 gulpIf(condition,执行的代码)
      h)del
       由于我们是自动生成文件，我们不想旧文件掺杂进来。
       npm install del --save-dev

         Node中的通配符大部分时候，我们只需要用到下面4种匹配模式：
             *.scss ： * 号匹配当前目录任意文件，所以这里 *.scss 匹配当前目录下所有scss文件
             **/*.scss ：匹配当前目录及其子目录下的所有scss文件。
             !not-me.scss ：！号移除匹配的文件，这里将移除not-me.scss
             *.+(scss|sass) ：+号后面会跟着圆括号，里面的元素用|分割，匹配多个选项。这里将匹配scss和sass文件。


      i)使用Browser Sync自动刷新
      j)run-sequence同步执行
       使用方法
       执行前端代码自动构建，一般会分为以下几个步骤
       1. 清理目标目录（任务：clean）
       2. 代码压缩打包，这其中包括对JS，CSS，HTML以及图片的处理（任务：minify:js，minify:css，minify:html，minify:image）
       3. 监控（任务：watch）

       首先执行第一步操作，清理目标目录，清理完成后方可执行打包动作。
       然后执行第二步操作，这个步骤里又可以细分为几个任务，但是几个任务相互之间并没有依赖关系，因此可以并行。
       最后执行第三步操作，监控代码变改，必须在第二步所有任务全部执行完成后方可执行

       最终代码
    
       var gulp        = require('gulp'),
           runSequence = require('run-sequence'),
           pump        = require('pump');

       gulp.task('default', function(cb) {
           runSequence(
               'clean', // 第一步：清理目标目录
               ['minify:js', 'minify:css', 'minify:html', 'minify:image'], // 第二步：打包
               'watch', // 第三步：监控
               cb
           );
       });

      k）gulp-rename使用方法
      例1：与插件gulp-clean-css(不会用？请参考)组合使用，实现对CSS文件压缩后更名为 xxx.min.css

      var gulp        = require('gulp'),
          minifyCss   = require('gulp-minify-css'),
          rename      = require('gulp-rename'),
          pump        = require('pump');
      gulp.task('testRenameCss', function(cb) {
          pump([
              gulp.src('src/css/*.css'),
              rename({suffix: '.min'})
              minifyCss({
                  keepSpecialComments: '*'
              }),
              gulp.dest('dist/css')
          ])
      });

      例2：与插件gulp-uglify(不会用？请参考)组合使用，实现对JS文件压缩后更名为 xxx.min.js

      var gulp       = require('gulp'),
          minifyCss  = require('gulp-uglify'),
          rename     = require('gulp-rename'),
          pump       = require('pump');

      gulp.task('testRenameJs', function(cb) {
          pump([
              gulp.src('src/js/*.js'),
              rename({suffix: '.min'}),
              uglify(),
              gulp.dest('dist/js')
          ])
      });

