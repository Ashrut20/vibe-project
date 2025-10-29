import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus, Minus, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      setCart(res.data.cart);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const updateQuantity = async (id, currentQty, action) => {
    try {
      if (action === "inc") {
        await axios.post("http://localhost:5000/api/cart", {
          productId: id,
          qty: 1,
        });
      } else if (action === "dec") {
        if (currentQty > 1) {
          await axios.post("http://localhost:5000/api/cart", {
            productId: id,
            qty: -1,
          });
        } else {
          await axios.delete(`http://localhost:5000/api/cart/${id}`);
        }
      }
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      fetchCart();
      showToast("🗑️ Item removed!");
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("🚫 No items in cart!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4 sm:px-6 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 bg-white/80 border border-gray-200 text-gray-800 font-medium px-5 py-3 rounded-full shadow-lg backdrop-blur-xl animate-fade-in-down flex items-center gap-2 z-50">
          <XCircle size={18} className="text-red-500" />
          {toast}
        </div>
      )}

      {/* Header */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
        🛒 Your Cart
      </h2>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-500 text-lg md:text-xl font-semibold mb-4">
            Your cart is empty! Add some cool items to continue shopping.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-800 hover:to-black text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Continue Shopping →
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-10 space-y-6 border border-gray-200">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-4 rounded-2xl bg-white/80 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-gray-100 shadow-sm"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    ₹{item.productId.price}
                  </p>
                  <p className="text-gray-800 font-semibold mt-1">
                    ₹{item.productId.price * item.qty}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.qty, "dec")
                    }
                    className="p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition"
                  >
                    <Minus size={16} className="text-zinc-700" />
                  </button>

                  <span className="font-semibold text-gray-800 w-6 text-center">
                    {item.qty}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.qty, "inc")
                    }
                    className="p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition"
                  >
                    <Plus size={16} className="text-zinc-700" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 rounded-full bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-300 pt-6 gap-4">
            <h3 className="text-2xl font-bold text-gray-800">Total</h3>
            <p className="text-2xl font-extrabold text-zinc-800">
              ₹{total.toLocaleString()}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-800 hover:to-black text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(161,161,170,0.3),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(113,113,122,0.2),transparent_60%)]"></div>
    </div>
  );
};

export default Cart;
