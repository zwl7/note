export const commonjsGlobal =
	typeof globalThis !== "undefined" ?
	globalThis :
	typeof window !== "undefined" ?
	window :
	typeof global !== "undefined" ?
	global :
	typeof self !== "undefined" ?
	self : {};

export function createCommonjsModule(fn, basedir, module) {
	return (
		(module = {
			path: basedir,
			exports: {},
			require: function(path, base) {
				return commonjsRequire(
					path,
					base === undefined || base === null ? module.path : base
				);
			},
		}),
		fn(module, module.exports),
		module.exports
	);
}

export function commonjsRequire() {
	throw new Error(
		"Dynamic requires are not currently supported by @rollup/plugin-commonjs"
	);
}

export const logger = createCommonjsModule(function(module) {
	/*!
	 * js-logger - http://github.com/jonnyreeves/js-logger
	 * Jonny Reeves, http://jonnyreeves.co.uk/
	 * js-logger may be freely distributed under the MIT license.
	 */
	(function(global) {
		// Top level module for the global, static logger instance.
		var Logger = {};

		// For those that are at home that are keeping score.
		Logger.VERSION = "1.6.0";

		// Function which handles all incoming log messages.
		var logHandler;

		// Map of ContextualLogger instances by name; used by Logger.get() to return the same named instance.
		var contextualLoggersByNameMap = {};

		// Polyfill for ES5's Function.bind.
		var bind = function(scope, func) {
			return function() {
				return func.apply(scope, arguments);
			};
		};

		// Super exciting object merger-matron 9000 adding another 100 bytes to your download.
		var merge = function() {
			var args = arguments,
				target = args[0],
				key,
				i;
			for (i = 1; i < args.length; i++) {
				for (key in args[i]) {
					if (!(key in target) && args[i].hasOwnProperty(key)) {
						target[key] = args[i][key];
					}
				}
			}
			return target;
		};

		// Helper to define a logging level object; helps with optimisation.
		var defineLogLevel = function(value, name) {
			return {
				value: value,
				name: name
			};
		};

		// Predefined logging levels.
		Logger.TRACE = defineLogLevel(1, "TRACE");
		Logger.DEBUG = defineLogLevel(2, "DEBUG");
		Logger.INFO = defineLogLevel(3, "INFO");
		Logger.TIME = defineLogLevel(4, "TIME");
		Logger.WARN = defineLogLevel(5, "WARN");
		Logger.ERROR = defineLogLevel(8, "ERROR");
		Logger.OFF = defineLogLevel(99, "OFF");

		// Inner class which performs the bulk of the work; ContextualLogger instances can be configured independently
		// of each other.
		var ContextualLogger = function(defaultContext) {
			this.context = defaultContext;
			this.setLevel(defaultContext.filterLevel);
			this.log = this.info; // Convenience alias.
		};

		ContextualLogger.prototype = {
			// Changes the current logging level for the logging instance.
			setLevel: function(newLevel) {
				// Ensure the supplied Level object looks valid.
				if (newLevel && "value" in newLevel) {
					this.context.filterLevel = newLevel;
				}
			},

			// Gets the current logging level for the logging instance
			getLevel: function() {
				return this.context.filterLevel;
			},

			// Is the logger configured to output messages at the supplied level?
			enabledFor: function(lvl) {
				var filterLevel = this.context.filterLevel;
				return lvl.value >= filterLevel.value;
			},

			trace: function() {
				this.invoke(Logger.TRACE, arguments);
			},

			debug: function() {
				this.invoke(Logger.DEBUG, arguments);
			},

			info: function() {
				this.invoke(Logger.INFO, arguments);
			},

			warn: function() {
				this.invoke(Logger.WARN, arguments);
			},

			error: function() {
				this.invoke(Logger.ERROR, arguments);
			},

			time: function(label) {
				if (typeof label === "string" && label.length > 0) {
					this.invoke(Logger.TIME, [label, "start"]);
				}
			},

			timeEnd: function(label) {
				if (typeof label === "string" && label.length > 0) {
					this.invoke(Logger.TIME, [label, "end"]);
				}
			},

			// Invokes the logger callback if it's not being filtered.
			invoke: function(level, msgArgs) {
				if (logHandler && this.enabledFor(level)) {
					logHandler(msgArgs, merge({
						level: level
					}, this.context));
				}
			},
		};

		// Protected instance which all calls to the to level `Logger` module will be routed through.
		var globalLogger = new ContextualLogger({
			filterLevel: Logger.OFF
		});

		// Configure the global Logger instance.
		(function() {
			// Shortcut for optimisers.
			var L = Logger;

			L.enabledFor = bind(globalLogger, globalLogger.enabledFor);
			L.trace = bind(globalLogger, globalLogger.trace);
			L.debug = bind(globalLogger, globalLogger.debug);
			L.time = bind(globalLogger, globalLogger.time);
			L.timeEnd = bind(globalLogger, globalLogger.timeEnd);
			L.info = bind(globalLogger, globalLogger.info);
			L.warn = bind(globalLogger, globalLogger.warn);
			L.error = bind(globalLogger, globalLogger.error);

			// Don't forget the convenience alias!
			L.log = L.info;
		})();

		// Set the global logging handler.  The supplied function should expect two arguments, the first being an arguments
		// object with the supplied log messages and the second being a context object which contains a hash of stateful
		// parameters which the logging function can consume.
		Logger.setHandler = function(func) {
			logHandler = func;
		};

		// Sets the global logging filter level which applies to *all* previously registered, and future Logger instances.
		// (note that named loggers (retrieved via `Logger.get`) can be configured independently if required).
		Logger.setLevel = function(level) {
			// Set the globalLogger's level.
			globalLogger.setLevel(level);

			// Apply this level to all registered contextual loggers.
			for (var key in contextualLoggersByNameMap) {
				if (contextualLoggersByNameMap.hasOwnProperty(key)) {
					contextualLoggersByNameMap[key].setLevel(level);
				}
			}
		};

		// Gets the global logging filter level
		Logger.getLevel = function() {
			return globalLogger.getLevel();
		};

		// Retrieve a ContextualLogger instance.  Note that named loggers automatically inherit the global logger's level,
		// default context and log handler.
		Logger.get = function(name) {
			// All logger instances are cached so they can be configured ahead of use.
			return (
				contextualLoggersByNameMap[name] ||
				(contextualLoggersByNameMap[name] = new ContextualLogger(
					merge({
						name: name
					}, globalLogger.context)
				))
			);
		};

		// CreateDefaultHandler returns a handler function which can be passed to `Logger.setHandler()` which will
		// write to the window's console object (if present); the optional options object can be used to customise the
		// formatter used to format each log message.
		Logger.createDefaultHandler = function(options) {
			options = options || {};

			options.formatter =
				options.formatter ||
				function defaultMessageFormatter(messages, context) {
					// Prepend the logger's name to the log message for easy identification.
					if (context.name) {
						messages.unshift("[" + context.name + "]");
					}
				};

			// Map of timestamps by timer labels used to track `#time` and `#timeEnd()` invocations in environments
			// that don't offer a native console method.
			var timerStartTimeByLabelMap = {};

			// Support for IE8+ (and other, slightly more sane environments)
			var invokeConsoleMethod = function(hdlr, messages) {
				Function.prototype.apply.call(hdlr, console, messages);
			};

			// Check for the presence of a logger.
			if (typeof console === "undefined") {
				return function() {
					/* no console */
				};
			}

			return function(messages, context) {
				// Convert arguments object to Array.
				messages = Array.prototype.slice.call(messages);

				var hdlr = console.log;
				var timerLabel;

				if (context.level === Logger.TIME) {
					timerLabel =
						(context.name ? "[" + context.name + "] " : "") + messages[0];

					if (messages[1] === "start") {
						if (console.time) {
							console.time(timerLabel);
						} else {
							timerStartTimeByLabelMap[timerLabel] = new Date().getTime();
						}
					} else {
						if (console.timeEnd) {
							console.timeEnd(timerLabel);
						} else {
							invokeConsoleMethod(hdlr, [
								timerLabel +
								": " +
								(new Date().getTime() -
									timerStartTimeByLabelMap[timerLabel]) +
								"ms",
							]);
						}
					}
				} else {
					// Delegate through to custom warn/error loggers if present on the console.
					if (context.level === Logger.WARN && console.warn) {
						hdlr = console.warn;
					} else if (context.level === Logger.ERROR && console.error) {
						hdlr = console.error;
					} else if (context.level === Logger.INFO && console.info) {
						hdlr = console.info;
					} else if (context.level === Logger.DEBUG && console.debug) {
						hdlr = console.debug;
					} else if (context.level === Logger.TRACE && console.trace) {
						hdlr = console.trace;
					}

					options.formatter(messages, context);
					invokeConsoleMethod(hdlr, messages);
				}
			};
		};

		// Configure and example a Default implementation which writes to the `window.console` (if present).  The
		// `options` hash can be used to configure the default logLevel and provide a custom message formatter.
		Logger.useDefaults = function(options) {
			Logger.setLevel((options && options.defaultLevel) || Logger.DEBUG);
			Logger.setHandler(Logger.createDefaultHandler(options));
		};

		// Export to popular environments boilerplate.
		if (module.exports) {
			module.exports = Logger;
		} else {
			Logger._prevLogger = global.Logger;

			Logger.noConflict = function() {
				global.Logger = Logger._prevLogger;
				return Logger;
			};

			global.Logger = Logger;
		}
	})(commonjsGlobal);
});

export const sparkMd5 = createCommonjsModule(function(module, exports) {
	(function(factory) {
		{
			// Node/CommonJS
			module.exports = factory();
		}
	})(function(undefined$1) {
		/*
		 * Fastest md5 implementation around (JKM md5).
		 * Credits: Joseph Myers
		 *
		 * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
		 * @see http://jsperf.com/md5-shootout/7
		 */

		/* this function is much faster,
		  so if possible we use it. Some IEs
		  are the only ones I know of that
		  need the idiotic second function,
		  generated by an if clause.  */
		var hex_chr = [
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
		];

		function md5cycle(x, k) {
			var a = x[0],
				b = x[1],
				c = x[2],
				d = x[3];

			a += (((b & c) | (~b & d)) + k[0] - 680876936) | 0;
			a = (((a << 7) | (a >>> 25)) + b) | 0;
			d += (((a & b) | (~a & c)) + k[1] - 389564586) | 0;
			d = (((d << 12) | (d >>> 20)) + a) | 0;
			c += (((d & a) | (~d & b)) + k[2] + 606105819) | 0;
			c = (((c << 17) | (c >>> 15)) + d) | 0;
			b += (((c & d) | (~c & a)) + k[3] - 1044525330) | 0;
			b = (((b << 22) | (b >>> 10)) + c) | 0;
			a += (((b & c) | (~b & d)) + k[4] - 176418897) | 0;
			a = (((a << 7) | (a >>> 25)) + b) | 0;
			d += (((a & b) | (~a & c)) + k[5] + 1200080426) | 0;
			d = (((d << 12) | (d >>> 20)) + a) | 0;
			c += (((d & a) | (~d & b)) + k[6] - 1473231341) | 0;
			c = (((c << 17) | (c >>> 15)) + d) | 0;
			b += (((c & d) | (~c & a)) + k[7] - 45705983) | 0;
			b = (((b << 22) | (b >>> 10)) + c) | 0;
			a += (((b & c) | (~b & d)) + k[8] + 1770035416) | 0;
			a = (((a << 7) | (a >>> 25)) + b) | 0;
			d += (((a & b) | (~a & c)) + k[9] - 1958414417) | 0;
			d = (((d << 12) | (d >>> 20)) + a) | 0;
			c += (((d & a) | (~d & b)) + k[10] - 42063) | 0;
			c = (((c << 17) | (c >>> 15)) + d) | 0;
			b += (((c & d) | (~c & a)) + k[11] - 1990404162) | 0;
			b = (((b << 22) | (b >>> 10)) + c) | 0;
			a += (((b & c) | (~b & d)) + k[12] + 1804603682) | 0;
			a = (((a << 7) | (a >>> 25)) + b) | 0;
			d += (((a & b) | (~a & c)) + k[13] - 40341101) | 0;
			d = (((d << 12) | (d >>> 20)) + a) | 0;
			c += (((d & a) | (~d & b)) + k[14] - 1502002290) | 0;
			c = (((c << 17) | (c >>> 15)) + d) | 0;
			b += (((c & d) | (~c & a)) + k[15] + 1236535329) | 0;
			b = (((b << 22) | (b >>> 10)) + c) | 0;

			a += (((b & d) | (c & ~d)) + k[1] - 165796510) | 0;
			a = (((a << 5) | (a >>> 27)) + b) | 0;
			d += (((a & c) | (b & ~c)) + k[6] - 1069501632) | 0;
			d = (((d << 9) | (d >>> 23)) + a) | 0;
			c += (((d & b) | (a & ~b)) + k[11] + 643717713) | 0;
			c = (((c << 14) | (c >>> 18)) + d) | 0;
			b += (((c & a) | (d & ~a)) + k[0] - 373897302) | 0;
			b = (((b << 20) | (b >>> 12)) + c) | 0;
			a += (((b & d) | (c & ~d)) + k[5] - 701558691) | 0;
			a = (((a << 5) | (a >>> 27)) + b) | 0;
			d += (((a & c) | (b & ~c)) + k[10] + 38016083) | 0;
			d = (((d << 9) | (d >>> 23)) + a) | 0;
			c += (((d & b) | (a & ~b)) + k[15] - 660478335) | 0;
			c = (((c << 14) | (c >>> 18)) + d) | 0;
			b += (((c & a) | (d & ~a)) + k[4] - 405537848) | 0;
			b = (((b << 20) | (b >>> 12)) + c) | 0;
			a += (((b & d) | (c & ~d)) + k[9] + 568446438) | 0;
			a = (((a << 5) | (a >>> 27)) + b) | 0;
			d += (((a & c) | (b & ~c)) + k[14] - 1019803690) | 0;
			d = (((d << 9) | (d >>> 23)) + a) | 0;
			c += (((d & b) | (a & ~b)) + k[3] - 187363961) | 0;
			c = (((c << 14) | (c >>> 18)) + d) | 0;
			b += (((c & a) | (d & ~a)) + k[8] + 1163531501) | 0;
			b = (((b << 20) | (b >>> 12)) + c) | 0;
			a += (((b & d) | (c & ~d)) + k[13] - 1444681467) | 0;
			a = (((a << 5) | (a >>> 27)) + b) | 0;
			d += (((a & c) | (b & ~c)) + k[2] - 51403784) | 0;
			d = (((d << 9) | (d >>> 23)) + a) | 0;
			c += (((d & b) | (a & ~b)) + k[7] + 1735328473) | 0;
			c = (((c << 14) | (c >>> 18)) + d) | 0;
			b += (((c & a) | (d & ~a)) + k[12] - 1926607734) | 0;
			b = (((b << 20) | (b >>> 12)) + c) | 0;

			a += ((b ^ c ^ d) + k[5] - 378558) | 0;
			a = (((a << 4) | (a >>> 28)) + b) | 0;
			d += ((a ^ b ^ c) + k[8] - 2022574463) | 0;
			d = (((d << 11) | (d >>> 21)) + a) | 0;
			c += ((d ^ a ^ b) + k[11] + 1839030562) | 0;
			c = (((c << 16) | (c >>> 16)) + d) | 0;
			b += ((c ^ d ^ a) + k[14] - 35309556) | 0;
			b = (((b << 23) | (b >>> 9)) + c) | 0;
			a += ((b ^ c ^ d) + k[1] - 1530992060) | 0;
			a = (((a << 4) | (a >>> 28)) + b) | 0;
			d += ((a ^ b ^ c) + k[4] + 1272893353) | 0;
			d = (((d << 11) | (d >>> 21)) + a) | 0;
			c += ((d ^ a ^ b) + k[7] - 155497632) | 0;
			c = (((c << 16) | (c >>> 16)) + d) | 0;
			b += ((c ^ d ^ a) + k[10] - 1094730640) | 0;
			b = (((b << 23) | (b >>> 9)) + c) | 0;
			a += ((b ^ c ^ d) + k[13] + 681279174) | 0;
			a = (((a << 4) | (a >>> 28)) + b) | 0;
			d += ((a ^ b ^ c) + k[0] - 358537222) | 0;
			d = (((d << 11) | (d >>> 21)) + a) | 0;
			c += ((d ^ a ^ b) + k[3] - 722521979) | 0;
			c = (((c << 16) | (c >>> 16)) + d) | 0;
			b += ((c ^ d ^ a) + k[6] + 76029189) | 0;
			b = (((b << 23) | (b >>> 9)) + c) | 0;
			a += ((b ^ c ^ d) + k[9] - 640364487) | 0;
			a = (((a << 4) | (a >>> 28)) + b) | 0;
			d += ((a ^ b ^ c) + k[12] - 421815835) | 0;
			d = (((d << 11) | (d >>> 21)) + a) | 0;
			c += ((d ^ a ^ b) + k[15] + 530742520) | 0;
			c = (((c << 16) | (c >>> 16)) + d) | 0;
			b += ((c ^ d ^ a) + k[2] - 995338651) | 0;
			b = (((b << 23) | (b >>> 9)) + c) | 0;

			a += ((c ^ (b | ~d)) + k[0] - 198630844) | 0;
			a = (((a << 6) | (a >>> 26)) + b) | 0;
			d += ((b ^ (a | ~c)) + k[7] + 1126891415) | 0;
			d = (((d << 10) | (d >>> 22)) + a) | 0;
			c += ((a ^ (d | ~b)) + k[14] - 1416354905) | 0;
			c = (((c << 15) | (c >>> 17)) + d) | 0;
			b += ((d ^ (c | ~a)) + k[5] - 57434055) | 0;
			b = (((b << 21) | (b >>> 11)) + c) | 0;
			a += ((c ^ (b | ~d)) + k[12] + 1700485571) | 0;
			a = (((a << 6) | (a >>> 26)) + b) | 0;
			d += ((b ^ (a | ~c)) + k[3] - 1894986606) | 0;
			d = (((d << 10) | (d >>> 22)) + a) | 0;
			c += ((a ^ (d | ~b)) + k[10] - 1051523) | 0;
			c = (((c << 15) | (c >>> 17)) + d) | 0;
			b += ((d ^ (c | ~a)) + k[1] - 2054922799) | 0;
			b = (((b << 21) | (b >>> 11)) + c) | 0;
			a += ((c ^ (b | ~d)) + k[8] + 1873313359) | 0;
			a = (((a << 6) | (a >>> 26)) + b) | 0;
			d += ((b ^ (a | ~c)) + k[15] - 30611744) | 0;
			d = (((d << 10) | (d >>> 22)) + a) | 0;
			c += ((a ^ (d | ~b)) + k[6] - 1560198380) | 0;
			c = (((c << 15) | (c >>> 17)) + d) | 0;
			b += ((d ^ (c | ~a)) + k[13] + 1309151649) | 0;
			b = (((b << 21) | (b >>> 11)) + c) | 0;
			a += ((c ^ (b | ~d)) + k[4] - 145523070) | 0;
			a = (((a << 6) | (a >>> 26)) + b) | 0;
			d += ((b ^ (a | ~c)) + k[11] - 1120210379) | 0;
			d = (((d << 10) | (d >>> 22)) + a) | 0;
			c += ((a ^ (d | ~b)) + k[2] + 718787259) | 0;
			c = (((c << 15) | (c >>> 17)) + d) | 0;
			b += ((d ^ (c | ~a)) + k[9] - 343485551) | 0;
			b = (((b << 21) | (b >>> 11)) + c) | 0;

			x[0] = (a + x[0]) | 0;
			x[1] = (b + x[1]) | 0;
			x[2] = (c + x[2]) | 0;
			x[3] = (d + x[3]) | 0;
		}

		function md5blk(s) {
			var md5blks = [],
				i; /* Andy King said do it this way. */

			for (i = 0; i < 64; i += 4) {
				md5blks[i >> 2] =
					s.charCodeAt(i) +
					(s.charCodeAt(i + 1) << 8) +
					(s.charCodeAt(i + 2) << 16) +
					(s.charCodeAt(i + 3) << 24);
			}
			return md5blks;
		}

		function md5blk_array(a) {
			var md5blks = [],
				i; /* Andy King said do it this way. */

			for (i = 0; i < 64; i += 4) {
				md5blks[i >> 2] =
					a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
			}
			return md5blks;
		}

		function md51(s) {
			var n = s.length,
				state = [1732584193, -271733879, -1732584194, 271733878],
				i,
				length,
				tail,
				tmp,
				lo,
				hi;

			for (i = 64; i <= n; i += 64) {
				md5cycle(state, md5blk(s.substring(i - 64, i)));
			}
			s = s.substring(i - 64);
			length = s.length;
			tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (i = 0; i < length; i += 1) {
				tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
			}
			tail[i >> 2] |= 0x80 << (i % 4 << 3);
			if (i > 55) {
				md5cycle(state, tail);
				for (i = 0; i < 16; i += 1) {
					tail[i] = 0;
				}
			}

			// Beware that the final length might not fit in 32 bits so we take care of that
			tmp = n * 8;
			tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
			lo = parseInt(tmp[2], 16);
			hi = parseInt(tmp[1], 16) || 0;

			tail[14] = lo;
			tail[15] = hi;

			md5cycle(state, tail);
			return state;
		}

		function md51_array(a) {
			var n = a.length,
				state = [1732584193, -271733879, -1732584194, 271733878],
				i,
				length,
				tail,
				tmp,
				lo,
				hi;

			for (i = 64; i <= n; i += 64) {
				md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
			}

			// Not sure if it is a bug, however IE10 will always produce a sub array of length 1
			// containing the last element of the parent array if the sub array specified starts
			// beyond the length of the parent array - weird.
			// https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
			a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);

			length = a.length;
			tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (i = 0; i < length; i += 1) {
				tail[i >> 2] |= a[i] << (i % 4 << 3);
			}

			tail[i >> 2] |= 0x80 << (i % 4 << 3);
			if (i > 55) {
				md5cycle(state, tail);
				for (i = 0; i < 16; i += 1) {
					tail[i] = 0;
				}
			}

			// Beware that the final length might not fit in 32 bits so we take care of that
			tmp = n * 8;
			tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
			lo = parseInt(tmp[2], 16);
			hi = parseInt(tmp[1], 16) || 0;

			tail[14] = lo;
			tail[15] = hi;

			md5cycle(state, tail);

			return state;
		}

		function rhex(n) {
			var s = "",
				j;
			for (j = 0; j < 4; j += 1) {
				s +=
					hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f];
			}
			return s;
		}

		function hex(x) {
			var i;
			for (i = 0; i < x.length; i += 1) {
				x[i] = rhex(x[i]);
			}
			return x.join("");
		}

		// In some cases the fast add32 function cannot be used..
		if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592");

		// ---------------------------------------------------

		/**
		 * ArrayBuffer slice polyfill.
		 *
		 * @see https://github.com/ttaubert/node-arraybuffer-slice
		 */

		if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
			(function() {
				function clamp(val, length) {
					val = val | 0 || 0;

					if (val < 0) {
						return Math.max(val + length, 0);
					}

					return Math.min(val, length);
				}

				ArrayBuffer.prototype.slice = function(from, to) {
					var length = this.byteLength,
						begin = clamp(from, length),
						end = length,
						num,
						target,
						targetArray,
						sourceArray;

					if (to !== undefined$1) {
						end = clamp(to, length);
					}

					if (begin > end) {
						return new ArrayBuffer(0);
					}

					num = end - begin;
					target = new ArrayBuffer(num);
					targetArray = new Uint8Array(target);

					sourceArray = new Uint8Array(this, begin, num);
					targetArray.set(sourceArray);

					return target;
				};
			})();
		}

		// ---------------------------------------------------

		/**
		 * Helpers.
		 */

		function toUtf8(str) {
			if (/[\u0080-\uFFFF]/.test(str)) {
				str = unescape(encodeURIComponent(str));
			}

			return str;
		}

		function utf8Str2ArrayBuffer(str, returnUInt8Array) {
			var length = str.length,
				buff = new ArrayBuffer(length),
				arr = new Uint8Array(buff),
				i;

			for (i = 0; i < length; i += 1) {
				arr[i] = str.charCodeAt(i);
			}

			return returnUInt8Array ? arr : buff;
		}

		function arrayBuffer2Utf8Str(buff) {
			return String.fromCharCode.apply(null, new Uint8Array(buff));
		}

		function concatenateArrayBuffers(first, second, returnUInt8Array) {
			var result = new Uint8Array(first.byteLength + second.byteLength);

			result.set(new Uint8Array(first));
			result.set(new Uint8Array(second), first.byteLength);

			return returnUInt8Array ? result : result.buffer;
		}

		function hexToBinaryString(hex) {
			var bytes = [],
				length = hex.length,
				x;

			for (x = 0; x < length - 1; x += 2) {
				bytes.push(parseInt(hex.substr(x, 2), 16));
			}

			return String.fromCharCode.apply(String, bytes);
		}

		// ---------------------------------------------------

		/**
		 * SparkMD5 OOP implementation.
		 *
		 * Use this class to perform an incremental md5, otherwise use the
		 * static methods instead.
		 */

		function SparkMD5() {
			// call reset to init the instance
			this.reset();
		}

		/**
		 * Appends a string.
		 * A conversion will be applied if an utf8 string is detected.
		 *
		 * @param {String} str The string to be appended
		 *
		 * @return {SparkMD5} The instance itself
		 */
		SparkMD5.prototype.append = function(str) {
			// Converts the string to utf8 bytes if necessary
			// Then append as binary
			this.appendBinary(toUtf8(str));

			return this;
		};

		/**
		 * Appends a binary string.
		 *
		 * @param {String} contents The binary string to be appended
		 *
		 * @return {SparkMD5} The instance itself
		 */
		SparkMD5.prototype.appendBinary = function(contents) {
			this._buff += contents;
			this._length += contents.length;

			var length = this._buff.length,
				i;

			for (i = 64; i <= length; i += 64) {
				md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
			}

			this._buff = this._buff.substring(i - 64);

			return this;
		};

		/**
		 * Finishes the incremental computation, reseting the internal state and
		 * returning the result.
		 *
		 * @param {Boolean} raw True to get the raw string, false to get the hex string
		 *
		 * @return {String} The result
		 */
		SparkMD5.prototype.end = function(raw) {
			var buff = this._buff,
				length = buff.length,
				i,
				tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				ret;

			for (i = 0; i < length; i += 1) {
				tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
			}

			this._finish(tail, length);
			ret = hex(this._hash);

			if (raw) {
				ret = hexToBinaryString(ret);
			}

			this.reset();

			return ret;
		};

		/**
		 * Resets the internal state of the computation.
		 *
		 * @return {SparkMD5} The instance itself
		 */
		SparkMD5.prototype.reset = function() {
			this._buff = "";
			this._length = 0;
			this._hash = [1732584193, -271733879, -1732584194, 271733878];

			return this;
		};

		/**
		 * Gets the internal state of the computation.
		 *
		 * @return {Object} The state
		 */
		SparkMD5.prototype.getState = function() {
			return {
				buff: this._buff,
				length: this._length,
				hash: this._hash.slice(),
			};
		};

		/**
		 * Gets the internal state of the computation.
		 *
		 * @param {Object} state The state
		 *
		 * @return {SparkMD5} The instance itself
		 */
		SparkMD5.prototype.setState = function(state) {
			this._buff = state.buff;
			this._length = state.length;
			this._hash = state.hash;

			return this;
		};

		/**
		 * Releases memory used by the incremental buffer and other additional
		 * resources. If you plan to use the instance again, use reset instead.
		 */
		SparkMD5.prototype.destroy = function() {
			delete this._hash;
			delete this._buff;
			delete this._length;
		};

		/**
		 * Finish the final calculation based on the tail.
		 *
		 * @param {Array}  tail   The tail (will be modified)
		 * @param {Number} length The length of the remaining buffer
		 */
		SparkMD5.prototype._finish = function(tail, length) {
			var i = length,
				tmp,
				lo,
				hi;

			tail[i >> 2] |= 0x80 << (i % 4 << 3);
			if (i > 55) {
				md5cycle(this._hash, tail);
				for (i = 0; i < 16; i += 1) {
					tail[i] = 0;
				}
			}

			// Do the final computation based on the tail and length
			// Beware that the final length may not fit in 32 bits so we take care of that
			tmp = this._length * 8;
			tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
			lo = parseInt(tmp[2], 16);
			hi = parseInt(tmp[1], 16) || 0;

			tail[14] = lo;
			tail[15] = hi;
			md5cycle(this._hash, tail);
		};

		/**
		 * Performs the md5 hash on a string.
		 * A conversion will be applied if utf8 string is detected.
		 *
		 * @param {String}  str The string
		 * @param {Boolean} [raw] True to get the raw string, false to get the hex string
		 *
		 * @return {String} The result
		 */
		SparkMD5.hash = function(str, raw) {
			// Converts the string to utf8 bytes if necessary
			// Then compute it using the binary function
			return SparkMD5.hashBinary(toUtf8(str), raw);
		};

		/**
		 * Performs the md5 hash on a binary string.
		 *
		 * @param {String}  content The binary string
		 * @param {Boolean} [raw]     True to get the raw string, false to get the hex string
		 *
		 * @return {String} The result
		 */
		SparkMD5.hashBinary = function(content, raw) {
			var hash = md51(content),
				ret = hex(hash);

			return raw ? hexToBinaryString(ret) : ret;
		};

		// ---------------------------------------------------

		/**
		 * SparkMD5 OOP implementation for array buffers.
		 *
		 * Use this class to perform an incremental md5 ONLY for array buffers.
		 */
		SparkMD5.ArrayBuffer = function() {
			// call reset to init the instance
			this.reset();
		};

		/**
		 * Appends an array buffer.
		 *
		 * @param {ArrayBuffer} arr The array to be appended
		 *
		 * @return {SparkMD5.ArrayBuffer} The instance itself
		 */
		SparkMD5.ArrayBuffer.prototype.append = function(arr) {
			var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
				length = buff.length,
				i;

			this._length += arr.byteLength;

			for (i = 64; i <= length; i += 64) {
				md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
			}

			this._buff =
				i - 64 < length ?
				new Uint8Array(buff.buffer.slice(i - 64)) :
				new Uint8Array(0);

			return this;
		};

		/**
		 * Finishes the incremental computation, reseting the internal state and
		 * returning the result.
		 *
		 * @param {Boolean} raw True to get the raw string, false to get the hex string
		 *
		 * @return {String} The result
		 */
		SparkMD5.ArrayBuffer.prototype.end = function(raw) {
			var buff = this._buff,
				length = buff.length,
				tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				i,
				ret;

			for (i = 0; i < length; i += 1) {
				tail[i >> 2] |= buff[i] << (i % 4 << 3);
			}

			this._finish(tail, length);
			ret = hex(this._hash);

			if (raw) {
				ret = hexToBinaryString(ret);
			}

			this.reset();

			return ret;
		};

		/**
		 * Resets the internal state of the computation.
		 *
		 * @return {SparkMD5.ArrayBuffer} The instance itself
		 */
		SparkMD5.ArrayBuffer.prototype.reset = function() {
			this._buff = new Uint8Array(0);
			this._length = 0;
			this._hash = [1732584193, -271733879, -1732584194, 271733878];

			return this;
		};

		/**
		 * Gets the internal state of the computation.
		 *
		 * @return {Object} The state
		 */
		SparkMD5.ArrayBuffer.prototype.getState = function() {
			var state = SparkMD5.prototype.getState.call(this);

			// Convert buffer to a string
			state.buff = arrayBuffer2Utf8Str(state.buff);

			return state;
		};

		/**
		 * Gets the internal state of the computation.
		 *
		 * @param {Object} state The state
		 *
		 * @return {SparkMD5.ArrayBuffer} The instance itself
		 */
		SparkMD5.ArrayBuffer.prototype.setState = function(state) {
			// Convert string to buffer
			state.buff = utf8Str2ArrayBuffer(state.buff, true);

			return SparkMD5.prototype.setState.call(this, state);
		};

		SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

		SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

		/**
		 * Performs the md5 hash on an array buffer.
		 *
		 * @param {ArrayBuffer} arr The array buffer
		 * @param {Boolean}     [raw] True to get the raw string, false to get the hex one
		 *
		 * @return {String} The result
		 */
		SparkMD5.ArrayBuffer.hash = function(arr, raw) {
			var hash = md51_array(new Uint8Array(arr)),
				ret = hex(hash);

			return raw ? hexToBinaryString(ret) : ret;
		};

		return SparkMD5;
	});
});

export function promisify(func) {
	if (!isFunction(func)) return func;
	return (args = {}) =>
		new Promise((resolve, reject) => {
			func(
				Object.assign(args, {
					success: resolve,
					fail: reject,
				})
			);
		});
}



export const isFunction = (x) => typeof x === "function";