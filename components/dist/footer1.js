"use strict";
exports.__esModule = true;
exports.Footer = void 0;
function Footer() {
    return (React.createElement("footer", { className: "border-t bg-card/50 mt-auto" },
        React.createElement("div", { className: "container mx-auto px-4 py-8" },
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" },
                React.createElement("div", null,
                    React.createElement("div", { className: "flex items-center space-x-2 mb-4" },
                        React.createElement("div", { className: "w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center" },
                            React.createElement("span", { className: "text-white font-bold text-sm" }, "F")),
                        React.createElement("span", { className: "font-bold text-foreground" }, "FinSmart")),
                    React.createElement("p", { className: "text-sm text-muted-foreground" }, "Smart investment recommendations tailored to your financial goals.")),
                React.createElement("div", null,
                    React.createElement("h3", { className: "font-semibold text-foreground mb-4" }, "Legal"),
                    React.createElement("ul", { className: "space-y-2 text-sm text-muted-foreground" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#", className: "hover:text-foreground transition-colors" }, "Privacy Policy")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#", className: "hover:text-foreground transition-colors" }, "Terms of Service"))))),
            React.createElement("div", { className: "border-t mt-8 pt-8 text-center" },
                React.createElement("p", { className: "text-xs text-muted-foreground mt-2" }, "\u00A9 2025 FinaSmart. All rights reserved.")))));
}
exports.Footer = Footer;
