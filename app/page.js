"use client"
import Image from "next/image";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import getStripe from "@/utils/get-stripe"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Toolbar, Typography, Container, AppBar, Box, Grid} from "@mui/material";
import Head from 'next/head';



export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch ('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },

    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard Saas</title>
        <meta name = "description" content="Create flashcard from your text" />
      </Head>

      <AppBar position = "static">
        <Toolbar>
          <Typography variant = "h6" style ={{flexGrow: 1}} >
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color = "inherit" href="/sign-in"> Login</Button>
            <Button color = "inherit" href="/sign-in">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <br/>

      <Box 
        sx={{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button 
            variant='contained' 
            color='primary' 
            href="/generate"
          >
            Create New Set
          </Button>
          <Button 
            variant='contained' 
            color='secondary' 
            href="/flashcards"
          >
            View Current Sets
          </Button>
        </Box>
      </Box>
    
    <br/>

    <Box sx={{ my: 6, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: '20px' }}>
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              Just input your text, and our software does the rest. Creating flashcards has never been easier.
            </Typography>
            <Image
              src="/text.png"
              alt="Easy Text Input"
              width={50} // Adjust width as needed
              height={50} // Adjust height as needed
              
              style={{ marginTop: "20px" }} // Ensure image is at the bottom
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography>
              AI intelligently breaks down your texts into concise flashcards, perfect for studying.
            </Typography>
            <Image
              src="/smart.jpg"
              alt="Smart Flashcards"
              width={50} // Adjust width as needed
              height={50} // Adjust height as needed
              style={{ marginTop: "20px" }} // Ensure image is at the bottom
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography>
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
            <Image
              src="/access.png"
              alt="Accessible Anywhere"
              width={50} // Adjust width as needed
              height={50} // Adjust height as needed
              style={{ marginTop: "20px" }} // Ensure image is at the bottom
            />
          </Box>
        </Grid>
      </Grid>
    </Box>


      <Box sx = {{my: 6, textAlign: 'center'}}>
        <Typography variant = "h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing = {4}>
          <Grid item xs = {12} md = {6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant = "h5" gutterBottom>Basic </Typography>
              <Typography variant = "h6" gutterBottom>$5 / month</Typography>
              <Typography> 
                {' '} 
                Basic flashcard features and limited storage.
              </Typography>
              <Button variant = "contained" color = "primary" sx={{mt: 2}} onClick={handleSubmit}>
                Choose basics
              </Button>
            </Box>
          </Grid>
          <Grid item xs = {12} md = {6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant = "h5" gutterBottom>Pro </Typography>
              <Typography variant = "h6" gutterBottom>$10 / month</Typography>
              <Typography> 
                {' '} 
                Unlimited access to flashcard and storage
              </Typography>
              <Button variant = "contained" color = "primary" sx={{mt: 2}} onClick={handleSubmit}>
                Choose pro
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Container>
  )
}
