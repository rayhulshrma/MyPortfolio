import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from "./components/NavBar";
import { AdminPanel } from "./components/AdminPanel";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Tabs } from "./components/Tab";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Login } from './components/Login';
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadUser } from "./actions/users";

function App() {
  const dispatch = useDispatch();

  // Select necessary state variables
  const { isAuthenticated } = useSelector((state) => state.login);
  const { loading, user } = useSelector((state) => state.user);

  // Fetch user data when component mounts
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {user?.about && user.about.length > 0 && <Banner about={user.about} />}
                {user?.skills && user.skills.length > 0 && <Skills skills={user.skills} />}
                {user?.youtube && user?.projects && user?.gallery && (
                  <Tabs youtube={user.youtube} projects={user.projects} gallery={user.gallery} />
                )}
                <Contact />
              </>
            }
          />
          {/* Render AdminPanel if authenticated, otherwise render Login */}
          <Route path="/login" element={isAuthenticated ? <AdminPanel /> : <Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
