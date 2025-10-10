"use strict";
exports.__esModule = true;
exports.Footer = void 0;
function Footer() {
    return (React.createElement("footer", { className: "border-t bg-card/50 mt-auto" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-6 py-12" },
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" },
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("div", { className: "flex items-center space-x-3 mb-4" },
                        React.createElement("div", { className: "w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center" },
                            React.createElement("span", { className: "text-white font-bold text-sm" }, "F")),
                        React.createElement("span", { className: "font-bold text-foreground text-lg" }, "FinSmart")),
                    React.createElement("p", { className: "text-sm text-muted-foreground" }, "Smart investment recommendations tailored to your financial goals.")),
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("h3", { className: "font-semibold text-foreground mb-4" }, "Quick Links"),
                    React.createElement("ul", { className: "space-y-2 text-sm text-muted-foreground" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "/", className: "hover:text-foreground transition-colors" }, "Home")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/results", className: "hover:text-foreground transition-colors" }, "Portfolio")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "/login", className: "hover:text-foreground transition-colors" }, "Login")))),
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("h3", { className: "font-semibold text-foreground mb-4" }, "Legal"),
                    React.createElement("ul", { className: "space-y-2 text-sm text-muted-foreground" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#", className: "hover:text-foreground transition-colors" }, "Privacy Policy")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#", className: "hover:text-foreground transition-colors" }, "Terms of Service"))))),
            React.createElement("div", { className: "border-t mt-10 pt-6 text-center" },
                React.createElement("p", { className: "text-sm text-muted-foreground" },
                    React.createElement("strong", { className: "text-destructive" }, "Disclaimer:"),
                    " Not real financial advice. For demo purposes only."),
                React.createElement("p", { className: "text-xs text-muted-foreground mt-2" }, "\u00A9 2025 FinSmart. All rights reserved.")))));
}
exports.Footer = Footer;
