# mini tools box

A comprehensive collection of useful online tools and utilities built with React and Tailwind CSS. This project provides 15+ tools including generators, converters, analyzers, and more.

## 🚀 Features

### Core Tools

- **Random Quote Generator** - Get inspired with motivational quotes
- **Password Generator** - Generate secure passwords with customizable options
- **Image Resizer/Converter** - Resize and convert images to different formats
- **Color Picker** - Pick colors and get hex, RGB, HSL values
- **Unit Converter** - Convert between different units of measurement
- **Joke Generator** - Get random jokes to brighten your day

### Additional Tools

- **QR Code Generator** - Generate QR codes for text, URLs, and more
- **Text Counter** - Count words, characters, and analyze text
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **URL Shortener** - Shorten long URLs for easy sharing
- **Hash Generator** - Generate MD5, SHA1, SHA256, SHA512 hashes
- **JSON Formatter** - Format and validate JSON data
- **Regex Tester** - Test and debug regular expressions
- **Markdown Preview** - Preview and convert Markdown to HTML
- **Age Calculator** - Calculate age in years, months, and days

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Modern JavaScript** - ES6+ features

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mini-utility-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Follow the prompts** to connect your GitHub repository

### Option 2: Netlify

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

### Option 3: Firebase Hosting

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**

   ```bash
   firebase init hosting
   ```

3. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Option 4: GitHub Pages

1. **Install gh-pages**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**

   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Build and deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 💰 Monetization Features

The project includes placeholders for monetization:

- **Google AdSense** - Ad spaces throughout the app
- **Premium Features** - Advanced functionality for paid users
- **Affiliate Links** - Recommendations for related tools/services
- **Donation Buttons** - Support the project

## 🎨 Customization

### Adding New Tools

1. **Create tool component** in `src/tools/`
2. **Add tool data** to `src/data/tools.js`
3. **Import component** in `src/components/ToolRenderer.jsx`

### Styling

- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use Tailwind utility classes for component styling

### Configuration

- Update `vite.config.js` for build settings
- Modify `package.json` for dependencies and scripts

## 📱 Mobile Responsive

The app is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🔧 Development

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   ├── ToolGrid.jsx
│   ├── ToolModal.jsx
│   └── ToolRenderer.jsx
├── tools/              # Individual tool components
│   ├── QuoteGenerator.jsx
│   ├── PasswordGenerator.jsx
│   └── ...
├── data/               # Static data
│   └── tools.js
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter (if configured)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Built with [React](https://reactjs.org/)
- Bundled with [Vite](https://vitejs.dev/)

## 📞 Support

For support, email support@miniutilityhub.com or create an issue on GitHub.

---

**Happy coding! 🎉**
