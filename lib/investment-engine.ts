import type { FormData } from "@/components/budget-form"
// Investment calculation logic

export interface InvestmentRecommendation {
  id: string
  name: string
  description: string
  percentage: number
  amount: number
  icon: string
  riskLevel: "Low" | "Medium" | "High"
  expectedReturn: string
  reasoning: string
}

export interface PortfolioRecommendation {
  totalAmount: number
  expectedAnnualReturn: string
  riskProfile: string
  recommendations: InvestmentRecommendation[]
  summary: string
}

type RiskLevel = "conservative" | "moderate" | "aggressive"
type TimeHorizon = "short" | "medium" | "long"

export function generateInvestmentRecommendations(formData: FormData): PortfolioRecommendation {
  const { budget, riskTolerance, timeHorizon } = formData as {
    budget: number
    riskTolerance: RiskLevel
    timeHorizon: TimeHorizon
  }

  // Extended categories
  const categories = [
    "stocks",
    "bonds",
    "realEstate",
    "savings",
    "gold",
    "crypto",
    "internationalStocks",
  ] as const
// This is the default recipe.
  // Base allocations consertive men bonds men ziyada amount jae aur aggressive me crypto men ziyada jae
  const baseAllocations: Record<RiskLevel, Record<string, number>> = {
    conservative: { stocks: 15, bonds: 35, realEstate: 10, savings: 25, gold: 5, crypto: 0, internationalStocks: 3 },
    moderate:     { stocks: 30, bonds: 25, realEstate: 15, savings: 15, gold: 5, crypto: 2, internationalStocks: 3 },
    aggressive:   { stocks: 40, bonds: 15, realEstate: 15, savings: 5, gold: 5, crypto: 5, internationalStocks: 5 },
  }

  let allocations = { ...baseAllocations[riskTolerance] }

  // Adjust allocations based on time horizon
  if (timeHorizon === "short") {
    allocations.savings = Math.max(0, allocations.savings + 10)
    allocations.bonds = Math.max(0, allocations.bonds + 5)
    allocations.stocks = Math.max(0, allocations.stocks - 10)
    allocations.crypto = Math.max(0, allocations.crypto - 2)
    allocations.realEstate = Math.max(0, allocations.realEstate - 3)
  } else if (timeHorizon === "long") {
    allocations.stocks = Math.max(0, allocations.stocks + 5)
    allocations.realEstate = Math.max(0, allocations.realEstate + 3)
    allocations.savings = Math.max(0, allocations.savings - 5)
    allocations.bonds = Math.max(0, allocations.bonds - 3)
  }

  // Normalize to 100%
//   First, we add up all percentages (total).

// Then for each category (stocks, bonds, etc.), we divide by total and multiply by 100.

// This makes sure everything adds up to 100% again.
  const total = Object.values(allocations).reduce((sum, val) => sum + val, 0)
  Object.keys(allocations).forEach(key => {
    allocations[key as keyof typeof allocations] = Math.round((allocations[key as keyof typeof allocations] / total) * 100)
  })

  // For each category, create a recommendation
  const recommendations: InvestmentRecommendation[] = categories.map(category => ({
    id: category,
    name: categoryNameMap(category),
    description: categoryDescriptionMap(category),
    percentage: allocations[category],
    amount: Math.round((budget * allocations[category]) / 100),
    icon: categoryIconMap(category),
    riskLevel: getCategoryRisk(category),
    expectedReturn: getRiskBasedReturn(riskTolerance, category, timeHorizon),
    reasoning: getCategoryReasoning(category, riskTolerance, timeHorizon)
  }))
    .filter(rec => rec.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage)

  return {
    totalAmount: budget,
    expectedAnnualReturn: getExpectedPortfolioReturn(riskTolerance, timeHorizon),
    riskProfile: getRiskProfileDescription(riskTolerance),
    recommendations,
    summary: getPortfolioSummary(riskTolerance, timeHorizon, budget)
  }
}

// ----- Helper mappings -----
// These are just dictionaries:
// "stocks" → "Stock Market ETFs"
// "stocks" → "📈"
//hey make names/descriptions pretty for the user.
function categoryNameMap(category: string) {
  const map: Record<string,string> = {
    stocks: "Stock Market ETFs",
    bonds: "Bonds & Fixed Income",
    realEstate: "Real Estate Investments",
    savings: "High-Yield Savings",
    gold: "Precious Metals",
    crypto: "Cryptocurrency",
    internationalStocks: "International Stocks",
  }
  return map[category] || category
}

function categoryDescriptionMap(category: string) {
  const map: Record<string,string> = {
    stocks: "Diversified index funds tracking major market indices",
    bonds: "Stable income generating government and corporate bonds",
    realEstate: "REITs and property investments",
    savings: "FDIC-insured savings accounts",
    gold: "Gold and silver ETFs for diversification",
    crypto: "Digital currencies with high growth potential",
    internationalStocks: "Exposure to foreign equities",
  }
  return map[category] || category
}

function categoryIconMap(category: string) {
  const map: Record<string,string> = {
    stocks: "📈", bonds: "🏛️", realEstate: "🏠", savings: "🏦",
    gold: "🥇", crypto: "₿", internationalStocks: "🌎"
  }
  return map[category] || "💹"
}

function getCategoryRisk(category: string): "Low"|"Medium"|"High" {
  const highRisk = ["stocks","crypto","internationalStocks"]
  const mediumRisk = ["realEstate","gold"]
  return highRisk.includes(category) ? "High" : mediumRisk.includes(category) ? "Medium" : "Low"
}

// ----- Returns and Reasoning -----
function getRiskBasedReturn(riskTolerance: RiskLevel, category: string, timeHorizon: TimeHorizon) {
  const returns: Record<RiskLevel, Record<string, string>> = {
    conservative: { stocks:"5-7%", bonds:"3-4%", realEstate:"4-6%", savings:"3-4%", gold:"2-4%", crypto:"8-12%", internationalStocks:"4-6%" },
    moderate:     { stocks:"7-9%", bonds:"3-4%", realEstate:"6-8%", savings:"3-4%", gold:"3-5%", crypto:"12-20%", internationalStocks:"6-8%" },
    aggressive:   { stocks:"9-12%", bonds:"3-4%", realEstate:"8-10%", savings:"3-4%", gold:"4-6%", crypto:"20-35%", internationalStocks:"10-15%" }
  }

  let base = returns[riskTolerance][category] || "N/A"
  if (timeHorizon === "short" && category !== "savings" && category !== "bonds") {
    base += " (higher volatility short-term)"
  }
  return base
}

function getCategoryReasoning(category: string, riskTolerance: RiskLevel, timeHorizon: TimeHorizon): string {
  switch(category) {
    case "stocks":
      return riskTolerance === "aggressive" && timeHorizon === "long"
        ? "High stock allocation for maximum long-term growth potential."
        : "Balanced stock exposure provides growth while managing risk."
    case "bonds":
      return timeHorizon === "short"
        ? "Higher bond allocation ensures stability and liquidity for short-term needs."
        : "Bonds provide steady income and portfolio stability."
    case "realEstate":
      return "Real estate offers diversification and an inflation hedge through REITs."
    case "savings":
      return timeHorizon === "short"
        ? "High-yield savings ensures liquidity for immediate needs."
        : "Savings provide security and emergency fund coverage."
    case "gold":
      return "Gold acts as a safe-haven asset and hedge against inflation."
    case "crypto":
      return riskTolerance === "aggressive"
        ? "Crypto adds exposure to high-growth digital assets."
        : "Minimal crypto allocation for diversification into emerging markets."
    case "internationalStocks":
      return "International stocks provide diversification beyond domestic markets."
    default:
      return `Allocation to ${category} for diversification.`
  }
}

function getExpectedPortfolioReturn(riskTolerance: RiskLevel, timeHorizon: TimeHorizon): string {
  const baseReturns: Record<RiskLevel,string> = {
    conservative: "4-6%",
    moderate: "6-8%",
    aggressive: "8-12%"
  }
  let base = baseReturns[riskTolerance]
  if (timeHorizon === "long") base += " (long-term growth potential)"
  if (timeHorizon === "short") base += " (short-term lower volatility)"
  return base
}

function getRiskProfileDescription(riskTolerance: RiskLevel) {
  const descriptions = {
    conservative: "Low Risk, Steady Growth",
    moderate: "Balanced Risk & Return",
    aggressive: "High Risk, High Reward"
  }
  return descriptions[riskTolerance]
}

function getPortfolioSummary(riskTolerance: RiskLevel, timeHorizon: TimeHorizon, budget: number) {
  const riskDesc = {
    conservative: "stability and capital preservation",
    moderate: "balanced growth with moderate risk",
    aggressive: "maximum growth potential"
  }
  const timeDesc = {
    short: "short-term goals and liquidity",
    medium: "medium-term financial objectives",
    long: "long-term wealth building"
  }
  return `This ${riskTolerance} portfolio (${riskDesc[riskTolerance]}) is designed for ${timeDesc[timeHorizon]} with your $${budget.toLocaleString()} investment.`
}
