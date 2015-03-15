/**
 * Created by xinyiliu on 3/15/15.
 */
goog.provide("hkcd.features.main.v.MainStageMediator");
goog.require('bok.framework.core.BaseMediator');

goog.requireAll('hkcd.features.main.components.*');


BOK.inherits(MainStageMediator, BaseMediator);
function MainStageMediator(stage) {
    BaseMediator.call(this);

    this.stage_ = new createjs.Container();
    stage.addChild(this.stage_);
}

MainStageMediator.prototype.init = function(player) {
    this.isZoomin_ = false;
    this.isZooming_ = false;
    this.isUIHidden_ = false;


    this.player_ = player;
    this.bg_ = new CloseBG(this.player_);
    this.bg_.set({y:CONST.BG.Y});

    this.btnGoLeft_ = new MoveButton(true);
    this.btnGoLeft_.set({x: 650, y: 600, alpha: 0});
    this.btnGoRight_ = new MoveButton(false);
    this.btnGoRight_.set({x: 100, y: 600, alpha: 0});

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
    this.bg_.addEventListener('sceneConstructed', Delegate.create(this, this.bgConstructed));
};


/**
 * @override
 * */
MainStageMediator.prototype.declareInterestedNotifications = function() {
    this.declareInterest(MainFeature.Notes.getInternalNote('PLAYER_SELECTED'), this.onPlayerSelected);
};

MainStageMediator.prototype.bgConstructed = function(msg) {
    this.showUI();
};

MainStageMediator.prototype.onPlayerSelected = function(msg) {
    this.init(msg.body);
};

MainStageMediator.prototype.landMarkClicked = function(e) {
    if(this.isZooming_)
        return;

    if(this.isZoomin_) {
        this.zoomOut();
    } else if(!this.isUIHidden_){
        this.zoomIn();
    }
};
MainStageMediator.prototype.onMovePlayerFinished = function(e) {
    this.showUI();
};

MainStageMediator.prototype.onLeftClick = function(e) {
    this.bg_.moveLeft();
    this.hideUI();
};

MainStageMediator.prototype.onRightClick = function(e) {
    this.bg_.moveRight();
    this.hideUI();
};

MainStageMediator.prototype.hideUI = function() {
    this.isUIHidden_ = true;
    EaselAnimationHelper.disappear(this.btnGoLeft_);
    EaselAnimationHelper.disappear(this.btnGoRight_);
};

MainStageMediator.prototype.showUI = function() {
    this.isUIHidden_ = false;
    EaselAnimationHelper.fadeIn(this.btnGoLeft_);
    EaselAnimationHelper.fadeIn(this.btnGoRight_);
};

MainStageMediator.prototype.zoomIn = function() {
    this.isZooming_ = true;
    this.isZoomin_ = true;
    this.hideUI();
    var self = this;
    createjs.Tween.get(this.stage_).to({scaleX: 1.5, scaleY:1.5, y: -200, x: -300}, 1000, createjs.Ease.cubicOut).call(function(){
        self.isZooming_ = false;
    });
};

MainStageMediator.prototype.zoomOut = function() {
    this.isZooming_ = true;
    this.isZoomin_ = false;
    this.showUI();
    var self = this;
    createjs.Tween.get(this.stage_).to({scaleX: 1, scaleY:1, y: 0, x: 0}, 1000, createjs.Ease.cubicOut).call(function(){
        self.isZooming_ = false;
    });
};

