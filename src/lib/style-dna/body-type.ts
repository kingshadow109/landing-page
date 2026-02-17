/**
 * Body Type Analysis Logic
 * Calculates body type from measurements and provides recommendations
 */

import { BodyType, BodyMeasurements } from "./types";

/**
 * Calculate body type from measurements
 * Uses shoulder, waist, and hip ratios to determine body shape
 */
export function calculateBodyType(measurements: Partial<BodyMeasurements>): BodyType {
  const { shoulderWidth, waistWidth, hipWidth, bodyType } = measurements;
  
  // If user already selected a body type, respect that
  if (bodyType && bodyType !== "not-sure") {
    return bodyType;
  }
  
  // If we have measurements, calculate
  if (shoulderWidth && waistWidth && hipWidth) {
    const shoulderToWaist = shoulderWidth / waistWidth;
    const hipToWaist = hipWidth / waistWidth;
    const shoulderToHip = shoulderWidth / hipWidth;
    
    // Hourglass: shoulders ≈ hips, defined waist
    if (Math.abs(shoulderToHip - 1) <= 0.1 && waistWidth < Math.min(shoulderWidth, hipWidth) * 0.75) {
      return "hourglass";
    }
    
    // Pear: hips > shoulders
    if (hipWidth > shoulderWidth * 1.05) {
      return "pear";
    }
    
    // Apple: waist >= hips or undefined waist
    if (waistWidth >= hipWidth * 0.9 || waistWidth >= shoulderWidth * 0.9) {
      return "apple";
    }
    
    // Inverted Triangle: shoulders > hips
    if (shoulderWidth > hipWidth * 1.05) {
      return "inverted-triangle";
    }
    
    // Rectangle: shoulders ≈ waist ≈ hips
    if (Math.abs(shoulderToHip - 1) <= 0.1 && waistWidth >= hipWidth * 0.75) {
      return "rectangle";
    }
  }
  
  return "not-sure";
}

/**
 * Get body type description and characteristics
 */
export function getBodyTypeInfo(bodyType: BodyType): {
  name: string;
  description: string;
  characteristics: string[];
  styleTips: string[];
} {
  const bodyTypeData: Record<BodyType, {
    name: string;
    description: string;
    characteristics: string[];
    styleTips: string[];
  }> = {
    "hourglass": {
      name: "Hourglass",
      description: "Balanced proportions with a defined waist",
      characteristics: [
        "Shoulders and hips are approximately the same width",
        "Well-defined waist (significantly narrower than shoulders/hips)",
        "Curvy silhouette with balanced proportions"
      ],
      styleTips: [
        "Emphasize your waist with fitted styles",
        "Wrap dresses and belted coats are your best friends",
        "High-waisted bottoms accentuate your curves",
        "Avoid boxy, shapeless garments that hide your waist"
      ]
    },
    "pear": {
      name: "Pear",
      description: "Hips wider than shoulders with defined waist",
      characteristics: [
        "Hips are wider than shoulders",
        "Defined waist",
        "Narrower shoulders and upper body"
      ],
      styleTips: [
        "Add volume to your upper body with statement sleeves",
        "A-line skirts and wide-leg pants balance proportions",
        "Dark colors on bottom, bright colors on top",
        "Boat necklines and off-shoulder styles broaden shoulders"
      ]
    },
    "apple": {
      name: "Apple",
      description: "Fuller midsection with slimmer legs",
      characteristics: [
        "Waist is wider than hips or undefined",
        "Slimmer legs and arms",
        "Weight tends to gather around the midsection"
      ],
      styleTips: [
        "Empire waist and flowy tops skim over the midsection",
        "V-necks and vertical lines elongate the torso",
        "Show off your legs with fitted pants and skirts",
        "Structured jackets create definition"
      ]
    },
    "rectangle": {
      name: "Rectangle",
      description: "Straight silhouette with similar measurements",
      characteristics: [
        "Shoulders, waist, and hips are similar in width",
        "Minimal waist definition",
        "Straight up-and-down silhouette"
      ],
      styleTips: [
        "Create curves with peplum tops and ruffled details",
        "Belts help define the waist",
        "Layering adds dimension to your silhouette",
        "Fit-and-flare dresses create shape"
      ]
    },
    "inverted-triangle": {
      name: "Inverted Triangle",
      description: "Broader shoulders with narrower hips",
      characteristics: [
        "Shoulders are wider than hips",
        "Athletic build with strong upper body",
        "Narrower hips and legs"
      ],
      styleTips: [
        "Balance broad shoulders with full skirts and wide-leg pants",
        "Avoid shoulder pads and puff sleeves",
        "V-necks and vertical lines soften the shoulder line",
        "Dark colors on top, lighter colors on bottom"
      ]
    },
    "athletic": {
      name: "Athletic",
      description: "Muscular build with defined physique",
      characteristics: [
        "Well-defined muscles",
        "Strong shoulders and legs",
        "May have broader shoulders and narrow hips"
      ],
      styleTips: [
        "Show off your toned arms with sleeveless styles",
        "Bodycon dresses highlight your fit physique",
        "Tailored pieces complement your structured build",
        "Avoid overly baggy clothes that hide your shape"
      ]
    },
    "not-sure": {
      name: "Not Sure",
      description: "Let our AI help determine your body type",
      characteristics: [
        "Body type not yet determined",
        "May have mixed characteristics",
        "Can experiment with various styles"
      ],
      styleTips: [
        "Try different silhouettes to see what feels best",
        "Focus on fit and comfort over trends",
        "Consider a virtual styling session",
        "Classic, well-fitted pieces work for everyone"
      ]
    }
  };
  
  return bodyTypeData[bodyType];
}

/**
 * Get ideal fit recommendations for body type
 */
export function getFitRecommendations(bodyType: BodyType): {
  tops: string[];
  bottoms: string[];
  dresses: string[];
  avoid: string[];
} {
  const recommendations: Record<BodyType, {
    tops: string[];
    bottoms: string[];
    dresses: string[];
    avoid: string[];
  }> = {
    "hourglass": {
      tops: ["Fitted blouses", "Wrap tops", "Cropped jackets", "Belted coats"],
      bottoms: ["High-waisted pants", "Pencil skirts", "Bootcut jeans", "Tailored trousers"],
      dresses: ["Wrap dresses", "Fit-and-flare", "Sheath dresses", "Belted shirt dresses"],
      avoid: ["Boxy oversized tops", "Low-rise pants", "Shapeless shift dresses"]
    },
    "pear": {
      tops: ["Boat neck", "Off-shoulder", "Statement sleeves", "Bright colors/patterns"],
      bottoms: ["A-line skirts", "Wide-leg pants", "Dark wash jeans", "Bootcut pants"],
      dresses: ["Fit-and-flare", "A-line dresses", "Empire waist", "Off-shoulder styles"],
      avoid: ["Pencil skirts", "Skinny jeans", "Bodycon dresses", "Drop-waist styles"]
    },
    "apple": {
      tops: ["V-necks", "Flowy blouses", "Tunic tops", "Structured jackets"],
      bottoms: ["Straight-leg pants", "Bootcut jeans", "A-line skirts", "Wide-leg trousers"],
      dresses: ["Empire waist", "Shift dresses", "Wrap dresses", "A-line silhouettes"],
      avoid: ["Crop tops", "Low-rise pants", "Bodycon dresses", "Horizontal stripes"]
    },
    "rectangle": {
      tops: ["Peplum tops", "Ruffled blouses", "Layered looks", "Patterned tops"],
      bottoms: ["Wide-leg pants", "Full skirts", "Pleated trousers", "Paperbag waist"],
      dresses: ["Fit-and-flare", "Wrap dresses", "Shirt dresses with belts", "Ruffled styles"],
      avoid: ["Shapeless shifts", "Straight-cut everything", "Boxy silhouettes"]
    },
    "inverted-triangle": {
      tops: ["V-necks", "Dark colors", "Simple sleeves", "Vertical stripes"],
      bottoms: ["Full skirts", "Wide-leg pants", "Palazzo pants", "Patterned bottoms"],
      dresses: ["A-line dresses", "Full skirts with simple tops", "Empire waist"],
      avoid: ["Shoulder pads", "Puff sleeves", "Boat necks", "Skinny pants"]
    },
    "athletic": {
      tops: ["Sleeveless", "Fitted tanks", "Cropped tops", "Structured blazers"],
      bottoms: ["Skinny jeans", "Leggings", "Pencil skirts", "Tailored shorts"],
      dresses: ["Bodycon", "Slip dresses", "Sheath dresses", "Cut-out styles"],
      avoid: ["Overly baggy clothes", "Shapeless garments", "Too many layers"]
    },
    "not-sure": {
      tops: ["Well-fitted basics", "Classic button-downs", "Soft knits"],
      bottoms: ["Mid-rise jeans", "Tailored trousers", "A-line skirts"],
      dresses: ["Wrap dresses", "Shirt dresses", "Classic sheaths"],
      avoid: ["Extreme trends", "Ill-fitting clothes", "Too tight or too loose"]
    }
  };
  
  return recommendations[bodyType];
}
