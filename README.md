# FlowList — Modern Task Management

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2+-61DAFB.svg?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-5.0+-3178C6.svg?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-5.0+-646CFF.svg?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwind-3.4+-06B6D4.svg?logo=tailwindcss&logoColor=white)

FlowList is a polished, production-ready task management application designed for focus and productivity. Built with modern web technologies, it features a clean, responsive interface, dark mode support, and robust task management capabilities.

![FlowList Demo](https://placehold.co/800x450/1e293b/ffffff?text=FlowList+Demo+Preview)

## ✨ Features

- **Intuitive Task Management**: Create, edit, and organize tasks with ease.
- **Priority System**: Categorize tasks by Low, Medium, or High priority.
- **Smart Filtering**: Quickly view Active, Completed, or High Priority tasks.
- **Dark Mode**: Fully supported system-aware dark mode for comfortable viewing.
- **Local Persistence**: Tasks and preferences are saved automatically to your device.
- **Responsive Design**: Flawless experience on desktop, tablet, and mobile.
- **Keyboard Shortcuts**: 'Enter' to save, 'Esc' to cancel edits.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Utilities**: clsx / tailwind-merge
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/flow-list.git
   cd flow-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Log in to Vercel and "Import Project".
3. Select your repository.
4. Framework Preset should automatically detect "Vite".
5. Click **Deploy**.

**Note**: A `vercel.json` is included to handle Single Page Application (SPA) routing.

## 📂 Project Structure

```
flow-list/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Primitive components (Button, Input, etc.)
│   ├── hooks/           # Custom React hooks (useTasks, useTheme)
│   ├── types/           # shared TypeScript interfaces
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main application layout
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ...config files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Your Name]
