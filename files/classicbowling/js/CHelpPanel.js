function CHelpPanel(iXPos, iYPos, oSprite) {
    var _oText1;
    var _oArrowRight;
    var _oArrowLeft;
    var _oBall;
    var _oPowerBar;
    var _oEffectArrow;

    var _oHelpBg;
    var _oFade;
    var _oGroup;
    var _oButContinue;
    var _oContainerHelp;
    var _bClick = false;

    this._init = function (iXPos, iYPos, oSprite) {
        createjs.Ticker.paused = false;
        _oGroup = new createjs.Container();
        _oGroup.x = iXPos;
        _oGroup.y = iYPos;
        s_oStage.addChild(_oGroup);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.7;

        _oGroup.addChild(_oFade);

        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.x = CANVAS_WIDTH_HALF;
        _oHelpBg.y = CANVAS_HEIGHT_HALF - 30;
        _oHelpBg.regX = oSprite.width * 0.5;
        _oHelpBg.regY = oSprite.height * 0.5;

        _oGroup.addChild(_oHelpBg);

        _oContainerHelp = new createjs.Container();
        _oContainerHelp.y = -60;

        _oGroup.addChild(_oContainerHelp);

        var szText = TEXT_HELP1_PC;
        var szControlLeft = "key_left";
        var szControlRight = "key_right";
        var iSize = 26;
        var fScale = 0.7;

        if (s_bMobile) {
            szText = TEXT_HELP1_MOBILE;
            szControlLeft = "arrow_left";
            szControlRight = "arrow_right";
            fScale = 0.5;
            iSize = 30;
        }

        _oText1 = new createjs.Text(szText, iSize + "px " + FONT_GAME, TEXT_COLOR);
        _oText1.textAlign = "center";
        _oText1.lineWidth = 400;
        _oText1.x = CANVAS_WIDTH * 0.5;
        _oText1.y = CANVAS_HEIGHT * 0.5 - 360;
        _oGroup.addChild(_oText1);

        this.directionControl(szControlLeft, szControlRight, fScale);

        this.powerBarControl();

        this.effectArrow();

        var oSpriteContiune = s_oSpriteLibrary.getSprite('but_continue');
        _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT_HALF + 400, oSpriteContiune, _oContainerHelp);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onExitHelp, this);
        _oButContinue.pulseAnimation();

        var oParent = this;
        _oGroup.on("pressup", function () {
            oParent._onExitHelp();
        });

        _oGroup.cursor = "pointer";
    };

    this.directionControl = function (szControlLeft, szControlRight, fScale) {
        var oSpriteLeft = s_oSpriteLibrary.getSprite(szControlLeft);

        _oArrowLeft = createBitmap(oSpriteLeft);
        _oArrowLeft.x = CANVAS_WIDTH_HALF - 150;
        _oArrowLeft.y = CANVAS_HEIGHT_HALF - 170;
        _oArrowLeft.regX = oSpriteLeft.width * 0.5;
        _oArrowLeft.regY = oSpriteLeft.height * 0.5;
        _oArrowLeft.scaleX = _oArrowLeft.scaleY = fScale;

        _oContainerHelp.addChild(_oArrowLeft);

        var oSpriteRight = s_oSpriteLibrary.getSprite(szControlRight);

        _oArrowRight = createBitmap(oSpriteRight);
        _oArrowRight.x = CANVAS_WIDTH_HALF + 150;
        _oArrowRight.y = CANVAS_HEIGHT_HALF - 170;
        _oArrowRight.regX = oSpriteRight.width * 0.5;
        _oArrowRight.regY = oSpriteRight.height * 0.5;
        _oArrowRight.scaleX = _oArrowRight.scaleY = fScale;

        _oContainerHelp.addChild(_oArrowRight);

        var oSpriteBall = s_oSpriteLibrary.getSprite("ball");

        _oBall = createBitmap(oSpriteBall);
        _oBall.x = CANVAS_WIDTH_HALF;
        _oBall.y = CANVAS_HEIGHT_HALF - 170;
        _oBall.regX = oSpriteBall.width * 0.5;
        _oBall.regY = oSpriteBall.height * 0.5;

        _oContainerHelp.addChild(_oBall);

        var oText1 = new createjs.Text(TEXT_MOVE, "36px " + FONT_GAME, TEXT_COLOR);
        oText1.textAlign = "center";
        oText1.lineWidth = 300;
        oText1.x = CANVAS_WIDTH * 0.5;
        oText1.y = CANVAS_HEIGHT_HALF - 115;
        _oContainerHelp.addChild(oText1);

        this.animArrowControl();
    };

    this.powerBarControl = function () {
        _oPowerBar = new CPowerBar(CANVAS_WIDTH_HALF - 135, CANVAS_HEIGHT_HALF - 50, _oContainerHelp);
        _oPowerBar.animateMask(TIME_POWER_BAR);
    };

    this.effectArrow = function () {
        var oSpriteEffectArrow = s_oSpriteLibrary.getSprite("effect_arrow");
        _oEffectArrow = new CEffectArray(CANVAS_WIDTH_HALF + 250, CANVAS_HEIGHT_HALF + 155, oSpriteEffectArrow, _oContainerHelp);
        _oEffectArrow.animArrow();
    };

    this.animArrowControl = function () {
        var oParent = this;
        _oArrowLeft.scaleX = _oArrowLeft.scaleY = 0.8;
        createjs.Tween.get(_oBall).to({x: CANVAS_WIDTH_HALF - 25}, 750).call(function () {
            _oArrowLeft.scaleX = _oArrowLeft.scaleY = 1;
            _oArrowRight.scaleX = _oArrowRight.scaleY = 0.8;
            createjs.Tween.get(_oBall).to({x: CANVAS_WIDTH_HALF + 25}, 750).call(function () {
                _oArrowRight.scaleX = _oArrowRight.scaleY = 1;
                oParent.animArrowControl();
            });
        });
    };

    this.unload = function () {
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
            s_oStage.removeChild(_oGroup);
        });
        var oParent = this;
        _oEffectArrow
        _oGroup.off("pressup", function () {
            oParent._onExitHelp();
        });
    };

    this._onExitHelp = function () {
        if (_bClick) {
            return;
        }
        _bClick = true;
        this.unload();
        s_oGame.onExitHelp();
    };

    this._init(iXPos, iYPos, oSprite);

}