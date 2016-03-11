import 'babel-register'
import gulp from 'gulp'
import gutil from "gulp-util"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import webpackConfig from "./webpack.config.js"
import standard from "gulp-standard"
import uglify from 'gulp-uglify'
import del from 'del'
import mocha from 'gulp-mocha'
import istanbul from 'gulp-istanbul'
var isparta = require('isparta')
import runSequence from 'run-sequence'

var paths = {
  scripts: ['src/**/*.js','src/**/*.jsx'],
	test: ['src/test/**/*.js', 'src/test/**/*.jsx'],
	publicFiles: ['src/dist/*.js']
  //images: 'client/img/**/*'
} 

gulp.task('clean', function() { return del(['src/dist']) })

gulp.task('watch', function() {
	gulp.watch(paths.scripts, () => { runSequence('webpack:build-dev', 'standard') })
})

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"])

gulp.task("dev", () => { runSequence('clean', "webpack:build-dev", 'standard', 'watch') })

gulp.task("build", () => { runSequence('clean', 'standard', "webpack:build", 'uglify') })

gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig)
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	) 

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err) 
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		})) 
		callback() 
	}) 
})

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig)
myDevConfig.devtool = "sourcemap"
myDevConfig.debug = true

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig) 

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err) 
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		})) 
		callback() 
	}) 
}) 

gulp.task('standard', function () {
  return gulp.src([myDevConfig.entry.app])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
})

gulp.task('uglify', function() {
  return gulp.src(paths.publicFiles)
    .pipe(uglify())
    .pipe(gulp.dest('src/dist'))
})

gulp.task("webpack-dev-server", function() {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig) 
	myConfig.devtool = "eval" 
	myConfig.debug = true 

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(3000, "localhost", function (err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err) 
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html") 
	}) 
})

gulp.task('pre-test', function () {
  return gulp.src(paths.scripts)
    // Covering files
    .pipe(istanbul({instrumenter: isparta.Instrumenter}))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
}) 

gulp.task('test', ['pre-test'], function () {
  return gulp.src(paths.test)
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
})

gulp.task('watch-test',  function () {
    gulp.watch(paths.test, ['test'])
})
