
import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, locations, seasons } from "@/data/products";

interface FiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  search: string;
  category: string;
  location: string;
  season: string;
  minPrice: number;
  maxPrice: number;
  organic: boolean;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    category: "",
    location: "",
    season: "",
    minPrice: 0,
    maxPrice: 100,
    organic: false,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (field: string, value: string | number | boolean) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      category: "",
      location: "",
      season: "",
      minPrice: 0,
      maxPrice: 100,
      organic: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button 
          className="text-agri-green hover:underline text-sm font-medium md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'} <ChevronDown className={`inline-block w-4 h-4 transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
        />
      </div>

      <div className={`space-y-4 ${!isExpanded && 'hidden md:block'}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
          <select
            value={filters.season}
            onChange={(e) => handleChange("season", e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
          >
            <option value="">All Seasons</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range: ${filters.minPrice} - ${filters.maxPrice}
          </label>
          <div className="flex space-x-4">
            <input
              type="range"
              min="0"
              max="50"
              value={filters.minPrice}
              onChange={(e) => handleChange("minPrice", parseInt(e.target.value))}
              className="flex-1"
            />
            <input
              type="range"
              min="50"
              max="100"
              value={filters.maxPrice}
              onChange={(e) => handleChange("maxPrice", parseInt(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="organic"
            checked={filters.organic}
            onChange={(e) => handleChange("organic", e.target.checked)}
            className="w-4 h-4 text-agri-green focus:ring-agri-green rounded"
          />
          <label htmlFor="organic" className="ml-2 block text-sm text-gray-700">
            Organic Only
          </label>
        </div>

        <div className="flex space-x-3 pt-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            className="flex-1 bg-agri-green hover:bg-agri-green-dark flex items-center justify-center gap-2"
          >
            <Filter size={16} />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
