"use client";
import { useUser, useClerk } from "@clerk/nextjs"; // Import useClerk
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Box,
  Button,
  CardActions,
  CssBaseline,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";

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

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk(); // Initialize signOut function
  const [flashcards, setFlashcards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  const handleDelete = async (name) => {
    const updatedFlashcards = flashcards.filter(
      (flashcard) => flashcard.name !== name
    );
    setFlashcards(updatedFlashcards);

    const docRef = doc(collection(db, "users"), user.id);
    await updateDoc(docRef, { flashcards: updatedFlashcards });
  };

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFlashcards = flashcards.filter((flashcard) =>
    flashcard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="100vw">
        {/* Header with Welcome message and Log Out button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            mb: 4,
          }}
        >
          {/* Floating welcome message */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center" }}
          >
            <Typography variant="h4">
              Welcome back, {user.firstName || "User"}!
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Resume your learning
            </Typography>
          </motion.div>

          {/* Log Out Button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Log Out
          </Button>
        </Box>

        {/* Add a button to generate a new set */}
        <Box
          sx={{
            mt: 4,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Search Flashcards"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={() => router.push("/generate")}
          >
            Generate New Set
          </Button>
        </Box>

        <Grid container spacing={3}>
          {filteredFlashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    handleCardClick(flashcard.name);
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{flashcard.name}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: "center", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCardClick(flashcard.name)}
                  >
                    Review Set
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(flashcard.name)}
                  >
                    Delete Set
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
