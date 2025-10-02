"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var sans_1 = require("geist/font/sans");
var mono_1 = require("geist/font/mono");
var next_1 = require("@vercel/analytics/next");
var react_1 = require("react");
require("./globals.css");
exports.metadata = {
    title: "Financial Advisor - Smart Investment Advisor",
    description: "Get personalized investment recommendations based on your budget, risk tolerance, and time horizon",
    generator: "v0.app"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: "font-sans " + sans_1.GeistSans.variable + " " + mono_1.GeistMono.variable },
            React.createElement(react_1.Suspense, { fallback: null }, children),
            React.createElement(next_1.Analytics, null))));
}
exports["default"] = RootLayout;
