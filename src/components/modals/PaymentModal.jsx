import { useState, useEffect } from 'react';

function PaymentModal({ total, onClose, onComplete }) {
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'card'
    const [cashAmount, setCashAmount] = useState('');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    // Predefined quick cash options for faster checkout
    const quickCashOptions = [
        Math.ceil(total),
        Math.ceil(total / 10) * 10,
        Math.ceil(total / 50) * 50,
        100
    ].filter((val, index, self) => val >= total && self.indexOf(val) === index).sort((a, b) => a - b);

    // Filter duplicates and amounts smaller than total

    // --- Card Input Formatters ---
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }
        return v;
    };

    const handleCardInput = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            // Remove old spaces to re-group
            const raw = value.replace(/\s+/g, '');
            if (raw.length > 16) return; // Max 16 digits
            formattedValue = formatCardNumber(raw);
        } else if (name === 'expiry') {
            const raw = value.replace('/', '');
            if (raw.length > 4) return;
            formattedValue = formatExpiry(raw);
        } else if (name === 'cvc') {
            if (value.length > 4) return;
        }

        setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    };

    // --- Payment Handlers ---

    const handleCashPayment = () => {
        const tendered = parseFloat(cashAmount);
        if (isNaN(tendered) || tendered < total) {
            setError('Insufficient amount tendered.');
            return;
        }
        setError('');
        setIsProcessing(true);

        // Simulate processing delay
        setTimeout(() => {
            onComplete({
                method: 'Cash',
                tendered: tendered,
                change: tendered - total
            });
        }, 800);
    };

    const handleCardPayment = (e) => {
        e.preventDefault();
        // Basic Validation
        if (cardDetails.number.replace(/\s/g, '').length !== 16 ||
            cardDetails.expiry.length !== 5 ||
            cardDetails.cvc.length < 3 ||
            !cardDetails.name) {
            setError('Please check card details.');
            return;
        }

        setError('');
        setIsProcessing(true);

        // Simulate network request
        setTimeout(() => {
            onComplete({
                method: 'Credit Card',
                cardLast4: cardDetails.number.slice(-4),
                cardHolder: cardDetails.name
            });
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 z-50 animate-slide-in">
            <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors">

                {/* Header */}
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                    <div>
                        <h2 className="text-xl font-bold tracking-wider uppercase">Payment</h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Amount Due</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">RM {total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Method Selection */}
                <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800">
                    <button
                        onClick={() => { setPaymentMethod('cash'); setError(''); }}
                        className={`p-4 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all ${paymentMethod === 'cash'
                                ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-[inset_0_-2px_0_0_#2563eb]'
                                : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01" /><path d="M18 12h.01" /></svg>
                        Cash
                    </button>
                    <button
                        onClick={() => { setPaymentMethod('card'); setError(''); }}
                        className={`p-4 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all ${paymentMethod === 'card'
                                ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-[inset_0_-2px_0_0_#2563eb]'
                                : 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                        Card Payment
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 min-h-[300px]">
                    {isProcessing ? (
                        <div className="h-full flex flex-col items-center justify-center py-12 space-y-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 border-4 border-zinc-200 dark:border-zinc-800 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="font-bold text-zinc-600 dark:text-zinc-300 animate-pulse">
                                {paymentMethod === 'cash' ? 'Calculating Change...' : 'Contacting Bank...'}
                            </p>
                        </div>
                    ) : (
                        <>
                            {paymentMethod === 'cash' ? (
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Amount Tendered</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">RM</span>
                                            <input
                                                type="number"
                                                value={cashAmount}
                                                onChange={(e) => setCashAmount(e.target.value)}
                                                autoFocus
                                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-2xl font-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Cash Options */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {quickCashOptions.map(amt => (
                                            <button
                                                key={amt}
                                                onClick={() => setCashAmount(amt.toString())}
                                                className="py-2 px-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-bold transition-all text-zinc-600 dark:text-zinc-300"
                                            >
                                                RM {amt}
                                            </button>
                                        ))}
                                    </div>

                                    {cashAmount && !isNaN(cashAmount) && (
                                        <div className={`p-4 rounded-xl border ${parseFloat(cashAmount) >= total
                                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30'
                                                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30'
                                            }`}>
                                            <div className="flex justify-between items-center">
                                                <span className={`text-sm font-bold ${parseFloat(cashAmount) >= total ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    {parseFloat(cashAmount) >= total ? 'Change Due' : 'Still Due'}
                                                </span>
                                                <span className={`text-xl font-black ${parseFloat(cashAmount) >= total ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    RM {Math.abs(parseFloat(cashAmount) - total).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <form onSubmit={handleCardPayment} className="space-y-4 animate-fade-in-up">
                                    {/* Card Preview */}
                                    <div className="w-full aspect-[1.586] bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-xl p-6 text-white shadow-xl relative overflow-hidden mb-6 group transition-all duration-500 hover:scale-[1.02]">
                                        <div className="absolute top-0 right-0 p-6 opacity-20">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                        </div>
                                        <div className="flex flex-col justify-between h-full relative z-10">
                                            <div className="flex justify-between items-start">
                                                <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-md shadow-sm"></div>
                                                <span className="font-mono text-sm opacity-50">CREDIT</span>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="font-mono text-xl tracking-widest shadow-black drop-shadow-md">
                                                    {cardDetails.number || '•••• •••• •••• ••••'}
                                                </p>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[10px] uppercase opacity-50 mb-0.5">Card Holder</p>
                                                        <p className="font-medium tracking-wider uppercase text-sm truncate max-w-[180px]">
                                                            {cardDetails.name || 'YOUR NAME'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase opacity-50 mb-0.5">Expires</p>
                                                        <p className="font-mono text-sm">{cardDetails.expiry || 'MM/YY'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Shimmer */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <input
                                                name="number"
                                                type="text"
                                                value={cardDetails.number}
                                                onChange={handleCardInput}
                                                placeholder="Card Number"
                                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-mono"
                                                maxLength="19"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                name="name"
                                                type="text"
                                                value={cardDetails.name}
                                                onChange={handleCardInput}
                                                placeholder="Card Holder Name"
                                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm uppercase"
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    name="expiry"
                                                    type="text"
                                                    value={cardDetails.expiry}
                                                    onChange={handleCardInput}
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-mono"
                                                    maxLength="5"
                                                />
                                                <input
                                                    name="cvc"
                                                    type="password"
                                                    value={cardDetails.cvc}
                                                    onChange={handleCardInput}
                                                    placeholder="CVC"
                                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-mono"
                                                    maxLength="4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg flex items-center gap-2 animate-slide-in">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isProcessing}
                        className="flex-1 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={paymentMethod === 'cash' ? handleCashPayment : (e) => handleCardPayment(e)}
                        disabled={isProcessing}
                        className="flex-[2] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        {isProcessing ? 'Processing...' : `Pay RM ${total.toFixed(2)}`}
                        {!isProcessing && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;
