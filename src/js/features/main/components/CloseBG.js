/**
 * Created by xinyiliu on 3/2/15.
 */
goog.provide("hkcd.features.main.components.CloseBG");
goog.require("org.createjs.easeljs.EaselJS");

BOK.inherits(CloseBG, createjs.Container);
function CloseBG() {
    createjs.Container.call(this);

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

    createjs.Ticker.addEventListener("tick", Delegate.create(this, this.update));
}

CloseBG.prototype.createImgBgSeg_ = function(imgSrc, offSet, rotation) {
    var node = new createjs.Container();
    var img = new createjs.Bitmap(imgContainer[imgSrc]);
    img.set(offSet);

    node.addChild(img);
    node.rotation = rotation || 0;
    return node;
};

CloseBG.prototype.update = function() {
    this.frontSpinNode_.rotation -= CONST.BG.FRONT_SPIN_SPEED;
    this.backSpinNode_.rotation -= CONST.BG.BACK_SPIN_SPEED;
};