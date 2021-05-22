const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//compile sass into css
let style = () =>{
    //find the css file
    return gulp.src('./src/**/*.scss')

    //pass that file naar de compiler
    .pipe(sass())

    //waar is de compiled css saved
    .pipe(gulp.dest('./public/stylesheets'))

    //stream changes to al browsers
    .pipe(browserSync.stream())

}

let watch = () => {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
    gulp.watch('./src/**/*.scss', style);
    gulp.watch('./public/*.html').on('change', browserSync.reload);
    gulp.watch('./public/javascripts/*.js').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;
