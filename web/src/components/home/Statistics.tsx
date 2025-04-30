
import { motion } from "framer-motion";
import { Users, ShoppingCart, MapPin, TrendingUp } from "lucide-react";
import { statistics } from "@/data/statistics";

const statIcons: Record<string, React.ReactNode> = {
  "users": <Users className="w-8 h-8 text-agri-green" />,
  "shopping-cart": <ShoppingCart className="w-8 h-8 text-agri-green" />,
  "map-pin": <MapPin className="w-8 h-8 text-agri-green" />,
  "trending-up": <TrendingUp className="w-8 h-8 text-agri-green" />
};

const Statistics = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            Our Impact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subheading"
          >
            Transforming agricultural commerce through technology and direct connections
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="mb-4">
                {statIcons[stat.icon]}
              </div>
              <div className="counter-value">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                >
                  {stat.value}{stat.suffix || ''}
                </motion.span>
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
