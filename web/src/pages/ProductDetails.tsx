
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/data/products";
import { 
  ChevronLeft, 
  Star, 
  Truck, 
  Calendar, 
  MapPin, 
  Tag, 
  CheckCircle, 
  ShoppingCart, 
  Heart,
  Info,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 grow flex flex-col items-center justify-center">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for.
          </p>
          <Link
            to="/marketplace"
            className="flex items-center text-agri-green hover:underline"
          >
            <ChevronLeft size={20} />
            <span>Back to Marketplace</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              to="/marketplace"
              className="flex items-center text-agri-green hover:underline"
            >
              <ChevronLeft size={20} />
              <span>Back to Marketplace</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
              {/* Product Images */}
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    key={selectedImage}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.organic && (
                      <div className="absolute top-4 left-4 bg-agri-green text-white text-xs font-bold px-2 py-1 rounded-md">
                        Organic
                      </div>
                    )}
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-agri-green"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover aspect-square"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:col-span-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(product.ratings.average)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.ratings.average} ({product.ratings.count} reviews)
                  </span>
                </div>
                
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-3xl font-bold text-agri-green">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600">per {product.unit}</span>
                </div>
                
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Truck className="text-agri-green" size={20} />
                    <span>Min. Order: {product.minOrder} {product.unit}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-agri-green" size={20} />
                    <span>Harvest Date: {new Date(product.harvest_date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-agri-green" size={20} />
                    <span>Location: {product.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Tag className="text-agri-green" size={20} />
                    <span>Category: {product.category} / {product.subcategory}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Seasonality</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.seasonality.map((season) => (
                      <span
                        key={season}
                        className="bg-agri-green-light text-agri-green-dark px-3 py-1 rounded-full text-sm"
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={"https://ui-avatars.com/api/?name=" + product.seller.name}
                      alt={product.seller.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold text-gray-900 mr-2">{product.seller.name}</h3>
                        {product.seller.verified && (
                          <CheckCircle size={16} className="text-agri-green" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(product.seller.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {product.seller.rating} ({product.seller.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-600">
                    {product.quantity} {product.unit}s available
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Button className="btn-primary flex items-center justify-center gap-2 flex-1">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                  <Button className="btn-secondary flex items-center justify-center gap-2">
                    <Heart size={18} />
                    Save
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Info size={18} />
                    Ask Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
