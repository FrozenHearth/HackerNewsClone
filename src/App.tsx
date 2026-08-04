import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Sidenav from "./components/Sidenav";
import FeedPage from "./components/FeedPage";
import StoryPage from "./components/StoryPage";

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
                feed="new"
                title="New"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route
            path="/ask"
            element={
              <FeedPage
                feed="ask"
                title="Ask"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route
            path="/show"
            element={
              <FeedPage
                feed="show"
                title="Show"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route
            path="/jobs"
            element={
              <FeedPage
                feed="jobs"
                title="Jobs"
                description="Discover the latest submissions in the Hacker News community."
              />
            }
          />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="*" element={<Navigate to="/new" replace />} />
        </Routes>
      </main>
      <footer data-gfe-screenshot-exclude="true"></footer>
    </>
  );
}

export default App;
