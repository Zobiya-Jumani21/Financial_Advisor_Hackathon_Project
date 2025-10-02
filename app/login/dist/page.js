"use strict";
exports.__esModule = true;
//At the top, the code is bringing in things it needs to show on the page:
var header1_1 = require("@/components/header1");
var footer1_1 = require("@/components/footer1");
var login_form_1 = require("@/components/login-form");
var card_1 = require("@/components/ui/card");
// lets you click and go to another page
var link_1 = require("next/link");
//export default → this means other files can use this page.
function LoginPage() {
    return ( //what the page is showing
    React.createElement("div", { className: "min-h-screen flex flex-col" },
        React.createElement(header1_1.Header, null),
        React.createElement("main", { className: "flex-1 flex items-center justify-center py-16" },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "max-w-md mx-auto" },
                    React.createElement(card_1.Card, { className: "shadow-lg" },
                        React.createElement(card_1.CardHeader, { className: "text-center" },
                            React.createElement(card_1.CardTitle, { className: "text-2xl font-bold" }, "Welcome Back"),
                            React.createElement(card_1.CardDescription, null, "Sign in to access your investment portfolio")),
                        React.createElement(card_1.CardContent, null,
                            React.createElement(login_form_1.LoginForm, null),
                            React.createElement("div", { className: "mt-6 text-center" },
                                React.createElement("p", { className: "text-sm text-muted-foreground" },
                                    "Don't have an account?",
                                    " ",
                                    React.createElement(link_1["default"], { href: "/signup", className: "text-primary hover:underline font-medium" }, "Sign up here"))))),
                    React.createElement("div", { className: "mt-8 text-center" },
                        React.createElement("p", { className: "text-sm text-muted-foreground" }))))),
        React.createElement(footer1_1.Footer, null)));
}
exports["default"] = LoginPage;
