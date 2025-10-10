"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var header2_1 = require("@/components/header2");
var footer1_1 = require("@/components/footer1");
var portfolio_chart_1 = require("@/components/portfolio-chart");
var investment_card_1 = require("@/components/investment-card");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var firebase_1 = require("@/lib/firebase");
var firestore_1 = require("firebase/firestore");
var investment_engine_1 = require("@/lib/investment-engine");
function ResultsPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), portfolio = _a[0], setPortfolio = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    react_1.useEffect(function () {
        var fetchPortfolio = function () { return __awaiter(_this, void 0, void 0, function () {
            var user, ref, q, snapshot, latestData, recommendations, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        user = firebase_1.auth.currentUser;
                        if (!user) {
                            router.push("/"); // If not logged in, go home
                            return [2 /*return*/];
                        }
                        ref = firestore_1.collection(firebase_1.db, "users", user.uid, "portfolios");
                        q = firestore_1.query(ref, firestore_1.orderBy("createdAt", "desc"), firestore_1.limit(1));
                        return [4 /*yield*/, firestore_1.getDocs(q)];
                    case 1:
                        snapshot = _a.sent();
                        if (snapshot.empty) {
                            router.push("/"); // No saved portfolio → back to form
                            return [2 /*return*/];
                        }
                        latestData = snapshot.docs[0].data();
                        recommendations = investment_engine_1.generateInvestmentRecommendations(latestData);
                        setPortfolio(recommendations);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error fetching portfolio:", err_1);
                        router.push("/");
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchPortfolio();
    }, [router]);
    var handleRecalculate = function () { return router.push("/"); };
    if (isLoading) {
        return (React.createElement("div", { className: "min-h-screen flex flex-col" },
            React.createElement(header2_1.Header, null),
            React.createElement("main", { className: "flex-1 flex items-center justify-center" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", { className: "w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" }),
                    React.createElement("p", { className: "text-muted-foreground" }, "Loading your portfolio recommendations..."))),
            React.createElement(footer1_1.Footer, null)));
    }
    if (!portfolio) {
        return (React.createElement("div", { className: "min-h-screen flex flex-col" },
            React.createElement(header2_1.Header, null),
            React.createElement("main", { className: "flex-1 flex items-center justify-center" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("h2", { className: "text-2xl font-bold mb-4" }, "No Portfolio Data Found"),
                    React.createElement("p", { className: "text-muted-foreground mb-6" }, "Please complete the form to get your recommendations."),
                    React.createElement(button_1.Button, { onClick: function () { return router.push("/"); } }, "Get Started"))),
            React.createElement(footer1_1.Footer, null)));
    }
    return (React.createElement("div", { className: "min-h-screen flex flex-col" },
        React.createElement(header2_1.Header, null),
        React.createElement("main", { className: "flex-1" },
            React.createElement("section", { className: "bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "text-center mb-8" },
                        React.createElement("h1", { className: "text-4xl md:text-5xl font-bold text-balance mb-4" },
                            "Your Personalized",
                            React.createElement("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" },
                                " ",
                                "Investment Portfolio")),
                        React.createElement("p", { className: "text-xl text-muted-foreground text-balance max-w-2xl mx-auto" }, portfolio.summary)),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" },
                        React.createElement(card_1.Card, { className: "text-center" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement("div", { className: "text-3xl font-bold text-primary mb-2" },
                                    "PKR",
                                    portfolio.totalAmount.toLocaleString()),
                                React.createElement("p", { className: "text-muted-foreground" }, "Total Investment"))),
                        React.createElement(card_1.Card, { className: "text-center" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement("div", { className: "text-3xl font-bold text-secondary mb-2" }, portfolio.expectedAnnualReturn),
                                React.createElement("p", { className: "text-muted-foreground" }, "Expected Annual Return"))),
                        React.createElement(card_1.Card, { className: "text-center" },
                            React.createElement(card_1.CardContent, { className: "p-6" },
                                React.createElement(badge_1.Badge, { variant: "secondary", className: "text-base px-3 py-1" }, portfolio.riskProfile),
                                React.createElement("p", { className: "text-muted-foreground mt-2" }, "Risk Profile")))))),
            React.createElement("section", { className: "py-16" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "max-w-6xl mx-auto" },
                        React.createElement("div", { className: "text-center mb-12" },
                            React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Portfolio Allocation"),
                            React.createElement("p", { className: "text-muted-foreground text-balance" }, "Here's how your investment will be distributed across different asset classes.")),
                        React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" },
                            React.createElement(portfolio_chart_1.PortfolioChart, { recommendations: portfolio.recommendations }),
                            React.createElement("div", { className: "space-y-4" }, portfolio.recommendations.map(function (rec) { return (React.createElement("div", { key: rec.id, className: "flex items-center justify-between p-4 rounded-lg border" },
                                React.createElement("div", { className: "flex items-center space-x-3" },
                                    React.createElement("span", { className: "text-2xl" }, rec.icon),
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "font-semibold" }, rec.name),
                                        React.createElement("div", { className: "text-sm text-muted-foreground" },
                                            "Expected: ",
                                            rec.expectedReturn))),
                                React.createElement("div", { className: "text-right" },
                                    React.createElement("div", { className: "font-bold text-lg" },
                                        rec.percentage,
                                        "%"),
                                    React.createElement("div", { className: "text-sm text-muted-foreground" },
                                        "PKR ",
                                        rec.amount.toLocaleString())))); })))))),
            React.createElement("section", { className: "py-16 bg-muted/30" },
                React.createElement("div", { className: "container mx-auto px-4" },
                    React.createElement("div", { className: "max-w-6xl mx-auto" },
                        React.createElement("div", { className: "text-center mb-12" },
                            React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Investment Breakdown"),
                            React.createElement("p", { className: "text-muted-foreground text-balance" }, "Detailed analysis of each recommended investment category.")),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" }, portfolio.recommendations.map(function (rec) { return (React.createElement(investment_card_1.InvestmentCard, { key: rec.id, recommendation: rec })); }))))),
            React.createElement("section", { className: "py-16" },
                React.createElement("div", { className: "container mx-auto px-4 text-center" },
                    React.createElement("div", { className: "max-w-2xl mx-auto" },
                        React.createElement("h2", { className: "text-3xl font-bold text-balance mb-4" }, "Ready to Adjust Your Portfolio?"),
                        React.createElement("p", { className: "text-muted-foreground text-balance mb-8" }, "Want to try different parameters or update your investment amount? You can recalculate your portfolio anytime."),
                        React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center" },
                            React.createElement(button_1.Button, { size: "lg", onClick: handleRecalculate, className: "text-base" }, "Recalculate Portfolio"),
                            React.createElement(button_1.Button, { size: "lg", variant: "outline", className: "text-base bg-transparent", disabled: true }, "Download Report (Coming Soon)")))))),
        React.createElement(footer1_1.Footer, null)));
}
exports["default"] = ResultsPage;
