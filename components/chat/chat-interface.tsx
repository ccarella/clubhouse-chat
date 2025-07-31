"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./message";
import { Send } from "lucide-react";
import { KeyboardEvent, useRef, useEffect, useState, FormEvent, ChangeEvent } from "react";

export function ChatInterface() {
  const { messages, sendMessage, status } = useChat();

  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="border-b px-4 py-3">
        <h1 className="text-xl font-semibold">Chat Assistant</h1>
      </header>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>Start a conversation by typing a message below.</p>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((message) => {
            // Extract text content from message parts
            const textContent = message.parts
              .filter((part: any) => part.type === "text")
              .map((part: any) => part.text)
              .join("");
            
            return (
              <Message
                key={message.id}
                role={message.role}
                content={textContent}
                isStreaming={
                  isLoading && message === messages[messages.length - 1] && message.role === "assistant"
                }
              />
            );
          })}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[200px] resize-none"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
}