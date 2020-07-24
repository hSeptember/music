// var gulp = require("gulp");
const { series,src,dest,watch } = require('gulp')

var imagemin = require("gulp-imagemin") // 压缩图片插件
var newer = require("gulp-newer") // 检查是否压缩过
var htmlClean = require("gulp-htmlclean") // 压缩HTML代码
var uglify = require("gulp-uglify") // 压缩js代码
var strip = require("gulp-strip-debug") // 取出JS文件中的console和debug语句
var concat = require("gulp-concat") // 拼接所有的js文件
var less = require("gulp-less"); // 将less文件转换css文件
var cssnano = require("gulp-cssnano") // 压缩css代码
var autoprefixer = require("gulp-autoprefixer") // 自动添加css3的前缀
var postcss = require("gulp-postcss") // 将css文件转化JS代码
var connect = require("gulp-connect") // 本地服务器
const gulpCssnano = require('gulp-cssnano')




/*
    gulp.src() 读文件
    gulp.dest() 写文件
    gulp.task() 任务
    gulp.watch() 监听
    series 任务按顺序执行
*/

// folder文件夹
// var folder = {
//     src : './src/',
//     dist : './dist/'
// }


// 创建html任务
function html(){
    return src('./src/html/*')
            .pipe(htmlClean())
            .pipe(dest('./dist/html'))
}

// 创建图片任务
function images(){
   return src('./src/images/*') // 流读取虚拟对象 task running
            .pipe(newer('images'))
            .pipe(imagemin())
            .pipe(dest('./dist/images')) // 将虚拟对象写入文件系统的流中
    // 通过node API --> pipe传输文件
}

// 创建js文件
// gulp.task('js',function(){
//     gulp.src(folder.src + 'js/*')
//         .pipe(strip())
//         .pipe(concat(main.js))
//         .pipe(uglify())
//         .pipe(gulp.dest(folder.dist + 'js'))
// })

function js(){
    return src('./src/js/*')
            .pipe(strip())
            .pipe(concat('main.js'))
            // .pipe(uglify())  (可能少babel()才出现错误)
            .pipe(dest('./dist/js'))
}

// 创建css文件
function css(){
    return src('./src/css/*')
            .pipe(less())
            .pipe(cssnano())
            .pipe(dest('./dist/css'))
}

// 监听变化实时改变
// function watchAll(){
//     watch('./src/html/*.html',html)
//     watch('./src/images/*',images)
//     watch('./src/js/*.js',js)
//     watch('./src/css/*.css',css)
// }

// 搭建服务器
function server(done) {
    connect.server({
        livereload: true,
    })
    done()
}


// 创建默认任务
// gulp.task('default',['html','images','js','css'])
function defaultTask(){
    return series(html,images,js,css,server)
}

exports.default = defaultTask()
// exports.default = server
