"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.generateInvestmentRecommendations = void 0;
function generateInvestmentRecommendations(formData) {
    var _a = formData, budget = _a.budget, riskTolerance = _a.riskTolerance, timeHorizon = _a.timeHorizon;
    // Extended categories
    var categories = [
        "stocks",
        "bonds",
        "realEstate",
        "savings",
        "gold",
        "crypto",
        "internationalStocks",
    ];
    // This is the default recipe.
    // Base allocations consertive men bonds men ziyada amount jae aur aggressive me crypto men ziyada jae
    var baseAllocations = {
        conservative: { stocks: 15, bonds: 35, realEstate: 10, savings: 25, gold: 5, crypto: 0, internationalStocks: 3 },
        moderate: { stocks: 30, bonds: 25, realEstate: 15, savings: 15, gold: 5, crypto: 2, internationalStocks: 3 },
        aggressive: { stocks: 40, bonds: 15, realEstate: 15, savings: 5, gold: 5, crypto: 5, internationalStocks: 5 }
    };
    var allocations = __assign({}, baseAllocations[riskTolerance]);
    // Adjust allocations based on time horizon
    if (timeHorizon === "short") {
        allocations.savings = Math.max(0, allocations.savings + 10);
        allocations.bonds = Math.max(0, allocations.bonds + 5);
        allocations.stocks = Math.max(0, allocations.stocks - 10);
        allocations.crypto = Math.max(0, allocations.crypto - 2);
        allocations.realEstate = Math.max(0, allocations.realEstate - 3);
    }
    else if (timeHorizon === "long") {
        allocations.stocks = Math.max(0, allocations.stocks + 5);
        allocations.realEstate = Math.max(0, allocations.realEstate + 3);
        allocations.savings = Math.max(0, allocations.savings - 5);
        allocations.bonds = Math.max(0, allocations.bonds - 3);
    }
    // Normalize to 100%
    //   First, we add up all percentages (total).
    // Then for each category (stocks, bonds, etc.), we divide by total and multiply by 100.
    // This makes sure everything adds up to 100% again.
    var total = Object.values(allocations).reduce(function (sum, val) { return sum + val; }, 0);
    Object.keys(allocations).forEach(function (key) {
        allocations[key] = Math.round((allocations[key] / total) * 100);
    });
    // For each category, create a recommendation
    var recommendations = categories.map(function (category) { return ({
        id: category,
        name: categoryNameMap(category),
        description: categoryDescriptionMap(category),
        percentage: allocations[category],
        amount: Math.round((budget * allocations[category]) / 100),
        icon: categoryIconMap(category),
        riskLevel: getCategoryRisk(category),
        expectedReturn: getRiskBasedReturn(riskTolerance, category, timeHorizon),
        reasoning: getCategoryReasoning(category, riskTolerance, timeHorizon)
    }); })
        .filter(function (rec) { return rec.percentage > 0; })
        .sort(function (a, b) { return b.percentage - a.percentage; });
    return {
        totalAmount: budget,
        expectedAnnualReturn: getExpectedPortfolioReturn(riskTolerance, timeHorizon),
        riskProfile: getRiskProfileDescription(riskTolerance),
        recommendations: recommendations,
        summary: getPortfolioSummary(riskTolerance, timeHorizon, budget)
    };
}
exports.generateInvestmentRecommendations = generateInvestmentRecommendations;
// ----- Helper mappings -----
// These are just dictionaries:
// "stocks" → "Stock Market ETFs"
// "stocks" → "📈"
//hey make names/descriptions pretty for the user.
function categoryNameMap(category) {
    var map = {
        stocks: "Stock Market ETFs",
        bonds: "Bonds & Fixed Income",
        realEstate: "Real Estate Investments",
        savings: "High-Yield Savings",
        gold: "Precious Metals",
        crypto: "Cryptocurrency",
        internationalStocks: "International Stocks"
    };
    return map[category] || category;
}
function categoryDescriptionMap(category) {
    var map = {
        stocks: "Diversified index funds tracking major market indices",
        bonds: "Stable income generating government and corporate bonds",
        realEstate: "REITs and property investments",
        savings: "FDIC-insured savings accounts",
        gold: "Gold and silver ETFs for diversification",
        crypto: "Digital currencies with high growth potential",
        internationalStocks: "Exposure to foreign equities"
    };
    return map[category] || category;
}
function categoryIconMap(category) {
    var map = {
        stocks: "📈", bonds: "🏛️", realEstate: "🏠", savings: "🏦",
        gold: "🥇", crypto: "₿", internationalStocks: "🌎"
    };
    return map[category] || "💹";
}
function getCategoryRisk(category) {
    var highRisk = ["stocks", "crypto", "internationalStocks"];
    var mediumRisk = ["realEstate", "gold"];
    return highRisk.includes(category) ? "High" : mediumRisk.includes(category) ? "Medium" : "Low";
}
// ----- Returns and Reasoning -----
function getRiskBasedReturn(riskTolerance, category, timeHorizon) {
    var returns = {
        conservative: { stocks: "5-7%", bonds: "3-4%", realEstate: "4-6%", savings: "3-4%", gold: "2-4%", crypto: "8-12%", internationalStocks: "4-6%" },
        moderate: { stocks: "7-9%", bonds: "3-4%", realEstate: "6-8%", savings: "3-4%", gold: "3-5%", crypto: "12-20%", internationalStocks: "6-8%" },
        aggressive: { stocks: "9-12%", bonds: "3-4%", realEstate: "8-10%", savings: "3-4%", gold: "4-6%", crypto: "20-35%", internationalStocks: "10-15%" }
    };
    var base = returns[riskTolerance][category] || "N/A";
    if (timeHorizon === "short" && category !== "savings" && category !== "bonds") {
        base += " (higher volatility short-term)";
    }
    return base;
}
function getCategoryReasoning(category, riskTolerance, timeHorizon) {
    switch (category) {
        case "stocks":
            return riskTolerance === "aggressive" && timeHorizon === "long"
                ? "High stock allocation for maximum long-term growth potential."
                : "Balanced stock exposure provides growth while managing risk.";
        case "bonds":
            return timeHorizon === "short"
                ? "Higher bond allocation ensures stability and liquidity for short-term needs."
                : "Bonds provide steady income and portfolio stability.";
        case "realEstate":
            return "Real estate offers diversification and an inflation hedge through REITs.";
        case "savings":
            return timeHorizon === "short"
                ? "High-yield savings ensures liquidity for immediate needs."
                : "Savings provide security and emergency fund coverage.";
        case "gold":
            return "Gold acts as a safe-haven asset and hedge against inflation.";
        case "crypto":
            return riskTolerance === "aggressive"
                ? "Crypto adds exposure to high-growth digital assets."
                : "Minimal crypto allocation for diversification into emerging markets.";
        case "internationalStocks":
            return "International stocks provide diversification beyond domestic markets.";
        default:
            return "Allocation to " + category + " for diversification.";
    }
}
function getExpectedPortfolioReturn(riskTolerance, timeHorizon) {
    var baseReturns = {
        conservative: "4-6%",
        moderate: "6-8%",
        aggressive: "8-12%"
    };
    var base = baseReturns[riskTolerance];
    if (timeHorizon === "long")
        base += " (long-term growth potential)";
    if (timeHorizon === "short")
        base += " (short-term lower volatility)";
    return base;
}
function getRiskProfileDescription(riskTolerance) {
    var descriptions = {
        conservative: "Low Risk, Steady Growth",
        moderate: "Balanced Risk & Return",
        aggressive: "High Risk, High Reward"
    };
    return descriptions[riskTolerance];
}
function getPortfolioSummary(riskTolerance, timeHorizon, budget) {
    var riskDesc = {
        conservative: "stability and capital preservation",
        moderate: "balanced growth with moderate risk",
        aggressive: "maximum growth potential"
    };
    var timeDesc = {
        short: "short-term goals and liquidity",
        medium: "medium-term financial objectives",
        long: "long-term wealth building"
    };
    return "This " + riskTolerance + " portfolio (" + riskDesc[riskTolerance] + ") is designed for " + timeDesc[timeHorizon] + " with your $" + budget.toLocaleString() + " investment.";
}
