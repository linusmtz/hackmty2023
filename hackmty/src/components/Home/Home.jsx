import React from "react";
import { useState, useEffect, Suspense } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "../Navbar/NavBar";
import ChatBotInfo from "./ChatBotInfo";
import { Card, CardBody, Text } from '@chakra-ui/react';
export default function Home () {
    
    return (
        <div className="home">
            <NavBar></NavBar>
            <ChatBotInfo></ChatBotInfo>

        </div>
    );
}