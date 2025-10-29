import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart", { productId, qty: 1 });
      showToast("Item added to cart!", "success");
    } catch (err) {
      console.error("Error adding to cart:", err);
      showToast("Error adding item!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-10 px-4 sm:px-6 md:px-10 lg:px-16 relative">
    
      {toast && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-xl backdrop-blur-md border transition-all duration-300 ${
            toast.type === "success"
              ? "bg-white/80 border-green-200 text-green-700"
              : "bg-white/80 border-red-200 text-red-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} className="text-green-600" />
          ) : (
            <XCircle size={18} className="text-red-600" />
          )}
          <span className="font-medium text-sm sm:text-base">{toast.message}</span>
        </div>
      )}

      
      <div className="fixed top-5 right-5 sm:top-6 sm:right-8 z-40">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-800 hover:to-black text-white font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
        >
          <ShoppingCart size={18} />
          <span className="hidden xs:inline">Your Cart</span>
        </button>
      </div>

      
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-sm tracking-tight px-4">
         Our Exclusive Collection
      </h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
        {products.map((p) => (
          <div
            key={p._id}
            className="relative group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 overflow-hidden flex flex-col"
          >
         
            <div className="relative w-full h-48 sm:h-56 md:h-60 overflow-hidden">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
                  No Image
                </div>
              )}
            </div>

          
            <div className="flex-1 flex flex-col justify-between items-center p-4 sm:p-5 text-center">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-3 mb-1 truncate w-full">
                  {p.name}
                </h3>
                <p className="text-gray-700 font-bold text-lg sm:text-xl mb-3">
                  ₹{p.price.toLocaleString()}
                </p>
              </div>

              
              <button
                onClick={() => addToCart(p._id)}
                className="bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(161,161,170,0.3),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(113,113,122,0.2),transparent_60%)]"></div>
    </div>
  );
};

export default Products;
