import Link from 'next/link'
import { Button } from "~/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-red-500/10 via-red-600/10 to-red-500/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="slide-up">
          <h2 className="text-5xl font-bold text-white mb-6 font-orbitron text-balance">Ready to Enter the Future?</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto font-geist">
            Join thousands of innovators who are already experiencing the next evolution of technology. The future is
            here—are you ready to be part of it?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" legacyBehavior>
              <a>
                <Button
                  size="lg"
                  className="bg-red-500 text-white hover:bg-red-600 pulse-button text-lg px-8 py-4 font-geist"
                >
                  Sign Up
                </Button>
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-lg px-8 py-4 bg-transparent font-geist"
                >
                  Log In
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}