import "./App.css";
import Router from "./Routes/Router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userContext } from "./Context/User/userProvider";
import { guestContext } from "./Context/Guest/guestProvider";

function App() {
  const { getUser, isAuthenticated } = useContext(userContext);
  const { getGuests } = useContext(guestContext);

  useEffect(() => {
    const fetchUser = () => {
      getUser();
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchGuests = () => {
      if (isAuthenticated) {
        getGuests();
      }
    };
    fetchGuests();
  }, [isAuthenticated]);

  return (
    <div className="app">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
