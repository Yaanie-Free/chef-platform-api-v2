'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  Mic, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Search,
  Pin,
  Download,
  FileText,
  Volume2,
  Play,
  Pause,
  X
} from 'lucide-react';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
  type: 'text' | 'voice' | 'image' | 'file' | 'system';
  duration?: number;
  fileName?: string;
  fileSize?: string;
  mediaUrl?: string;
  isRead: boolean;
  isPinned?: boolean;
  isStarred?: boolean;
  reactions?: { emoji: string; count: number; users: string[] }[];
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  isTyping: boolean;
  isPinned: boolean;
  isArchived: boolean;
  isMuted: boolean;
  messages: Message[];
  tags?: string[];
}

interface EnhancedMessagingProps {
  currentUserId: string;
  conversations: Conversation[];
  onSendMessage: (conversationId: string, message: Message) => void;
  onStartCall: (conversationId: string, type: 'voice' | 'video') => void;
  onArchiveConversation: (conversationId: string) => void;
  onPinConversation: (conversationId: string) => void;
  onMuteConversation: (conversationId: string) => void;
}

export default function EnhancedMessaging({
  currentUserId,
  conversations,
  onSendMessage,
  onStartCall,
  onArchiveConversation,
  onPinConversation,
  onMuteConversation
}: EnhancedMessagingProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  // Mark handler props as used to satisfy strict noUnusedLocals
  useEffect(() => {
    void onArchiveConversation;
    void onPinConversation;
    void onMuteConversation;
  }, [onArchiveConversation, onPinConversation, onMuteConversation]);

  // Typing indicator
  useEffect(() => {
    if (messageInput.trim()) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [messageInput]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'all':
        return matchesSearch && !conv.isArchived;
      case 'unread':
        return matchesSearch && conv.unreadCount > 0 && !conv.isArchived;
      case 'pinned':
        return matchesSearch && conv.isPinned && !conv.isArchived;
      case 'archived':
        return matchesSearch && conv.isArchived;
      default:
        return matchesSearch;
    }
  });

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const base: Omit<Message, 'replyTo'> = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'You',
      content: messageInput.trim(),
      timestamp: new Date(),
      isFromUser: true,
      type: 'text',
      isRead: false,
    };

    const message: Message = replyToMessage
      ? {
          ...base,
          replyTo: {
            id: replyToMessage.id,
            content: replyToMessage.content,
            senderName: replyToMessage.senderName,
          },
        }
      : { ...base };

    onSendMessage(selectedConversation.id, message);
    setMessageInput('');
    setReplyToMessage(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopVoiceRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setIsRecording(false);
    
    if (selectedConversation && recordingTime > 0) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: 'You',
        content: '',
        timestamp: new Date(),
        isFromUser: true,
        type: 'voice',
        duration: recordingTime,
        isRead: false
      };
      onSendMessage(selectedConversation.id, message);
    }
    setRecordingTime(0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'You',
      content: '',
      timestamp: new Date(),
      isFromUser: true,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      mediaUrl: URL.createObjectURL(file),
      isRead: false
    };

    onSendMessage(selectedConversation.id, message);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Messages</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="pinned">Pinned</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {conversation.participantName.charAt(0)}
                      </div>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground truncate">
                        {conversation.participantName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {conversation.isPinned && <Pin className="w-3 h-3 text-muted-foreground" />}
                        {conversation.isMuted && <Volume2 className="w-3 h-3 text-muted-foreground" />}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.isTyping ? (
                        <span className="text-primary">Typing...</span>
                      ) : (
                        conversation.lastMessage
                      )}
                    </p>
                    
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-2">
                        {conversation.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {selectedConversation.participantName.charAt(0)}
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {selectedConversation.participantName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.isOnline ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => onStartCall(selectedConversation.id, 'voice')}>
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onStartCall(selectedConversation.id, 'video')}>
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((message, index) => {
                  const prevMessage = selectedConversation.messages[index - 1];
                  const showAvatar = !prevMessage || prevMessage.senderId !== message.senderId;
                  const showDate = !prevMessage || 
                    formatDate(prevMessage.timestamp) !== formatDate(message.timestamp);

                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="text-center text-sm text-muted-foreground my-4">
                          {formatDate(message.timestamp)}
                        </div>
                      )}
                      
                      <div className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex space-x-2 max-w-[70%] ${message.isFromUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {showAvatar && !message.isFromUser && (
                            <Avatar className="w-8 h-8">
                              <div className="w-full h-full bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-semibold">
                                {message.senderName.charAt(0)}
                              </div>
                            </Avatar>
                          )}
                          
                          <div className={`flex flex-col ${message.isFromUser ? 'items-end' : 'items-start'}`}>
                            {showAvatar && (
                              <span className="text-xs text-muted-foreground mb-1">
                                {message.senderName}
                              </span>
                            )}
                            
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                message.isFromUser
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-foreground'
                              }`}
                            >
                              {message.replyTo && (
                                <div className="text-xs opacity-70 mb-2 p-2 bg-black/10 rounded">
                                  Replying to {message.replyTo.senderName}: {message.replyTo.content}
                                </div>
                              )}
                              
                              {message.type === 'text' && (
                                <p className="whitespace-pre-wrap">{message.content}</p>
                              )}
                              
                              {message.type === 'voice' && (
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Play className="w-4 h-4" />
                                  </Button>
                                  <div className="flex-1 bg-black/10 rounded-full h-2">
                                    <div className="bg-current h-full rounded-full w-1/3" />
                                  </div>
                                  <span className="text-xs">{message.duration}s</span>
                                </div>
                              )}
                              
                              {message.type === 'image' && (
                                <div className="space-y-2">
                                  <img
                                    src={message.mediaUrl}
                                    alt="Shared image"
                                    className="max-w-xs rounded-lg"
                                  />
                                  {message.content && <p>{message.content}</p>}
                                </div>
                              )}
                              
                              {message.type === 'file' && (
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-4 h-4" />
                                  <div>
                                    <p className="font-medium">{message.fileName}</p>
                                    <p className="text-xs opacity-70">{message.fileSize}</p>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-1 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.isFromUser && (
                                <span className="text-xs text-muted-foreground">
                                  {message.isRead ? '✓✓' : '✓'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messageEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              {replyToMessage && (
                <div className="mb-3 p-2 bg-muted rounded-lg flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Replying to {replyToMessage.senderName}:</span>
                    <p className="text-muted-foreground truncate">{replyToMessage.content}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setReplyToMessage(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {isRecording ? (
                  <Button
                    variant="destructive"
                    onClick={stopVoiceRecording}
                    className="flex items-center space-x-2"
                  >
                    <Pause className="w-4 h-4" />
                    <span>{recordingTime}s</span>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onMouseDown={startVoiceRecording}
                    onMouseUp={stopVoiceRecording}
                    onMouseLeave={stopVoiceRecording}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                )}
                
                <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,application/pdf,.doc,.docx,.txt"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
