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
  Avatar,
  Heading,
  Badge,
  Divider
} from '@chakra-ui/react';
import axios from 'axios';


function ChatList() {
  // Sample list of chats (you can replace with dynamic data)
  const chatList = [
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' },
  ];

  return (
    <Box
      bg="gray.200"
      p={4}
      maxHeight="calc(100vh - 120px)" // Adjust the height as needed
      overflowY="auto" // Enable scrolling if the chat list overflows
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing={2} align="left">
        {chatList.map((chat) => (
          <Box
            key={chat.id}
            p={3}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{
              bg: 'blue.50',
              cursor: 'pointer',
            }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack align="left" spacing={0}>
              <Text fontWeight="semibold">{chat.name}</Text>
              <Badge colorScheme="blue">Unread</Badge> {/* You can add a badge for unread messages */}
            </VStack>
            <Divider orientation="vertical" />
            <Text fontSize="sm" color="gray.500">
              2h ago
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false); // State to track if details should be shown

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    let respuesta = '';

    try {
      const data = { 
        'inputUser': inputMessage
      };

      const response = await axios.post('http://localhost:5000/entrada',data);
      respuesta = response.data.ans;
      console.log(respuesta);
    } catch (error) {
      console.log(error);
    }

    setShowDetails(false);

    // Add user message to the chat history
    const newMessages = [...messages, { text: inputMessage, user: true }];
    setMessages(newMessages);
    setInputMessage('');
    
    // Simulate a response from the chatbot (you can replace this with an actual API call)
    setTimeout(() => {
      const botResponse = {
        text: respuesta,
        image: messages.length > 4 ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Logo_de_Banorte.svg/2560px-Logo_de_Banorte.svg.png' : null,
        user: false,
        isSpecial: true, // Add a flag to mark it as a special message
      };
      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  // Function to handle "View More Details" button click
  const handleDetailsClick = () => {
    // Toggle the showDetails state when the button is clicked
    setShowDetails(!showDetails);

    // Find the index of the last chatbot message in the messages array
    const lastBotResponseIndex = messages
      .slice()
      .reverse()
      .findIndex((message) => message.user === false && message.isSpecial);
      
    if (lastBotResponseIndex !== -1) {
      // Calculate the index in the original array
      const originalIndex =
        messages.length - 1 - lastBotResponseIndex;

      // Update the text of the last chatbot message
      const updatedMessages = [...messages];
      updatedMessages[originalIndex].text = showDetails
        ? 'Hello, I am the chatbot!'
        : 'hello friendhello friendhello friendhello friendhello friendhello frweewewewewiendhello friendhello friendhello friendhello friend';
      setMessages(updatedMessages);
     
    }
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <Box display="grid" gridTemplateColumns="1fr 3fr 1fr" height="auto">
      <ChatList />
      <Box
        p={4}
        border="2px solid #ccc"
        borderRadius="md"
        boxShadow="lg"
        bg="red.700"
        marginTop="20px"
        marginBottom="40px"
        width="100%"
      >
        <Heading as="h2" size="lg" color="white" textAlign="center">
          Banorte MoneyMentor
        </Heading>
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
              position="relative"
            >
              <div style={{ display: 'flex' }}>
                <Avatar
                  size={'sm'}
                  src={
                    message.user
                      ? 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      : 'https://media.istockphoto.com/id/1479180033/es/foto/digital-eye-ai-concepto-digital-de-inteligencia-artificial.jpg?s=2048x2048&w=is&k=20&c=vB50zr2XoCvBeAEvfB5SPypPTWEwTVtK-nadDaiSVlA='
                  }
                  style={{ float: 'left', marginRight: '8px' }}
                />
                <div>{message.image ? (
                  <img
            src={message.image}
            alt="Chatbot"
            style={{
            }}heh
          />
          
                ): message.text}</div>
              </div>
              {index === messages.length - 1 && message.isSpecial && (
                <Box
                  position="absolute"
                  bottom="0"
                  right="0"
                  bg="gray.400"
                  color="white"
                  p={1}
                  borderRadius="md"
                  fontSize="12px"
                >
                  {!showDetails && (
                    <button onClick={handleDetailsClick}>
                      View More Details
                    </button>
                  )}
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
          <Button colorScheme="yellow" onClick={handleSendMessage} >
            Send
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

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
