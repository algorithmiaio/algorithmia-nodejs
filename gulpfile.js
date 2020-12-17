var gulp = require('gulp');
var coffee = require('gulp-coffee');

gulp.task('default', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', function(err){console.log(err);} ))
    .pipe(gulp.dest('./lib/'))
});
