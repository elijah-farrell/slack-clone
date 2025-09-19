import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { MessageSquare, Shield, Globe, Zap, Link, Target } from "lucide-react"

const features = [
  {
    title: "Real-time Messaging",
    description: "Send and receive messages instantly with live updates. See when others are typing and get notified of new messages in real-time.",
    icon: MessageSquare,
    badge: "Real-time",
  },
  {
    title: "Secure Channels",
    description: "Create public and private channels with role-based permissions. Control who can access what with enterprise-grade security.",
    icon: Shield,
    badge: "Secure",
  },
  {
    title: "Team Collaboration",
    description: "Organize conversations by topic, invite team members, and keep everyone in the loop with persistent message history.",
    icon: Globe,
    badge: "Collaborative",
  },
  {
    title: "Instant Notifications",
    description: "Never miss important messages with real-time notifications. Stay connected with your team wherever you are.",
    icon: Zap,
    badge: "Notifications",
  },
  {
    title: "User Management",
    description: "Easy sign-up and authentication system. Manage user profiles, avatars, and team member access seamlessly.",
    icon: Link,
    badge: "User-friendly",
  },
  {
    title: "Modern Interface",
    description: "Clean, responsive design that works perfectly on desktop and mobile. Intuitive navigation and beautiful UI.",
    icon: Target,
    badge: "Modern",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-orbitron">Next-Generation Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-geist">
            Experience the future with cutting-edge technology that redefines what's possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-black border-red-500/20 hover:border-red-500/50 transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="w-8 h-8 text-red-500" />
                  <Badge variant="secondary" className="bg-red-500 text-white">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-white font-orbitron">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed font-geist">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}