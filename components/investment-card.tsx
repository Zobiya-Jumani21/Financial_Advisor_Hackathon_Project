import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { InvestmentRecommendation } from "@/lib/investment-engine"

interface InvestmentCardProps {
  recommendation: InvestmentRecommendation
}
// colours specifyed for light and dark mode
export function InvestmentCard({ recommendation }: InvestmentCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{recommendation.icon}</span>
            <div>
              <CardTitle className="text-lg">{recommendation.name}</CardTitle>
              <CardDescription className="mt-1">{recommendation.description}</CardDescription>
            </div>
          </div>
          <Badge className={getRiskColor(recommendation.riskLevel)}>{recommendation.riskLevel} Risk</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Allocation</span>
          <span className="text-lg font-bold">{recommendation.percentage}%</span>
        </div>

        <Progress value={recommendation.percentage} className="h-2" />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm text-muted-foreground">Investment Amount</p>
            <p className="text-lg font-semibold">PKR {recommendation.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expected Return</p>
            <p className="text-lg font-semibold text-primary">{recommendation.expectedReturn}</p>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground mb-2">Why this allocation?</p>
          <p className="text-sm">{recommendation.reasoning}</p>
        </div>
      </CardContent>
    </Card>
  )
}
