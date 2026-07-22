import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Sidenav from "./components/Sidenav";
import FeedPage from "./components/FeedPage";

function App() {
  return (
    <>
      <main className="w-full h-screen fixed flex">
        <Sidenav />
        <Routes>
          <Route path="/" element={<Navigate to="/new" replace />} />
          <Route
            path="/new"
            element={
              <FeedPage
                title="New"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route
            path="/ask"
            element={
              <FeedPage
                title="Ask"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route
            path="/show"
            element={
              <FeedPage
                title="Show"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route
            path="/jobs"
            element={
              <FeedPage
                title="Jobs"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route path="*" element={<Navigate to="/new" replace />} />
        </Routes>
        <footer className="credits" data-gfe-screenshot-exclude="true">
          A challenge by{" "}
          <a
            href="https://www.greatfrontend.com/projects?ref=challenges"
            target="_blank"
          >
            GreatFrontEnd Projects
          </a>
          . Built by{" "}
          <a
            href="https://www.greatfrontend.com/projects/u/FrozenHearth"
            target="_blank"
          >
            Vishwanath
          </a>
          .
        </footer>
      </main>
    </>
  );
}

export default App;
