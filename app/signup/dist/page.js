"use strict";
exports.__esModule = true;
var header3_1 = require("@/components/header3");
var footer1_1 = require("@/components/footer1");
var signup_form_1 = require("@/components/signup-form");
var card_1 = require("@/components/ui/card");
var link_1 = require("next/link");
function SignupPage() {
    return (React.createElement("div", { className: "min-h-screen flex flex-col" },
        React.createElement(header3_1.Header, null),
        React.createElement("main", { className: "flex-1 flex items-center justify-center py-16" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "max-w-md mx-auto" },
                    React.createElement(card_1.Card, { className: "shadow-lg" },
                        React.createElement(card_1.CardHeader, { className: "text-center" },
                            React.createElement(card_1.CardTitle, { className: "text-2xl font-bold" }, "Get Started Today"),
                            React.createElement(card_1.CardDescription, null, "Create your account to begin your investment journey")),
                        React.createElement(card_1.CardContent, null,
                            React.createElement(signup_form_1.SignupForm, null),
                            React.createElement("div", { className: "mt-6 text-center" },
                                React.createElement("p", { className: "text-sm text-muted-foreground" },
                                    "Already have an account?",
                                    " ",
                                    React.createElement(link_1["default"], { href: "/login", className: "text-primary hover:underline font-medium" }, "Sign in here"))))),
                    React.createElement("div", { className: "mt-8 text-center" })))),
        React.createElement(footer1_1.Footer, null)));
}
exports["default"] = SignupPage;
