/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




class Scroll extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      hasScroll: true,
      scrollHeight: 0,
      heightRatio: 0,
      scrollPosition: 0,
      isDragging: false
    }, this.toggleScroll = () => {
      const elScroll = this.elScroll;
      const elInner = this.elInner;
      const elRoot = this.elRoot;
      const ratio = elRoot.offsetHeight / elInner.offsetHeight;

      this.setState({
        hasScroll: ratio < 1,
        scrollHeight: ratio * elScroll.offsetHeight,
        heightRatio: elScroll.offsetHeight / elInner.offsetHeight
      });
    }, this.scrollToPosition = position => {
      const { heightRatio } = this.state;
      const limitedPosition = this.limitTrackPosition(position);

      this.elContainer.scrollTop = position / heightRatio;
      this.setState({
        scrollPosition: limitedPosition
      });
    }, this.handleScroll = () => {
      const { heightRatio } = this.state;

      this.setState({
        scrollPosition: heightRatio * this.elContainer.scrollTop
      });
    }, this.handleScrollClick = event => {
      const { isDragging } = this.state;
      const elBar = this.elBar;
      const top = this.elScroll.getBoundingClientRect().top;

      if (!isDragging && event.target !== elBar) {
        this.scrollToPosition(event.pageY - top);
      }
    }, this.handleDragStart = event => {
      const { scrollPosition } = this.state;

      this.startDragMousePosition = event.pageY;
      this.startDragPosition = scrollPosition;
      this.setState({ isDragging: true });

      document.addEventListener('mousemove', this.handleDrag);
      document.addEventListener('mouseup', this.handleDragEnd);
    }, this.handleDrag = event => {
      const { isDragging } = this.state;

      if (isDragging) {
        this.scrollToPosition(this.startDragPosition + event.pageY - this.startDragMousePosition);
      }
    }, this.handleDragEnd = () => {
      this.setState({
        isDragging: false
      });
    }, _temp;
  }

  limitTrackPosition(position) {
    const elScroll = this.elScroll;
    const elBar = this.elBar;

    return Math.max(0, Math.min(position, elScroll.offsetHeight - elBar.offsetHeight));
  }

  componentDidMount() {
    this.toggleScroll();
    window.addEventListener('resize', this.toggleScroll);
  }

  render() {
    const {
      className, containerClassName, innerClassName, scrollClassName, barClassName, barActiveClassName,
      children,
      disableUIStyles, disableStyles
    } = this.props;
    const { hasScroll, scrollHeight, scrollPosition, isDragging } = this.state;
    const rootStyles = !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].root;
    const containerStyles = Object.assign({}, !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].container, !disableUIStyles && !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].containerUI);
    const innerStyles = !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].inner;
    const scrollStyles = Object.assign({}, !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].scroll, !disableUIStyles && !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].scrollUI);
    const barStyles = Object.assign({}, !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].bar, !disableUIStyles && !disableStyles && __WEBPACK_IMPORTED_MODULE_1__styles__["a" /* default */].barUI);
    const barClassNames = [barClassName];

    if (isDragging && barActiveClassName) {
      barClassNames.push(barActiveClassName);
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        style: rootStyles,
        className: className,
        ref: c => this.elRoot = c
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          style: containerStyles,
          className: containerClassName,
          ref: c => this.elContainer = c,
          onScroll: this.handleScroll
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            style: innerStyles,
            className: innerClassName,
            ref: c => this.elInner = c
          },
          children
        )
      ),
      hasScroll && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          ref: c => this.elScroll = c,
          style: scrollStyles,
          className: scrollClassName,
          onClick: this.handleScrollClick
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
          style: _extends({}, barStyles, {
            height: scrollHeight,
            top: scrollPosition
          }),
          ref: c => this.elBar = c,
          className: barClassNames.join(' '),
          onMouseDown: this.handleDragStart
        })
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Scroll);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  root: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden'
  },
  container: {
    paddingRight: 100,
    marginRight: -100,
    overflow: 'auto',
    maxHeight: '100%',
    position: 'relative'
  },
  containerUI: {
    paddingRight: 110
  },
  inner: {
    position: 'relative'
  },
  scroll: {
    position: 'absolute'
  },
  scrollUI: {
    right: 5,
    width: 5,
    top: 10,
    bottom: 10,
    background: 'rgba(0, 0, 0, .1)',
    borderRadius: 3,
    cursor: 'pointer'
  },
  bar: {
    position: 'relative'
  },
  barUI: {
    background: '#333',
    opacity: 0.3,
    minHeight: 25,
    height: 0,
    borderRadius: 3,
    userSelect: 'none'
  }
});

/***/ })
/******/ ]);