import { Card, CardContent } from "~/components/ui/card"
import { Zap, Shield, Globe } from "lucide-react"

export function TechnologySection() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Technology Stack</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-geist">
            Built with modern technologies for reliable, scalable performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-black border-red-500/20 hover:border-red-500/50 transition-all duration-300">
            <CardContent className="p-8">
              <Zap className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3 font-orbitron">Next.js Framework</h3>
              <p className="text-gray-300 leading-relaxed font-geist">
                React-based framework with server-side rendering for fast loading and SEO optimization.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border-red-500/20 hover:border-red-500/50 transition-all duration-300">
            <CardContent className="p-8">
              <Shield className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3 font-orbitron">Supabase Database</h3>
              <p className="text-gray-300 leading-relaxed font-geist">
                PostgreSQL database with real-time subscriptions, Row Level Security, and built-in auth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border-red-500/20 hover:border-red-500/50 transition-all duration-300">
            <CardContent className="p-8">
              <Globe className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3 font-orbitron">Modern UI Stack</h3>
              <p className="text-gray-300 leading-relaxed font-geist">
                Tailwind CSS for styling, shadcn/ui components, and Lucide icons for a polished interface.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
