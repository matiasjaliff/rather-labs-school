import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useSession, useSessionUpdate } from "../providers/sessionProvider";

export default function Root(): JSX.Element {
  const { session } = useSession() as { session: string | null };
  const setSession = useSessionUpdate() as (session: string | null) => void;
  const navigate = useNavigate();

  function toggleSession(): void {
    if (!session) {
      sessionStorage.setItem("auth", "true");
    } else {
      sessionStorage.removeItem("auth");
      navigate("/");
    }
    setSession(sessionStorage.getItem("auth"));
  }

  return (
    <>
      <div id="sidebar">
        <h1>Rather Labs School</h1>
        <div>
          <Link to="/">
            <img src="/rather-labs-logo.png"></img>
          </Link>
        </div>
        <nav style={{ marginTop: "36px", textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => toggleSession()}
          >
            {!session ? "Login" : "Logout"}
          </Button>
          {session ? (
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <h3>Administrator</h3>
              <Button htmlType="button" onClick={() => navigate("/")}>
                Courses
              </Button>
              <Button
                style={{ marginTop: "10px" }}
                htmlType="button"
                onClick={() => navigate("/students")}
              >
                Students
              </Button>
            </div>
          ) : (
            <></>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
