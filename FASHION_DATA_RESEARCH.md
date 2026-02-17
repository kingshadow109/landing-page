# Fashion Data Research

> Research on fashion categorization standards, image analysis best practices, and data sources for wardrobe management applications.

---

## 1. Clothing Taxonomy (Hierarchical Categories)

### 1.1 Top-Level Categories

Based on industry standards from fashion e-commerce and AI tagging systems:

```
Fashion
├── Clothing
├── Footwear
├── Accessories
├── Bags
├── Jewellery
├── Underwear
└── Watches
```

### 1.2 Detailed Subcategories

#### **Clothing**
| Category | Subcategories |
|----------|---------------|
| **Tops** | T-Shirts, Blouses, Shirts, Sweaters, Cardigans, Tank Tops, Crop Tops, Hoodies, Sweatshirts, Tunics, Bodysuits |
| **Bottoms** | Pants, Jeans, Shorts, Skirts, Leggings, Trousers, Culottes, Joggers |
| **Dresses** | Maxi Dresses, Midi Dresses, Mini Dresses, Cocktail Dresses, Evening Gowns, Sundresses, Shirt Dresses, Wrap Dresses |
| **Outerwear** | Jackets, Coats, Blazers, Vests, Raincoats, Trench Coats, Parkas, Denim Jackets, Leather Jackets |
| **Jumpsuits & Rompers** | Jumpsuits, Rompers, Overalls, Dungarees |
| **Activewear** | Sports Bras, Yoga Pants, Athletic Shorts, Gym Tops, Tracksuits |
| **Swimwear** | Bikinis, One-Piece Swimsuits, Swim Trunks, Cover-ups |
| **Sleepwear** | Pajamas, Nightgowns, Robes, Sleep Shirts, Loungewear |
| **Suits & Tailoring** | Business Suits, Tuxedos, Suit Separates, Vests |

#### **Footwear**
| Category | Subcategories |
|----------|---------------|
| **Sneakers & Casual** | Sneakers, Trainers, Slip-ons, Canvas Shoes |
| **Formal** | Oxfords, Derbies, Loafers, Pumps, Formal Shoes |
| **Boots** | Ankle Boots, Chelsea Boots, Knee-High Boots, Combat Boots, Hiking Boots, Snow Boots, Rain Boots |
| **Sandals** | Flat Sandals, Heeled Sandals, Flip-Flops, Gladiator Sandals, Slides |
| **Flats** | Ballerinas, Mary Janes, Espadrilles, Mules |
| **Heels** | Stilettos, Block Heels, Wedge Heels, Kitten Heels |
| **Specialty** | Crocs, Ski Boots, Slippers, Flip-Flops |

#### **Accessories**
| Category | Subcategories |
|----------|---------------|
| **Headwear** | Hats, Caps, Beanies, Berets, Bucket Hats, Sun Hats |
| **Eyewear** | Sunglasses, Reading Glasses, Blue Light Glasses |
| **Scarves & Wraps** | Scarves, Shawls, Pashminas, Bandanas |
| **Belts** | Leather Belts, Fabric Belts, Chain Belts, Waist Belts |
| **Gloves** | Winter Gloves, Leather Gloves, Fingerless Gloves, Mittens |
| **Ties & Accessories** | Neckties, Bow Ties, Pocket Squares, Suspenders |
| **Hair Accessories** | Headbands, Hair Clips, Scrunchies, Barrettes |

#### **Bags**
| Category | Subcategories |
|----------|---------------|
| **Handbags** | Tote Bags, Shoulder Bags, Crossbody Bags, Clutches, Hobo Bags, Satchels |
| **Backpacks** | Daypacks, Laptop Backpacks, Mini Backpacks |
| **Travel** | Luggage, Duffel Bags, Weekender Bags, Travel Totes |
| **Small Leather Goods** | Wallets, Card Holders, Coin Purses, Wristlets |
| **Specialty** | Belt Bags (Fanny Packs), Bucket Bags, Bucket Bags |

#### **Jewellery**
| Category | Subcategories |
|----------|---------------|
| **Necklaces** | Chains, Pendants, Chokers, Statement Necklaces |
| **Earrings** | Studs, Hoops, Dangles, Ear Cuffs, Huggies |
| **Bracelets** | Bangles, Cuffs, Chain Bracelets, Charm Bracelets |
| **Rings** | Statement Rings, Stackable Rings, Signet Rings |
| **Other** | Brooches, Pins, Cufflinks, Anklets |

---

## 2. Attribute Extraction Checklist

### 2.1 Core Attributes (Always Extract)

| Attribute | Possible Values | Notes |
|-----------|-----------------|-------|
| **Category** | From taxonomy above | Primary classification |
| **Subcategory** | Specific type | Secondary classification |
| **Color** | Primary, Secondary, Pattern colors | Use standardized color names |
| **Pattern** | Solid, Striped, Floral, Plaid, Polka Dot, Animal Print, Geometric, Abstract, Camouflage | |
| **Material/Fabric** | Cotton, Linen, Silk, Wool, Polyester, Denim, Leather, Suede, Velvet, Satin, Lace, Knit, Cashmere | Multiple possible |
| **Style** | Casual, Formal, Business, Sporty, Bohemian, Vintage, Minimalist, Streetwear, Preppy, Romantic | |

### 2.2 Extended Attributes (Extract When Visible)

#### **For Tops & Dresses**
| Attribute | Possible Values |
|-----------|-----------------|
| Sleeve Length | Sleeveless, Short, 3/4 Length, Long, Cap Sleeves |
| Neckline | Crew Neck, V-Neck, Scoop Neck, Turtleneck, Off-Shoulder, Halter, Sweetheart, Square |
| Fit | Slim, Regular, Relaxed, Oversized, Boxy |
| Length | Cropped, Regular, Long, Tunic Length |
| Closure | Pullover, Button-front, Zipper, Tie-front |

#### **For Bottoms**
| Attribute | Possible Values |
|-----------|-----------------|
| Rise | Low-rise, Mid-rise, High-rise, Ultra High-rise |
| Length | Short, Knee-length, Cropped, Ankle, Full Length |
| Fit | Skinny, Slim, Straight, Relaxed, Wide-leg, Bootcut, Flared |
| Style | Pleated, Cargo, Paperbag, Palazzo, Chino, Jogger |

#### **For Dresses**
| Attribute | Possible Values |
|-----------|-----------------|
| Silhouette | A-line, Sheath, Fit-and-Flare, Empire, Bodycon, Shift, Maxi, Midi, Mini |
| Occasion | Casual, Cocktail, Evening, Wedding, Beach, Work |

#### **For Footwear**
| Attribute | Possible Values |
|-----------|-----------------|
| Heel Height | Flat, Low (1-2"), Mid (2-3"), High (3-4"), Very High (4"+) |
| Heel Type | Stiletto, Block, Wedge, Kitten, Platform, Flat |
| Toe Shape | Round, Pointed, Almond, Square, Open, Peep-toe |
| Closure | Lace-up, Slip-on, Zipper, Buckle, Velcro |

#### **For Outerwear**
| Attribute | Possible Values |
|-----------|-----------------|
| Weight | Lightweight, Mid-weight, Heavyweight |
| Features | Hooded, Collared, Padded, Quilted, Waterproof, Windproof |
| Length | Cropped, Hip-length, Mid-thigh, Knee-length, Full-length |

### 2.3 Contextual Attributes

| Attribute | Possible Values | Use Case |
|-----------|-----------------|----------|
| **Season** | Spring, Summer, Fall, Winter, All-Season | Wardrobe planning |
| **Occasion** | Casual, Work/Office, Formal/Event, Party, Athletic, Beach, Travel | Outfit matching |
| **Gender** | Women's, Men's, Unisex, Kids | Filtering |
| **Age Group** | Baby, Kids, Teen, Adult, Senior | Age-appropriate |

---

## 3. Data Source Recommendations

### 3.1 Pinterest

**API Options:**
- **Pinterest API v5** (Official)
  - Requires business account approval
  - Rate limits: 1000 calls/hour for most endpoints
  - Supports: Pin creation, analytics, shopping catalogs
  - **Best for:** Content management, analytics, shopping integration
  - **Limitations:** No direct image search/scraping for fashion data

**Scraping Considerations:**
- Pinterest actively blocks scraping
- Would require proxy rotation and headless browsers
- Legal/ToS concerns for commercial use
- **Verdict:** Not recommended for data collection; use for content publishing only

### 3.2 Fashion Publications & Blogs

| Source | API Available | Content Type | Access Method |
|--------|---------------|--------------|---------------|
| **Vogue** | No | High-fashion editorials, runway | RSS feeds, manual curation |
| **The Cut** | No | Fashion news, street style | Web scraping (respect robots.txt) |
| **Who What Wear** | No | Trend reports, celebrity style | RSS, newsletter monitoring |
| **Business of Fashion** | Partial (paid) | Industry analysis | Paid subscription |
| **Hypebeast** | No | Streetwear, sneaker culture | RSS feeds |
| **Refinery29** | No | Accessible fashion, trends | RSS feeds |

**Recommendation:** Manual curation or RSS monitoring for trend inspiration; not suitable for bulk data extraction.

### 3.3 E-commerce Data Sources

| Source | API/Feed | Data Available | Terms |
|--------|----------|----------------|-------|
| **Shopify Stores** | Storefront API | Product catalogs, images | Per-store permission |
| **Amazon Product API** | PA API | Product details, images | Requires approval |
| **Farfetch** | Partner API (invite-only) | Luxury fashion | Restricted access |
| **ASOS** | No public API | Trendy fashion | Scraping restricted |
| **Zalando** | No public API | European fashion | Scraping restricted |

### 3.4 Fashion AI/ML Datasets

| Dataset | Description | Access |
|---------|-------------|--------|
| **DeepFashion** | 800K+ images, 50 categories, 1000 attributes | Academic/research |
| **Fashion-MNIST** | 70K grayscale images, 10 categories | Public domain |
| **StreetStyle** | Real-world street fashion images | Research use |
| **Polyvore Outfits** | Outfit combinations and compatibility | Academic |
| **FashionGen** | Synthetic fashion images with attributes | Research |

### 3.5 Recommended Approach for Wardrobe App

1. **Primary:** User-uploaded images with AI analysis
2. **Secondary:** Partner with affiliate networks (CJ, Rakuten) for product data
3. **Trend Data:** Manual curation from fashion publications
4. **Inspiration:** Pinterest API for content publishing (not data extraction)

---

## 4. AI Image Analysis Best Practices

### 4.1 Image Preprocessing

```
Input Image → Background Removal → Standardization → AI Analysis
```

**Requirements:**
- Minimum resolution: 512x512px for reliable attribute detection
- Format: JPG/PNG with good lighting
- Background: Neutral or removed for best results
- Angle: Front-facing for clothing, 45° for shoes/accessories

### 4.2 Example Prompts for AI Image Analysis

#### **Prompt 1: Comprehensive Clothing Analysis**

```
You are a fashion expert analyzing clothing items. Analyze the attached image and provide a structured analysis with the following fields:

1. CATEGORY: Primary clothing category (tops/bottoms/dresses/outerwear/etc.)
2. SUBCATEGORY: Specific type (t-shirt/blouse/jeans/skirt/etc.)
3. COLORS: List all visible colors (primary, secondary, accents)
4. PATTERN: Pattern type (solid/striped/floral/plaid/etc.)
5. MATERIAL: Visible fabric type if detectable
6. STYLE: Overall aesthetic (casual/formal/bohemian/minimalist/etc.)
7. KEY_FEATURES: Notable details (ruffles, pockets, buttons, zippers, embroidery)
8. SLEEVE_TYPE: For tops/dresses (sleeveless/short/3-4/long)
9. NECKLINE: For tops/dresses (crew/v-neck/scoop/etc.)
10. LENGTH: Item length (cropped/regular/long/maxi/mini/midi)
11. FIT: Silhouette (slim/regular/relaxed/oversized)
12. SEASON: Appropriate season (spring/summer/fall/winter/all)
13. OCCASION: Suitable occasions (casual/work/formal/party)

Respond in JSON format with confidence scores (0-1) for each attribute.
```

#### **Prompt 2: Quick Categorization**

```
Analyze this clothing image and categorize it:
- Main category: [select from: tops, bottoms, dresses, outerwear, footwear, accessories]
- Subcategory: [be specific: t-shirt, jeans, blazer, etc.]
- Dominant color: [single color name]
- Pattern: [solid/striped/floral/plaid/polka dot/other/none]
- Style vibe: [casual/formal/athletic/bohemian/minimalist]

Keep responses concise and consistent.
```

#### **Prompt 3: Outfit Compatibility Analysis**

```
You are a personal stylist. Given images of multiple clothing items, analyze:

1. COMPATIBILITY_SCORE: How well do these items work together (0-100)?
2. COLOR_HARMONY: Analyze color relationships (complementary/analogous/monochromatic/clashing)
3. STYLE_COHESION: Do the styles match?
4. OCCASION_MATCH: What occasions suit this combination?
5. SEASONAL_FIT: Appropriate seasons
6. STYLING_SUGGESTIONS: 2-3 ways to improve or accessorize
7. MISSING_PIECES: What would complete this outfit?

Provide constructive, practical fashion advice.
```

#### **Prompt 4: Wardrobe Metadata Extraction**

```
Extract wardrobe management metadata from this clothing image:

ITEM_PROFILE:
- category: [taxonomy category]
- subcategory: [specific type]
- attributes: {
    color_primary: "",
    color_secondary: "",
    pattern: "",
    material: "",
    sleeve_length: "",
    neckline: "",
    fit: "",
    length: ""
  }
- tags: [array of searchable tags]
- season: [spring/summer/fall/winter/all]
- occasion: [casual/work/formal/athletic/special]
- care_complexity: [low/medium/high based on material/style]
- versatility_score: [1-10, how many outfit combinations possible]

Format as clean JSON.
```

### 4.3 Confidence Scoring

Implement confidence thresholds for AI predictions:

| Confidence | Action |
|------------|--------|
| 0.90+ | Auto-accept attribute |
| 0.70-0.89 | Suggest to user for confirmation |
| 0.50-0.69 | Flag for manual review |
| <0.50 | Require manual input |

### 4.4 Handling Edge Cases

| Scenario | Strategy |
|----------|----------|
| Poor lighting | Request retake or flag for manual review |
| Multiple items | Ask user to select primary item or analyze separately |
| Unusual angles | Use "pose normalization" or request standard angle |
| Rare/vintage items | Fallback to broad categories with "vintage" tag |
| Accessories on clothing | Distinguish between attached vs. separate items |

---

## 5. Wardrobe Management App Best Practices

### 5.1 Core Features (Industry Standard)

Based on analysis of top apps (Stylebook, Acloset, Whering, Indyx):

| Feature | Priority | Description |
|---------|----------|-------------|
| **Photo Upload** | Critical | Easy image capture with auto background removal |
| **Auto-Categorization** | Critical | AI-powered category and attribute detection |
| **Manual Editing** | Critical | User correction of AI predictions |
| **Outfit Builder** | High | Visual outfit combination tool |
| **Wear Tracking** | High | Log when items are worn |
| **Search & Filter** | High | By category, color, occasion, season, etc. |
| **Outfit Suggestions** | Medium | AI-generated outfit ideas |
| **Packing Lists** | Medium | Generate travel wardrobes |
| **Cost-per-Wear** | Medium | Calculate value metrics |
| **Shopping Integration** | Low | Suggest complementary items |

### 5.2 User Onboarding Flow

```
1. Account Creation
   ↓
2. Quick Tutorial (3-5 screens)
   ↓
3. Upload First Item (guided)
   - Take photo or upload
   - AI analyzes
   - User confirms/edits
   ↓
4. Create First Outfit (optional)
   ↓
5. Set Preferences (style, climate, lifestyle)
```

### 5.3 Data Model Recommendations

```javascript
// Item Schema
{
  id: string,
  userId: string,
  images: [{
    url: string,
    type: 'main' | 'detail' | 'flatlay'
  }],
  category: {
    primary: string,      // from taxonomy
    subcategory: string,
    confidence: number
  },
  attributes: {
    colors: [{ name: string, hex: string, type: 'primary'|'secondary' }],
    pattern: { type: string, confidence: number },
    material: [{ type: string, confidence: number }],
    style: [string],
    season: [string],
    occasion: [string],
    // Item-specific
    sleeveLength?: string,
    neckline?: string,
    fit?: string,
    length?: string,
    rise?: string,
    heelHeight?: string,
    // ...etc
  },
  metadata: {
    brand: string,
    size: string,
    purchaseDate: date,
    price: number,
    careInstructions: string
  },
  usage: {
    wearCount: number,
    lastWorn: date,
    costPerWear: number
  },
  tags: [string],
  createdAt: date,
  updatedAt: date
}
```

### 5.4 Performance Optimization

| Strategy | Implementation |
|----------|----------------|
| **Lazy Loading** | Load wardrobe items on scroll |
| **Image Optimization** | WebP format, multiple sizes |
| **Offline Support** | Cache wardrobe data locally |
| **Batch Processing** | Process multiple uploads together |
| **Smart Sync** | Sync only changed items |

---

## 6. Summary & Recommendations

### For MVP Development:

1. **Taxonomy:** Start with 5 main categories (Tops, Bottoms, Dresses, Outerwear, Shoes) and 5-10 subcategories each
2. **Attributes:** Focus on Color, Pattern, Material, Style, Season, Occasion
3. **AI Analysis:** Use vision-language models (GPT-4V, Claude, Gemini) with structured prompts
4. **Data Sources:** Rely on user uploads initially; add trend data later
5. **UX Priority:** Fast upload → accurate auto-tagging → easy manual correction

### Key Success Factors:

- **Accuracy over completeness** - Better to have fewer attributes that are correct
- **User control** - Always allow manual override of AI predictions
- **Speed** - Image analysis should complete in <3 seconds
- **Feedback loop** - Use corrections to improve AI models

---

*Document created: February 2025*
*Sources: Pixyle AI, Ximilar Fashion API, Pinterest Developers, Fashion AI research papers, Wardrobe app industry analysis*
