/*
 命令列表：
 gulp            // 默认的任务,包含connect、watch
 gulp html       // 生成html
 gulp less       // 生成less
 gulp js         // 生成js
 gulp all        //包含gulp sprite、gulp imagemin
 gulp sprite     // 生成sprite 雪碧图
 gulp imagemin   // 压缩original中的图片
 gulp clean      //清理生成的文件(Static、less/sprite)
 gulp create     // 生成image、html、css、js
 config    //**** 需要更改的配置项 ***********
 */

var config = {
    base: 'D:/WWW/Demo/',
    singleWatch: true,
};

var gulp = require('gulp');
var gulpif = require('gulp-if');
var gulpSequence = require('gulp-sequence');

// 引入gulp组件(插件)
var watch = require('gulp-watch');
var connect = require('gulp-connect');


var imagemin = require('gulp-imagemin');
// var less = require('less');

var less = require('gulp-less');
var fileinclude = require('gulp-file-include');

var clean = require('gulp-clean');


var path = require('path');
/*********************服务、总任务************************/
//静态web服务器配置
gulp.task('connect', function() {
    connect.server({
        root: '.',
        port: 8181,
        livereload: true
    });
});
//connect实时刷新
gulp.task('reload',function() {
    //reload()函数 跟新界面函数
    gulp.src('./dist-html/**/*.html')
        .pipe(connect.reload());
});


/*********************分任务************************/
// Html
gulp.task('html', function() {
    // return: 防止出现文件写入出错
    return gulp.src('./html/**/*.html')
        .pipe(fileinclude({prefix: '@@',basepath: 'html/'}))
        .pipe(gulp.dest('./dist-html'));
});

//less任务
gulp.task('less',function () {
    gulp.src('less/**/*.less')
    //编译为css
        .pipe(less())
        //存入到css文件夹
        .pipe(gulp.dest('css'))
})

/*********************监听处理************************/
var pathArr,srcPath,distPath;
var watchHandle = function(event,oldPath,rePath,flag){
    var temp;
    pathArr = event.path.split(path.sep);
    srcPath = pathArr.join("/");  //D:ESH/Mine/GulpTest/less/production/easydata/index.less

    temp = distPath = config.base + rePath+ srcPath.slice(config.base.length + oldPath.length);  // "less/production/"
    distPath = distPath.slice(0,distPath.lastIndexOf('/'));

    console.log(srcPath + ':changed');
    if(flag == 1){
        distPath = temp;
    }
    if(flag == 2){
        srcPath = srcPath.slice(0,srcPath.lastIndexOf('/')) + '/*.png';
    }
}

// 监控执行串行任务
gulp.task('imageminReload',function(cb){
    gulpSequence('imagemin','reload',cb);
});



//
var watchSwitch = true;
// Watch
//这个用法是比较简单的监听事件，下面的那个是比较麻烦的
// gulp.task('auto',function () {
//     //监听自动修改
//     gulp.watch('less/**/*.less',['less'])
//     console.log('less has changed');
// })
gulp.task('watch', function() {
    //监听生产环境目录变化
    // watch不能用'./',否则不支持监听新增的文件
    gulp.watch('html/*.html', function (event) {
        if (event.type != 'deleted') {
            watchHandle(event, 'html', 'dist-html');

            if (config.singleWatch) {
                gulp.src(srcPath)
                    .pipe(fileinclude({prefix: '@@', basepath: 'html/'}))
                    .pipe(gulp.dest('dist-html/'))
                    .pipe(connect.reload());
            } else {
                gulp.src('html/*.html')
                    .pipe(fileinclude({prefix: '@@', basepath: 'html'}))
                    .pipe(gulp.dest('./Static/html'))
                    .on('finish', function () {
                        return gulp.src('html/*.*', {read: false})
                            .pipe(connect.reload());
                    });
            }
        }
    });

    gulp.watch('html/public/*.html', function (event) {
        if (event.type != 'deleted') {
            watchHandle(event, 'html/public', 'dist-html/public');

            if (config.singleWatch) {
                gulp.src(srcPath)
                    .pipe(fileinclude({prefix: '@@', basepath: 'html/public'}))
                    .pipe(gulp.dest('dist-html/public'))
                    .pipe(connect.reload())
            } else {
                gulp.src('html/public/*.html')
                    .pipe(fileinclude({prefix: '@@', basepath: 'html/public/'}))
                    .pipe(gulp.dest('./Static/html/public/'))
                    .on('finish', function () {
                        return gulp.src('html/public/*.*', {read: false})
                            .pipe(connect.reload());
                    });
            }
        }
    });
    //监听css的 变化，从而使得界面自动刷新
    gulp.watch('css/**/*.css', function (event) {
        watchHandle(event, 'css/');
        if (event.type != 'deleted') {
            if (config.singleWatch) {
                gulp.src(srcPath).pipe(connect.reload());
            }
        }
    });
    //监听 js的变化，使其无需刷新界面，界面上可以自动使用
    gulp.watch('js/**/*.js', function (event) {
        watchHandle(event, 'js/');
        if (event.type != 'deleted') {
            if (config.singleWatch) {
                gulp.src(srcPath).pipe(connect.reload());
            }
        }
    });

    gulp.watch('dist-html/public/*.html', function (event) {
        watchHandle(event, 'dist-html/public/');
        if (event.type != 'deleted') {
            if (config.singleWatch) {
                gulp.src(srcPath).pipe(connect.reload());
            }
        }
    });
    //监听less的变化，变化了后使其编译成css，然后导致css变化，css变化会更新界面
    gulp.watch('less/**/*.less', ['less']);
});

//默认任务
gulp.task('default', ['connect', 'watch']);


