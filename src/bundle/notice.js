webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';
	
	__webpack_require__(349);
	
	__webpack_require__(856);
	
	__webpack_require__(860);
	
	__webpack_require__(355);
	
	var _velocity = __webpack_require__(357);
	
	var _velocity2 = _interopRequireDefault(_velocity);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _waves = __webpack_require__(555);
	
	var waves = _interopRequireWildcard(_waves);
	
	var _tooltip = __webpack_require__(552);
	
	var tt = _interopRequireWildcard(_tooltip);
	
	var _notice = __webpack_require__(862);
	
	var _notice2 = _interopRequireDefault(_notice);
	
	var _storage = __webpack_require__(2);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log("==== simpread options page: notice load ====");
	
	/**
	 * Entry
	 */
	_storage.storage.Read(function () {
	    console.log("simpread storage get success!", _storage.storage);
	    navRender();
	    noticeRender();
	    tt.Render("body");
	    waves.Render({ root: "body" });
	    $("body").velocity({ opacity: 1 }, { duration: 1000, complete: function complete() {
	            $("body").removeAttr("style");
	        } });
	});
	
	/**
	 * navigation Render
	 */
	function navRender() {
	    var navClick = function navClick() {
	        location.href = location.origin + "/options/options.html";
	    };
	    var button = React.createElement(_button2.default, { waves: 'md-waves-effect md-waves-circle', hoverColor: 'transparent', icon: ss.IconPath("gohome_icon"), onClick: function onClick() {
	            return navClick();
	        } });
	    ReactDOM.render(button, $(".header .nav")[0]);
	}
	
	/**
	 * notice Render
	 */
	function noticeRender() {
	    var is_update = location.search == "?is_update=true" ? true : false;
	    ReactDOM.render(React.createElement(_notice2.default, { is_update: is_update }), $(".notice")[0]);
	    history.pushState("", "", "/options/notice.html");
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(514)))

/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(350);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./simpread.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./simpread.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\r\n * SimpRead: Read mode\r\n */\r\n\r\n.simpread-font {\r\n    font: 300 16px/1.8 -apple-system, PingFang SC, Microsoft Yahei, Lantinghei SC, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;\r\n\r\n    color:#333;\r\n\r\n    text-rendering: optimizelegibility;\r\n    -webkit-text-size-adjust: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\n.simpread-hidden {\r\n    display: none;\r\n}\r\n\r\n/**\r\n *  Read: background( root ) style\r\n */\r\n .simpread-read-root {\r\n    display: -webkit-flex;\r\n    -ms-flex-pack:center;\r\n        justify-content:center;\r\n    -ms-flex-align:center;\r\n        align-items:center;\r\n\r\n    position: relative;\r\n    margin: 0;\r\n\r\n    top: -1000px;\r\n    left: 0;\r\n\r\n    width: 100%;\r\n\r\n    z-index: 2147483646;\r\n\r\n    overflow-x: hidden;\r\n    opacity: 0;\r\n    transition: all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;\r\n}\r\n\r\n.simpread-read-root-show {\r\n    top: 0;\r\n}\r\n\r\n.simpread-read-root-hide {\r\n    top: 1000px;\r\n}\r\n\r\n/**\r\n * Read: Read mode style\r\n */\r\nsr-read {\r\n    display: -webkit-flex;\r\n    -ms-flex-flow:column nowrap;\r\n        flex-flow:column nowrap;\r\n\r\n    margin: 20px 20%;\r\n\r\n    min-width: 400px;\r\n    min-height: 400px;\r\n\r\n    text-align: center;\r\n}\r\n\r\nread-process {\r\n    position: fixed;\r\n\r\n    top: 0;\r\n    left: 0;\r\n\r\n    height: 3px;\r\n    width: 100%;\r\n\r\n    background-color: #64B5F6;\r\n    transition: width 2s;\r\n    z-index: 20000;\r\n}\r\n\r\nsr-rd-content-error {\r\n    display: block;\r\n    position: relative;\r\n\r\n    margin: 0px;\r\n    margin-bottom: 30px;\r\n    padding: 25px;\r\n\r\n    background-color: rgba(0, 0, 0, .05);\r\n}\r\n\r\nsr-rd-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n\r\n    font-size: 14px;\r\n}\r\n\r\nsr-rd-footer-group {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n}\r\n\r\nsr-rd-footer-line {\r\n    width: 100%;\r\n    border-top: 1px solid #E0E0E0;\r\n}\r\n\r\nsr-rd-footer-text {\r\n    min-width: 150px;\r\n}\r\n\r\nsr-rd-footer-copywrite {\r\n    margin: 10px 0 0 0;\r\n    color: inherit;\r\n}\r\n\r\nsr-rd-footer-copywrite abbr {\r\n    font-feature-settings: normal;\r\n    font-variant: normal;\r\n    text-decoration: none;\r\n    /*border-bottom: 1px dotted;*/\r\n}\r\n\r\nsr-rd-footer-copywrite .second {\r\n    margin: 10px 0;\r\n}\r\n\r\nsr-rd-footer-copywrite .third a:hover {\r\n    border: none!important;\r\n}\r\n\r\nsr-rd-footer-copywrite .third a:first-child {\r\n    margin-right: 50px;\r\n}\r\n\r\nsr-rd-footer-copywrite .sr-icon {\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    width: 33px;\r\n    height: 33px;\r\n\r\n    opacity: .8;\r\n\r\n    transition: opacity .5s ease;\r\n    cursor: pointer;\r\n}\r\n\r\nsr-rd-footer-copywrite .sr-icon:hover {\r\n    opacity: 1;\r\n}\r\n\r\nsr-rd-footer-copywrite a,\r\nsr-rd-footer-copywrite a:link,\r\nsr-rd-footer-copywrite a:visited {\r\n    margin: 0;\r\n    padding: 0;\r\n\r\n    color: inherit;\r\n    background-color: transparent;\r\n\r\n    font-size: inherit!important;\r\n    line-height: normal;\r\n    line-height: initial;\r\n    text-decoration: none;\r\n    vertical-align: baseline;\r\n    vertical-align: initial;\r\n\r\n    border: none!important;\r\n    /*border-bottom: 1px dotted!important;*/\r\n\r\n    box-sizing: border-box;\r\n}\r\n\r\nsr-rd-footer-copywrite a:hover,\r\nsr-rd-footer-copywrite a:focus,\r\nsr-rd-footer a:active {\r\n    color: inherit;\r\n    text-decoration: none;\r\n    border-bottom: 1px dotted!important;\r\n}\r\n\r\n/**\r\n * Special blocks\r\n */\r\n.simpread-blocks {\r\n    text-decoration: none!important;\r\n}\r\n\r\n.simpread-blocks * {\r\n    margin: 0;\r\n}\r\n\r\n.simpread-blocks a {\r\n    padding: 0;\r\n    text-decoration: none!important;\r\n}\r\n\r\n.simpread-blocks img {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    background: transparent;\r\n    box-shadow: none;\r\n}\r\n\r\n/**\r\n *  Focus: Background( root ) style\r\n */\r\n.simpread-focus-root {\r\n    display: block;\r\n    position: fixed;\r\n\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n\r\n    background-color: rgba(235, 235, 235, .9);\r\n    z-index: 2147483645;\r\n\r\n    opacity: 0;\r\n    transition : opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\r\n}\r\n\r\n.simpread-focus-highlight {\r\n    position: relative;\r\n\r\n    box-shadow: 0 0 0 20px #fff;\r\n    background-color: #fff;\r\n\r\n    overflow: visible;\r\n    z-index: 2147483646;\r\n}\r\n\r\n.sr-controlbar-bg sr-rd-crlbar {\r\n    z-index: 2147483647;\r\n}\r\n\r\n.sr-controlbar-bg sr-rd-crlbar fab {\r\n    z-index: 2147483647;\r\n}\r\n\r\n/**\r\n * Controlbar: focus mode and read mode\r\n */\r\nsr-rd-crlbar.controlbar {\r\n    position: fixed;\r\n\r\n    right: 0;\r\n    bottom: 0;\r\n\r\n    width: 100px;\r\n    height: 100%;\r\n\r\n    opacity: 0;\r\n    transition: opacity .5s ease;\r\n}\r\n\r\nsr-rd-crlbar.controlbar:hover {\r\n    opacity: 1;\r\n}\r\n\r\n/**\r\n * Golbal\r\n*/\r\n@media all and ( max-height: 620px ) {\r\n\r\n    fab {\r\n        zoom: .8;\r\n    }\r\n\r\n}\r\n\r\n@media all and ( max-height: 783px ) {\r\n\r\n    dialog-gp dialog-content {\r\n        max-height: 580px;\r\n    }\r\n\r\n    dialog-gp dialog-footer {\r\n        border-top: 1px solid rgba(224, 224, 224, 1);\r\n    }\r\n\r\n}\r\n\r\n/**\r\n * Highlight\r\n */\r\n.simpread-highlight-selector {\r\n    background-color: #fafafa !important;\r\n    outline: 3px dashed #1976d2 !important;\r\n    opacity: .8 !important;\r\n    cursor: pointer !important;\r\n    transition: opacity .5s ease !important;\r\n}\r\n\r\n.simpread-highlight-controlbar {\r\n    position: relative !important;\r\n    background-color: #fafafa !important;\r\n    outline: 3px dashed #1976d2 !important;\r\n    opacity: .8 !important;\r\n    transition: opacity .5s ease !important;\r\n}\r\n\r\nsimpread-highlight,\r\nsr-snapshot-ctlbar {\r\n    position: fixed;\r\n\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    padding: 15px;\r\n\r\n    height: 50px;\r\n\r\n    background-color: rgba(50, 50, 50, .9);\r\n    box-shadow: 0 2px 5px rgba(0, 0, 0, .26);\r\n\r\n    box-sizing: border-box;\r\n    z-index: 2147483640;\r\n}\r\n\r\nsr-highlight-ctl {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    margin: 0 5px;\r\n\r\n    width: 50px;\r\n    height: 20px;\r\n\r\n    color: #fff;\r\n    background-color: #1976d2;\r\n\r\n    border-radius: 4px;\r\n    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12);\r\n    cursor: pointer;\r\n}\r\n\r\n/**\r\n * TOC\r\n */\r\ntoc-bg {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    height: 200px;\r\n\r\n    font-size: medium;\r\n\r\n    font-size: initial;\r\n}\r\n\r\ntoc-bg:hover {\r\n    z-index: 3;\r\n}\r\n\r\n.toc-bg-hidden {\r\n    opacity: 0;\r\n    transition: opacity .5s ease;\r\n}\r\n\r\n.toc-bg-hidden:hover {\r\n    opacity: 1;\r\n    z-index: 3;\r\n}\r\n\r\n.toc-bg-hidden:hover toc {\r\n    width: 180px;\r\n}\r\n\r\ntoc * {\r\n    all: unset;\r\n}\r\n\r\ntoc {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 100px;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: start;\r\n        align-items: flex-start;\r\n\r\n    padding: 10px;\r\n\r\n    width: 0;\r\n    max-width: 200px;\r\n    max-height: 500px;\r\n\r\n    overflow-x: hidden;\r\n    overflow-y: hidden;\r\n    cursor: pointer;\r\n    border: 1px solid rgba(158, 158, 158, .22);\r\n    transition: width .5s;\r\n}\r\n\r\ntoc:hover {\r\n    overflow-y: auto;\r\n}\r\n\r\ntoc::-webkit-scrollbar {\r\n    width: 3px;\r\n}\r\n\r\ntoc::-webkit-scrollbar-thumb {\r\n    border-radius: 10px;\r\n    background-color: rgba(139, 137, 134, .5);\r\n}\r\n\r\n\r\ntoc outline {\r\n    position: relative;\r\n    display: -webkit-box;\r\n    -webkit-line-clamp: 1;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n\r\n    padding: 2px 0;\r\n    min-height: 21px;\r\n\r\n    line-height: 21px;\r\n    text-align: left;\r\n}\r\n\r\ntoc outline a,\r\ntoc outline a:active,\r\ntoc outline a:visited,\r\ntoc outline a:focus\r\n{\r\n    display: block;\r\n\r\n    width: 100%;\r\n\r\n    color: inherit;\r\n    font-size: 11px;\r\n    text-decoration: none!important;\r\n\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\ntoc outline a:hover {\r\n    font-weight: bold!important;\r\n}\r\n\r\ntoc outline a.toc-outline-theme-dark,\r\ntoc outline a.toc-outline-theme-night {\r\n    color: #fff!important;\r\n}\r\n\r\n.toc-level-h1 {\r\n    padding-left: 5px;\r\n}\r\n.toc-level-h2 {\r\n    padding-left: 15px;\r\n}\r\n.toc-level-h3 {\r\n    padding-left: 25px;\r\n}\r\n.toc-level-h4 {\r\n    padding-left: 35px;\r\n}\r\n\r\n.toc-outline-active {\r\n    border-left: 2px solid rgb(244, 67, 54);\r\n}\r\n\r\ntoc outline active {\r\n    position: absolute;\r\n\r\n    left: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n\r\n    padding: 0 0 0 3px;\r\n\r\n    border-left: 2px solid #e8e8e8;\r\n\r\n}\r\n\r\n/**\r\n * Keyboard\r\n */\r\n\r\nsr-kbd {\r\n    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(255, 247, 133)), to(rgb(255, 197, 66)));\r\n    border-width: 1px;\r\n    border-style: solid;\r\n    border-color: rgb(227, 190, 35);\r\n    border-image: none;\r\n    border-image: initial;\r\n\r\n    position: absolute;\r\n    left: 0;\r\n    padding: 1px 3px 0px;\r\n\r\n    font-size: 11px!important;\r\n    font-weight: bold;\r\n    box-shadow: rgba(0, 0, 0, .3) 0px 3px 7px 0px;\r\n    overflow: hidden;\r\n    border-radius: 3px;\r\n}\r\n\r\n.sr-kbd-a {\r\n    position: relative;\r\n}\r\n\r\nkbd-mapping {\r\n    position: fixed;\r\n    left: 5px;\r\n    bottom: 5px;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-flow: row;\r\n        flex-flow: row;\r\n\r\n    width: 500px;\r\n    height: 625px;\r\n\r\n    background-color: #fff;\r\n\r\n    border: 1px solid rgba(158, 158, 158, .22);\r\n    box-shadow: 0 2px 5px rgba(0, 0, 0, .26);\r\n    border-radius: 3px;\r\n}\r\n\r\nkbd-maps {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-flow: column wrap;\r\n        flex-flow: column wrap;\r\n    margin-top: 40px;\r\n}\r\n\r\nkbd-mapping kbd-map-title {\r\n    position: absolute;\r\n    margin: 5px 0;\r\n    width: 100%;\r\n    font-size: 14px;\r\n    font-weight: bold;\r\n}\r\n\r\nkbd-maps-group {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: start;\r\n        align-items: flex-start;\r\n}\r\n\r\nkbd-maps-title {\r\n    margin: 5px 0;\r\n    padding-left: 53px;\r\n\r\n    font-size: 12px;\r\n    font-weight: bold;\r\n}\r\n\r\nkbd-map kbd {\r\n    display: inline-block;\r\n    padding: 3px 5px;\r\n    font-size: 11px;\r\n    line-height: 10px;\r\n    color: #444d56;\r\n    vertical-align: middle;\r\n    background-color: #fafbfc;\r\n    border: solid 1px #c6cbd1;\r\n    border-bottom-color: #959da5;\r\n    border-radius: 3px;\r\n    box-shadow: inset 0 -1px 0 #959da5;\r\n}\r\n\r\nkbd-map kbd-name {\r\n    display: inline-block;\r\n    text-align: right;\r\n\r\n    width: 50px;\r\n}\r\n\r\nkbd-map kbd-desc {\r\n    padding-left: 3px;\r\n}\r\n\r\n/**\r\n * Share card\r\n */\r\n\r\nsharecard-bg {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    background-color: rgba(0, 0, 0, .4);\r\n\r\n    z-index: 2147483647;\r\n}\r\n\r\nsharecard {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n\r\n    max-width: 450px;\r\n\r\n    background-color: rgb(100, 181, 246);\r\n}\r\n\r\nsharecard-head {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n\r\n    margin: 25px;\r\n\r\n    color: #fff;\r\n\r\n    border-radius: 10px;\r\n    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2), 0 25px 50px 0 rgba(0, 0, 0, .15);\r\n}\r\n\r\nsharecard-card {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n}\r\n\r\nsharecard-top {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n\r\n    padding-right: 5px;\r\n\r\n    height: 65px;\r\n    background-color: #fff;\r\n\r\n    color: #878787;\r\n    font-size: 25px;\r\n    font-weight: 500;\r\n\r\n    border-top-left-radius: 10px;\r\n    border-top-right-radius: 10px;\r\n}\r\n\r\nsharecard-top span.logos {\r\n    display: block;\r\n\r\n    width: 48px;\r\n    height: 48px;\r\n\r\n    margin: 5px;\r\n\r\n    background-repeat: no-repeat;\r\n    background-position: 50%;\r\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABU1BMVEUAAAAnNJMnNZI3Q5onNJInNJMnNJInNJMnNJI8SJ0tOZY/S55EUKAoNJI6RpwoNJNIU6InNJInNJImNJI7SJwmNJJ2fLUiMJFKVaNCTJ9faK1HUaJOWKVSXaUnNJNYY6pye7cmM5JXYKhwebMjMI8mL4719fW9vb0oNZP/UlLz8/QqN5TAwMAnNJPv7+/Pz8/q6+/p6enNzc3Kysry8vMsOJXc3env7/LU1uXo29vR0dHOzs7ExMTwjo73bW37XV3Aj1TCYELl5u3n5+fW2Obn6O7f4OrZ2+g0QJkxPpgvO5bh4uvS1OTP0ePCwsJQW6ZLVqTs7fHd3d3V1dXqv79VX6lET6A1TIxXUIBSgHxWQnpelHf+WVnopkXqbC7j5Ozi4uLDw8NGUaFATJ9SgH3r6+vGyd7BxNva2trX19ejqM2gpczHx8dze7Zha67Z2dlTgH1aXQeSAAAAJnRSTlMA6ff+497Y8NL+/fv49P379sqab/BeOiX06tzVy8m/tKqpalA7G6oKj0EAAAJlSURBVEjHndNXWxpBFIDhcS2ICRLAkt4Dx4WhLk0E6R0MYoIISrWX5P9f5cwSIRC2+T1czMV5n2FnZwn2eWONUqCAv3H2Uf5Ra1hx4+0WEXtDQW0fCPYJ1EffEfIV4CSROAE4jsePoTFsNmTJF/IeIHF2lgCIn57GodlqDWXBK7IwBYatVlMWFAildPKX7I3m74Z9fsCiQChoimoFQAz04Ad2gH1n9fv9n9hgMNDr9euLWD6fLxQKxaLfb7dTSlahbFVdEPwIQtrAihZQgyKCtCagbQe3xh0QFMgy5MR11+ewYY5/qlZ7vT2xu93ULKjbFLpiUxnIIwjgKmVTLDUFXMrAi2NJWCRLIthTBo4xyOLKpwyqU6CuDCI41hFBCVdOhyLw4FgJ1skCAiyl9BSHbCorgo6VJXTru5hrVCQS8Yr5xLzX59YJSFpVFwD9U0BGC3hGdFpATgRupTGe9R9I1b1ePBvXKDyvq/O/44LT4/E4BUbSCAwj8Evq6HlnOBprx6JhJz8Gktc7xeaP9ndY+0coQvCccFBD4JW60UIY50ciLOAODAQRVOeCHm4Q3Xks6uRDY+CQ+AR4T2wMYh6+jMCIQOp78CFoj0H7EQgIuhI3dGaHCrwgADwCPjJvA372GRigCJg49FUdk3D87pq3zp4SA5zc1Zh9DxfwkpjgUg5Mv+lbeE3McC8Lpu7SA3wk2xzcqL2tN5DfIsQC8HB7UamUy6FQOpTO5QKBQDZbKnWSyUzGjdWCwaDA8+7Le4BNgm3qQGWchYh9s5hNq6wVbBlbwhZYOp3OYOA4zmgEypnM2zj8ByIdedKrH8vDAAAAAElFTkSuQmCC\");\r\n\r\n    zoom: .8;\r\n}\r\n\r\nsharecard-content {\r\n    padding: 15px;\r\n\r\n    max-height: 500px;\r\n\r\n    font-size: 20px;\r\n    text-align: justify;\r\n\r\n    background-color: rgb(33, 150, 243);\r\n\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n}\r\n\r\nsharecard-via {\r\n    padding: 10px;\r\n    font-size: 10px;\r\n\r\n    background-color: rgb(33, 150, 243);\r\n}\r\n\r\nsharecard-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n\r\n    padding-right: 5px;\r\n\r\n    height: 100px;\r\n    background-color: #fff;\r\n\r\n    color: #878787;\r\n    font-size: 15px;\r\n    font-weight: 500;\r\n\r\n    border-bottom-left-radius: 10px;\r\n    border-bottom-right-radius: 10px;\r\n}\r\n\r\nsharecard-footer div {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n}\r\n\r\nsharecard-footer span.qrcode {\r\n    display: block;\r\n\r\n    width: 100px;\r\n    height: 100px;\r\n\r\n    margin: 5px;\r\n\r\n    background-repeat: no-repeat;\r\n    background-position: 50%;\r\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA7VBMVEUAAAD///8ZGRnw8PBWVlb4+PgeHh719fVEREQlJSUODg6Ojo7Ly8v9/f1NTU2VlZUFBQV6enrCwsLy8vLh4eE0NDQLCwu8vLyXl5dxcXHa2trAwMCFhYVDQ0OysrKampo7OzssLCwICAioqKjJyckhISHu7u4/Pz9TU1NQUFBLS0tAQED6+vrS0tKRkZFISEgvLy+goKB+fn5vb29nZ2fm5uYbGxvk5OTX19d2dnZaWlre3t5hYWEyMjK5ubkoKCgVFRXQ0NDMzMzFxcW0tLSsrKykpKSMjIzq6urU1NSAgICvr6+cnJyHh4dsbGyfc25QAAAFkElEQVRIx4WXB3faMBCA74wHxgMMGAOh1MyyVyBAmtVmd/3/n1OdDtWstt/Li5JD35MtnU4CMnCIlkLEOpSKuMPhuI4FE444L9+dyv3zciad/rAjfU/yOPpGcjWS1NKSGsk29WTSD1IeYsIPkvsAJF+C5BIZkieYMNjJnsF4+JHk61wOSlVDyOIPqKBgZIxYTrqy/AmNtC1ps7yqlgE6dgYa1WqD5aV9SbKDbe6ZNnCq5A5ILlhGjEASIoawJdmHHo98AZLOnmxzKM9yK9Aht63FoAWBBmEgsEHnkfMgsZU8PJbpbXJd3MIep/Lg/MjbRqMRRuNtQ4Tthga5RiNzfmSWD97ZExQ64HhtgLb3CmbBGyj54vixjyeMsKjnV4AvOAHTwsHphKnH9toXki7Li3jLsgswizskv+c3PHKXe7ZHu5E/YMKcM2yqZIJkAclZTPClbJezivI1yTr4f+TeMib5qXxHsr7XtUFJDIc8pLAHA7Su4JXkd8ySnKZddQXH2NohswIutRu0Qu0jyS46JPugU+gISB1R8NBKWegVUsahTKEjAP9Bm5bKAc3DPlzjKaDvscE7PeEJu63WUg9a82tdA1O/ESupL9Cr6C1cXetjIe9zgQ4kvKLgHi6xC5LcGq9hhmiK0AYgUvLQtzm3n/x0jnum/Vo9j1jxg/pL3/f9W8isMOsv6/Ubf47rvl+u17nnZ1xQ+4iIXa6IpRVeimEEE3pnxO8kIz4CbFDyidVSpooBCCLLsj5noFlqUg2rwK0l+Anmm+VhCzKfrRHtqjGOLANxUKIUiYvFEcuaaZpXANniD5ZzpiBDTSRkuDJfWM6awxGuikUArp7fIOE7RlB6OygGTyhfsMyrtwDNIAkcp1YRhKC9Oh2IHUFQ6UPupnLL3icODaD5zVlUto7zhm1n7kmZ5kDSQBxykfZhD66eaQBoWriEGPcA182C4Crst90Z9NwvHgahDTALw/Ae4D500Pjq3oj/4sjtwcwVrCkkgB01HB8cdM0iIlWSr6IpNqFO+1mDHQFWORtO5EIi08b4jxy6giBsgKDnRnEYYdd9nIYvaLmuhS/h9DF5bEFr/7HTKAjUqWY1oUUBKgYEZdgIP6gJE2xQIWVvLhZBcAWx843kz87PDDi4cgR92s8/1FLpAGNeKiUbGtRQEIPkGb9TM1EF8MpCVEni7pIkkUdDs1ZcI/ZUer6YZg4WxTtqMmYsZJWebbOzEekZV4sCKaNhBaXQQ0NtjL71ZooNE1vWLfyyyFUbw7MsD0fWOFMSqAnbwj1Kuk0Aqp4aJ91MZhhvyS7+oQoMy5v63Jfoz/UYfPSiep2KQb5e4/gt1Ycdc7Se6jNyVbpuQNI08FrICQ6ccKnSXddrKCnqkqWFupJFAewKudSTBVAyBEjrLSXjCYnc5rrdQVl6VaiKqOTToi/kaSrlcW5fpGpgrlJTLvoGVxKDOg7PHzc6NLXOmuUHTZQhTWvS4T7T5ixPqGPz/EHXp/azkMeQoGOqBBOSq1gD4vwRe1culz8W8HlZKQt6Sjbm5XeS9eWizJw73HcsOW8mSpa0eT8zfK1w85LdtWKTf5dWfCPzMg5J+MBdsvvy6Q2QD/d91sfzouRz9zAdBp6HCcUzskccyBdKzjTC9ZE8HT8+JHLxtiE4d33Ud0uleOObvpXZk4E4/9h2sKD9t6oxgaCFxs9AHiI3wYJCndMbIMs9lLi7vEHFLxAUURyciOnTyzrLH6qSJwo+8CWuQIFL2wSoVyvQea/qtk2yvPtb4mekZMhJQkPwyvIzBbJGJD+jX3eGcfIFhWVmxsVAG5FMgSzm9y4wKL8aJdzvyctoTqEgep6K5lckWGM3uuuA5DadFvIhiTzBL1xzVtT0UDEDxd9ldeutcJLoyvUaoPgNdiqckZLamd0AAAAASUVORK5CYII=\");\r\n}\r\n\r\nsharecard-control {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    padding: 0 19px;\r\n\r\n    height: 80px;\r\n    background-color: #fff;\r\n}\r\n\r\n/**\r\n * Snapshot\r\n */\r\n\r\nsimpread-snapshot {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n\r\n    width: 100%;\r\n    height: 100%;\r\n\r\n    cursor: move;\r\n    z-index: 2147483645;\r\n}\r\n\r\nsr-mask {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    background-color: rgba(0, 0, 0, .1);\r\n}\r\n\r\n/**\r\n * URL Scheme\r\n */\r\n\r\n.simpread-urlscheme,\r\n.simpread-feedback {\r\n    position: fixed;\r\n    right: 20px;\r\n    bottom: 20px;\r\n\r\n    z-index: 2147483646;\r\n}\r\n\r\nsimpread-urlscheme,\r\nsimpread-feedback {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: start;\r\n        align-items: flex-start;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n\r\n    padding: 20px 20px 0;\r\n\r\n    width: 500px;\r\n\r\n    color: rgba(51, 51, 51, .87);\r\n    background-color: #fff;\r\n    border-radius: 3px;\r\n\r\n    box-shadow: rgba(0, 0, 0, .12) 0px 0px 2px, rgba(0, 0, 0, .26) 0px 2px 2px;\r\n    overflow: hidden;\r\n\r\n    transform-origin: bottom;\r\n    transition: all .6s ease;\r\n}\r\n\r\nsimpread-urlscheme *,\r\nsimpread-feedback * {\r\n    font-size: 12px!important;\r\n    box-sizing: border-box;\r\n}\r\n\r\nsimpread-urlscheme.active,\r\nsimpread-feedback.active {\r\n    animation-name: srFadeInUp;\r\n    animation-duration: 450ms;\r\n    animation-fill-mode: both;\r\n}\r\n\r\nsimpread-urlscheme.hide,\r\nsimpread-feedback.hide {\r\n    animation-name: srFadeInDown;\r\n    animation-duration: 450ms;\r\n    animation-fill-mode: both;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-label,\r\nsimpread-feedback sr-fb-label {\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-head,\r\nsimpread-feedback sr-fb-head {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n\r\n    margin-bottom: 5px;\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-content,\r\nsimpread-feedback sr-fb-content {\r\n    margin-bottom: 5px;\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-footer,\r\nsimpread-feedback sr-urls-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: end;\r\n        justify-content: flex-end;\r\n    width: 100%;\r\n}\r\n\r\nsimpread-urlscheme sr-urls-a,\r\nsimpread-feedback sr-fb-a {\r\n    color: #2163f7;\r\n    cursor: pointer;\r\n}\r\n\r\nsimpread-urlscheme text-field-state,\r\nsimpread-feedback text-field-state {\r\n    border-top: none rgba(34, 101, 247, .8)!important;\r\n    border-left: none rgba(34, 101, 247, .8)!important;\r\n    border-right: none rgba(34, 101, 247, .8)!important;\r\n    border-bottom: 2px solid rgba(34, 101, 247, .8)!important;\r\n}\r\n\r\nsimpread-urlscheme switch,\r\nsimpread-feedback switch {\r\n    margin-top: 0!important;\r\n}\r\n\r\n@keyframes srFadeInUp {\r\n    from {\r\n        opacity: 0;\r\n        transform: translateY(100px);\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n}\r\n\r\n@keyframes srFadeInDown {\r\n    from {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n\r\n    to {\r\n        opacity: 0;\r\n        transform: translateY(100px);\r\n    }\r\n}\r\n\r\n/**\r\n * Feeback\r\n */\r\n\r\nsimpread-feedback sr-fb-head {\r\n    font-weight: bold;\r\n}\r\n\r\nsimpread-feedback sr-fb-content {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n}\r\n\r\nsimpread-feedback sr-fb-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-pack: end;\r\n        justify-content: flex-end;\r\n\r\n    width: 100%;\r\n}\r\n\r\n/**\r\n * Feeback: stars\r\n */\r\n\r\n simpread-feedback sr-close {\r\n    position: absolute;\r\n    right: 20px;\r\n    cursor: pointer;\r\n    transition: all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;\r\n    z-index: 200;\r\n}\r\n\r\nsimpread-feedback sr-close:hover {\r\n    transform: rotate(-15deg) scale(1.3);\r\n}\r\n\r\nsimpread-feedback sr-stars {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n\r\n    margin-top: 10px;\r\n}\r\n\r\nsimpread-feedback sr-stars {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n\r\n    margin-top: 10px;\r\n}\r\n\r\nsimpread-feedback sr-stars i {\r\n    margin-right: 10px;\r\n    cursor: pointer;\r\n}\r\n\r\nsimpread-feedback sr-stars i svg {\r\n    transition: all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;\r\n}\r\n\r\nsimpread-feedback sr-stars i svg:hover {\r\n    transform: rotate(-15deg) scale(1.3);\r\n}\r\n\r\nsimpread-feedback sr-stars i.active svg {\r\n    transform: rotate(0) scale(1);\r\n}\r\n\r\nsimpread-feedback sr-emojis {\r\n    display: block;\r\n    height: 100px;\r\n    overflow: hidden;\r\n}\r\n\r\nsimpread-feedback sr-emoji {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    transition: .3s;\r\n}\r\n\r\nsimpread-feedback sr-emoji > svg {\r\n    margin: 15px 0;\r\n    width: 70px;\r\n    height: 70px;\r\n    -ms-flex-negative: 0;\r\n        flex-shrink: 0;\r\n}\r\n\r\nsimpread-feedback sr-stars-footer {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    margin: 10px 0 20px 0;\r\n}", ""]);
	
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

/***/ 860:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(861);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_notice.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_notice.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, ".header {\n    background-color: #16666f;\n    opacity: 1;\n    visibility: visible;\n}\n\n.notice {\n    margin-top: 65px;\n    width: 100%;\n}\n\n.notice notice {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n        flex-direction: row;\n\n    width: 100%;\n}\n\nnotice .loading,\nnotice .failed {\n    position: fixed;\n\n    top: 0;\n    left: 0;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-align: center;\n        align-items: center;\n\n    width: 100%;\n    height: 100%;\n\n    background-color: #fff;\n}\n\nnotice .loading svg {\n    transform: scale(.8);\n}\n\nnotice .failed {\n    -ms-flex-direction: column;\n        flex-direction: column;\n}\n\nnotice .failed span {\n    color: #9b9b9b;\n    font-size: 40px;\n    font-size: 2.5rem;\n}\n\nnotice .list {\n    margin: 20px 20px 0;\n    width: 300px;\n    min-height: 589px;\n}\n\nnotice .list.controlbar {\n    min-height: 0;\n    min-height: initial;\n}\n\nnotice .detail {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n\n    margin: 20px 20px 0 0;\n    padding: 39px 24px 0px;\n\n    width: 100%;\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);\n}\n\nnotice .detail img {\n    width: 60%;\n}\n\nnotice .detail .empty {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex-align: center;\n        align-items: center;\n\n    padding-bottom: 39px;\n    min-height: 550px;\n\n    color: #9b9b9b;\n    font-size: 41.6px;\n    font-size: 2.6rem;\n    font-weight: 400;\n}\n\nnotice .detail .empty .icon {\n    width: 80px;\n    height: 80px;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-image: url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBA0LLBOn/NkLAAABtklEQVRYw+2YPyxDURTGf5WOGCwiETH7s4kaDJo2FokYMBglZ66lOtGEqWIQm9zdoJouGERIEwNlE4NE4i0iBoO0CxIMvW1f26evvJY86Tfdc3LP99137vvuTa6HqlAwzxI9X064ISrxagweE5mfOXp18CHjoCDJFHbYlBCAOiywGWzLSYmAauUIn6koI+2g/Bzb0gMMyDWoZ9pNuTQByUKLbkSyhD6PyZroYcwiN0xSoQUYJGhZ+FKjwKtlNsggeAEIFJIbnJqm7BKpSeAIgHkdjbKgRwGucgIdOrEuYXOdXKo1Fm3pF+QOQBI6Tqg3wnleb8nUVHmtRNQBQueX5AZbclmRTVFYqBcbSKpS9jtocVLcFGgK/I6AhQ/UEPHCsf09GMyU287KaBc/Xm4vF+YbBv5oDzYd8FXUWrRIQoQa+wV1hfsFmj6whTt9IPvFRv3L39Q51AR7AKzKctMHtnCnD2wE6oAbpgF4bJCA3HKbH7vcaCsSdf9ZVCrQVyfW/uIwtwdZHcXUEzuSccKt2pglpoOsfkpQPs4a0p8ROc+1KI3RAHqDdPExpIv78nPQId7plgf4BCjPbVayklPeAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTEzVDExOjQ0OjE5KzA4OjAwPYuVdQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0xM1QxMTo0NDoxOSswODowMEzWLckAAAAASUVORK5CYII= );\n}\n\nnotice .detail .preview {\n    width: 100%;\n}\n\nnotice .detail .preview .title {\n    margin-bottom: 20px;\n\n    font-family: PingFang SC,Hiragino Sans GB,Microsoft Yahei,WenQuanYi Micro Hei,sans-serif;\n    font-size: 54.4px;\n    font-size: 3.4rem;\n    font-weight: 400;\n    line-height: 1.2;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    text-rendering: optimizelegibility;\n    -webkit-line-clamp: 3;\n}\n\nnotice .detail .preview .desc {\n    margin-bottom: 20px;\n    padding-bottom: 20px;\n\n    border-bottom: 1px solid #E0E0E0;\n}\n\nnotice .detail .preview blockquote {\n    border-left: 5px solid rgb(122, 122, 122);\n    color: rgb(85, 85, 85);\n    margin: 0;\n    padding: 0 0 0 10px;\n}\n\nnotice .detail .preview pre {\n    white-space: pre-wrap;\n    word-wrap: break-word;\n}\n\nnotice .list {\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);\n}\n\nnotice list {\n    display: -ms-flexbox!important;\n    display: flex!important;\n    -ms-flex-direction: column;\n        flex-direction: column;\n\n    padding: 16px;\n    min-height: 72px;\n\n    border-bottom: 1px solid #E0E0E0;\n    transition : all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n\nnotice list:hover {\n    background-color: #f5f5f5;\n    transition : all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n\nnotice list:hover .meta {\n    opacity: 1;\n}\n\nnotice list.active {\n    opacity: .5;\n}\n\nnotice list.selected {\n    background-color: #e1f5fe;\n    border-left: 4px solid #29b6f6;\n}\n\nnotice list.active .title {\n    text-decoration: line-through;\n}\n\nnotice list .title {\n    margin-bottom: 4px;\n    padding-right: 25px;\n\n    font-size: 24px;\n    font-size: 1.5rem;\n    font-weight: 500;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n}\n\nnotice list .category,\nnotice .detail .preview .category {\n    margin-right: 4px;\n    padding: 2px 7px;\n    padding: 2px 4px;\n\n    color: #fff;\n\n    font-weight: 400;\n    font-size: 12.8px;\n    font-size: 0.8rem;\n    border-radius: 2px;\n}\n\nnotice list .meta {\n    position: absolute;\n    right: 0;\n    opacity: 0;\n    transition : all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n}\n\nnotice .date {\n    color: #9e9e9e;\n}", ""]);
	
	// exports


/***/ }),

/***/ 862:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, Notify) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _storage = __webpack_require__(2);
	
	var _theme = __webpack_require__(524);
	
	var _theme2 = _interopRequireDefault(_theme);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _puplugin = __webpack_require__(564);
	
	var puplugin = _interopRequireWildcard(_puplugin);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("=== simpread notice load ===");
	
	/**
	 * Write storage
	 * 
	 * @param {func} callback 
	 */
	var write = function write(callback) {
	    _storage.storage.Write(function () {
	        console.log("current notice is ", _storage.storage.notice);
	        watch.SendMessage("option", true);
	        callback && callback();
	    });
	};
	
	var Notice = function (_React$Component) {
	    _inherits(Notice, _React$Component);
	
	    function Notice() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Notice);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Notice.__proto__ || Object.getPrototypeOf(Notice)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            items: [],
	            detail: "",
	            failed: false,
	
	            total: 0,
	            page: 1
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Notice, [{
	        key: 'onClick',
	        value: function onClick(event, id) {
	            var markdown = puplugin.Plugin("markdown"),
	                converter = new markdown.default.Converter(),
	                obj = this.state.items.filter(function (item) {
	                return item.id == id;
	            }),
	                item = obj[0],
	                html = converter.makeHtml(item.content),
	                tmpl = '<div class="preview">\n                                <div class="title">' + item.title + '</div>\n                                <div class="desc">\n                                    <span style="background-color: ' + item.category.color + '" class="category">' + item.category.name + '</span>\n                                    <span class="date">\u53D1\u5E03\u4E8E ' + item.date + '</span>\n                                </div>\n                                <sr-rd-content>' + html + '</sr-rd-content>\n                            </div>';
	            $("notice .detail").addClass("simpread-theme-root").html(tmpl);
	        }
	    }, {
	        key: 'onReadallClick',
	        value: function onReadallClick() {
	            var _this2 = this;
	
	            new Notify().Render("snackbar", "是否将全部消息标记为已读？", "确认", function () {
	                _storage.storage.notice.read = [];
	                _this2.state.items.forEach(function (item, idx) {
	                    _storage.storage.notice.read.push(idx + 1);
	                });
	                write(function () {
	                    new Notify().Render("已全部设置为已读，3 秒后自动刷新本页...");
	                    setTimeout(function () {
	                        return location.reload();
	                    }, 3000);
	                });
	            });
	        }
	    }, {
	        key: 'onLoadmoreClick',
	        value: function onLoadmoreClick() {
	            this.setState({ page: this.state.page + 1 });
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _this3 = this;
	
	            if (this.props.is_update) {
	                $.ajax(_storage.storage.notice_service.message + "?" + Math.round(+new Date())).done(function (result) {
	                    _storage.storage.Notice(undefined, result.notice);
	                    _storage.storage.notice.latest = result.notice.length;
	                    write();
	                    _this3.setState({ items: result.notice, total: Math.ceil(result.notice.length / _this3.props.step) });
	                }).fail(function (jqXHR, textStatus, errorThrown) {
	                    _this3.setState({ failed: true });
	                });
	            } else {
	                _storage.storage.Notice(function (result) {
	                    _this3.setState({ items: result.notice, total: Math.ceil(result.notice.length / _this3.props.step) });
	                });
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _theme2.default.Change("pixyii");
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;
	
	            var dom = void 0;
	            var items = this.state.items.slice(0, this.state.page * this.props.step);
	            if (this.state.failed) {
	                dom = React.createElement(
	                    'notice',
	                    null,
	                    React.createElement(
	                        'div',
	                        { className: 'failed' },
	                        React.createElement('div', { dangerouslySetInnerHTML: { __html: '<svg viewBox="0 0 1024 1024" version="1.1" p-id="2377" width="120" height="120"><defs><style type="text/css"></style></defs><path d="M512.041444 243.968477c-148.07343 0-268.049942 120.022561-268.049942 268.051989 0 147.988496 119.976512 268.053012 268.049942 268.053012 147.987472 0 268.051989-120.064516 268.051989-268.053012C780.093433 363.991038 660.028916 243.968477 512.041444 243.968477zM556.716946 690.765453 467.367989 690.765453l0-89.351004 89.348957 0L556.716946 690.765453zM556.716946 556.652989 467.367989 556.652989l0-223.37751 89.348957 0L556.716946 556.652989zM780.093433 65.22349 243.991502 65.22349c-98.774631 0-178.700985 80.101339-178.700985 178.744987l0 536.105001c0 98.730629 79.925331 178.700985 178.700985 178.700985l536.102954 0c98.600669 0 178.615027-79.969333 178.615027-178.700985L958.709483 243.968477C958.70846 145.32483 878.695125 65.22349 780.093433 65.22349zM869.44546 735.397976c0 73.994248-60.033281 134.069485-134.027529 134.069485L288.667004 869.467461c-73.994248 0-134.115534-60.075237-134.115534-134.069485L154.55147 288.599977c0-73.994248 60.121286-133.939525 134.115534-133.939525l446.750927 0c73.994248 0 134.027529 59.945277 134.027529 133.939525L869.44546 735.397976z" p-id="2378" fill="#16666f"></path></svg>' } }),
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u6D88\u606F\u4E2D\u5FC3\u6682\u65F6\u65E0\u6CD5\u8BBF\u95EE\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01'
	                        )
	                    )
	                );
	            } else if (this.state.items.length == 0) {
	                dom = React.createElement(
	                    'notice',
	                    null,
	                    React.createElement('div', { className: 'loading', dangerouslySetInnerHTML: { __html: '<svg width="105" height="105" viewBox="0 0 105 105" fill="#16666f"> <circle cx="12.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"> <animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="52.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="52.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="92.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="92.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="12.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="52.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="92.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> </svg>' } })
	                );
	            } else if (this.state.items.length > 0) {
	                dom = React.createElement(
	                    'notice',
	                    null,
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'div',
	                            { className: 'list controlbar' },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u5168\u90E8\u6807\u8BB0\u4E3A\u5DF2\u8BFB',
	                                style: { "margin": "0" }, width: '100%',
	                                color: '#fff', backgroundColor: '#FF5252',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this4.onReadallClick();
	                                } })
	                        ),
	                        React.createElement(List, { list: items, onClick: function onClick(e, id) {
	                                return _this4.onClick(e, id);
	                            } }),
	                        this.state.page < this.state.total && React.createElement(
	                            'div',
	                            { className: 'list controlbar' },
	                            React.createElement(_button2.default, { type: 'raised', text: '\u52A0\u8F7D\u66F4\u591A',
	                                style: { "margin": "0" }, width: '100%',
	                                color: '#fff', backgroundColor: '#16666f',
	                                waves: 'md-waves-effect md-waves-button',
	                                onClick: function onClick() {
	                                    return _this4.onLoadmoreClick();
	                                } })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'detail' },
	                        React.createElement(
	                            'div',
	                            { className: 'empty' },
	                            React.createElement('span', { className: 'icon' }),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u5F53\u524D\u672A\u67E5\u770B\u4EFB\u4F55\u5185\u5BB9'
	                            )
	                        )
	                    )
	                );
	            }
	            return React.createElement(
	                'div',
	                null,
	                dom
	            );
	        }
	    }]);
	
	    return Notice;
	}(React.Component);
	
	Notice.defaultProps = {
	    is_update: false,
	    step: 20
	};
	Notice.propsType = {
	    step: React.PropTypes.number,
	    is_update: React.PropTypes.bool
	};
	exports.default = Notice;
	
	var List = function (_React$Component2) {
	    _inherits(List, _React$Component2);
	
	    function List() {
	        _classCallCheck(this, List);
	
	        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	    }
	
	    _createClass(List, [{
	        key: 'onClick',
	        value: function onClick(event, id) {
	            $("list").removeClass("selected");
	            $('list[id="' + id + '"]').addClass("selected");
	            this.props.onClick(event, id);
	        }
	    }, {
	        key: 'onActive',
	        value: function onActive(event, id) {
	            $('list[id="' + id + '"]').addClass("active");
	            _storage.storage.notice.read.push(id);
	            write(function () {
	                return new Notify().Render("已设置为已读。");
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this6 = this;
	
	            var list = this.props.list.map(function (item) {
	                var active = _storage.storage.notice.read.findIndex(function (value) {
	                    return value == item.id;
	                }) != -1 ? " active" : "";
	                return React.createElement(
	                    'list',
	                    { id: item.id, className: "md-waves-effect" + active, onClick: function onClick(e) {
	                            return _this6.onClick(e, item.id);
	                        } },
	                    React.createElement(
	                        'div',
	                        { className: 'title' },
	                        item.title
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        React.createElement(
	                            'span',
	                            { style: { backgroundColor: item.category.color }, className: 'category' },
	                            item.category.name
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'date' },
	                            item.date
	                        )
	                    ),
	                    active == "" && React.createElement(
	                        'div',
	                        { className: 'meta' },
	                        React.createElement(_button2.default, { type: 'raised', text: '', shape: 'circle',
	                            icon: ss.IconPath("read_icon"),
	                            tooltip: { text: "已读" },
	                            color: '#fff', backgroundColor: 'transparent',
	                            waves: 'md-waves-effect md-waves-circle', hoverColor: 'transparent',
	                            onClick: function onClick(e) {
	                                return _this6.onActive(e, item.id);
	                            }
	                        })
	                    )
	                );
	            });
	            return React.createElement(
	                'div',
	                { className: 'list' },
	                list
	            );
	        }
	    }]);
	
	    return List;
	}(React.Component);
	
	List.defaultProps = {
	    list: [],
	    onClick: undefined
	};
	List.propTypes = {
	    list: React.PropTypes.array,
	    onClick: React.PropTypes.func
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(336)))

/***/ })

});