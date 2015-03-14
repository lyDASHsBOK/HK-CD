/**
 * Created by xinyiliu on 3/2/15.
 */
goog.provide("hkcd.features.main.components.CloseBG");
goog.require("org.createjs.easeljs.EaselJS");

BOK.inherits(CloseBG, createjs.Container);
/**
 * @param {Player} player
 * */
function CloseBG(player) {
    createjs.Container.call(this);

    this.player_ = player;
    this.isMoving_ = true;
    this.moveLeft_ = true;
    this.playerPos_ = 0;
    this.targetPos_ = 0;

    this.frontSpinNode_ = new createjs.Container();
    this.frontSpinNode_.set({x: 375, y: 670});
    this.backSpinNode_ = new createjs.Container();
    this.backSpinNode_.set({x: 375, y: 670});

    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-695}));
    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-695}, 90));
    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-695}, 180));
    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-695}, 270));

    this.earth_ = new createjs.Shape();
    this.earth_.graphics.beginFill(CONST.BG.EARTH_COLOR).drawCircle(0, 0, CONST.BG.EARTH_RADIUS);
    this.innerEarth_ = new createjs.Shape();
    this.innerEarth_.graphics.beginFill(CONST.BG.INNER_EARTH_COLOR).drawCircle(0, 0, CONST.BG.INNER_EARTH_RADIUS);
    this.frontSpinNode_.addChild(this.earth_);
    this.frontSpinNode_.addChild(this.innerEarth_);
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}));
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}, 90));
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}, 180));
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}, 270));

    this.addChild(this.backSpinNode_);
    this.addChild(this.frontSpinNode_);

    createjs.Ticker.addEventListener("tick", Delegate.create(this, this.update_));
}

/**
 * @param {LandMark} landMark
 * @param {number} pos
 * */
CloseBG.prototype.addLandMark = function(landMark, pos) {
    var node = new createjs.Container();
    node.addChild(landMark);
    landMark.set({y:-CONST.BG.EARTH_RADIUS + 20});
    node.set({rotation: pos * CONST.BG.STEP_LENGTH});
    this.frontSpinNode_.addChild(node);

    landMark.addEventListener('click', Delegate.create(this, function(){
        this.dispatchEvent('markClicked');
    }));
};

CloseBG.prototype.moveLeft = function() {
    if(this.isMoving_)
        return;

    this.isMoving_ = true;
    this.moveLeft_ = true;
    this.targetPos_ = this.playerPos_ - 1;
    this.player_.turnRight();
    this.player_.move();
};

CloseBG.prototype.moveRight = function() {
    if(this.isMoving_)
        return;

    this.isMoving_ = true;
    this.moveLeft_ = false;
    this.targetPos_ = this.playerPos_ + 1;
    this.player_.turnLeft();
    this.player_.move();
};

CloseBG.prototype.createImgBgSeg_ = function(imgSrc, offSet, rotation) {
    var node = new createjs.Container();
    var img = new createjs.Bitmap(imgContainer[imgSrc]);
    img.set(offSet);

    node.addChild(img);
    node.rotation = rotation || 0;
    return node;
};

CloseBG.prototype.update_ = function() {
    if(!this.isMoving_)
        return;

    var direction = this.moveLeft_ ? -1 : 1;
    this.frontSpinNode_.rotation += direction * CONST.BG.FRONT_SPIN_SPEED;
    this.backSpinNode_.rotation += direction * CONST.BG.BACK_SPIN_SPEED;

    if(Math.abs(this.targetPos_ * CONST.BG.STEP_LENGTH - this.frontSpinNode_.rotation) < 1) {
        this.isMoving_ = false;
        this.playerPos_ = this.targetPos_;
        this.player_.stop();
        this.dispatchEvent('moveFinished');
    }
};