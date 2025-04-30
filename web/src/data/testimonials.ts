// Mock data for testimonials
export interface Testimonial {
	id: string;
	name: string;
	role: string;
	company: string;
	image: string;
	testimonial: string;
	rating: number;
	location: string;
	userType: 'farmer' | 'buyer';
}

export const testimonials: Testimonial[] = [
	{
		id: 't1',
		name: 'Sarah Johnson',
		role: 'Owner',
		company: 'Green Fields Farm',
		image:
			'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		testimonial:
			'AgroHub has revolutionized how I sell my organic produce. The analytics dashboard helps me set competitive prices and the marketplace connects me directly with customers who value quality. My sales have increased by 40% since joining!',
		rating: 5,
		location: 'Oregon',
		userType: 'farmer',
	},
	{
		id: 't2',
		name: 'Michael Rodriguez',
		role: 'Executive Chef',
		company: 'Harvest Table Restaurant',
		image:
			'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		testimonial:
			'As a chef focused on farm-to-table cuisine, finding reliable sources of quality ingredients is crucial. This platform connects me directly with local farmers, ensuring the freshest ingredients for my restaurant while supporting sustainable agriculture.',
		rating: 5,
		location: 'California',
		userType: 'buyer',
	},
	{
		id: 't3',
		name: 'Emily Chen',
		role: 'Co-owner',
		company: 'Sunrise Orchards',
		image:
			'https://images.unsplash.com/photo-1558898479-33c0b4611ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		testimonial:
			'The price tracking tools helped us optimize our apple pricing strategy throughout the season. We can now see exactly when demand peaks and adjust accordingly. The direct connection with buyers has eliminated middleman costs too.',
		rating: 4,
		location: 'Washington',
		userType: 'farmer',
	},
	{
		id: 't4',
		name: 'David Williams',
		role: 'Procurement Manager',
		company: 'Natural Foods Market',
		image:
			'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		testimonial:
			"This platform has streamlined our procurement process enormously. We can easily find organic and specialty products, compare prices, and build relationships directly with farmers. It's improved our supply chain reliability dramatically.",
		rating: 5,
		location: 'Colorado',
		userType: 'buyer',
	},
	{
		id: 't5',
		name: 'Maria Gonzalez',
		role: 'Owner',
		company: 'Sunny Valley Dairy',
		image:
			'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		testimonial:
			"Before joining, I struggled to find markets for my specialty cheeses beyond local farmers' markets. Now I can reach customers nationwide and the analytics help me understand which products are performing best.",
		rating: 4,
		location: 'Wisconsin',
		userType: 'farmer',
	},
	{
		id: 't6',
		name: 'Robert Thompson',
		role: 'Founder',
		company: 'Urban Community Farm',
		image:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		testimonial:
			'As a small urban farm, getting our produce to market efficiently was always challenging. This marketplace has connected us with local restaurants and food co-ops that value our sustainable growing practices. Game changer!',
		rating: 5,
		location: 'New York',
		userType: 'farmer',
	},
];
