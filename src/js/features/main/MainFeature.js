/**
 * Created by xinyiliu on 3/2/15.
 */

goog.provide("hkcd.features.main.MainFeature");
goog.require("bok.framework.core.MVCFeature");
goog.require("bok.util.EaselAnimationHelper");
goog.requireAll('hkcd.features.main.components.*');

BOK.inherits(MainFeature, MVCFeature);
/**
 * @constructor
 * @param {Container} stage
 * */
function MainFeature(stage) {
    MVCFeature.call(this);

    this.bg_ = new CloseBG();
    this.bg_.set({y:CONST.BG.Y});
    stage.addChild(this.bg_);

    this.guy_ = new createjs.Bitmap('assets/img/guy.png');
    this.guyNode_ = new createjs.Container();
    this.guyNode_.addChild(this.guy_);
    this.guyNode_.set({x: 300, y: 820});
    stage.addChild(this.guyNode_);

    createjs.Ticker.addEventListener("tick", Delegate.create(this, this.update));
}

MainFeature.prototype.update = function() {
    if(this.isBouncing)
        return;

    var self = this;
    if(this.guy_.y) {
        EaselAnimationHelper.bounceTo(this.guy_, 0, 0, 500).call(function(){
            self.isBouncing = false;
        });
    } else {
        EaselAnimationHelper.moveTo(this.guy_, 0, -50, 500).call(function(){
            self.isBouncing = false;
        });
    }
    this.isBouncing = true;
};
