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
    ****（命令提示符执行npm install，则会根据package.json下载所有需要的包，npm install --production只下载dependencies节点的包）***。

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
     npm install gulp-uglify --save-dev //js压缩
     cnpm install gulp-sass --save-dev //sass转换
     cnpm install gulp-less --save-dev //less转换
     npm install gulp-htmlmin --save-dev //html压缩
     cnpm install gulp-imagemin --save-dev //图片压缩
     npm install gulp-concat --save-dev //代码合并
     npm install gulp-jshint --save-dev //js检查
     npm install gulp-autoprefixer --save-dev //为css自动加前缀
     npm install --save-dev gulp-babel babel-preset-env //将ES6代码编译成ES5
     npm install gulp-csso --save-dev  //压缩优化css代码
    5.gulp的使用
    gulp主要有5个方法：task，run，watch，src，dest
    详细介绍见：https://segmentfault.com/a/1190000002408159



