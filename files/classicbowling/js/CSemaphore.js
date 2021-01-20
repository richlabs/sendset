function CSemaphore(iXPos, iYPos, oSprite, oParentContainer) {

    var _oSemaphore;
    var _oParentContainer;
    var _oReflection;

    this._init = function (iXPos, iYPos, oSprite) {

        _oSemaphore = this.createSemaphore(iXPos, iYPos, oSprite);
        _oReflection = this.createSemaphore(iXPos, iYPos, oSprite);
        _oReflection.y += 155;
        _oReflection.scaleY = -0.95;
        _oReflection.alpha = 0.25;
        _oParentContainer.addChild(_oSemaphore);
        _oParentContainer.addChildAt(_oReflection, 13);

    };

    this.createSemaphore = function (iXPos, iYPos, oSprite) {
        var oSem;
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: (oSprite.height) / 2},
            animations: {
                green: 1,
                red: 0
            }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        oSem = createSprite(oSpriteSheet, 1, (oSprite.width / 2) / 2, (oSprite.height) / 2, oSprite.width / 2, oSprite.height);
        oSem.stop();

        oSem.x = iXPos;
        oSem.y = iYPos;

        return oSem;
    };

    this.changeState = function (szState) {
        _oSemaphore.gotoAndStop(szState);
        _oReflection.gotoAndStop(szState);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oSemaphore, _oReflection);
    };

    this.setPositionShadow = function (iX, iY) {
        _oReflection.x = iX;
        _oReflection.y = iY;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oSemaphore.x = iXPos;
        _oSemaphore.y = iYPos;
    };

    this.setVisible = function (bVal) {
        _oSemaphore.visible = bVal;
        _oReflection.visible = bVal;
    };

    this.getX = function () {
        return _oSemaphore.x;
    };

    this.getY = function () {
        return _oSemaphore.y;
    };

    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, oSprite);

    return this;
}
