// Client and collaborator logos. All PNGs are 320px tall with a transparent background;
// `width` is the intrinsic width, used to keep the aspect ratio when scaling.
export const LOGO_SOURCE_HEIGHT = 320;

export const brands = {
  fini: { name: "Fini Coffee & Bakery", src: "/images/trust/fini.png", width: 630 },
  latteArt: { name: "Latte Art by Barista Richy", src: "/images/trust/latte-art.png", width: 474 },
  honey: { name: "Honey Coffee & Brunch", src: "/images/trust/honey.png", width: 723 },
  qaphi: { name: "Qaphi Coffee | Brunch | Sweet", src: "/images/trust/qaphi.png", width: 913 },
  harrys: { name: "Harry's Coffee & Brunch", src: "/images/trust/harrys.png", width: 1103 },
} as const;

export type Brand = (typeof brands)[keyof typeof brands];

export const logoWidth = (brand: Brand, height: number) => Math.round((brand.width * height) / LOGO_SOURCE_HEIGHT);
