import React from "react";
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

import { ChakraProvider } from '@chakra-ui/react'
import NavBar from "./components/Navbar/NavBar";

import Chatview from "./components/AsistenteVirtual/chatView"


export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);

  return (
    <div className="app">
        <ChakraProvider>
            <BrowserRouter>
              <main>
                <Routes>
                  <Route
                    path="/inicio"
                    element={
                      <Home/>
                    }
                  />

                  <Route
                    path="/chatbot"
                    element={
                      <Chatview/>
                    }
                  />
                </Routes>
                
              </main>
            </BrowserRouter>
        </ChakraProvider>
    </div>
    
  );
}