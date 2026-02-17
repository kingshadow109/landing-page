import { Zap, Shield, Clock, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed. Experience blazing fast performance with our optimized infrastructure.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security. Your data is protected with end-to-end encryption.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate repetitive tasks and focus on what matters most to your business.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy worldwide with our distributed infrastructure. Low latency, everywhere.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build and scale your next big idea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
