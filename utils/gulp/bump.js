var gulp = require('gulp');
var bump = require('gulp-bump');

gulp.task('bump', function(){
    gulp.src(['./bower.json', './package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function(){
    gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function(){
    gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'));
});