function CController() {

    var _pStartPosControlRight;
    var _pStartPosControlLeft;
    var _oControlLeft;
    var _oControlRight;
    var _oContainerArrows;

    var _oHitAreaEnter;


    this._init = function () {
        _oHitAreaEnter = new createjs.Shape();
        _oHitAreaEnter.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        _oHitAreaEnter.on("mousedown", s_oGame.manageControl, s_oGame);

        s_oStage.addChild(_oHitAreaEnter);

        _oContainerArrows = new createjs.Container();
        s_oStage.addChild(_oContainerArrows);

        _pStartPosControlRight = {x: CANVAS_WIDTH_HALF + 310, y: CANVAS_HEIGHT - EDGEBOARD_Y + 50};
        _pStartPosControlLeft = {x: CANVAS_WIDTH_HALF - 310, y: CANVAS_HEIGHT - EDGEBOARD_Y + 50};

        var oSpriteArrowLeft = s_oSpriteLibrary.getSprite("arrow_left");

        _oControlLeft = new CGfxButton(_pStartPosControlLeft.x, _pStartPosControlLeft.y, oSpriteArrowLeft, _oContainerArrows);
        _oControlLeft.addEventListener(ON_MOUSE_DOWN, s_oGame.onLeft, this);
        _oControlLeft.addEventListener(ON_MOUSE_UP, s_oGame.dirKeyUp, this);

        var oSpriteArrowRight = s_oSpriteLibrary.getSprite("arrow_right");

        _oControlRight = new CGfxButton(_pStartPosControlRight.x, _pStartPosControlRight.y, oSpriteArrowRight, _oContainerArrows);
        _oControlRight.addEventListener(ON_MOUSE_DOWN, s_oGame.onRight, this);
        _oControlRight.addEventListener(ON_MOUSE_UP, s_oGame.dirKeyUp, this);
    };

    this.getStartPositionControlRight = function () {
        return _pStartPosControlRight;
    };

    this.getStartPositionControlLeft = function () {
        return _pStartPosControlLeft;
    };

    this.setPositionControlRight = function (iX, iY) {
        _oControlRight.setPosition(iX, iY);
    };

    this.setPositionControlLeft = function (iX, iY) {
        _oControlLeft.setPosition(iX, iY);
    };

    this.arrowVisibility = function (bVal) {
        _oContainerArrows.visible = bVal;
    };

    this.unload = function () {
        _oControlLeft.unload();
        _oControlLeft = null;

        _oControlRight.unload();
        _oControlRight = null;

    };

    this._init();

    return this;
}