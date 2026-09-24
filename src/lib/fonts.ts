import { Fragment_Mono, Mona_Sans } from "next/font/google";

// One variable family; headings use its wider cuts via font-stretch.
export const sans = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

// Only used for small metadata; not worth competing with the main font.
export const mono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
  display: "swap",
  preload: false,
});
