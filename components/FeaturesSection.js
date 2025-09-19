import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { MessageSquare, Shield, Globe, Zap, Link, Target } from "lucide-react"

const features = [
  {
    title: "Real-time Messaging",
    description: "Send and receive messages instantly with live updates. Messages appear immediately across all connected devices.",
    icon: MessageSquare,
    badge: "Real-time",
  },
  {
    title: "Public Channels",
    description: "Create channels to organize conversations by topic. All users can join and participate in public channels.",
    icon: Globe,
    badge: "Channels",
  },
  {
    title: "User Authentication",
    description: "Simple sign-up and login system. Create an account with email and password to start messaging.",
    icon: Shield,
    badge: "Secure",
  },
  {
    title: "Message History",
    description: "All messages are saved and persistent. See conversation history when you return to channels.",
    icon: Zap,
    badge: "Persistent",
  },
  {
    title: "User Identification",
    description: "Each message shows who sent it with a colored avatar (first letter of email) and username (email address).",
    icon: Link,
    badge: "Users",
  },
  {
    title: "Responsive Design",
    description: "Works perfectly on desktop and mobile devices. Clean interface that adapts to any screen size.",
    icon: Target,
    badge: "Mobile",
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