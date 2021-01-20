function CBall(iXPos, iYPos, oSprite, oPhysics, oParentContainer) {

    var _oBall;
    var _oBallRef;
    var _oParentContainer;
    var _oPhysics;
    var _oShadow;
    var _oContainer;
    var _fStartShadowPos = null;
    var _fScale = 36;
    var _oTween = null;
    var _bPlayedSound = false;

    this._init = function (iXPos, iYPos, oSprite) {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        _oBall = createBitmap(oSprite);
        _oBall.x = iXPos;
        _oBall.y = iYPos;
        _oBall.regX = oSprite.width * 0.5;
        _oBall.regY = oSprite.height * 0.5;

        var oSpriteReflect = s_oSpriteLibrary.getSprite("ball_ref");
        _oBallRef = createBitmap(oSpriteReflect);
        _oBallRef.x = iXPos;
        _oBallRef.y = iYPos;
        _oBallRef.regX = oSpriteReflect.width * 0.5;
        _oBallRef.regY = -oSpriteReflect.height * 0.5 + 15;
        _oBallRef.alpha = 0.75;

        var oSpriteShadow = s_oSpriteLibrary.getSprite("ball_shadow");
        _oShadow = createBitmap(oSpriteShadow);
        _oShadow.x = iXPos;
        _oShadow.y = iYPos;
        _oShadow.regX = oSpriteShadow.width * 0.5;
        _oShadow.regY = oSpriteShadow.height * 0.5;

        _oContainer.addChild(_oShadow, _oBall, _oBallRef);

    };

    this.unload = function () {
        _oBall.removeAllEventListeners();
        _oParentContainer.removeChild(_oBall);
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    this.startPosShadowY = function (fYPos) {
        _fStartShadowPos = fYPos;
    };

    this.getStartShadowYPos = function () {
        return _fStartShadowPos;
    };

    this.tweenFade = function (fVal, iTime, iWait) {
        _oTween = createjs.Tween.get(_oContainer).wait(iWait).to({alpha: fVal}, iTime).call(function () {
            _oTween = null;
        });
    };

    this.playSound = function () {
        if (_bPlayedSound) {
            return;
        }
        playSound("ball_crash", 1, 0);
        _bPlayedSound = true;
    };

    this.setPlayedSound = function (bVal) {
        _bPlayedSound = bVal;
    };

    this.animFade = function (fAlpha) {
        createjs.Tween.get(_oContainer).to({alpha: fAlpha}, 250, createjs.Ease.circleOut).call(function () {
            if (fAlpha === 0) {
                _oContainer.visible = false;
                _oContainer.alpha = 1;
                s_oGame.resetBallPosition();
            }
        });
    };

    this.setPositionShadow = function (iX, iY) {
        _oShadow.x = iX;
        _oShadow.y = iY;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oBallRef.x = _oBall.x = iXPos;
        _oBallRef.y = _oBall.y = iYPos;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setAngle = function (iAngle) {
        _oBallRef.rotation = _oBall.rotation = iAngle;
    };

    this.getX = function () {
        return _oBall.x;
    };

    this.getY = function () {
        return _oBall.y;
    };

    this.getStartScale = function () {
        return _fScale;
    };

    this.scale = function (fValue) {
        _oBallRef.scaleX = _oBall.scaleX = fValue;
        _oBallRef.scaleY = _oBall.scaleY = fValue;
    };

    this.scaleShadow = function (fScale) {
        if (fScale > 0.08) {
            _oShadow.scaleX = fScale;
            _oShadow.scaleY = fScale;
        } else {
            _oShadow.scaleX = 0.08;
            _oShadow.scaleY = 0.08;
        }
    };

    this.setAlphaByHeight = function (fHeight) {
        _oShadow.alpha = fHeight;
    };

    this.getScale = function () {
        return _oBall.scaleX;
    };

    this.getObject = function () {
        return _oContainer;
    };

    this.getDepthPos = function () {
        return _oPhysics.position.y;
    };

    _oPhysics = oPhysics;
    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, oSprite);

    return this;
}
