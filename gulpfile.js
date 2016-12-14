const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync')
  .create();
const proxyMiddleware = require('http-proxy-middleware');

//配置请求的地址
const proxyTable = {
  //	'/': {
  //          target: 'http://www.qinqinevent.com/',
  //          changeOrigin: true,
  //          logLevel: 'debug'
  //      }
}

const proxyArr = [];
Object.keys(proxyTable)
  .forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {
        target: options
      }
    }
    proxyArr.push(proxyMiddleware(context, options));
  })

gulp.task('browser-sync', ['sass', 'script', 'html', 'copy'], function() {

  browserSync.init({
    server: {
      baseDir: './app',
      middleware: proxyArr,
    },
    browser: ["google chrome"], //指定打开的浏览器
    // open: false,
    // host: '192.168.199.1',
    startPath: '/' //打开的位置

  });

  //监听
  gulp.watch("src/style/scss/*.scss", ['sass']);
  gulp.watch("src/js/**/*.js", ['script']);
  gulp.watch("src/*.html", ['html'])
  gulp.watch("src/lib/**/*", ['copy'])
})


//编译sass
gulp.task('sass', function() {
  return gulp.src("src/style/scss/*.scss")
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('main.css'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

//监听js
gulp.task('script', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat({
      path: 'main.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/js/'))
});

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream());
})

gulp.task('copy', function() {
  return gulp.src('./src/lib/**/*.js')
    .pipe(gulp.dest('./app/js/'))
    .pipe(browserSync.stream());
})

gulp.task('default', ['browser-sync']);
