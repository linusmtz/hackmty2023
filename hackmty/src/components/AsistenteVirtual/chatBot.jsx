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
} from '@chakra-ui/react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message to the chat
    setMessages([...messages, { text: inputMessage, user: true }]);
    setInputMessage('');

    // Simulate a response from the chatbot (you can replace this with an actual API call)
    setTimeout(() => {
      setMessages([
        ...messages,
        { text: 'Hello, I am the chatbot!', user: false },
      ]);
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
      maxW="400px"
      mx="auto"
      border="1px solid #ccc"
      borderRadius="md"
      boxShadow="lg"
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
          >
            {message.text}
          </Text>
        ))}
      </Box>
      <VStack spacing={4} mt={4}>
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
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