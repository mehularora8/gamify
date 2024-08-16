import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'pal1': "#c7e3fa",
        'pal2': "#c1cffa",
        'pal3': "#cdeffa",
        'pal4': "#fcc2e0",
        'pal5': "#fddae5",
        'pal6': "#feedf2",
        'pal7': "#ecedff",
        'pal8': "#e1daff",
        'emphasis': "#c7522a",
      }
    },
  },
  safelist: [
    'bg-pal1',
    'bg-pal2',
    'bg-pal3',
    'bg-pal4',
    'bg-pal5',
    'bg-pal6',
    'bg-pal7',
    'bg-pal8',
    'text-emphasis'
  ],
  plugins: [nextui()],
};
export default config;
