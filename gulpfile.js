var gulp = require('gulp'); 

// include plug-ins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var htmlhint = require('gulp-htmlhint');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './src/'
        },
		port: 8000
    });
});

// JS hint task
gulp.task('jshint', function() {
	gulp.src('./src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(browserSync.reload({stream: true}));
});

//https://www.browsersync.io/docs/gulp#gulp-reload

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

// Sass task
gulp.task('styles', function() {
	gulp.src('./src/styles/sass/**/*.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulp.dest('./src/styles/css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('htmlvalidation', function() {
	gulp.src('./src/**/*.html')
		.pipe(htmlhint())
		.pipe(htmlhint.reporter())
		.pipe(browserSync.reload({stream: true}));
});

// default gulp task
gulp.task('default', ['browserSync', 'jshint', 'styles', 'htmlvalidation'], function() {
	
	// watch for HTML changes
	gulp.watch('./src/**/*.html', function() {
	  gulp.run('htmlvalidation');
	});

	// watch for JS changes
	gulp.watch('./src/scripts/*.js', function() {
		gulp.run('jshint');
	});

	// watch for CSS changes
	gulp.watch('./src/styles/sass/*.scss', function() {
		gulp.run('styles');
	});
});