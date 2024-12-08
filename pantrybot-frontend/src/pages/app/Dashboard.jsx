import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { useAuth } from "../../providers/AuthProvider";
import routes from "../../constants/routes";
import Map from "./Map"; // Import Map component

export default function Dashboard() {
  const {
    session: { _id, username, email, onboarded },
    logout,
  } = useAuth();

  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState(null); // State to store zip code
  const [loading, setLoading] = useState(true); // Loading state for fetching profile

  // Fetch user's profile to get the zip code
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
          },
        });
        const userProfile = response.data.profile;
        //console.log("User profile data:", userProfile); // Debugging
        setZipCode(userProfile.zipCode);
        setZipCode("66045");    // ** Hard set zip code ** 
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false); // Set loading to false whether or not profile fetch succeeds
      }
    };

    fetchProfile();
  }, []);

  const goToPantry = () => {
    navigate(routes.app.pantry);
  };

  // If still loading profile, show a loading message
  if (loading) {
    return (
      <Container fluid>
        <h1>Dashboard</h1>
        <p>Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container fluid>
      <h1>Dashboard</h1>
      <p>Id: {_id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Onboarded: {onboarded ? "true" : "false"}</p>
      <div>
        <p className="fs-3 fw-semibold">Nearby Grocery Stores</p>
        <div
          className="bg-gray d-flex w-100 justify-content-center align-items-center"
          style={{ height: "25rem" }}
        >
          {zipCode ? (
            <Map zipCode={zipCode} />
          ) : (
            <p>Zip code not available. Please complete your profile.</p>
          )}
        </div>
      </div>
    </Container>
  );
}
