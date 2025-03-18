"use client";
import styles from "@/app/page.module.css";
import Steps from "@/components/Steps";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Steps />
      </main>
      <Footer />
    </div>
  );
}
