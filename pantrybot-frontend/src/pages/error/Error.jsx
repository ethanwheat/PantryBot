import { useRouteError } from "react-router-dom";
import { Container } from "react-bootstrap";
import ThemedNavbar from "../../components/navigation/ThemedNavbar";
import AuthProvider from "../../providers/AuthProvider";

export default function Error() {
  const error = useRouteError();

  return (
    <AuthProvider>
      <ThemedNavbar />
      <Container
        className="p-5 d-flex flex-column justify-content-center align-items-center"
      >
          <h1>An Error Occured</h1>
          {error.status ?
            <p>Error {error.status}: {error.statusText}</p> :
            <p>Error: {error.message}</p>
          }
      </Container>
    </AuthProvider>
  )
}
