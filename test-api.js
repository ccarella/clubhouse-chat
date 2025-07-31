// Test script to check if the chat API is working

async function testChatAPI() {
  const apiUrl = 'http://localhost:3000/api/chat';
  
  const testMessage = {
    messages: [
      {
        id: 'test-1',
        role: 'user',
        parts: [{ type: 'text', text: 'Hello, can you hear me?' }]
      }
    ]
  };

  console.log('Testing chat API at:', apiUrl);
  console.log('Sending message:', JSON.stringify(testMessage, null, 2));

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }

    // For streaming response, we need to read the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    console.log('Reading stream...');
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      console.log('Chunk:', chunk);
    }
    
    console.log('Stream complete');
  } catch (error) {
    console.error('Failed to test API:', error);
  }
}

// Run the test
testChatAPI();