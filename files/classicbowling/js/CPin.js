function CPin(iXPos, iYPos, oSprite, oPhysics, oParentContainer) {

    var _pStartPos;
    var _oPin;
    var _oParentContainer;
    var _oPhysics;
    var _oReflection;
    var _oContainer;
    var _fStartShadowPos = null;
    var _fScale = 190;
    var _oPosRefCast;
    var _oTween = null;
    var _oAngles;
    var _iStartRefRegY;
    var _bDown = false;
    var _bPlayedSound = false;

    this._init = function (iXPos, iYPos, oSprite) {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        _oPin = this.createPin(iXPos, iYPos, oSprite);
        _oReflection = this.createPin(iXPos, iYPos, oSprite);

        _oReflection.scaleY = -1;
        _iStartRefRegY = _oReflection.regY += PIN_REF_REGY_FACTOR + 0.5;
        this.scale(_fScale);

        _oAngles = new CANNON.Vec3();

        _oContainer.addChild(_oReflection, _oPin);
    };

    this.createPin = function () {
        var oPin;
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 10, height: oSprite.height / 8, regX: (oSprite.width / 10) / 2, regY: (oSprite.height / 8) / 2}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        oPin = createSprite(oSpriteSheet, 0, (oSprite.width / 10) / 2, (oSprite.height / 8) / 2, oSprite.width / 10, oSprite.height / 8);
        oPin.stop();

        oPin.x = iXPos;
        oPin.y = iYPos;

        return oPin;
    };

    this.setStartPos = function (iX, iY) {
        _pStartPos = {x: iX, y: iY};
    };

    this.getStartPos = function () {
        return _pStartPos;
    };

    this.resetState = function () {
        _oPin.gotoAndStop(0);
        this.setPosition(_pStartPos.x, _pStartPos.y);
        _oContainer.alpha = 1;
    };

    this.isDownYet = function () {
        return _bDown;
    };

    this.setDown = function (bVal) {
        _bDown = bVal;
        if (bVal) {
            createjs.Tween.get(this).wait(750).call(function () {
                s_oScenario.setElementVelocity(_oPhysics, {x: 0, y: 0, z: 0});
            });
        }
    };

    this.animReposition = function (iY, fAlpha) {
        createjs.Tween.get(_oPin).to({y: iY}, 500);
        createjs.Tween.get(_oReflection).wait(250).to({alpha: fAlpha}, 200);
    };

    this.animTake = function (iY) {
        createjs.Tween.get(_oPin).to({y: iY}, 500).call(function () {
            _oContainer.visible = false;
        });
        createjs.Tween.get(_oReflection).to({alpha: 0}, 200);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
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

    this.playAudio = function () {
        if (_bPlayedSound) {
            return;
        }
        playSound("pin_hitted", 1, 0);
        _bPlayedSound = true;
    };

    this.setPlayedSound = function (bVal) {
        _bPlayedSound = bVal;
    };

    this.pinRotation = function () {
        _oPhysics.quaternion.y = 0;

        _oPhysics.quaternion.toEuler(_oAngles);

        _oPhysics.shapes[0].getAveragePointLocal(_oAngles);

        _oAngles.x = Math.round(Math.degrees(_oAngles.x * 2));
        _oAngles.y = Math.round(Math.degrees(_oAngles.y * 2));
        _oAngles.z = Math.round(Math.degrees(_oAngles.z * 2));

        if (_oAngles.x === 0) {
            _oPin.gotoAndStop(0);
            _oReflection.gotoAndStop(0);
        } else if (_oAngles.y <= 9 && _oAngles.y > 7 || _oAngles.y > -9 && _oAngles.y < -7) {
            if (_oAngles.x >= -2 && _oAngles.x <= 3) {
                _oPin.gotoAndStop(29);
            } else if (_oAngles.x >= 4 && _oAngles.x <= 7) {
                _oPin.gotoAndStop(19);
            } else if (_oAngles.x >= 8 && _oAngles.x <= 12) {
                _oPin.gotoAndStop(9);
            } else if (_oAngles.x >= 13 && _oAngles.x <= 15) {
                _oPin.gotoAndStop(79);
            } else if (_oAngles.x >= 16 && _oAngles.x <= 18 || _oAngles.x <= -16 && _oAngles.x >= -18) {
                _oPin.gotoAndStop(69);
            } else if (_oAngles.x >= -15 && _oAngles.x <= -12) {
                _oPin.gotoAndStop(59);
            } else if (_oAngles.x >= -11 && _oAngles.x <= -6) {
                _oPin.gotoAndStop(49);
            } else if (_oAngles.x >= -5 && _oAngles.x <= -2) {
                _oPin.gotoAndStop(39);
            }
        } else if (_oAngles.z >= -3 && _oAngles.z <= 3) {
            if (_oAngles.y >= -8 && _oAngles.y <= 8) {
                if (_oAngles.x === 0) {
                    _oPin.gotoAndStop(0);
                } else if (_oAngles.x === 1) {
                    _oPin.gotoAndStop(1);
                } else if (_oAngles.x === 2) {
                    _oPin.gotoAndStop(2);
                } else if (_oAngles.x === 3) {
                    _oPin.gotoAndStop(3);
                } else if (_oAngles.x === 4) {
                    _oPin.gotoAndStop(4);
                } else if (_oAngles.x === 5) {
                    _oPin.gotoAndStop(5);
                } else if (_oAngles.x === 6) {
                    _oPin.gotoAndStop(6);
                } else if (_oAngles.x === 7) {
                    _oPin.gotoAndStop(7);
                } else if (_oAngles.x === 8) {
                    _oPin.gotoAndStop(8);
                } else if (_oAngles.x === 9) {
                    _oPin.gotoAndStop(9);
                } else if (_oAngles.x === -1) {
                    _oPin.gotoAndStop(41);
                } else if (_oAngles.x === -2) {
                    _oPin.gotoAndStop(42);
                } else if (_oAngles.x === -3) {
                    _oPin.gotoAndStop(43);
                } else if (_oAngles.x === -4) {
                    _oPin.gotoAndStop(44);
                } else if (_oAngles.x === -5) {
                    _oPin.gotoAndStop(45);
                } else if (_oAngles.x === -6) {
                    _oPin.gotoAndStop(46);
                } else if (_oAngles.x === -7) {
                    _oPin.gotoAndStop(47);
                } else if (_oAngles.x === -8) {
                    _oPin.gotoAndStop(48);
                } else if (_oAngles.x === -9) {
                    _oPin.gotoAndStop(49);
                }
            } else if (_oAngles.y <= -8 && _oAngles.y >= -18 || _oAngles.y <= 18 && _oAngles.y >= 11) {
                if (_oAngles.x === 0) {
                    _oPin.gotoAndStop(0);
                } else if (_oAngles.x === 1) {
                    _oPin.gotoAndStop(41);
                } else if (_oAngles.x === 2) {
                    _oPin.gotoAndStop(42);
                } else if (_oAngles.x === 3) {
                    _oPin.gotoAndStop(43);
                } else if (_oAngles.x === 4) {
                    _oPin.gotoAndStop(44);
                } else if (_oAngles.x === 5) {
                    _oPin.gotoAndStop(45);
                } else if (_oAngles.x === 6) {
                    _oPin.gotoAndStop(46);
                } else if (_oAngles.x === 7) {
                    _oPin.gotoAndStop(47);
                } else if (_oAngles.x === 8) {
                    _oPin.gotoAndStop(48);
                } else if (_oAngles.x === 9) {
                    _oPin.gotoAndStop(49);
                } else if (_oAngles.x === -1) {
                    _oPin.gotoAndStop(1);
                } else if (_oAngles.x === -2) {
                    _oPin.gotoAndStop(2);
                } else if (_oAngles.x === -3) {
                    _oPin.gotoAndStop(3);
                } else if (_oAngles.x === -4) {
                    _oPin.gotoAndStop(4);
                } else if (_oAngles.x === -5) {
                    _oPin.gotoAndStop(5);
                } else if (_oAngles.x === -6) {
                    _oPin.gotoAndStop(6);
                } else if (_oAngles.x === -7) {
                    _oPin.gotoAndStop(7);
                } else if (_oAngles.x === -8) {
                    _oPin.gotoAndStop(8);
                } else if (_oAngles.x === -9) {
                    _oPin.gotoAndStop(9);
                }
            }
        } else if (_oAngles.z >= 4 && _oAngles.z <= 7) {
      
            if (_oAngles.y >= -8 && _oAngles.y <= 8) {
                if (_oAngles.x === 0) {
                    _oPin.gotoAndStop(10);
                } else if (_oAngles.x === 1) {
                    _oPin.gotoAndStop(11);
                } else if (_oAngles.x === 2) {
                    _oPin.gotoAndStop(12);
                } else if (_oAngles.x === 3) {
                    _oPin.gotoAndStop(13);
                } else if (_oAngles.x === 4) {
                    _oPin.gotoAndStop(14);
                } else if (_oAngles.x === 5) {
                    _oPin.gotoAndStop(15);
                } else if (_oAngles.x === 6) {
                    _oPin.gotoAndStop(16);
                } else if (_oAngles.x === 7) {
                    _oPin.gotoAndStop(17);
                } else if (_oAngles.x === 8) {
                    _oPin.gotoAndStop(18);
                } else if (_oAngles.x === 9) {
                    _oPin.gotoAndStop(19);
                } else if (_oAngles.x === -1) {
                    _oPin.gotoAndStop(51);
                } else if (_oAngles.x === -2) {
                    _oPin.gotoAndStop(52);
                } else if (_oAngles.x === -3) {
                    _oPin.gotoAndStop(53);
                } else if (_oAngles.x === -4) {
                    _oPin.gotoAndStop(54);
                } else if (_oAngles.x === -5) {
                    _oPin.gotoAndStop(55);
                } else if (_oAngles.x === -6) {
                    _oPin.gotoAndStop(56);
                } else if (_oAngles.x === -7) {
                    _oPin.gotoAndStop(57);
                } else if (_oAngles.x === -8) {
                    _oPin.gotoAndStop(58);
                } else if (_oAngles.x === -9) {
                    _oPin.gotoAndStop(59);
                }
            } else if (_oAngles.y <= -8 && _oAngles.y >= -18 || _oAngles.y <= 18 && _oAngles.y >= 10) {
                if (_oAngles.x === 0) {
                    _oPin.gotoAndStop(0);
                } else if (_oAngles.x === 1) {
                    _oPin.gotoAndStop(31);
                } else if (_oAngles.x === 2) {
                    _oPin.gotoAndStop(32);
                } else if (_oAngles.x === 3) {
                    _oPin.gotoAndStop(33);
                } else if (_oAngles.x === 4) {
                    _oPin.gotoAndStop(34);
                } else if (_oAngles.x === 5) {
                    _oPin.gotoAndStop(35);
                } else if (_oAngles.x === 6) {
                    _oPin.gotoAndStop(36);
                } else if (_oAngles.x === 7) {
                    _oPin.gotoAndStop(37);
                } else if (_oAngles.x === 8) {
                    _oPin.gotoAndStop(38);
                } else if (_oAngles.x === 9) {
                    _oPin.gotoAndStop(39);
                } else if (_oAngles.x === -1) {
                    _oPin.gotoAndStop(71);
                } else if (_oAngles.x === -2) {
                    _oPin.gotoAndStop(72);
                } else if (_oAngles.x === -3) {
                    _oPin.gotoAndStop(73);
                } else if (_oAngles.x === -4) {
                    _oPin.gotoAndStop(74);
                } else if (_oAngles.x === -5) {
                    _oPin.gotoAndStop(75);
                } else if (_oAngles.x === -6) {
                    _oPin.gotoAndStop(76);
                } else if (_oAngles.x === -7) {
                    _oPin.gotoAndStop(77);
                } else if (_oAngles.x === -8) {
                    _oPin.gotoAndStop(78);
                } else if (_oAngles.x === -9) {
                    _oPin.gotoAndStop(79);
                }
            }
        } else if (_oAngles.z >= 8 && _oAngles.z <= 10) {

            if (_oAngles.x === 0) {
                _oPin.gotoAndStop(20);
            } else if (_oAngles.x === 1) {
                _oPin.gotoAndStop(21);
            } else if (_oAngles.x === 2) {
                _oPin.gotoAndStop(22);
            } else if (_oAngles.x === 3) {
                _oPin.gotoAndStop(23);
            } else if (_oAngles.x === 4) {
                _oPin.gotoAndStop(24);
            } else if (_oAngles.x === 5) {
                _oPin.gotoAndStop(25);
            } else if (_oAngles.x === 6) {
                _oPin.gotoAndStop(26);
            } else if (_oAngles.x === 7) {
                _oPin.gotoAndStop(27);
            } else if (_oAngles.x === 8) {
                _oPin.gotoAndStop(28);
            } else if (_oAngles.x === 9) {
                _oPin.gotoAndStop(29);
            } else if (_oAngles.x === -1) {
                _oPin.gotoAndStop(61);
            } else if (_oAngles.x === -2) {
                _oPin.gotoAndStop(62);
            } else if (_oAngles.x === -3) {
                _oPin.gotoAndStop(63);
            } else if (_oAngles.x === -4) {
                _oPin.gotoAndStop(64);
            } else if (_oAngles.x === -5) {
                _oPin.gotoAndStop(65);
            } else if (_oAngles.x === -6) {
                _oPin.gotoAndStop(66);
            } else if (_oAngles.x === -7) {
                _oPin.gotoAndStop(67);
            } else if (_oAngles.x === -8) {
                _oPin.gotoAndStop(68);
            } else if (_oAngles.x === -9) {
                _oPin.gotoAndStop(69);
            }
        } else if (_oAngles.z <= -4 && _oAngles.z >= -7) {

            if (_oAngles.y >= -10 && _oAngles.y <= 10) {

                if (_oAngles.x === 0) {
                    _oPin.gotoAndStop(70);
                } else if (_oAngles.x === 1) {
                    _oPin.gotoAndStop(71);
                } else if (_oAngles.x === 2) {
                    _oPin.gotoAndStop(72);
                } else if (_oAngles.x === 3) {
                    _oPin.gotoAndStop(73);
                } else if (_oAngles.x === 4) {
                    _oPin.gotoAndStop(74);
                } else if (_oAngles.x === 5) {
                    _oPin.gotoAndStop(75);
                } else if (_oAngles.x === 6) {
                    _oPin.gotoAndStop(76);
                } else if (_oAngles.x === 7) {
                    _oPin.gotoAndStop(77);
                } else if (_oAngles.x === 8) {
                    _oPin.gotoAndStop(78);
                } else if (_oAngles.x === 9) {
                    _oPin.gotoAndStop(79);
                } else if (_oAngles.x === -1) {
                    _oPin.gotoAndStop(31);
                } else if (_oAngles.x === -2) {
                    _oPin.gotoAndStop(32);
                } else if (_oAngles.x === -3) {
                    _oPin.gotoAndStop(33);
                } else if (_oAngles.x === -4) {
                    _oPin.gotoAndStop(34);
                } else if (_oAngles.x === -5) {
                    _oPin.gotoAndStop(35);
                } else if (_oAngles.x === -6) {
                    _oPin.gotoAndStop(36);
                } else if (_oAngles.x === -7) {
                    _oPin.gotoAndStop(37);
                } else if (_oAngles.x === -8) {
                    _oPin.gotoAndStop(38);
                } else if (_oAngles.x === -9) {
                    _oPin.gotoAndStop(39);
                }
            } else if (_oAngles.y <= -11 && _oAngles.y >= -18 || _oAngles.y <= 18 && _oAngles.y >= 11) {
                if (_oAngles.x === 0) {
                    _oPin.gotoAndStop(50);
                } else if (_oAngles.x === 1) {
                    _oPin.gotoAndStop(51);
                } else if (_oAngles.x === 2) {
                    _oPin.gotoAndStop(52);
                } else if (_oAngles.x === 3) {
                    _oPin.gotoAndStop(53);
                } else if (_oAngles.x === 4) {
                    _oPin.gotoAndStop(54);
                } else if (_oAngles.x === 5) {
                    _oPin.gotoAndStop(55);
                } else if (_oAngles.x === 6) {
                    _oPin.gotoAndStop(56);
                } else if (_oAngles.x === 7) {
                    _oPin.gotoAndStop(57);
                } else if (_oAngles.x === 8) {
                    _oPin.gotoAndStop(58);
                } else if (_oAngles.x === 9) {
                    _oPin.gotoAndStop(59);
                } else if (_oAngles.x === -1) {
                    _oPin.gotoAndStop(11);
                } else if (_oAngles.x === -2) {
                    _oPin.gotoAndStop(12);
                } else if (_oAngles.x === -3) {
                    _oPin.gotoAndStop(13);
                } else if (_oAngles.x === -4) {
                    _oPin.gotoAndStop(14);
                } else if (_oAngles.x === -5) {
                    _oPin.gotoAndStop(15);
                } else if (_oAngles.x === -6) {
                    _oPin.gotoAndStop(16);
                } else if (_oAngles.x === -7) {
                    _oPin.gotoAndStop(17);
                } else if (_oAngles.x === -8) {
                    _oPin.gotoAndStop(18);
                } else if (_oAngles.x === -9) {
                    _oPin.gotoAndStop(19);
                }
            }
        } else if (_oAngles.z === -8) {
     
            if (_oAngles.x === 0) {
                _oPin.gotoAndStop(60);
            } else if (_oAngles.x === 1) {
                _oPin.gotoAndStop(61);
            } else if (_oAngles.x === 2) {
                _oPin.gotoAndStop(62);
            } else if (_oAngles.x === 3) {
                _oPin.gotoAndStop(63);
            } else if (_oAngles.x === 4) {
                _oPin.gotoAndStop(64);
            } else if (_oAngles.x === 5) {
                _oPin.gotoAndStop(65);
            } else if (_oAngles.x === 6) {
                _oPin.gotoAndStop(66);
            } else if (_oAngles.x === 7) {
                _oPin.gotoAndStop(67);
            } else if (_oAngles.x === 8) {
                _oPin.gotoAndStop(68);
            } else if (_oAngles.x === 9) {
                _oPin.gotoAndStop(69);
            } else if (_oAngles.x === -1) {
                _oPin.gotoAndStop(21);
            } else if (_oAngles.x === -2) {
                _oPin.gotoAndStop(22);
            } else if (_oAngles.x === -3) {
                _oPin.gotoAndStop(23);
            } else if (_oAngles.x === -4) {
                _oPin.gotoAndStop(24);
            } else if (_oAngles.x === -5) {
                _oPin.gotoAndStop(25);
            } else if (_oAngles.x === -6) {
                _oPin.gotoAndStop(26);
            } else if (_oAngles.x === -7) {
                _oPin.gotoAndStop(27);
            } else if (_oAngles.x === -8) {
                _oPin.gotoAndStop(28);
            } else if (_oAngles.x === -9) {
                _oPin.gotoAndStop(29);
            }
        }
        _oReflection.gotoAndStop(_oPin.currentFrame);
    };

    this.getPosRef = function () {
        return _oPosRefCast;
    };

    this.setPosRef = function (iZPos) {
        _oPosRefCast = iZPos;
    };

    this.setRegYRef = function (iY) {
        _oReflection.regY = iY;
    };

    this.getRegYRef = function () {
        return _iStartRefRegY;
    };

    this.setPositionReflection = function (iX, iY) {
        _oReflection.x = iX;
        _oReflection.y = iY;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oPin.x = iXPos;
        _oPin.y = iYPos;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setAlpha = function (fVal) {
        _oContainer.alpha = fVal;
    };

    this.setAngle = function (iAngle) {
        _oPin.rotation = iAngle;
    };

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };

    this.setVisibleRef = function (bVal) {
        _oReflection.visible = bVal;
    };

    this.getVisible = function () {
        return _oContainer.visible;
    };

    this.isVisibleRef = function () {
        return _oReflection.visible;
    };

    this.getX = function () {
        return _oPin.x;
    };

    this.getY = function () {
        return _oPin.y;
    };

    this.getStartScale = function () {
        return _fScale;
    };

    this.scale = function (fValue) {
        _oPin.scaleX = fValue;
        _oPin.scaleY = fValue;
        _oReflection.scaleX = fValue;
        _oReflection.scaleY = -fValue;
    };

    this.setAlphaByHeight = function (fHeight) {
        _oReflection.alpha = fHeight;
    };

    this.getAlphaRef = function () {
        return  _oReflection.alpha;
    };

    this.getScale = function () {
        return _oPin.scaleX;
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
