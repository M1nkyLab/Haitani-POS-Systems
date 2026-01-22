function ReceiptModal({ data, onNewTransaction }) {
    // Function to download receipt as HTML
    const downloadReceipt = () => {
        const receiptHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt - Order #${data.orderId}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            background: #f5f5f5;
            padding: 40px 20px;
        }
        .receipt {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 32px;
            font-weight: 900;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }
        .header p {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #666;
            font-weight: 600;
        }
        .info-section {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .info-row:last-child {
            margin-bottom: 0;
        }
        .info-label {
            font-weight: 600;
            color: #555;
        }
        .info-value {
            font-weight: 500;
            font-family: 'Courier New', monospace;
        }
        .items-section {
            border-top: 2px dashed #ddd;
            border-bottom: 2px dashed #ddd;
            padding: 25px 0;
            margin-bottom: 30px;
        }
        .items-title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
            color: #333;
        }
        .item {
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #e5e5e5;
        }
        .item:last-child {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .item-name {
            font-weight: 600;
            font-size: 14px;
        }
        .item-total {
            font-weight: 700;
            font-size: 14px;
        }
        .item-size {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }
        .item-details {
            font-size: 12px;
            color: #888;
        }
        .totals-section {
            margin-bottom: 40px;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .total-row.grand-total {
            font-size: 24px;
            font-weight: 900;
            padding-top: 15px;
            border-top: 3px solid #000;
            margin-top: 15px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            padding-top: 30px;
            border-top: 1px solid #ddd;
        }
        .footer p {
            margin-bottom: 8px;
        }
        .footer .thank-you {
            font-weight: 600;
            color: #000;
        }
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .receipt {
                box-shadow: none;
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h1>HAITANI EMPIRE</h1>
            <p>Streetwear Excellence</p>
        </div>
        
        <div class="info-section">
            <div class="info-row">
                <span class="info-label">Order ID:</span>
                <span class="info-value">#${data.orderId}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date:</span>
                <span class="info-value">${data.date}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Time:</span>
                <span class="info-value">${data.time}</span>
            </div>
        </div>
        
        <div class="items-section">
            <div class="items-title">Items Purchased</div>
            ${data.items.map(item => `
                <div class="item">
                    <div class="item-header">
                        <div>
                            <div class="item-name">${item.name}</div>
                            <div class="item-size">Size: ${item.selectedSize || item.size}</div>
                        </div>
                        <div class="item-total">RM ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div class="item-details">
                        RM ${item.price.toFixed(2)} × ${item.quantity} ${item.quantity > 1 ? 'units' : 'unit'}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="totals-section">
            <div class="total-row">
                <span>Subtotal:</span>
                <span><strong>RM ${data.subtotal.toFixed(2)}</strong></span>
            </div>
            <div class="total-row">
                <span>Tax (0%):</span>
                <span><strong>RM ${data.tax.toFixed(2)}</strong></span>
            </div>
            <div class="total-row grand-total">
                <span>TOTAL:</span>
                <span>RM ${data.total.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="footer">
            <p class="thank-you">Thank you for your purchase!</p>
            <p>All sales are final. Keep this receipt for your records.</p>
            <p style="margin-top: 20px; font-size: 10px; color: #999;">
                HAITANI EMPIRE © ${new Date().getFullYear()}
            </p>
        </div>
    </div>
</body>
</html>
        `;

        // Create blob and download
        const blob = new Blob([receiptHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `HAITANI-Receipt-${data.orderId}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Function to print receipt
    const printReceipt = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 z-50 animate-slide-in">
            <div className="bg-white text-black max-w-md w-full rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center border-b-2 border-black pb-6 mb-6">
                        <h1 className="text-3xl md:text-4xl font-black tracking-wider mb-2">HAITANI EMPIRE</h1>
                        <p className="text-xs uppercase tracking-widest text-zinc-600 font-semibold">Streetwear Excellence</p>
                    </div>

                    {/* Receipt Info */}
                    <div className="space-y-2.5 mb-6 text-sm bg-zinc-50 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <span className="font-semibold text-zinc-700">Order ID:</span>
                            <span className="font-mono font-bold">#{data.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-zinc-700">Date:</span>
                            <span className="font-medium">{data.date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-zinc-700">Time:</span>
                            <span className="font-medium">{data.time}</span>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="border-t-2 border-b-2 border-dashed border-zinc-300 py-5 mb-6">
                        <h3 className="font-bold uppercase tracking-wide mb-4 text-sm text-zinc-800">Items Purchased</h3>
                        <div className="space-y-4">
                            {data.items.map((item, index) => (
                                <div key={index} className="pb-4 border-b border-zinc-200 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-1.5">
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm leading-tight">{item.name}</p>
                                            <p className="text-xs text-zinc-600 mt-1">Size: {item.selectedSize || item.size}</p>
                                        </div>
                                        <span className="font-bold text-sm">RM {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        RM {item.price.toFixed(2)} × {item.quantity} {item.quantity > 1 ? 'units' : 'unit'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="space-y-2.5 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-700">Subtotal:</span>
                            <span className="font-semibold">RM {data.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-700">Tax (0%):</span>
                            <span className="font-semibold">RM {data.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-black pt-3 border-t-2 border-black">
                            <span>TOTAL:</span>
                            <span>RM {data.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-zinc-600 mb-6 pb-6 border-b border-zinc-300 space-y-1">
                        <p className="font-semibold">Thank you for your purchase!</p>
                        <p>All sales are final. Keep this receipt for your records.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {/* Download Receipt Button */}
                        <button
                            onClick={downloadReceipt}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wider text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            Download Receipt
                        </button>

                        {/* Print Receipt Button */}
                        <button
                            onClick={printReceipt}
                            className="w-full bg-zinc-700 hover:bg-zinc-600 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wider text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 6 2 18 2 18 9" />
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                <rect width="12" height="8" x="6" y="14" />
                            </svg>
                            Print Receipt
                        </button>

                        {/* New Transaction Button */}
                        <button
                            onClick={onNewTransaction}
                            className="w-full bg-black hover:bg-zinc-800 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wider text-sm transition-all shadow-lg"
                        >
                            New Transaction
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceiptModal;

