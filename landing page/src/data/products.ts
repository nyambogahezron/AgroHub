
// Mock data for agricultural product listings
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  category: string;
  subcategory: string;
  location: string;
  harvest_date: string;
  seasonality: string[];
  organic: boolean;
  images: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
  };
  ratings: {
    average: number;
    count: number;
  };
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Organic Red Apples",
    description: "Freshly harvested organic red apples grown using sustainable farming practices. These apples are juicy, crisp, and perfect for eating fresh or using in various recipes. Our apples are grown without synthetic pesticides or fertilizers.",
    price: 2.99,
    unit: "lb",
    quantity: 500,
    minOrder: 10,
    category: "Fruits",
    subcategory: "Apples",
    location: "Washington State",
    harvest_date: "2023-09-15",
    seasonality: ["Summer", "Fall"],
    organic: true,
    images: [
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-001",
      name: "Green Valley Orchards",
      rating: 4.8,
      reviewCount: 256,
      verified: true
    },
    ratings: {
      average: 4.7,
      count: 142
    },
    featured: true
  },
  {
    id: "prod-002",
    name: "Premium Rice (Long Grain)",
    description: "Premium long-grain rice cultivated using traditional methods. This rice has an excellent texture when cooked and is ideal for a variety of dishes. Each grain cooks up fluffy and separate.",
    price: 3.49,
    unit: "kg",
    quantity: 2000,
    minOrder: 5,
    category: "Grains",
    subcategory: "Rice",
    location: "California",
    harvest_date: "2023-08-10",
    seasonality: ["Summer"],
    organic: false,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1626078299034-94bb5f7b2c9d?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-003",
      name: "RiceLand Farms",
      rating: 4.6,
      reviewCount: 189,
      verified: true
    },
    ratings: {
      average: 4.5,
      count: 98
    }
  },
  {
    id: "prod-003",
    name: "Fresh Organic Carrots",
    description: "Freshly harvested organic carrots. These carrots are sweet, crunchy, and perfect for snacking, cooking, or juicing. Grown without synthetic chemicals, these carrots retain their natural flavor and nutritional value.",
    price: 1.99,
    unit: "bunch",
    quantity: 300,
    minOrder: 5,
    category: "Vegetables",
    subcategory: "Root Vegetables",
    location: "Oregon",
    harvest_date: "2023-10-01",
    seasonality: ["Spring", "Summer", "Fall"],
    organic: true,
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-002",
      name: "Organic Valley Produce",
      rating: 4.9,
      reviewCount: 312,
      verified: true
    },
    ratings: {
      average: 4.8,
      count: 176
    },
    featured: true
  },
  {
    id: "prod-004",
    name: "Local Wildflower Honey",
    description: "Pure, raw wildflower honey collected from local bee farms. This honey is unprocessed and unpasteurized, preserving all the natural enzymes and pollen. Perfect as a natural sweetener or for its potential health benefits.",
    price: 8.99,
    unit: "16 oz jar",
    quantity: 150,
    minOrder: 2,
    category: "Honey & Syrup",
    subcategory: "Honey",
    location: "Vermont",
    harvest_date: "2023-07-15",
    seasonality: ["Spring", "Summer"],
    organic: true,
    images: [
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1601563191158-de2b3c2c938f?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-005",
      name: "BeeHaven Apiaries",
      rating: 5.0,
      reviewCount: 89,
      verified: true
    },
    ratings: {
      average: 4.9,
      count: 62
    }
  },
  {
    id: "prod-005",
    name: "Grass-Fed Ground Beef",
    description: "Premium grass-fed ground beef from cattle raised on open pastures. This beef is lean, flavorful, and packed with nutrients. Our cattle are raised without hormones or antibiotics and are free to graze naturally.",
    price: 7.99,
    unit: "lb",
    quantity: 200,
    minOrder: 2,
    category: "Meat",
    subcategory: "Beef",
    location: "Montana",
    harvest_date: "2023-09-20",
    seasonality: ["All Year"],
    organic: false,
    images: [
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1551446591-142875a901a1?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-004",
      name: "Green Pastures Ranch",
      rating: 4.7,
      reviewCount: 143,
      verified: true
    },
    ratings: {
      average: 4.6,
      count: 87
    },
    featured: true
  },
  {
    id: "prod-006",
    name: "Fresh Farm Eggs",
    description: "Free-range eggs from hens raised on an organic diet. These eggs feature vibrant orange yolks and exceptional flavor. Our hens have access to outdoor areas where they can forage naturally.",
    price: 4.49,
    unit: "dozen",
    quantity: 100,
    minOrder: 1,
    category: "Dairy & Eggs",
    subcategory: "Eggs",
    location: "Iowa",
    harvest_date: "2023-10-05",
    seasonality: ["All Year"],
    organic: true,
    images: [
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-006",
      name: "Happy Hen Farms",
      rating: 4.8,
      reviewCount: 211,
      verified: true
    },
    ratings: {
      average: 4.7,
      count: 132
    }
  },
  {
    id: "prod-007",
    name: "Heirloom Tomatoes Mix",
    description: "A colorful mix of heirloom tomato varieties, including Brandywine, Cherokee Purple, and Green Zebra. These tomatoes offer unique flavors and vibrant colors that are perfect for salads or cooking.",
    price: 4.99,
    unit: "lb",
    quantity: 150,
    minOrder: 3,
    category: "Vegetables",
    subcategory: "Tomatoes",
    location: "California",
    harvest_date: "2023-08-25",
    seasonality: ["Summer", "Fall"],
    organic: true,
    images: [
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-007",
      name: "Sunshine Organic Farm",
      rating: 4.9,
      reviewCount: 178,
      verified: true
    },
    ratings: {
      average: 4.8,
      count: 105
    }
  },
  {
    id: "prod-008",
    name: "Organic Quinoa",
    description: "Premium organic quinoa that's been carefully harvested and cleaned. This versatile grain is protein-rich and gluten-free, making it an excellent addition to many diets. Easy to prepare and adaptable to various recipes.",
    price: 5.99,
    unit: "lb",
    quantity: 500,
    minOrder: 2,
    category: "Grains",
    subcategory: "Quinoa",
    location: "Colorado",
    harvest_date: "2023-07-10",
    seasonality: ["All Year"],
    organic: true,
    images: [
      "https://images.unsplash.com/photo-1612708335961-91e9d184095a?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3"
    ],
    seller: {
      id: "seller-008",
      name: "Mountain Grains Co.",
      rating: 4.7,
      reviewCount: 92,
      verified: true
    },
    ratings: {
      average: 4.6,
      count: 58
    },
    featured: true
  }
];

// Product categories with icons
export const categories = [
  { id: "fruits", name: "Fruits", icon: "apple" },
  { id: "vegetables", name: "Vegetables", icon: "carrot" },
  { id: "grains", name: "Grains", icon: "wheat" },
  { id: "dairy", name: "Dairy & Eggs", icon: "milk" },
  { id: "meat", name: "Meat & Poultry", icon: "beef" },
  { id: "honey", name: "Honey & Syrup", icon: "beehive" },
  { id: "nuts", name: "Nuts & Seeds", icon: "nut" },
  { id: "herbs", name: "Herbs & Spices", icon: "herb" }
];

// Locations for filtering
export const locations = [
  "California",
  "Washington State",
  "Oregon",
  "Montana",
  "Iowa",
  "Vermont",
  "Colorado",
  "Texas",
  "Florida",
  "New York"
];

// Seasonality options
export const seasons = ["Spring", "Summer", "Fall", "Winter", "All Year"];
