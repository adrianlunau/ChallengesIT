import React from "react";
import Header from "../Header/Header";
import TripMaker from "../TripMaker/TripMaker";
import UserContext from "../User/User";


const user = {
  name: "Homero",
  email: "homeroS@mail.com"
}

function App() {
  return (
      <UserContext.Provider value={user}>
      <div className="App">
        <Header></Header>
        <TripMaker/>
      </div>
      </UserContext.Provider>
  );
}

export default App;
