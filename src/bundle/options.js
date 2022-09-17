webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	__webpack_require__(856);
	
	__webpack_require__(353);
	
	__webpack_require__(863);
	
	__webpack_require__(355);
	
	__webpack_require__(865);
	
	var _velocity = __webpack_require__(357);
	
	var _velocity2 = _interopRequireDefault(_velocity);
	
	var _notify = __webpack_require__(336);
	
	var _notify2 = _interopRequireDefault(_notify);
	
	var _tabs = __webpack_require__(867);
	
	var _tabs2 = _interopRequireDefault(_tabs);
	
	var _waves = __webpack_require__(555);
	
	var waves = _interopRequireWildcard(_waves);
	
	var _tooltip = __webpack_require__(552);
	
	var tt = _interopRequireWildcard(_tooltip);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _sidebar = __webpack_require__(868);
	
	var side = _interopRequireWildcard(_sidebar);
	
	var _storage = __webpack_require__(2);
	
	var _local = __webpack_require__(1);
	
	var _local2 = _interopRequireDefault(_local);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _config = __webpack_require__(522);
	
	var conf = _interopRequireWildcard(_config);
	
	var _version = __webpack_require__(335);
	
	var ver = _interopRequireWildcard(_version);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _browser = __webpack_require__(334);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	var _export = __webpack_require__(568);
	
	var exp = _interopRequireWildcard(_export);
	
	var _focusopt = __webpack_require__(516);
	
	var _focusopt2 = _interopRequireDefault(_focusopt);
	
	var _readopt = __webpack_require__(523);
	
	var _readopt2 = _interopRequireDefault(_readopt);
	
	var _commonopt = __webpack_require__(869);
	
	var _commonopt2 = _interopRequireDefault(_commonopt);
	
	var _labsopt = __webpack_require__(870);
	
	var _labsopt2 = _interopRequireDefault(_labsopt);
	
	var _pluginsopt = __webpack_require__(872);
	
	var _pluginsopt2 = _interopRequireDefault(_pluginsopt);
	
	var _sitesopt = __webpack_require__(873);
	
	var _sitesopt2 = _interopRequireDefault(_sitesopt);
	
	var _accountopt = __webpack_require__(874);
	
	var _accountopt2 = _interopRequireDefault(_accountopt);
	
	var _about = __webpack_require__(875);
	
	var _about2 = _interopRequireDefault(_about);
	
	var _unrdist = __webpack_require__(876);
	
	var _unrdist2 = _interopRequireDefault(_unrdist);
	
	var _welcome = __webpack_require__(879);
	
	var welc = _interopRequireWildcard(_welcome);
	
	var _guide = __webpack_require__(883);
	
	var guide = _interopRequireWildcard(_guide);
	
	var _feedback = __webpack_require__(618);
	
	var fb = _interopRequireWildcard(_feedback);
	
	var _puread = __webpack_require__(343);
	
	var _puread2 = _interopRequireDefault(_puread);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log("==== simpread options page load ====");
	
	var tabsItemID = 0,
	    loadState = { first: false, update: false },
	    website_sync = false; // when first and update checked versions.json
	
	/**
	 * Add parallax scroll
	 */
	$(window).scroll(function (event) {
	    var $target = $(event.target),
	        scroll = $target.scrollTop(),
	        offset = 0 - scroll;
	    scroll > 200 && $(".header").css({ opacity: 1, visibility: "visible" });
	    scroll <= 200 && $(".header").css({ opacity: 0, visibility: "hidden" });
	    $(".top").css("transform", 'translate3d(0px, ' + offset + 'px, 0px)');
	});
	
	/**
	 * Add event listenr
	 */
	window.addEventListener(msg.MESSAGE_ACTION.turn_tab, function (event) {
	    var idx = event.detail.page;
	    tabChange(idx);
	});
	
	window.addEventListener(msg.MESSAGE_ACTION.welcome_close, function (event) {
	    var _event$detail = event.detail,
	        first = _event$detail.first,
	        version = _event$detail.version;
	
	    !first && new _notify2.default().Render({ content: "是否查看新版本的入门指引？", action: "确认", cancel: "取消", callback: function callback(type) {
	            type == "action" && guide.Start(version);
	        } });
	});
	
	/**
	 * Get tabsItemID from window.location.hash exist
	 */
	window.location.hash && (tabsItemID = conf.tabsItem.findIndex(function (item) {
	    return window.location.hash.startsWith(item.route);
	}));
	tabsItemID == -1 || tabsItemID == 0 ? tabsItemID = 0 : conf.tabsItem.forEach(function (item, index) {
	    return item.active = tabsItemID == index ? true : false;
	});
	
	/**
	 * Listen runtime message
	 */
	_browser.browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == msg.MESSAGE_ACTION.redirect_uri) {
	        var _request$value = request.value,
	            id = _request$value.id,
	            uri = _request$value.uri;
	
	        if (["pocket", "dropbox", "evernote", "gdrive"].includes(id)) {
	            exp[id].Accesstoken(uri);
	        } else if (id == "yinxiang") {
	            exp.evernote.Accesstoken(uri);
	        } else if (uri.indexOf("state=yuque_authorize") > 0) {
	            exp.yuque.Accesstoken(uri);
	        } else {
	            id.startsWith("http://ksria.com/simpread/auth.html?") && exp.onenote.Accesstoken(uri);
	        }
	    }
	});
	
	/**
	 * Change tab
	 * 
	 * @param {number} tab index
	 */
	function tabChange(idx) {
	    if (idx == -1) return;
	    conf.tabsItem.forEach(function (item, index) {
	        return item.active = idx == index ? true : false;
	    });
	    mainRender(idx);
	}
	
	/**
	 * Entry
	 */
	_storage.storage.Read(function (first) {
	    console.log("simpread storage get success!", _storage.storage.focus, _storage.storage.read, first);
	    loadingRender();
	    pRead();
	    hashnotify();
	    firstLoad(first);
	    sidebarRender();
	    navRender();
	    vernotify(first);
	    //welcomeRender( false, "1.1.4" );
	    mainRender(tabsItemID);
	    setTimeout(function () {
	        return noticeRender();
	    }, 500);
	    helpRender();
	    feedbackRender();
	    tt.Render("body");
	    waves.Render({ root: "body" });
	});
	
	/**
	 * Loading Render
	 */
	function loadingRender() {
	    setTimeout(function () {
	        $('.loadingbar').animate({
	            opacity: 0
	        }, function () {
	            $('.loadingbar').remove();
	            $(".bottom").removeAttr("style");
	        });
	    }, 1000);
	}
	
	/**
	 * Pure Read
	*/
	function pRead() {
	    _storage.storage.puread = new _puread2.default(_storage.storage.sites);
	    _storage.storage.pr.origins = _storage.storage.option.origins;
	    console.log("current puread object is   ", _storage.storage.pr);
	}
	
	/**
	 * Incompatible and update 
	 */
	function updateData() {
	    ver.Incompatible(_storage.storage.version, _storage.storage.simpread) && _storage.storage.Write(function () {
	        console.log("current simpread is update ", _storage.storage.simpread);
	        new _notify2.default().Render({ type: 2, content: '\u68C0\u6D4B\u5230\u4F60\u66FE\u7ECF\u4FEE\u6539\u8FC7\u7B2C\u4E09\u65B9\u9002\u914D\u6E90\uFF0C<b>\u52A1\u5FC5\u5237\u65B0\u540E\u91CD\u65B0\u5BFC\u5165</b>\uFF01<a target="_blank" href="http://ksria.com/simpread/docs/#/\u7AD9\u70B9\u9002\u914D\u6E90?id=\u7B2C\u4E09\u65B9\u9002\u914D\u6E90">\u8BE6\u7EC6\u8BF4\u660E</a>', state: "holdon" });
	        watch.SendMessage("option", true);
	    }, _storage.storage.simpread);
	    ver.VerifyPlugins(_storage.storage.option) && new _notify2.default().Render({ type: 2, content: '\u6709\u9700\u8981\u6E05\u7406\u7684\u5DF2\u5931\u6548\u63D2\u4EF6\uFF0C\u8BE6\u7EC6\u8BF7\u770B <a href="http://ksria.com/simpread/welcome/version_' + _storage.storage.version + '.html#badplugins" target="_blank">\u5931\u6548\u63D2\u4EF6</a>', state: "holdon" });
	}
	
	/**
	 * Hash notify
	 */
	function hashnotify() {
	    var search = location.search,
	        prefix = "?simpread_mode=";
	    if (search.startsWith(prefix)) {
	        switch (search.replace(prefix, "")) {
	            case "reload":
	                new _notify2.default().Render(0, "数据导入成功！");
	                break;
	            case "clear":
	                new _notify2.default().Render(0, "数据清除成功！");
	                break;
	            case "sync":
	                new _notify2.default().Render(0, "数据同步成功！");
	                break;
	            default:
	            // TO-DO
	        }
	        history.pushState("", "", "/options/options.html");
	    }
	}
	
	/**
	 * Version update notify
	 * 
	 * @param {boolean} is first load
	 */
	function vernotify(first) {
	    var hash = location.hash;
	    if (hash.startsWith("#firstload?ver=") || hash.startsWith("#update?ver=")) {
	        var prefix = hash.match(/\w+/)[0],
	            version = hash.match(/[0-9\.]+/)[0],
	            message = ver.Notify(first, prefix, version);
	
	        new _notify2.default().Render("简悦 版本提示", message);
	
	        loadState = { first: true };
	        if (hash.startsWith("#update?ver=")) {
	            watch.SendMessage("version", true);
	            loadState = { first: true, update: true };
	            welcomeRender(false, version);
	            updateData();
	        }
	        // website_sync = true; when version is 1.1.3 website_list is newer
	        _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.track, { eventCategory: "install", eventAction: hash.startsWith("#firstload?ver=") ? "install" : "update", eventValue: hash.startsWith("#firstload?ver=") ? "install" : "update" }));
	        history.pushState("", "", "/options/options.html");
	    } else if (hash.startsWith("#update?patch=")) {
	        var patch = hash.match(/[0-9\.]+/)[0];
	        patch == "5005" && welcomeRender(false, patch);
	        history.pushState("", "", "/options/options.html");
	    }
	    // silent update
	    if (_local2.default.Patch("get")) {
	        new _notify2.default().Render("简悦 版本提示", ver.SilentUpdate());
	        _local2.default.Patch("remove");
	    }
	}
	
	/**
	 * First load
	 *
	 * @param {bool} is first load
	 */
	function firstLoad(first) {
	    first && _storage.storage.GetRemote("local", function (result, error) {
	        if (!error) {
	            _storage.storage.pr.Addsites(result);
	            _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                return _storage.storage.Statistics("create");
	            });
	        } else new _notify2.default().Render(0, "本地更新出现错误，请选择手动点击 同步配置列表");
	    });
	    window.location.hash && window.location.hash.startsWith("#firstload") && first && welcomeRender(true, "all");
	}
	
	/**
	 * Welcome page render()
	 * 
	 * exclude: 1.0.4
	 * 
	 * @param {boolean} true: first load
	 * @param {string} version
	 */
	function welcomeRender(first, version) {
	    welc.Render("body", first, version);
	}
	
	/**
	 * Set options page style and tabs.Render()
	 *
	 * @param {number} conf.headerColors index
	 */
	function mainRender(idx) {
	    $(".top").css("background-color", conf.topColors[idx]);
	    $(".header").css("background-color", conf.topColors[idx]).find(".title").text(conf.tabsItem[idx].name);
	    idx == 1 || idx == 2 || idx == 3 || idx == 4 || idx == 6 || idx == 7 ? $('.main').addClass("main_labs") : $('.main').removeClass("main_labs");
	    tabsRender(conf.headerColors[idx]);
	}
	
	/**
	 * Tabs render
	 *
	 * @param {string} header background color
	 */
	function tabsRender(color) {
	    var tabs = React.createElement(
	        _tabs2.default,
	        { waves: 'md-waves-effect md-waves-light',
	            headerStyle: { transition: 'all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' },
	            bgColor: color,
	            items: conf.tabsItem,
	            onChange: function onChange($p, $t, evt) {
	                return tabsOnChange($p, $t, evt);
	            } },
	        React.createElement(
	            'section',
	            null,
	            React.createElement(_commonopt2.default, { website_sync: website_sync, backgroundColor: conf.topColors[0], sync: function sync() {
	                    return refresh();
	                } })
	        ),
	        React.createElement(
	            'section',
	            { style: { 'padding': '0;' } },
	            React.createElement(
	                'div',
	                { id: 'labs', style: { width: '100%' } },
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'focusmode' },
	                    React.createElement(
	                        'div',
	                        { className: 'label' },
	                        'focus mode'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'lab', style: { 'padding': '30px 30px 10px 10px' } },
	                        React.createElement(_focusopt2.default, { option: _storage.storage.focus }),
	                        React.createElement(_button2.default, { type: 'raised', width: '100%', text: '\u4FDD \u5B58',
	                            color: '#fff', backgroundColor: conf.topColors[1],
	                            icon: ss.IconPath("save_icon"),
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick() {
	                                return save(true);
	                            } })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'readmode' },
	                    React.createElement(
	                        'div',
	                        { className: 'label' },
	                        'reading mode'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'lab', style: { 'padding': '30px 30px 10px 10px' } },
	                        React.createElement(_readopt2.default, { option: _storage.storage.read }),
	                        React.createElement(_button2.default, { type: 'raised', width: '100%', text: '\u4FDD \u5B58',
	                            color: '#fff', backgroundColor: conf.topColors[1],
	                            icon: ss.IconPath("save_icon"),
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick() {
	                                return save(true);
	                            } })
	                    )
	                )
	            )
	        ),
	        React.createElement(
	            'section',
	            { style: { 'padding': '0;' } },
	            React.createElement(_labsopt2.default, { option: _storage.storage.option, read: _storage.storage.read, focus: _storage.storage.focus, onChange: function onChange(s) {
	                    return save(s);
	                } })
	        ),
	        React.createElement(
	            'section',
	            { style: { 'padding': '0;', 'overflow-x': 'hidden' } },
	            React.createElement(_sitesopt2.default, { option: _storage.storage.option, onChange: function onChange(s) {
	                    return save(s);
	                } })
	        ),
	        React.createElement(
	            'section',
	            { style: { 'padding': '0;' } },
	            React.createElement(_pluginsopt2.default, null)
	        ),
	        React.createElement(
	            'section',
	            null,
	            React.createElement(_unrdist2.default, { list: _storage.storage.unrdist.map(function (item) {
	                    return _extends({}, item);
	                }), onLoadMoreClick: function onLoadMoreClick() {
	                    return setTimeout(function () {
	                        return tt.Render("list");
	                    }, 200);
	                } })
	        ),
	        React.createElement(
	            'section',
	            { style: { 'padding': '0;' } },
	            React.createElement(_accountopt2.default, { user: _storage.storage.user, load: loadState })
	        ),
	        React.createElement(
	            'section',
	            { style: { 'padding': '0;' } },
	            React.createElement(_about2.default, { option: _storage.storage.option, site: _storage.storage.simpread.sites.length, statistics: _storage.storage.statistics, onClick: function onClick(t) {
	                    return welcomeRender(true, "all");
	                } })
	        )
	    ),
	        tabsOnChange = function tabsOnChange($prev, $target, event) {
	        var idx = $target.attr("id");
	        tabChange(idx);
	    },
	        refresh = function refresh() {
	        tt.Render("body");
	    },
	        save = function save(state) {
	        _storage.storage.Write(function () {
	            watch.SendMessage("option", true);
	            state && new _notify2.default().Render(0, "保存成功，页面刷新后生效！");
	        });
	    };
	    ReactDOM.render(tabs, $(".tabscontainer")[0]);
	}
	
	/**
	 * navigation Render
	 */
	function navRender() {
	    var navClick = function navClick() {
	        side.Open();
	    };
	    var button = React.createElement(_button2.default, { waves: 'md-waves-effect md-waves-circle', hoverColor: 'transparent', icon: ss.IconPath("sidebar_icon"), onClick: function onClick() {
	            return navClick();
	        } });
	    ReactDOM.render(button, $(".header .nav")[0]);
	    ReactDOM.render(button, $(".topnav")[0]);
	}
	
	/**
	 * sidebar Render
	 */
	function sidebarRender() {
	    var sidebarClick = function sidebarClick($target, items) {
	        var idx = conf.tabsItem.findIndex(function (item) {
	            return item.value == items.value;
	        });
	        tabChange(idx);
	    },
	        newItems = [{
	        name: "帮助中心",
	        value: "help",
	        fontIcon: "<i class=\"fas fa-question-circle\"></i>",
	        route: "http://ksria.com/simpread/docs/"
	    }, {
	        name: "开源列表",
	        value: "license",
	        fontIcon: "<i class=\"fas fa-keyboard\"></i>",
	        route: "http://ksria.com/simpread/docs/#/开源列表"
	    }];
	    conf.menuItem = conf.menuItem.concat(newItems);
	    var sidebar = React.createElement(side.Sidebar, { items: conf.menuItem,
	        waves: 'md-waves-effect', autoClose: false, showClose: true,
	        header: '\u8BBE\u5B9A', footer: ' \u7B80\u60A6 \xA9 2017 ~ 2020', onClick: function onClick($t, o) {
	            return sidebarClick($t, o);
	        } });
	    ReactDOM.render(sidebar, $(".sidebar")[0]);
	}
	
	/*
	 * Notice bubbles
	 */
	function noticeRender() {
	    sessionStorage.setItem("is_update", false);
	    var tmpl = '\n        <div class="md-waves-effect bubbles notice effect" aria-label="\u6D88\u606F\u4E2D\u5FC3" data-balloon-pos="up">\n            <i><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2555" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M787.908422 563.765991 787.908422 349.052814c0-152.726403-96.294137-222.682685-223.373417-236.678444 0.031722-0.931209 0.278339-1.811252 0.278339-2.76702 0-27.231201-22.429849-49.288566-50.031487-49.288566-27.662013 0-50.058093 22.057365-50.058093 49.288566 0 0.937348 0.23843 1.804089 0.295735 2.677992-127.636982 13.70207-224.524636 83.607186-224.524636 236.767472l0 214.713176c0 172.349323-442.565605 257.698177 265.890766 257.698177C1214.842001 821.464167 787.908422 736.115314 787.908422 563.765991L787.908422 563.765991zM514.782881 960.670649c52.405557 0 94.916766-41.893132 94.916766-93.54042L419.849742 867.13023C419.849742 918.777517 462.347648 960.670649 514.782881 960.670649L514.782881 960.670649zM514.782881 960.670649" p-id="2556" fill="#ffffff"></path></svg></i>\n            <em class="init">...</em>\n        </div>';
	    _storage.storage.Notice(function (result) {
	        if ($.isEmptyObject(result)) {
	            _storage.storage.notice.latest = 0;
	        }
	        $.get(_storage.storage.notice_service.latest + "?" + Math.round(+new Date()), function (result) {
	            console.log("notice latest id ", result);
	            if (_storage.storage.notice.latest == 0) {
	                $("body").append(tmpl);
	                sessionStorage.setItem("is_update", true);
	            } else if (_storage.storage.notice.latest < result) {
	                $("body").append(tmpl);
	                $(".bubbles em").removeClass("init").text(result - _storage.storage.notice.read.length);
	                sessionStorage.setItem("is_update", true);
	            } else if (_storage.storage.notice.latest > _storage.storage.notice.read.length) {
	                $("body").append(tmpl);
	                $(".bubbles em").removeClass("init").text(_storage.storage.notice.latest - _storage.storage.notice.read.length);
	            } else if (_storage.storage.notice.latest == _storage.storage.notice.read.length && _storage.storage.option.notice) {
	                $("body").append(tmpl);
	                $(".bubbles em").remove();
	            }
	        });
	    });
	    $("body").on("click", ".notice", function (event) {
	        location.href = location.origin + "/options/notice.html?is_update=" + sessionStorage.getItem("is_update");
	    });
	    _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.track, { eventCategory: "help", eventAction: "help", eventValue: "notice" }));
	}
	
	/*
	 * Help bubbles
	 */
	function helpRender() {
	    var help_icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M512 704c-187.733333 0-341.333333-153.6-341.333333-341.333333s153.6-341.333333 341.333333-341.333334 341.333333 153.6 341.333333 341.333334-153.6 341.333333-341.333333 341.333333z m0-597.333333c-140.8 0-256 115.2-256 256s115.2 256 256 256 256-115.2 256-256-115.2-256-256-256z" p-id="4789" fill="#ffffff"></path><path d="M512 576c119.466667 0 213.333333-93.866667 213.333333-213.333333s-93.866667-213.333333-213.333333-213.333334-213.333333 93.866667-213.333333 213.333334 93.866667 213.333333 213.333333 213.333333z" fill="#ffffff"></path><path d="M384 776.533333c0-25.6 21.333333-42.666667 42.666667-42.666666h170.666666c21.333333 0 42.666667 17.066667 42.666667 42.666666s-21.333333 42.666667-42.666667 42.666667h-170.666666c-25.6 0-42.666667-17.066667-42.666667-42.666667z m42.666667 110.933334c0-25.6 17.066667-42.666667 42.666666-42.666667h85.333334c25.6 0 42.666667 17.066667 42.666666 42.666667s-17.066667 42.666667-42.666666 42.666666h-85.333334c-21.333333 0-42.666667-21.333333-42.666666-42.666666z m42.666666 85.333333c0-12.8 8.533333-21.333333 21.333334-21.333333h42.666666c12.8 0 21.333333 8.533333 21.333334 21.333333s-8.533333 21.333333-21.333334 21.333333h-42.666666c-12.8-4.266667-21.333333-12.8-21.333334-21.333333z" p-id="4791" fill="#ffffff"></path></svg>',
	        close_icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z" fill="#ffffff"></path></svg>',
	        tmpl = '\n                <div class="md-waves-effect bubbles help effect" aria-label="\u5E2E\u52A9\u4E2D\u5FC3" data-balloon-pos="up">\n                    <i>' + help_icon + '</i>\n                </div>',
	        exit = function exit() {
	        ReactDOM.unmountComponentAtNode($(".guide-bg")[0]);
	        $(".help i").html(help_icon).css({ "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popdown" });
	        $(".guide-bg").remove();
	    };
	    $("body").append(tmpl);
	    $("body").on("click", ".help", function (event) {
	        if ($(".guide-bg").length == 0) {
	            $("body").append('<div class="guide-bg"></div>');
	            ReactDOM.render(React.createElement(guide.Guide, { onExit: function onExit() {
	                    return exit();
	                } }), $(".guide-bg")[0]);
	            $(".help i").html(close_icon).css({ "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popup" });
	        } else {
	            exit();
	        }
	    });
	    _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.track, { eventCategory: "help", eventAction: "help", eventValue: "help" }));
	}
	
	/*
	 * Feedback bubbles
	 */
	function feedbackRender() {
	    var tmpl = '\n        <div class="md-waves-effect bubbles feedback effect" aria-label="\u7ED9\u6211\u53CD\u9988" data-balloon-pos="up">\n            <i><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M896 981.333333l-213.333333-128H213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333V128c0-46.933333 38.4-85.333333 85.333333-85.333333h597.333334c46.933333 0 85.333333 38.4 85.333333 85.333333v853.333333zM298.666667 512c-8.533333 0-12.8 0-21.333334 4.266667s-17.066667 17.066667-21.333333 25.6c0 12.8 0 25.6 4.266667 34.133333 55.466667 93.866667 153.6 149.333333 260.266666 149.333333 106.666667 0 204.8-55.466667 260.266667-149.333333 4.266667-8.533333 8.533333-21.333333 4.266667-34.133333-4.266667-12.8-8.533333-21.333333-21.333334-25.6-8.533333-4.266667-12.8-4.266667-21.333333-4.266667-17.066667 0-29.866667 8.533333-38.4 21.333333C665.6 597.333333 597.333333 640 520.533333 640c-76.8 0-145.066667-42.666667-183.466666-106.666667-8.533333-12.8-21.333333-21.333333-38.4-21.333333z" fill="#ffffff"></path></svg></i>\n        </div>';
	    $("body").append(tmpl);
	    $("body").on("click", ".feedback", function (event) {
	        fb.Render(_storage.storage.version, _storage.storage.user);
	        setTimeout(function () {
	            return tt.Render(".simpread-feedback");
	        }, 200);
	    });
	    _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.track, { eventCategory: "help", eventAction: "help", eventValue: "feedback" }));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(514)))

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

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(354);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./setting.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./setting.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "\n/**\n *  Setting: Focus/Read setting dailog\n*/\n\nsr-opt-focus,\nsr-opt-read {\n    display: -webkit-flex;\n    -ms-flex-direction:column;\n        flex-direction:column;\n\n    width: 100%;\n}\n\nsr-opt-gp {\n    display: -webkit-flex;\n    position: relative;\n\n    -ms-flex-flow:row nowrap;\n\n        flex-flow:row nowrap;\n    -ms-flex-pack:start;\n        justify-content:flex-start;\n\n    width: 100%;\n    margin-bottom: 25px;\n\n    font-size: 15px;\n}\n\nsr-opt-gp textarea, sr-opt-gp input {\n    font-family: Inconsolata, \"Operator Mono\", Consolas, \"Andale Mono WT\", \"Andale Mono\", \"Lucida Console\", \"Lucida Sans Typewriter\", \"DejaVu Sans Mono\", \"Bitstream Vera Sans Mono\", \"Liberation Mono\", \"Nimbus Mono L\", \"Courier New\", Courier, monospace!important;\n}\n\nsr-opt-gp sr-opt-label {\n    display: block;\n    position: absolute;\n\n    margin: -8px 0 0 0;\n\n    font-size: 14px;\n    font-weight: bold;\n\n    color: rgba(0, 137, 123, .8);\n\n    -webkit-user-select: none;\n\n       -moz-user-select: none;\n\n        -ms-user-select: none;\n\n            user-select: none;\n    pointer-events: none;\n\n    transform: scale(0.75) translate( 0px, -8px );\n    transform-origin: left top 0px;\n}\n\nsr-opt-themes {\n    display: -webkit-flex;\n    -ms-flex-flow:row nowrap;\n        flex-flow:row nowrap;\n    -ms-flex-pack:justify;\n        justify-content:space-between;\n\n    width: 100%;\n    /*height: 100%;*/\n\n    margin: 8px 0 17px;\n    padding: 0;\n}\n\nsr-opt-theme {\n    width: 40px;\n    height: 20px;\n\n    cursor: pointer;\n    list-style: none;\n\n    border-radius: 3px;\n    border: 1px solid #212121;\n    box-sizing: border-box;\n\n    opacity: 1;\n    transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n\nsr-opt-theme:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\n}\n\nsr-opt-theme:not(:first-child) {\n    margin-left: 5px;\n}\n\nsr-opt-theme[sr-type=\"active\"] {\n    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\n    border: none;\n}\n", ""]);
	
	// exports


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(356);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./notify.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./notify.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "\n/*\n* Notify Group\n*/\nnotify-gp {\n    font: 300 14px -apple-system, PingFang SC, Microsoft Yahei, Lantinghei SC, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;\n    text-rendering: optimizelegibility;\n    -webkit-text-size-adjust: 100%;\n    -webkit-font-smoothing: antialiased;\n\n    display: -webkit-flex;\n    -ms-flex-flow: column nowrap;\n        flex-flow: column nowrap;\n    -ms-flex-align: end;\n        align-items: flex-end;\n\n    position: fixed;\n\n    top: 0;\n    right: 0;\n\n    margin: 0 15px 0 0;\n    padding: 0;\n\n    text-transform: none;\n\n    pointer-events: none;\n}\n\nnotify-gp notify {\n    display: -webkit-flex;\n    -ms-flex-align: center;\n        align-items: center;\n\n    margin: 0;\n    margin-top: 15px;\n    padding: 14px 24px;\n\n    min-width: 288px;\n    max-width: 568px;\n\n    /*height: 48px;\n    max-height: 48px;*/\n    min-height: 48px;\n\n    color: rgba(255, 255, 255, .9);\n    background-color: #000;\n\n    box-sizing: border-box;\n    border-radius: 4px;\n    pointer-events: auto;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n\n    opacity: 0;\n    transform: scaleY(0);\n    transform-origin: left top 0px;\n    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n\n    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);\n}\n\nnotify-gp notify-title {\n    font-size: 13px;\n    font-weight: bold;\n}\n\nnotify-gp notify-content {\n    display: block;\n\n    font-size: 14px;\n    font-weight: 400;\n    text-align: left;\n\n    overflow: hidden;\n    /*text-overflow: ellipsis;\n    white-space: nowrap;*/\n}\n\nnotify-gp notify-content a,\nnotify-gp notify-content a:link,\nnotify-gp notify-content a:visited,\nnotify-gp notify-content a:active {\n    margin: inherit;\n    padding-bottom: 5px;\n\n    color: #fff;\n    font-size: inherit;\n\n    text-decoration: none;\n\n    transition: color .5s;\n}\n\nnotify-gp notify-content a:hover {\n    margin: 0;\n    margin: initial;\n    padding: 0;\n    padding: initial;\n\n    color: inherit;\n    font-size: inherit;\n\n    text-decoration: none;\n}\n\nnotify-gp notify-i {\n    display: none;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-align: center;\n        align-items: center;\n\n    margin: 0 10px 0 0;\n\n    width: 24px;\n    height: 24px;\n\n    background-position: center;\n    background-repeat: no-repeat;\n}\n\nnotify-gp notify-action,\nnotify-gp notify-cancel {\n    display: none;\n\n    margin: 0 8px;\n\n    max-width: 80px;\n    min-width: 56px;\n    height: 36px;\n    line-height: 34px;\n\n    color: #bb86fc;\n\n    font-weight: 500;\n    font-size: inherit;\n    text-transform: uppercase;\n    text-align: center;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n    cursor: pointer;\n}\n\nnotify-gp notify-action:active,\nnotify-gp notify-cancel:active {\n    border-radius: 4px;\n    background-color: rgba(98, 0, 238, .3);\n}\n\nnotify-gp notify-cancel {\n    margin: 0;\n}\n\nnotify-gp notify-a {\n    display: block;\n    position: absolute;\n\n    top: 5px;\n    right: 5px;\n\n    cursor: pointer;\n}\n\nnotify-gp notify-exit {\n    display: none;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-align: center;\n        align-items: center;\n\n    margin-left: 5px;\n\n    width: 36px;\n    height: 36px;\n    min-width: 36px;\n    min-height: 36px;\n\n    background-color: transparent;\n\n    border-radius: 50%;\n    transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n    cursor: pointer;\n}\n\nnotify-gp notify-exit:hover {\n    background-color: rgba(255, 255, 255, .4);\n}\n\nnotify-gp notify-exit:active {\n    background-color: rgba(255, 255, 255, .2);\n}\n\nnotify-gp notify-a notify-span {\n    display: block;\n    width: 16px;\n    height: 16px;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDklEQVQ4T6VT0VFCQQzcrQA7ECoRK1AqEDugA6ECsQPsADvgVSAlaAlWEGdvkjchczI45Osud9nc7m2IEmY2BfAEYA5A6xsARwAHAB8ktR6DeWNmKwAvXlSxY78i+RabEcDM9gAe/qoq+T3JhXINwDu/Xlgc1zYk13TOn+XZA4C7AvgN4LbkZgJYO+84O5C8N7Odi6n8O8llh+ZGAD3uO5LPDgIvzoDRbBDAV+dputBAXKNecQM5B9CefQlAj0JwVmdLdGSwHI1CFXEgOS8ihia1WRNRdpU9JwlatpWVc0gr3c0xu95IAfdPK2uoHkcrJxANkzTJdPKTf3ROchvJk2n0LxNPfV9vnDVEJ+P8C6jMhLeGEqMKAAAAAElFTkSuQmCC);\n    opacity: .9;\n}\n\nnotify-gp notify-i.holdon {\n    display: block;\n    margin: 0 0 0 24px;\n\n    width: 20px;\n    height: 20px;\n\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAATUlEQVR4AWMYSuB/4P+V/1lRRFiBIoEYCoGC//+vAypFKFsHFFkJV4AsAVGKzsOjFFUZHqUElCGUwpRRrpCw1YQ9Qzh4SA5wwlE4hAAAiFGQefYhNJkAAAAASUVORK5CYII=);\n    cursor: pointer;\n}\n\nnotify-gp .notify-show {\n    opacity: 1;\n    transform: scaleY(1)!important;\n}\n\nnotify-gp .notify-hide {\n    animation-name: fadeOutUp;\n    animation-duration: 450ms;\n    animation-fill-mode: both;\n}\n\nnotify-gp .notify-success {\n    background-color: rgb(76, 175, 80);\n}\n\nnotify-gp .notify-warning {\n    background-color: rgb(255, 160, 0);\n}\n\nnotify-gp .notify-error {\n    background-color: rgba(239, 83, 80, 1);\n}\n\nnotify-gp .notify-info {\n    background-color: rgb(25, 118, 210);\n}\n\nnotify-gp .notify-modal {\n    -ms-flex-flow: column nowrap;\n        flex-flow: column nowrap;\n    -ms-flex-align: start;\n        align-items: flex-start;\n\n    height: auto;\n    max-height: 200px;\n\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2);\n}\n\nnotify-gp .notify-modal .notify-modal-content {\n    margin-top: 5px;\n    font-size: 13px;\n    white-space: normal;\n}\n\nnotify-gp .notify-modal .notify-modal-content a {\n    margin: 0;\n    padding: 0;\n\n    color: inherit;\n\n    font-size: inherit;\n    text-decoration: underline;\n    \n    cursor: pointer;\n}\n\nnotify-gp .notify-modal .notify-modal-content a:hover,\nnotify-gp .notify-modal .notify-modal-content a:active,\nnotify-gp .notify-modal .notify-modal-content a:visited,\nnotify-gp .notify-modal .notify-modal-content a:focus {\n    color: inherit;\n}\n\nnotify-gp .notify-snackbar {\n    position: fixed;\n    bottom: 0;\n    left: 50%;\n    margin-bottom: 5px;\n    transform-origin: left bottom 0px;\n}\n\n.notify-position-lt-corner {\n    -ms-flex-align: start;\n        align-items: flex-start;\n\n    margin: 0 0 0 15px;\n\n    left: 0;\n    right: auto;\n    right: initial;\n}\n\n.notify-position-lb-corner {\n    -ms-flex-flow: column-reverse wrap-reverse;\n        flex-flow: column-reverse wrap-reverse;\n\n    margin: 0 0 15px 15px;\n\n    right: auto;\n\n    right: initial;\n    top: auto;\n    top: initial;\n\n    left: 0;\n    bottom: 0;\n}\n\n.notify-position-rb-corner {\n    -ms-flex-flow: column-reverse wrap-reverse;\n        flex-flow: column-reverse wrap-reverse;\n    -ms-flex-align: start;\n        align-items: flex-start;\n\n    margin: 0 15px 15px 0;\n\n    top: auto;\n\n    top: initial;\n    left: auto;\n    left: initial;\n\n    bottom: 0;\n    right: 0;\n}\n\n@keyframes fadeOutUp {\n    from {\n        opacity: 1;\n    }\n\n    to {\n        margin-top: 0;\n        padding: 0;\n        height: 0;\n        min-height: 0;\n        opacity: 0;\n        transform: scaleY(0);\n    }\n}\n\n@media (pointer: coarse) {\n    notify-gp {\n        top: auto;\n        top: initial;\n        bottom: 0;\n        left: 0;\n\n        margin: 0 10px 10px 10px;\n    }\n\n    notify-gp notify {\n        width: 100%;\n        max-width: 600px;\n    }\n\n    notify-gp .notify-show,\n    notify-gp .notify-hide {\n        transform-origin: bottom!important;\n    }\n\n    notify-gp .notify-snackbar {\n        position: static;\n        position: initial;\n    }\n}", ""]);
	
	// exports


/***/ }),

/***/ 360:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	console.log("=== simpread highlight load ===");
	
	var highlight_class = "simpread-highlight-selector";
	
	/**
	 * Highlight
	 * 
	 * @return {promise} promise
	 */
	function start() {
	    var $prev = void 0;
	    var dtd = $.Deferred(),
	        mousemoveEvent = function mousemoveEvent(event) {
	        if (!$prev) {
	            $(event.target).addClass(highlight_class);
	        } else {
	            $prev.removeClass(highlight_class);
	            $(event.target).addClass(highlight_class);
	        }
	        $prev = $(event.target);
	    };
	    $("html").one("click", function (event) {
	        if (!$prev) return;
	        $(event.target).removeClass(highlight_class);
	        $("html").off("mousemove", mousemoveEvent);
	        $prev = undefined;
	        dtd.resolve(event.target);
	        return false;
	    });
	    $("html").one("keydown", function (event) {
	        if (event.keyCode == 27 && $prev) {
	            $("html").find("." + highlight_class).removeClass(highlight_class);
	            $("html").off("mousemove", mousemoveEvent);
	            $prev = undefined;
	            event.preventDefault();
	            return false;
	        }
	    });
	    $("html").on("mousemove", mousemoveEvent);
	    return dtd;
	}
	
	/**
	 * Multi Highlight
	 * 
	 * @return {func} callback
	 */
	function multi(callback) {
	    var $prev = void 0;
	    var mousemoveEvent = function mousemoveEvent(event) {
	        if (!$prev) {
	            $(event.target).addClass(highlight_class);
	        } else {
	            $prev.removeClass(highlight_class);
	            $(event.target).addClass(highlight_class);
	        }
	        $prev = $(event.target);
	    },
	        removeDomHander = function removeDomHander(event) {
	        callback(event.target);
	        return false;
	    };
	    $("sr-rd-content").on("click", removeDomHander);
	    $("sr-rd-content").on("keydown", function (event) {
	        if (event.keyCode == 27 && $prev) {
	            $("sr-rd-content").find("." + highlight_class).removeClass(highlight_class);
	            $("sr-rd-content").off("mousemove", mousemoveEvent);
	            $("sr-rd-content").off("click", removeDomHander);
	            $prev = undefined;
	            event.preventDefault();
	            return false;
	        }
	    });
	    $("sr-rd-content").on("mousemove", mousemoveEvent);
	}
	
	function annotate() {
	    var dtd = $.Deferred();
	    $("html").one("mouseup", function (event) {
	        var userSelection = void 0;
	        if (window.getSelection) {
	            userSelection = window.getSelection();
	        } else if (document.selection) {
	            userSelection = document.selection.createRange();
	        }
	        var selectedText = userSelection;
	        if (userSelection.text) selectedText = userSelection.text;
	
	        if (selectedText != '') {
	            selectedText = "" + selectedText + "";
	            window.getSelection().removeAllRanges();
	            dtd.resolve(selectedText);
	        }
	    });
	    return dtd;
	}
	
	/**
	 * Highlight and controlbar
	 * 
	 * @param {element} dom 
	 */
	function controlbar(dom) {
	    var $target = $(dom);
	    var dtd = $.Deferred(),
	        tmpl = "<simpread-highlight>\n                        <sr-highlight-ctl class=\"add\"><svg t=\"1560496884701\" viewBox=\"0 0 1024 1024\" version=\"1.1\" width=\"15\" height=\"15\"><defs><style type=\"text/css\"></style></defs><path d=\"M876.089 439.182h-291.271v-291.271c0-40.268-32.549-72.818-72.818-72.818s-72.818 32.549-72.818 72.818v291.271h-291.271c-40.268 0-72.818 32.549-72.818 72.818s32.549 72.818 72.818 72.818h291.271v291.271c0 40.268 32.549 72.818 72.818 72.818s72.818-32.549 72.818-72.818v-291.271h291.271c40.268 0 72.818-32.549 72.818-72.818s-32.549-72.818-72.818-72.818z\" p-id=\"1998\" fill=\"#ffffff\"></path></svg></sr-highlight-ctl>\n                        <sr-highlight-ctl class=\"sub\"><svg t=\"1560496679351\" viewBox=\"0 0 1024 1024\" version=\"1.1\" width=\"15\" height=\"15\"><defs><style type=\"text/css\"></style></defs><path d=\"M127.289058 490.154459l0 43.770899c0 32.338522 27.009144 57.108672 58.774615 58.734706 0 0 132.448568 13.021571 325.936327 13.021571s325.936327-13.021571 325.936327-13.021571c31.765471-1.626034 58.774615-26.396183 58.774615-58.734706l0-43.770899c0-32.338522-26.51591-57.068763-58.774615-58.734706 0 0-128.005372-12.005428-325.942467-12.005428s-325.930187 12.005428-325.930187 12.005428C153.804968 433.085696 127.289058 457.815937 127.289058 490.154459z\" p-id=\"3204\" fill=\"#ffffff\"></path></svg></sr-highlight-ctl>\n                        <sr-highlight-ctl class=\"done\"><svg t=\"1560496955945\" viewBox=\"0 0 1024 1024\" version=\"1.1\" width=\"15\" height=\"15\"><defs><style type=\"text/css\"></style></defs><path d=\"M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z\" p-id=\"1755\" fill=\"#ffffff\"></path></svg></sr-highlight-ctl>\n                        <sr-highlight-ctl class=\"none\"><svg t=\"1560499513561\" viewBox=\"0 0 1024 1024\" version=\"1.1\" width=\"15\" height=\"15\"><defs><style type=\"text/css\"></style></defs><path d=\"M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z\" p-id=\"1990\" fill=\"#ffffff\"></path></svg></sr-highlight-ctl>\n                        <sr-highlight-ctl class=\"help\"><svg t=\"1560573280563\" viewBox=\"0 0 1024 1024\" version=\"1.1\" width=\"15\" height=\"15\"><defs><style type=\"text/css\"></style></defs><path d=\"M512 958.326255c247.255337 0 447.696462-200.441125 447.696462-447.696462s-200.441125-447.696462-447.696462-447.696462-447.696462 200.441125-447.696462 447.696462S264.74364 958.326255 512 958.326255zM512 217.681788c35.32146 0 63.956637 28.635177 63.956637 63.956637 0 35.323507-28.635177 63.956637-63.956637 63.956637s-63.956637-28.633131-63.956637-63.956637C448.043363 246.316965 476.67854 217.681788 512 217.681788zM448.043363 510.629793c0-35.32146 28.635177-63.956637 63.956637-63.956637s63.956637 28.635177 63.956637 63.956637l0 223.848231c0 35.323507-28.635177 63.956637-63.956637 63.956637s-63.956637-28.633131-63.956637-63.956637L448.043363 510.629793z\" p-id=\"1979\" fill=\"#ffffff\"></path></svg></sr-highlight-ctl>\n                  </simpread-highlight>";
	    $target.addClass("simpread-highlight-controlbar");
	    $("html").append(tmpl);
	    $("html").find("sr-highlight-ctl").on("click", function (event) {
	        var cls = $(event.currentTarget).attr("class");
	        if (cls == "add") {
	            $target.removeClass("simpread-highlight-controlbar");
	            $target = $target.parent();
	            $target.addClass("simpread-highlight-controlbar");
	        } else if (cls == "sub") {
	            $target.removeClass("simpread-highlight-controlbar");
	            $target = $($target.children()[0]);
	            $target.addClass("simpread-highlight-controlbar");
	        } else if (cls == "none") {
	            $target.removeClass("simpread-highlight-controlbar");
	            $("simpread-highlight").remove();
	        } else if (cls == "help") {
	            var $a = $("<a style=\"display:none\" target=\"_blank\" href=\"http://ksria.com/simpread/docs/#/\u624B\u52A8\u6846\u9009\"></a>").appendTo("body");
	            $a[0].click();
	            $a.remove();
	        } else {
	            $target.removeClass("simpread-highlight-controlbar");
	            $("simpread-highlight").remove();
	            dtd.resolve($target[0]);
	        }
	    });
	    return dtd;
	}
	
	exports.Start = start;
	exports.Multi = multi;
	exports.Annotate = annotate;
	exports.Control = controlbar;

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Notify) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Controlbar = exports.Event = exports.ID = exports.Exec = exports.Install = undefined;
	
	var _nanoid = __webpack_require__(594);
	
	var _nanoid2 = _interopRequireDefault(_nanoid);
	
	var _browser = __webpack_require__(334);
	
	var _storage = __webpack_require__(2);
	
	var _highlight = __webpack_require__(360);
	
	var highlight = _interopRequireWildcard(_highlight);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	console.log("=== simpread runtime load ===");
	
	var is_firstload = true;
	
	/**
	 * Generate ID
	 * 
	 * @param {string} generate id, include: user id( uuid v4 ), plugin id( like t.co/cKPFh3Qsh4 )
	 */
	function generateID(type) {
	    if (type == "user") {
	        var random = "0123456789abcdefghijklmnopqrstuvwxyz",
	            first = (0, _nanoid2.default)(random, 8),
	            second = (0, _nanoid2.default)(random, 4),
	            third = (0, _nanoid2.default)(random, 4),
	            fourth = (0, _nanoid2.default)(random, 4),
	            fifth = (0, _nanoid2.default)(random, 12);
	        return first + '-' + second + '-' + third + '-' + fourth + '-' + fifth;
	    } else if (type == "plugin") {
	        return (0, _nanoid2.default)("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
	    } else if (type == "site") {
	        return (0, _nanoid2.default)("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
	    }
	}
	
	/**
	 * Install plugin
	 * 
	 * @param {string} id  e.g. kw36BtjGu0
	 * @param {string} url
	 */
	function install(id, url, callback) {
	    url = id ? 'https://simpread.ksria.cn/plugins/srplug/' + id + '.srplug' : url;
	    url = url + ('?' + +new Date());
	    console.log("install url is", url);
	    $.ajax({ url: url, dataType: "json" }).done(function (result) {
	        return callback(result, undefined);
	    }).fail(function () {
	        return callback(undefined, "error");
	    });
	}
	
	/**
	 * Dispatch event
	 * 
	 * @param {string} type include: export, read_ui, read_start, read_end
	 * @param {string} value
	 */
	function dispatch(type, value) {
	    window.dispatchEvent(new CustomEvent("simpread-plugin", { detail: { type: type, value: value } }));
	}
	
	/**
	 * Execute
	 * 
	 * @param {string} state, include: read_start, read_loading, read_complete, read_end
	 * @param {string} site name, inlcude: "", "xxx", "xxx, yyy"
	 * @param {object} plugin object
	 */
	function exec(state, site, plugin) {
	    try {
	        if (plugin.enable == false) return;
	        if (plugin.run_at != state) return;
	        if (plugin.site != "" && !plugin.site.split(",").includes(site)) return;
	        console.log("current plugin is running", plugin);
	        new Function(func(plugin.script))();
	        plugin.style != "" && addStyle(plugin.style);
	    } catch (error) {
	        new Notify().Render(2, '\u63D2\u4EF6 ' + plugin.name + ' \u8FD0\u884C\u65F6\u51FA\u9519\uFF0C\u53EF\u4EE5\u7684\u8BDD\uFF0C\u8BF7 <a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">\u63D0\u4EA4\u6B64\u95EE\u9898</a> \uD83D\uDE01');
	    }
	}
	
	/**
	 * Contact (function(){})() string
	 * 
	 * @param {string} source 
	 */
	function func(source) {
	    window.Notify = Notify;
	    window.browser = _browser.browser;
	    window.current = (0, _storage.Clone)(_storage.storage.current);
	    window.read = (0, _storage.Clone)(_storage.storage.read);
	    window.highlight = highlight;
	    window.db = Storage;
	    window.control = Controlbar;
	    window.SRSave = Save;
	    return '( function ( $$version, $read, $title, $desc, $content, $footer, $process, $toc, Notify, $$highlight, browser, $$storage, $$current, $$read, $$control, $$save ) {\n        ' + source + '\n    })( "0.0.2", $( "sr-read" ), $( "sr-rd-title" ), $( "sr-rd-desc" ), $( "sr-rd-content" ), $( "sr-rd-footer" ), $( "read-process" ), $( "toc" ), Notify, highlight, browser, db, current, read, control, SRSave );';
	}
	
	/**
	 * Getter / Setter plugin config
	 * 
	 * @param {string} plugin id
	 * @param {object} data
	 * @param {func} callback 
	 */
	function Storage(id, data, callback) {
	    if (data) {
	        _browser.browser.storage.local.set(_defineProperty({}, "plugin-" + id, data), function () {
	            callback && callback();
	        });
	    } else {
	        _browser.browser.storage.local.get(["plugin-" + id], function (result) {
	            callback && callback(result);
	        });
	    }
	}
	
	/**
	 * Contorlbar setting
	 * 
	 * @param {string} controlbar type include: markdown 
	 * @param {func} callback
	 */
	function Controlbar(type, callback) {
	    if (callback) {
	        is_firstload && window.addEventListener("simpread-plugin_controlbar", function (event) {
	            callback(event);
	        });
	    } else window.dispatchEvent(new CustomEvent("simpread-plugin_controlbar", { detail: { type: type } }));
	    is_firstload = false;
	}
	
	/**
	 * Save adapter storage.Write
	 * 
	 * @param {object} simpread data structure
	 * @param {func}   callback
	 */
	function Save(data, callback) {
	    if (data) {
	        _storage.storage.Write(function () {
	            watch.SendMessage("option", true);
	            callback();
	        }, _storage.storage.simpread);
	    } else {
	        return {
	            focus: _storage.storage.focus,
	            read: _storage.storage.read,
	            option: _storage.storage.option,
	            version: _storage.storage.version
	        };
	    }
	}
	
	/**
	 * Add style
	 * 
	 * @param {string} add css to head
	 */
	function addStyle(str) {
	    $("head").append('<style type="text/css">' + str + '</style>');
	}
	
	/**
	 * Add trigger
	 * 
	 * @param {string} add trigger to fap controlbar
	 */
	function addTrigger(str) {
	    var is_found = false;
	    $("fap action-bar").find("sr-opt-label").map(function (idx, item) {
	        if ($(item).text() == "插件触发器") {
	            is_found = true;
	            $(item).next().append(str);
	        }
	    });
	    if (is_found == false) {
	        var html = '<sr-opt-gp>\n                        <sr-opt-label>\u63D2\u4EF6\u89E6\u53D1\u5668</sr-opt-label>\n                        <actions style="display:flex;margin:10px 0;flex-wrap:wrap;">\n                            ' + str + '\n                        </actions>\n                      </sr-opt-gp>';
	        $("fap action-bar").append(html);
	    }
	}
	
	/**
	 * Test Plugin
	 * 
	 * @param {func} style func
	 * @param {func} plugin func
	 * @param {func} trigger func
	 */
	function testPlugin(style, plugin, trigger) {
	    style && addStyle(style());
	    plugin && plugin("0.0.2", $("sr-read"), $("sr-rd-title"), $("sr-rd-desc"), $("sr-rd-content"), $("sr-rd-footer"), $("read-process"), $("toc"), Notify, highlight, _browser.browser, Storage, _storage.storage.current, _storage.storage.read, Controlbar, Save);
	    trigger && addTrigger(trigger());
	}
	
	window.simpread = { testPlugin: testPlugin };
	
	exports.Install = install;
	exports.Exec = exec;
	exports.ID = generateID;
	exports.Event = dispatch;
	exports.Controlbar = Controlbar;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(336)))

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

	var random = __webpack_require__(595)
	var format = __webpack_require__(596)
	
	/**
	 * Low-level function to change alphabet and ID size.
	 *
	 * Alphabet must contain 256 symbols or less. Otherwise, the generator
	 * will not be secure.
	 *
	 * @param {string} alphabet Symbols to be used in ID.
	 * @param {number} size The number of symbols in ID.
	 *
	 * @return {string} Unique ID.
	 *
	 * @example
	 * var generate = require('nanoid/generate')
	 * model.id = generate('0123456789абвгдеё', 5) //=> "8ё56а"
	 *
	 * @name generate
	 */
	module.exports = function (alphabet, size) {
	  return format(random, alphabet, size)
	}


/***/ }),

/***/ 595:
/***/ (function(module, exports) {

	var crypto = self.crypto || self.msCrypto
	
	module.exports = function (bytes) {
	  return crypto.getRandomValues(new Uint8Array(bytes))
	}


/***/ }),

/***/ 596:
/***/ (function(module, exports) {

	/**
	 * Secure random string generator with custom alphabet.
	 *
	 * Alphabet must contain 256 symbols or less. Otherwise, the generator
	 * will not be secure.
	 *
	 * @param {random} random The random bytess generator.
	 * @param {string} alphabet Symbols to be used in new random string.
	 * @param {size} size The number of symbols in new random string.
	 *
	 * @return {string} Random string.
	 *
	 * @example
	 * var format = require('nanoid/format')
	 *
	 * function random (size) {
	 *   var result = []
	 *   for (var i = 0; i < size; i++) result.push(randomByte())
	 *   return result
	 * }
	 *
	 * format(random, "abcdef", 5) //=> "fbaef"
	 *
	 * @name format
	 */
	module.exports = function (random, alphabet, size) {
	  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
	  var step = Math.ceil(1.6 * mask * size / alphabet.length)
	
	  var id = ''
	  while (true) {
	    var bytes = random(step)
	    for (var i = 0; i < step; i++) {
	      var byte = bytes[i] & mask
	      if (alphabet[byte]) {
	        id += alphabet[byte]
	        if (id.length === size) return id
	      }
	    }
	  }
	}
	
	/**
	 * @callback generator
	 * @param {number} bytes The number of bytes to generate.
	 * @return {number[]} Random bytes.
	 */


/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Render = exports.Feedback = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _switch = __webpack_require__(619);
	
	var _switch2 = _interopRequireDefault(_switch);
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _browser = __webpack_require__(334);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread feedback load =====");
	
	var Feedback = exports.Feedback = function (_React$Component) {
	    _inherits(Feedback, _React$Component);
	
	    function Feedback() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Feedback);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            mode: "github",
	            rate: _this.props.rate,
	            stars: 0
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Feedback, [{
	        key: 'onStarClick',
	        value: function onStarClick(idx) {
	            $(this.refs.stars).find("i").removeClass("active");
	            for (var i = 0; i < 5; i++) {
	                var $target = $($(this.refs.stars).find("i")[i]);
	                if (i < idx) $target.addClass("active").html(this.props.stared);else $target.html(this.props.star);
	            }
	            $(this.refs.emoji).css({ 'transform': 'translateY(-' + idx + '00px)' });
	            this.setState({ stars: idx });
	        }
	    }, {
	        key: 'onStarHover',
	        value: function onStarHover(idx) {
	            $(this.refs.emoji).css({ 'transform': 'translateY(-' + idx + '00px)' });
	        }
	    }, {
	        key: 'onRateClick',
	        value: function onRateClick() {
	            var _this2 = this;
	
	            if (this.state.stars < 4) {
	                this.setState({ rate: false });
	            } else {
	                _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: "https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll/reviews" }));
	                setTimeout(function () {
	                    return _this2.onClose();
	                }, 200);
	            }
	        }
	    }, {
	        key: 'onURLChange',
	        value: function onURLChange(event) {
	            this.props.url = event.target.value.trim();
	        }
	    }, {
	        key: 'onAnonymousChange',
	        value: function onAnonymousChange(value) {
	            this.props.anonymous = value;
	        }
	    }, {
	        key: 'onChangeMode',
	        value: function onChangeMode(mode) {
	            this.setState({ mode: mode });
	        }
	    }, {
	        key: 'onClose',
	        value: function onClose() {
	            $(this.refs.target).addClass("hide")[0].addEventListener('animationend', function () {
	                ReactDOM.unmountComponentAtNode($(".simpread-feedback")[0]);
	                $(".simpread-feedback").remove();
	            }, false);
	        }
	    }, {
	        key: 'onSubmitClick',
	        value: function onSubmitClick() {
	            this.state.mode == "github" ? this.onGithubClick() : this.onTucaoClick();
	        }
	    }, {
	        key: 'onGithubClick',
	        value: function onGithubClick() {
	            var content = '**\u5C0F\u63D0\u793A**\n\n> \u7B80\u60A6\u5DF2\u7ECF\u670D\u52A1 70K+ \u7684\u7528\u6237\uFF0C\u6240\u4EE5\u4F60\u7684\u5F88\u591A\u95EE\u9898\uFF0C\u6216\u8BB8\u5DF2\u7ECF\u88AB\u524D\u4EBA\u89E3\u51B3\u4E86\uFF0C\u6240\u4EE5\u8BD5\u7740\u770B\u770B\u4EE5\u4E0B\u51E0\u4E2A\u5217\u8868\u4E2D\u7684\u5185\u5BB9\uFF1A\n\n- [\u7528\u597D Github issues \u80FD\u89E3\u51B3\u4F60\u5927\u90E8\u5206\u7684\u7591\u95EE](https://github.com/Kenshin/simpread/issues/533)\n\n- [\u5E38\u89C1\u95EE\u9898\u6C47\u603B](https://github.com/Kenshin/simpread/issues/618)\n\n- [\u4EE3\u7801\u6BB5\u7684\u4E13\u9879\u6574\u6CBB](https://github.com/Kenshin/simpread/issues/500)\n\n***\n\n> \u5982\u4E0A\u8FF0\u5185\u5BB9\u65E0\u6CD5\u89E3\u51B3\u4F60\u7684\u95EE\u9898\uFF0C\u90A3\u4E48\u8BF7\u5C06\u4E0A\u8FF0\u5185\u5BB9\u5220\u9664\uFF0C\u5E76\u6309\u7167\u4E0B\u65B9\u7684\u63D0\u793A\u4E66\u5199~  \uD83D\uDE00 \n\n**\u8BF7\u8BF4\u660E\u53D1\u751F\u95EE\u9898\u7684\u73AF\u5883**\n\n> \u7B80\u60A6\u5305\u542B\u4E86\u5F88\u591A\u5E73\u53F0\u7684\u7248\u672C\uFF0C\u6240\u4EE5\u4E3A\u4E86\u65B9\u4FBF\u5B9A\u4F4D\uFF0C\u5EFA\u8BAE\u544A\u8BC9\u6211\u4E00\u4E9B\u5FC5\u8981\u4FE1\u606F\n\n- \u64CD\u4F5C\u7CFB\u7EDF **' + window.navigator.platform + '**\n\n- \u6D4F\u89C8\u5668\u7248\u672C **e.g. Chrome 78.0.3904.108**\n\n- \u7B80\u60A6\u7248\u672C **' + this.props.version + '**\n\n- \u53D1\u751F\u95EE\u9898\u7684\u5730\u5740 <' + this.props.url + '>\n\n**\u8BF7\u63CF\u8FF0\u4F60\u7684\u95EE\u9898**\n\n> \u8BF7\u4F7F\u7528\u53EF\u4EE5 **\u51C6\u786E\u5B9A\u4F4D\u5230\u9519\u8BEF** \u7684\u8BED\u53E5\u6765\u544A\u8BC9\u6211\u3002\uD83D\uDE00\n\n**\u622A\u56FE**\n\n> \u4E00\u56FE\u80DC\u5343\u8A00\uFF0C\u6240\u4EE5\u65B9\u4FBF\u7684\u8BDD\uFF0C\u53EF\u4EE5\u8BD5\u7740\u8D34\u56FE\u3002\n',
	                url = encodeURI('https://github.com/Kenshin/simpread/issues/new?title=<\u8BF7\u63CF\u8FF0\u4F60\u7684\u95EE\u9898>&labels=to do&body=' + content);
	            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: url }));
	        }
	    }, {
	        key: 'onTucaoClick',
	        value: function onTucaoClick() {
	            var _this3 = this;
	
	            var data = {
	                "nickname": this.props.anonymous ? "简悦用户" : this.props.user.name || "简悦用户",
	                "avatar": 'https://api.adorable.io/avatars/285/' + (this.props.user.name || this.props.user.uid.substr(0, 13)) + '.png',
	                "openid": this.props.user.uid.substr(0, 13),
	                "clientVersion": this.props.version,
	                "clientInfo": window.navigator.userAgent,
	                "customInfo": "https://github.com/erguotou520/tucao-dingtalk-webhook"
	            };
	            $.ajax({
	                url: this.props.product,
	                method: "POST",
	                data: data
	            }).done(function (result, textStatus, jqXHR) {
	                _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: _this3.props.product }));
	            }).fail(function (error) {
	                console.log("count failed ", error);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;
	
	            return React.createElement(
	                'simpread-feedback',
	                { ref: 'target', 'class': 'active' },
	                this.state.rate == false ? React.createElement(
	                    'sr-block',
	                    { style: { 'width': '100%' } },
	                    React.createElement(
	                        'sr-fb-head',
	                        null,
	                        React.createElement(
	                            'sr-fb-label',
	                            null,
	                            '\u6709\u4E86\u4F60\u4EEC\u7684\u5E2E\u52A9\u7B80\u60A6\u624D\u4F1A\u53D8\u5F97\u66F4\u597D \uD83D\uDE4F'
	                        )
	                    ),
	                    React.createElement(
	                        'sr-fb-content',
	                        null,
	                        React.createElement(
	                            'sr-fb-label',
	                            null,
	                            '\u63D0\u4EA4\u7684\u7AD9\u70B9\uFF0C\u9ED8\u8BA4\u4E3A\u5F53\u524D\u9875\u9762\u7684\u5730\u5740\uFF0C\u53EF\u4E3A\u7A7A'
	                        ),
	                        React.createElement(_textfield2.default, { multi: false, value: this.props.url, onChange: function onChange(e) {
	                                return _this4.onURLChange(e);
	                            } })
	                    ),
	                    React.createElement(
	                        'sr-fb-content',
	                        null,
	                        React.createElement(
	                            'sr-fb-label',
	                            null,
	                            '\u652F\u6301\u4E24\u79CD\u63D0\u4EA4\u65B9\u5F0F'
	                        ),
	                        React.createElement(
	                            'span',
	                            { style: { 'display': 'flex' } },
	                            React.createElement(_button2.default, {
	                                text: '\u6709 Github Issues \u5E10\u53F7', type: 'raised', waves: 'md-waves-effect',
	                                color: '#fff', backgroundColor: '#2196F3', width: '50%', style: { 'margin-left': '0', 'font-weight': 'bold' },
	                                tooltip: { text: "如果有 Github 帐号，请首选此方式" }, onClick: function onClick() {
	                                    return _this4.onChangeMode("github");
	                                } }),
	                            React.createElement(_button2.default, {
	                                text: '\u65E0 Github Issues \u5E10\u53F7', type: 'raised', mode: 'secondary', waves: 'md-waves-effect',
	                                color: '#fff', backgroundColor: '#757575', width: '50%', style: { 'margin-right': '0', 'font-weight': 'bold' },
	                                tooltip: { text: "腾讯旗下的一款用户反馈收集系统，无需注册" }, onClick: function onClick() {
	                                    return _this4.onChangeMode("tucao");
	                                } })
	                        )
	                    ),
	                    this.state.mode == "tucao" && React.createElement(
	                        'sr-fb-content',
	                        null,
	                        React.createElement(
	                            'sr-fb-content',
	                            null,
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.anonymous,
	                                thumbedColor: '#2163f7', trackedColor: '#6699FF', waves: 'md-waves-effect',
	                                label: '\u652F\u6301\u533F\u540D\u63D0\u4EA4\uFF0C\u4F46\u5EFA\u8BAE\u4E0D\u8981\u52FE\u9009\u6B64\u9879',
	                                onChange: function onChange(v) {
	                                    return _this4.onAnonymousChange(v);
	                                } })
	                        ),
	                        React.createElement(
	                            'sr-fb-content',
	                            null,
	                            React.createElement(
	                                'sr-fb-label',
	                                null,
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '\u5410\u4E2A\u69FD'
	                                ),
	                                ' \u662F\u817E\u8BAF\u65D7\u4E0B\u7684\u4E00\u6B3E\u7528\u6237\u53CD\u9988\u6536\u96C6\u7CFB\u7EDF\uFF0C\u5177\u6709\u5982\u4E0B\u7279\u70B9\uFF1A'
	                            ),
	                            React.createElement(
	                                'sr-fb-label',
	                                null,
	                                '\xB7 \u65E0\u9700\u6CE8\u518C\uFF0C\u70B9\u51FB\u540E\u4F1A\u81EA\u52A8\u4F7F\u7528\u7B80\u60A6\u7684\u6CE8\u518C\u7CFB\u7EDF'
	                            ),
	                            React.createElement(
	                                'sr-fb-label',
	                                null,
	                                '\xB7 \u5982\u9700\u5B9E\u65F6\u6536\u5230\u53CD\u9988\uFF0C\u8BF7\u6839\u636E\u63D0\u793A\u5173\u6CE8\uFF08\u817E\u8BAF\u5B98\u65B9\uFF09\u5FAE\u4FE1\u53F7'
	                            ),
	                            React.createElement(
	                                'sr-fb-label',
	                                null,
	                                '\xB7 \u4F60\u7684\u63D0\u4EA4\u5185\u5BB9\uFF0C\u4ED6\u4EBA\u65E0\u6CD5\u770B\u5230'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'sr-fb-content',
	                        null,
	                        React.createElement(
	                            'sr-fb-label',
	                            null,
	                            React.createElement(
	                                'b',
	                                null,
	                                '\u65B9\u4FBF\u7684\u8BDD\uFF0C\u8BF7\u5E2E\u52A9\u7B80\u60A6\uFF0C\u4F7F\u5176\u53D8\u5F97\u66F4\u597D \uD83D\uDC49 ',
	                                React.createElement(
	                                    'sr-fb-a',
	                                    { onClick: function onClick() {
	                                            return window.open('https://wj.qq.com/s2/3611463/7260/', '_blank');
	                                        } },
	                                    '\u8C03\u67E5\u95EE\u5377'
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'sr-fb-footer',
	                        null,
	                        React.createElement(_button2.default, { text: '\u8BC4\u4E2A\u5206', color: '#FF5252', waves: 'md-waves-effect', style: { 'font-weight': 'bold' }, onClick: function onClick() {
	                                return _this4.setState({ rate: true });
	                            } }),
	                        React.createElement(_button2.default, { text: '\u53D6 \u6D88', mode: 'secondary', color: '#333', waves: 'md-waves-effect', onClick: function onClick() {
	                                return _this4.onClose();
	                            } }),
	                        React.createElement(_button2.default, { text: '\u63D0 \u4EA4', waves: 'md-waves-effect', color: '#2163f7', style: { 'font-weight': 'bold' }, onClick: function onClick() {
	                                return _this4.onSubmitClick();
	                            } })
	                    )
	                ) : React.createElement(
	                    'sr-block',
	                    { style: { 'width': '100%' } },
	                    React.createElement(
	                        'sr-close',
	                        { onClick: function onClick() {
	                                return _this4.onClose();
	                            } },
	                        React.createElement(
	                            'svg',
	                            { viewBox: '0 0 1024 1024', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24' },
	                            React.createElement('path', { d: 'M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z', fill: '#E3E3E3' })
	                        )
	                    ),
	                    React.createElement(
	                        'sr-emojis',
	                        null,
	                        React.createElement(
	                            'sr-emoji',
	                            { ref: 'emoji' },
	                            React.createElement(
	                                'svg',
	                                { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
	                                React.createElement('circle', { cx: '256', cy: '256', r: '256', fill: '#ffd93b' }),
	                                React.createElement('path', { d: 'M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z', fill: '#f4c534' }),
	                                React.createElement('ellipse', { transform: 'scale(-1) rotate(31.21 715.433 -595.455)', cx: '166.318', cy: '199.829', rx: '56.146', ry: '56.13', fill: '#fff' }),
	                                React.createElement('ellipse', { transform: 'rotate(-148.804 180.87 175.82)', cx: '180.871', cy: '175.822', rx: '28.048', ry: '28.08', fill: '#3e4347' }),
	                                React.createElement('ellipse', { transform: 'rotate(-113.778 194.434 165.995)', cx: '194.433', cy: '165.993', rx: '8.016', ry: '5.296', fill: '#5a5f63' }),
	                                React.createElement('ellipse', { transform: 'scale(-1) rotate(31.21 715.397 -1237.664)', cx: '345.695', cy: '199.819', rx: '56.146', ry: '56.13', fill: '#fff' }),
	                                React.createElement('ellipse', { transform: 'rotate(-148.804 360.25 175.837)', cx: '360.252', cy: '175.84', rx: '28.048', ry: '28.08', fill: '#3e4347' }),
	                                React.createElement('ellipse', { transform: 'scale(-1) rotate(66.227 254.508 -573.138)', cx: '373.794', cy: '165.987', rx: '8.016', ry: '5.296', fill: '#5a5f63' }),
	                                React.createElement('path', { d: 'M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z', fill: '#3e4347' })
	                            ),
	                            React.createElement(
	                                'svg',
	                                { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
	                                React.createElement('circle', { cx: '256', cy: '256', r: '256', fill: '#ffd93b' }),
	                                React.createElement('path', { d: 'M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z', fill: '#f4c534' }),
	                                React.createElement('path', { d: 'M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z', fill: '#3e4347' }),
	                                React.createElement('path', { d: 'M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z', fill: '#f4c534' }),
	                                React.createElement('path', { d: 'M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z', fill: '#fff' }),
	                                React.createElement('path', { d: 'M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z', fill: '#3e4347' }),
	                                React.createElement('path', { d: 'M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z', fill: '#fff' }),
	                                React.createElement('path', { d: 'M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z', fill: '#f4c534' }),
	                                React.createElement('path', { d: 'M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z', fill: '#fff' }),
	                                React.createElement('path', { d: 'M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z', fill: '#3e4347' }),
	                                React.createElement('path', { d: 'M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z', fill: '#fff' })
	                            ),
	                            React.createElement(
	                                'svg',
	                                { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
	                                React.createElement('circle', { cx: '256', cy: '256', r: '256', fill: '#ffd93b' }),
	                                React.createElement('path', { d: 'M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z', fill: '#f4c534' }),
	                                React.createElement('path', { d: 'M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z', fill: '#3e4347' }),
	                                React.createElement('path', { d: 'M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z', fill: '#fff' }),
	                                React.createElement('circle', { cx: '340', cy: '260.4', r: '36.2', fill: '#3e4347' }),
	                                React.createElement(
	                                    'g',
	                                    { fill: '#fff' },
	                                    React.createElement('ellipse', { transform: 'rotate(-135 326.4 246.6)', cx: '326.4', cy: '246.6', rx: '6.5', ry: '10' }),
	                                    React.createElement('path', { d: 'M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z' })
	                                ),
	                                React.createElement('circle', { cx: '168.5', cy: '260.4', r: '36.2', fill: '#3e4347' }),
	                                React.createElement('ellipse', { transform: 'rotate(-135 182.1 246.7)', cx: '182.1', cy: '246.7', rx: '10', ry: '6.5', fill: '#fff' })
	                            ),
	                            React.createElement(
	                                'svg',
	                                { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
	                                React.createElement('circle', { cx: '256', cy: '256', r: '256', fill: '#ffd93b' }),
	                                React.createElement('path', { d: 'M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z', fill: '#3e4347' }),
	                                React.createElement('path', { d: 'M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z', fill: '#f4c534' }),
	                                React.createElement(
	                                    'g',
	                                    { fill: '#fff' },
	                                    React.createElement('path', { d: 'M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z' }),
	                                    React.createElement('ellipse', { cx: '356.4', cy: '205.3', rx: '81.1', ry: '81' })
	                                ),
	                                React.createElement('ellipse', { cx: '356.4', cy: '205.3', rx: '44.2', ry: '44.2', fill: '#3e4347' }),
	                                React.createElement(
	                                    'g',
	                                    { fill: '#fff' },
	                                    React.createElement('ellipse', { transform: 'scale(-1) rotate(45 454 -906)', cx: '375.3', cy: '188.1', rx: '12', ry: '8.1' }),
	                                    React.createElement('ellipse', { cx: '155.6', cy: '205.3', rx: '81.1', ry: '81' })
	                                ),
	                                React.createElement('ellipse', { cx: '155.6', cy: '205.3', rx: '44.2', ry: '44.2', fill: '#3e4347' }),
	                                React.createElement('ellipse', { transform: 'scale(-1) rotate(45 454 -421.3)', cx: '174.5', cy: '188', rx: '12', ry: '8.1', fill: '#fff' })
	                            ),
	                            React.createElement(
	                                'svg',
	                                { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
	                                React.createElement('circle', { cx: '256', cy: '256', r: '256', fill: '#ffd93b' }),
	                                React.createElement('path', { d: 'M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z', fill: '#f4c534' }),
	                                React.createElement('path', { d: 'M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z', fill: '#e24b4b' }),
	                                React.createElement('path', { d: 'M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z', fill: '#d03f3f' }),
	                                React.createElement('path', { d: 'M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z', fill: '#fff' }),
	                                React.createElement('path', { d: 'M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z', fill: '#e24b4b' }),
	                                React.createElement('path', { d: 'M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z', fill: '#d03f3f' }),
	                                React.createElement('path', { d: 'M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z', fill: '#fff' }),
	                                React.createElement('path', { d: 'M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z', fill: '#3e4347' }),
	                                React.createElement('path', { d: 'M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z', fill: '#e24b4b' })
	                            ),
	                            React.createElement(
	                                'svg',
	                                { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
	                                React.createElement(
	                                    'g',
	                                    { fill: '#ffd93b' },
	                                    React.createElement('circle', { cx: '256', cy: '256', r: '256' }),
	                                    React.createElement('path', { d: 'M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z' })
	                                ),
	                                React.createElement('path', { d: 'M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z', fill: '#e9eff4' }),
	                                React.createElement('path', { d: 'M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z', fill: '#45cbea' }),
	                                React.createElement('path', { d: 'M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z', fill: '#e84d88' }),
	                                React.createElement(
	                                    'g',
	                                    { fill: '#38c0dc' },
	                                    React.createElement('path', { d: 'M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z' })
	                                ),
	                                React.createElement(
	                                    'g',
	                                    { fill: '#d23f77' },
	                                    React.createElement('path', { d: 'M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z' })
	                                ),
	                                React.createElement('path', { d: 'M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z', fill: '#3e4347' }),
	                                React.createElement('path', { d: 'M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z', fill: '#e24b4b' }),
	                                React.createElement('path', { d: 'M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z', fill: '#fff', opacity: '.2' })
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'sr-stars',
	                        { ref: 'stars' },
	                        React.createElement('i', { 'data-balloon-pos': 'up', 'aria-label': '\u5410\u4E2A\u69FD \uD83D\uDE21', onMouseEnter: function onMouseEnter() {
	                                return _this4.onStarHover(1);
	                            }, onClick: function onClick() {
	                                return _this4.onStarClick(1);
	                            }, dangerouslySetInnerHTML: { __html: this.props.star } }),
	                        React.createElement('i', { 'data-balloon-pos': 'up', 'aria-label': '\u4E00\u822C\u822C \uD83D\uDC94', onMouseEnter: function onMouseEnter() {
	                                return _this4.onStarHover(2);
	                            }, onClick: function onClick() {
	                                return _this4.onStarClick(2);
	                            }, dangerouslySetInnerHTML: { __html: this.props.star } }),
	                        React.createElement('i', { 'data-balloon-pos': 'up', 'aria-label': '\u8FD8\u4E0D\u9519 \uD83D\uDE01', onMouseEnter: function onMouseEnter() {
	                                return _this4.onStarHover(3);
	                            }, onClick: function onClick() {
	                                return _this4.onStarClick(3);
	                            }, dangerouslySetInnerHTML: { __html: this.props.star } }),
	                        React.createElement('i', { 'data-balloon-pos': 'up', 'aria-label': '\u6211\u559C\u6B22 \uD83D\uDE18', onMouseEnter: function onMouseEnter() {
	                                return _this4.onStarHover(4);
	                            }, onClick: function onClick() {
	                                return _this4.onStarClick(4);
	                            }, dangerouslySetInnerHTML: { __html: this.props.star } }),
	                        React.createElement('i', { 'data-balloon-pos': 'up', 'aria-label': '\u68D2\u68D2\u54D2 \uD83D\uDC4D', onMouseEnter: function onMouseEnter() {
	                                return _this4.onStarHover(5);
	                            }, onClick: function onClick() {
	                                return _this4.onStarClick(5);
	                            }, dangerouslySetInnerHTML: { __html: this.props.star } })
	                    ),
	                    React.createElement(
	                        'sr-stars-footer',
	                        null,
	                        this.state.stars == 0 && React.createElement(_button2.default, { text: '\u6295\u4E2A\u7968\uFF0C\u6709\u4F60\u7684\u53C2\u4E0E\u7B80\u60A6\u624D\u80FD\u53D8\u5F97\u66F4\u7F8E\u597D', waves: 'md-waves-effect', color: '#2163f7', style: { 'font-weight': 'bold' } }),
	                        this.state.stars > 0 && this.state.stars < 4 && React.createElement(_button2.default, { text: '\u5410\u4E2A\u69FD\uFF1F', waves: 'md-waves-effect', color: '#FF5252', style: { 'font-weight': 'bold' }, onClick: function onClick() {
	                                return _this4.onRateClick();
	                            } }),
	                        this.state.stars > 3 && React.createElement(_button2.default, { color: '#fff', backgroundColor: '#2196F3', text: '\u8C22\u8C22\uFF0C\u65B9\u4FBF\u8BF7\u524D\u5F80 Chrome \u5E94\u7528\u5546\u5E97\u6295\u7968 \uD83D\uDC49', waves: 'md-waves-effect', style: { 'font-weight': 'bold' }, onClick: function onClick() {
	                                return _this4.onRateClick();
	                            } })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Feedback;
	}(React.Component);
	
	/**
	 * 
	 * @param {string} storage.version
	 * @param {object} storage.user
	 * @param {boolen} rate, true: show rating; false: show feedback
	 */
	
	
	Feedback.defaultProps = {
	    user: {},
	    url: "",
	    version: "",
	    anonymous: false,
	    rate: false,
	    product: "https://support.qq.com/product/" + 117464,
	    star: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path d="M512 837.12L255.6928 950.0672c-14.336 6.3488-31.1296-0.2048-37.4784-14.5408-1.9456-4.5056-2.7648-9.4208-2.2528-14.336l28.16-278.6304-186.5728-208.896c-10.4448-11.6736-9.4208-29.696 2.2528-40.1408 3.6864-3.2768 8.0896-5.5296 12.9024-6.5536L346.5216 327.68 487.424 85.7088c7.8848-13.6192 25.2928-18.1248 38.912-10.24 4.3008 2.4576 7.7824 6.0416 10.24 10.24L677.4784 327.68l273.7152 59.2896c15.36 3.2768 25.088 18.432 21.8112 33.792-1.024 4.8128-3.2768 9.216-6.5536 12.9024l-186.6752 208.896L807.936 921.1904c1.536 15.6672-9.8304 29.5936-25.3952 31.1296-4.9152 0.512-9.8304-0.3072-14.336-2.2528L512 837.12z" fill="#E3E3E3"></path></svg>',
	    stared: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path d="M512 837.12L255.6928 950.0672c-14.336 6.3488-31.1296-0.2048-37.4784-14.5408-1.9456-4.5056-2.7648-9.4208-2.2528-14.336l28.16-278.6304-186.5728-208.896c-10.4448-11.6736-9.4208-29.696 2.2528-40.1408 3.6864-3.2768 8.0896-5.5296 12.9024-6.5536L346.5216 327.68 487.424 85.7088c7.8848-13.6192 25.2928-18.1248 38.912-10.24 4.3008 2.4576 7.7824 6.0416 10.24 10.24L677.4784 327.68l273.7152 59.2896c15.36 3.2768 25.088 18.432 21.8112 33.792-1.024 4.8128-3.2768 9.216-6.5536 12.9024l-186.6752 208.896L807.936 921.1904c1.536 15.6672-9.8304 29.5936-25.3952 31.1296-4.9152 0.512-9.8304-0.3072-14.336-2.2528L512 837.12z" fill="#FFB82F"</path></svg>'
	};
	Feedback.propType = {
	    user: React.PropTypes.object,
	    url: React.PropTypes.string,
	    version: React.PropTypes.string,
	    anonymous: React.PropTypes.bool,
	    rate: React.PropTypes.bool,
	    product: React.PropTypes.string
	};
	function Render(version, user) {
	    var rate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	    if ($("simpread-feedback").length > 0) return;
	    $("html").append('<div class="simpread-feedback"></div>');
	    ReactDOM.render(React.createElement(Feedback, { version: version, user: user, url: location.href, rate: rate }), $(".simpread-feedback")[0]);
	}
	
	exports.Render = Render;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(514)))

/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*!
	 * React Material Design: Switch
	 * 
	 * @version : 0.0.3
	 * @update  : 2018/04/26
	 * @homepage: https://github.com/kenshin/mduikit
	 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
	 * @author  : Kenshin Wang <kenshin@ksria.com>
	 * 
	 * @copyright 2017
	 */
	
	console.log("==== simpread component: Switch ====");
	
	var color = "rgba(51, 51, 51, .87)",
	    secondary_color = "rgba(204, 204, 204, 1)",
	    thumb_color = "rgba(245, 245, 245, 1)",
	    thumbed_color = "rgba(0, 137, 123, 1)",
	    track_color = "rgba(189, 189, 189, 1)",
	    tracked_color = "rgba(0, 137, 123, .5)";
	
	var cssinjs = function cssinjs() {
	
	    var styles = {
	        hidden: 'none',
	        root: {
	            display: 'flex',
	            alignItems: 'center',
	            position: 'relative',
	
	            width: '100%',
	            height: '37px',
	
	            margin: '8px 0 0 0',
	            padding: 0,
	
	            overflow: 'visible'
	        },
	
	        large_height: "46px",
	
	        enable: {
	            color: color,
	            cursor: 'pointer'
	        },
	
	        disable: {
	            color: secondary_color,
	            cursor: 'not-allowed'
	        },
	
	        label: {
	            display: 'block',
	            width: '100%',
	
	            fontFamily: 'sans-serif',
	            fontSize: '14px',
	            fontWeight: 400,
	
	            userSelect: 'none',
	            pointerEvents: 'none'
	        },
	
	        label_after: {
	            textAlign: 'right',
	            order: 2
	        },
	
	        label_before: {
	            textAlign: 'left',
	            order: -1
	        },
	
	        range: {
	            display: 'block',
	            position: 'relative',
	            float: 'left',
	            flexShrink: 0,
	
	            width: '36px',
	
	            margin: '0 0 0 8px',
	            padding: '4px 0px 6px 2px',
	
	            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        thumb: {},
	
	        thumb_normal: {
	            display: 'block',
	            position: 'absolute',
	            top: '1px',
	            left: '0px',
	
	            width: '20px',
	            height: '20px',
	            color: color,
	            backgroundColor: thumb_color,
	
	            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
	            boxSizing: 'border-box',
	            borderRadius: '50%',
	
	            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        thumbed: {
	            left: '100%',
	            marginLeft: '-20px',
	            backgroundColor: thumbed_color
	        },
	
	        thumb_disable: {
	            left: 0,
	            marginLeft: 0,
	            backgroundColor: secondary_color
	        },
	
	        track: {},
	
	        track_normal: {
	            display: 'block',
	            width: '100%',
	            height: '14px',
	
	            borderRadius: '30px',
	            backgroundColor: track_color,
	
	            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        tracked: {
	            backgroundColor: tracked_color
	        },
	
	        content: {
	            display: 'flex',
	            flexDirection: 'column',
	            alignItems: 'flex-start',
	            width: '100%'
	        },
	
	        subtitle: {
	            display: '-webkit-box',
	            flexShrink: 2,
	
	            WebkitLineClamp: 1,
	            '-webkit-box-orient': 'vertical',
	
	            overflow: 'hidden',
	            textOverflow: 'ellipsis',
	            textAlign: 'left',
	
	            color: "rgba( 51, 51, 51, .54 )"
	        }
	
	    };
	
	    return styles;
	};
	
	/**
	 * Custom component: Switich
	 * 
	 * Reference:
	 * - https://material.io/guidelines/components/selection-controls.html
	 * - http://www.material-ui.com/#/components/toggle
	 * 
	 * @class
	 */
	
	var Switch = function (_React$Component) {
	    _inherits(Switch, _React$Component);
	
	    function Switch() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Switch);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            checked: _this.props.checked
	        }, _this.style = cssinjs(), _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Switch, [{
	        key: "onClick",
	        value: function onClick() {
	            !this.props.disable && this.setState({
	                checked: !this.state.checked
	            });
	            !this.props.disable && this.props.onChange && this.props.onChange(!this.state.checked);
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ checked: nextProps.checked });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            var style = _extends({}, this.style);
	
	            this.props.thumbColor && (style.thumb_normal.backgroundColor = this.props.thumbColor);
	            this.props.thumbedColor && (style.thumbed.backgroundColor = this.props.thumbedColor);
	            this.props.trackColor && (style.track_normal.backgroundColor = this.props.trackColor);
	            this.props.trackedColor && (style.tracked.backgroundColor = this.props.trackedColor);
	
	            if (this.state.checked) {
	                style.thumb = _extends({}, style.thumb_normal, style.thumbed);
	                style.track = _extends({}, style.track_normal, style.tracked);
	            } else {
	                style.thumb = _extends({}, style.thumb_normal);
	                style.track = _extends({}, style.track_normal);
	            }
	
	            if (this.props.disable) {
	                style.root = _extends({}, style.root, style.disable);
	                style.thumb = _extends({}, style.thumb, style.thumb_disable);
	                style.track = _extends({}, style.track_normal);
	            } else {
	                style.root = _extends({}, style.root, style.enable);
	            }
	
	            style.label = this.props.order == "before" ? _extends({}, style.label, style.label_before) : _extends({}, style.label, style.label_after);
	
	            this.props.label == "" && (style.label.display = style.hidden);
	            this.props.width && (style.root.width = this.props.width);
	            this.props.desc && (style.root.height = style.root.large_height);
	
	            var tooltip = this.props.tooltip;
	
	            return React.createElement(
	                "switch",
	                { style: style.root,
	                    "data-tooltip": tooltip.text ? tooltip.text : this.props[tooltip.target], "data-tooltip-position": tooltip.position, "data-tooltip-delay": tooltip.delay,
	                    onClick: function onClick() {
	                        return _this2.onClick();
	                    } },
	                React.createElement(
	                    "content",
	                    { style: style.content },
	                    React.createElement(
	                        "span",
	                        { style: style.label },
	                        this.props.label
	                    ),
	                    React.createElement(
	                        "subtitle",
	                        { style: style.subtitle },
	                        this.props.desc
	                    )
	                ),
	                React.createElement(
	                    "switch-rang",
	                    { style: style.range },
	                    React.createElement("thumb", { style: style.thumb, className: this.props.waves }),
	                    React.createElement("track", { style: style.track })
	                )
	            );
	        }
	    }]);
	
	    return Switch;
	}(React.Component);
	
	Switch.defaultProps = {
	    checked: false,
	    disable: false,
	    width: undefined,
	    label: "",
	    order: "before",
	    thumbColor: undefined,
	    thumbedColor: undefined,
	    trackColor: undefined,
	    trackedColor: undefined,
	    desc: "",
	    waves: "",
	    tooltip: ""
	};
	Switch.propTypes = {
	    checked: React.PropTypes.bool,
	    disable: React.PropTypes.bool,
	    width: React.PropTypes.string,
	    label: React.PropTypes.string,
	    order: React.PropTypes.string,
	    thumbColor: React.PropTypes.string,
	    thumbedColor: React.PropTypes.string,
	    trackColor: React.PropTypes.string,
	    trackedColor: React.PropTypes.string,
	    desc: React.PropTypes.string,
	    waves: React.PropTypes.string,
	    tooltip: React.PropTypes.string,
	    onChange: React.PropTypes.func
	};
	exports.default = Switch;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*!
	 * React Material Design: Dropdown
	 * 
	 * @version : 0.0.3
	 * @update  : 2018/06/27
	 * @homepage: https://github.com/kenshin/mduikit
	 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
	 * @author  : Kenshin Wang <kenshin@ksria.com>
	 * 
	 * @copyright 2018
	 */
	
	console.log("==== simpread component: Dropdown ====");
	
	var color = 'rgba(51, 51, 51, .87)',
	    secondary_color = 'rgba(204, 204, 204, 1)',
	    focus_color = 'rgba(0, 137, 123, .8)',
	    border_color = 'rgba(224, 224, 224, 1)',
	    error_color = 'rgba(244, 67, 54, 1)',
	    selected_color = 'rgba(255, 64, 129, 1)',
	    hover_color = 'rgba(238, 238, 238, 1)',
	    background_color = 'rgba(255, 255, 255, 1)';
	
	var cssinjs = function cssinjs() {
	
	    var display = 'block',
	        width = '100px',
	        margin = '8px 0 0 0',
	        medium = '14px',
	        large = '16px',
	        lineHeight = 1.5,
	        fontWeight = 'bold',
	        styles = {
	        hidden: 'none',
	        root: {},
	        root_normal: {
	            position: 'relative',
	
	            display: 'flex',
	            alignItems: 'center',
	
	            margin: 0,
	            padding: 0,
	
	            height: '36px',
	            width: width,
	            lineHeight: 1,
	
	            cursor: 'pointer',
	            userSelect: 'none'
	        },
	
	        disable: {
	            color: secondary_color,
	            cursor: 'not-allowed'
	        },
	
	        text: {
	            display: display,
	
	            margin: 0,
	            padding: "8px 24px 8px 0",
	
	            width: '100%',
	            textAlign: 'left'
	        },
	
	        icon: {
	            display: 'block',
	            position: 'absolute',
	
	            width: '24px',
	            height: '24px',
	
	            top: '6px',
	            right: 0,
	
	            border: 'none',
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat',
	            backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAABqSURBVEiJ7dQxCsAgDIXhZ8ktgmetVw31GIF06lI0yeIWJyH4f4hgMzOcXNfRegEFFAAAoGA+ROR2A0STmftu7t5ARAYRTS+uqtt4CACAqvYVkomngBWSjQPxG/yR59tnz7X6rgso4DzwAnJQKlbAmFdgAAAAAElFTkSuQmCC)'
	        },
	
	        bg: {
	            display: 'none',
	            position: 'fixed',
	
	            top: 0,
	            left: 0,
	
	            width: '100%',
	            height: '100%'
	        }
	
	    };
	
	    return styles;
	};
	
	var cssinjs_list = function cssinjs_list() {
	
	    var styles = {
	        hidden: 'none',
	        root: {},
	        root_normal: {
	            display: 'block',
	            position: 'absolute',
	
	            top: 0,
	            left: 0,
	
	            margin: 0,
	            padding: 0,
	
	            width: '100%',
	            maxHeight: '400px',
	
	            color: color,
	            backgroundColor: background_color,
	
	            boxSizing: 'border-box',
	            boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
	            borderRadius: '2px',
	
	            zIndex: 2100,
	
	            overflowY: 'auto',
	
	            opacity: 0,
	            transform: 'scaleY(0)',
	            transformOrigin: 'left top 0px',
	            transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        open: {
	            opacity: 1,
	            transform: 'scaleY(1)'
	        },
	
	        list_filed: {
	            display: 'flex',
	            alignItems: 'center',
	
	            padding: '8px 24px 8px 16px',
	
	            height: '36px',
	            width: '100%',
	
	            textAlign: 'left',
	
	            boxSizing: 'border-box',
	            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        list_filed_icon: {
	            display: 'block',
	
	            width: '18px',
	            height: '18px',
	
	            margin: '0 10px 0 0',
	            padding: '10px',
	
	            border: 'none',
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat'
	        },
	
	        list_filed_value: {
	            display: 'inline',
	            width: '100%',
	            fontSize: 'inherit'
	        },
	
	        list_filed_info: {
	            display: 'inline',
	            padding: '0 0 0 16px',
	
	            fontSize: '13px',
	            textAlign: 'right',
	
	            minWidth: '100px'
	        }
	
	    };
	
	    return styles;
	};
	
	var ListView = function (_React$Component) {
	    _inherits(ListView, _React$Component);
	
	    function ListView() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, ListView);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListView.__proto__ || Object.getPrototypeOf(ListView)).call.apply(_ref, [this].concat(args))), _this), _this.style = cssinjs_list(), _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(ListView, [{
	        key: 'onMouseOver',
	        value: function onMouseOver(event) {
	            var $target = $(event.target);
	            if ($target.is("list-field")) {
	                $("list-field[active=true]").css("background-color", "transparent").attr("active", false);
	                $target.attr("active", true).css("background-color", hover_color);
	            }
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(event) {
	            var _this2 = this;
	
	            var $target = $(event.target);
	            while (!$target.is("list-field")) {
	                $target = $target.parent();
	            }
	            setTimeout(function () {
	                return _this2.props.onChange && _this2.props.onChange($target.find("list-field-name").attr("value"), $target.find("list-field-name").text());
	            }, 130);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            var style = _extends({}, this.style);
	            style.root = this.props.items.length > 0 ? _extends({}, style.root_normal, style.open) : _extends({}, style.root_normal);
	
	            var list = this.props.items.map(function (item, idx) {
	                var name_style = _extends({}, style.list_filed_value),
	                    icon_style = _extends({}, style.list_filed_icon);
	
	                if (item.icon && item.icon != "") {
	                    icon_style.backgroundImage = 'url(' + item.icon + ')';
	                } else {
	                    icon_style.display = style.hidden;
	                }
	                item.name == _this3.props.active && (name_style.color = selected_color);
	                item.style && item.style.root && (style.list_filed = _extends({}, style.list_filed, item.style.root));
	                item.style && item.style.icon && (icon_style = _extends({}, icon_style, item.style.icon));
	                item.style && item.style.text && (name_style = _extends({}, name_style, item.style.text));
	                return React.createElement(
	                    'list-field',
	                    { 'class': _this3.props.waves, style: style.list_filed, onMouseOver: function onMouseOver(e) {
	                            return _this3.onMouseOver(e);
	                        }, onClick: function onClick(e) {
	                            return _this3.onClick(e);
	                        } },
	                    React.createElement('i', { style: icon_style }),
	                    React.createElement(
	                        'list-field-name',
	                        { style: name_style, value: item.value },
	                        item.name
	                    )
	                );
	            });
	
	            return React.createElement(
	                'list-view',
	                { style: style.root },
	                list
	            );
	        }
	    }]);
	
	    return ListView;
	}(React.Component);
	
	/**
	 * Custom component: Dropdown
	 * 
	 * Reference: 
	 * - https://aboutme.google.com/u/0/?referer=gplus
	 * - https://plus.google.com/settings
	 * 
	 * @class
	 */
	
	
	ListView.defaultProps = {
	    waves: "",
	    items: [],
	    active: ""
	};
	ListView.propTypes = {
	    waves: React.PropTypes.string,
	    items: React.PropTypes.array,
	    active: React.PropTypes.string,
	    onChange: React.PropTypes.func
	};
	
	var Dropdown = function (_React$Component2) {
	    _inherits(Dropdown, _React$Component2);
	
	    function Dropdown() {
	        var _ref2;
	
	        var _temp2, _this4, _ret2;
	
	        _classCallCheck(this, Dropdown);
	
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }
	
	        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref2 = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref2, [this].concat(args))), _this4), _this4.state = {
	            name: _this4.props.name
	        }, _this4.style = cssinjs(), _temp2), _possibleConstructorReturn(_this4, _ret2);
	    }
	
	    _createClass(Dropdown, [{
	        key: 'onClick',
	        value: function onClick() {
	            !this.props.disable && this.props.items.length > 0 && this.setState({ items: this.props.items });
	            !this.props.disable && this.props.items.length > 0 && $(this.refs.bg).css("display", "block");
	        }
	    }, {
	        key: 'bgOnClick',
	        value: function bgOnClick() {
	            $(this.refs.bg).css("display", "none");
	            this.setState({ items: [] });
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(value, name) {
	            this.props.onChange && this.props.onChange(value, name);
	            this.setState({
	                items: [],
	                name: name
	            });
	            $(this.refs.bg).css("display", "none");
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this5 = this;
	
	            var maxwidth = function maxwidth(items) {
	                items.sort(function (a, b) {
	                    return b.name.length - a.name.length;
	                });
	                return items[0].name.length * 12;
	            },
	                style = _extends({}, this.style);
	
	            style.root = this.props.disable ? _extends({}, style.root_normal, style.disable) : _extends({}, style.root_normal);
	            this.props.disable && (style.border = _extends({}, style.border, style.border_disable));
	
	            if (!this.props.width) {
	                var max = maxwidth(this.props.items) + 40;
	                max >= 100 && (style.root.width = max + 'px');
	            } else style.root.width = this.props.width;
	
	            return React.createElement(
	                'dropdown',
	                { style: style.root },
	                React.createElement(
	                    'span',
	                    { style: style.text, onClick: function onClick() {
	                            return _this5.onClick();
	                        } },
	                    this.state.name == "" ? this.props.name : this.state.name
	                ),
	                React.createElement('icon', { style: style.icon }),
	                React.createElement(ListView, { waves: this.props.waves, active: this.state.name, items: this.state.items, onChange: function onChange(v, n) {
	                        return _this5.onChange(v, n);
	                    } }),
	                React.createElement('list-bg', { ref: 'bg', style: style.bg, onClick: function onClick() {
	                        return _this5.bgOnClick();
	                    } })
	            );
	        }
	    }]);
	
	    return Dropdown;
	}(React.Component);
	
	Dropdown.defaultProps = {
	    name: "",
	    disable: false,
	    width: undefined,
	    items: [],
	    waves: ""
	};
	Dropdown.propTypes = {
	    name: React.PropTypes.string,
	    disable: React.PropTypes.bool,
	    width: React.PropTypes.string,
	    items: React.PropTypes.array,
	    waves: React.PropTypes.string,
	    onChange: React.PropTypes.func
	};
	exports.default = Dropdown;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 856:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(857);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_page.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_page.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\r\n * Options page style\r\n */\r\n\r\n* {\r\n    box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n    font: 300 16px/1.8 -apple-system, PingFang SC, Microsoft Yahei, Lantinghei SC, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;\r\n    font-size: 62.5%;\r\n\r\n    color: #333;\r\n    background: #fff;\r\n\r\n    text-rendering: optimizelegibility;\r\n    -webkit-text-size-adjust: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\nbody {\r\n    margin: 0;\r\n    padding: 0;\r\n\r\n    background-color: #fafafa;\r\n}\r\n\r\na {\r\n    color: #4285f4;\r\n    text-decoration: none;\r\n}\r\n\r\ninput, textarea {\r\n    font-family: Raleway, Menlo, \"Dank Mono\", Inconsolata, \"Operator Mono\", Consolas, \"Andale Mono WT\", \"Andale Mono\", \"Lucida Console\", \"Lucida Sans Typewriter\", \"DejaVu Sans Mono\", \"Bitstream Vera Sans Mono\", \"Liberation Mono\", \"Nimbus Mono L\", \"Courier New\", Courier, monospace!important;\r\n}\r\n\r\n.loadingbar {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    height: 100%;\r\n    width: 100%;\r\n\r\n    background-color: #fafafa;\r\n\r\n    z-index: 200;\r\n}\r\n\r\n.animated {\r\n    animation-duration: 1s;\r\n    animation-fill-mode: both;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n.heartBeat {\r\n    animation-name: heartBeat;\r\n    animation-duration: 1.3s;\r\n    animation-timing-function: ease-in-out;\r\n}\r\n\r\n@keyframes heartBeat {\r\n    0% {\r\n        transform: scale(1);\r\n    }\r\n\r\n    14% {\r\n        transform: scale(1.3);\r\n    }\r\n\r\n    28% {\r\n        transform: scale(1);\r\n    }\r\n\r\n    42% {\r\n        transform: scale(1.3);\r\n    }\r\n\r\n    70% {\r\n        transform: scale(1);\r\n    }\r\n}\r\n\r\n.topnav {\r\n    position: fixed;\r\n    z-index: 200;\r\n    left: 12px;\r\n    top: 12px;\r\n}\r\n\r\n.header {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    position: fixed;\r\n\r\n    top: 0;\r\n    left: 0;\r\n\r\n    width: 100%;\r\n    height: 65px;\r\n\r\n    background-color: black;\r\n\r\n    box-shadow: 0 2px 5px rgba(0, 0, 0, .26);\r\n\r\n    opacity: 0;\r\n    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\r\n\r\n    z-index: 1000;\r\n}\r\n\r\n.header .nav,\r\n.header .title {\r\n    margin-left: 12px;\r\n}\r\n\r\n.header .title {\r\n    color: #fff;\r\n\r\n    height: 48px;\r\n\r\n    font-size: 20px;\r\n    font-size: 2rem;\r\n    font-weight: 700;\r\n\r\n    line-height: 48px;\r\n}\r\n\r\n.top {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n\r\n    width: 100%;\r\n    height: 249px;\r\n\r\n    background-color: #2196f3;\r\n\r\n    overflow: hidden;\r\n\r\n    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\r\n}\r\n\r\n.main {\r\n    position: relative;\r\n\r\n    top: 200px;\r\n\r\n    margin: 0 auto;\r\n    margin-bottom: 24px;\r\n    padding: 0;\r\n\r\n    max-width: 835px;\r\n    width: 835px;\r\n\r\n    background-color: #fff;\r\n\r\n    text-align: center;\r\n\r\n    border-radius: 2px;\r\n    box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 2px rgba(0, 0, 0, .26);\r\n}\r\n\r\n.tabscontainer {\r\n    width: 100%;\r\n\r\n    color: inherit;\r\n}\r\n\r\n.tabscontainer section {\r\n    display: -webkit-flex;\r\n    -ms-flex-direction:column;\r\n        flex-direction:column;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    padding: 50px;\r\n\r\n    overflow-y: auto;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.bottom {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    margin: 80px auto 0;\r\n    padding: 200px 0 50px 0;\r\n\r\n    max-width: 835px;\r\n    width: 835px;\r\n\r\n    color: rgba(51, 51, 51, 0.7);\r\n    font-size: 13px;\r\n    font-size: 1.3rem;\r\n\r\n    opacity: 1;\r\n    transition: all .25s ease-out;\r\n}\r\n\r\n.welcome {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    position: fixed;\r\n    \r\n    top: 0;\r\n    left: 0;\r\n\r\n    width: 100%;\r\n    height: 100%;\r\n\r\n    background-color: rgba(51, 51, 51, .8);\r\n\r\n    z-index: 3;\r\n}\r\n\r\n.dividers {\r\n    margin: 10px 0;\r\n    width: 100%;\r\n    border-bottom: 1px solid rgba(0, 0, 0, .12);\r\n}\r\n\r\n/**\r\n *  Labs style\r\n */\r\n.lab {\r\n    /*margin-bottom: 20px;*/\r\n    padding: 10px;\r\n\r\n    width: 100%;\r\n\r\n    background-color: #fff;\r\n    border-radius: 2px;\r\n\r\n    box-shadow: 0 1px 3px rgba(0, 0, 0, .12);\r\n    /*border: 1.1px solid #e7e7e7;*/\r\n}\r\n\r\n.main_labs {\r\n    background: transparent;\r\n    box-shadow: none;\r\n}\r\n\r\n#labs .label {\r\n    height: 56px;\r\n    line-height: 56px;\r\n\r\n    color: #616161;\r\n    text-align: left;\r\n\r\n    font-size: 15px;\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n\r\n    /*border-bottom: 1px solid rgba(0, 0, 0, .12);*/\r\n}\r\n\r\n#labs .sublabel {\r\n    display: -webkit-box;\r\n    -ms-flex-negative: 1;\r\n        flex-shrink: 1;\r\n\r\n    -webkit-line-clamp: 1;\r\n\r\n    overflow: hidden;\r\n\r\n    text-overflow: ellipsis;\r\n    text-align: left;\r\n\r\n    color: rgba(51, 51, 51, .54);\r\n}\r\n\r\n#labs .more {\r\n    width: 100%;\r\n    /*height: 37px;*/\r\n\r\n    font-size: 14px;\r\n    font-size: 1.4rem;\r\n    font-weight: 400;\r\n\r\n    text-align: left;\r\n    /*line-height: 37px;*/\r\n\r\n    -webkit-user-select: none;\r\n\r\n       -moz-user-select: none;\r\n\r\n        -ms-user-select: none;\r\n\r\n            user-select: none;\r\n}\r\n\r\n#labs .more .desc {\r\n    color: #757575;\r\n    font-size: 10px;\r\n    font-size: 1rem;\r\n}\r\n\r\n#labs .more .arrow {\r\n    display: block;\r\n    position: absolute;\r\n\r\n    right: 22px;\r\n    bottom: 22px;\r\n\r\n    width: 24px;\r\n    height: 24px;\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEUAAAD////ExMS2tra/v7/Dw8O8vLzCwsK5ubnCwsK6urq+vr68vLy9vb29vb28vLy9vb29vb29vb29vb29vb29vb29vb29vb2+vr6+vr69vb29vb29vb2oiyseAAAAHHRSTlMAAQ0OEBETFRYZGkpMg8rLzM7R0tPW19je4uTlotOuxwAAAAFiS0dEAf8CLd4AAAB1SURBVCjPrdLHDoAgEATQUbH33vb/v1PEEnVXT85pM48QCAC/JhloC3AOJiO9wDms8UoZdN9KEHZUuAKEPeUuOGw9h0j36nqPHVi/g19RE9y3NoNenylwcGqqfQiANFMQwbIhAz/lB0z0yHg81Hzvp/jfj7AA4P8P+rUn4dEAAAAASUVORK5CYII=);\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n/**\r\n * Plugins & sites Card\r\n */\r\n\r\ncards {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-flow: row wrap;\r\n        flex-flow: row wrap;\r\n}\r\n\r\ncard {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n\r\n    margin: 6px;\r\n\r\n    width: 259px;\r\n\r\n    color: rgba(51, 51, 51, .87);\r\n    background-color: #fff;\r\n\r\n    border-radius: 2px;\r\n    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);\r\n\r\n    transition: all .25s ease-out;\r\n}\r\n\r\ncard:hover {\r\n    box-shadow: 0 10px 20px 0 rgba(168, 182, 191, .6);\r\n    transform: translateY(-1px);\r\n}\r\n\r\ncard-header {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n\r\n    width: 100%;\r\n    height: 196px;\r\n\r\n    background-color: #40C4FF;\r\n}\r\n\r\ncard-header title {\r\n    display: block;\r\n\r\n    font-size: 30px;\r\n    font-weight: 500;\r\n\r\n    line-height: 30px;\r\n}\r\n\r\ncard-header icon {\r\n    display: block;\r\n\r\n    width: 100px;\r\n    height: 100px;\r\n\r\n    font-size: 80px;\r\n}\r\n\r\ncard-content {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: start;\r\n        align-items: flex-start;\r\n\r\n    width: 100%;\r\n    height: 134px;\r\n\r\n    padding: 16px;\r\n}\r\n\r\ncard-content title {\r\n    display: block;\r\n\r\n    font-size: 20px;\r\n    font-weight: 500;\r\n\r\n    height: 32px;\r\n    line-height: 32px;\r\n}\r\n\r\ncard-content desc {\r\n    display: block;\r\n\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n\r\n    height: 22px;\r\n    line-height: 22px;\r\n}\r\n\r\ncard-content note {\r\n    display: block;\r\n\r\n    margin-top: 16px;\r\n\r\n    text-align: left;\r\n    font-size: 14px;\r\n    font-weight: 400;\r\n\r\n    line-height: 20px;\r\n}\r\n\r\ncard-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: end;\r\n        align-items: flex-end;\r\n    -ms-flex-pack: end;\r\n        justify-content: flex-end;\r\n\r\n    width: 100%;\r\n    height: 52px;\r\n}\r\n\r\ncard-footer i {\r\n    font-size: 16px;\r\n}\r\n\r\ncard-empty {\r\n    width: 100%;\r\n    padding: 50px;\r\n}\r\n\r\ncard-empty a {\r\n    color: #9b9b9b;\r\n\r\n    font-size: 30px;\r\n    font-weight: 500;\r\n}\r\n\r\n/**\r\n * Account\r\n */\r\n.avatar {\r\n    margin: 10px;\r\n    padding: 5px;\r\n\r\n    width: 100px;\r\n    height: 100px;\r\n    line-height: 80px;\r\n\r\n    font-size: 50px;\r\n    font-weight: bold;\r\n\r\n    color: #fff;\r\n    background-color: rgb(111, 122, 155);\r\n\r\n    border-radius: 50%;\r\n    border: 5px solid #fff;\r\n    box-shadow: 0 10px 20px 0 rgba(168, 182, 191, .6);\r\n}\r\n\r\n/**\r\n * Notice bubbles\r\n */\r\n .bubbles {\r\n    position: fixed!important;\r\n    bottom: 20px;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n\r\n    padding: 10px;\r\n\r\n    width: 55px;\r\n    height: 56px;\r\n\r\n    border-radius: 50%;\r\n\r\n    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .4);\r\n\r\n    cursor: pointer;\r\n    transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\r\n    overflow: visible;\r\n    overflow: initial;\r\n}\r\n\r\n.bubbles.notice {\r\n    right: 164px;\r\n    background-color: #16666f;\r\n}\r\n\r\n.bubbles.notice:hover {\r\n    background-color: rgba(22, 102, 111, .8);\r\n}\r\n\r\n.bubbles i {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n}\r\n\r\n.bubbles em {\r\n    position: absolute;\r\n    top: 6px;\r\n    right: 11px;\r\n\r\n    width: 18px;\r\n    height: 18px;\r\n    line-height: 18px;\r\n\r\n    color: #fff;\r\n    background-color: #e54545;\r\n\r\n    font-weight: bold;\r\n    text-align: center;\r\n    font-style: normal;\r\n    font-style: initial;\r\n    border-radius: 50%;\r\n}\r\n\r\n.bubbles em.init {\r\n    line-height: 9px;\r\n}\r\n\r\n.bubbles.effect {\r\n    animation-name: popup;\r\n    animation-duration: 1s;\r\n}\r\n\r\n/**\r\n * Help bubbles\r\n */\r\n.bubbles.help {\r\n    right: 94px;\r\n    background-color: #607D8B;\r\n}\r\n\r\n.help:hover {\r\n    background-color: rgba(96, 125, 139, .8);\r\n}\r\n\r\n@keyframes popup {\r\n    0% {\r\n        opacity: 0;\r\n        transform: translateY(20px)\r\n    }\r\n\r\n    100% {\r\n        opacity: 1;\r\n        transform: translateY(0)\r\n    }\r\n}\r\n\r\n@keyframes popdown {\r\n    0% {\r\n        opacity: 0;\r\n        transform: translateY(-20px)\r\n    }\r\n\r\n    100% {\r\n        opacity: 1;\r\n        transform: translateY(0)\r\n    }\r\n}\r\n\r\n@keyframes popclose {\r\n    0% {\r\n        opacity: 1;\r\n        transform: translateY(0px)\r\n    }\r\n\r\n    100% {\r\n        opacity: 0;\r\n        transform: translateY(20px)\r\n    }\r\n}\r\n\r\n/**\r\n * Guide\r\n */\r\n.guide-bg {\r\n    position: fixed;\r\n    right: 10px;\r\n    bottom: 90px;\r\n\r\n    animation-name: popup;\r\n    animation-duration: 1s;\r\n\r\n    z-index: 2147483647;\r\n}\r\n\r\n.guide {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-pack: start;\r\n        justify-content: flex-start;\r\n    -ms-flex-line-pack: center;\r\n        align-content: center;\r\n\r\n    width: 350px;\r\n    height: 400px;\r\n\r\n    background-color: #F5F6F6;\r\n\r\n    border-radius: 2px;\r\n    box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 2px rgba(0, 0, 0, .26);\r\n\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n}\r\n\r\n.guide .title,\r\n.guide .subtitle {\r\n    height: 48px;\r\n    line-height: 48px;\r\n\r\n    color: #fff;\r\n    background-color: #26d07c;\r\n\r\n    font-size: 17px;\r\n    text-align: center;\r\n\r\n    border-top-left-radius: 2px;\r\n    border-top-right-radius: 2px;\r\n}\r\n\r\n.guide .title {\r\n    position: absolute;\r\n\r\n    left: 0;\r\n    right: 15px;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    font-weight: bold;\r\n\r\n    z-index: 2;\r\n}\r\n\r\n.guide .title span {\r\n    animation: .1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popdown;\r\n}\r\n\r\n.guide .subtitle {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: start;\r\n        align-items: flex-start;\r\n\r\n    margin-top: 48px;\r\n\r\n    min-height: 55px;\r\n    line-height: normal;\r\n    line-height: initial;\r\n\r\n    font-size: 15px;\r\n}\r\n\r\n.guide .loading {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    margin-bottom: 20px;\r\n\r\n    font-weight: 500;\r\n    font-size: 13px;\r\n\r\n    transition : opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\r\n}\r\n\r\n.guide .loading span {\r\n    padding: 5px;\r\n}\r\n\r\n.guide .group {\r\n    margin-top: -30px;\r\n    padding: 10px;\r\n}\r\n\r\nguid-card {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n\r\n    margin-bottom: 10px;\r\n    padding: 20px;\r\n\r\n    width: 100%;\r\n\r\n    background-color: #ffffff;\r\n\r\n    border-radius: 4px;\r\n    box-shadow: rgba(0, 0, 0, .1) 0px 1px 3px 0px, rgba(193, 203, 212, .7) 0px 0px 0px 1px inset, rgb(193, 203, 212) 0px -1px 0px 0px inset;\r\n    transition: all 550ms cubic-bezier(0.23, 1, 0.32, 1) 0s;\r\n\r\n    cursor: pointer;\r\n}\r\n\r\nguid-card:hover {\r\n    box-shadow: rgba(0, 0, 0, .1) 0px 1px 3px 0px, rgba(193, 203, 212, .7) 0px 0px 0px 1px inset, rgb(193, 203, 212) 0px -1px 0px 0px inset;\r\n    transform: translate(0px, -2px);\r\n}\r\n\r\nguid-card-tips span {\r\n    margin-left: 5px;\r\n    font-size: 14px;\r\n    color: #0B242F;\r\n}\r\n\r\n.guide hr {\r\n    margin: 0;\r\n    border: 0;\r\n\r\n    text-align: center;\r\n    overflow: visible;\r\n}\r\n\r\n.guide hr:before {\r\n    content: '...';\r\n\r\n    position: relative;\r\n    top: -10px;\r\n\r\n    display: inline-block;\r\n\r\n    margin-left: .6em;\r\n\r\n    color: rgba(0, 0, 0, .68);\r\n\r\n    font-family: medium-content-slab-serif-font,Georgia,Cambria,\"Times New Roman\",Times,serif;\r\n    font-weight: 400;\r\n    font-style: italic;\r\n    font-size: 30px;\r\n    letter-spacing: .6em;\r\n}\r\n\r\n/**\r\n * Feedback bubbles\r\n */\r\n.bubbles.feedback {\r\n    right: 24px;\r\n    background-color: #fb7756;\r\n}\r\n\r\n.feedback:hover {\r\n    background-color: rgba(251, 119, 86, .8);\r\n}\r\n\r\n/**\r\n * URL Scheme source form simpread.css\r\n */\r\n\r\n.simpread-urlscheme,\r\n.simpread-feedback {\r\n    position: fixed;\r\n    right: 20px;\r\n    bottom: 20px;\r\n\r\n    z-index: 2147483646;\r\n}\r\n\r\nsimpread-urlscheme,\r\nsimpread-feedback {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: start;\r\n        align-items: flex-start;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n\r\n    padding: 20px 20px 0;\r\n\r\n    width: 500px;\r\n\r\n    color: rgba(51, 51, 51, .87);\r\n    background-color: #fff;\r\n    border-radius: 3px;\r\n\r\n    box-shadow: rgba(0, 0, 0, .12) 0px 0px 2px, rgba(0, 0, 0, .26) 0px 2px 2px;\r\n    overflow: hidden;\r\n\r\n    transform-origin: bottom;\r\n    transition: all .6s ease;\r\n}\r\n\r\nsimpread-urlscheme *,\r\nsimpread-feedback * {\r\n    font-size: 12px!important;\r\n    box-sizing: border-box;\r\n}\r\n\r\nsimpread-urlscheme.active,\r\nsimpread-feedback.active {\r\n    animation-name: srFadeInUp;\r\n    animation-duration: 450ms;\r\n    animation-fill-mode: both;\r\n}\r\n\r\nsimpread-urlscheme.hide,\r\nsimpread-feedback.hide {\r\n    animation-name: srFadeInDown;\r\n    animation-duration: 450ms;\r\n    animation-fill-mode: both;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-label,\r\nsimpread-feedback sr-fb-label {\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-head,\r\nsimpread-feedback sr-fb-head {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n\r\n    margin-bottom: 5px;\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-content,\r\nsimpread-feedback sr-fb-content {\r\n    margin-bottom: 5px;\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-footer,\r\nsimpread-feedback sr-urls-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: end;\r\n        justify-content: flex-end;\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-a,\r\nsimpread-feedback sr-fb-a {\r\n    color: #2163f7;\r\n    cursor: pointer;\r\n}\r\n\r\nsimpread-urlscheme text-field-state,\r\nsimpread-feedback text-field-state {\r\n    border-top: none rgba(34, 101, 247, .8)!important;\r\n    border-left: none rgba(34, 101, 247, .8)!important;\r\n    border-right: none rgba(34, 101, 247, .8)!important;\r\n    border-bottom: 2px solid rgba(34, 101, 247, .8)!important;\r\n}\r\n\r\nsimpread-urlscheme switch,\r\nsimpread-feedback switch {\r\n    margin-top: 0!important;\r\n}\r\n\r\n@keyframes srFadeInUp {\r\n    from {\r\n        opacity: 0;\r\n        transform: translateY(100px);\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n}\r\n\r\n@keyframes srFadeInDown {\r\n    from {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n\r\n    to {\r\n        opacity: 0;\r\n        transform: translateY(100px);\r\n    }\r\n}\r\n\r\n/**\r\n * Feeback\r\n */\r\n\r\nsimpread-feedback sr-fb-head {\r\n    font-weight: bold;\r\n}\r\n\r\nsimpread-feedback sr-fb-content {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n}\r\n\r\nsimpread-feedback sr-fb-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-pack: end;\r\n        justify-content: flex-end;\r\n\r\n    width: 100%;\r\n}\r\n\r\n/**\r\n * Feeback: stars\r\n */\r\n\r\nsimpread-feedback sr-close {\r\n    position: absolute;\r\n    right: 20px;\r\n    cursor: pointer;\r\n    transition: all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;\r\n    z-index: 200;\r\n}\r\n\r\nsimpread-feedback sr-close:hover {\r\n    transform: rotate(-15deg) scale(1.3);\r\n}\r\n\r\nsimpread-feedback sr-stars {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n\r\n    margin-top: 10px;\r\n}\r\n\r\nsimpread-feedback sr-stars {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n\r\n    margin-top: 10px;\r\n}\r\n\r\nsimpread-feedback sr-stars i {\r\n    margin-right: 10px;\r\n    cursor: pointer;\r\n}\r\n\r\nsimpread-feedback sr-stars i svg {\r\n    transition: all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;\r\n}\r\n\r\nsimpread-feedback sr-stars i svg:hover {\r\n    transform: rotate(-15deg) scale(1.3);\r\n}\r\n\r\nsimpread-feedback sr-stars i.active svg {\r\n    transform: rotate(0) scale(1);\r\n}\r\n\r\nsimpread-feedback sr-emojis {\r\n    display: block;\r\n    height: 100px;\r\n    overflow: hidden;\r\n}\r\n\r\nsimpread-feedback sr-emoji {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    transition: .3s;\r\n}\r\n\r\nsimpread-feedback sr-emoji > svg {\r\n    margin: 15px 0;\r\n    width: 70px;\r\n    height: 70px;\r\n    -ms-flex-negative: 0;\r\n        flex-shrink: 0;\r\n}\r\n\r\nsimpread-feedback sr-stars-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    margin: 10px 0 20px 0;\r\n}", ""]);
	
	// exports


/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(864);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./mduikit.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./mduikit.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * React Material Design Style\n * \n * @version : 0.0.1\n * @update  : 2019/12/29\n * @homepage: https://github.com/kenshin/mduikit\n * @author  : Kenshin Wang <kenshin@ksria.com>\n * \n * @copyright 2019\n */\n\n/**\n * Sidebar\n */\n\nsidebar side content a {\n    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n\nsidebar side content a:hover {\n    background-color: rgba(0, 0, 0, .04);\n}\n\nsidebar side content a.active {\n    font-weight: bold;\n}\n\nsidebar side toc {\n    position: relative;\n    width: 100%;\n}\n\nsidebar side toc i {\n    position: absolute;\n    left: 35px;\n    top: 0;\n    bottom: 0;\n\n    display: block;\n\n    width: 2px;\n    background: rgba(189, 189, 189, .4);\n}\n\nsidebar side toc outline {\n    position: relative;\n    display: -webkit-box!important;\n    -webkit-line-clamp: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n\n    padding: 12px 0 12px 60px;\n    min-height: 21px;\n\n    line-height: 21px;\n    text-align: left;\n\n    cursor: pointer;\n}\n\nsidebar side toc outline:hover {\n    background-color: rgba(0, 0, 0, .04)!important;\n}\n\nsidebar side .toc-level-h1 {\n    padding-left: 60px;\n}\nsidebar side .toc-level-h2 {\n    padding-left: 70px;\n}\nsidebar side .toc-level-h3 {\n    padding-left: 75px;\n}\nsidebar side .toc-level-h4 {\n    padding-left: 80px;\n}\n\n/**\n * Source from https://jonsuh.com/hamburgers/\n */\n.hamburger {\n    font: inherit;\n    display: inline-block;\n    overflow: visible;\n    margin: 0;\n    padding: 15px;\n    cursor: pointer;\n    transition-timing-function: linear;\n    transition-duration: .15s;\n    transition-property: opacity,filter;\n    text-transform: none;\n    color: inherit;\n    border: 0;\n    background-color: transparent;\n    transform: scale(.5);\n}\n\n.hamburger-box {\n    position: relative;\n    display: inline-block;\n    width: 40px;\n    height: 24px;\n}\n\n.hamburger-inner {\n    top: 50%;\n    display: block;\n    margin-top: -2px;\n}\n\n.hamburger-inner, .hamburger-inner:after, .hamburger-inner:before {\n    position: absolute;\n    width: 40px;\n    height: 4px;\n    transition-timing-function: ease;\n    transition-duration: .15s;\n    transition-property: transform;\n    border-radius: 4px;\n    background-color: #9E9E9E;\n}\n\n.hamburger-inner:after, .hamburger-inner:before {\n    content: \"\";\n    display: block;\n}\n\n.hamburger-inner:before {\n    top: -10px;\n}\n\n.hamburger-inner:after {\n    bottom: -10px;\n}\n\n.hamburger:hover .hamburger-inner, .hamburger:hover .hamburger-inner:after, .hamburger:hover .hamburger-inner:before {\n    background-color: #9E9E9E;\n    transform: scale(.7);\n}\n\n.hamburger--arrow:hover .hamburger-inner:before {\n    transform: translate3d(-8px,0,0) rotate(-45deg) scaleX(.7);\n}\n\n.hamburger--arrow:hover .hamburger-inner:after {\n    transform: translate3d(-8px,0,0) rotate(45deg) scaleX(.7);\n}", ""]);
	
	// exports


/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(866);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./intro.min.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./intro.min.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 866:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, ".introjs-overlay{position:absolute;box-sizing:content-box;z-index:999999;background-color:#000;opacity:0;background:radial-gradient(center,ellipse farthest-corner,rgba(0, 0, 0, .4) 0,rgba(0, 0, 0, .9) 100%);transition:all .3s ease-out}.introjs-fixParent{z-index:auto!important;opacity:1!important;transform:none!important}.introjs-showElement,tr.introjs-showElement>td,tr.introjs-showElement>th{z-index:9999999!important}.introjs-disableInteraction{z-index:99999999!important;position:absolute;background-color:#fff;opacity:0}.introjs-relativePosition,tr.introjs-showElement>td,tr.introjs-showElement>th{position:relative}.introjs-helperLayer{box-sizing:content-box;position:absolute;z-index:9999998;background-color:#fff;background-color:rgba(255, 255, 255, .9);border:1px solid #777;border:1px solid rgba(0, 0, 0, .5);border-radius:4px;box-shadow:0 2px 15px rgba(0, 0, 0, .4);transition:all .3s ease-out}.introjs-tooltipReferenceLayer{box-sizing:content-box;position:absolute;visibility:hidden;z-index:100000000;background-color:transparent;transition:all .3s ease-out}.introjs-helperLayer *,.introjs-helperLayer :after,.introjs-helperLayer :before{-ms-box-sizing:content-box;-o-box-sizing:content-box;box-sizing:content-box}.introjs-helperNumberLayer{box-sizing:content-box;position:absolute;visibility:visible;top:-16px;left:-16px;z-index:9999999999!important;padding:2px;font-family:Arial,verdana,tahoma;font-size:13px;font-weight:700;color:#fff;text-align:center;text-shadow:1px 1px 1px rgba(0, 0, 0, .3);background:#ff3019;background:linear-gradient(to bottom,#ff3019 0,#cf0404 100%);width:20px;height:20px;line-height:20px;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 5px rgba(0, 0, 0, .4)}.introjs-arrow{border:5px solid transparent;content:'';position:absolute}.introjs-arrow.top{top:-10px;border-bottom-color:#fff}.introjs-arrow.top-right{top:-10px;right:10px;border-bottom-color:#fff}.introjs-arrow.top-middle{top:-10px;left:50%;margin-left:-5px;border-bottom-color:#fff}.introjs-arrow.right{right:-10px;top:10px;border-left-color:#fff}.introjs-arrow.right-bottom{bottom:10px;right:-10px;border-left-color:#fff}.introjs-arrow.bottom{bottom:-10px;border-top-color:#fff}.introjs-arrow.bottom-right{bottom:-10px;right:10px;border-top-color:#fff}.introjs-arrow.bottom-middle{bottom:-10px;left:50%;margin-left:-5px;border-top-color:#fff}.introjs-arrow.left{left:-10px;top:10px;border-right-color:#fff}.introjs-arrow.left-bottom{left:-10px;bottom:10px;border-right-color:#fff}.introjs-tooltip{box-sizing:content-box;position:absolute;visibility:visible;padding:10px;background-color:#fff;min-width:200px;max-width:300px;border-radius:3px;box-shadow:0 1px 10px rgba(0, 0, 0, .4);transition:opacity .1s ease-out}.introjs-tooltipbuttons{text-align:right;white-space:nowrap}.introjs-button{box-sizing:content-box;position:relative;overflow:visible;display:inline-block;padding:.3em .8em;border:1px solid #d4d4d4;margin:0;text-decoration:none;text-shadow:1px 1px 0 #fff;font:11px/normal sans-serif;color:#333;white-space:nowrap;cursor:pointer;outline:0;background-color:#ececec;background-image:linear-gradient(#f4f4f4,#ececec);-webkit-background-clip:padding;-moz-background-clip:padding;-o-background-clip:padding-box;border-radius:.2em;zoom:1;margin-top:10px}.introjs-button:hover{border-color:#bcbcbc;text-decoration:none;box-shadow:0 1px 1px #e3e3e3}.introjs-button:active,.introjs-button:focus{background-image:linear-gradient(#ececec,#f4f4f4)}.introjs-button::-moz-focus-inner{padding:0;border:0}.introjs-skipbutton{box-sizing:content-box;margin-right:5px;color:#7a7a7a}.introjs-prevbutton{border-radius:.2em 0 0 .2em;border-right:none}.introjs-prevbutton.introjs-fullbutton{border:1px solid #d4d4d4;border-radius:.2em}.introjs-nextbutton{border-radius:0 .2em .2em 0}.introjs-nextbutton.introjs-fullbutton{border-radius:.2em}.introjs-disabled,.introjs-disabled:focus,.introjs-disabled:hover{color:#9a9a9a;border-color:#d4d4d4;box-shadow:none;cursor:default;background-color:#f4f4f4;background-image:none;text-decoration:none}.introjs-hidden{display:none}.introjs-bullets{text-align:center}.introjs-bullets ul{box-sizing:content-box;clear:both;margin:15px auto 0;padding:0;display:inline-block}.introjs-bullets ul li{box-sizing:content-box;list-style:none;float:left;margin:0 2px}.introjs-bullets ul li a{box-sizing:content-box;display:block;width:6px;height:6px;background:#ccc;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;text-decoration:none;cursor:pointer}.introjs-bullets ul li a:hover{background:#999}.introjs-bullets ul li a.active{background:#999}.introjs-progress{box-sizing:content-box;overflow:hidden;height:10px;margin:10px 0 5px 0;border-radius:4px;background-color:#ecf0f1}.introjs-progressbar{box-sizing:content-box;float:left;width:0%;height:100%;font-size:10px;line-height:10px;text-align:center;background-color:#08c}.introjsFloatingElement{position:absolute;height:0;width:0;left:50%;top:50%}.introjs-fixedTooltip{position:fixed}.introjs-hint{box-sizing:content-box;position:absolute;background:0 0;width:20px;height:15px;cursor:pointer}.introjs-hint:focus{border:0;outline:0}.introjs-hidehint{display:none}.introjs-fixedhint{position:fixed}.introjs-hint:hover>.introjs-hint-pulse{border:5px solid rgba(60, 60, 60, .57)}.introjs-hint-pulse{box-sizing:content-box;width:10px;height:10px;border:5px solid rgba(60, 60, 60, .27);border-radius:30px;background-color:rgba(136, 136, 136, .24);z-index:10;position:absolute;transition:all .2s ease-out}.introjs-hint-no-anim .introjs-hint-dot{animation:none}.introjs-hint-dot{box-sizing:content-box;border:10px solid rgba(146, 146, 146, .36);background:0 0;border-radius:60px;height:50px;width:50px;animation:introjspulse 3s ease-out;animation-iteration-count:infinite;position:absolute;top:-25px;left:-25px;z-index:1;opacity:0}@keyframes introjspulse{0%{transform:scale(0);opacity:0}25%{transform:scale(0);opacity:.1}50%{transform:scale(.1);opacity:.3}75%{transform:scale(.5);opacity:.5}100%{transform:scale(1);opacity:0}}\n\n.introjs-arrow {\n    pointer-events: none;\n}\n\n.introjs-arrow.top {\n    position: inherit;\n    top: inherit;\n    left: inherit;\n    width: inherit;\n    height: inherit;\n    background-color: transparent;\n    overflow: inherit;\n    transition: inherit;\n    border-bottom-color: transparent;\n}\n\n.introjs-arrow.bottom {\n    border-top-color: transparent;\n}\n\n.introjs-tooltip {\n    min-width: 350px;\n    color: #ffffff;\n    background: #4285f4;\n    border: none #4285f4;\n    box-shadow: 0 0 4px rgba(0, 0, 0, .12), 0 4px 16px rgba(0, 0, 0, .12);\n}\n\n.introjs-button {\n    color: #fff;\n    background-color: #4285f4;\n    background-image:none;\n    background-image: initial;\n\n    font-size: 13px;\n    text-shadow: none;\n    text-decoration: none!important;\n\n    border: none;\n}\n\n.introjs-button:hover {\n    font-weight: bold;\n    border-color: none;\n    box-shadow: none;\n}\n\n.introjs-button:active, .introjs-button:focus {\n    background-image:none;\n    background-image: initial;\n}\n\n.introjs-prevbutton.introjs-fullbutton {\n    border: none;\n}\n\n.introjs-tooltiptext {\n    font-size: 14px;\n}\n\n.introjs-tooltiptext a {\n    color: #fff;\n    font-weight: 400;\n    text-decoration: underline;\n}\n\n.introjs-bullets ul li a.active {\n    background-color: #fff;\n}\n\n.introjs-bullets ul li a {\n    background-color: #999;\n}\n\n.introjs-helperNumberLayer {\n    display: none;\n}", ""]);
	
	// exports


/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*!
	 * React Material Design: Tabs
	 * 
	 * @version : 0.0.3
	 * @update  : 2018/04/26
	 * @homepage: https://github.com/kenshin/mduikit
	 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
	 * @author  : Kenshin Wang <kenshin@ksria.com>
	 * 
	 * @copyright 2017
	 */
	
	console.log("==== simpread component: Tabs ====");
	
	var color = 'rgba(255, 255, 255, .7)',
	    secondary_color = "rgba(204, 204, 204, 1)",
	    active_color = 'rgba(255, 255, 255, 1)',
	    header_corlor = 'transparent';
	
	var cssinjs = function cssinjs() {
	    var styles = {
	
	        root: {
	            display: 'block',
	            width: '100%'
	        },
	
	        header: {
	            display: 'flex',
	            justifyContent: 'space-around',
	            alignItems: 'flex-end',
	
	            position: 'relative',
	
	            width: '100%',
	
	            backgroundColor: header_corlor
	        },
	
	        label: {
	            display: 'flex',
	            alignItems: 'center',
	            justifyContent: 'center',
	
	            position: 'relative',
	
	            padding: '0 24px',
	
	            width: '100%',
	            height: '48px',
	
	            color: color,
	            backgroundColor: 'transparent',
	
	            fontSize: '1.4rem',
	            textTransform: 'uppercase'
	
	        },
	
	        label_active: {
	            color: active_color,
	            fontWeight: 500
	        },
	
	        link: {
	            color: 'inherit',
	            backgroundColor: 'transparent',
	
	            overflow: 'hidden',
	            whiteSpace: 'nowrap',
	            textOverflow: 'ellipsis',
	            textDecoration: 'none'
	        },
	
	        link_disable: {
	            color: secondary_color,
	            cursor: 'not-allowed'
	        },
	
	        link_icon: {
	            display: 'flex',
	            flexDirection: 'column',
	            alignItems: 'center'
	        },
	
	        icon: {
	            display: 'block',
	
	            width: '24px',
	            height: '24px',
	
	            border: 'none',
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat'
	        },
	
	        border: {
	            display: 'block',
	            position: 'absolute',
	
	            left: 0,
	            bottom: 0,
	
	            width: '100%',
	            height: '4px',
	
	            backgroundColor: '#EEFF41',
	
	            transform: 'scaleX(0)',
	            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        border_active: {
	            transform: 'scaleX(1)'
	        },
	
	        shadow: {
	            display: 'block',
	            position: 'absolute',
	
	            left: 0,
	            bottom: 0,
	
	            width: '100%',
	            height: '4px',
	
	            boxShadow: '0 1px 2px rgba(0, 0, 0, .12), 0 2px 2px rgba(0, 0, 0, .26)'
	        },
	
	        groups: {
	            display: 'block',
	            width: '100%'
	        },
	
	        group: {
	            display: 'none'
	        },
	
	        group_active: {
	            display: 'block',
	            opacity: 1
	        }
	
	    };
	
	    return styles;
	};
	
	/**
	 * TabLabel react stateless component
	 * 
	 * @param {object} props, include:
	 *   - idx             : [PropTypes.number] index
	 *   - name            : [PropTypes.string] name
	 *   - value           : [PropTypes.string] value
	 *   - icon            : [PropTypes.string] icon path
	 *   - active          : [PropTypes.bool]   active
	 *   - route           : [PropTypes.string] <a> href value
	 *   - disable         : [PropTypes.string] disable
	 *   - style           : [PropTypes.object] tab-label style, include: label, border, link, label_active, border_active
	 *   - waves           : [PropTypes.string] material waves effect
	 *   - tooltip         : [PropTypes.string] tooltip
	 *   - onClick         : [PropTypes.func]   onClick event
	 */
	var TabLabel = function TabLabel(props) {
	    var route = !props.route || props.route == "" ? "#" : props.route,
	        disable = props.disable ? true : false,
	        tooltip = props.tooltip.text ? props.tooltip.text : props[props.tooltip.target],
	        style = props.style,
	        target = !route.startsWith("#") ? "_blank" : undefined;
	    props.active && (style.label = _extends({}, style.label, style.label_active));
	    props.active && (style.border = _extends({}, style.border, style.border_active));
	    props.disable && (style.link = _extends({}, style.link, style.link_disable));
	    if (props.icon && props.icon != "") {
	        style.icon.display = "block";
	        style.icon.backgroundImage = "url(" + props.icon + ")";
	        style.link = _extends({}, style.link, style.link_icon);
	    } else {
	        style.icon.display = "none";
	    }
	    return React.createElement(
	        "tab-label",
	        { style: style.label, "class": props.waves, active: props.active, onClick: !disable && function (evt) {
	                return props.onClick(evt);
	            } },
	        React.createElement(
	            "a",
	            { style: style.link,
	                id: props.idx, href: route, target: target,
	                "data-tooltip": tooltip, "data-tooltip-position": props.tooltip.position, "data-tooltip-delay": props.tooltip.delay,
	                value: props.value,
	                disabled: disable },
	            React.createElement("tab-icon", { style: style.icon }),
	            props.name
	        ),
	        React.createElement("tab-border", { style: style.border })
	    );
	};
	
	/**
	 * Custom <a> tag component: Tabs, component e.g.
	 * 
	    <tabs>
	        <tab-header>
	            <tab-label class="tabactive">
	                <a href="#">共通</a>
	                <tab-border class="borderactive"></tab-border>
	            </tab-label>
	            <tab-label>
	                <a href="#">focus mode</a>
	                <tab-border></tab-border>
	            </tab-label>
	            <tab-shadow></tab-shadow>
	        </tab-header>
	        <tab-groups>
	            <tab-group class="groupactive">
	                aaa
	            </tab-group>
	            <tab-group>
	                bbb
	            </tab-group>
	        </tab-groups>
	    </tabs>
	 * 
	 * Reference:
	 * - https://material.io/guidelines/components/tabs.html
	 * - http://www.material-ui.com/#/components/tabs
	 * 
	 * @class
	 */
	
	var Tabs = function (_React$Component) {
	    _inherits(Tabs, _React$Component);
	
	    function Tabs() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Tabs);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.style = cssinjs(), _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Tabs, [{
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            $("tabs").remove();
	        }
	    }, {
	        key: "tabLabelOnClick",
	        value: function tabLabelOnClick(event) {
	            var $target = $(event.target);
	
	            if ($target.is("tab-label")) {
	                var $a = $target.find("a");
	                $a[0] && $a[0].click();
	                return;
	            }
	
	            if (!$target.is('a')) {
	                $target = $target.parent();
	            }
	
	            var href = $target.attr('href');
	            if (!href.startsWith("#")) {
	                return;
	            }
	
	            var style = _extends({}, this.style),
	                idx = $target.attr("id"),
	                value = $target.attr("value"),
	                name = $target.text(),
	                $prev = $("tab-label[active=true]");
	
	            $("tab-label[active=true]").attr("active", false).css(_extends({}, style.label)).find("tab-border").css(_extends({}, style.border));
	
	            $target.parent().attr("active", true).css(_extends({}, style.label, style.label_active)).find("tab-border").css(_extends({}, style.border, style.border_active));
	
	            $("tab-group[active=true]").attr("active", false).velocity({ opacity: 0 }, { complete: function complete(target) {
	                    $(target).css(_extends({}, style.group));
	                    $($("tab-group")[idx]).attr("active", true).css(_extends({}, style.group, style.group_active));
	                } });
	
	            this.props.onChange && this.props.onChange($prev, $target, event);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            var style = _extends({}, this.style),
	                _props = this.props,
	                items = _props.items,
	                color = _props.color,
	                activeColor = _props.activeColor,
	                bgColor = _props.bgColor,
	                headerStyle = _props.headerStyle,
	                groupsStyle = _props.groupsStyle,
	                borderStyle = _props.borderStyle,
	                children = _props.children,
	                others = _objectWithoutProperties(_props, ["items", "color", "activeColor", "bgColor", "headerStyle", "groupsStyle", "borderStyle", "children"]);
	
	
	            color && (style.label.color = color);
	            bgColor && (style.header.backgroundColor = bgColor);
	            activeColor && (style.label_active.color = activeColor);
	
	            headerStyle && (style.header = _extends({}, style.header, headerStyle));
	            groupsStyle && (style.groups = _extends({}, style.groups, groupsStyle));
	            borderStyle && (style.border = _extends({}, style.border, borderStyle));
	
	            var tabLabel = items && items.map(function (item, idx) {
	                var label_style = {
	                    label: style.label,
	                    border: style.border,
	                    link: style.link,
	                    link_icon: style.link_icon,
	                    icon: style.icon,
	                    link_disable: style.link_disable,
	                    label_active: style.label_active,
	                    border_active: style.border_active
	                };
	                return React.createElement(TabLabel, _extends({ idx: idx
	                }, item, others, {
	                    style: label_style,
	                    onClick: function onClick(evt) {
	                        return _this2.tabLabelOnClick(evt);
	                    } }));
	            }),
	                tabHeader = tabLabel && React.createElement(
	                "tab-header",
	                { style: style.header },
	                tabLabel,
	                React.createElement("tab-shadow", { style: style.shadow })
	            );
	
	            var activeIdx = items.findIndex(function (item) {
	                return item.active;
	            }),
	                tabGroup = children && children.map(function (item, idx) {
	                var group_style = activeIdx == idx ? _extends({}, style.group, style.group_active) : _extends({}, style.group);
	                return React.createElement(
	                    "tab-group",
	                    { style: group_style, active: activeIdx == idx },
	                    item
	                );
	            }),
	                tabGroups = tabGroup && React.createElement(
	                "tab-groups",
	                { style: style.groups },
	                tabGroup
	            );
	
	            return React.createElement(
	                "tabs",
	                { style: style.root },
	                tabHeader,
	                tabGroups
	            );
	        }
	    }]);
	
	    return Tabs;
	}(React.Component);
	
	Tabs.defaultProps = {
	    items: [],
	    color: "",
	    activeColor: "",
	    bgColor: "",
	    headerStyle: undefined,
	    groupsStyle: undefined,
	    borderStyle: undefined,
	    waves: "",
	    tooltip: ""
	};
	Tabs.propTypes = {
	    items: React.PropTypes.array,
	    color: React.PropTypes.string,
	    activeColor: React.PropTypes.string,
	    bgColor: React.PropTypes.string,
	    headerStyle: React.PropTypes.object,
	    groupsStyle: React.PropTypes.object,
	    borderStyle: React.PropTypes.object,
	    waves: React.PropTypes.string,
	    tooltip: React.PropTypes.string,
	    onChange: React.PropTypes.func
	};
	exports.default = Tabs;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/*!
	 * React Material Design: Sidebar
	 * 
	 * @version : 0.0.4.0104
	 * @update  : 2019/12/30
	 * @homepage: https://github.com/kenshin/mduikit
	 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
	 * @author  : Kenshin Wang <kenshin@ksria.com>
	 * 
	 * @copyright 2017
	 */
	
	console.log("==== simpread component: Sidebar ====");
	
	var color = "rgb(90, 90, 90)",
	    secondary_color = "rgba(204, 204, 204, 1)",
	    background_color = "#fff";
	
	var cssinjs = function cssinjs() {
	    var _font_icon;
	
	    var paddingLeft = '24px',
	        height = '65px',
	        width = 256,
	        itemHeight = '40px',
	        borderStyle = '1px solid rgba(0, 0, 0, 0.06)',
	        styles = {
	
	        root: {
	            display: 'flex',
	            flexDirection: 'column',
	
	            position: 'fixed',
	
	            top: 0,
	            left: 0 - width,
	
	            width: width + "px",
	            height: '100%',
	
	            fontSize: '1.4rem',
	            fontWeight: 500,
	
	            color: color,
	            backgroundColor: background_color,
	
	            opacity: 0,
	
	            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
	
	            zIndex: 2001
	        },
	
	        header: {
	            display: 'flex',
	            alignItems: 'center',
	
	            paddingLeft: paddingLeft,
	            paddingRight: paddingLeft,
	
	            width: '100%',
	            height: height,
	
	            fontSize: '1.6rem',
	            textTransform: 'uppercase',
	
	            borderBottom: borderStyle
	        },
	
	        content: {
	            display: 'block',
	            position: 'relative',
	
	            width: '100%',
	            height: '100%',
	
	            fontSize: '1.3rem',
	            overflowY: 'auto'
	        },
	
	        footer: {
	            display: 'flex',
	            alignItems: 'center',
	
	            marginTop: '8px',
	
	            width: '100%',
	            height: height,
	
	            borderTop: borderStyle
	        },
	
	        ul: {
	            margin: 0,
	            padding: 0,
	
	            width: '100%',
	
	            listStyleType: 'none',
	            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        ul_sub: {
	            marginTop: '-200px'
	        },
	
	        li: {
	            display: 'flex',
	            flexDirection: 'column',
	            alignItems: 'flex-start',
	            justifyContent: 'center',
	
	            position: 'relative',
	
	            minHeight: itemHeight
	        },
	
	        sub_menu: {
	            width: '100%',
	            overflow: 'hidden'
	        },
	
	        dropdown: {
	            display: 'block',
	            position: 'absolute',
	
	            width: '20px',
	            height: '20px',
	
	            top: '10px',
	            right: 0,
	
	            border: 'none',
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat',
	            backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAeklEQVQ4T2NkoAAwUqCXYThojoyMDGBkZNTHFQ7///+/uHz58g0weRQ/R0ZGTmBkZMzHE4iNy5Yta8CqGSQYGRm5gJGRMR7dgP///y9cvnx5ArI41tBGNwCbRpAhOKMKZgAujXg1gyQjIiIcVqxYcQBXGAyHREJqJgEA2HcpEMZShNsAAAAASUVORK5CYII=)'
	        },
	
	        dropup: {
	            backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAwklEQVQ4T82SPQrCQBCF523ASjxB+nTpFSwFwXqLZQ+hR9gj6CGWLbYWBEsh9unS5wRiJWRHLALmjxRpMu28782bYUATChNYmikspVx6799Dqw3GVkqlAK7MfHDO5X0GvbDWOmbmJxHFRFQCWFtry7ZBB9Zar0IIDwBpLWbmXAixtda+/g0asDFGFEVxA7BrT2Hme5Ike2NMqHsNWCl1BnAcOhAzX5xzpw4spVxEUbQZe5qqqjLv/eenm+mTjK0wKfYXTFs9EN0Ulr4AAAAASUVORK5CYII=)'
	        },
	
	        link: {
	            display: 'flex',
	            alignItems: 'center',
	
	            margin: 0,
	            padding: '12px 48px 12px 24px',
	
	            width: '100%',
	            minHeight: itemHeight,
	
	            color: color,
	            fontSize: '1.4rem'
	        },
	
	        large_link: {
	            paddingLeft: 0,
	            fontSize: '2.2rem'
	        },
	
	        icon: {
	            display: 'block',
	
	            marginLeft: '2px',
	            marginRight: paddingLeft,
	
	            width: '21px',
	            height: '21px',
	
	            border: 'none',
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat'
	        },
	
	        text: {
	            display: 'block'
	        },
	
	        mask: {
	            display: 'none',
	            position: 'fixed',
	
	            top: 0,
	            left: 0,
	
	            width: '100%',
	            height: '100%',
	
	            opacity: 0,
	            filter: 'alpha(Opacity=50)',
	            backgroundColor: 'rgba(0, 0, 0, .5)',
	
	            zIndex: 2000
	        },
	
	        font_icon: (_font_icon = {
	            display: 'flex',
	            justifyContent: 'center',
	            alignItems: 'center',
	
	            marginRight: '12px',
	
	            fontSize: '18px',
	            color: '#9E9E9E',
	
	            order: -1
	        }, _defineProperty(_font_icon, "display", 'block'), _defineProperty(_font_icon, "width", '24px'), _defineProperty(_font_icon, "height", '24px'), _defineProperty(_font_icon, "fontSize", '14px'), _defineProperty(_font_icon, "border", 'none'), _font_icon),
	
	        close_icon: {
	            position: 'absolute',
	            top: '0',
	            left: '-256px',
	
	            display: 'flex',
	            justifyContent: 'center',
	            alignItems: 'center',
	
	            width: '48px',
	            height: '48px',
	
	            color: '#9E9E9E',
	            backgroundColor: '#fff',
	
	            fontSize: '2rem',
	            border: 'none',
	            cursor: 'pointer'
	        }
	
	    };
	
	    return styles;
	};
	
	/**
	 * React stateless component
	 * 
	 * @param {object} react props, include:
	 *   - large        : [PropTypes.boolean]
	 *   - name         : [PropTypes.string] <a> text
	 *   - value        : [PropTypes.string] <a> value
	 *   - route        : [PropTypes.string] <a> href
	 *   - icon         : [PropTypes.string] icon
	 *   - fontIcon     : [PropTypes.string] icon
	 *   - style        : [PropTypes.object] include: icon link text
	 *   - tooltip      : [PropTypes.string] tooltip
	 *   - waves        : [PropTypes.string] waves
	 *   - onClick      : [PropTypes.func]   event handler
	 */
	var Item = function Item(props) {
	    var icon_style = {},
	        link_style = _extends({}, props.style.link);
	    if (props.fontIcon) {
	        icon_style = _extends({}, props.style.font_icon);
	        icon_style.display = "flex";
	    } else if (props.icon) {
	        icon_style = _extends({}, props.style.icon);
	        icon_style.display = "block";
	        icon_style.backgroundImage = "url(" + props.icon + ")";
	    } else {
	        icon_style.display = "none";
	    }
	    if (props.large) {
	        link_style = _extends({}, props.style.link, props.style.large_link);
	    }
	    var tooltip = props.tooltip;
	    return React.createElement(
	        "a",
	        { style: link_style, className: props.route && props.waves, target: props.route && props.route.startsWith("#") ? "_self" : "_blank",
	            href: props.route, value: props.value,
	            "data-tooltip": tooltip.text ? tooltip.text : props[tooltip.target], "data-tooltip-position": tooltip.position, "data-tooltip-delay": tooltip.delay,
	            onClick: props.route && props.onClick && function (evt) {
	                return props.onClick(evt);
	            } },
	        React.createElement("icon", { style: icon_style, dangerouslySetInnerHTML: { __html: props.fontIcon || "" } }),
	        React.createElement(
	            "text",
	            { style: props.style.text },
	            props.name
	        )
	    );
	};
	
	/**
	 * Custom component: Sidebar
	 * 
	 * Reference:
	 * - chrome://md-settings/
	 * - https://material.io/guidelines/
	 * 
	 * @class
	 */
	
	var Sidebar = function (_React$Component) {
	    _inherits(Sidebar, _React$Component);
	
	    function Sidebar() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Sidebar);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call.apply(_ref, [this].concat(args))), _this), _this.style = cssinjs(), _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Sidebar, [{
	        key: "onClick",
	        value: function onClick(event) {
	            var $target = $(event.target);
	            while (!$target.is("a")) {
	                $target = $target.parent();
	            }
	            var _ref2 = [$target.text(), $target.attr("value"), $target.attr("href")],
	                name = _ref2[0],
	                value = _ref2[1],
	                href = _ref2[2];
	
	            $target.parent().parent().find("a").removeClass("active");
	            $target.addClass("active");
	            this.props.onClick && this.props.onClick($target, { name: name, value: value, href: href });
	            this.props.autoClose && this.maskOnClick();
	        }
	    }, {
	        key: "liOnClick",
	        value: function liOnClick(event) {
	            var $target = $(event.target),
	                i = 0;
	            if ($target.is("dropdown")) {
	                $target = $target.parent().parent();
	            } else if ($target.is("sub-menu")) {
	                $target = $target.parent();
	            } else {
	                while (!$target.is("a")) {
	                    if (i > 10) return;
	                    $target = $target.parent();
	                    i++;
	                }
	            }
	
	            $target = $target.parent();
	            var style = _extends({}, this.style),
	                $ul = $target.find("ul"),
	                state = $target.find("dropdown").attr("data-state");
	
	            if (state == "down") {
	                $target.find("dropdown").attr("data-state", "up").css(_extends({}, style.dropdown, style.dropup));
	                $ul.css(_extends({}, style.ul));
	            } else {
	                $target.find("dropdown").attr("data-state", "down").css(_extends({}, style.dropdown));
	                style.ul_sub.marginTop = $ul.attr("data-margin-top");
	                $ul.css(_extends({}, style.ul, style.ul_sub));
	            }
	        }
	    }, {
	        key: "maskOnClick",
	        value: function maskOnClick(event) {
	            var _this2 = this;
	
	            $("side").velocity({ left: 0 - Number.parseInt($("side").width()) }, {
	                progress: function progress(elements, complete) {
	                    $("side").css("opacity", 1 - complete);
	                    $("mask").css("opacity", 1 - complete);
	                },
	                complete: function complete() {
	                    $("sidebar").css("left", 0 - Number.parseInt($("side").width()));
	                    $("mask").css("display", "none");
	                    $("side close").velocity({ left: 0 - Number.parseInt($("side").width()) });
	                    _this2.props.onExit && _this2.props.onExit();
	                }
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;
	
	            var menu = [];
	            var style = _extends({}, this.style),
	                _props = this.props,
	                items = _props.items,
	                width = _props.width,
	                header = _props.header,
	                icon = _props.icon,
	                footer = _props.footer,
	                showClose = _props.showClose,
	                color = _props.color,
	                bgColor = _props.bgColor,
	                headerStyle = _props.headerStyle,
	                contentStyle = _props.contentStyle,
	                footerStyle = _props.footerStyle,
	                maskStyle = _props.maskStyle;
	
	
	            width && (style.root.width = width);
	            width && (style.root.left = 0 - Number.parseInt(width));
	            color && (style.text.color = color);
	            bgColor && (style.root.backgroundColor = bgColor);
	
	            headerStyle && (style.header = _extends({}, style.header, headerStyle));
	            contentStyle && (style.content = _extends({}, style.content, contentStyle));
	            footerStyle && (style.footer = _extends({}, style.footer, footerStyle));
	            maskStyle && (style.mask = _extends({}, style.mask, maskStyle));
	
	            var subMenu = function subMenu(items) {
	                return items.map(function (item) {
	                    return list(item);
	                });
	            },
	                list = function list(item) {
	                item.items && item.items.length > 0 && (style.ul_sub.marginTop = 0 - item.items.length * Number.parseInt(style.li.minHeight));
	                return React.createElement(
	                    "li",
	                    { style: style.li, onClick: item.items && function (evt) {
	                            return _this3.liOnClick(evt);
	                        } },
	                    React.createElement(Item, { style: style,
	                        waves: _this3.props.waves, tooltip: _this3.props.tooltip,
	                        icon: item.icon, fontIcon: item.fontIcon || "",
	                        name: item.name, value: item.value, route: item.route,
	                        onClick: !item.items && function (evt) {
	                            return _this3.onClick(evt);
	                        } }),
	                    item.items && item.items.length > 0 && React.createElement(
	                        "sub-menu",
	                        { style: style.sub_menu },
	                        React.createElement("dropdown", { style: style.dropdown, "data-state": "down" }),
	                        React.createElement(
	                            "ul",
	                            { "data-margin-top": style.ul_sub.marginTop,
	                                style: _extends({}, style.ul, style.ul_sub) },
	                            subMenu(item.items)
	                        )
	                    )
	                );
	            };
	
	            items && (menu = items.map(function (item) {
	                return list(item);
	            }));
	
	            return React.createElement(
	                "sidebar",
	                null,
	                React.createElement(
	                    "side",
	                    { style: style.root },
	                    header && React.createElement(
	                        "header",
	                        { style: style.header },
	                        React.createElement(Item, { style: style, icon: icon, name: header, large: true,
	                            waves: this.props.waves, tooltip: this.props.tooltip,
	                            onClick: function onClick(evt) {
	                                return _this3.onClick(evt);
	                            } })
	                    ),
	                    React.createElement(
	                        "content",
	                        { style: style.content },
	                        menu.length > 0 && React.createElement(
	                            "ul",
	                            { style: style.ul },
	                            menu
	                        )
	                    ),
	                    footer && React.createElement(
	                        "footer",
	                        { style: style.footer },
	                        React.createElement(Item, { style: style, name: footer,
	                            waves: this.props.waves, tooltip: this.props.tooltip,
	                            onClick: function onClick(evt) {
	                                return _this3.onClick(evt);
	                            } })
	                    ),
	                    showClose && React.createElement(
	                        "close",
	                        { className: this.props.waves, style: style.close_icon, onClick: function onClick() {
	                                return _this3.maskOnClick();
	                            } },
	                        React.createElement(
	                            "div",
	                            { className: "hamburger hamburger--arrow js-hamburger is-active" },
	                            React.createElement(
	                                "div",
	                                { className: "hamburger-box" },
	                                React.createElement("div", { className: "hamburger-inner" })
	                            )
	                        )
	                    )
	                ),
	                React.createElement("mask", { style: style.mask, onClick: function onClick(evt) {
	                        return _this3.maskOnClick(evt);
	                    } })
	            );
	        }
	    }]);
	
	    return Sidebar;
	}(React.Component);
	
	/**
	 * Open sidebar
	 */
	
	
	Sidebar.defaultProps = {
	    icon: undefined,
	    header: undefined,
	    footer: undefined,
	    width: "",
	    items: [],
	    position: "left",
	    color: undefined,
	    bgColor: undefined,
	    headerStyle: undefined,
	    contentStyle: undefined,
	    footerStyle: undefined,
	    maskStyle: undefined,
	    waves: "",
	    autoClose: true,
	    showClose: false,
	    tooltip: {}
	};
	Sidebar.propTypes = {
	    icon: React.PropTypes.string,
	    header: React.PropTypes.string,
	    footer: React.PropTypes.string,
	    width: React.PropTypes.string,
	    items: React.PropTypes.array,
	    position: React.PropTypes.oneOf(["left", "right"]),
	    color: React.PropTypes.string,
	    bgColor: React.PropTypes.string,
	    headerStyle: React.PropTypes.object,
	    contentStyle: React.PropTypes.object,
	    footerStyle: React.PropTypes.object,
	    maskStyle: React.PropTypes.object,
	    autoClose: React.PropTypes.bool,
	    showClose: React.PropTypes.bool,
	    waves: React.PropTypes.string,
	    tooltip: React.PropTypes.object,
	    onClick: React.PropTypes.func,
	    onExit: React.PropTypes.func
	};
	function Open() {
	    $("side").velocity({ left: 0 }, {
	        progress: function progress(elements, complete) {
	            $("side").css("opacity", complete);
	            $("mask").css("opacity", complete).css("display", "block");
	        }
	    });
	    $("side close").velocity({ left: 256 });
	    tocRender();
	    activeRender();
	}
	
	/**
	 * TocRender
	 */
	function tocRender() {
	    if ($("sidebar content toc").length > 0) return;
	    var ids = [],
	        tocs = new Map();
	    $("tabs").find("tab-label a").map(function (idx, item) {
	        return ids.push($(item).attr("value"));
	    });
	    ids.forEach(function (id, idx) {
	        var levels = [];
	        $($("tabs tab-group")[idx]).find("[data-head-level]").map(function (idx, item) {
	            var $item = $(item),
	                id = "sr-toc-" + idx,
	                level = $item.attr("data-head-level"),
	                text = $item.attr("data-head-title") || $item.text();
	            levels.push({ id: id, level: level, text: text });
	            $item.attr("id", id);
	        });
	        tocs.set(id, levels);
	    });
	    $("sidebar content").find("a").map(function (idx, item) {
	        var html = "";
	        var $item = $(item),
	            id = $item.attr("value"),
	            levels = tocs.get(id);
	        ids[idx] && levels.forEach(function (value) {
	            html += "<outline class=\"md-waves-effect\" data-trigger=\"" + ids[idx] + "\" data-id=\"" + value.id + "\" class=\"toc-level-" + value.level + "\">" + value.text + "</outline>";
	        });
	        html.length > 0 && $item.after("<toc><i></i>" + html + "</to>");
	    });
	    $("sidebar content toc outline").on("click", function (event) {
	        var id = $(event.currentTarget).attr("data-id"),
	            trigger = $(event.currentTarget).attr("data-trigger");
	        if (!location.hash.endsWith(trigger)) {
	            $("tabs").find("tab-label a[value=" + trigger + "]")[0].click();
	        }
	        // hack code
	        $("tabs").find("tab-group[active=true]").find("#" + id)[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	    });
	}
	
	/**
	 * Active Render
	 */
	function activeRender() {
	    $("sidebar content").find("a").map(function (idx, item) {
	        var $item = $(item),
	            id = $item.attr("value");
	        if (location.hash.endsWith(id)) {
	            $item.addClass("active");
	        } else {
	            $item.removeClass("active");
	        }
	    });
	}
	
	exports.Sidebar = Sidebar;
	exports.Open = Open;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _notify = __webpack_require__(336);
	
	var _notify2 = _interopRequireDefault(_notify);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _storage = __webpack_require__(2);
	
	var _version = __webpack_require__(335);
	
	var ver = _interopRequireWildcard(_version);
	
	var _menu = __webpack_require__(338);
	
	var menu = _interopRequireWildcard(_menu);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _export2 = __webpack_require__(568);
	
	var exp = _interopRequireWildcard(_export2);
	
	var _browser = __webpack_require__(334);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option common load =====");
	
	var CommonOpt = function (_React$Component) {
	    _inherits(CommonOpt, _React$Component);
	
	    function CommonOpt() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, CommonOpt);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommonOpt.__proto__ || Object.getPrototypeOf(CommonOpt)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            sync: function (sync) {
	                return !sync ? "从未同步过，建议同步一次！" : '\u4E0A\u6B21\u540C\u6B65\u65F6\u95F4\uFF1A ' + sync;
	            }(_storage.storage.option.sync)
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(CommonOpt, [{
	        key: 'sync',
	        value: function sync() {
	            var _this2 = this;
	
	            var notify = void 0;
	            var dbx = exp.dropbox,
	                jianguo = exp.jianguo,
	                write = function write() {
	                _storage.storage.option.sync = (0, _storage.Now)();
	                _storage.storage.Write(function () {
	                    writeConfig();
	                });
	            },
	                readDropbox = function readDropbox() {
	                notify = new _notify2.default().Render({ content: "数据同步中，请稍等...", state: "loading" });
	                dbx.Exist(dbx.config_name, function (result, error) {
	                    if (result == -1) {
	                        write();
	                    } else {
	                        dbx.Read(dbx.config_name, callback);
	                    }
	                });
	            },
	                readJianguo = function readJianguo(obj) {
	                notify = new _notify2.default().Render({ content: "数据同步中，请稍等...", state: "loading" });
	                jianguo.Read(obj.username, obj.password, jianguo.config_name, function (result) {
	                    if (result && result.status == 404) {
	                        write();
	                    } else if (result && result.status == 200) {
	                        callback("read", result.done);
	                    }
	                });
	            },
	                writeConfig = function writeConfig() {
	                if (_storage.storage.option.save_at == "dropbox") {
	                    dbx.Write(dbx.config_name, _storage.storage.Export(), callback);
	                } else {
	                    jianguo.Add(_storage.storage.secret.jianguo.username, _storage.storage.secret.jianguo.password, jianguo.root + "/" + jianguo.config_name, _storage.storage.Export(), function (result) {
	                        callback("write", undefined, result && [201, 204].includes(result.status) ? undefined : "error");
	                    });
	                }
	            },
	                callback = function callback(type, result, error) {
	                notify.complete();
	                switch (type) {
	                    case "write":
	                        !error ? location.href = location.origin + location.pathname + "?simpread_mode=sync" : new _notify2.default().Render(2, error == "error" ? "远程数据同步失败，请稍后再试！" : error);
	                        break;
	                    case "read":
	                        var json = JSON.parse(result),
	                            local = _storage.storage.option.update ? new Date(_storage.storage.option.update.replace(/年|月/ig, "-").replace("日", "")) : new Date("1999-01-01 12:12:12"),
	                            remote = new Date(json.option.update.replace(/年|月/ig, "-").replace("日", ""));
	                        if (ver.Compare(json.version) == 1) {
	                            new _notify2.default().Render("本地版本与远程版本不一致，且本地版本较新，是否覆盖远程版本？", "覆盖", function () {
	                                watch.SendMessage("import", true);
	                                write();
	                            });
	                        } else if (local < remote) {
	                            new _notify2.default().Render("远程备份配置文件较新，是否覆盖本地文件？", "覆盖", function () {
	                                _this2.importsecret(json.option.secret, _extends({}, json.secret), function () {
	                                    delete json.secret;
	                                    _storage.storage.Write(function () {
	                                        watch.SendMessage("import", true);
	                                        location.href = location.origin + location.pathname + "?simpread_mode=reload";
	                                    }, json);
	                                });
	                            });
	                        } else if (local > remote) {
	                            new _notify2.default().Render("本地配置文件较新，是否覆盖远程备份文件？", "覆盖", function () {
	                                watch.SendMessage("import", true);
	                                write();
	                            });
	                        } else {
	                            new _notify2.default().Render("本地与远程数据相同，无需重复同步。");
	                        }
	                        break;
	                }
	            };
	
	            _storage.storage.Safe(function () {
	                _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.track, { eventCategory: "sync", eventAction: "sync", eventValue: _storage.storage.option.save_at }));
	                if (_storage.storage.option.save_at == "dropbox") {
	                    var sec_dbx = _storage.storage.secret.dropbox;
	                    !sec_dbx.access_token ? new _notify2.default().Render('\u672A\u5BF9 ' + dbx.name + ' \u6388\u6743\uFF0C\u8BF7\u5148\u8FDB\u884C\u6388\u6743\u64CD\u4F5C\u3002', "授权", function () {
	                        dbx.New().Auth();
	                        dbx.dtd.done(function () {
	                            sec_dbx.access_token = dbx.access_token;
	                            _storage.storage.Safe(function () {
	                                new _notify2.default().Render("授权成功！");
	                                readDropbox();
	                            }, _storage.storage.secret);
	                        }).fail(function (error) {
	                            console.error(error);
	                            new _notify2.default().Render(2, '\u83B7\u53D6 ' + dbx.name + ' \u6388\u6743\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u3002');
	                        });
	                    }) : function () {
	                        dbx.access_token = sec_dbx.access_token;
	                        readDropbox();
	                    }();
	                } else {
	                    var _jianguo = _storage.storage.secret.jianguo;
	                    !_jianguo.access_token ? new _notify2.default().Render(2, '\u575A\u679C\u4E91 <b>\u6388\u6743</b> \u540E\u624D\u80FD\u4F7F\u7528\u6B64\u529F\u80FD\uFF0C\u5982\u4F55\u6388\u6743 <a href="http://ksria.com/simpread/docs/#/\u575A\u679C\u4E91">\u8BF7\u770B\u8FD9\u91CC</a>\u3002') : readJianguo(_storage.storage.secret.jianguo);
	                }
	            });
	        }
	    }, {
	        key: 'import',
	        value: function _import() {
	            var _this3 = this;
	
	            var input = document.createElement("input"),
	                $input = $(input),
	                onload = function onload(event) {
	                if (event && event.target && event.target.result) {
	                    try {
	                        var json = ver.FixSubver(ver.patch, JSON.parse(event.target.result));
	                        var result = ver.Compare(json.version);
	                        if (result < 0) {
	                            result == -1 && new _notify2.default().Render(2, "上传失败，当前版本太低，请升级简悦。");
	                            result == -2 && new _notify2.default().Render(2, "上传失败，配置文件版本不存在。");
	                        } else {
	                            if (result == 0) {
	                                var obj = _storage.storage.Verify(json);
	                                if (obj.option.code != 0 || obj.focus.code != 0 || obj.read.code != 0 || obj.stat.code != 0) {
	                                    new _notify2.default().Render(2, "上传失败，配置项不匹配，请重新上传。");
	                                    return;
	                                }
	                            } else if (result == 1) {
	                                _storage.storage.version != json.version && _storage.storage.Fix(json.read.sites, json.version, _storage.storage.version, json.focus.sites);
	                                json = ver.Verify(json.version, json);
	                                new _notify2.default().Render({ type: 2, content: '\u4E0A\u4F20\u7248\u672C\u592A\u4F4E\uFF0C\u5DF2\u81EA\u52A8\u8F6C\u6362\u4E3A\u6700\u65B0\u7248\u672C\u3002', state: "holdon" });
	                            }
	                            menu.Refresh(json.option.menu);
	                            ver.Incompatible(json.version, json) && new _notify2.default().Render({ type: 2, content: '\u68C0\u6D4B\u5230\u4F60\u66FE\u7ECF\u4FEE\u6539\u8FC7\u7B2C\u4E09\u65B9\u9002\u914D\u6E90\uFF0C<b>\u52A1\u5FC5\u5237\u65B0\u540E\u91CD\u65B0\u5BFC\u5165</b>\uFF01<a target="_blank" href="http://ksria.com/simpread/docs/#/\u7AD9\u70B9\u9002\u914D\u6E90?id=\u7B2C\u4E09\u65B9\u9002\u914D\u6E90">\u8BE6\u7EC6\u8BF4\u660E</a>', state: "holdon" });
	                            ver.VerifyPlugins(json.option) && new _notify2.default().Render({ type: 2, content: '\u5DF2\u6E05\u7406\u5931\u6548\u7684\u63D2\u4EF6\uFF0C\u8BE6\u7EC6\u8BF7\u770B <a href="http://ksria.com/simpread/welcome/version_' + json.version + '.html#badplugins" target="_blank">\u5931\u6548\u63D2\u4EF6</a>', state: "holdon" });
	                            json.option.origins && json.option.origins.length > 0 && new _notify2.default().Render({ content: '\u5BFC\u5165\u7684\u914D\u7F6E\u6587\u4EF6\u5305\u542B\u4E86\u7B2C\u4E09\u65B9\u6E90\uFF0C\u5237\u65B0\u540E\u8BF7\u91CD\u65B0 <b>\u624B\u52A8\u5BFC\u5165</b>\u3002', state: "holdon" });
	                            json.option.plugins && json.option.plugins.length > 0 && new _notify2.default().Render({ content: '\u5BFC\u5165\u7684\u914D\u7F6E\u6587\u4EF6\u5305\u542B\u4E86\u63D2\u4EF6\uFF0C\u5237\u65B0\u540E\u8BF7\u91CD\u65B0 <b>\u624B\u52A8\u5BFC\u5165</b>\u3002', state: "holdon" });
	                            _this3.importsecret(json.option.secret, _extends({}, json.secret), function () {
	                                delete json.secret;
	                                _storage.storage.Write(function () {
	                                    _storage.storage.Plugins(function () {
	                                        watch.SendMessage("import", true);
	                                        new _notify2.default().Render("snackbar", "导入成功，请刷新当前页面，以便新配置文件生效。", "刷新", function () {
	                                            location.href = location.origin + location.pathname + "?simpread_mode=reload";
	                                        });
	                                    }, {});
	                                }, json);
	                            });
	                        }
	                    } catch (error) {
	                        new _notify2.default().Render(2, "上传失败，配置文件解析失败，请重新确认。");
	                    }
	                }
	            };
	            $input.attr({ type: "file", multiple: "false" }).one("change", function (event) {
	                var reader = new FileReader();
	                reader.onload = onload;
	                reader.readAsText(event.target.files[0]);
	            });
	            $input.trigger("click");
	        }
	    }, {
	        key: 'export',
	        value: function _export() {
	            if (_browser.br.isFirefox()) {
	                exp.PrDownload(_storage.storage.Export(), 'simpread-config.json');
	            } else {
	                var data = "data:text/json;charset=utf-8," + encodeURIComponent(_storage.storage.Export());
	                exp.Download(data, 'simpread-config-' + (0, _storage.Now)() + '.json');
	            }
	        }
	    }, {
	        key: 'oldnewsites',
	        value: function oldnewsites() {
	            new _notify2.default().Render("此功能转移到 <b>站点管理</b> 选项卡里面，3 秒钟后自动切换到此选项卡。");
	            setTimeout(function () {
	                location.href = location.origin + "/options/options.html#labs";
	                window.dispatchEvent(new CustomEvent(msg.MESSAGE_ACTION.turn_tab, { detail: { page: 3 } }));
	            }, 3000);
	        }
	    }, {
	        key: 'newsites',
	        value: function newsites() {
	            var notify = new _notify2.default().Render({ content: "数据同步中，请稍等...", state: "loading" });
	            _storage.storage.GetRemote("remote", function (result, error) {
	                notify.complete();
	                if (!error) {
	                    var count = _storage.storage.pr.Addsites(result);
	                    _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                        watch.SendMessage("site", true);
	                        count == 0 ? new _notify2.default().Render("适配列表已同步至最新版本。") : new _notify2.default().Render(0, '\u9002\u914D\u5217\u8868\u5DF2\u540C\u6B65\u6210\u529F\uFF0C\u672C\u6B21\u65B0\u589E ' + count + ' \u4E2A\u7AD9\u70B9\u3002');
	                    });
	                } else {
	                    new _notify2.default().Render(3, '\u540C\u6B65\u65F6\u53D1\u751F\u4E86\u4E00\u4E9B\u95EE\u9898\uFF0C\u5E76\u4E0D\u4F1A\u5F71\u54CD\u672C\u5730\u914D\u7F6E\u6587\u4EF6\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01');
	                }
	            });
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            new _notify2.default().Render("snackbar", "是否清除掉（已包含账户信息）本地配置文件？", "同意 ", function () {
	                _storage.storage.Clear("local", function () {
	                    new _notify2.default().Render("snackbar", "清除成功，此页面需刷新后才能生效！", "刷新 ", function () {
	                        location.href = location.origin + location.pathname + "?simpread_mode=clear";
	                    });
	                });
	            });
	        }
	
	        /**
	         * Import to secret storage
	         * 
	         * @param {boole} option.secret value
	         * @param {object} simpread.secret
	         * @param {function} callback
	         */
	
	    }, {
	        key: 'importsecret',
	        value: function importsecret(state, secret, callback) {
	            state && !$.isEmptyObject(secret) ? _storage.storage.Safe(function () {
	                callback();
	            }, secret) : callback();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this4 = this;
	
	            if (this.props.website_sync) {
	                _storage.storage.GetRemote("versions", function (result, error) {
	                    if (!error && result.website == true) {
	                        new _notify2.default().Render("正在获取最新的适配列表，请稍等...");
	                        _this4.newsites();
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this5 = this;
	
	            return React.createElement(
	                'div',
	                { style: { width: '100%' } },
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'sync' },
	                    React.createElement(_button2.default, { type: 'raised', text: '\u540C\u6B65\u5230\u4F60\u7684 ' + (_storage.storage.option.save_at == "dropbox" ? "Dropbox" : "坚果云") + ' \u8D26\u6237',
	                        icon: ss.IconPath(_storage.storage.option.save_at + "_icon"),
	                        color: '#fff', backgroundColor: '#1976D2',
	                        waves: 'md-waves-effect md-waves-button',
	                        tooltip: { text: this.state.sync },
	                        onClick: function onClick() {
	                            return _this5.sync();
	                        } })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'config' },
	                    React.createElement(
	                        'div',
	                        { style: { display: 'inline-flex', width: '100%' } },
	                        React.createElement(_button2.default, { type: 'raised', text: '\u4ECE\u672C\u5730\u5BFC\u5165\u914D\u7F6E\u6587\u4EF6', width: '100%',
	                            icon: ss.IconPath("import_icon"),
	                            color: '#fff', backgroundColor: '#FF5252',
	                            waves: 'md-waves-effect md-waves-button',
	                            tooltip: { text: "上传后的配置将覆盖掉当前，请注意确认！" },
	                            onClick: function onClick() {
	                                return _this5.import();
	                            } }),
	                        React.createElement(_button2.default, { type: 'raised', text: '\u5BFC\u51FA\u914D\u7F6E\u6587\u4EF6\u5230\u672C\u5730', width: '100%',
	                            icon: ss.IconPath("export_icon"),
	                            color: '#fff', backgroundColor: '#2196F3',
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick() {
	                                return _this5.export();
	                            } })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'oldnewsites', style: { display: 'inline-flex', width: '50%' } },
	                    React.createElement(_button2.default, { type: 'raised', text: '\u624B\u52A8\u540C\u6B65\u9002\u914D\u5217\u8868', width: '100%',
	                        icon: ss.IconPath("update_icon"),
	                        color: '#fff', backgroundColor: '#2196F3',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this5.oldnewsites();
	                        } })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'clear', style: { display: 'inline-flex', width: '50%' } },
	                    React.createElement(_button2.default, { type: 'raised', text: '\u6E05\u9664\u6570\u636E', width: '100%',
	                        icon: ss.IconPath("clear_icon"),
	                        tooltip: { text: "清除掉本地配置文件，需谨慎！" },
	                        color: '#fff', backgroundColor: '#757575',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this5.clear();
	                        } })
	                )
	            );
	        }
	    }]);
	
	    return CommonOpt;
	}(React.Component);
	
	CommonOpt.propTypes = {
	    sync: React.PropTypes.func
	};
	exports.default = CommonOpt;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _browser = __webpack_require__(334);
	
	var _menu = __webpack_require__(338);
	
	var menu = _interopRequireWildcard(_menu);
	
	var _storage = __webpack_require__(2);
	
	var _switch = __webpack_require__(619);
	
	var _switch2 = _interopRequireDefault(_switch);
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _authorize = __webpack_require__(871);
	
	var _authorize2 = _interopRequireDefault(_authorize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option labs load =====");
	
	var LabsOpt = function (_React$Component) {
	    _inherits(LabsOpt, _React$Component);
	
	    function LabsOpt() {
	        _classCallCheck(this, LabsOpt);
	
	        return _possibleConstructorReturn(this, (LabsOpt.__proto__ || Object.getPrototypeOf(LabsOpt)).apply(this, arguments));
	    }
	
	    _createClass(LabsOpt, [{
	        key: 'onChange',
	        value: function onChange(value, model, state, child) {
	            !child && (this.props[model][state] = value);
	            child && (this.props[model][state][child] = value);
	            child && menu.Refresh(this.props[model][state]);
	            if (model == "option" && state == "save_at") {
	                this.props[model][state] = value ? "dropbox" : "jianguo";
	            }
	            this.props.onChange && this.props.onChange(true);
	            model == "read" && state == "auto" && this.exclusionState(value);
	            model == "read" && state == "toc" && this.tocState(value);
	            model == "read" && state == "cleanup" && this.cleanupState(value);
	            model == "option" && state == "preload" && this.lazyloadState(value);
	        }
	    }, {
	        key: 'changeExclusion',
	        value: function changeExclusion(event) {
	            this.props.read.exclusion = event.target.value.split("\n");
	            this.props.onChange && this.props.onChange(false);
	        }
	    }, {
	        key: 'changeWhitelist',
	        value: function changeWhitelist(event) {
	            this.props.read.whitelist = event.target.value.split("\n");
	            this.props.onChange && this.props.onChange(false);
	        }
	    }, {
	        key: 'changeLazyload',
	        value: function changeLazyload(event) {
	            this.props.option.lazyload = event.target.value.split("\n");
	            this.props.onChange && this.props.onChange(false);
	        }
	    }, {
	        key: 'tocState',
	        value: function tocState(value) {
	            $(this.refs.toc).velocity(value ? "slideDown" : "slideUp");
	        }
	    }, {
	        key: 'cleanupState',
	        value: function cleanupState(value) {
	            $(this.refs.cleanup).velocity(value ? "slideDown" : "slideUp");
	        }
	    }, {
	        key: 'lazyloadState',
	        value: function lazyloadState(value) {
	            $(this.refs.lazyload).velocity(value ? "slideDown" : "slideUp");
	        }
	    }, {
	        key: 'exclusionState',
	        value: function exclusionState(value) {
	            $(this.refs.exclusion).velocity(value ? "slideDown" : "slideUp");
	            $(this.refs.whitelist).velocity(!value ? "slideDown" : "slideUp");
	        }
	    }, {
	        key: 'blacklist',
	        value: function blacklist(event) {
	            this.props.option.blacklist = event.target.value.split("\n");
	            this.props.onChange && this.props.onChange(false);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.exclusionState(this.props.read.auto);
	            this.tocState(this.props.read.toc);
	            this.cleanupState(this.props.read.cleanup == undefined ? true : this.props.read.cleanup);
	            this.lazyloadState(this.props.option.preload);
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(state) {
	            state == "custom" && (location.href = location.origin + "/options/custom.html");
	            state == "notice" && (location.href = location.origin + "/options/notice.html?is_update=" + sessionStorage.getItem("is_update"));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return React.createElement(
	                'div',
	                { id: 'labs', style: { width: '100%' } },
	                React.createElement(
	                    'div',
	                    { className: 'label', 'data-head-level': 'h1' },
	                    '\u5168\u5C40'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-hits': 'esc' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.esc,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u542F\u7528 \u300CESC\u300D \u9000\u51FA\u65B9\u5F0F\uFF1F',
	                            desc: '\u5305\u62EC\uFF1Afocus mode\u4E0Ereading mode',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "esc");
	                            } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-hits': 'br_exit' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.br_exit,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u52A8\u4F5C\u680F\u56FE\u6807\u662F\u5426\u6539\u4E3A \u300C\u8FDB\u5165/\u9000\u51FA \u300D\u6A21\u5F0F\uFF1F',
	                            desc: '\u5305\u62EC\uFF1Afocus mode\u548Creading mode\uFF0C\u9ED8\u8BA4\uFF08\u5173\u95ED\uFF09\u4E3A\u300C\u5F39\u51FA\u8BBE\u5B9A\u5BF9\u8BDD\u6846\u300D',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "br_exit");
	                            } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-hits': 'blacklist' },
	                        React.createElement(
	                            'div',
	                            { style: { 'padding-top': '10px', 'margin-bottom': '8px;' } },
	                            React.createElement(
	                                'div',
	                                { className: 'label', style: { 'margin-bottom': ' -15px' } },
	                                '\u9ED1\u540D\u5355'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'sublabel' },
	                                '\u52A0\u5165\u5176\u4E2D\u540E\uFF0C\u4E0D\u518D\u542F\u52A8\u7B80\u60A6\uFF0C\u6709\u522B\u4E8E\u767D\u540D\u5355\u548C\u6392\u9664\u5217\u8868\uFF0C\u9ED1\u540D\u5355\u5219\u5F7B\u5E95\u4E0D\u52A0\u8F7D\u3002'
	                            ),
	                            React.createElement(_textfield2.default, {
	                                multi: true, rows: 8,
	                                placeholder: '\u6BCF\u884C\u4E00\u4E2A\uFF0C\u652F\u6301\uFF1A URL\uFF0C hostname \u7B49\u3002',
	                                value: (this.props.option.blacklist || []).join("\n"),
	                                onChange: function onChange(e) {
	                                    return _this2.blacklist(e);
	                                }
	                            })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-hits': 'secret' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.secret,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u540C\u6B65\u65F6\u662F\u5426\u5305\u542B\u6388\u6743\u670D\u52A1\u4E2D\u7684\u6388\u6743\u7801\uFF1F',
	                            desc: '\u5305\u62EC\uFF1A\u5BFC\u51FA\u914D\u7F6E\u6587\u4EF6\u5230\u672C\u5730\uFF0C\u9ED8\u8BA4\uFF08\u5173\u95ED\uFF09\u4E3A\u4E0D\u540C\u6B65\uFF1B\u542F\u7528\u540E\uFF0C\u8BF7\u59A5\u5584\u4FDD\u7BA1\u4F60\u7684\u6388\u6743\u7801',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "secret");
	                            } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-version': '1.1.3', 'data-hits': 'save_at' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.save_at == "dropbox" ? true : false,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u4FDD\u5B58\u914D\u7F6E\u5230 Dropbox \uFF1F',
	                            desc: '\u6CE8\u610F\uFF1A\u9ED8\u8BA4\uFF08\u5DF2\u52FE\u9009\u72B6\u6001\uFF09\u4FDD\u5B58\u5230 Dropbox \uFF1B\u9009\u5426\u540E\uFF08\u975E\u52FE\u9009\u72B6\u6001\uFF09\u4FDD\u5B58\u5230 \u3010\u575A\u679C\u4E91\u3011\u3002',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "save_at");
	                            } })
	                    ),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.props.option.uninstall ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: '\u5220\u9664\u540E\u662F\u5426\u7ED9\u6211\u53CD\u9988\uFF1F',
	                        desc: '\u5EFA\u8BAE\u5F00\u542F\u6B64\u9009\u9879\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u77E5\u9053\u4F60\u662F\u8C01\uFF0C\u4F46\u4F60\u53EF\u4EE5\u5E2E\u52A9\u7B80\u60A6\u53D8\u5F97\u66F4\u597D\u3002',
	                        onChange: function onChange(s) {
	                            return _this2.onChange(s, "option", "uninstall");
	                        } })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'menu' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1' },
	                        '\u53F3\u952E\u83DC\u5355'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px' }, className: 'lab' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.focus,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300Cfocus mode\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "focus");
	                            } }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.read,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300Creading mode\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "read");
	                            } }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.link,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300C\u4F7F\u7528reading mode\u6253\u5F00\u6B64\u94FE\u63A5\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "link");
	                            } }),
	                        React.createElement('div', { className: 'dividers' }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.list,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300C\u6253\u5F00\u7A0D\u540E\u8BFB\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "list");
	                            } }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.unrdist,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300C\u52A0\u5165\u5230\u7A0D\u540E\u8BFB\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "unrdist");
	                            } }),
	                        React.createElement('div', { className: 'dividers' }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.whitelist,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300C\u52A0\u5165\u767D\u540D\u5355\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "whitelist");
	                            } }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.exclusion,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300C\u52A0\u5165\u5230\u6392\u9664\u5217\u8868\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "exclusion");
	                            } }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.blacklist,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u663E\u793A\u300C\u52A0\u5165\u5230\u9ED1\u540D\u5355\u300D\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "menu", "blacklist");
	                            } }),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-version': '1.1.4', 'data-hits': 'lazyload' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.option.menu.lazyload,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                                label: '\u662F\u5426\u663E\u793A\u300C\u52A0\u5165\u5230\u5EF6\u8FDF\u52A0\u8F7D\u300D\uFF1F',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "option", "menu", "lazyload");
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-version': '1.1.4', 'data-hits': 'urlscheme' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.option.urlscheme,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                                label: '\u9ED8\u8BA4\u5F39\u51FA\u7F16\u8F91\u6846\uFF0C\u53D6\u6D88\u540E\u610F\u5473\u7740\u76F4\u63A5\u4FDD\u5B58',
	                                desc: '\u5305\u62EC\uFF1A\u9ED1\u540D\u5355 \xB7 \u767D\u540D\u5355 \xB7 \u6392\u9664\u5217\u8868 \xB7 \u5EF6\u8FDF\u52A0\u8F7D\u5747\u53EF\u4F7F\u7528',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "option", "urlscheme");
	                                } })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'focusconfig' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1' },
	                        'focus mode'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px' }, className: 'lab' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.focus.mask,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u542F\u7528\u70B9\u51FB\u7A7A\u767D\uFF08\u906E\u7F69\uFF09\u9000\u51FA\u529F\u80FD\uFF1F',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "focus", "mask");
	                            } }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.focus.controlbar,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u4E00\u76F4\u663E\u793A\u53F3\u4E0B\u89D2\u7684\u63A7\u5236\u680F\uFF1F',
	                            desc: '\u5173\u95ED\u610F\u5473\u7740\u300C\u9F20\u6807\u79FB\u4E0A\u65F6\u624D\u663E\u793A\u300D',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "focus", "controlbar");
	                            } }),
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.focus.highlight,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: '\u662F\u5426\u542F\u7528\u624B\u52A8focus mode\uFF1F',
	                            desc: '\u5173\u95ED\u610F\u5473\u7740\u4F7F\u7528\u300C\u81EA\u52A8focus mode\u300D',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "focus", "highlight");
	                            } })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'readconfig' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1' },
	                        'reading mode'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px' }, className: 'lab' },
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'progress' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.read.progress,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                                label: '\u662F\u5426\u663E\u793A\u9605\u8BFB\u8FDB\u5EA6\uFF1F',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "read", "progress");
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'readcontrolbar' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.read.controlbar,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                                label: '\u662F\u5426\u4E00\u76F4\u663E\u793A\u53F3\u4E0B\u89D2\u7684\u63A7\u5236\u680F\uFF1F',
	                                desc: '\u5173\u95ED\u610F\u5473\u7740\u300C\u9F20\u6807\u79FB\u4E0A\u65F6\u624D\u663E\u793A\u300D',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "read", "controlbar");
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'fap' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.read.fap,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                                label: '\u662F\u5426\u542F\u7528\u9AD8\u7EA7\u63A7\u5236\u680F\u9762\u677F\uFF1F',
	                                desc: '\u5173\u95ED\u610F\u5473\u7740\u300C\u4F7F\u7528\u6D6E\u52A8\u63A7\u5236\u680F\u300D',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "read", "fap");
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'highlight' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.read.highlight,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                                label: '\u624B\u52A8\u6846\u9009\u65F6\u662F\u5426\u542F\u52A8\u4E8C\u6B21\u786E\u8BA4\u6A21\u5F0F\uFF1F',
	                                desc: '\u4E8C\u6B21\u786E\u8BA4\u6A21\u5F0F\u80FD\u7CBE\u51C6\u7684\u5B9A\u4F4D\u9700\u8981reading mode\u7684\u5185\u5BB9\u3002',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "read", "highlight");
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'toc' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.read.toc,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                                label: '\u662F\u5426\u81EA\u52A8\u751F\u6210\u5927\u7EB2\uFF08\u76EE\u5F55\uFF09\uFF1F',
	                                desc: '\u53EA\u6574\u7406 h1, h2, h3, h4 \u7684\u5185\u5BB9\u4E3A\u5927\u7EB2',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "read", "toc");
	                                } }),
	                            React.createElement(
	                                'div',
	                                { ref: 'toc' },
	                                React.createElement(_switch2.default, { width: '100%', checked: this.props.read.toc_hide,
	                                    thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                                    label: '\u5927\u7EB2\uFF08\u76EE\u5F55\uFF09\u662F\u5426\u5F00\u542F\u300C\u9F20\u6807\u79FB\u52A8\u5230\u5DE6\u4E0A\u89D2\u300D\u81EA\u52A8\u663E\u793A\uFF1F',
	                                    desc: '\u5173\u95ED\u610F\u5473\u7740\u300C\u4E00\u76F4\u663E\u793A\u300D',
	                                    onChange: function onChange(s) {
	                                        return _this2.onChange(s, "read", "toc_hide");
	                                    } })
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'readauto' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.read.auto,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                                desc: '\u6CE8\u610F\uFF1A\u6B64\u529F\u80FD\u53EA\u5305\u542B\u5DF2\u9002\u914D\u7684\u7AD9\u70B9\uFF0C\u667A\u80FD\u8BC6\u522B\u51FA\u6B63\u6587\u7684\u7AD9\u70B9\u65E0\u6CD5\u4F7F\u7528\u6B64\u529F\u80FD\uFF0C\u4F46\u4ECD\u53EF\u901A\u8FC7\u624B\u52A8\u65B9\u5F0F\u8FDB\u5165reading mode\u3002',
	                                label: '\u5982\u679C\u5F53\u524D\u9875\u9762\u4E3A\u9002\u914D\u7AD9\u70B9\uFF0C\u662F\u5426\u81EA\u52A8\u8FDB\u5165reading mode\uFF1F',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "read", "auto");
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'exclusion' },
	                            React.createElement(
	                                'div',
	                                { ref: 'exclusion', style: { 'padding-top': '10px', 'margin-bottom': '8px;' } },
	                                React.createElement(
	                                    'div',
	                                    { className: 'label', style: { 'margin-bottom': ' -15px' } },
	                                    '\u6392\u9664\u5217\u8868'
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'sublabel' },
	                                    '\u52A0\u5165\u5176\u4E2D\u540E\u5C06\u4E0D\u4F1A\u81EA\u52A8\u8FDB\u5165reading mode\uFF0C\u4EC5\u5F53\u542F\u7528\u300C\u81EA\u52A8\u8FDB\u5165reading mode\u300D\u6709\u6548\u3002'
	                                ),
	                                React.createElement(_textfield2.default, {
	                                    multi: true, rows: 8,
	                                    placeholder: '\u6BCF\u884C\u4E00\u4E2A\uFF0C\u652F\u6301\uFF1A URL, minimatch \u7B49\u3002',
	                                    value: (this.props.read.exclusion || []).join("\n"),
	                                    onChange: function onChange(e) {
	                                        return _this2.changeExclusion(e);
	                                    }
	                                })
	                            ),
	                            React.createElement(
	                                'div',
	                                { ref: 'whitelist', style: { 'padding-top': '10px', 'margin-bottom': '8px;' } },
	                                React.createElement(
	                                    'div',
	                                    { className: 'label', style: { 'margin-bottom': ' -15px' } },
	                                    '\u767D\u540D\u5355'
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'sublabel' },
	                                    '\u52A0\u5165\u5176\u4E2D\u540E\u5C06\u81EA\u52A8\u8FDB\u5165reading mode\uFF0C\u4EC5\u5F53\u7981\u7528\u300C\u81EA\u52A8\u8FDB\u5165reading mode\u300D\u6709\u6548\u3002'
	                                ),
	                                React.createElement(_textfield2.default, {
	                                    multi: true, rows: 8,
	                                    placeholder: '\u6BCF\u884C\u4E00\u4E2A\uFF0C\u652F\u6301\uFF1A URL, minimatch \u7B49\u3002',
	                                    value: (this.props.read.whitelist || []).join("\n"),
	                                    onChange: function onChange(e) {
	                                        return _this2.changeWhitelist(e);
	                                    }
	                                })
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'pured' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1', 'data-head-title': '\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE' },
	                        '\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE ',
	                        React.createElement(
	                            'a',
	                            { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE', style: { color: ' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' } },
	                            '\u6D4B\u8BD5\u7248'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.read.cleanup == undefined ? true : this.props.read.cleanup,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                            label: '\u662F\u5426\u542F\u7528\u589E\u5F3A\u89E3\u6790\u6A21\u5F0F\uFF1F',
	                            desc: '\u589E\u5F3A\u89E3\u6790\u6A21\u5F0F\u4F1A\u5BF9\u7248\u9762\u91CD\u65B0\u8BBE\u8BA1\uFF0C\u5305\u62EC\uFF1A\u53BB\u9664\u591A\u4F59\u7A7A\u683C\u3001\u4F18\u5316\u7248\u9762\u7ED3\u6784\u7B49\uFF0C\u6B64\u529F\u80FD\u4E3A\u6D4B\u8BD5\u7248\uFF0C\u9047\u5230\u89E3\u6790\u5931\u8D25\u65F6\uFF0C\u8BF7\u5173\u95ED\u6B64\u529F\u80FD\u3002',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "read", "cleanup");
	                            } }),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'puredpure' },
	                            React.createElement(
	                                'div',
	                                { ref: 'cleanup', style: { 'padding-top': '10px', 'margin-bottom': '8px;' } },
	                                React.createElement(_switch2.default, { width: '100%', checked: this.props.read.pure,
	                                    thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                                    label: '\u7EAF\u7CB9\u6A21\u5F0F',
	                                    desc: '\u6BD4\u3010\u589E\u5F3A\u89E3\u6790\u6A21\u5F0F\u3011\u8FD8\u8981\u5F7B\u5E95\u4F18\u5316\u7248\u672C\uFF0C\u5305\u62EC\uFF1A\u5B57\u5F62\u3001\u989C\u8272\u3001\u5B57\u53F7\u3001\u4EE3\u7801\u6BB5\u7B49\uFF0C\u4E13\u6CBB\u9875\u9762\u53CA\u4E0D\u89C4\u8303\uFF0C\u5982\uFF1A\u5FAE\u4FE1\u8BA2\u9605\u53F7\uFF0CCSDN \u7B49\u3002',
	                                    onChange: function onChange(s) {
	                                        return _this2.onChange(s, "read", "pure");
	                                    } }),
	                                React.createElement(
	                                    'div',
	                                    { className: 'sublabel' },
	                                    '\u5982\u679C\u7ECF\u5E38\u9605\u8BFB\u4EE3\u7801\u7684\u8BDD\uFF0C\u8BF7\u5B89\u88C5 ',
	                                    React.createElement(
	                                        'a',
	                                        { target: '_blank', href: 'https://simpread.ksria.cn/plugins/details/klGUASLasg' },
	                                        '\u4EE3\u7801\u6BB5\u589E\u5F3A'
	                                    ),
	                                    ' \u5305\u62EC\uFF1A\u9AD8\u4EAE\uFF0C\u53BB\u91CD\uFF0C\u652F\u6301 CSDN \u7B49\u7279\u6B8A\u60C5\u51B5\u7684\u4EE3\u7801\u6BB5'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-version': '1.1.3', 'data-hits': 'preload' },
	                            React.createElement(_switch2.default, { width: '100%', checked: this.props.option.preload,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                                label: '\u662F\u5426\u542F\u7528\u9884\u52A0\u8F7D\u673A\u5236\uFF1F',
	                                desc: '1. \u7B80\u60A6\u7684\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE\u91C7\u7528\u4E86\u9884\u52A0\u8F7D\u673A\u5236\uFF0C\u5982\u679C\u4F60\u89C9\u5F97\u5F71\u54CD\u6027\u80FD\u7684\u8BDD\uFF0C\u8BF7\u5173\u95ED\u6B64\u529F\u80FD\u3002',
	                                onChange: function onChange(s) {
	                                    return _this2.onChange(s, "option", "preload");
	                                } }),
	                            React.createElement(
	                                'div',
	                                { className: 'sublabel' },
	                                '2. \u5173\u95ED\u6B64\u529F\u80FD\u540E\uFF0C\u53EA\u6709\u8FDB\u5165reading mode\u65F6\u624D\u4F1A\u5BF9\u9875\u9762\u8FDB\u884C\u89E3\u6790\uFF0C\u6240\u4EE5\u7ECF\u5E38\u4F7F\u7528\u7B80\u60A6\u7684\u7528\u6237\u8BF7\u52FF\u5173\u95ED\u5B83\u3002'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'sublabel' },
	                                '3. \u6B64\u529F\u80FD\u7684\u4F18\u5148\u7EA7\u6BD4\u300C\u81EA\u52A8\u8FDB\u5165reading mode\u300D\u9AD8\uFF1B\u5F53\u5173\u95ED\u6B64\u529F\u80FD\u65F6\uFF0C\u81EA\u52A8\u8FDB\u5165reading mode\u5C06\u4E0D\u4F1A\u5DE5\u4F5C\u3002'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-version': '1.1.3', 'data-hits': 'lazyload' },
	                            React.createElement(
	                                'div',
	                                { ref: 'lazyload', style: { 'padding-top': '10px', 'margin-bottom': '8px;' } },
	                                React.createElement(
	                                    'div',
	                                    { className: 'label', style: { 'margin-bottom': ' -15px' } },
	                                    '\u5EF6\u8FDF\u52A0\u8F7D\u5217\u8868'
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'sublabel' },
	                                    '\u52A0\u5165\u5176\u4E2D\u540E\u7684\u7F51\u5740\u5C06\u4E0D\u4F1A\u542F\u7528\u9884\u52A0\u8F7D\u529F\u80FD\u3002'
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'sublabel' },
	                                    '\u6B64\u529F\u80FD\u9002\u5408\u300C\u7ECF\u5E38\u4F7F\u7528\u7B80\u60A6\u4F46\u53C8\u6027\u80FD\u4E0D\u591F\u300D\u7684\u7528\u6237\u3001\u9700\u8981\u52A8\u6001\u52A0\u8F7D\u53CA\u652F\u6301 Mathjax \u89E3\u6790\u7684\u9875\u9762\u7B49\u3002'
	                                ),
	                                React.createElement(_textfield2.default, {
	                                    multi: true, rows: 8,
	                                    placeholder: '\u6BCF\u884C\u4E00\u4E2A\uFF0C\u652F\u6301\uFF1A URL, minimatch \u7B49\u3002',
	                                    value: (this.props.option.lazyload || []).join("\n"),
	                                    onChange: function onChange(e) {
	                                        return _this2.changeLazyload(e);
	                                    }
	                                })
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'auth' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1' },
	                        '\u6388\u6743\u7BA1\u7406'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px' }, className: 'lab' },
	                        React.createElement(_authorize2.default, null)
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'custom' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1' },
	                        '\u81EA\u5B9A\u4E49\u6837\u5F0F'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab', onClick: function onClick() {
	                                return _this2.onClick('custom');
	                            } },
	                        React.createElement(
	                            'div',
	                            { className: 'more', style: { 'cursor': 'pointer' } },
	                            React.createElement(
	                                'div',
	                                null,
	                                '\u589E\u5F3A\u300C\u4E2D\u6587\u9605\u8BFB\u4F53\u9A8C\u300D\u8BBE\u7F6E'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'desc' },
	                                '\u5305\u62EC\uFF1A\u6807\u9898\u3001\u63CF\u8FF0\u3001\u6B63\u6587\u7684\u5B57\u95F4\u8DDD\u3001\u884C\u95F4\u8DDD\u3001\u9996\u884C\u7F29\u8FDB\u7B49\u53CA\u81EA\u5B9A\u4E49 CSS\u3002'
	                            ),
	                            React.createElement('span', { className: 'arrow' })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-version': '1.1.3', 'data-hits': 'notice' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1' },
	                        '\u6D88\u606F\u4E2D\u5FC3'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.props.option.notice,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB',
	                            label: '\u5F53\u6CA1\u6709\u672A\u8BFB\u4FE1\u606F\u65F6\uFF0C\u662F\u5426\u663E\u793A\u53F3\u4E0B\u89D2\u63D0\u793A\u6846\uFF1F',
	                            desc: '\u5173\u95ED\u540E\uFF0C\u5F53\u6CA1\u6709\u65B0\u7684\u672A\u8BFB\u4FE1\u606F\u65F6\uFF0C\u9690\u85CF\u672A\u8BFB\u63D0\u793A\uFF1B\u5F53\u6709\u65B0\u7684\u6D88\u606F\u65F6\uFF0C\u4ECD\u4F1A\u5728\u53F3\u4E0B\u89D2\u663E\u793A\u672A\u8BFB\u63D0\u793A\u3002',
	                            onChange: function onChange(s) {
	                                return _this2.onChange(s, "option", "notice");
	                            } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab', onClick: function onClick() {
	                                return _this2.onClick('notice');
	                            } },
	                        React.createElement(
	                            'div',
	                            { className: 'more', style: { 'cursor': 'pointer' } },
	                            React.createElement(
	                                'div',
	                                null,
	                                '\u67E5\u770B\u5168\u90E8\u6D88\u606F'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'desc' },
	                                '\u7B80\u60A6\u4F1A\u4E0D\u5B9A\u671F\u53D1\u9001\u4E00\u4E9B\u6D88\u606F\uFF0C\u5305\u62EC\uFF1A\u65B0\u7684\u63D2\u4EF6\u4E0A\u7EBF\u3001\u65B0\u7684\u9002\u914D\u7AD9\u70B9\u4E0A\u7EBF\u3001\u4FEE\u590D Bug \u7B49'
	                            ),
	                            React.createElement('span', { className: 'arrow' })
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return LabsOpt;
	}(React.Component);
	
	LabsOpt.defaultProps = {
	    option: {},
	    read: {},
	    focus: {}
	};
	LabsOpt.propTypes = {
	    option: React.PropTypes.object,
	    read: React.PropTypes.object,
	    focus: React.PropTypes.object,
	    onChange: React.PropTypes.func
	};
	exports.default = LabsOpt;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _storage = __webpack_require__(2);
	
	var _export = __webpack_require__(568);
	
	var exp = _interopRequireWildcard(_export);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	var _browser = __webpack_require__(334);
	
	var _permission = __webpack_require__(341);
	
	var permission = _interopRequireWildcard(_permission);
	
	var _notify = __webpack_require__(336);
	
	var _notify2 = _interopRequireDefault(_notify);
	
	var _switch = __webpack_require__(619);
	
	var _switch2 = _interopRequireDefault(_switch);
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _dropdown = __webpack_require__(622);
	
	var _dropdown2 = _interopRequireDefault(_dropdown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option labs:Authorize load =====");
	
	var Auth = function (_React$Component) {
	    _inherits(Auth, _React$Component);
	
	    function Auth() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Auth);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Auth.__proto__ || Object.getPrototypeOf(Auth)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            secret: undefined,
	            linnk: undefined,
	            instapaper: undefined,
	            jianguo: undefined,
	            weizhi: undefined,
	            notion: undefined,
	            youdao: undefined
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Auth, [{
	        key: 'onChange',
	        value: function onChange(state, value, flag) {
	            var _this2 = this;
	
	            var notify = void 0;
	
	            var dropbox = exp.dropbox,
	                pocket = exp.pocket,
	                instapaper = exp.instapaper,
	                linnk = exp.linnk,
	                evernote = exp.evernote,
	                onenote = exp.onenote,
	                gdrive = exp.gdrive,
	                jianguo = exp.jianguo,
	                yuque = exp.yuque,
	                notion = exp.notion,
	                youdao = exp.youdao,
	                weizhi = exp.weizhi,
	                clear = function clear(id, name) {
	                Object.keys(_storage.storage.secret[id]).forEach(function (item) {
	                    return _storage.storage.secret[id][item] = "";
	                });
	                _storage.storage.Safe(function () {
	                    new _notify2.default().Render('\u5DF2\u53D6\u6D88\u5BF9 ' + name + ' \u7684\u6388\u6743\uFF0C\u4E5F\u8BF7\u89E3\u9664\u7B80\u60A6\u7684\u8BBF\u95EE\u6743\u9650\uFF0C <a target="_blank" href="' + exp.Unlink(id) + '">\u70B9\u51FB\u8FD9\u91CC</a>');
	                    _this2.setState({ secret: _storage.storage.secret });
	                }, _storage.storage.secret);
	            },
	                success = function success(id, name, data) {
	                notify && notify.complete();
	                Object.keys(data).forEach(function (item) {
	                    return _storage.storage.secret[id][item] = data[item];
	                });
	                id == "jianguo" && (_storage.storage.secret[id]["access_token"] = { username: data.username, password: data.password });
	                _storage.storage.Safe(function () {
	                    new _notify2.default().Render('\u5DF2\u6210\u529F\u6388\u6743 ' + name + ' \u3002');
	                    id == "linnk" && _this2.setState({ secret: _storage.storage.secret, linnk: false });
	                    id == "instapaper" && _this2.setState({ secret: _storage.storage.secret, instapaper: false });
	                    id == "jianguo" && _this2.setState({ secret: _storage.storage.secret, jianguo: false });
	                    id == "weizhi" && _this2.setState({ secret: _storage.storage.secret, weizhi: false });
	                    id == "notion" && _this2.setState({ secret: _storage.storage.secret, notion: notion.blocks });
	                    id == "youdao" && _this2.setState({ secret: _storage.storage.secret, youdao: youdao.folders });
	                    if (location.hash.startsWith("#labs?auth=")) {
	                        new _notify2.default().Render("3 秒钟将会关闭此页面...");
	                        setTimeout(function () {
	                            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.auth_success, { url: location.href, type: "auth", name: id }));
	                        }, 3000);
	                    }
	                }, _storage.storage.secret);
	            },
	                failed = function failed(error, id, name) {
	                notify && notify.complete();
	                console.error(name + ' auth faild, error: ' + error);
	                id == "youdao" || id == "notion" ? new _notify2.default().Render(2, '\u83B7\u53D6 ' + name + ' \u6388\u6743\u5931\u8D25\uFF0C' + error) : new _notify2.default().Render(2, '\u83B7\u53D6 ' + name + ' \u6388\u6743\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u3002');
	                _storage.storage.secret[state].access_token = "";
	                _this2.setState({ secret: _storage.storage.secret });
	            };
	
	            if (state == "linnk" && !flag && !_storage.storage.secret.linnk.access_token) {
	                this.setState({ linnk: !this.state.linnk });
	                return;
	            }
	
	            if (state == "instapaper" && !flag && !_storage.storage.secret.instapaper.access_token) {
	                this.setState({ instapaper: !this.state.instapaper });
	                return;
	            }
	
	            if (state == "jianguo" && !flag && !_storage.storage.secret.jianguo.username) {
	                this.setState({ jianguo: !this.state.jianguo });
	                return;
	            }
	
	            if (state == "weizhi" && !flag && !_storage.storage.secret.weizhi.username) {
	                this.setState({ weizhi: !this.state.weizhi });
	                return;
	            }
	
	            if (!value) {
	                state == "pocket" && $(this.refs.pocket_tags).velocity(value ? "slideDown" : "slideUp");
	                if (state == "linnk") {
	                    this.props.linnk.username = "";
	                    this.props.linnk.password = "";
	                }
	                if (state == "instapaper") {
	                    this.props.instapaper.username = "";
	                    this.props.instapaper.password = "";
	                }
	                if (state == "jianguo") {
	                    this.props.jianguo.username = "";
	                    this.props.jianguo.password = "";
	                }
	                if (state == "weizhi") {
	                    this.props.weizhi.username = "";
	                    this.props.weizhi.password = "";
	                    this.props.weizhi.access_token = "";
	                }
	                if (state == "youdao") {
	                    permission.Remove(youdao.permissions, function (result) {
	                        return new _notify2.default().Render('\u5DF2\u53D6\u6D88 cookies \u6743\u9650\u3002');
	                    });
	                }
	                clear(state, exp.Name(state));
	                return;
	            }
	
	            new _notify2.default().Render({ content: "授权中，请勿关闭此页面，授权成功后会有提示。", delay: 10000 });
	
	            switch (state) {
	                case "dropbox":
	                    dropbox.New().Auth();
	                    dropbox.dtd.done(function () {
	                        return success(dropbox.id, dropbox.name, { access_token: dropbox.access_token });
	                    }).fail(function (error) {
	                        return failed(error, dropbox.id, dropbox.name);
	                    });
	                    break;
	                case "pocket":
	                    notify = new _notify2.default().Render({ content: '\u5F00\u59CB\u5BF9 ' + pocket.name + ' \u8FDB\u884C\u6388\u6743\uFF0C\u8BF7\u7A0D\u7B49...', state: "loading" });
	                    pocket.Request(function (result, error) {
	                        if (error) failed(error, pocket.id, pocket.name);else {
	                            pocket.New().Login(result.code);
	                            pocket.dtd.done(function () {
	                                pocket.Auth(function (result, error) {
	                                    if (error) failed(error, pocket.id, pocket.name);else success(pocket.id, pocket.name, { access_token: pocket.access_token });
	                                });
	                            }).fail(function (error) {
	                                return failed(error, pocket.id, pocket.name);
	                            });
	                        }
	                    });
	                    break;
	                case "instapaper":
	                    instapaper.Login(this.props.instapaper.username, this.props.instapaper.password, function (result, error) {
	                        if (error) failed(error, instapaper.id, instapaper.name);else success(instapaper.id, instapaper.name, { access_token: instapaper.access_token, token_secret: instapaper.token_secret });
	                    });
	                    break;
	                case "linnk":
	                    linnk.Login(this.props.linnk.username, this.props.linnk.password, function (result, error) {
	                        if (error) failed(error, linnk.id, linnk.name);else if (result.code == 200) {
	                            linnk.Groups(function (result) {
	                                if (result.code == 200) {
	                                    linnk.GetGroup("", result.data);
	                                    success(linnk.id, linnk.name, { access_token: linnk.access_token, group_name: linnk.group_name });
	                                } else {
	                                    var _msg = linnk.error_code[result.code];
	                                    new _notify2.default().Render(2, _msg ? _msg : '\u83B7\u53D6 ' + linnk.name + ' \u6388\u6743\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u3002');
	                                }
	                            });
	                        } else {
	                            var _msg2 = linnk.error_code[result.code];
	                            new _notify2.default().Render(2, _msg2 ? _msg2 : '\u83B7\u53D6 ' + linnk.name + ' \u6388\u6743\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u3002');
	                        }
	                    });
	                    break;
	                case "yinxiang":
	                case "evernote":
	                    evernote.env = state;
	                    evernote.sandbox = false;
	                    notify = new _notify2.default().Render({ content: '\u5F00\u59CB\u5BF9 ' + evernote.name + ' \u8FDB\u884C\u6388\u6743\uFF0C\u8BF7\u7A0D\u7B49...', state: "loading" });
	                    evernote.New().RequestToken(function (result, error) {
	                        if (error) failed(error, evernote.id, evernote.name);else {
	                            evernote.dtd.done(function () {
	                                evernote.Auth(function (result, error) {
	                                    if (error) failed(error, evernote.id, evernote.name);else success(evernote.id, evernote.name, { access_token: evernote.access_token });
	                                });
	                            }).fail(function (error) {
	                                return failed(error, evernote.id, evernote.name);
	                            });
	                        }
	                    });
	                    break;
	                case "onenote":
	                    onenote.New().Login();
	                    onenote.dtd.done(function () {
	                        onenote.Auth(function (result, error) {
	                            if (error) failed(error, onenote.id, onenote.name);else success(onenote.id, onenote.name, { access_token: onenote.access_token });
	                        });
	                    }).fail(function (error) {
	                        return failed(error, onenote.id, onenote.name);
	                    });
	                    break;
	                case "gdrive":
	                    gdrive.New().Login();
	                    gdrive.dtd.done(function () {
	                        gdrive.Auth(function (result, error) {
	                            if (error) failed(error, gdrive.id, gdrive.name);else success(gdrive.id, gdrive.name, { access_token: gdrive.access_token, folder_id: gdrive.folder_id });
	                        });
	                    }).fail(function (error) {
	                        return failed(error, gdrive.id, gdrive.name);
	                    });
	                    break;
	                case "yuque":
	                    yuque.New().Login();
	                    yuque.dtd.done(function () {
	                        yuque.Auth(function (result, error) {
	                            if (error) failed(error, yuque.id, yuque.name);else {
	                                yuque.GetUser(function (result, error) {
	                                    if (error) failed(error, yuque.id, yuque.name);else {
	                                        yuque.GetRepos(function (result, error) {
	                                            if (error) failed(error, yuque.id, yuque.name);else if (yuque.repos_id != "") {
	                                                success(yuque.id, yuque.name, { access_token: yuque.access_token, repos_id: yuque.repos_id });
	                                            } else {
	                                                yuque.CreateRepo(function (result, error) {
	                                                    if (error) failed(error, yuque.id, yuque.name);else success(yuque.id, yuque.name, { access_token: yuque.access_token, repos_id: yuque.repos_id });
	                                                });
	                                            }
	                                        });
	                                    }
	                                });
	                            }
	                        });
	                    }).fail(function (error) {
	                        return failed(error, yuque.id, yuque.name);
	                    });
	                    break;
	                case "notion":
	                    notion.Auth(function (result, error, warn) {
	                        if (error) failed(error, notion.id, notion.name);else {
	                            warn != "" && new _notify2.default().Render({ type: 2, content: '\u8BF7\u6CE8\u610F\uFF1A\u6388\u6743\u65F6\u51FA\u73B0\u4E86\u95EE\u9898\u5BFC\u81F4 <b>\u4EC5\u6210\u529F\u6388\u6743\u4E86</b> \u60A8\u7684\u7B2C\u4E00\u4E2A Notion Page \u867D\u7136\u4E0D\u5F71\u54CD\u5BFC\u51FA\u670D\u52A1\uFF0C\u4F46\u5EFA\u8BAE\u63D0 <a target="_blank" href="https://github.com/Kenshin/simpread/issues/809"><b>Issues</b></a>', state: "holdon" });
	                            success(notion.id, notion.name, { access_token: notion.access_token, folder_id: notion.folder_id, save_image: notion.save_image, type: notion.type });
	                        }
	                    });
	                    break;
	                case "youdao":
	                    permission.Get(youdao.permissions, function (result) {
	                        if (!result) {
	                            new _notify2.default().Render(2, '\u6B64\u529F\u80FD\u9700\u8981\u7533\u8BF7 cookies \u6743\u9650\u540E\u624D\u80FD\u4F7F\u7528\uFF0C\u6388\u6743\u6210\u529F\u540E\u4F1A\u81EA\u52A8\u53D6\u6D88\u3002');
	                            _this2.setState({ secret: _storage.storage.secret });
	                            return;
	                        }
	                        setTimeout(function () {
	                            youdao.Auth(function (result, error) {
	                                if (error) failed(error, youdao.id, youdao.name);else success(youdao.id, youdao.name, { access_token: youdao.access_token, folder_id: youdao.folder_id });
	                            });
	                        }, 500);
	                    });
	                    break;
	                case "jianguo":
	                    jianguo.Auth(this.props.jianguo.username, this.props.jianguo.password, function (result) {
	                        if (result && result.status == 401) {
	                            failed("授权错误，请重新授权。", jianguo.id, jianguo.name);
	                        } else success("jianguo", "坚果云", { username: _this2.props.jianguo.username, password: _this2.props.jianguo.password });
	                    });
	                    break;
	                case "weizhi":
	                    if (location.hash.startsWith("#labs?auth=")) {
	                        this.props.weizhi.username = _storage.storage.secret.weizhi.username;
	                        this.props.weizhi.password = _storage.storage.secret.weizhi.password;
	                    }
	                    weizhi.Auth(this.props.weizhi.username, this.props.weizhi.password, function (result) {
	                        if (result && result.status == 401) {
	                            failed("授权错误，请重新授权。", weizhi.id, weizhi.name);
	                        } else {
	                            if (result && result.returnCode == 200) success("weizhi", "为知笔记", { username: _this2.props.weizhi.username, password: _this2.props.weizhi.password, access_token: weizhi.access_token });else failed("授权错误，请重新授权。", weizhi.id, weizhi.name);
	                        }
	                    });
	                    break;
	            }
	        }
	    }, {
	        key: 'save',
	        value: function save(state, value) {
	            var _this3 = this;
	
	            state == "pocket" && (_storage.storage.secret.pocket.tags = value.trim());
	            state == "linnk" && (_storage.storage.secret.linnk.group_name = value.trim());
	            state == "youdao" && (_storage.storage.secret.youdao.folder_id = value.trim());
	            state == "notion_save_image" && (_storage.storage.secret.notion.save_image = value);
	            if (state == 'notion') {
	                var obj = this.state.notion.filter(function (item) {
	                    return item.value == value.trim();
	                })[0];
	                _storage.storage.secret.notion.folder_id = value.trim();
	                _storage.storage.secret.notion.type = obj.type;
	                obj.schema && (_storage.storage.secret.notion.schema = obj.schema);
	                obj.type == "page" && delete _storage.storage.secret.notion.schema;
	            }
	            _storage.storage.Safe(function () {
	                return _this3.setState({ secret: _storage.storage.secret });
	            }, _storage.storage.secret);
	        }
	    }, {
	        key: 'linnkOnChange',
	        value: function linnkOnChange(state, value) {
	            this.props.linnk[state] = value;
	        }
	    }, {
	        key: 'instapaperOnChange',
	        value: function instapaperOnChange(state, value) {
	            this.props.instapaper[state] = value;
	        }
	    }, {
	        key: 'jianguoOnChange',
	        value: function jianguoOnChange(state, value) {
	            this.props.jianguo[state] = value;
	        }
	    }, {
	        key: 'weizhiOnChange',
	        value: function weizhiOnChange(state, value) {
	            this.props.weizhi[state] = value;
	        }
	    }, {
	        key: 'webdavOnChange',
	        value: function webdavOnChange() {
	            var _this4 = this;
	
	            this.state.secret.webdav = event.target.value.split("\n");
	            _storage.storage.Safe(function () {
	                return _this4.setState({ secret: _storage.storage.secret });
	            }, _storage.storage.secret);
	        }
	    }, {
	        key: 'notionChange',
	        value: function notionChange() {
	            var _this5 = this;
	
	            var notify = new _notify2.default().Render({ state: "loading", content: '\u6B63\u5728\u83B7\u53D6 Notion Page \uFF0C\u8BF7\u7A0D\u7B49' });
	            exp.notion.Auth(function (result, error, warn) {
	                notify.complete();
	                if (error) new _notify2.default().Render({ type: 2, content: 'Notion.so \u5E76\u672A\u63D0\u4F9B API \u6240\u4EE5\u4F1A\u51FA\u73B0 <b>\u83B7\u53D6\u5931\u8D25\u7684\u60C5\u51B5</b>\uFF0C\u5982\u53D1\u751F\u6B64\u95EE\u9898\uFF0C\u8BF7\u63D0 <a target="_blank" href="https://github.com/Kenshin/simpread/issues/809">Issues</a>', state: "holdon" });else {
	                    warn != "" && new _notify2.default().Render({ type: 2, content: '\u8BF7\u6CE8\u610F\uFF1A\u83B7\u53D6\u65F6\u51FA\u73B0\u4E86\u95EE\u9898\u5BFC\u81F4 <b>\u4EC5\u6210\u529F\u83B7\u53D6\u4E86</b> \u60A8\u7684\u7B2C\u4E00\u4E2A Notion Page \u867D\u7136\u4E0D\u5F71\u54CD\u5BFC\u51FA\u670D\u52A1\uFF0C\u4F46\u5EFA\u8BAE\u63D0 <a target="_blank" href="https://github.com/Kenshin/simpread/issues/809"><b>Issues</b></a>', state: "holdon" });
	                    warn == "" && new _notify2.default().Render(1, "获取成功，请选择导出的 Notion Page");
	                    _this5.setState({ secret: _storage.storage.secret, notion: exp.notion.blocks });
	                }
	            });
	        }
	    }, {
	        key: 'youdaoChange',
	        value: function youdaoChange() {
	            var _this6 = this;
	
	            permission.Get(exp.youdao.permissions, function (result) {
	                if (!result) {
	                    new _notify2.default().Render(2, '\u6B64\u529F\u80FD\u9700\u8981\u7533\u8BF7 cookies \u6743\u9650\u540E\u624D\u80FD\u4F7F\u7528\uFF0C\u6388\u6743\u6210\u529F\u540E\u4F1A\u81EA\u52A8\u53D6\u6D88\u3002');
	                    _this6.setState({ secret: _storage.storage.secret });
	                    return;
	                }
	                setTimeout(function () {
	                    exp.youdao.Auth(function (result, error) {
	                        if (result) _this6.setState({ secret: _storage.storage.secret, youdao: exp.youdao.folders });else new _notify2.default().Render(2, '\u91CD\u65B0\u83B7\u53D6\u5931\u8D25\uFF0C' + error);
	                    });
	                }, 500);
	            });
	        }
	    }, {
	        key: 'webdavAuth',
	        value: function webdavAuth() {
	            this.state.secret.webdav.forEach(function (item, idx) {
	                try {
	                    item = JSON.parse(item);
	                    if (Object.keys(item).join("").replace(/url|name|password|user|format/ig, "") != "") {
	                        throw "error";
	                    }
	                    exp.webdav.Auth(item.url, item.user, item.password, function (result) {
	                        if (result && (result.status == 201 || result.status == 405)) {
	                            new _notify2.default().Render(item.name + ' \u9A8C\u8BC1\u6210\u529F\u3002');
	                        } else {
	                            new _notify2.default().Render(2, item.name + ' \u6388\u6743\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u7528\u6237\u540D\u548C\u5BC6\u7801\u3002');
	                        }
	                    });
	                } catch (error) {
	                    new _notify2.default().Render(2, '\u7B2C ' + (idx + 1) + ' \u6761\u6570\u636E\u683C\u5F0F\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165\u3002');
	                }
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ secret: _storage.storage.secret });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this7 = this;
	
	            _storage.storage.Safe(function () {
	                _this7.setState({ secret: _storage.storage.secret });
	                if (location.hash.startsWith("#labs?auth=")) {
	                    _this7.onChange(location.hash.replace("#labs?auth=", ""), true);
	                }
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this8 = this;
	
	            var auth = void 0;
	
	            if (this.state.secret) {
	
	                auth = React.createElement(
	                    'div',
	                    null,
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.dropbox.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.dropbox.access_token ? "已授权 Dropbox，是否取消授权？" : "是否连接并授权 Dropbox ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("dropbox", s);
	                        } }),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.pocket.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.pocket.access_token ? "已授权 Pocket，是否取消授权？" : "是否连接并授权 Pocket ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("pocket", s);
	                        } }),
	                    this.state.secret.pocket.access_token && React.createElement(
	                        'div',
	                        { ref: 'pocket_tags', style: { "width": "60%" } },
	                        React.createElement(_textfield2.default, {
	                            placeholder: '\u8BF7\u586B\u5165 Pocket \u6807\u7B7E\uFF0C\u9ED8\u8BA4\u4E3A simpread \u6BCF\u4E2A\u6807\u7B7E\u7528\u5C0F\u5199, \u5206\u5272\u3002',
	                            value: this.state.secret.pocket.tags,
	                            onChange: function onChange(evt) {
	                                return _this8.save("pocket", evt.target.value);
	                            }
	                        })
	                    ),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.instapaper.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.instapaper.access_token ? "已授权 Instapaper，是否取消授权？" : "是否连接并授权 Instapaper ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("instapaper", s);
	                        } }),
	                    this.state.instapaper && React.createElement(
	                        'div',
	                        { ref: 'instapaper' },
	                        React.createElement(
	                            'div',
	                            { style: { "display": "flex", "flex-direction": "row" } },
	                            React.createElement(_textfield2.default, {
	                                placeholder: '\u8BF7\u586B\u5165 Instapaper \u7528\u6237\u540D\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u7528\u6237\u540D\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.instapaperOnChange("username", evt.target.value);
	                                }
	                            }),
	                            React.createElement(_textfield2.default, {
	                                password: true,
	                                placeholder: '\u8BF7\u586B\u5165 Instapaper \u5BC6\u7801\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u5BC6\u7801\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.instapaperOnChange("password", evt.target.value);
	                                }
	                            })
	                        ),
	                        React.createElement(_button2.default, { type: 'raised', width: '100%', style: { "margin": "0" },
	                            text: '\u767B\u5F55 Instapaper \u5E76\u6388\u6743',
	                            color: '#fff', backgroundColor: '#3F51B5',
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick(s) {
	                                return _this8.onChange("instapaper", s, "login");
	                            } })
	                    ),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.linnk.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.linnk.access_token ? "已授权 Linnk，是否取消授权？" : "是否连接并授权 Linnk ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("linnk", s);
	                        } }),
	                    this.state.secret.linnk.access_token && React.createElement(
	                        'div',
	                        { style: { "width": "60%" } },
	                        React.createElement(_textfield2.default, {
	                            value: this.state.secret.linnk.group_name,
	                            placeholder: '\u8BF7\u586B\u5165 Linnk \u6536\u85CF\u5939\u540D\u79F0\uFF0C\u9ED8\u8BA4\u4FDD\u5B58\u5230 \u6536\u4EF6\u7BB1\u3002',
	                            onChange: function onChange(evt) {
	                                return _this8.save("linnk", evt.target.value);
	                            }
	                        })
	                    ),
	                    this.state.linnk && React.createElement(
	                        'div',
	                        { ref: 'linnk' },
	                        React.createElement(
	                            'div',
	                            { style: { "display": "flex", "flex-direction": "row" } },
	                            React.createElement(_textfield2.default, {
	                                placeholder: '\u8BF7\u586B\u5165 Linnk \u7528\u6237\u540D\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u7528\u6237\u540D\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.linnkOnChange("username", evt.target.value);
	                                }
	                            }),
	                            React.createElement(_textfield2.default, {
	                                password: true,
	                                placeholder: '\u8BF7\u586B\u5165 Linnk \u5BC6\u7801\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u5BC6\u7801\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.linnkOnChange("password", evt.target.value);
	                                }
	                            })
	                        ),
	                        React.createElement(_button2.default, { type: 'raised', width: '100%', style: { "margin": "0" },
	                            text: '\u767B\u5F55 Linnk \u5E76\u6388\u6743',
	                            color: '#fff', backgroundColor: '#3F51B5',
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick(s) {
	                                return _this8.onChange("linnk", s, "login");
	                            } })
	                    ),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.yinxiang.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.yinxiang.access_token ? "已授权 印象笔记，是否取消授权？" : "是否连接并授权 印象笔记 ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("yinxiang", s);
	                        } }),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.evernote.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.evernote.access_token ? "已授权 Evernote，是否取消授权？" : "是否连接并授权 Evernote ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("evernote", s);
	                        } }),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.onenote.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.onenote.access_token ? "已授权 Onenote，是否取消授权？" : "是否连接并授权 Onenote ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("onenote", s);
	                        } }),
	                    React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.gdrive.access_token != "" ? true : false,
	                        thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                        label: this.state.secret.gdrive.access_token ? "已授权 Google 云端硬盘，是否取消授权？" : "是否连接并授权 Google 云端硬盘 ？",
	                        onChange: function onChange(s) {
	                            return _this8.onChange("gdrive", s);
	                        } }),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-version': '1.1.3', 'data-hits': 'jianguo' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.jianguo && this.state.secret.jianguo.username != "" && this.state.secret.jianguo.password ? true : false,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: this.state.secret.jianguo && this.state.secret.jianguo.username != "" ? "已授权 坚果云，是否取消授权？" : "是否连接并授权 坚果云 ？",
	                            onChange: function onChange(s) {
	                                return _this8.onChange("jianguo", s);
	                            } })
	                    ),
	                    this.state.jianguo && React.createElement(
	                        'div',
	                        { ref: 'jianguo' },
	                        React.createElement(
	                            'div',
	                            { style: { "display": "flex", "flex-direction": "row" } },
	                            React.createElement(_textfield2.default, {
	                                placeholder: '\u8BF7\u586B\u5165 \u575A\u679C\u4E91\u7684 WebDAV \u7528\u6237\u540D\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u7528\u6237\u540D\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.jianguoOnChange("username", evt.target.value);
	                                }
	                            }),
	                            React.createElement(_textfield2.default, {
	                                password: true,
	                                placeholder: '\u8BF7\u586B\u5165 \u575A\u679C\u4E91\u7684 WebDAV \u5BC6\u7801\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u5BC6\u7801\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.jianguoOnChange("password", evt.target.value);
	                                }
	                            })
	                        ),
	                        React.createElement(_button2.default, { type: 'raised', width: '100%', style: { "margin": "0" },
	                            text: '\u7ED1\u5B9A \u575A\u679C\u4E91 \u7684\u4FE1\u606F',
	                            color: '#fff', backgroundColor: '#3F51B5',
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick(s) {
	                                return _this8.onChange("jianguo", s, "login");
	                            } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-version': '1.1.3', 'data-hits': 'yuque' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.yuque.access_token != "" ? true : false,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: this.state.secret.yuque.access_token ? "已授权 语雀，是否取消授权？" : "是否连接并授权 语雀 ？",
	                            onChange: function onChange(s) {
	                                return _this8.onChange("yuque", s);
	                            } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-version': '1.1.4', 'data-hits': 'notion' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.notion.access_token != "" ? true : false,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: this.state.secret.notion.access_token ? "已授权 Notion，是否取消授权？" : "是否连接并授权 Notion ？",
	                            onChange: function onChange(s) {
	                                return _this8.onChange("notion", s);
	                            } }),
	                        this.state.secret.notion.access_token && React.createElement(
	                            'div',
	                            { style: { display: "flex", "flex-direction": "column", "justify-content": "center" } },
	                            this.state.notion ? React.createElement(_dropdown2.default, { name: "请选择保存的位置，默认为第一个", items: this.state.notion, width: '100%', onChange: function onChange(v, n) {
	                                    return _this8.save("notion", v);
	                                } }) : React.createElement(_button2.default, { type: 'flat', width: '100%', style: { "margin": "0" },
	                                text: '\u91CD\u65B0\u83B7\u53D6 Notion Page',
	                                color: '#fff', backgroundColor: '#3F51B5',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick(s) {
	                                    return _this8.notionChange();
	                                } }),
	                            React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.notion.save_image,
	                                thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                                label: '\u662F\u5426\u4F7F\u7528 Notion.so \u4F5C\u4E3A\u56FE\u5E8A\uFF1F',
	                                desc: '\u7531\u4E8E Notion \u5E76\u672A\u516C\u5F00 API \u6240\u4EE5\u6B64\u65B9\u5F0F\u8F83\u6162\u3002',
	                                onChange: function onChange(s) {
	                                    return _this8.save("notion_save_image", s);
	                                } }),
	                            React.createElement(
	                                'span',
	                                { className: 'desc', style: { "margin-top": "8px", "text-align": "left" } },
	                                '\u6CE8\u610F\uFF1A\u7531\u4E8E Notion.so \u6682\u672A\u63D0\u4F9B API \u6240\u4EE5\u4F1A\u51FA\u73B0 ',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '\u6388\u6743'
	                                ),
	                                ' \u6216 ',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '\u83B7\u53D6 Notion Page'
	                                ),
	                                ' \u5931\u8D25\u7684\u60C5\u51B5\uFF0C\u5982\u9047\u5230\u6B64\u60C5\u51B5\uFF0C\u8BF7\u63D0 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'https://github.com/Kenshin/simpread/issues/809' },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        'Issues'
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-version': '1.1.4', 'data-hits': 'youdao' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.youdao.access_token != "" ? true : false,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: this.state.secret.youdao.access_token ? "已授权 有道云笔记" : "是否连接并授权 有道云笔记 ？",
	                            onChange: function onChange(s) {
	                                return _this8.onChange("youdao", s);
	                            } }),
	                        this.state.secret.youdao.access_token && React.createElement(
	                            'div',
	                            { style: { display: "flex", "flex-direction": "row", "justify-content": "center" } },
	                            this.state.youdao ? React.createElement(_dropdown2.default, { name: "请选择保存的位置，默认为第一个", items: this.state.youdao, width: '100%', onChange: function onChange(v, n) {
	                                    return _this8.save("youdao", v);
	                                } }) : React.createElement(_button2.default, { type: 'flat', width: '100%', style: { "margin": "0" },
	                                text: '\u91CD\u65B0\u83B7\u53D6 \u6709\u9053\u4E91\u7B14\u8BB0 \u7684\u6587\u4EF6\u5939',
	                                color: '#fff', backgroundColor: '#3F51B5',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick(s) {
	                                    return _this8.youdaoChange();
	                                } })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-version': '1.1.4', 'data-hits': 'weizhi' },
	                        React.createElement(_switch2.default, { width: '100%', checked: this.state.secret.weizhi && this.state.secret.weizhi.username != "" && this.state.secret.weizhi.access_token ? true : false,
	                            thumbedColor: '#3F51B5', trackedColor: '#7986CB', waves: 'md-waves-effect',
	                            label: this.state.secret.weizhi && this.state.secret.weizhi.username != "" ? "已授权 为知笔记，是否取消授权？" : "是否连接并授权 为知笔记 ？",
	                            onChange: function onChange(s) {
	                                return _this8.onChange("weizhi", s);
	                            } })
	                    ),
	                    this.state.weizhi && React.createElement(
	                        'div',
	                        { ref: 'weizhi' },
	                        React.createElement(
	                            'div',
	                            { style: { "display": "flex", "flex-direction": "row" } },
	                            React.createElement(_textfield2.default, {
	                                placeholder: '\u8BF7\u586B\u5165 \u4E3A\u77E5\u7B14\u8BB0 \u7684\u767B\u5F55\u90AE\u7BB1\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u90AE\u7BB1\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.weizhiOnChange("username", evt.target.value);
	                                }
	                            }),
	                            React.createElement(_textfield2.default, {
	                                password: true,
	                                placeholder: '\u8BF7\u586B\u5165 \u4E3A\u77E5\u7B14\u8BB0 \u7684\u5BC6\u7801\uFF0C\u7B80\u60A6\u4E0D\u4F1A\u8BB0\u5F55\u4F60\u7684\u5BC6\u7801\u3002',
	                                onChange: function onChange(evt) {
	                                    return _this8.weizhiOnChange("password", evt.target.value);
	                                }
	                            })
	                        ),
	                        React.createElement(_button2.default, { type: 'raised', width: '100%', style: { "margin": "0" },
	                            text: '\u7ED1\u5B9A \u4E3A\u77E5\u7B14\u8BB0 \u7684\u4FE1\u606F',
	                            color: '#fff', backgroundColor: '#3F51B5',
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick(s) {
	                                return _this8.onChange("weizhi", s, "login");
	                            } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-version': '1.1.4', 'data-hits': 'webdav' },
	                        React.createElement(
	                            'div',
	                            { className: 'label', style: { 'margin-bottom': ' -15px' } },
	                            'WebDAV'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'sublabel' },
	                            '\u7B80\u60A6\u652F\u6301\u4EFB\u610F WebDAV \u7684\u670D\u52A1\uFF0C\u5305\u62EC\uFF1ABox \xB7 TeraCLOUD \u7B49'
	                        ),
	                        React.createElement(_textfield2.default, {
	                            multi: true, rows: 8,
	                            placeholder: '\u6BCF\u884C\u4E00\u7EC4\uFF0C\u683C\u5F0F\u4E3A\uFF1A{ "name": "\u7F51\u76D8\u7684\u540D\u79F0", "user": "\u7528\u6237\u540D", "password": "\u5BC6\u7801", "url": "webdav \u5730\u5740" }',
	                            value: (this.state.secret.webdav || []).join("\n"),
	                            onChange: function onChange(e) {
	                                return _this8.webdavOnChange(e);
	                            }
	                        }),
	                        React.createElement(_button2.default, { type: 'raised', width: '100%', style: { "margin": "0" },
	                            text: '\u9A8C\u8BC1\u4E0A\u8FF0 WebDAV \u670D\u52A1',
	                            color: '#fff', backgroundColor: '#3F51B5',
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick(s) {
	                                return _this8.webdavAuth();
	                            } })
	                    )
	                );
	            }
	
	            return React.createElement(
	                'div',
	                null,
	                auth
	            );
	        }
	    }]);
	
	    return Auth;
	}(React.Component);
	
	Auth.defaultProps = {
	    linnk: {
	        username: "",
	        password: ""
	    },
	    instapaper: {
	        username: "",
	        password: ""
	    },
	    jianguo: {
	        username: "",
	        password: ""
	    },
	    weizhi: {
	        username: "",
	        password: ""
	    }
	};
	exports.default = Auth;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Notify) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _storage = __webpack_require__(2);
	
	var _runtime = __webpack_require__(593);
	
	var run = _interopRequireWildcard(_runtime);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _browser = __webpack_require__(334);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option plugins load =====");
	
	var Card = function (_React$Component) {
	    _inherits(Card, _React$Component);
	
	    function Card() {
	        _classCallCheck(this, Card);
	
	        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
	    }
	
	    _createClass(Card, [{
	        key: 'update',
	        value: function update() {
	            var _this2 = this;
	
	            run.Install(this.props.plugin.id, undefined, function (result) {
	                if (result) {
	                    if (_this2.props.plugin.version != result.version) {
	                        _storage.storage.plugins[_this2.props.plugin.id] = result;
	                        _this2.props.onChange("update");
	                    } else {
	                        new Notify().Render("当前插件为最新版，无需更新。");
	                    }
	                } else new Notify().Render(2, "更新失败，请稍后再试。");
	            });
	        }
	    }, {
	        key: 'delete',
	        value: function _delete() {
	            var _this3 = this;
	
	            new Notify().Render({ mode: "snackbar", content: "是否删除当前插件？", action: "确认", cancel: "取消", callback: function callback(type) {
	                    if (type == "cancel") return;
	                    delete _storage.storage.plugins[_this3.props.plugin.id];
	                    _storage.storage.option.plugins = Object.keys(_storage.storage.plugins);
	                    _this3.props.onChange("delete");
	                } });
	        }
	    }, {
	        key: 'enable',
	        value: function enable() {
	            this.props.plugin.enable = this.props.plugin.enable == undefined || this.props.plugin.enable ? false : true;
	            this.props.onChange("enable");
	        }
	    }, {
	        key: 'addmore',
	        value: function addmore() {
	            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/plugins/details/" + this.props.plugin.id }));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;
	
	            var enable = this.props.plugin.enable == undefined || this.props.plugin.enable ? true : false;
	            return React.createElement(
	                'card',
	                null,
	                React.createElement(
	                    'card-header',
	                    { style: { backgroundColor: this.props.plugin.icon.bgColor } },
	                    React.createElement('icon', { style: { color: this.props.plugin.icon.color }, dangerouslySetInnerHTML: { __html: this.props.plugin.icon.type } })
	                ),
	                React.createElement(
	                    'card-content',
	                    null,
	                    React.createElement(
	                        'desc',
	                        null,
	                        'by ',
	                        this.props.plugin.user.name
	                    ),
	                    React.createElement(
	                        'note',
	                        null,
	                        this.props.plugin.name
	                    )
	                ),
	                React.createElement(
	                    'card-footer',
	                    null,
	                    React.createElement(_button2.default, { shape: 'circle', type: 'flat',
	                        color: '#c3c6c7', hoverColor: 'rgba( 153, 153, 153, .1)',
	                        tooltip: { text: enable == true ? "禁用当前插件" : "启用当前插件" },
	                        fontIcon: '<i class="fas fa-eye' + (enable ? "" : "-slash") + '"></i>',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this4.enable();
	                        } }),
	                    React.createElement(_button2.default, { shape: 'circle', type: 'flat',
	                        color: '#c3c6c7', hoverColor: 'rgba( 153, 153, 153, .1)',
	                        tooltip: { text: "删除当前插件" },
	                        fontIcon: '<i class="fas fa-trash-alt"></i>',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this4.delete();
	                        } }),
	                    React.createElement(_button2.default, { shape: 'circle', type: 'flat',
	                        color: '#c3c6c7', hoverColor: 'rgba( 153, 153, 153, .1)',
	                        tooltip: { text: "更新当前插件到最新版本" },
	                        fontIcon: '<i class="fas fa-cloud"></i>',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this4.update();
	                        } }),
	                    React.createElement(_button2.default, { shape: 'circle', type: 'flat',
	                        color: '#c3c6c7', hoverColor: 'rgba( 153, 153, 153, .1)',
	                        tooltip: { text: "查看当前插件的详细信息" },
	                        fontIcon: '<i class="fas fa-ellipsis-h"></i>',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this4.addmore();
	                        } })
	                )
	            );
	        }
	    }]);
	
	    return Card;
	}(React.Component);
	
	Card.defaultProps = {
	    plugin: {}
	};
	Card.propTypes = {
	    plugin: React.PropTypes.object
	};
	
	var Cards = function (_React$Component2) {
	    _inherits(Cards, _React$Component2);
	
	    function Cards() {
	        _classCallCheck(this, Cards);
	
	        return _possibleConstructorReturn(this, (Cards.__proto__ || Object.getPrototypeOf(Cards)).apply(this, arguments));
	    }
	
	    _createClass(Cards, [{
	        key: 'render',
	        value: function render() {
	            var _this6 = this;
	
	            var card = this.props.plugins.length > 0 ? this.props.plugins.map(function (item, idx) {
	                return React.createElement(Card, { plugin: item, onChange: function onChange(t) {
	                        return _this6.props.onChange(t);
	                    } });
	            }) : React.createElement(
	                'card-empty',
	                null,
	                React.createElement(
	                    'a',
	                    { href: 'https://simpread.ksria.cn/plugins', target: '_blank' },
	                    '\u6CA1\u6709\u4EFB\u4F55\u63D2\u4EF6\uFF0C\u70B9\u51FB\u6253\u5F00\u300C\u63D2\u4EF6\u4E2D\u5FC3\u300D\u6DFB\u52A0\u3002'
	                )
	            );
	            return React.createElement(
	                'cards',
	                null,
	                card
	            );
	        }
	    }]);
	
	    return Cards;
	}(React.Component);
	
	Cards.defaultProps = {
	    plugins: []
	};
	Cards.propTypes = {
	    plugins: React.PropTypes.array,
	    onChange: React.PropTypes.func
	};
	
	var PluginsOpt = function (_React$Component3) {
	    _inherits(PluginsOpt, _React$Component3);
	
	    function PluginsOpt() {
	        var _ref;
	
	        var _temp, _this7, _ret;
	
	        _classCallCheck(this, PluginsOpt);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this7 = _possibleConstructorReturn(this, (_ref = PluginsOpt.__proto__ || Object.getPrototypeOf(PluginsOpt)).call.apply(_ref, [this].concat(args))), _this7), _this7.state = {
	            plugins: []
	        }, _temp), _possibleConstructorReturn(_this7, _ret);
	    }
	
	    _createClass(PluginsOpt, [{
	        key: 'writecb',
	        value: function writecb() {
	            watch.SendMessage("option", true);
	        }
	    }, {
	        key: 'install',
	        value: function install() {
	            var _this8 = this;
	
	            var id = decodeURIComponent(location.hash).replace("#plugins?install=", "");
	            run.Install(id, undefined, function (result) {
	                if (result) {
	                    var add = function add() {
	                        _storage.storage.plugins[result.id] = result;
	                        _storage.storage.Plugins(function (result) {
	                            new Notify().Render("当前插件已安装成功，2 秒后自动刷新当前页面。");
	                            setTimeout(function () {
	                                location.href = location.origin + location.pathname + "#plugins";
	                                location.reload();
	                            }, 2000);
	                        }, _storage.storage.plugins);
	                    };
	                    if (!_storage.storage.option.plugins.includes(result.id)) {
	                        add();
	                        _storage.storage.option.plugins.push(result.id);
	                        _storage.storage.Write(_this8.writecb);
	                    } else if (_storage.storage.plugins[result.id].version != result.version) {
	                        new Notify().Render({ content: "本地版本与安装版本不一致，是否安装新版本？", action: "安装", cancel: "取消", callback: function callback(type) {
	                                type == "action" && add();
	                            } });
	                    } else {
	                        new Notify().Render({ content: "本地版本与安装版本一致，是否重新安装？", action: "安装", cancel: "取消", callback: function callback(type) {
	                                type == "action" && add();
	                            } });
	                    }
	                } else new Notify().Render(2, id + " 获取失败，请稍后再试。");
	            });
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            var _this9 = this;
	
	            new Notify().Render({ mode: "snackbar", content: "是否清除本地全部插件？", action: "是的", cancel: "取消", callback: function callback(type) {
	                    if (type == "action") {
	                        _storage.storage.option.plugins = [];
	                        _storage.storage.Write(_this9.writecb);
	                        _storage.storage.Plugins(function () {
	                            new Notify().Render("snackbar", "清除成功，此页面需刷新后才能生效！", "刷新 ", function () {
	                                location.href = location.origin + location.pathname + "#plugins";
	                                location.reload();
	                            });
	                        }, {});
	                    }
	                } });
	        }
	    }, {
	        key: 'addmore',
	        value: function addmore() {
	            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/plugins" }));
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var _this10 = this;
	
	            var is_update = false,
	                count = 0;
	            _storage.storage.option.plugins.forEach(function (id) {
	                run.Install(id, undefined, function (result) {
	                    if (!result) {
	                        new Notify().Render(2, id + " 获取失败，请稍后再试。");
	                    }
	                    count++;
	                    if (_storage.storage.plugins[id].version != result.version) {
	                        _storage.storage.plugins[result.id] = result;
	                        is_update = true;
	                    }
	                    count == _storage.storage.option.plugins.length && complete();
	                });
	            });
	            var complete = function complete() {
	                if (is_update) {
	                    _storage.storage.Plugins(function (result) {
	                        new Notify().Render("本地插件已全部更新完毕。");
	                        _this10.setState({ plugins: Object.values(_storage.storage.plugins) });
	                    }, _storage.storage.plugins);
	                } else {
	                    new Notify().Render("无任何可用更新。");
	                }
	            };
	        }
	    }, {
	        key: 'import',
	        value: function _import() {
	            var _this11 = this;
	
	            var newPlugins = {};
	            if (_storage.storage.option.plugins.length == 0) {
	                new Notify().Render("当前配置文件没有任何插件。");
	                return;
	            }
	            new Notify().Render({ mode: "snackbar", content: "导入意味着从配置文件覆盖当前的插件！", action: "确认", cancel: "取消", callback: function callback(type) {
	                    if (type == "cancel") return;
	                    var count = 0;
	                    _storage.storage.option.plugins.forEach(function (id) {
	                        run.Install(id, undefined, function (result) {
	                            if (!result) {
	                                new Notify().Render(2, id + " 获取失败，请稍后再试。");
	                            } else newPlugins[result.id] = result;
	                            count++;
	                            count == _storage.storage.option.plugins.length && complete();
	                        });
	                    });
	                } });
	            var complete = function complete() {
	                _storage.storage.Plugins(function (result) {
	                    _storage.storage.Write(function () {
	                        new Notify().Render("已从配置文件导入完毕。");
	                        _this11.setState({ plugins: Object.values(_storage.storage.plugins) });
	                    });
	                }, newPlugins);
	            };
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(type) {
	            var _this12 = this;
	
	            _storage.storage.Write(this.writecb);
	            _storage.storage.Plugins(function () {
	                type == "update" && new Notify().Render("当前插件已更新成功。");
	                type == "delete" && new Notify().Render("当前插件已删除成功。");
	                type == "enable" && new Notify().Render("当前插件已更改成功。");
	                _this12.setState({ plugins: Object.values(_storage.storage.plugins) });
	            }, _storage.storage.plugins);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _this13 = this;
	
	            $("head").append('<link rel="stylesheet" class="simpread-fs-style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/solid.min.css" />');
	            $("head").append('<link rel="stylesheet" class="simpread-fs-style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/brands.min.css" />');
	            $("head").append('<link rel="stylesheet" class="simpread-fs-style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.min.css" />');
	            _storage.storage.Plugins(function () {
	                decodeURIComponent(location.href).includes("#plugins?install=") && _this13.install();
	                _this13.setState({ plugins: Object.values(_storage.storage.plugins) });
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this14 = this;
	
	            return React.createElement(
	                'div',
	                { id: 'labs', style: { width: '100%', overflow: 'hidden' } },
	                React.createElement(
	                    'div',
	                    { className: 'label' },
	                    '\u7BA1\u7406'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { style: { display: 'inline-flex', width: '100%' } },
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'pluginconfig', style: { display: 'inline-flex', width: '50%' } },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u4ECE\u914D\u7F6E\u6587\u4EF6\u5BFC\u5165\u63D2\u4EF6', width: '100%',
	                                tooltip: { text: "注意：本操作并不能更新本地插件。" },
	                                icon: ss.IconPath("import_icon"),
	                                color: '#fff', backgroundColor: '#00BCD4',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this14.import();
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'pluginsite', style: { display: 'inline-flex', width: '50%' } },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u67E5\u770B\u5E76\u83B7\u53D6\u66F4\u591A\u7684\u63D2\u4EF6', width: '100%',
	                                fontIcon: '<i class="fas fa-external-link-square-alt"></i>',
	                                color: '#fff', backgroundColor: '#00BCD4',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this14.addmore();
	                                } })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { display: 'inline-flex', width: '100%' } },
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'pluginupdate', style: { display: 'inline-flex', width: '50%' } },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u66F4\u65B0\u672C\u5730\u5168\u90E8\u63D2\u4EF6', width: '100%',
	                                icon: ss.IconPath("update_icon"),
	                                color: '#fff', backgroundColor: '#FF5252',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this14.update();
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'version-tips', 'data-hits': 'pluginclear', style: { display: 'inline-flex', width: '50%' } },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u6E05\u9664\u672C\u5730\u5168\u90E8\u63D2\u4EF6', width: '100%',
	                                icon: ss.IconPath("clear_icon"),
	                                color: '#fff', backgroundColor: '#757575',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this14.clear();
	                                } })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'label' },
	                    React.createElement(
	                        'span',
	                        null,
	                        this.state.plugins.length == 0 ? "" : "已安装 " + this.state.plugins.length + " 个插件 "
	                    ),
	                    this.state.plugins.length > 5 && React.createElement(
	                        'a',
	                        { target: '_blank', style: { color: ' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold' } },
	                        '\u8FC7\u591A\u7684\u63D2\u4EF6\u4F1A\u4F7F\u8FDB\u5165reading mode\u53D8\u6162\uFF0C\u5EFA\u8BAE\u4E0D\u8981\u8D85\u8FC7 6 \u4E2A'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'pluginmange' },
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px' }, className: 'lab' },
	                        React.createElement(Cards, { plugins: this.state.plugins, onChange: function onChange(t) {
	                                return _this14.onChange(t);
	                            } })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return PluginsOpt;
	}(React.Component);
	
	exports.default = PluginsOpt;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(336)))

/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Notify) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _storage = __webpack_require__(2);
	
	var _browser = __webpack_require__(334);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option sites load =====");
	
	var Card = function (_React$Component) {
	    _inherits(Card, _React$Component);
	
	    function Card() {
	        _classCallCheck(this, Card);
	
	        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
	    }
	
	    _createClass(Card, [{
	        key: 'update',
	        value: function update() {
	            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/sites/details/" + this.props.info.domain + "?type=update" }));
	        }
	    }, {
	        key: 'delete',
	        value: function _delete() {
	            var _this2 = this;
	
	            new Notify().Render({ mode: "snackbar", content: "是否删除当前站点？", action: "确认", cancel: "取消", callback: function callback(type) {
	                    if (type == "cancel") return;
	                    _storage.storage.pr.Deletesite("person", _this2.props.url, function (flag) {
	                        flag == -1 && new Notify().Render("当前站点已删除，请勿重复提交。");
	                        flag != -1 && _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                            console.log("current site is ", _storage.storage.pr.sites);
	                            watch.SendMessage("site", true);
	                            new Notify().Render("删除成功。");
	                            _this2.props.onChange("delete");
	                        });
	                    });
	                } });
	        }
	    }, {
	        key: 'addmore',
	        value: function addmore() {
	            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/sites/details/" + this.props.info.domain }));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            return React.createElement(
	                'card',
	                null,
	                React.createElement(
	                    'card-header',
	                    { style: { backgroundColor: this.props.info.bgColor } },
	                    React.createElement(
	                        'title',
	                        { style: { color: this.props.info.color } },
	                        this.props.info.title
	                    )
	                ),
	                React.createElement(
	                    'card-footer',
	                    null,
	                    React.createElement(_button2.default, { shape: 'circle', type: 'flat',
	                        color: '#c3c6c7', hoverColor: 'rgba( 153, 153, 153, .1)',
	                        tooltip: { text: "删除当前站点" },
	                        fontIcon: '<i class="fas fa-trash-alt"></i>',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this3.delete();
	                        } }),
	                    React.createElement(_button2.default, { shape: 'circle', type: 'flat',
	                        color: '#c3c6c7', hoverColor: 'rgba( 153, 153, 153, .1)',
	                        tooltip: { text: "更新当前站点到最新版本" },
	                        fontIcon: '<i class="fas fa-cloud"></i>',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this3.update();
	                        } }),
	                    React.createElement(_button2.default, { shape: 'circle', type: 'flat',
	                        color: '#c3c6c7', hoverColor: 'rgba( 153, 153, 153, .1)',
	                        tooltip: { text: "查看当前站点的详细信息" },
	                        fontIcon: '<i class="fas fa-ellipsis-h"></i>',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this3.addmore();
	                        } })
	                )
	            );
	        }
	    }]);
	
	    return Card;
	}(React.Component);
	
	Card.defaultProps = {
	    info: {}
	};
	Card.propTypes = {
	    info: React.PropTypes.object
	};
	
	var Cards = function (_React$Component2) {
	    _inherits(Cards, _React$Component2);
	
	    function Cards() {
	        var _ref;
	
	        var _temp, _this4, _ret;
	
	        _classCallCheck(this, Cards);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this4 = _possibleConstructorReturn(this, (_ref = Cards.__proto__ || Object.getPrototypeOf(Cards)).call.apply(_ref, [this].concat(args))), _this4), _this4.state = {
	            sites: _storage.storage.pr.sites.person
	        }, _temp), _possibleConstructorReturn(_this4, _ret);
	    }
	
	    _createClass(Cards, [{
	        key: 'onChange',
	        value: function onChange(type) {
	            this.setState({
	                sites: _storage.storage.pr.sites.person
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this5 = this;
	
	            var card = this.state.sites && this.state.sites.length > 0 ? this.state.sites.map(function (item) {
	                return React.createElement(Card, { url: item[0], info: item[1].info, onChange: function onChange(t) {
	                        return _this5.onChange(t);
	                    } });
	            }) : React.createElement(
	                'card-empty',
	                null,
	                React.createElement(
	                    'a',
	                    { href: 'https://simpread.ksria.cn/sites', target: '_blank' },
	                    '\u6CA1\u6709\u4EFB\u4F55\u7AD9\u70B9\uFF0C\u70B9\u51FB\u6253\u5F00\u300C\u7AD9\u70B9\u96C6\u5E02\u300D\u6DFB\u52A0\u3002'
	                )
	            );
	            return React.createElement(
	                'cards',
	                null,
	                card
	            );
	        }
	    }]);
	
	    return Cards;
	}(React.Component);
	
	Cards.propTypes = {
	    onChange: React.PropTypes.func
	};
	
	var SitesOpts = function (_React$Component3) {
	    _inherits(SitesOpts, _React$Component3);
	
	    function SitesOpts() {
	        _classCallCheck(this, SitesOpts);
	
	        return _possibleConstructorReturn(this, (SitesOpts.__proto__ || Object.getPrototypeOf(SitesOpts)).apply(this, arguments));
	    }
	
	    _createClass(SitesOpts, [{
	        key: 'newsites',
	        value: function newsites() {
	            var notify = new Notify().Render({ content: "数据同步中，请稍等...", state: "loading" });
	            _storage.storage.GetRemote("remote", function (result, error) {
	                notify.complete();
	                if (!error) {
	                    var count = _storage.storage.pr.Addsites(result);
	                    _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                        watch.SendMessage("site", true);
	                        count == 0 ? new Notify().Render("适配列表已同步至最新版本。") : new Notify().Render(0, '\u9002\u914D\u5217\u8868\u5DF2\u540C\u6B65\u6210\u529F\uFF0C\u672C\u6B21\u65B0\u589E ' + count + ' \u4E2A\u7AD9\u70B9\uFF0C2 \u79D2\u540E\u81EA\u52A8\u81EA\u52A8\u5237\u65B0\u3002');
	                        count > 0 && setTimeout(function () {
	                            return location.reload();
	                        }, 2000);
	                    });
	                } else {
	                    new Notify().Render(3, '\u540C\u6B65\u65F6\u53D1\u751F\u4E86\u4E00\u4E9B\u95EE\u9898\uFF0C\u5E76\u4E0D\u4F1A\u5F71\u54CD\u672C\u5730\u914D\u7F6E\u6587\u4EF6\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01');
	                }
	            });
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(state) {
	            state == "sitemgr" && (location.href = location.origin + "/options/sitemgr.html");
	        }
	    }, {
	        key: 'changeOrigins',
	        value: function changeOrigins() {
	            this.props.option.origins = event.target.value.split("\n");
	            _storage.storage.pr.origins = this.props.option.origins;
	            this.props.onChange && this.props.onChange(false);
	        }
	    }, {
	        key: 'origins',
	        value: function origins(type) {
	            var _this7 = this;
	
	            /*
	            if ( type == "origins" ) {
	                storage.GetRemote( "origins", ( result, error ) => {
	                    if ( error ) new Notify().Render( 2, "获取失败，请稍后重新加载。" );
	                    else {
	                        this.props.option.origins = storage.pr.Origins( result );
	                        this.props.onChange && this.props.onChange( false );
	                        $( this.refs.origins ).find( "textarea" ).val( this.props.option.origins.join( "\n" ) );
	                        new Notify().Render( "官方源加载成功。" );
	                    }
	                });
	            } else
	            */
	            if (type == "import") {
	                new Notify().Render("snackbar", "导入后会覆盖掉原来的第三方适配列表，请问是否覆盖？", "确认", function () {
	                    var urls = _this7.props.option.origins.filter(function (item) {
	                        return item.trim() != "" && item.trim().startsWith("http") && item.trim().endsWith(".json");
	                    });
	                    var max = urls.length;
	                    var idx = 0,
	                        arr = [],
	                        count = 0;
	                    if (urls.length != _this7.props.option.origins.length) {
	                        _this7.props.option.origins = [].concat(_toConsumableArray(urls));
	                        _this7.props.onChange && _this7.props.onChange(false);
	                        $(_this7.refs.origins).find("textarea").val(_this7.props.option.origins.join("\n"));
	                        new Notify().Render("已剔除掉不符合规范的第三方源。");
	                    }
	                    _this7.props.option.origins.forEach(function (item) {
	                        _storage.storage.GetRemote(item, function (result, error) {
	                            idx++;
	                            if (result && result.sites.length > 0) {
	                                count++;
	                                arr = arr.concat(_storage.storage.pr.Formatsites(result));
	                            } else new Notify().Render('\u5BFC\u5165\u5931\u8D25 ' + item);
	                            if (idx == max) {
	                                arr.length > 0 && (_storage.storage.websites.custom = _storage.storage.pr.Addorigins(arr));
	                                console.log("current storage websites.custom is ", arr);
	                                new Notify().Render('\u5DF2\u5B8C\u6210\u5BFC\u5165\uFF0C\u672C\u6B21\u5171\u8BA1\uFF1A' + count + ' \u4E2A\u7AD9\u70B9\uFF0C ' + arr.length + ' \u6761\u6570\u636E\u3002');
	                                _this7.props.onChange && _this7.props.onChange(false);
	                            }
	                        });
	                    });
	                });
	            } else if (type == "clear") {
	                new Notify().Render("snackbar", "只能清除第三方源的适配站点，请问是否清除？", "确认", function () {
	                    new Notify().Render('\u5DF2\u5B8C\u6210\u6E05\u9664\uFF0C\u5171\u8BA1\uFF1A' + _storage.storage.pr.Clearorigins() + ' \u6761\u6570\u636E\u3002');
	                    _storage.storage.websites.custom = _storage.storage.pr.sites.custom;
	                    _this7.props.onChange && _this7.props.onChange(false);
	                });
	            }
	        }
	    }, {
	        key: 'onChange',
	        value: function onChange(type) {
	            console.log(type);
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            new Notify().Render({ mode: "snackbar", content: "是否清除「站点集市」的全部站点？", action: "是的", cancel: "取消", callback: function callback(type) {
	                    if (type == "action") {
	                        _storage.storage.pr.sites.person = [];
	                        _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                            console.log("current site is ", _storage.storage.pr.sites);
	                            watch.SendMessage("site", true);
	                            new Notify().Render("已清除成功，2 秒后自动刷新当前页面。");
	                            setTimeout(function () {
	                                location.href = location.origin + location.pathname + "#sites";
	                                location.reload();
	                            }, 2000);
	                        });
	                    }
	                } });
	        }
	    }, {
	        key: 'addmore',
	        value: function addmore() {
	            _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/sites" }));
	        }
	    }, {
	        key: 'install',
	        value: function install() {
	            try {
	                var url = decodeURIComponent(location.hash).replace("#sites?install=", ""),
	                    arr = url.split("?site="),
	                    id = arr[0],
	                    news = JSON.parse(decodeURI(arr[1])),
	                    old = _storage.storage.pr.sites.person.filter(function (site) {
	                    return site[1].info.id == news.id;
	                }),
	                    add = function add() {
	                    var url = old.length > 0 ? old[0][0] : news.site.url,
	                        site = _extends({}, news.site);
	
	                    delete news.user;
	                    delete news.site;
	                    delete news.view;
	                    delete news.download;
	                    delete news.href;
	                    site.info = news;
	
	                    _storage.storage.pr.Updatesite("person", url, [url, _storage.storage.pr.Cleansite(site)]);
	                    _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                        console.log("current site is ", _storage.storage.pr.sites);
	                        watch.SendMessage("site", true);
	                        new Notify().Render("当前站点已安装成功，2 秒后自动刷新当前页面。");
	                        setTimeout(function () {
	                            location.href = location.origin + location.pathname + "#sites";
	                            location.reload();
	                        }, 2000);
	                    });
	                };
	                if (old.length == 0) {
	                    add();
	                } else if (news.create != old[0][1].info.create) {
	                    new Notify().Render({ content: "本地版本与安装版本不一致，是否安装新版本？", action: "安装", cancel: "取消", callback: function callback(type) {
	                            type == "action" && add();
	                        } });
	                } else {
	                    new Notify().Render({ content: "是否重新当前站点安装？", action: "安装", cancel: "取消", callback: function callback(type) {
	                            type == "action" && add();
	                        } });
	                }
	            } catch (error) {
	                new Notify().Render(2, "获取失败，请稍后再试。");
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var url = decodeURIComponent(location.hash).replace("#sites?update=", ""),
	                org_site = JSON.parse(url),
	                type = org_site.target,
	                site = _storage.storage.pr.Cleansite(_extends({}, org_site));
	            site.url = org_site.url;
	            $.ajax({
	                url: _storage.storage.service + "/sites/service/query",
	                method: "POST",
	                data: { type: type, site: site }
	            }).done(function (result, textStatus, jqXHR) {
	                console.log(result.site);
	                if (result.code == 200) {
	                    _storage.storage.pr.Updatesite(type, org_site.url, [result.site.url, _storage.storage.pr.Cleansite(result.site)]);
	                    _storage.storage.Writesite(_storage.storage.pr.sites, function () {
	                        new Notify().Render(0, "更新成功，2 秒后自动关闭页面，失效的页面会自动刷新。");
	                        setTimeout(function () {
	                            return location.href = location.protocol + location.pathname + "#sites?update=success";
	                        }, 2000);
	                        watch.SendMessage("site", true);
	                    });
	                } else if (result.code == 404) {
	                    new Notify().Render("无任何可用更新，2 秒后页面将会关闭！");
	                    setTimeout(function () {
	                        return location.href = location.protocol + location.pathname + "#sites?update=pending";
	                    }, 2000);
	                } else {
	                    new Notify().Render(2, "暂时无法使用此功能，请稍候再试，2 秒后页面将会关闭！");
	                    setTimeout(function () {
	                        return location.href = location.protocol + location.pathname + "#sites?update=failed";
	                    }, 2000);
	                }
	            }).fail(function (error) {
	                new Notify().Render(2, "自动更新出现错误，请稍后再试！");
	            });
	        }
	    }, {
	        key: 'pending',
	        value: function pending() {
	            var url = decodeURIComponent(location.hash).replace("#sites?pending=", ""),
	                data = JSON.parse(url);
	            $.ajax({
	                url: _storage.storage.service + "/sites/service/pending",
	                method: "POST",
	                data: data
	            }).done(function (result, textStatus, jqXHR) {
	                new Notify().Render("提交成功，谢谢对简悦作出的贡献，2 秒后页面将会关闭！");
	                setTimeout(function () {
	                    return location.href = location.protocol + location.pathname + "#sites?update=complete";
	                }, 2000);
	            }).fail(function (error) {
	                new Notify().Render(2, "自动更新出现错误，请稍后再试！");
	            });
	        }
	    }, {
	        key: 'temp',
	        value: function temp() {
	            var url = decodeURIComponent(location.hash).replace("#sites?temp=", ""),
	                data = JSON.parse(url);
	            $.ajax({
	                url: _storage.storage.service + "/sites/service/pending",
	                method: "POST",
	                data: data
	            }).done(function (result, textStatus, jqXHR) {
	                new Notify().Render("提交成功，谢谢对简悦作出的贡献，2 秒后页面将会关闭！");
	                setTimeout(function () {
	                    return location.href = location.protocol + location.pathname + "#sites?update=complete";
	                }, 2000);
	            }).fail(function (error) {
	                new Notify().Render(2, "自动更新出现错误，请稍后再试！");
	            });
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            decodeURIComponent(location.href).includes("#sites?install=") && this.install();
	            decodeURIComponent(location.href).includes("#sites?update=") && this.update();
	            decodeURIComponent(location.href).includes("#sites?pending=") && this.pending();
	            decodeURIComponent(location.href).includes("#sites?temp=") && this.temp();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this8 = this;
	
	            return React.createElement(
	                'div',
	                { id: 'labs', style: { width: '100%' } },
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'newsites' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1', 'data-head-title': '\u5B98\u65B9\u4E3B\u9002\u914D\u6E90' },
	                        '\u5B98\u65B9\u4E3B\u9002\u914D\u6E90 ',
	                        React.createElement(
	                            'a',
	                            { target: '_blank', href: 'https://simpread.ksria.cn/sites/', style: { color: ' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' } },
	                            '\u5171\u8BA1 ',
	                            _storage.storage.simpread.sites.length,
	                            ' \u7C7B'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'lab' },
	                        React.createElement(_button2.default, { type: 'raised', text: '\u624B\u52A8\u540C\u6B65\u9002\u914D\u5217\u8868', width: '100%',
	                            icon: ss.IconPath("update_icon"),
	                            color: '#fff', backgroundColor: 'rgb(103, 58, 183)',
	                            waves: 'md-waves-effect md-waves-button',
	                            onClick: function onClick() {
	                                return _this8.newsites();
	                            } })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'label', 'data-head-level': 'h1' },
	                    '\u7B2C\u4E09\u65B9\u9002\u914D\u6E90'
	                ),
	                React.createElement(
	                    'div',
	                    { ref: 'origins', style: { 'padding-top': '10px', 'margin-bottom': '8px;' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'version-tips', 'data-hits': 'customsites' },
	                        React.createElement(_textfield2.default, {
	                            multi: true, rows: 4,
	                            placeholder: '\u4EC5\u652F\u6301 URL \u5730\u5740\uFF0C\u6BCF\u884C\u4E00\u4E2A\u3002',
	                            value: (this.props.option.origins || []).join("\n"),
	                            onChange: function onChange() {
	                                return _this8.changeOrigins();
	                            }
	                        }),
	                        React.createElement(
	                            'div',
	                            { style: { "display": "flex" } },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u52A0\u8F7D\u7B2C\u4E09\u65B9\u9002\u914D\u5217\u8868',
	                                width: '100%', style: { "display": "none", "margin": "0" },
	                                color: '#fff', backgroundColor: '#4CAF50',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this8.origins("origins");
	                                } }),
	                            React.createElement(_button2.default, { type: 'raised', text: '\u5BFC\u5165\u5230\u7B2C\u4E09\u65B9\u9002\u914D\u5217\u8868',
	                                width: '100%', style: { "margin": "0 10px" },
	                                color: '#fff', backgroundColor: 'rgb(103, 58, 183)',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this8.origins("import");
	                                } }),
	                            React.createElement(_button2.default, { type: 'raised', text: '\u6E05\u9664\u7B2C\u4E09\u65B9\u9002\u914D\u5217\u8868',
	                                width: '100%', style: { "margin": "0" },
	                                color: '#fff', backgroundColor: '#FF5252',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this8.origins("clear");
	                                } })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'personsites' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1', 'data-head-title': '\u7AD9\u70B9\u96C6\u5E02' },
	                        '\u7AD9\u70B9\u96C6\u5E02 ',
	                        React.createElement(
	                            'a',
	                            { target: '_blank', href: 'https://simpread.ksria.cn/sites/', style: { color: ' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' } },
	                            '\u5171\u8BA1 ',
	                            _storage.storage.pr.sites.person.length,
	                            ' \u7C7B'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'lab' },
	                        React.createElement(
	                            'div',
	                            { style: { display: 'inline-flex', width: '100%' } },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u6253\u5F00\u300C\u7AD9\u70B9\u96C6\u5E02\u300D', width: '100%',
	                                fontIcon: '<i class="fas fa-external-link-square-alt"></i>',
	                                color: '#fff', backgroundColor: 'rgb(103, 58, 183)',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this8.addmore();
	                                } }),
	                            React.createElement(_button2.default, { type: 'raised', text: '\u6E05\u9664\u300C\u7AD9\u70B9\u96C6\u5E02\u300D\u7684\u5168\u90E8\u7AD9\u70B9', width: '100%',
	                                icon: ss.IconPath("clear_icon"),
	                                color: '#fff', backgroundColor: '#757575',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this8.clear();
	                                } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: { 'padding-top': '10px' } },
	                            React.createElement(Cards, { onChange: function onChange(t) {
	                                    return _this8.onChange(t);
	                                } })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'sitemgr' },
	                    React.createElement(
	                        'div',
	                        { className: 'label', 'data-head-level': 'h1' },
	                        '\u7AD9\u70B9\u7BA1\u7406\u5668'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab', onClick: function onClick() {
	                                return _this8.onClick('sitemgr');
	                            } },
	                        React.createElement(
	                            'div',
	                            { className: 'more', style: { 'cursor': 'pointer' } },
	                            React.createElement(
	                                'div',
	                                null,
	                                '\u53EF\u4EE5\u7BA1\u7406\u5168\u90E8\u7684\u9002\u914D\u7AD9\u70B9'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'desc' },
	                                '\u5305\u62EC\uFF1A\u5B98\u65B9\u9002\u914D\u6E90\u3001\u7B2C\u4E09\u65B9\u9002\u914D\u6E90\u3001\u7AD9\u70B9\u96C6\u5E02\u9002\u914D\u6E90\u3001\u81EA\u5B9A\u4E49\u9002\u914D\u6E90\u3002'
	                            ),
	                            React.createElement('span', { className: 'arrow' })
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return SitesOpts;
	}(React.Component);
	
	exports.default = SitesOpts;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(336)))

/***/ }),

/***/ 874:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Notify) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _storage = __webpack_require__(2);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _runtime = __webpack_require__(593);
	
	var run = _interopRequireWildcard(_runtime);
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option account load =====");
	
	var AccountOpt = function (_React$Component) {
	    _inherits(AccountOpt, _React$Component);
	
	    function AccountOpt() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, AccountOpt);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AccountOpt.__proto__ || Object.getPrototypeOf(AccountOpt)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            uid_err: "",
	            name_err: "",
	            email_err: ""
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(AccountOpt, [{
	        key: 'onChangeName',
	        value: function onChangeName(event) {
	            var value = event.target.value;
	            if (/^([\u2E80-\u9FFFA-Za-z0-9]+)([ ]?)([\u2E80-\u9FFFA-Za-z0-9]*)$/ig.test(value)) {
	                this.setState({ name_err: "" });
	            } else this.setState({ name_err: "只能包含中英文 + 数字 + 中间的空格" });
	            _storage.storage.user.name = value;
	        }
	    }, {
	        key: 'onChangeEmail',
	        value: function onChangeEmail(event) {
	            var value = event.target.value;
	            if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ig.test(value)) {
	                this.setState({ email_err: "" });
	            } else this.setState({ email_err: "请确保输入正确的 Email 地址" });
	            _storage.storage.user.email = value;
	        }
	    }, {
	        key: 'onChangeContact',
	        value: function onChangeContact(event) {
	            _storage.storage.user.contact = event.target.value.trim();
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _this2 = this;
	
	            if (_storage.storage.user.uid == "") {
	                _storage.storage.user.uid = run.ID("user");
	                _storage.storage.Write(function () {
	                    console.log("current user info is ", _storage.storage.user);
	                    _this2.setState({ uid_err: "" });
	                    watch.SendMessage("option", true);
	                }, _storage.storage.simpread);
	            }
	            this.props.load.first && this.stat();
	        }
	    }, {
	        key: 'stat',
	        value: function stat() {
	            $.ajax({
	                url: _storage.storage.service + "/stats/service/count/",
	                method: "POST",
	                data: { type: this.props.load.update ? "update" : "first" }
	            }).done(function (result, textStatus, jqXHR) {
	                console.log("count success ");
	            }).fail(function (error) {
	                console.log("count failed ", error);
	            });
	        }
	    }, {
	        key: 'save',
	        value: function save() {
	            if (_storage.storage.user.name.trim() == "") {
	                this.setState({ name_err: "昵称不能为空" });
	                return;
	            } else if (_storage.storage.user.email.trim() == "") {
	                this.setState({ email_err: "昵称不能为空" });
	                return;
	            }
	            $.ajax({
	                url: _storage.storage.service + "/users/service/update/" + _storage.storage.user.uid,
	                method: "POST",
	                data: _storage.storage.user
	            }).done(function (result, textStatus, jqXHR) {
	                result.code == 201 ? _storage.storage.Write(function () {
	                    watch.SendMessage("option", true);
	                    new Notify().Render("更新成功，请刷新本页！");
	                }) : new Notify().Render(2, "更新出现错误，请稍后再试！");
	            }).fail(function (error) {
	                new Notify().Render(2, "更新出现错误，请稍后再试！");
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            var avatar = this.props.user.avatar;
	            if (avatar == "") {
	                avatar = this.props.user.name.substr(0, 1);
	            }
	            var idx = this.props.idx.indexOf(avatar.toLowerCase());
	            idx == -1 && (idx = 0);
	            var color = this.props.colors[idx];
	            return React.createElement(
	                'div',
	                { id: 'labs', style: { width: '100%' } },
	                React.createElement(
	                    'div',
	                    { className: 'label' },
	                    '\u7528\u6237\u4FE1\u606F'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'lab', style: { 'padding-top': '25px' } },
	                    React.createElement(
	                        'sr-opt-gp',
	                        { style: { 'justify-content': 'center' } },
	                        avatar && React.createElement(
	                            'span',
	                            { className: 'avatar', style: { "background-color": color } },
	                            avatar.toUpperCase()
	                        )
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, {
	                            floatingtext: '\u6807\u8BC6',
	                            placeholder: '\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\uFF0C\u4E0D\u53EF\u66F4\u6539',
	                            errortext: this.state.uid_err,
	                            value: this.props.user.uid, disable: true })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, {
	                            floatingtext: '\u6635\u79F0',
	                            placeholder: '\u53EA\u80FD\u5305\u542B\u4E2D\u82F1\u6587 + \u6570\u5B57 + \u4E2D\u95F4\u7684\u7A7A\u683C',
	                            errortext: this.state.name_err,
	                            value: this.props.user.name, onChange: function onChange(e) {
	                                return _this3.onChangeName(e);
	                            }, disable: false })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, {
	                            floatingtext: '\u90AE\u7BB1',
	                            placeholder: '\u8BF7\u4F7F\u7528\u771F\u5B9E\u4E14\u6709\u6548\u7684\u90AE\u7BB1\u5730\u5740',
	                            errortext: this.state.email_err,
	                            value: this.props.user.email, onChange: function onChange(e) {
	                                return _this3.onChangeEmail(e);
	                            }, disable: false })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, {
	                            floatingtext: '\u8054\u7EDC\u65B9\u5F0F',
	                            placeholder: '\u5FAE\u535A / \u5FAE\u4FE1 \u7B49\u4E00\u5207\u53EF\u4EE5\u8054\u7EDC\u5230\u4F60\b\u7684\u65B9\u5F0F',
	                            value: this.props.user.contact, onChange: function onChange(e) {
	                                return _this3.onChangeContact(e);
	                            }, disable: false })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_button2.default, { text: '\u4FDD \u5B58',
	                            waves: 'md-waves-effect', color: '#fff', backgroundColor: 'rgb(111, 122, 155)',
	                            width: '100%', icon: ss.IconPath("save_icon"),
	                            onClick: function onClick() {
	                                return _this3.save();
	                            } })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return AccountOpt;
	}(React.Component);
	
	AccountOpt.defaultProps = {
	    colors: ["rgb(255, 114, 129)", "rgb(64, 196, 255)", "rgb(255, 157, 68)", "rgb(140, 216, 66)", "rgb(251, 88, 74)", "rgb(255, 229, 95)", "rgb(0, 230, 118)", "rgb(0, 169, 240)", "rgb(128, 222, 234)", "rgb(247, 77, 95)", "rgb(255, 206, 73)", "rgb(250, 154, 63)", "rgb(255, 114, 129)", "rgb(57, 194, 241)", "rgb(141, 196, 72)", "rgb(128, 222, 234)", "rgb(83, 109, 254)", "rgb(255, 183, 77)", "rgb(197, 231, 99)", "rgb(239, 83, 80)", "rgb(0, 230, 118)", "rgb(57, 194, 241)", "rgb(100, 181, 246)", "rgb(119, 232, 86)", "rgb(239, 83, 80)", "rgb(0, 203, 232)", "rgb(0, 230, 118)", "rgb(255, 196, 0)", "rgb(255, 206, 73)", "rgb(167, 134, 116)", "rgb(86, 209, 216)", "rgb(253, 208, 174)", "rgb(197, 231, 99)", "rgb(239, 88, 74)", "rgb(249, 79, 40)", "rgb(255, 88, 100)", "rgb(197, 231, 99)", "rgb(0, 177, 251)", "rgb(255, 206, 73)", "rgb(251, 182, 75)", "rgb(197, 231, 99)", "rgb(35, 180, 210)", "rgb(255, 206, 73)", "rgb(255, 229, 95)", "rgb(64, 196, 255)", "rgb(255, 114, 129)", "rgb(119, 232, 86)", "rgb(139, 223, 231)", "rgb(0, 169, 240)"],
	    idx: "abcdefghijklmnopqrstuvwxyz0123456789"
	};
	exports.default = AccountOpt;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(336)))

/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _browser = __webpack_require__(334);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option about load =====");
	
	var style = {
	
	    root: {
	        padding: '50px 0',
	
	        backgroundColor: '#fff',
	
	        fontSize: '1.6rem',
	        color: 'rgba(51, 51, 51, 0.87)',
	
	        boxShadow: '0 1px 3px rgba(0, 0, 0, .12)'
	    },
	
	    title: {
	        fontSize: '2rem',
	        fontWeight: 800
	    },
	
	    badges: {
	        display: 'flex',
	        flexDirection: 'row',
	        justifyContent: 'center',
	
	        margin: '1.2em 0'
	    },
	
	    img: {
	        padding: '5px'
	    },
	
	    stat: {
	        color: '#ff3f80',
	        fontWeight: 600
	    },
	
	    href: {
	        color: 'rgba(51, 51, 51, 0.87)'
	    },
	
	    link: {
	        borderBottom: '1px solid #4285f4'
	    }
	
	},
	    urls = {
	
	    href: {
	        version: "https://github.com/Kenshin/simpread/releases",
	        website: "http://ksria.com/simpread",
	        githubstar: "https://github.com/Kenshin/simpread",
	        changelog: "http://ksria.com/simpread/changelog.html",
	        feedback: "https://github.com/kenshin/simpread/issues",
	        issues: "https://github.com/kenshin/simpread/issues"
	    },
	
	    badges: {
	        version: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAUCAYAAABCpynOAAAAAXNSR0IArs4c6QAAB/xJREFUaIHtmntQVNcdxz9n79297LqLz1WWoFAh+GBCsKY+sBYbjI1Eq2JRBBOtxmiDLhmNTZ1JO47RVJP4KDPVKVONIRhN2tr4GjXStD47tYqY6qpR6qMqL4081uWxj9M/GK9uAiRaMjaE78yd2dnzPb/nPd9z9t4V6enp4SaTaZUQ4knAzjcYVVkHH3YI/1cIICsE8mNPg3u+ajQac4CJUsqHHdf/jLaQQ2tCgB3E5BDVpqrAU22lQG0lj9aGEDylSilDH3YgrYX2RjcDSajalorTlnJpbbQ3+lsCg5SSh3Vt3LgRVVW/Vh9r4neyM/EKOxOvEGtNaDXunWti+Bx2Jl6hn+2JZjkKRuZ8ZwmbB33CzsQrrHxsmz4WERLNqvjtfDj0Aivjt+PQIvWxUd3T+d2Av/HB4NP8qu8Guhh76GM5j+/RY92ZeIUJ4S+0GOdDXdEjR47E4XAghGgVe03lMvWdZHzuAB/OPobvdqDFVX8/XIBelkeJ04Zy+bMLeN3N86dHvkKEoQ/PbhzJ1ZsXUW0GusRrADh7v8mhMwW8cCSV54a9yNzoFSw6PYmwkF70VuLJ/kMGN6vLWfT0m8yJeo2l554HwF8bIOODJD4tPwWANcqI5RG12VibbXRqaipWq5W8vLxGQ1Yra9asISsri/r6emJjY5k2bRoRERFUVFSQn59PUVERAFu2bCE/P5+UlBT279+P3W5n4MCBmM1mKioqmDdvHgAFBQXMmDEDr9fLgAEDmDp1Kl27dqW4uJjc3FzKysp0e3l5eYwdOxaA9evXc+zYsS/E3FQuneNNjR8E+t3dHO6Ha8DAz6KWsWSPk1WjNzfLNxlCeCZ8Gs++PwJP5DXsfUL0WLtp4fS29sd5IRUt3sd753PISHiRTmo3rt66yPJT8zGHK5h6Cgou/pmfJiwI8hEaa8QeE9Ji/nq8zS31Xbt2MWTIEIQQSCkZOnQoBw4cwOPxYLFYmDFjBitWrGD06NEsXbqUWbNmYTQadWcmk4mMjAxOnDiB1WolNTWV4cOHk5aWFuQnEAgQGhrK3LlzycnJYdy4cZw8eZKsrKyg4hmNRqZMmcLy5cuZPn36fUv4nUK0FjctIot9p7dR3e3anTI3yethjKCuoZbUIZnsSP43G753hB90+zFSSroKB+U1JSgOL0IBxeGlvKaErgYHBk1g7a2ihAgMiiD1sWnsOfvHu7aBlYO38qfEsyyJe5cwrdeDSbfb7ebSpUskJCRw/PhxkpKSWLt2LUIIYmNjiYqKIjc3N2iO3W7n6tWrAGzevBmbzUZFRQWRkZFkZ2fjcrkoLCykoaEh6C6MiYnB5XJx5swZbDYbmzZtYtKkSWiaRl1dXZC9OxyDwYDf7w/y36LUSpDyKx7YvoQb1aEv/UMG8/L1yZjDFN13U3zZYCA0pBNVVTU8+ZtHSeg1iLfGv8upqn8QqA8gkbqCIEAIgd8bbMsZ+wY3KsvZei0Xi6NRnqe+l4S/XtIxpDNzRrzCz/v8lpeKnmk2pWYbbTAY2Lt3L0lJSZSVlWE2mykuLsZkMuHz+SgsLNQl+A7sdjtGo1GfD1BaWsqsWbNITk5m2LBhZGRksGDBAr3ZUkp8Ph9CCDStcd+yWq0A+P3+IIUA0DSNQCCgzw0q6pc2sWU5/qrcJ2zJDHL8kAOTy/Xvcobt4K2z2XxU+n4Qt8xzFYlk+/l3sMR7OV1ziGufXSZcjeZy9Xl62MJRhQlvoB6jQcNuDWucY5QYMLCg7xrqqht4/ZATW8xdxewU31jngNdN/ukctsadeDDpllJy9OhR4uLiGDNmDLt379al2eVyER0dTWZmJpGRkTgcDhwOh36CBnTJVxQFv9/P9u3bWb16NWazGavVGiSRLpeLfv36kZCQgKZppKWlce7cOWpra4OCfxAZ/jqke+M/V5OwrJN+Xbp5nul5T7Pt5KYvcG+LKg4XFzBxwDQ01czgqBE4Ovak+MYZbgSuc77cRXpPJxbFRnpPJ6evF1IZKEdg4Bf91+GprGPZASfW6KZ/nYSGdGZ64ku4SooeTLrvNOvgwYOkpKSwYcMGvQi1tbUsXLiQ7OxsZs6cqUtsZmZmUFMARo0axezZs5FSUllZyZYtWygrK0NR7kqe2+1m8eLFOJ1O7HY7Z8+eZdmyZfrNcq+9ppr+eZ/3YlH/tSSH/QSAtcP3EJB+Rv3VAcDvBx/g7eJfc/jG7vvimsMVzOHKPcsFrFEKms+AlDKIKxR44/DLLPnROqYOn0+p5z+8umMOtzqUoZgEr/1lHktS1jHl+04+vfkvfrl7NuIRiDT3YUT3cdAdxvV9DoAb9SWkH36cnpYY3h5yBAC3r4oT1//Oqx89j4xsoZcTJkxoUcuqqqrweDx0795dbw5AQ0MDNTU1eL1epJQIIQgLCwOgpKQEh6OxQB6Ph6qqKgAURcFisejSXFpaSo8ePRBCUF9fT3V1NX6/H6PRSMeOHVFV9Qv2Pj8vKNYm3l7VXPBRX3HPXi4E3YY0bgO3Tnqx9FTQuhjum3svbhU1YO2tYgw1NMn110vcF3x43RJFA0svVR/zeQK4i/34bkvUDgJrjIpqFvhuB6j8xBvkx6AJunzXhK9WUlnUuPUJVWAMFXSIbDy4NQcxfvz4NvM4qf01ZfNofwT6LYEqpawG2sQbrPZGNw0J1aqUch8w8WEH0xpob3TTkMh9al1dnVPTNB/wjf8rUXujgyGRFULysdtbPf+/MJsCl5brAnUAAAAASUVORK5CYII=",
	        website: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAAAUCAYAAAAQqNbAAAAABmJLR0QA/wD/AP+gvaeTAAAJSklEQVRo3u1beVBU6RGfuIAY43qtq9lNsjHZ2tqqZFP51xSa0opR8QZUvK94LZoNqdSKF7JABAUHFOVcUZSKgIDOoKMgl+MAIma4WRQXhAG5L0GiRveX1z2Zx+MJCLtLpTI1XfWr93X3193f16+nv+8VhWLFihU2GzduVAowCIA5IOLOZAvMC4bwnElKjziFjYKKdcOGDTAnCJuzwAwRmjXhuGL9+vUNAmBOCMueaIE5ImdCg2LdunUwNwi/RAvMFIq1a9fC3BCiG2+BmUKxZs0amBuCb79tgZlCsXr1aowEiIZr8+LFC/5oovGlS5e4+L5N7NPacUPCy1fPEKqbMuT5/2t8883LAXVE39X//0M+FM7OzhgJEA3XZseOHeL41atXfLx/m9inbv1oSPCNskNQxrghzx8ugrUTvld/r4SCHUhH9F3XOdL5+D6gWLVqFeSIiIhAcnIyjw8cOMDJ2L9/P/MpKSkIDw/n8aFDh1BWVobKyko8fPgQnp6eog+i+Ph41tXW1sLf35/l9BWfnZ2N6upqVFVVIS8vT7ShDksfTVeuXGF78l1aWso2g8WSIyhzrIgQ7TuoaEpAS3cxmroKUNmcJOqoowRrJ/OYKLvSned19FQiIX8u8g0nBb6UEX33t6Idkb4mEOUN/8DjjhxcK3Huo8urPoaHTVeQ+cCVZfH6Oajr0Anx89H45B4uF9iL8+83xgoyPcf9ulmNcN37ok5TshptT++z3Z0qby5Y6d6kIKLn6VvjUVp/TkAUwm5PHXDv/a1Tmo/B1iVHQv4fUd+Zy3Obu4qQWDCP5eoiB4EvFOQlMLRn4nzuJ33iDzXfUihWrlwJObZt2waDwcDj6OhoFBcX48KFC8xT8ZF+y5YtePToEZycnDB79mwulKamJu6KNI8oLCyMdXS0d3R0sJ2vry+ysrJYTli6dKkYlwqW5s6fP5877Ny5czFnzhxs3rx50FhynMz4oQh1oRNKqtT4c6AtPjthi4Nnpoq6f798hlOZk3hMdDlnF887c3UNXrzsRmTKYuwJGI3L2r0oqY0W7YhitRvxebgtDkS8h84eAyKyPhB1cYLub6G28Lg4hl90U2cJ3CM/4PiHIz8U5tcIhTWR53uc/wnLKa7mziHcrfJj+ZdZ0/H0WQs8znzM+mT9QS5Y6d6kIArRvotHLcm4qffG3i9toS4YeO/ydcrzMdC65IjQ/QxPnzcjIG4mz/3LibEI0Ewzrv95C7yjPmF5XIYL6jvy+sQfar6lUAh/6YIcy5cvR0NDA3bu3In8/Hy4urpCr9czT3LSU+G1t7dzBySUlJRwke/evZt9EEn9UVclm61bt7IP6uBKpZIL1DSPCpbuoDSmgqXjncZviiXHifQxIoKuf4S2J9Uoqg0XOtZaBKW9I+roBQVlTOQxkfelCUbdtY/Q3dOCvyfaMh+RPBtVDdmiHZFvotGPMmUMCh8m4YreSdT5JEwS56ryndDV0wxDmxa17VoYWrVobKvAuexfsz61bA/q2nVCB85CfVshyg0alqsLnFFUcRV+141+jsT+mAtWujcpiBo79YjP3I0DUbZv3Lt8nfJ8DLQuOVQFK1FWlQoflTFmYJoxJ6r8VSitTIGfxjjvixihg798jpBb7w4731IoqGv1B41Gg9DQUD6ClyxZwsc38SQnvbe3NwoLC8VOSZg1axaWLVvGeiI63k3+cnJy+Bin4p03bx7c3d2RlJSE+vp67pQ0hwqWipTGVLDUSYcSS47ANFsRfhpbuAZOQlSKI+5WhKC952vuIqTjF5Q+gcdEAalGm9D0X6L9SZ3oI+rWTDyqzxV5ouCMaSL/VfUNxOgcRJ3yZm/82KwVqDDcxmcnbUS4+Nvg2DVbXLz7O7Q8eYB9oVOFbmaDMJUDHhjS2S4ua5XwQ0gU/QSlTeGCle5NCqK0e0rcr70mFN34N+5dvk5pPgZblxyxWU4or0l9TR6XvVLIS4pENlbw/xyn0qcMO99SKBwdHdEffHx80NjYCJVKxbxarWb+yJEjzFMn7OzshJeXl2izb98+cUwUGRnJYxcXF+6QVJh0LaCuunDhQixYsACtra3Yvn07z6OCpSKlMfnetGnTkGLJEZA6WkTE7ek4mToZnnE22B85Dp3d9QjXfsg6ekEn08bz2JhAo01o+i/Q3lUn8uf+m0ATT5RZ7sbjs9m/Qve/muGvfv81PwR/1XuCvgWJ+YtEWUzeLH5ezF6IBzW34H/DKC+ujsH9mjQeH1f/FG1dNQjOnMq8pmgTF6zJR4LeHuG3f95nTXvP2CAl7wiqW9O4Uw62d/k6pfkYbF3y2LS/rp5GocjtmD8hFGZw5jQohfXTvqNyfsPy1DIXVNbl4njy6GHnWwqFg4MD+gN1RyLqisTTk4iKjnjqbvRVT0c0Hc+PHz+GTqcT7Yno3kudme69bm5ubHP48GG+jxJqamr4A47usWRDBUt3UBqTnOzInmSDxZJDedNGRFyuPZqeFAmX/2K0dJVCpXXH0atGHb2gE6lv89jYcYzykLTpwi++VuRNCTTx3M0KPPkDo7XrPoITHIWj2+Y1PwSS+563Q01LFlq7v0L70wqU1cazzithDO6Vx6BKuHeW18cgo0DJhUG6Yxqhs10WvhnadCh9fAEZxZ5csCa/TZ2luHzPqc+a6OkWaY2k7IPC9UMH1T+dB9y7fJ3SfAy2Lnls2p9f9O9R13ZX+Fgq41gxuX/g9QfFLRGuKYW878qGDHie/fi19Q4l31Io6IjuD3QNmDFjBndB4ulJPMlNcxYtWsRHs52dHYOOapOO5tJH08yZM1ln8mNvb88yE2iO1IaKmsYkJzuaQ7LBYslxPMVaxBeXrPGpv5URflbYd9ZK1P3Jywr+ycbxFs+3RPnRq9bY4ds7zzvRGruVvTyRW6TR5y7Bp0dMbzypnz72Aca5u45ZwfW00RfFdg22Eq4JVvz8PMIKewJ74xyOMdr9VdBRvK1evbpPB4lLeyQ7sh9o7/2t05SPN61LHtsrwRouSmMMiuUZb5R7xFqLOSJ7H3X/631TvqVQUDGYG/yTrUYURCMdw4L+oaDj2Nzgd+OtEcVmj1EjHsOC/kEF20jHvDnh2PVRFpgjkkc1UMEqFy9eDHPCUc0PLDBHXB91nP5wYCO8ZCraFvqwMQf4XlNYYE7QKFqEJ/+LzH8AJAsHnUo27mMAAAAASUVORK5CYII=",
	        githubstar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAUCAMAAAAQlCuDAAACplBMVEVVVVXVVSvmcjP0gEFNTU1PT09fX1/kbzD2gUJfX1/3g0VdXV3nczT1gkJPT09NTU3kcDE5OTk7Ozs8PDw9PT0+Pj5BQUFCQkJDQ0NERERFRUVISEhJSUlMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBiYmJlZWVnZ2dra2t4eHh8fHx/f3+CgoKGhoaIiIiJiYmKioqLi4uMjIyQkJCTk5OZmZmampqenp6fn5+jUiajo6OkpKSmpqanp6eqqqqrq6usrKyuVyivWCivWCmwsLCxYDSzXCy0XC21Wyq1XCy3XCq4Xi65YTG6Zzq7Xiu9YS/BajvCwsLDYi3Dw8PEZjTEb0DExMTFxcXGxsbHZC7Hx8fIZjLKjGzPz8/QazTSqJDTqJHVbDPVk2/V1dXWazLWcjzW1tbZczzb29vcnXrcrJLc3NzdgE7d3d3e3t7f39/g4ODht6DicjXkcDHkdDfk5OTlcTLlczXlxrXl5eXmcjPmdTfml2znczTodDXoe0DpdTbpdzjpfULp6enqdjfq6urrdzjreTrrejzrhk/rmWzrzr/r1srseDnsez3sgkjs1MfteTrtfUHthU3twant1cjt7e3uejvvezzvfkDv0sLv7+/wfD3wfkDwgEPwhEnwlGHwzLjw8PDxfT7xfkDxoXXxrorx8fHyfj/y8vLzf0Dzpnz0gEH1gUL1so71v6L149n2gkP3g0T3wKL3waP37Ob37+v39/f4vZ34yK74z7n46eD4+Pj50Lr52Mf58/D60r361MD61sL61sP65tv6+vr73s/739D739H75tr759z76N376uD85dj85tr859z87OT9/f3+/fz+/f3///9Ftc+TAAAAEXRSTlMGBo2Njo6Ojo7j4+jo6Ons7CIlfBEAAAABYktHROFfCM+mAAACOUlEQVQYGZXBT0iTYQDH8e/7vs82l6ibYgYWMrE0QaE/VEKXBJMIBKVDHSLoUhSdO3axbqVEERFENwnqVpMIIoIoioIuSRCUFSFWrkzd9u7Z++udUgnhXJ+PQ9Rrp1IjrGx/kDfRzYhKiZXdoc9EROUs5awxraJyopxbRvyHgLKM+A8BZblabswohZTWcmn9UfgrYQv/MGKZoz4XBwIQy4nf8vzRPOnxlyNCrhY1HR5M3ZWumw6vvz9Cy4FjjYqfl9ybEm1Dh9ZqkQ25bdu2ttt1Tnenm9qybZNn7a6mjUlbYkSo5viZTBeC4FlxrFhH/uqGI5eDQAjB/LXG4eE5QgJiz+878f6x02e1e3xWbX1TkP5c10PIiFA8bRMfEaiauiJMJmZ2XhFCCD4lsumqn4R84Mm+7tkJfwe9HoMpZ2raB9uLT8iIUDHiqgqBhASuTAGL8BDEcp4biJAFqkY3bB14VMCPNDSesw09FtZbFhkRmut79X0dAul1/CcgUC5T+6MBQdP75J7HIpQHWqo/PGzNFr/Fsm+/dlc3Z/IQybPIiNDs6ND8y9cCaWTQv40Acan3yzQC72D0wrxLKACyfVHncn39jVPF63avHW8JIGCJ00qJZp2OjgdkEk4u79R8T0Im4fh5x8slycR9xaOUnAQ+vUNN7byZcrdPWGMWdnGvnyVOipLOLi/zMMtqTlCWESUvnsqNe6xGlGVmkoRiMUCspkg5Z002QeUs5SyYwufqWipVZGWjWf0CDsxBCuuBMAQAAAAASUVORK5CYII=",
	        changelog: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAUCAYAAABGUvnzAAAABmJLR0QA/wD/AP+gvaeTAAAHa0lEQVRo3uVaaVBU2RV+wYaBmCjjZOJU1kqmUpU/k7/GuFdpLHdFBXcrrj/G/LDUcSGoQUPQCIWZlDNYwdHBYQAdkc1MsyPQsjWLCrgAAg0KCAOoLCL45X6HvGfTpbGtwrFq+lR91eee7fZ7X59zr5Ta8uXLPdavXx+qYFOAK+CdtPLvOmzj0stCtdhYD43krlu3Dq6EcallLgHvlJIQbe3atc0KcCW8nVLqEvBOLWvW1qxZA1eDt7nEZaCtXr0aroaxX1tdBtqqVavgahjzn2KXgbZy5Uo4i/7+frmkvErOm8Tg4OBz7T+8VOQUKM7GjgT6Bp/iXdV1I1lTW7FiBZzF1q1b8SrxrwqOz5GsR4KfZ/9BcqFToDgbOxLoGxjAjy6NbE3Nz88P9uAt02KxoL6+Hnfu3EFRUZHhYwfzkkKdEhUVJXHNzc04cOAAkpKS0NDQINi+fbuRR0lMTMTly5dx48YNHDt2bJgvLi4O+fn5iIiIEFtAQAAqKytRW1uL6upqBAYGGvG5ubmoqamRfQsLC7FhwwbDFxISgqamJsmLjY0Vgh2fjxidVDAMf7RUoqDjIa51deOqwuwrlWKn+Fc2iK22uw9+RbeMnJimNpR0PpKchHvf4Kdmq+GjBFQ1SIxVxdjnrbXexs2HvWI/eMOGgadPDV/fkwG8kzyk+xTeRLmqff1BN7LauvBBZrlTNRyh+fr6wh7BwcHIy8vDjBkzBIsWLTJ8JJhnGHVKWFiYxBw8eBC9vb3Yt28fpk+fjhMnTiAzM9PIoxw5cgSzZs3C4sWLcf/+fWzevHmYb+bMmZg3b54QVldXh2XLlkltEtLa2irdzXjdTvAHceHCBbFv2bIFXV1dMoLpO3XqlBDs+HzE9xPzDfxCEXO/7zGmfB4Hz79/gtHBn+K98+nio2zLKRH77/8djYZHPUbez8JjxE4E5BbjHzdtho+y3GyBZ9gZ/PaTL4y8X6dY0dLbh/c/PgNPtc9HljIMqLGs55HgcUn5+JWKa1Pf6YPwKKn/oTkHRe1dTtVwhKb+kgV7bNy4UTrSbDYjNDRUCNV9JJgvkDplyZIlopOUzs5OLFy4UNY7duzA9evXjTwKiaG+dOlS6UL+kHQfbXos7R0dHaioqBCwjs1mw7Zt28QfHh4u3V1VVSWdXFBQIPajR49KXR8fH1mTSBLs+HyEV8IVA75XKpBWUw/PqJQhW7wFXnE5olO8P0sQ3TM6FT1PnmCMIoDrP5feRm77A+QplLd14FJdk1GTMiby0tD6XCa6+4fyVqi94quq4XU+S3zjT8cLOXoeCX478Qr8VFxKdR28YjPEPjriIh4PDOLHany/rIYjNL54e5C02bNnY//+/TJW7927J91DHwnmGUZdJ4b6pk2bpMv0Grt27RIS9DWFlzN9TVI4dh3rEIcPH0Z5ebnRpcTUqVOl83fv3o3Gxkb5IdHOiWG1WiUvKCgI2dnZRh1+ZxLs+HyEpyJRx7L0IqTdaRxm00HxvJhrrB897od3ggV/yL6KW50PMT7sM3ioLvKJTUZGfdNL8/wyixB/u86wj0+0CDn6mgQzzjejCCm1NsM+WuGxOp/fdaKGIzS+XHtwdLJrOS7nzJmD9vZ2GX/0kWCOTOo6MQS7ngTr6507dwrB+ppy+vRp0dmJ7HYS4FiH4ITgqD106JBh27t3r3zynC8tLZUfIddZWVlCMHXeDVpaWuSHxDWPDxLs+HzEWxfzDPzky6/R0t2DyYo0rvky31PnIHWKfSyJGpuQh3kZxciua8RbX2WLPbqmEelc/y/uRXm/jElBq9rrfXOx2D+6WiPk6HEkmHE/jzajracXv0srEfuHpdUosN1V+11+aQ1HaBxp9uBL5BlI8LJ08uRJOYfpI8EcfdQpeg5HNAnW1zrB+poSGRkpNdmBe/bskY50rEPQzts6xzNH8927d43Ru2DBAqSlpaGkpAQ5OTlykSLBep6/v7/sy/P/7NmzQrDj8xEecbnPoEbotIgYFLZ1olJdaK51PcLM7DLxUexjSdSY+Fx4fZ6M6IrbMDd/g2hbK0KLrwnBetyL8jzUyF19Lhm31D5l6oL0N2sl2hWRehwJHorLxMKzcSjveICqBz3IbGqVs1ziXlLDERq7wR5z587FlClTDPBipPsmTpwoL1LXdTtH5qRJk4z1/PnzZazqawrrsN7kyZNlMtjXdPwOej5jCY5j3UedFzl+8mI2bdo0w8e6zKOP+z2vNuF+IWc4FGGmw/+CKfCfMB36GO5nksQ+am/wsDjTX47CXXWtu+ok07EImILDhz6PR8KkLkN63AvzlD5WnZmmvx6Xff6UakHyzZpncf7P4txPxUuMKfD4UO2oVCPu/9VwhEbCXjco38Y+zsJEgt4QgirrYVX/JGP3pTe24Deffvlaa2gcv68bEyZMwLexj7MYdT77zUF1u5uaFG6qM92CTmDUF+bXWoMEt3DEuhLczmW5Br7KbibBoby8uBK+py4xrgC381kh/EOHh3poktzGy40rQIvJ+G4jNrNNO5ch/2XnvyqleyAtV3GuAAAAAElFTkSuQmCC"
	    }
	};
	
	var About = function (_React$Component) {
	    _inherits(About, _React$Component);
	
	    function About() {
	        _classCallCheck(this, About);
	
	        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
	    }
	
	    _createClass(About, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var href = _browser.br.isFirefox() ? "https://addons.mozilla.org/addon/simpread?src=external-ext" : "https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll/reviews";
	            return React.createElement(
	                'div',
	                { id: 'labs', style: { width: '100%' } },
	                React.createElement(
	                    'div',
	                    { style: style.root },
	                    React.createElement('image', { src: _browser.browser.runtime.getURL("assets/images/icon128.png") }),
	                    React.createElement(
	                        'div',
	                        { style: style.title },
	                        '\u7B80\u60A6 SimpRead'
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        '\u4E3A\u4F60\u63D0\u4F9B\u300C\u5982\u6742\u5FD7\u822C\u6C89\u6D78\u5F0F\u9605\u8BFB\u4F53\u9A8C\u300D\u7684\u6269\u5C55'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: style.badges },
	                        React.createElement(
	                            'a',
	                            { href: urls.href.version, target: '_blank' },
	                            React.createElement('img', { style: style.img, src: urls.badges.version })
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: urls.href.website, target: '_blank' },
	                            React.createElement('img', { style: style.img, src: urls.badges.website })
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: urls.href.githubstar, target: '_blank' },
	                            React.createElement('img', { style: style.img, src: urls.badges.githubstar })
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: urls.href.changelog, target: '_blank' },
	                            React.createElement('img', { style: style.img, src: urls.badges.changelog })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'a',
	                            { style: style.link, href: 'http://ksria.com/simpread' },
	                            '\u7B80\u60A6'
	                        ),
	                        ' \u7684\u521D\u8877\uFF1A\u8FD8\u539F\u4E00\u4E2A\u5E72\u51C0\u7684\u9605\u8BFB\u7A7A\u95F4\uFF0C\u63D0\u5347\u4F60\u7684\u9605\u8BFB\u4F53\u9A8C\u3002',
	                        React.createElement('br', null),
	                        '\u622A\u81F3\u5230\u76EE\u524D\u4E3A\u6B62\uFF0C\u7B80\u60A6\u5DF2\u7ECF\u9002\u914D\u4E86 ',
	                        React.createElement(
	                            'spn',
	                            { style: style.stat },
	                            this.props.site
	                        ),
	                        ' \u7C7B\u7F51\u5740\uFF0C\u8BE6\u7EC6\u8BF7\u770B ',
	                        React.createElement(
	                            'a',
	                            { style: style.link, href: 'https://simpread.ksria.cn/sites/', target: '_blank' },
	                            '\u8FD9\u91CC'
	                        ),
	                        '\u3002',
	                        React.createElement('br', null),
	                        '\u81EA\u4ECE ',
	                        React.createElement(
	                            'span',
	                            { style: style.stat },
	                            this.props.option.create && this.props.option.create.split(" ")[0]
	                        ),
	                        ' \u5B89\u88C5\u540E\uFF0C\u5171\u4F7F\u7528\u4E86 ',
	                        React.createElement(
	                            'spn',
	                            { style: style.stat },
	                            this.props.statistics.focus,
	                            '\u6B21'
	                        ),
	                        ' focus mode\uFF0C\u4EE5\u53CA ',
	                        React.createElement(
	                            'span',
	                            { style: style.stat },
	                            this.props.statistics.read,
	                            '\u6B21'
	                        ),
	                        ' reading mode\u3002',
	                        React.createElement('br', null)
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'label', 'data-head-level': 'h1' },
	                    '\u5E2E\u52A9'
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'a',
	                                { style: style.href, target: '_blank', href: 'http://sr.ksria.cn/zhifu_m2.png' },
	                                '\u5982\u679C\u7B80\u60A6\u53EF\u4EE5\u89E3\u51B3\u4F60\u5728\u9605\u8BFB\u4E0A\u75DB\u70B9\uFF0C\u53EF\u4EE5\u8BF7\u6211\u559D\u676F\u5496\u5561'
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'desc' },
	                            '\u7B80\u60A6\u662F\u4E00\u4E2A\u514D\u8D39\u4E14\u5F00\u6E90\u7684\u9879\u76EE'
	                        ),
	                        React.createElement('span', { className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'a',
	                                { style: style.href, target: '_blank', href: href },
	                                '\u5982\u679C\u7B80\u60A6\u5BF9\u4F60\u6709\u6240\u5E2E\u52A9\uFF0C\u8BF7\u5E2E\u5FD9\u6295\u7968'
	                            )
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'https://github.com/Kenshin/simpread' },
	                            '\u7B80\u60A6\u662F\u4E00\u4E2A\u5F00\u6E90\u7684\u4EA7\u54C1\uFF0C\u4EE3\u7801\u6258\u7BA1\u5728 Github \u4E0A'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'http://ksria.com/simpread/guide/' },
	                            '\u7B2C\u4E00\u6B21\u4F7F\u7528\u7B80\u60A6\uFF1F\u6216\u8005\u5E76\u4E0D\u4E86\u89E3\u300Creading mode\u300D\u8BF7\u524D\u5F80 ',
	                            React.createElement(
	                                'b',
	                                null,
	                                '\u65B0\u624B\u5165\u95E8'
	                            )
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href },
	                            React.createElement(
	                                'b',
	                                { onClick: function onClick() {
	                                        return _this2.props.onClick("welcome");
	                                    } },
	                                '\u91CD\u770B\u5F15\u5BFC\u9875\u9762'
	                            ),
	                            ' \u6216\u8005 ',
	                            React.createElement(
	                                'a',
	                                { style: style.href, target: '_blank', href: 'http://ksria.com/simpread/welcome/version_1.1.4.html' },
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '\u91CD\u770B\u5F53\u524D\u7248\u672C'
	                                )
	                            ),
	                            ' \u7684\u529F\u80FD\u4ECB\u7ECD'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'label', 'data-head-level': 'h1' },
	                    '\u5176\u5B83\u5E73\u53F0\u7684\u7B80\u60A6'
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'a',
	                                { style: style.href, target: '_blank', href: 'http://ksria.com/simpread/#downloads' },
	                                '\u7B80\u60A6\u5DF2\u7ECF\u4E0A\u7EBF\u4E86 Firefox \u7248\uFF0CUserScript \u7248\uFF0CJSBox \u7248\uFF0C\u603B\u6709\u4E00\u6B3E\u9002\u5408\u4F60'
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'desc' },
	                            '\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\uFF1AChrome \xB7 Firefox \xB7 Safari \xB7 Apple Safari \xB7 Microsoft Edge \xB7 Opera \xB7 iPhone \xB7 iPad'
	                        ),
	                        React.createElement('span', { className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'label', 'data-head-level': 'h1' },
	                    '\u53CD\u9988'
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'padding-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'https://github.com/kenshin/simpread/issues' },
	                            '\u5982\u679C\u6709\u4EFB\u4F55\u95EE\u9898\u8BF7\u63D0\u4EA4 issues'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'https://t.me/simpread' },
	                            '\u73B0\u5728\u5C31\u52A0\u5165 Telegram \u7FA4\uFF0C\u83B7\u53D6\u7B80\u60A6\u7684\u7B2C\u4E00\u624B\u8D44\u6599'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more', style: { cursor: 'default' } },
	                        '\u53EF\u4EE5\u5728 ',
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'https://twitter.com/wanglei001' },
	                            React.createElement(
	                                'b',
	                                null,
	                                'Twitter'
	                            )
	                        ),
	                        ' \u6216 ',
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'https://weibo.com/23784148' },
	                            React.createElement(
	                                'b',
	                                null,
	                                '\u65B0\u6D6A\u5FAE\u535A'
	                            )
	                        ),
	                        ' \u4E0A\u5173\u6CE8\u6211',
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'label', 'data-head-level': 'h1' },
	                    '\u5176\u5B83\u4F5C\u54C1'
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'http://ksria.com/gnvm' },
	                            'GNVM - \u4F7F\u7528 Go \u8BED\u8A00\u7F16\u5199\u7684 Node.js \u591A\u7248\u672C\u7BA1\u7406\u5668'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'http://ksria.com/emoji' },
	                            '+Emoji - \u4E00\u4E2A \u7B80\u5355\u3001\u53EF\u9760\u3001\u7EAF\u7CB9\u3001\u4E2D\u6587\u8BED\u4E49\u5316\u7684 Emoji \u6269\u5C55'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'http://ksria.com/sov2ex' },
	                            'SOV2EX - \u4E00\u4E2A\u4FBF\u6377\u7684 V2EX \u7AD9\u5185\u641C\u7D22\u5F15\u64CE\uFF08\u524D\u7AEF\u754C\u9762\uFF09'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { 'margin-top': '10px', 'position': 'relative' }, className: 'lab' },
	                    React.createElement(
	                        'div',
	                        { className: 'more' },
	                        React.createElement(
	                            'a',
	                            { style: style.href, target: '_blank', href: 'http://ksria.com/simptab' },
	                            '\u7B80 Tab - \u6781\u7B80\u7684 Chrome \u65B0\u6807\u7B7E\u9875\u6269\u5C55\uFF0C\u671B\u4F60\u6BCF\u6B21\u6253\u5F00\u90FD\u6709\u597D\u5FC3\u60C5'
	                        ),
	                        React.createElement('span', { style: { bottom: "11px" }, className: 'arrow' })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return About;
	}(React.Component);
	
	exports.default = About;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Notify) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _list = __webpack_require__(877);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _storage = __webpack_require__(2);
	
	var _config = __webpack_require__(522);
	
	var conf = _interopRequireWildcard(_config);
	
	var _export = __webpack_require__(568);
	
	var exp = _interopRequireWildcard(_export);
	
	var _timeago = __webpack_require__(878);
	
	var _timeago2 = _interopRequireDefault(_timeago);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option unread list load =====");
	
	var style = {
	    root: {
	        display: 'flex',
	        flexDirection: 'column',
	        justifyContent: 'center',
	        alignItems: 'center'
	    },
	    text: {
	        fontSize: '1.6rem',
	        color: '#9b9b9b'
	    },
	    icon: {
	        width: '80px',
	        height: '80px',
	        backgroundPosition: 'center',
	        backgroundRepeat: 'no-repeat',
	        backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBA0LLBOn/NkLAAABtklEQVRYw+2YPyxDURTGf5WOGCwiETH7s4kaDJo2FokYMBglZ66lOtGEqWIQm9zdoJouGERIEwNlE4NE4i0iBoO0CxIMvW1f26evvJY86Tfdc3LP99137vvuTa6HqlAwzxI9X064ISrxagweE5mfOXp18CHjoCDJFHbYlBCAOiywGWzLSYmAauUIn6koI+2g/Bzb0gMMyDWoZ9pNuTQByUKLbkSyhD6PyZroYcwiN0xSoQUYJGhZ+FKjwKtlNsggeAEIFJIbnJqm7BKpSeAIgHkdjbKgRwGucgIdOrEuYXOdXKo1Fm3pF+QOQBI6Tqg3wnleb8nUVHmtRNQBQueX5AZbclmRTVFYqBcbSKpS9jtocVLcFGgK/I6AhQ/UEPHCsf09GMyU287KaBc/Xm4vF+YbBv5oDzYd8FXUWrRIQoQa+wV1hfsFmj6whTt9IPvFRv3L39Q51AR7AKzKctMHtnCnD2wE6oAbpgF4bJCA3HKbH7vcaCsSdf9ZVCrQVyfW/uIwtwdZHcXUEzuSccKt2pglpoOsfkpQPs4a0p8ROc+1KI3RAHqDdPExpIv78nPQId7plgf4BCjPbVayklPeAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTEzVDExOjQ0OjE5KzA4OjAwPYuVdQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0xM1QxMTo0NDoxOSswODowMEzWLckAAAAASUVORK5CYII= )'
	    }
	},
	    ago = (0, _timeago2.default)();
	
	var Unrdist = function (_React$Component) {
	    _inherits(Unrdist, _React$Component);
	
	    function Unrdist() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Unrdist);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Unrdist.__proto__ || Object.getPrototypeOf(Unrdist)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            title: '\u672A\u8BFB\u5217\u8868\uFF1A' + _this.props.list.length + ' \u6761',
	            items: _this.props.list.map(function (item) {
	                item.priType = "text";
	                item.secType = "text";
	                item.priValue = item.title.substr(0, 1);
	                item.secValue = ago.format(item.create.replace(/(年|月)/g, "-").replace("日", ""), "zh_CN");
	                item.url = item.url + (window.location.search ? "&" : "?") + "simpread_mode=read";
	                return item;
	            }),
	
	            total: Math.ceil(_this.props.list.length / _this.props.step),
	            page: 1
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Unrdist, [{
	        key: 'onAction',
	        value: function onAction(event) {
	            var _this2 = this;
	
	            for (var _len2 = arguments.length, rests = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                rests[_key2 - 1] = arguments[_key2];
	            }
	
	            var pocket = exp.pocket,
	                linnk = exp.linnk,
	                instapaper = exp.instapaper,
	                id = rests[0],
	                _ = rests[1],
	                data = rests[2];
	
	
	            ["pocket", "instapaper", "linnk"].includes(id) && exp.VerifySvcWrapper(_storage.storage, exp[id], id, exp.Name(id), new Notify(), false).done(function (type) {
	                if (type == "pocket") {
	                    pocket.Add(data.url, data.title.trim(), function (result, error) {
	                        return exp.svcCbWrapper(result, error, pocket.name, type, new Notify());
	                    });
	                } else if (type == "linnk") {
	                    linnk.GetSafeGroup(linnk.group_name, function (result, error) {
	                        if (!error) {
	                            linnk.group_id = result.data.groupId;
	                            linnk.Add(data.url, data.title.trim(), function (result, error) {
	                                return exp.svcCbWrapper(result, error, linnk.name, type, new Notify());
	                            });
	                        } else new Notify().Render(2, linnk.name + ' \u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u65B0\u518D\u8BD5\u3002');
	                    });
	                } else {
	                    instapaper.Add(data.url, data.title.trim(), "", function (result, error) {
	                        return exp.svcCbWrapper(result, error, instapaper.name, type, new Notify());
	                    });
	                }
	            });
	
	            id == "remove" && _storage.storage.UnRead(id, data.idx, function (success) {
	                success && _this2.state.items.splice(_this2.state.items.findIndex(function (item) {
	                    return item.idx == data.idx;
	                }), 1);
	                success && _this2.setState({
	                    title: '\u672A\u8BFB\u5217\u8868\uFF1A' + _this2.state.items.length + ' \u6761',
	                    total: Math.ceil(_this2.state.items.length / _this2.props.step)
	                });
	                success && new Notify().Render(0, "删除成功");
	            });
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick() {
	            this.setState({ page: this.state.page + 1 });
	            this.props.onLoadMoreClick && this.props.onLoadMoreClick();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            var content_style = {
	                display: 'flex',
	                flexDirection: 'row',
	                alignItems: 'flex-end',
	                width: '100%'
	            };
	            var disable = this.state.page >= this.state.total ? true : false,
	                items = this.state.items.slice(0, this.state.page * this.props.step),
	                content = this.state.items && this.state.items.length > 0 ? React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'laterlist' },
	                    React.createElement(_list2.default, { acIconWaves: 'md-waves-effect md-waves-circle',
	                        acItemWaves: 'md-waves-effect',
	                        title: this.state.title, contentStyle: content_style,
	                        items: items, actionItems: conf.actionItems,
	                        priBgColor: '#E1BEE7',
	                        onAction: function onAction(e, i, t, d) {
	                            return _this3.onAction(e, i, t, d);
	                        } })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'version-tips', 'data-hits': 'latermore' },
	                    React.createElement(_button2.default, { type: 'raised', width: '100%',
	                        text: disable ? "加载完毕" : "加载更多", disable: disable,
	                        color: '#fff', backgroundColor: 'rgb(156, 39, 176)',
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this3.onClick();
	                        } })
	                )
	            ) : React.createElement(
	                'div',
	                { style: style.root },
	                React.createElement('span', { style: style.icon }),
	                React.createElement(
	                    'span',
	                    { style: style.text },
	                    '\u6CA1\u6709\u4EFB\u4F55\u672A\u8BFB\u5217\u8868!'
	                )
	            );
	            return React.createElement(
	                'div',
	                null,
	                content
	            );
	        }
	    }]);
	
	    return Unrdist;
	}(React.Component);
	
	Unrdist.defaultProps = {
	    list: [],
	    step: 5
	};
	Unrdist.propsType = {
	    list: React.PropTypes.array,
	    step: React.PropTypes.number,
	    onLoadMoreClick: React.PropTypes.func
	};
	exports.default = Unrdist;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(336)))

/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*!
	 * React Material Design: List
	 * 
	 * @version : 0.0.3.0116
	 * @update  : 2020/01/16
	 * @homepage: https://github.com/kenshin/mduikit
	 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
	 * @author  : Kenshin Wang <kenshin@ksria.com>
	 * 
	 * @copyright 2017
	 */
	
	console.log("==== simpread component: List ====");
	
	var color = "rgba( 51, 51, 51, .87 )",
	    secondary_color = "rgba( 51, 51, 51, .54 )",
	    disable_color = "rgba( 51, 51, 51, .38 )",
	    hover_color = "rgba( 238, 238, 238, 1 )",
	    border_color = "rgba( 224, 224, 224, 1 )",
	    transparent_color = "transparent",
	    background_color = "rgba( 255, 255, 255, 1 )";
	
	var cssinjs = function cssinjs() {
	    var styles = {
	
	        root: {
	            display: 'flex',
	            flexDirection: 'column'
	        },
	
	        header: {
	            display: 'block',
	
	            paddingLeft: '72px',
	
	            textAlign: 'left',
	
	            color: color,
	            fontSize: '1.5rem',
	            fontWeight: 700
	        },
	
	        list_item: {
	            display: 'flex',
	            justifyContent: 'center',
	            alignItems: 'center',
	
	            height: '56px'
	        },
	
	        pri_item: {},
	
	        pri_item_text: {
	            display: 'block',
	
	            minWidth: '40px',
	            minHeight: '40px',
	
	            margin: '0 16px',
	            padding: 0,
	
	            lineHeight: '40px',
	            fontWeight: 600,
	
	            borderRadius: '50%',
	
	            color: color,
	            backgroundColor: transparent_color
	        },
	
	        sec_item: {},
	
	        sec_item_text: {
	            display: '-webkit-box',
	
	            WebkitLineClamp: 1,
	            '-webkit-box-orient': 'vertical',
	
	            margin: '0 16px',
	
	            minWidth: '50px',
	
	            overflow: 'hidden',
	            textOverflow: 'ellipsis',
	
	            color: color,
	            backgroundColor: transparent_color
	        },
	
	        state_none: {
	            width: 0,
	            opacity: 0,
	            visibility: 'hidden',
	            paddingLeft: '72px'
	        },
	
	        state_avatar: {
	            display: 'block',
	
	            minWidth: '40px',
	            minHeight: '40px',
	
	            margin: '0 16px',
	            padding: 0,
	
	            lineHeight: '40px',
	
	            borderRadius: '50%',
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat'
	        },
	
	        state_icon: {
	            display: 'block',
	
	            minWidth: '24px',
	            minHeight: '24px',
	
	            margin: '8px 24px',
	            padding: 0,
	
	            lineHeight: '24px',
	
	            borderRadius: '50%',
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat'
	        },
	
	        state_action: {},
	
	        content: {
	            display: 'flex',
	            flexDirection: 'column',
	            alignItems: 'flex-start',
	            width: '100%'
	        },
	
	        link: {
	            display: '-webkit-box',
	            flexShrink: 1,
	
	            WebkitLineClamp: 1,
	            '-webkit-box-orient': 'vertical',
	
	            overflow: 'hidden',
	            textOverflow: 'ellipsis',
	            textAlign: 'left',
	
	            fontSize: '1.6rem',
	            color: color
	        },
	
	        subtitle: {
	            display: '-webkit-box',
	            flexShrink: 2,
	
	            WebkitLineClamp: 1,
	            '-webkit-box-orient': 'vertical',
	
	            overflow: 'hidden',
	            textOverflow: 'ellipsis',
	            textAlign: 'left',
	
	            color: secondary_color
	        },
	
	        action: {
	            display: 'block',
	            position: 'relative',
	
	            margin: '0 16px 0 0',
	            padding: 0
	        },
	
	        action_icon: {
	            display: 'block',
	
	            width: '27px',
	            height: '27px',
	
	            lineHeight: '27px',
	
	            borderRadius: '50%',
	
	            cursor: 'pointer',
	
	            backgroundPosition: 'center',
	            backgroundRepeat: 'no-repeat',
	            backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAwKJDqU6cY9AAAAgElEQVQ4y+3PsQnCYBRF4U+xcQYRHEcdwLhASOE8avEjSsApBIOWOoFYSRZxgBh8WueU73Lu49Lxnd7ncxrKvPKqmfRbip72zmkZF0ZgGhd2YN0MBi3CykWd33/ZUKpSFhfGYBYXDmAT31A4qfNb/MPD0TUt4sIEzONCCbY6/uIN+soX7VMadxMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMTJUMTA6MzY6NTgrMDg6MDBBhh2RAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTEyVDEwOjM2OjU4KzA4OjAwMNulLQAAAABJRU5ErkJggg==)'
	        },
	
	        action_items: {
	            display: 'block',
	            position: 'absolute',
	
	            top: 0,
	            right: 0,
	
	            margin: 0,
	            padding: '8px 0',
	
	            minWidth: '150px',
	
	            backgroundColor: background_color,
	
	            borderRadius: '2px',
	            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
	
	            opacity: 0,
	            transformOrigin: 'left top 0px',
	            transform: 'scaleY(0)',
	            transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
	
	            zIndex: 0
	        },
	
	        action_items_active: {
	            opacity: 1,
	            transform: 'scaleY(1)',
	
	            zIndex: 100
	        },
	
	        action_items_over: {
	            backgroundColor: hover_color,
	            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        action_bg: {
	            display: 'none',
	            position: 'fixed',
	
	            top: 0,
	            left: 0,
	
	            width: '100%',
	            height: '100%'
	        },
	
	        action_group: {},
	
	        action_item: {
	            display: '-webkit-box',
	
	            WebkitLineClamp: 1,
	            '-webkit-box-orient': 'vertical',
	
	            margin: 0,
	            padding: '0 24px',
	
	            height: '32px',
	
	            color: color,
	            fontSize: '1.2rem',
	            fontWeight: 400,
	
	            overflow: 'hidden',
	            textOverflow: 'ellipsis',
	            textAlign: 'left',
	            lineHeight: '32px',
	
	            cursor: 'pointer',
	
	            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms'
	        },
	
	        hr: {
	            margin: '8px 0',
	            height: '1px',
	            border: 'none',
	            backgroundColor: border_color
	        },
	
	        disable: {
	            color: disable_color,
	            cursor: 'not-allowed'
	        }
	
	    };
	    return styles;
	};
	
	/**
	 * ListItem react stateless component
	 * 
	 * @param {object} props, include:
	 *   - idx             : [PropTypes.number] index
	 *   - url             : [PropTypes.string] url
	 *   - title           : [PropTypes.string] title
	 *   - desc            : [PropTypes.string] subtitle
	 * 
	 *   - style           : [PropTypes.object] style
	 * 
	 *   - priType         : [PropTypes.string] primary   type, include: text, icon, avatar, action, none
	 *   - secType         : [PropTypes.string] Secondary type, include: text, icon, avatar, action, none
	 *   - priValue        : [PropTypes.any]    primary   value, value tyupe include: string, any
	 *   - secValue        : [PropTypes.any]    Secondary value, value tyupe include: string, any
	 * 
	 *   - events          : [PropTypes.object] events, include:
	 *     - priOnClick    : [PropTypes.func]   list item primary onClick event
	 *     - secOnClick    : [PropTypes.func]   list item secondary onClick event
	 * 
	 *     - iconOnClick   : [PropTypes.func]   action icon onClick event
	 *     - bgOnClick     : [PropTypes.func]   action bg   onClick event
	 *     - itemOnClick   : [PropTypes.func]   action item onClick event
	 *     - itemMouseOver : [PropTypes.func]   action item mouse over event
	 * 
	 *   - action          : [PropTypes.array]  include: id, title, icon, disable, hr
	 */
	var ListItem = function ListItem(props) {
	    var idx = props.idx,
	        url = props.url,
	        title = props.title,
	        desc = props.desc,
	        style = props.style,
	        acIconWaves = props.acIconWaves,
	        acItemWaves = props.acItemWaves,
	        priType = props.priType,
	        priValue = props.priValue,
	        secType = props.secType,
	        secValue = props.secValue,
	        action = props.action,
	        events = props.events,
	        content_style = props.contentStyle ? _extends({}, props.contentStyle) : _extends({}, style.content);
	
	
	    var pri_style = priType == "text" ? _extends({}, style["pri_item_" + priType]) : _extends({}, style["state_" + priType]),
	        sec_style = secType == "text" ? _extends({}, style["sec_item_" + secType]) : _extends({}, style["state_" + secType]),
	        pri_value = ["avatar", "icon"].includes(priType) ? "" : priValue,
	        sec_value = ["avatar", "icon"].includes(secType) ? "" : secValue;
	
	    props.priStyle && (pri_style = _extends({}, props.priStyle));
	    props.secStyle && (sec_style = _extends({}, props.secStyle));
	
	    ["avatar", "icon"].includes(priType) && (pri_style.backgroundImage = "url(" + priValue + ")");
	    ["avatar", "icon"].includes(secType) && (sec_style.backgroundImage = "url(" + secValue + ")");
	    priType == "none" && (pri_style = _extends({}, pri_style, style.state_none));
	    secType == "none" && (sec_style = _extends({}, sec_style, style.state_none));
	
	    props.priBgColor && (pri_style.backgroundColor = props.priBgColor);
	    props.secBgColor && (sec_style.backgroundColor = props.secBgColor);
	
	    // hack code by only firefox
	    var true_title = title;
	    if (window.navigator.userAgent.toLowerCase().includes("firefox")) {
	        style.subtitle.display = "none";
	        true_title.length > 26 && (true_title = true_title.substring(0, 26) + "...");
	    }
	
	    var actionItems = action ? action.map(function (item) {
	        var id = item.id,
	            title = item.title,
	            disable = item.disable,
	            hr = item.hr,
	            root = disable ? _extends({}, style.action_item, style.disable) : _extends({}, style.action_item);
	
	        return React.createElement(
	            "action-group",
	            null,
	            React.createElement(
	                "action-item",
	                { style: root, id: id, "class": acItemWaves,
	                    onClick: !disable && function (e) {
	                        return events.itemOnClick(e, props);
	                    },
	                    onMouseOver: function onMouseOver(e) {
	                        return events.itemMouseOver(e);
	                    } },
	                title
	            ),
	            hr && React.createElement("hr", { style: style.hr })
	        );
	    }) : undefined;
	    return React.createElement(
	        "list-item",
	        { idx: idx, style: style.list_item },
	        React.createElement(
	            "pri-item",
	            { style: pri_style, onClick: function onClick(e) {
	                    return events.priOnClick(e, props);
	                } },
	            pri_value
	        ),
	        React.createElement(
	            "content",
	            { style: content_style, "data-tooltip": true_title, "data-tooltip-position": "up" },
	            React.createElement(
	                "a",
	                { style: style.link, href: url, target: "_blank" },
	                true_title
	            ),
	            React.createElement(
	                "subtitle",
	                { style: style.subtitle },
	                desc
	            )
	        ),
	        React.createElement(
	            "sec-item",
	            { style: sec_style, onClick: function onClick(e) {
	                    return events.secOnClick(e, props);
	                } },
	            sec_value
	        ),
	        React.createElement(
	            "action",
	            { style: style.action },
	            React.createElement("action-icon", { style: style.action_icon, "class": acIconWaves, onClick: function onClick(e) {
	                    return events.iconOnClick(e);
	                } }),
	            React.createElement(
	                "action-items",
	                { style: style.action_items },
	                actionItems
	            ),
	            React.createElement("action-bg", { style: style.action_bg, onClick: function onClick(e) {
	                    return events.bgOnClick(e);
	                } })
	        )
	    );
	};
	
	/**
	 * Custom <a> tag component: List, component e.g.
	 * 
	    <list>
	        <list-header>未读列表：100 条</list-header>
	        <list-item>
	            <pri-item>换</pri-item>
	            <content>
	                <a href="http://www.cnbeta.com/articles/tech/601485.htm" target="_blank">换壳为本？Nokia 6 银白色版 1499 元起正式开卖</a>
	                <subtitle>4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务</subtitle>
	            </content>
	            <sec-item>2 days</sec-item>
	            <action>
	                <action-icon></action-icon>
	                <action-items>
	                    <action-group>
	                        <action-item>发送到 Pocket</action-item>
	                        <hr>
	                    </action-group>
	                    <action-group>
	                        <action-item>删除</action-item>
	                    </action-group>
	                </action-items>
	                <action-bg></action-bg>
	            </action>
	        </list-item>
	    </list>
	 * 
	 * Reference:
	 * - https://material.io/guidelines/components/lists.html
	 * - http://www.material-ui.com/#/components/list
	 * - chrome://history
	 * 
	 * @class
	 */
	
	var List = function (_React$Component) {
	    _inherits(List, _React$Component);
	
	    function List() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, List);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this), _this.style = cssinjs(), _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(List, [{
	        key: "acIconOnClick",
	        value: function acIconOnClick(event) {
	            var style = _extends({}, this.style);
	            $(event.target).next().css(_extends({}, style.action_items, style.action_items_active));
	            $(event.target).parent().find("action-bg").css("display", "block");
	        }
	    }, {
	        key: "acBgOnClick",
	        value: function acBgOnClick(event) {
	            var style = _extends({}, this.style);
	            $(event.target).css("display", "none").prev().css(_extends({}, style.action_items));
	        }
	    }, {
	        key: "acItemOnClick",
	        value: function acItemOnClick(event, data) {
	            var $target = $(event.target),
	                id = $target.attr("id"),
	                title = $target.text(),
	                style = _extends({}, this.style);
	            $target.parent().parent().css(_extends({}, style.action_items)).next().css("display", "none");
	            this.props.onAction && this.props.onAction(event, id, title, data);
	        }
	    }, {
	        key: "acItemMouseOver",
	        value: function acItemMouseOver(event) {
	            var $target = $(event.target);
	            if ($target.is("action-item")) {
	                $("action-item[active=true]").css("background-color", "transparent").attr("active", false);
	                $target.attr("active", true).css("background-color", "rgb(238, 238, 238)");
	            }
	        }
	    }, {
	        key: "priOnClick",
	        value: function priOnClick(event, data) {
	            this.props.priOnClick && this.props.priOnClick(event, data);
	        }
	    }, {
	        key: "secOnClick",
	        value: function secOnClick(event, data) {
	            this.props.secOnClick && this.props.secOnClick(event, data);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            var style = _extends({}, this.style),
	                _props = this.props,
	                items = _props.items,
	                title = _props.title,
	                actionItems = _props.actionItems,
	                others = _objectWithoutProperties(_props, ["items", "title", "actionItems"]),
	                list = items.map(function (item) {
	                var events = {
	                    iconOnClick: function iconOnClick(e) {
	                        return _this2.acIconOnClick(e);
	                    },
	                    bgOnClick: function bgOnClick(e) {
	                        return _this2.acBgOnClick(e);
	                    },
	                    itemOnClick: function itemOnClick(e, d) {
	                        return _this2.acItemOnClick(e, d);
	                    },
	                    itemMouseOver: function itemMouseOver(e) {
	                        return _this2.acItemMouseOver(e);
	                    },
	                    priOnClick: function priOnClick(e, d) {
	                        return _this2.priOnClick(e, d);
	                    },
	                    secOnClick: function secOnClick(e, d) {
	                        return _this2.secOnClick(e, d);
	                    }
	                };
	                return React.createElement(ListItem, _extends({}, item, others, { action: actionItems, events: events, style: _extends({}, style) }));
	            });
	
	            return React.createElement(
	                "list",
	                { style: style.root },
	                React.createElement(
	                    "list-header",
	                    { style: style.header },
	                    title
	                ),
	                list
	            );
	        }
	    }]);
	
	    return List;
	}(React.Component);
	
	List.defaultProps = {
	    title: "",
	
	    items: [],
	    actionItems: [],
	
	    acIconWaves: "",
	    acItemWaves: "",
	
	    priStyle: undefined,
	    secStyle: undefined,
	    contentStyle: undefined,
	
	    priBgColor: "",
	    secBgColor: ""
	
	};
	List.PropTypes = {
	    title: React.PropTypes.string,
	
	    items: React.PropTypes.array,
	    actionItems: React.PropTypes.array,
	
	    onAction: React.PropTypes.func,
	
	    acIconWaves: React.PropTypes.string,
	    acItemWaves: React.PropTypes.string,
	
	    priStyle: React.PropTypes.object,
	    secStyle: React.PropTypes.object,
	    contentStyle: React.PropTypes.object,
	
	    priBgColor: React.PropTypes.string,
	    secBgColor: React.PropTypes.string
	};
	exports.default = List;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	!function (t, e) {
	  "object" == ( false ? "undefined" : _typeof(module)) && module.exports ? (module.exports = e(), module.exports.default = module.exports) : t.timeago = e();
	}("undefined" != typeof window ? window : undefined, function () {
	  function t(t) {
	    return t instanceof Date ? t : isNaN(t) ? /^\d+$/.test(t) ? new Date(e(t)) : (t = (t || "").trim().replace(/\.\d+/, "").replace(/-/, "/").replace(/-/, "/").replace(/(\d)T(\d)/, "$1 $2").replace(/Z/, " UTC").replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(t)) : new Date(e(t));
	  }function e(t) {
	    return parseInt(t);
	  }function n(t, n, r) {
	    n = p[n] ? n : p[r] ? r : "en";for (var o = 0, i = t < 0 ? 1 : 0, a = t = Math.abs(t); t >= h[o] && o < m; o++) {
	      t /= h[o];
	    }return t = e(t), o *= 2, t > (0 === o ? 9 : 1) && (o += 1), p[n](t, o, a)[i].replace("%s", t);
	  }function r(e, n) {
	    return ((n = n ? t(n) : new Date()) - t(e)) / 1e3;
	  }function o(t) {
	    for (var e = 1, n = 0, r = Math.abs(t); t >= h[n] && n < m; n++) {
	      t /= h[n], e *= h[n];
	    }return r %= e, r = r ? e - r : e, Math.ceil(r);
	  }function i(t) {
	    return t.dataset.timeago ? t.dataset.timeago : a(t, w);
	  }function a(t, e) {
	    return t.getAttribute ? t.getAttribute(e) : t.attr ? t.attr(e) : void 0;
	  }function u(t, e) {
	    return t.setAttribute ? t.setAttribute(_, e) : t.attr ? t.attr(_, e) : void 0;
	  }function c(t) {
	    return a(t, _);
	  }function d(t, e) {
	    this.nowDate = t, this.defaultLocale = e || "en";
	  }function f(t, e) {
	    return new d(t, e);
	  }var s = "second_minute_hour_day_week_month_year".split("_"),
	      l = "秒_分钟_小时_天_周_月_年".split("_"),
	      p = { en: function en(t, e) {
	      if (0 === e) return ["just now", "right now"];var n = s[parseInt(e / 2)];return t > 1 && (n += "s"), [t + " " + n + " ago", "in " + t + " " + n];
	    }, zh_CN: function zh_CN(t, e) {
	      if (0 === e) return ["刚刚", "片刻后"];var n = l[parseInt(e / 2)];return [t + n + "前", t + n + "后"];
	    } },
	      h = [60, 60, 24, 7, 365 / 7 / 12, 12],
	      m = 6,
	      w = "datetime",
	      _ = "data-tid",
	      v = {};return d.prototype.doRender = function (t, e, i) {
	    var a,
	        c = r(e, this.nowDate),
	        d = this;t.innerHTML = n(c, i, this.defaultLocale), v[a = setTimeout(function () {
	      d.doRender(t, e, i), delete v[a];
	    }, Math.min(1e3 * o(c), 2147483647))] = 0, u(t, a);
	  }, d.prototype.format = function (t, e) {
	    return n(r(t, this.nowDate), e, this.defaultLocale);
	  }, d.prototype.render = function (t, e) {
	    void 0 === t.length && (t = [t]);for (var n = 0, r = t.length; n < r; n++) {
	      this.doRender(t[n], i(t[n]), e);
	    }
	  }, d.prototype.setLocale = function (t) {
	    this.defaultLocale = t;
	  }, f.register = function (t, e) {
	    p[t] = e;
	  }, f.cancel = function (t) {
	    var e;if (t) (e = c(t)) && (clearTimeout(e), delete v[e]);else {
	      for (e in v) {
	        clearTimeout(e);
	      }v = {};
	    }
	  }, f;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(358)(module)))

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.Render = Render;
	
	__webpack_require__(880);
	
	__webpack_require__(882);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _browser = __webpack_require__(334);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option welcome page load =====");
	
	var welcbgcls = "welcome",
	    welcbgclsjq = '.' + welcbgcls,
	    welcbg = '<div class="' + welcbgcls + '"></div>';
	var curidx = void 0,
	    max = [0, 0];
	
	var style = {
	
	    root: {
	        display: 'flex',
	        flexDirection: 'column',
	        justifyContent: 'center',
	        alignItems: 'center',
	
	        position: 'relative',
	
	        minWidth: '400px',
	        minHeight: '400px',
	
	        width: '650px',
	        height: '600px',
	
	        backgroundColor: '#fff',
	
	        borderRadius: '3px',
	        boxShadow: 'rgba(0, 0, 0, .247059) 0px 14px 45px',
	
	        userSelect: 'none'
	    },
	
	    section: {
	        textAlign: 'center'
	    },
	
	    h2: {
	        marginBottom: 0,
	
	        color: 'inherit',
	
	        fontSize: '24px',
	        fontWeight: 'bold',
	
	        lineHeight: '32px',
	        textAlign: 'center'
	    },
	
	    desc: {
	        padding: '5px',
	
	        color: 'rgba(51, 51, 51, 0.7)',
	
	        fontSize: '15px',
	        fontWeight: 400,
	
	        lineHeight: '32px',
	        textAlign: 'center'
	    },
	
	    img: {
	        width: '100%',
	        marginTop: '-82px'
	    },
	
	    gif: {
	        paddingTop: '58px',
	        width: '550px'
	    },
	
	    strong: {
	        fontWeight: 'normal',
	        color: '#3f51b5'
	    },
	
	    footer: {
	        display: 'flex',
	        flexDirection: 'row',
	
	        marginBottom: '24px'
	    },
	
	    close: {
	        position: 'absolute',
	
	        top: 0,
	        right: 0
	    }
	
	};
	
	var Welcome = function (_React$Component) {
	    _inherits(Welcome, _React$Component);
	
	    function Welcome() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Welcome);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            style: { display: "none" },
	            state: "next_icon"
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Welcome, [{
	        key: 'prevClick',
	        value: function prevClick() {
	            $('.carousel.carousel-slider').carousel("prev");
	        }
	    }, {
	        key: 'nextClick',
	        value: function nextClick() {
	            if (curidx != max) {
	                $('.carousel.carousel-slider').carousel("next");
	            } else this.closeClick();
	        }
	    }, {
	        key: 'closeClick',
	        value: function closeClick() {
	            window.dispatchEvent(new CustomEvent(msg.MESSAGE_ACTION.welcome_close, { detail: { first: this.props.first, version: this.props.version } }));
	            exit();
	        }
	    }, {
	        key: 'carousel',
	        value: function carousel() {
	            var _this2 = this;
	
	            $(".carousel-item").map(function (_, item) {
	                var $item = $(item),
	                    version = $item.attr("id");
	                version != "end" && version != "start" && version != _this2.props.version && $item.remove();
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this3 = this;
	
	            !this.props.first && this.carousel();
	            max = $(".carousel-item").length - 1;
	            $('.carousel.carousel-slider').carousel({
	                fullWidth: true,
	                onCycleTo: function onCycleTo(idx) {
	                    curidx = idx;
	                    if (curidx == max) {
	                        _this3.setState({
	                            style: { display: "block" },
	                            state: "right_icon"
	                        });
	                    } else if (curidx == 0) {
	                        _this3.setState({
	                            style: { display: "none" },
	                            state: "next_icon"
	                        });
	                    } else {
	                        _this3.state.style.display != "block" && _this3.setState({ style: { display: "block" } });
	                        _this3.state.state != "next_icon" && _this3.setState({ state: "next_icon" });
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            $(welcbgclsjq).remove();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;
	
	            var _props = this.props,
	                first = _props.first,
	                version = _props.version;
	
	            return React.createElement(
	                'welcome',
	                { style: style.root },
	                React.createElement(
	                    'div',
	                    { className: 'carousel carousel-slider', 'data-indicators': 'true' },
	                    React.createElement(
	                        'div',
	                        { className: 'carousel-item chrome', id: 'start' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: ss.IconPath("welcome"), style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: _extends({}, style.h2, { 'margin-bottom': 0 }) },
	                                this.props.first ? "欢迎使用 简悦" : "简悦 已升至最新版"
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                _browser.br.isFirefox() ? "Chrome 好评率超过 99% 的reading mode现已来到 Firefox" : "让你瞬间进入沉浸式阅读的 Chrome 扩展，类似 Safari 的reading mode",
	                                React.createElement('br', null),
	                                '\u53BB\u6389\u5E72\u6270\u5143\u7D20\uFF0C\u63D0\u5347\u9605\u8BFB\u4F53\u9A8C\uFF0C',
	                                React.createElement(
	                                    'strong',
	                                    { style: style.strong },
	                                    '\u300C\u7B80\u300D'
	                                ),
	                                '\u5355\u9605\u8BFB\uFF0C\u6109',
	                                React.createElement(
	                                    'strong',
	                                    { style: style.strong },
	                                    '\u300C\u60A6\u300D'
	                                ),
	                                '\u5FC3\u60C5',
	                                React.createElement('br', null),
	                                '\u4E3A\u4E86\u8FBE\u5230 ',
	                                React.createElement(
	                                    'strong',
	                                    { style: style.strong },
	                                    '\u300C\u5B8C\u7F8E\u300D'
	                                ),
	                                ' \u7684reading mode\uFF0C\u7B80\u60A6\u9002\u914D\u4E86 ',
	                                React.createElement(
	                                    'strong',
	                                    { style: style.strong },
	                                    React.createElement(
	                                        'a',
	                                        { target: '_blank', href: 'https://simpread.ksria.cn/sites/' },
	                                        '\u6570\u767E\u79CD\u7C7B\u578B'
	                                    )
	                                ),
	                                ' \u7684\u7F51\u7AD9'
	                            )
	                        )
	                    ),
	                    first && React.createElement(
	                        'div',
	                        { className: 'carousel-item' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: ss.IconPath("welcome-mode"), style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                'reading mode \u4E0E focus mode'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                'reading mode \u2192 ',
	                                React.createElement(
	                                    'strong',
	                                    null,
	                                    '\u72EC\u6709\u529F\u80FD'
	                                ),
	                                '\uFF0C\u81EA\u52A8\u63D0\u53D6\u9002\u914D\u9875\u9762\u7684\u6807\u9898\u3001\u63CF\u8FF0\u3001\u6B63\u6587\u3001\u5A92\u4F53\u7B49\u8D44\u6E90',
	                                React.createElement('br', null),
	                                '\u652F\u6301 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u624B\u52A8\u6846\u9009' },
	                                    '\u624B\u52A8\u6846\u9009'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u4E3B\u52A8\u9002\u914Dreading mode' },
	                                    '\u4E3B\u52A8\u9002\u914D\u6A21\u5F0F'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE' },
	                                    '\u667A\u80FD\u9002\u914D\u6A21\u5F0F'
	                                ),
	                                '\xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BBA\u575B\u7C7B\u9875\u9762\u53CA\u5206\u9875' },
	                                    '\u8BBA\u575B\u7C7B\u9875\u9762 / \u5206\u9875'
	                                ),
	                                React.createElement('br', null),
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/focus mode' },
	                                    'focus mode'
	                                ),
	                                ' \u2192 \u9AD8\u4EAE\u9F20\u6807\u6240\u5728\u7684\u6587\u7AE0\u6BB5\u843D\uFF0C\u4E0D\u6539\u53D8\u5F53\u524D\u9875\u9762\u7684\u7ED3\u6784',
	                                React.createElement('br', null)
	                            )
	                        )
	                    ),
	                    (!first && version == "1.1.1" || version == "all") && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.1' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-adapter.png', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u66F4\u667A\u80FD\u7684\u6B63\u6587\u63D0\u53D6\u529F\u80FD'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u5168\u65B0\u7684 ',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE'
	                                ),
	                                React.createElement(
	                                    'sup',
	                                    null,
	                                    '2.0'
	                                ),
	                                '\uFF0C\u7B80\u60A6\u53EF\u4EE5\u8BC6\u522B\u51FA ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/TXT-\u9605\u8BFB\u5668' },
	                                    'TXT'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE?id=markdown-\u8BC6\u522B' },
	                                    'Markdown'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE?id=latex-\u8BC6\u522B' },
	                                    'LaTeX'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE?id=\u4EE3\u7801\u6BB5\u7684\u9AD8\u4EAE' },
	                                    '\u4EE3\u7801\u6BB5'
	                                ),
	                                React.createElement('br', null),
	                                'Wordpress \xB7 Hexo \xB7 Ghost \xB7 Discuz \u7B49\u535A\u5BA2 / \u8BBA\u575B\u7684\u9875\u9762\u4E86\uFF01',
	                                React.createElement('br', null),
	                                '\u751A\u81F3\uFF0C\u53EA\u8981\u662F\u7ED3\u6784\u826F\u597D\u7684\u9875\u9762\uFF0C\uFF08\u65E0\u9700\u9002\u914D\uFF09\u81EA\u52A8\u751F\u6210reading mode\uFF0C\u8BE6\u7EC6 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE' },
	                                    '\u8BF7\u770B\u8FD9\u91CC'
	                                )
	                            )
	                        )
	                    ),
	                    first && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.0.3' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-service-v2.png?201806111215', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u8FDE\u63A5\u4F60\u7684\u751F\u4EA7\u529B\u5DE5\u5177'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u652F\u6301\u4E0B\u8F7D HTML \xB7 PDF \xB7 Markdown \xB7 PNG \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u53D1\u9001\u5230-Epub' },
	                                    'Epub'
	                                ),
	                                ' \u5230\u672C\u5730 \u4EE5\u53CA \u53D1\u9001\u5230 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u53D1\u9001\u5230-Kindle' },
	                                    'Kindle'
	                                ),
	                                React.createElement('br', null),
	                                '\u652F\u6301\u8F93\u51FA\u5230 \u575A\u679C\u4E91 \xB7 \u6709\u9053\u4E91\u7B14\u8BB0 \xB7 \u4E3A\u77E5\u7B14\u8BB0 \xB7 \u8BED\u96C0 \xB7 \u5370\u8C61\u7B14\u8BB0 \xB7 Dropbox \xB7 Onenote \xB7 Notion \u7B49',
	                                React.createElement('br', null),
	                                '\u53D1\u9001\u9875\u9762\u94FE\u63A5\u5230 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u7A0D\u540E\u8BFB' },
	                                    '\u7A0D\u540E\u8BFB'
	                                ),
	                                ' \xB7 Pocket \xB7 Instapaper \xB7 Linnk\uFF0C\u8BE6\u7EC6 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u5BFC\u51FA\u5230\u751F\u4EA7\u529B\u5DE5\u5177' },
	                                    '\u8BF7\u770B\u8FD9\u91CC'
	                                )
	                            )
	                        )
	                    ),
	                    first && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.0' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: ss.IconPath("welcome-custom"), style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u7AD9\u70B9\u7F16\u8F91\u5668 \xB7 \u7AD9\u70B9\u9002\u914D\u6E90 \xB7 \u7AD9\u70B9\u7BA1\u7406\u5668'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u9875\u9762\u4E0A\u4EFB\u610F\u5143\u7D20\u5747\u53EF\u9690\u85CF\uFF0C\u66F4\u652F\u6301\u7F16\u7A0B\uFF0C\u8BE6\u7EC6\u8BF7\u770B ',
	                                React.createElement(
	                                    'a',
	                                    { href: 'http://ksria.com/simpread/docs/#/\u7AD9\u70B9\u7F16\u8F91\u5668', target: '_blank' },
	                                    '\u7AD9\u70B9\u7F16\u8F91\u5668'
	                                ),
	                                React.createElement('br', null),
	                                '\u66F4\u7075\u6D3B\u3001\u793E\u533A\u5316\u7684\u591A\u79CD ',
	                                React.createElement(
	                                    'a',
	                                    { href: 'http://ksria.com/simpread/docs/#/\u7AD9\u70B9\u9002\u914D\u6E90', target: '_blank' },
	                                    '\u7AD9\u70B9\u9002\u914D\u6E90'
	                                ),
	                                React.createElement('br', null),
	                                '\u5185\u7F6E\u4E86 ',
	                                React.createElement(
	                                    'a',
	                                    { href: 'http://ksria.com/simpread/docs/#/\u7AD9\u70B9\u7BA1\u7406\u5668', target: '_blank' },
	                                    '\u7AD9\u70B9\u7BA1\u7406\u5668'
	                                ),
	                                '\uFF0C\u65B9\u4FBF\u7BA1\u7406\u5168\u90E8\u7684\u9002\u914D\u7AD9\u70B9'
	                            )
	                        )
	                    ),
	                    !first && version == "1.1.1" && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.1' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-fap.png', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u5168\u65B0\u7684\u63A7\u5236\u680F\u9762\u677F'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u300C\u544A\u522B\u300D\u4F20\u7EDF\u3001\u5355\u4E00\u7684\u63A7\u5236\u680F\uFF0C\u5168\u90E8\u529F\u80FD\u300C\u4E00\u89C8\u65E0\u4F59\u300D',
	                                React.createElement('br', null),
	                                '\u4E3B\u9898\u3001\u5B57\u4F53\u6837\u5F0F\u3001\u5927\u5C0F\u3001\u7248\u9762\u5E03\u5C40\u66F4\u6539\u4E00\u952E\u5B8C\u6210',
	                                React.createElement('br', null)
	                            )
	                        )
	                    ),
	                    (!first && version == "1.1.2" || version == "all") && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.2' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-plugins.png', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u63D2\u4EF6\u7CFB\u7EDF'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'https://simpread.ksria.cn/plugins/details/kw36BtjGu0' },
	                                    '\u5B57\u6570\u7EDF\u8BA1'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'https://simpread.ksria.cn/plugins/details/klGUASLasg' },
	                                    '\u4EE3\u7801\u6BB5\u589E\u5F3A'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'https://simpread.ksria.cn/plugins/details/VQOZdNET2d' },
	                                    '\u70B9\u51FB\u67E5\u770B\u5927\u56FE\uFF08Lightbox\uFF09'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'https://simpread.ksria.cn/plugins/details/ohnTKVHz4a' },
	                                    '\u5212\u8BCD\u7FFB\u8BD1'
	                                ),
	                                ' \u4E00\u4E2A\u4E0D\u80FD\u5C11 ',
	                                React.createElement('br', null),
	                                '\u4F7F\u7528 JavaScript \u7F16\u5199\u57FA\u4E8E\u7B80\u60A6\u7684\u63D2\u4EF6\uFF0C\u8BE6\u7EC6\u8BF4\u660E\u8BF7\u770B ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u63D2\u4EF6\u7CFB\u7EDF' },
	                                    '\u8BF4\u660E\u6587\u6863'
	                                ),
	                                React.createElement('br', null),
	                                '\u73B0\u5728\u5C31\u5B89\u88C5\u9002\u5408\u4F60\u7684\u63D2\u4EF6\u5427 \u2192 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'https://simpread.ksria.cn/plugins/' },
	                                    '\u63D2\u4EF6\u4E2D\u5FC3'
	                                )
	                            )
	                        )
	                    ),
	                    (!first && version == "1.1.2" || version == "all") && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.2' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-sites.png', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u7AD9\u70B9\u96C6\u5E02'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u65B9\u4FBF\u63D0\u4EA4\uFF0C\u8BA9\u4F60\u7684\u7AD9\u70B9\u4E3A\u6570\u4EE5\u4E07\u8BA1\u7684\u7B80\u60A6\u7528\u6237\u4F7F\u7528',
	                                React.createElement('br', null),
	                                '\u5B98\u65B9\u4E3B\u9002\u914D\u6E90\u3001\u7B2C\u4E09\u65B9\u9002\u914D\u6E90\u3001\u7AD9\u70B9\u96C6\u5E02\u9002\u914D\u6E90\u3001\u81EA\u5B9A\u4E49\u9002\u914D\u6E90\u4E00\u7AD9\u5F0F\u6D4F\u89C8',
	                                React.createElement('br', null),
	                                '\u73B0\u5728\u5C31\u8BBF\u95EE ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'https://simpread.ksria.cn/sites/' },
	                                    '\u7AD9\u70B9\u96C6\u5E02'
	                                ),
	                                ' \u5427\uFF0C\u770B\u770B\u6709\u4EC0\u4E48\u589E\u52A0\u7684\u65B0\u9002\u914D\u7AD9\u70B9'
	                            )
	                        )
	                    ),
	                    !first && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '5005' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-puread-ii.png', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE 2.0'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u66F4\u52A0\u667A\u80FD\uFF0C\u66F4\u52A0\u4E13\u4E1A\uFF0CMarkdown / LaTeX / \u4EE3\u7801\u6BB5 \u5747\u4E0D\u5728\u8BDD\u4E0B',
	                                React.createElement('br', null),
	                                '\u91CD\u65B0\u6574\u7406\u5E76\u6839\u636E\u66F4\u9002\u5408\u4E2D\u6587\u9605\u8BFB\u7684\u65B9\u5F0F\u6392\u7248\uFF0C\u8BA9\u4F60\u7231\u4E0A\u5728 PC \u9605\u8BFB\u6587\u7AE0',
	                                React.createElement('br', null),
	                                '\u8BE6\u7EC6\u8BF4\u660E\u8BF7\u770B ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE' },
	                                    '\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE'
	                                )
	                            )
	                        )
	                    ),
	                    !first && version == "1.1.3" && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.3' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-newservice.png?201906301335', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u5BFC\u51FA\u670D\u52A1\u53C8\u6DFB\u65B0\u6210\u5458\uFF0C\u66F4\u652F\u6301 WebDAV'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u671F\u5F85\u5DF2\u4E45\u7684 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u5BFC\u51FA\u5230\u751F\u4EA7\u529B\u5DE5\u5177' },
	                                    '\u8BED\u96C0'
	                                ),
	                                ' \u548C ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u575A\u679C\u4E91' },
	                                    '\u575A\u679C\u4E91'
	                                ),
	                                ' \u73B0\u5DF2\u52A0\u5165 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u5BFC\u51FA\u5230\u751F\u4EA7\u529B\u5DE5\u5177' },
	                                    '\u5BFC\u51FA\u670D\u52A1'
	                                ),
	                                ' \u8C6A\u534E\u5927\u793C\u5305',
	                                React.createElement('br', null),
	                                '\u914D\u7F6E\u6587\u4EF6\u7684\u540C\u6B65\u4E5F\u53EF\u4F7F\u7528 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u540C\u6B65' },
	                                    '\u575A\u679C\u4E91'
	                                ),
	                                ' \u4E86',
	                                React.createElement('br', null),
	                                '\u4E0D\u4EC5\u5982\u6B64\uFF0C\u53EA\u8981\u662F\u652F\u6301 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/WebDAV' },
	                                    'WebDAV'
	                                ),
	                                ' \u7684\u670D\u52A1\u5747\u53EF\u4F7F\u7528\u7B80\u60A6\u7684\u5BFC\u51FA\u529F\u80FD'
	                            )
	                        )
	                    ),
	                    !first && version == "1.1.4" && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.4' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-newservice-ii.png?202001181335', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u66F4\u5F3A\u5927\uFF0C\u66F4\u6613\u7528\u7684\u5BFC\u51FA\u670D\u52A1'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u671F\u5F85\u5DF2\u4E45\u7684 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/Notion' },
	                                    'Notion'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u6709\u9053\u4E91\u7B14\u8BB0' },
	                                    '\u6709\u9053\u4E91\u7B14\u8BB0'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u4E3A\u77E5\u7B14\u8BB0' },
	                                    '\u4E3A\u77E5\u7B14\u8BB0'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/URLSCHEME' },
	                                    'Bear'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/URLSCHEME' },
	                                    'Ulysses'
	                                ),
	                                ' \u6765\u5566~',
	                                React.createElement('br', null),
	                                '\u539F\u751F\u7684 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u79BB\u7EBFHTML' },
	                                    '\u79BB\u7EBF HTML / Markdown'
	                                ),
	                                ' \u4E0B\u8F7D\u529F\u80FD\uFF0C\u8FD8\u6709\u622A\u53D6\u4EFB\u610F\u4F4D\u7F6E\u7684 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u622A\u56FE' },
	                                    '\u622A\u56FE'
	                                ),
	                                ' \u529F\u80FD',
	                                React.createElement('br', null),
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/WebDAV?id=\u5B9A\u5236' },
	                                    'WebDAV'
	                                ),
	                                ' \u73B0\u5DF2\u5B9A\u5236\u5BFC\u51FA\u683C\u5F0F\uFF0C\u5305\u62EC\uFF1A ',
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'Markdown'
	                                ),
	                                ' \xB7 ',
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'HTML'
	                                )
	                            )
	                        )
	                    ),
	                    (!first && version == "1.1.3" || version == "all") && React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: '1.1.3' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: 'http://sr.ksria.cn/welcome-notice.png?20190630', style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u6D88\u606F\u4E2D\u5FC3 \xB7 \u5E2E\u52A9\u4E2D\u5FC3 \xB7 \u65B0\u624B\u5165\u95E8'
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: style.desc },
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u6D88\u606F\u4E2D\u5FC3' },
	                                    '\u6D88\u606F\u4E2D\u5FC3'
	                                ),
	                                ' \u8BA9\u6C9F\u901A\u66F4\u52A0\u4FBF\u5229',
	                                React.createElement('br', null),
	                                '\u5185\u7F6E\u5E38\u7528\u7684\u6587\u6863\u8BF4\u660E\u3001\u5E38\u89C1\u95EE\u9898\u3001\u53CA\u9009\u9879\u9875\u5168\u90E8\u529F\u80FD\u8BF4\u660E\u7684 ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u5E2E\u52A9\u4E2D\u5FC3' },
	                                    '\u5E2E\u52A9\u4E2D\u5FC3'
	                                ),
	                                React.createElement('br', null),
	                                '\u529F\u80FD\u592A\u591A\uFF0C\u65E0\u4ECE\u4E0B\u624B\uFF1F',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/guide' },
	                                    '\u65B0\u624B\u5165\u95E8'
	                                ),
	                                ' \u4E0D\u518D\u8BA9\u65B0\u624B\u671B\u800C\u5374\u6B65'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'carousel-item', id: 'end' },
	                        React.createElement(
	                            'section',
	                            { style: style.section },
	                            React.createElement('img', { src: ss.IconPath("welcome-others"), style: style.img }),
	                            React.createElement(
	                                'h2',
	                                { style: style.h2 },
	                                '\u66F4\u591A\u529F\u80FD \u7B49\u4F60\u53D1\u73B0\uFF01'
	                            ),
	                            !first && version == "5005" && React.createElement(
	                                'div',
	                                { style: style.desc },
	                                '\u5206\u4EAB\u5361\uFF0C\u53F3\u952E\u83DC\u5355\u6DFB\u52A0 \u300C\u767D\u540D\u5355 / \u6392\u9664\u5217\u8868 / \u9ED1\u540D\u5355\u300D\u7B49',
	                                React.createElement('br', null),
	                                '\u8BE6\u7EC6\u8BF4\u660E\u8BF7\u770B ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/welcome/version_1.1.2.5005.html' },
	                                    '\u66F4\u65B0\u65E5\u5FD7'
	                                )
	                            ),
	                            !first && version == "1.1.3" && React.createElement(
	                                'div',
	                                { style: style.desc },
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE?id=\u9884\u52A0\u8F7D\u673A\u5236' },
	                                    '\u9884\u52A0\u8F7D'
	                                ),
	                                ' ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE?id=\u5EF6\u8FDF\u52A0\u8F7D' },
	                                    '\u5EF6\u8FDF\u52A0\u8F7D'
	                                ),
	                                ' ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u8BCD\u6CD5\u5206\u6790\u5F15\u64CE?id=\u667A\u80FD\u611F\u77E5' },
	                                    '\u667A\u80FD\u611F\u77E5'
	                                ),
	                                ' \u4E0E ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/docs/#/\u624B\u52A8\u6846\u9009?id=\u4E8C\u6B21\u786E\u8BA4' },
	                                    '\u66F4\u4FBF\u6377\u7684\u624B\u52A8\u6846\u9009'
	                                ),
	                                ' \u7B49\u8BF8\u591A\u65B0\u529F\u80FD',
	                                React.createElement('br', null),
	                                '\u8BE6\u7EC6\u8BF4\u660E\u8BF7\u770B ',
	                                React.createElement(
	                                    'a',
	                                    { target: '_blank', href: 'http://ksria.com/simpread/welcome/version_1.1.3.html' },
	                                    '\u66F4\u65B0\u65E5\u5FD7'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'footer',
	                    { style: style.footer },
	                    React.createElement(_button2.default, { style: this.state.style,
	                        shape: 'circle', width: '40px',
	                        color: '#fff', backgroundColor: '#C8E6C9',
	                        icon: ss.IconPath("prev_icon"),
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this4.prevClick();
	                        } }),
	                    React.createElement(_button2.default, {
	                        shape: 'circle', width: '40px',
	                        color: '#fff', backgroundColor: '#4CAF50',
	                        icon: ss.IconPath(this.state.state),
	                        waves: 'md-waves-effect md-waves-button',
	                        onClick: function onClick() {
	                            return _this4.nextClick();
	                        } })
	                ),
	                React.createElement(
	                    'div',
	                    { style: style.close },
	                    React.createElement(_button2.default, {
	                        shape: 'circle', width: '36px',
	                        color: '#fff', backgroundColor: 'transparent', hoverColor: 'transparent',
	                        icon: ss.IconPath("close_icon"),
	                        onClick: function onClick() {
	                            return _this4.closeClick();
	                        } })
	                )
	            );
	        }
	    }]);
	
	    return Welcome;
	}(React.Component);
	
	/**
	 * Exit
	 */
	
	
	function exit() {
	    $(welcbgclsjq).velocity({ opacity: 0 }, { complete: function complete() {
	            ReactDOM.unmountComponentAtNode($(welcbgclsjq)[0]);
	        } });
	}
	
	/**
	 * Welcome Render
	 * 
	 * @param {string} root name
	 * @param {boolean} true: first load
	 * @param {string} version
	 */
	function Render(root, first, version) {
	    var $root = $(root);
	    if ($root.find("." + welcbgcls).length == 0) {
	        $root.append(welcbg);
	    }
	    ReactDOM.render(React.createElement(Welcome, { first: first, version: version }), $(welcbgclsjq)[0]);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(514)))

/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(881);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./carousel.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./carousel.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n * Carousel\n * http://materializecss.com/carousel.html\n * \n * https://github.com/Dogfalo/materialize/blob/master/LICENSE\n */\n\n.carousel {\n    position: relative;\n\n    width: 100%;\n    height: 400px;\n    perspective: 500px;\n    transform-style: preserve-3d;\n    transform-origin: 0% 50%;\n\n    overflow: hidden;\n}\n\n.carousel.carousel-slider {\n    top: 0;\n    left: 0;\n\n    height: 100%\n}\n\n.carousel.carousel-slider .carousel-item {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n    min-height: 400px;\n}\n\n.carousel .carousel-item {\n    display: none;\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 200px;\n    height: 200px;\n}\n\n.carousel .carousel-item>img {\n    width: 100%\n}\n\n.carousel .indicators {\n    position: absolute;\n\n    margin: 0;\n    padding: 0;\n\n    left: 0;\n    right: 0;\n    bottom: 0;\n\n    text-align: center;\n}\n\n.carousel .indicators .indicator-item {\n    display: inline-block;\n    position: relative;\n\n    margin: 14px 4px;\n\n    height: 10px;\n    width: 10px;\n\n    background-color: #E0E0E0;\n\n    transition: background-color .3s;\n    border-radius: 50%;\n\n    cursor: pointer;\n}\n\n.carousel .indicators .indicator-item.active {\n    background-color: #4CAF50\n}\n\n.carousel.scrolling .carousel-item .materialboxed,.carousel .carousel-item:not(.active) .materialboxed {\n    pointer-events: none\n}\n", ""]);
	
	// exports


/***/ }),

/***/ 882:
/***/ (function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*
	 * Carousel
	 * http://materializecss.com/carousel.html
	 * 
	 * https://github.com/Dogfalo/materialize/blob/master/LICENSE
	 */
	
	(function ($) {
	
	  var methods = {
	
	    init: function init(options) {
	      var defaults = {
	        duration: 200, // ms
	        dist: -100, // zoom scale TODO: make this more intuitive as an option
	        shift: 0, // spacing for center image
	        padding: 0, // Padding between non center items
	        fullWidth: false, // Change to full width styles
	        indicators: false, // Toggle indicators
	        noWrap: false, // Don't wrap around and cycle through items.
	        onCycleTo: null, // Callback for when a new slide is cycled to.
	        onActived: null // Callback for when a new slide actived.
	      };
	
	      options = $.extend(defaults, options);
	
	      return this.each(function (i) {
	
	        var images, item_width, item_height, offset, center, pressed, dim, count, reference, referenceY, amplitude, target, velocity, scrolling, xform, frame, timestamp, ticker, dragged, vertical_dragged;
	        var $indicators = $('<ul class="indicators"></ul>');
	        var scrollingTimeout = null;
	        var tweenedOpacity, zTranslation;
	
	        // Initialize
	        var view = $(this);
	        var showIndicators = view.attr('data-indicators') || options.indicators;
	
	        // Options
	        var setCarouselHeight = function setCarouselHeight() {
	          var firstImage = view.find('.carousel-item img').first();
	          if (firstImage.length) {
	            if (firstImage.prop('complete')) {
	              view.css('height', firstImage.height());
	            } else {
	              firstImage.on('load', function () {
	                view.css('height', $(this).height());
	              });
	            }
	          } else {
	            var imageHeight = view.find('.carousel-item').first().height();
	            view.css('height', imageHeight);
	          }
	        };
	
	        if (options.fullWidth) {
	          options.dist = 0;
	          //setCarouselHeight();
	
	          // Offset fixed items when indicators.
	          if (showIndicators) {
	            view.find('.carousel-fixed-item').addClass('with-indicators');
	          }
	        }
	
	        // Don't double initialize.
	        if (view.hasClass('initialized')) {
	          // Recalculate variables
	          $(window).trigger('resize');
	
	          // Redraw carousel.
	          $(this).trigger('carouselNext', [0.000001]);
	          return true;
	        }
	
	        view.addClass('initialized');
	        pressed = false;
	        offset = target = 0;
	        images = [];
	        item_width = view.find('.carousel-item').first().innerWidth();
	        item_height = view.find('.carousel-item').first().innerHeight();
	        dim = item_width * 2 + options.padding;
	
	        view.find('.carousel-item').each(function (i) {
	          images.push($(this)[0]);
	          if (showIndicators) {
	            var $indicator = $('<li class="indicator-item"></li>');
	
	            // Add active to first by default.
	            if (i === 0) {
	              $indicator.addClass('active');
	            }
	
	            // Handle clicks on indicators.
	            $indicator.click(function (e) {
	              e.stopPropagation();
	
	              var index = $(this).index();
	              cycleTo(index);
	            });
	            $indicators.append($indicator);
	          }
	        });
	
	        if (showIndicators) {
	          view.append($indicators);
	        }
	        count = images.length;
	
	        function setupEvents() {
	          if (typeof window.ontouchstart !== 'undefined') {
	            view[0].addEventListener('touchstart', tap);
	            view[0].addEventListener('touchmove', drag);
	            view[0].addEventListener('touchend', release);
	          }
	          view[0].addEventListener('mousedown', tap);
	          view[0].addEventListener('mousemove', drag);
	          view[0].addEventListener('mouseup', release);
	          view[0].addEventListener('mouseleave', release);
	          view[0].addEventListener('click', click);
	        }
	
	        function xpos(e) {
	          // touch event
	          if (e.targetTouches && e.targetTouches.length >= 1) {
	            return e.targetTouches[0].clientX;
	          }
	
	          // mouse event
	          return e.clientX;
	        }
	
	        function ypos(e) {
	          // touch event
	          if (e.targetTouches && e.targetTouches.length >= 1) {
	            return e.targetTouches[0].clientY;
	          }
	
	          // mouse event
	          return e.clientY;
	        }
	
	        function wrap(x) {
	          return x >= count ? x % count : x < 0 ? wrap(count + x % count) : x;
	        }
	
	        function scroll(x) {
	          // Track scrolling state
	          scrolling = true;
	          if (!view.hasClass('scrolling')) {
	            view.addClass('scrolling');
	          }
	          if (scrollingTimeout != null) {
	            window.clearTimeout(scrollingTimeout);
	          }
	          scrollingTimeout = window.setTimeout(function () {
	            scrolling = false;
	            view.removeClass('scrolling');
	            var $curr_item = view.find('.carousel-item').eq(wrap(center));
	            scrollingTimeout != 1 && options.onActived && options.onActived.call(this, $(".carousel .indicators").find(".active").index());
	          }, options.duration);
	
	          // Start actual scroll
	          var i, half, delta, dir, tween, el, alignment, xTranslation;
	          var lastCenter = center;
	
	          offset = typeof x === 'number' ? x : offset;
	          center = Math.floor((offset + dim / 2) / dim);
	          delta = offset - center * dim;
	          dir = delta < 0 ? 1 : -1;
	          tween = -dir * delta * 2 / dim;
	          half = count >> 1;
	
	          if (!options.fullWidth) {
	            alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
	            alignment += 'translateY(' + (view[0].clientHeight - item_height) / 2 + 'px)';
	          } else {
	            alignment = 'translateX(0)';
	          }
	
	          // Set indicator active
	          if (showIndicators) {
	            var diff = center % count;
	            var activeIndicator = $indicators.find('.indicator-item.active');
	            if (activeIndicator.index() !== diff) {
	              activeIndicator.removeClass('active');
	              $indicators.find('.indicator-item').eq(diff).addClass('active');
	            }
	          }
	
	          // center
	          // Don't show wrapped items.
	          if (!options.noWrap || center >= 0 && center < count) {
	            el = images[wrap(center)];
	
	            // Add active class to center item.
	            if (!$(el).hasClass('active')) {
	              view.find('.carousel-item').removeClass('active');
	              $(el).addClass('active');
	            }
	            el.style[xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * options.shift * tween * i + 'px)' + ' translateZ(' + options.dist * tween + 'px)';
	            el.style.zIndex = 0;
	            if (options.fullWidth) {
	              tweenedOpacity = 1;
	            } else {
	              tweenedOpacity = 1 - 0.2 * tween;
	            }
	            el.style.opacity = tweenedOpacity;
	            el.style.display = 'block';
	          }
	
	          for (i = 1; i <= half; ++i) {
	            // right side
	            if (options.fullWidth) {
	              zTranslation = options.dist;
	              tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
	            } else {
	              zTranslation = options.dist * (i * 2 + tween * dir);
	              tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
	            }
	            // Don't show wrapped items.
	            if (!options.noWrap || center + i < count) {
	              el = images[wrap(center + i)];
	              el.style[xform] = alignment + ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
	              el.style.zIndex = -i;
	              el.style.opacity = tweenedOpacity;
	              el.style.display = 'block';
	            }
	
	            // left side
	            if (options.fullWidth) {
	              zTranslation = options.dist;
	              tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
	            } else {
	              zTranslation = options.dist * (i * 2 - tween * dir);
	              tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
	            }
	            // Don't show wrapped items.
	            if (!options.noWrap || center - i >= 0) {
	              el = images[wrap(center - i)];
	              el.style[xform] = alignment + ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
	              el.style.zIndex = -i;
	              el.style.opacity = tweenedOpacity;
	              el.style.display = 'block';
	            }
	          }
	
	          // center
	          // Don't show wrapped items.
	          if (!options.noWrap || center >= 0 && center < count) {
	            el = images[wrap(center)];
	            el.style[xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * options.shift * tween + 'px)' + ' translateZ(' + options.dist * tween + 'px)';
	            el.style.zIndex = 0;
	            if (options.fullWidth) {
	              tweenedOpacity = 1;
	            } else {
	              tweenedOpacity = 1 - 0.2 * tween;
	            }
	            el.style.opacity = tweenedOpacity;
	            el.style.display = 'block';
	          }
	
	          // onCycleTo callback
	          if (lastCenter !== center && typeof options.onCycleTo === "function") {
	            var $curr_item = view.find('.carousel-item').eq(wrap(center));
	            options.onCycleTo.call(this, $(".carousel .indicators").find(".active").index(), $curr_item, dragged);
	          }
	        }
	
	        function track() {
	          var now, elapsed, delta, v;
	
	          now = Date.now();
	          elapsed = now - timestamp;
	          timestamp = now;
	          delta = offset - frame;
	          frame = offset;
	
	          v = 1000 * delta / (1 + elapsed);
	          velocity = 0.8 * v + 0.2 * velocity;
	        }
	
	        function autoScroll() {
	          var elapsed, delta;
	
	          if (amplitude) {
	            elapsed = Date.now() - timestamp;
	            delta = amplitude * Math.exp(-elapsed / options.duration);
	            if (delta > 2 || delta < -2) {
	              scroll(target - delta);
	              requestAnimationFrame(autoScroll);
	            } else {
	              scroll(target);
	            }
	          }
	        }
	
	        function click(e) {
	          // Disable clicks if carousel was dragged.
	          if (dragged) {
	            e.preventDefault();
	            e.stopPropagation();
	            return false;
	          } else if (!options.fullWidth) {
	            var clickedIndex = $(e.target).closest('.carousel-item').index();
	            var diff = center % count - clickedIndex;
	
	            // Disable clicks if carousel was shifted by click
	            if (diff !== 0) {
	              e.preventDefault();
	              e.stopPropagation();
	            }
	            cycleTo(clickedIndex);
	          }
	        }
	
	        function cycleTo(n) {
	          var diff = center % count - n;
	
	          // Account for wraparound.
	          if (!options.noWrap) {
	            if (diff < 0) {
	              if (Math.abs(diff + count) < Math.abs(diff)) {
	                diff += count;
	              }
	            } else if (diff > 0) {
	              if (Math.abs(diff - count) < diff) {
	                diff -= count;
	              }
	            }
	          }
	
	          // Call prev or next accordingly.
	          if (diff < 0) {
	            view.trigger('carouselNext', [Math.abs(diff)]);
	          } else if (diff > 0) {
	            view.trigger('carouselPrev', [diff]);
	          }
	        }
	
	        function tap(e) {
	          e.preventDefault();
	          pressed = true;
	          dragged = false;
	          vertical_dragged = false;
	          reference = xpos(e);
	          referenceY = ypos(e);
	
	          velocity = amplitude = 0;
	          frame = offset;
	          timestamp = Date.now();
	          clearInterval(ticker);
	          ticker = setInterval(track, 100);
	        }
	
	        function drag(e) {
	          var x, y, delta, deltaY;
	          if (pressed) {
	            x = xpos(e);
	            y = ypos(e);
	            delta = reference - x;
	            deltaY = Math.abs(referenceY - y);
	            if (deltaY < 30 && !vertical_dragged) {
	              // If vertical scrolling don't allow dragging.
	              if (delta > 2 || delta < -2) {
	                dragged = true;
	                reference = x;
	                scroll(offset + delta);
	              }
	            } else if (dragged) {
	              // If dragging don't allow vertical scroll.
	              e.preventDefault();
	              e.stopPropagation();
	              return false;
	            } else {
	              // Vertical scrolling.
	              vertical_dragged = true;
	            }
	          }
	
	          if (dragged) {
	            // If dragging don't allow vertical scroll.
	            e.preventDefault();
	            e.stopPropagation();
	            return false;
	          }
	        }
	
	        function release(e) {
	          if (pressed) {
	            pressed = false;
	          } else {
	            return;
	          }
	
	          clearInterval(ticker);
	          target = offset;
	          if (velocity > 10 || velocity < -10) {
	            amplitude = 0.9 * velocity;
	            target = offset + amplitude;
	          }
	          target = Math.round(target / dim) * dim;
	
	          // No wrap of items.
	          if (options.noWrap) {
	            if (target >= dim * (count - 1)) {
	              target = dim * (count - 1);
	            } else if (target < 0) {
	              target = 0;
	            }
	          }
	          amplitude = target - offset;
	          timestamp = Date.now();
	          requestAnimationFrame(autoScroll);
	
	          if (dragged) {
	            e.preventDefault();
	            e.stopPropagation();
	          }
	          return false;
	        }
	
	        xform = 'transform';
	        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
	          var e = prefix + 'Transform';
	          if (typeof document.body.style[e] !== 'undefined') {
	            xform = e;
	            return false;
	          }
	          return true;
	        });
	
	        setupEvents();
	        scroll(offset);
	
	        $(this).on('carouselNext', function (e, n) {
	          if (n === undefined) {
	            n = 1;
	          }
	          target = dim * Math.round(offset / dim) + dim * n;
	          if (offset !== target) {
	            amplitude = target - offset;
	            timestamp = Date.now();
	            requestAnimationFrame(autoScroll);
	          }
	        });
	
	        $(this).on('carouselPrev', function (e, n) {
	          if (n === undefined) {
	            n = 1;
	          }
	          target = dim * Math.round(offset / dim) - dim * n;
	          if (offset !== target) {
	            amplitude = target - offset;
	            timestamp = Date.now();
	            requestAnimationFrame(autoScroll);
	          }
	        });
	
	        $(this).on('carouselSet', function (e, n) {
	          if (n === undefined) {
	            n = 0;
	          }
	          cycleTo(n);
	        });
	      });
	    },
	
	    next: function next(n) {
	      $(this).trigger('carouselNext', [n]);
	    },
	
	    prev: function prev(n) {
	      $(this).trigger('carouselPrev', [n]);
	    },
	
	    set: function set(n) {
	      $(this).trigger('carouselSet', [n]);
	    }
	
	  };
	
	  $.fn.carousel = function (methodOrOptions) {
	    if (methods[methodOrOptions]) {
	      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if ((typeof methodOrOptions === 'undefined' ? 'undefined' : _typeof(methodOrOptions)) === 'object' || !methodOrOptions) {
	      // Default to "init"
	      return methods.init.apply(this, arguments);
	    } else {
	      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.carousel');
	    }
	  };
	})(jQuery);

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Notify) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Start = exports.Guide = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _intro = __webpack_require__(884);
	
	var _intro2 = _interopRequireDefault(_intro);
	
	var _browser = __webpack_require__(334);
	
	var _message = __webpack_require__(337);
	
	var msg = _interopRequireWildcard(_message);
	
	var _storage = __webpack_require__(2);
	
	var _version = __webpack_require__(335);
	
	var ver = _interopRequireWildcard(_version);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option guide load =====");
	
	var Guide = function (_React$Component) {
	    _inherits(Guide, _React$Component);
	
	    function Guide() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Guide);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Guide.__proto__ || Object.getPrototypeOf(Guide)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            tips: []
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Guide, [{
	        key: 'onClick',
	        value: function onClick(event, idx, url, detail) {
	            if (url.startsWith("http")) {
	                _browser.browser.runtime.sendMessage(msg.Add(msg.MESSAGE_ACTION.new_tab, { url: url }));
	            } else if (url.startsWith("@")) {
	                start(url);
	                this.props.onExit && this.props.onExit();
	            } else if (url.startsWith("!!")) {
	                start(url, true, detail);
	                this.props.onExit && this.props.onExit();
	            } else if (idx == 2) {
	                start(_storage.storage.version);
	                this.props.onExit && this.props.onExit();
	            } else {
	                var id = location.hash == "" ? "common" : location.hash.replace("#", "");
	                if (id == "account" || id == "about") {
	                    new Notify().Render("此页面没有功能描述。");
	                } else {
	                    start(id, false);
	                    this.props.onExit && this.props.onExit();
	                }
	            }
	        }
	    }, {
	        key: 'onLoadingClick',
	        value: function onLoadingClick() {
	            var _this2 = this;
	
	            $(".guide .loading").html('<svg width="20" height="20" viewBox="0 0 38 38" stroke="#26d07c"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/> </path> </g> </g></svg>');
	            var ajax = function ajax() {
	                $.ajax({
	                    url: _storage.storage.help_service + "?=" + Math.round(+new Date()),
	                    method: "GET"
	                }).done(function (result, textStatus, jqXHR) {
	                    if (result && result.tips.length == 0) {
	                        $(".guide .loading").html('<span>没有新的消息</span>').css({ "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popup" });
	                    } else {
	                        $(".guide").find("hr").remove();
	                        _this2.setState({ tips: _this2.state.tips.concat(result.tips) });
	                        $(".guide .loading").remove();
	                    }
	                }).fail(function (error) {
	                    $(".guide .loading").html('<i class="fas fa-bug" style="color:#FF5252;"></i><span style="color:#FF5252;">\u53D1\u751F\u4E86\u4E00\u4E9B\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002</span>');
	                });
	            };
	            setTimeout(ajax, 1000);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _this3 = this;
	
	            _storage.storage.GetRemote("help_tips", function (result, error) {
	                result && result.tips && _this3.setState({ tips: result.tips });
	            });
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            $("guid-card[id='3']").after("<hr>");
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            $(".guide").scroll(function (event) {
	                if ($(event.target).scrollTop() > 35) {
	                    $(".guide .title").css({ "box-shadow": "2px 4px 10px rgba(0,0,0,.2)" }).find("span").text("帮助中心 > 快捷答案").css({ "font-weight": "normal", "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popup" });
	                } else {
	                    $(".guide .title").removeAttr("style").find("span").text("帮助中心").removeAttr("style");
	                }
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;
	
	            var tips = this.state.tips.map(function (item) {
	                return React.createElement(
	                    'guid-card',
	                    { id: item.idx, 'class': 'md-waves-effect', onClick: function onClick(e) {
	                            return _this4.onClick(e, item.idx, item.url, item.detail);
	                        } },
	                    React.createElement(
	                        'guid-card-tips',
	                        null,
	                        React.createElement('span', { dangerouslySetInnerHTML: { __html: item.icon } }),
	                        React.createElement(
	                            'span',
	                            null,
	                            item.name
	                        )
	                    )
	                );
	            });
	            return React.createElement(
	                'div',
	                { className: 'guide' },
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u5E2E\u52A9\u4E2D\u5FC3'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'subtitle' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u5FEB\u6377\u7B54\u6848'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'group' },
	                    tips
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'loading', onClick: function onClick() {
	                            return _this4.onLoadingClick();
	                        } },
	                    React.createElement(
	                        'span',
	                        { className: 'md-waves-effect' },
	                        '\u52A0\u8F7D\u66F4\u591A'
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Guide;
	}(React.Component);
	
	/**
	 * Show current version intro
	 * 
	 * @param {string}  id     include: version id | hash id, e,g. 1.1.3, common, simple
	 * @param {boolean} verify current url and intros.start()
	 * @param {boolean} detail @see ver.tips data structure
	 */
	
	
	Guide.defaultProps = {
	    tips: []
	};
	Guide.propsType = {
	    tips: React.PropTypes.array
	};
	function start(id) {
	    var verify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	    var _ref2 = [detail.idx, detail.target, detail.steps],
	        rm_idx = _ref2[0],
	        rm_target = _ref2[1],
	        rm_steps = _ref2[2],
	        target = rm_target ? rm_target : ver.tips[id].target,
	        idx = rm_idx ? rm_idx : ver.tips[id].idx,
	        steps = function () {
	        var items = rm_steps ? rm_steps : ver.tips[id].items;
	        return items.map(function (item) {
	            return { element: $(ver.tips.root(item.id))[0], intro: item.intro };
	        });
	    }(),
	        intros = (0, _intro2.default)(),
	        start = function start() {
	        intros.setOptions({
	            hintButtonLabel: "确认",
	            nextLabel: "下一条 →",
	            prevLabel: "← 上一条",
	            skipLabel: "",
	            doneLabel: "完成",
	            hidePrev: true,
	            hideNext: true,
	            steps: steps
	        });
	        intros.start();
	    };
	
	    if (verify && location.hash != '#' + target) {
	        location.href = location.origin + "/options/options.html#labs";
	        window.dispatchEvent(new CustomEvent(msg.MESSAGE_ACTION.turn_tab, { detail: { page: idx } }));
	        setTimeout(start, 500);
	    } else {
	        start();
	    }
	}
	
	exports.Guide = Guide;
	exports.Start = start;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(336)))

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	!function (t) {
	  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t(), module.exports.introJs = function () {
	    return console.warn('Deprecated: please use require("intro.js") directly, instead of the introJs method of the function'), t().apply(this, arguments);
	  };else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
	    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).introJs = t();
	  }
	}(function () {
	  function n(t) {
	    this._targetElement = t, this._introItems = [], this._options = { nextLabel: "Next &rarr;", prevLabel: "&larr; Back", skipLabel: "Skip", doneLabel: "Done", hidePrev: !1, hideNext: !1, tooltipPosition: "bottom", tooltipClass: "", highlightClass: "", exitOnEsc: !0, exitOnOverlayClick: !0, showStepNumbers: !0, keyboardNavigation: !0, showButtons: !0, showBullets: !0, showProgress: !1, scrollToElement: !0, scrollTo: "element", scrollPadding: 30, overlayOpacity: .8, positionPrecedence: ["bottom", "top", "right", "left"], disableInteraction: !1, helperElementPadding: 10, hintPosition: "top-middle", hintButtonLabel: "Got it", hintAnimation: !0, buttonClass: "introjs-button" };
	  }function e(t, i) {
	    var e = t.querySelectorAll("*[data-intro]"),
	        n = [];if (this._options.steps) B(this._options.steps, function (t) {
	      var e = h(t);if (e.step = n.length + 1, "string" == typeof e.element && (e.element = document.querySelector(e.element)), void 0 === e.element || null === e.element) {
	        var i = document.querySelector(".introjsFloatingElement");null === i && ((i = document.createElement("div")).className = "introjsFloatingElement", document.body.appendChild(i)), e.element = i, e.position = "floating";
	      }e.scrollTo = e.scrollTo || this._options.scrollTo, void 0 === e.disableInteraction && (e.disableInteraction = this._options.disableInteraction), null !== e.element && n.push(e);
	    }.bind(this));else {
	      var o;if (e.length < 1) return !1;B(e, function (t) {
	        if ((!i || t.getAttribute("data-intro-group") === i) && "none" !== t.style.display) {
	          var e = parseInt(t.getAttribute("data-step"), 10);o = void 0 !== t.getAttribute("data-disable-interaction") ? !!t.getAttribute("data-disable-interaction") : this._options.disableInteraction, 0 < e && (n[e - 1] = { element: t, intro: t.getAttribute("data-intro"), step: parseInt(t.getAttribute("data-step"), 10), tooltipClass: t.getAttribute("data-tooltipclass"), highlightClass: t.getAttribute("data-highlightclass"), position: t.getAttribute("data-position") || this._options.tooltipPosition, scrollTo: t.getAttribute("data-scrollto") || this._options.scrollTo, disableInteraction: o });
	        }
	      }.bind(this));var s = 0;B(e, function (t) {
	        if ((!i || t.getAttribute("data-intro-group") === i) && null === t.getAttribute("data-step")) {
	          for (; void 0 !== n[s];) {
	            s++;
	          }o = void 0 !== t.getAttribute("data-disable-interaction") ? !!t.getAttribute("data-disable-interaction") : this._options.disableInteraction, n[s] = { element: t, intro: t.getAttribute("data-intro"), step: s + 1, tooltipClass: t.getAttribute("data-tooltipclass"), highlightClass: t.getAttribute("data-highlightclass"), position: t.getAttribute("data-position") || this._options.tooltipPosition, scrollTo: t.getAttribute("data-scrollto") || this._options.scrollTo, disableInteraction: o };
	        }
	      }.bind(this));
	    }for (var l = [], r = 0; r < n.length; r++) {
	      n[r] && l.push(n[r]);
	    }return (n = l).sort(function (t, e) {
	      return t.step - e.step;
	    }), this._introItems = n, function (t) {
	      var e = document.createElement("div"),
	          i = "",
	          n = this;if (e.className = "introjs-overlay", t.tagName && "body" !== t.tagName.toLowerCase()) {
	        var o = k(t);o && (i += "width: " + o.width + "px; height:" + o.height + "px; top:" + o.top + "px;left: " + o.left + "px;", e.style.cssText = i);
	      } else i += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;", e.style.cssText = i;return t.appendChild(e), e.onclick = function () {
	        !0 === n._options.exitOnOverlayClick && A.call(n, t);
	      }, window.setTimeout(function () {
	        i += "opacity: " + n._options.overlayOpacity.toString() + ";", e.style.cssText = i;
	      }, 10), !0;
	    }.call(this, t) && (E.call(this), this._options.keyboardNavigation && u.on(window, "keydown", c, this, !0), u.on(window, "resize", a, this, !0)), !1;
	  }function a() {
	    this.refresh.call(this);
	  }function c(t) {
	    var e = null === t.code ? t.which : t.code;if (null === e && (e = null === t.charCode ? t.keyCode : t.charCode), "Escape" !== e && 27 !== e || !0 !== this._options.exitOnEsc) {
	      if ("ArrowLeft" === e || 37 === e) N.call(this);else if ("ArrowRight" === e || 39 === e) E.call(this);else if ("Enter" === e || 13 === e) {
	        var i = t.target || t.srcElement;i && i.className.match("introjs-prevbutton") ? N.call(this) : i && i.className.match("introjs-skipbutton") ? (this._introItems.length - 1 === this._currentStep && "function" == typeof this._introCompleteCallback && this._introCompleteCallback.call(this), A.call(this, this._targetElement)) : i && i.getAttribute("data-stepnumber") ? i.click() : E.call(this), t.preventDefault ? t.preventDefault() : t.returnValue = !1;
	      }
	    } else A.call(this, this._targetElement);
	  }function h(t) {
	    if (null === t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) || void 0 !== t.nodeType) return t;var e = {};for (var i in t) {
	      void 0 !== window.jQuery && t[i] instanceof window.jQuery ? e[i] = t[i] : e[i] = h(t[i]);
	    }return e;
	  }function E() {
	    this._direction = "forward", void 0 !== this._currentStepNumber && B(this._introItems, function (t, e) {
	      t.step === this._currentStepNumber && (this._currentStep = e - 1, this._currentStepNumber = void 0);
	    }.bind(this)), void 0 === this._currentStep ? this._currentStep = 0 : ++this._currentStep;var t = this._introItems[this._currentStep],
	        e = !0;return void 0 !== this._introBeforeChangeCallback && (e = this._introBeforeChangeCallback.call(this, t.element)), !1 === e ? (--this._currentStep, !1) : this._introItems.length <= this._currentStep ? ("function" == typeof this._introCompleteCallback && this._introCompleteCallback.call(this), void A.call(this, this._targetElement)) : void i.call(this, t);
	  }function N() {
	    if (this._direction = "backward", 0 === this._currentStep) return !1;--this._currentStep;var t = this._introItems[this._currentStep],
	        e = !0;if (void 0 !== this._introBeforeChangeCallback && (e = this._introBeforeChangeCallback.call(this, t.element)), !1 === e) return ++this._currentStep, !1;i.call(this, t);
	  }function A(t, e) {
	    var i = !0;if (void 0 !== this._introBeforeExitCallback && (i = this._introBeforeExitCallback.call(this)), e || !1 !== i) {
	      var n = t.querySelectorAll(".introjs-overlay");n && n.length && B(n, function (t) {
	        t.style.opacity = 0, window.setTimeout(function () {
	          this.parentNode && this.parentNode.removeChild(this);
	        }.bind(t), 500);
	      }.bind(this));var o = t.querySelector(".introjs-helperLayer");o && o.parentNode.removeChild(o);var s = t.querySelector(".introjs-tooltipReferenceLayer");s && s.parentNode.removeChild(s);var l = t.querySelector(".introjs-disableInteraction");l && l.parentNode.removeChild(l);var r = document.querySelector(".introjsFloatingElement");r && r.parentNode.removeChild(r), q(), B(document.querySelectorAll(".introjs-fixParent"), function (t) {
	        O(t, /introjs-fixParent/g);
	      }), u.off(window, "keydown", c, this, !0), u.off(window, "resize", a, this, !0), void 0 !== this._introExitCallback && this._introExitCallback.call(this), this._currentStep = void 0;
	    }
	  }function L(t, e, i, n, o) {
	    var s,
	        l,
	        r,
	        a,
	        c,
	        h = "";if (o = o || !1, e.style.top = null, e.style.right = null, e.style.bottom = null, e.style.left = null, e.style.marginLeft = null, e.style.marginTop = null, i.style.display = "inherit", null != n && (n.style.top = null, n.style.left = null), this._introItems[this._currentStep]) switch (h = "string" == typeof (s = this._introItems[this._currentStep]).tooltipClass ? s.tooltipClass : this._options.tooltipClass, e.className = ("introjs-tooltip " + h).replace(/^\s+|\s+$/g, ""), e.setAttribute("role", "dialog"), "floating" !== (c = this._introItems[this._currentStep].position) && (c = function (t, e, i) {
	      var n = this._options.positionPrecedence.slice(),
	          o = b(),
	          s = k(e).height + 10,
	          l = k(e).width + 20,
	          r = t.getBoundingClientRect(),
	          a = "floating";r.bottom + s + s > o.height && m(n, "bottom");r.top - s < 0 && m(n, "top");r.right + l > o.width && m(n, "right");r.left - l < 0 && m(n, "left");var c = (h = i || "", u = h.indexOf("-"), -1 !== u ? h.substr(u) : "");var h, u;i && (i = i.split("-")[0]);n.length && (a = "auto" !== i && -1 < n.indexOf(i) ? i : n[0]);-1 !== ["top", "bottom"].indexOf(a) && (a += function (t, e, i, n) {
	        var o = e / 2,
	            s = Math.min(i.width, window.screen.width),
	            l = ["-left-aligned", "-middle-aligned", "-right-aligned"],
	            r = "";s - t < e && m(l, "-left-aligned");(t < o || s - t < o) && m(l, "-middle-aligned");t < e && m(l, "-right-aligned");r = l.length ? -1 !== l.indexOf(n) ? n : l[0] : "-middle-aligned";return r;
	      }(r.left, l, o, c));return a;
	    }.call(this, t, e, c)), r = k(t), l = k(e), a = b(), H(e, "introjs-" + c), c) {case "top-right-aligned":
	        i.className = "introjs-arrow bottom-right";var u = 0;f(r, u, l, e), e.style.bottom = r.height + 20 + "px";break;case "top-middle-aligned":
	        i.className = "introjs-arrow bottom-middle";var d = r.width / 2 - l.width / 2;o && (d += 5), f(r, d, l, e) && (e.style.right = null, p(r, d, l, a, e)), e.style.bottom = r.height + 20 + "px";break;case "top-left-aligned":case "top":
	        i.className = "introjs-arrow bottom", p(r, o ? 0 : 15, l, a, e), e.style.bottom = r.height + 20 + "px";break;case "right":
	        e.style.left = r.width + 20 + "px", r.top + l.height > a.height ? (i.className = "introjs-arrow left-bottom", e.style.top = "-" + (l.height - r.height - 20) + "px") : i.className = "introjs-arrow left";break;case "left":
	        o || !0 !== this._options.showStepNumbers || (e.style.top = "15px"), r.top + l.height > a.height ? (e.style.top = "-" + (l.height - r.height - 20) + "px", i.className = "introjs-arrow right-bottom") : i.className = "introjs-arrow right", e.style.right = r.width + 20 + "px";break;case "floating":
	        i.style.display = "none", e.style.left = "50%", e.style.top = "50%", e.style.marginLeft = "-" + l.width / 2 + "px", e.style.marginTop = "-" + l.height / 2 + "px", null != n && (n.style.left = "-" + (l.width / 2 + 18) + "px", n.style.top = "-" + (l.height / 2 + 18) + "px");break;case "bottom-right-aligned":
	        i.className = "introjs-arrow top-right", f(r, u = 0, l, e), e.style.top = r.height + 20 + "px";break;case "bottom-middle-aligned":
	        i.className = "introjs-arrow top-middle", d = r.width / 2 - l.width / 2, o && (d += 5), f(r, d, l, e) && (e.style.right = null, p(r, d, l, a, e)), e.style.top = r.height + 20 + "px";break;default:
	        i.className = "introjs-arrow top", p(r, 0, l, a, e), e.style.top = r.height + 20 + "px";}
	  }function p(t, e, i, n, o) {
	    return t.left + e + i.width > n.width ? (o.style.left = n.width - i.width - t.left + "px", !1) : (o.style.left = e + "px", !0);
	  }function f(t, e, i, n) {
	    return t.left + t.width - e - i.width < 0 ? (n.style.left = -t.left + "px", !1) : (n.style.right = e + "px", !0);
	  }function m(t, e) {
	    -1 < t.indexOf(e) && t.splice(t.indexOf(e), 1);
	  }function T(t) {
	    if (t) {
	      if (!this._introItems[this._currentStep]) return;var e = this._introItems[this._currentStep],
	          i = k(e.element),
	          n = this._options.helperElementPadding;d(e.element) ? H(t, "introjs-fixedTooltip") : O(t, "introjs-fixedTooltip"), "floating" === e.position && (n = 0), t.style.cssText = "width: " + (i.width + n) + "px; height:" + (i.height + n) + "px; top:" + (i.top - n / 2) + "px;left: " + (i.left - n / 2) + "px;";
	    }
	  }function I(t) {
	    t.setAttribute("role", "button"), t.tabIndex = 0;
	  }function i(o) {
	    void 0 !== this._introChangeCallback && this._introChangeCallback.call(this, o.element);var t,
	        e,
	        i,
	        n,
	        s = this,
	        l = document.querySelector(".introjs-helperLayer"),
	        r = document.querySelector(".introjs-tooltipReferenceLayer"),
	        a = "introjs-helperLayer";if ("string" == typeof o.highlightClass && (a += " " + o.highlightClass), "string" == typeof this._options.highlightClass && (a += " " + this._options.highlightClass), null !== l) {
	      var c = r.querySelector(".introjs-helperNumberLayer"),
	          h = r.querySelector(".introjs-tooltiptext"),
	          u = r.querySelector(".introjs-arrow"),
	          d = r.querySelector(".introjs-tooltip");if (i = r.querySelector(".introjs-skipbutton"), e = r.querySelector(".introjs-prevbutton"), t = r.querySelector(".introjs-nextbutton"), l.className = a, d.style.opacity = 0, d.style.display = "none", null !== c) {
	        var p = this._introItems[0 <= o.step - 2 ? o.step - 2 : 0];(null !== p && "forward" === this._direction && "floating" === p.position || "backward" === this._direction && "floating" === o.position) && (c.style.opacity = 0);
	      }(n = R(o.element)) !== document.body && V(n, o.element), T.call(s, l), T.call(s, r), B(document.querySelectorAll(".introjs-fixParent"), function (t) {
	        O(t, /introjs-fixParent/g);
	      }), q(), s._lastShowElementTimer && window.clearTimeout(s._lastShowElementTimer), s._lastShowElementTimer = window.setTimeout(function () {
	        null !== c && (c.innerHTML = o.step), h.innerHTML = o.intro, d.style.display = "block", L.call(s, o.element, d, u, c), s._options.showBullets && (r.querySelector(".introjs-bullets li > a.active").className = "", r.querySelector('.introjs-bullets li > a[data-stepnumber="' + o.step + '"]').className = "active"), r.querySelector(".introjs-progress .introjs-progressbar").style.cssText = "width:" + z.call(s) + "%;", r.querySelector(".introjs-progress .introjs-progressbar").setAttribute("aria-valuenow", z.call(s)), d.style.opacity = 1, c && (c.style.opacity = 1), null != i && /introjs-donebutton/gi.test(i.className) ? i.focus() : null != t && t.focus(), P.call(s, o.scrollTo, o, h);
	      }, 350);
	    } else {
	      var f = document.createElement("div"),
	          m = document.createElement("div"),
	          b = document.createElement("div"),
	          g = document.createElement("div"),
	          y = document.createElement("div"),
	          v = document.createElement("div"),
	          _ = document.createElement("div"),
	          w = document.createElement("div");f.className = a, m.className = "introjs-tooltipReferenceLayer", (n = R(o.element)) !== document.body && V(n, o.element), T.call(s, f), T.call(s, m), this._targetElement.appendChild(f), this._targetElement.appendChild(m), b.className = "introjs-arrow", y.className = "introjs-tooltiptext", y.innerHTML = o.intro, !(v.className = "introjs-bullets") === this._options.showBullets && (v.style.display = "none");var C = document.createElement("ul");C.setAttribute("role", "tablist");var j = function j() {
	        s.goToStep(this.getAttribute("data-stepnumber"));
	      };B(this._introItems, function (t, e) {
	        var i = document.createElement("li"),
	            n = document.createElement("a");i.setAttribute("role", "presentation"), n.setAttribute("role", "tab"), n.onclick = j, e === o.step - 1 && (n.className = "active"), I(n), n.innerHTML = "&nbsp;", n.setAttribute("data-stepnumber", t.step), i.appendChild(n), C.appendChild(i);
	      }), v.appendChild(C), !(_.className = "introjs-progress") === this._options.showProgress && (_.style.display = "none");var k = document.createElement("div");k.className = "introjs-progressbar", k.setAttribute("role", "progress"), k.setAttribute("aria-valuemin", 0), k.setAttribute("aria-valuemax", 100), k.setAttribute("aria-valuenow", z.call(this)), k.style.cssText = "width:" + z.call(this) + "%;", _.appendChild(k), !(w.className = "introjs-tooltipbuttons") === this._options.showButtons && (w.style.display = "none"), g.className = "introjs-tooltip", g.appendChild(y), g.appendChild(v), g.appendChild(_);var x = document.createElement("span");!0 === this._options.showStepNumbers && (x.className = "introjs-helperNumberLayer", x.innerHTML = o.step, m.appendChild(x)), g.appendChild(b), m.appendChild(g), (t = document.createElement("a")).onclick = function () {
	        s._introItems.length - 1 !== s._currentStep && E.call(s);
	      }, I(t), t.innerHTML = this._options.nextLabel, (e = document.createElement("a")).onclick = function () {
	        0 !== s._currentStep && N.call(s);
	      }, I(e), e.innerHTML = this._options.prevLabel, (i = document.createElement("a")).className = this._options.buttonClass + " introjs-skipbutton ", I(i), i.innerHTML = this._options.skipLabel, i.onclick = function () {
	        s._introItems.length - 1 === s._currentStep && "function" == typeof s._introCompleteCallback && s._introCompleteCallback.call(s), s._introItems.length - 1 !== s._currentStep && "function" == typeof s._introExitCallback && s._introExitCallback.call(s), "function" == typeof s._introSkipCallback && s._introSkipCallback.call(s), A.call(s, s._targetElement);
	      }, w.appendChild(i), 1 < this._introItems.length && (w.appendChild(e), w.appendChild(t)), g.appendChild(w), L.call(s, o.element, g, b, x), P.call(this, o.scrollTo, o, g);
	    }var S = s._targetElement.querySelector(".introjs-disableInteraction");S && S.parentNode.removeChild(S), o.disableInteraction && function () {
	      var t = document.querySelector(".introjs-disableInteraction");null === t && ((t = document.createElement("div")).className = "introjs-disableInteraction", this._targetElement.appendChild(t)), T.call(this, t);
	    }.call(s), 0 === this._currentStep && 1 < this._introItems.length ? (null != i && (i.className = this._options.buttonClass + " introjs-skipbutton"), null != t && (t.className = this._options.buttonClass + " introjs-nextbutton"), !0 === this._options.hidePrev ? (null != e && (e.className = this._options.buttonClass + " introjs-prevbutton introjs-hidden"), null != t && H(t, "introjs-fullbutton")) : null != e && (e.className = this._options.buttonClass + " introjs-prevbutton introjs-disabled"), null != i && (i.innerHTML = this._options.skipLabel)) : this._introItems.length - 1 === this._currentStep || 1 === this._introItems.length ? (null != i && (i.innerHTML = this._options.doneLabel, H(i, "introjs-donebutton")), null != e && (e.className = this._options.buttonClass + " introjs-prevbutton"), !0 === this._options.hideNext ? (null != t && (t.className = this._options.buttonClass + " introjs-nextbutton introjs-hidden"), null != e && H(e, "introjs-fullbutton")) : null != t && (t.className = this._options.buttonClass + " introjs-nextbutton introjs-disabled")) : (null != i && (i.className = this._options.buttonClass + " introjs-skipbutton"), null != e && (e.className = this._options.buttonClass + " introjs-prevbutton"), null != t && (t.className = this._options.buttonClass + " introjs-nextbutton"), null != i && (i.innerHTML = this._options.skipLabel)), e.setAttribute("role", "button"), t.setAttribute("role", "button"), i.setAttribute("role", "button"), null != t && t.focus(), function (t) {
	      var e;if (t.element instanceof SVGElement) for (e = t.element.parentNode; null !== t.element.parentNode && e.tagName && "body" !== e.tagName.toLowerCase();) {
	        "svg" === e.tagName.toLowerCase() && H(e, "introjs-showElement introjs-relativePosition"), e = e.parentNode;
	      }H(t.element, "introjs-showElement");var i = M(t.element, "position");"absolute" !== i && "relative" !== i && "fixed" !== i && H(t.element, "introjs-relativePosition");e = t.element.parentNode;for (; null !== e && e.tagName && "body" !== e.tagName.toLowerCase();) {
	        var n = M(e, "z-index"),
	            o = parseFloat(M(e, "opacity")),
	            s = M(e, "transform") || M(e, "-webkit-transform") || M(e, "-moz-transform") || M(e, "-ms-transform") || M(e, "-o-transform");(/[0-9]+/.test(n) || o < 1 || "none" !== s && void 0 !== s) && H(e, "introjs-fixParent"), e = e.parentNode;
	      }
	    }(o), void 0 !== this._introAfterChangeCallback && this._introAfterChangeCallback.call(this, o.element);
	  }function P(t, e, i) {
	    var n, o, s;if ("off" !== t && this._options.scrollToElement && (n = "tooltip" === t ? i.getBoundingClientRect() : e.element.getBoundingClientRect(), o = e.element, !(0 <= (s = o.getBoundingClientRect()).top && 0 <= s.left && s.bottom + 80 <= window.innerHeight && s.right <= window.innerWidth))) {
	      var l = b().height;n.bottom - (n.bottom - n.top) < 0 || e.element.clientHeight > l ? window.scrollBy(0, n.top - (l / 2 - n.height / 2) - this._options.scrollPadding) : window.scrollBy(0, n.top - (l / 2 - n.height / 2) + this._options.scrollPadding);
	    }
	  }function q() {
	    B(document.querySelectorAll(".introjs-showElement"), function (t) {
	      O(t, /introjs-[a-zA-Z]+/g);
	    });
	  }function B(t, e, i) {
	    if (t) for (var n = 0, o = t.length; n < o; n++) {
	      e(t[n], n);
	    }"function" == typeof i && i();
	  }var o,
	      s = (o = {}, function (t, e) {
	    return o[e = e || "introjs-stamp"] = o[e] || 0, void 0 === t[e] && (t[e] = o[e]++), t[e];
	  }),
	      u = new function () {
	    var r = "introjs_event";this._id = function (t, e, i, n) {
	      return e + s(i) + (n ? "_" + s(n) : "");
	    }, this.on = function (e, t, i, n, o) {
	      var s = this._id.apply(this, arguments),
	          l = function l(t) {
	        return i.call(n || e, t || window.event);
	      };"addEventListener" in e ? e.addEventListener(t, l, o) : "attachEvent" in e && e.attachEvent("on" + t, l), e[r] = e[r] || {}, e[r][s] = l;
	    }, this.off = function (t, e, i, n, o) {
	      var s = this._id.apply(this, arguments),
	          l = t[r] && t[r][s];l && ("removeEventListener" in t ? t.removeEventListener(e, l, o) : "detachEvent" in t && t.detachEvent("on" + e, l), t[r][s] = null);
	    };
	  }();function H(e, t) {
	    if (e instanceof SVGElement) {
	      var i = e.getAttribute("class") || "";e.setAttribute("class", i + " " + t);
	    } else {
	      if (void 0 !== e.classList) B(t.split(" "), function (t) {
	        e.classList.add(t);
	      });else e.className.match(t) || (e.className += " " + t);
	    }
	  }function O(t, e) {
	    if (t instanceof SVGElement) {
	      var i = t.getAttribute("class") || "";t.setAttribute("class", i.replace(e, "").replace(/^\s+|\s+$/g, ""));
	    } else t.className = t.className.replace(e, "").replace(/^\s+|\s+$/g, "");
	  }function M(t, e) {
	    var i = "";return t.currentStyle ? i = t.currentStyle[e] : document.defaultView && document.defaultView.getComputedStyle && (i = document.defaultView.getComputedStyle(t, null).getPropertyValue(e)), i && i.toLowerCase ? i.toLowerCase() : i;
	  }function d(t) {
	    var e = t.parentNode;return !(!e || "HTML" === e.nodeName) && ("fixed" === M(t, "position") || d(e));
	  }function b() {
	    if (void 0 !== window.innerWidth) return { width: window.innerWidth, height: window.innerHeight };var t = document.documentElement;return { width: t.clientWidth, height: t.clientHeight };
	  }function g() {
	    var t = document.querySelector(".introjs-hintReference");if (t) {
	      var e = t.getAttribute("data-step");return t.parentNode.removeChild(t), e;
	    }
	  }function l(t) {
	    if (this._introItems = [], this._options.hints) B(this._options.hints, function (t) {
	      var e = h(t);"string" == typeof e.element && (e.element = document.querySelector(e.element)), e.hintPosition = e.hintPosition || this._options.hintPosition, e.hintAnimation = e.hintAnimation || this._options.hintAnimation, null !== e.element && this._introItems.push(e);
	    }.bind(this));else {
	      var e = t.querySelectorAll("*[data-hint]");if (!e || !e.length) return !1;B(e, function (t) {
	        var e = t.getAttribute("data-hintanimation");e = e ? "true" === e : this._options.hintAnimation, this._introItems.push({ element: t, hint: t.getAttribute("data-hint"), hintPosition: t.getAttribute("data-hintposition") || this._options.hintPosition, hintAnimation: e, tooltipClass: t.getAttribute("data-tooltipclass"), position: t.getAttribute("data-position") || this._options.tooltipPosition });
	      }.bind(this));
	    }(function () {
	      var l = this,
	          r = document.querySelector(".introjs-hints");null === r && ((r = document.createElement("div")).className = "introjs-hints");B(this._introItems, function (t, e) {
	        if (!document.querySelector('.introjs-hint[data-step="' + e + '"]')) {
	          var i,
	              n = document.createElement("a");I(n), n.onclick = (i = e, function (t) {
	            var e = t || window.event;e.stopPropagation && e.stopPropagation(), null !== e.cancelBubble && (e.cancelBubble = !0), j.call(l, i);
	          }), n.className = "introjs-hint", t.hintAnimation || H(n, "introjs-hint-no-anim"), d(t.element) && H(n, "introjs-fixedhint");var o = document.createElement("div");o.className = "introjs-hint-dot";var s = document.createElement("div");s.className = "introjs-hint-pulse", n.appendChild(o), n.appendChild(s), n.setAttribute("data-step", e), t.targetElement = t.element, t.element = n, C.call(this, t.hintPosition, n, t.targetElement), r.appendChild(n);
	        }
	      }.bind(this)), document.body.appendChild(r), void 0 !== this._hintsAddedCallback && this._hintsAddedCallback.call(this);
	    }).call(this), u.on(document, "click", g, this, !1), u.on(window, "resize", r, this, !0);
	  }function r() {
	    B(this._introItems, function (t) {
	      void 0 !== t.targetElement && C.call(this, t.hintPosition, t.element, t.targetElement);
	    }.bind(this));
	  }function y(t) {
	    var e = document.querySelector(".introjs-hints");return e ? e.querySelectorAll(t) : [];
	  }function v(t) {
	    var e = y('.introjs-hint[data-step="' + t + '"]')[0];g.call(this), e && H(e, "introjs-hidehint"), void 0 !== this._hintCloseCallback && this._hintCloseCallback.call(this, t);
	  }function _(t) {
	    var e = y('.introjs-hint[data-step="' + t + '"]')[0];e && O(e, /introjs-hidehint/g);
	  }function w(t) {
	    var e = y('.introjs-hint[data-step="' + t + '"]')[0];e && e.parentNode.removeChild(e);
	  }function C(t, e, i) {
	    var n = k.call(this, i);switch (t) {default:case "top-left":
	        e.style.left = n.left + "px", e.style.top = n.top + "px";break;case "top-right":
	        e.style.left = n.left + n.width - 20 + "px", e.style.top = n.top + "px";break;case "bottom-left":
	        e.style.left = n.left + "px", e.style.top = n.top + n.height - 20 + "px";break;case "bottom-right":
	        e.style.left = n.left + n.width - 20 + "px", e.style.top = n.top + n.height - 20 + "px";break;case "middle-left":
	        e.style.left = n.left + "px", e.style.top = n.top + (n.height - 20) / 2 + "px";break;case "middle-right":
	        e.style.left = n.left + n.width - 20 + "px", e.style.top = n.top + (n.height - 20) / 2 + "px";break;case "middle-middle":
	        e.style.left = n.left + (n.width - 20) / 2 + "px", e.style.top = n.top + (n.height - 20) / 2 + "px";break;case "bottom-middle":
	        e.style.left = n.left + (n.width - 20) / 2 + "px", e.style.top = n.top + n.height - 20 + "px";break;case "top-middle":
	        e.style.left = n.left + (n.width - 20) / 2 + "px", e.style.top = n.top + "px";}
	  }function j(t) {
	    var e = document.querySelector('.introjs-hint[data-step="' + t + '"]'),
	        i = this._introItems[t];void 0 !== this._hintClickCallback && this._hintClickCallback.call(this, e, i, t);var n = g.call(this);if (parseInt(n, 10) !== t) {
	      var o = document.createElement("div"),
	          s = document.createElement("div"),
	          l = document.createElement("div"),
	          r = document.createElement("div");o.className = "introjs-tooltip", o.onclick = function (t) {
	        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
	      }, s.className = "introjs-tooltiptext";var a = document.createElement("p");a.innerHTML = i.hint;var c = document.createElement("a");c.className = this._options.buttonClass, c.setAttribute("role", "button"), c.innerHTML = this._options.hintButtonLabel, c.onclick = v.bind(this, t), s.appendChild(a), s.appendChild(c), l.className = "introjs-arrow", o.appendChild(l), o.appendChild(s), this._currentStep = e.getAttribute("data-step"), r.className = "introjs-tooltipReferenceLayer introjs-hintReference", r.setAttribute("data-step", e.getAttribute("data-step")), T.call(this, r), r.appendChild(o), document.body.appendChild(r), L.call(this, e, o, l, null, !0);
	    }
	  }function k(t) {
	    var e = document.body,
	        i = document.documentElement,
	        n = window.pageYOffset || i.scrollTop || e.scrollTop,
	        o = window.pageXOffset || i.scrollLeft || e.scrollLeft,
	        s = t.getBoundingClientRect();return { top: s.top + n, width: s.width, height: s.height, left: s.left + o };
	  }function R(t) {
	    var e = window.getComputedStyle(t),
	        i = "absolute" === e.position,
	        n = /(auto|scroll)/;if ("fixed" === e.position) return document.body;for (var o = t; o = o.parentElement;) {
	      if (e = window.getComputedStyle(o), (!i || "static" !== e.position) && n.test(e.overflow + e.overflowY + e.overflowX)) return o;
	    }return document.body;
	  }function V(t, e) {
	    t.scrollTop = e.offsetTop - t.offsetTop;
	  }function z() {
	    return parseInt(this._currentStep + 1, 10) / this._introItems.length * 100;
	  }var x = function x(t) {
	    var e;if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) e = new n(t);else if ("string" == typeof t) {
	      var i = document.querySelector(t);if (!i) throw new Error("There is no element with given selector.");e = new n(i);
	    } else e = new n(document.body);return x.instances[s(e, "introjs-instance")] = e;
	  };return x.version = "2.9.3", x.instances = {}, x.fn = n.prototype = { clone: function clone() {
	      return new n(this);
	    }, setOption: function setOption(t, e) {
	      return this._options[t] = e, this;
	    }, setOptions: function setOptions(t) {
	      return this._options = function (t, e) {
	        var i,
	            n = {};for (i in t) {
	          n[i] = t[i];
	        }for (i in e) {
	          n[i] = e[i];
	        }return n;
	      }(this._options, t), this;
	    }, start: function start(t) {
	      return e.call(this, this._targetElement, t), this;
	    }, goToStep: function goToStep(t) {
	      return function (t) {
	        this._currentStep = t - 2, void 0 !== this._introItems && E.call(this);
	      }.call(this, t), this;
	    }, addStep: function addStep(t) {
	      return this._options.steps || (this._options.steps = []), this._options.steps.push(t), this;
	    }, addSteps: function addSteps(t) {
	      if (t.length) {
	        for (var e = 0; e < t.length; e++) {
	          this.addStep(t[e]);
	        }return this;
	      }
	    }, goToStepNumber: function goToStepNumber(t) {
	      return function (t) {
	        this._currentStepNumber = t, void 0 !== this._introItems && E.call(this);
	      }.call(this, t), this;
	    }, nextStep: function nextStep() {
	      return E.call(this), this;
	    }, previousStep: function previousStep() {
	      return N.call(this), this;
	    }, exit: function exit(t) {
	      return A.call(this, this._targetElement, t), this;
	    }, refresh: function refresh() {
	      return function () {
	        if (T.call(this, document.querySelector(".introjs-helperLayer")), T.call(this, document.querySelector(".introjs-tooltipReferenceLayer")), T.call(this, document.querySelector(".introjs-disableInteraction")), void 0 !== this._currentStep && null !== this._currentStep) {
	          var t = document.querySelector(".introjs-helperNumberLayer"),
	              e = document.querySelector(".introjs-arrow"),
	              i = document.querySelector(".introjs-tooltip");L.call(this, this._introItems[this._currentStep].element, i, e, t);
	        }return r.call(this), this;
	      }.call(this), this;
	    }, onbeforechange: function onbeforechange(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onbeforechange was not a function");return this._introBeforeChangeCallback = t, this;
	    }, onchange: function onchange(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onchange was not a function.");return this._introChangeCallback = t, this;
	    }, onafterchange: function onafterchange(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onafterchange was not a function");return this._introAfterChangeCallback = t, this;
	    }, oncomplete: function oncomplete(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for oncomplete was not a function.");return this._introCompleteCallback = t, this;
	    }, onhintsadded: function onhintsadded(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onhintsadded was not a function.");return this._hintsAddedCallback = t, this;
	    }, onhintclick: function onhintclick(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onhintclick was not a function.");return this._hintClickCallback = t, this;
	    }, onhintclose: function onhintclose(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onhintclose was not a function.");return this._hintCloseCallback = t, this;
	    }, onexit: function onexit(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onexit was not a function.");return this._introExitCallback = t, this;
	    }, onskip: function onskip(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onskip was not a function.");return this._introSkipCallback = t, this;
	    }, onbeforeexit: function onbeforeexit(t) {
	      if ("function" != typeof t) throw new Error("Provided callback for onbeforeexit was not a function.");return this._introBeforeExitCallback = t, this;
	    }, addHints: function addHints() {
	      return l.call(this, this._targetElement), this;
	    }, hideHint: function hideHint(t) {
	      return v.call(this, t), this;
	    }, hideHints: function hideHints() {
	      return function () {
	        B(y(".introjs-hint"), function (t) {
	          v.call(this, t.getAttribute("data-step"));
	        }.bind(this));
	      }.call(this), this;
	    }, showHint: function showHint(t) {
	      return _.call(this, t), this;
	    }, showHints: function showHints() {
	      return function () {
	        var t = y(".introjs-hint");t && t.length ? B(t, function (t) {
	          _.call(this, t.getAttribute("data-step"));
	        }.bind(this)) : l.call(this, this._targetElement);
	      }.call(this), this;
	    }, removeHints: function removeHints() {
	      return function () {
	        B(y(".introjs-hint"), function (t) {
	          w.call(this, t.getAttribute("data-step"));
	        }.bind(this));
	      }.call(this), this;
	    }, removeHint: function removeHint(t) {
	      return w.call(this, t), this;
	    }, showHintDialog: function showHintDialog(t) {
	      return j.call(this, t), this;
	    } }, x;
	});

/***/ })

});