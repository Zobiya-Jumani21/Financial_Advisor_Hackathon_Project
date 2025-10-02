//At the top, the code is bringing in things it needs to show on the page:
import { Header } from "@/components/header1"
import { Footer } from "@/components/footer1"
import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// lets you click and go to another page
import Link from "next/link"

//export default → this means other files can use this page.
export default function LoginPage() {
  return ( //what the page is showing
    <div className="min-h-screen flex flex-col">
      <Header />
{/* // py-16 adding padding */}
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>Sign in to access your investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline font-medium">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
