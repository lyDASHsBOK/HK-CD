/**
 * Created by xinyiliu on 3/14/15.
 */
goog.provide("hkcd.features.main.components.Player");
goog.require("bok.util.EaselAnimationHelper");
goog.require("org.createjs.easeljs.EaselJS");


BOK.inherits(Player, createjs.Container);
function Player() {
    createjs.Container.call(this);

    this.root_ = new createjs.Container();
    this.addChild(this.root_);

    this.dust_ = new createjs.Bitmap('assets/img/dust.png');
    this.dust_.set({x: -60, y:209, alpha: 0});
    this.isMoving = false;
    this.isBouncing_ = false;
    var sheet = new createjs.SpriteSheet({
        framerate: 4,
        images: ['assets/img/maleRun.png'],
        frames: {width:148, height:256},
        animations: {run:[0,6]}
    });
    this.anim_ = new createjs.Sprite(sheet, 'run');
    this.anim_.x = -74;
    this.img_ = new createjs.Container();
    this.img_.addChild(this.anim_);
    this.root_.addChild(this.img_);
    this.root_.addChild(this.dust_);

    createjs.Ticker.addEventListener("tick", Delegate.create(this, this.update));
}

Player.prototype.turnLeft = function() {
    this.root_.scaleX = -1;
};

Player.prototype.turnRight = function() {
    this.root_.scaleX = 1;
};

Player.prototype.move = function() {
    this.anim_.gotoAndPlay(0);
    this.isMoving = true;
};

Player.prototype.stop = function() {
    this.anim_.gotoAndStop(6);
    this.isMoving = false;
};

Player.prototype.update = function() {
    if((!this.isMoving && !this.img_.y) || this.isBouncing_)
        return;

    var self = this;
    if(this.img_.y) {
        EaselAnimationHelper.bounceTo(this.img_, 0, 0, CONST.PLAYER.BOUNCE_ANIM_DURATION).call(function(){
            self.isBouncing_ = false;
        });
    } else {
        this.dust_.set({alpha:1, scaleX: 1, scaleY: 1, x:-60});
        createjs.Tween.get(this.dust_).to({alpha:0, scaleX: 1.5, scaleY: 1.5, x:-100}, 400, createjs.Ease.cubicOut);
        EaselAnimationHelper.moveTo(this.img_, 0, -CONST.PLAYER.BOUNCE_HEIGHT, CONST.PLAYER.BOUNCE_ANIM_DURATION).call(function(){
            self.isBouncing_ = false;
        });
    }
    this.isBouncing_ = true;
};

