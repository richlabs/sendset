function CEffectArray(iXPos, iYPos, oSprite, oParentContainer) {

    var _pStartPos;
    var _oEffectArrow;
    var _oTextEffect;
    var _oContainer;
    var _oParentContainer;
    var _iStartRegX;

    this._init = function (iXPos, iYPos, oSprite, oParentContainer) {
        _pStartPos = {x: iXPos, y: iYPos};
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer = oParentContainer;

        _oParentContainer.addChild(_oContainer);

        var fAnimSpeed = SPEED_EFFECT_ARROW / FPS;

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 10, height: oSprite.height / 2, regX: (oSprite.width / 2) / 10, regY: (oSprite.height / 2) / 2},
            animations: {
                normal: [0, 19, "reverse", fAnimSpeed],
                reverse: {
                    frames: [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                    speed: fAnimSpeed
                }
            }
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oEffectArrow = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 10, (oSprite.height / 2) / 2, oSprite.width / 10, oSprite.height / 2);

        _oEffectArrow.y = -30;

        _iStartRegX = _oEffectArrow.regX = (oSprite.width / 2) / 10;

        this.stopAnimation();

        _oContainer.addChild(_oEffectArrow);

        this.createTextEffect(oSprite);
    };

    this.getX = function () {
        return _oEffectArrow.x;
    };

    this.getY = function () {
        return _oEffectArrow.y;
    };

    this.getStartPos = function () {
        return _pStartPos;
    };

    this.playAnimation = function () {
        _oEffectArrow.play();
    };

    this.stopAnimation = function () {
        _oEffectArrow.stop();
    };

    this.getStoppedFrame = function () {
        return _oEffectArrow.currentFrame * _oEffectArrow.scaleX;
    };

    this.removeAllEventListeners = function () {
        _oEffectArrow.removeAllEventListeners();
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };

    this.getScaleX = function () {
        return _oEffectArrow.scaleX;
    };

    this.createTextEffect = function (oSprite) {
        _oTextEffect = new createjs.Text(TEXT_EFFECT, 36 + "px " + FONT_GAME, "#ffffff");
        _oTextEffect.textAlign = "center";
        _oTextEffect.textBaseline = "middle";
        _oTextEffect.x = -_iStartRegX * 1.6;
        _oTextEffect.y = (oSprite.height / 4);
        _oContainer.addChild(_oTextEffect);
    };

    this.animArrow = function () {
        var oParent = this;
        _oEffectArrow.gotoAndPlay("normal");
        this.onFinishAnimation(function () {
            _oEffectArrow.gotoAndPlay("reverse");
            _oEffectArrow.removeAllEventListeners();
            oParent.onFinishAnimation(function () {
                _oEffectArrow.scaleX *= -1;
                if (_oEffectArrow.scaleX === -1) {
                    _oEffectArrow.regX = -_iStartRegX * 2 - 14;
                } else {
                    _oEffectArrow.regX = _iStartRegX;
                }
                _oEffectArrow.removeAllEventListeners();
                oParent.animArrow();
            });
        });

    };

    this.changeState = function (szState) {
        var oParent = this;
        _oEffectArrow.gotoAndPlay(szState);
        this.onFinishAnimation(function () {
            oParent.loopAnimArray();
        });
    };

    this.animFade = function (fAlpha) {
        createjs.Tween.get(_oEffectArrow).to({alpha: fAlpha}, 250, createjs.Ease.circleOut).call(function () {
            if (fAlpha === 0) {
                _oContainer.visible = false;
            }
        });
    };

    this.onFinishAnimation = function (oFunc) {
        _oEffectArrow.on("animationend", function () {
            oFunc();
        });
    };

    this.unload = function () {
        _oEffectArrow.removeAllEventListeners();
        _oParentContainer.removeChild(_oContainer);
    };

    this._init(iXPos, iYPos, oSprite, oParentContainer);

    return this;
}



