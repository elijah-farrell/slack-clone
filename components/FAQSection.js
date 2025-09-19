import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How do I sign up for Spark Chat?",
      answer:
        "Sign up with your email address and password. You'll receive a confirmation email - click the link to activate your account. Check your spam folder if you don't see it.",
    },
    {
      question: "What are user roles and permissions?",
      answer:
        "Spark Chat has admin and moderator roles. Admins can delete any channel or message, while moderators can delete messages. Regular users can only delete their own messages. Role assignment is currently managed by administrators.",
    },
    {
      question: "Can I create private channels?",
      answer:
        "Absolutely! You can create both public and private channels with role-based permissions to control access and maintain team privacy.",
    },
    {
      question: "How does real-time messaging work?",
      answer:
        "Our real-time messaging is powered by Supabase's WebSocket technology, providing instant message delivery and synchronization across all connected devices.",
    },
    {
      question: "What happens to my messages if I'm offline?",
      answer:
        "All messages are stored persistently in our secure database. When you come back online, you'll see all messages that were sent while you were away.",
    },
    {
      question: "Is Spark Chat secure for business use?",
      answer:
        "Yes, Spark Chat uses enterprise-grade security with Row Level Security, JWT authentication, and encrypted data transmission for complete business protection.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-geist">
            Get answers to common questions about Spark Chat technology, security, and team collaboration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-geist">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
