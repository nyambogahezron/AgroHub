
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, Search, User, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-agri-green to-agri-earth-dark flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
          </motion.div>
          <span className="text-xl font-merriweather font-bold">AgriBloom Nexus</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-agri-green transition-colors duration-300">Home</Link>
          <Link to="/marketplace" className="text-gray-700 hover:text-agri-green transition-colors duration-300">Marketplace</Link>
          <Link to="/analytics" className="text-gray-700 hover:text-agri-green transition-colors duration-300">Analytics</Link>
          <Link to="/about" className="text-gray-700 hover:text-agri-green transition-colors duration-300">About</Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search size={20} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <User size={20} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-agri-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
          </Button>
          <Button className="bg-agri-green hover:bg-agri-green-dark">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden px-4 py-4 bg-white shadow-md"
        >
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-agri-green py-2 transition-colors duration-300" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-agri-green py-2 transition-colors duration-300" onClick={() => setIsOpen(false)}>Marketplace</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-agri-green py-2 transition-colors duration-300" onClick={() => setIsOpen(false)}>Analytics</Link>
            <Link to="/about" className="text-gray-700 hover:text-agri-green py-2 transition-colors duration-300" onClick={() => setIsOpen(false)}>About</Link>

            <div className="pt-3 flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 bg-agri-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
              </Button>
              <Button className="bg-agri-green hover:bg-agri-green-dark">Get Started</Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
