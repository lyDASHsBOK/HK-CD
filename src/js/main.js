/**
 * Created by Envee.
 *
 * Date: 14-10-21
 * Time: 上午8:55
 * @author: <a href="526597516@qq.com">luyc</a>
 * @version: 0.1
 */

goog.provide("root.main");

goog.require("bok.easelui.Stretcher");
goog.require("bok.apps.preloader.CanvasPreloaderApp");
goog.require("bok.apps.preloader.components.BlueCanvasSkin");
goog.require("hkcd.HKCDApp");
goog.require("app.AssetsList");

var preloaderApp, game, rootStretcher, imgContainer = {};
window.addEventListener('load', start);

function start() {
    //update title
    document.head.getElementsByTagName('title')[0].innerHTML = CONST.APP.TITLE;

    rootStretcher = new Stretcher(document.getElementById('canvas'), CONST.WINDOW.WIDTH, CONST.WINDOW.HEIGHT, '#f2efe9');
    rootStretcher.hideFPS();
    var loadingBG = new createjs.Bitmap('assets/img/hk.jpg');
    var loadCanvasSkin = new BlueCanvasSkin(loadingBG);
    preloaderApp = new CanvasPreloaderApp(imgList, imgContainer, rootStretcher, loadCanvasSkin);
    preloaderApp.setLoadInterval(20);
    preloaderApp.addEventListener(Event.COMPLETE, assetsLoaded);

    preloaderApp.start();
}

function assetsLoaded() {
    game = new HKCDApp(rootStretcher);
    game.start();
}
