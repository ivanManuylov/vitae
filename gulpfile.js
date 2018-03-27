var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    pug = require('gulp-jade'); // Подключение Pug
    //smartgrid = require('smart-grid'); // connecting Smart grid
 
// чтобы запустить эту задачу, наберите в командной строке gulp jade
gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.+(scss|sass)') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('pug', function() {
  return gulp.src('app/pug/*.pug')
      .pipe(pug()) 
      .pipe(gulp.dest('app')); // указываем gulp куда положить скомпилированные HTML файлы
});
gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
  gulp.watch('app/pug/*.pug', ['pug'])
});
