/**
 * Created by xinyiliu on 3/2/15.
 */

goog.provide("hkcd.features.main.MainFeature");
goog.require("bok.framework.core.MVCFeature");
goog.requireAll('hkcd.features.main.components.*');

BOK.inherits(MainFeature, MVCFeature);
/**
 * @constructor
 * @param {Container} stage
 * */
function MainFeature(stage) {
    MVCFeature.call(this);

    this.isZoomin_ = false;

    this.stage_ = new createjs.Container();
    stage.addChild(this.stage_);

    this.player_ = new Player();
    this.player_.set({x: 300, y: 800});
    this.bg_ = new CloseBG(this.player_);
    this.bg_.set({y:CONST.BG.Y});

    this.btnGoLeft_ = new MoveButton(true);
    this.btnGoLeft_.set({x: 650, y: 600, alpha: 0});
    this.btnGoRight_ = new MoveButton(false);
    this.btnGoRight_.set({x: 100, y: 600, alpha: 0});

    //DEBUG
    GAME_BG = this.bg_;
    STAGE = this.stage_;
    //DEBUG_END

    this.bg_.addLandMark(new LandMark());
    this.bg_.addLandMark(new LandMark(), 1);
    this.bg_.addLandMark(new LandMark(), -1);

    this.stage_.addChild(this.bg_);
    this.stage_.addChild(this.player_);
    this.stage_.addChild(this.btnGoLeft_);
    this.stage_.addChild(this.btnGoRight_);

    this.btnGoLeft_.addEventListener('click', Delegate.create(this, this.onLeftClick));
    this.btnGoRight_.addEventListener('click', Delegate.create(this, this.onRightClick));
    this.bg_.addEventListener('moveFinished', Delegate.create(this, this.onMovePlayerFinished));
    this.bg_.addEventListener('markClicked', Delegate.create(this, this.landMarkClicked));
}

MainFeature.prototype.landMarkClicked = function(e) {
    if(this.isZoomin_) {
        this.zoomOut();
    } else {
        this.zoomIn();
    }
};
MainFeature.prototype.onMovePlayerFinished = function(e) {
    this.showUI();
};
MainFeature.prototype.onMovePlayerFinished = function(e) {
    this.showUI();
};

MainFeature.prototype.onLeftClick = function(e) {
    this.bg_.moveLeft();
    this.hideUI();
};

MainFeature.prototype.onRightClick = function(e) {
    this.bg_.moveRight();
    this.hideUI();
};

MainFeature.prototype.hideUI = function() {
    EaselAnimationHelper.disappear(this.btnGoLeft_);
    EaselAnimationHelper.disappear(this.btnGoRight_);
};

MainFeature.prototype.showUI = function() {
    EaselAnimationHelper.fadeIn(this.btnGoLeft_);
    EaselAnimationHelper.fadeIn(this.btnGoRight_);
};

MainFeature.prototype.zoomIn = function() {
    this.hideUI();
    createjs.Tween.get(this.stage_).to({scaleX: 1.5, scaleY:1.5, y: -200, x: -300}, 1000, createjs.Ease.cubicOut);
    this.isZoomin_ = true;
};

MainFeature.prototype.zoomOut = function() {
    this.showUI();
    createjs.Tween.get(this.stage_).to({scaleX: 1, scaleY:1, y: 0, x: 0}, 1000, createjs.Ease.cubicOut);
    this.isZoomin_ = false;
};

