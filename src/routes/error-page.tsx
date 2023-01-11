////////// IMPORTS //////////

// React Router
import { useRouteError } from "react-router-dom";

////////// DEFINITIONS //////////

interface errorType {
  statusText?: string;
  message?: string;
}

////////// COMPONENT //////////

export default function ErrorPage(): JSX.Element {
  const error = useRouteError() as errorType;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
