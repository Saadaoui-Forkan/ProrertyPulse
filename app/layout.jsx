import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Property Pulse",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, property, find properties",
  icons: {
    icon: "/icon.png",
  },
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
            <Navbar />
            <div>{children}</div>
            <Footer />
          <ToastContainer/>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
