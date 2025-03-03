# 🔍 Kitchen Lens

An AI-powered web application that transforms how you interact with your kitchen. Simply snap a photo of your fridge, and let our advanced AI analyze its contents, providing detailed nutritional insights and food value estimations.

You can try it out [here](https://kitchen-lens.vercel.app/).

![Kitchen Lens Demo](public/demo.gif)

## ✨ Features

- 📸 Intuitive drag & drop image upload
- 🤖 Advanced AI food detection
- 📊 Comprehensive nutritional analysis
- 💰 Food value estimation
- 🎯 Real-time processing
- 📱 Responsive, modern interface
- 🧪 Test image available for quick demo

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Layer:** 
  - Tailwind CSS for styling
  - Shadcn UI components
  - Lucide icons for consistent iconography
- **AI Integration:**
  - Gemini 2.0-flash for image analysis (lite version is being used and is currently in preview/free)
  - Modular LLM architecture supporting multiple providers
- **Type Safety:** TypeScript with Zod schema validation
- **State Management:** React hooks with local state

## 🏗 Architecture & Implementation

### Tech Stack Rationale

I put a heavy focus on good end user experience with smooth onboarding. My main goal was to make this extremely simple to get started 
with which leads to decisions on what model I used and how the UI is setup

I always hate having to sign up for something just to try a demo. That's why I made this demo extremely simple to get started with 
including a test image that you can use to try it out without uploading anything.

#### AI Implementation
- **Google Gemini Model (2.0 flash lite)**: Selected for its:
  - Multimodal capabilities (image + text understanding)
  - Generous free tier
  - Structured output capabilities
  - Extremely fast inference times

#### Core Architecture
```typescript
// Modular LLM architecture supporting multiple providers
class LLM<T extends z.ZodSchema> {
  private model: ModelInterface<z.infer<T>>;

  constructor(config: LLMConfig<T>) {
    // Supports Gemini, with architecture ready for OpenAI and Anthropic
  }
}
```

### Technical Challenges & Solutions
1. **Vercel Serverless Function Limitations**
    - Deploying this application on the Vercel hobby tier is challenging because they impose a soft limit of 10 seconds on the serverless function. This is largely fine because the Gemini model is fast but this can be challenging for heavy images with
    lots of analysis
    - Solution: Currently I am setting the serverless function's timeout to hard limit of 60 seconds but that's the maximum allowed timeout. Anything more and either i will have to get the pro tier or deploy it myself on an EC2 instance

2. **AI Image Analysis**
    - The Gemini model is not perfect at image analysis. It can miss things that are hidden or obscured
    - Solution: Not letting perfect be the enemy of good. Any application that can immediatley benefit when the LLM gets better is
    in a good spot as the "upgrade" will be free. We can instruct users to upload clear photos and preprocess them

3. **Image Analysis Pipeline**
   - **Current Implementation**:
     - Direct file to base64 conversion. This works until a certain point
     - Structured response parsing with Zod
     - Type-safe analysis results
   - **Future Improvements**:
     - Image preprocessing to validate image is proper size, format and meets safety requirements
     - Response caching for repeated requests
     - Batch analysis support for multiple fridges/pantries
     - Backend integration with Supabase for persisting the images so we can use them for training set or debugging user issues


### Performance Features

Current:
- Memoized components to prevent unnecessary rerenders
- Next.js Image component optimization
- Lazy loading of analysis results
- Type-safe API responses

## 🗺 Roadmap

- [ ] Add bounding box canvas to show the detected food items
- [ ] Better classification for "other" items that could not be identified
- [ ] Integrate with APIs to get accurate price and nutrition information
- [ ] AI-powered recipe generation based on available ingredients
- [ ] Smart expiration date tracking
- [ ] Multi-image analysis support
- [ ] Social sharing features
- [ ] Dietary restrictions and allergen alerts

## 💻 Development

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn
- Google Gemini API key

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kitchen-lens.git
cd kitchen-lens
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file:
```env
GOOGLE_GEMINI_API_KEY=your_key_here
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app in action.

## 🐛 Debugging

### Common Analysis Issues

If you encounter "Failed to analyze image", here are the potential causes and solutions:

1. **API Key Issues**
   - Ensure your `GOOGLE_GEMINI_API_KEY` is correctly set in `.env.local` if developing locally
   - Verify the API key has access to Gemini 2.0 flash lite model
   - Check API key usage quotas in Google AI Studio

2. **Processing Timeout**
   - The analysis may fail if processing takes longer than 10 seconds (Vercel serverless function limit)
   - Solutions:
     - Try with a smaller image
     - Ensure good internet connectivity
     - Use the test image to verify if it's a timeout issue

3. **Image Issues**
   - Ensure the image is:
     - A clear photo of your fridge contents
     - In a supported format (JPG, PNG, WEBP)
     - Not corrupted or empty
     - Under 10MB in size

4. **Network Issues**
   - Check your internet connection
   - Verify you're not behind a restrictive firewall
   - Try disabling VPN if you're using one

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
