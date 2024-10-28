import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import images from "../constants/images";

export default function Welcome() {
  // Define styles as JavaScript objects
  const styles = {
    // Container for the entire component, setting layout and padding
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "5rem",
      minHeight: "100vh", // Ensures full viewport height
    },
    // Main content area styling
    mainContent: {
      textAlign: "center",
      maxWidth: "1200px",
      fontSize: "3rem",
      lineHeight: "1.8",
    },
    // Flexbox container for text and images
    imageTextContainer: {
      display: "flex",
      flexDirection: "row", // Places images on the left and right of the text
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "4rem",
    },
    // Styling for each image
    image: {
      height: "150px",
      maxWidth: "150px",
      margin: "20px", // Adds spacing around the images
    },
    // Styling for the main descriptive text
    text: {
      fontSize: "4rem",
      lineHeight: "1.2",
      fontFamily: "Georgia, serif", // Font similar to the design
      flex: "2", // Allows text to take up more space than the images
      margin: "20px",
    },
    // Styling for emphasized (italic/bold) text
    highlight: {
      fontStyle: "italic",
      fontWeight: "bold",
    },
    // Style for the call-to-action text
    ctaText: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    // Button style for call-to-action
    ctaButton: {
      padding: "0.75rem 2rem",
      borderRadius: "8px",
    },
  };

  return (
    <Container fluid style={styles.container}>
      <section style={styles.mainContent}>
        <div style={styles.imageTextContainer}>
          {/* Left Image */}
          <Image src={images.cartIcon} alt="Cart Icon" style={styles.image} />

          {/* Main Text */}
          <p style={styles.text}>
            {/* Emphasized words with 'highlight' style */}
            <span style={styles.highlight}>Search</span> pantry-based recipes with filters,
            <span style={styles.highlight}>add</span> missing ingredients to your grocery list, and
            <span style={styles.highlight}>find</span> nearby stores with the best prices
          </p>

          {/* Right Image */}
          <Image src={images.bagIcon} alt="Bag Icon" style={styles.image} />
        </div>

        {/* Call-to-action text */}
        <p style={styles.ctaText}>To Get Started:</p>
        
        {/* Sign-In/Create Account button */}
        <Button as={Link} to={routes.signup} variant="primary" style={styles.ctaButton}>
          Sign-In or Create Account
        </Button>
      </section>
    </Container>
  );
}
