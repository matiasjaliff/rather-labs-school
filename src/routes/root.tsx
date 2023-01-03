import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Root(): JSX.Element {
  return (
    <>
      <div id="sidebar">
        <h1>Rather Labs School</h1>
        <div>
          <Link to="/">
            <img src="/rather-labs-logo.png"></img>
          </Link>
        </div>
        <nav>
          <button type="button">Login</button>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
