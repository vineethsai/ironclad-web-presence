import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
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
				cyber: {
					dark: '#121212',
					darker: '#0A0A0A',
					green: '#33CC66',
					'green-muted': '#2DB058',
					blue: '#0EA5E9', // kept for backward compatibility
					'blue-dark': '#0284C7', // kept for backward compatibility
					grey: '#222222',
					'grey-light': '#2A2A2A'
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
				typing: {
					'0%': {
						width: '0%'
					},
					'100%': {
						width: '100%'
					}
				},
				blink: {
					'50%': {
						borderColor: 'transparent'
					}
				},
				'matrix-rain': {
					'0%': {
						transform: 'translateY(-100%)'
					},
					'100%': {
						transform: 'translateY(100vh)'
					}
				},
				pulse: {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				'text-fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float-up-down': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-15px)'
					}
				},
				'float-left-right': {
					'0%, 100%': {
						transform: 'translateX(0px)'
					},
					'50%': {
						transform: 'translateX(15px)'
					}
				},
				'float-circle': {
					'0%': {
						transform: 'rotate(0deg) translateX(10px) rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg) translateX(10px) rotate(-360deg)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 5px #33CC66, 0 0 10px #33CC66'
					},
					'50%': {
						boxShadow: '0 0 15px #33CC66, 0 0 20px #33CC66'
					}
				},
				'scroll-hint': {
					'0%': {
						transform: 'translateY(-5px)',
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(5px)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				typing: 'typing 3.5s steps(40, end)',
				blink: 'blink 1s step-end infinite',
				'matrix-rain': 'matrix-rain 20s linear infinite',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'text-fade-in': 'text-fade-in 0.8s ease-out forwards',
				'text-fade-in-delay-1': 'text-fade-in 0.8s ease-out 0.2s forwards',
				'text-fade-in-delay-2': 'text-fade-in 0.8s ease-out 0.4s forwards',
				'text-fade-in-delay-3': 'text-fade-in 0.8s ease-out 0.6s forwards',
				'float-up-down': 'float-up-down 3s ease-in-out infinite',
				'float-left-right': 'float-left-right 3s ease-in-out infinite',
				'float-circle': 'float-circle 8s linear infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'scroll-hint': 'scroll-hint 1.5s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
