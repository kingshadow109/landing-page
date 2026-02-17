# Google Gemini Vision API Setup Guide

> **For:** Wardrobe Photo Upload Feature  
> **Last Updated:** 2026-02-18  
> **API Version:** v1beta

---

## Table of Contents

1. [Overview](#overview)
2. [Getting an API Key](#getting-an-api-key)
3. [API Endpoint](#api-endpoint)
4. [Authentication](#authentication)
5. [Request/Response Format](#requestresponse-format)
6. [Example Prompts for Wardrobe Analysis](#example-prompts-for-wardrobe-analysis)
7. [Rate Limits & Pricing](#rate-limits--pricing)
8. [Sample Code](#sample-code)
9. [Best Practices](#best-practices)

---

## Overview

Google Gemini is a multimodal AI model that can analyze images and generate text descriptions. For the wardrobe photo upload feature, we'll use Gemini to:

- **Categorize clothing items** (tops, bottoms, dresses, outerwear, etc.)
- **Extract attributes** (color, pattern, material, style, season)
- **Generate descriptions** for search and organization
- **Suggest outfit combinations** based on wardrobe items

### Recommended Models for Wardrobe Analysis

| Model | Best For | Speed | Cost |
|-------|----------|-------|------|
| `gemini-2.0-flash` | Fast categorization, high volume | ⚡ Fast | Free tier available |
| `gemini-2.5-flash` | Better accuracy, detailed analysis | Fast | Free tier available |
| `gemini-2.0-flash-lite` | Cost-effective bulk processing | ⚡ Fastest | Free tier available |

---

## Getting an API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Select or create a Google Cloud project
5. Copy the API key and store it securely

---

## API Endpoint

### Base URL

```
https://generativelanguage.googleapis.com/v1beta
```

### Generate Content Endpoint

```
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

**Example:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

### Available Vision-Capable Models

- `gemini-2.0-flash`
- `gemini-2.0-flash-lite`
- `gemini-2.5-flash`
- `gemini-2.5-flash-lite`
- `gemini-2.5-pro` (highest quality, slower)

---

## Authentication

Pass your API key using the `x-goog-api-key` header:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H "x-goog-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{...request body...}'
```

Or as a query parameter (less secure):

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{...request body...}'
```

---

## Request/Response Format

### Request Body Structure

```json
{
  "contents": [
    {
      "parts": [
        {
          "inline_data": {
            "mime_type": "image/jpeg",
            "data": "BASE64_ENCODED_IMAGE"
          }
        },
        {
          "text": "Your prompt here"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.4,
    "maxOutputTokens": 1024,
    "responseMimeType": "application/json"
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}
```

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contents` | Array | Yes | Array of content objects containing parts |
| `contents[].parts` | Array | Yes | Array of parts (text and/or inline data) |
| `contents[].parts[].inline_data` | Object | No | Base64-encoded image data |
| `contents[].parts[].inline_data.mime_type` | String | Yes (if inline_data) | `image/jpeg`, `image/png`, `image/webp`, `image/heic`, `image/heif` |
| `contents[].parts[].inline_data.data` | String | Yes (if inline_data) | Base64-encoded image bytes |
| `contents[].parts[].text` | String | No | Text prompt |
| `generationConfig` | Object | No | Configuration for generation |
| `generationConfig.temperature` | Float | No | 0.0-2.0, controls creativity |
| `generationConfig.maxOutputTokens` | Integer | No | Maximum tokens in response |
| `generationConfig.responseMimeType` | String | No | `text/plain` or `application/json` |
| `safetySettings` | Array | No | Content safety thresholds |

### Response Structure

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Response text here"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0,
      "safetyRatings": [...]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 258,
    "candidatesTokenCount": 150,
    "totalTokenCount": 408
  },
  "modelVersion": "gemini-2.0-flash"
}
```

### Response Fields

| Field | Description |
|-------|-------------|
| `candidates[].content.parts[].text` | The generated response |
| `candidates[].finishReason` | Why generation stopped (`STOP`, `MAX_TOKENS`, `SAFETY`, etc.) |
| `usageMetadata.promptTokenCount` | Input tokens used |
| `usageMetadata.candidatesTokenCount` | Output tokens used |
| `usageMetadata.totalTokenCount` | Total tokens used |

---

## Example Prompts for Wardrobe Analysis

### 1. Basic Clothing Categorization

```text
Analyze this clothing item and provide the following information in JSON format:
{
  "category": "one of: top, bottom, dress, outerwear, footwear, accessory",
  "subcategory": "specific type (e.g., t-shirt, jeans, blazer, sneakers)",
  "description": "brief description of the item"
}
```

### 2. Detailed Attribute Extraction

```text
Analyze this clothing item and extract the following attributes as JSON:
{
  "category": "main category",
  "subcategory": "specific type",
  "colors": ["primary color", "secondary colors"],
  "patterns": ["pattern names or 'solid'"],
  "material": "fabric material if visible",
  "style": "casual/formal/business/etc",
  "season": ["spring", "summer", "fall", "winter"],
  "occasion": ["work", "casual", "formal", "party", etc],
  "features": ["notable features like pockets, buttons, zippers"]
}
```

### 3. Outfit Suggestion Prompt

```text
Given this wardrobe item, suggest 3 outfit combinations. Return as JSON:
{
  "item": {
    "category": "...",
    "description": "..."
  },
  "outfits": [
    {
      "name": "outfit name",
      "items_needed": ["list of items to pair with"],
      "occasion": "suitable occasion",
      "style": "style description"
    }
  ]
}
```

### 4. Wardrobe Organization Prompt

```text
Analyze this clothing photo and provide wardrobe metadata:
{
  "item_id": "unique identifier suggestion",
  "name": "short descriptive name",
  "category": "wardrobe category",
  "tags": ["searchable tags"],
  "dominant_color": "hex code or color name",
  "care_instructions": "visible care symbols or inferred instructions",
  "condition": "new/good/fair if discernible"
}
```

### 5. Color Analysis Prompt

```text
Identify all colors in this clothing item and return:
{
  "dominant_color": {
    "name": "color name",
    "hex": "approximate hex code"
  },
  "accent_colors": [
    {"name": "...", "hex": "..."}
  ],
  "color_palette": ["list of all colors"],
  "color_combinations": ["suggested matching colors"]
}
```

---

## Rate Limits & Pricing

### Free Tier

The Gemini API offers a **generous free tier** perfect for development and small projects:

| Model | Requests Per Day (RPD) | Requests Per Minute (RPM) | Tokens Per Minute (TPM) |
|-------|------------------------|---------------------------|-------------------------|
| gemini-2.0-flash | 1,500 | 15 | 1,000,000 |
| gemini-2.0-flash-lite | 1,500 | 15 | 1,000,000 |
| gemini-2.5-flash | 500 | 10 | 250,000 |
| gemini-2.5-flash-lite | 500 | 10 | 250,000 |
| gemini-2.5-pro | Limited/Unavailable | - | - |

**Important Notes:**
- Free tier limits reset at **midnight Pacific Time (PT)**
- Rate limits are per **project**, not per API key
- Content may be used to improve Google's products (opt-out available in paid tier)
- Experimental/preview models have stricter limits

### Paid Tier Pricing

If you exceed free limits, upgrade to paid tier:

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| gemini-2.0-flash | $0.10 (text/image/video) | $0.40 |
| gemini-2.0-flash-lite | $0.075 | $0.30 |
| gemini-2.5-flash | $0.30 | $2.50 |
| gemini-2.5-pro | $1.25 (≤200K tokens) | $10.00 |

**Image Token Count:**
- Images are converted to tokens based on resolution
- Approximate: ~258 tokens for a standard clothing photo

### Upgrading to Paid Tier

1. Enable Cloud Billing on your Google Cloud project
2. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Click "Upgrade" next to your project
4. Rate limits increase automatically after verification

---

## Sample Code

### JavaScript/Node.js

```javascript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeClothing(imagePath) {
  // Read and encode image
  const imageBytes = fs.readFileSync(imagePath);
  const base64Image = imageBytes.toString("base64");
  
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const prompt = `Analyze this clothing item and provide the following as JSON:
  {
    "category": "one of: top, bottom, dress, outerwear, footwear, accessory",
    "subcategory": "specific type",
    "colors": ["primary", "secondary"],
    "pattern": "pattern or solid",
    "style": "casual/formal/etc",
    "season": ["spring", "summer", "fall", "winter"]
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image,
        },
      },
      { text: prompt },
    ],
    config: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  // Parse JSON response
  const result = JSON.parse(response.text);
  return result;
}

// Usage
analyzeClothing("./wardrobe/shirt.jpg")
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Python

```python
import os
import base64
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

def analyze_clothing(image_path):
    # Read image
    with open(image_path, 'rb') as f:
        image_bytes = f.read()
    
    prompt = """Analyze this clothing item and provide the following as JSON:
    {
        "category": "one of: top, bottom, dress, outerwear, footwear, accessory",
        "subcategory": "specific type",
        "colors": ["primary", "secondary"],
        "pattern": "pattern or solid",
        "style": "casual/formal/etc",
        "season": ["spring", "summer", "fall", "winter"]
    }"""

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type='image/jpeg',
            ),
            prompt
        ],
        config=types.GenerateContentConfig(
            response_mime_type='application/json',
            temperature=0.4,
        )
    )
    
    # Response is already JSON when responseMimeType is set
    import json
    return json.loads(response.text)

# Usage
result = analyze_clothing("./wardrobe/shirt.jpg")
print(result)
```

### cURL (REST API)

```bash
#!/bin/bash

API_KEY="YOUR_API_KEY"
IMAGE_PATH="./wardrobe/shirt.jpg"
MODEL="gemini-2.0-flash"

# Encode image to base64
if [[ "$(uname)" == "Darwin" ]]; then
    IMAGE_B64=$(base64 -i "$IMAGE_PATH")
else
    IMAGE_B64=$(base64 -w0 "$IMAGE_PATH")
fi

# Detect mime type
if [[ $IMAGE_PATH == *.png ]]; then
    MIME_TYPE="image/png"
elif [[ $IMAGE_PATH == *.webp ]]; then
    MIME_TYPE="image/webp"
else
    MIME_TYPE="image/jpeg"
fi

# Build request
curl "https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent" \
  -H "x-goog-api-key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{
    \"contents\": [{
      \"parts\":[
        {
          \"inline_data\": {
            \"mime_type\":\"${MIME_TYPE}\",
            \"data\": \"${IMAGE_B64}\"
          }
        },
        {\"text\": \"Analyze this clothing item and return JSON with category, colors, pattern, style, and season.\"}
      ]
    }],
    \"generationConfig\": {
      \"responseMimeType\": \"application/json\",
      \"temperature\": 0.4
    }
  }"
```

### React/Frontend Example

```javascript
async function analyzeWardrobeImage(file) {
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  
  // Convert file to base64
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });

  const base64Image = await toBase64(file);
  
  const requestBody = {
    contents: [{
      parts: [
        {
          inline_data: {
            mime_type: file.type,
            data: base64Image
          }
        },
        {
          text: `Analyze this clothing item and provide JSON:
          {
            "category": "wardrobe category",
            "subcategory": "specific type", 
            "colors": ["color1", "color2"],
            "pattern": "pattern description",
            "style": "style type",
            "season": ["applicable seasons"]
          }`
        }
      ]
    }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4
    }
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    }
  );

  const data = await response.json();
  
  if (data.candidates && data.candidates[0]) {
    return JSON.parse(data.candidates[0].content.parts[0].text);
  }
  
  throw new Error('Failed to analyze image');
}

// Usage with file input
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const analysis = await analyzeWardrobeImage(file);
  console.log(analysis);
};
```

---

## Best Practices

### Image Handling

1. **Supported Formats:** JPEG, PNG, WebP, HEIC, HEIF
2. **Size Limits:** 
   - Inline data: Total request < 20MB
   - File API: Up to 2GB per file
3. **Resolution:** Higher resolution = better detail recognition, but more tokens
4. **Compression:** Compress images before sending to reduce token usage

### Prompt Engineering

1. **Be Specific:** Clearly define the JSON structure you want
2. **Use Examples:** Include example values in prompts
3. **Set Temperature:** Use lower temperature (0.2-0.4) for consistent categorization
4. **Request JSON:** Use `responseMimeType: "application/json"` for structured output

### Error Handling

```javascript
const analyzeWithRetry = async (imagePath, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await analyzeClothing(imagePath);
    } catch (error) {
      if (error.message.includes('RATE_LIMIT_EXCEEDED') && i < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
};
```

### Rate Limit Management

```javascript
// Simple rate limiter
class RateLimiter {
  constructor(requestsPerMinute) {
    this.interval = 60000 / requestsPerMinute;
    this.lastRequest = 0;
  }

  async wait() {
    const now = Date.now();
    const elapsed = now - this.lastRequest;
    if (elapsed < this.interval) {
      await new Promise(r => setTimeout(r, this.interval - elapsed));
    }
    this.lastRequest = Date.now();
  }
}

const limiter = new RateLimiter(15); // 15 RPM for free tier

// Usage
await limiter.wait();
const result = await analyzeClothing(imagePath);
```

### Security Considerations

1. **Never expose API keys in client-side code** for production
2. Use a backend proxy to make API calls
3. Implement user authentication before processing images
4. Validate and sanitize image uploads

---

## Resources

- [Official Documentation](https://ai.google.dev/gemini-api/docs)
- [Image Understanding Guide](https://ai.google.dev/gemini-api/docs/image-understanding)
- [API Reference](https://ai.google.dev/api)
- [Pricing Details](https://ai.google.dev/gemini-api/docs/pricing)
- [Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Google AI Studio](https://aistudio.google.com/)

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `429 RATE_LIMIT_EXCEEDED` | Too many requests | Implement backoff, check limits |
| `400 INVALID_ARGUMENT` | Malformed request | Check JSON structure |
| `403 PERMISSION_DENIED` | Invalid API key | Verify key, check project permissions |
| `413 REQUEST_TOO_LARGE` | Image too large | Compress image, use File API |
| `500 INTERNAL_ERROR` | Server error | Retry with exponential backoff |

---

*This guide was created for the wardrobe photo upload feature. For questions or updates, refer to the official Google Gemini API documentation.*
