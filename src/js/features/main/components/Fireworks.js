/**
 * Created by feitian on 11/15/15.
 */

goog.provide("hkcd.features.main.components.Fireworks");
goog.require("org.createjs.easeljs.EaselJS");

BOK.inherits(Fireworks, createjs.Container);
/**
 * */
function Fireworks() {
    createjs.Container.call(this);

    this.fireworks_ = [];

    this.addAnim('assets/img/fw1.png');
    this.addAnim('assets/img/fw1.png');
    this.addAnim('assets/img/fw1.png');
}

Fireworks.prototype.addAnim = function(srcPath) {
    var sheet = new createjs.SpriteSheet({
        framerate: 15,
        images: [srcPath],
        frames: {width:300, height:300},
        animations: {burn:[0,18]}
    });

    var anim = new createjs.Sprite(sheet, 'burn');
    anim.gotoAndStop(18);
    this.fireworks_.push(anim);
    this.addChild(anim);
};

Fireworks.prototype.play = function(){
    BOK.each(this.fireworks_, function(item) {
        item.set({visible:true, x: BOK.randN(1000)+150, y:BOK.randN(500)});
        setTimeout(function(){
            item.gotoAndPlay(0);
        }, BOK.randN(1000) + 1500);
    });
};

Fireworks.prototype.stop = function(){
    BOK.each(this.fireworks_, function(item) {
        item.visible = false;
        item.gotoAndStop(18);
    });
};

