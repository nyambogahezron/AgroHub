import { Link } from 'react-router-dom';
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	MapPin,
} from 'lucide-react';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-gray-900 text-white pt-16 pb-8'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div>
						<h3 className='text-xl font-merriweather font-bold mb-4'>
							AgroHub
						</h3>
						<p className='text-gray-300 mb-4'>
							Connecting farmers and buyers through a transparent marketplace
							with powerful price analytics.
						</p>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='text-gray-300 hover:text-agri-green transition-colors'
							>
								<Facebook size={20} />
							</a>
							<a
								href='#'
								className='text-gray-300 hover:text-agri-green transition-colors'
							>
								<Twitter size={20} />
							</a>
							<a
								href='#'
								className='text-gray-300 hover:text-agri-green transition-colors'
							>
								<Instagram size={20} />
							</a>
							<a
								href='#'
								className='text-gray-300 hover:text-agri-green transition-colors'
							>
								<Linkedin size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-bold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									to='/'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to='/marketplace'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Marketplace
								</Link>
							</li>
							<li>
								<Link
									to='/analytics'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Analytics
								</Link>
							</li>
							<li>
								<Link
									to='/about'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to='#'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h3 className='text-lg font-bold mb-4'>Resources</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									to='#'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Seller Guide
								</Link>
							</li>
							<li>
								<Link
									to='#'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Buyer Guide
								</Link>
							</li>
							<li>
								<Link
									to='#'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Market Reports
								</Link>
							</li>
							<li>
								<Link
									to='#'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									to='#'
									className='text-gray-300 hover:text-agri-green transition-colors'
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className='text-lg font-bold mb-4'>Contact Us</h3>
						<ul className='space-y-3'>
							<li className='flex items-start space-x-3'>
								<MapPin size={20} className='text-agri-green shrink-0 mt-1' />
								<span className='text-gray-300'>
									123 Farm Road, Agritown, CA 90210
								</span>
							</li>
							<li className='flex items-center space-x-3'>
								<Phone size={20} className='text-agri-green shrink-0' />
								<span className='text-gray-300'>(555) 123-4567</span>
							</li>
							<li className='flex items-center space-x-3'>
								<Mail size={20} className='text-agri-green shrink-0' />
								<span className='text-gray-300'>agrohub@gmail.com</span>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-700 mt-12 pt-8 text-center text-gray-400'>
					<p>&copy; {currentYear} AgroHub. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
