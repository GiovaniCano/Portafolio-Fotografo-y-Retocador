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
    srcFoto : "./src/img/foto/**/*.jpg",
    destFoto : "./build/img/foto/",

    srcFotoV : "./src/img/foto/v/*.jpg",
    destFotoV : "./build/img/foto/v/",

    srcFotoHC : "./src/img/foto/hc/*.jpg",
    destFotoHC : "./build/img/foto/hc/",
    
    srcRet : "./src/img/retoque/*.jpg",
    destRet : "./build/img/retoque/",

    srcJS : "./src/ts/**/*.ts",
    destJS : "./build/js/",

    srcCSS : "./src/scss/**/*.scss",
    destCSS : "./build/css/"
}

function imgFotoBig(done) {
    let i = 1
    src( paths.srcFoto )
        .pipe( plumber() )
        .pipe( rename(path=>{
            path.basename = "img-" + i++ + "-b"
            path.dirname = ""
        }) )
        .pipe( imagemin() )
        .pipe( dest( paths.destFoto ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.destFoto ) ) //webp
    done()
}
function imgFotoMedium(done) {
    let i = 1
    src( paths.srcFoto )
        .pipe( plumber() )
        .pipe( imageResize({
            width : 500,
            crop : false,
            upscale : false,
            imageMagick : true
        }) )
        .pipe( rename(path=>{
            path.basename = "img-" + i++ + "-m"
            path.dirname = ""
        }) )
        .pipe( imagemin() )
        .pipe( dest( paths.destFoto ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.destFoto ) ) //webp
    done()
}
function imgFotoIndexV(done) { //small vertical
    let i = 1
    src( paths.srcFotoV )
        .pipe( plumber() )
        .pipe( imageResize({
            width : 340,
            crop : false,
            upscale : false,
            imageMagick : true
        }) )
        .pipe( rename(path=>path.basename = "img-" + i++) )
        .pipe( imagemin() )
        .pipe( dest( paths.destFotoV ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.destFotoV ) ) //webp
    done()
}
function imgFotoIndexHC(done) { //small vertical
    let i = 1
    src( paths.srcFotoHC )
        .pipe( plumber() )
        .pipe( imageResize({
            width : 340,
            crop : false,
            upscale : false,
            imageMagick : true
        }) )
        .pipe( rename(path=>path.basename = "img-" + i++) )
        .pipe( imagemin() )
        .pipe( dest( paths.destFotoHC ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.destFotoHC ) ) //webp
    done()
}
function imgRetoque(done) {
    src( paths.srcRet )
        .pipe( plumber() )
        .pipe( imageResize({
            width : 600,
            crop : false,
            upscale : false,
            imageMagick : true
        }) )
        .pipe( imagemin() )
        .pipe( dest( paths.destRet ) ) //jpg
        .pipe( webp() )
        .pipe( dest( paths.destRet ) ) //webp
    done()
}

function css(done) {
    src( paths.srcCSS )   
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([autoprefixer(), cssnano()]) )
        .pipe( rename({basename: "bundle.min"}) )
        .pipe( sourcemaps.write(".") )
        .pipe( dest( paths.destCSS ) )
    done()
}
function js(done) {
    src( paths.srcJS )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( ts({
            "strict" : true,
            "target": "es6",
            "outFile": "bundle.min.js"
        }) )
        .pipe( terser() )
        .pipe( sourcemaps.write(".") )
        .pipe( dest( paths.destJS ) )
    done()
}

function watchFiles(done) {
    watch("./src/scss", css)
    watch("./src/ts", js)
    done()
}

exports.img = series(imgFotoBig, imgFotoMedium, imgFotoIndexV, imgFotoIndexHC, imgRetoque)

exports.css = css
exports.js = js

exports.dev = parallel(css, js)
exports.default = parallel(css, js, watchFiles)