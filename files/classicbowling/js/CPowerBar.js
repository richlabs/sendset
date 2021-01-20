function CPowerBar(iXPos, iYPos, oParentContainer) {

    var _oContainer;
    var _pStartPos;

    var _oArrowMask;
    var _oArrow;
    var _oArrowFill;
    var _oArrowFrame;
    var _iMaskWidth;
    var _iMaskHeight;
    var _oTextPower;
    var _oParentContainer;

    this._init = function (iXPos, iYPos) {
        _pStartPos = {x: iXPos, y: iYPos};
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);

        var oSpriteArrow = s_oSpriteLibrary.getSprite("power_bar_bg");
        _oArrow = createBitmap(oSpriteArrow);
        _oArrow.regX = oSpriteArrow.width * 0.5;
        _oArrow.regY = oSpriteArrow.height;
        _oContainer.addChild(_oArrow);

        _oArrowFill = createBitmap(s_oSpriteLibrary.getSprite("power_bar_fill"));
        _oArrowFill.regX = oSpriteArrow.width * 0.5;
        _oArrowFill.regY = oSpriteArrow.height;
        _oContainer.addChild(_oArrowFill);

        _iMaskWidth = oSpriteArrow.width;
        _iMaskHeight = oSpriteArrow.height;

        _oArrowMask = new createjs.Shape();
        _oArrowMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oArrow.x, _oArrow.y, _iMaskWidth, 0);
        _oArrowMask.regX = _iMaskWidth * 0.5;
        _oArrowMask.regY = _iMaskHeight;
        _oContainer.addChild(_oArrowMask);

        var oSpriteArrowFrame = s_oSpriteLibrary.getSprite("power_bar_frame");
        _oArrowFrame = createBitmap(oSpriteArrowFrame);
        _oArrowFrame.regX = oSpriteArrowFrame.width * 0.5;
        _oArrowFrame.regY = oSpriteArrowFrame.height;
        _oContainer.addChild(_oArrowFrame);

        _oContainer.scaleY = -1;

        _oArrowFill.mask = _oArrowMask;

        this.createTextPower();
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    this.createTextPower = function () {
        _oTextPower = new createjs.Text(TEXT_POWER, 36 + "px " + FONT_GAME, "#ffffff");
        _oTextPower.textAlign = "center";
        _oTextPower.textBaseline = "middle";
        _oTextPower.y = -_iMaskHeight - 50;
        _oTextPower.scaleY = -1;
        _oContainer.addChild(_oTextPower);
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oContainer.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oContainer.y = iYPos;
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.getStartPos = function () {
        return _pStartPos;
    };

    this.removeTweensMask = function () {
        createjs.Tween.removeTweens(_oArrowMask.graphics.command);
    };

    this.removeTweensContainer = function () {
        createjs.Tween.removeTweens(_oContainer);
    };

    this.animFade = function (fAlpha) {
        createjs.Tween.get(_oContainer).to({alpha: fAlpha}, 250, createjs.Ease.circleOut).call(function () {
            if (fAlpha === 0) {
                _oContainer.visible = false;
            }
        });
    };

    this.getMaskValue = function () {
        return  _oArrowMask.graphics.command.h;
    };

    this.getMaskHeight = function () {
        return _iMaskHeight;
    };

    this.getAngle = function () {
        return _oContainer.rotation;
    };

    this.mask = function (iVal) {
        _oArrowMask.graphics.clear();
        var iNewMaskHeight = Math.floor((iVal * _iMaskHeight) / 100);
        _oArrowMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oArrow.x, _oArrow.y, _iMaskWidth, iNewMaskHeight);
    };

    this.animateMask = function (iTime) {
        var oParent = this;
        createjs.Tween.get(_oArrowMask.graphics.command).to({h: _iMaskHeight}, iTime, createjs.Ease.cubicIn).call(function () {
            createjs.Tween.get(_oArrowMask.graphics.command).to({h: 0}, iTime, createjs.Ease.cubicOut).call(function () {
                oParent.animateMask(iTime);
            });
        });
    };

    this.animateRotation = function (iTime) {
        var oParent = this;
        createjs.Tween.get(_oContainer).to({rotation: MAX_EFFECT_ANGLE}, iTime, createjs.Ease.cubicInOut).call(function () {
            createjs.Tween.get(_oContainer).to({rotation: -MAX_EFFECT_ANGLE}, iTime, createjs.Ease.cubicInOut).call(function () {
                oParent.animateRotation(iTime);
            });
        });
    };

    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos);

    return this;
}