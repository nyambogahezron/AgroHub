import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<main className='grow'>
				<Hero />
				<Features />
				<Statistics />
				<Testimonials />
				<CTA />
			</main>

			<Footer />
		</div>
	);
}
