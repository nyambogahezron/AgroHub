import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PriceChart from '@/components/analytics/PriceChart';
import RegionalComparison from '@/components/analytics/RegionalComparison';
import PricePrediction from '@/components/analytics/PricePrediction';
import { priceTrends, regionalPrices } from '@/data/pricing';
import { Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Navbar />

			<main className='grow bg-gray-50 py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8'>
						<div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								Agricultural Price Analytics
							</h1>
							<p className='text-gray-600'>
								Track, analyze, and predict agricultural commodity prices across
								markets.
							</p>
						</div>

						<div className='mt-4 md:mt-0 flex items-center gap-3'>
							<Button variant='outline' className='flex items-center gap-2'>
								<Download size={18} />
								Export Data
							</Button>
							<Button className='bg-agri-green hover:bg-agri-green-dark flex items-center gap-2'>
								<Info size={18} />
								Market Reports
							</Button>
						</div>
					</div>

					{/* Analytics Dashboard */}
					<div className='grid grid-cols-1 gap-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<PriceChart data={priceTrends} />
						</motion.div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<RegionalComparison data={regionalPrices} />
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<PricePrediction />
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className='bg-white rounded-lg shadow-md p-6'
						>
							<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
								<div>
									<h3 className='text-xl font-bold mb-2'>Market Insights</h3>
									<p className='text-gray-600'>
										Key insights and observations based on current market data.
									</p>
								</div>
								<Button variant='outline' className='mt-4 md:mt-0'>
									View Full Report
								</Button>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								<div className='border border-gray-200 rounded-lg p-5'>
									<h4 className='font-bold mb-3'>Seasonal Trends</h4>
									<p className='text-gray-600 text-sm'>
										Apple prices typically increase by 12% during the winter
										months due to decreased supply. Farmers should consider
										storage solutions to benefit from this price differential.
									</p>
								</div>

								<div className='border border-gray-200 rounded-lg p-5'>
									<h4 className='font-bold mb-3'>Regional Opportunities</h4>
									<p className='text-gray-600 text-sm'>
										The Northeast region consistently pays 15% more for organic
										produce. Farmers with organic certification should consider
										targeting this market for premium pricing.
									</p>
								</div>

								<div className='border border-gray-200 rounded-lg p-5'>
									<h4 className='font-bold mb-3'>Price Volatility</h4>
									<p className='text-gray-600 text-sm'>
										Beef prices show the highest volatility (±8% monthly) among
										tracked commodities. Producers should consider hedging
										strategies to mitigate risk.
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Analytics;
