import { globalCss } from ".";

/* temos q escrever as nossas instrucoes css como obj JS */
export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
    backgroundColor: "$gray900",
    color: "$gray100",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});
