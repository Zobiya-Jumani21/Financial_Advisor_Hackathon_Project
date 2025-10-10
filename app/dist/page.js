"use strict";
exports.__esModule = true;
// home page 
var header2_1 = require("@/components/header2");
var footer1_1 = require("@/components/footer1");
var budget_form_1 = require("@/components/budget-form"); //dekhna hai
var card_1 = require("@/components/ui/card");
function HomePage() {
    return (React.createElement("div", { className: "min-h-screen flex flex-col" },
        React.createElement(header2_1.Header, null),
        React.createElement("main", { className: "flex-1" },
            React.createElement("section", { className: "bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16" },
                React.createElement("div", { className: "container mx-auto px-4 text-center" },
                    React.createElement("h1", { className: "text-4xl md:text-6xl font-bold text-balance mb-6" },
                        "Smart Investment",
                        React.createElement("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" },
                            " ",
                            "Recommendations")),
                    React.createElement("p", { className: "text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto" }, "Get personalized investment advice based on your budget, risk tolerance, and financial timeline."))),
            React.createElement("section", { className: "py-16" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "max-w-2xl mx-auto" },
                        React.createElement("div", { className: "text-center mb-8" },
                            React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Let's Build Your Portfolio"),
                            React.createElement("p", { className: "text-muted-foreground text-balance" }, "Answer a few questions to get started with your personalized investment recommendations.")),
                        React.createElement(card_1.Card, { className: "shadow-lg hover:shadow-xl transition-shadow duration-300" },
                            React.createElement(card_1.CardContent, { className: "p-8" },
                                React.createElement(budget_form_1.BudgetForm, null)))))),
            React.createElement("section", { className: "py-16 bg-muted/30" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "text-center mb-12" },
                        React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Why Choose FinSmart?")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" },
                        React.createElement(card_1.Card, { className: "text-center hover:shadow-lg transition-shadow duration-300" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement("div", { className: "w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4" },
                                    React.createElement("span", { className: "text-2xl" }, "\uD83D\uDCCA")),
                                React.createElement("h3", { className: "text-xl font-semibold mb-2" }, "Personalized Analysis"),
                                React.createElement("p", { className: "text-muted-foreground" }, "Tailored recommendations based on your unique financial situation and goals."))),
                        React.createElement(card_1.Card, { className: "text-center hover:shadow-lg transition-shadow duration-300" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement("div", { className: "w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4" },
                                    React.createElement("span", { className: "text-2xl" }, "\uD83C\uDFAF")),
                                React.createElement("h3", { className: "text-xl font-semibold mb-2" }, "Risk-Adjusted"),
                                React.createElement("p", { className: "text-muted-foreground" }, "Investment strategies that match your comfort level with market volatility."))),
                        React.createElement(card_1.Card, { className: "text-center hover:shadow-lg transition-shadow duration-300" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement("div", { className: "w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4" },
                                    React.createElement("span", { className: "text-2xl" }, "\u23F0")),
                                React.createElement("h3", { className: "text-xl font-semibold mb-2" }, "Time-Optimized"),
                                React.createElement("p", { className: "text-muted-foreground" }, "Strategies aligned with your investment timeline and financial milestones."))))))),
        React.createElement(footer1_1.Footer, null)));
}
exports["default"] = HomePage;
