import { motion } from 'framer-motion';
import {
	Store,
	BarChart2,
	CheckCircle,
	Calendar,
	Shield,
	FileText,
} from 'lucide-react';
import { features } from '@/data/statistics';

const featureIcons: Record<string, React.ReactNode> = {
	store: <Store className='w-8 h-8 text-agri-green' />,
	'line-chart': <BarChart2 className='w-8 h-8 text-agri-green' />,
	'badge-check': <CheckCircle className='w-8 h-8 text-agri-green' />,
	calendar: <Calendar className='w-8 h-8 text-agri-green' />,
	shield: <Shield className='w-8 h-8 text-agri-green' />,
	'file-text': <FileText className='w-8 h-8 text-agri-green' />,
};

const Features = () => {
	return (
		<section id='features' className='py-20 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-16'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='section-heading'
					>
						Key Features
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='section-subheading'
					>
						Discover how AgroHub revolutionizes agricultural commerce with these
						powerful tools
					</motion.p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<motion.div
							key={feature.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className='feature-card'
						>
							<div className='bg-agri-green-light p-4 rounded-full mb-6'>
								{featureIcons[feature.icon]}
							</div>
							<h3 className='text-xl font-bold mb-3'>{feature.title}</h3>
							<p className='text-gray-600'>{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
