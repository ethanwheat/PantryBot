import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Button } from "react-bootstrap";

export default function Settings() {
  // How to get data from the current session.
  // Call the refreshSession function to refresh the session, this will need to be done when saving settings.
  // Refresh session refreshes all user data, including the profile, to the whole app.
  // It is needed to refresh the session after changing values on the user so that the rest of the app is updated.
  // Modify to use what you need.
  const {
    session: {
      _id,
      username,
      email,
      onboarded,
      profile: { firstName, lastName, zipCode, diet_res, allergies },
    },
    refreshSession,
  } = useAuth();

  return (
    <>
      <h1>Settings</h1>
      <p>Put settings here.</p>

      {/* Below is just an example of how to get data from current session, delete this later. */}
      <p>Id: {_id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Onboarded: {onboarded ? "true" : "false"}</p>
      <p>First name: {firstName}</p>
      <p>Last name: {lastName}</p>
      <p>Zipcode: {zipCode}</p>
      <p>Dietary Restrictions:</p>
      {diet_res.length !== 0 ? (
        diet_res.map((res, index) => <p key={index}>{res}</p>)
      ) : (
        <p>No dietary restrictions</p>
      )}
      <p>Allergy Restrictions:</p>
      {allergies.length !== 0 ? (
        allergies.map((res, index) => <p key={index}>{res}</p>)
      ) : (
        <p>No allergie restrictions</p>
      )}
      <Button onClick={refreshSession}>Refresh Session</Button>
    </>
  );
}
