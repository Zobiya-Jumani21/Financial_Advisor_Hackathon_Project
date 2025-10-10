"use strict";
exports.__esModule = true;
exports.Header = void 0;
var link_1 = require("next/link");
var button_1 = require("@/components/ui/button");
function Header() {
    return (React.createElement("header", { className: "border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
        React.createElement("div", { className: "container mx-auto px-4 py-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2" },
                    React.createElement("div", { className: "w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center" },
                        React.createElement("span", { className: "text-white font-bold text-lg" }, "F")),
                    React.createElement("span", { className: "text-xl font-bold text-foreground" }, "FinSmart")),
                React.createElement("nav", { className: "hidden md:flex items-center space-x-6" },
                    React.createElement(link_1["default"], { href: "/", className: "text-muted-foreground hover:text-foreground transition-colors" }, "Home"),
                    React.createElement(link_1["default"], { href: "/results", className: "text-muted-foreground hover:text-foreground transition-colors" }, "Portfolio"),
                    React.createElement(link_1["default"], { href: "/login", className: "text-muted-foreground hover:text-foreground transition-colors" }, "Login")),
                React.createElement("div", { className: "flex items-center space-x-2" },
                    React.createElement(button_1.Button, { variant: "outline", asChild: true, className: "hidden sm:inline-flex bg-transparent" },
                        React.createElement(link_1["default"], { href: "/login" }, "Sign In")),
                    React.createElement(button_1.Button, { asChild: true },
                        React.createElement(link_1["default"], { href: "/signup" }, "Get Started")))))));
}
exports.Header = Header;
