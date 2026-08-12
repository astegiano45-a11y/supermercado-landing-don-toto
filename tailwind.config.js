/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial de la marca Don Toto DA+ (manual de marca)
        brand: {
          orange: "#F07E26",
          orangeDark: "#D9650F", // hover/pressed sobre naranja, evita opacidades genéricas
          blue: "#004AAD",
          navy: "#0D2B63",
          dark: "#022353",
          cream: "#FFF7EC", // fondo cálido de la maqueta premium — reemplaza el blanco plano
          pink: "#E14F82", // acento extendido — no está en el manual, solo para piezas "Mi Club" / beneficios
        },
      },
      fontFamily: {
        // Archivo = texto/UI, Bricolage Grotesque = titulares y precios (carácter, no Inter)
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "var(--font-archivo)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Sombra "sticker" con offset sólido — evita el shadow-md difuso tipo Bootstrap
        tag: "5px 5px 0 0 rgba(13,43,99,0.95)",
        tagSm: "3px 3px 0 0 rgba(13,43,99,0.95)",
        card: "0 24px 48px -22px rgba(2,35,83,0.45)",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
      },
      backgroundSize: {
        // nombre distinto al de backgroundImage para no colisionar la clase "bg-dot-grid"
        dots: "16px 16px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out infinite 1.5s",
        "fade-up": "fadeUp 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
