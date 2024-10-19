/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: ["Inter", "sans-serif"],
  			montserrat: ["Montserrat", "sans-serif"]
  		},
  		colors: {
  			delft_blue: {
  				'100': '#090b11',
  				'200': '#111622',
  				'300': '#1a2033',
  				'400': '#222b44',
  				'500': '#2a3554',
  				'600': '#445688',
  				'700': '#667bb2',
  				'800': '#99a7cc',
  				'900': '#ccd3e5',
  				DEFAULT: '#2A3554'
  			},
  			denim: {
  				'100': '#0b1324',
  				'200': '#162748',
  				'300': '#213a6c',
  				'400': '#2c4d90',
  				'500': '#3760b5',
  				'600': '#567dcb',
  				'700': '#819ed8',
  				'800': '#abbee5',
  				'900': '#d5dff2',
  				DEFAULT: '#3760B5'
  			},
  			auburn: {
  				'100': '#1e0807',
  				'200': '#3d100f',
  				'300': '#5b1816',
  				'400': '#7a211d',
  				'500': '#972925',
  				'600': '#cc3631',
  				'700': '#d96864',
  				'800': '#e69a98',
  				'900': '#f2cdcb',
  				DEFAULT: '#972925'
  			},
  			dark_cyan: {
  				'100': '#021f20',
  				'200': '#043e40',
  				'300': '#065c5f',
  				'400': '#077b7f',
  				'500': '#099aa0',
  				'600': '#0dd9e0',
  				'700': '#3deef4',
  				'800': '#7ef3f7',
  				'900': '#bef9fb',
  				DEFAULT: '#099AA0'
  			},
  			white_smoke: {
  				'100': '#33332f',
  				'200': '#67675d',
  				'300': '#98988d',
  				'400': '#c7c7c1',
  				'500': '#f6f6f5',
  				'600': '#f7f7f6',
  				'700': '#f9f9f9',
  				'800': '#fbfbfb',
  				'900': '#fdfdfd',
  				DEFAULT: '#F6F6F5'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
