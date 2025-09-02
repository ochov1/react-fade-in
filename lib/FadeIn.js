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
exports.default = FadeIn;
var react_1 = __importStar(require("react"));
function FadeIn(props) {
    var _a = (0, react_1.useState)(0), maxIsVisible = _a[0], setMaxIsVisible = _a[1];
    var transitionDuration = typeof props.transitionDuration === "number" ? props.transitionDuration : 400;
    var delay = typeof props.delay === "number" ? props.delay : 50;
    var WrapperTag = props.wrapperTag || "div";
    var ChildTag = props.childTag || "div";
    var visible = typeof props.visible === "undefined" ? true : props.visible;
    (0, react_1.useEffect)(function () {
        var count = react_1.default.Children.count(props.children);
        if (!visible) {
            // Animate all children out
            count = 0;
        }
        if (count == maxIsVisible) {
            // We're done updating maxVisible, notify when animation is done
            var timeout_1 = setTimeout(function () {
                if (props.onComplete)
                    props.onComplete();
            }, transitionDuration);
            return function () { return clearTimeout(timeout_1); };
        }
        // Move maxIsVisible toward count
        var increment = count > maxIsVisible ? 1 : -1;
        var timeout = setTimeout(function () {
            setMaxIsVisible(maxIsVisible + increment);
        }, delay);
        return function () { return clearTimeout(timeout); };
    }, [
        react_1.default.Children.count(props.children),
        delay,
        maxIsVisible,
        visible,
        transitionDuration,
    ]);
    return (react_1.default.createElement(WrapperTag, { className: props.className }, react_1.default.Children.map(props.children, function (child, i) {
        return (react_1.default.createElement(ChildTag, { className: props.childClassName, style: {
                transition: "opacity ".concat(transitionDuration, "ms, transform ").concat(transitionDuration, "ms"),
                transform: maxIsVisible > i ? "none" : "translateY(20px)",
                opacity: maxIsVisible > i ? 1 : 0,
            } }, child));
    })));
}
