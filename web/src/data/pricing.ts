
// Mock data for price trends and analytics
export interface PriceData {
  product: string;
  category: string;
  data: {
    date: string;
    price: number;
    region: string;
  }[];
}

export interface RegionData {
  region: string;
  prices: {
    [product: string]: number;
  };
}

// Price trend data (last 12 months)
export const priceTrends: PriceData[] = [
  {
    product: "Apples",
    category: "Fruits",
    data: [
      { date: "2023-01", price: 1.25, region: "National Average" },
      { date: "2023-02", price: 1.30, region: "National Average" },
      { date: "2023-03", price: 1.35, region: "National Average" },
      { date: "2023-04", price: 1.40, region: "National Average" },
      { date: "2023-05", price: 1.45, region: "National Average" },
      { date: "2023-06", price: 1.50, region: "National Average" },
      { date: "2023-07", price: 1.55, region: "National Average" },
      { date: "2023-08", price: 1.60, region: "National Average" },
      { date: "2023-09", price: 1.65, region: "National Average" },
      { date: "2023-10", price: 1.70, region: "National Average" },
      { date: "2023-11", price: 1.75, region: "National Average" },
      { date: "2023-12", price: 1.80, region: "National Average" }
    ]
  },
  {
    product: "Carrots",
    category: "Vegetables",
    data: [
      { date: "2023-01", price: 0.95, region: "National Average" },
      { date: "2023-02", price: 0.90, region: "National Average" },
      { date: "2023-03", price: 0.85, region: "National Average" },
      { date: "2023-04", price: 0.80, region: "National Average" },
      { date: "2023-05", price: 0.75, region: "National Average" },
      { date: "2023-06", price: 0.70, region: "National Average" },
      { date: "2023-07", price: 0.75, region: "National Average" },
      { date: "2023-08", price: 0.80, region: "National Average" },
      { date: "2023-09", price: 0.85, region: "National Average" },
      { date: "2023-10", price: 0.90, region: "National Average" },
      { date: "2023-11", price: 0.95, region: "National Average" },
      { date: "2023-12", price: 1.00, region: "National Average" }
    ]
  },
  {
    product: "Rice",
    category: "Grains",
    data: [
      { date: "2023-01", price: 2.10, region: "National Average" },
      { date: "2023-02", price: 2.15, region: "National Average" },
      { date: "2023-03", price: 2.20, region: "National Average" },
      { date: "2023-04", price: 2.25, region: "National Average" },
      { date: "2023-05", price: 2.30, region: "National Average" },
      { date: "2023-06", price: 2.35, region: "National Average" },
      { date: "2023-07", price: 2.40, region: "National Average" },
      { date: "2023-08", price: 2.45, region: "National Average" },
      { date: "2023-09", price: 2.50, region: "National Average" },
      { date: "2023-10", price: 2.55, region: "National Average" },
      { date: "2023-11", price: 2.60, region: "National Average" },
      { date: "2023-12", price: 2.65, region: "National Average" }
    ]
  },
  {
    product: "Beef",
    category: "Meat",
    data: [
      { date: "2023-01", price: 5.25, region: "National Average" },
      { date: "2023-02", price: 5.30, region: "National Average" },
      { date: "2023-03", price: 5.35, region: "National Average" },
      { date: "2023-04", price: 5.40, region: "National Average" },
      { date: "2023-05", price: 5.45, region: "National Average" },
      { date: "2023-06", price: 5.50, region: "National Average" },
      { date: "2023-07", price: 5.60, region: "National Average" },
      { date: "2023-08", price: 5.70, region: "National Average" },
      { date: "2023-09", price: 5.80, region: "National Average" },
      { date: "2023-10", price: 5.90, region: "National Average" },
      { date: "2023-11", price: 6.00, region: "National Average" },
      { date: "2023-12", price: 6.10, region: "National Average" }
    ]
  },
  {
    product: "Honey",
    category: "Honey & Syrup",
    data: [
      { date: "2023-01", price: 8.25, region: "National Average" },
      { date: "2023-02", price: 8.30, region: "National Average" },
      { date: "2023-03", price: 8.35, region: "National Average" },
      { date: "2023-04", price: 8.40, region: "National Average" },
      { date: "2023-05", price: 8.45, region: "National Average" },
      { date: "2023-06", price: 8.50, region: "National Average" },
      { date: "2023-07", price: 8.55, region: "National Average" },
      { date: "2023-08", price: 8.60, region: "National Average" },
      { date: "2023-09", price: 8.65, region: "National Average" },
      { date: "2023-10", price: 8.70, region: "National Average" },
      { date: "2023-11", price: 8.75, region: "National Average" },
      { date: "2023-12", price: 8.80, region: "National Average" }
    ]
  }
];

// Regional price comparison data
export const regionalPrices: RegionData[] = [
  {
    region: "West",
    prices: {
      "Apples": 1.95,
      "Carrots": 1.10,
      "Rice": 2.75,
      "Beef": 6.25,
      "Honey": 9.10
    }
  },
  {
    region: "Midwest",
    prices: {
      "Apples": 1.85,
      "Carrots": 0.95,
      "Rice": 2.60,
      "Beef": 5.90,
      "Honey": 8.75
    }
  },
  {
    region: "Northeast",
    prices: {
      "Apples": 2.15,
      "Carrots": 1.20,
      "Rice": 2.90,
      "Beef": 6.50,
      "Honey": 9.25
    }
  },
  {
    region: "South",
    prices: {
      "Apples": 1.90,
      "Carrots": 1.05,
      "Rice": 2.55,
      "Beef": 6.10,
      "Honey": 8.90
    }
  }
];

// Price prediction data for next 3 months
export const pricePredictions = [
  {
    product: "Apples",
    predictions: [
      { month: "Jan 2024", price: 1.85, trend: "up" },
      { month: "Feb 2024", price: 1.90, trend: "up" },
      { month: "Mar 2024", price: 1.88, trend: "down" }
    ]
  },
  {
    product: "Carrots",
    predictions: [
      { month: "Jan 2024", price: 1.05, trend: "up" },
      { month: "Feb 2024", price: 1.10, trend: "up" },
      { month: "Mar 2024", price: 1.08, trend: "down" }
    ]
  },
  {
    product: "Rice",
    predictions: [
      { month: "Jan 2024", price: 2.70, trend: "up" },
      { month: "Feb 2024", price: 2.75, trend: "up" },
      { month: "Mar 2024", price: 2.80, trend: "up" }
    ]
  },
  {
    product: "Beef",
    predictions: [
      { month: "Jan 2024", price: 6.20, trend: "up" },
      { month: "Feb 2024", price: 6.25, trend: "up" },
      { month: "Mar 2024", price: 6.30, trend: "up" }
    ]
  },
  {
    product: "Honey",
    predictions: [
      { month: "Jan 2024", price: 8.85, trend: "up" },
      { month: "Feb 2024", price: 8.90, trend: "up" },
      { month: "Mar 2024", price: 8.90, trend: "stable" }
    ]
  }
];

// Geography-based price heatmap data
export const geographyPrices = [
  { state: "Alabama", price: 1.88 },
  { state: "Alaska", price: 2.35 },
  { state: "Arizona", price: 1.98 },
  { state: "Arkansas", price: 1.76 },
  { state: "California", price: 2.15 },
  { state: "Colorado", price: 1.92 },
  { state: "Connecticut", price: 2.10 },
  { state: "Delaware", price: 1.95 },
  { state: "Florida", price: 1.97 },
  { state: "Georgia", price: 1.85 },
  { state: "Hawaii", price: 2.50 },
  { state: "Idaho", price: 1.80 },
  { state: "Illinois", price: 1.82 },
  { state: "Indiana", price: 1.78 },
  { state: "Iowa", price: 1.75 },
  { state: "Kansas", price: 1.76 },
  { state: "Kentucky", price: 1.80 },
  { state: "Louisiana", price: 1.85 },
  { state: "Maine", price: 2.05 },
  { state: "Maryland", price: 2.00 },
  { state: "Massachusetts", price: 2.15 },
  { state: "Michigan", price: 1.85 },
  { state: "Minnesota", price: 1.82 },
  { state: "Mississippi", price: 1.78 },
  { state: "Missouri", price: 1.79 },
  { state: "Montana", price: 1.90 },
  { state: "Nebraska", price: 1.76 },
  { state: "Nevada", price: 2.05 },
  { state: "New Hampshire", price: 2.08 },
  { state: "New Jersey", price: 2.10 },
  { state: "New Mexico", price: 1.90 },
  { state: "New York", price: 2.20 },
  { state: "North Carolina", price: 1.90 },
  { state: "North Dakota", price: 1.78 },
  { state: "Ohio", price: 1.82 },
  { state: "Oklahoma", price: 1.75 },
  { state: "Oregon", price: 2.00 },
  { state: "Pennsylvania", price: 1.95 },
  { state: "Rhode Island", price: 2.12 },
  { state: "South Carolina", price: 1.88 },
  { state: "South Dakota", price: 1.75 },
  { state: "Tennessee", price: 1.82 },
  { state: "Texas", price: 1.85 },
  { state: "Utah", price: 1.92 },
  { state: "Vermont", price: 2.10 },
  { state: "Virginia", price: 1.95 },
  { state: "Washington", price: 2.05 },
  { state: "West Virginia", price: 1.85 },
  { state: "Wisconsin", price: 1.80 },
  { state: "Wyoming", price: 1.88 }
];
