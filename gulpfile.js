const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const tap = require('gulp-tap');
const es2015 = require('babel-preset-es2015');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync')
  .create();
const fs = require('fs');
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

gulp.task('browser-sync', ['sass', 'script', 'view-html', 'view-script',
    'copy-js', 'copy-assets'
  ],
  function() {

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
    gulp.watch("src/style/**/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['script']);
    gulp.watch("src/**/*.html", ['view-html'])
    gulp.watch("src/lib/**/*", ['copy-js'])
    gulp.watch("src/assets/**/*", ['copy-assets'])
    gulp.watch(["src/view/**/*.js", "src/router.js"], ['view-script'])
  })


//编译sass
gulp.task('sass', function() {
  return gulp.src("src/style/main.scss")
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

// 将所有模板打包到index.html
gulp.task('view-html', function() {
  gulp.src('src/index.html')
    .pipe(tap(function(file) {
      var dir = path.dirname(file.path);
      var contents = file.contents.toString();
      contents = contents.replace(
        /<link\s+rel="import"\s+href="(.*)">/gi,
        function(match, $1) {
          var filename = path.join(dir, $1);
          var id = path.basename(filename, '.html');
          var content = fs.readFileSync(filename, 'utf-8');
          var nameArr = $1.split("/");
          var tplName = "";
          for (var i = 2; i < nameArr.length - 1; i++) {
            tplName += nameArr[i] + "_";
          }
          return '<script type="text/html" id="tpl_' + tplName + id +
            '">\n' + content + '\n</script>';
        });
      file.contents = new Buffer(contents);
    }))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.reload({
      stream: true
    }));
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

// 将所有router打包一起
gulp.task('view-script', function() {
  return gulp.src('./src/router.js')
    .pipe(sourcemaps.init())
    .pipe(tap(function(file) {
      var dir = path.dirname(file.path);
      var contents = file.contents.toString();
      contents = contents.replace(/require\(["'](.*)["']\);/gi,
        function(match, $1) {
          var filename = path.join(dir, $1);
          var id = path.basename(filename, '.html');
          var content = fs.readFileSync(filename, 'utf-8');
          return content;
        });
      file.contents = new Buffer(contents);
    }))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./app/js/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//拷贝lib库
gulp.task('copy-js', function() {
  return gulp.src('./src/lib/**/*.js')
    .pipe(gulp.dest('./app/js/'))
    .pipe(browserSync.stream());
})

// 拷贝资源文件
gulp.task('copy-assets', function() {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./app/assets/'))
    .pipe(browserSync.stream());
})


gulp.task('default', ['browser-sync']);
