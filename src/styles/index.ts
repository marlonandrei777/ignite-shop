import { createStitches } from "@stitches/react";

// createStitches devolve pra gt uma serie de config.
// Assim conseguimos configurar algumas coisas dentro da app
// tbm como ele, permite termos temas globais utilizando a variavel "theme"
/* devemos exportar a desestruturação com todos os elementos q vamos usar
de dentro de createStitches */
export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: "#fff",
      gray900: "#121214",
      gray800: "#202024",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#00875f",
      green300: "#00b37e",
    },

    fontSizes: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },
  },
});
