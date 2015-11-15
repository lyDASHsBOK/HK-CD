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

    this.winner = {};
    this.countDownTimer_ = 10;
    this.player_ = player;
    this.isMoving_ = false;
    this.moveLeft_ = true;
    this.playerPos_ = 0;
    this.targetPos_ = 0;
    this.landmarks_ = [];
    this.speedCorrection = 5;

    this.frontSpinNode_ = new createjs.Container();
    this.frontSpinNode_.set({x: 375, y: 670, alpha: 0});
    this.backSpinNode_ = new createjs.Container();
    this.backSpinNode_.set({x: 375, y: 670, alpha: 0});

    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-665}));
    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-665}, 90));
    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-665}, 180));
    this.backSpinNode_.addChild(this.createImgBgSeg_('assets/img/farbg.png', {x: -423, y:-665}, 270));

    this.earth_ = new createjs.Shape();
    this.earth_.graphics.beginFill(CONST.BG.EARTH_COLOR).drawCircle(0, 0, CONST.BG.EARTH_RADIUS);
    this.innerEarth_ = new createjs.Shape();
    this.innerEarth_.graphics.beginFill(CONST.BG.INNER_EARTH_COLOR).drawCircle(0, 0, CONST.BG.INNER_EARTH_RADIUS);
    this.landmarkLayer_ = new createjs.Container();
    this.landmarkLayer_.set({scaleX:0.1, scaleY:0.1});
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}));
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}, 90));
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}, 180));
    this.frontSpinNode_.addChild(this.createImgBgSeg_('assets/img/closebg.png', {x: -428, y: -670}, 270));
    this.frontSpinNode_.addChild(this.landmarkLayer_);
    this.frontSpinNode_.addChild(this.earth_);
    this.frontSpinNode_.addChild(this.innerEarth_);


    this.addChild(this.backSpinNode_);
    this.addChild(this.frontSpinNode_);

    createjs.Ticker.addEventListener("tick", Delegate.create(this, this.update_));

    EaselAnimationHelper.fadeIn(this.backSpinNode_, 500).call(Delegate.create(this, function(){
        EaselAnimationHelper.fadeIn(this.frontSpinNode_, 700).call(Delegate.create(this, function(){
            createjs.Tween.get(this.landmarkLayer_).to({scaleX:1, scaleY:1}, 700)
                .call(Delegate.create(this, this.dispatchEvent,'sceneConstructed'));
        }));
    }));
}


/**
 * @param {LandMark} landMark
 * @param {number} pos
 * */
CloseBG.prototype.addLandMark = function(landMark, pos) {
    var node = new createjs.Container();
    landMark.renderName(CLIENT_NAMES[BOK.randN(CLIENT_NAMES.length)]);
    node.addChild(landMark);
    landMark.set({y:-CONST.BG.EARTH_RADIUS + 20});
    node.set({rotation: pos * CONST.BG.STEP_LENGTH});
    this.landmarkLayer_.addChild(node);

    landMark.addEventListener('click', Delegate.create(this, function(){
        this.dispatchEvent('markClicked');
    }));
    this.landmarks_.push(landMark);
};

CloseBG.prototype.getCurrentLandMark = function() {
    return this.landmarks_[this.getCurrentPos()];
};

CloseBG.prototype.getCurrentPos = function() {
    return -this.playerPos_;
};

CloseBG.prototype.isMoving = function() {
    return this.isMoving_;
};

CloseBG.prototype.moveLeft = function() {
    if(this.isMoving_)
        return;

    this.stopping_ = false;
    BOK.each(this.landmarks_, function(item) {
        item.hideMarks();
    });
    this.isMoving_ = true;
    this.moveLeft_ = true;
    this.targetPos_ = this.playerPos_ - 1;
    this.player_.turnRight();
    this.player_.move();
};

CloseBG.prototype.moveRight = function() {
    if(this.isMoving_)
        return;

    this.stopping_ = false;
    BOK.each(this.landmarks_, function(item) {
        item.hideMarks();
    });
    this.isMoving_ = true;
    this.moveLeft_ = false;
    this.targetPos_ = this.playerPos_ + 1;
    this.player_.turnLeft();
    this.player_.move();
};

CloseBG.prototype.stand = function () {
    this.stopping_ = true;
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
    var actualCorrection = this.speedCorrection * this.speedCorrection;
    var direction = this.moveLeft_ ? -1 : 1;
    this.frontSpinNode_.rotation += direction * CONST.BG.FRONT_SPIN_SPEED * actualCorrection;
    this.backSpinNode_.rotation += direction * CONST.BG.BACK_SPIN_SPEED * actualCorrection;

    if(Math.abs(this.targetPos_ * CONST.BG.STEP_LENGTH - this.frontSpinNode_.rotation) < actualCorrection) {
        this.playerPos_ = this.targetPos_;
        if(this.stopping_) {
            this.isMoving_ = false;
            this.stopping_ = false;
            this.speedCorrection = 5;
            this.player_.stop();
            //this.getCurrentLandMark().showMarks();

            this.dispatchEvent('moveFinished');
        } else {
            this.targetPos_ = this.playerPos_ + direction;
            this.winner = CLIENT_NAMES[Math.abs(this.targetPos_) % CLIENT_NAMES.length];
            //always render name of next one
            this.landmarks_[Math.abs(this.targetPos_ + direction) % 5].renderName(CLIENT_NAMES[Math.abs(this.targetPos_ + direction) % CLIENT_NAMES.length]);
        }

        if(--this.countDownTimer_ <= 0) {
            this.countDownTimer_ = this.speedCorrection * this.speedCorrection / 2 + BOK.randN(5);
            if(--this.speedCorrection == 1) {
                this.stand();
            }
        }
    }
};