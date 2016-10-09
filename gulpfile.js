var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    port:80
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sass()) // Passes it through a gulp-sass
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('hbs2html', function () {
    var templateData = {
        firstName: 'Gila',
        lastName: 'De Lauren',
        description: 'She is an Italian-born American chef, writer, television personality, and the host of the current Food Network television program Food Paradise',
        dish:[
          {src:'images/img-deviled-eggs.png', alt:'Pickled Shrimp', desc:"Bar American's Pickled Shrimp Deviled Eggs with Cornichon Remoulade"},
          {src:'images/img-roulade-cover.png', alt:'Turkey Roulade', desc:'Turkey Roulade with "Stovetop" Stuffing'},
          {src:'images/img-fresh-tomato-sauce-cover.png', alt:'Pasta', desc:'Pasta with Fresh Tomato Sauce'}
        ],
        special:[
          {title:'Barbeque: Cali Style', src:'images/img-the-ingredients-cover.png', alt:'Ingredients', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra molestie purus in vehicula. Aliquam erat volutpat. Praesent fringilla lorem at nisi venenatis egestas quis non nulla. Integer blandit tempus fermentum. Phasellus id congue eros. Vestibulum dapibus tristique libero, quis mattis risus volutpat a. Quisque efficitur ligula diam, vitae viverra arcu consectetur vel. Vivamus nunc augue, pharetra vel augue sed, vestibulum vulputate urna. Maecenas aliquet sed lacus quis semper. Nullam convallis enim ac convallis consectetur. Maecenas id laoreet lacus. Donec cursus nulla eget tincidunt faucibus.'},
          {title:'The Perfect Fruitcake', src:'images/img-fruitcake-cover.png', alt:'Fruitcake', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra molestie purus in vehicula. Aliquam erat volutpat. Praesent fringilla lorem at nisi venenatis egestas quis non nulla. Integer blandit tempus fermentum. Phasellus id congue eros. Vestibulum dapibus tristique libero, quis mattis risus volutpat a. Quisque efficitur ligula diam, vitae viverra arcu consectetur vel. Vivamus nunc augue, pharetra vel augue sed, vestibulum vulputate urna. Maecenas aliquet sed lacus quis semper. Nullam convallis enim ac convallis consectetur. Maecenas id laoreet lacus. Donec cursus nulla eget tincidunt faucibus.'},
          {title:"Spice-Crusted Salmon: A Holiday Dinner That's As Impressive As It Is Quick", src:'images/img-salmon-cover.png', alt:'Salmon', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra molestie purus in vehicula. Aliquam erat volutpat. Praesent fringilla lorem at nisi venenatis egestas quis non nulla. Integer blandit tempus fermentum. Phasellus id congue eros. Vestibulum dapibus tristique libero, quis mattis risus volutpat a. Quisque efficitur ligula diam, vitae viverra arcu consectetur vel. Vivamus nunc augue, pharetra vel augue sed, vestibulum vulputate urna. Maecenas aliquet sed lacus quis semper. Nullam convallis enim ac convallis consectetur. Maecenas id laoreet lacus. Donec cursus nulla eget tincidunt faucibus.'}
        ],
        restaurant:[
          {title:'Deli Bar', src:'images/img-restaurante-1.png', alt:'Deli Bar', street:'156 Lafayette Street', city:'New York, NY 10012', number:'212 667 6400', website:'delibar.com'},
          {title:'Bar New York', src:'images/img-restaurant-2.png', alt:'Bar New York', street:'756 W. 52nd Street', city:'New York, NY 10012', number:'214 265 8900', website:'bar-new-york.com'},
          {title:'Bar Tokio Sun', src:'images/img-restaurant-3.png', alt:'Bar Tokio Sun', street:'11 Mohegan Sun Boulevard', city:'Uncasville, CT 06382', number:'756 862 3529', website:'tokisun.com'}
        ],
        blog:[
          {title:'Rhubarb: The Vegetable That Acts Like a Fruit', img:false, src:"", alt:'', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra molestie purus in vehicula. Aliquam erat volutpat. Praesent fringilla lorem at nisi venenatis egestas quis non nulla. Integer blandit tempus fermentum. Phasellus id congue eros. Vestibulum dapibus tristique libero, quis mattis risus volutpat a. Quisque efficitur ligula diam, vitae viverra arcu consectetur vel.',
          titleColor:'#fff', titleBackground:'#a3b90d', conentBackground:'#e3eab6'},
          {title:"Spice-Crusted Salmon: A Holiday Dinner That's As Impressive As It Is Quick", img:false, src:"", alt:'', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra molestie purus in vehicula. Aliquam erat volutpat. Praesent fringilla lorem at nisi venenatis egestas quis non nulla. Integer blandit tempus fermentum. Phasellus id congue eros. Vestibulum dapibus tristique libero, quis mattis risus volutpat a. Quisque efficitur ligula diam, vitae viverra arcu consectetur vel.',
          titleColor:'#fff', titleBackground:'#00a6a6', conentBackground:'#b2e4e4'},
          {title:'A New Favorite Take on an Old Mediterranean Grain', img:true, src:"images/img-eggplant-manchego-salad-cover.png", alt:'Eggplant Manchego Salad', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra molestie purus in vehicula. Aliquam erat volutpat. Praesent fringilla lorem at nisi venenatis egestas quis non nulla. Integer blandit tempus fermentum.',
          titleColor:'#00a6a6', titleBackground:'#fff', conentBackground:'#fff'}
        ]
    },
    options = {
        ignorePartials: true,
        batch : ['./app/partials'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            },
            fullName:function(){
                return templateData.firstName+" "+templateData.lastName;
            }
        }
    }

    return gulp.src('app/index.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
          stream: true
        }));
});

gulp.task('autoprefixer', () =>
    gulp.src('app/css/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
);

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.hbs', ['hbs2html']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.css', cssnano()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['hbs2html','sass', 'autoprefixer', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    'hbs2html',
    ['useref', 'images', 'fonts'],
    callback
  )
})
