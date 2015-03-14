/**
 * Created by xinyiliu on 3/7/15.
 */

goog.provide("hkcd.features.main.components.LandMark");
goog.require("org.createjs.easeljs.EaselJS");

BOK.inherits(LandMark, createjs.Container);
function LandMark() {
    createjs.Container.call(this);

    this.img_ = new createjs.Bitmap('assets/img/boc.png');
    this.img_.set({x:-this.img_.image.width/2, y:-this.img_.image.height});

    this.addChild(this.img_);
}

