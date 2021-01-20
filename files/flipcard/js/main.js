window.FLIPCARD = window.FLIPCARD || {};
FLIPCARD.Language = {
    langCode: "en-gb",
    gameTitle: "Flip Card Memory Test",
    play: "Continue",
    newGame: "Play",
    easyMode: "Easy",
    normalMode: "Normal",
    hardMode: "Hard",
    settings: "Settings",
    gallery: "Gallery",
    time: "Time",
    score: "Score",
    on: "On",
    off: "Off",
    music: "Music",
    sound: "Sound",
    back: "Back",
    quitQuestion: "Do you really want to quit?",
    yes: "Yes",
    no: "No",
    winTitle: "You won!",
    bonus: "Bonus",
    ok: "Ok",
    loseTitle: "You lost",
    timeOut: "Time out",
    advertisement: "Advertisement",
    moreGames: "More Games"
};
window.FLIPCARD = window.FLIPCARD || {};
(function(a) {
    var b = this;
    a.namespace = function(f) {
        var e;
        if (typeof f === "string") {
            e = b;
            f = f.split(".");
            for (var d = 0, c = f.length; d < c; d++) {
                e[f[d]] = e = (typeof e[f[d]] === "object" ? e[f[d]] : {});
            }
        }
    };
})(FLIPCARD);
FLIPCARD.namespace("FLIPCARD.Config");
FLIPCARD.Config = {
    gaAccount: false,
    uRecorder: false,
    Pages: {
        pageIntro: {
            id: "pageIntro",
            loadedImages: ["./img/gui/loader/bar.png", "./img/gui/loader/progress-bg.png", "./img/logo.png", "./img/orientation.png", "./img/gui/buttons/normal.png", "./img/gui/buttons/normalHover.png", "./img/bg/bg-splash-center.jpg", "./img/bg/bg-splash-left.jpg", "./img/bg/bg-splash-right.jpg", "./img/bg/splash-animals.png", "./img/bg/bg-flowers-center.jpg", "./img/bg/bg-flowers-left.jpg", "./img/bg/bg-flowers-right.jpg", "./img/cards/1.png", "./img/cards/2.png", "./img/cards/3.png", "./img/cards/4.png", "./img/cards/5.png", "./img/cards/6.png", "./img/cards/7.png", "./img/cards/8.png", "./img/cards/9.png", "./img/cards/10.png", "./img/cards/11.png", "./img/cards/back.png", "./img/finish-images/1.png", "./img/finish-images/2.png", "./img/finish-images/3.png", "./img/finish-images/1blur.png", "./img/finish-images/2blur.png", "./img/finish-images/3blur.png", "./img/gui/clock.png", "./img/gui/hud-bar-box.png", "./img/gui/hud-center.png", "./img/gui/hud-left.png", "./img/gui/hud-right.png", "./img/gui/icons.png", "./img/gui/imageBg.png", "./img/gui/white01.png", "./img/gui/buttons/small.png", "./img/gui/buttons/smallHover.png", "./img/piece/1.png", "./img/piece/2.png", "./img/piece/3.png", "./img/piece/4.png", "./img/piece/5.png", "./img/piece/6.png", "./img/piece/7.png", "./img/piece/8.png", "./img/popups/blue.png", "./img/popups/gold.png", "./img/girl.png", "./img/winImg.png"]
        },
        pageMenu: {
            id: "pageMenu"
        },
        pageGame: {
            id: "pageGame"
        },
        pageAchievements: {
            id: "pageAchievements"
        },
        pageFinalImage: {
            id: "pageFinalImage"
        }
    },
    Pops: {
        popSettings: {
            container: "popSettings"
        },
        popQuit: {
            container: "popQuit"
        },
        popWin: {
            container: "popWin"
        },
        popAchievements: {
            container: "popAchievements"
        },
        popAdvert: {
            container: "popAdvert"
        }
    }
};
FLIPCARD.namespace("FLIPCARD.API");
FLIPCARD.API = {
    setAPI: function(a) {
        this._api = a;
    }
};
FLIPCARD.API.General = (function() {
    var a = function(b) {
        this.init(b);
    };
    a.prototype = {
        init: function(b) {
            if (!FLIPCARD.API._api) {
                return false;
            }
            this.api = new FLIPCARD.API._api(b);
        },
        callMethod: function(b, c) {
            if (this.api && "function" === typeof this.api[b]) {
                return this.api[b](c);
            }
        }
    };
    return a;
}());
FLIPCARD.namespace("FLIPCARD.API.PlayBushido");
FLIPCARD.API.PlayBushido = (function() {
    var a = function(b) {
        this.init(b);
    };
    a.prototype = {
        init: function() {
            FLIPCARD.Core.Anal.setUser(this.getUserId());
            this.addEvents();
        },
        addEvents: function() {
            FLIPCARD.App.addListener("onTapMoreGames", function() {
                if (window.opener) {
                    window.opener.location.href = "https://codecanyon.net/user/darkvalleygames/portfolio?ref=DarkValleyGames";
                    window.close();
                    return;
                }
                window.location.href = "https://codecanyon.net/user/darkvalleygames/portfolio?ref=DarkValleyGames";
            });
            window.addEventListener("orientationchange", function() {
                FLIPCARD.Core.Advert.start();
            }, false);
            window.addEventListener("resize", function() {
                FLIPCARD.Core.Advert.start();
            }, false);
        },
        getUserId: function() {
            var b = localStorage.getItem("FLIPCARDUID");
            if (!b) {
                b = Math.round(Math.random() * Date.now());
                localStorage.setItem("FLIPCARDUID", b);
            }
            return b;
        }
    };
    return a;
}());
FLIPCARD.API.setAPI(FLIPCARD.API.PlayBushido);
FLIPCARD.Config.gaAccount = "#"; /*Your Google ID*/
FLIPCARD.Config.isAdvert = true;
FLIPCARD.namespace("FLIPCARD.Core.Anal");
FLIPCARD.Core.Anal = {
    types: {},
    init: function() {
        this.embedGA();
    },
    embedGA: function() {
        if (!FLIPCARD.Config.gaAccount) {
            return false;
        }(function() {
            var a = this._gaq = this._gaq || [];
            a.push(["_setAccount", FLIPCARD.Config.gaAccount]);
            a.push(["_setDomainName", window.location.host]);
            a.push(["_setAllowLinker", true]);
            a.push(["_trackPageview"]);
            (function() {
                var c = document.createElement("script");
                c.type = "text/javascript";
                c.async = true;
                c.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
                var b = document.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(c, b);
            })();
        })();
    },
    track: function(b, a) {
        if (_gaq && a) {
            _gaq.push(["_trackPageview", "/" + b + "/" + (a || "")]);
        }
    },
    trackEvent: function(c, b, e, a, d) {
        _gaq.push(["_trackEvent", c, b, e, a, d]);
    },
    trackTime: function(c, a, b, d) {
        _gaq.push(["_trackTiming", c, a, b, d, 50]);
    },
    trackSocial: function() {
        _gaq.push(["_trackSocial", "facebook", "like"]);
    },
    setPlayerType: function(a) {
        _gaq.push(["_setCustomVar", 2, "playerType", a, 1]);
    },
    setUser: function(a) {
        _gaq.push(["_setCustomVar", 1, "serviceId", a, 1]);
    }
};
FLIPCARD.Core.Anal.init();
FLIPCARD.namespace("FLIPCARD.Core.Advert");
FLIPCARD.Core.Advert = {
    elems: {},
    gameWrapper: null,
    advertBottomBar: null,
    onClosePopAdvertEvent: null,
    init: function(b, a) {
        this.gameWrapper = b;
        this.advertBottomBar = a;
        this.storeElements();
        this.start();
    },
    storeElements: function() {
        this.elems = {
            popAdvert: $("popAdvert"),
            popAdvertClose: null
        };
        this.elems.popAdvertClose = this.elems.popAdvert.querySelector(".button");
    },
    start: function() {
        if (FLIPCARD.Config.isAdvert) {
            this.showBottomAdvertBar();
        } else {
            this.hideBottomAdvertBar();
        }
    },
    getWindowSize: function() {
        var c, e;
        if (window.innerWidth != undefined) {
            c = window.innerWidth;
            e = window.innerHeight;
        } else {
            var a = document.body;
            var f = document.documentElement;
            c = Math.max(f.clientWidth, a.clientWidth);
            e = Math.max(f.clientHeight, a.clientHeight);
        }
        return {
            height: e,
            width: c
        };
    },
    hideBottomAdvertBar: function() {
        var a = parseInt(this.getWindowSize().height);
        if (parseInt(this.gameWrapper.style.height) == a) {
            return false;
        }
        this.gameWrapper.style.height = a + "px";
        this.advertBottomBar.style.height = "0px";
        this.advertBottomBar.style.display = "none";
        FLIPCARD.Core.FontPercent.setFont(this.gameWrapper);
    },
    showBottomAdvertBar: function() {
        var b = parseInt(this.getWindowSize().height);
        var a = 50;
        if (parseInt(this.gameWrapper.style.height) == (b - a)) {
            return false;
        }
        this.gameWrapper.style.height = (b - a) + "px";
        this.advertBottomBar.style.height = a + "px";
        this.advertBottomBar.style.display = "";
        FLIPCARD.Core.FontPercent.setFont(this.gameWrapper);
    },
    showPopAdvert: function(a) {
        if (!FLIPCARD.Config.isAdvert) {
            a();
            return;
        }
        if (null == this.onClosePopAdvertEvent) {
            FLIPCARD.Core.Events.tap({
                element: this.elems.popAdvertClose,
                action: function() {
                    FLIPCARD.Core.Popup.hide("popAdvert");
                    this.onClosePopAdvertEvent();
                }.bind(this)
            });
        }
        this.onClosePopAdvertEvent = a;
        FLIPCARD.Core.Popup.show({
            pop: "popAdvert"
        });
    }
};
(function(g) {
    if (!navigator.userAgent.match(/OS 6(_\d)+/i)) {
        return;
    }
    var a = {};
    var d = {};
    var e = g.setTimeout;
    var f = g.setInterval;
    var h = g.clearTimeout;
    var c = g.clearInterval;

    function i(p, m, k) {
        var o, j = k[0],
            l = (p === f);

        function n() {
            if (j) {
                j.apply(g, arguments);
                if (!l) {
                    delete m[o];
                    j = null;
                }
            }
        }
        k[0] = n;
        o = p.apply(g, k);
        m[o] = {
            args: k,
            created: Date.now(),
            cb: j,
            id: o
        };
        return o;
    }

    function b(p, n, j, q, s) {
        var k = j[q];
        if (!k) {
            return;
        }
        var l = (p === f);
        n(k.id);
        if (!l) {
            var m = k.args[1];
            var o = Date.now() - k.created;
            if (o < 0) {
                o = 0;
            }
            m -= o;
            if (m < 0) {
                m = 0;
            }
            k.args[1] = m;
        }

        function r() {
            if (k.cb) {
                k.cb.apply(g, arguments);
                if (!l) {
                    delete j[q];
                    k.cb = null;
                }
            }
        }
        k.args[0] = r;
        k.created = Date.now();
        k.id = p.apply(g, k.args);
    }
    g.setTimeout = function() {
        return i(e, a, arguments);
    };
    g.setInterval = function() {
        return i(f, d, arguments);
    };
    g.clearTimeout = function(k) {
        var j = a[k];
        if (j) {
            delete a[k];
            h(j.id);
        }
    };
    g.clearInterval = function(k) {
        var j = d[k];
        if (j) {
            delete d[k];
            c(j.id);
        }
    };
    g.addEventListener("scroll", function() {
        var j;
        for (j in a) {
            b(e, h, a, j);
        }
        for (j in d) {
            b(f, c, d, j);
        }
    });
}(window));
if (!("trim" in String.prototype)) {
    String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "");
    };
}
if (!("indexOf" in Array.prototype)) {
    Array.prototype.indexOf = function(b, a) {
        if (a === undefined) {
            a = 0;
        }
        if (a < 0) {
            a += this.length;
        }
        if (a < 0) {
            a = 0;
        }
        for (var c = this.length; a < c; a++) {
            if (a in this && this[a] === b) {
                return a;
            }
        }
        return -1;
    };
}
if (!("lastIndexOf" in Array.prototype)) {
    Array.prototype.lastIndexOf = function(b, a) {
        if (a === undefined) {
            a = this.length - 1;
        }
        if (a < 0) {
            a += this.length;
        }
        if (a > this.length - 1) {
            a = this.length - 1;
        }
        for (a++; a-- > 0;) {
            if (a in this && this[a] === b) {
                return a;
            }
        }
        return -1;
    };
}
if (!("forEach" in Array.prototype)) {
    Array.prototype.forEach = function(c, b) {
        for (var a = 0, d = this.length; a < d; a++) {
            if (a in this) {
                c.call(b, this[a], a, this);
            }
        }
    };
}
if (!("map" in Array.prototype)) {
    Array.prototype.map = function(d, c) {
        var a = new Array(this.length);
        for (var b = 0, e = this.length; b < e; b++) {
            if (b in this) {
                a[b] = d.call(c, this[b], b, this);
            }
        }
        return a;
    };
}
if (!("filter" in Array.prototype)) {
    Array.prototype.filter = function(d, e) {
        var a = [],
            b;
        for (var c = 0, f = this.length; c < f; c++) {
            if (c in this && d.call(e, b = this[c], c, this)) {
                a.push(b);
            }
        }
        return a;
    };
}
if (!("every" in Array.prototype)) {
    Array.prototype.every = function(a, c) {
        for (var b = 0, d = this.length; b < d; b++) {
            if (b in this && !a.call(c, this[b], b, this)) {
                return false;
            }
        }
        return true;
    };
}
if (!("some" in Array.prototype)) {
    Array.prototype.some = function(a, c) {
        for (var b = 0, d = this.length; b < d; b++) {
            if (b in this && a.call(c, this[b], b, this)) {
                return true;
            }
        }
        return false;
    };
}
if (!Date.now) {
    Date.now = function() {
        return new Date().valueOf();
    };
}
if (!window.addEventListener) {
    window.addEventListener = function(a, b) {
        return window.attachEvent("on" + a, b);
    };
}(function(d) {
    var e = function() {
        this.init();
    };
    e.prototype = {};
    var b = e.prototype;
    b.loaded = false;
    b.progress = 0;
    b._item = null;
    b.onProgress = null;
    b.onLoadStart = null;
    b.onFileLoad = null;
    b.onFileProgress = null;
    b.onComplete = null;
    b.onError = null;
    b.getItem = function() {
        return this._item;
    };
    b.init = function() {};
    b.load = function() {};
    b.cancel = function() {};
    b._sendLoadStart = function() {
        if (this.onLoadStart) {
            this.onLoadStart({
                target: this
            });
        }
    };
    b._sendProgress = function(c) {
        var g;
        if (c instanceof Number) {
            this.progress = c, g = {
                loaded: this.progress,
                total: 1
            };
        } else {
            if (g = c, this.progress = c.loaded / c.total, isNaN(this.progress) || this.progress == Infinity) {
                this.progress = 0;
            }
        }
        g.target = this;
        if (this.onProgress) {
            this.onProgress(g);
        }
    };
    b._sendFileProgress = function(c) {
        if (this.onFileProgress) {
            c.target = this, this.onFileProgress(c);
        }
    };
    b._sendComplete = function() {
        if (this.onComplete) {
            this.onComplete({
                target: this
            });
        }
    };
    b._sendFileComplete = function(c) {
        if (this.onFileLoad) {
            c.target = this, this.onFileLoad(c);
        }
    };
    b._sendError = function(c) {
        if (this.onError) {
            c == null && (c = {}), c.target = this, this.onError(c);
        }
    };
    b.toString = function() {
        return "[PreloadJS AbstractLoader]";
    };
    d.AbstractLoader = e;
})(window);
(function(f) {
    function h() {}
    var e = function(b) {
            this.initialize(b);
        },
        d = e.prototype = new AbstractLoader;
    e.IMAGE = "image";
    e.SOUND = "sound";
    e.JSON = "json";
    e.JAVASCRIPT = "javascript";
    e.CSS = "css";
    e.XML = "xml";
    e.TEXT = "text";
    e.TIMEOUT_TIME = 8000;
    d.useXHR = true;
    d.stopOnError = false;
    d.maintainScriptOrder = true;
    d.next = null;
    d.typeHandlers = null;
    d.extensionHandlers = null;
    d._maxConnections = 1;
    d._currentLoads = null;
    d._loadQueue = null;
    d._loadedItemsById = null;
    d._loadedItemsBySrc = null;
    d._targetProgress = 0;
    d._numItems = 0;
    d._numItemsLoaded = null;
    d._scriptOrder = null;
    d._loadedScripts = null;
    d.TAG_LOAD_OGGS = true;
    d.initialize = function(b) {
        this._targetProgress = this._numItemsLoaded = this._numItems = 0;
        this._paused = false;
        this._currentLoads = [];
        this._loadQueue = [];
        this._scriptOrder = [];
        this._loadedScripts = [];
        this._loadedItemsById = {};
        this._loadedItemsBySrc = {};
        this.typeHandlers = {};
        this.extensionHandlers = {};
        this.useXHR = b != false && f.XMLHttpRequest != null;
        this.determineCapabilities();
    };
    d.determineCapabilities = function() {
        var a = e.lib.BrowserDetect;
        if (a != null) {
            e.TAG_LOAD_OGGS = a.isFirefox || a.isOpera;
        }
    };
    e.isBinary = function(a) {
        switch (a) {
            case e.IMAGE:
            case e.SOUND:
                return true;
            default:
                return false;
        }
    };
    d.installPlugin = function(g) {
        if (!(g == null || g.getPreloadHandlers == null)) {
            g = g.getPreloadHandlers();
            if (g.types != null) {
                for (var c = 0, i = g.types.length; c < i; c++) {
                    this.typeHandlers[g.types[c]] = g.callback;
                }
            }
            if (g.extensions != null) {
                for (c = 0, i = g.extensions.length; c < i; c++) {
                    this.extensionHandlers[g.extensions[c]] = g.callback;
                }
            }
        }
    };
    d.setMaxConnections = function(b) {
        this._maxConnections = b;
        this._paused || this._loadNext();
    };
    d.loadFile = function(g, c) {
        this._addItem(g);
        c !== false && this.setPaused(false);
    };
    d.loadManifest = function(j, i) {
        var l;
        j instanceof Array ? l = j : j instanceof Object && (l = [j]);
        for (var m = 0, k = l.length; m < k; m++) {
            this._addItem(l[m], false);
        }
        i !== false && this._loadNext();
    };
    d.load = function() {
        this.setPaused(false);
    };
    d.getResult = function(b) {
        return this._loadedItemsById[b] || this._loadedItemsBySrc[b];
    };
    d.setPaused = function(b) {
        (this._paused = b) || this._loadNext();
    };
    d.close = function() {
        for (; this._currentLoads.length;) {
            this._currentLoads.pop().cancel();
        }
        this._currentLoads = [];
        this._scriptOrder = [];
        this._loadedScripts = [];
    };
    d._addItem = function(a) {
        a = this._createLoadItem(a);
        a != null && (this._loadQueue.push(a), this._numItems++, this._updateProgress(), a.getItem().type == e.JAVASCRIPT && (this._scriptOrder.push(a.getItem()), this._loadedScripts.push(null)));
    };
    d._loadNext = function() {
        if (!this._paused) {
            this._loadQueue.length == 0 && (this._sendComplete(), this.next && this.next.load && this.next.load.apply(this.next));
            for (; this._loadQueue.length && this._currentLoads.length < this._maxConnections;) {
                var a = this._loadQueue.shift();
                a.onProgress = e.proxy(this._handleProgress, this);
                a.onComplete = e.proxy(this._handleFileComplete, this);
                a.onError = e.proxy(this._handleFileError, this);
                this._currentLoads.push(a);
                a.load();
            }
        }
    };
    d._handleFileError = function(g) {
        var g = g.target,
            c = this._createResultData(g.getItem());
        this._numItemsLoaded++;
        this._updateProgress();
        this._sendError(c);
        this.stopOnError || (this._removeLoadItem(g), this._loadNext());
    };
    d._createResultData = function(b) {
        return {
            id: b.id,
            result: null,
            data: b.data,
            type: b.type,
            src: b.src
        };
    };
    d._handleFileComplete = function(a) {
        this._numItemsLoaded++;
        var a = a.target,
            g = a.getItem();
        this._removeLoadItem(a);
        var i = this._createResultData(g);
        i.result = a instanceof e.lib.XHRLoader ? this._createResult(g, a.getResult()) : g.tag;
        this._loadedItemsById[g.id] = i;
        this._loadedItemsBySrc[g.src] = i;
        var j = this;
        switch (g.type) {
            case e.IMAGE:
                if (a instanceof e.lib.XHRLoader) {
                    i.result.onload = function() {
                        j._handleFileTagComplete(g, i);
                    };
                    return;
                }
                break;
            case e.JAVASCRIPT:
                if (this.maintainScriptOrder) {
                    this._loadedScripts[this._scriptOrder.indexOf(g)] = g;
                    this._checkScriptLoadOrder();
                    return;
                }
        }
        this._handleFileTagComplete(g, i);
    };
    d._checkScriptLoadOrder = function() {
        for (var i = this._loadedScripts.length, g = 0; g < i; g++) {
            var j = this._loadedScripts[g];
            if (j === null) {
                break;
            }
            if (j !== true) {
                var j = this.getResult(j.src),
                    k = this._createResultData(j);
                k.result = j.result;
                this._handleFileTagComplete(j, k);
                this._loadedScripts[g] = true;
                g--;
                i--;
            }
        }
    };
    d._handleFileTagComplete = function(g, c) {
        g.completeHandler && g.completeHandler(c);
        this._updateProgress();
        this._sendFileComplete(c);
        this._loadNext();
    };
    d._removeLoadItem = function(g) {
        for (var c = this._currentLoads.length, i = 0; i < c; i++) {
            if (this._currentLoads[i] == g) {
                this._currentLoads.splice(i, 1);
                break;
            }
        }
    };
    d._createResult = function(a, i) {
        var j = null,
            k;
        switch (a.type) {
            case e.IMAGE:
                j = this._createImage();
                break;
            case e.SOUND:
                j = a.tag || this._createAudio();
                break;
            case e.CSS:
                j = this._createLink();
                break;
            case e.JAVASCRIPT:
                j = this._createScript();
                break;
            case e.XML:
                if (f.DOMParser) {
                    var g = new DOMParser;
                    g.parseFromString(i, "text/xml");
                } else {
                    g = new ActiveXObject("Microsoft.XMLDOM"), g.async = false, g.loadXML(i), k = g;
                }
                break;
            case e.JSON:
            case e.TEXT:
                k = i;
        }
        return j ? (a.type == e.CSS ? j.href = a.src : j.src = a.src, j) : k;
    };
    d._handleProgress = function(g) {
        var g = g.target,
            c = this._createResultData(g.getItem());
        c.progress = g.progress;
        this._sendFileProgress(c);
        this._updateProgress();
    };
    d._updateProgress = function() {
        var j = this._numItemsLoaded / this._numItems,
            i = this._numItems - this._numItemsLoaded;
        if (i > 0) {
            for (var l = 0, m = 0, k = this._currentLoads.length; m < k; m++) {
                l += this._currentLoads[m].progress;
            }
            j += l / i * (i / this._numItems);
        }
        this._sendProgress({
            loaded: j,
            total: 1
        });
    };
    d._createLoadItem = function(a) {
        var g = {};
        switch (typeof a) {
            case "string":
                g.src = a;
                break;
            case "object":
                a instanceof HTMLAudioElement ? (g.tag = a, g.src = g.tag.src, g.type = e.SOUND) : g = a;
        }
        g.ext = this._getNameAfter(g.src, ".");
        if (!g.type) {
            g.type = this.getType(g.ext);
        }
        if (g.id == null || g.id == "") {
            g.id = g.src;
        }
        if (a = this.typeHandlers[g.type] || this.extensionHandlers[g.ext]) {
            a = a(g.src, g.type, g.id, g.data);
            if (a === false) {
                return null;
            } else {
                if (a !== true) {
                    if (a.src != null) {
                        g.src = a.src;
                    }
                    if (a.id != null) {
                        g.id = a.id;
                    }
                    if (a.tag != null && a.tag.load instanceof Function) {
                        g.tag = a.tag;
                    }
                }
            }
            g.ext = this._getNameAfter(g.src, ".");
        }
        a = this.useXHR;
        switch (g.type) {
            case e.JSON:
            case e.XML:
            case e.TEXT:
                a = true;
                break;
            case e.SOUND:
                g.ext == "ogg" && e.TAG_LOAD_OGGS && (a = false);
        }
        if (a) {
            return new e.lib.XHRLoader(g);
        } else {
            if (g.tag) {
                return new e.lib.TagLoader(g);
            } else {
                var i, a = "src",
                    j = false;
                switch (g.type) {
                    case e.IMAGE:
                        i = this._createImage();
                        break;
                    case e.SOUND:
                        i = this._createAudio();
                        break;
                    case e.CSS:
                        a = "href";
                        j = true;
                        i = this._createLink();
                        break;
                    case e.JAVASCRIPT:
                        j = true, i = this._createScript();
                }
                g.tag = i;
                return new e.lib.TagLoader(g, a, j);
            }
        }
    };
    d.getType = function(a) {
        switch (a) {
            case "jpeg":
            case "jpg":
            case "gif":
            case "png":
                return e.IMAGE;
            case "ogg":
            case "mp3":
            case "wav":
                return e.SOUND;
            case "json":
                return e.JSON;
            case "xml":
                return e.XML;
            case "css":
                return e.CSS;
            case "js":
                return e.JAVASCRIPT;
            default:
                return e.TEXT;
        }
    };
    d._getNameAfter = function(i, g) {
        var j = i.lastIndexOf(g),
            j = i.substr(j + 1),
            k = j.lastIndexOf(/[\b|\?|\#|\s]/);
        return k == -1 ? j : j.substr(0, k);
    };
    d._createImage = function() {
        return document.createElement("img");
    };
    d._createAudio = function() {
        var b = document.createElement("audio");
        b.autoplay = false;
        b.type = "audio/ogg";
        return b;
    };
    d._createScript = function() {
        var b = document.createElement("script");
        b.type = "text/javascript";
        return b;
    };
    d._createLink = function() {
        var b = document.createElement("link");
        b.type = "text/css";
        b.rel = "stylesheet";
        return b;
    };
    d.toString = function() {
        return "[PreloadJS]";
    };
    e.proxy = function(g, c) {
        return function(a) {
            return g.apply(c, arguments);
        };
    };
    e.lib = {};
    f.PreloadJS = e;
    h.init = function() {
        var b = navigator.userAgent;
        h.isFirefox = b.indexOf("Firefox") > -1;
        h.isOpera = f.opera != null;
        h.isIOS = b.indexOf("iPod") > -1 || b.indexOf("iPhone") > -1 || b.indexOf("iPad") > -1;
    };
    h.init();
    e.lib.BrowserDetect = h;
})(window);
(function() {
    var a = function(e, d, f) {
            this.init(e, d, f);
        },
        b = a.prototype = new AbstractLoader;
    b._srcAttr = null;
    b._loadTimeOutTimeout = null;
    b.tagCompleteProxy = null;
    b.init = function(e, d, f) {
        this._item = e;
        this._srcAttr = d || "src";
        this._useXHR = f == true;
        this.isAudio = e.tag instanceof HTMLAudioElement;
        this.tagCompleteProxy = PreloadJS.proxy(this._handleTagLoad, this);
    };
    b.cancel = function() {
        this._clean();
        var c = this.getItem();
        if (c != null) {
            c.src = null;
        }
    };
    b.load = function() {
        this._useXHR ? this.loadXHR() : this.loadTag();
    };
    b.loadXHR = function() {
        var c = this.getItem(),
            c = new PreloadJS.lib.XHRLoader(c);
        c.onProgress = PreloadJS.proxy(this._handleProgress, this);
        c.onFileLoad = PreloadJS.proxy(this._handleXHRComplete, this);
        c.onFileError = PreloadJS.proxy(this._handleLoadError, this);
        c.load();
    };
    b._handleXHRComplete = function(d) {
        this._clean();
        var c = d.getItem();
        d.getResult();
        c.type == PreloadJS.IMAGE ? (c.tag.onload = PreloadJS.proxy(this._sendComplete, this), c.tag.src = c.src) : (c.tag[this._srcAttr] = c.src, this._sendComplete());
    };
    b._handleLoadError = function(c) {
        this._clean();
        this._sendError(c);
    };
    b.loadTag = function() {
        var d = this.getItem(),
            c = d.tag;
        clearTimeout(this._loadTimeOutTimeout);
        this._loadTimeOutTimeout = setTimeout(PreloadJS.proxy(this._handleLoadTimeOut, this), PreloadJS.TIMEOUT_TIME);
        if (this.isAudio) {
            c.src = null, c.preload = "auto", c.setAttribute("data-temp", "true");
        }
        c.onerror = PreloadJS.proxy(this._handleLoadError, this);
        c.onprogress = PreloadJS.proxy(this._handleProgress, this);
        this.isAudio ? (c.onstalled = PreloadJS.proxy(this._handleStalled, this), c.addEventListener("canplaythrough", this.tagCompleteProxy)) : c.onload = PreloadJS.proxy(this._handleTagLoad, this);
        c[this._srcAttr] = d.src;
        d = d.type == PreloadJS.SOUND && d.ext == "ogg" && PreloadJS.lib.BrowserDetect.isFirefox;
        c.load != null && !d && c.load();
    };
    b._handleLoadTimeOut = function() {
        this._clean();
        this._sendError();
    };
    b._handleStalled = function() {};
    b._handleLoadError = function() {
        this._clean();
        this._sendError();
    };
    b._handleTagLoad = function() {
        var c = this.getItem().tag;
        clearTimeout(this._loadTimeOutTimeout);
        if (!(this.isAudio && c.readyState !== 4) && !this.loaded) {
            this.loaded = true, this._clean(), this._sendComplete();
        }
    };
    b._clean = function() {
        clearTimeout(this._loadTimeOutTimeout);
        var c = this.getItem().tag;
        c.onload = null;
        c.removeEventListener("canplaythrough", this.tagCompleteProxy);
        c.onstalled = null;
        c.onprogress = null;
        c.onerror = null;
    };
    b._handleProgress = function(c) {
        clearTimeout(this._loadTimeOutTimeout);
        if (this.isAudio) {
            c = this.getItem();
            if (c.buffered == null) {
                return;
            }
            c = {
                loaded: c.buffered.length > 0 ? c.buffered.end(0) : 0,
                total: c.duration
            };
        }
        this._sendProgress(c);
    };
    b.toString = function() {
        return "[PreloadJS TagLoader]";
    };
    PreloadJS.lib.TagLoader = a;
})(window);
(function(d) {
    var e = function(c) {
            this.init(c);
        },
        b = e.prototype = new AbstractLoader;
    b._wasLoaded = false;
    b._request = null;
    b._loadTimeOutTimeout = null;
    b._xhrLevel = null;
    b.init = function(c) {
        this._item = c;
        this._createXHR(c);
    };
    b.getResult = function() {
        try {
            return this._request.responseText;
        } catch (c) {}
        return this._request.response;
    };
    b.cancel = function() {
        this._clean();
        this._request.abort();
    };
    b.load = function() {
        if (this._request == null) {
            this.handleError();
        } else {
            if (this._xhrLevel == 1) {
                this._loadTimeOutTimeout = setTimeout(PreloadJS.proxy(this.handleTimeout, this), PreloadJS.TIMEOUT_TIME);
            }
            this._request.onloadstart = PreloadJS.proxy(this.handleLoadStart, this);
            this._request.onprogress = PreloadJS.proxy(this.handleProgress, this);
            this._request.onabort = PreloadJS.proxy(this.handleAbort, this);
            this._request.onerror = PreloadJS.proxy(this.handleError, this);
            this._request.ontimeout = PreloadJS.proxy(this.handleTimeout, this);
            this._request.onload = PreloadJS.proxy(this.handleLoad, this);
            this._request.onreadystatechange = PreloadJS.proxy(this.handleReadyStateChange, this);
            try {
                this._request.send();
            } catch (c) {}
        }
    };
    b.handleProgress = function(c) {
        c.loaded > 0 && c.total == 0 || this._sendProgress({
            loaded: c.loaded,
            total: c.total
        });
    };
    b.handleLoadStart = function() {
        clearTimeout(this._loadTimeOutTimeout);
        this._sendLoadStart();
    };
    b.handleAbort = function() {
        this._clean();
        this._sendError();
    };
    b.handleError = function() {
        this._clean();
        this._sendError();
    };
    b.handleReadyStateChange = function() {
        this._request.readyState == 4 && this.handleLoad();
    };
    b._checkError = function() {
        switch (parseInt(this._request.status)) {
            case 404:
            case 0:
                return false;
        }
        if (this._request.response == null) {
            try {
                if (this._request.responseXML != null) {
                    return true;
                }
            } catch (c) {}
            return false;
        }
        return true;
    };
    b.handleLoad = function() {
        if (!this.loaded) {
            this.loaded = true, this._checkError() ? (this._clean(), this._sendComplete()) : this.handleError();
        }
    };
    b.handleTimeout = function() {
        this._clean();
        this._sendError();
    };
    b.handleLoadEnd = function() {
        this._clean();
    };
    b._createXHR = function(f) {
        this._xhrLevel = 1;
        if (d.ArrayBuffer) {
            this._xhrLevel = 2;
        }
        if (d.XMLHttpRequest) {
            this._request = new XMLHttpRequest;
        } else {
            try {
                this._request = new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (g) {
                return null;
            }
        }
        f.type == PreloadJS.TEXT && this._request.overrideMimeType("text/plain; charset=x-user-defined");
        this._request.open("GET", f.src, true);
        if (PreloadJS.isBinary(f.type)) {
            this._request.responseType = "arraybuffer";
        }
        return true;
    };
    b._clean = function() {
        clearTimeout(this._loadTimeOutTimeout);
        var c = this._request;
        c.onloadstart = null;
        c.onprogress = null;
        c.onabort = null;
        c.onerror = null;
        c.onload = null;
        c.ontimeout = null;
        c.onloadend = null;
        c.onreadystatechange = null;
        clearInterval(this._checkLoadInterval);
    };
    b.toString = function() {
        return "[PreloadJS XHRLoader]";
    };
    PreloadJS.lib.XHRLoader = e;
})(window);
this.jukebox = {};
jukebox.Player = function(c, a) {
    this.id = ++jukebox.__jukeboxId;
    this.origin = a || null;
    this.settings = {};
    for (var e in this.defaults) {
        this.settings[e] = this.defaults[e];
    }
    if (Object.prototype.toString.call(c) === "[object Object]") {
        for (var b in c) {
            this.settings[b] = c[b];
        }
    }
    if (Object.prototype.toString.call(jukebox.Manager) === "[object Function]") {
        jukebox.Manager = new jukebox.Manager();
    }
    this.isPlaying = null;
    this.resource = null;
    if (Object.prototype.toString.call(jukebox.Manager) === "[object Object]") {
        this.resource = jukebox.Manager.getPlayableResource(this.settings.resources);
    } else {
        this.resource = this.settings.resources[0] || null;
    }
    if (this.resource === null) {
        throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
    } else {
        this.__init();
    }
    return this;
};
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
    defaults: {
        resources: [],
        autoplay: false,
        spritemap: {},
        flashMediaElement: "./swf/FlashMediaElement.swf",
        timeout: 1000
    },
    __addToManager: function(a) {
        if (this.__wasAddedToManager !== true) {
            jukebox.Manager.add(this);
            this.__wasAddedToManager = true;
        }
    },
    __init: function() {
        var d = this,
            c = this.settings,
            b = {},
            a;
        if (jukebox.Manager && jukebox.Manager.features !== undefined) {
            b = jukebox.Manager.features;
        }
        if (b.html5audio === true) {
            this.context = new Audio();
            this.context.src = this.resource;
            if (this.origin === null) {
                var f = function(g) {
                    d.__addToManager(g);
                };
                this.context.addEventListener("canplaythrough", f, true);
                window.setTimeout(function() {
                    d.context.removeEventListener("canplaythrough", f, true);
                    f("timeout");
                }, c.timeout);
            }
            this.context.autobuffer = true;
            this.context.preload = true;
            for (a in this.HTML5API) {
                this[a] = this.HTML5API[a];
            }
            if (b.channels > 1) {
                if (c.autoplay === true) {
                    this.context.autoplay = true;
                } else {
                    if (c.spritemap[c.autoplay] !== undefined) {
                        this.play(c.autoplay);
                    }
                }
            } else {
                if (b.channels === 1 && c.spritemap[c.autoplay] !== undefined) {
                    this.backgroundMusic = c.spritemap[c.autoplay];
                    this.backgroundMusic.started = Date.now ? Date.now() : +new Date();
                    this.play(c.autoplay);
                }
            }
            if (b.channels == 1 && c.canPlayBackground !== true) {
                window.addEventListener("pagehide", function() {
                    if (d.isPlaying !== null) {
                        d.pause();
                        d.__wasAutoPaused = true;
                    }
                });
                window.addEventListener("pageshow", function() {
                    if (d.__wasAutoPaused) {
                        d.resume();
                        delete d._wasAutoPaused;
                    }
                });
            }
        } else {
            if (b.flashaudio === true) {
                for (a in this.FLASHAPI) {
                    this[a] = this.FLASHAPI[a];
                }
                var e = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
                this.__initFlashContext(e);
                if (c.autoplay === true) {
                    this.play(0);
                } else {
                    if (c.spritemap[c.autoplay]) {
                        this.play(c.autoplay);
                    }
                }
            } else {
                throw "Your Browser does not support Flash Audio or HTML5 Audio.";
            }
        }
    },
    __initFlashContext: function(g) {
        var d, b = this.settings.flashMediaElement,
            e;
        var f = {
            flashvars: g.join("&"),
            quality: "high",
            bgcolor: "#000000",
            wmode: "transparent",
            allowscriptaccess: "always",
            allowfullscreen: "true"
        };
        if (navigator.userAgent.match(/MSIE/)) {
            d = document.createElement("div");
            document.getElementsByTagName("body")[0].appendChild(d);
            var a = document.createElement("object");
            a.id = "jukebox-flashstream-" + this.id;
            a.setAttribute("type", "application/x-shockwave-flash");
            a.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
            a.setAttribute("width", "0");
            a.setAttribute("height", "0");
            f.movie = b + "?x=" + (Date.now ? Date.now() : +new Date());
            f.flashvars = g.join("&amp;");
            for (e in f) {
                var c = document.createElement("param");
                c.setAttribute("name", e);
                c.setAttribute("value", f[e]);
                a.appendChild(c);
            }
            d.outerHTML = a.outerHTML;
            this.context = document.getElementById("jukebox-flashstream-" + this.id);
        } else {
            d = document.createElement("embed");
            d.id = "jukebox-flashstream-" + this.id;
            d.setAttribute("type", "application/x-shockwave-flash");
            d.setAttribute("width", "100");
            d.setAttribute("height", "100");
            f.play = false;
            f.loop = false;
            f.src = b + "?x=" + (Date.now ? Date.now() : +new Date());
            for (e in f) {
                d.setAttribute(e, f[e]);
            }
            document.getElementsByTagName("body")[0].appendChild(d);
            this.context = d;
        }
    },
    backgroundHackForiOS: function() {
        if (this.backgroundMusic === undefined) {
            return;
        }
        var a = Date.now ? Date.now() : +new Date();
        if (this.backgroundMusic.started === undefined) {
            this.backgroundMusic.started = a;
            this.setCurrentTime(this.backgroundMusic.start);
        } else {
            this.backgroundMusic.lastPointer = ((a - this.backgroundMusic.started) / 1000) % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start;
            this.play(this.backgroundMusic.lastPointer);
        }
    },
    play: function(e, d) {
        if (this.isPlaying !== null && d !== true) {
            if (jukebox.Manager !== undefined) {
                jukebox.Manager.addToQueue(e, this.id);
            }
            return;
        }
        var b = this.settings.spritemap,
            a;
        if (b[e] !== undefined) {
            a = b[e].start;
        } else {
            if (typeof e === "number") {
                a = e;
                for (var c in b) {
                    if (a >= b[c].start && a <= b[c].end) {
                        e = c;
                        break;
                    }
                }
            }
        }
        if (a !== undefined && Object.prototype.toString.call(b[e]) === "[object Object]") {
            this.isPlaying = this.settings.spritemap[e];
            if (this.context.play) {
                this.context.play();
            }
            this.wasReady = this.setCurrentTime(a);
        }
    },
    stop: function() {
        this.__lastPosition = 0;
        this.isPlaying = null;
        if (this.backgroundMusic) {
            this.backgroundHackForiOS();
        } else {
            this.context.pause();
        }
        return true;
    },
    pause: function() {
        this.isPlaying = null;
        this.__lastPosition = this.getCurrentTime();
        this.context.pause();
        return this.__lastPosition;
    },
    resume: function(a) {
        a = typeof a === "number" ? a : this.__lastPosition;
        if (a !== null) {
            this.play(a);
            this.__lastPosition = null;
            return true;
        } else {
            this.context.play();
            return false;
        }
    },
    HTML5API: {
        getVolume: function() {
            return this.context.volume || 1;
        },
        setVolume: function(a) {
            this.context.volume = a;
            if (Math.abs(this.context.volume - a) < 0.0001) {
                return true;
            }
            return false;
        },
        getCurrentTime: function() {
            return this.context.currentTime || 0;
        },
        setCurrentTime: function(a) {
            try {
                this.context.currentTime = a;
                return true;
            } catch (b) {
                return false;
            }
        }
    },
    FLASHAPI: {
        getVolume: function() {
            if (this.context && typeof this.context.getVolume === "function") {
                return this.context.getVolume();
            }
            return 1;
        },
        setVolume: function(a) {
            if (this.context && typeof this.context.setVolume === "function") {
                this.context.setVolume(a);
                return true;
            }
            return false;
        },
        getCurrentTime: function() {
            if (this.context && typeof this.context.getCurrentTime === "function") {
                return this.context.getCurrentTime();
            }
            return 0;
        },
        setCurrentTime: function(a) {
            if (this.context && typeof this.context.setCurrentTime === "function") {
                return this.context.setCurrentTime(a);
            }
            return false;
        }
    }
};
if (this.jukebox === undefined) {
    throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
}
jukebox.Manager = function(b) {
    this.features = {};
    this.codecs = {};
    this.__players = {};
    this.__playersLength = 0;
    this.__clones = {};
    this.__queue = [];
    this.settings = {};
    for (var c in this.defaults) {
        this.settings[c] = this.defaults[c];
    }
    if (Object.prototype.toString.call(b) === "[object Object]") {
        for (var a in b) {
            this.settings[a] = b[a];
        }
    }
    this.__detectFeatures();
    if (this.settings.useGameLoop === false) {
        jukebox.Manager.__initialized = window.setInterval(function() {
            jukebox.Manager.loop();
        }, 20);
    } else {
        jukebox.Manager.__initialized = true;
    }
};
jukebox.Manager.prototype = {
    defaults: {
        useFlash: false,
        useGameLoop: false
    },
    __detectFeatures: function() {
        var h = window.Audio && new Audio();
        if (h && h.canPlayType && this.settings.useFlash === false) {
            var a = [{
                e: "3gp",
                m: ["audio/3gpp", "audio/amr"]
            }, {
                e: "aac",
                m: ["audio/aac", "audio/aacp"]
            }, {
                e: "amr",
                m: ["audio/amr", "audio/3gpp"]
            }, {
                e: "caf",
                m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"']
            }, {
                e: "m4a",
                m: ["audio/mp4", 'audio/mp4; codecs="mp4a.40.2,avc1.42E01E"', "audio/mpeg4", "audio/mpeg4-generic", "audio/mp4a-latm", "audio/MP4A-LATM", "audio/x-m4a"]
            }, {
                e: "mp3",
                m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"]
            }, {
                e: "mpga",
                m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"]
            }, {
                e: "mp4",
                m: ["audio/mp4", "video/mp4"]
            }, {
                e: "ogg",
                m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
            }, {
                e: "wav",
                m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"]
            }, {
                e: "webm",
                m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"]
            }];
            var b, k;
            for (var d = 0, f = a.length; d < f; d++) {
                k = a[d].e;
                if (a[d].m.length && typeof a[d].m === "object") {
                    for (var g = 0, c = a[d].m.length; g < c; g++) {
                        b = a[d].m[g];
                        if (h.canPlayType(b) !== "") {
                            this.codecs[k] = b;
                            break;
                        } else {
                            if (!this.codecs[k]) {
                                this.codecs[k] = false;
                            }
                        }
                    }
                }
                b = null;
                k = null;
            }
            this.features.html5audio = !!(this.codecs.mp3 || this.codecs.ogg || this.codecs.webm || this.codecs.wav);
            this.features.channels = 8;
            h.volume = 0.1337;
            this.features.volume = !!(Math.abs(h.volume - 0.1337) < 0.0001);
            if (navigator.userAgent.match(/iPhone|iPod|iPad/i)) {
                this.features.channels = 1;
            }
        }
        this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || false;
        if (window.ActiveXObject) {
            try {
                var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10");
                this.features.flashaudio = true;
            } catch (j) {}
        }
        if (this.settings.useFlash === true) {
            this.features.flashaudio = true;
        }
        if (this.features.flashaudio === true) {
            if (!this.features.html5audio) {
                this.codecs.mp3 = "audio/mp3";
                this.codecs.mpga = "audio/mpeg";
                this.codecs.mp4 = "audio/mp4";
                this.codecs.m4a = "audio/mp4";
                this.codecs["3gp"] = "audio/3gpp";
                this.codecs.amr = "audio/amr";
                this.features.volume = true;
                this.features.channels = 1;
            }
        }
    },
    __getPlayerById: function(a) {
        if (this.__players && this.__players[a] !== undefined) {
            return this.__players[a];
        }
        return null;
    },
    __getClone: function(c, e) {
        for (var f in this.__clones) {
            var g = this.__clones[f];
            if (g.isPlaying === null && g.origin === c) {
                return g;
            }
        }
        if (Object.prototype.toString.call(e) === "[object Object]") {
            var b = {};
            for (var d in e) {
                b[d] = e[d];
            }
            b.autoplay = false;
            var a = new jukebox.Player(b, c);
            a.isClone = true;
            a.wasReady = false;
            this.__clones[a.id] = a;
            return a;
        }
        return null;
    },
    loop: function() {
        if (this.__playersLength === 0) {
            return;
        }
        if (this.__queue.length && this.__playersLength < this.features.channels) {
            var e = this.__queue[0],
                b = this.__getPlayerById(e.origin);
            if (b !== null) {
                var a = this.__getClone(e.origin, b.settings);
                if (a !== null) {
                    if (this.features.volume === true) {
                        var b = this.__players[e.origin];
                        b && a.setVolume(b.getVolume());
                    }
                    this.add(a);
                    a.play(e.pointer, true);
                }
            }
            this.__queue.splice(0, 1);
            return;
        } else {
            if (this.__queue.length && this.features.channels === 1) {
                var e = this.__queue[0],
                    b = this.__getPlayerById(e.origin);
                if (b !== null) {
                    b.play(e.pointer, true);
                }
                this.__queue.splice(0, 1);
            }
        }
        for (var f in this.__players) {
            var c = this.__players[f],
                d = c.getCurrentTime() || 0;
            if (c.isPlaying && c.wasReady === false) {
                c.wasReady = c.setCurrentTime(c.isPlaying.start);
            } else {
                if (c.isPlaying && c.wasReady === true) {
                    if (d > c.isPlaying.end) {
                        if (c.isPlaying.loop === true) {
                            c.play(c.isPlaying.start, true);
                        } else {
                            c.stop();
                        }
                    }
                } else {
                    if (c.isClone && c.isPlaying === null) {
                        this.remove(c);
                        continue;
                    } else {
                        if (c.backgroundMusic !== undefined && c.isPlaying === null) {
                            if (d > c.backgroundMusic.end) {
                                c.backgroundHackForiOS();
                            }
                        }
                    }
                }
            }
        }
    },
    getPlayableResource: function(d) {
        if (Object.prototype.toString.call(d) !== "[object Array]") {
            d = [d];
        }
        for (var b = 0, a = d.length; b < a; b++) {
            var c = d[b],
                e = c.match(/\.([^\.]*)$/)[1];
            if (e && !!this.codecs[e]) {
                return c;
            }
        }
        return null;
    },
    add: function(a) {
        if (a instanceof jukebox.Player && this.__players[a.id] === undefined) {
            this.__playersLength++;
            this.__players[a.id] = a;
            return true;
        }
        return false;
    },
    remove: function(a) {
        if (a instanceof jukebox.Player && this.__players[a.id] !== undefined) {
            this.__playersLength--;
            delete this.__players[a.id];
            return true;
        }
        return false;
    },
    addToQueue: function(b, a) {
        if ((typeof b === "string" || typeof b === "number") && this.__players[a] !== undefined) {
            this.__queue.push({
                pointer: b,
                origin: a
            });
            return true;
        }
        return false;
    }
};
FLIPCARD.namespace("FLIPCARD.Core.Utils");
FLIPCARD.Core.Utils = {
    preventDocumentMoves: function() {
        function a(b) {
            b.preventDefault();
        }
    },
    isDesktop: function() {
        return !("ontouchstart" in window) || navigator.userAgent.match(/Windows|Macintosh/);
    },
    addClass: function(c, d) {
        if (!c || !d) {
            return false;
        }
        if (false === (c instanceof Array)) {
            c = [c];
        }
        for (var b = 0, a = c.length; b < a; b++) {
            if (!c[b]) {
                continue;
            }
            FLIPCARD.Core.Utils.removeClass(c[b], d);
            c[b].className += (c[b].className ? " " : "") + d;
        }
    },
    removeClass: function(e, f) {
        if (!e) {
            return false;
        }
        if (false === (e instanceof Array) && false === (e instanceof NodeList)) {
            e = [e];
        }
        for (var d = 0, a = e.length; d < a; d++) {
            if (!e[d]) {
                continue;
            }
            var c = e[d].className.split(" ");
            var b = c.indexOf(f);
            if (-1 === b) {
                continue;
            }
            c.splice(b, 1);
            e[d].className = c.join(" ");
        }
    },
    hasClass: function(b, a) {
        if (b.className.indexOf(a) > -1) {
            return true;
        }
        return false;
    },
    isObjEmpty: function(a) {
        for (var b in a) {
            if (a.hasOwnProperty(b)) {
                return false;
            }
        }
        return true;
    },
    hideURLbar: function() {
        if (navigator.userAgent.match(/Android/i)) {
            window.scrollTo(0, 0);
            document.body.style.height = (window.outerHeight - 250) + "px";
            window.scrollTo(0, 1);
        }
    },
    hasChildElements: function(a) {
        var b, c;
        b = false;
        for (c = a.firstChild; c; c = c.nextSibling) {
            if (c.nodeType == 1) {
                b = true;
                break;
            }
        }
        return b;
    },
    getCoords: function(a) {
        return {
            x: a.touches.item(0).clientX,
            y: a.touches.item(0).clientY
        };
    },
    rand: function(b, a) {
        return Math.floor(Math.random() * (a - b + 1)) + b;
    },
    arrayInclude: function(a, b) {
        if (-1 === a.indexOf(b)) {
            a.push(b);
        }
        return a;
    },
    arrayCombine: function(d, b) {
        if (b.length > 0) {
            for (var c = 0, a = b.length; c < a; c++) {
                d = this.arrayInclude(d, b[c]);
            }
        }
        return d;
    },
    arrayErase: function(c, b) {
        for (var a = c.length; a--;) {
            if (c[a] === b) {
                c.splice(a, 1);
            }
        }
    },
    cleanElement: function(d, b) {
        b = b || false;
        var a = d.parentNode;
        if (!a) {
            return false;
        }
        var c = d.cloneNode(b);
        a.insertBefore(c, d);
        a.removeChild(d);
        return true;
    },
    inherit: function(b, f, a) {
        var c = function() {};
        c.prototype = b.prototype;
        f.prototype = new c();
        for (var d in a) {
            if (a.hasOwnProperty(d)) {
                f.prototype[d] = a[d];
            }
        }
    },
    mixin: function(c, a) {
        for (var b in c) {
            if (c.hasOwnProperty(b)) {
                a[b] = c[b];
            }
        }
        return a;
    },
    implement: function(b, f, a) {
        var c = function() {};
        c.prototype = b.prototype;
        f.prototype = new c();
        for (var d in a) {
            f.prototype[d] = a[d];
        }
    },
    cloneObj: function(d) {
        if (typeof d !== "object" || d == null) {
            return d;
        }
        var f = d instanceof Array ? [] : {};
        for (var b in d) {
            var e = d[b];
            if (typeof e == "object") {
                if (e instanceof Array) {
                    f[b] = [];
                    for (var a = 0; a < e.length; a++) {
                        if (typeof e[a] != "object") {
                            f[b].push(e[a]);
                        } else {
                            f[b].push(this.cloneObj(e[a]));
                        }
                    }
                } else {
                    f[b] = this.cloneObj(e);
                }
            } else {
                f[b] = e;
            }
        }
        return f;
    },
    showCharByChar: function(e, d, c, a, f) {
        if (c < d.length) {
            var b = e.innerHTML;
            e.innerHTML = b + d[c];
            c = c + 1;
            setTimeout(function() {
                $u.showCharByChar(e, d, c, a, f);
            }, a);
        } else {
            if (f) {
                f();
            }
        }
    },
    isArray: function(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
    },
    inArray: function(a, b) {
        return !!~b.indexOf(a);
    },
    inArrayObject: function(c, d) {
        var b = JSON.stringify(c);
        var e = [];
        for (var a = 0; a < d.length; a++) {
            e.push(JSON.stringify(d[a]));
        }
        return this.inArray(b, e);
    },
    arrayShuffle: function(c) {
        var b = c.length;
        if (b == 0) {
            return false;
        }
        while (--b) {
            var a = Math.floor(Math.random() * (b + 1));
            var e = c[b];
            var d = c[a];
            c[b] = d;
            c[a] = e;
        }
        return c;
    },
    ucfirst: function(b) {
        b += "";
        var a = b.charAt(0).toUpperCase();
        return a + b.substr(1);
    },
    getViewZone: function() {
        var c = window.scrollY;
        var a = window.innerHeight;
        var b = c + a;
        return {
            from: 0,
            to: 500,
            height: 500,
            allHeight: document.body.clientHeight
        };
    },
    getStyle: function(b, a) {
        var d, c = (b.ownerDocument || document).defaultView;
        if (c && c.getComputedStyle) {
            a = a.replace(/([A-Z])/g, "-$1").toLowerCase();
            return c.getComputedStyle(b, null).getPropertyValue(a);
        } else {
            if (b.currentStyle) {
                a = a.replace(/\-(\w)/g, function(f, e) {
                    return e.toUpperCase();
                });
                d = b.currentStyle[a];
                if (/^\d+(em|pt|%|ex)?$/i.test(d)) {
                    return (function(e) {
                        var g = b.style.left,
                            f = b.runtimeStyle.left;
                        b.runtimeStyle.left = b.currentStyle.left;
                        b.style.left = e || 0;
                        e = b.style.pixelLeft + "px";
                        b.style.left = g;
                        b.runtimeStyle.left = f;
                        return e;
                    })(d);
                }
                return d;
            }
        }
    },
    getSize: function(b) {
        var a = this.getStyle(b, "width");
        var c = this.getStyle(b, "height");
        if (-1 === a.indexOf("px") || -1 === c.indexOf("px")) {
            return false;
        }
        a = parseInt(a, 10);
        c = parseInt(c, 10);
        return {
            width: a,
            height: c
        };
    },
    setSquareSize: function(b) {
        var c = this.getSize(b);
        if (false === c) {
            return false;
        }
        var a = (c.width < c.height) ? c.width : c.height;
        b.style.width = a + "px";
        b.style.height = a + "px";
        return a;
    },
    setProporionSize: function(e, a, g) {
        var i = this.getSize(e);
        if (false === i) {
            return false;
        }
        var d = a;
        var b = ("width" == a) ? "height" : "width";
        var h = i[b] * g;
        var f = i[b];
        if (h > i[d]) {
            h = i[d];
            f = h / g;
        }
        var c = {};
        c[d] = h;
        c[b] = f;
        e.style[d] = h + "px";
        e.style[b] = f + "px";
        return c;
    },
    ucFirst: function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
    },
    strPad: function(c, g, f, d) {
        var e = "",
            a;
        var b = function(k, h) {
            var l = "",
                j;
            while (l.length < h) {
                l += k;
            }
            l = l.substr(0, h);
            return l;
        };
        c += "";
        f = f !== undefined ? f : " ";
        if (d != "STR_PAD_LEFT" && d != "STR_PAD_RIGHT" && d != "STR_PAD_BOTH") {
            d = "STR_PAD_RIGHT";
        }
        if ((a = g - c.length) > 0) {
            if (d == "STR_PAD_LEFT") {
                c = b(f, a) + c;
            } else {
                if (d == "STR_PAD_RIGHT") {
                    c = c + b(f, a);
                } else {
                    if (d == "STR_PAD_BOTH") {
                        e = b(f, Math.ceil(a / 2));
                        c = e + c + e;
                        c = c.substr(0, g);
                    }
                }
            }
        }
        return c;
    },
    animateCounter: function(c) {
        c.duration = c.duration || 3000;
        c.freq = c.freq || 200;
        var b = parseInt(c.fromVal) || 0,
            g = parseInt(c.byVal) || 0,
            e = Math.floor(c.duration / c.freq),
            d = Math.floor(g / e) || 1;
        var f;
        var a = setInterval(function() {
            if (d > 0) {
                g -= d;
                b += d;
            } else {
                g += -d;
                b += d;
            }
            f = (d > 0) ? (g < 1) : (g > -1);
            if (f) {
                clearInterval(a);
                b += g;
                g = 0;
            }
            if (c.fromEl) {
                c.fromEl.innerHTML = g;
            }
            c.toEl.innerHTML = b;
            if (g < 1 && "function" === typeof(c.onComplete)) {
                c.onComplete();
            }
        }, c.freq);
    }
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function(c) {
        var a = this,
            b = (arguments.length > 1) ? Array.prototype.slice.call(arguments, 1) : [];
        return function() {
            if (arguments.length > 0) {
                var d = b.concat(Array.prototype.slice.call(arguments));
            }
            return a.apply(c, d || b);
        };
    };
}
var $ = function(a) {
    return document.getElementById(a);
};
var $u = FLIPCARD.Core.Utils;
FLIPCARD.namespace("FLIPCARD.Core.EventEmitter");
FLIPCARD.Core.EventEmitter = (function() {
    var a = function() {};
    a.prototype = {
        addListener: function(b, c) {
            if (!this._listeners) {
                this._listeners = {};
            }
            if (typeof this._listeners[b] == "undefined") {
                this._listeners[b] = [];
            }
            this._listeners[b].push(c);
        },
        fire: function(e) {
            if (!this._listeners) {
                this._listeners = {};
            }
            if (typeof e == "string") {
                e = {
                    type: e
                };
            }
            if (!e.target) {
                e.target = this;
            }
            if (!e.type) {
                throw new Error("Event object missing 'type' property.");
            }
            if (this._listeners[e.type] instanceof Array) {
                var d = this._listeners[e.type];
                for (var c = 0, b = d.length; c < b; c++) {
                    d[c].apply(this, arguments);
                }
            }
        },
        removeListener: function(e, f) {
            if (this._listeners[e] instanceof Array) {
                var d = this._listeners[e];
                for (var c = 0, b = d.length; c < b; c++) {
                    if (d[c] === f) {
                        d.splice(c, 1);
                        break;
                    }
                }
            }
        }
    };
    return a;
}());
FLIPCARD.namespace("FLIPCARD.Core.Events");
FLIPCARD.Core.Events = {
    add: function(c, b, a) {
        c.addEventListener(b, a);
    },
    remove: function(c, b, a) {
        c.removeEventListener(b, a);
    },
    tap: function(d, b) {
        if (!d || !d.element || !d.action) {
            return false;
        }
        if (undefined === d.sound) {
            d.sound = "tap";
        }
        var c = {
            x: 0,
            y: 0
        };
        var f = 200;
        var e = 0;
        var a = 0;
        d.element.addEventListener("touchstart", function(g) {
            $u.addClass(this, "tapView");
            setTimeout($u.removeClass.bind($u, this, "tapView"), 300);
            c = {
                x: g.touches[0].clientX,
                y: g.touches[0].clientY
            };
            a = 0;
            e = c.y || 0;
            if (true === b) {
                g.stopPropagation();
            }
        }, false);
        d.element.addEventListener("touchmove", function(g) {
            a = a + Math.abs(g.touches[0].clientY - e);
        }, false);
        d.element.addEventListener("touchend", function(g) {
            g.preventDefault();
            $u.removeClass(this, "tapView");
            if (f > a) {
                if (false !== d.sound) {
                    FLIPCARD.Core.SoundManager.playSound(d.sound);
                }
                d.action(g, c);
            }
            if (true === b) {
                g.stopPropagation();
            }
        }, false);
    },
    fireTap: function(b) {
        var a = document.createEvent("HTMLEvents");
        a.initEvent("touchend", true, true);
        return !b.dispatchEvent(a);
    }
};
(function() {
    if (!$u.isDesktop()) {
        return false;
    }
    FLIPCARD.Core.Events = {
        add: function(c, b, a) {
            b = "touchstart" == b ? "mousedown" : b;
            b = "touchend" == b ? "mouseup" : b;
            if (c.addEventListener) {
                c.addEventListener(b, a, false);
            } else {
                if (c.attachEvent) {
                    c.attachEvent("on" + b, a, false);
                }
            }
        },
        remove: function(c, b, a) {
            b = "touchstart" == b ? "mousedown" : b;
            b = "touchend" == b ? "mouseup" : b;
            if (c.removeEventListener) {
                c.removeEventListener(b, a, false);
            } else {
                if (c.detachEvent) {
                    c.detachEvent("on" + b, a, false);
                }
            }
        },
        tap: function(e, d) {
            if (!e || !e.element || !e.action) {
                return false;
            }
            if (undefined === e.sound) {
                e.sound = "tap";
            }
            var c = "addEventListener",
                b = "mousedown",
                g = "mouseup",
                a = "mouseover",
                f = "mouseout";
            if (!e.element.addEventListener) {
                c = "attachEvent";
                b = "onmousedown";
                g = "onmouseup";
                a = "onmouseover";
                f = "onmouseout";
            }
            e.element[c](b, function(h) {
                h.preventDefault && h.preventDefault();
                $u.addClass(e.element, "tapView");
                if (true === d) {
                    h.stopPropagation && h.stopPropagation();
                }
                if (false !== e.sound) {
                    FLIPCARD.Core.SoundManager.playSound(e.sound);
                }
            }, false);
            e.element[c](g, function(h) {
                h.preventDefault && h.preventDefault();
                $u.removeClass(e.element, "tapView");
                e.action(h, {});
                if (true === d) {
                    h.stopPropagation && h.stopPropagation();
                }
            }, false);
            e.element[c](a, function(h) {
                h.preventDefault && h.preventDefault();
                $u.addClass(e.element, "hoverView");
                if (true === d) {
                    h.stopPropagation && h.stopPropagation();
                }
            }, false);
            e.element[c](f, function(h) {
                h.preventDefault && h.preventDefault();
                $u.removeClass(e.element, "hoverView");
                if (true === d) {
                    h.stopPropagation && h.stopPropagation();
                }
            }, false);
        },
        fireTap: function(b) {
            var a = document.createEvent("HTMLEvents");
            a.initEvent("touchend", true, true);
            return !b.dispatchEvent(a);
        }
    };
})();
FLIPCARD.namespace("FLIPCARD.Core.Lang");
FLIPCARD.Core.Lang = {
    loadLanguage: function() {
        if (!FLIPCARD.Language) {
            return false;
        }
        var d = document.getElementsByName("lang"),
            c, a, b;
        if (d.length < 1) {
            d = document.querySelectorAll("*[name=lang]");
        }
        for (c = d.length - 1; c >= 0; c--) {
            b = d[c];
            b.removeAttribute("name");
            if (!FLIPCARD.Language[b.title]) {
                console.warn("i18n error, key [" + b.title + "] not exist", b);
            }
            b.innerHTML = FLIPCARD.Language[b.title];
        }
    }
};
FLIPCARD.namespace("FLIPCARD.Core.Pages");
FLIPCARD.Core.Pages = {
    actualOpenedPageName: null,
    pages: null,
    callback: null,
    loadingImages: false,
    donePagesSilentLoading: [],
    onceOpen: [],
    imageOnload: function() {},
    init: function(b, a) {
        if (!b) {
            return false;
        }
        this.pages = b;
        return true;
    },
    setImageOnloadCallback: function(a) {
        this.imageOnload = a;
    },
    clearImageOnloadCallback: function() {
        this.imageOnload = function() {};
    },
    hideAll: function(a) {
        if (!a) {
            return false;
        }
        for (key in a) {
            $u.removeClass(document.body, key + "B");
            $u.addClass($(a[key].id), "hidden");
        }
        return true;
    },
    show: function(a) {
        if (true === this.loadingImages && false === $u.inArray(a.page, this.onceOpen)) {
            FLIPCARD.Core.Spinner.show(FLIPCARD.Language.loadingAssets);
            this.setImageOnloadCallback(function() {
                FLIPCARD.Core.Spinner.hide();
                this.show(a);
            }.bind(this));
            return false;
        }
        if (a && a.page) {
            if (false === $u.inArray(a.page, this.onceOpen)) {
                this.onceOpen.push(a.page);
            }
            document.location.hash = a.page;
            this.clearImageOnloadCallback();
            return true;
        }
        return false;
    },
    showHelper: function(a) {
        window.scrollTo(0, 60);
        if (a && a.page) {
            FLIPCARD.Core.Anal.track("page", a.page);
            this.actualOpenedPageName = a.page;
            this.hideAll(this.pages);
            $u.addClass(document.body, a.page + "B");
            $u.removeClass($(this.pages[a.page].id), "hidden");
            var b = this.pages[a.page];
            this.fire("onShow", b);
            if (b.loadedImagesAfterOpen) {
                this.loadImagesAfterOpen(b.loadedImagesAfterOpen, a.page);
            }
            return true;
        }
        return false;
    },
    loadImagesAfterOpen: function(b, a) {
        if (true === $u.inArray(a, this.donePagesSilentLoading)) {
            return;
        }
        this.loadingImages = true;
        FLIPCARD.Core.Loader.silentLoad(b, function() {
            this.donePagesSilentLoading.push(a);
            this.loadingImages = false;
            (this.imageOnload)();
        }.bind(this));
    },
    isShowed: function(a) {
        return !$u.hasClass($(this.pages[a].id), "hidden");
    },
    getActualOpenedPageConfig: function() {
        if (null === this.actualOpenedPageName) {
            return false;
        }
        return this.pages[this.actualOpenedPageName];
    }
};
$u.mixin(FLIPCARD.Core.EventEmitter.prototype, FLIPCARD.Core.Pages);
FLIPCARD.namespace("FLIPCARD.Core.Popup");
FLIPCARD.Core.Popup = {
    popups: null,
    toShow: {},
    isLock: false,
    elems: {},
    actualShowedPop: false,
    init: function(a) {
        if (a) {
            this.storeElements();
            this.domElem = $("popups");
            this.popups = a;
            this.addDefaultEvents(this.popups);
            this.setupEvents();
            return true;
        }
        return false;
    },
    storeElements: function() {
        this.elems = {
            coverLayer: $("coverLayer")
        };
    },
    setupEvents: function() {
        function b(c) {
            c.preventDefault();
        }
        var a = $("popups");
        if (a.addEventListener) {
            a.addEventListener("touchmove", b, false);
            a.addEventListener("touchstart", b, false);
            a.addEventListener("touchend", b, false);
        }
    },
    onScroll: function(b) {
        if (false === this.isShow()) {
            return;
        }
        var a = this.getActualShowedPop();
        this.setPosition($(a.container), b);
    },
    getActualShowedPop: function() {
        return this.actualShowedPop;
    },
    saveActualShowedPop: function(a) {
        this.actualShowedPop = a;
    },
    deleteActualShowedPop: function() {
        this.actualShowedPop = false;
    },
    isShow: function() {
        return (this.actualShowedPop !== false);
    },
    hideAll: function(a) {
        if (!a) {
            return false;
        }
        this.toShow = {};
        for (key in a) {
            $u.addClass($(a[key].container), "hidden");
        }
        this.deleteActualShowedPop();
        this.hideCoverLayer();
        return true;
    },
    lock: function() {
        this.isLock = true;
    },
    unlock: function() {
        this.isLock = false;
        if (0 === this.getLengthOfQueue()) {
            return false;
        }
        this.showHelper(this.getFromQueue());
        return true;
    },
    hide: function(a) {
        var b = this.popups[a];
        var c = this.toShow[a][0];
        if ("function" === typeof(c.onClose)) {
            c.onClose();
        }
        this.toShow[a].shift();
        if (0 === this.getLengthOfQueue()) {
            this.hideAll(this.popups);
            return true;
        }
        $u.addClass($(b.container), "hidden");
        this.deleteActualShowedPop();
        this.showHelper(this.getFromQueue(a));
        return false;
    },
    getLengthOfQueue: function() {
        var a = 0;
        for (var b in this.toShow) {
            a += this.toShow[b].length;
        }
        return a;
    },
    getFromQueue: function(a) {
        if (a && this.toShow[a].length > 0) {
            return this.toShow[a][0];
        }
        if (0 === this.getLengthOfQueue()) {
            return false;
        }
        for (var b in this.toShow) {
            if (this.toShow[b].length > 0) {
                return this.toShow[b][0];
            }
        }
    },
    setToQueue: function(a, b) {
        if (!this.toShow[a]) {
            this.toShow[a] = [];
        }
        this.toShow[a].push(b);
    },
    show: function(a) {
        var b = a.pop;
        this.setToQueue(b, a);
        if (this.getLengthOfQueue() > 1 || true === this.isLock) {
            return false;
        }
        this.showHelper(a);
        return true;
    },
    showHelper: function(c) {
        var b = this.popups[c.pop];
        var a = $(b.container);
        this.saveActualShowedPop(b);
        this.setPosition(a, $u.getViewZone());
        this.fire("onShow");
        FLIPCARD.Core.Anal.track("pop", c.pop);
        $u.removeClass(a, "hidden");
        if (c.html && b.content) {
            $(b.content).innerHTML = c.html;
        }
        this.openCoverLayer();
        if (c.callback) {
            c.callback(b.container);
        }
    },
    setPosition: function(a, b) {},
    confirm: function(a) {
        this.confirmEvent = "function" === typeof(a.onYes) ? a.onYes : function() {};
        this.show(a);
    },
    addDefaultEvents: function(d) {
        var a, b;
        for (var c in d) {
            b = c;
            a = d[c].container;
            if (!a) {
                continue;
            }
            this.addCloseEvent($(a), b);
            this.addConfirmEvent($(a), b);
        }
    },
    addCloseEvent: function(b, a) {
        FLIPCARD.Core.Events.tap({
            element: b.querySelector(".close"),
            action: function() {
                FLIPCARD.Core.Popup.hide(a);
            }
        });
    },
    addConfirmEvent: function(b, a) {
        FLIPCARD.Core.Events.tap({
            element: b.querySelector(".confirm"),
            action: function() {
                if ("function" === typeof(FLIPCARD.Core.Popup.confirmEvent)) {
                    FLIPCARD.Core.Popup.confirmEvent();
                }
                FLIPCARD.Core.Popup.hide(a);
            }
        });
    },
    openCoverLayer: function() {
        var a = $u.getViewZone();
        this.elems.coverLayer.style.height = a.allHeight + "px";
        $u.removeClass(this.domElem, "hidden");
    },
    hideCoverLayer: function() {
        $u.addClass(this.domElem, "hidden");
    }
};
$u.mixin(FLIPCARD.Core.EventEmitter.prototype, FLIPCARD.Core.Popup);
FLIPCARD.namespace("FLIPCARD.Core.History");
FLIPCARD.Core.History = {
    previousHash: null,
    init: function() {
        document.location.hash = "";
        if (!window.addEventListener) {
            window.attachEvent("onhashchange", this.goToPage, false);
        } else {
            window.addEventListener("hashchange", this.goToPage, false);
        }
        return true;
    },
    goToPage: function() {
        var a = document.location.hash.split("#")[1];
        if ("pageIntro" === a && this.previousHash) {
            a = this.previousHash;
            document.location.hash = a;
        }
        if (a && a.length > 0) {
            FLIPCARD.Core.Pages.showHelper({
                page: a
            });
            this.previousHash = a;
        }
    }
};
FLIPCARD.namespace("FLIPCARD.Core.Loader");
FLIPCARD.Core.Loader = {
    config: {
        elems: {
            progressBar: null
        }
    },
    preload: null,
    loadImages: [],
    onSuccess: function() {},
    xhrCount: 0,
    xhrCompleteCount: 0,
    isImageLoadComplete: false,
    init: function(b, c, a) {
        this.onSuccess = a;
        this.config = b;
        this.preload = new PreloadJS();
        this.preload.onProgress = function(d) {
            var e = parseInt(d.loaded * 100, 10);
            this.config.elems.progressBar.style.width = e + "%";
            if (100 == e && true !== this.isImageLoadComplete) {
                this.isImageLoadComplete = true;
                this.checkIsAllComplete();
            }
        }.bind(this);
        this.load(c);
    },
    registerData: function(a) {
        a = a || 1;
        this.xhrCount += a;
    },
    progressData: function() {
        this.xhrCompleteCount++;
        this.checkIsAllComplete();
    },
    isLoadDataComplete: function() {
        if (this.xhrCompleteCount === this.xhrCount) {
            return true;
        }
        return false;
    },
    checkIsAllComplete: function() {
        if (true === this.isImageLoadComplete && true === this.isLoadDataComplete()) {
            this.onSuccess();
        }
    },
    load: function(b) {
        this.preload.setMaxConnections(b.length);
        var a;
        while (b.length > 0) {
            a = b.shift();
            this.loadImages.push(a);
            this.preload.loadFile(a);
        }
    },
    silentLoad: function(a, b) {
        this.isImageLoadComplete = false;
        this.onSuccess = b;
        this.load(a);
    }
};
FLIPCARD.Core.Spinner = {
    el: {},
    opened: 0,
    reloadTimeout: null,
    init: function() {
        this.storeElements();
        this.addEvents();
    },
    storeElements: function() {
        this.el = {
            spinner: $("spinner"),
            spinnerDesc: $("spinnerDesc"),
            reloadButton: $("reloadButton")
        };
    },
    addEvents: function() {
        FLIPCARD.Core.Events.add(this.el.spinner, "touchstart", function(a) {
            this.fire("onShow");
            $u.removeClass(this.el.spinner, "secret");
        }.bind(this));
        if (FLIPCARD.Core.Scroll) {
            FLIPCARD.Core.Scroll.addListener(this.onScroll.bind(this));
        }
        FLIPCARD.Core.Events.tap({
            element: this.el.reloadButton,
            action: function() {
                location.reload();
            }
        });
    },
    onScroll: function(a) {
        if (0 === this.opened) {
            return;
        }
        this.setPosition(a);
    },
    setPosition: function(a) {
        this.el.spinner.style.top = +a.from + "px";
    },
    show: function(a, b) {
        this.opened++;
        this.setPosition($u.getViewZone());
        this.el.spinner.style.height = document.body.clientHeight + "px";
        if (true !== b) {
            this.fire("onShow");
        }
        this.el.spinnerDesc.innerHTML = a || "";
        $u.removeClass(this.el.spinner, "hidden");
        this.reloadTimeout = setTimeout($u.removeClass.bind($u, this.el.reloadButton, "hidden"), 20000);
        true === b ? $u.addClass(this.el.spinner, "secret") : null;
    },
    hide: function() {
        this.opened--;
        if (0 === this.opened) {
            window.clearTimeout(this.reloadTimeout);
            $u.removeClass(this.el.spinner, "secret");
            $u.addClass(this.el.spinner, "hidden");
            $u.addClass(this.el.reloadButton, "hidden");
        }
    }
};
$u.mixin(FLIPCARD.Core.EventEmitter.prototype, FLIPCARD.Core.Spinner);
FLIPCARD.namespace("FLIPCARD.Core.DateTime");
FLIPCARD.Core.DateTime = {
    timestampToText: function(e, d, g) {
        if (!d) {
            d = {
                years: " year",
                months: " month",
                days: " day",
                hours: "",
                minutes: "",
                seconds: ""
            };
        }
        if (!g) {
            g = {
                years: " ",
                months: " ",
                days: " ",
                hours: ":",
                minutes: ":",
                seconds: ""
            };
        }
        FLIPCARD = {
            minutes: Math.floor(e / 60 % 60),
            seconds: Math.floor(e % 60)
        };
        var f = [];
        var c = false;
        for (var a in FLIPCARD) {
            var h = FLIPCARD[a];
            if (h > 0 || "minutes" == a) {
                c = true;
                f.push({
                    onlyVal: h,
                    val: h + d[a],
                    key: a
                });
            } else {
                if (true === c) {
                    f.push({
                        onlyVal: 0,
                        val: 0 + d[a],
                        key: a
                    });
                }
            }
        }
        for (var b = 0; b < f.length; b++) {
            if (f[b].key == "days") {
                f[b + 1].onlyVal += 24 * f[b].onlyVal;
                f[b + 1].val = f[b + 1].onlyVal + d[f[b + 1].key];
                f.splice(b, 1);
            }
        }
        var j = "";
        for (var b = 0; b < f.length; b++) {
            if ((f[b].key == "minutes" || f[b].key == "seconds") && f[b].val < 10) {
                j += "0" + f[b].val + g[f[b].key];
                continue;
            }
            j += f[b].val + g[f[b].key];
        }
        return j;
    },
    now: function() {
        if (!Date.now) {
            return parseInt(new Date().valueOf() / 1000);
        }
        return parseInt(Date.now() / 1000);
    }
};
(function() {
    var b = function() {
        if (false === this.counting) {
            return false;
        }
        var d = this.data.timestamp - FLIPCARD.Core.DateTime.now();
        var c = FLIPCARD.Core.DateTime.timestampToText(d, this.data.text, this.data.separators);
        var f = this.data.onUpdate(c, d);
        if (false === f) {
            return;
        }
        if (d <= 0) {
            this.data.onEnd();
            return;
        }
        var e = this;
        setTimeout(function() {
            b.call(e);
        }, 1000);
    };
    var a = function(c) {
        if (c) {
            this.setData(c);
            this.start();
        }
    };
    a.prototype = {
        setData: function(c) {
            this.data = c;
        },
        start: function() {
            this.counting = true;
            b.call(this);
        },
        stop: function() {
            this.counting = false;
        }
    };
    FLIPCARD.Core.DateTime.CountDown = a;
}());
FLIPCARD.namespace("FLIPCARD.Core.FontPercent");
FLIPCARD.Core.FontPercent = {
    setFont: function(b) {
        var a;
        if (b.offsetWidth > b.offsetHeight) {
            a = b.offsetHeight * 0.22;
        } else {
            a = b.offsetWidth * 0.2;
        }
        document.body.style.fontSize = a + "%";
    }
};
FLIPCARD.namespace("FLIPCARD.Core.Fullscreen");
(function() {
    FLIPCARD.Core.Fullscreen = {
        init: function(e) {
            var h = e,
                b = navigator.userAgent,
                i = ~b.indexOf("iPhone") || ~b.indexOf("iPod"),
                k = ~b.indexOf("iPad"),
                d = i || k,
                j = window.navigator.standalone,
                c = ~b.indexOf("Android"),
                a = 0,
                g = 0;
            if (c) {
                window.onscroll = function() {
                    h.style.height = window.innerHeight + "px";
                };
            }
            var f = window.onload = function() {
                if (d) {
                    var l = document.documentElement.clientHeight;
                    if (i && !j) {
                        l += 60;
                    }
                    h.style.height = l + "px";
                } else {
                    if (c) {
                        h.style.height = (window.innerHeight + 56) + "px";
                    }
                }
                setTimeout(scrollTo, 0, 0, 1);
            };
            (window.onresize = function() {
                var l = h.offsetWidth;
                if (a == l) {
                    return;
                }
                a = l;
                f();
            })();
            (window.onhashchange = function() {
                var l = h.offsetHeight;
                if (g == l) {
                    return;
                }
                g = l;
                f();
            })();
        }
    };
})();
FLIPCARD.namespace("FLIPCARD.Core.Storage");
(function() {
    FLIPCARD.Core.Storage = {
        isDefinedStore: function(a) {
            return (!this.getStore(a)) ? false : true;
        },
        getStoreJSON: function(a) {
            var b = this.getStore(a);
            if (b) {
                return JSON.parse(b);
            }
            return false;
        },
        setStoreJSON: function(a, b) {
            var c = JSON.stringify(b);
            return this.setStore(a, c);
        },
        getStore: function(a) {
            return localStorage.getItem(a);
        },
        setStore: function(a, b) {
            return localStorage.setItem(a, b);
        },
        removeStore: function(a) {
            return localStorage.removeItem(a);
        },
        changeGetStore: function(a) {
            this.getStore = a.bind(this);
        },
        changeSetStore: function(a) {
            this.setStore = a.bind(this);
        },
        changeRemoveStore: function(a) {
            this.removeStore = a.bind(this);
        }
    };
})();
FLIPCARD.namespace("FLIPCARD.Core.ObjectStorage");
FLIPCARD.Core.ObjectStorage = function(b, a) {
    this.init(b, a);
};
FLIPCARD.Core.ObjectStorage.prototype = {
    storeClass: FLIPCARD.Core.Storage,
    storeName: null,
    defaultData: {},
    data: {},
    init: function(a, b) {
        this.defaultData = b;
        this.storeName = a;
        if (false === this.isDefinedStore()) {
            this.reset();
            this.data = this.defaultData;
        } else {
            this.data = this.load();
        }
    },
    isDefinedStore: function() {
        return this.storeClass.isDefinedStore(this.storeName);
    },
    getDefaultData: function() {
        return this.defaultData;
    },
    reset: function() {
        this.storeClass.setStoreJSON(this.storeName, this.getDefaultData());
    },
    load: function() {
        return this.storeClass.getStoreJSON(this.storeName);
    },
    save: function() {
        return this.storeClass.setStoreJSON(this.storeName, this.data);
    },
    setItem: function(a, b) {
        if (undefined === this.defaultData[a]) {
            console.warn("you can not save this option , the field is not available");
            return false;
        }
        this.data[a] = b;
        this.save();
    },
    pushToItem: function(a, c) {
        var b = this.defaultData[a];
        if (undefined === b) {
            console.warn("you can not save this option , the field is not available");
            return false;
        }
        if (false === $u.isArray(b)) {
            console.warn("This field is not License Plate");
            return false;
        }
        this.data[a].push(c);
        this.save();
    },
    getItem: function(a) {
        return this.data[a];
    }
};
FLIPCARD.namespace("FLIPCARD.Core.SoundManager");
FLIPCARD.Core.SoundManager = {
    isSupport: false,
    data: {},
    soundClass: null,
    setSoundClass: function(a) {
        this.soundClass = a;
        this.data = this.soundClass.getData();
    },
    init: function() {
        if (true === this.soundClass.init()) {
            this.isSupport = true;
        }
    },
    play: function(b) {
        var a = this.getTrack(b);
        if (false === a) {
            return false;
        }
        var c = a.type;
        if ("sound" == c) {
            return this.playSound(b);
        } else {
            if ("music" == c) {
                return this.playMusic(b);
            }
        }
    },
    playSound: function(a) {
        if (false === this.isCanPlay(a)) {
            return false;
        }
        this.fire("onPlaySound", a);
    },
    stopSound: function() {
        this.fire("onStopSound");
    },
    playMusic: function(a) {
        if (false === this.isCanPlay(a)) {
            return false;
        }
        this.fire("onPlayMusic", a);
    },
    stopMusic: function() {
        this.fire("onStopMusic");
    },
    isCanPlay: function(a) {
        if (false === this.isSupport) {
            return false;
        }
        if (false === this.isEnabled(a)) {
            return false;
        }
        return true;
    },
    isEnabled: function(b) {
        var a = this.getTrack(b);
        if (false === a) {
            return false;
        }
        var c = a.type;
        if ("sound" == c) {
            return this.getIsEnableSound();
        } else {
            if ("music" == c) {
                return this.getIsEnableMusic();
            }
        }
    },
    getIsEnableMusic: function() {
        return FLIPCARD.Game.GameStorage.getItem("music");
    },
    getIsEnableSound: function() {
        return FLIPCARD.Game.GameStorage.getItem("sound2");
    },
    getTrack: function(a) {
        if (!this.data[a]) {
            console.warn("no track", a);
            return false;
        }
        return this.data[a];
    },
    getTracksParam: function(d) {
        var b = {};
        var c;
        for (var a in this.data) {
            c = this.data[a];
            if (c.type != d) {
                continue;
            }
            b[a] = c.params;
        }
        return b;
    }
};
$u.mixin(FLIPCARD.Core.EventEmitter.prototype, FLIPCARD.Core.SoundManager);
FLIPCARD.namespace("FLIPCARD.Core.Sound");
FLIPCARD.Core.Sound = {
    playerSound: null,
    isSupport: false,
    data: {
        tap: {
            type: "sound",
            params: {
                start: 0,
                end: 0.4
            }
        },
        turnTail: {
            type: "sound",
            params: {
                start: 2,
                end: 2.55
            }
        },
        good: {
            type: "sound",
            params: {
                start: 1,
                end: 1.4
            }
        },
        win: {
            type: "sound",
            params: {
                start: 3,
                end: 5
            }
        },
        bgMusic: {
            type: "sound",
            params: {
                start: 0,
                end: 0
            }
        }
    },
    init: function() {
        try {
            this.playerSound = new jukebox.Player({
                resources: ["./sound/sprite.m4a", "./sound/sprite.ogg", "./sound/sprite.amr"],
                spritemap: FLIPCARD.Core.SoundManager.getTracksParam("sound")
            });
            this.isSupport = true;
            this.initEvents();
        } catch (a) {
            this.playerSound = null;
            this.isSupport = false;
            return false;
        }
        return true;
    },
    initEvents: function() {
        FLIPCARD.Core.SoundManager.addListener("onPlaySound", function(a, b) {
            this.playSound(b);
        }.bind(this));
        FLIPCARD.Core.SoundManager.addListener("onStopSound", function(a) {
            this.stopSound();
        }.bind(this));
    },
    getData: function() {
        return this.data;
    },
    playSound: function(a) {
        if (false === this.isSupport) {
            return false;
        }
        this.playerSound.play(a, true);
    },
    stopSound: function() {
        if (false === this.isSupport) {
            return false;
        }
        this.playerSound.stop();
    }
};
FLIPCARD.Core.SoundManager.setSoundClass(FLIPCARD.Core.Sound);
(function() {
    if (!$u.isDesktop()) {
        return false;
    }
    FLIPCARD.Core.Sound = {
        isEnabled: true,
        isReady: false,
        format: "",
        tracks: {},
        data: {
            tap: {
                type: "sound",
                params: {
                    mode: "track",
                    volume: 40
                }
            },
            turnTail: {
                type: "sound",
                params: {
                    mode: "track",
                    volume: 40
                }
            },
            good: {
                type: "sound",
                params: {
                    mode: "track",
                    volume: 40
                }
            },
            win: {
                type: "sound",
                params: {
                    mode: "track",
                    volume: 40
                }
            },
            bgMusic: {
                type: "sound",
                params: {
                    mode: "loop",
                    volume: 40
                }
            }
        },
        init: function() {
            this.format = this.formatIdentify();
            this.initEvents();
            this.loadScript("libs/soundmanager2-nodebug-jsmin.js", function() {
                soundManager.setup({
                    url: "./swf/",
                    onready: function() {
                        this.loadSounds();
                        this.isReady = true;
                    }.bind(this)
                });
            }.bind(this));
            return true;
        },
        loadScript: function(b, d) {
            var c = document.getElementsByTagName("head")[0];
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.src = b;
            a.onreadystatechange = d;
            a.onload = d;
            c.appendChild(a);
        },
        initEvents: function() {
            FLIPCARD.Core.SoundManager.addListener("onPlaySound", function(a, b) {
                this.playSound(b);
            }.bind(this));
            FLIPCARD.Core.SoundManager.addListener("onStopSound", function(a) {
                this.stopSound();
            }.bind(this));
        },
        getData: function() {
            return this.data;
        },
        playSound: function(a) {
            if (false === this.isEnabled) {
                return;
            }
            if (true !== this.isReady) {
                if ("loop" == this.data[a].params.mode) {
                    setTimeout(this.playSound.bind(this, a), 1000);
                }
                return;
            }
            if (soundManager.muted) {
                soundManager.unmute();
            }
            if ("loop" == this.data[a].params.mode) {
                this.tracks[a].play({
                    onfinish: this.tracks[a].play
                });
            } else {
                this.tracks[a].play();
            }
        },
        stopSound: function() {
            if (false === this.isEnabled) {
                return false;
            }
            if (true !== this.isReady) {
                setTimeout(this.stopSound.bind(this), 1000);
                return;
            }
            soundManager.mute();
        },
        formatIdentify: function() {
            return "mp3";
        },
        loadSounds: function() {
            if (!soundManager.supported()) {
                console.warn("Sound in browser not supported");
                this.isEnabled = false;
                return false;
            }
            var b;
            for (var a in this.data) {
                b = this.data[a];
                this.tracks[a] = this.createSound({
                    name: a,
                    volume: b.volume
                }, b.mode);
            }
        },
        createSound: function(b, a) {
            return soundManager.createSound({
                id: b.name,
                url: this.createUrl(b.name),
                volume: b.volume
            });
        },
        createUrl: function(a) {
            return "./sound/" + this.format + "/" + a + "." + this.format;
        }
    };
    FLIPCARD.Core.SoundManager.setSoundClass(FLIPCARD.Core.Sound);
})();
FLIPCARD.namespace("FLIPCARD.Game.GameConfig");
FLIPCARD.Game.GameConfig = {
    mode: {
        "1": {
            name: "easy",
            avalibleTypeOfCard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            rows: 3,
            cols: 2,
            pointsForPair: 1,
            gameTime: 20,
            pointsForSecondLessEndGameTime: 1
        },
        "2": {
            name: "normal",
            avalibleTypeOfCard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            rows: 3,
            cols: 4,
            pointsForPair: 2,
            gameTime: 50,
            pointsForSecondLessEndGameTime: 2
        },
        "3": {
            name: "hard",
            avalibleTypeOfCard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            rows: 4,
            cols: 5,
            pointsForPair: 4,
            gameTime: 160,
            pointsForSecondLessEndGameTime: 4
        }
    },
    imagePieces: {
        1: {
            1: 40,
            2: 70,
            3: 150,
            4: 200,
            5: 230,
            6: 280,
            7: 330,
            8: 500
        },
        2: {
            1: 80,
            2: 140,
            3: 300,
            4: 400,
            5: 460,
            6: 560,
            7: 660,
            8: 1000
        },
        3: {
            1: 120,
            2: 210,
            3: 450,
            4: 600,
            5: 690,
            6: 840,
            7: 990,
            8: 1500
        }
    },
    animationTime: 400,
    showCardTime: 100,
    piecesAmount: 8
};
FLIPCARD.Game.GameConfig.gameModeAmount = (function() {
    var b = 0;
    for (var a in this) {
        ++b;
    }
    return b;
}.bind(FLIPCARD.Game.GameConfig.mode))();
FLIPCARD.Game.GameConfig.imageAmount = (function() {
    var b = 0;
    for (var a in this) {
        ++b;
    }
    return b;
}.bind(FLIPCARD.Game.GameConfig.imagePieces))();
FLIPCARD.namespace("FLIPCARD.Game.GameStorage");
FLIPCARD.Game.GameStorage = new FLIPCARD.Core.ObjectStorage("#", {
    music: false,
    sound2: true,
    allPoints: 0,
    unlockPieces: []
});
FLIPCARD.namespace("FLIPCARD.Game.Memory");
(function() {
    FLIPCARD.Game.Memory = {
        initConfig: {
            cards: []
        },
        gameModeConfig: {},
        gameMode: null,
        elems: {},
        cardPosition: [],
        selectedCard: null,
        selectPairAmount: null,
        gameTimmer: null,
        timmerValue: null,
        score: 0,
        duration: 0,
        isStop: false,
        isWin: false,
        init: function(a) {
            this.initConfig = a;
            this.storeElements();
            this.addEvents();
        },
        storeElements: function() {
            this.elems = {
                pageGame: $("pageGame"),
                cardContainer: $("cardContainer")
            };
        },
        addEvents: function() {
            var c = FLIPCARD.Core.Events;
            var a;
            for (var b = 0; b < this.initConfig.cards.length; b++) {
                a = this.initConfig.cards[b];
                c.tap({
                    element: a,
                    action: this.onTapCard.bind(this, a),
                    sound: "turnTail"
                });
            }
        },
        getCardCords: function(e) {
            var f = e.className.split(" ");
            var d = {
                row: null,
                col: null
            };
            var a, b;
            for (var c = 0; c < f.length; c++) {
                a = f[c];
                b = a.substr(0, 3);
                if ("col" == b) {
                    d.col = parseInt(a.substr(3), 10) - 1;
                } else {
                    if ("row" == b) {
                        d.row = parseInt(a.substr(3), 10) - 1;
                    }
                }
            }
            return d;
        },
        getCard: function(c) {
            var d, a;
            for (var b = 0; b < this.initConfig.cards.length; b++) {
                a = this.initConfig.cards[b];
                d = this.getCardCords(a);
                if (d.row == c.row && d.col == c.col) {
                    return a;
                }
            }
            return false;
        },
        onTapCard: function(b) {
            if (true == $u.hasClass(b, "fliped")) {
                return;
            }
            if (true == $u.hasClass(b, "front")) {
                return;
            }
            $u.addClass(b, "fliped");
            var d = this.getCardCords(b);
            var a = {
                elem: b,
                cords: d,
                imagesNumber: this.cardPosition[d.row][d.col]
            };
            if (null == this.selectedCard) {
                this.selectedCard = a;
                return;
            }
            if (this.selectedCard.imagesNumber == a.imagesNumber) {
                this.onSelectGoodPair();
                $u.removeClass(a.elem, "back");
                $u.removeClass(this.selectedCard.elem, "back");
                $u.addClass(a.elem, "front");
                $u.addClass(this.selectedCard.elem, "front");
            } else {
                this.onSelectWrongPair();
            }
            var c = FLIPCARD.Game.GameConfig.animationTime + FLIPCARD.Game.GameConfig.showCardTime;
            setTimeout(function(f, e) {
                $u.removeClass(f, "fliped");
                $u.removeClass(e, "fliped");
            }.bind(this, this.selectedCard.elem, a.elem), c);
            this.disposeSelectedCard();
        },
        onSelectGoodPair: function() {
            FLIPCARD.Core.SoundManager.playSound("good");
            this.addScore(this.gameModeConfig.pointsForPair);
            ++this.selectPairAmount;
            if (this.gameModeConfig.pairAmount == this.selectPairAmount) {
                this.isWin = true;
                setTimeout(this.onWin.bind(this), FLIPCARD.Game.GameConfig.animationTime);
            }
        },
        onSelectWrongPair: function() {},
        onWin: function() {
            this.stop();
            var b = this.getScore();
            var a = this.getDuration();
            this.initConfig.onWin(b, a);
        },
        getScore: function() {
            return {
                main: this.score,
                bonus: this.timmerValue,
                all: this.score + this.timmerValue
            };
        },
        getDuration: function() {
            return this.duration;
        },
        clearCardClass: function() {
            var b;
            for (var c = 0; c < this.initConfig.cards.length; c++) {
                b = this.initConfig.cards[c];
                var e = this.getCardCords(b);
                var a = ["card", "col" + (e.col + 1), "row" + (e.row + 1), "back"];
                var d = a.join(" ");
                b.className = d;
            }
        },
        createMap: function() {
            for (var a = 1; a <= FLIPCARD.Game.GameConfig.gameModeAmount; a++) {
                $u.removeClass(this.elems.pageGame, "gameMode" + a);
                $u.removeClass(this.elems.cardContainer, "gameMode" + a);
            }
            $u.addClass(this.elems.pageGame, "gameMode" + this.gameMode);
            $u.addClass(this.elems.cardContainer, "gameMode" + this.gameMode);
        },
        shuffleCards: function() {
            var c = this.gameModeConfig.avalibleTypeOfCard;
            $u.arrayShuffle(c);
            c = c.slice(0, this.gameModeConfig.pairAmount);
            c = c.concat(c);
            $u.arrayShuffle(c);
            this.cardPosition = [];
            var b, a;
            for (b = 0; b < this.gameModeConfig.rows; b++) {
                for (a = 0; a < this.gameModeConfig.cols; a++) {
                    if (0 == a) {
                        this.cardPosition[b] = [];
                    }
                    this.addCardImage({
                        row: b,
                        col: a
                    }, c[0]);
                    this.cardPosition[b][a] = c[0];
                    c.shift();
                }
            }
        },
        addCardImage: function(b, c) {
            var a = this.getCard(b);
            $u.addClass(a, "cardImage" + c);
        },
        disposeSelectPairAmout: function() {
            this.selectPairAmount = 0;
        },
        disposeSelectedCard: function() {
            this.selectedCard = null;
        },
        disposeTimmer: function() {
            if (this.gameTimmer) {
                this.gameTimmer.stop();
                this.gameTimmer = null;
            }
        },
        disposeScore: function() {
            this.score = 0;
            this.setScoreValue(this.score);
        },
        disposeDuration: function() {
            this.duration = -1;
        },
        setTimmerValue: function(a) {
            this.timmerValue = a;
            this.initConfig.elems.gameTimmer.innerHTML = a;
        },
        setScoreValue: function(a) {
            this.initConfig.elems.gameScore.innerHTML = a;
        },
        addScore: function(a) {
            this.score += a;
            this.setScoreValue(this.score);
        },
        setTimmer: function() {
            if (this.timmerValue <= 0 || true == this.isWin) {
                this.isStop = true;
            }
            if (true === this.isStop) {
                return false;
            }
            setTimeout(function() {
                if (false === this.setTimmer()) {
                    return;
                }
                this.setTimmerValue(this.timmerValue - this.gameModeConfig.pointsForSecondLessEndGameTime);
            }.bind(this), 1000);
        },
        setDurationTimmer: function() {
            if (true == this.isWin) {
                return;
            }++this.duration;
            setTimeout(this.setDurationTimmer.bind(this), 1000);
        },
        setIsStop: function(a) {
            this.isStop = a;
        },
        start: function(a) {
            this.gameMode = a.gameMode;
            this.gameModeConfig = FLIPCARD.Game.GameConfig.mode[this.gameMode];
            this.gameModeConfig.pairAmount = parseInt((this.gameModeConfig.rows * this.gameModeConfig.cols) / 2);
            this.isWin = false;
            this.disposeSelectPairAmout();
            this.disposeSelectedCard();
            this.disposeDuration();
            this.disposeScore();
            this.setTimmerValue(this.gameModeConfig.gameTime);
            this.setIsStop(false);
            this.disposeTimmer();
            this.setTimmer();
            this.setDurationTimmer();
            this.createMap();
            this.clearCardClass();
            this.shuffleCards();
            setTimeout(function() {
                $u.addClass(this.elems.cardContainer, "cardContainerAnim");
            }.bind(this), 0);
        },
        stop: function() {
            this.setIsStop(true);
            this.disposeTimmer();
            $u.removeClass(this.elems.cardContainer, "cardContainerAnim");
        }
    };
})();
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
FLIPCARD.namespace("FLIPCARD.App");
(function() {
    var FLIPCARDCore = FLIPCARD.Core;
    FLIPCARD.App = {
        elems: {},
        gameMode: 1,
        scaleInterval: null,
        initialize: function() {
            this.isIE();
            this.storeElements();
            FLIPCARDCore.Fullscreen.init(this.elems.gameContainer);
            FLIPCARDCore.Advert.init(this.elems.gameWrapper, this.elems.advertBottomBar);
            FLIPCARDCore.Lang.loadLanguage();
            FLIPCARDCore.Pages.init(FLIPCARD.Config.Pages);
            FLIPCARDCore.Popup.init(FLIPCARD.Config.Pops);
            FLIPCARDCore.History.init();
            this.addEvents();
            FLIPCARDCore.Pages.show({
                page: "pageIntro"
            });
            FLIPCARD.api = new FLIPCARD.API.General(this);
            FLIPCARDCore.Loader.init({
                elems: {
                    progressBar: $("progressBarPercent")
                }
            }, FLIPCARD.Config.Pages.pageIntro.loadedImages, this.afterLoad.bind(this));
            FLIPCARD.Game.Gallery.init();
            this.fillSettings();
            this.initGame();
            FLIPCARDCore.Pages.addListener("onShow", this.onShowPage.bind(this));
            if ($u.isDesktop()) {
                var style = document.createElement("link");
                style.rel = "stylesheet";
                style.href = "./css/desktopOnly.css";
                document.getElementsByTagName("head")[0].appendChild(style);
            }
        },
        isIE: function() {
            var isMSIE =
                /*@cc_on!@*/
                0;
            if (isMSIE) {
                $u.addClass(document.body, "MSIE");
            }
        },
        storeElements: function() {
            this.elems = {
                gameContainer: $("gameContainer"),
                gameWrapper: $("gameWrapper"),
                advertBottomBar: $("advertBottomBar"),
                loaderBox: $("loaderBox"),
                buttons: {
                    startGame: $("startGame"),
                    newGame: $("newGame"),
                    settings: $("settings"),
                    gameModePrev: $("gameModePrev"),
                    gameModeNext: $("gameModeNext"),
                    moreGames: $("moreGames")
                },
                gameModeSelect: $("gameModeSelect"),
                gameBack: $("gameBack"),
                gameMusic: $("gameMusic"),
                cardContainer: $("cardContainer"),
                gameTimmer: $("gameTimmer"),
                gameScore: $("gameScore"),
                settingsOption: {
                    1: $("settingsOption1"),
                    2: $("settingsOption2")
                },
                pops: {
                    win: $("popWin"),
                    quit: $("popQuit")
                },
                winPopData: {
                    mainScore: $("winMainScore"),
                    bonusScore: $("winBonusScore"),
                    sumScore: $("winSumScore"),
                    winAllPoints: $("winAllPoints")
                },
                quit: {
                    no: $("quitNo"),
                    yes: $("quitYes")
                },
                winBoxWrapper: null,
                quitBoxWrapper: null,
                winGallery: $("winGallery")
            };
            this.elems.winBoxWrapper = this.elems.pops.win.querySelector(".boxWrapper");
            this.elems.quitBoxWrapper = this.elems.pops.quit.querySelector(".boxWrapper");
        },
        toogleSetting: function(pName) {
            var names = {
                music: 1,
                sound2: 2
            };
            var store = FLIPCARD.Game.GameStorage;
            var option = this.elems.settingsOption;
            store.setItem(pName, !store.getItem(pName));
            this.fillSettingsHelper(option[names[pName]], store.getItem(pName));
            if ("sound2" == pName) {
                this.fillSettingsHelper(this.elems.gameMusic, store.getItem(pName));
                this.playBgMusic();
            }
        },
        playBgMusic: function() {
            var value = FLIPCARD.Game.GameStorage.getItem("sound2");
            if (false === value) {
                FLIPCARDCore.SoundManager.stopSound();
                return;
            }
            FLIPCARDCore.SoundManager.playSound("bgMusic");
        },
        fillSettings: function() {
            var store = FLIPCARD.Game.GameStorage;
            var option = this.elems.settingsOption;
            this.fillSettingsHelper(option[1], store.getItem("music"));
            this.fillSettingsHelper(this.elems.gameMusic, store.getItem("sound2"));
            this.fillSettingsHelper(option[2], store.getItem("sound2"));
        },
        fillSettingsHelper: function(pNode, pValue) {
            if (false == pValue) {
                $u.removeClass(pNode, "on");
                $u.addClass(pNode, "off");
            } else {
                $u.removeClass(pNode, "off");
                $u.addClass(pNode, "on");
            }
        },
        addEvents: function() {
            var ev = FLIPCARD.Core.Events;
            ev.tap({
                element: this.elems.buttons.startGame,
                action: function() {
                    FLIPCARDCore.Pages.show({
                        page: "pageMenu"
                    });
                    FLIPCARDCore.SoundManager.init();
                    this.playBgMusic();
                }.bind(this)
            });
            ev.tap({
                element: this.elems.buttons.newGame,
                action: this.showGame.bind(this)
            });
            ev.tap({
                element: this.elems.buttons.settings,
                action: function() {
                    FLIPCARDCore.Popup.show({
                        pop: "popSettings"
                    });
                }.bind(this)
            });
            ev.tap({
                element: this.elems.settingsOption[1],
                action: this.toogleSetting.bind(this, "music")
            });
            ev.tap({
                element: this.elems.settingsOption[2],
                action: this.toogleSetting.bind(this, "sound2")
            });
            ev.tap({
                element: this.elems.buttons.moreGames,
                action: this.fire.bind(this, "onTapMoreGames")
            });
            ev.tap({
                element: this.elems.gameBack,
                action: this.showQuit.bind(this)
            });
            ev.tap({
                element: this.elems.gameMusic,
                action: this.toogleSetting.bind(this, "sound2")
            });
            ev.tap({
                element: this.elems.buttons.gameModePrev,
                action: this.selectGameMode.bind(this, -1)
            });
            ev.tap({
                element: this.elems.buttons.gameModeNext,
                action: this.selectGameMode.bind(this, 1)
            });
            ev.tap({
                element: this.elems.quit.no,
                action: this.closeQuit.bind(this)
            });
            ev.tap({
                element: this.elems.quit.yes,
                action: this.quitGame.bind(this)
            });
            ev.tap({
                element: this.elems.winGallery,
                action: function() {
                    FLIPCARD.Core.Popup.hideAll(FLIPCARD.Core.Popup.popups);
                    FLIPCARD.Game.Gallery.openSelectImgView();
                }
            });
        },
        getAllPoints: function() {
            return parseInt(FLIPCARD.Game.GameStorage.getItem("allPoints"));
        },
        addToAllPoints: function(pVal) {
            FLIPCARD.Game.GameStorage.setItem("allPoints", parseInt(this.getAllPoints() + pVal));
        },
        initGame: function() {
            var cardsElements = this.elems.cardContainer.querySelectorAll(".card");
            FLIPCARD.Game.Memory.init({
                cards: cardsElements,
                elems: {
                    gameScore: this.elems.gameScore,
                    gameTimmer: this.elems.gameTimmer
                },
                onWin: function(pScore, pTimeLeft) {
                    FLIPCARD.Core.Advert.showPopAdvert(this.gameWin.bind(this, pScore, pTimeLeft));
                }.bind(this)
            });
        },
        gameWin: function(pScore, pDuration) {
            FLIPCARD.Core.SoundManager.playSound("win");
            FLIPCARD.Core.Anal.trackEvent("game", "win", "score-all", pScore.all);
            FLIPCARD.Core.Anal.trackEvent("game", "win", "score-main", pScore.main);
            FLIPCARD.Core.Anal.trackEvent("game", "win", "score-bonus", pScore.bonus);
            FLIPCARD.Core.Anal.trackEvent("game", "win", "time", pDuration);
            var mode = {
                1: "easy",
                2: "normal",
                3: "hard"
            };
            FLIPCARD.Core.Anal.trackTime("finishGame", mode[this.gameMode], pDuration * 1000);
            FLIPCARD.Core.Anal.trackTime("score", "bonus", pScore.bonus * 1000);
            FLIPCARDCore.Popup.show({
                pop: "popWin",
                onClose: function() {
                    FLIPCARDCore.Pages.show({
                        page: "pageMenu"
                    });
                    this.fire("onGameFinish");
                }.bind(this)
            });
            $u.setSquareSize(this.elems.winBoxWrapper);
            var allPoints = FLIPCARD.Game.GameStorage.getItem("allPoints");
            this.elems.winPopData.mainScore.innerHTML = pScore.main;
            this.elems.winPopData.bonusScore.innerHTML = pScore.bonus;
            this.elems.winPopData.sumScore.innerHTML = pScore.all;
            this.elems.winPopData.winAllPoints.innerHTML = allPoints;
            $u.animateCounter({
                toEl: this.elems.winPopData.winAllPoints,
                fromVal: allPoints,
                byVal: pScore.all,
                duration: 1000,
                freq: 100
            });
            this.addToAllPoints(pScore.all);
            FLIPCARD.Game.Gallery.setAnimGalleryBtnIfCanUnlock();
            if (false !== FLIPCARD.Game.Gallery.checkIsCanUnlock()) {
                $u.addClass(this.elems.winGallery, "show");
            } else {
                $u.removeClass(this.elems.winGallery, "show");
            }
        },
        selectGameMode: function(pVal) {
            var modes = [1, 2, 3];
            var beforeGameMode = this.gameMode;
            this.gameMode += pVal;
            if (this.gameMode > modes.length) {
                this.gameMode = modes[0];
            }
            if (this.gameMode < modes[0]) {
                this.gameMode = modes[modes.length - 1];
            }
            $u.removeClass(this.elems.gameModeSelect, "option" + beforeGameMode);
            $u.addClass(this.elems.gameModeSelect, "option" + this.gameMode);
        },
        showGame: function() {
            FLIPCARD.Core.Pages.show({
                page: "pageGame"
            });
        },
        afterLoad: function() {
            $u.addClass(this.elems.loaderBox, "hidden");
            $u.removeClass(this.elems.buttons.startGame, "hidden");
        },
        showQuit: function() {
            FLIPCARDCore.Popup.show({
                pop: "popQuit"
            });
            $u.setSquareSize(this.elems.quitBoxWrapper);
        },
        closeQuit: function() {
            FLIPCARDCore.Popup.hide("popQuit");
        },
        quitGame: function() {
            this.closeQuit();
            FLIPCARDCore.Pages.show({
                page: "pageMenu"
            });
        },
        onShowPage: function(pE, pPageConfig) {
            if ("pageIntro" === pPageConfig.id) {
                if (null != this.scaleInterval) {
                    return;
                }
                this.scaleInterval = setInterval(function() {
                    FLIPCARD.Core.Advert.start();
                }, 300);
            } else {
                if (this.scaleInterval) {
                    clearInterval(this.scaleInterval);
                    this.scaleInterval = null;
                }
            }
            FLIPCARD.Core.Popup.hideAll(FLIPCARD.Core.Popup.popups);
            if ("pageGame" === pPageConfig.id) {
                FLIPCARD.Core.Advert.hideBottomAdvertBar();
                FLIPCARD.Game.Memory.start({
                    gameMode: this.gameMode
                });
                return false;
            }
            FLIPCARD.Core.Advert.start();
            FLIPCARD.Game.Memory.clearCardClass();
            FLIPCARD.Game.Memory.stop();
        }
    };
    $u.mixin(FLIPCARD.Core.EventEmitter.prototype, FLIPCARD.App);
})();
window.onload = function() {
    FLIPCARD.App.initialize();
};