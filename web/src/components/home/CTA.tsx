
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-agri-green to-agri-green-dark rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="150" r="100" stroke="white" strokeWidth="2" />
                <circle cx="150" cy="150" r="50" stroke="white" strokeWidth="2" />
                <circle cx="150" cy="150" r="150" stroke="white" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Agricultural Business?</h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of farmers and buyers already benefiting from our platform. Get started today and access powerful tools for your success.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-white text-agri-green hover:bg-gray-100 text-base px-8 py-6">
                    <Link to="/marketplace">
                      Start Selling
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button asChild className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6">
                    <Link to="/analytics">
                      Explore Analytics
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
