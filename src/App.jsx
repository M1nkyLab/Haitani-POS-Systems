import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import ProductCard from './components/products/ProductCard'
import CartItem from './components/cart/CartItem'
import ReceiptModal from './components/modals/ReceiptModal'
import PaymentModal from './components/modals/PaymentModal'
import { initialProducts } from './data/products'

function App() {
    const [products, setProducts] = useState(initialProducts);
    const [cart, setCart] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(true);

    // Handle Dark Mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Filter products based on search query
    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.edition.toLowerCase().includes(query)
        );
    });

    // Add item to cart and decrease stock for specific size
    const addToCart = (product, selectedSize) => {
        // Find the size object
        const sizeObj = product.sizes.find(s => s.size === selectedSize);
        if (!sizeObj || sizeObj.stock <= 0) return;

        // Update product stock for the specific size
        setProducts(prev => prev.map(p =>
            p.id === product.id
                ? {
                    ...p,
                    sizes: p.sizes.map(s =>
                        s.size === selectedSize ? { ...s, stock: s.stock - 1 } : s
                    )
                }
                : p
        ));

        // Add to cart or increment quantity
        setCart(prev => {
            const cartKey = `${product.id}-${selectedSize}`;
            const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.selectedSize === selectedSize)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, selectedSize, quantity: 1, cartKey }];
        });
    };

    // Increase quantity in cart
    const increaseQuantity = (cartItem) => {
        const product = products.find(p => p.id === cartItem.id);
        const sizeObj = product.sizes.find(s => s.size === cartItem.selectedSize);
        if (!sizeObj || sizeObj.stock <= 0) return;

        setProducts(prev => prev.map(p =>
            p.id === cartItem.id
                ? {
                    ...p,
                    sizes: p.sizes.map(s =>
                        s.size === cartItem.selectedSize ? { ...s, stock: s.stock - 1 } : s
                    )
                }
                : p
        ));

        setCart(prev => prev.map(item =>
            (item.id === cartItem.id && item.selectedSize === cartItem.selectedSize)
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    // Decrease quantity in cart
    const decreaseQuantity = (cartItem) => {
        setProducts(prev => prev.map(p =>
            p.id === cartItem.id
                ? {
                    ...p,
                    sizes: p.sizes.map(s =>
                        s.size === cartItem.selectedSize ? { ...s, stock: s.stock + 1 } : s
                    )
                }
                : p
        ));

        setCart(prev => {
            const item = prev.find(i => i.id === cartItem.id && i.selectedSize === cartItem.selectedSize);
            if (item.quantity === 1) {
                return prev.filter(i => !(i.id === cartItem.id && i.selectedSize === cartItem.selectedSize));
            }
            return prev.map(i =>
                (i.id === cartItem.id && i.selectedSize === cartItem.selectedSize)
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            );
        });
    };

    // Remove item from cart completely
    const removeFromCart = (cartItem) => {
        // Refund all stock
        setProducts(prev => prev.map(p =>
            p.id === cartItem.id
                ? {
                    ...p,
                    sizes: p.sizes.map(s =>
                        s.size === cartItem.selectedSize ? { ...s, stock: s.stock + cartItem.quantity } : s
                    )
                }
                : p
        ));

        setCart(prev => prev.filter(i => !(i.id === cartItem.id && i.selectedSize === cartItem.selectedSize)));
    };


    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = 0; // 0% tax
    const total = subtotal + tax;

    // Proceed to checkout
    const handleCheckout = () => {
        if (cart.length === 0) return;
        setShowPayment(true);
    };

    // Handle Payment Completion
    const handlePaymentComplete = (paymentDetails) => {
        const orderId = `HE-${Math.floor(100 + Math.random() * 900)}`;
        const now = new Date();

        setReceiptData({
            orderId,
            date: now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            items: [...cart],
            subtotal,
            tax,
            total,
            payment: paymentDetails
        });

        setShowPayment(false);
        setShowReceipt(true);
    };

    // New transaction
    const handleNewTransaction = () => {
        setCart([]);
        setShowReceipt(false);
        setReceiptData(null);
    };

    // Clear cart and refund stock
    const handleClearCart = () => {
        cart.forEach(item => {
            setProducts(prev => prev.map(p =>
                p.id === item.id ? { ...p, stock: p.stock + item.quantity } : p
            ));
        });
        setCart([]);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
            {/* Header */}
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto">
                {/* Left Panel - Products */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200 transition-colors">Product</h2>

                        {/* Search Bar */}
                        <div className="relative w-full sm:w-80">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500 transition-colors">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products, edition, size..."
                                className="w-full pl-12 pr-10 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m15 9-6 6" />
                                        <path d="m9 9 6 6" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Count */}
                    {searchQuery && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 transition-colors">
                            Found <span className="font-bold text-blue-600 dark:text-blue-400">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                    )}

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={addToCart}
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-700 mb-4 transition-colors">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                                <p className="text-zinc-600 dark:text-zinc-500 font-semibold mb-2 transition-colors">No products found</p>
                                <p className="text-zinc-500 dark:text-zinc-600 text-sm transition-colors">Try adjusting your search query</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Cart */}
                <div className="w-full lg:w-[420px] bg-white dark:bg-zinc-900 border-t lg:border-l border-zinc-200 dark:border-zinc-800 flex flex-col lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] transition-colors duration-300">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
                        <h2 className="text-xl font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200 transition-colors">Order Product</h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 transition-colors">
                            {cart.length} {cart.length === 1 ? 'item' : 'items'}
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-3">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-600 transition-colors">
                                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                        <path d="M3 6h18" />
                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                    </svg>
                                </div>
                                <p className="text-zinc-500 dark:text-zinc-500 font-medium transition-colors">Cart is empty</p>
                                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 transition-colors">Add items to get started</p>
                            </div>
                        ) : (
                            cart.map(item => {
                                const product = products.find(p => p.id === item.id);
                                const sizeStock = product?.sizes.find(s => s.size === item.selectedSize)?.stock || 0;

                                return (
                                    <CartItem
                                        key={item.cartKey || `${item.id}-${item.selectedSize}`}
                                        item={item}
                                        onIncrease={() => increaseQuantity(item)}
                                        onDecrease={() => decreaseQuantity(item)}
                                        onRemove={() => removeFromCart(item)}
                                        canIncrease={sizeStock > 0}
                                    />
                                );
                            })
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4 bg-white dark:bg-zinc-900 transition-colors">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500 dark:text-zinc-400 transition-colors">Subtotal</span>
                                <span className="font-semibold text-zinc-900 dark:text-white transition-colors">RM {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500 dark:text-zinc-400 transition-colors">Tax (0%)</span>
                                <span className="font-semibold text-zinc-900 dark:text-white transition-colors">RM {tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
                                <span className="text-zinc-900 dark:text-white transition-colors">TOTAL</span>
                                <span className="text-blue-600 dark:text-blue-400 transition-colors">RM {total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-zinc-200 disabled:to-zinc-200 disabled:dark:from-zinc-800 disabled:dark:to-zinc-800 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-600 text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 neon-blue-hover btn-press"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="14" x="2" y="5" rx="2" />
                                    <path d="M2 10h20" />
                                </svg>
                                Pay Now
                            </button>

                            {cart.length > 0 && (
                                <button
                                    onClick={handleClearCart}
                                    className="w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-gradient-to-r dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-700 dark:hover:to-zinc-600 text-zinc-600 dark:text-white font-medium py-3 px-6 rounded-lg uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 btn-press"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                                        <path d="M21 3v5h-5" />
                                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                                        <path d="M8 16H3v5" />
                                    </svg>
                                    Clear Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPayment && (
                <PaymentModal
                    total={total}
                    onClose={() => setShowPayment(false)}
                    onComplete={handlePaymentComplete}
                />
            )}

            {/* Receipt Modal */}
            {showReceipt && receiptData && (
                <ReceiptModal
                    data={receiptData}
                    onNewTransaction={handleNewTransaction}
                />
            )}
        </div>
    )
}

export default App
