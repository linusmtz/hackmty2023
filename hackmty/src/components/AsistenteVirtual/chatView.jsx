import React from "react";
import { useState, useEffect, Suspense } from 'react';

import NavBar from "../Navbar/NavBar";
import ChatBot from "../AsistenteVirtual/chatBot"
import { Card, CardBody, Text } from '@chakra-ui/react';
export default function chatview () {
    
    return (
        <div className="chatview">
            <NavBar></NavBar>
            <ChatBot></ChatBot>
        </div>
    );
}