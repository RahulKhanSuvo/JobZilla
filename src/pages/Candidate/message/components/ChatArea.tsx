import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, MoreVertical, Paperclip, Smile } from "lucide-react";
import type { Conversation, ChatMessage } from "../types";

interface ChatAreaProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
  isTyping?: boolean;
  onTyping?: () => void;
  onToggleProfile?: () => void;
  showProfile?: boolean;
}

export default function ChatArea({
  conversation,
  messages,
  onSendMessage,
  onBack,
  isTyping = false,
  onTyping,
  onToggleProfile,
  showProfile = false,
}: ChatAreaProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  if (!conversation) {
    return (
      <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-gray-50 h-full">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Send className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-medium text-gray-600">Your Messages</h2>
        <p className="text-gray-400 mt-2">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="md:hidden mr-3 p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 aspect-square"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div
            className="flex items-center cursor-pointer group"
            onClick={onToggleProfile}
          >
            <div className="relative">
              <img
                src={conversation.participant.avatar}
                alt={conversation.participant.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
              />
              {conversation.participant.status === "online" && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="ml-3 text-left">
              <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                {conversation.participant.name}
              </h3>
              <p className="text-xs text-gray-500">
                {conversation.participant.role}{" "}
                {conversation.participant.status === "online" ? "• Online" : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleProfile}
            className={`p-2 rounded-full transition-colors ${showProfile ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-100"}`}
            title="View Profile"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col">
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";
          return (
            <div
              key={msg.id}
              className={`flex max-w-[80%] ${isMe ? "self-end" : "self-start"}`}
            >
              {!isMe && (
                <img
                  src={conversation.participant.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover mr-2 self-end mb-1"
                />
              )}
              <div
                className={`relative px-4 py-2.5 shadow-sm ${
                  isMe
                    ? "bg-primary text-white rounded-2xl rounded-br-sm"
                    : "bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <div
                  className={`text-[10px] mt-1 text-right ${
                    isMe ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex self-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form
          onSubmit={handleSend}
          className="flex items-center bg-gray-100 rounded-full px-4 padding-y-2 focus-within:ring-2 focus-within:ring-primary transition-all border border-transparent"
        >
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors hidden sm:block"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              onTyping?.();
            }}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none py-3 px-2 text-sm text-gray-800"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors my-1 shrink-0 flex items-center justify-center w-9 h-9"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
