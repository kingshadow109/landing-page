import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    if (!GEMINI_API_KEY) {
      // Return mock data for testing
      console.log("No API key, returning mock analysis");
      return NextResponse.json(getMockAnalysis());
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this clothing item and return a JSON object with these fields:
                  - category: (tops, bottoms, shoes, accessories, outerwear)
                  - subcategory: (shirt, t-shirt, pants, dress, jacket, etc.)
                  - color: primary color
                  - pattern: (solid, striped, floral, checkered, etc.)
                  - material: (cotton, denim, leather, silk, etc.)
                  - style: (casual, formal, sporty, vintage, etc.)
                  - occasion: (everyday, work, party, workout, etc.)
                  - season: (spring, summer, fall, winter, all-season)
                  - confidence: (0-1 number)
                  
                  Return ONLY the JSON object, no markdown, no explanation.`,
                },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { error: "Analysis failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Parse the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Extract JSON from response
    let analysis;
    try {
      // Try to parse directly
      analysis = JSON.parse(text);
    } catch {
      // Try to extract JSON from markdown
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || 
                       text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        throw new Error("Could not parse response");
      }
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getMockAnalysis() {
  const categories = ["tops", "bottoms", "shoes", "accessories", "outerwear"];
  const subcategories = ["t-shirt", "shirt", "pants", "jeans", "dress", "jacket", "sneakers", "bag"];
  const colors = ["black", "white", "navy", "gray", "beige", "red", "blue", "green"];
  const patterns = ["solid", "striped", "checkered", "floral", "graphic"];
  const materials = ["cotton", "denim", "polyester", "wool", "leather", "silk"];
  const styles = ["casual", "formal", "streetwear", "minimalist", "vintage"];
  const occasions = ["everyday", "work", "party", "workout", "special"];
  const seasons = ["spring", "summer", "fall", "winter", "all-season"];

  return {
    category: categories[Math.floor(Math.random() * categories.length)],
    subcategory: subcategories[Math.floor(Math.random() * subcategories.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    pattern: patterns[Math.floor(Math.random() * patterns.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
    style: styles[Math.floor(Math.random() * styles.length)],
    occasion: occasions[Math.floor(Math.random() * occasions.length)],
    season: seasons[Math.floor(Math.random() * seasons.length)],
    confidence: 0.85,
  };
}
