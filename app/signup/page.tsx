import { Header } from "@/components/header3"
import { Footer } from "@/components/footer1"
import { SignupForm } from "@/components/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
       <Header />
    

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Get Started Today</CardTitle>
                <CardDescription>Create your account to begin your investment journey</CardDescription>
              </CardHeader>
              <CardContent>
                <SignupForm />
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
