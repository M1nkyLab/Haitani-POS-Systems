export const initialProducts = [
    {
        id: 1,
        name: "HAITANI BLACK TEE",
        edition: "Black Edition",
        price: 69.99,
        image: "/products/Black-Tee-top.png", // Main single image reference (optional)
        images: [
            "/products/Black-Tee-top.png",  // View 1 (Default)
            "/products/Black-Tee-Back.png"  // View 2 (Hover)
        ],
        sizes: [
            { size: "M", stock: 123 },
            { size: "L", stock: 123 },
            { size: "XL", stock: 123 },
            { size: "2XL", stock: 123 },
            { size: "3XL", stock: 123 },
        ]
    },
    {
        id: 2,
        name: "HAITANI CHOCOLATE TEE",
        edition: "Chocolate Edition",
        price: 69.99,
        image: "/products/Chocolate-Tee-Front.png",
        images: [
            "/products/Chocolate-Tee-Front.png",
            "/products/Chocolate-Tee-Back.png"
        ],
        sizes: [
            { size: "M", stock: 123 },
            { size: "L", stock: 123 },
            { size: "XL", stock: 123 },
            { size: "2XL", stock: 123 },
            { size: "3XL", stock: 123 },
        ]
    },
];
