export function Footer() {
  return (
    <footer className="border-t bg-card/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-foreground text-lg">FinSmart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart investment recommendations tailored to your financial goals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/results" className="hover:text-foreground transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-foreground transition-colors">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-destructive">Disclaimer:</strong> Not real financial advice. For demo purposes only.
          </p>
          <p className="text-xs text-muted-foreground mt-2">© 2025 FinSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
