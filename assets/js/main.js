/**
 * /*!
 * Isotope PACKAGED v3.0.4
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 *
 * @format
 */

!(function (t, e) {
	'function' == typeof define && define.amd
		? define('jquery-bridget/jquery-bridget', ['jquery'], function (i) {
				return e(t, i);
		  })
		: 'object' == typeof module && module.exports
		? (module.exports = e(t, require('jquery')))
		: (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
	'use strict';
	function i(i, s, a) {
		function u(t, e, o) {
			var n,
				s = '$().' + i + '("' + e + '")';
			return (
				t.each(function (t, u) {
					var h = a.data(u, i);
					if (!h)
						return void r(
							i + ' not initialized. Cannot call methods, i.e. ' + s
						);
					var d = h[e];
					if (!d || '_' == e.charAt(0))
						return void r(s + ' is not a valid method');
					var l = d.apply(h, o);
					n = void 0 === n ? l : n;
				}),
				void 0 !== n ? n : t
			);
		}
		function h(t, e) {
			t.each(function (t, o) {
				var n = a.data(o, i);
				n ? (n.option(e), n._init()) : ((n = new s(o, e)), a.data(o, i, n));
			});
		}
		(a = a || e || t.jQuery),
			a &&
				(s.prototype.option ||
					(s.prototype.option = function (t) {
						a.isPlainObject(t) &&
							(this.options = a.extend(!0, this.options, t));
					}),
				(a.fn[i] = function (t) {
					if ('string' == typeof t) {
						var e = n.call(arguments, 1);
						return u(this, t, e);
					}
					return h(this, t), this;
				}),
				o(a));
	}
	function o(t) {
		!t || (t && t.bridget) || (t.bridget = i);
	}
	var n = Array.prototype.slice,
		s = t.console,
		r =
			'undefined' == typeof s
				? function () {}
				: function (t) {
						s.error(t);
				  };
	return o(e || t.jQuery), i;
}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('ev-emitter/ev-emitter', e)
			: 'object' == typeof module && module.exports
			? (module.exports = e())
			: (t.EvEmitter = e());
	})('undefined' != typeof window ? window : this, function () {
		function t() {}
		var e = t.prototype;
		return (
			(e.on = function (t, e) {
				if (t && e) {
					var i = (this._events = this._events || {}),
						o = (i[t] = i[t] || []);
					return o.indexOf(e) == -1 && o.push(e), this;
				}
			}),
			(e.once = function (t, e) {
				if (t && e) {
					this.on(t, e);
					var i = (this._onceEvents = this._onceEvents || {}),
						o = (i[t] = i[t] || {});
					return (o[e] = !0), this;
				}
			}),
			(e.off = function (t, e) {
				var i = this._events && this._events[t];
				if (i && i.length) {
					var o = i.indexOf(e);
					return o != -1 && i.splice(o, 1), this;
				}
			}),
			(e.emitEvent = function (t, e) {
				var i = this._events && this._events[t];
				if (i && i.length) {
					var o = 0,
						n = i[o];
					e = e || [];
					for (var s = this._onceEvents && this._onceEvents[t]; n; ) {
						var r = s && s[n];
						r && (this.off(t, n), delete s[n]),
							n.apply(this, e),
							(o += r ? 0 : 1),
							(n = i[o]);
					}
					return this;
				}
			}),
			t
		);
	}),
	(function (t, e) {
		'use strict';
		'function' == typeof define && define.amd
			? define('get-size/get-size', [], function () {
					return e();
			  })
			: 'object' == typeof module && module.exports
			? (module.exports = e())
			: (t.getSize = e());
	})(window, function () {
		'use strict';
		function t(t) {
			var e = parseFloat(t),
				i = t.indexOf('%') == -1 && !isNaN(e);
			return i && e;
		}
		function e() {}
		function i() {
			for (
				var t = {
						width: 0,
						height: 0,
						innerWidth: 0,
						innerHeight: 0,
						outerWidth: 0,
						outerHeight: 0,
					},
					e = 0;
				e < h;
				e++
			) {
				var i = u[e];
				t[i] = 0;
			}
			return t;
		}
		function o(t) {
			var e = getComputedStyle(t);
			return (
				e ||
					a(
						'Style returned ' +
							e +
							'. Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1'
					),
				e
			);
		}
		function n() {
			if (!d) {
				d = !0;
				var e = document.createElement('div');
				(e.style.width = '200px'),
					(e.style.padding = '1px 2px 3px 4px'),
					(e.style.borderStyle = 'solid'),
					(e.style.borderWidth = '1px 2px 3px 4px'),
					(e.style.boxSizing = 'border-box');
				var i = document.body || document.documentElement;
				i.appendChild(e);
				var n = o(e);
				(s.isBoxSizeOuter = r = 200 == t(n.width)), i.removeChild(e);
			}
		}
		function s(e) {
			if (
				(n(),
				'string' == typeof e && (e = document.querySelector(e)),
				e && 'object' == typeof e && e.nodeType)
			) {
				var s = o(e);
				if ('none' == s.display) return i();
				var a = {};
				(a.width = e.offsetWidth), (a.height = e.offsetHeight);
				for (
					var d = (a.isBorderBox = 'border-box' == s.boxSizing), l = 0;
					l < h;
					l++
				) {
					var f = u[l],
						c = s[f],
						m = parseFloat(c);
					a[f] = isNaN(m) ? 0 : m;
				}
				var p = a.paddingLeft + a.paddingRight,
					y = a.paddingTop + a.paddingBottom,
					g = a.marginLeft + a.marginRight,
					v = a.marginTop + a.marginBottom,
					_ = a.borderLeftWidth + a.borderRightWidth,
					I = a.borderTopWidth + a.borderBottomWidth,
					z = d && r,
					x = t(s.width);
				x !== !1 && (a.width = x + (z ? 0 : p + _));
				var S = t(s.height);
				return (
					S !== !1 && (a.height = S + (z ? 0 : y + I)),
					(a.innerWidth = a.width - (p + _)),
					(a.innerHeight = a.height - (y + I)),
					(a.outerWidth = a.width + g),
					(a.outerHeight = a.height + v),
					a
				);
			}
		}
		var r,
			a =
				'undefined' == typeof console
					? e
					: function (t) {
							console.error(t);
					  },
			u = [
				'paddingLeft',
				'paddingRight',
				'paddingTop',
				'paddingBottom',
				'marginLeft',
				'marginRight',
				'marginTop',
				'marginBottom',
				'borderLeftWidth',
				'borderRightWidth',
				'borderTopWidth',
				'borderBottomWidth',
			],
			h = u.length,
			d = !1;
		return s;
	}),
	(function (t, e) {
		'use strict';
		'function' == typeof define && define.amd
			? define('desandro-matches-selector/matches-selector', e)
			: 'object' == typeof module && module.exports
			? (module.exports = e())
			: (t.matchesSelector = e());
	})(window, function () {
		'use strict';
		var t = (function () {
			var t = window.Element.prototype;
			if (t.matches) return 'matches';
			if (t.matchesSelector) return 'matchesSelector';
			for (var e = ['webkit', 'moz', 'ms', 'o'], i = 0; i < e.length; i++) {
				var o = e[i],
					n = o + 'MatchesSelector';
				if (t[n]) return n;
			}
		})();
		return function (e, i) {
			return e[t](i);
		};
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('fizzy-ui-utils/utils', [
					'desandro-matches-selector/matches-selector',
			  ], function (i) {
					return e(t, i);
			  })
			: 'object' == typeof module && module.exports
			? (module.exports = e(t, require('desandro-matches-selector')))
			: (t.fizzyUIUtils = e(t, t.matchesSelector));
	})(window, function (t, e) {
		var i = {};
		(i.extend = function (t, e) {
			for (var i in e) t[i] = e[i];
			return t;
		}),
			(i.modulo = function (t, e) {
				return ((t % e) + e) % e;
			}),
			(i.makeArray = function (t) {
				var e = [];
				if (Array.isArray(t)) e = t;
				else if (t && 'object' == typeof t && 'number' == typeof t.length)
					for (var i = 0; i < t.length; i++) e.push(t[i]);
				else e.push(t);
				return e;
			}),
			(i.removeFrom = function (t, e) {
				var i = t.indexOf(e);
				i != -1 && t.splice(i, 1);
			}),
			(i.getParent = function (t, i) {
				for (; t.parentNode && t != document.body; )
					if (((t = t.parentNode), e(t, i))) return t;
			}),
			(i.getQueryElement = function (t) {
				return 'string' == typeof t ? document.querySelector(t) : t;
			}),
			(i.handleEvent = function (t) {
				var e = 'on' + t.type;
				this[e] && this[e](t);
			}),
			(i.filterFindElements = function (t, o) {
				t = i.makeArray(t);
				var n = [];
				return (
					t.forEach(function (t) {
						if (t instanceof HTMLElement) {
							if (!o) return void n.push(t);
							e(t, o) && n.push(t);
							for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)
								n.push(i[s]);
						}
					}),
					n
				);
			}),
			(i.debounceMethod = function (t, e, i) {
				var o = t.prototype[e],
					n = e + 'Timeout';
				t.prototype[e] = function () {
					var t = this[n];
					t && clearTimeout(t);
					var e = arguments,
						s = this;
					this[n] = setTimeout(function () {
						o.apply(s, e), delete s[n];
					}, i || 100);
				};
			}),
			(i.docReady = function (t) {
				var e = document.readyState;
				'complete' == e || 'interactive' == e
					? setTimeout(t)
					: document.addEventListener('DOMContentLoaded', t);
			}),
			(i.toDashed = function (t) {
				return t
					.replace(/(.)([A-Z])/g, function (t, e, i) {
						return e + '-' + i;
					})
					.toLowerCase();
			});
		var o = t.console;
		return (
			(i.htmlInit = function (e, n) {
				i.docReady(function () {
					var s = i.toDashed(n),
						r = 'data-' + s,
						a = document.querySelectorAll('[' + r + ']'),
						u = document.querySelectorAll('.js-' + s),
						h = i.makeArray(a).concat(i.makeArray(u)),
						d = r + '-options',
						l = t.jQuery;
					h.forEach(function (t) {
						var i,
							s = t.getAttribute(r) || t.getAttribute(d);
						try {
							i = s && JSON.parse(s);
						} catch (a) {
							return void (
								o &&
								o.error('Error parsing ' + r + ' on ' + t.className + ': ' + a)
							);
						}
						var u = new e(t, i);
						l && l.data(t, n, u);
					});
				});
			}),
			i
		);
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('outlayer/item', [
					'ev-emitter/ev-emitter',
					'get-size/get-size',
			  ], e)
			: 'object' == typeof module && module.exports
			? (module.exports = e(require('ev-emitter'), require('get-size')))
			: ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
	})(window, function (t, e) {
		'use strict';
		function i(t) {
			for (var e in t) return !1;
			return (e = null), !0;
		}
		function o(t, e) {
			t &&
				((this.element = t),
				(this.layout = e),
				(this.position = { x: 0, y: 0 }),
				this._create());
		}
		function n(t) {
			return t.replace(/([A-Z])/g, function (t) {
				return '-' + t.toLowerCase();
			});
		}
		var s = document.documentElement.style,
			r = 'string' == typeof s.transition ? 'transition' : 'WebkitTransition',
			a = 'string' == typeof s.transform ? 'transform' : 'WebkitTransform',
			u = {
				WebkitTransition: 'webkitTransitionEnd',
				transition: 'transitionend',
			}[r],
			h = {
				transform: a,
				transition: r,
				transitionDuration: r + 'Duration',
				transitionProperty: r + 'Property',
				transitionDelay: r + 'Delay',
			},
			d = (o.prototype = Object.create(t.prototype));
		(d.constructor = o),
			(d._create = function () {
				(this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
					this.css({ position: 'absolute' });
			}),
			(d.handleEvent = function (t) {
				var e = 'on' + t.type;
				this[e] && this[e](t);
			}),
			(d.getSize = function () {
				this.size = e(this.element);
			}),
			(d.css = function (t) {
				var e = this.element.style;
				for (var i in t) {
					var o = h[i] || i;
					e[o] = t[i];
				}
			}),
			(d.getPosition = function () {
				var t = getComputedStyle(this.element),
					e = this.layout._getOption('originLeft'),
					i = this.layout._getOption('originTop'),
					o = t[e ? 'left' : 'right'],
					n = t[i ? 'top' : 'bottom'],
					s = this.layout.size,
					r =
						o.indexOf('%') != -1
							? (parseFloat(o) / 100) * s.width
							: parseInt(o, 10),
					a =
						n.indexOf('%') != -1
							? (parseFloat(n) / 100) * s.height
							: parseInt(n, 10);
				(r = isNaN(r) ? 0 : r),
					(a = isNaN(a) ? 0 : a),
					(r -= e ? s.paddingLeft : s.paddingRight),
					(a -= i ? s.paddingTop : s.paddingBottom),
					(this.position.x = r),
					(this.position.y = a);
			}),
			(d.layoutPosition = function () {
				var t = this.layout.size,
					e = {},
					i = this.layout._getOption('originLeft'),
					o = this.layout._getOption('originTop'),
					n = i ? 'paddingLeft' : 'paddingRight',
					s = i ? 'left' : 'right',
					r = i ? 'right' : 'left',
					a = this.position.x + t[n];
				(e[s] = this.getXValue(a)), (e[r] = '');
				var u = o ? 'paddingTop' : 'paddingBottom',
					h = o ? 'top' : 'bottom',
					d = o ? 'bottom' : 'top',
					l = this.position.y + t[u];
				(e[h] = this.getYValue(l)),
					(e[d] = ''),
					this.css(e),
					this.emitEvent('layout', [this]);
			}),
			(d.getXValue = function (t) {
				var e = this.layout._getOption('horizontal');
				return this.layout.options.percentPosition && !e
					? (t / this.layout.size.width) * 100 + '%'
					: t + 'px';
			}),
			(d.getYValue = function (t) {
				var e = this.layout._getOption('horizontal');
				return this.layout.options.percentPosition && e
					? (t / this.layout.size.height) * 100 + '%'
					: t + 'px';
			}),
			(d._transitionTo = function (t, e) {
				this.getPosition();
				var i = this.position.x,
					o = this.position.y,
					n = parseInt(t, 10),
					s = parseInt(e, 10),
					r = n === this.position.x && s === this.position.y;
				if ((this.setPosition(t, e), r && !this.isTransitioning))
					return void this.layoutPosition();
				var a = t - i,
					u = e - o,
					h = {};
				(h.transform = this.getTranslate(a, u)),
					this.transition({
						to: h,
						onTransitionEnd: { transform: this.layoutPosition },
						isCleaning: !0,
					});
			}),
			(d.getTranslate = function (t, e) {
				var i = this.layout._getOption('originLeft'),
					o = this.layout._getOption('originTop');
				return (
					(t = i ? t : -t),
					(e = o ? e : -e),
					'translate3d(' + t + 'px, ' + e + 'px, 0)'
				);
			}),
			(d.goTo = function (t, e) {
				this.setPosition(t, e), this.layoutPosition();
			}),
			(d.moveTo = d._transitionTo),
			(d.setPosition = function (t, e) {
				(this.position.x = parseInt(t, 10)),
					(this.position.y = parseInt(e, 10));
			}),
			(d._nonTransition = function (t) {
				this.css(t.to), t.isCleaning && this._removeStyles(t.to);
				for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
			}),
			(d.transition = function (t) {
				if (!parseFloat(this.layout.options.transitionDuration))
					return void this._nonTransition(t);
				var e = this._transn;
				for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
				for (i in t.to)
					(e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
				if (t.from) {
					this.css(t.from);
					var o = this.element.offsetHeight;
					o = null;
				}
				this.enableTransition(t.to),
					this.css(t.to),
					(this.isTransitioning = !0);
			});
		var l = 'opacity,' + n(a);
		(d.enableTransition = function () {
			if (!this.isTransitioning) {
				var t = this.layout.options.transitionDuration;
				(t = 'number' == typeof t ? t + 'ms' : t),
					this.css({
						transitionProperty: l,
						transitionDuration: t,
						transitionDelay: this.staggerDelay || 0,
					}),
					this.element.addEventListener(u, this, !1);
			}
		}),
			(d.onwebkitTransitionEnd = function (t) {
				this.ontransitionend(t);
			}),
			(d.onotransitionend = function (t) {
				this.ontransitionend(t);
			});
		var f = { '-webkit-transform': 'transform' };
		(d.ontransitionend = function (t) {
			if (t.target === this.element) {
				var e = this._transn,
					o = f[t.propertyName] || t.propertyName;
				if (
					(delete e.ingProperties[o],
					i(e.ingProperties) && this.disableTransition(),
					o in e.clean &&
						((this.element.style[t.propertyName] = ''), delete e.clean[o]),
					o in e.onEnd)
				) {
					var n = e.onEnd[o];
					n.call(this), delete e.onEnd[o];
				}
				this.emitEvent('transitionEnd', [this]);
			}
		}),
			(d.disableTransition = function () {
				this.removeTransitionStyles(),
					this.element.removeEventListener(u, this, !1),
					(this.isTransitioning = !1);
			}),
			(d._removeStyles = function (t) {
				var e = {};
				for (var i in t) e[i] = '';
				this.css(e);
			});
		var c = {
			transitionProperty: '',
			transitionDuration: '',
			transitionDelay: '',
		};
		return (
			(d.removeTransitionStyles = function () {
				this.css(c);
			}),
			(d.stagger = function (t) {
				(t = isNaN(t) ? 0 : t), (this.staggerDelay = t + 'ms');
			}),
			(d.removeElem = function () {
				this.element.parentNode.removeChild(this.element),
					this.css({ display: '' }),
					this.emitEvent('remove', [this]);
			}),
			(d.remove = function () {
				return r && parseFloat(this.layout.options.transitionDuration)
					? (this.once('transitionEnd', function () {
							this.removeElem();
					  }),
					  void this.hide())
					: void this.removeElem();
			}),
			(d.reveal = function () {
				delete this.isHidden, this.css({ display: '' });
				var t = this.layout.options,
					e = {},
					i = this.getHideRevealTransitionEndProperty('visibleStyle');
				(e[i] = this.onRevealTransitionEnd),
					this.transition({
						from: t.hiddenStyle,
						to: t.visibleStyle,
						isCleaning: !0,
						onTransitionEnd: e,
					});
			}),
			(d.onRevealTransitionEnd = function () {
				this.isHidden || this.emitEvent('reveal');
			}),
			(d.getHideRevealTransitionEndProperty = function (t) {
				var e = this.layout.options[t];
				if (e.opacity) return 'opacity';
				for (var i in e) return i;
			}),
			(d.hide = function () {
				(this.isHidden = !0), this.css({ display: '' });
				var t = this.layout.options,
					e = {},
					i = this.getHideRevealTransitionEndProperty('hiddenStyle');
				(e[i] = this.onHideTransitionEnd),
					this.transition({
						from: t.visibleStyle,
						to: t.hiddenStyle,
						isCleaning: !0,
						onTransitionEnd: e,
					});
			}),
			(d.onHideTransitionEnd = function () {
				this.isHidden &&
					(this.css({ display: 'none' }), this.emitEvent('hide'));
			}),
			(d.destroy = function () {
				this.css({
					position: '',
					left: '',
					right: '',
					top: '',
					bottom: '',
					transition: '',
					transform: '',
				});
			}),
			o
		);
	}),
	(function (t, e) {
		'use strict';
		'function' == typeof define && define.amd
			? define('outlayer/outlayer', [
					'ev-emitter/ev-emitter',
					'get-size/get-size',
					'fizzy-ui-utils/utils',
					'./item',
			  ], function (i, o, n, s) {
					return e(t, i, o, n, s);
			  })
			: 'object' == typeof module && module.exports
			? (module.exports = e(
					t,
					require('ev-emitter'),
					require('get-size'),
					require('fizzy-ui-utils'),
					require('./item')
			  ))
			: (t.Outlayer = e(
					t,
					t.EvEmitter,
					t.getSize,
					t.fizzyUIUtils,
					t.Outlayer.Item
			  ));
	})(window, function (t, e, i, o, n) {
		'use strict';
		function s(t, e) {
			var i = o.getQueryElement(t);
			if (!i)
				return void (
					u &&
					u.error(
						'Bad element for ' + this.constructor.namespace + ': ' + (i || t)
					)
				);
			(this.element = i),
				h && (this.$element = h(this.element)),
				(this.options = o.extend({}, this.constructor.defaults)),
				this.option(e);
			var n = ++l;
			(this.element.outlayerGUID = n), (f[n] = this), this._create();
			var s = this._getOption('initLayout');
			s && this.layout();
		}
		function r(t) {
			function e() {
				t.apply(this, arguments);
			}
			return (
				(e.prototype = Object.create(t.prototype)),
				(e.prototype.constructor = e),
				e
			);
		}
		function a(t) {
			if ('number' == typeof t) return t;
			var e = t.match(/(^\d*\.?\d*)(\w*)/),
				i = e && e[1],
				o = e && e[2];
			if (!i.length) return 0;
			i = parseFloat(i);
			var n = m[o] || 1;
			return i * n;
		}
		var u = t.console,
			h = t.jQuery,
			d = function () {},
			l = 0,
			f = {};
		(s.namespace = 'outlayer'),
			(s.Item = n),
			(s.defaults = {
				containerStyle: { position: 'relative' },
				initLayout: !0,
				originLeft: !0,
				originTop: !0,
				resize: !0,
				resizeContainer: !0,
				transitionDuration: '0.4s',
				hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
				visibleStyle: { opacity: 1, transform: 'scale(1)' },
			});
		var c = s.prototype;
		o.extend(c, e.prototype),
			(c.option = function (t) {
				o.extend(this.options, t);
			}),
			(c._getOption = function (t) {
				var e = this.constructor.compatOptions[t];
				return e && void 0 !== this.options[e]
					? this.options[e]
					: this.options[t];
			}),
			(s.compatOptions = {
				initLayout: 'isInitLayout',
				horizontal: 'isHorizontal',
				layoutInstant: 'isLayoutInstant',
				originLeft: 'isOriginLeft',
				originTop: 'isOriginTop',
				resize: 'isResizeBound',
				resizeContainer: 'isResizingContainer',
			}),
			(c._create = function () {
				this.reloadItems(),
					(this.stamps = []),
					this.stamp(this.options.stamp),
					o.extend(this.element.style, this.options.containerStyle);
				var t = this._getOption('resize');
				t && this.bindResize();
			}),
			(c.reloadItems = function () {
				this.items = this._itemize(this.element.children);
			}),
			(c._itemize = function (t) {
				for (
					var e = this._filterFindItemElements(t),
						i = this.constructor.Item,
						o = [],
						n = 0;
					n < e.length;
					n++
				) {
					var s = e[n],
						r = new i(s, this);
					o.push(r);
				}
				return o;
			}),
			(c._filterFindItemElements = function (t) {
				return o.filterFindElements(t, this.options.itemSelector);
			}),
			(c.getItemElements = function () {
				return this.items.map(function (t) {
					return t.element;
				});
			}),
			(c.layout = function () {
				this._resetLayout(), this._manageStamps();
				var t = this._getOption('layoutInstant'),
					e = void 0 !== t ? t : !this._isLayoutInited;
				this.layoutItems(this.items, e), (this._isLayoutInited = !0);
			}),
			(c._init = c.layout),
			(c._resetLayout = function () {
				this.getSize();
			}),
			(c.getSize = function () {
				this.size = i(this.element);
			}),
			(c._getMeasurement = function (t, e) {
				var o,
					n = this.options[t];
				n
					? ('string' == typeof n
							? (o = this.element.querySelector(n))
							: n instanceof HTMLElement && (o = n),
					  (this[t] = o ? i(o)[e] : n))
					: (this[t] = 0);
			}),
			(c.layoutItems = function (t, e) {
				(t = this._getItemsForLayout(t)),
					this._layoutItems(t, e),
					this._postLayout();
			}),
			(c._getItemsForLayout = function (t) {
				return t.filter(function (t) {
					return !t.isIgnored;
				});
			}),
			(c._layoutItems = function (t, e) {
				if ((this._emitCompleteOnItems('layout', t), t && t.length)) {
					var i = [];
					t.forEach(function (t) {
						var o = this._getItemLayoutPosition(t);
						(o.item = t), (o.isInstant = e || t.isLayoutInstant), i.push(o);
					}, this),
						this._processLayoutQueue(i);
				}
			}),
			(c._getItemLayoutPosition = function () {
				return { x: 0, y: 0 };
			}),
			(c._processLayoutQueue = function (t) {
				this.updateStagger(),
					t.forEach(function (t, e) {
						this._positionItem(t.item, t.x, t.y, t.isInstant, e);
					}, this);
			}),
			(c.updateStagger = function () {
				var t = this.options.stagger;
				return null === t || void 0 === t
					? void (this.stagger = 0)
					: ((this.stagger = a(t)), this.stagger);
			}),
			(c._positionItem = function (t, e, i, o, n) {
				o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
			}),
			(c._postLayout = function () {
				this.resizeContainer();
			}),
			(c.resizeContainer = function () {
				var t = this._getOption('resizeContainer');
				if (t) {
					var e = this._getContainerSize();
					e &&
						(this._setContainerMeasure(e.width, !0),
						this._setContainerMeasure(e.height, !1));
				}
			}),
			(c._getContainerSize = d),
			(c._setContainerMeasure = function (t, e) {
				if (void 0 !== t) {
					var i = this.size;
					i.isBorderBox &&
						(t += e
							? i.paddingLeft +
							  i.paddingRight +
							  i.borderLeftWidth +
							  i.borderRightWidth
							: i.paddingBottom +
							  i.paddingTop +
							  i.borderTopWidth +
							  i.borderBottomWidth),
						(t = Math.max(t, 0)),
						(this.element.style[e ? 'width' : 'height'] = t + 'px');
				}
			}),
			(c._emitCompleteOnItems = function (t, e) {
				function i() {
					n.dispatchEvent(t + 'Complete', null, [e]);
				}
				function o() {
					r++, r == s && i();
				}
				var n = this,
					s = e.length;
				if (!e || !s) return void i();
				var r = 0;
				e.forEach(function (e) {
					e.once(t, o);
				});
			}),
			(c.dispatchEvent = function (t, e, i) {
				var o = e ? [e].concat(i) : i;
				if ((this.emitEvent(t, o), h))
					if (((this.$element = this.$element || h(this.element)), e)) {
						var n = h.Event(e);
						(n.type = t), this.$element.trigger(n, i);
					} else this.$element.trigger(t, i);
			}),
			(c.ignore = function (t) {
				var e = this.getItem(t);
				e && (e.isIgnored = !0);
			}),
			(c.unignore = function (t) {
				var e = this.getItem(t);
				e && delete e.isIgnored;
			}),
			(c.stamp = function (t) {
				(t = this._find(t)),
					t &&
						((this.stamps = this.stamps.concat(t)),
						t.forEach(this.ignore, this));
			}),
			(c.unstamp = function (t) {
				(t = this._find(t)),
					t &&
						t.forEach(function (t) {
							o.removeFrom(this.stamps, t), this.unignore(t);
						}, this);
			}),
			(c._find = function (t) {
				if (t)
					return (
						'string' == typeof t && (t = this.element.querySelectorAll(t)),
						(t = o.makeArray(t))
					);
			}),
			(c._manageStamps = function () {
				this.stamps &&
					this.stamps.length &&
					(this._getBoundingRect(),
					this.stamps.forEach(this._manageStamp, this));
			}),
			(c._getBoundingRect = function () {
				var t = this.element.getBoundingClientRect(),
					e = this.size;
				this._boundingRect = {
					left: t.left + e.paddingLeft + e.borderLeftWidth,
					top: t.top + e.paddingTop + e.borderTopWidth,
					right: t.right - (e.paddingRight + e.borderRightWidth),
					bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
				};
			}),
			(c._manageStamp = d),
			(c._getElementOffset = function (t) {
				var e = t.getBoundingClientRect(),
					o = this._boundingRect,
					n = i(t),
					s = {
						left: e.left - o.left - n.marginLeft,
						top: e.top - o.top - n.marginTop,
						right: o.right - e.right - n.marginRight,
						bottom: o.bottom - e.bottom - n.marginBottom,
					};
				return s;
			}),
			(c.handleEvent = o.handleEvent),
			(c.bindResize = function () {
				t.addEventListener('resize', this), (this.isResizeBound = !0);
			}),
			(c.unbindResize = function () {
				t.removeEventListener('resize', this), (this.isResizeBound = !1);
			}),
			(c.onresize = function () {
				this.resize();
			}),
			o.debounceMethod(s, 'onresize', 100),
			(c.resize = function () {
				this.isResizeBound && this.needsResizeLayout() && this.layout();
			}),
			(c.needsResizeLayout = function () {
				var t = i(this.element),
					e = this.size && t;
				return e && t.innerWidth !== this.size.innerWidth;
			}),
			(c.addItems = function (t) {
				var e = this._itemize(t);
				return e.length && (this.items = this.items.concat(e)), e;
			}),
			(c.appended = function (t) {
				var e = this.addItems(t);
				e.length && (this.layoutItems(e, !0), this.reveal(e));
			}),
			(c.prepended = function (t) {
				var e = this._itemize(t);
				if (e.length) {
					var i = this.items.slice(0);
					(this.items = e.concat(i)),
						this._resetLayout(),
						this._manageStamps(),
						this.layoutItems(e, !0),
						this.reveal(e),
						this.layoutItems(i);
				}
			}),
			(c.reveal = function (t) {
				if ((this._emitCompleteOnItems('reveal', t), t && t.length)) {
					var e = this.updateStagger();
					t.forEach(function (t, i) {
						t.stagger(i * e), t.reveal();
					});
				}
			}),
			(c.hide = function (t) {
				if ((this._emitCompleteOnItems('hide', t), t && t.length)) {
					var e = this.updateStagger();
					t.forEach(function (t, i) {
						t.stagger(i * e), t.hide();
					});
				}
			}),
			(c.revealItemElements = function (t) {
				var e = this.getItems(t);
				this.reveal(e);
			}),
			(c.hideItemElements = function (t) {
				var e = this.getItems(t);
				this.hide(e);
			}),
			(c.getItem = function (t) {
				for (var e = 0; e < this.items.length; e++) {
					var i = this.items[e];
					if (i.element == t) return i;
				}
			}),
			(c.getItems = function (t) {
				t = o.makeArray(t);
				var e = [];
				return (
					t.forEach(function (t) {
						var i = this.getItem(t);
						i && e.push(i);
					}, this),
					e
				);
			}),
			(c.remove = function (t) {
				var e = this.getItems(t);
				this._emitCompleteOnItems('remove', e),
					e &&
						e.length &&
						e.forEach(function (t) {
							t.remove(), o.removeFrom(this.items, t);
						}, this);
			}),
			(c.destroy = function () {
				var t = this.element.style;
				(t.height = ''),
					(t.position = ''),
					(t.width = ''),
					this.items.forEach(function (t) {
						t.destroy();
					}),
					this.unbindResize();
				var e = this.element.outlayerGUID;
				delete f[e],
					delete this.element.outlayerGUID,
					h && h.removeData(this.element, this.constructor.namespace);
			}),
			(s.data = function (t) {
				t = o.getQueryElement(t);
				var e = t && t.outlayerGUID;
				return e && f[e];
			}),
			(s.create = function (t, e) {
				var i = r(s);
				return (
					(i.defaults = o.extend({}, s.defaults)),
					o.extend(i.defaults, e),
					(i.compatOptions = o.extend({}, s.compatOptions)),
					(i.namespace = t),
					(i.data = s.data),
					(i.Item = r(n)),
					o.htmlInit(i, t),
					h && h.bridget && h.bridget(t, i),
					i
				);
			});
		var m = { ms: 1, s: 1e3 };
		return (s.Item = n), s;
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('isotope/js/item', ['outlayer/outlayer'], e)
			: 'object' == typeof module && module.exports
			? (module.exports = e(require('outlayer')))
			: ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
	})(window, function (t) {
		'use strict';
		function e() {
			t.Item.apply(this, arguments);
		}
		var i = (e.prototype = Object.create(t.Item.prototype)),
			o = i._create;
		(i._create = function () {
			(this.id = this.layout.itemGUID++), o.call(this), (this.sortData = {});
		}),
			(i.updateSortData = function () {
				if (!this.isIgnored) {
					(this.sortData.id = this.id),
						(this.sortData['original-order'] = this.id),
						(this.sortData.random = Math.random());
					var t = this.layout.options.getSortData,
						e = this.layout._sorters;
					for (var i in t) {
						var o = e[i];
						this.sortData[i] = o(this.element, this);
					}
				}
			});
		var n = i.destroy;
		return (
			(i.destroy = function () {
				n.apply(this, arguments), this.css({ display: '' });
			}),
			e
		);
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('isotope/js/layout-mode', [
					'get-size/get-size',
					'outlayer/outlayer',
			  ], e)
			: 'object' == typeof module && module.exports
			? (module.exports = e(require('get-size'), require('outlayer')))
			: ((t.Isotope = t.Isotope || {}),
			  (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
	})(window, function (t, e) {
		'use strict';
		function i(t) {
			(this.isotope = t),
				t &&
					((this.options = t.options[this.namespace]),
					(this.element = t.element),
					(this.items = t.filteredItems),
					(this.size = t.size));
		}
		var o = i.prototype,
			n = [
				'_resetLayout',
				'_getItemLayoutPosition',
				'_manageStamp',
				'_getContainerSize',
				'_getElementOffset',
				'needsResizeLayout',
				'_getOption',
			];
		return (
			n.forEach(function (t) {
				o[t] = function () {
					return e.prototype[t].apply(this.isotope, arguments);
				};
			}),
			(o.needsVerticalResizeLayout = function () {
				var e = t(this.isotope.element),
					i = this.isotope.size && e;
				return i && e.innerHeight != this.isotope.size.innerHeight;
			}),
			(o._getMeasurement = function () {
				this.isotope._getMeasurement.apply(this, arguments);
			}),
			(o.getColumnWidth = function () {
				this.getSegmentSize('column', 'Width');
			}),
			(o.getRowHeight = function () {
				this.getSegmentSize('row', 'Height');
			}),
			(o.getSegmentSize = function (t, e) {
				var i = t + e,
					o = 'outer' + e;
				if ((this._getMeasurement(i, o), !this[i])) {
					var n = this.getFirstItemSize();
					this[i] = (n && n[o]) || this.isotope.size['inner' + e];
				}
			}),
			(o.getFirstItemSize = function () {
				var e = this.isotope.filteredItems[0];
				return e && e.element && t(e.element);
			}),
			(o.layout = function () {
				this.isotope.layout.apply(this.isotope, arguments);
			}),
			(o.getSize = function () {
				this.isotope.getSize(), (this.size = this.isotope.size);
			}),
			(i.modes = {}),
			(i.create = function (t, e) {
				function n() {
					i.apply(this, arguments);
				}
				return (
					(n.prototype = Object.create(o)),
					(n.prototype.constructor = n),
					e && (n.options = e),
					(n.prototype.namespace = t),
					(i.modes[t] = n),
					n
				);
			}),
			i
		);
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('masonry/masonry', ['outlayer/outlayer', 'get-size/get-size'], e)
			: 'object' == typeof module && module.exports
			? (module.exports = e(require('outlayer'), require('get-size')))
			: (t.Masonry = e(t.Outlayer, t.getSize));
	})(window, function (t, e) {
		var i = t.create('masonry');
		i.compatOptions.fitWidth = 'isFitWidth';
		var o = i.prototype;
		return (
			(o._resetLayout = function () {
				this.getSize(),
					this._getMeasurement('columnWidth', 'outerWidth'),
					this._getMeasurement('gutter', 'outerWidth'),
					this.measureColumns(),
					(this.colYs = []);
				for (var t = 0; t < this.cols; t++) this.colYs.push(0);
				(this.maxY = 0), (this.horizontalColIndex = 0);
			}),
			(o.measureColumns = function () {
				if ((this.getContainerWidth(), !this.columnWidth)) {
					var t = this.items[0],
						i = t && t.element;
					this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
				}
				var o = (this.columnWidth += this.gutter),
					n = this.containerWidth + this.gutter,
					s = n / o,
					r = o - (n % o),
					a = r && r < 1 ? 'round' : 'floor';
				(s = Math[a](s)), (this.cols = Math.max(s, 1));
			}),
			(o.getContainerWidth = function () {
				var t = this._getOption('fitWidth'),
					i = t ? this.element.parentNode : this.element,
					o = e(i);
				this.containerWidth = o && o.innerWidth;
			}),
			(o._getItemLayoutPosition = function (t) {
				t.getSize();
				var e = t.size.outerWidth % this.columnWidth,
					i = e && e < 1 ? 'round' : 'ceil',
					o = Math[i](t.size.outerWidth / this.columnWidth);
				o = Math.min(o, this.cols);
				for (
					var n = this.options.horizontalOrder
							? '_getHorizontalColPosition'
							: '_getTopColPosition',
						s = this[n](o, t),
						r = { x: this.columnWidth * s.col, y: s.y },
						a = s.y + t.size.outerHeight,
						u = o + s.col,
						h = s.col;
					h < u;
					h++
				)
					this.colYs[h] = a;
				return r;
			}),
			(o._getTopColPosition = function (t) {
				var e = this._getTopColGroup(t),
					i = Math.min.apply(Math, e);
				return { col: e.indexOf(i), y: i };
			}),
			(o._getTopColGroup = function (t) {
				if (t < 2) return this.colYs;
				for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)
					e[o] = this._getColGroupY(o, t);
				return e;
			}),
			(o._getColGroupY = function (t, e) {
				if (e < 2) return this.colYs[t];
				var i = this.colYs.slice(t, t + e);
				return Math.max.apply(Math, i);
			}),
			(o._getHorizontalColPosition = function (t, e) {
				var i = this.horizontalColIndex % this.cols,
					o = t > 1 && i + t > this.cols;
				i = o ? 0 : i;
				var n = e.size.outerWidth && e.size.outerHeight;
				return (
					(this.horizontalColIndex = n ? i + t : this.horizontalColIndex),
					{ col: i, y: this._getColGroupY(i, t) }
				);
			}),
			(o._manageStamp = function (t) {
				var i = e(t),
					o = this._getElementOffset(t),
					n = this._getOption('originLeft'),
					s = n ? o.left : o.right,
					r = s + i.outerWidth,
					a = Math.floor(s / this.columnWidth);
				a = Math.max(0, a);
				var u = Math.floor(r / this.columnWidth);
				(u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u));
				for (
					var h = this._getOption('originTop'),
						d = (h ? o.top : o.bottom) + i.outerHeight,
						l = a;
					l <= u;
					l++
				)
					this.colYs[l] = Math.max(d, this.colYs[l]);
			}),
			(o._getContainerSize = function () {
				this.maxY = Math.max.apply(Math, this.colYs);
				var t = { height: this.maxY };
				return (
					this._getOption('fitWidth') &&
						(t.width = this._getContainerFitWidth()),
					t
				);
			}),
			(o._getContainerFitWidth = function () {
				for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
				return (this.cols - t) * this.columnWidth - this.gutter;
			}),
			(o.needsResizeLayout = function () {
				var t = this.containerWidth;
				return this.getContainerWidth(), t != this.containerWidth;
			}),
			i
		);
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('isotope/js/layout-modes/masonry', [
					'../layout-mode',
					'masonry/masonry',
			  ], e)
			: 'object' == typeof module && module.exports
			? (module.exports = e(
					require('../layout-mode'),
					require('masonry-layout')
			  ))
			: e(t.Isotope.LayoutMode, t.Masonry);
	})(window, function (t, e) {
		'use strict';
		var i = t.create('masonry'),
			o = i.prototype,
			n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
		for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
		var r = o.measureColumns;
		o.measureColumns = function () {
			(this.items = this.isotope.filteredItems), r.call(this);
		};
		var a = o._getOption;
		return (
			(o._getOption = function (t) {
				return 'fitWidth' == t
					? void 0 !== this.options.isFitWidth
						? this.options.isFitWidth
						: this.options.fitWidth
					: a.apply(this.isotope, arguments);
			}),
			i
		);
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('isotope/js/layout-modes/fit-rows', ['../layout-mode'], e)
			: 'object' == typeof exports
			? (module.exports = e(require('../layout-mode')))
			: e(t.Isotope.LayoutMode);
	})(window, function (t) {
		'use strict';
		var e = t.create('fitRows'),
			i = e.prototype;
		return (
			(i._resetLayout = function () {
				(this.x = 0),
					(this.y = 0),
					(this.maxY = 0),
					this._getMeasurement('gutter', 'outerWidth');
			}),
			(i._getItemLayoutPosition = function (t) {
				t.getSize();
				var e = t.size.outerWidth + this.gutter,
					i = this.isotope.size.innerWidth + this.gutter;
				0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
				var o = { x: this.x, y: this.y };
				return (
					(this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
					(this.x += e),
					o
				);
			}),
			(i._getContainerSize = function () {
				return { height: this.maxY };
			}),
			e
		);
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define('isotope/js/layout-modes/vertical', ['../layout-mode'], e)
			: 'object' == typeof module && module.exports
			? (module.exports = e(require('../layout-mode')))
			: e(t.Isotope.LayoutMode);
	})(window, function (t) {
		'use strict';
		var e = t.create('vertical', { horizontalAlignment: 0 }),
			i = e.prototype;
		return (
			(i._resetLayout = function () {
				this.y = 0;
			}),
			(i._getItemLayoutPosition = function (t) {
				t.getSize();
				var e =
						(this.isotope.size.innerWidth - t.size.outerWidth) *
						this.options.horizontalAlignment,
					i = this.y;
				return (this.y += t.size.outerHeight), { x: e, y: i };
			}),
			(i._getContainerSize = function () {
				return { height: this.y };
			}),
			e
		);
	}),
	(function (t, e) {
		'function' == typeof define && define.amd
			? define([
					'outlayer/outlayer',
					'get-size/get-size',
					'desandro-matches-selector/matches-selector',
					'fizzy-ui-utils/utils',
					'isotope/js/item',
					'isotope/js/layout-mode',
					'isotope/js/layout-modes/masonry',
					'isotope/js/layout-modes/fit-rows',
					'isotope/js/layout-modes/vertical',
			  ], function (i, o, n, s, r, a) {
					return e(t, i, o, n, s, r, a);
			  })
			: 'object' == typeof module && module.exports
			? (module.exports = e(
					t,
					require('outlayer'),
					require('get-size'),
					require('desandro-matches-selector'),
					require('fizzy-ui-utils'),
					require('isotope/js/item'),
					require('isotope/js/layout-mode'),
					require('isotope/js/layout-modes/masonry'),
					require('isotope/js/layout-modes/fit-rows'),
					require('isotope/js/layout-modes/vertical')
			  ))
			: (t.Isotope = e(
					t,
					t.Outlayer,
					t.getSize,
					t.matchesSelector,
					t.fizzyUIUtils,
					t.Isotope.Item,
					t.Isotope.LayoutMode
			  ));
	})(window, function (t, e, i, o, n, s, r) {
		function a(t, e) {
			return function (i, o) {
				for (var n = 0; n < t.length; n++) {
					var s = t[n],
						r = i.sortData[s],
						a = o.sortData[s];
					if (r > a || r < a) {
						var u = void 0 !== e[s] ? e[s] : e,
							h = u ? 1 : -1;
						return (r > a ? 1 : -1) * h;
					}
				}
				return 0;
			};
		}
		var u = t.jQuery,
			h = String.prototype.trim
				? function (t) {
						return t.trim();
				  }
				: function (t) {
						return t.replace(/^\s+|\s+$/g, '');
				  },
			d = e.create('isotope', {
				layoutMode: 'masonry',
				isJQueryFiltering: !0,
				sortAscending: !0,
			});
		(d.Item = s), (d.LayoutMode = r);
		var l = d.prototype;
		(l._create = function () {
			(this.itemGUID = 0),
				(this._sorters = {}),
				this._getSorters(),
				e.prototype._create.call(this),
				(this.modes = {}),
				(this.filteredItems = this.items),
				(this.sortHistory = ['original-order']);
			for (var t in r.modes) this._initLayoutMode(t);
		}),
			(l.reloadItems = function () {
				(this.itemGUID = 0), e.prototype.reloadItems.call(this);
			}),
			(l._itemize = function () {
				for (
					var t = e.prototype._itemize.apply(this, arguments), i = 0;
					i < t.length;
					i++
				) {
					var o = t[i];
					o.id = this.itemGUID++;
				}
				return this._updateItemsSortData(t), t;
			}),
			(l._initLayoutMode = function (t) {
				var e = r.modes[t],
					i = this.options[t] || {};
				(this.options[t] = e.options ? n.extend(e.options, i) : i),
					(this.modes[t] = new e(this));
			}),
			(l.layout = function () {
				return !this._isLayoutInited && this._getOption('initLayout')
					? void this.arrange()
					: void this._layout();
			}),
			(l._layout = function () {
				var t = this._getIsInstant();
				this._resetLayout(),
					this._manageStamps(),
					this.layoutItems(this.filteredItems, t),
					(this._isLayoutInited = !0);
			}),
			(l.arrange = function (t) {
				this.option(t), this._getIsInstant();
				var e = this._filter(this.items);
				(this.filteredItems = e.matches),
					this._bindArrangeComplete(),
					this._isInstant
						? this._noTransition(this._hideReveal, [e])
						: this._hideReveal(e),
					this._sort(),
					this._layout();
			}),
			(l._init = l.arrange),
			(l._hideReveal = function (t) {
				this.reveal(t.needReveal), this.hide(t.needHide);
			}),
			(l._getIsInstant = function () {
				var t = this._getOption('layoutInstant'),
					e = void 0 !== t ? t : !this._isLayoutInited;
				return (this._isInstant = e), e;
			}),
			(l._bindArrangeComplete = function () {
				function t() {
					e &&
						i &&
						o &&
						n.dispatchEvent('arrangeComplete', null, [n.filteredItems]);
				}
				var e,
					i,
					o,
					n = this;
				this.once('layoutComplete', function () {
					(e = !0), t();
				}),
					this.once('hideComplete', function () {
						(i = !0), t();
					}),
					this.once('revealComplete', function () {
						(o = !0), t();
					});
			}),
			(l._filter = function (t) {
				var e = this.options.filter;
				e = e || '*';
				for (
					var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0;
					r < t.length;
					r++
				) {
					var a = t[r];
					if (!a.isIgnored) {
						var u = s(a);
						u && i.push(a),
							u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
					}
				}
				return { matches: i, needReveal: o, needHide: n };
			}),
			(l._getFilterTest = function (t) {
				return u && this.options.isJQueryFiltering
					? function (e) {
							return u(e.element).is(t);
					  }
					: 'function' == typeof t
					? function (e) {
							return t(e.element);
					  }
					: function (e) {
							return o(e.element, t);
					  };
			}),
			(l.updateSortData = function (t) {
				var e;
				t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
					this._getSorters(),
					this._updateItemsSortData(e);
			}),
			(l._getSorters = function () {
				var t = this.options.getSortData;
				for (var e in t) {
					var i = t[e];
					this._sorters[e] = f(i);
				}
			}),
			(l._updateItemsSortData = function (t) {
				for (var e = t && t.length, i = 0; e && i < e; i++) {
					var o = t[i];
					o.updateSortData();
				}
			});
		var f = (function () {
			function t(t) {
				if ('string' != typeof t) return t;
				var i = h(t).split(' '),
					o = i[0],
					n = o.match(/^\[(.+)\]$/),
					s = n && n[1],
					r = e(s, o),
					a = d.sortDataParsers[i[1]];
				return (t = a
					? function (t) {
							return t && a(r(t));
					  }
					: function (t) {
							return t && r(t);
					  });
			}
			function e(t, e) {
				return t
					? function (e) {
							return e.getAttribute(t);
					  }
					: function (t) {
							var i = t.querySelector(e);
							return i && i.textContent;
					  };
			}
			return t;
		})();
		(d.sortDataParsers = {
			parseInt: function (t) {
				return parseInt(t, 10);
			},
			parseFloat: function (t) {
				return parseFloat(t);
			},
		}),
			(l._sort = function () {
				if (this.options.sortBy) {
					var t = n.makeArray(this.options.sortBy);
					this._getIsSameSortBy(t) ||
						(this.sortHistory = t.concat(this.sortHistory));
					var e = a(this.sortHistory, this.options.sortAscending);
					this.filteredItems.sort(e);
				}
			}),
			(l._getIsSameSortBy = function (t) {
				for (var e = 0; e < t.length; e++)
					if (t[e] != this.sortHistory[e]) return !1;
				return !0;
			}),
			(l._mode = function () {
				var t = this.options.layoutMode,
					e = this.modes[t];
				if (!e) throw new Error('No layout mode: ' + t);
				return (e.options = this.options[t]), e;
			}),
			(l._resetLayout = function () {
				e.prototype._resetLayout.call(this), this._mode()._resetLayout();
			}),
			(l._getItemLayoutPosition = function (t) {
				return this._mode()._getItemLayoutPosition(t);
			}),
			(l._manageStamp = function (t) {
				this._mode()._manageStamp(t);
			}),
			(l._getContainerSize = function () {
				return this._mode()._getContainerSize();
			}),
			(l.needsResizeLayout = function () {
				return this._mode().needsResizeLayout();
			}),
			(l.appended = function (t) {
				var e = this.addItems(t);
				if (e.length) {
					var i = this._filterRevealAdded(e);
					this.filteredItems = this.filteredItems.concat(i);
				}
			}),
			(l.prepended = function (t) {
				var e = this._itemize(t);
				if (e.length) {
					this._resetLayout(), this._manageStamps();
					var i = this._filterRevealAdded(e);
					this.layoutItems(this.filteredItems),
						(this.filteredItems = i.concat(this.filteredItems)),
						(this.items = e.concat(this.items));
				}
			}),
			(l._filterRevealAdded = function (t) {
				var e = this._filter(t);
				return (
					this.hide(e.needHide),
					this.reveal(e.matches),
					this.layoutItems(e.matches, !0),
					e.matches
				);
			}),
			(l.insert = function (t) {
				var e = this.addItems(t);
				if (e.length) {
					var i,
						o,
						n = e.length;
					for (i = 0; i < n; i++)
						(o = e[i]), this.element.appendChild(o.element);
					var s = this._filter(e).matches;
					for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
					for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
					this.reveal(s);
				}
			});
		var c = l.remove;
		return (
			(l.remove = function (t) {
				t = n.makeArray(t);
				var e = this.getItems(t);
				c.call(this, t);
				for (var i = e && e.length, o = 0; i && o < i; o++) {
					var s = e[o];
					n.removeFrom(this.filteredItems, s);
				}
			}),
			(l.shuffle = function () {
				for (var t = 0; t < this.items.length; t++) {
					var e = this.items[t];
					e.sortData.random = Math.random();
				}
				(this.options.sortBy = 'random'), this._sort(), this._layout();
			}),
			(l._noTransition = function (t, e) {
				var i = this.options.transitionDuration;
				this.options.transitionDuration = 0;
				var o = t.apply(this, e);
				return (this.options.transitionDuration = i), o;
			}),
			(l.getFilteredItemElements = function () {
				return this.filteredItems.map(function (t) {
					return t.element;
				});
			}),
			d
		);
	});
/*! This file is auto-generated */
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!(function (e, t) {
	'function' == typeof define && define.amd
		? define('ev-emitter/ev-emitter', t)
		: 'object' == typeof module && module.exports
		? (module.exports = t())
		: (e.EvEmitter = t());
})('undefined' != typeof window ? window : this, function () {
	function e() {}
	var t = e.prototype;
	return (
		(t.on = function (e, t) {
			if (e && t) {
				var i = (this._events = this._events || {}),
					n = (i[e] = i[e] || []);
				return n.indexOf(t) == -1 && n.push(t), this;
			}
		}),
		(t.once = function (e, t) {
			if (e && t) {
				this.on(e, t);
				var i = (this._onceEvents = this._onceEvents || {}),
					n = (i[e] = i[e] || {});
				return (n[t] = !0), this;
			}
		}),
		(t.off = function (e, t) {
			var i = this._events && this._events[e];
			if (i && i.length) {
				var n = i.indexOf(t);
				return n != -1 && i.splice(n, 1), this;
			}
		}),
		(t.emitEvent = function (e, t) {
			var i = this._events && this._events[e];
			if (i && i.length) {
				(i = i.slice(0)), (t = t || []);
				for (
					var n = this._onceEvents && this._onceEvents[e], o = 0;
					o < i.length;
					o++
				) {
					var r = i[o],
						s = n && n[r];
					s && (this.off(e, r), delete n[r]), r.apply(this, t);
				}
				return this;
			}
		}),
		(t.allOff = function () {
			delete this._events, delete this._onceEvents;
		}),
		e
	);
}),
	(function (e, t) {
		'use strict';
		'function' == typeof define && define.amd
			? define(['ev-emitter/ev-emitter'], function (i) {
					return t(e, i);
			  })
			: 'object' == typeof module && module.exports
			? (module.exports = t(e, require('ev-emitter')))
			: (e.imagesLoaded = t(e, e.EvEmitter));
	})('undefined' != typeof window ? window : this, function (e, t) {
		function i(e, t) {
			for (var i in t) e[i] = t[i];
			return e;
		}
		function n(e) {
			if (Array.isArray(e)) return e;
			var t = 'object' == typeof e && 'number' == typeof e.length;
			return t ? d.call(e) : [e];
		}
		function o(e, t, r) {
			if (!(this instanceof o)) return new o(e, t, r);
			var s = e;
			return (
				'string' == typeof e && (s = document.querySelectorAll(e)),
				s
					? ((this.elements = n(s)),
					  (this.options = i({}, this.options)),
					  'function' == typeof t ? (r = t) : i(this.options, t),
					  r && this.on('always', r),
					  this.getImages(),
					  h && (this.jqDeferred = new h.Deferred()),
					  void setTimeout(this.check.bind(this)))
					: void a.error('Bad element for imagesLoaded ' + (s || e))
			);
		}
		function r(e) {
			this.img = e;
		}
		function s(e, t) {
			(this.url = e), (this.element = t), (this.img = new Image());
		}
		var h = e.jQuery,
			a = e.console,
			d = Array.prototype.slice;
		(o.prototype = Object.create(t.prototype)),
			(o.prototype.options = {}),
			(o.prototype.getImages = function () {
				(this.images = []), this.elements.forEach(this.addElementImages, this);
			}),
			(o.prototype.addElementImages = function (e) {
				'IMG' == e.nodeName && this.addImage(e),
					this.options.background === !0 && this.addElementBackgroundImages(e);
				var t = e.nodeType;
				if (t && u[t]) {
					for (var i = e.querySelectorAll('img'), n = 0; n < i.length; n++) {
						var o = i[n];
						this.addImage(o);
					}
					if ('string' == typeof this.options.background) {
						var r = e.querySelectorAll(this.options.background);
						for (n = 0; n < r.length; n++) {
							var s = r[n];
							this.addElementBackgroundImages(s);
						}
					}
				}
			});
		var u = { 1: !0, 9: !0, 11: !0 };
		return (
			(o.prototype.addElementBackgroundImages = function (e) {
				var t = getComputedStyle(e);
				if (t)
					for (
						var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
						null !== n;

					) {
						var o = n && n[2];
						o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
					}
			}),
			(o.prototype.addImage = function (e) {
				var t = new r(e);
				this.images.push(t);
			}),
			(o.prototype.addBackground = function (e, t) {
				var i = new s(e, t);
				this.images.push(i);
			}),
			(o.prototype.check = function () {
				function e(e, i, n) {
					setTimeout(function () {
						t.progress(e, i, n);
					});
				}
				var t = this;
				return (
					(this.progressedCount = 0),
					(this.hasAnyBroken = !1),
					this.images.length
						? void this.images.forEach(function (t) {
								t.once('progress', e), t.check();
						  })
						: void this.complete()
				);
			}),
			(o.prototype.progress = function (e, t, i) {
				this.progressedCount++,
					(this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
					this.emitEvent('progress', [this, e, t]),
					this.jqDeferred &&
						this.jqDeferred.notify &&
						this.jqDeferred.notify(this, e),
					this.progressedCount == this.images.length && this.complete(),
					this.options.debug && a && a.log('progress: ' + i, e, t);
			}),
			(o.prototype.complete = function () {
				var e = this.hasAnyBroken ? 'fail' : 'done';
				if (
					((this.isComplete = !0),
					this.emitEvent(e, [this]),
					this.emitEvent('always', [this]),
					this.jqDeferred)
				) {
					var t = this.hasAnyBroken ? 'reject' : 'resolve';
					this.jqDeferred[t](this);
				}
			}),
			(r.prototype = Object.create(t.prototype)),
			(r.prototype.check = function () {
				var e = this.getIsImageComplete();
				return e
					? void this.confirm(0 !== this.img.naturalWidth, 'naturalWidth')
					: ((this.proxyImage = new Image()),
					  this.proxyImage.addEventListener('load', this),
					  this.proxyImage.addEventListener('error', this),
					  this.img.addEventListener('load', this),
					  this.img.addEventListener('error', this),
					  void (this.proxyImage.src = this.img.src));
			}),
			(r.prototype.getIsImageComplete = function () {
				return this.img.complete && this.img.naturalWidth;
			}),
			(r.prototype.confirm = function (e, t) {
				(this.isLoaded = e), this.emitEvent('progress', [this, this.img, t]);
			}),
			(r.prototype.handleEvent = function (e) {
				var t = 'on' + e.type;
				this[t] && this[t](e);
			}),
			(r.prototype.onload = function () {
				this.confirm(!0, 'onload'), this.unbindEvents();
			}),
			(r.prototype.onerror = function () {
				this.confirm(!1, 'onerror'), this.unbindEvents();
			}),
			(r.prototype.unbindEvents = function () {
				this.proxyImage.removeEventListener('load', this),
					this.proxyImage.removeEventListener('error', this),
					this.img.removeEventListener('load', this),
					this.img.removeEventListener('error', this);
			}),
			(s.prototype = Object.create(r.prototype)),
			(s.prototype.check = function () {
				this.img.addEventListener('load', this),
					this.img.addEventListener('error', this),
					(this.img.src = this.url);
				var e = this.getIsImageComplete();
				e &&
					(this.confirm(0 !== this.img.naturalWidth, 'naturalWidth'),
					this.unbindEvents());
			}),
			(s.prototype.unbindEvents = function () {
				this.img.removeEventListener('load', this),
					this.img.removeEventListener('error', this);
			}),
			(s.prototype.confirm = function (e, t) {
				(this.isLoaded = e),
					this.emitEvent('progress', [this, this.element, t]);
			}),
			(o.makeJQueryPlugin = function (t) {
				(t = t || e.jQuery),
					t &&
						((h = t),
						(h.fn.imagesLoaded = function (e, t) {
							var i = new o(this, e, t);
							return i.jqDeferred.promise(h(this));
						}));
			}),
			o.makeJQueryPlugin(),
			o
		);
	});
!(function (e) {
	function t() {
		var e = location.href;
		return (
			(hashtag =
				-1 !== e.indexOf('#prettyPhoto')
					? decodeURI(e.substring(e.indexOf('#prettyPhoto') + 1, e.length))
					: !1),
			hashtag && (hashtag = hashtag.replace(/<|>/g, '')),
			hashtag
		);
	}
	function i() {
		'undefined' != typeof theRel &&
			(location.hash = theRel + '/' + rel_index + '/');
	}
	function p() {
		-1 !== location.href.indexOf('#prettyPhoto') &&
			(location.hash = 'prettyPhoto');
	}
	function o(e, t) {
		e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var i = '[\\?&]' + e + '=([^&#]*)',
			p = new RegExp(i),
			o = p.exec(t);
		return null == o ? '' : o[1];
	}
	(e.prettyPhoto = { version: '3.1.6' }),
		(e.fn.prettyPhoto = function (a) {
			function s() {
				e('.pp_loaderIcon').hide(),
					(projectedTop =
						scroll_pos.scrollTop + (I / 2 - f.containerHeight / 2)),
					projectedTop < 0 && (projectedTop = 0),
					$ppt.fadeTo(settings.animation_speed, 1),
					$pp_pic_holder
						.find('.pp_content')
						.animate(
							{ height: f.contentHeight, width: f.contentWidth },
							settings.animation_speed
						),
					$pp_pic_holder.animate(
						{
							top: projectedTop,
							left:
								j / 2 - f.containerWidth / 2 < 0
									? 0
									: j / 2 - f.containerWidth / 2,
							width: f.containerWidth,
						},
						settings.animation_speed,
						function () {
							$pp_pic_holder
								.find('.pp_hoverContainer,#fullResImage')
								.height(f.height)
								.width(f.width),
								$pp_pic_holder
									.find('.pp_fade')
									.fadeIn(settings.animation_speed),
								isSet && 'image' == h(pp_images[set_position])
									? $pp_pic_holder.find('.pp_hoverContainer').show()
									: $pp_pic_holder.find('.pp_hoverContainer').hide(),
								settings.allow_expand &&
									(f.resized
										? e('a.pp_expand,a.pp_contract').show()
										: e('a.pp_expand').hide()),
								!settings.autoplay_slideshow ||
									P ||
									v ||
									e.prettyPhoto.startSlideshow(),
								settings.changepicturecallback(),
								(v = !0);
						}
					),
					m(),
					a.ajaxcallback();
			}
			function n(t) {
				$pp_pic_holder
					.find('#pp_full_res object,#pp_full_res embed')
					.css('visibility', 'hidden'),
					$pp_pic_holder
						.find('.pp_fade')
						.fadeOut(settings.animation_speed, function () {
							e('.pp_loaderIcon').show(), t();
						});
			}
			function r(t) {
				t > 1 ? e('.pp_nav').show() : e('.pp_nav').hide();
			}
			function l(e, t) {
				if (
					((resized = !1),
					d(e, t),
					(imageWidth = e),
					(imageHeight = t),
					(k > j || b > I) && doresize && settings.allow_resize && !$)
				) {
					for (resized = !0, fitting = !1; !fitting; )
						k > j
							? ((imageWidth = j - 200), (imageHeight = (t / e) * imageWidth))
							: b > I
							? ((imageHeight = I - 200), (imageWidth = (e / t) * imageHeight))
							: (fitting = !0),
							(b = imageHeight),
							(k = imageWidth);
					(k > j || b > I) && l(k, b), d(imageWidth, imageHeight);
				}
				return {
					width: Math.floor(imageWidth),
					height: Math.floor(imageHeight),
					containerHeight: Math.floor(b),
					containerWidth: Math.floor(k) + 2 * settings.horizontal_padding,
					contentHeight: Math.floor(y),
					contentWidth: Math.floor(w),
					resized: resized,
				};
			}
			function d(t, i) {
				(t = parseFloat(t)),
					(i = parseFloat(i)),
					($pp_details = $pp_pic_holder.find('.pp_details')),
					$pp_details.width(t),
					(detailsHeight =
						parseFloat($pp_details.css('marginTop')) +
						parseFloat($pp_details.css('marginBottom'))),
					($pp_details = $pp_details
						.clone()
						.addClass(settings.theme)
						.width(t)
						.appendTo(e('body'))
						.css({ position: 'absolute', top: -1e4 })),
					(detailsHeight += $pp_details.height()),
					(detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight),
					$pp_details.remove(),
					($pp_title = $pp_pic_holder.find('.ppt')),
					$pp_title.width(t),
					(titleHeight =
						parseFloat($pp_title.css('marginTop')) +
						parseFloat($pp_title.css('marginBottom'))),
					($pp_title = $pp_title
						.clone()
						.appendTo(e('body'))
						.css({ position: 'absolute', top: -1e4 })),
					(titleHeight += $pp_title.height()),
					$pp_title.remove(),
					(y = i + detailsHeight),
					(w = t),
					(b =
						y +
						titleHeight +
						$pp_pic_holder.find('.pp_top').height() +
						$pp_pic_holder.find('.pp_bottom').height()),
					(k = t);
			}
			function h(e) {
				return e.match(/youtube\.com\/watch/i) || e.match(/youtu\.be/i)
					? 'youtube'
					: e.match(/vimeo\.com/i)
					? 'vimeo'
					: e.match(/\b.mov\b/i)
					? 'quicktime'
					: e.match(/\b.swf\b/i)
					? 'flash'
					: e.match(/\biframe=true\b/i)
					? 'iframe'
					: e.match(/\bajax=true\b/i)
					? 'ajax'
					: e.match(/\bcustom=true\b/i)
					? 'custom'
					: '#' == e.substr(0, 1)
					? 'inline'
					: 'image';
			}
			function c() {
				if (doresize && 'undefined' != typeof $pp_pic_holder) {
					if (
						((scroll_pos = _()),
						(contentHeight = $pp_pic_holder.height()),
						(contentwidth = $pp_pic_holder.width()),
						(projectedTop = I / 2 + scroll_pos.scrollTop - contentHeight / 2),
						projectedTop < 0 && (projectedTop = 0),
						contentHeight > I)
					)
						return;
					$pp_pic_holder.css({
						top: projectedTop,
						left: j / 2 + scroll_pos.scrollLeft - contentwidth / 2,
					});
				}
			}
			function _() {
				return self.pageYOffset
					? { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset }
					: document.documentElement && document.documentElement.scrollTop
					? {
							scrollTop: document.documentElement.scrollTop,
							scrollLeft: document.documentElement.scrollLeft,
					  }
					: document.body
					? {
							scrollTop: document.body.scrollTop,
							scrollLeft: document.body.scrollLeft,
					  }
					: void 0;
			}
			function g() {
				(I = e(window).height()),
					(j = e(window).width()),
					'undefined' != typeof $pp_overlay &&
						$pp_overlay.height(e(document).height()).width(j);
			}
			function m() {
				isSet &&
				settings.overlay_gallery &&
				'image' == h(pp_images[set_position])
					? ((itemWidth = 57),
					  (navWidth =
							'facebook' == settings.theme || 'pp_default' == settings.theme
								? 50
								: 30),
					  (itemsPerPage = Math.floor(
							(f.containerWidth - 100 - navWidth) / itemWidth
					  )),
					  (itemsPerPage =
							itemsPerPage < pp_images.length
								? itemsPerPage
								: pp_images.length),
					  (totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1),
					  0 == totalPage
							? ((navWidth = 0),
							  $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide())
							: $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show(),
					  (galleryWidth = itemsPerPage * itemWidth),
					  (fullGalleryWidth = pp_images.length * itemWidth),
					  $pp_gallery
							.css('margin-left', -(galleryWidth / 2 + navWidth / 2))
							.find('div:first')
							.width(galleryWidth + 5)
							.find('ul')
							.width(fullGalleryWidth)
							.find('li.selected')
							.removeClass('selected'),
					  (goToPage =
							Math.floor(set_position / itemsPerPage) < totalPage
								? Math.floor(set_position / itemsPerPage)
								: totalPage),
					  e.prettyPhoto.changeGalleryPage(goToPage),
					  $pp_gallery_li
							.filter(':eq(' + set_position + ')')
							.addClass('selected'))
					: $pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
			}
			function u() {
				if (
					(settings.social_tools &&
						(facebook_like_link = settings.social_tools.replace(
							'{location_href}',
							encodeURIComponent(location.href)
						)),
					(settings.markup = settings.markup.replace('{pp_social}', '')),
					e('body').append(settings.markup),
					($pp_pic_holder = e('.pp_pic_holder')),
					($ppt = e('.ppt')),
					($pp_overlay = e('div.pp_overlay')),
					isSet && settings.overlay_gallery)
				) {
					(currentGalleryPage = 0), (toInject = '');
					for (var t = 0; t < pp_images.length; t++)
						pp_images[t].match(/\b(jpg|jpeg|png|gif)\b/gi)
							? ((classname = ''), (img_src = pp_images[t]))
							: ((classname = 'default'), (img_src = '')),
							(toInject +=
								"<li class='" +
								classname +
								"'><a href='#'><img src='" +
								img_src +
								"' width='50' alt='' /></a></li>");
					(toInject = settings.gallery_markup.replace(/{gallery}/g, toInject)),
						$pp_pic_holder.find('#pp_full_res').after(toInject),
						($pp_gallery = e('.pp_pic_holder .pp_gallery')),
						($pp_gallery_li = $pp_gallery.find('li')),
						$pp_gallery.find('.pp_arrow_next').click(function () {
							return (
								e.prettyPhoto.changeGalleryPage('next'),
								e.prettyPhoto.stopSlideshow(),
								!1
							);
						}),
						$pp_gallery.find('.pp_arrow_previous').click(function () {
							return (
								e.prettyPhoto.changeGalleryPage('previous'),
								e.prettyPhoto.stopSlideshow(),
								!1
							);
						}),
						$pp_pic_holder.find('.pp_content').hover(
							function () {
								$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
							},
							function () {
								$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
							}
						),
						(itemWidth = 57),
						$pp_gallery_li.each(function (t) {
							e(this)
								.find('a')
								.click(function () {
									return (
										e.prettyPhoto.changePage(t),
										e.prettyPhoto.stopSlideshow(),
										!1
									);
								});
						});
				}
				settings.slideshow &&
					($pp_pic_holder
						.find('.pp_nav')
						.prepend('<a href="#" class="pp_play">Play</a>'),
					$pp_pic_holder.find('.pp_nav .pp_play').click(function () {
						return e.prettyPhoto.startSlideshow(), !1;
					})),
					$pp_pic_holder.attr('class', 'pp_pic_holder ' + settings.theme),
					$pp_overlay
						.css({
							opacity: 0,
							height: e(document).height(),
							width: e(window).width(),
						})
						.bind('click', function () {
							settings.modal || e.prettyPhoto.close();
						}),
					e('a.pp_close').bind('click', function () {
						return e.prettyPhoto.close(), !1;
					}),
					settings.allow_expand &&
						e('a.pp_expand').bind('click', function () {
							return (
								e(this).hasClass('pp_expand')
									? (e(this).removeClass('pp_expand').addClass('pp_contract'),
									  (doresize = !1))
									: (e(this).removeClass('pp_contract').addClass('pp_expand'),
									  (doresize = !0)),
								n(function () {
									e.prettyPhoto.open();
								}),
								!1
							);
						}),
					$pp_pic_holder
						.find('.pp_previous, .pp_nav .pp_arrow_previous')
						.bind('click', function () {
							return (
								e.prettyPhoto.changePage('previous'),
								e.prettyPhoto.stopSlideshow(),
								!1
							);
						}),
					$pp_pic_holder
						.find('.pp_next, .pp_nav .pp_arrow_next')
						.bind('click', function () {
							return (
								e.prettyPhoto.changePage('next'),
								e.prettyPhoto.stopSlideshow(),
								!1
							);
						}),
					c();
			}
			a = jQuery.extend(
				{
					hook: 'rel',
					animation_speed: 'fast',
					ajaxcallback: function () {},
					slideshow: 5e3,
					autoplay_slideshow: !1,
					opacity: 0.8,
					show_title: !0,
					allow_resize: !0,
					allow_expand: !0,
					default_width: 500,
					default_height: 344,
					counter_separator_label: '/',
					theme: 'pp_default',
					horizontal_padding: 20,
					hideflash: !1,
					wmode: 'opaque',
					autoplay: !0,
					modal: !1,
					deeplinking: !0,
					overlay_gallery: !0,
					overlay_gallery_max: 30,
					keyboard_shortcuts: !0,
					changepicturecallback: function () {},
					callback: function () {},
					ie6_fallback: !0,
					markup:
						'<div class="pp_pic_holder">       <div class="ppt">&nbsp;</div>       <div class="pp_top">        <div class="pp_left"></div>        <div class="pp_middle"></div>        <div class="pp_right"></div>       </div>       <div class="pp_content_container">        <div class="pp_left">        <div class="pp_right">         <div class="pp_content">          <div class="pp_loaderIcon"></div>          <div class="pp_fade">           <a href="#" class="pp_expand" title="Expand the image">Expand</a>           <div class="pp_hoverContainer">            <a class="pp_next" href="#">next</a>            <a class="pp_previous" href="#">previous</a>           </div>           <div id="pp_full_res"></div>           <div class="pp_details">            <div class="pp_nav">             <a href="#" class="pp_arrow_previous">Previous</a>             <p class="currentTextHolder">0/0</p>             <a href="#" class="pp_arrow_next">Next</a>            </div>            <p class="pp_description"></p>            <div class="pp_social">{pp_social}</div>            <a class="pp_close" href="#">Close</a>           </div>          </div>         </div>        </div>        </div>       </div>       <div class="pp_bottom">        <div class="pp_left"></div>        <div class="pp_middle"></div>        <div class="pp_right"></div>       </div>      </div>      <div class="pp_overlay"></div>',
					gallery_markup:
						'<div class="pp_gallery">         <a href="#" class="pp_arrow_previous">Previous</a>         <div>          <ul>           {gallery}          </ul>         </div>         <a href="#" class="pp_arrow_next">Next</a>        </div>',
					image_markup: '<img id="fullResImage" src="{path}" />',
					flash_markup:
						'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
					quicktime_markup:
						'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
					iframe_markup:
						'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
					inline_markup: '<div class="pp_inline">{content}</div>',
					custom_markup: '',
					social_tools:
						'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>',
				},
				a
			);
			var f,
				v,
				y,
				w,
				b,
				k,
				P,
				x = this,
				$ = !1,
				I = e(window).height(),
				j = e(window).width();
			return (
				(doresize = !0),
				(scroll_pos = _()),
				e(window)
					.unbind('resize.prettyphoto')
					.bind('resize.prettyphoto', function () {
						c(), g();
					}),
				a.keyboard_shortcuts &&
					e(document)
						.unbind('keydown.prettyphoto')
						.bind('keydown.prettyphoto', function (t) {
							if (
								'undefined' != typeof $pp_pic_holder &&
								$pp_pic_holder.is(':visible')
							)
								switch (t.keyCode) {
									case 37:
										e.prettyPhoto.changePage('previous'), t.preventDefault();
										break;
									case 39:
										e.prettyPhoto.changePage('next'), t.preventDefault();
										break;
									case 27:
										settings.modal || e.prettyPhoto.close(), t.preventDefault();
								}
						}),
				(e.prettyPhoto.initialize = function () {
					return (
						(settings = a),
						'pp_default' == settings.theme &&
							(settings.horizontal_padding = 16),
						(theRel = e(this).attr(settings.hook)),
						(galleryRegExp = /\[(?:.*)\]/),
						(isSet = galleryRegExp.exec(theRel) ? !0 : !1),
						(pp_images = isSet
							? jQuery.map(x, function (t) {
									return -1 != e(t).attr(settings.hook).indexOf(theRel)
										? e(t).attr('href')
										: void 0;
							  })
							: e.makeArray(e(this).attr('href'))),
						(pp_titles = isSet
							? jQuery.map(x, function (t) {
									return -1 != e(t).attr(settings.hook).indexOf(theRel)
										? e(t).find('img').attr('alt')
											? e(t).find('img').attr('alt')
											: ''
										: void 0;
							  })
							: e.makeArray(e(this).find('img').attr('alt'))),
						(pp_descriptions = isSet
							? jQuery.map(x, function (t) {
									return -1 != e(t).attr(settings.hook).indexOf(theRel)
										? e(t).attr('title')
											? e(t).attr('title')
											: ''
										: void 0;
							  })
							: e.makeArray(e(this).attr('title'))),
						pp_images.length > settings.overlay_gallery_max &&
							(settings.overlay_gallery = !1),
						(set_position = jQuery.inArray(e(this).attr('href'), pp_images)),
						(rel_index = isSet
							? set_position
							: e('a[' + settings.hook + "^='" + theRel + "']").index(e(this))),
						u(this),
						settings.allow_resize &&
							e(window).bind('scroll.prettyphoto', function () {
								c();
							}),
						e.prettyPhoto.open(),
						!1
					);
				}),
				(e.prettyPhoto.open = function (t) {
					return (
						'undefined' == typeof settings &&
							((settings = a),
							(pp_images = e.makeArray(arguments[0])),
							(pp_titles = e.makeArray(arguments[1] ? arguments[1] : '')),
							(pp_descriptions = e.makeArray(arguments[2] ? arguments[2] : '')),
							(isSet = pp_images.length > 1 ? !0 : !1),
							(set_position = arguments[3] ? arguments[3] : 0),
							u(t.target)),
						settings.hideflash &&
							e('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css(
								'visibility',
								'hidden'
							),
						r(e(pp_images).size()),
						e('.pp_loaderIcon').show(),
						settings.deeplinking && i(),
						settings.social_tools &&
							((facebook_like_link = settings.social_tools.replace(
								'{location_href}',
								encodeURIComponent(location.href)
							)),
							$pp_pic_holder.find('.pp_social').html(facebook_like_link)),
						$ppt.is(':hidden') && $ppt.css('opacity', 0).show(),
						$pp_overlay
							.show()
							.fadeTo(settings.animation_speed, settings.opacity),
						$pp_pic_holder
							.find('.currentTextHolder')
							.text(
								set_position +
									1 +
									settings.counter_separator_label +
									e(pp_images).size()
							),
						'undefined' != typeof pp_descriptions[set_position] &&
						'' != pp_descriptions[set_position]
							? $pp_pic_holder
									.find('.pp_description')
									.show()
									.html(unescape(pp_descriptions[set_position]))
							: $pp_pic_holder.find('.pp_description').hide(),
						(movie_width = parseFloat(o('width', pp_images[set_position]))
							? o('width', pp_images[set_position])
							: settings.default_width.toString()),
						(movie_height = parseFloat(o('height', pp_images[set_position]))
							? o('height', pp_images[set_position])
							: settings.default_height.toString()),
						($ = !1),
						-1 != movie_height.indexOf('%') &&
							((movie_height = parseFloat(
								(e(window).height() * parseFloat(movie_height)) / 100 - 150
							)),
							($ = !0)),
						-1 != movie_width.indexOf('%') &&
							((movie_width = parseFloat(
								(e(window).width() * parseFloat(movie_width)) / 100 - 150
							)),
							($ = !0)),
						$pp_pic_holder.fadeIn(function () {
							switch (
								($ppt.html(
									settings.show_title &&
										'' != pp_titles[set_position] &&
										'undefined' != typeof pp_titles[set_position]
										? unescape(pp_titles[set_position])
										: '&nbsp;'
								),
								(imgPreloader = ''),
								(skipInjection = !1),
								h(pp_images[set_position]))
							) {
								case 'image':
									(imgPreloader = new Image()),
										(nextImage = new Image()),
										isSet &&
											set_position < e(pp_images).size() - 1 &&
											(nextImage.src = pp_images[set_position + 1]),
										(prevImage = new Image()),
										isSet &&
											pp_images[set_position - 1] &&
											(prevImage.src = pp_images[set_position - 1]),
										($pp_pic_holder.find(
											'#pp_full_res'
										)[0].innerHTML = settings.image_markup.replace(
											/{path}/g,
											pp_images[set_position]
										)),
										(imgPreloader.onload = function () {
											(f = l(imgPreloader.width, imgPreloader.height)), s();
										}),
										(imgPreloader.onerror = function () {
											alert(
												'Image cannot be loaded. Make sure the path is correct and image exist.'
											),
												e.prettyPhoto.close();
										}),
										(imgPreloader.src = pp_images[set_position]);
									break;
								case 'youtube':
									(f = l(movie_width, movie_height)),
										(movie_id = o('v', pp_images[set_position])),
										'' == movie_id &&
											((movie_id = pp_images[set_position].split('youtu.be/')),
											(movie_id = movie_id[1]),
											movie_id.indexOf('?') > 0 &&
												(movie_id = movie_id.substr(0, movie_id.indexOf('?'))),
											movie_id.indexOf('&') > 0 &&
												(movie_id = movie_id.substr(0, movie_id.indexOf('&')))),
										(movie = 'https://www.youtube.com/embed/' + movie_id),
										(movie += o('rel', pp_images[set_position])
											? '?rel=' + o('rel', pp_images[set_position])
											: '?rel=1'),
										settings.autoplay && (movie += '&autoplay=1'),
										(toInject = settings.iframe_markup
											.replace(/{width}/g, f.width)
											.replace(/{height}/g, f.height)
											.replace(/{wmode}/g, settings.wmode)
											.replace(/{path}/g, movie));
									break;
								case 'vimeo':
									(f = l(movie_width, movie_height)),
										(movie_id = pp_images[set_position]);
									var t = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/,
										i = movie_id.match(t);
									(movie =
										'https://player.vimeo.com/video/' +
										i[3] +
										'?title=0&byline=0&portrait=0'),
										settings.autoplay && (movie += '&autoplay=1;'),
										(vimeo_width = f.width + '/embed/?moog_width=' + f.width),
										(toInject = settings.iframe_markup
											.replace(/{width}/g, vimeo_width)
											.replace(/{height}/g, f.height)
											.replace(/{path}/g, movie));
									break;
								case 'quicktime':
									(f = l(movie_width, movie_height)),
										(f.height += 15),
										(f.contentHeight += 15),
										(f.containerHeight += 15),
										(toInject = settings.quicktime_markup
											.replace(/{width}/g, f.width)
											.replace(/{height}/g, f.height)
											.replace(/{wmode}/g, settings.wmode)
											.replace(/{path}/g, pp_images[set_position])
											.replace(/{autoplay}/g, settings.autoplay));
									break;
								case 'flash':
									(f = l(movie_width, movie_height)),
										(flash_vars = pp_images[set_position]),
										(flash_vars = flash_vars.substring(
											pp_images[set_position].indexOf('flashvars') + 10,
											pp_images[set_position].length
										)),
										(filename = pp_images[set_position]),
										(filename = filename.substring(0, filename.indexOf('?'))),
										(toInject = settings.flash_markup
											.replace(/{width}/g, f.width)
											.replace(/{height}/g, f.height)
											.replace(/{wmode}/g, settings.wmode)
											.replace(/{path}/g, filename + '?' + flash_vars));
									break;
								case 'iframe':
									(f = l(movie_width, movie_height)),
										(frame_url = pp_images[set_position]),
										(frame_url = frame_url.substr(
											0,
											frame_url.indexOf('iframe') - 1
										)),
										(toInject = settings.iframe_markup
											.replace(/{width}/g, f.width)
											.replace(/{height}/g, f.height)
											.replace(/{path}/g, frame_url));
									break;
								case 'ajax':
									(doresize = !1),
										(f = l(movie_width, movie_height)),
										(doresize = !0),
										(skipInjection = !0),
										e.get(pp_images[set_position], function (e) {
											(toInject = settings.inline_markup.replace(
												/{content}/g,
												e
											)),
												($pp_pic_holder.find(
													'#pp_full_res'
												)[0].innerHTML = toInject),
												s();
										});
									break;
								case 'custom':
									(f = l(movie_width, movie_height)),
										(toInject = settings.custom_markup);
									break;
								case 'inline':
									(myClone = e(pp_images[set_position])
										.clone()
										.append('<br clear="all" />')
										.css({ width: settings.default_width })
										.wrapInner(
											'<div id="pp_full_res"><div class="pp_inline"></div></div>'
										)
										.appendTo(e('body'))
										.show()),
										(doresize = !1),
										(f = l(e(myClone).width(), e(myClone).height())),
										(doresize = !0),
										e(myClone).remove(),
										(toInject = settings.inline_markup.replace(
											/{content}/g,
											e(pp_images[set_position]).html()
										));
							}
							imgPreloader ||
								skipInjection ||
								(($pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject),
								s());
						}),
						!1
					);
				}),
				(e.prettyPhoto.changePage = function (t) {
					(currentGalleryPage = 0),
						'previous' == t
							? (set_position--,
							  set_position < 0 && (set_position = e(pp_images).size() - 1))
							: 'next' == t
							? (set_position++,
							  set_position > e(pp_images).size() - 1 && (set_position = 0))
							: (set_position = t),
						(rel_index = set_position),
						doresize || (doresize = !0),
						settings.allow_expand &&
							e('.pp_contract')
								.removeClass('pp_contract')
								.addClass('pp_expand'),
						n(function () {
							e.prettyPhoto.open();
						});
				}),
				(e.prettyPhoto.changeGalleryPage = function (e) {
					'next' == e
						? (currentGalleryPage++,
						  currentGalleryPage > totalPage && (currentGalleryPage = 0))
						: 'previous' == e
						? (currentGalleryPage--,
						  currentGalleryPage < 0 && (currentGalleryPage = totalPage))
						: (currentGalleryPage = e),
						(slide_speed =
							'next' == e || 'previous' == e ? settings.animation_speed : 0),
						(slide_to = currentGalleryPage * itemsPerPage * itemWidth),
						$pp_gallery.find('ul').animate({ left: -slide_to }, slide_speed);
				}),
				(e.prettyPhoto.startSlideshow = function () {
					'undefined' == typeof P
						? ($pp_pic_holder
								.find('.pp_play')
								.unbind('click')
								.removeClass('pp_play')
								.addClass('pp_pause')
								.click(function () {
									return e.prettyPhoto.stopSlideshow(), !1;
								}),
						  (P = setInterval(
								e.prettyPhoto.startSlideshow,
								settings.slideshow
						  )))
						: e.prettyPhoto.changePage('next');
				}),
				(e.prettyPhoto.stopSlideshow = function () {
					$pp_pic_holder
						.find('.pp_pause')
						.unbind('click')
						.removeClass('pp_pause')
						.addClass('pp_play')
						.click(function () {
							return e.prettyPhoto.startSlideshow(), !1;
						}),
						clearInterval(P),
						(P = void 0);
				}),
				(e.prettyPhoto.close = function () {
					$pp_overlay.is(':animated') ||
						(e.prettyPhoto.stopSlideshow(),
						$pp_pic_holder
							.stop()
							.find('object,embed')
							.css('visibility', 'hidden'),
						e('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(
							settings.animation_speed,
							function () {
								e(this).remove();
							}
						),
						$pp_overlay.fadeOut(settings.animation_speed, function () {
							settings.hideflash &&
								e('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css(
									'visibility',
									'visible'
								),
								e(this).remove(),
								e(window).unbind('scroll.prettyphoto'),
								p(),
								settings.callback(),
								(doresize = !0),
								(v = !1),
								delete settings;
						}));
				}),
				!pp_alreadyInitialized &&
					t() &&
					((pp_alreadyInitialized = !0),
					(hashIndex = t()),
					(hashRel = hashIndex),
					(hashIndex = hashIndex.substring(
						hashIndex.indexOf('/') + 1,
						hashIndex.length - 1
					)),
					(hashRel = hashRel.substring(0, hashRel.indexOf('/'))),
					setTimeout(function () {
						e(
							'a[' + a.hook + "^='" + hashRel + "']:eq(" + hashIndex + ')'
						).trigger('click');
					}, 50)),
				this.unbind('click.prettyphoto').bind(
					'click.prettyphoto',
					e.prettyPhoto.initialize
				)
			);
		});
})(jQuery);
var pp_alreadyInitialized = !1;

!(function (a, b, c, d) {
	function e(b, c) {
		(this.settings = null),
			(this.options = a.extend({}, e.Defaults, c)),
			(this.$element = a(b)),
			(this._handlers = {}),
			(this._plugins = {}),
			(this._supress = {}),
			(this._current = null),
			(this._speed = null),
			(this._coordinates = []),
			(this._breakpoint = null),
			(this._width = null),
			(this._items = []),
			(this._clones = []),
			(this._mergers = []),
			(this._widths = []),
			(this._invalidated = {}),
			(this._pipe = []),
			(this._drag = {
				time: null,
				target: null,
				pointer: null,
				stage: { start: null, current: null },
				direction: null,
			}),
			(this._states = {
				current: {},
				tags: {
					initializing: ['busy'],
					animating: ['busy'],
					dragging: ['interacting'],
				},
			}),
			a.each(
				['onResize', 'onThrottledResize'],
				a.proxy(function (b, c) {
					this._handlers[c] = a.proxy(this[c], this);
				}, this)
			),
			a.each(
				e.Plugins,
				a.proxy(function (a, b) {
					this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
				}, this)
			),
			a.each(
				e.Workers,
				a.proxy(function (b, c) {
					this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
				}, this)
			),
			this.setup(),
			this.initialize();
	}
	(e.Defaults = {
		items: 3,
		loop: !1,
		center: !1,
		rewind: !1,
		mouseDrag: !0,
		touchDrag: !0,
		pullDrag: !0,
		freeDrag: !1,
		margin: 0,
		stagePadding: 0,
		merge: !1,
		mergeFit: !0,
		autoWidth: !1,
		startPosition: 0,
		rtl: !1,
		smartSpeed: 250,
		fluidSpeed: !1,
		dragEndSpeed: !1,
		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: b,
		fallbackEasing: 'swing',
		info: !1,
		nestedItemSelector: !1,
		itemElement: 'div',
		stageElement: 'div',
		refreshClass: 'owl-refresh',
		loadedClass: 'owl-loaded',
		loadingClass: 'owl-loading',
		rtlClass: 'owl-rtl',
		responsiveClass: 'owl-responsive',
		dragClass: 'owl-drag',
		itemClass: 'owl-item',
		stageClass: 'owl-stage',
		stageOuterClass: 'owl-stage-outer',
		grabClass: 'owl-grab',
	}),
		(e.Width = { Default: 'default', Inner: 'inner', Outer: 'outer' }),
		(e.Type = { Event: 'event', State: 'state' }),
		(e.Plugins = {}),
		(e.Workers = [
			{
				filter: ['width', 'settings'],
				run: function () {
					this._width = this.$element.width();
				},
			},
			{
				filter: ['width', 'items', 'settings'],
				run: function (a) {
					a.current = this._items && this._items[this.relative(this._current)];
				},
			},
			{
				filter: ['items', 'settings'],
				run: function () {
					this.$stage.children('.cloned').remove();
				},
			},
			{
				filter: ['width', 'items', 'settings'],
				run: function (a) {
					var b = this.settings.margin || '',
						c = !this.settings.autoWidth,
						d = this.settings.rtl,
						e = {
							width: 'auto',
							'margin-left': d ? b : '',
							'margin-right': d ? '' : b,
						};
					!c && this.$stage.children().css(e), (a.css = e);
				},
			},
			{
				filter: ['width', 'items', 'settings'],
				run: function (a) {
					var b =
							(this.width() / this.settings.items).toFixed(3) -
							this.settings.margin,
						c = null,
						d = this._items.length,
						e = !this.settings.autoWidth,
						f = [];
					for (a.items = { merge: !1, width: b }; d--; )
						(c = this._mergers[d]),
							(c =
								(this.settings.mergeFit && Math.min(c, this.settings.items)) ||
								c),
							(a.items.merge = c > 1 || a.items.merge),
							(f[d] = e ? b * c : this._items[d].width());
					this._widths = f;
				},
			},
			{
				filter: ['items', 'settings'],
				run: function () {
					var b = [],
						c = this._items,
						d = this.settings,
						e = Math.max(2 * d.items, 4),
						f = 2 * Math.ceil(c.length / 2),
						g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
						h = '',
						i = '';
					for (g /= 2; g--; )
						b.push(this.normalize(b.length / 2, !0)),
							(h += c[b[b.length - 1]][0].outerHTML),
							b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
							(i = c[b[b.length - 1]][0].outerHTML + i);
					(this._clones = b),
						a(h).addClass('cloned').appendTo(this.$stage),
						a(i).addClass('cloned').prependTo(this.$stage);
				},
			},
			{
				filter: ['width', 'items', 'settings'],
				run: function () {
					for (
						var a = this.settings.rtl ? 1 : -1,
							b = this._clones.length + this._items.length,
							c = -1,
							d = 0,
							e = 0,
							f = [];
						++c < b;

					)
						(d = f[c - 1] || 0),
							(e = this._widths[this.relative(c)] + this.settings.margin),
							f.push(d + e * a);
					this._coordinates = f;
				},
			},
			{
				filter: ['width', 'items', 'settings'],
				run: function () {
					var a = this.settings.stagePadding,
						b = this._coordinates,
						c = {
							width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
							'padding-left': a || '',
							'padding-right': a || '',
						};
					this.$stage.css(c);
				},
			},
			{
				filter: ['width', 'items', 'settings'],
				run: function (a) {
					var b = this._coordinates.length,
						c = !this.settings.autoWidth,
						d = this.$stage.children();
					if (c && a.items.merge)
						for (; b--; )
							(a.css.width = this._widths[this.relative(b)]),
								d.eq(b).css(a.css);
					else c && ((a.css.width = a.items.width), d.css(a.css));
				},
			},
			{
				filter: ['items'],
				run: function () {
					this._coordinates.length < 1 && this.$stage.removeAttr('style');
				},
			},
			{
				filter: ['width', 'items', 'settings'],
				run: function (a) {
					(a.current = a.current ? this.$stage.children().index(a.current) : 0),
						(a.current = Math.max(
							this.minimum(),
							Math.min(this.maximum(), a.current)
						)),
						this.reset(a.current);
				},
			},
			{
				filter: ['position'],
				run: function () {
					this.animate(this.coordinates(this._current));
				},
			},
			{
				filter: ['width', 'position', 'items', 'settings'],
				run: function () {
					var a,
						b,
						c,
						d,
						e = this.settings.rtl ? 1 : -1,
						f = 2 * this.settings.stagePadding,
						g = this.coordinates(this.current()) + f,
						h = g + this.width() * e,
						i = [];
					for (c = 0, d = this._coordinates.length; c < d; c++)
						(a = this._coordinates[c - 1] || 0),
							(b = Math.abs(this._coordinates[c]) + f * e),
							((this.op(a, '<=', g) && this.op(a, '>', h)) ||
								(this.op(b, '<', g) && this.op(b, '>', h))) &&
								i.push(c);
					this.$stage.children('.active').removeClass('active'),
						this.$stage
							.children(':eq(' + i.join('), :eq(') + ')')
							.addClass('active'),
						this.settings.center &&
							(this.$stage.children('.center').removeClass('center'),
							this.$stage.children().eq(this.current()).addClass('center'));
				},
			},
		]),
		(e.prototype.initialize = function () {
			if (
				(this.enter('initializing'),
				this.trigger('initialize'),
				this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
				this.settings.autoWidth && !this.is('pre-loading'))
			) {
				var b, c, e;
				(b = this.$element.find('img')),
					(c = this.settings.nestedItemSelector
						? '.' + this.settings.nestedItemSelector
						: d),
					(e = this.$element.children(c).width()),
					b.length && e <= 0 && this.preloadAutoWidthImages(b);
			}
			this.$element.addClass(this.options.loadingClass),
				(this.$stage = a(
					'<' +
						this.settings.stageElement +
						' class="' +
						this.settings.stageClass +
						'"/>'
				).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
				this.$element.append(this.$stage.parent()),
				this.replace(this.$element.children().not(this.$stage.parent())),
				this.$element.is(':visible')
					? this.refresh()
					: this.invalidate('width'),
				this.$element
					.removeClass(this.options.loadingClass)
					.addClass(this.options.loadedClass),
				this.registerEventHandlers(),
				this.leave('initializing'),
				this.trigger('initialized');
		}),
		(e.prototype.setup = function () {
			var b = this.viewport(),
				c = this.options.responsive,
				d = -1,
				e = null;
			c
				? (a.each(c, function (a) {
						a <= b && a > d && (d = Number(a));
				  }),
				  (e = a.extend({}, this.options, c[d])),
				  'function' == typeof e.stagePadding &&
						(e.stagePadding = e.stagePadding()),
				  delete e.responsive,
				  e.responsiveClass &&
						this.$element.attr(
							'class',
							this.$element
								.attr('class')
								.replace(
									new RegExp(
										'(' + this.options.responsiveClass + '-)\\S+\\s',
										'g'
									),
									'$1' + d
								)
						))
				: (e = a.extend({}, this.options)),
				this.trigger('change', { property: { name: 'settings', value: e } }),
				(this._breakpoint = d),
				(this.settings = e),
				this.invalidate('settings'),
				this.trigger('changed', {
					property: { name: 'settings', value: this.settings },
				});
		}),
		(e.prototype.optionsLogic = function () {
			this.settings.autoWidth &&
				((this.settings.stagePadding = !1), (this.settings.merge = !1));
		}),
		(e.prototype.prepare = function (b) {
			var c = this.trigger('prepare', { content: b });
			return (
				c.data ||
					(c.data = a('<' + this.settings.itemElement + '/>')
						.addClass(this.options.itemClass)
						.append(b)),
				this.trigger('prepared', { content: c.data }),
				c.data
			);
		}),
		(e.prototype.update = function () {
			for (
				var b = 0,
					c = this._pipe.length,
					d = a.proxy(function (a) {
						return this[a];
					}, this._invalidated),
					e = {};
				b < c;

			)
				(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
					this._pipe[b].run(e),
					b++;
			(this._invalidated = {}), !this.is('valid') && this.enter('valid');
		}),
		(e.prototype.width = function (a) {
			switch ((a = a || e.Width.Default)) {
				case e.Width.Inner:
				case e.Width.Outer:
					return this._width;
				default:
					return (
						this._width - 2 * this.settings.stagePadding + this.settings.margin
					);
			}
		}),
		(e.prototype.refresh = function () {
			this.enter('refreshing'),
				this.trigger('refresh'),
				this.setup(),
				this.optionsLogic(),
				this.$element.addClass(this.options.refreshClass),
				this.update(),
				this.$element.removeClass(this.options.refreshClass),
				this.leave('refreshing'),
				this.trigger('refreshed');
		}),
		(e.prototype.onThrottledResize = function () {
			b.clearTimeout(this.resizeTimer),
				(this.resizeTimer = b.setTimeout(
					this._handlers.onResize,
					this.settings.responsiveRefreshRate
				));
		}),
		(e.prototype.onResize = function () {
			return (
				!!this._items.length &&
				this._width !== this.$element.width() &&
				!!this.$element.is(':visible') &&
				(this.enter('resizing'),
				this.trigger('resize').isDefaultPrevented()
					? (this.leave('resizing'), !1)
					: (this.invalidate('width'),
					  this.refresh(),
					  this.leave('resizing'),
					  void this.trigger('resized')))
			);
		}),
		(e.prototype.registerEventHandlers = function () {
			a.support.transition &&
				this.$stage.on(
					a.support.transition.end + '.owl.core',
					a.proxy(this.onTransitionEnd, this)
				),
				this.settings.responsive !== !1 &&
					this.on(b, 'resize', this._handlers.onThrottledResize),
				this.settings.mouseDrag &&
					(this.$element.addClass(this.options.dragClass),
					this.$stage.on('mousedown.owl.core', a.proxy(this.onDragStart, this)),
					this.$stage.on(
						'dragstart.owl.core selectstart.owl.core',
						function () {
							return !1;
						}
					)),
				this.settings.touchDrag &&
					(this.$stage.on(
						'touchstart.owl.core',
						a.proxy(this.onDragStart, this)
					),
					this.$stage.on(
						'touchcancel.owl.core',
						a.proxy(this.onDragEnd, this)
					));
		}),
		(e.prototype.onDragStart = function (b) {
			var d = null;
			3 !== b.which &&
				(a.support.transform
					? ((d = this.$stage
							.css('transform')
							.replace(/.*\(|\)| /g, '')
							.split(',')),
					  (d = {
							x: d[16 === d.length ? 12 : 4],
							y: d[16 === d.length ? 13 : 5],
					  }))
					: ((d = this.$stage.position()),
					  (d = {
							x: this.settings.rtl
								? d.left +
								  this.$stage.width() -
								  this.width() +
								  this.settings.margin
								: d.left,
							y: d.top,
					  })),
				this.is('animating') &&
					(a.support.transform ? this.animate(d.x) : this.$stage.stop(),
					this.invalidate('position')),
				this.$element.toggleClass(
					this.options.grabClass,
					'mousedown' === b.type
				),
				this.speed(0),
				(this._drag.time = new Date().getTime()),
				(this._drag.target = a(b.target)),
				(this._drag.stage.start = d),
				(this._drag.stage.current = d),
				(this._drag.pointer = this.pointer(b)),
				a(c).on(
					'mouseup.owl.core touchend.owl.core',
					a.proxy(this.onDragEnd, this)
				),
				a(c).one(
					'mousemove.owl.core touchmove.owl.core',
					a.proxy(function (b) {
						var d = this.difference(this._drag.pointer, this.pointer(b));
						a(c).on(
							'mousemove.owl.core touchmove.owl.core',
							a.proxy(this.onDragMove, this)
						),
							(Math.abs(d.x) < Math.abs(d.y) && this.is('valid')) ||
								(b.preventDefault(),
								this.enter('dragging'),
								this.trigger('drag'));
					}, this)
				));
		}),
		(e.prototype.onDragMove = function (a) {
			var b = null,
				c = null,
				d = null,
				e = this.difference(this._drag.pointer, this.pointer(a)),
				f = this.difference(this._drag.stage.start, e);
			this.is('dragging') &&
				(a.preventDefault(),
				this.settings.loop
					? ((b = this.coordinates(this.minimum())),
					  (c = this.coordinates(this.maximum() + 1) - b),
					  (f.x = ((((f.x - b) % c) + c) % c) + b))
					: ((b = this.settings.rtl
							? this.coordinates(this.maximum())
							: this.coordinates(this.minimum())),
					  (c = this.settings.rtl
							? this.coordinates(this.minimum())
							: this.coordinates(this.maximum())),
					  (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
					  (f.x = Math.max(Math.min(f.x, b + d), c + d))),
				(this._drag.stage.current = f),
				this.animate(f.x));
		}),
		(e.prototype.onDragEnd = function (b) {
			var d = this.difference(this._drag.pointer, this.pointer(b)),
				e = this._drag.stage.current,
				f = (d.x > 0) ^ this.settings.rtl ? 'left' : 'right';
			a(c).off('.owl.core'),
				this.$element.removeClass(this.options.grabClass),
				((0 !== d.x && this.is('dragging')) || !this.is('valid')) &&
					(this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
					this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
					this.invalidate('position'),
					this.update(),
					(this._drag.direction = f),
					(Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
						this._drag.target.one('click.owl.core', function () {
							return !1;
						})),
				this.is('dragging') &&
					(this.leave('dragging'), this.trigger('dragged'));
		}),
		(e.prototype.closest = function (b, c) {
			var d = -1,
				e = 30,
				f = this.width(),
				g = this.coordinates();
			return (
				this.settings.freeDrag ||
					a.each(
						g,
						a.proxy(function (a, h) {
							return (
								'left' === c && b > h - e && b < h + e
									? (d = a)
									: 'right' === c && b > h - f - e && b < h - f + e
									? (d = a + 1)
									: this.op(b, '<', h) &&
									  this.op(b, '>', g[a + 1] || h - f) &&
									  (d = 'left' === c ? a + 1 : a),
								d === -1
							);
						}, this)
					),
				this.settings.loop ||
					(this.op(b, '>', g[this.minimum()])
						? (d = b = this.minimum())
						: this.op(b, '<', g[this.maximum()]) && (d = b = this.maximum())),
				d
			);
		}),
		(e.prototype.animate = function (b) {
			var c = this.speed() > 0;
			this.is('animating') && this.onTransitionEnd(),
				c && (this.enter('animating'), this.trigger('translate')),
				a.support.transform3d && a.support.transition
					? this.$stage.css({
							transform: 'translate3d(' + b + 'px,0px,0px)',
							transition: this.speed() / 1e3 + 's',
					  })
					: c
					? this.$stage.animate(
							{ left: b + 'px' },
							this.speed(),
							this.settings.fallbackEasing,
							a.proxy(this.onTransitionEnd, this)
					  )
					: this.$stage.css({ left: b + 'px' });
		}),
		(e.prototype.is = function (a) {
			return this._states.current[a] && this._states.current[a] > 0;
		}),
		(e.prototype.current = function (a) {
			if (a === d) return this._current;
			if (0 === this._items.length) return d;
			if (((a = this.normalize(a)), this._current !== a)) {
				var b = this.trigger('change', {
					property: { name: 'position', value: a },
				});
				b.data !== d && (a = this.normalize(b.data)),
					(this._current = a),
					this.invalidate('position'),
					this.trigger('changed', {
						property: { name: 'position', value: this._current },
					});
			}
			return this._current;
		}),
		(e.prototype.invalidate = function (b) {
			return (
				'string' === a.type(b) &&
					((this._invalidated[b] = !0),
					this.is('valid') && this.leave('valid')),
				a.map(this._invalidated, function (a, b) {
					return b;
				})
			);
		}),
		(e.prototype.reset = function (a) {
			(a = this.normalize(a)),
				a !== d &&
					((this._speed = 0),
					(this._current = a),
					this.suppress(['translate', 'translated']),
					this.animate(this.coordinates(a)),
					this.release(['translate', 'translated']));
		}),
		(e.prototype.normalize = function (a, b) {
			var c = this._items.length,
				e = b ? 0 : this._clones.length;
			return (
				!this.isNumeric(a) || c < 1
					? (a = d)
					: (a < 0 || a >= c + e) &&
					  (a = ((((a - e / 2) % c) + c) % c) + e / 2),
				a
			);
		}),
		(e.prototype.relative = function (a) {
			return (a -= this._clones.length / 2), this.normalize(a, !0);
		}),
		(e.prototype.maximum = function (a) {
			var b,
				c,
				d,
				e = this.settings,
				f = this._coordinates.length;
			if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
			else if (e.autoWidth || e.merge) {
				for (
					b = this._items.length,
						c = this._items[--b].width(),
						d = this.$element.width();
					b-- &&
					((c += this._items[b].width() + this.settings.margin), !(c > d));

				);
				f = b + 1;
			} else
				f = e.center ? this._items.length - 1 : this._items.length - e.items;
			return a && (f -= this._clones.length / 2), Math.max(f, 0);
		}),
		(e.prototype.minimum = function (a) {
			return a ? 0 : this._clones.length / 2;
		}),
		(e.prototype.items = function (a) {
			return a === d
				? this._items.slice()
				: ((a = this.normalize(a, !0)), this._items[a]);
		}),
		(e.prototype.mergers = function (a) {
			return a === d
				? this._mergers.slice()
				: ((a = this.normalize(a, !0)), this._mergers[a]);
		}),
		(e.prototype.clones = function (b) {
			var c = this._clones.length / 2,
				e = c + this._items.length,
				f = function (a) {
					return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
				};
			return b === d
				? a.map(this._clones, function (a, b) {
						return f(b);
				  })
				: a.map(this._clones, function (a, c) {
						return a === b ? f(c) : null;
				  });
		}),
		(e.prototype.speed = function (a) {
			return a !== d && (this._speed = a), this._speed;
		}),
		(e.prototype.coordinates = function (b) {
			var c,
				e = 1,
				f = b - 1;
			return b === d
				? a.map(
						this._coordinates,
						a.proxy(function (a, b) {
							return this.coordinates(b);
						}, this)
				  )
				: (this.settings.center
						? (this.settings.rtl && ((e = -1), (f = b + 1)),
						  (c = this._coordinates[b]),
						  (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
						: (c = this._coordinates[f] || 0),
				  (c = Math.ceil(c)));
		}),
		(e.prototype.duration = function (a, b, c) {
			return 0 === c
				? 0
				: Math.min(Math.max(Math.abs(b - a), 1), 6) *
						Math.abs(c || this.settings.smartSpeed);
		}),
		(e.prototype.to = function (a, b) {
			var c = this.current(),
				d = null,
				e = a - this.relative(c),
				f = (e > 0) - (e < 0),
				g = this._items.length,
				h = this.minimum(),
				i = this.maximum();
			this.settings.loop
				? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
				  (a = c + e),
				  (d = ((((a - h) % g) + g) % g) + h),
				  d !== a &&
						d - e <= i &&
						d - e > 0 &&
						((c = d - e), (a = d), this.reset(c)))
				: this.settings.rewind
				? ((i += 1), (a = ((a % i) + i) % i))
				: (a = Math.max(h, Math.min(i, a))),
				this.speed(this.duration(c, a, b)),
				this.current(a),
				this.$element.is(':visible') && this.update();
		}),
		(e.prototype.next = function (a) {
			(a = a || !1), this.to(this.relative(this.current()) + 1, a);
		}),
		(e.prototype.prev = function (a) {
			(a = a || !1), this.to(this.relative(this.current()) - 1, a);
		}),
		(e.prototype.onTransitionEnd = function (a) {
			if (
				a !== d &&
				(a.stopPropagation(),
				(a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
			)
				return !1;
			this.leave('animating'), this.trigger('translated');
		}),
		(e.prototype.viewport = function () {
			var d;
			return (
				this.options.responsiveBaseElement !== b
					? (d = a(this.options.responsiveBaseElement).width())
					: b.innerWidth
					? (d = b.innerWidth)
					: c.documentElement && c.documentElement.clientWidth
					? (d = c.documentElement.clientWidth)
					: console.warn('Can not detect viewport width.'),
				d
			);
		}),
		(e.prototype.replace = function (b) {
			this.$stage.empty(),
				(this._items = []),
				b && (b = b instanceof jQuery ? b : a(b)),
				this.settings.nestedItemSelector &&
					(b = b.find('.' + this.settings.nestedItemSelector)),
				b
					.filter(function () {
						return 1 === this.nodeType;
					})
					.each(
						a.proxy(function (a, b) {
							(b = this.prepare(b)),
								this.$stage.append(b),
								this._items.push(b),
								this._mergers.push(
									1 *
										b
											.find('[data-merge]')
											.addBack('[data-merge]')
											.attr('data-merge') || 1
								);
						}, this)
					),
				this.reset(
					this.isNumeric(this.settings.startPosition)
						? this.settings.startPosition
						: 0
				),
				this.invalidate('items');
		}),
		(e.prototype.add = function (b, c) {
			var e = this.relative(this._current);
			(c = c === d ? this._items.length : this.normalize(c, !0)),
				(b = b instanceof jQuery ? b : a(b)),
				this.trigger('add', { content: b, position: c }),
				(b = this.prepare(b)),
				0 === this._items.length || c === this._items.length
					? (0 === this._items.length && this.$stage.append(b),
					  0 !== this._items.length && this._items[c - 1].after(b),
					  this._items.push(b),
					  this._mergers.push(
							1 *
								b
									.find('[data-merge]')
									.addBack('[data-merge]')
									.attr('data-merge') || 1
					  ))
					: (this._items[c].before(b),
					  this._items.splice(c, 0, b),
					  this._mergers.splice(
							c,
							0,
							1 *
								b
									.find('[data-merge]')
									.addBack('[data-merge]')
									.attr('data-merge') || 1
					  )),
				this._items[e] && this.reset(this._items[e].index()),
				this.invalidate('items'),
				this.trigger('added', { content: b, position: c });
		}),
		(e.prototype.remove = function (a) {
			(a = this.normalize(a, !0)),
				a !== d &&
					(this.trigger('remove', { content: this._items[a], position: a }),
					this._items[a].remove(),
					this._items.splice(a, 1),
					this._mergers.splice(a, 1),
					this.invalidate('items'),
					this.trigger('removed', { content: null, position: a }));
		}),
		(e.prototype.preloadAutoWidthImages = function (b) {
			b.each(
				a.proxy(function (b, c) {
					this.enter('pre-loading'),
						(c = a(c)),
						a(new Image())
							.one(
								'load',
								a.proxy(function (a) {
									c.attr('src', a.target.src),
										c.css('opacity', 1),
										this.leave('pre-loading'),
										!this.is('pre-loading') &&
											!this.is('initializing') &&
											this.refresh();
								}, this)
							)
							.attr(
								'src',
								c.attr('src') || c.attr('data-src') || c.attr('data-src-retina')
							);
				}, this)
			);
		}),
		(e.prototype.destroy = function () {
			this.$element.off('.owl.core'),
				this.$stage.off('.owl.core'),
				a(c).off('.owl.core'),
				this.settings.responsive !== !1 &&
					(b.clearTimeout(this.resizeTimer),
					this.off(b, 'resize', this._handlers.onThrottledResize));
			for (var d in this._plugins) this._plugins[d].destroy();
			this.$stage.children('.cloned').remove(),
				this.$stage.unwrap(),
				this.$stage.children().contents().unwrap(),
				this.$stage.children().unwrap(),
				this.$element
					.removeClass(this.options.refreshClass)
					.removeClass(this.options.loadingClass)
					.removeClass(this.options.loadedClass)
					.removeClass(this.options.rtlClass)
					.removeClass(this.options.dragClass)
					.removeClass(this.options.grabClass)
					.attr(
						'class',
						this.$element
							.attr('class')
							.replace(
								new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'),
								''
							)
					)
					.removeData('owl.carousel');
		}),
		(e.prototype.op = function (a, b, c) {
			var d = this.settings.rtl;
			switch (b) {
				case '<':
					return d ? a > c : a < c;
				case '>':
					return d ? a < c : a > c;
				case '>=':
					return d ? a <= c : a >= c;
				case '<=':
					return d ? a >= c : a <= c;
			}
		}),
		(e.prototype.on = function (a, b, c, d) {
			a.addEventListener
				? a.addEventListener(b, c, d)
				: a.attachEvent && a.attachEvent('on' + b, c);
		}),
		(e.prototype.off = function (a, b, c, d) {
			a.removeEventListener
				? a.removeEventListener(b, c, d)
				: a.detachEvent && a.detachEvent('on' + b, c);
		}),
		(e.prototype.trigger = function (b, c, d, f, g) {
			var h = { item: { count: this._items.length, index: this.current() } },
				i = a.camelCase(
					a
						.grep(['on', b, d], function (a) {
							return a;
						})
						.join('-')
						.toLowerCase()
				),
				j = a.Event(
					[b, 'owl', d || 'carousel'].join('.').toLowerCase(),
					a.extend({ relatedTarget: this }, h, c)
				);
			return (
				this._supress[b] ||
					(a.each(this._plugins, function (a, b) {
						b.onTrigger && b.onTrigger(j);
					}),
					this.register({ type: e.Type.Event, name: b }),
					this.$element.trigger(j),
					this.settings &&
						'function' == typeof this.settings[i] &&
						this.settings[i].call(this, j)),
				j
			);
		}),
		(e.prototype.enter = function (b) {
			a.each(
				[b].concat(this._states.tags[b] || []),
				a.proxy(function (a, b) {
					this._states.current[b] === d && (this._states.current[b] = 0),
						this._states.current[b]++;
				}, this)
			);
		}),
		(e.prototype.leave = function (b) {
			a.each(
				[b].concat(this._states.tags[b] || []),
				a.proxy(function (a, b) {
					this._states.current[b]--;
				}, this)
			);
		}),
		(e.prototype.register = function (b) {
			if (b.type === e.Type.Event) {
				if (
					(a.event.special[b.name] || (a.event.special[b.name] = {}),
					!a.event.special[b.name].owl)
				) {
					var c = a.event.special[b.name]._default;
					(a.event.special[b.name]._default = function (a) {
						return !c ||
							!c.apply ||
							(a.namespace && a.namespace.indexOf('owl') !== -1)
							? a.namespace && a.namespace.indexOf('owl') > -1
							: c.apply(this, arguments);
					}),
						(a.event.special[b.name].owl = !0);
				}
			} else
				b.type === e.Type.State &&
					(this._states.tags[b.name]
						? (this._states.tags[b.name] = this._states.tags[b.name].concat(
								b.tags
						  ))
						: (this._states.tags[b.name] = b.tags),
					(this._states.tags[b.name] = a.grep(
						this._states.tags[b.name],
						a.proxy(function (c, d) {
							return a.inArray(c, this._states.tags[b.name]) === d;
						}, this)
					)));
		}),
		(e.prototype.suppress = function (b) {
			a.each(
				b,
				a.proxy(function (a, b) {
					this._supress[b] = !0;
				}, this)
			);
		}),
		(e.prototype.release = function (b) {
			a.each(
				b,
				a.proxy(function (a, b) {
					delete this._supress[b];
				}, this)
			);
		}),
		(e.prototype.pointer = function (a) {
			var c = { x: null, y: null };
			return (
				(a = a.originalEvent || a || b.event),
				(a =
					a.touches && a.touches.length
						? a.touches[0]
						: a.changedTouches && a.changedTouches.length
						? a.changedTouches[0]
						: a),
				a.pageX
					? ((c.x = a.pageX), (c.y = a.pageY))
					: ((c.x = a.clientX), (c.y = a.clientY)),
				c
			);
		}),
		(e.prototype.isNumeric = function (a) {
			return !isNaN(parseFloat(a));
		}),
		(e.prototype.difference = function (a, b) {
			return { x: a.x - b.x, y: a.y - b.y };
		}),
		(a.fn.owlCarousel = function (b) {
			var c = Array.prototype.slice.call(arguments, 1);
			return this.each(function () {
				var d = a(this),
					f = d.data('owl.carousel');
				f ||
					((f = new e(this, 'object' == typeof b && b)),
					d.data('owl.carousel', f),
					a.each(
						[
							'next',
							'prev',
							'to',
							'destroy',
							'refresh',
							'replace',
							'add',
							'remove',
						],
						function (b, c) {
							f.register({ type: e.Type.Event, name: c }),
								f.$element.on(
									c + '.owl.carousel.core',
									a.proxy(function (a) {
										a.namespace &&
											a.relatedTarget !== this &&
											(this.suppress([c]),
											f[c].apply(this, [].slice.call(arguments, 1)),
											this.release([c]));
									}, f)
								);
						}
					)),
					'string' == typeof b && '_' !== b.charAt(0) && f[b].apply(f, c);
			});
		}),
		(a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		var e = function (b) {
			(this._core = b),
				(this._interval = null),
				(this._visible = null),
				(this._handlers = {
					'initialized.owl.carousel': a.proxy(function (a) {
						a.namespace && this._core.settings.autoRefresh && this.watch();
					}, this),
				}),
				(this._core.options = a.extend({}, e.Defaults, this._core.options)),
				this._core.$element.on(this._handlers);
		};
		(e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
			(e.prototype.watch = function () {
				this._interval ||
					((this._visible = this._core.$element.is(':visible')),
					(this._interval = b.setInterval(
						a.proxy(this.refresh, this),
						this._core.settings.autoRefreshInterval
					)));
			}),
			(e.prototype.refresh = function () {
				this._core.$element.is(':visible') !== this._visible &&
					((this._visible = !this._visible),
					this._core.$element.toggleClass('owl-hidden', !this._visible),
					this._visible &&
						this._core.invalidate('width') &&
						this._core.refresh());
			}),
			(e.prototype.destroy = function () {
				var a, c;
				b.clearInterval(this._interval);
				for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
				for (c in Object.getOwnPropertyNames(this))
					'function' != typeof this[c] && (this[c] = null);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		var e = function (b) {
			(this._core = b),
				(this._loaded = []),
				(this._handlers = {
					'initialized.owl.carousel change.owl.carousel resized.owl.carousel': a.proxy(
						function (b) {
							if (
								b.namespace &&
								this._core.settings &&
								this._core.settings.lazyLoad &&
								((b.property && 'position' == b.property.name) ||
									'initialized' == b.type)
							)
								for (
									var c = this._core.settings,
										e = (c.center && Math.ceil(c.items / 2)) || c.items,
										f = (c.center && e * -1) || 0,
										g =
											(b.property && b.property.value !== d
												? b.property.value
												: this._core.current()) + f,
										h = this._core.clones().length,
										i = a.proxy(function (a, b) {
											this.load(b);
										}, this);
									f++ < e;

								)
									this.load(h / 2 + this._core.relative(g)),
										h && a.each(this._core.clones(this._core.relative(g)), i),
										g++;
						},
						this
					),
				}),
				(this._core.options = a.extend({}, e.Defaults, this._core.options)),
				this._core.$element.on(this._handlers);
		};
		(e.Defaults = { lazyLoad: !1 }),
			(e.prototype.load = function (c) {
				var d = this._core.$stage.children().eq(c),
					e = d && d.find('.owl-lazy');
				!e ||
					a.inArray(d.get(0), this._loaded) > -1 ||
					(e.each(
						a.proxy(function (c, d) {
							var e,
								f = a(d),
								g =
									(b.devicePixelRatio > 1 && f.attr('data-src-retina')) ||
									f.attr('data-src');
							this._core.trigger('load', { element: f, url: g }, 'lazy'),
								f.is('img')
									? f
											.one(
												'load.owl.lazy',
												a.proxy(function () {
													f.css('opacity', 1),
														this._core.trigger(
															'loaded',
															{ element: f, url: g },
															'lazy'
														);
												}, this)
											)
											.attr('src', g)
									: ((e = new Image()),
									  (e.onload = a.proxy(function () {
											f.css({
												'background-image': 'url("' + g + '")',
												opacity: '1',
											}),
												this._core.trigger(
													'loaded',
													{ element: f, url: g },
													'lazy'
												);
									  }, this)),
									  (e.src = g));
						}, this)
					),
					this._loaded.push(d.get(0)));
			}),
			(e.prototype.destroy = function () {
				var a, b;
				for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
				for (b in Object.getOwnPropertyNames(this))
					'function' != typeof this[b] && (this[b] = null);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		var e = function (b) {
			(this._core = b),
				(this._handlers = {
					'initialized.owl.carousel refreshed.owl.carousel': a.proxy(function (
						a
					) {
						a.namespace && this._core.settings.autoHeight && this.update();
					},
					this),
					'changed.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this._core.settings.autoHeight &&
							'position' == a.property.name &&
							this.update();
					}, this),
					'loaded.owl.lazy': a.proxy(function (a) {
						a.namespace &&
							this._core.settings.autoHeight &&
							a.element.closest('.' + this._core.settings.itemClass).index() ===
								this._core.current() &&
							this.update();
					}, this),
				}),
				(this._core.options = a.extend({}, e.Defaults, this._core.options)),
				this._core.$element.on(this._handlers);
		};
		(e.Defaults = { autoHeight: !1, autoHeightClass: 'owl-height' }),
			(e.prototype.update = function () {
				var b = this._core._current,
					c = b + this._core.settings.items,
					d = this._core.$stage.children().toArray().slice(b, c),
					e = [],
					f = 0;
				a.each(d, function (b, c) {
					e.push(a(c).height());
				}),
					(f = Math.max.apply(null, e)),
					this._core.$stage
						.parent()
						.height(f)
						.addClass(this._core.settings.autoHeightClass);
			}),
			(e.prototype.destroy = function () {
				var a, b;
				for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
				for (b in Object.getOwnPropertyNames(this))
					'function' != typeof this[b] && (this[b] = null);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		var e = function (b) {
			(this._core = b),
				(this._videos = {}),
				(this._playing = null),
				(this._handlers = {
					'initialized.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this._core.register({
								type: 'state',
								name: 'playing',
								tags: ['interacting'],
							});
					}, this),
					'resize.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this._core.settings.video &&
							this.isInFullScreen() &&
							a.preventDefault();
					}, this),
					'refreshed.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this._core.is('resizing') &&
							this._core.$stage.find('.cloned .owl-video-frame').remove();
					}, this),
					'changed.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							'position' === a.property.name &&
							this._playing &&
							this.stop();
					}, this),
					'prepared.owl.carousel': a.proxy(function (b) {
						if (b.namespace) {
							var c = a(b.content).find('.owl-video');
							c.length &&
								(c.css('display', 'none'), this.fetch(c, a(b.content)));
						}
					}, this),
				}),
				(this._core.options = a.extend({}, e.Defaults, this._core.options)),
				this._core.$element.on(this._handlers),
				this._core.$element.on(
					'click.owl.video',
					'.owl-video-play-icon',
					a.proxy(function (a) {
						this.play(a);
					}, this)
				);
		};
		(e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
			(e.prototype.fetch = function (a, b) {
				var c = (function () {
						return a.attr('data-vimeo-id')
							? 'vimeo'
							: a.attr('data-vzaar-id')
							? 'vzaar'
							: 'youtube';
					})(),
					d =
						a.attr('data-vimeo-id') ||
						a.attr('data-youtube-id') ||
						a.attr('data-vzaar-id'),
					e = a.attr('data-width') || this._core.settings.videoWidth,
					f = a.attr('data-height') || this._core.settings.videoHeight,
					g = a.attr('href');
				if (!g) throw new Error('Missing video URL.');
				if (
					((d = g.match(
						/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
					)),
					d[3].indexOf('youtu') > -1)
				)
					c = 'youtube';
				else if (d[3].indexOf('vimeo') > -1) c = 'vimeo';
				else {
					if (!(d[3].indexOf('vzaar') > -1))
						throw new Error('Video URL not supported.');
					c = 'vzaar';
				}
				(d = d[6]),
					(this._videos[g] = { type: c, id: d, width: e, height: f }),
					b.attr('data-video', g),
					this.thumbnail(a, this._videos[g]);
			}),
			(e.prototype.thumbnail = function (b, c) {
				var d,
					e,
					f,
					g =
						c.width && c.height
							? 'style="width:' + c.width + 'px;height:' + c.height + 'px;"'
							: '',
					h = b.find('img'),
					i = 'src',
					j = '',
					k = this._core.settings,
					l = function (a) {
						(e = '<div class="owl-video-play-icon"></div>'),
							(d = k.lazyLoad
								? '<div class="owl-video-tn ' +
								  j +
								  '" ' +
								  i +
								  '="' +
								  a +
								  '"></div>'
								: '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
								  a +
								  ')"></div>'),
							b.after(d),
							b.after(e);
					};
				if (
					(b.wrap('<div class="owl-video-wrapper"' + g + '></div>'),
					this._core.settings.lazyLoad && ((i = 'data-src'), (j = 'owl-lazy')),
					h.length)
				)
					return l(h.attr(i)), h.remove(), !1;
				'youtube' === c.type
					? ((f = '//img.youtube.com/vi/' + c.id + '/hqdefault.jpg'), l(f))
					: 'vimeo' === c.type
					? a.ajax({
							type: 'GET',
							url: '//vimeo.com/api/v2/video/' + c.id + '.json',
							jsonp: 'callback',
							dataType: 'jsonp',
							success: function (a) {
								(f = a[0].thumbnail_large), l(f);
							},
					  })
					: 'vzaar' === c.type &&
					  a.ajax({
							type: 'GET',
							url: '//vzaar.com/api/videos/' + c.id + '.json',
							jsonp: 'callback',
							dataType: 'jsonp',
							success: function (a) {
								(f = a.framegrab_url), l(f);
							},
					  });
			}),
			(e.prototype.stop = function () {
				this._core.trigger('stop', null, 'video'),
					this._playing.find('.owl-video-frame').remove(),
					this._playing.removeClass('owl-video-playing'),
					(this._playing = null),
					this._core.leave('playing'),
					this._core.trigger('stopped', null, 'video');
			}),
			(e.prototype.play = function (b) {
				var c,
					d = a(b.target),
					e = d.closest('.' + this._core.settings.itemClass),
					f = this._videos[e.attr('data-video')],
					g = f.width || '100%',
					h = f.height || this._core.$stage.height();
				this._playing ||
					(this._core.enter('playing'),
					this._core.trigger('play', null, 'video'),
					(e = this._core.items(this._core.relative(e.index()))),
					this._core.reset(e.index()),
					'youtube' === f.type
						? (c =
								'<iframe width="' +
								g +
								'" height="' +
								h +
								'" src="//www.youtube.com/embed/' +
								f.id +
								'?autoplay=1&rel=0&v=' +
								f.id +
								'" frameborder="0" allowfullscreen></iframe>')
						: 'vimeo' === f.type
						? (c =
								'<iframe src="//player.vimeo.com/video/' +
								f.id +
								'?autoplay=1" width="' +
								g +
								'" height="' +
								h +
								'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
						: 'vzaar' === f.type &&
						  (c =
								'<iframe frameborder="0"height="' +
								h +
								'"width="' +
								g +
								'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
								f.id +
								'/player?autoplay=true"></iframe>'),
					a('<div class="owl-video-frame">' + c + '</div>').insertAfter(
						e.find('.owl-video')
					),
					(this._playing = e.addClass('owl-video-playing')));
			}),
			(e.prototype.isInFullScreen = function () {
				var b =
					c.fullscreenElement ||
					c.mozFullScreenElement ||
					c.webkitFullscreenElement;
				return b && a(b).parent().hasClass('owl-video-frame');
			}),
			(e.prototype.destroy = function () {
				var a, b;
				this._core.$element.off('click.owl.video');
				for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
				for (b in Object.getOwnPropertyNames(this))
					'function' != typeof this[b] && (this[b] = null);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.Video = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		var e = function (b) {
			(this.core = b),
				(this.core.options = a.extend({}, e.Defaults, this.core.options)),
				(this.swapping = !0),
				(this.previous = d),
				(this.next = d),
				(this.handlers = {
					'change.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							'position' == a.property.name &&
							((this.previous = this.core.current()),
							(this.next = a.property.value));
					}, this),
					'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': a.proxy(
						function (a) {
							a.namespace && (this.swapping = 'translated' == a.type);
						},
						this
					),
					'translate.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this.swapping &&
							(this.core.options.animateOut || this.core.options.animateIn) &&
							this.swap();
					}, this),
				}),
				this.core.$element.on(this.handlers);
		};
		(e.Defaults = { animateOut: !1, animateIn: !1 }),
			(e.prototype.swap = function () {
				if (
					1 === this.core.settings.items &&
					a.support.animation &&
					a.support.transition
				) {
					this.core.speed(0);
					var b,
						c = a.proxy(this.clear, this),
						d = this.core.$stage.children().eq(this.previous),
						e = this.core.$stage.children().eq(this.next),
						f = this.core.settings.animateIn,
						g = this.core.settings.animateOut;
					this.core.current() !== this.previous &&
						(g &&
							((b =
								this.core.coordinates(this.previous) -
								this.core.coordinates(this.next)),
							d
								.one(a.support.animation.end, c)
								.css({ left: b + 'px' })
								.addClass('animated owl-animated-out')
								.addClass(g)),
						f &&
							e
								.one(a.support.animation.end, c)
								.addClass('animated owl-animated-in')
								.addClass(f));
				}
			}),
			(e.prototype.clear = function (b) {
				a(b.target)
					.css({ left: '' })
					.removeClass('animated owl-animated-out owl-animated-in')
					.removeClass(this.core.settings.animateIn)
					.removeClass(this.core.settings.animateOut),
					this.core.onTransitionEnd();
			}),
			(e.prototype.destroy = function () {
				var a, b;
				for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
				for (b in Object.getOwnPropertyNames(this))
					'function' != typeof this[b] && (this[b] = null);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.Animate = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		var e = function (b) {
			(this._core = b),
				(this._timeout = null),
				(this._paused = !1),
				(this._handlers = {
					'changed.owl.carousel': a.proxy(function (a) {
						a.namespace && 'settings' === a.property.name
							? this._core.settings.autoplay
								? this.play()
								: this.stop()
							: a.namespace &&
							  'position' === a.property.name &&
							  this._core.settings.autoplay &&
							  this._setAutoPlayInterval();
					}, this),
					'initialized.owl.carousel': a.proxy(function (a) {
						a.namespace && this._core.settings.autoplay && this.play();
					}, this),
					'play.owl.autoplay': a.proxy(function (a, b, c) {
						a.namespace && this.play(b, c);
					}, this),
					'stop.owl.autoplay': a.proxy(function (a) {
						a.namespace && this.stop();
					}, this),
					'mouseover.owl.autoplay': a.proxy(function () {
						this._core.settings.autoplayHoverPause &&
							this._core.is('rotating') &&
							this.pause();
					}, this),
					'mouseleave.owl.autoplay': a.proxy(function () {
						this._core.settings.autoplayHoverPause &&
							this._core.is('rotating') &&
							this.play();
					}, this),
					'touchstart.owl.core': a.proxy(function () {
						this._core.settings.autoplayHoverPause &&
							this._core.is('rotating') &&
							this.pause();
					}, this),
					'touchend.owl.core': a.proxy(function () {
						this._core.settings.autoplayHoverPause && this.play();
					}, this),
				}),
				this._core.$element.on(this._handlers),
				(this._core.options = a.extend({}, e.Defaults, this._core.options));
		};
		(e.Defaults = {
			autoplay: !1,
			autoplayTimeout: 5e3,
			autoplayHoverPause: !1,
			autoplaySpeed: !1,
		}),
			(e.prototype.play = function (a, b) {
				(this._paused = !1),
					this._core.is('rotating') ||
						(this._core.enter('rotating'), this._setAutoPlayInterval());
			}),
			(e.prototype._getNextTimeout = function (d, e) {
				return (
					this._timeout && b.clearTimeout(this._timeout),
					b.setTimeout(
						a.proxy(function () {
							this._paused ||
								this._core.is('busy') ||
								this._core.is('interacting') ||
								c.hidden ||
								this._core.next(e || this._core.settings.autoplaySpeed);
						}, this),
						d || this._core.settings.autoplayTimeout
					)
				);
			}),
			(e.prototype._setAutoPlayInterval = function () {
				this._timeout = this._getNextTimeout();
			}),
			(e.prototype.stop = function () {
				this._core.is('rotating') &&
					(b.clearTimeout(this._timeout), this._core.leave('rotating'));
			}),
			(e.prototype.pause = function () {
				this._core.is('rotating') && (this._paused = !0);
			}),
			(e.prototype.destroy = function () {
				var a, b;
				this.stop();
				for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
				for (b in Object.getOwnPropertyNames(this))
					'function' != typeof this[b] && (this[b] = null);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		'use strict';
		var e = function (b) {
			(this._core = b),
				(this._initialized = !1),
				(this._pages = []),
				(this._controls = {}),
				(this._templates = []),
				(this.$element = this._core.$element),
				(this._overrides = {
					next: this._core.next,
					prev: this._core.prev,
					to: this._core.to,
				}),
				(this._handlers = {
					'prepared.owl.carousel': a.proxy(function (b) {
						b.namespace &&
							this._core.settings.dotsData &&
							this._templates.push(
								'<div class="' +
									this._core.settings.dotClass +
									'">' +
									a(b.content)
										.find('[data-dot]')
										.addBack('[data-dot]')
										.attr('data-dot') +
									'</div>'
							);
					}, this),
					'added.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this._core.settings.dotsData &&
							this._templates.splice(a.position, 0, this._templates.pop());
					}, this),
					'remove.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this._core.settings.dotsData &&
							this._templates.splice(a.position, 1);
					}, this),
					'changed.owl.carousel': a.proxy(function (a) {
						a.namespace && 'position' == a.property.name && this.draw();
					}, this),
					'initialized.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							!this._initialized &&
							(this._core.trigger('initialize', null, 'navigation'),
							this.initialize(),
							this.update(),
							this.draw(),
							(this._initialized = !0),
							this._core.trigger('initialized', null, 'navigation'));
					}, this),
					'refreshed.owl.carousel': a.proxy(function (a) {
						a.namespace &&
							this._initialized &&
							(this._core.trigger('refresh', null, 'navigation'),
							this.update(),
							this.draw(),
							this._core.trigger('refreshed', null, 'navigation'));
					}, this),
				}),
				(this._core.options = a.extend({}, e.Defaults, this._core.options)),
				this.$element.on(this._handlers);
		};
		(e.Defaults = {
			nav: !1,
			navText: ['prev', 'next'],
			navSpeed: !1,
			navElement: 'div',
			navContainer: !1,
			navContainerClass: 'owl-nav',
			navClass: ['owl-prev', 'owl-next'],
			slideBy: 1,
			dotClass: 'owl-dot',
			dotsClass: 'owl-dots',
			dots: !0,
			dotsEach: !1,
			dotsData: !1,
			dotsSpeed: !1,
			dotsContainer: !1,
		}),
			(e.prototype.initialize = function () {
				var b,
					c = this._core.settings;
				(this._controls.$relative = (c.navContainer
					? a(c.navContainer)
					: a('<div>').addClass(c.navContainerClass).appendTo(this.$element)
				).addClass('disabled')),
					(this._controls.$previous = a('<' + c.navElement + '>')
						.addClass(c.navClass[0])
						.html(c.navText[0])
						.prependTo(this._controls.$relative)
						.on(
							'click',
							a.proxy(function (a) {
								this.prev(c.navSpeed);
							}, this)
						)),
					(this._controls.$next = a('<' + c.navElement + '>')
						.addClass(c.navClass[1])
						.html(c.navText[1])
						.appendTo(this._controls.$relative)
						.on(
							'click',
							a.proxy(function (a) {
								this.next(c.navSpeed);
							}, this)
						)),
					c.dotsData ||
						(this._templates = [
							a('<div>')
								.addClass(c.dotClass)
								.append(a('<span>'))
								.prop('outerHTML'),
						]),
					(this._controls.$absolute = (c.dotsContainer
						? a(c.dotsContainer)
						: a('<div>').addClass(c.dotsClass).appendTo(this.$element)
					).addClass('disabled')),
					this._controls.$absolute.on(
						'click',
						'div',
						a.proxy(function (b) {
							var d = a(b.target).parent().is(this._controls.$absolute)
								? a(b.target).index()
								: a(b.target).parent().index();
							b.preventDefault(), this.to(d, c.dotsSpeed);
						}, this)
					);
				for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
			}),
			(e.prototype.destroy = function () {
				var a, b, c, d;
				for (a in this._handlers) this.$element.off(a, this._handlers[a]);
				for (b in this._controls) this._controls[b].remove();
				for (d in this.overides) this._core[d] = this._overrides[d];
				for (c in Object.getOwnPropertyNames(this))
					'function' != typeof this[c] && (this[c] = null);
			}),
			(e.prototype.update = function () {
				var a,
					b,
					c,
					d = this._core.clones().length / 2,
					e = d + this._core.items().length,
					f = this._core.maximum(!0),
					g = this._core.settings,
					h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
				if (
					('page' !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
					g.dots || 'page' == g.slideBy)
				)
					for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
						if (b >= h || 0 === b) {
							if (
								(this._pages.push({
									start: Math.min(f, a - d),
									end: a - d + h - 1,
								}),
								Math.min(f, a - d) === f)
							)
								break;
							(b = 0), ++c;
						}
						b += this._core.mergers(this._core.relative(a));
					}
			}),
			(e.prototype.draw = function () {
				var b,
					c = this._core.settings,
					d = this._core.items().length <= c.items,
					e = this._core.relative(this._core.current()),
					f = c.loop || c.rewind;
				this._controls.$relative.toggleClass('disabled', !c.nav || d),
					c.nav &&
						(this._controls.$previous.toggleClass(
							'disabled',
							!f && e <= this._core.minimum(!0)
						),
						this._controls.$next.toggleClass(
							'disabled',
							!f && e >= this._core.maximum(!0)
						)),
					this._controls.$absolute.toggleClass('disabled', !c.dots || d),
					c.dots &&
						((b =
							this._pages.length - this._controls.$absolute.children().length),
						c.dotsData && 0 !== b
							? this._controls.$absolute.html(this._templates.join(''))
							: b > 0
							? this._controls.$absolute.append(
									new Array(b + 1).join(this._templates[0])
							  )
							: b < 0 && this._controls.$absolute.children().slice(b).remove(),
						this._controls.$absolute.find('.active').removeClass('active'),
						this._controls.$absolute
							.children()
							.eq(a.inArray(this.current(), this._pages))
							.addClass('active'));
			}),
			(e.prototype.onTrigger = function (b) {
				var c = this._core.settings;
				b.page = {
					index: a.inArray(this.current(), this._pages),
					count: this._pages.length,
					size:
						c &&
						(c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
				};
			}),
			(e.prototype.current = function () {
				var b = this._core.relative(this._core.current());
				return a
					.grep(
						this._pages,
						a.proxy(function (a, c) {
							return a.start <= b && a.end >= b;
						}, this)
					)
					.pop();
			}),
			(e.prototype.getPosition = function (b) {
				var c,
					d,
					e = this._core.settings;
				return (
					'page' == e.slideBy
						? ((c = a.inArray(this.current(), this._pages)),
						  (d = this._pages.length),
						  b ? ++c : --c,
						  (c = this._pages[((c % d) + d) % d].start))
						: ((c = this._core.relative(this._core.current())),
						  (d = this._core.items().length),
						  b ? (c += e.slideBy) : (c -= e.slideBy)),
					c
				);
			}),
			(e.prototype.next = function (b) {
				a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
			}),
			(e.prototype.prev = function (b) {
				a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
			}),
			(e.prototype.to = function (b, c, d) {
				var e;
				!d && this._pages.length
					? ((e = this._pages.length),
					  a.proxy(this._overrides.to, this._core)(
							this._pages[((b % e) + e) % e].start,
							c
					  ))
					: a.proxy(this._overrides.to, this._core)(b, c);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		'use strict';
		var e = function (c) {
			(this._core = c),
				(this._hashes = {}),
				(this.$element = this._core.$element),
				(this._handlers = {
					'initialized.owl.carousel': a.proxy(function (c) {
						c.namespace &&
							'URLHash' === this._core.settings.startPosition &&
							a(b).trigger('hashchange.owl.navigation');
					}, this),
					'prepared.owl.carousel': a.proxy(function (b) {
						if (b.namespace) {
							var c = a(b.content)
								.find('[data-hash]')
								.addBack('[data-hash]')
								.attr('data-hash');
							if (!c) return;
							this._hashes[c] = b.content;
						}
					}, this),
					'changed.owl.carousel': a.proxy(function (c) {
						if (c.namespace && 'position' === c.property.name) {
							var d = this._core.items(
									this._core.relative(this._core.current())
								),
								e = a
									.map(this._hashes, function (a, b) {
										return a === d ? b : null;
									})
									.join();
							if (!e || b.location.hash.slice(1) === e) return;
							b.location.hash = e;
						}
					}, this),
				}),
				(this._core.options = a.extend({}, e.Defaults, this._core.options)),
				this.$element.on(this._handlers),
				a(b).on(
					'hashchange.owl.navigation',
					a.proxy(function (a) {
						var c = b.location.hash.substring(1),
							e = this._core.$stage.children(),
							f = this._hashes[c] && e.index(this._hashes[c]);
						f !== d &&
							f !== this._core.current() &&
							this._core.to(this._core.relative(f), !1, !0);
					}, this)
				);
		};
		(e.Defaults = { URLhashListener: !1 }),
			(e.prototype.destroy = function () {
				var c, d;
				a(b).off('hashchange.owl.navigation');
				for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
				for (d in Object.getOwnPropertyNames(this))
					'function' != typeof this[d] && (this[d] = null);
			}),
			(a.fn.owlCarousel.Constructor.Plugins.Hash = e);
	})(window.Zepto || window.jQuery, window, document),
	(function (a, b, c, d) {
		function e(b, c) {
			var e = !1,
				f = b.charAt(0).toUpperCase() + b.slice(1);
			return (
				a.each((b + ' ' + h.join(f + ' ') + f).split(' '), function (a, b) {
					if (g[b] !== d) return (e = !c || b), !1;
				}),
				e
			);
		}
		function f(a) {
			return e(a, !0);
		}
		var g = a('<support>').get(0).style,
			h = 'Webkit Moz O ms'.split(' '),
			i = {
				transition: {
					end: {
						WebkitTransition: 'webkitTransitionEnd',
						MozTransition: 'transitionend',
						OTransition: 'oTransitionEnd',
						transition: 'transitionend',
					},
				},
				animation: {
					end: {
						WebkitAnimation: 'webkitAnimationEnd',
						MozAnimation: 'animationend',
						OAnimation: 'oAnimationEnd',
						animation: 'animationend',
					},
				},
			},
			j = {
				csstransforms: function () {
					return !!e('transform');
				},
				csstransforms3d: function () {
					return !!e('perspective');
				},
				csstransitions: function () {
					return !!e('transition');
				},
				cssanimations: function () {
					return !!e('animation');
				},
			};
		j.csstransitions() &&
			((a.support.transition = new String(f('transition'))),
			(a.support.transition.end = i.transition.end[a.support.transition])),
			j.cssanimations() &&
				((a.support.animation = new String(f('animation'))),
				(a.support.animation.end = i.animation.end[a.support.animation])),
			j.csstransforms() &&
				((a.support.transform = new String(f('transform'))),
				(a.support.transform3d = j.csstransforms3d()));
	})(window.Zepto || window.jQuery, window, document);
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
		return (-c / 2) * (--t * (t - 2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
		return (c / 2) * ((t -= 2) * t * t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
		return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
		return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin((t / d) * (Math.PI / 2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
		return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
		return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
		return (
			-(
				a *
				Math.pow(2, 10 * (t -= 1)) *
				Math.sin(((t * d - s) * (2 * Math.PI)) / p)
			) + b
		);
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
		return (
			a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
			c +
			b
		);
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (0.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
		if (t < 1)
			return (
				-0.5 *
					(a *
						Math.pow(2, 10 * (t -= 1)) *
						Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
				b
			);
		return (
			a *
				Math.pow(2, -10 * (t -= 1)) *
				Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
				0.5 +
			c +
			b
		);
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1)
			return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
		return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t /= d) < 1 / 2.75) {
			return c * (7.5625 * t * t) + b;
		} else if (t < 2 / 2.75) {
			return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
		} else if (t < 2.5 / 2.75) {
			return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
		} else {
			return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d / 2)
			return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
		return (
			jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
		);
	},
});
(function ($) {
	'use stict';
	var count = 1;
	var portfolioPostsPerPage = $('.grid-item').length;
	var totalNumberOfPortfolioPages = Math.ceil(
		parseInt(ajax_var_portfolio.total) / portfolioPostsPerPage
	);
	showHidePortfolioLoadMoreButton();
	zIndexSectionFix();
	memberContentLoadOnClick();
	portfolioItemContentLoadOnClick();
	loadMorePortfolioOnClick();
	setPrettyPhoto();
	$(window).on('load', function () {
		isotopeSetUp();
		imageSliderSettings();
	});
	function isotopeSetUp() {
		$('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: { columnWidth: '.grid-sizer', gutter: '.gutter-sizer' },
		});
	}
	function zIndexSectionFix() {
		var numSection = $('.page-template-onepage .section-wrapper').length + 2;
		$('.page-template-onepage')
			.find('.section-wrapper')
			.each(function () {
				$(this).css('zIndex', numSection);
				numSection--;
			});
	}
	function showHidePortfolioLoadMoreButton() {
		if (portfolioPostsPerPage < parseInt(ajax_var_portfolio.total)) {
			$('.more-posts-portfolio').css('visibility', 'visible');
			$('.more-posts-portfolio').animate({ opacity: 1 }, 1500);
		} else {
			$('.more-posts-portfolio').css('display', 'none');
		}
	}
	function imageSliderSettings() {
		$('.image-slider').each(function () {
			var id = $(this).attr('id');
			var auto_value = window[id + '_auto'];
			var hover_pause = window[id + '_hover'];
			var speed_value = window[id + '_speed'];
			var items_value = window[id + '_items'];
			auto_value = auto_value === 'true' ? true : false;
			hover_pause = hover_pause === 'true' ? true : false;
			$('#' + id).owlCarousel({
				loop: true,
				autoHeight: true,
				smartSpeed: 750,
				autoplay: auto_value,
				autoplayHoverPause: hover_pause,
				autoplayTimeout: speed_value,
				responsiveClass: true,
				responsive: { 0: { items: 1 }, 1024: { items: items_value } },
			});
			$(this).on('mouseleave', function () {
				$(this).trigger('stop.owl.autoplay');
				$(this).trigger('play.owl.autoplay', [auto_value]);
			});
		});
	}
	function setPrettyPhoto() {
		$('a[data-rel]').each(function () {
			$(this).attr('rel', $(this).data('rel'));
		});
		$("a[rel^='prettyPhoto']").prettyPhoto({
			slideshow: false,
			overlay_gallery: false,
			default_width: 1280,
			default_height: 720,
			deeplinking: false,
			social_tools: false,
			iframe_markup:
				'<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
		});
	}
	function memberContentLoadOnClick() {
		$('.member-holder a').on('click', function (e) {
			e.preventDefault();
			var memberID = $(this).data('id');
			$(this).find('.member-mask').addClass('animate-plus');
			$('html, body').animate(
				{ scrollTop: $('#team-holder').offset().top - 150 },
				300
			);
			if ($('#mcw-' + memberID).length) {
				setTimeout(function () {
					$('.member-holder').addClass('hide').fadeOut();
					setTimeout(function () {
						$('#mcw-' + memberID).addClass('show');
						$('.team-load-content-holder').addClass('show');
						$('.member-mask').removeClass('animate-plus');
					}, 300);
				}, 300);
			} else {
				loadMemberContent(memberID);
			}
		});
	}
	function loadMemberContent(memberID) {
		$.ajax({
			url: ajax_var_team.url,
			type: 'POST',
			data:
				'action=team_ajax&member_id=' +
				memberID +
				'&security=' +
				ajax_var_team.nonce,
			success: function (html) {
				var getHtml = $(html).find('.member-item-wrapper').html();
				$('.team-load-content-holder').append(
					'<div id="mcw-' +
						memberID +
						'" class="member-content-wrapper">' +
						getHtml +
						'</div>'
				);
				if (!$('#mcw-' + memberID + ' .close-icon').length) {
					$('#mcw-' + memberID).prepend('<div class="close-icon"></div>');
				}
				$('#mcw-' + memberID).imagesLoaded(function () {
					imageSliderSettings();
					$('.site-content').fitVids();
					$('.member-holder').addClass('hide').fadeOut();
					setTimeout(function () {
						$('#mcw-' + memberID).addClass('show');
						$('.team-load-content-holder').addClass('show');
						$('.member-mask').removeClass('animate-plus');
					}, 300);
					$('#team-holder .close-icon').on('click', function (e) {
						$('.team-load-content-holder').addClass('viceversa');
						$('.member-holder').css('display', 'block');
						setTimeout(function () {
							$('#mcw-' + memberID).removeClass('show');
							$('.team-load-content-holder').removeClass('viceversa show');
							$('.member-holder').removeClass('hide');
						}, 300);
					});
				});
			},
		});
		return false;
	}
	function portfolioItemContentLoadOnClick() {
		$('.ajax-portfolio').on('click', function (e) {
			e.preventDefault();
			var portfolioItemID = $(this).data('id');
			$(this).addClass('animate-plus');
			if ($('#pcw-' + portfolioItemID).length) {
				$('html, body').animate(
					{ scrollTop: $('#portfolio-wrapper').offset().top - 150 },
					400
				);
				setTimeout(function () {
					$('#portfolio-grid, .more-posts-portfolio-holder').addClass('hide');
					setTimeout(function () {
						$('#pcw-' + portfolioItemID).addClass('show');
						$('.portfolio-load-content-holder').addClass('show');
						$('.ajax-portfolio').removeClass('animate-plus');
						$('#portfolio-grid, .more-posts-portfolio-holder').hide();
					}, 300);
				}, 500);
			} else {
				loadPortfolioItemContent(portfolioItemID);
			}
		});
	}
	function loadPortfolioItemContent(portfolioItemID) {
		$.ajax({
			url: ajax_var_portfolio_content.url,
			type: 'POST',
			data:
				'action=portfolio_ajax_content_load&portfolio_id=' +
				portfolioItemID +
				'&security=' +
				ajax_var_portfolio_content.nonce,
			success: function (html) {
				var getPortfolioItemHtml = $(html)
					.find('.portfolio-item-wrapper')
					.html();
				$('.portfolio-load-content-holder').append(
					'<div id="pcw-' +
						portfolioItemID +
						'" class="portfolio-content-wrapper">' +
						getPortfolioItemHtml +
						'</div>'
				);
				if (!$('#pcw-' + portfolioItemID + ' .close-icon').length) {
					$('#pcw-' + portfolioItemID).prepend(
						'<div class="close-icon"></div>'
					);
				}
				$('html, body').animate(
					{ scrollTop: $('#portfolio-wrapper').offset().top - 150 },
					400
				);
				setTimeout(function () {
					$('#pcw-' + portfolioItemID).imagesLoaded(function () {
						imageSliderSettings();
						$('.site-content').fitVids();
						$('#portfolio-grid, .more-posts-portfolio-holder').addClass('hide');
						setTimeout(function () {
							$('#pcw-' + portfolioItemID).addClass('show');
							$('.portfolio-load-content-holder').addClass('show');
							$('.ajax-portfolio').removeClass('animate-plus');
							$('#portfolio-grid').hide();
						}, 300);
						$('.close-icon').on('click', function (e) {
							var portfolioReturnItemID = $(this)
								.closest('.portfolio-content-wrapper')
								.attr('id')
								.split('-')[1];
							$('.portfolio-load-content-holder').addClass('viceversa');
							$('#portfolio-grid, .more-posts-portfolio-holder').css(
								'display',
								'block'
							);
							setTimeout(function () {
								$('#pcw-' + portfolioReturnItemID).removeClass('show');
								$('.portfolio-load-content-holder').removeClass(
									'viceversa show'
								);
								$('#portfolio-grid, .more-posts-portfolio-holder').removeClass(
									'hide'
								);
							}, 300);
							setTimeout(function () {
								$('html, body').animate(
									{
										scrollTop:
											$('#p-item-' + portfolioReturnItemID).offset().top - 150,
									},
									400
								);
							}, 500);
						});
					});
				}, 500);
			},
		});
		return false;
	}
	function loadMorePortfolioOnClick() {
		$('.more-posts-portfolio:visible').on('click', function () {
			count++;
			loadPortfolioMoreItems(count, portfolioPostsPerPage);
			$('.more-posts-portfolio').css('display', 'none');
			$('.more-posts-portfolio-loading').css('display', 'block');
		});
	}
	function loadPortfolioMoreItems(pageNumber, portfolioPostsPerPage) {
		$.ajax({
			url: ajax_var_portfolio.url,
			type: 'POST',
			data:
				'action=portfolio_ajax_load_more&portfolio_page_number=' +
				pageNumber +
				'&portfolio_posts_per_page=' +
				portfolioPostsPerPage +
				'&security=' +
				ajax_var_portfolio.nonce,
			success: function (html) {
				var $newItems = $(html);
				$('.grid').append($newItems);
				$('.grid').imagesLoaded(function () {
					$('.grid').isotope('appended', $newItems);
					if (count == totalNumberOfPortfolioPages) {
						$('.more-posts-portfolio').css('display', 'none');
						$('.more-posts-portfolio-loading').css('display', 'none');
						$('.no-more-posts-portfolio').css('display', 'block');
					} else {
						$('.more-posts-portfolio').css('display', 'block');
						$('.more-posts-portfolio-loading').css('display', 'none');
					}
				});
				portfolioItemContentLoadOnClick();
				setPrettyPhoto();
			},
		});
		return false;
	}
})(jQuery);
(function ($) {
	var defaults = {
			topSpacing: 0,
			bottomSpacing: 0,
			className: 'is-sticky',
			wrapperClassName: 'sticky-wrapper',
		},
		$window = $(window),
		$document = $(document),
		sticked = [],
		windowHeight = $window.height(),
		scroller = function () {
			var scrollTop = $window.scrollTop(),
				documentHeight = $document.height(),
				dwh = documentHeight - windowHeight,
				extra = scrollTop > dwh ? dwh - scrollTop : 0;
			for (var i = 0; i < sticked.length; i++) {
				var s = sticked[i],
					elementTop = s.stickyWrapper.offset().top,
					etse = elementTop - s.topSpacing - extra;
				if (scrollTop <= etse) {
					if (s.currentTop !== null) {
						s.stickyElement
							.css('position', '')
							.css('top', '')
							.removeClass(s.className);
						s.stickyElement.parent().removeClass(s.className);
						s.currentTop = null;
					}
				} else {
					var newTop =
						documentHeight -
						s.stickyElement.outerHeight() -
						s.topSpacing -
						s.bottomSpacing -
						scrollTop -
						extra;
					if (newTop < 0) {
						newTop = newTop + s.topSpacing;
					} else {
						newTop = s.topSpacing;
					}
					if (s.currentTop != newTop) {
						s.stickyElement
							.css('position', 'fixed')
							.css('top', newTop)
							.addClass(s.className);
						s.stickyElement.parent().addClass(s.className);
						s.currentTop = newTop;
					}
				}
			}
		},
		resizer = function () {
			windowHeight = $window.height();
		},
		methods = {
			init: function (options) {
				var o = $.extend(defaults, options);
				return this.each(function () {
					var stickyElement = $(this);
					stickyId = stickyElement.attr('id');
					wrapper = $('<div></div>')
						.attr('id', stickyId + '-sticky-wrapper')
						.addClass(o.wrapperClassName);
					stickyElement.wrapAll(wrapper);
					var stickyWrapper = stickyElement.parent();
					stickyWrapper.css('height', stickyElement.outerHeight());
					sticked.push({
						topSpacing: o.topSpacing,
						bottomSpacing: o.bottomSpacing,
						stickyElement: stickyElement,
						currentTop: null,
						stickyWrapper: stickyWrapper,
						className: o.className,
					});
				});
			},
			update: scroller,
		};
	if (window.addEventListener) {
		window.addEventListener('scroll', scroller, false);
		window.addEventListener('resize', resizer, false);
	} else if (window.attachEvent) {
		window.attachEvent('onscroll', scroller);
		window.attachEvent('onresize', resizer);
	}
	$.fn.sticky = function (method) {
		if (methods[method]) {
			return methods[method].apply(
				this,
				Array.prototype.slice.call(arguments, 1)
			);
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.sticky');
		}
	};
	$(function () {
		setTimeout(scroller, 0);
	});
})(jQuery);
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
(function ($) {
	'use strict';
	$.fn.fitVids = function (options) {
		var settings = { customSelector: null, ignore: null };
		if (!document.getElementById('fit-vids-style')) {
			var head = document.head || document.getElementsByTagName('head')[0];
			var css =
				'.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
			var div = document.createElement('div');
			div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
			head.appendChild(div.childNodes[1]);
		}
		if (options) {
			$.extend(settings, options);
		}
		return this.each(function () {
			var selectors = [
				'iframe[src*="player.vimeo.com"]',
				'iframe[src*="youtube.com"]',
				'iframe[src*="youtube-nocookie.com"]',
				'iframe[src*="kickstarter.com"][src*="video.html"]',
				'object',
				'embed',
			];
			if (settings.customSelector) {
				selectors.push(settings.customSelector);
			}
			var ignoreList = '.fitvidsignore';
			if (settings.ignore) {
				ignoreList = ignoreList + ', ' + settings.ignore;
			}
			var $allVideos = $(this).find(selectors.join(','));
			$allVideos = $allVideos.not('object object');
			$allVideos = $allVideos.not(ignoreList);
			$allVideos.each(function () {
				var $this = $(this);
				if ($this.parents(ignoreList).length > 0) {
					return;
				}
				if (
					(this.tagName.toLowerCase() === 'embed' &&
						$this.parent('object').length) ||
					$this.parent('.fluid-width-video-wrapper').length
				) {
					return;
				}
				if (
					!$this.css('height') &&
					!$this.css('width') &&
					(isNaN($this.attr('height')) || isNaN($this.attr('width')))
				) {
					$this.attr('height', 9);
					$this.attr('width', 16);
				}
				var height =
						this.tagName.toLowerCase() === 'object' ||
						($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))
							? parseInt($this.attr('height'), 10)
							: $this.height(),
					width = !isNaN(parseInt($this.attr('width'), 10))
						? parseInt($this.attr('width'), 10)
						: $this.width(),
					aspectRatio = height / width;
				if (!$this.attr('name')) {
					var videoName = 'fitvid' + $.fn.fitVids._count;
					$this.attr('name', videoName);
					$.fn.fitVids._count++;
				}
				$this
					.wrap('<div class="fluid-width-video-wrapper"></div>')
					.parent('.fluid-width-video-wrapper')
					.css('padding-top', aspectRatio * 100 + '%');
				$this.removeAttr('height').removeAttr('width');
			});
		});
	};
	$.fn.fitVids._count = 0;
})(window.jQuery || window.Zepto);
/*! SmartMenus jQuery Plugin - v1.0.0 - January 27, 2016
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */ (function (
	t
) {
	'function' == typeof define && define.amd
		? define(['jquery'], t)
		: 'object' == typeof module && 'object' == typeof module.exports
		? (module.exports = t(require('jquery')))
		: t(jQuery);
})(function (t) {
	function i(i) {
		var a = '.smartmenus_mouse';
		if (h || i) h && i && (t(document).unbind(a), (h = !1));
		else {
			var u = !0,
				l = null;
			t(document).bind(
				s(
					[
						[
							'mousemove',
							function (i) {
								var e = {
									x: i.pageX,
									y: i.pageY,
									timeStamp: new Date().getTime(),
								};
								if (l) {
									var s = Math.abs(l.x - e.x),
										a = Math.abs(l.y - e.y);
									if (
										(s > 0 || a > 0) &&
										2 >= s &&
										2 >= a &&
										300 >= e.timeStamp - l.timeStamp &&
										((r = !0), u)
									) {
										var n = t(i.target).closest('a');
										n.is('a') &&
											t.each(o, function () {
												return t.contains(this.$root[0], n[0])
													? (this.itemEnter({ currentTarget: n[0] }), !1)
													: void 0;
											}),
											(u = !1);
									}
								}
								l = e;
							},
						],
						[
							n
								? 'touchstart'
								: 'pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut',
							function (t) {
								e(t.originalEvent) && (r = !1);
							},
						],
					],
					a
				)
			),
				(h = !0);
		}
	}
	function e(t) {
		return !/^(4|mouse)$/.test(t.pointerType);
	}
	function s(i, e) {
		e || (e = '');
		var s = {};
		return (
			t.each(i, function (t, i) {
				s[i[0].split(' ').join(e + ' ') + e] = i[1];
			}),
			s
		);
	}
	var o = [],
		a = !!window.createPopup,
		r = !1,
		n = 'ontouchstart' in window,
		h = !1,
		u =
			window.requestAnimationFrame ||
			function (t) {
				return setTimeout(t, 1e3 / 60);
			},
		l =
			window.cancelAnimationFrame ||
			function (t) {
				clearTimeout(t);
			};
	return (
		(t.SmartMenus = function (i, e) {
			(this.$root = t(i)),
				(this.opts = e),
				(this.rootId = ''),
				(this.accessIdPrefix = ''),
				(this.$subArrow = null),
				(this.activatedItems = []),
				(this.visibleSubMenus = []),
				(this.showTimeout = 0),
				(this.hideTimeout = 0),
				(this.scrollTimeout = 0),
				(this.clickActivated = !1),
				(this.focusActivated = !1),
				(this.zIndexInc = 0),
				(this.idInc = 0),
				(this.$firstLink = null),
				(this.$firstSub = null),
				(this.disabled = !1),
				(this.$disableOverlay = null),
				(this.$touchScrollingSub = null),
				(this.cssTransforms3d =
					'perspective' in i.style || 'webkitPerspective' in i.style),
				(this.wasCollapsible = !1),
				this.init();
		}),
		t.extend(t.SmartMenus, {
			hideAll: function () {
				t.each(o, function () {
					this.menuHideAll();
				});
			},
			destroy: function () {
				for (; o.length; ) o[0].destroy();
				i(!0);
			},
			prototype: {
				init: function (e) {
					var a = this;
					if (!e) {
						o.push(this),
							(this.rootId = (
								new Date().getTime() +
								Math.random() +
								''
							).replace(/\D/g, '')),
							(this.accessIdPrefix = 'sm-' + this.rootId + '-'),
							this.$root.hasClass('sm-rtl') &&
								(this.opts.rightToLeftSubMenus = !0);
						var r = '.smartmenus';
						this.$root
							.data('smartmenus', this)
							.attr('data-smartmenus-id', this.rootId)
							.dataSM('level', 1)
							.bind(
								s(
									[
										['mouseover focusin', t.proxy(this.rootOver, this)],
										['mouseout focusout', t.proxy(this.rootOut, this)],
										['keydown', t.proxy(this.rootKeyDown, this)],
									],
									r
								)
							)
							.delegate(
								'a',
								s(
									[
										['mouseenter', t.proxy(this.itemEnter, this)],
										['mouseleave', t.proxy(this.itemLeave, this)],
										['mousedown', t.proxy(this.itemDown, this)],
										['focus', t.proxy(this.itemFocus, this)],
										['blur', t.proxy(this.itemBlur, this)],
										['click', t.proxy(this.itemClick, this)],
									],
									r
								)
							),
							(r += this.rootId),
							this.opts.hideOnClick &&
								t(document).bind(
									s(
										[
											['touchstart', t.proxy(this.docTouchStart, this)],
											['touchmove', t.proxy(this.docTouchMove, this)],
											['touchend', t.proxy(this.docTouchEnd, this)],
											['click', t.proxy(this.docClick, this)],
										],
										r
									)
								),
							t(window).bind(
								s(
									[['resize orientationchange', t.proxy(this.winResize, this)]],
									r
								)
							),
							this.opts.subIndicators &&
								((this.$subArrow = t('<span/>').addClass('sub-arrow')),
								this.opts.subIndicatorsText &&
									this.$subArrow.html(this.opts.subIndicatorsText)),
							i();
					}
					if (
						((this.$firstSub = this.$root
							.find('ul')
							.each(function () {
								a.menuInit(t(this));
							})
							.eq(0)),
						(this.$firstLink = this.$root.find('a').eq(0)),
						this.opts.markCurrentItem)
					) {
						var n = /(index|default)\.[^#\?\/]*/i,
							h = /#.*/,
							u = window.location.href.replace(n, ''),
							l = u.replace(h, '');
						this.$root.find('a').each(function () {
							var i = this.href.replace(n, ''),
								e = t(this);
							(i == u || i == l) &&
								(e.addClass('current'),
								a.opts.markCurrentTree &&
									e
										.parentsUntil('[data-smartmenus-id]', 'ul')
										.each(function () {
											t(this).dataSM('parent-a').addClass('current');
										}));
						});
					}
					this.wasCollapsible = this.isCollapsible();
				},
				destroy: function (i) {
					if (!i) {
						var e = '.smartmenus';
						this.$root
							.removeData('smartmenus')
							.removeAttr('data-smartmenus-id')
							.removeDataSM('level')
							.unbind(e)
							.undelegate(e),
							(e += this.rootId),
							t(document).unbind(e),
							t(window).unbind(e),
							this.opts.subIndicators && (this.$subArrow = null);
					}
					this.menuHideAll();
					var s = this;
					this.$root
						.find('ul')
						.each(function () {
							var i = t(this);
							i.dataSM('scroll-arrows') && i.dataSM('scroll-arrows').remove(),
								i.dataSM('shown-before') &&
									((s.opts.subMenusMinWidth || s.opts.subMenusMaxWidth) &&
										i
											.css({ width: '', minWidth: '', maxWidth: '' })
											.removeClass('sm-nowrap'),
									i.dataSM('scroll-arrows') &&
										i.dataSM('scroll-arrows').remove(),
									i.css({
										zIndex: '',
										top: '',
										left: '',
										marginLeft: '',
										marginTop: '',
										display: '',
									})),
								0 == (i.attr('id') || '').indexOf(s.accessIdPrefix) &&
									i.removeAttr('id');
						})
						.removeDataSM('in-mega')
						.removeDataSM('shown-before')
						.removeDataSM('ie-shim')
						.removeDataSM('scroll-arrows')
						.removeDataSM('parent-a')
						.removeDataSM('level')
						.removeDataSM('beforefirstshowfired')
						.removeAttr('role')
						.removeAttr('aria-hidden')
						.removeAttr('aria-labelledby')
						.removeAttr('aria-expanded'),
						this.$root
							.find('a.has-submenu')
							.each(function () {
								var i = t(this);
								0 == i.attr('id').indexOf(s.accessIdPrefix) &&
									i.removeAttr('id');
							})
							.removeClass('has-submenu')
							.removeDataSM('sub')
							.removeAttr('aria-haspopup')
							.removeAttr('aria-controls')
							.removeAttr('aria-expanded')
							.closest('li')
							.removeDataSM('sub'),
						this.opts.subIndicators &&
							this.$root.find('span.sub-arrow').remove(),
						this.opts.markCurrentItem &&
							this.$root.find('a.current').removeClass('current'),
						i ||
							((this.$root = null),
							(this.$firstLink = null),
							(this.$firstSub = null),
							this.$disableOverlay &&
								(this.$disableOverlay.remove(), (this.$disableOverlay = null)),
							o.splice(t.inArray(this, o), 1));
				},
				disable: function (i) {
					if (!this.disabled) {
						if (
							(this.menuHideAll(),
							!i && !this.opts.isPopup && this.$root.is(':visible'))
						) {
							var e = this.$root.offset();
							this.$disableOverlay = t(
								'<div class="sm-jquery-disable-overlay"/>'
							)
								.css({
									position: 'absolute',
									top: e.top,
									left: e.left,
									width: this.$root.outerWidth(),
									height: this.$root.outerHeight(),
									zIndex: this.getStartZIndex(!0),
									opacity: 0,
								})
								.appendTo(document.body);
						}
						this.disabled = !0;
					}
				},
				docClick: function (i) {
					return this.$touchScrollingSub
						? ((this.$touchScrollingSub = null), void 0)
						: (((this.visibleSubMenus.length &&
								!t.contains(this.$root[0], i.target)) ||
								t(i.target).is('a')) &&
								this.menuHideAll(),
						  void 0);
				},
				docTouchEnd: function () {
					if (this.lastTouch) {
						if (
							!(
								!this.visibleSubMenus.length ||
								(void 0 !== this.lastTouch.x2 &&
									this.lastTouch.x1 != this.lastTouch.x2) ||
								(void 0 !== this.lastTouch.y2 &&
									this.lastTouch.y1 != this.lastTouch.y2) ||
								(this.lastTouch.target &&
									t.contains(this.$root[0], this.lastTouch.target))
							)
						) {
							this.hideTimeout &&
								(clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
							var i = this;
							this.hideTimeout = setTimeout(function () {
								i.menuHideAll();
							}, 350);
						}
						this.lastTouch = null;
					}
				},
				docTouchMove: function (t) {
					if (this.lastTouch) {
						var i = t.originalEvent.touches[0];
						(this.lastTouch.x2 = i.pageX), (this.lastTouch.y2 = i.pageY);
					}
				},
				docTouchStart: function (t) {
					var i = t.originalEvent.touches[0];
					this.lastTouch = { x1: i.pageX, y1: i.pageY, target: i.target };
				},
				enable: function () {
					this.disabled &&
						(this.$disableOverlay &&
							(this.$disableOverlay.remove(), (this.$disableOverlay = null)),
						(this.disabled = !1));
				},
				getClosestMenu: function (i) {
					for (var e = t(i).closest('ul'); e.dataSM('in-mega'); )
						e = e.parent().closest('ul');
					return e[0] || null;
				},
				getHeight: function (t) {
					return this.getOffset(t, !0);
				},
				getOffset: function (t, i) {
					var e;
					'none' == t.css('display') &&
						((e = {
							position: t[0].style.position,
							visibility: t[0].style.visibility,
						}),
						t.css({ position: 'absolute', visibility: 'hidden' }).show());
					var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
						o =
							s &&
							(i ? s.height || s.bottom - s.top : s.width || s.right - s.left);
					return (
						o || 0 === o || (o = i ? t[0].offsetHeight : t[0].offsetWidth),
						e && t.hide().css(e),
						o
					);
				},
				getStartZIndex: function (t) {
					var i = parseInt(this[t ? '$root' : '$firstSub'].css('z-index'));
					return (
						!t && isNaN(i) && (i = parseInt(this.$root.css('z-index'))),
						isNaN(i) ? 1 : i
					);
				},
				getTouchPoint: function (t) {
					return (
						(t.touches && t.touches[0]) ||
						(t.changedTouches && t.changedTouches[0]) ||
						t
					);
				},
				getViewport: function (t) {
					var i = t ? 'Height' : 'Width',
						e = document.documentElement['client' + i],
						s = window['inner' + i];
					return s && (e = Math.min(e, s)), e;
				},
				getViewportHeight: function () {
					return this.getViewport(!0);
				},
				getViewportWidth: function () {
					return this.getViewport();
				},
				getWidth: function (t) {
					return this.getOffset(t);
				},
				handleEvents: function () {
					return !this.disabled && this.isCSSOn();
				},
				handleItemEvents: function (t) {
					return this.handleEvents() && !this.isLinkInMegaMenu(t);
				},
				isCollapsible: function () {
					return 'static' == this.$firstSub.css('position');
				},
				isCSSOn: function () {
					return 'block' == this.$firstLink.css('display');
				},
				isFixed: function () {
					var i = 'fixed' == this.$root.css('position');
					return (
						i ||
							this.$root.parentsUntil('body').each(function () {
								return 'fixed' == t(this).css('position')
									? ((i = !0), !1)
									: void 0;
							}),
						i
					);
				},
				isLinkInMegaMenu: function (i) {
					return t(this.getClosestMenu(i[0])).hasClass('mega-menu');
				},
				isTouchMode: function () {
					return !r || this.opts.noMouseOver || this.isCollapsible();
				},
				itemActivate: function (i, e) {
					var s = i.closest('ul'),
						o = s.dataSM('level');
					if (
						o > 1 &&
						(!this.activatedItems[o - 2] ||
							this.activatedItems[o - 2][0] != s.dataSM('parent-a')[0])
					) {
						var a = this;
						t(s.parentsUntil('[data-smartmenus-id]', 'ul').get().reverse())
							.add(s)
							.each(function () {
								a.itemActivate(t(this).dataSM('parent-a'));
							});
					}
					if (
						((!this.isCollapsible() || e) &&
							this.menuHideSubMenus(
								this.activatedItems[o - 1] &&
									this.activatedItems[o - 1][0] == i[0]
									? o
									: o - 1
							),
						(this.activatedItems[o - 1] = i),
						this.$root.triggerHandler('activate.smapi', i[0]) !== !1)
					) {
						var r = i.dataSM('sub');
						r &&
							(this.isTouchMode() ||
								!this.opts.showOnClick ||
								this.clickActivated) &&
							this.menuShow(r);
					}
				},
				itemBlur: function (i) {
					var e = t(i.currentTarget);
					this.handleItemEvents(e) &&
						this.$root.triggerHandler('blur.smapi', e[0]);
				},
				itemClick: function (i) {
					var e = t(i.currentTarget);
					if (this.handleItemEvents(e)) {
						if (
							this.$touchScrollingSub &&
							this.$touchScrollingSub[0] == e.closest('ul')[0]
						)
							return (this.$touchScrollingSub = null), i.stopPropagation(), !1;
						if (this.$root.triggerHandler('click.smapi', e[0]) === !1)
							return !1;
						var s = t(i.target).is('span.sub-arrow'),
							o = e.dataSM('sub'),
							a = o ? 2 == o.dataSM('level') : !1;
						if (o && !o.is(':visible')) {
							if (
								(this.opts.showOnClick && a && (this.clickActivated = !0),
								this.itemActivate(e),
								o.is(':visible'))
							)
								return (this.focusActivated = !0), !1;
						} else if (this.isCollapsible() && s)
							return this.itemActivate(e), this.menuHide(o), !1;
						return (this.opts.showOnClick && a) ||
							e.hasClass('disabled') ||
							this.$root.triggerHandler('select.smapi', e[0]) === !1
							? !1
							: void 0;
					}
				},
				itemDown: function (i) {
					var e = t(i.currentTarget);
					this.handleItemEvents(e) && e.dataSM('mousedown', !0);
				},
				itemEnter: function (i) {
					var e = t(i.currentTarget);
					if (this.handleItemEvents(e)) {
						if (!this.isTouchMode()) {
							this.showTimeout &&
								(clearTimeout(this.showTimeout), (this.showTimeout = 0));
							var s = this;
							this.showTimeout = setTimeout(
								function () {
									s.itemActivate(e);
								},
								this.opts.showOnClick && 1 == e.closest('ul').dataSM('level')
									? 1
									: this.opts.showTimeout
							);
						}
						this.$root.triggerHandler('mouseenter.smapi', e[0]);
					}
				},
				itemFocus: function (i) {
					var e = t(i.currentTarget);
					this.handleItemEvents(e) &&
						(!this.focusActivated ||
							(this.isTouchMode() && e.dataSM('mousedown')) ||
							(this.activatedItems.length &&
								this.activatedItems[this.activatedItems.length - 1][0] ==
									e[0]) ||
							this.itemActivate(e, !0),
						this.$root.triggerHandler('focus.smapi', e[0]));
				},
				itemLeave: function (i) {
					var e = t(i.currentTarget);
					this.handleItemEvents(e) &&
						(this.isTouchMode() ||
							(e[0].blur(),
							this.showTimeout &&
								(clearTimeout(this.showTimeout), (this.showTimeout = 0))),
						e.removeDataSM('mousedown'),
						this.$root.triggerHandler('mouseleave.smapi', e[0]));
				},
				menuHide: function (i) {
					if (
						this.$root.triggerHandler('beforehide.smapi', i[0]) !== !1 &&
						(i.stop(!0, !0), 'none' != i.css('display'))
					) {
						var e = function () {
							i.css('z-index', '');
						};
						this.isCollapsible()
							? this.opts.collapsibleHideFunction
								? this.opts.collapsibleHideFunction.call(this, i, e)
								: i.hide(this.opts.collapsibleHideDuration, e)
							: this.opts.hideFunction
							? this.opts.hideFunction.call(this, i, e)
							: i.hide(this.opts.hideDuration, e),
							i.dataSM('ie-shim') &&
								i
									.dataSM('ie-shim')
									.remove()
									.css({ '-webkit-transform': '', transform: '' }),
							i.dataSM('scroll') &&
								(this.menuScrollStop(i),
								i
									.css({
										'touch-action': '',
										'-ms-touch-action': '',
										'-webkit-transform': '',
										transform: '',
									})
									.unbind('.smartmenus_scroll')
									.removeDataSM('scroll')
									.dataSM('scroll-arrows')
									.hide()),
							i
								.dataSM('parent-a')
								.removeClass('highlighted')
								.attr('aria-expanded', 'false'),
							i.attr({ 'aria-expanded': 'false', 'aria-hidden': 'true' });
						var s = i.dataSM('level');
						this.activatedItems.splice(s - 1, 1),
							this.visibleSubMenus.splice(
								t.inArray(i, this.visibleSubMenus),
								1
							),
							this.$root.triggerHandler('hide.smapi', i[0]);
					}
				},
				menuHideAll: function () {
					this.showTimeout &&
						(clearTimeout(this.showTimeout), (this.showTimeout = 0));
					for (
						var t = this.opts.isPopup ? 1 : 0,
							i = this.visibleSubMenus.length - 1;
						i >= t;
						i--
					)
						this.menuHide(this.visibleSubMenus[i]);
					this.opts.isPopup &&
						(this.$root.stop(!0, !0),
						this.$root.is(':visible') &&
							(this.opts.hideFunction
								? this.opts.hideFunction.call(this, this.$root)
								: this.$root.hide(this.opts.hideDuration),
							this.$root.dataSM('ie-shim') &&
								this.$root.dataSM('ie-shim').remove())),
						(this.activatedItems = []),
						(this.visibleSubMenus = []),
						(this.clickActivated = !1),
						(this.focusActivated = !1),
						(this.zIndexInc = 0),
						this.$root.triggerHandler('hideAll.smapi');
				},
				menuHideSubMenus: function (t) {
					for (var i = this.activatedItems.length - 1; i >= t; i--) {
						var e = this.activatedItems[i].dataSM('sub');
						e && this.menuHide(e);
					}
				},
				menuIframeShim: function (i) {
					a &&
						this.opts.overlapControlsInIE &&
						!i.dataSM('ie-shim') &&
						i.dataSM(
							'ie-shim',
							t('<iframe/>')
								.attr({ src: 'javascript:0', tabindex: -9 })
								.css({
									position: 'absolute',
									top: 'auto',
									left: '0',
									opacity: 0,
									border: '0',
								})
						);
				},
				menuInit: function (t) {
					if (!t.dataSM('in-mega')) {
						t.hasClass('mega-menu') && t.find('ul').dataSM('in-mega', !0);
						for (
							var i = 2, e = t[0];
							(e = e.parentNode.parentNode) != this.$root[0];

						)
							i++;
						var s = t.prevAll('a').eq(-1);
						s.length || (s = t.prevAll().find('a').eq(-1)),
							s.addClass('has-submenu').dataSM('sub', t),
							t
								.dataSM('parent-a', s)
								.dataSM('level', i)
								.parent()
								.dataSM('sub', t);
						var o = s.attr('id') || this.accessIdPrefix + ++this.idInc,
							a = t.attr('id') || this.accessIdPrefix + ++this.idInc;
						s.attr({
							id: o,
							'aria-haspopup': 'true',
							'aria-controls': a,
							'aria-expanded': 'false',
						}),
							t.attr({
								id: a,
								role: 'group',
								'aria-hidden': 'true',
								'aria-labelledby': o,
								'aria-expanded': 'false',
							}),
							this.opts.subIndicators &&
								s[this.opts.subIndicatorsPos](this.$subArrow.clone());
					}
				},
				menuPosition: function (i) {
					var e,
						o,
						a = i.dataSM('parent-a'),
						r = a.closest('li'),
						h = r.parent(),
						u = i.dataSM('level'),
						l = this.getWidth(i),
						c = this.getHeight(i),
						d = a.offset(),
						m = d.left,
						p = d.top,
						f = this.getWidth(a),
						v = this.getHeight(a),
						b = t(window),
						S = b.scrollLeft(),
						g = b.scrollTop(),
						M = this.getViewportWidth(),
						w = this.getViewportHeight(),
						T =
							h.parent().is('[data-sm-horizontal-sub]') ||
							(2 == u && !h.hasClass('sm-vertical')),
						$ =
							(this.opts.rightToLeftSubMenus && !r.is('[data-sm-reverse]')) ||
							(!this.opts.rightToLeftSubMenus && r.is('[data-sm-reverse]')),
						y =
							2 == u
								? this.opts.mainMenuSubOffsetX
								: this.opts.subMenusSubOffsetX,
						I =
							2 == u
								? this.opts.mainMenuSubOffsetY
								: this.opts.subMenusSubOffsetY;
					if (
						(T
							? ((e = $ ? f - l - y : y),
							  (o = this.opts.bottomToTopSubMenus ? -c - I : v + I))
							: ((e = $ ? y - l : f - y),
							  (o = this.opts.bottomToTopSubMenus ? v - I - c : I)),
						this.opts.keepInViewport)
					) {
						var x = m + e,
							C = p + o;
						if (
							($ && S > x
								? (e = T ? S - x + e : f - y)
								: !$ && x + l > S + M && (e = T ? S + M - l - x + e : y - l),
							T ||
								(w > c && C + c > g + w
									? (o += g + w - c - C)
									: (c >= w || g > C) && (o += g - C)),
							(T && (C + c > g + w + 0.49 || g > C)) || (!T && c > w + 0.49))
						) {
							var H = this;
							i.dataSM('scroll-arrows') ||
								i.dataSM(
									'scroll-arrows',
									t([
										t(
											'<span class="scroll-up"><span class="scroll-up-arrow"></span></span>'
										)[0],
										t(
											'<span class="scroll-down"><span class="scroll-down-arrow"></span></span>'
										)[0],
									])
										.bind({
											mouseenter: function () {
												(i.dataSM('scroll').up = t(this).hasClass('scroll-up')),
													H.menuScroll(i);
											},
											mouseleave: function (t) {
												H.menuScrollStop(i), H.menuScrollOut(i, t);
											},
											'mousewheel DOMMouseScroll': function (t) {
												t.preventDefault();
											},
										})
										.insertAfter(i)
								);
							var A = '.smartmenus_scroll';
							i
								.dataSM('scroll', {
									y: this.cssTransforms3d ? 0 : o - v,
									step: 1,
									itemH: v,
									subH: c,
									arrowDownH: this.getHeight(i.dataSM('scroll-arrows').eq(1)),
								})
								.bind(
									s(
										[
											[
												'mouseover',
												function (t) {
													H.menuScrollOver(i, t);
												},
											],
											[
												'mouseout',
												function (t) {
													H.menuScrollOut(i, t);
												},
											],
											[
												'mousewheel DOMMouseScroll',
												function (t) {
													H.menuScrollMousewheel(i, t);
												},
											],
										],
										A
									)
								)
								.dataSM('scroll-arrows')
								.css({
									top: 'auto',
									left: '0',
									marginLeft: e + (parseInt(i.css('border-left-width')) || 0),
									width:
										l -
										(parseInt(i.css('border-left-width')) || 0) -
										(parseInt(i.css('border-right-width')) || 0),
									zIndex: i.css('z-index'),
								})
								.eq(T && this.opts.bottomToTopSubMenus ? 0 : 1)
								.show(),
								this.isFixed() &&
									i
										.css({ 'touch-action': 'none', '-ms-touch-action': 'none' })
										.bind(
											s(
												[
													[
														n
															? 'touchstart touchmove touchend'
															: 'pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp',
														function (t) {
															H.menuScrollTouch(i, t);
														},
													],
												],
												A
											)
										);
						}
					}
					i.css({ top: 'auto', left: '0', marginLeft: e, marginTop: o - v }),
						this.menuIframeShim(i),
						i.dataSM('ie-shim') &&
							i
								.dataSM('ie-shim')
								.css({
									zIndex: i.css('z-index'),
									width: l,
									height: c,
									marginLeft: e,
									marginTop: o - v,
								});
				},
				menuScroll: function (t, i, e) {
					var s,
						o = t.dataSM('scroll'),
						a = t.dataSM('scroll-arrows'),
						n = o.up ? o.upEnd : o.downEnd;
					if (!i && o.momentum) {
						if (((o.momentum *= 0.92), (s = o.momentum), 0.5 > s))
							return this.menuScrollStop(t), void 0;
					} else
						s =
							e ||
							(i || !this.opts.scrollAccelerate
								? this.opts.scrollStep
								: Math.floor(o.step));
					var h = t.dataSM('level');
					if (
						(this.activatedItems[h - 1] &&
							this.activatedItems[h - 1].dataSM('sub') &&
							this.activatedItems[h - 1].dataSM('sub').is(':visible') &&
							this.menuHideSubMenus(h - 1),
						(o.y =
							(o.up && o.y >= n) || (!o.up && n >= o.y)
								? o.y
								: Math.abs(n - o.y) > s
								? o.y + (o.up ? s : -s)
								: n),
						t
							.add(t.dataSM('ie-shim'))
							.css(
								this.cssTransforms3d
									? {
											'-webkit-transform': 'translate3d(0, ' + o.y + 'px, 0)',
											transform: 'translate3d(0, ' + o.y + 'px, 0)',
									  }
									: { marginTop: o.y }
							),
						r &&
							((o.up && o.y > o.downEnd) || (!o.up && o.y < o.upEnd)) &&
							a.eq(o.up ? 1 : 0).show(),
						o.y == n)
					)
						r && a.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t);
					else if (!i) {
						this.opts.scrollAccelerate &&
							o.step < this.opts.scrollStep &&
							(o.step += 0.2);
						var l = this;
						this.scrollTimeout = u(function () {
							l.menuScroll(t);
						});
					}
				},
				menuScrollMousewheel: function (t, i) {
					if (this.getClosestMenu(i.target) == t[0]) {
						i = i.originalEvent;
						var e = (i.wheelDelta || -i.detail) > 0;
						t
							.dataSM('scroll-arrows')
							.eq(e ? 0 : 1)
							.is(':visible') &&
							((t.dataSM('scroll').up = e), this.menuScroll(t, !0));
					}
					i.preventDefault();
				},
				menuScrollOut: function (i, e) {
					r &&
						(/^scroll-(up|down)/.test((e.relatedTarget || '').className) ||
							((i[0] == e.relatedTarget || t.contains(i[0], e.relatedTarget)) &&
								this.getClosestMenu(e.relatedTarget) == i[0]) ||
							i.dataSM('scroll-arrows').css('visibility', 'hidden'));
				},
				menuScrollOver: function (i, e) {
					if (
						r &&
						!/^scroll-(up|down)/.test(e.target.className) &&
						this.getClosestMenu(e.target) == i[0]
					) {
						this.menuScrollRefreshData(i);
						var s = i.dataSM('scroll'),
							o =
								t(window).scrollTop() -
								i.dataSM('parent-a').offset().top -
								s.itemH;
						i.dataSM('scroll-arrows')
							.eq(0)
							.css('margin-top', o)
							.end()
							.eq(1)
							.css('margin-top', o + this.getViewportHeight() - s.arrowDownH)
							.end()
							.css('visibility', 'visible');
					}
				},
				menuScrollRefreshData: function (i) {
					var e = i.dataSM('scroll'),
						s =
							t(window).scrollTop() -
							i.dataSM('parent-a').offset().top -
							e.itemH;
					this.cssTransforms3d && (s = -(parseFloat(i.css('margin-top')) - s)),
						t.extend(e, {
							upEnd: s,
							downEnd: s + this.getViewportHeight() - e.subH,
						});
				},
				menuScrollStop: function (t) {
					return this.scrollTimeout
						? (l(this.scrollTimeout),
						  (this.scrollTimeout = 0),
						  (t.dataSM('scroll').step = 1),
						  !0)
						: void 0;
				},
				menuScrollTouch: function (i, s) {
					if (((s = s.originalEvent), e(s))) {
						var o = this.getTouchPoint(s);
						if (this.getClosestMenu(o.target) == i[0]) {
							var a = i.dataSM('scroll');
							if (/(start|down)$/i.test(s.type))
								this.menuScrollStop(i)
									? (s.preventDefault(), (this.$touchScrollingSub = i))
									: (this.$touchScrollingSub = null),
									this.menuScrollRefreshData(i),
									t.extend(a, {
										touchStartY: o.pageY,
										touchStartTime: s.timeStamp,
									});
							else if (/move$/i.test(s.type)) {
								var r = void 0 !== a.touchY ? a.touchY : a.touchStartY;
								if (void 0 !== r && r != o.pageY) {
									this.$touchScrollingSub = i;
									var n = o.pageY > r;
									void 0 !== a.up &&
										a.up != n &&
										t.extend(a, {
											touchStartY: o.pageY,
											touchStartTime: s.timeStamp,
										}),
										t.extend(a, { up: n, touchY: o.pageY }),
										this.menuScroll(i, !0, Math.abs(o.pageY - r));
								}
								s.preventDefault();
							} else
								void 0 !== a.touchY &&
									((a.momentum =
										15 *
										Math.pow(
											Math.abs(o.pageY - a.touchStartY) /
												(s.timeStamp - a.touchStartTime),
											2
										)) &&
										(this.menuScrollStop(i),
										this.menuScroll(i),
										s.preventDefault()),
									delete a.touchY);
						}
					}
				},
				menuShow: function (t) {
					if (
						(t.dataSM('beforefirstshowfired') ||
							(t.dataSM('beforefirstshowfired', !0),
							this.$root.triggerHandler('beforefirstshow.smapi', t[0]) !==
								!1)) &&
						this.$root.triggerHandler('beforeshow.smapi', t[0]) !== !1 &&
						(t.dataSM('shown-before', !0).stop(!0, !0), !t.is(':visible'))
					) {
						var i = t.dataSM('parent-a');
						if (
							((this.opts.keepHighlighted || this.isCollapsible()) &&
								i.addClass('highlighted'),
							this.isCollapsible())
						)
							t.removeClass('sm-nowrap').css({
								zIndex: '',
								width: 'auto',
								minWidth: '',
								maxWidth: '',
								top: '',
								left: '',
								marginLeft: '',
								marginTop: '',
							});
						else {
							if (
								(t.css(
									'z-index',
									(this.zIndexInc =
										(this.zIndexInc || this.getStartZIndex()) + 1)
								),
								(this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) &&
									(t
										.css({ width: 'auto', minWidth: '', maxWidth: '' })
										.addClass('sm-nowrap'),
									this.opts.subMenusMinWidth &&
										t.css('min-width', this.opts.subMenusMinWidth),
									this.opts.subMenusMaxWidth))
							) {
								var e = this.getWidth(t);
								t.css('max-width', this.opts.subMenusMaxWidth),
									e > this.getWidth(t) &&
										t
											.removeClass('sm-nowrap')
											.css('width', this.opts.subMenusMaxWidth);
							}
							this.menuPosition(t),
								t.dataSM('ie-shim') && t.dataSM('ie-shim').insertBefore(t);
						}
						var s = function () {
							t.css('overflow', '');
						};
						this.isCollapsible()
							? this.opts.collapsibleShowFunction
								? this.opts.collapsibleShowFunction.call(this, t, s)
								: t.show(this.opts.collapsibleShowDuration, s)
							: this.opts.showFunction
							? this.opts.showFunction.call(this, t, s)
							: t.show(this.opts.showDuration, s),
							i.attr('aria-expanded', 'true'),
							t.attr({ 'aria-expanded': 'true', 'aria-hidden': 'false' }),
							this.visibleSubMenus.push(t),
							this.$root.triggerHandler('show.smapi', t[0]);
					}
				},
				popupHide: function (t) {
					this.hideTimeout &&
						(clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
					var i = this;
					this.hideTimeout = setTimeout(
						function () {
							i.menuHideAll();
						},
						t ? 1 : this.opts.hideTimeout
					);
				},
				popupShow: function (t, i) {
					if (!this.opts.isPopup)
						return (
							alert(
								'SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.'
							),
							void 0
						);
					if (
						(this.hideTimeout &&
							(clearTimeout(this.hideTimeout), (this.hideTimeout = 0)),
						this.$root.dataSM('shown-before', !0).stop(!0, !0),
						!this.$root.is(':visible'))
					) {
						this.$root.css({ left: t, top: i }),
							this.menuIframeShim(this.$root),
							this.$root.dataSM('ie-shim') &&
								this.$root
									.dataSM('ie-shim')
									.css({
										zIndex: this.$root.css('z-index'),
										width: this.getWidth(this.$root),
										height: this.getHeight(this.$root),
										left: t,
										top: i,
									})
									.insertBefore(this.$root);
						var e = this,
							s = function () {
								e.$root.css('overflow', '');
							};
						this.opts.showFunction
							? this.opts.showFunction.call(this, this.$root, s)
							: this.$root.show(this.opts.showDuration, s),
							(this.visibleSubMenus[0] = this.$root);
					}
				},
				refresh: function () {
					this.destroy(!0), this.init(!0);
				},
				rootKeyDown: function (i) {
					if (this.handleEvents())
						switch (i.keyCode) {
							case 27:
								var e = this.activatedItems[0];
								if (e) {
									this.menuHideAll(), e[0].focus();
									var s = e.dataSM('sub');
									s && this.menuHide(s);
								}
								break;
							case 32:
								var o = t(i.target);
								if (o.is('a') && this.handleItemEvents(o)) {
									var s = o.dataSM('sub');
									s &&
										!s.is(':visible') &&
										(this.itemClick({ currentTarget: i.target }),
										i.preventDefault());
								}
						}
				},
				rootOut: function (t) {
					if (
						this.handleEvents() &&
						!this.isTouchMode() &&
						t.target != this.$root[0] &&
						(this.hideTimeout &&
							(clearTimeout(this.hideTimeout), (this.hideTimeout = 0)),
						!this.opts.showOnClick || !this.opts.hideOnClick)
					) {
						var i = this;
						this.hideTimeout = setTimeout(function () {
							i.menuHideAll();
						}, this.opts.hideTimeout);
					}
				},
				rootOver: function (t) {
					this.handleEvents() &&
						!this.isTouchMode() &&
						t.target != this.$root[0] &&
						this.hideTimeout &&
						(clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
				},
				winResize: function (t) {
					if (this.handleEvents()) {
						if (
							!('onorientationchange' in window) ||
							'orientationchange' == t.type
						) {
							var i = this.isCollapsible();
							(this.wasCollapsible && i) ||
								(this.activatedItems.length &&
									this.activatedItems[this.activatedItems.length - 1][0].blur(),
								this.menuHideAll()),
								(this.wasCollapsible = i);
						}
					} else if (this.$disableOverlay) {
						var e = this.$root.offset();
						this.$disableOverlay.css({
							top: e.top,
							left: e.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight(),
						});
					}
				},
			},
		}),
		(t.fn.dataSM = function (t, i) {
			return i ? this.data(t + '_smartmenus', i) : this.data(t + '_smartmenus');
		}),
		(t.fn.removeDataSM = function (t) {
			return this.removeData(t + '_smartmenus');
		}),
		(t.fn.smartmenus = function (i) {
			if ('string' == typeof i) {
				var e = arguments,
					s = i;
				return (
					Array.prototype.shift.call(e),
					this.each(function () {
						var i = t(this).data('smartmenus');
						i && i[s] && i[s].apply(i, e);
					})
				);
			}
			var o = t.extend({}, t.fn.smartmenus.defaults, i);
			return this.each(function () {
				new t.SmartMenus(this, o);
			});
		}),
		(t.fn.smartmenus.defaults = {
			isPopup: !1,
			mainMenuSubOffsetX: 0,
			mainMenuSubOffsetY: 0,
			subMenusSubOffsetX: 0,
			subMenusSubOffsetY: 0,
			subMenusMinWidth: '10em',
			subMenusMaxWidth: '20em',
			subIndicators: !0,
			subIndicatorsPos: 'prepend',
			subIndicatorsText: '+',
			scrollStep: 30,
			scrollAccelerate: !0,
			showTimeout: 250,
			hideTimeout: 500,
			showDuration: 0,
			showFunction: null,
			hideDuration: 0,
			hideFunction: function (t, i) {
				t.fadeOut(200, i);
			},
			collapsibleShowDuration: 0,
			collapsibleShowFunction: function (t, i) {
				t.slideDown(200, i);
			},
			collapsibleHideDuration: 0,
			collapsibleHideFunction: function (t, i) {
				t.slideUp(200, i);
			},
			showOnClick: !1,
			hideOnClick: !0,
			noMouseOver: !1,
			keepInViewport: !0,
			keepHighlighted: !0,
			markCurrentItem: !1,
			markCurrentTree: !0,
			rightToLeftSubMenus: !1,
			bottomToTopSubMenus: !1,
			overlapControlsInIE: !0,
		}),
		t
	);
});
(function ($) {
	'use strict';
	var count = 1;
	$(window).on('scroll', function () {
		animateElement();
	});
	loadMoreArticleIndex();
	fixPullquoteClass();
	$("a.button[href^='#']").addClass('scroll');
	$('#comments').each(function () {
		if ($.trim($(this).html()) === '') {
			$(this).remove();
		}
	});
	$('.header-holder').sticky({ topSpacing: 0 });
	$('#header-main-menu ul li a.scroll, .scroll').on('click', function (e) {
		if ($(this).attr('href') === '#') {
			e.preventDefault();
		} else {
			if ($(window).width() < 1024) {
				if (!$(e.target).is('.sub-arrow')) {
					$('html, body').animate(
						{ scrollTop: $(this.hash).offset().top - 77 },
						1500
					);
					$('.menu-holder').removeClass('show');
					$('#toggle').removeClass('on');
					return false;
				}
			} else {
				$('html, body').animate(
					{ scrollTop: $(this.hash).offset().top - 77 },
					1500
				);
				return false;
			}
		}
	});
	$('.header-logo').on('click', function (e) {
		if ($('.page-template-onepage').length) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 1500);
		}
	});
	$(window).scrollTop(1);
	$(window).scrollTop(0);
	$('.single-post .num-comments a, .single-portfolio .num-comments a').on(
		'click',
		function (e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: $(this.hash).offset().top }, 2000);
			return false;
		}
	);
	$('input, textarea').on('focus', function () {
		$(this).data('placeholder', $(this).attr('placeholder'));
		$(this).attr('placeholder', '');
	});
	$('input, textarea').on('blur', function () {
		$(this).attr('placeholder', $(this).data('placeholder'));
	});
	$('.site-content').fitVids();
	$('.default-menu ul:first').addClass('sm sm-clean main-menu');
	$('.main-menu').smartmenus({
		subMenusSubOffsetX: 1,
		subMenusSubOffsetY: -8,
		markCurrentTree: true,
	});
	var $mainMenu = $('.main-menu')
		.on('click', 'span.sub-arrow', function (e) {
			var obj = $mainMenu.data('smartmenus');
			if (obj.isCollapsible()) {
				var $item = $(this).parent(),
					$sub = $item.parent().dataSM('sub');
				$sub.dataSM('arrowClicked', true);
			}
		})
		.bind({
			'beforeshow.smapi': function (e, menu) {
				var obj = $mainMenu.data('smartmenus');
				if (obj.isCollapsible()) {
					var $menu = $(menu);
					if (!$menu.dataSM('arrowClicked')) {
						return false;
					}
					$menu.removeDataSM('arrowClicked');
				}
			},
		});
	$('#toggle').on('click', multiClickFunctionStop);
	$(window).on('load', function () {
		animateElement();
		var hash = location.hash;
		if (hash != '' && $(hash).length) {
			$('html, body').animate({ scrollTop: $(hash).offset().top - 77 }, 1);
		}
		$('.doc-loader').fadeOut(600);
	});
	function animateElement(e) {
		$('.animate').each(function (i) {
			var top_of_object = $(this).offset().top;
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			if (bottom_of_window - 70 > top_of_object) {
				$(this).addClass('show-it');
			}
		});
	}
	function multiClickFunctionStop(e) {
		$('#toggle').off('click');
		$('#toggle').toggleClass('on');
		if ($('#toggle').hasClass('on')) {
			$('.menu-holder').addClass('show');
			$('#toggle').on('click', multiClickFunctionStop);
		} else {
			$('.menu-holder').removeClass('show');
			$('#toggle').on('click', multiClickFunctionStop);
		}
	}
	function loadMoreArticleIndex() {
		if (
			parseInt(ajax_var.posts_per_page_index) < parseInt(ajax_var.total_index)
		) {
			$('.more-posts').css('visibility', 'visible');
			$('.more-posts').animate({ opacity: 1 }, 1500);
		} else {
			$('.more-posts').css('display', 'none');
		}
		$('.more-posts:visible').on('click', function () {
			$('.more-posts').css('display', 'none');
			$('.more-posts-loading').css('display', 'inline-block');
			count++;
			loadArticleIndex(count);
		});
	}
	function loadArticleIndex(pageNumber) {
		$.ajax({
			url: ajax_var.url,
			type: 'POST',
			data:
				'action=infinite_scroll_index&page_no_index=' +
				pageNumber +
				'&loop_file_index=loop-index&security=' +
				ajax_var.nonce,
			success: function (html) {
				$('.blog-holder').imagesLoaded(function () {
					$('.blog-holder').append(html);
					setTimeout(function () {
						animateElement();
						if (count == ajax_var.num_pages_index) {
							$('.more-posts').css('display', 'none');
							$('.more-posts-loading').css('display', 'none');
							$('.no-more-posts').css('display', 'inline-block');
						} else {
							$('.more-posts').css('display', 'inline-block');
							$('.more-posts-loading').css('display', 'none');
						}
					}, 100);
				});
			},
		});
		return false;
	}
	$(window).on('scroll resize', function () {
		var currentSection = null;
		$('.section, footer').each(function () {
			var element = $(this).attr('id');
			if ($('#' + element).is('*')) {
				if ($(window).scrollTop() >= $('#' + element).offset().top - 115) {
					currentSection = element;
				}
			}
		});
		$('#header-main-menu ul li')
			.removeClass('active')
			.find('a[href*="#' + currentSection + '"]')
			.parent()
			.addClass('active');
	});
	function fixPullquoteClass() {
		$('figure.wp-block-pullquote')
			.find('blockquote')
			.first()
			.addClass('cocobasic-block-pullquote');
	}
	function is_touch_device() {
		return !!('ontouchstart' in window);
	}
})(jQuery);
/*! This file is auto-generated */
window.addComment = (function (p) {
	var f,
		v,
		I,
		C = p.document,
		h = {
			commentReplyClass: 'comment-reply-link',
			commentReplyTitleId: 'reply-title',
			cancelReplyId: 'cancel-comment-reply-link',
			commentFormId: 'commentform',
			temporaryFormId: 'wp-temp-form-div',
			parentIdFieldId: 'comment_parent',
			postIdFieldId: 'comment_post_ID',
		},
		e = p.MutationObserver || p.WebKitMutationObserver || p.MozMutationObserver,
		i = 'querySelector' in C && 'addEventListener' in p,
		n = !!C.documentElement.dataset;
	function t() {
		r(),
			(function () {
				if (!e) return;
				new e(o).observe(C.body, { childList: !0, subtree: !0 });
			})();
	}
	function r(e) {
		if (i && ((f = E(h.cancelReplyId)), (v = E(h.commentFormId)), f)) {
			f.addEventListener('touchstart', l), f.addEventListener('click', l);
			var t = function (e) {
				if ((e.metaKey || e.ctrlKey) && 13 === e.keyCode)
					return (
						v.removeEventListener('keydown', t),
						e.preventDefault(),
						v.submit.click(),
						!1
					);
			};
			v && v.addEventListener('keydown', t);
			for (
				var n,
					r = (function (e) {
						var t,
							n = h.commentReplyClass;
						(e && e.childNodes) || (e = C);
						t = C.getElementsByClassName
							? e.getElementsByClassName(n)
							: e.querySelectorAll('.' + n);
						return t;
					})(e),
					o = 0,
					d = r.length;
				o < d;
				o++
			)
				(n = r[o]).addEventListener('touchstart', a),
					n.addEventListener('click', a);
		}
	}
	function l(e) {
		var t = E(h.temporaryFormId);
		if (t && I) {
			E(h.parentIdFieldId).value = '0';
			var n = t.textContent;
			t.parentNode.replaceChild(I, t), (this.style.display = 'none');
			var r = E(h.commentReplyTitleId),
				o = r && r.firstChild;
			o && o.nodeType === Node.TEXT_NODE && n && (o.textContent = n),
				e.preventDefault();
		}
	}
	function a(e) {
		var t = E(h.commentReplyTitleId),
			n = t && t.firstChild.textContent,
			r = this,
			o = m(r, 'belowelement'),
			d = m(r, 'commentid'),
			i = m(r, 'respondelement'),
			l = m(r, 'postid'),
			a = m(r, 'replyto') || n;
		o &&
			d &&
			i &&
			l &&
			!1 === p.addComment.moveForm(o, d, i, l, a) &&
			e.preventDefault();
	}
	function o(e) {
		for (var t = e.length; t--; ) if (e[t].addedNodes.length) return void r();
	}
	function m(e, t) {
		return n ? e.dataset[t] : e.getAttribute('data-' + t);
	}
	function E(e) {
		return C.getElementById(e);
	}
	return (
		i && 'loading' !== C.readyState
			? t()
			: i && p.addEventListener('DOMContentLoaded', t, !1),
		{
			init: r,
			moveForm: function (e, t, n, r, o) {
				var d = E(e);
				I = E(n);
				var i,
					l,
					a,
					m = E(h.parentIdFieldId),
					c = E(h.postIdFieldId),
					s = E(h.commentReplyTitleId),
					u = s && s.firstChild;
				if (d && I && m) {
					void 0 === o && (o = u && u.textContent),
						(function (e) {
							var t = h.temporaryFormId,
								n = E(t),
								r = E(h.commentReplyTitleId),
								o = r ? r.firstChild.textContent : '';
							if (n) return;
							((n = C.createElement('div')).id = t),
								(n.style.display = 'none'),
								(n.textContent = o),
								e.parentNode.insertBefore(n, e);
						})(I),
						r && c && (c.value = r),
						(m.value = t),
						(f.style.display = ''),
						d.parentNode.insertBefore(I, d.nextSibling),
						u && u.nodeType === Node.TEXT_NODE && (u.textContent = o),
						(f.onclick = function () {
							return !1;
						});
					try {
						for (var y = 0; y < v.elements.length; y++)
							if (
								((i = v.elements[y]),
								(l = !1),
								'getComputedStyle' in p
									? (a = p.getComputedStyle(i))
									: C.documentElement.currentStyle && (a = i.currentStyle),
								((i.offsetWidth <= 0 && i.offsetHeight <= 0) ||
									'hidden' === a.visibility) &&
									(l = !0),
								'hidden' !== i.type && !i.disabled && !l)
							) {
								i.focus();
								break;
							}
					} catch (e) {}
					return !1;
				}
			},
		}
	);
})(window);
/*! This file is auto-generated */
!(function (d, l) {
	'use strict';
	var e = !1,
		o = !1;
	if (l.querySelector) if (d.addEventListener) e = !0;
	if (((d.wp = d.wp || {}), !d.wp.receiveEmbedMessage))
		if (
			((d.wp.receiveEmbedMessage = function (e) {
				var t = e.data;
				if (t)
					if (t.secret || t.message || t.value)
						if (!/[^a-zA-Z0-9]/.test(t.secret)) {
							var r,
								a,
								i,
								s,
								n,
								o = l.querySelectorAll(
									'iframe[data-secret="' + t.secret + '"]'
								),
								c = l.querySelectorAll(
									'blockquote[data-secret="' + t.secret + '"]'
								);
							for (r = 0; r < c.length; r++) c[r].style.display = 'none';
							for (r = 0; r < o.length; r++)
								if (((a = o[r]), e.source === a.contentWindow)) {
									if ((a.removeAttribute('style'), 'height' === t.message)) {
										if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
										else if (~~i < 200) i = 200;
										a.height = i;
									}
									if ('link' === t.message)
										if (
											((s = l.createElement('a')),
											(n = l.createElement('a')),
											(s.href = a.getAttribute('src')),
											(n.href = t.value),
											n.host === s.host)
										)
											if (l.activeElement === a) d.top.location.href = t.value;
								}
						}
			}),
			e)
		)
			d.addEventListener('message', d.wp.receiveEmbedMessage, !1),
				l.addEventListener('DOMContentLoaded', t, !1),
				d.addEventListener('load', t, !1);
	function t() {
		if (!o) {
			o = !0;
			var e,
				t,
				r,
				a,
				i = -1 !== navigator.appVersion.indexOf('MSIE 10'),
				s = !!navigator.userAgent.match(/Trident.*rv:11\./),
				n = l.querySelectorAll('iframe.wp-embedded-content');
			for (t = 0; t < n.length; t++) {
				if (!(r = n[t]).getAttribute('data-secret'))
					(a = Math.random().toString(36).substr(2, 10)),
						(r.src += '#?secret=' + a),
						r.setAttribute('data-secret', a);
				if (i || s)
					(e = r.cloneNode(!0)).removeAttribute('security'),
						r.parentNode.replaceChild(e, r);
			}
		}
	}
})(window, document);
