import { useState } from 'react';

function ProductCard({ product, onAdd }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0].size); // Default to first size

    // Get the stock for the currently selected size
    const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
    const currentStock = selectedSizeObj ? selectedSizeObj.stock : 0;
    const isSoldOut = currentStock === 0;
    const isLowStock = currentStock > 0 && currentStock <= 3;

    const handleAddToCart = () => {
        onAdd(product, selectedSize);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden relative group animate-fade-in-up hover:border-blue-500/50 card-hover transition-colors duration-300">
            {/* Low Stock Indicator */}
            {isLowStock && (
                <div className="absolute top-3 left-3 bg-orange-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10 uppercase tracking-wide shadow-lg animate-glow-pulse">
                    Low Stock
                </div>
            )}

            {/* Product Image */}
            <div className="aspect-square bg-white dark:bg-zinc-900 relative overflow-hidden transition-colors">
                {product.images && product.images.length > 0 ? (
                    <>
                        {/* Main Image (Top View) */}
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                        />
                        {/* Secondary Image (Back View) - distinct on hover */}
                        {product.images[1] && (
                            <img
                                src={product.images[1]}
                                alt={`${product.name} Back View`}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                            />
                        )}
                    </>
                ) : (
                    /* Fallback Icon for Products without images (e.g. Chocolate Tee) */
                    <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-all duration-300 text-zinc-400 dark:text-zinc-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </div>
                )}

                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer pointer-events-none mix-blend-overlay"></div>
            </div>

            {/* Product Details */}
            <div className="p-4">
                {/* Edition Badge */}
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <p className="text-xs text-blue-400 uppercase tracking-wider font-semibold">
                        {product.edition}
                    </p>
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-sm uppercase tracking-wide mb-1 text-zinc-900 dark:text-zinc-100 leading-tight transition-colors">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                    <p className="text-xs text-zinc-500 font-medium transition-colors">Price</p>
                    <span className="text-xl font-black text-zinc-900 dark:text-white transition-colors">RM {product.price.toFixed(2)}</span>
                </div>

                {/* Size Selection */}
                <div className="mb-4">
                    <p className="text-xs text-zinc-500 font-medium mb-2 transition-colors">Select Size</p>
                    <div className="flex gap-2 flex-wrap">
                        {product.sizes.map(sizeObj => (
                            <button
                                key={sizeObj.size}
                                onClick={() => setSelectedSize(sizeObj.size)}
                                disabled={sizeObj.stock === 0}
                                className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedSize === sizeObj.size
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : sizeObj.stock === 0
                                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                            >
                                {sizeObj.size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stock Info for Selected Size */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${isSoldOut
                        ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30'
                        : isLowStock
                            ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30'
                            : 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/30'
                        }`}>
                        {currentStock} {currentStock === 1 ? 'Left' : 'Left'}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isSoldOut}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${isSoldOut
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 neon-blue-hover btn-press'
                        }`}
                >
                    {isSoldOut ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m15 9-6 6" />
                                <path d="m9 9 6 6" />
                            </svg>
                            Out of Stock
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                            </svg>
                            Add to Cart
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
