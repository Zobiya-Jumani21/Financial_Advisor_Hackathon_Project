// home page 
import { Header } from "@/components/header2"
import { Footer } from "@/components/footer1"
import { BudgetForm } from "@/components/budget-form" //dekhna hai
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Smart Investment
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Recommendations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Get personalized investment advice based on your budget, risk tolerance, and financial timeline.
            </p>
          </div>
        </section>

        {/* Budget Input Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-balance mb-4">Let's Build Your Portfolio</h2>
                <p className="text-muted-foreground text-balance">
                  Answer a few questions to get started with your personalized investment recommendations.
                </p>
              </div>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <BudgetForm />  
                  {/* //budgetform */}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-balance mb-4">Why Choose Financial Advisor?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Analysis</h3>
                  <p className="text-muted-foreground">
                    Tailored recommendations based on your unique financial situation and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Risk-Adjusted</h3>
                  <p className="text-muted-foreground">
                    Investment strategies that match your comfort level with market volatility.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Time-Optimized</h3>
                  <p className="text-muted-foreground">
                    Strategies aligned with your investment timeline and financial milestones.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
