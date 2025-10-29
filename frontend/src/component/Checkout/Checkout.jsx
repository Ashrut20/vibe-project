import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

const Checkout = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/checkout", form);
      setReceipt(res.data);
    } catch (err) {
      console.error("Checkout error:", err);
      showToast(" Checkout failed, please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative px-4 sm:px-6">
      
      {toast && (
        <div
          className={`fixed top-6 right-6 flex items-center gap-3 px-5 py-3 rounded-full shadow-lg backdrop-blur-md border z-50 animate-fade-in-down ${
            toast.type === "error"
              ? "bg-white/80 border-red-200 text-red-700"
              : "bg-white/80 border-green-200 text-green-700"
          }`}
        >
          {toast.type === "error" ? (
            <XCircle size={18} className="text-red-500" />
          ) : (
            <CheckCircle2 size={18} className="text-green-500" />
          )}
          <span className="font-medium">{toast.msg}</span>
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(161,161,170,0.3),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(113,113,122,0.2),transparent_60%)]"></div>

      {/* Checkout Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
           Secure Checkout
        </h2>

        {!receipt ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-800 hover:to-black text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Pay →
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-5">
            <CheckCircle2 className="text-green-600 w-16 h-16 animate-bounce" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Payment Successful! 
            </h3>

            {/* Receipt Details */}
            <div className="w-full bg-white/80 border border-gray-200 rounded-2xl p-5 mt-2 shadow-md text-left space-y-2">
              <p>
                <strong className="text-gray-700">Name:</strong>{" "}
                <span className="text-gray-900">{receipt.name}</span>
              </p>
              <p>
                <strong className="text-gray-700">Email:</strong>{" "}
                <span className="text-gray-900">{receipt.email}</span>
              </p>
              <p>
                <strong className="text-gray-700">Total:</strong>{" "}
                <span className="text-gray-900">₹{receipt.total}</span>
              </p>
              <p>
                <strong className="text-gray-700">Time:</strong>{" "}
                <span className="text-gray-900">
                  {new Date(receipt.timestamp).toLocaleString()}
                </span>
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
