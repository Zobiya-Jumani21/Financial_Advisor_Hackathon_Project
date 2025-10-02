"use strict";
exports.__esModule = true;
exports.InvestmentCard = void 0;
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var progress_1 = require("@/components/ui/progress");
// colours specifyed for light and dark mode
function InvestmentCard(_a) {
    var recommendation = _a.recommendation;
    var getRiskColor = function (risk) {
        switch (risk) {
            case "Low":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "Medium":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "High":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };
    return (React.createElement(card_1.Card, { className: "hover:shadow-lg transition-shadow duration-300" },
        React.createElement(card_1.CardHeader, null,
            React.createElement("div", { className: "flex items-start justify-between" },
                React.createElement("div", { className: "flex items-center space-x-3" },
                    React.createElement("span", { className: "text-3xl" }, recommendation.icon),
                    React.createElement("div", null,
                        React.createElement(card_1.CardTitle, { className: "text-lg" }, recommendation.name),
                        React.createElement(card_1.CardDescription, { className: "mt-1" }, recommendation.description))),
                React.createElement(badge_1.Badge, { className: getRiskColor(recommendation.riskLevel) },
                    recommendation.riskLevel,
                    " Risk"))),
        React.createElement(card_1.CardContent, { className: "space-y-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("span", { className: "text-sm font-medium" }, "Allocation"),
                React.createElement("span", { className: "text-lg font-bold" },
                    recommendation.percentage,
                    "%")),
            React.createElement(progress_1.Progress, { value: recommendation.percentage, className: "h-2" }),
            React.createElement("div", { className: "grid grid-cols-2 gap-4 pt-2" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-sm text-muted-foreground" }, "Investment Amount"),
                    React.createElement("p", { className: "text-lg font-semibold" },
                        "PKR ",
                        recommendation.amount.toLocaleString())),
                React.createElement("div", null,
                    React.createElement("p", { className: "text-sm text-muted-foreground" }, "Expected Return"),
                    React.createElement("p", { className: "text-lg font-semibold text-primary" }, recommendation.expectedReturn))),
            React.createElement("div", { className: "pt-2 border-t" },
                React.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, "Why this allocation?"),
                React.createElement("p", { className: "text-sm" }, recommendation.reasoning)))));
}
exports.InvestmentCard = InvestmentCard;
