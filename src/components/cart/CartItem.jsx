function CartItem({ item, onIncrease, onDecrease, onRemove, canIncrease }) {
    return (
        <div className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-4 animate-slide-in hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md duration-300">
            <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 flex-1">
                    {/* Product Image Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-200 dark:border-zinc-700/50">
                        {item.images && item.images.length > 0 ? (
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        ) : item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                    <path d="M3 6h18" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h4 className="font-bold text-sm uppercase tracking-wide text-zinc-900 dark:text-zinc-100 leading-tight mb-2 transition-colors">{item.name}</h4>
                        <div className="flex flex-col gap-1 text-xs">
                            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="3" rx="2" />
                                    <path d="M3 9h18" />
                                    <path d="M9 21V9" />
                                </svg>
                                Size: {item.selectedSize}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" x2="12" y1="2" y2="22" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                RM {item.price.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-500/10 dark:hover:bg-red-500/20 p-2 rounded-lg transition-all btn-press"
                    aria-label="Remove item"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                </button>
            </div>

            {/* Quantity Controls & Total */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700/50 transition-colors">
                <div className="flex items-center gap-3">
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide transition-colors">Quantity</p>
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-black/30 rounded-lg p-1 border border-zinc-200 dark:border-zinc-700 transition-colors">
                        <button
                            onClick={onDecrease}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-zinc-700 active:scale-95 transition-all text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white shadow-sm hover:shadow btn-press"
                            aria-label="Decrease quantity"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                            </svg>
                        </button>
                        <span className="w-10 text-center font-black text-base text-blue-600 dark:text-blue-400 transition-colors">{item.quantity}</span>
                        <button
                            onClick={onIncrease}
                            disabled={!canIncrease}
                            className={`w-8 h-8 flex items-center justify-center rounded-md transition-all btn-press ${canIncrease
                                ? 'hover:bg-white dark:hover:bg-zinc-700 active:scale-95 text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white shadow-sm hover:shadow'
                                : 'opacity-40 cursor-not-allowed text-zinc-400 dark:text-zinc-600'
                                }`}
                            aria-label="Increase quantity"
                            title={canIncrease ? "Increase quantity" : "No stock available"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Line Total */}
                <div className="text-right">
                    <p className="text-xs text-zinc-500 font-medium mb-0.5 transition-colors">Total</p>
                    <p className="font-black text-xl text-zinc-900 dark:text-white transition-colors">RM {(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>

            {/* Stock Warning */}
            {!canIncrease && (
                <div className="mt-3 flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-lg p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                    <span className="font-medium">No more stock available</span>
                </div>
            )}
        </div>
    );
}

export default CartItem;
