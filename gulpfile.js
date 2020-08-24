let gulp = require('gulp'),
   // cleanCSS = require('gulp-clean-css'),
    cnct = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    minifyJS = require('gulp-minify'),
    uglify = require('gulp-uglify');
    /* 
    
    less = require('gulp-less'),
     // Подключаем библиотеку для работы с изображениями
     // Подключаем библиотеку для работы с png
     // Подключаем библиотеку кеширования
    merge = require('merge-stream'), // Подключаем merge
     */

//let browserSync = require('browser-sync').create();

let pathBuild = './dist/';
let pathSrc = './src/';

gulp.task('scripts', () => {
	return gulp.src(pathSrc +'js/plugins/*.js')
		.pipe(cnct('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(pathBuild + 'js'));
});

gulp.task('bundle', () => {
    return gulp.src(pathSrc + 'css/**/*.css')
        .pipe(cssnano())
		.pipe(cnct('bundle.min.css'))
		.pipe(gulp.dest(pathSrc + 'css'));
});

gulp.task('prefix', () => {
    return gulp.src(pathSrc + 'css/**/*.less')
        .pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 15 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(pathSrc + 'css'));
});


/* gulp.task('css', () => {
    return gulp.src('src/css/style.css')
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/css'));
}); */

gulp.task('img', function () {
    return gulp.src(pathSrc + 'img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(pathBuild + 'img'));
});

gulp.task('move', (done) => {
	const buildCSS = gulp.src('src/css/bundle.min.css')
		.pipe(gulp.dest(pathBuild + 'css'));

	const buildImg = gulp.src('src/img/**/*')
		.pipe(gulp.dest(pathBuild + 'img'));

	const buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest(pathBuild + 'fonts'));

	const buildJS = gulp.src('src/js/main.js')
        .pipe(gulp.dest(pathBuild + 'js'));
        
    const buildVideo = gulp.src('src/video/**/*')
        .pipe(gulp.dest(pathBuild + 'video'));
        
    const buildFavicon = gulp.src('src/favicon/**/*')
		.pipe(gulp.dest(pathBuild + 'favicon'));

	const buildHTML = gulp.src('src/*.html')
		.pipe(gulp.dest(pathBuild));
	done();
});

gulp.task('build', gulp.series(gulp.parallel('prefix', 'img', 'scripts'), 'bundle', 'move'), function (done) {
	done();
});