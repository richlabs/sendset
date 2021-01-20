FLIPCARD.namespace("FLIPCARD.Game.Gallery");
(function() {
    FLIPCARD.Game.Gallery = {
        elems: {},
        openedImg: null,
        init: function() {
            this.storeElements();
            this.addEvents();
            this.setAnimGalleryBtnIfCanUnlock();
        },
        storeElements: function() {
            this.elems = {
                galleryBtn: $("score"),
                selectImgView: {
                    back: $("archBack"),
                    imgs: {
                        1: $("archImg1"),
                        2: $("archImg2"),
                        3: $("archImg3")
                    }
                },
                imgView: {
                    finalImage: $("finalImage"),
                    bgImage: $("bgImage"),
                    pieces: $("finalImage").querySelectorAll(".piece"),
                    allScore: $("allScore"),
                    back: $("imgBack")
                }
            };
        },
        addEvents: function() {
            var b = FLIPCARD.Core.Events;
            b.tap({
                element: this.elems.galleryBtn,
                action: this.openSelectImgView.bind(this)
            });
            b.tap({
                element: this.elems.selectImgView.back,
                action: this.hideSelectImgView.bind(this)
            });
            b.tap({
                element: this.elems.selectImgView.imgs[1],
                action: this.openImgView.bind(this, 1)
            });
            b.tap({
                element: this.elems.selectImgView.imgs[2],
                action: this.openImgView.bind(this, 2)
            });
            b.tap({
                element: this.elems.selectImgView.imgs[3],
                action: this.openImgView.bind(this, 3)
            });
            b.tap({
                element: this.elems.imgView.back,
                action: this.hideImgView.bind(this)
            });
            var c = this.elems.imgView.pieces;
            for (var a = 0; a < c.length; a++) {
                b.tap({
                    element: c[a].querySelector("div"),
                    action: this.onTapPiece.bind(this, a + 1)
                });
            }
        },
        isPieceUnlock: function(c, a) {
            var b = FLIPCARD.Game.GameStorage.getItem("unlockPieces");
            return $u.inArrayObject({
                img: c,
                piece: a
            }, b);
        },
        setAnimGalleryBtnIfCanUnlock: function() {
            var b = this.checkIsCanUnlock();
            if (false === b) {
                $u.removeClass(this.elems.galleryBtn, "anim");
                for (var a = 1; a <= 3; a++) {
                    $u.removeClass(this.elems.selectImgView.imgs[a], "anim");
                }
            } else {
                $u.addClass(this.elems.galleryBtn, "anim");
                for (var a = 1; a <= 3; a++) {
                    if (true === $u.inArray(a, b)) {
                        $u.addClass(this.elems.selectImgView.imgs[a], "anim");
                    } else {
                        $u.removeClass(this.elems.selectImgView.imgs[a], "anim");
                    }
                }
            }
        },
        checkIsCanUnlock: function() {
            var b = FLIPCARD.Game.GameStorage.getItem("allPoints");
            var e, d, a, f;
            var c = [];
            for (d = 1; d <= FLIPCARD.Game.GameConfig.imageAmount; d++) {
                e = FLIPCARD.Game.GameConfig.imagePieces[d];
                for (a = 1; a <= FLIPCARD.Game.GameConfig.piecesAmount; a++) {
                    f = e[a];
                    if (b >= f && false === this.isPieceUnlock(d, a)) {
                        if (false === $u.inArray(d, c)) {
                            c.push(d);
                        }
                    }
                }
            }
            if (0 === c.length) {
                return false;
            }
            return c;
        },
        onTapPiece: function(a) {
            var b = {
                img: this.openedImg,
                piece: a,
                cost: FLIPCARD.Game.GameConfig.imagePieces[this.openedImg][a]
            };
            var c = FLIPCARD.Game.GameStorage.getItem("allPoints");
            if (c < b.cost) {
                return;
            }
            this.unlockPiece(b.img, b.piece);
        },
        openSelectImgView: function() {
            this.fillUnlockedAmount();
            FLIPCARD.Core.Popup.show({
                pop: "popAchievements"
            });
        },
        fillUnlockedAmount: function() {
            var d, c, b;
            for (var a = 1; a <= FLIPCARD.Game.GameConfig.imageAmount; a++) {
                b = this.getUnlockedPieces(a).length;
                d = this.elems.selectImgView.imgs[a];
                c = this.elems.selectImgView.imgs[a].querySelector(".unlockAmount");
                c.innerHTML = b;
                if (b == FLIPCARD.Game.GameConfig.piecesAmount) {
                    $u.addClass(d, "unlockedAll");
                } else {
                    $u.removeClass(d, "unlockedAll");
                }
            }
        },
        hideSelectImgView: function() {
            FLIPCARD.Core.Popup.hide("popAchievements");
        },
        openImgView: function(a) {
            this.openedImg = a;
            this.showPieces(this.openedImg);
            this.showImage(this.openedImg);
            this.fillAllScore();
            FLIPCARD.Core.Pages.show({
                page: "pageFinalImage"
            });
            if (true === $u.hasClass(this.elems.imgView.finalImage, "noSize")) {
                this.setImageSizeHelper();
            }
        },
        hideImgView: function() {
            FLIPCARD.Core.Pages.show({
                page: "pageMenu"
            });
        },
        fillAllScore: function() {
            this.elems.imgView.allScore.innerHTML = FLIPCARD.Game.GameStorage.getItem("allPoints");
        },
        showImage: function(a) {
            this.elems.imgView.bgImage.className = "bgImage";
            $u.addClass(this.elems.imgView.bgImage, "img" + a);
        },
        showPieces: function(g) {
            var j = FLIPCARD.Game.GameStorage.getItem("unlockPieces");
            var h = this.getUnlockedPieces(g);
            var d;
            var b = FLIPCARD.Game.GameStorage.getItem("allPoints");
            var a = this.elems.imgView.pieces;
            var c, e;
            for (var f = 0; f < a.length; f++) {
                c = a[f];
                e = c.querySelector("div");
                if ($u.inArray((f + 1), h)) {
                    if (false === $u.hasClass(c, "unlock")) {
                        $u.addClass(c, "hidden");
                    }
                } else {
                    $u.removeClass(c, "hidden");
                    $u.removeClass(c, "unlock");
                }
                d = FLIPCARD.Game.GameConfig.imagePieces[g][f + 1];
                if (b < d) {
                    $u.removeClass(e, "canUnlock");
                    e.innerHTML = d;
                } else {
                    $u.addClass(e, "canUnlock");
                    e.innerHTML = d;
                }
            }
        },
        getUnlockedPieces: function(b) {
            var a = this.getUnlockedPiecesAll()[b];
            if (!a) {
                return [];
            }
            return a;
        },
        getUnlockedPiecesAll: function() {
            var c = FLIPCARD.Game.GameStorage.getItem("unlockPieces");
            var d = {};
            var b;
            for (var a = 0; a < c.length; a++) {
                b = c[a];
                if (!d[b.img]) {
                    d[b.img] = [];
                }
                d[b.img].push(b.piece);
            }
            return d;
        },
        subtractAllScore: function(b) {
            var a = FLIPCARD.Game.GameStorage.getItem("allPoints");
            var c = a - b;
            FLIPCARD.Game.GameStorage.setItem("allPoints", c);
            $u.animateCounter({
                toEl: this.elems.imgView.allScore,
                fromVal: a,
                byVal: -b,
                duration: 500,
                freq: 40
            });
        },
        unlockPiece: function(d, a) {
            var b = this.elems.imgView.pieces[a - 1];
            var c = FLIPCARD.Game.GameConfig.imagePieces[d][a];
            if (true == $u.hasClass(b, "unlock")) {
                return;
            }
            FLIPCARD.Core.Anal.trackEvent("game", "unlock-piece", d + "." + a, c);
            FLIPCARD.Game.GameStorage.pushToItem("unlockPieces", {
                img: d,
                piece: a
            });
            $u.addClass(b, "unlock");
            this.subtractAllScore(c);
            this.showPieces(d);
            this.setAnimGalleryBtnIfCanUnlock();
        },
        setImageSize: function() {
            var a = $u.setProporionSize(this.elems.imgView.finalImage, "height", 0.5744883388862446);
            if (!a) {
                return false;
            }
            return a;
        },
        setImageSizeHelper: function() {
            var a = this.setImageSize();
            if (false === a) {
                setTimeout(this.setImageSizeHelper.bind(this), 50);
                return;
            }
            setTimeout(function() {
                $u.removeClass(this.elems.imgView.finalImage, "noSize");
            }.bind(this), 50);
        }
    };
})();