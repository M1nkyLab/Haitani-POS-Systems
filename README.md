<<<<<<< HEAD
# Haitani-POS-Systems
=======
# HAITANI EMPIRE - POS System

A production-ready Point of Sale system for premium streetwear with real-time inventory tracking, cart management, and digital receipt generation.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/))

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Features

- **Real-time Inventory Tracking** - Stock counters update live as items are added/removed
- **Smart Cart Management** - Group identical items, increase/decrease quantities
- **Stock Refund Logic** - Removing items refunds stock to inventory
- **Digital Receipt Generation** - Professional receipts with order ID, date/time, and totals
- **Sold Out Detection** - Automatic disabling of out-of-stock items
- **Dark Cyber-Streetwear Theme** - Premium UI optimized for iPad/tablet and desktop

## 📦 Tech Stack

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite and deploy
5. Get your live link: `https://your-project.vercel.app`

### Alternative: Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to netlify.com/drop
```

## 🧪 Testing the Stock Logic

1. **Initial State:** Product #5 (Jersey L) shows "SOLD OUT"
2. **Add to Cart:** Stock decrements on add
3. **Remove from Cart:** Stock refunds back
4. **Checkout:** Generates receipt with transaction details
5. **New Transaction:** Clears cart, keeps stock deducted

## 📄 License

Built for HAITANI EMPIRE © 2026
>>>>>>> 18fdc4f (First update)
