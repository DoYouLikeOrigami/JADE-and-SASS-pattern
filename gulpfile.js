/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	//compass     = require('gulp-compass'),
	jade        = require('gulp-jade'),
	scss = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	plumber     = require('gulp-plumber');

/* --------- paths --------- */

var
	paths = {
		jade : {
			location: 'app/markups/**/*.jade',
			compiled: 'app/markups/_pages/*.jade',
			destination: 'app'
		},

		scss : {
			location    : 'app/scss/**/*.scss',
			entryPoint  : 'app/css/main.css',
			destination: 'app/css'
		},

		/*compass : {
			configFile  : 'config.rb',
			cssFolder   : 'css',
			scssFolder  : 'styles',
			imgFolder   : 'img'
		},*/

		browserSync : {
			baseDir : 'app',
			watchPaths : ['app/*.html', 
						  'app/css/**/*.css', 
						  'app/js/**/*.js']
		}
	};

/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync.init({
		port: 9000,
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});



gulp.task('watch', function () {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});

/* --------- jade --------- */

gulp.task('jade', function() {
	gulp.src(paths.jade.compiled)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- scss --------- */

gulp.task('scss', function () {
  gulp.src(paths.scss.location)
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest(paths.scss.destination));
});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['scss']);
	gulp.watch(['app/*.html','app/js/**/*.js','app/css/**/*.css']).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['jade', 'sync', 'watch']);