/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: '#4CAF50',
				secondary: '#2196F3',
				accent: '#FF9800',
				background: '#F5F5F5',
				surface: '#FFFFFF',
				error: '#F44336',
				text: '#212121',
				'text-secondary': '#757575',
			},
		},
	},
	plugins: [],
};
