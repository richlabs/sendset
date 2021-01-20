function CTrack(iXPos, iYPos, oSprite, oPhysics, oParentContainer) {

    var _oTrack;
    var _oParentContainer;
    var _oPhysics;


    this._init = function (iXPos, iYPos, oSprite) {
        _oTrack = createBitmap(oSprite);
        _oTrack.x = iXPos;
        _oTrack.y = iYPos;

        _oParentContainer.addChild(_oTrack);

    };

    this.setPosition = function (iXPos, iYPos) {
        _oTrack.x = iXPos;
        _oTrack.y = iYPos;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.getObject = function () {
        return _oTrack;
    };

    this.getDepthPos = function () {
        return WALL_TRACK_DEPTH_POSITION.y;
    };

    this.getHeightPos = function () {
        return WALL_TRACK_DEPTH_POSITION.z;
    };

    _oPhysics = oPhysics;
    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, oSprite);

    return this;
}
