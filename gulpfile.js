const gulp     = require('gulp');
const plugins  = require('gulp-load-plugins')();
const tasks    = require('fs').readdirSync('./tasks/');
const config   = require('./sparky');
const path     = require('path');

/**
 * To see a list of plugins and their var name simply run gulp get-plugins
 */
 gulp.task('get-plugins', () => {
   console.log(plugins);
 })

/**
 * Run each task in the Task array : Each file in build-tasks/
 */
tasks.forEach((task) => {
    require('./tasks/' + task)(gulp, plugins, config, path)
});

/**
 * Watcher Tasks
 */
gulp.task('watch', ['webserver'], () => {
    gulp.watch('./app/styles/**/*',   ['styles']);
    gulp.watch('./app/images/**/*',   ['images']);
    gulp.watch('./app/views/**/*',    ['views']);
    gulp.watch('./app/articles/**/*', ['articles']);
    gulp.watch('./app/scripts/**/*',  ['bundle-scripts']);
});

/**
 * Default Task
 */
gulp.task('default', () => {
    gulp.start('styles', 'bundle-scripts', 'images', 'build-views', 'watch');
});

/**
 * Production Task
 * Run this task before deploying the contents of dist/
 */
gulp.task('production', () => {
    gulp.start('styles', 'bundle-scripts', 'images', 'build-views', 'generate-sitemap');
});
