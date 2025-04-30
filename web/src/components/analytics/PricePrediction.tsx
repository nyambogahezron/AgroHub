
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { pricePredictions } from "@/data/pricing";

const PricePrediction = () => {
  const getIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="text-green-600" size={16} />;
      case "down":
        return <ArrowDownRight className="text-red-600" size={16} />;
      default:
        return <Minus className="text-gray-600" size={16} />;
    }
  };

  const getClassName = (trend: string) => {
    switch (trend) {
      case "up":
        return "bg-green-50 text-green-600 border-green-200";
      case "down":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Price Predictions</h3>
      <p className="text-gray-600 mb-6">
        Forecasted prices for the next 3 months based on historical data and market trends.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pricePredictions.map((prediction, idx) => (
          <motion.div
            key={prediction.product}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
              <h4 className="font-bold">{prediction.product}</h4>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {prediction.predictions.map((p, i) => (
                  <div key={p.month} className="flex items-center justify-between">
                    <span className="text-gray-700">{p.month}</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">${p.price.toFixed(2)}</span>
                      <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getClassName(p.trend)}`}>
                        {getIcon(p.trend)}
                        <span>{p.trend.charAt(0).toUpperCase() + p.trend.slice(1)}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricePrediction;
