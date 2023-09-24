import React from "react";
import { useState, useEffect, Suspense } from 'react';

import NavBar from "../Navbar/NavBar";
import ChatBot from "../AsistenteVirtual/chatBot";
import { Card, CardBody, Text } from '@chakra-ui/react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function chatview() {

    const divStyle = {
        paddingTop: '64px',
        marginTop: '10px'
    };

    return (
        <div className="chatview">
            <NavBar></NavBar>
            <ChatBot className="mt-4"></ChatBot>
            <div style={divStyle}></div>
        </div>
    );
}
