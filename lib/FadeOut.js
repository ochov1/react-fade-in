"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FadeOut = FadeOut;
var react_1 = __importStar(require("react"));
function FadeOut(props) {
    var childrenCount = react_1.default.Children.count(props.children);
    var _a = (0, react_1.useState)(function () { return childrenCount; }), maxIsVisible = _a[0], setMaxIsVisible = _a[1];
    var transitionDuration = typeof props.transitionDuration === "number" ? props.transitionDuration : 400;
    var delay = typeof props.delay === "number" ? props.delay : 50;
    var WrapperTag = props.wrapperTag || "div";
    var ChildTag = props.childTag || "div";
    var visible = typeof props.visible === "undefined" ? true : props.visible;
    (0, react_1.useEffect)(function () {
        // If visible, ensure all children are shown immediately (no stagger-in; this is FadeOut).
        if (visible) {
            if (maxIsVisible !== childrenCount) {
                setMaxIsVisible(childrenCount);
            }
            return;
        }
        // If already fully hidden, wait for the transition to end then fire onComplete.
        if (maxIsVisible === 0) {
            var t_1 = setTimeout(function () {
                var _a;
                (_a = props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props);
            }, transitionDuration);
            return function () { return clearTimeout(t_1); };
        }
        // Otherwise, stagger-hide one child at a time.
        var t = setTimeout(function () {
            setMaxIsVisible(function (v) { return Math.max(0, v - 1); });
        }, delay);
        return function () { return clearTimeout(t); };
    }, [
        visible,
        childrenCount,
        delay,
        maxIsVisible,
        transitionDuration,
        props.onComplete,
    ]);
    return (react_1.default.createElement(WrapperTag, { className: props.className }, react_1.default.Children.map(props.children, function (child, i) {
        var _a;
        return (react_1.default.createElement(ChildTag, { key: (_a = child === null || child === void 0 ? void 0 : child.key) !== null && _a !== void 0 ? _a : i, className: props.childClassName, style: {
                transition: "opacity ".concat(transitionDuration, "ms, transform ").concat(transitionDuration, "ms"),
                transform: i < maxIsVisible ? "translateY(0)" : "translateY(20px)",
                opacity: i < maxIsVisible ? 1 : 0,
            } }, child));
    })));
}
