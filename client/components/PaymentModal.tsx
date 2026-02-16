import { useState } from "react";
import { X } from "lucide-react";

interface PaymentModalProps {
  title: string;
  price: number;
  onClose: () => void;
}

export default function PaymentModal({
  title,
  price,
  onClose,
}: PaymentModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const generateQRCode = (text: string): string => {
    // Generate QR code using QR server API
    const encodedText = encodeURIComponent(text);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}`;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create payment record
      const paymentData = {
        id: `PAYMENT-${Date.now()}`,
        email,
        package: title,
        amount: price,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentId(data.paymentId);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-500/30 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Payment Initiated!</h3>
            <p className="text-gray-400 mb-4">
              Scan the QR code below or use the payment ID to complete your payment.
            </p>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg mb-6 mx-auto w-fit">
              <img
                src={generateQRCode(`DzakCloud-${paymentId}`)}
                alt="Payment QR Code"
                className="w-48 h-48"
              />
            </div>

            {/* Payment Details */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Payment ID:</span>
                <span className="text-white font-mono text-sm break-all">{paymentId}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Package:</span>
                <span className="text-white">{title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white font-semibold">
                  Rp. {price.toLocaleString("id-ID")},00
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              Confirmation email sent to <span className="text-blue-400">{email}</span>
            </p>

            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-500/30 rounded-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Complete Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">{title}</span>
            <span className="text-white font-semibold">
              Rp. {price.toLocaleString("id-ID")},00
            </span>
          </div>
          <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between items-center">
            <span className="text-white font-semibold">Total</span>
            <span className="text-blue-400 font-bold text-lg">
              Rp. {price.toLocaleString("id-ID")},00
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Payment Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-gray-800/50 border border-blue-500/50 rounded-lg cursor-pointer hover:bg-gray-800">
                <input type="radio" name="method" value="qr" defaultChecked />
                <span className="text-white font-medium">Scan QR Code</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800">
                <input type="radio" name="method" value="transfer" />
                <span className="text-white font-medium">Bank Transfer</span>
              </label>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 mb-6">
            <input type="checkbox" required className="w-4 h-4 rounded" />
            <span className="text-sm text-gray-400">
              I agree to the terms and conditions
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          This is a demo payment gateway. No real transactions will be processed.
        </p>
      </div>
    </div>
  );
}
