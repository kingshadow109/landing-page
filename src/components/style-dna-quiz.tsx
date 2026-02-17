"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  calculateStyleArchetype, 
  generateColorPalette, 
  getRecommendedCategories,
  saveStyleDNA,
  type StyleDNAProfile,
  type BodyType,
  type SkinTone,
  type WorkEnvironment,
  type StylePreference,
  type ColorPreference,
  type Activity,
  type BudgetPreference,
  type BrandValue,
} from "@/lib/style-dna";
import { Sparkles, Palette, Briefcase, Heart, DollarSign, User } from "lucide-react";

const steps = [
  { id: "physical", title: "Physical Profile", icon: User },
  { id: "lifestyle", title: "Lifestyle", icon: Briefcase },
  { id: "style", title: "Style Preferences", icon: Palette },
  { id: "values", title: "Values & Budget", icon: Heart },
  { id: "results", title: "Your Style DNA", icon: Sparkles },
];

export function StyleDNAQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<StyleDNAProfile>>({});
  const [result, setResult] = useState<StyleDNAProfile | null>(null);

  const progress = ((currentStep) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResult();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResult = () => {
    const archetype = calculateStyleArchetype(answers.stylePreferences || []);
    const colorPalette = generateColorPalette(
      answers.skinTone || 'medium',
      answers.colorPreferences || []
    );
    const recommendedCategories = getRecommendedCategories(answers);

    const profile: StyleDNAProfile = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
      bodyType: answers.bodyType || 'rectangle',
      skinTone: answers.skinTone || 'medium',
      workEnvironment: answers.workEnvironment || 'casual',
      weeklyActivities: answers.weeklyActivities || [],
      commuteType: answers.commuteType || 'driving',
      stylePreferences: answers.stylePreferences || [],
      colorPreferences: answers.colorPreferences || [],
      patternPreferences: answers.patternPreferences || [],
      sustainabilityPriority: answers.sustainabilityPriority || 'medium',
      budgetPreference: answers.budgetPreference || 'mid-range',
      brandValues: answers.brandValues || [],
      styleArchetype: archetype,
      colorPalette,
      recommendedCategories,
    };

    setResult(profile);
    saveStyleDNA(profile);
  };

  const updateAnswer = <K extends keyof StyleDNAProfile>(key: K, value: StyleDNAProfile[K]) => {
    setAnswers({ ...answers, [key]: value });
  };

  const toggleArrayAnswer = <K extends keyof StyleDNAProfile>(
    key: K,
    value: StyleDNAProfile[K] extends Array<infer T> ? T : never
  ) => {
    const current = (answers[key] as any[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setAnswers({ ...answers, [key]: updated });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PhysicalStep answers={answers} updateAnswer={updateAnswer} />;
      case 1:
        return <LifestyleStep answers={answers} updateAnswer={updateAnswer} toggleArrayAnswer={toggleArrayAnswer} />;
      case 2:
        return <StyleStep answers={answers} toggleArrayAnswer={toggleArrayAnswer} />;
      case 3:
        return <ValuesStep answers={answers} updateAnswer={updateAnswer} toggleArrayAnswer={toggleArrayAnswer} />;
      case 4:
        return result ? <ResultsStep profile={result} /> : null;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const Icon = steps[currentStep].icon;
              return <Icon className="w-5 h-5" />;
            })()}
            {steps[currentStep].title}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderStep()}
        
        {currentStep < steps.length - 1 && (
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 2 ? "See Results" : "Next"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PhysicalStep({ 
  answers, 
  updateAnswer 
}: { 
  answers: Partial<StyleDNAProfile>;
  updateAnswer: <K extends keyof StyleDNAProfile>(key: K, value: StyleDNAProfile[K]) => void;
}) {
  const bodyTypes: { value: BodyType; label: string; description: string }[] = [
    { value: 'hourglass', label: 'Hourglass', description: 'Balanced shoulders and hips, defined waist' },
    { value: 'pear', label: 'Pear', description: 'Hips wider than shoulders' },
    { value: 'apple', label: 'Apple', description: 'Fuller midsection, slimmer legs' },
    { value: 'rectangle', label: 'Rectangle', description: 'Shoulders, waist, and hips similar width' },
    { value: 'inverted-triangle', label: 'Inverted Triangle', description: 'Shoulders wider than hips' },
    { value: 'oval', label: 'Oval', description: 'Rounded silhouette, fuller midsection' },
  ];

  const skinTones: { value: SkinTone; label: string; color: string }[] = [
    { value: 'fair', label: 'Fair', color: '#F5E6D3' },
    { value: 'light', label: 'Light', color: '#FFE4C4' },
    { value: 'medium', label: 'Medium', color: '#F4A460' },
    { value: 'tan', label: 'Tan', color: '#D2691E' },
    { value: 'deep', label: 'Deep', color: '#8B4513' },
    { value: 'dark', label: 'Dark', color: '#4A3728' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-3 block">What's your body type?</label>
        <div className="grid grid-cols-2 gap-3">
          {bodyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateAnswer('bodyType', type.value)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                answers.bodyType === type.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">{type.label}</div>
              <div className="text-xs text-muted-foreground">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">What's your skin tone?</label>
        <div className="flex flex-wrap gap-3">
          {skinTones.map((tone) => (
            <button
              key={tone.value}
              onClick={() => updateAnswer('skinTone', tone.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                answers.skinTone === tone.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: tone.color }}
              />
              <span className="text-sm">{tone.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LifestyleStep({ 
  answers, 
  updateAnswer,
  toggleArrayAnswer 
}: { 
  answers: Partial<StyleDNAProfile>;
  updateAnswer: <K extends keyof StyleDNAProfile>(key: K, value: StyleDNAProfile[K]) => void;
  toggleArrayAnswer: <K extends keyof StyleDNAProfile>(key: K, value: any) => void;
}) {
  const workEnvironments: { value: WorkEnvironment; label: string; description: string }[] = [
    { value: 'formal-corporate', label: 'Formal Corporate', description: 'Suits, ties, business formal' },
    { value: 'business-casual', label: 'Business Casual', description: 'Button-downs, chinos, blazers' },
    { value: 'smart-casual', label: 'Smart Casual', description: 'Polished but relaxed' },
    { value: 'casual', label: 'Casual', description: 'Jeans, t-shirts, comfortable' },
    { value: 'creative', label: 'Creative', description: 'Expressive, unique, artistic' },
    { value: 'remote', label: 'Remote/Work from Home', description: 'Comfortable, video-call ready' },
  ];

  const activities: { value: Activity; label: string }[] = [
    { value: 'gym', label: '🏋️ Gym' },
    { value: 'yoga', label: '🧘 Yoga' },
    { value: 'running', label: '🏃 Running' },
    { value: 'hiking', label: '🥾 Hiking' },
    { value: 'cycling', label: '🚴 Cycling' },
    { value: 'swimming', label: '🏊 Swimming' },
    { value: 'dancing', label: '💃 Dancing' },
    { value: 'social-events', label: '🎉 Social Events' },
    { value: 'date-nights', label: '💕 Date Nights' },
    { value: 'networking', label: '🤝 Networking' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-3 block">What's your work environment?</label>
        <div className="space-y-2">
          {workEnvironments.map((env) => (
            <button
              key={env.value}
              onClick={() => updateAnswer('workEnvironment', env.value)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                answers.workEnvironment === env.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">{env.label}</div>
              <div className="text-xs text-muted-foreground">{env.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">What activities do you do weekly? (Select all)</label>
        <div className="flex flex-wrap gap-2">
          {activities.map((activity) => (
            <button
              key={activity.value}
              onClick={() => toggleArrayAnswer('weeklyActivities', activity.value)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                answers.weeklyActivities?.includes(activity.value)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {activity.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StyleStep({ 
  answers, 
  toggleArrayAnswer 
}: { 
  answers: Partial<StyleDNAProfile>;
  toggleArrayAnswer: <K extends keyof StyleDNAProfile>(key: K, value: any) => void;
}) {
  const stylePreferences: { value: StylePreference; label: string }[] = [
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'classic', label: 'Classic' },
    { value: 'trendy', label: 'Trendy' },
    { value: 'bohemian', label: 'Bohemian' },
    { value: 'streetwear', label: 'Streetwear' },
    { value: 'preppy', label: 'Preppy' },
    { value: 'edgy', label: 'Edgy' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'sporty', label: 'Sporty' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'casual', label: 'Casual' },
  ];

  const colorPreferences: { value: ColorPreference; label: string; colors: string[] }[] = [
    { value: 'neutrals', label: 'Neutrals', colors: ['#000', '#fff', '#808080'] },
    { value: 'earth-tones', label: 'Earth Tones', colors: ['#8B4513', '#D2691E', '#556B2F'] },
    { value: 'pastels', label: 'Pastels', colors: ['#FFB6C1', '#E6E6FA', '#98FB98'] },
    { value: 'jewel-tones', label: 'Jewel Tones', colors: ['#DC143C', '#4169E1', '#228B22'] },
    { value: 'bright-colors', label: 'Bright Colors', colors: ['#FF0000', '#00FF00', '#0000FF'] },
    { value: 'monochrome', label: 'Monochrome', colors: ['#000', '#666', '#fff'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-3 block">What styles resonate with you? (Select all)</label>
        <div className="flex flex-wrap gap-2">
          {stylePreferences.map((style) => (
            <button
              key={style.value}
              onClick={() => toggleArrayAnswer('stylePreferences', style.value)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                answers.stylePreferences?.includes(style.value)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">What colors do you prefer? (Select all)</label>
        <div className="grid grid-cols-2 gap-3">
          {colorPreferences.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleArrayAnswer('colorPreferences', color.value)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                answers.colorPreferences?.includes(color.value)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex gap-1 mb-2">
                {color.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="font-medium text-sm">{color.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValuesStep({ 
  answers, 
  updateAnswer,
  toggleArrayAnswer 
}: { 
  answers: Partial<StyleDNAProfile>;
  updateAnswer: <K extends keyof StyleDNAProfile>(key: K, value: StyleDNAProfile[K]) => void;
  toggleArrayAnswer: <K extends keyof StyleDNAProfile>(key: K, value: any) => void;
}) {
  const budgetOptions: { value: BudgetPreference; label: string; description: string }[] = [
    { value: 'budget-conscious', label: 'Budget Conscious', description: 'Under $50 per item' },
    { value: 'mid-range', label: 'Mid-Range', description: '$50-150 per item' },
    { value: 'investment-pieces', label: 'Investment Pieces', description: '$150-300 per item' },
    { value: 'luxury', label: 'Luxury', description: '$300+ per item' },
    { value: 'mix', label: 'Mix & Match', description: 'Strategic splurges' },
  ];

  const brandValues: { value: BrandValue; label: string }[] = [
    { value: 'sustainable', label: '🌱 Sustainable Materials' },
    { value: 'ethical-production', label: '⚖️ Ethical Production' },
    { value: 'local-made', label: '🏭 Local Made' },
    { value: 'vegan', label: '🌿 Vegan' },
    { value: 'size-inclusive', label: '👥 Size Inclusive' },
    { value: 'transparent-pricing', label: '💰 Transparent Pricing' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-3 block">What's your budget preference?</label>
        <div className="space-y-2">
          {budgetOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateAnswer('budgetPreference', option.value)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                answers.budgetPreference === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">{option.label}</span>
              </div>
              <div className="text-xs text-muted-foreground ml-6">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block">What values matter to you? (Select all)</label>
        <div className="flex flex-wrap gap-2">
          {brandValues.map((value) => (
            <button
              key={value.value}
              onClick={() => toggleArrayAnswer('brandValues', value.value)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                answers.brandValues?.includes(value.value)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsStep({ profile }: { profile: StyleDNAProfile }) {
  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold">Your Style Archetype</h2>
      <p className="text-3xl font-bold text-primary">{profile.styleArchetype}</p>
      
      <div className="space-y-4 text-left">
        <div>
          <h3 className="font-semibold mb-2">Your Color Palette</h3>
          <div className="flex flex-wrap gap-2">
            {profile.colorPalette.map((color, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg border shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Recommended Categories</h3>
          <div className="flex flex-wrap gap-2">
            {profile.recommendedCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-secondary rounded-full text-sm"
              >
                {cat.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Your Profile</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>Body Type: <span className="text-foreground capitalize">{profile.bodyType.replace(/-/g, ' ')}</span></li>
            <li>Work Style: <span className="text-foreground capitalize">{profile.workEnvironment.replace(/-/g, ' ')}</span></li>
            <li>Budget: <span className="text-foreground capitalize">{profile.budgetPreference.replace(/-/g, ' ')}</span></li>
            <li>Values: {profile.brandValues.length > 0 ? profile.brandValues.join(', ') : 'Not specified'}</li>
          </ul>
        </div>
      </div>
      
      <Button className="w-full" onClick={() => window.location.href = '/outfits'}>
        Get Outfit Recommendations
      </Button>
    </div>
  );
}
