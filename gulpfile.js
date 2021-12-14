const {src, dest, parallel, series, watch} = require("gulp")
const plumber = require("gulp-plumber")
const sourcemaps = require("gulp-sourcemaps")
const rename = require("gulp-rename")

const imageResize = require("gulp-image-resize")
const imagemin = require("gulp-imagemin")
const webp = require("gulp-webp")

const sass = require("gulp-sass")(require("sass"))
const postcss = require("gulp-postcss")
const cssnano = require("cssnano")
const autoprefixer = require("autoprefixer")

const ts = require("gulp-typescript")
const terser = require("gulp-terser-js")

const paths = {
    imgFotoSrc : "./src/img/foto/*.jpg",
    imgBase : "./src/",
    imgDest : "./build/",
    imgRetoqueSrc : "./src/img/retoque/*.jpg",

    jsSrc : "./src/ts/**/*.ts",
    jsDest : "./build/js/",

    cssSrc : "./src/scss/**/*.scss",
    cssDest : "./build/css/",
}

function imgFotoBig(done) {
    let i = 1
    src( paths.imgFotoSrc, {base: paths.imgBase} )
        .pipe( plumber() )
        .pipe( rename(path=>path.basename = "img-" + i++ + "-b") )
        .pipe( imagemin() )
        .pipe( dest( paths.imgDest ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.imgDest ) ) //webp
    done()
}
function imgFotoMedium(done) {
    let i = 1
    src( paths.imgFotoSrc, {base: paths.imgBase} )
        .pipe( plumber() )
        .pipe( imageResize({
            width : 500,
            crop : false,
            upscale : false,
            imageMagick : true
        }) )
        .pipe( rename(path=>path.basename = "img-" + i++ + "-m") )
        .pipe( imagemin() )
        .pipe( dest( paths.imgDest ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.imgDest ) ) //webp
    done()
}
function imgFotoSmall(done) {
    let i = 1
    src( paths.imgFotoSrc, {base: paths.imgBase} )
        .pipe( plumber() )
        .pipe( imageResize({
            width : 300,
            crop : false,
            upscale : false,
            imageMagick : true
        }) )
        .pipe( rename(path=>path.basename = "img-" + i++ + "-s") )
        .pipe( imagemin() )
        .pipe( dest( paths.imgDest ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.imgDest ) ) //webp
    done()
}
function imgRetoque(done) {
    src( paths.imgRetoqueSrc, {base: paths.imgBase} )
        .pipe( plumber() )
        .pipe( imageResize({
            width : 600,
            crop : false,
            upscale : false,
            imageMagick : true
        }) )
        .pipe( imagemin() )
        .pipe( dest( paths.imgDest ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.imgDest ) ) //webp
    done()
}

function css(done) {
    src( paths.cssSrc )   
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([autoprefixer(), cssnano()]) )
        .pipe( rename({basename: "bundle.min"}) )
        .pipe( sourcemaps.write(".") )
        .pipe( dest( paths.cssDest ) )
    done()
}

function js(done) {
    src( paths.jsSrc )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( ts({
            "strict" : true,
            "target": "es6",
            "outFile": "bundle.min.js"
        }) )
        .pipe( terser() )
        .pipe( sourcemaps.write(".") )
        .pipe( dest( paths.jsDest ) )
    done()
}

function watchFiles(done) {
    watch("./src/scss", css)
    watch("./src/ts", js)
    done()
}

exports.img = series(imgFotoBig, imgFotoMedium, imgFotoSmall, imgRetoque)

exports.css = css
exports.js = js

exports.dev = parallel(css, js)
exports.default = parallel(css, js, watchFiles)