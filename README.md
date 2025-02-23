# 🔍 Kitchen Lens

An AI-powered web application that transforms how you interact with your kitchen. Simply snap a photo of your fridge, and let our advanced AI analyze its contents, providing detailed nutritional insights and food value estimations.

You can try it out [here](https://kitchen-lens.vercel.app/).

![Demo](https://imgur.com/a/N90iN7s)

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
  - Lucide icons
- **AI Integration:**
  - Google Cloud Vision API
  - Gemini Pro for intelligent analysis
- **Type Safety:** TypeScript
- **Performance:** Server components & client boundaries

## 💻 Development

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn
- Google Cloud Vision API key
- Gemini Pro API key

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
GOOGLE_CLOUD_VISION_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app in action.

## 🗺 Roadmap

- [ ] AI-powered recipe generation based on available ingredients
- [ ] Smart expiration date tracking
- [ ] Automated shopping list creation
- [ ] Multi-image analysis support
- [ ] Nutritional insights dashboard
- [ ] Meal planning assistant
- [ ] Social sharing features
- [ ] Dietary restrictions and allergen alerts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with 💻 and ❤️ by the Kitchen Lens team
