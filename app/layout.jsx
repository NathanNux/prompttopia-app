import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Suspense } from "react";
import Loading from "./profile/loading";


export const metadata = {
  title: "Prompttopia",
  description: "Discover and share Ai prompts with others",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"/>
          </div>

          <main className="app">
            <Navbar />
              {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
