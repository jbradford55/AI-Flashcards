"use client";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import {
  Button,
  Toolbar,
  Typography,
  Container,
  AppBar,
  Box,
  CssBaseline,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion"; // Import framer-motion
import Head from "next/head";

// Define dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="100vw">
        <Head>
          <title>FlashSmart AI</title>
          <meta name="description" content="Create flashcard from your text" />
        </Head>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              FlashSmart AI
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-in">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <motion.div
          initial={{ opacity: 0, y: -50 }} // Starting position
          animate={{ opacity: 1, y: 0 }} // Final position
          transition={{ duration: 0.8 }} // Duration of the animation
        >
          <Box
            sx={{
              textAlign: "center",
              my: 4,
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, #f3ec78, #af4261)`,
                backgroundClip: "text",
                textFillColor: "transparent",
                animation: "move-gradient 5s ease-in-out infinite",
                backgroundSize: "200% 200%",
              }}
            >
              Welcome to FlashSmart AI
            </Typography>
            <Typography variant="h5" gutterBottom>
              The easiest way to make flashcards from your text
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 4,
                // Enlarge the buttons
                "& button": {
                  padding: "16px 32px",
                  fontSize: "1.5rem",
                },
              }}
            >
            <SignedIn>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                <Button variant="contained" color="primary" href="/generate">
                  Create New Set
                </Button>
                <Button variant="contained" color="secondary" href="/flashcards">
                  View Current Sets
                </Button>
              </Box>
            </SignedIn>

            </Box>
          </Box>
        </motion.div>

        {/* Conditionally render Features and Pricing sections based on user sign-in status */}
        {!isSignedIn && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Starting position
              animate={{ opacity: 1, y: 0 }} // Final position
              transition={{ duration: 1 }} // Duration of the animation
            >
              <Box sx={{ my: 6, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ marginBottom: "20px" }}
                >
                  Features
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        border: "1px solid",
                        borderColor: "grey.300",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: darkTheme.palette.background.paper,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Easy Text Input
                      </Typography>
                      <Typography>
                        Just input your text, and our software does the rest.
                        Creating flashcards has never been easier.
                      </Typography>
                      <Image
                        src="/text.png"
                        alt="Easy Text Input"
                        width={50}
                        height={50}
                        style={{ marginTop: "20px", borderRadius: "50%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        border: "1px solid",
                        borderColor: "grey.300",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: darkTheme.palette.background.paper,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Smart Flashcards
                      </Typography>
                      <Typography>
                        AI intelligently breaks down your texts into concise
                        flashcards, perfect for studying.
                      </Typography>
                      <Image
                        src="/smart.jpg"
                        alt="Smart Flashcards"
                        width={50}
                        height={50}
                        style={{ marginTop: "20px", borderRadius: "50%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        p: 3,
                        border: "1px solid",
                        borderColor: "grey.300",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: darkTheme.palette.background.paper,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Accessible Anywhere
                      </Typography>
                      <Typography>
                        Access your flashcards from any device, at any time.
                        Study on the go with ease.
                      </Typography>
                      <Image
                        src="/access.jpg"
                        alt="Accessible Anywhere"
                        width={50}
                        height={50}
                        style={{ marginTop: "20px", borderRadius: "50%" }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }} // Starting position
              animate={{ opacity: 1, y: 0 }} // Final position
              transition={{ duration: 1.2 }} // Duration of the animation
            >
              <Box sx={{ my: 6, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                  Pricing
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 3,
                        border: "1px solid",
                        borderColor: "grey.300",
                        borderRadius: 2,
                        backgroundColor: darkTheme.palette.background.paper,
                      }}
                    >
                      <Typography variant="h5" gutterBottom>
                        Free Trial
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        7 Days Completely Free
                      </Typography>
                      <Typography>
                        Test out our features with a money-back guarantee
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        href="/sign-up"
                      >
                        Sign Up for Free
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 3,
                        border: "1px solid",
                        borderColor: "grey.300",
                        borderRadius: 2,
                        backgroundColor: darkTheme.palette.background.paper,
                      }}
                    >
                      <Typography variant="h5" gutterBottom>
                        FlashSmart Subscription
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        $10 / month
                      </Typography>
                      <Typography>
                        Unlimited access to flashcard and storage
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                      >
                        Get Unlimited Access
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
