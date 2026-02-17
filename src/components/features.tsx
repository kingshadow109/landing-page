import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  ShoppingBag,
  Palette,
  Truck,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Style Curator",
    description:
      "Our AI learns your preferences and curates personalized clothing and accessory recommendations just for you.",
  },
  {
    icon: ShoppingBag,
    title: "Seamless Shopping",
    description:
      "One-tap checkout, saved preferences, and intelligent size recommendations. Shopping made effortless.",
  },
  {
    icon: Palette,
    title: "Visual Discovery",
    description:
      "Upload photos or describe your style. Our AI finds matching pieces from our curated collection.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Free express shipping on orders over $50. Track your style from warehouse to wardrobe in real-time.",
  },
  {
    icon: Users,
    title: "Style Community",
    description:
      "Connect with fashion enthusiasts. Share outfits, get feedback, and discover trending looks.",
  },
  {
    icon: TrendingUp,
    title: "Trend Forecasting",
    description:
      "Stay ahead of the curve. Our AI predicts upcoming trends so you're always in style.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Fashion, reimagined
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            AI-powered style curation meets seamless shopping. Discover clothing and accessories that feel like you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 shadow-sm bg-white dark:bg-zinc-900 hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <feature.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
