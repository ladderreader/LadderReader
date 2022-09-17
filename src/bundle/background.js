webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var getCurrentTab = function () {
	    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	        var queryOptions, _ref3, _ref4, tab;
	
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        queryOptions = { active: true, lastFocusedWindow: true };
	                        // `tab` will either be a `tabs.Tab` instance or `undefined`.
	
	                        _context.next = 3;
	                        return chrome.tabs.query(queryOptions);
	
	                    case 3:
	                        _ref3 = _context.sent;
	                        _ref4 = _slicedToArray(_ref3, 1);
	                        tab = _ref4[0];
	                        return _context.abrupt('return', tab);
	
	                    case 7:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this);
	    }));
	
	    return function getCurrentTab() {
	        return _ref2.apply(this, arguments);
	    };
	}();
	
	var _local = __webpack_require__(1);
	
	var _local2 = _interopRequireDefault(_local);
	
	var _storage = __webpack_require__(2);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	var _browser = __webpack_require__(334);
	
	var _version = __webpack_require__(335);
	
	var ver = _interopRequireWildcard(_version);
	
	var _menu = __webpack_require__(338);
	
	var menu = _interopRequireWildcard(_menu);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _webdav = __webpack_require__(340);
	
	var WebDAV = _interopRequireWildcard(_webdav);
	
	var _permission = __webpack_require__(341);
	
	var permission = _interopRequireWildcard(_permission);
	
	var _tips = __webpack_require__(342);
	
	var tips = _interopRequireWildcard(_tips);
	
	var _puread = __webpack_require__(343);
	
	var _puread2 = _interopRequireDefault(_puread);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	console.log("=== simpread background load ===");
	
	// global update site tab id
	var upTabId = -1;
	
	/**
	 * Sevice: storage Get data form chrome storage
	 */
	_storage.storage.Read(function () {
	    _storage.storage.puread = new _puread2.default(_storage.storage.sites);
	    if (_local2.default.Firstload()) {
	        _local2.default.Version(ver.version);
	        _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#firstload?ver=" + ver.version) });
	    } else {
	        !_local2.default.Count() && _storage.storage.GetRemote("remote", function (result, error) {
	            if (!error) {
	                _storage.storage.pr.Addsites(result);
	                _storage.storage.Writesite(_storage.storage.pr.sites, getNewsitesHandler);
	            }
	        });
	        ver.version != _storage.storage.version && _storage.storage.GetRemote("local", function (result, error) {
	            _storage.storage.pr.Addsites(result);
	            _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                ver.version != _storage.storage.version && _storage.storage.Fix(_storage.storage.read.sites, _storage.storage.version, ver.version, _storage.storage.focus.sites);
	                ver.version != _storage.storage.version && _storage.storage.Write(function () {
	                    _local2.default.Version(ver.version);
	                    _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#update?ver=" + ver.version) });
	                }, ver.Verify(_storage.storage.version, _storage.storage.simpread));
	                getNewsitesHandler(result);
	            });
	        });
	        ver.version == _storage.storage.version && ver.patch != _storage.storage.patch && _storage.storage.Write(function () {
	            // when x.x.x.yyyy is silent update
	            //browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#update?patch=" + ver.patch ) });
	            //localStorage.setItem( "simpread-patch-update", true );
	            _local2.default.Patch("add", true);
	        }, ver.FixSubver(ver.patch, _storage.storage.simpread));
	    }
	    menu.CreateAll();
	    setTimeout(function () {
	        return uninstall();
	    }, 100);
	});
	
	/**
	 * Get newsites handler
	 * @param {object} count: update site cou
	 */
	function getNewsitesHandler(result) {
	    watch.Push("site", true);
	}
	
	/**
	 * Listen menu event handler
	 */
	menu.OnClicked(function (info, tab) {
	    console.log("background contentmenu Listener", info, tab);
	    tracked({ eventCategory: "menu", eventAction: "menu", eventValue: info.menuItemId });
	    if (info.menuItemId == "link") {
	        info.linkUrl && _browser.browser.tabs.create({ url: info.linkUrl + "?simpread_mode=read" });
	    } else if (info.menuItemId == "list") {
	        _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#later") });
	    } else if (info.menuItemId == "whitelist") {
	        _browser.browser.tabs.sendMessage(tab.id, msg.Add(msg.MESSAGE_ACTION.menu_whitelist, { url: info.pageUrl }));
	    } else if (info.menuItemId == "exclusion") {
	        _browser.browser.tabs.sendMessage(tab.id, msg.Add(msg.MESSAGE_ACTION.menu_exclusion, { url: info.pageUrl }));
	    } else if (info.menuItemId == "blacklist") {
	        _browser.browser.tabs.sendMessage(tab.id, msg.Add(msg.MESSAGE_ACTION.menu_blacklist, { url: info.pageUrl }));
	    } else if (info.menuItemId == "unrdist") {
	        _browser.browser.tabs.sendMessage(tab.id, msg.Add(msg.MESSAGE_ACTION.menu_unrdist, { url: info.pageUrl }));
	    } else if (info.menuItemId == "lazyload") {
	        _browser.browser.tabs.sendMessage(tab.id, msg.Add(msg.MESSAGE_ACTION.menu_lazyload, { url: info.pageUrl }));
	    } else {
	        if (!tab.url.startsWith("chrome://")) _browser.browser.tabs.sendMessage(tab.id, msg.Add(info.menuItemId));
	    }
	});
	
	/**
	 * Listen runtime message, include: `corb`
	 */
	_browser.browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == msg.MESSAGE_ACTION.CORB) {
	        $.ajax(request.value.settings).done(function (result) {
	            sendResponse({ done: result });
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	            sendResponse({ fail: { jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown } });
	        });
	    }
	    return true;
	});
	
	/**
	 * Listen runtime message, include: `jianguo`
	 */
	_browser.browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == msg.MESSAGE_ACTION.jianguo) {
	        var _request$value = request.value,
	            url = _request$value.url,
	            user = _request$value.user,
	            password = _request$value.password,
	            method = _request$value.method;
	
	        var dav = new WebDAV.Fs(url, user, password);
	        if (method.type == "folder") {
	            dav.dir(method.root).mkdir(function (result) {
	                dav.dir(method.root + "/" + method.folder).mkdir(function (result) {
	                    sendResponse({ done: result, status: result.status });
	                });
	            });
	        } else if (method.type == "file") {
	            dav.file(method.path).write(method.content, function (result) {
	                sendResponse({ done: result, status: result.status });
	            });
	        } else if (method.type == "read") {
	            dav.file(method.path).read(function (result) {
	                sendResponse({ done: result.response, status: result.status });
	            });
	        }
	    }
	    //return true;
	});
	
	/**
	 * Listen runtime message, include: `webdav`
	 */
	_browser.browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == msg.MESSAGE_ACTION.WebDAV) {
	        var _request$value2 = request.value,
	            url = _request$value2.url,
	            user = _request$value2.user,
	            password = _request$value2.password,
	            method = _request$value2.method;
	
	        var dav = new WebDAV.Fs(url, user, password);
	        if (method.type == "folder") {
	            dav.dir(method.root).mkdir(function (result) {
	                sendResponse({ done: result, status: result.status });
	            });
	        } else if (method.type == "file") {
	            dav.file(method.root + "/" + method.name).write(method.content, function (result) {
	                sendResponse({ done: result, status: result.status });
	            });
	        }
	    }
	    //return true;
	});
	
	/**
	 * Listen runtime message, include: `download`, `base64` && `permission`
	 */
	_browser.browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == msg.MESSAGE_ACTION.download) {
	        var _request$value3 = request.value,
	            data = _request$value3.data,
	            name = _request$value3.name;
	
	        var blob = new Blob([data], {
	            type: "html/plain;charset=utf-8"
	        });
	        var url = URL.createObjectURL(blob);
	        _browser.browser.downloads.download({
	            url: url,
	            filename: name.replace(/[|]/ig, "")
	        }, function (downloadId) {
	            sendResponse({ done: downloadId });
	        });
	    } else if (request.type == msg.MESSAGE_ACTION.base64) {
	        var _url = request.value.url;
	
	        fetch(_url).then(function (response) {
	            return response.blob();
	        }).then(function (blob) {
	            return new Promise(function (resolve, reject) {
	                var reader = new FileReader();
	                reader.onloadend = function (event) {
	                    sendResponse({ done: { url: _url, uri: event.target.result } });
	                };
	                reader.onerror = function (error) {
	                    sendResponse({ fail: { error: error, url: _url } });
	                };
	                reader.readAsDataURL(blob);
	            });
	        }).catch(function (error) {
	            sendResponse({ fail: { error: error, url: _url } });
	        });
	    } else if (request.type == msg.MESSAGE_ACTION.permission) {
	        permission.Get({ permissions: ["downloads"] }, function (result) {
	            sendResponse({ done: result });
	        });
	    }
	    return true;
	});
	
	/**
	 * Listen runtime message, include: `snapshot`
	 */
	_browser.browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == msg.MESSAGE_ACTION.snapshot) {
	        var _request$value4 = request.value,
	            left = _request$value4.left,
	            top = _request$value4.top,
	            width = _request$value4.width,
	            height = _request$value4.height;
	
	        chrome.tabs.captureVisibleTab({ format: "png" }, function (base64) {
	            var image = new Image();
	            image.src = base64;
	            image.onload = function () {
	                var canvas = document.createElement("canvas"),
	                    ctx = canvas.getContext("2d"),
	                    dpi = self.devicePixelRatio,
	                    sx = left * dpi,
	                    sy = top * dpi,
	                    sWidth = width * dpi,
	                    sHeight = height * dpi;
	                canvas.width = sWidth;
	                canvas.height = sHeight;
	                ctx.drawImage(image, sx, sy, sWidth, height * dpi, 0, 0, sWidth, sHeight);
	                var uri = canvas.toDataURL("image/png");
	                sendResponse({ done: uri });
	            };
	        });
	    }
	    return true;
	});
	
	/**
	 * Listen runtime message
	 */
	_browser.browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    console.log("background runtime Listener", request);
	    switch (request.type) {
	        case msg.MESSAGE_ACTION.shortcuts:
	            getCurTab({ url: request.value.url }, function (tabs) {
	                _browser.browser.tabs.sendMessage(tabs[0].id, msg.Add(msg.MESSAGE_ACTION.shortcuts));
	            });
	            break;
	        case msg.MESSAGE_ACTION.browser_action:
	            getCurTab({ url: request.value.url }, function (tabs) {
	                if (tabs && tabs.length > 0 && tabs[0].url == request.value.url) {
	                    setMenuAndIcon(tabs[0].id, request.value.code);
	                } else console.error(request);
	            });
	            break;
	        case msg.MESSAGE_ACTION.new_tab:
	            _browser.browser.tabs.create({ url: request.value.url });
	            break;
	        case msg.MESSAGE_ACTION.close_tab:
	            getCurTab({ "active": true }, function (tabs) {
	                tabs.forEach(function (tab) {
	                    tab.active && tab.url == request.value.url && _browser.browser.tabs.remove(tab.id);
	                });
	            });
	            break;
	        case msg.MESSAGE_ACTION.menu:
	            var _request$value5 = request.value,
	                id = _request$value5.id,
	                value = _request$value5.value;
	            // hack code refresh options menu changed, and not saved storage
	
	            _storage.storage.option.menu[id] = value;
	            value === true ? menu.Create(id) : menu.Remove(id);
	            break;
	        case msg.MESSAGE_ACTION.updated:
	            watch.Push(request.value.type, request.value.value);
	            break;
	        case msg.MESSAGE_ACTION.save_verify:
	            sendResponse(watch.Lock(request.value.url));
	            break;
	        case msg.MESSAGE_ACTION.auth:
	            _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#labs?auth=" + request.value.name.toLowerCase()) });
	            break;
	        case msg.MESSAGE_ACTION.update_site:
	            getCurTab({ active: true, url: request.value.url }, function (tabs) {
	                tabs.length > 0 && (upTabId = tabs[0].id);
	                _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#sites?update=" + encodeURI(JSON.stringify(request.value.site))) });
	            });
	            break;
	        case msg.MESSAGE_ACTION.save_site:
	            _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#sites?pending=" + encodeURI(JSON.stringify(request.value))) });
	            break;
	        case msg.MESSAGE_ACTION.temp_site:
	            _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#sites?temp=" + encodeURI(JSON.stringify(request.value))) });
	            break;
	        case msg.MESSAGE_ACTION.auth_success:
	            getCurTab({ url: request.value.url }, function (tabs) {
	                if (tabs && tabs.length > 0) {
	                    _browser.browser.tabs.remove(tabs[0].id);
	                    getCurTab({ "active": true }, function (tabs) {
	                        tabs.forEach(function (tab) {
	                            return _browser.browser.tabs.sendMessage(tab.id, msg.Add(msg.MESSAGE_ACTION.export, { type: request.value.name.toLowerCase() }));
	                        });
	                    });
	                }
	            });
	            break;
	        case msg.MESSAGE_ACTION.track:
	            tracked(request.value);
	            break;
	        case msg.MESSAGE_ACTION.speak:
	            _browser.browser.tts.speak(request.value.content);
	            break;
	        case msg.MESSAGE_ACTION.speak_stop:
	            _browser.browser.tts.stop();
	            break;
	        case msg.MESSAGE_ACTION.tips:
	            tips.Verify(request.value.code, sendResponse);
	            break;
	        case msg.MESSAGE_ACTION.tips_norepeat:
	            tips.Done(request.value.code);
	            break;
	        case msg.MESSAGE_ACTION.screenshot:
	            UI.status('orange', "grab");
	            Screenshotter.grab(request.value.exportType);
	            break;
	    }
	});
	
	/**
	 * Listen chrome tab active message, include: `tab_selected`
	 */
	_browser.browser.tabs.onActivated.addListener(function (active) {
	    getCurTab({ "active": true, "currentWindow": true }, function (tabs) {
	        if (tabs && tabs.length > 0 && tabs[0].status == "complete") {
	            console.log("background tabs Listener:active", active);
	            if (tabs && tabs.length > 0 && !tabs[0].url.startsWith("chrome://")) {
	                _browser.browser.tabs.sendMessage(tabs[0].id, msg.Add(msg.MESSAGE_ACTION.tab_selected, { is_update: false }));
	            } else {
	                setMenuAndIcon(tabs[0].id, -1);
	            }
	        } else console.error("onActivated.addListener error");
	    });
	});
	
	/**
	 * Listen chrome tab update message, include: `tab_selected`
	 */
	_browser.browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	    watch.Pull(tabId);
	    if (changeInfo.status == "complete") {
	        console.log("background tabs Listener:update", tabId, changeInfo, tab);
	
	        if (tab.url.startsWith("http://ksria.com/simpread/auth.html")) {
	            var url = tab.url.replace("http://ksria.com/simpread/auth.html?id=", ""),
	                id = url.includes("#") || url.includes("&") ? url.substr(0, url.search(/\S(#|&)/) + 1) : url;
	            _browser.browser.tabs.query({}, function (tabs) {
	                var opts = tabs.find(function (tab) {
	                    return tab.url.includes(chrome.runtime.getURL("options/options.html"));
	                });
	                if (opts) {
	                    _browser.browser.tabs.sendMessage(opts.id, msg.Add(msg.MESSAGE_ACTION.redirect_uri, { uri: tab.url, id: id }));
	                    _browser.browser.tabs.remove(tabId);
	                }
	            });
	        } else if (tab.url.startsWith("https://simpread.ksria.cn/plugins/install/")) {
	            var _url2 = tab.url.replace("https://simpread.ksria.cn/plugins/install/", "");
	            _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#plugins?install=" + encodeURIComponent(_url2)) });
	            _browser.browser.tabs.remove(tabId);
	        } else if (tab.url.startsWith("https://simpread.ksria.cn/sites/install/")) {
	            var _url3 = tab.url.replace("https://simpread.ksria.cn/sites/install/", "");
	            _browser.browser.tabs.create({ url: chrome.runtime.getURL("options/options.html#sites?install=" + encodeURIComponent(_url3)) });
	            _browser.browser.tabs.remove(tabId);
	        } else if (tab.url == _browser.browser.runtime.getURL("options/options.html#sites?update=success")) {
	            _browser.browser.tabs.remove(tabId);
	            upTabId > 0 && chrome.tabs.reload(upTabId, function () {
	                upTabId == -1;
	            });
	        } else if (tab.url == _browser.browser.runtime.getURL("options/options.html#sites?update=failed")) {
	            _browser.browser.tabs.remove(tabId);
	        } else if (tab.url == _browser.browser.runtime.getURL("options/options.html#sites?update=complete")) {
	            _browser.browser.tabs.remove(tabId);
	        } else if (tab.url == _browser.browser.runtime.getURL("options/options.html#sites?update=pending")) {
	            _browser.browser.tabs.remove(tabId);
	            upTabId > 0 && _browser.browser.tabs.sendMessage(upTabId, msg.Add(msg.MESSAGE_ACTION.pending_site));
	            upTabId == -1;
	        }
	
	        if (!tab.url.startsWith("chrome://")) {
	            _browser.browser.tabs.sendMessage(tabId, msg.Add(msg.MESSAGE_ACTION.tab_selected, { is_update: true }));
	        } else {
	            setMenuAndIcon(tab.id, -1);
	        }
	    }
	});
	
	/**
	 * Listen chrome tab remove message
	 */
	_browser.browser.tabs.onRemoved.addListener(function (tabId) {
	    return watch.Pull(tabId);
	});
	
	/**
	 * Listen chrome page, include: `read`
	 */
	chrome.action.onClicked.addListener(function (tab) {
	    _browser.browser.tabs.sendMessage(tab.id, msg.Add(msg.MESSAGE_ACTION.browser_click));
	});
	
	/**
	 * Get current tab object
	 * 
	 * @param {object}   query
	 * @param {function} callback
	 */
	function getCurTab(query, callback) {
	    if (query.url && query.url.includes("#")) {
	        _browser.browser.tabs.query({}, function (tabs) {
	            return callback(tabs.filter(function (tab) {
	                return tab.url == query.url && tab.active;
	            }));
	        });
	    } else _browser.browser.tabs.query(query, function (tabs) {
	        callback(tabs);
	    });
	}
	
	/**
	 * Set page action icon and context menu
	 * 
	 * @param {int} tab.id
	 * @param {int} -1: disable icon;
	 */
	function setMenuAndIcon(id, code) {
	    var icon = "";
	    if (code == -1) {
	        //chrome.action.hide( id ); todo
	        menu.Update("tempread");
	    } else {
	        icon = "-enable";
	        //chrome.action.show( id ); todo
	        _storage.storage.option.menu.read === true && menu.Create("read");
	        menu.Update("read");
	    }
	    chrome.action.setIcon({ tabId: id, path: chrome.runtime.getURL('assets/images/icon16' + icon + '.png') });
	}
	
	/**
	 * Track
	 * 
	 * @param {object} google analytics track object
	 */
	function tracked(_ref) {
	    var eventCategory = _ref.eventCategory,
	        eventAction = _ref.eventAction,
	        eventValue = _ref.eventValue;
	
	    console.log("current track is", eventCategory, eventAction, eventValue);
	    // _gaq.push([ '_trackEvent', eventCategory, eventValue ]);
	}
	
	/**
	 * Uninstall
	 */
	function uninstall() {
	    _browser.browser.runtime.setUninstallURL(_storage.storage.option.uninstall ? _storage.storage.service + "/uninstall" : "");
	    tracked({ eventCategory: "install", eventAction: "install", eventValue: "uninstall" });
	}
	
	chrome.runtime.onInstalled.addListener(function (details) {
	    console.log('安装成功后默认打开设置页面 details', details);
	    // 安装完成后事件
	    var reason = details.reason,
	        previousVersion = details.previousVersion;
	
	    if (reason === 'install') {
	        console.log('安装成功后默认打开设置页面');
	        // 安装成功后默认打开设置页面
	        chrome.tabs.create({ url: "https://ladderreader.com", active: true });
	    } else if (reason === 'update' && !hasNewVersion(previousVersion)) {
	        //chrome.tabs.create({ url, active });
	    }
	});
	
	// begin 截图
	
	
	var UI = {
	    status: function status(color, text, timed) {
	        if (color == null) {
	            return;
	        } else if (color == 'green') {
	            chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 255] });
	        } else if (color == 'red') {
	            chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
	        } else if (color == 'orange') {
	            chrome.action.setBadgeBackgroundColor({ color: [255, 128, 0, 255] });
	        } else if (color == 'azure') {
	            chrome.action.setBadgeBackgroundColor({ color: [0, 128, 255, 255] });
	        }
	        chrome.action.setBadgeText({ text: text });
	
	        // *** Triggered if the message will be shown just for a short amout of time (specified)
	        if (timed > 0) {
	            setTimeout(function () {
	                chrome.action.setBadgeText({ text: "" });
	            }, timed);
	        }
	    }
	
	    /*
	     *  Blipshot
	     *  Screenshotter.js
	     *  Half of the screenshotter algorithm. See Screenshotter.DOM.js for the other half.
	     *
	     *  ==========================================================================================
	     *
	     *  Copyright (c) 2010-2021, Erin Casali.
	     *  All rights reserved.
	     *
	     *  Redistribution and use in source and binary forms, with or without modification, are
	     *  permitted provided that the following conditions are met:
	     *
	     *  Redistributions of source code must retain the above copyright notice, this list of
	     *  conditions and the following disclaimer.
	     *  Redistributions in binary form must reproduce the above copyright notice, this list of
	     *  conditions and the following disclaimer in the documentation and/or other materials
	     *  provided with the distribution.
	     *  Neither the name of the Baker Framework nor the names of its contributors may be used to
	     *  endorse or promote products derived from this software without specific prior written
	     *  permission.
	     *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
	     *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
	     *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
	     *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
	     *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	     *  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	     *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
	     *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	     *  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	     *
	     */
	
	};var Screenshotter = {
	
	    imageDataURL: [],
	
	    shared: {
	        imageDirtyCutAt: 0,
	        imageDataURL: 0,
	
	        originalScrollTop: 0,
	
	        tab: {
	            id: 0,
	            url: "",
	            title: "",
	            hasVscrollbar: false
	        }
	    },
	
	    // ****************************************************************************************** SCREENSHOT SEQUENCE START
	
	    // 0
	    grab: function () {
	        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(exportType) {
	            var self, queryOptions, _ref6, _ref7, tab, parts;
	
	            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            /****************************************************************************************************
	                             * It's a chaos: the ball must bounce between background and script content since the first
	                             * can grab and the second can access the DOM (scroll)
	                             *
	                             * So the call stack is:
	                             *    grab (bg)
	                             *      screenshotBegin (script)
	                             *      loop {
	                             *        screenshotVisibleArea (bg)
	                             *        screenshotScroll (script)
	                             *      }
	                             *      screenshotEnd (bg)
	                             *      screenshotReturn (script)
	                             */
	                            self = this;
	
	                            // ****** Reset screenshot container
	
	                            this.imageDataURLPartial = [];
	
	                            // ****** Get tab data
	
	                            queryOptions = { active: true, lastFocusedWindow: true };
	                            // `tab` will either be a `tabs.Tab` instance or `undefined`.
	
	                            _context2.next = 5;
	                            return chrome.tabs.query(queryOptions);
	
	                        case 5:
	                            _ref6 = _context2.sent;
	                            _ref7 = _slicedToArray(_ref6, 1);
	                            tab = _ref7[0];
	
	                            self.shared.tab = tab;
	                            // ****** Check if everything's is in order.
	                            parts = tab.url.match(/https?:\/\/chrome.google.com\/?.*/);
	
	                            if (!(parts !== null)) {
	                                _context2.next = 13;
	                                break;
	                            }
	
	                            alert("I'm sorry.\n\nDue to security restrictions \non the Google Chrome Store, \nBlipshot can't run here.\n\nTry on any other page. ;)\n\n");
	                            return _context2.abrupt('return', false);
	
	                        case 13:
	
	                            // ****** Check if script is loaded
	                            chrome.tabs.sendMessage(self.shared.tab.id, { action: 'heartbeat' }, function (response) {
	                                if (!response) {
	                                    UI.status('red', "!", 1000);
	                                }
	                            });
	                            self.shared.exportType = exportType;
	                            // ****** Begin!
	                            chrome.tabs.sendMessage(self.shared.tab.id, { action: 'blanketStyleSet', type: 'blanketStyleSet', property: 'position', from: 'fixed', to: 'absolute' });
	                            chrome.tabs.sendMessage(self.shared.tab.id, { action: 'blanketStyleSet', type: 'blanketStyleSet', property: 'position', from: 'sticky', to: 'relative' });
	                            self.screenshotBegin(self.shared);
	
	                        case 18:
	                        case 'end':
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, this);
	        }));
	
	        function grab(_x) {
	            return _ref5.apply(this, arguments);
	        }
	
	        return grab;
	    }(),
	
	    // 1
	    screenshotBegin: function screenshotBegin(shared) {
	        chrome.tabs.sendMessage(this.shared.tab.id, { action: 'screenshotBegin', type: 'screenshotBegin', shared: shared });
	    },
	
	    // 2
	    screenshotVisibleArea: function screenshotVisibleArea(shared) {
	        console.log("2 screenshotVisibleArea", shared);
	        var self = this;
	        chrome.tabs.captureVisibleTab(null, { format: "png" /* png, jpeg */, quality: 100 }, function (dataUrl) {
	            if (dataUrl) {
	                // Grab successful
	                self.imageDataURLPartial.push(dataUrl);
	                self.screenshotScroll(shared);
	            } else {
	                // Grab failed, warning
	                // To handle issues like permissions - https://github.com/folletto/Blipshot/issues/9
	                alert("I'm sorry.\n\nIt seems Blipshot wasn't able to grab the screenshot of the active tab.\n\nPlease check the extension permissions.\n\nIf the problem persists contact me at \nhttp://github.com/folletto/Blipshot/issues\n\nError: " + chrome.runtime.lastError.message + "\n\n");
	                return false;
	            }
	        });
	    },
	
	    // 3
	    screenshotScroll: function screenshotScroll(shared) {
	        console.log("3 screenshotScroll", shared);
	        chrome.tabs.sendMessage(this.shared.tab.id, { action: 'screenshotScroll', type: 'screenshotScroll', shared: shared });
	    },
	
	    // 4
	    screenshotEnd: function screenshotEnd(shared) {
	        console.log("4 screenshotEnd", shared);
	        var self = this;
	        UI.status('azure', "make");
	        chrome.tabs.sendMessage(this.shared.tab.id, { action: 'handleRecursiveImageMerge', type: 'handleRecursiveImageMerge', shared: shared, imageDataURLPartial: this.imageDataURLPartial });
	    },
	
	    // 5
	    screenshotReturn: function screenshotReturn(shared) {
	        console.log("5 screenshotReturn", shared);
	        UI.status('green', "✓", 3000);
	        chrome.tabs.sendMessage(this.shared.tab.id, { action: 'blanketStyleRestore', type: 'blanketStyleRestore', property: 'position' });
	        chrome.tabs.sendMessage(this.shared.tab.id, { action: 'screenshotReturn', type: 'screenshotReturn', shared: shared });
	    },
	
	    // ****************************************************************************************** EVENT MANAGER / HALF
	    eventManagerInit: function eventManagerInit() {
	        /****************************************************************************************************
	         * This function prepares the internal plugin callbacks to bounce between the plugin and DOM side.
	         * It's initialized at the end of this file.
	         */
	        var self = this;
	        _browser.browser.runtime.onMessage.addListener(function (e) {
	            console.log("eventManagerInit", e);
	            switch (e.action) {
	                case "grab":
	                    self.grab();break;
	                case "screenshotVisibleArea":
	                    self.screenshotVisibleArea(e.shared);break;
	                case "screenshotEnd":
	                    self.screenshotEnd(e.shared);break;
	                case "screenshotReturn":
	                    self.screenshotReturn(e.shared);break;
	            }
	        });
	    },
	
	    // ****************************************************************************************** SUPPORT
	    recursiveImageMerge: function (_recursiveImageMerge) {
	        function recursiveImageMerge(_x2, _x3, _x4, _x5, _x6, _x7) {
	            return _recursiveImageMerge.apply(this, arguments);
	        }
	
	        recursiveImageMerge.toString = function () {
	            return _recursiveImageMerge.toString();
	        };
	
	        return recursiveImageMerge;
	    }(function (imageDataURLs, imageDirtyCutAt, hasVscrollbar, callback, images, i) {
	        /****************************************************************************************************
	         * This function merges together all the pieces gathered during the scroll, recursively.
	         * Returns a single data:// URL object from canvas.toDataURL("image/png") to the callback.
	         */
	        i = i || 0;
	        images = images || [];
	
	        if (i < imageDataURLs.length) {
	            images[i] = new Image();
	            images[i].onload = function () {
	                imageDataURLs[i] = null; // clear for optimize memory consumption (not sure)
	                if (i == imageDataURLs.length - 1) {
	                    // ****** We're at the end of the chain, let's have fun with canvas.
	                    var canvas = window.document.createElement('canvas');
	
	                    // NOTE: Resizing a canvas is destructive, we can do it just now before stictching
	                    canvas.width = images[0].width - (hasVscrollbar ? 15 : 0); // <-- manage V scrollbar
	
	                    if (images.length > 1) canvas.height = (imageDataURLs.length - 1) * images[0].height + imageDirtyCutAt;else canvas.height = images[0].height;
	
	                    // Ouch: Skia / Chromium limitation
	                    // https://bugs.chromium.org/p/chromium/issues/detail?id=339725
	                    // https://bugs.chromium.org/p/skia/issues/detail?id=2122
	                    if (canvas.height > 32766) canvas.height = 32766;
	
	                    // ****** Stitch
	                    for (var j = 0; j < images.length; j++) {
	                        var cut = 0;
	                        if (images.length > 1 && j == images.length - 1) cut = images[j].height - imageDirtyCutAt;
	
	                        var height = images[j].height - cut;
	                        var width = images[j].width;
	
	                        // void canvas.getContext("2d").drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	                        //console.log("[i:" + i + ", j:" + j + "] --- total images:" + imageDataURLs.length);
	                        //console.log("--> drawImage(images[" + j + "], sx:0, sy/cut:" + cut + ", swidth:" + width + ", sheight:" + height + ", dx:0, dy:" + (j * images[0].height) + ", dwidth:" + width + ", dheight:" + height + ");");
	                        canvas.getContext("2d").drawImage(images[j], 0, cut, width, height, 0, j * images[0].height, width, height);
	                    }
	
	                    callback(canvas.toDataURL("image/png")); // --> CALLBACK (note that the file type is used also in the drag function)
	                } else {
	                    // ****** Down!
	                    recursiveImageMerge(imageDataURLs, imageDirtyCutAt, hasVscrollbar, callback, images, ++i);
	                }
	            };
	            images[i].src = imageDataURLs[i]; // Load!
	        }
	    })
	
	    /* \/ Initialize callback listeners */
	};Screenshotter.eventManagerInit();
	/* /\ Initialize callback listeners */
	
	// end 截图

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	console.log("=== simpread local load ===");
	
	var id = "simpread",
	    NAMES = {
	    VER: "version",
	    COUNT: "count",
	    FIRST: "firstload",
	    PATCH: "patch-update"
	},
	    MAX_COUNT = 5;
	
	var curcount = void 0;
	
	/**
	 * Read and Write Local Storage
	 * 
	 * @class
	 */
	
	var Local = function () {
	    function Local() {
	        _classCallCheck(this, Local);
	    }
	
	    _createClass(Local, [{
	        key: "Count",
	
	
	        /**
	         * @method
	         * 
	         * @return {boolean} true: not MAX_COUNT; false: exceed MAX_COUNT, re-count
	         */
	        value: function Count() {
	            var _ref = [get(NAMES.COUNT)],
	                _ref$ = _ref[0],
	                cur = _ref$ === undefined ? 0 : _ref$;
	
	            curcount = cur;
	            set(NAMES.COUNT, ++curcount);
	            if (curcount > MAX_COUNT) {
	                set(NAMES.COUNT, 0);
	                return false;
	            } else {
	                return true;
	            }
	        }
	
	        /**
	         * @method
	         * 
	         * @return {boolean} true: first load; false: not first load
	         */
	
	    }, {
	        key: "Firstload",
	        value: function Firstload() {
	            var _ref2 = [get(NAMES.FIRST)],
	                _ref2$ = _ref2[0],
	                firstload = _ref2$ === undefined ? "true" : _ref2$;
	
	            if (firstload == "true") {
	                set(NAMES.FIRST, false);
	                return true;
	            } else {
	                return false;
	            }
	        }
	
	        /**
	         * Save manifest.json version to local storage
	         * 
	         * @param {string} version
	         */
	
	    }, {
	        key: "Version",
	        value: function Version(version) {
	            set(NAMES.VER, version);
	        }
	
	        /**
	         * Save manifest.json version to local storage
	         * 
	         * @param {string} version
	         */
	
	    }, {
	        key: "Patch",
	        value: function Patch(state, value) {
	            if (state == "add") set(NAMES.PATCH, value);else if (state == "get") return get(NAMES.PATCH);else if (state == "remove") remove(NAMES.PATCH);
	        }
	    }, {
	        key: "curcount",
	        get: function get() {
	            return curcount;
	        }
	    }]);
	
	    return Local;
	}();
	
	/**
	 * Get localStorage from key
	 * 
	 * @param {string} NAMES.{value}
	 */
	
	
	function get(key) {
	    return localStorage[id + "-" + key];
	}
	
	/**
	 * Set localStorage
	 * 
	 * @param {string} NAMES.{value}
	 * @param {any}  any value
	 */
	function set(key, value) {
	    localStorage[id + "-" + key] = value;
	}
	
	/**
	 * Remove localStorage
	 * 
	 * @param {string} NAMES.{value}
	 */
	function remove(key) {
	    localStorage.removeItem(id + "-" + key);
	}
	var local = new Local();
	exports.default = local;

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/* A simple WebDav implementation in JavaScript
	   https://github.com/aslakhellesoy/webdavjs @license MIT
	*/
	var WebDAV = {
	    GET: function GET(url, callback) {
	        return this.request('GET', url, {}, null, 'text', callback);
	    },
	
	    PROPFIND: function PROPFIND(url, callback) {
	        return this.request('PROPFIND', url, {
	            Depth: "1"
	        }, null, 'xml', callback);
	    },
	
	    MKCOL: function MKCOL(url, callback) {
	        return this.request('MKCOL', url, {}, null, 'text', callback);
	    },
	
	    DELETE: function DELETE(url, callback) {
	        return this.request('DELETE', url, {}, null, 'text', callback);
	    },
	
	    PUT: function PUT(url, data, callback) {
	        return this.request('PUT', url, {}, data, 'text', callback);
	    },
	
	    Author: function Author(user, password) {
	        this.user = user;
	        this.password = password;
	    },
	
	    request: function request(verb, url, headers, data, type, callback) {
	        var xhr = new XMLHttpRequest();
	        var body = function body() {
	            var b = xhr.responseText;
	            if (type == 'xml') {
	                var xml = xhr.responseXML;
	                if (xml) {
	                    b = xml.firstChild.nextSibling ? xml.firstChild.nextSibling : xml.firstChild;
	                }
	            }
	            return b;
	        };
	
	        if (callback) {
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === XMLHttpRequest.DONE && verb == "PROPFIND") {
	                    var b = body();
	                    if (b) {
	                        callback(b);
	                    }
	                } else if (xhr.readyState === XMLHttpRequest.DONE) {
	                    callback(xhr);
	                }
	            };
	        }
	        xhr.open(verb, url, !!callback);
	        xhr.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
	        this.user && this.password && xhr.setRequestHeader("Authorization", "Basic " + btoa(this.user + ":" + this.password));
	        for (var header in headers) {
	            xhr.setRequestHeader(header, headers[header]);
	        }
	        xhr.send(data);
	
	        if (!callback) {
	            return body();
	        }
	    }
	};
	
	// An Object-oriented API around WebDAV.
	WebDAV.Fs = function (rootUrl, user, password) {
	    WebDAV.Author(user, password);
	    this.rootUrl = rootUrl;
	    var fs = this;
	
	    this.file = function (href) {
	        this.type = 'file';
	
	        this.url = fs.urlFor(href);
	
	        this.name = fs.nameFor(this.url);
	
	        this.read = function (callback) {
	            return WebDAV.GET(this.url, callback);
	        };
	
	        this.write = function (data, callback) {
	            return WebDAV.PUT(this.url, data, callback);
	        };
	
	        this.rm = function (callback) {
	            return WebDAV.DELETE(this.url, callback);
	        };
	
	        return this;
	    };
	
	    this.dir = function (href) {
	        this.type = 'dir';
	
	        this.url = fs.urlFor(href);
	
	        this.name = fs.nameFor(this.url);
	
	        this.children = function (callback) {
	            var childrenFunc = function childrenFunc(doc) {
	                if (doc.childNodes == null) {
	                    throw 'No such directory: ' + url;
	                }
	                var result = [];
	                // Start at 1, because the 0th is the same as self.
	                for (var i = 1; i < doc.childNodes.length; i++) {
	                    var response = doc.childNodes[i];
	                    var href = decodeURI(response.getElementsByTagName('d:href')[0].firstChild.nodeValue.replace(/\/$/, ''));
	                    var propstat = response.getElementsByTagName('d:propstat')[0];
	                    var prop = propstat.getElementsByTagName('d:prop')[0];
	                    var resourcetype = prop.getElementsByTagName('d:resourcetype')[0];
	                    var collection = resourcetype.getElementsByTagName('d:collection')[0];
	
	                    if (collection) {
	                        result[i - 1] = new fs.dir(href);
	                    } else {
	                        result[i - 1] = new fs.file(href);
	                    }
	                }
	                return result;
	            };
	
	            if (callback) {
	                WebDAV.PROPFIND(this.url, function (doc) {
	                    callback(childrenFunc(doc));
	                });
	            } else {
	                return childrenFunc(WebDAV.PROPFIND(this.url));
	            }
	        };
	
	        this.rm = function (callback) {
	            return WebDAV.DELETE(this.url, callback);
	        };
	
	        this.mkdir = function (callback) {
	            return WebDAV.MKCOL(this.url, callback);
	        };
	
	        return this;
	    };
	
	    this.urlFor = function (href) {
	        return (/^http/.test(href) ? href : this.rootUrl + href
	        );
	    };
	
	    this.nameFor = function (url) {
	        return url.replace(/.*\/(.*)/, '$1');
	    };
	
	    return this;
	};
	
	if (true) {
	    module.exports = WebDAV;
	}

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Remove = exports.Get = undefined;
	
	var _browser = __webpack_require__(334);
	
	function Get(permissions, callback) {
	    _browser.browser.permissions.contains({ permissions: permissions.permissions }, function (result) {
	        result == false ? chrome.permissions.request(permissions, function (granted) {
	            callback(granted);
	        }) : callback(result);
	    });
	}
	
	function Remove(permissions, callback) {
	    _browser.browser.permissions.remove({ permissions: permissions.permissions }, function (result) {
	        callback(result);
	    });
	}
	
	exports.Get = Get;
	exports.Remove = Remove;

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Help = exports.Done = exports.Verify = exports.Render = undefined;
	
	var _notify = __webpack_require__(336);
	
	var _notify2 = _interopRequireDefault(_notify);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	var _browser = __webpack_require__(334);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log("=== simpread tips load ===");
	
	/**
	 * Verify current page and some plugin exist
	 * 
	 * @param {array} plugins ids
	 */
	function Render(plugins) {
	    var notify = function notify(code) {
	        new _notify2.default().Render(messages[code], "不再提示", function () {
	            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.tips_norepeat, { code: code }));
	        });
	    },
	        pushMessage = function pushMessage(code) {
	        _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.tips, { code: code }), function (result) {
	            if (result) {
	                notify(code);
	            }
	        });
	    };
	    // messages = {
	    //     "klGUASLasg": '检测到当前环境有代码段，请使用      <a target="blank" href="https://simpread.ksria.cn/plugins/details/klGUASLasg">代码增强插件</a> 辅助阅读',
	    //     "VQOZdNET2d": '检测到当前环境有大量的图片，可以使用 <a target="blank" href="https://simpread.ksria.cn/plugins/details/VQOZdNET2d">点击查看大图</a> 辅助阅读',
	    //     "DxlFcL52iy": '如果你想换个论坛类页面风格，可以使用 <a target="blank" href="https://simpread.ksria.cn/plugins/details/DxlFcL52iy">Materail Design 风格</a> 辅助阅读',
	    // }
	    // // verify klGUASLasg
	    // if ( $( "sr-read" ).find( "pre" ).length > 0 && plugins.findIndex( item => item == "klGUASLasg" ) == -1 ) {
	    //     pushMessage( "klGUASLasg" );
	    // }
	    // // verify VQOZdNET2d
	    // if ( $( "sr-read" ).find( "img" ).length > 5 && plugins.findIndex( item => item == "VQOZdNET2d" ) == -1 ) {
	    //     pushMessage( "VQOZdNET2d" );
	    // }
	    // // verify DxlFcL52iy
	    // if ( ( location.hostname == "www.zhihu.com" && location.pathname.startsWith( "/question/" ) ) && plugins.findIndex( item => item == "DxlFcL52iy" ) == -1 ) {
	    //     pushMessage( "DxlFcL52iy" );
	    // }
	}
	
	/**
	 * Help
	 * 
	 * @param {object} storage.statistics
	 */
	function Help(statistics) {
	    if (statistics.read == 1) {
	        new _notify2.default().Render({ content: "Hi, nice to use the ladder reader for the first time, do you have a look at the newbie help？", action: "yes", cancel: "no", callback: function callback(type) {
	                type == "action" && _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: "https://ladderreader.com" }));
	                type == "cancel" && _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.tips_norepeat, { code: "readmode" }));
	            } });
	    }
	}
	
	/**
	 * Background call
	 * 
	 * @param {string} plugin id
	 * @param {func} callback true: tips; false: not tip
	 */
	function Verify(id, callback) {
	    var tips = JSON.parse(localStorage["simpread-tips"] || "{}");
	    if (!tips[id]) {
	        callback(true);
	    } else callback(false);
	}
	
	/**
	 * Not repeat tips
	 * 
	 * @param {string} tips id
	 */
	function Done(id) {
	    var tips = JSON.parse(localStorage["simpread-tips"] || "{}");
	    tips[id] = true;
	    localStorage.setItem("simpread-tips", JSON.stringify(tips));
	}
	
	exports.Render = Render;
	exports.Verify = Verify;
	exports.Done = Done;
	exports.Help = Help;

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	!function (t, e) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : t.PureRead = e();
	}(undefined, function () {
	  "use strict";
	  var t = function t(_t, e) {
	    if (!(_t instanceof e)) throw new TypeError("Cannot call a class as a function");
	  },
	      e = function () {
	    function t(t, e) {
	      for (var r = 0; r < e.length; r++) {
	        var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
	      }
	    }return function (e, r, n) {
	      return r && t(e.prototype, r), n && t(e, n), e;
	    };
	  }(),
	      r = Object.assign || function (t) {
	    for (var e = 1; e < arguments.length; e++) {
	      var r = arguments[e];for (var n in r) {
	        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
	      }
	    }return t;
	  },
	      n = function t(e, r, n) {
	    null === e && (e = Function.prototype);var i = Object.getOwnPropertyDescriptor(e, r);if (void 0 === i) {
	      var a = Object.getPrototypeOf(e);return null === a ? void 0 : t(a, r, n);
	    }if ("value" in i) return i.value;var o = i.get;return void 0 !== o ? o.call(n) : void 0;
	  },
	      i = function i(t, e) {
	    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
	  },
	      a = function () {
	    return function (t, e) {
	      if (Array.isArray(t)) return t;if (Symbol.iterator in Object(t)) return function (t, e) {
	        var r = [],
	            n = !0,
	            i = !1,
	            a = void 0;try {
	          for (var o, l = t[Symbol.iterator](); !(n = (o = l.next()).done) && (r.push(o.value), !e || r.length !== e); n = !0) {}
	        } catch (t) {
	          i = !0, a = t;
	        } finally {
	          try {
	            !n && l.return && l.return();
	          } finally {
	            if (i) throw a;
	          }
	        }return r;
	      }(t, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    };
	  }(),
	      o = function o(t) {
	    if (Array.isArray(t)) {
	      for (var e = 0, r = Array(t.length); e < t.length; e++) {
	        r[e] = t[e];
	      }return r;
	    }return Array.from(t);
	  };function l(t) {
	    return $.extend(!0, {}, t);
	  }function u(t) {
	    if (document) {
	      var e = document.createElement("a");return e.href = t, e;
	    }var r = t.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);return r && { href: t, protocol: r[1], host: r[2], hostname: r[3], port: r[4], pathname: r[5], search: r[6], hash: r[7] };
	  }function s(t) {
	    if ("" == t) return [0, t];if (h(t)) return [2, t];var e = t.match(/<\S+ (class|id)=("|')?[\w-_=;:' ]+("|')?>?$|<[^/][-_a-zA-Z0-9]+>?$/gi);return e && e.length > 0 ? [1, e] : [-1, void 0];
	  }function c(t) {
	    var e = s(t),
	        r = a(e, 2),
	        n = r[0],
	        i = r[1];if (2 == n) return t;if (1 == n) {
	      var o = i[0].trim().replace(/['"<>]/g, "").replace(/ /gi, "=").split("="),
	          l = a(o, 3),
	          u = l[0],
	          c = l[1],
	          h = l[2];return c ? "class" === c.toLowerCase() ? c = u + "." + h : "id" === c.toLowerCase() && (c = u + "#" + h) : c = u, c;
	    }return null;
	  }function h(t) {
	    return (/^(\[\[)[\[{`'/]{1}[ \S]+[}`'/\]]\]\]{1}($)/g.test(t)
	    );
	  }function d(t) {
	    var e = [t.replace(/(^)\[\[|\]\]$/g, "")],
	        r = e[0],
	        n = e[1];switch (r[0]) {case "{":
	        r = r.replace(/^{|}$/g, ""), t = new Function("return " + r)(), n = 0;break;case "'":
	        t = (t = r.replace(/^'|'$/g, "")).match(/^<[a-zA-Z0-9_-]+>/g).join("").replace(/<|>/g, "") + ":contains(" + t.replace(/<[/a-zA-Z0-9_-]+>/g, "") + ")", n = 1;break;case "/":
	        t = r.replace(/^\/|\/$/g, "").replace(/\\{2}/g, "\\").replace(/'/g, '"'), n = 2;break;case "[":
	        r = r.replace(/^{|}$/g, ""), t = new Function("return " + r)()[0], n = 3;break;case "`":
	        r = p(r = r.replace(/^`|`$/g, "")), t = $(r), n = 4;break;default:
	        n = -1;}return [t, n];
	  }function f(t) {
	    try {
	      if ("" != t.id) return void 0 == t.id ? "" : "//*[@id='" + t.id + "']";if (t === document.body) return "/html[1]/" + t.tagName.toLowerCase();for (var e = 0, r = t.parentNode.childNodes, n = 0; n < r.length; n++) {
	        var i = r[n];if (i === t) return f(t.parentNode) + "/" + t.tagName.toLowerCase() + "[" + (e + 1) + "]";1 === i.nodeType && i.tagName === t.tagName && e++;
	      }
	    } catch (t) {
	      return "";
	    }
	  }function p(t) {
	    return document.evaluate(t, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	  }var m = { url: "", target: "", matching: [], name: "", title: "", desc: "", exclude: [], include: "", avatar: [], paging: [] },
	      v = void 0,
	      g = void 0,
	      y = void 0,
	      b = void 0,
	      w = function () {
	    function n() {
	      var e,
	          r,
	          i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { global: [], custom: [], local: [] };t(this, n), this.url = (r = (e = "/" != (e = window.location.pathname) && e.endsWith("/") ? e = e.replace(/\/$/, "") : e).replace(/\/[%@#.~a-zA-Z0-9_-]+$|^\/$/g, ""), window.location.protocol + "//" + window.location.hostname + r + "/"), this.sites = i, this.current = {}, this.state = "none", this.origins = [], this.mathjax = void 0, b = location.href;
	    }return e(n, [{ key: "SetURL", value: function value(t) {
	        var e,
	            r = u(t),
	            n = (e = "/" != (e = r.pathname) && e.endsWith("/") ? e = e.replace(/\/$/, "") : e).replace(/\/[%@#.~a-zA-Z0-9_-]+$|^\/$/g, "");this.url = r.protocol + "//" + r.hostname + n + "/", b = t;
	      } }, { key: "SetMinimatch", value: function value(t) {
	        v = t;
	      } }, { key: "SetRdability", value: function value(t) {
	        g = t;
	      } }, { key: "SetMarkdown", value: function value(t) {
	        y = t;
	      } }, { key: "isMathJax", value: function value() {
	        var t = this;return void 0 == this.mathjax && (this.mathjax = !1, $("body").find("script").each(function (e, r) {
	          r.type.startsWith("math") && (t.mathjax = !0);
	        })), this.mathjax;
	      } }, { key: "MathJaxMode", value: function value() {
	        var t = x();if (-1 != t) return this.Newsite("read", t[0].outerHTML), this.dom = t[0], this.state = "temp", t;var e = k();if (e && "" != e.content) {
	          var r = j(e.content),
	              n = r.id,
	              i = r.cls,
	              a = r.tag;return "" != n ? "<" + a + ' id="' + n + '">' : "" != i ? "<" + a + ' class="' + i + '">' : void 0;
	        }
	      } }, { key: "Readability", value: function value() {
	        try {
	          var t = k();if (!t || "" == t.content) throw "Readability error";this.Newsite("read", t.content, t.excerpt);var e = j(t.wrap),
	              r = e.id,
	              n = e.cls,
	              i = e.tag;this.dom = "" != r ? $("body").find("#" + r)[0] : "" != n ? $("body").find("." + n.replace(/ /gi, "."))[0] : $("body").find("" + i)[0], this.state = "temp";
	        } catch (t) {
	          var a = x();-1 != a ? (this.Newsite("read", a[0].outerHTML), this.dom = a[0], this.state = "temp") : this.current.site = l(m);
	        }
	      } }, { key: "Getsite", value: function value(t, e) {
	        return this.sites[t].find(function (t) {
	          return t[0] == e;
	        });
	      } }, { key: "Getsites", value: function value() {
	        var t = this,
	            e = [],
	            n = function () {
	          if (v(location.href, "file://**/*.txt") || v(location.href, "http*://**/*.txt")) return function () {
	            var t = location.pathname.split("/").pop(),
	                e = "file:" == location.protocol ? "local" : "remote",
	                r = { name: "txtread::" + e, title: "<title>", desc: "", include: "<pre>", auto: !1, exclude: [] };"remote" == e && (r.include = "", r.html = $("body pre").html().replace(/\n/gi, "<br>"));return !$("title").html() && $("head").append("<title>" + decodeURI(t.replace(".txt", "")) + "</title>"), r;
	          }();if ($($("body").children()[0]).is("pre") && (v(location.href, "file://**/*.md") || v(location.href, "http*://**/*.md"))) return function () {
	            var t = location.pathname.split("/").pop(),
	                e = { name: "txtread::" + ("file:" == location.protocol ? "local" : "remote"), title: "<title>", desc: "", include: "", auto: !1, exclude: [] },
	                r = new y.default.Converter().makeHtml($("body pre").text());return e.html = r, !$("title").html() && $("head").append("<title>" + decodeURI(t.replace(".md", "")) + "</title>"), e;
	          }();var t = /<\S+ (class|id)=("|')?[\w-_=;:' ]+("|')?>?$|<[^/][-_a-zA-Z0-9]+>?$/gi,
	              e = { name: $("meta[name='simpread:name']").attr("content"), url: $("meta[name='simpread:url']").attr("content"), title: $("meta[name='simpread:title']").attr("content"), desc: $("meta[name='simpread:desc']").attr("content"), include: $("meta[name='simpread:include']").attr("content"), exp: $("meta[name='simpread:exclude']").attr("content"), auto: $("meta[name='simpread:auto']").attr("content"), exclude: [] };if (e.name && e.include) {
	            if (e.url && !v(location.href, e.url)) return;!e.title && (e.title = "<title>"), !e.desc && (e.desc = ""), !e.exp && (e.exp = ""), e.name = "metaread::" + e.name, e.auto = "true" == e.auto;var r = ["title", "desc", "include", "exp"].findIndex(function (r) {
	              return "" != e[r] && !e[r].match(t);
	            });return e.exclude.push(e.exp), delete e.exp, -1 == r ? e : void 0;
	          }return;
	        }();if (this.current.url = this.url, n) this.current.auto = n.auto, this.current.url = n.url, delete n.auto, delete n.url, this.current.site = r({}, n), this.current.site.name.startsWith("metaread::") && (this.state = "meta"), this.current.site.name.startsWith("txtread::") && (this.state = "txt");else if (_("local", new Map(this.sites.local), this.url, e), _("global", new Map(this.sites.global), this.url, e), _("person", new Map(this.sites.person), this.url, e), _("custom", new Map(this.sites.custom), this.url, e), e.length > 0) {
	          var i = void 0;if (e.forEach(function (e) {
	            e[1].active && (i = e, t.current.url = i[0], t.current.site = t.Safesite(r({}, i[1]), i[2], i[0]), t.state = "adapter");
	          }), !i) {
	            var a = e[0];a[1].active = !0, this.current.url = a[0], this.current.site = this.Safesite(r({}, a[1]), a[2], a[0]), this.state = "adapter";
	          }
	        } else {
	          var o = function () {
	            if (location.pathname.includes("thread") || location.pathname.includes("forum.php")) {
	              if ($(".t_f").length > 0 && $(".favatar").find(".authi").length > 0 && $(".avatar").find("img").length > 0) return { avatar: [{ name: "[[{$('.favatar').find('.authi')}]]" }, { url: "[[{$('.avatar').find('img')}]]" }], include: "[[{$('.t_f')}]]" };
	            } else if (/\/t\/[\w-]+\/\d+/.test(location.pathname) && $("meta[name=generator]").attr("content").includes("discourse")) return { avatar: [{ name: "[[{$('.topic-avatar').find('.a[data-user-card]')}]]" }, { url: "[[{$('.topic-avatar').find('img')}]]" }], include: "[[{$('.cooked')}]]" };return -1;
	          }();-1 != o ? (this.Newmultisite("read", o), this.state = "temp") : this.Readability();
	        }this.current.site.matching = e;
	      } }, { key: "Addsites", value: function value(t) {
	        var e = 0;if (0 == this.sites.global.length) this.sites.global = this.Formatsites(t), e = this.sites.global.length;else {
	          var r = function (t, e) {
	            var r = new Map(e),
	                n = [].concat(o(r.keys())),
	                i = 0;return t.map(function (t) {
	              n.includes(t[0]) ? n.includes(t[0]) : i++;
	            }), { count: i, newsites: t };
	          }(this.Formatsites(t), this.sites.global);e = r.count, this.sites.global = r.newsites;
	        }return e;
	      } }, { key: "Addlocalsites", value: function value(t) {
	        return this.sites.local = [].concat(o(t)), this.sites.local;
	      } }, { key: "Addallsites", value: function value(t) {
	        return this.sites = { global: [].concat(o(t.global)), person: [].concat(o(t.person)), custom: [].concat(o(t.custom)), local: [].concat(o(t.local)) }, this.sites;
	      } }, { key: "Newsite", value: function value(t, e, n) {
	        var i = { mode: t, url: window.location.href, site: { name: "tempread::" + window.location.host, title: "<title>", desc: "[[{$('meta[name=Description]').attr('content')||$('meta[name=description]').attr('content')}]]", include: "", exclude: [] } };e && (i.site.html = e), this.current.mode = i.mode, this.current.url = i.url, this.current.site = this.Safesite(r({}, i.site), "local", i.url), n && (this.current.site.excerpt = n);
	      } }, { key: "Newmultisite", value: function value(t, e) {
	        var n = { mode: t, url: window.location.href, site: { name: "tempread::" + window.location.host, title: "<title>", desc: "", include: e.include, exclude: [], avatar: e.avatar } };this.current.mode = n.mode, this.current.url = n.url, this.current.site = this.Safesite(r({}, n.site), "local", n.url);
	      } }, { key: "Updatesite", value: function value(t, e, r) {
	        var n = this.sites[t].findIndex(function (t) {
	          return t[0] == e;
	        });-1 == n && (n = this.sites[t].length), this.sites[t].splice(n, 1, r);
	      } }, { key: "Deletesite", value: function value(t, e, r) {
	        var n = this.sites[t].findIndex(function (t) {
	          return t[0] == e;
	        });-1 != n && this.sites[t].splice(n, 1), r(n);
	      } }, { key: "Safesite", value: function value(t, e, r) {
	        return t.url = r, t.target = e, "" == t.name && (t.name = "tempread::"), (!t.avatar || 0 == t.avatar.length) && (t.avatar = [{ name: "" }, { url: "" }]), (!t.paging || 0 == t.paging.length) && (t.paging = [{ prev: "" }, { next: "" }]), t;
	      } }, { key: "Cleansite", value: function value(t) {
	        return delete t.url, delete t.html, delete t.target, delete t.matching, t.avatar && t.avatar.length > 0 && "" == t.avatar[0].name && delete t.avatar, t.paging && t.paging.length > 0 && "" == t.paging[0].prev && delete t.paging, t;
	      } }, { key: "Formatsites", value: function value(t) {
	        var e = new Map(),
	            r = !0,
	            n = !1,
	            i = void 0;try {
	          for (var a, l = t.sites[Symbol.iterator](); !(r = (a = l.next()).done); r = !0) {
	            var u = a.value;if (0 == O(u)) {
	              var s = u.url;delete u.url, e.set(s, u);
	            }
	          }
	        } catch (t) {
	          n = !0, i = t;
	        } finally {
	          try {
	            !r && l.return && l.return();
	          } finally {
	            if (n) throw i;
	          }
	        }return [].concat(o(e));
	      } }, { key: "Clearsites", value: function value(t) {
	        t ? this.sites[t] = [] : this.sites = { global: [], custom: [], local: [] };
	      } }, { key: "Origins", value: function value(t) {
	        var e = t.origins.map(function (t) {
	          return t.url;
	        });return (e = new Set(this.origins.concat(e))).forEach(function (t) {
	          "" != t.trim() && t.trim().startsWith("http") && t.trim().endsWith(".json") || e.delete(t);
	        }), this.origins = [].concat(o(e)), this.origins;
	      } }, { key: "Addorigins", value: function value(t) {
	        return this.sites.custom = [].concat(o(t)), this.sites.custom;
	      } }, { key: "Clearorigins", value: function value() {
	        var t = this.sites.custom.length;return this.sites.custom = [], t;
	      } }]), n;
	  }();function x() {
	    var t = $("body"),
	        e = !0,
	        r = !1,
	        n = void 0;try {
	      for (var i, a = ["[itemprop='articleBody']", "article", ".post-content", ".entry-content", ".post-article", ".content-post", ".article-entry", ".article-content", ".article-body", ".markdown-body", ".post", ".content"][Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
	        var o = i.value,
	            l = t.find(o);if (l.length > 0) return l;
	      }
	    } catch (t) {
	      r = !0, n = t;
	    } finally {
	      try {
	        !e && a.return && a.return();
	      } finally {
	        if (r) throw n;
	      }
	    }return -1;
	  }function k() {
	    var t = document.location,
	        e = (t.href, t.host, t.protocol, t.host, t.protocol.substr(0, t.protocol.indexOf(":")), t.protocol, t.host, t.pathname.substr(0, t.pathname.lastIndexOf("/") + 1), new g.Readability(document.cloneNode(!0)).parse());return e;
	  }function _(t, e, r) {
	    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
	        i = function i(t) {
	      var e = t.replace("www.", "").match(/\.\S+\.\S+/g);return e ? e[0].substr(1) : t.replace("www.", "");
	    },
	        a = u(b),
	        s = [].concat(o(e.keys())),
	        c = r.match(/[.a-zA-z0-9-_]+/g)[1].replace("www.", ""),
	        h = i(a.hostname),
	        d = function d() {
	      return "/" == a.pathname || /\/(default|index|portal).[0-9a-zA-Z]+$/.test(a.pathname);
	    },
	        f = !0,
	        p = !1,
	        m = void 0;try {
	      for (var g, y = s[Symbol.iterator](); !(f = (g = y.next()).done); f = !0) {
	        var w = g.value,
	            x = e.get(w).name,
	            $ = i(x);w.startsWith("[[/") && w.endsWith("/]]") && new RegExp(w.replace(/^\[\[\/|\/\]\]/g, "")).test(location.href) ? n.push([w, l(e.get(w)), t]) : d() || w.endsWith("*") || w.replace(/^http[s]?:/, "") != r.replace(/^http[s]?:/, "") ? w.match(/\*/g) && 1 == w.match(/\*/g).length && !d() && w.endsWith("*") && c.includes($) && h == $ && r.includes(x) ? n.push([w, l(e.get(w)), t]) : v(a.origin + a.pathname, w) && n.push([w, l(e.get(w)), t]) : n.push([w, l(e.get(w)), t]);
	      }
	    } catch (t) {
	      p = !0, m = t;
	    } finally {
	      try {
	        !f && y.return && y.return();
	      } finally {
	        if (p) throw m;
	      }
	    }
	  }function O(t) {
	    if (!t.name || !t.url || !t.include) return -1;if (-1 == s(t.title)[0] || -1 == s(t.include)[0] || -1 == s(t.desc)[0]) return -2;if (t.paging) {
	      if (2 != t.paging.length) return -3;if (!t.paging[0].prev) return -4;if (!t.paging[1].next) return -5;if (-1 == s(t.paging[0].prev)[0] || -1 == s(t.paging[1].next)[0]) return -6;
	    }if (t.avatar) {
	      if (2 != t.avatar.length) return -7;if (!t.avatar[0].name) return -8;if (!t.avatar[1].url) return -9;if (-1 == s(t.avatar[0].name)[0] || -1 == s(t.avatar[1].url)[0]) return -10;
	    }return 0;
	  }function j(t) {
	    var e = t.replace('<div id="readability-page-1" class="page">', ""),
	        r = $(e)[0],
	        n = r.outerHTML.replace(r.innerHTML, ""),
	        i = $(n)[0],
	        a = i.tagName.toLowerCase(),
	        o = i.className;return { id: i.id, cls: o, tag: a };
	  }function S(t) {
	    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text",
	        r = $("html");if (h(t)) {
	      var n = d(t),
	          i = a(n, 2),
	          o = i[0],
	          l = i[1];0 == l ? t = o : 3 == l ? t = M(r.find(o)) : 4 == l && (t = o.html());
	    } else "html" == e ? t = M(r.find(t)) : "multi" == e || (t = r.find(t).text().trim());return t;
	  }function M(t) {
	    var e = "";switch (t.length) {case 0:
	        e = "<sr-rd-content-error></sr-rd-content-error>";break;case 1:
	        e = t.html().trim();break;default:
	        e = t.map(function (t, e) {
	          return $(e).html();
	        }).get().join("<br>");}return e;
	  }return function (r) {
	    function o(e) {
	      t(this, o);var r = i(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, e));return r.version = "0.0.4 build 0111", r.org_url = location.href, r.html = {}, r.plugin = {}, r.pure = !1, r.cleanup = !1, r;
	    }return function (t, e) {
	      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
	    }(o, w), e(o, [{ key: "Exist", value: function value() {
	        return this.org_url == location.href;
	      } }, { key: "AddPlugin", value: function value(t) {
	        this.plugin = { minimatch: t.minimatch, pangu: t.pangu, beautify: t.beautify, stylesheet: t.style, rdability: t.rdability, markdown: t.markdown }, n(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "SetMinimatch", this).call(this, this.plugin.minimatch), n(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "SetRdability", this).call(this, this.plugin.rdability), n(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "SetMarkdown", this).call(this, this.plugin.markdown);
	      } }, { key: "ReadMode", value: function value() {
	        var t, e, r, n, i;this.html = (t = this.current.site, e = l(t), r = c("" == t.title ? "<title>" : t.title), n = c(t.desc), i = c(t.include), e.title = "" == t.title || "<title>" == t.title ? $("head title").text() : S(r), e.desc = function (t) {
	          if (void 0 == t) return t;var e = t.length,
	              r = t.indexOf("。") + 1;return e > 100 && (t = r > 0 ? t.substr(0, r) : t.substr(0, 101) + "......"), t;
	        }(t.excerpt ? t.excerpt : S(n)), e.include = "" == t.include && "" != t.html ? t.html : S(i, "html"), e.avatar && e.avatar.length > 0 && "" == e.avatar[0].name && delete e.avatar, e.paging && e.paging.length > 0 && "" == e.paging[0].prev && delete e.paging, e.avatar && e.avatar.forEach(function (t) {
	          var e = Object.keys(t).join(),
	              r = t[e];t[e] = S(c(r), "html");
	        }), e.paging && e.paging.forEach(function (t) {
	          var e = Object.keys(t).join(),
	              r = t[e];t[e] = S(c(r));
	        }), e);
	      } }, { key: "TempMode", value: function value(t, e) {
	        this.state = "temp", this.dom = e, this.Newsite(t, e.outerHTML);
	      } }, { key: "GetDom", value: function value(t, e) {
	        return S(c(t), e);
	      } }, { key: "Include", value: function value() {
	        var t = this.current.site.include,
	            e = [],
	            r = c(t);try {
	          if (h(r)) {
	            var n = d(t),
	                i = a(n, 2),
	                o = i[0],
	                l = i[1];0 == l ? (t = t.replace(/\[\[{\$\(|}\]\]|\).html\(\)/g, ""), e = $(d("[[[" + t + "]]]")[0])) : 3 == l && (e = o);
	          } else r && (e = $("body").find(r));
	        } catch (t) {}return e;
	      } }, { key: "Exclude", value: function value(t) {
	        return function (t, e) {
	          var r = [],
	              n = "",
	              i = !0,
	              o = !1,
	              l = void 0;try {
	            for (var u, s = e[Symbol.iterator](); !(i = (u = s.next()).done); i = !0) {
	              var f = u.value;if (h(f)) {
	                var p = d(f),
	                    m = a(p, 2),
	                    v = m[0],
	                    g = m[1];if (1 == g) n = v;else if (2 == g) {
	                  var y = t.html().match(new RegExp(v, "g"));if (y && y.length > 0) {
	                    var b = y.join("");n = "*[" + b + "]";
	                  } else n = void 0;
	                } else 3 == g ? v.remove() : 4 == g && v.remove();
	              } else n = c(f);n && r.push(n);
	            }
	          } catch (t) {
	            o = !0, l = t;
	          } finally {
	            try {
	              !i && s.return && s.return();
	            } finally {
	              if (o) throw l;
	            }
	          }return r.join(",");
	        }(t, this.current.site.exclude);
	      } }, { key: "Beautify", value: function value(t) {
	        0 != t.children().length && this.plugin.beautify && (this.plugin.beautify.before(this.current.site.name, t), this.cleanup && this.plugin.beautify.cleanHTML(t, this.pure, this.isMathJax()), this.plugin.beautify.specbeautify(this.current.site.name, t), this.plugin.beautify.removeSpareTag(this.current.site.name, t), this.plugin.beautify.htmlbeautify(t), this.plugin.beautify.commbeautify(this.current.site.name, t));
	      } }, { key: "Format", value: function value(t) {
	        this.plugin.pangu && this.plugin.pangu.spacingElementByClassName(t);
	      } }, { key: "Utils", value: function value() {
	        return { dom2Xpath: f, xPath2Dom: p };
	      } }]), o;
	  }();
	});

/***/ })

});