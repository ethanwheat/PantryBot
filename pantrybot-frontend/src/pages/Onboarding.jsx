import { Button, Container } from "react-bootstrap";
import endpoints from "../constants/endpoints";
import { useAuth } from "../providers/AuthProvider";

export default function Onboarding() {
  const { refreshSession } = useAuth();

  // This is temporary, delete this and replace with actual implementation.
  const onTemporalySetOnboarding = async () => {
    // Fetch temporary endpoint that sets onboarded to true.
    const res = await fetch(endpoints.profile.tempOnboard, {
      method: "POST",
      credentials: "include",
    });

    // If response is ok, then refresh the auth session on the frontend.
    if (res.ok) {
      refreshSession();
    }
  }

  return (
    <Container>
      <h1>Onboarding</h1>
      <p>Put onboarding here.</p>
      <Button onClick={onTemporalySetOnboarding}>Set Onboarding to true</Button>
    </Container>
  )
}
