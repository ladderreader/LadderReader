webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	__webpack_require__(349);
	
	__webpack_require__(353);
	
	__webpack_require__(856);
	
	__webpack_require__(858);
	
	__webpack_require__(885);
	
	__webpack_require__(355);
	
	var _velocity = __webpack_require__(357);
	
	var _velocity2 = _interopRequireDefault(_velocity);
	
	var _notify = __webpack_require__(336);
	
	var _notify2 = _interopRequireDefault(_notify);
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _ac = __webpack_require__(550);
	
	var _ac2 = _interopRequireDefault(_ac);
	
	var _waves = __webpack_require__(555);
	
	var waves = _interopRequireWildcard(_waves);
	
	var _tooltip = __webpack_require__(552);
	
	var tt = _interopRequireWildcard(_tooltip);
	
	var _editor = __webpack_require__(561);
	
	var _editor2 = _interopRequireDefault(_editor);
	
	var _enhancesite = __webpack_require__(887);
	
	var _enhancesite2 = _interopRequireDefault(_enhancesite);
	
	var _storage = __webpack_require__(2);
	
	var _stylesheet = __webpack_require__(521);
	
	var ss = _interopRequireWildcard(_stylesheet);
	
	var _watch = __webpack_require__(339);
	
	var watch = _interopRequireWildcard(_watch);
	
	var _puread = __webpack_require__(343);
	
	var _puread2 = _interopRequireDefault(_puread);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log("==== simpread options page: sitemanager load ====");
	
	var cur_site = void 0,
	    org_site = void 0,
	    pr = void 0,
	    state = { name: 0, url: 0, title: 0, desc: 0, include: 0, exclude: 0, avatar: { name: 0, url: 0 }, paging: { prev: 0, next: 0 } }; // 0: success -1: faield -2: not empty0
	
	/**
	 * Entry:
	 * - storage get data form chrome storage
	 * - waves.Render()
	 * - tooltip.Render()
	 */
	_storage.storage.Read(function () {
	    console.log("simpread storage get success!", _storage.storage.sites);
	    pr = new _puread2.default(_storage.storage.sites);
	    navRender();
	    controlbarRender();
	    tt.Render("body");
	    waves.Render({ root: "body" });
	    $("body").velocity({ opacity: 1 }, { duration: 1000, complete: function complete() {
	            $("body").removeAttr("style");
	        } });
	    console.log("current puread object is   ", pr);
	});
	
	// hack code
	window.addEventListener("sitechanged", function (event) {
	    var _ref = [event.data.site.url, event.data.site, event.data.site.target, event.data.info],
	        url = _ref[0],
	        site = _ref[1],
	        type = _ref[2],
	        info = _ref[3];
	
	    org_site = [url, site];
	    siteeditorRender(url, site, type, info);
	});
	
	// hack code
	function changeSiteinfo(info) {
	    var evt = document.createEvent("Event");
	    evt.data = { info: info };
	    evt.initEvent("siteinfochanged", true, false);
	    window.dispatchEvent(evt);
	}
	
	/**
	 * navigation Render
	 */
	function navRender() {
	    var navClick = function navClick() {
	        location.href = location.origin + "/options/options.html#sites";
	    };
	    var button = React.createElement(_button2.default, { waves: 'md-waves-effect md-waves-circle', hoverColor: 'transparent', icon: ss.IconPath("gohome_icon"), onClick: function onClick() {
	            return navClick();
	        } });
	    ReactDOM.render(button, $(".header .nav")[0]);
	}
	
	/**
	 * controlbar Render
	 */
	function controlbarRender() {
	    var getCursite = function getCursite(type, value) {
	        if (value == "") return;
	        var site = pr.Getsite(type, value);
	        org_site = [site[0], site[1]];
	        site.length > 0 && siteeditorRender(site[0], site[1], type);
	        site.length > 0 && changeSiteinfo(site[1].info);
	    },
	        add = function add() {
	        var msg = cur_site ? "是否覆盖当前站点并新建立一个？" : "是否建立一个新站？";
	        new _notify2.default().Render("snackbar", msg, "新建", function () {
	            org_site = ["", ""];
	            siteeditorRender("", { name: "", title: "<title>", desc: "", include: "", exclude: [] }, "local");
	        });
	    },
	        remove = function remove() {
	        new _notify2.default().Render("snackbar", "是否删除当前站点？", "删除", function () {
	            return save("delete");
	        });
	    },
	        remote = function remote(type) {
	        save(type, "remote");
	    },
	        save = function save(type, state) {
	        if (!cur_site) {
	            new _notify2.default().Render(2, "请选择一个站点源。");
	            return;
	        }
	        if (type != "delete" && !verify()) return;
	
	        var key = cur_site.target,
	            url = cur_site.url,
	            site = pr.Cleansite(_extends({}, cur_site));
	        var flag = -1;
	
	        if (site.info && state != "remote" && cur_site.target == "person" && (type == "update" || type == "delete")) {
	            if (site.info.id.substr(0, 8) == _storage.storage.user.uid.substr(0, 8)) {
	                setTimeout(function () {
	                    return new _notify2.default().Render(2, "当前站有远程数据，请保持同步更新。");
	                }, 500);
	            }
	        }
	
	        if (type == "update" && state == "remote") {
	            site.info = _extends({}, _storage.storage.remote.info);
	            if (cur_site.target == "global") {
	                pr.Updatesite("person", org_site[0], [url, pr.Cleansite(site)]);
	            } else if (cur_site.target == "local" || cur_site.target == "custom") {
	                pr.Deletesite(cur_site.target, org_site[0], function (result) {
	                    pr.Updatesite("person", org_site[0], [url, pr.Cleansite(site)]);
	                });
	            }
	            org_site = [url, site];
	            flag = 0;
	            setTimeout(function () {
	                return new _notify2.default().Render(2, "当前站提交时会自动增加到「站点集市适配源」！");
	            }, 500);
	        } else if (type == "delete" && state == "remote") {
	            pr.Deletesite("person", org_site[0], function (result) {
	                result != -1 ? flag = 1 : new _notify2.default().Render("当前站点已删除，请勿重复提交。");
	            });
	        } else if (type == "update") {
	            pr.Updatesite(key, org_site[0], [url, pr.Cleansite(site)]);
	            org_site = [url, site];
	            flag = 0;
	            /*
	            } else if ( type == "safe" ) {
	                delete site.info;
	                pr.Updatesite( key, org_site[0], [ url, pr.Cleansite(site) ] );
	                org_site = [ url, site ];
	                flag = 0;
	            }
	            */
	        } else {
	            pr.Deletesite(key, org_site[0], function (result) {
	                result != -1 ? flag = 1 : new _notify2.default().Render("当前站点已删除，请勿重复提交。");
	            });
	        }
	        flag != -1 && _storage.storage.Writesite(pr.sites, function () {
	            console.log("current site is ", cur_site, org_site);
	            watch.SendMessage("site", true);
	            new _notify2.default().Render('\u5F53\u524D\u7AD9\u70B9' + (flag == 0 ? "更新" : "删除") + '\u6210\u529F\uFF0C\u8BF7\u5237\u65B0\u672C\u9875\u3002');
	        });
	    };
	    var doms = React.createElement(
	        'div',
	        null,
	        React.createElement(
	            'group',
	            { className: 'lab' },
	            React.createElement(
	                'group',
	                null,
	                React.createElement(_ac2.default, { placeholder: '\u5B98\u65B9\u9002\u914D\u6E90\uFF08' + _storage.storage.sites.global.length + ' \u6761\uFF09', items: formatsites(_storage.storage.sites.global), onChange: function onChange(v) {
	                        return getCursite("global", v);
	                    } })
	            ),
	            React.createElement(
	                'group',
	                null,
	                React.createElement(_ac2.default, { placeholder: '\u7AD9\u70B9\u96C6\u5E02\u9002\u914D\u6E90\uFF08' + _storage.storage.sites.person.length + ' \u6761\uFF09', items: formatsites(_storage.storage.sites.person), onChange: function onChange(v) {
	                        return getCursite("person", v);
	                    } })
	            ),
	            React.createElement(
	                'group',
	                null,
	                React.createElement(_ac2.default, { placeholder: '\u7B2C\u4E09\u65B9\u9002\u914D\u6E90\uFF08' + _storage.storage.sites.custom.length + ' \u6761\uFF09', items: formatsites(_storage.storage.sites.custom), onChange: function onChange(v) {
	                        return getCursite("custom", v);
	                    } })
	            ),
	            React.createElement(
	                'group',
	                null,
	                React.createElement(_ac2.default, { placeholder: '\u81EA\u5B9A\u4E49\u9002\u914D\u6E90\uFF08' + _storage.storage.sites.local.length + ' \u6761\uFF09', items: formatsites(_storage.storage.sites.local), onChange: function onChange(v) {
	                        return getCursite("local", v);
	                    } })
	            )
	        ),
	        React.createElement(
	            'group',
	            { className: 'lab' },
	            React.createElement(
	                'group',
	                null,
	                React.createElement(_button2.default, { type: 'raised', text: '\u65B0\u5EFA\u4E00\u4E2A\u7AD9',
	                    style: { "margin": "0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#4CAF50',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return add();
	                    } })
	            ),
	            React.createElement(
	                'group',
	                null,
	                React.createElement(_button2.default, { type: 'raised', text: '\u4FDD\u5B58\u5F53\u524D\u7AD9',
	                    style: { "margin": "0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#3F51B5',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return save("update");
	                    } })
	            ),
	            React.createElement(
	                'group',
	                null,
	                React.createElement(_button2.default, { type: 'raised', text: '\u5220\u9664\u5F53\u524D\u7AD9',
	                    style: { "margin": "0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#FF5252',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return remove();
	                    } })
	            )
	        ),
	        React.createElement(
	            'group',
	            { className: 'lab', style: { display: "none" } },
	            React.createElement('div', { className: 'sites' })
	        ),
	        React.createElement(
	            'group',
	            { className: 'lab' },
	            React.createElement(_enhancesite2.default, { uid: _storage.storage.user.uid, onUpdate: function onUpdate(t) {
	                    return remote(t);
	                } })
	        )
	    );
	    ReactDOM.render(doms, $(".custom .property")[0]);
	}
	
	/**
	 * siteeditor Render
	 */
	function siteeditorRender(url, site, type, info) {
	    $("sr-opt-read").length > 0 && $(".custom .preview").empty();
	    cur_site = pr.Safesite(site, type, url);
	
	    // set remote site( include info )
	    //storage.remote = JSON.parse(JSON.stringify( cur_site ));
	    _storage.storage.remote = cur_site;
	    info && (_storage.storage.remote.info = info);
	    changeSiteinfo(_storage.storage.remote.info);
	
	    var doms = React.createElement(_editor2.default, { site: cur_site, state: state });
	    ReactDOM.render(doms, $(".custom .preview")[0]);
	    console.log("current site is ", cur_site);
	}
	
	/**
	 * Format storage sites
	 * 
	 * @param {array} sites
	 */
	function formatsites(sites) {
	    return sites.map(function (item) {
	        return { value: item[0], name: item[0] };
	    });
	}
	
	/**
	 * Verify site editor site
	 * 
	 * @return {boolean}
	 */
	function verify() {
	    var flag = false;
	    if (["url", "name", "title", "include"].findIndex(function (key) {
	        return cur_site[key] == "";
	    }) != -1) {
	        new _notify2.default().Render(3, "【标识、域名、标题、高亮】不能为空。");
	    } else if (Object.values(state).findIndex(function (key) {
	        return typeof key == "number" && key != 0;
	    }) != -1 || state.avatar.name != 0 || state.avatar.url != 0 || state.paging.prev != 0 || state.paging.next != 0) {
	        new _notify2.default().Render(3, "请正确填写【标识、域名、标题、高亮】后再提交。");
	    } else if (cur_site.avatar[0].name != "" && cur_site.avatar[1].url == "" || cur_site.avatar[0].name == "" && cur_site.avatar[1].url != "") {
	        new _notify2.default().Render(3, "【头像的名称与地址】必须同时设定。");
	    } else if (cur_site.paging[0].prev != "" && cur_site.paging[1].next == "" || cur_site.paging[0].prev == "" && cur_site.paging[1].next != "") {
	        new _notify2.default().Render(3, "【前一页与后一页】必须同时设定。");
	    } else if (cur_site.name.startsWith("tempread::")) {
	        new _notify2.default().Render(2, "标识不能包含 tempread:: 请删除。");
	    } else if (cur_site.include.trim() == "") {
	        new _notify2.default().Render(2, "高亮区域不能为空。");
	    } else {
	        flag = true;
	    }
	    return flag;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362), __webpack_require__(514)))

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

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(348);
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _name = __webpack_require__(562);
	
	var _name2 = _interopRequireDefault(_name);
	
	var _url = __webpack_require__(563);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _include = __webpack_require__(565);
	
	var _include2 = _interopRequireDefault(_include);
	
	var _exclude = __webpack_require__(566);
	
	var _exclude2 = _interopRequireDefault(_exclude);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option editor load =====");
	
	var getName = function getName(value, items) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var item = _step.value;
	
	            if (value == "") return item.name;else if (item.value == value) return item.name;
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};
	
	var Editor = function (_React$Component) {
	    _inherits(Editor, _React$Component);
	
	    function Editor() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, Editor);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	            err_title: "",
	            err_desc: "",
	            err_avatar_name: "",
	            err_avatar_url: "",
	            err_paging_prev: "",
	            err_paging_next: ""
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Editor, [{
	        key: 'changeName',
	        value: function changeName(value, code) {
	            this.props.site.name = value;
	            this.props.state.name = code;
	            console.log("this.props.site.name = ", this.props.site.name, code);
	        }
	    }, {
	        key: 'changeURL',
	        value: function changeURL(value, code) {
	            this.props.site.url = value;
	            this.props.state.url = code;
	            console.log("this.props.option.url = ", this.props.site.url, code);
	        }
	    }, {
	        key: 'changeTitle',
	        value: function changeTitle(event) {
	            var title = event.target.value.trim();
	            if (title == "") {
	                this.setState({ err_title: "当前输入不能为空。" });
	                this.props.state.title = -2;
	            } else if ((0, _util.verifyHtml)(title)[0] != -1) {
	                this.setState({ err_title: "" });
	                this.props.site.title = title;
	                this.props.state.title = 0;
	                console.log("this.props.site.title = ", this.props.site.title);
	            } else {
	                this.setState({ err_title: "当前输入为非法。" });
	                this.props.state.title = -1;
	            }
	        }
	    }, {
	        key: 'changeDesc',
	        value: function changeDesc(event) {
	            var desc = event.target.value.trim();
	            if ((0, _util.verifyHtml)(desc)[0] != -1) {
	                this.setState({ err_desc: "" });
	                this.props.site.desc = desc;
	                this.props.state.desc = 0;
	                console.log("this.props.site.desc = ", this.props.site.desc);
	            } else {
	                this.setState({ err_desc: "当前输入为非法。" });
	                this.props.state.desc = -1;
	            }
	        }
	    }, {
	        key: 'changeInclude',
	        value: function changeInclude(value, code) {
	            this.props.site.include = value;
	            this.props.state.include = code;
	            console.log("this.props.site.include = ", this.props.site.include, code);
	        }
	    }, {
	        key: 'changeExclude',
	        value: function changeExclude(value, code) {
	            this.props.site.exclude = value;
	            this.props.state.exclude = code;
	            console.log("this.props.site.exclude = ", this.props.site.exclude, code);
	        }
	    }, {
	        key: 'changeAvatar',
	        value: function changeAvatar(idx, type, value) {
	            value = value.trim();
	            if ((0, _util.verifyHtml)(value)[0] != -1) {
	                this.setState(_defineProperty({}, 'err_avatar_' + type, ""));
	                this.props.site.avatar[idx][type] = value;
	                this.props.state.avatar[type] = 0;
	                console.log("this.props.site.avatar = ", this.props.site.avatar);
	            } else {
	                this.setState(_defineProperty({}, 'err_avatar_' + type, "当前输入为非法。"));
	                this.props.state.avatar[type] = -1;
	            }
	        }
	    }, {
	        key: 'changePaging',
	        value: function changePaging(idx, type, value) {
	            value = value.trim();
	            if ((0, _util.verifyHtml)(value)[0] != -1) {
	                this.setState(_defineProperty({}, 'err_paging_' + type, ""));
	                this.props.site.paging[idx][type] = value;
	                this.props.state.paging[type] = 0;
	                console.log("this.props.site.paging = ", this.props.site.paging);
	            } else {
	                this.setState(_defineProperty({}, 'err_paging_' + type, "当前输入为非法。"));
	                this.props.state.paging[type] = -1;
	            }
	        }
	    }, {
	        key: 'changeCSS',
	        value: function changeCSS(event) {
	            console.log("this.props.site.name = ", event.target.value.trim());
	            this.props.site.css = event.target.value.trim();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return React.createElement(
	                'sr-opt-read',
	                null,
	                React.createElement(
	                    'sr-opt-items',
	                    null,
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_name2.default, { name: this.props.site.name, changeName: function changeName(v, c) {
	                                return _this2.changeName(v, c);
	                            } })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_url2.default, { url: this.props.site.url, changeURL: function changeURL(v, c) {
	                                return _this2.changeURL(v, c);
	                            } })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, {
	                            multi: false,
	                            floatingtext: '\u6807\u9898',
	                            placeholder: '\u5FC5\u586B\uFF0C\u4E0D\u53EF\u4E3A\u7A7A\u3002',
	                            value: this.props.site.title,
	                            errortext: this.state.err_title,
	                            onChange: function onChange(event) {
	                                return _this2.changeTitle(event);
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, {
	                            multi: false,
	                            placeholder: '\u9ED8\u8BA4\u4E3A\u7A7A\u3002',
	                            floatingtext: '\u63CF\u8FF0',
	                            value: this.props.site.desc,
	                            errortext: this.state.err_desc,
	                            onChange: function onChange(event) {
	                                return _this2.changeDesc(event);
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_include2.default, { mode: 'read', include: this.props.site.include, changeInclude: function changeInclude(v, c) {
	                                return _this2.changeInclude(v, c);
	                            } })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_exclude2.default, { exclude: this.props.site.exclude, changeExclude: function changeExclude(v, c) {
	                                return _this2.changeExclude(v, c);
	                            } })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, { multi: false,
	                            placeholder: '\u9ED8\u8BA4\u4E3A\u7A7A\uFF0C\u53EA\u9650\u8BBA\u575B\u7C7B\u9875\u9762\u4F7F\u7528\u3002', floatingtext: '\u5934\u50CF\u7684\u540D\u79F0',
	                            value: this.props.site.avatar[0].name,
	                            errortext: this.state.err_avatar_name,
	                            onChange: function onChange(event) {
	                                return _this2.changeAvatar(0, "name", event.target.value);
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, { multi: false,
	                            placeholder: '\u9ED8\u8BA4\u4E3A\u7A7A\uFF0C\u53EA\u9650\u8BBA\u575B\u7C7B\u9875\u9762\u4F7F\u7528\u3002', floatingtext: '\u5934\u50CF\u7684\u5730\u5740',
	                            value: this.props.site.avatar[1].url,
	                            errortext: this.state.err_avatar_url,
	                            onChange: function onChange(event) {
	                                return _this2.changeAvatar(1, "url", event.target.value);
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, { multi: false,
	                            placeholder: '\u9ED8\u8BA4\u4E3A\u7A7A\uFF0C\u53EA\u9650\u8BBA\u575B\u7C7B\u9875\u9762\u4F7F\u7528\u3002', floatingtext: '\u524D\u4E00\u9875',
	                            value: this.props.site.paging[0].prev,
	                            errortext: this.state.err_paging_prev,
	                            onChange: function onChange(event) {
	                                return _this2.changePaging(0, "prev", event.target.value);
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, { multi: false,
	                            placeholder: '\u9ED8\u8BA4\u4E3A\u7A7A\uFF0C\u53EA\u9650\u8BBA\u575B\u7C7B\u9875\u9762\u4F7F\u7528\u3002', floatingtext: '\u540E\u4E00\u9875',
	                            value: this.props.site.paging[1].next,
	                            errortext: this.state.err_paging_next,
	                            onChange: function onChange(event) {
	                                return _this2.changePaging(1, "next", event.target.value);
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'sr-opt-gp',
	                        null,
	                        React.createElement(_textfield2.default, { multi: true,
	                            placeholder: '\u9ED8\u8BA4\u4E3A\u7A7A\uFF0C\u8F93\u5165\u7684 CSS \u53EA\u9488\u5BF9\u5F53\u524D\u7AD9\u70B9\u6709\u6548\u3002', floatingtext: '\u81EA\u5B9A\u4E49 CSS',
	                            value: this.props.site.css || "",
	                            onChange: function onChange(event) {
	                                return _this2.changeCSS(event);
	                            }
	                        })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Editor;
	}(React.Component);
	
	exports.default = Editor;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(362)))

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

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(859);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_custom.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_custom.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 859:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.header {\n    background-color: rgb(63, 81, 181);\n    opacity: 1;\n    visibility: visible;\n}\n\n.custom {\n    position: relative;\n\n    display: -ms-flexbox;\n\n    display: flex;\n    -ms-flex-flow: row;\n        flex-flow: row;\n\n    top: 65px;\n}\n\n.custom .property {\n    margin: 20px;\n    width: 450px;\n}\n\n.custom .property h1 {\n    margin-bottom: 20px;\n    font-size: 17px;\n}\n\n.custom .property group {\n    display: block;\n}\n\n.custom .property group:not(:last-child) {\n    margin-bottom: 25px;\n}\n\n.custom .preview {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n\n    margin: 20px 20px 0 0;\n    width: 100%;\n\n    box-shadow: 0 2px 5px rgba(0, 0, 0, .26);\n}", ""]);
	
	// exports


/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(886);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(352)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_sitemgr.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./options_sitemgr.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(351)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n.hide {\r\n    display: none;\r\n}\r\n\r\n.row {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-direction: row;\r\n        flex-direction: row;\r\n}\r\n\r\n.space {\r\n    width: 30px;\r\n}\r\n\r\n.box-large {\r\n    padding-top:30px;\r\n}\r\n\r\n.header {\r\n    background-color: #8BC34A;\r\n}\r\n\r\n.editor {\r\n    width: 100%;\r\n    padding-right: 20px;\r\n}\r\n\r\n.box {\r\n    margin-top: 20px;\r\n    margin-bottom: 25px;\r\n    padding: 10px;\r\n\r\n    width: 100%;\r\n\r\n    background-color: #fff;\r\n\r\n    border-radius: 2px;\r\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);\r\n}\r\n\r\n.custom .preview {\r\n    display: block;\r\n    width: 100%;\r\n    padding: 39px 24px 0px;\r\n    background-color: #fff;\r\n}\r\n\r\n.custom .preview .empty {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    padding-top: 50px;\r\n    min-height: 550px;\r\n\r\n    color: #9b9b9b;\r\n    font-size: 51.2px;\r\n    font-size: 3.2rem;\r\n}\r\n\r\n.custom .preview .empty .icon {\r\n    width: 80px;\r\n    height: 80px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-image: url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBA0LLBOn/NkLAAABtklEQVRYw+2YPyxDURTGf5WOGCwiETH7s4kaDJo2FokYMBglZ66lOtGEqWIQm9zdoJouGERIEwNlE4NE4i0iBoO0CxIMvW1f26evvJY86Tfdc3LP99137vvuTa6HqlAwzxI9X064ISrxagweE5mfOXp18CHjoCDJFHbYlBCAOiywGWzLSYmAauUIn6koI+2g/Bzb0gMMyDWoZ9pNuTQByUKLbkSyhD6PyZroYcwiN0xSoQUYJGhZ+FKjwKtlNsggeAEIFJIbnJqm7BKpSeAIgHkdjbKgRwGucgIdOrEuYXOdXKo1Fm3pF+QOQBI6Tqg3wnleb8nUVHmtRNQBQueX5AZbclmRTVFYqBcbSKpS9jtocVLcFGgK/I6AhQ/UEPHCsf09GMyU287KaBc/Xm4vF+YbBv5oDzYd8FXUWrRIQoQa+wV1hfsFmj6whTt9IPvFRv3L39Q51AR7AKzKctMHtnCnD2wE6oAbpgF4bJCA3HKbH7vcaCsSdf9ZVCrQVyfW/uIwtwdZHcXUEzuSccKt2pglpoOsfkpQPs4a0p8ROc+1KI3RAHqDdPExpIv78nPQId7plgf4BCjPbVayklPeAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTEzVDExOjQ0OjE5KzA4OjAwPYuVdQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0xM1QxMTo0NDoxOSswODowMEzWLckAAAAASUVORK5CYII= );\r\n}", ""]);
	
	// exports


/***/ }),

/***/ 887:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Notify, ReactDOM, React) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _textfield = __webpack_require__(519);
	
	var _textfield2 = _interopRequireDefault(_textfield);
	
	var _button = __webpack_require__(551);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _dropdown = __webpack_require__(622);
	
	var _dropdown2 = _interopRequireDefault(_dropdown);
	
	var _storage = __webpack_require__(2);
	
	var _runtime = __webpack_require__(593);
	
	var run = _interopRequireWildcard(_runtime);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	console.log("===== simpread option enhancesite load =====");
	
	var notify = void 0,
	    secret = void 0,
	    cur_user = {},
	    ori_user = {},
	    site_info = {},
	    user_sites = {};
	
	var category = [{ name: "科技媒体", value: "科技媒体" }, { name: "传统媒体", value: "传统媒体" }, { name: "新闻", value: "新闻" }, { name: "技术", value: "技术" }, { name: "博客", value: "博客" }, { name: "论坛", value: "论坛" }, { name: "其它", value: "其它" }];
	
	function loadingState(state, str) {
	    if (state == "init") {
	        notify = new Notify().Render({ content: "数据处理中，请稍等...", state: "loading" });
	    } else if (state == "success") {
	        notify && notify.complete();
	        notify = undefined;
	        new Notify().Render(str + "成功。");
	    } else {
	        notify && notify.complete();
	        notify = undefined;
	        new Notify().Render(2, str);
	    }
	}
	
	// hack code
	window.addEventListener("siteinfochanged", function (event) {
	    site_info = event.data.info;
	    siteinfoRender();
	});
	
	/**
	 * Get serivce url
	 * 
	 * @param {string} method name
	 */
	function getService(method) {
	    return _storage.storage.service + method;
	}
	
	/**
	 * Service Fail
	 * 
	 * @param {object} xhr 
	 * @param {string} textStatus 
	 * @param {object} error 
	 */
	function fail(xhr, textStatus, error) {
	    console.error(xhr, status, error);
	    loadingState("fail");
	}
	
	/**
	 * Get sites {name,value} items
	 * 
	 * @param {object} sites object
	 */
	function getSites(sites) {
	    var items = [];
	    Object.keys(sites).forEach(function (idx) {
	        var desc = sites[idx].global == true ? "" : "（未审核）";
	        items.push({ name: sites[idx].title + desc, value: idx });
	    });
	    return items;
	}
	
	/**
	 * Editor Plugin Empty Render
	 */
	function editorEmptyRender() {
	    $(".preview").html('<div class="empty"><span class="icon"></span><span>\u5F53\u524D\u672A\u9009\u62E9\u4EFB\u4F55\u9002\u914D\u7AD9\u70B9</span></div>');
	}
	
	/**
	 * Site info Empty Render
	 */
	function siteinfoEmptyRender() {
	    $(".siteinfo").addClass('hide');
	}
	
	/**
	 * Site info Render
	 */
	function siteinfoRender() {
	    if (site_info == undefined || $.isEmptyObject(site_info)) {
	        $(".siteinfo").addClass('hide').empty();
	    } else {
	        $(".siteinfo").removeClass('hide').empty();
	        ReactDOM.render(React.createElement(SiteInfo, null), $(".siteinfo")[0]);
	    }
	}
	
	/**
	 * Sites Render
	 */
	function sitesRender() {
	    console.log("current user all sites ", user_sites);
	    $(".property .sites").empty();
	    if ($.isEmptyObject(user_sites)) {
	        $(".property .sites").parent().hide();
	    } else {
	        $(".property .sites").parent().removeAttr("style");
	        ReactDOM.render(React.createElement(Sites, { sites: getSites(user_sites) }), $(".property .sites")[0]);
	    }
	}
	
	var Sites = function (_React$Component) {
	    _inherits(Sites, _React$Component);
	
	    function Sites() {
	        _classCallCheck(this, Sites);
	
	        return _possibleConstructorReturn(this, (Sites.__proto__ || Object.getPrototypeOf(Sites)).apply(this, arguments));
	    }
	
	    _createClass(Sites, [{
	        key: 'onChange',
	        value: function onChange(value, name) {
	            if (!$.isEmptyObject(user_sites[value])) {
	                var temp = user_sites[value];
	                site_info = JSON.parse(JSON.stringify(temp));
	
	                delete site_info.site;
	                siteinfoRender();
	
	                // hack code
	                var evt = document.createEvent("Event");
	                evt.data = {
	                    site: temp.site,
	                    info: site_info
	                };
	                evt.initEvent("sitechanged", true, false);
	                window.dispatchEvent(evt);
	            } else new Notify().Render(2, "获取站点信息时发生了错误，请重新绑定获取。");
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var items = this.props.sites;
	            return items.length > 0 ? React.createElement(
	                'div',
	                null,
	                React.createElement(_dropdown2.default, { name: '\u5171\u8BA1 ' + items.length + ' \u6761\u6570\u636E\uFF0C\u4E0B\u62C9\u67E5\u770B\u8BE6\u7EC6\u4FE1\u606F', items: items, width: '100%', onChange: function onChange(v, n) {
	                        return _this2.onChange(v, n);
	                    } })
	            ) : React.createElement('div', null);
	        }
	    }]);
	
	    return Sites;
	}(React.Component);
	
	var SiteInfo = function (_React$Component2) {
	    _inherits(SiteInfo, _React$Component2);
	
	    function SiteInfo() {
	        _classCallCheck(this, SiteInfo);
	
	        return _possibleConstructorReturn(this, (SiteInfo.__proto__ || Object.getPrototypeOf(SiteInfo)).apply(this, arguments));
	    }
	
	    _createClass(SiteInfo, [{
	        key: 'onChange',
	        value: function onChange(id, event) {
	            site_info[id] = event.target.value;
	        }
	    }, {
	        key: 'onDropdownChange',
	        value: function onDropdownChange(value) {
	            site_info.category = value;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;
	
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'row box-large' },
	                    React.createElement(_textfield2.default, { value: site_info.id,
	                        multi: false, floatingtext: 'ID', disable: true
	                    }),
	                    React.createElement('span', { className: 'space' }),
	                    React.createElement(_textfield2.default, { value: site_info.title,
	                        multi: false, floatingtext: '\u5F53\u524D\u7AD9\u70B9\u540D\u79F0', disable: false,
	                        onChange: function onChange(event) {
	                            return _this4.onChange("title", event);
	                        }
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'row box-large' },
	                    React.createElement(_textfield2.default, { value: site_info.create,
	                        multi: false, floatingtext: '\u5EFA\u7ACB\u65F6\u95F4', disable: true,
	                        onChange: function onChange(event) {
	                            return _this4.onChange("create", event);
	                        }
	                    }),
	                    React.createElement('span', { className: 'space' }),
	                    React.createElement(_textfield2.default, { value: site_info.update == "" ? "没有任何更新时间" : site_info.update,
	                        multi: false, floatingtext: '\u66F4\u65B0\u65F6\u95F4', disable: true,
	                        onChange: function onChange(event) {
	                            return _this4.onChange("update", event);
	                        }
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'row box-large' },
	                    React.createElement(_textfield2.default, { value: site_info.color,
	                        multi: false, floatingtext: '\u524D\u666F\u8272', disable: false,
	                        onChange: function onChange(event) {
	                            return _this4.onChange("color", event);
	                        }
	                    }),
	                    React.createElement('span', { className: 'space' }),
	                    React.createElement(_textfield2.default, { value: site_info.bgColor,
	                        multi: false, floatingtext: '\u80CC\u666F\u8272', disable: false,
	                        onChange: function onChange(event) {
	                            return _this4.onChange("bgColor", event);
	                        }
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'row box-large' },
	                    React.createElement(_textfield2.default, { value: site_info.global == true || site_info.global == "true" ? "当前站点已经审核通过" : "当前站点未经审核",
	                        multi: false, floatingtext: '\u662F\u5426\u5DF2\u7ECF\u5BA1\u6838', disable: true
	                    }),
	                    React.createElement('span', { className: 'space' }),
	                    React.createElement(_dropdown2.default, { name: site_info.category, items: category, width: '100%', onChange: function onChange(v) {
	                            return _this4.onDropdownChange(v);
	                        } })
	                )
	            );
	        }
	    }]);
	
	    return SiteInfo;
	}(React.Component);
	
	var Import = function (_React$Component3) {
	    _inherits(Import, _React$Component3);
	
	    function Import() {
	        var _ref;
	
	        var _temp, _this5, _ret;
	
	        _classCallCheck(this, Import);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this5 = _possibleConstructorReturn(this, (_ref = Import.__proto__ || Object.getPrototypeOf(Import)).call.apply(_ref, [this].concat(args))), _this5), _this5.state = {
	            login: false
	        }, _temp), _possibleConstructorReturn(_this5, _ret);
	    }
	
	    _createClass(Import, [{
	        key: 'onSecretChange',
	        value: function onSecretChange(event) {
	            secret = event.target.value;
	        }
	    }, {
	        key: 'login',
	        value: function login() {
	            var _this6 = this;
	
	            loadingState("init");
	            $.ajax({
	                url: getService("/users/service/get/" + this.props.uid),
	                type: "POST",
	                data: { secret: secret }
	            }).done(function (result, textStatus, jqXHR) {
	                if (result.code == 200) {
	                    loadingState("success", "登录");
	                    cur_user = result.data;
	                    ori_user = $.extend(true, {}, cur_user);
	                    console.log("current user is ", cur_user);
	                    _this6.getSites(_this6.props.uid, "all");
	                    _this6.setState({ login: true });
	                } else if (result.code == 401) {
	                    loadingState("faile", "管理员登陆失败，请验证管理员密匙！");
	                } else loadingState("faile", "获取后台服务失败，请稍后再试！");
	            }).fail(fail);
	        }
	    }, {
	        key: 'getSites',
	        value: function getSites(uid, id) {
	            loadingState("init");
	            $.ajax({
	                url: getService("/sites/service/get/" + id),
	                data: { uid: uid },
	                type: "POST"
	            }).done(function (result, textStatus, jqXHR) {
	                loadingState("success", "获取当前用户全部站点");
	                if (result.code == 200) {
	                    result.data.forEach(function (item) {
	                        user_sites[item.id] = item;
	                    });
	                    sitesRender();
	                } else if (result.code == 404) {
	                    loadingState("faile", "当前用户没有任何站点，可以先新建 或 上传一个站点。");
	                } else loadingState("faile", "获取当前用户的站点获取失败，请稍后再试！");
	            }).fail(fail);
	        }
	    }, {
	        key: 'insert',
	        value: function insert(method, site) {
	            var _this7 = this;
	
	            loadingState("init");
	            if (site.id.substr(0, 8) != cur_user.uid.substr(0, 8)) {
	                new Notify().Render(2, "注意：当前站并不是（管理员）的站。");
	                delete site.uid;
	            }
	            $.ajax({
	                url: getService("/sites/service/" + method),
	                type: "POST",
	                data: site
	            }).done(function (result, textStatus, jqXHR) {
	                loadingState("success", "已提交");
	                if (result.code == 201) {
	
	                    _storage.storage.remote.info.id = result.data.id;
	                    _storage.storage.remote.info.create = result.data.create;
	                    _storage.storage.remote.info.update = result.data.update;
	                    delete _storage.storage.remote.info.global;
	                    delete _storage.storage.remote.info.release;
	                    siteinfoRender();
	
	                    user_sites[result.data.id] = result.data;
	                    sitesRender();
	
	                    _this7.props.onUpdate && _this7.props.onUpdate("update");
	                } else loadingState("faile", "提交失败，请稍后再试！");
	            }).fail(fail);
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(id) {
	            var _this8 = this;
	
	            loadingState("init");
	            $.ajax({
	                url: getService("/sites/service/delete/" + id),
	                type: "POST",
	                data: { uid: cur_user.uid }
	            }).done(function (result, textStatus, jqXHR) {
	                if (result.code == 204) {
	                    loadingState("success", "已删除");
	                    delete user_sites[site_info.id];
	                    sitesRender();
	                    editorEmptyRender();
	                    siteinfoEmptyRender();
	                    //this.props.onUpdate && this.props.onUpdate( "safe" );
	                    new Notify().Render({ mode: "snackbar", content: "是否也删除本地站？", action: "确认", cancel: "取消", callback: function callback(type) {
	                            type != "cancel" && _this8.props.onUpdate && _this8.props.onUpdate("delete");
	                        } });
	                } else loadingState("faile", "删除失败，请稍后再试！");
	            }).fail(fail);
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var _this9 = this;
	
	            var insert = function insert() {
	                var temp = JSON.parse(JSON.stringify(_storage.storage.remote)),
	                    update = temp.info,
	                    method = update.id.startsWith("new::") ? "add" : "update";
	                delete temp.info;
	                update.uid = cur_user.uid;
	                update.id = update.id.replace(/^new::/, "");
	                update.site = temp;
	                delete update.site.target;
	                _this9.insert(method, update);
	            };
	            if ($.isEmptyObject(cur_user)) {
	                new Notify().Render({ mode: "snackbar", content: "需要先登录到服务器后才能提交！", action: "登录", cancel: "取消", callback: function callback(type) {
	                        type == "action" && _this9.login();
	                        return;
	                    } });
	                return;
	            }
	            if (!_storage.storage.remote) {
	                new Notify().Render("当前没有选择站点，请通过 新建 或选择一个本地站点。");
	                return;
	            }
	            if (_storage.storage.remote.name == "tempread::") {
	                new Notify().Render(2, "新建的站需要保存刷新后才能提交！");
	                return;
	            }
	            if (!_storage.storage.remote.info) {
	                new Notify().Render("上传站点时需要录入一些必要信息。");
	                site_info = { domain: run.ID("site"), title: "", category: "其它", create: "<无需填写，自动生成>", update: "", global: false, release: false, color: "#fff", bgColor: "#00bcd4" };
	                site_info.id = "new::" + _storage.storage.user.uid.substr(0, 8) + "-" + site_info.domain;
	                _storage.storage.remote.info = site_info;
	                siteinfoRender();
	            } else if (site_info.title == "") {
	                new Notify().Render(2, "请最好填入当作站点的名称。");
	            } else {
	                if (!_storage.storage.remote.info.id.startsWith("new::") && _storage.storage.remote.info.id.substr(0, 8) != cur_user.uid.substr(0, 8)) {
	                    new Notify().Render({ mode: "snackbar", content: "当前站点并不是由你建立，确定修改？", action: "确定", cancel: "取消", callback: function callback(type) {
	                            if (type == "cancel") return;
	                            site_info.id = "new::" + _storage.storage.user.uid.substr(0, 8) + "-" + site_info.domain;
	                            site_info.release = false;
	                            site_info.global = false;
	                            _storage.storage.remote.info = site_info;
	                            insert();
	                        } });
	                } else insert();
	            }
	            console.log("current site is ", _storage.storage.remote.info, site_info);
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            var _this10 = this;
	
	            if (!_storage.storage.remote || $.isEmptyObject(site_info)) {
	                new Notify().Render("当前没有选择站点，请通过 新建 或选择一个本地站点。");
	                return;
	            }
	            if (site_info.release == true && cur_user.rule != 0) {
	                new Notify().Render("当前站点已审核通过，无法删除，请联络管理员。");
	                return;
	            }
	            new Notify().Render({ mode: "snackbar", content: "确定（从服务器上）删除（包括以审核的表）？", action: "确认", cancel: "取消", callback: function callback(type) {
	                    if (type == "cancel") return;
	                    _this10.delete(site_info.id);
	                } });
	        }
	    }, {
	        key: 'permit',
	        value: function permit() {
	            if (!_storage.storage.remote || $.isEmptyObject(site_info)) {
	                new Notify().Render("当前没有选择站点，请通过 新建 或选择一个本地站点。");
	                return;
	            }
	            if (site_info.global == true || site_info.global == "true") {
	                new Notify().Render("当前站点已经审核通过，请勿重复提交");
	                return;
	            }
	            new Notify().Render("snackbar", "是否确认审核通过？", "确认", function () {
	                loadingState("init");
	                $.ajax({
	                    url: getService("/sites/service/permit/" + site_info.id),
	                    type: "GET"
	                }).done(function (result, textStatus, jqXHR) {
	                    if (result.code == 201) {
	                        loadingState("success", "当前站点已审核");
	                        console.log(result.data);
	
	                        user_sites[result.data.id] = result.data;
	                        sitesRender();
	
	                        site_info = result.data;
	                        _storage.storage.remote.info = site_info;
	                        siteinfoRender();
	                    } else loadingState("faile", "删除失败，请稍后再试！");
	                }).fail(fail);
	            });
	        }
	    }, {
	        key: 'logout',
	        value: function logout() {
	            location.reload();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this11 = this;
	
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { style: { display: location.search == '?rule=administrator' ? 'block' : 'none' } },
	                    React.createElement(_textfield2.default, {
	                        multi: false, placeholder: '\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u5BC6\u5319',
	                        onChange: function onChange(event) {
	                            return _this11.onSecretChange(event);
	                        }
	                    })
	                ),
	                this.state.login ? React.createElement(_button2.default, { type: 'raised', text: '\u9000\u51FA\u767B\u5F55',
	                    style: { "margin": "0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#1976d2',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return _this11.logout();
	                    } }) : React.createElement(_button2.default, { type: 'raised', text: '\u767B\u5F55\u5230\u670D\u52A1\u5668',
	                    style: { "margin": "0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#FF5252',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return _this11.login();
	                    } }),
	                React.createElement(_button2.default, { type: 'raised', text: '\u63D0\u4EA4\u5230\u670D\u52A1\u5668',
	                    style: { "margin": "25px 0 0 0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#4CAF50',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return _this11.update();
	                    } }),
	                this.state.login && cur_user.rule == 0 && React.createElement(_button2.default, { type: 'raised', text: '\u5BA1\u6838\u5F53\u524D\u7AD9\u70B9',
	                    style: { "margin": "25px 0 0 0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#3F51B5',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return _this11.permit();
	                    } }),
	                this.state.login && React.createElement(_button2.default, { type: 'raised', text: '\u5220\u9664\u5F53\u524D\u7AD9\u70B9',
	                    style: { "margin": "25px 0 0 0" }, width: '100%',
	                    color: '#fff', backgroundColor: '#1976d2',
	                    waves: 'md-waves-effect md-waves-button',
	                    onClick: function onClick() {
	                        return _this11.remove();
	                    } })
	            );
	        }
	    }]);
	
	    return Import;
	}(React.Component);
	
	exports.default = Import;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(336), __webpack_require__(514), __webpack_require__(362)))

/***/ })

});