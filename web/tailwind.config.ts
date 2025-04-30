import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                agri: {
                    green: {
                        light: '#E3F2E0',
                        DEFAULT: '#4CAF50',
                        dark: '#2E7D32',
                    },
                    earth: {
                        light: '#F1EAE0',
                        DEFAULT: '#A67C52',
                        dark: '#5D4037',
                    },
                    sky: {
                        light: '#E3F2FD',
                        DEFAULT: '#64B5F6',
                        dark: '#1976D2',
                    },
                    wheat: {
                        light: '#FFF8E1',
                        DEFAULT: '#FFD54F',
                        dark: '#FFC107',
                    },
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'fade-out': {
                    '0%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    }
                },
                'scale-in': {
                    '0%': {
                        transform: 'scale(0.95)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1'
                    }
                },
                'counter': {
                    '0%': { 
                        'content': '"0"' 
                    },
                    '10%': { 
                        'content': '"10"' 
                    },
                    '20%': { 
                        'content': '"20"' 
                    },
                    '30%': { 
                        'content': '"30"' 
                    },
                    '40%': { 
                        'content': '"40"' 
                    },
                    '50%': { 
                        'content': '"50"' 
                    },
                    '60%': { 
                        'content': '"60"' 
                    },
                    '70%': { 
                        'content': '"70"' 
                    },
                    '80%': { 
                        'content': '"80"' 
                    },
                    '90%': { 
                        'content': '"90"' 
                    },
                    '100%': { 
                        'content': '"100"' 
                    }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'fade-out': 'fade-out 0.5s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'counter': 'counter 2s linear forwards'
			},
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
                'merriweather': ['Merriweather', 'serif']
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
