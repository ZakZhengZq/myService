/**
 * Created by dell on 2017/5/24.
 */
var gulp =require("gulp");//创建 gulp模块
var uglify=require("gulp-uglify");//创建js混淆压缩 模块
var minify_css =require("gulp-minify-css");　//创建 css混淆压缩模块
var gulp_concat = require('gulp-concat');  //创建 文件合并模块

gulp.task('min-css',function(){  //1
    gulp.src(['','./static/css/'])  //2
        .pipe(gulp_concat(""))//3
        .pipe(minify_css())//4.混淆即压缩
        .pipe(gulp.dest('./static/css'));//5.输出路径
});