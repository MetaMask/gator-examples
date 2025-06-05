import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";

function App() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 font-geist-sans">
      <main className="flex flex-col gap-6 row-start-2">
        <Hero />
        <Steps />
      </main>
      <Footer />
    </div>
  );
}

export default App;
