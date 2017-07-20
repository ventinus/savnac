(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault$1 (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var savnacUtils = require('savnac-utils');
var savnacBreakpoint = _interopDefault$1(require('savnac-breakpoint'));



exports.breakpoint = savnacBreakpoint;
Object.keys(savnacUtils).forEach(function (key) { exports[key] = savnacUtils[key]; });

})));
