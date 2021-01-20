function CCharacter(iX, iY, oParentContainer) {
    var _pStartPos;
    var _aCharacter = new Array();
    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _iAnimPlayer = 0;
    var _iBuffer = 0;

    this._init = function (iX, iY) {
        _pStartPos = {x: iX, y: iY};
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oContainer.regX = 20;
        _oParentContainer.addChild(_oContainer);

        for (var i = 0; i < NUM_SPRITE_PLAYER; i++) {
            _aCharacter.push(createBitmap(s_oSpriteLibrary.getSprite("player_" + i)));
            _aCharacter[i].visible = false;
            _oContainer.addChild(_aCharacter[i]);
        }

        _aCharacter[0].visible = true;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
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

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };

    this.animFade = function (fAlpha) {
        var oParent = this;
        createjs.Tween.get(_oContainer).to({alpha: fAlpha}, 250).call(function () {
            if (fAlpha === 0) {
                _oContainer.visible = false;
                oParent.hideCharacter(NUM_SPRITE_PLAYER - 1);
                oParent.viewCharacter(_iAnimPlayer);
            }
        });
    };

    this.viewCharacter = function (iFrame) {
        _aCharacter[iFrame].visible = true;
    };

    this.hideCharacter = function (iFrame) {
        _aCharacter[iFrame].visible = false;
    };

    this.getFrame = function () {
        return _iAnimPlayer;
    };

    this.animCharacter = function () {
        _iBuffer++;
        if (_iBuffer >= BUFFER_ANIM_PLAYER) {
            this.hideCharacter(_iAnimPlayer);
            if (_iAnimPlayer + 1 < NUM_SPRITE_PLAYER) {
                this.viewCharacter(_iAnimPlayer + 1);
                _iAnimPlayer++;
            } else {
                this.viewCharacter(_iAnimPlayer);
                _iAnimPlayer = 0;
                _iBuffer = 0;
                return false;
            }
            _iBuffer = 0;
        }
        return true;
    };

    this._init(iX, iY);

    s_oAnimMonitor = this;

    return this;
}

var s_oAnimMonitor = null;