
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="product-card h-full flex flex-col"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-[200px] object-cover"
          />
        </Link>
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart size={18} className="text-gray-600" />
        </button>
        {product.organic && (
          <div className="absolute top-3 left-3 bg-agri-green text-white text-xs font-bold px-2 py-1 rounded-md">
            Organic
          </div>
        )}
        {product.featured && (
          <div className="absolute bottom-3 left-3 bg-agri-wheat-dark text-white text-xs font-bold px-2 py-1 rounded-md">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1">{product.ratings.average}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-bold text-lg hover:text-agri-green transition-colors">{product.name}</h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description.substring(0, 80)}...</p>
        
        <div className="flex items-baseline justify-between mt-auto">
          <span className="text-agri-green font-bold text-xl">${product.price.toFixed(2)}</span>
          <span className="text-gray-500 text-sm">per {product.unit}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">{product.location}</span>
          <Button className="bg-agri-green hover:bg-agri-green-dark rounded-full h-9 w-9 p-0">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
