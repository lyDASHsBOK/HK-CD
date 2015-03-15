/**
 * Created by xinyiliu on 3/15/15.
 */
goog.provide("hkcd.features.main.v.PlayerSelectMediator");
goog.require('bok.framework.core.BaseMediator');

goog.requireAll('hkcd.features.main.components.*');


BOK.inherits(PlayerSelectMediator, BaseMediator);
function PlayerSelectMediator(stage) {
    BaseMediator.call(this);

    this.selectScreen_ = new createjs.Container();
    stage.addChild(this.selectScreen_);

    this.boy_ = new Player(false);
    this.boy_.set({x:150, y: 700, scaleX: 1, scaleY:1});
    this.boy_.addEventListener('click', Delegate.create(this, this.onPlayerSelected, this.boy_));
    this.girl_ = new Player(true);
    this.girl_.set({x: 600, y: 700, scaleX: 1, scaleY:1});
    this.girl_.turnLeft();
    this.girl_.addEventListener('click', Delegate.create(this, this.onPlayerSelected, this.girl_));

    this.selectScreen_.addChild(this.boy_);
    this.selectScreen_.addChild(this.girl_);
}

PlayerSelectMediator.prototype.onPlayerSelected = function(selected) {
    if(this.boy_ == selected) {
        EaselAnimationHelper.disappear(this.girl_, 700);
    } else {
        EaselAnimationHelper.disappear(this.boy_, 700);
    }

    selected.move();
    EaselAnimationHelper.moveTo(selected, 300, 800, 1200, createjs.Ease.linear).call(Delegate.create(this, function(){
        selected.stop();
        this.sendNotification(MainFeature.Notes.getInternalNote('PLAYER_SELECTED'), selected);
    }));
};