import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  VStack,
  Text,
  extendTheme,
  CSSReset,
  border,
} from '@chakra-ui/react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message to the chat history
    const newMessages = [...messages, { text: inputMessage, user: true }];
    setMessages(newMessages);
    setInputMessage('');

    // Simulate a response from the chatbot (you can replace this with an actual API call)
    setTimeout(() => {
      const botResponse = {
        text: 'Hello, I am the chatbot!',
        user: false,
        isSpecial: true, // Add a flag to mark it as a special message
      };
      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      p={4}
      maxW="800px"
      mx="auto"
      border="2px solid #ccc"
      borderRadius="md"
      boxShadow="lg"
      bg="red.700"
    >
      <Box
        id="chat-container"
        p={4}
        borderRadius="md"
        minHeight="300px"
        maxHeight="300px"
        overflowY="auto"
        bg="white"
        boxShadow="md"
      >
        {messages.map((message, index) => (
          <Text
            key={index}
            textAlign={message.user ? 'right' : 'left'}
            bg={message.user ? 'blue.400' : 'gray.400'}
            color="white"
            p={2}
            borderRadius="md"
            boxShadow="sm"
            marginBottom="4px"
            position="relative" // Position relative for absolute positioning of "View More Details"
          >
            {message.text}
            {message.isSpecial && (
              <Box
                position="absolute"
                bottom="0"
                right="0"
                bg="gray.400  "
                color="white"
                p={1}
                borderRadius="md"
                fontSize="12px"
              >
                <button style={border}>
                View More Details
                </button>
              </Box>
            )}
          </Text>
        ))}
      </Box>
      <VStack spacing={4} mt={4}>
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          bg="white"
        />
        <Button colorScheme="blue" onClick={handleSendMessage}>
          Send
        </Button>
      </VStack>
    </Box>
  );
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Chatbot />
    </ChakraProvider>
  );
};

export default App;
