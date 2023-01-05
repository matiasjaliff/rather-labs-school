import { Link, Outlet } from "react-router-dom";
import { Button } from "antd";

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
          <Button htmlType="button">Login</Button>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
