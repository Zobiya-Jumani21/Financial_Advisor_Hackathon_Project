"use strict";
exports.__esModule = true;
exports.Header = void 0;
var link_1 = require("next/link");
function Header() {
    return (React.createElement("header", { className: "border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
        React.createElement("div", { className: "container mx-auto px-4 py-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement(link_1["default"], { href: "", className: "flex items-center space-x-2" },
                    React.createElement("div", { className: "w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center" },
                        React.createElement("span", { className: "text-white font-bold text-lg" }, "F")),
                    React.createElement("span", { className: "text-xl font-bold text-foreground" }, "FinSmart")),
                React.createElement("nav", { className: "hidden md:flex items-center space-x-6" },
                    React.createElement("p", { className: "text-center font-bold text-lg" },
                        React.createElement("strong", null, "Sign Up Now And Save Your's Money")),
                    React.createElement(link_1["default"], { href: "/login", className: "text-muted-foreground hover:text-foreground transition-colors" })),
                React.createElement("div", { className: "flex items-center space-x-2" })))));
}
exports.Header = Header;
