import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#0E151D",
        color: "white",
        fontFamily: "Poppins",
        overflowX: "hidden",
        width: "100%",
      },
    },
  },
  breakpoints: {
    sm: "320px", // For mobile devices
    md: "768px", // For laptops
    lg: "1280px", // For desktops
  },
  sizes: {
    container: {
      sm: "100%", // Full width on small screens (mobile)
      md: "80%", // 80% width on laptops
      lg: "1200px", // Fixed width for desktops
    },
  },
  fontSizes: {
    xs: "10px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },
  components: {
    Button: {
      variants: {
        primary: {
          outline: "none",
          fontSize: "md",
          fontWeight: 400,
          color: "white",
          bg: "#9D48C7",
          borderRadius: "8px",
          width: "100%",
          _hover: {
            bg: "#9D48C7",
          },
          _focus: {
            boxShadow: "none",
          },
        },
        secondary: {
          bg: "#2D3748",
          color: "white",
          _hover: {
            bg: "#1A202C",
          },
        },
      },
    },
    Input: {
      variants: {
        primary: {
          field: {
            backgroundColor: "#F3F3F30B",
            fontFamily: "Work Sans",
            borderRadius: "16px",
            px: 5,
            py: 7,
            border: "2px solid rgba(255, 255, 255, 0.34)",
            outline: "none",
            _focus: {
              outline: "none",
              border: "2px solid rgba(255, 255, 255, 0.34)",
            },
            _placeholder: {
              color: "#FFFFFF4D",
            },
          },
        },
        secondary: {
          field: {
            backgroundColor: "#FFFFFF",
            fontFamily: "Poppins",
            borderRadius: "50px",
            px: 5,
            py: 7,
            border: "2px solid rgba(255, 255, 255, 0.34)",
            outline: "none",
            _focus: {
              outline: "none",
              border: "1px solid rgba(255, 255, 255, 0.34)",
            },
            _placeholder: {
              color: "#FFFFFF",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        primarySelect: {
          field: {
            background: "#1B2D46",
            height: 16,
            borderRadius: "16px",
            border: "2px solid rgba(255, 255, 255, 0.34)",
            outline: "none",
            _focus: {
              outline: "none",
              border: "2px solid rgba(255, 255, 255, 0.34)",
            },
            _placeholder: {
              color: "#FFFFFF4D",
            },
          },
        },
      },
    },
    Divider: {
      variants: {
        primaryDivider: {
          h: "1px",
          bgGradient: "linear(to-r, #FFFFFF00, #FFFFFF4D, #FFFFFF00)",
        },
      },
    },
  },
});

export default theme;
