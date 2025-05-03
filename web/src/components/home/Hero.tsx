import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
	return (
		<section className='hero-section py-16 md:py-24 overflow-hidden'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
							Connecting Farms to{' '}
							<span className='text-agri-green'>Tables</span> Worldwide
						</h1>
						<p className='mt-6 text-lg md:text-xl text-gray-600 max-w-lg'>
							A revolutionary agricultural marketplace with powerful price
							analytics to connect farmers and buyers directly.
						</p>
						<div className='mt-8 flex flex-col sm:flex-row gap-4'>
							<Button asChild className='btn-primary text-base'>
								<Link to='/marketplace'>
									Explore Marketplace
									<ArrowRight size={18} className='ml-2' />
								</Link>
							</Button>
							<Button asChild className='btn-secondary text-base'>
								<Link to='/analytics'>View Price Analytics</Link>
							</Button>
							<Button asChild className='btn-secondary text-base'>
								<Link to='/dashboard'>View Dashboard</Link>
							</Button>
						</div>

						<div className='mt-8 flex items-center space-x-4'>
							<div className='flex -space-x-2'>
								<img
									src='https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
									alt='User'
									className='w-10 h-10 rounded-full border-2 border-white'
								/>
								<img
									src='https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
									alt='User'
									className='w-10 h-10 rounded-full border-2 border-white'
								/>
								<img
									src='https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
									alt='User'
									className='w-10 h-10 rounded-full border-2 border-white'
								/>
							</div>
							<p className='text-gray-600 text-sm'>
								Trusted by 5,000+ farmers worldwide
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='relative'
					>
						<div className='relative rounded-lg overflow-hidden shadow-2xl'>
							<img
								src='https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3'
								alt='Agricultural landscape'
								className='w-full h-full object-cover rounded-lg'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/50 to-transparent'></div>
							<div className='absolute bottom-6 left-6 right-6 text-white'>
								<div className='flex items-center justify-between'>
									<div>
										<p className='text-lg font-bold'>Farm Direct Marketplace</p>
										<p className='text-sm opacity-90'>
											Connect with buyers worldwide
										</p>
									</div>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className='bg-agri-green hover:bg-agri-green-dark rounded-full w-10 h-10 flex items-center justify-center cursor-pointer'
									>
										<ArrowRight size={20} />
									</motion.div>
								</div>
							</div>
						</div>

						<motion.div
							initial={{ opacity: 0, x: 20, y: 20 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className='absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg max-w-[200px]'
						>
							<div className='flex items-center space-x-2 mb-2'>
								<div className='bg-agri-green-light p-2 rounded-full'>
									<ArrowRight size={16} className='text-agri-green' />
								</div>
								<h3 className='font-bold text-gray-800'>Price Analytics</h3>
							</div>
							<p className='text-gray-600 text-sm'>
								Track and analyze price trends across regions
							</p>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
