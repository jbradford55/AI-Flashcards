"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
  Grid,
  CssBaseline,
} from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define the dark theme
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

export default function Learn() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);

      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });

      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setShowBack(false); // Reset to front of the card when going to the next card
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setShowBack(false); // Reset to front of the card when going to the previous card
    }
  };

  const handleFlipCard = () => {
    setShowBack((prev) => !prev);
  };

  const progress = ((currentCardIndex + 1) / flashcards.length) * 100;

  if (!isLoaded || !isSignedIn || flashcards.length === 0) {
    return <></>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push(`/flashcard?id=${search}`)}
          >
            Back to Set
          </Button>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 4 }} />
        <Box
          sx={{
            perspective: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            mb: 4,
          }}
        >
          <Box
            sx={{
              transition: "transform 0.6s",
              transformStyle: "preserve-3d",
              position: "relative",
              width: "100%",
              height: "100%",
              boxShadow: "0 4px 8px 0 rgba(0,0,0, 0.2)",
              transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
              backgroundColor: darkTheme.palette.background.paper,
              color: darkTheme.palette.text.primary,
            }}
            onClick={handleFlipCard}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxSizing: "border-box",
                transform: "rotateY(0deg)",
              }}
            >
              <Typography variant="h4">
                {flashcards[currentCardIndex].front}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxSizing: "border-box",
                transform: "rotateY(180deg)",
              }}
            >
              <Typography variant="h4">
                {flashcards[currentCardIndex].back}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePreviousCard}
              disabled={currentCardIndex === 0}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextCard}
              disabled={currentCardIndex === flashcards.length - 1}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
