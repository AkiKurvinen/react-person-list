import React from "react";
import Header from "./components/Header";
import HRSystem from "./components/HRSystem";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HRSystem />
      </main>
      <Footer />
    </div>
  );
}

export default App;
