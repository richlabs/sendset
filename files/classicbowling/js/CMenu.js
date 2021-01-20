function CMenu() {
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosInfo;
    var _oBg;
    var _oPlay;
    var _oHitAreaPlay;
    var _oButInfo;
    var _oFade;
    var _oAudioToggle;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _pStartPosPlay = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 340};
        _oPlay = createBitmap(oSprite);
        _oPlay.x = _pStartPosPlay.x;
        _oPlay.y = _pStartPosPlay.y;
        _oPlay.regX = oSprite.width * 0.5;
        _oPlay.regY = oSprite.height * 0.5;

        s_oStage.addChild(_oPlay);

        _oHitAreaPlay = new createjs.Shape();
        _oHitAreaPlay.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_pStartPosPlay.x - _oPlay.regX, _pStartPosPlay.y - _oPlay.regY, 184, 184);

        _oHitAreaPlay.on("mousedown", this._onMouseDownHitArea, this, true);

        _oHitAreaPlay.on("pressup", this._onButPlayRelease, this, true);

        _oHitAreaPlay.cursor = "pointer";

        s_oStage.addChild(_oHitAreaPlay);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var oSpriteInfo = s_oSpriteLibrary.getSprite("but_info");
        _pStartPosInfo = {x: (oSpriteInfo.height / 2) + 10, y: (oSpriteInfo.height / 2) + 10};
        _oButInfo = new CGfxButton(_pStartPosInfo.x, _pStartPosInfo.y, oSpriteInfo, s_oStage);
        _oButInfo.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oFade.visible = false;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this._onMouseDownHitArea = function () {
        _oPlay.scaleX = _oPlay.scaleY = 0.9;
    };


    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        _oButInfo.setPosition(_pStartPosInfo.x + iNewX, _pStartPosInfo.y + iNewY);
    };

    this.unload = function () {
        _oHitAreaPlay.removeAllEventListeners();
        _oHitAreaPlay = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oStage.removeAllChildren();

        s_oMenu = null;
    };

    this._onButPlayRelease = function () {
        _oPlay.scaleX = _oPlay.scaleY = 1;
        this.unload();
        playSound("click", 1, 0);
        s_oMain.gotoGame();
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButInfoRelease = function () {
        new CCreditsPanel();
    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;