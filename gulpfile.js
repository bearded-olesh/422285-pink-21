const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css/"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Scripts

const scripts = () => {
  return gulp.src("source/js/**/*.js")
    .pipe(gulp.dest("build/js/"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Pages

const html = () => {
  return gulp.src("source/**/*.html")
    .pipe(gulp.dest("build/"))
    .pipe(sync.stream());
}

exports.html = html;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}
exports.images = images;

// CreateWebp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img/webp"))
}
exports.createWebp = createWebp;

// Copy

const copy = () => {
  return gulp.src(["source/fonts/**/*.{woff2,woff}"],
    {
      base: "source"
    })
    .pipe(gulp.dest("build/"))
}
exports.copy = copy;

// Clean

const clean = () => {
  return del("build")
}
exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/**/*.js", gulp.series("scripts"));
  gulp.watch("source/**/*.html", gulp.series("html"));
  gulp.watch("source/**/*.html").on("change", sync.reload);
}

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    scripts,
    html,
    images,
    createWebp,
    copy
  )
)

exports.build = build;

exports.default = gulp.series(
  styles, scripts, html, server, watcher
);
