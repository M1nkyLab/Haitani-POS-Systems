# Haitani POS System

A modern, responsive Point of Sale (POS) application built with React and Tailwind CSS. This system allows for streamlined product management, cart operations, and payment processing with a focus on clean UI/UX.

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

* **🛒 Dynamic Cart System**
    * Add items with specific size selection (M, L, XL, etc.).
    * Real-time stock validation (prevents adding more than available inventory).
    * Adjust quantities or remove items seamlessly.
* **🌑 Dark Mode Support**
    * Fully integrated toggle for Light/Dark themes.
    * Persists across the application UI.
* **🔍 Instant Search & Filtering**
    * Filter products by name or edition in real-time.
* **💳 Payment Simulation**
    * **Cash Payment:** Includes "Quick Cash" buttons and automatic change calculation.
    * **Card Payment:** Interactive card visualizer with simulated processing states.
* **receipt Digital Receipts**
    * Generates a detailed digital receipt upon transaction completion.
    * Includes Order ID, Timestamp, Itemized list, and Payment details.
* **📱 Responsive Design**
    * Optimized for both desktop terminals and tablet/mobile devices.

## 🛠️ Tech Stack

* **Frontend:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS 3
* **Icons:** Lucide React

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (v16.0.0 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/haitani-pos.git](https://github.com/yourusername/haitani-pos.git)
    cd haitani-pos
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```text
src/
├── components/
│   ├── cart/           # Cart item components
│   ├── layout/         # Header and main layout wrappers
│   ├── modals/         # Payment and Receipt modals
│   └── products/       # Product cards and displays
├── data/
│   └── products.js     # Initial product data and inventory
├── App.jsx             # Main application logic
├── main.jsx            # Entry point
└── index.css           # Tailwind directives
