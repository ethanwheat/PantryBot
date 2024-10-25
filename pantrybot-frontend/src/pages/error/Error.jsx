import { useRouteError } from "react-router-dom";
import ThemedNavbar from "../../components/navigation/ThemedNavbar";
import { Container, Stack } from "react-bootstrap";

export default function Error() {
  const {status, statusText} = useRouteError();

  return (
    <>
      <ThemedNavbar />
      <Container className="pt-5 d-flex flex-column justify-content-center align-items-center">
          <h1>An Error Occured</h1>
          <p>Error {status}: {statusText}</p>
      </Container>
    </>
  )
}
