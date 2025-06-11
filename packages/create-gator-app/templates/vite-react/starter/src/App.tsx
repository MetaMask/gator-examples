import React from "react";
import Footer from "@/components/Footer";
import Steps from "@/components/Steps";

function App() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-4 font-geist-sans">
      <main className="flex flex-col gap-6 row-start-2">
        <Steps />
      </main>
      <Footer />
    </div>
  );
}

export default App;
