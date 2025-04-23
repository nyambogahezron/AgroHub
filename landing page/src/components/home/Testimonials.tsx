
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <section className="py-20 bg-agri-green-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            Success Stories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subheading"
          >
            Hear from farmers and buyers who have transformed their businesses
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div 
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <button 
              onClick={goToPrevious}
              className="bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="text-gray-700" />
            </button>
          </div>

          <div 
            className="overflow-hidden rounded-xl bg-white shadow-xl"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="p-6 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-agri-green-light">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < testimonials[currentIndex].rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg italic mb-6">"{testimonials[currentIndex].testimonial}"</p>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-600">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                      <div className="mt-2 inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                        {testimonials[currentIndex].userType === 'farmer' ? 'Farmer' : 'Buyer'} • {testimonials[currentIndex].location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div 
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <button 
              onClick={goToNext}
              className="bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoplay(false);
                }}
                className={`mx-1 w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-agri-green" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
