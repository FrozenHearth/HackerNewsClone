import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Sidenav from "./components/Sidenav";

function FeedPage({ title }: { title: string }) {
  return <h1 className="text-2xl font-semibold">{title}</h1>;
}

function App() {
  return (
    <>
      <main className="w-full h-screen fixed flex">
        <Sidenav />
        <Routes>
          <Route path="/" element={<Navigate to="/new" replace />} />
          <Route path="/new" element={<FeedPage title="New" />} />
          <Route path="/ask" element={<FeedPage title="Ask" />} />
          <Route path="/show" element={<FeedPage title="Show" />} />
          <Route path="/jobs" element={<FeedPage title="Jobs" />} />
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
