import { useState, useRef } from 'react';
import { X, Send, MessageCircle, User, Phone, Mic, Camera, Paperclip, MoreVertical, AlertTriangle, MicIcon, Play, Pause, ImageIcon, FileText, Download, Volume2, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ReportChatDialog } from './ReportChatDialog';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
  type?: 'text' | 'voice' | 'image' | 'file';
  duration?: number; // for voice messages in seconds
  fileName?: string; // for files
  fileSize?: string; // for files
  mediaUrl?: string; // for images/files/voice notes
}

interface ChefReview {
  id: string;
  stars: number;
  customerName: string;
  comment: string;
}

interface ChatConversation {
  id: string;
  chefId: string;
  chefName: string;
  chefImage: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  messages: Message[];
  reviews?: ChefReview[];
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ChatConversation[];
  currentUser?: any;
}

// Mock conversations data
const mockConversations: ChatConversation[] = [
  {
    id: '1',
    chefId: '2',
    chefName: 'Amara Johnson',
    chefImage: 'https://images.unsplash.com/photo-1719329466199-f18fb7f6972e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTg0MTM2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lastMessage: '🎤 Voice message',
    timestamp: new Date('2024-01-15T15:00:00'),
    unreadCount: 1,
    reviews: [
      {
        id: 'r1',
        stars: 5,
        customerName: 'Jenipher',
        comment: 'loved the chefs work, will defs do again'
      },
      {
        id: 'r2',
        stars: 5,
        customerName: 'Sarah M.',
        comment: 'absolutely incredible experience! The vegan dishes were to die for'
      },
      {
        id: 'r3',
        stars: 4,
        customerName: 'David K.',
        comment: 'fantastic food, very creative presentation'
      }
    ],
    messages: [
      {
        id: '1',
        senderId: '2',
        senderName: 'Amara Johnson',
        content: 'Hi, how can I help?',
        timestamp: new Date('2024-01-15T15:00:00'),
        isFromUser: false,
        type: 'text'
      },
      {
        id: '2',
        senderId: 'user',
        senderName: 'You',
        content: 'Hi Amara! I\'m interested in your vegan African fusion cuisine for a dinner party.',
        timestamp: new Date('2024-01-15T15:02:00'),
        isFromUser: true,
        type: 'text'
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'Amara Johnson',
        content: '',
        timestamp: new Date('2024-01-15T15:05:00'),
        isFromUser: false,
        type: 'voice',
        duration: 18,
        mediaUrl: 'amara-voice-response.mp3'
      }
    ]
  },
  {
    id: '2',
    chefId: '1',
    chefName: 'Marco Pellegrini',
    chefImage: 'https://images.unsplash.com/photo-1622001635931-3874528bd099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwY29va2luZyUyMGdvdXJtZXQlMjBmb29kfGVufDF8fHx8MTc1ODQxMzU1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lastMessage: 'Perfect! I can definitely prepare a 5-course Italian tasting menu for 8 guests. When would you like to schedule our consultation?',
    timestamp: new Date('2024-01-15T14:30:00'),
    unreadCount: 0,
    reviews: [
      {
        id: 'r4',
        stars: 5,
        customerName: 'Emma L.',
        comment: 'best Italian food outside of Italy! Marco is a true master'
      },
      {
        id: 'r5',
        stars: 3,
        customerName: 'Tammy',
        comment: 'chef was a bit late, but made a super dish, too bad my partner couldn\'t stay too long before they had to leave'
      },
      {
        id: 'r6',
        stars: 5,
        customerName: 'James R.',
        comment: 'exceptional service and incredible pasta dishes'
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'user',
        senderName: 'You',
        content: 'Hi Marco! I\'m interested in booking you for a dinner party next weekend. We\'ll have 8 guests and would love a proper Italian experience.',
        timestamp: new Date('2024-01-15T14:20:00'),
        isFromUser: true,
        type: 'text'
      },
      {
        id: '2',
        senderId: '1',
        senderName: 'Marco Pellegrini',
        content: 'Buongiorno! Thank you for your interest. I\'d be delighted to create an authentic Italian experience for you and your guests. What type of menu were you envisioning?',
        timestamp: new Date('2024-01-15T14:25:00'),
        isFromUser: false,
        type: 'text'
      },
      {
        id: '3',
        senderId: 'user',
        senderName: 'You',
        content: 'We\'d love a 5-course tasting menu showcasing different regions of Italy. Can you accommodate any dietary restrictions?',
        timestamp: new Date('2024-01-15T14:28:00'),
        isFromUser: true,
        type: 'text'
      },
      {
        id: '4',
        senderId: '1',
        senderName: 'Marco Pellegrini',
        content: 'Perfect! I can definitely prepare a 5-course Italian tasting menu for 8 guests. When would you like to schedule our consultation?',
        timestamp: new Date('2024-01-15T14:30:00'),
        isFromUser: false,
        type: 'text'
      },
      {
        id: '5',
        senderId: '1',
        senderName: 'Marco Pellegrini',
        content: 'Here\'s some sample dishes from my portfolio',
        timestamp: new Date('2024-01-15T14:32:00'),
        isFromUser: false,
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1718939043990-83078968ae7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcGxhdGVkJTIwZm9vZCUyMGVsZWdhbnR8ZW58MXx8fHwxNzU4NDEzNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '6',
        senderId: 'user',
        senderName: 'You',
        content: '',
        timestamp: new Date('2024-01-15T14:35:00'),
        isFromUser: true,
        type: 'voice',
        duration: 12,
        mediaUrl: 'voice-note-1.mp3'
      }
    ]
  }
];

export function ChatModal({ isOpen, onClose, conversations, currentUser }: ChatModalProps) {
  const displayConversations = conversations && conversations.length > 0 ? conversations : mockConversations;
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAttachments, setShowAttachments] = useState(false);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      content: newMessage.trim(),
      timestamp: new Date(),
      isFromUser: true,
      type: 'text'
    };

    // In a real app, this would send the message to the backend
    console.log('Sending message:', message);
    setNewMessage('');
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    // In a real app, start actual voice recording here
  };

  const stopVoiceRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setIsRecording(false);
    
    // Send voice message
    const voiceMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      content: '',
      timestamp: new Date(),
      isFromUser: true,
      type: 'voice',
      duration: recordingTime,
      mediaUrl: 'voice-recording.mp3'
    };
    
    console.log('Sending voice message:', voiceMessage);
    setRecordingTime(0);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const fileMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      content: isImage ? '' : file.name,
      timestamp: new Date(),
      isFromUser: true,
      type: isImage ? 'image' : 'file',
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      mediaUrl: URL.createObjectURL(file)
    };

    console.log('Sending file:', fileMessage);
    setShowAttachments(false);
  };

  const handleVoicePlayback = (messageId: string) => {
    if (playingVoiceId === messageId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(messageId);
      // In a real app, play the voice note here
      setTimeout(() => setPlayingVoiceId(null), 3000); // Mock playback
    }
  };

  const handleCall = () => {
    console.log('Initiating call with:', selectedConversation?.chefName);
    // In a real app, start voice call
  };

  const handleReportChat = () => {
    setIsReportDialogOpen(true);
  };

  const formatVoiceDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl h-[700px] bg-card border-border rounded-3xl shadow-2xl flex overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-border flex flex-col bg-card/50">
          <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-semibold text-lg">Messages</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full w-10 h-10 p-0 hover:bg-accent/80 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4">
              {displayConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-200 mb-3 border ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-gradient-to-r from-accent to-accent/80 border-accent scale-[0.98] shadow-lg'
                      : 'hover:bg-accent/30 hover:scale-[0.99] border-transparent hover:border-border/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-border/20">
                        <img 
                          src={conversation.chefImage} 
                          alt={conversation.chefName}
                          className="w-full h-full object-cover"
                        />
                      </Avatar>
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-lg animate-pulse">
                          {conversation.unreadCount}
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm truncate">
                          {conversation.chefName}
                        </p>
                        <span className="text-xs text-muted-foreground font-medium">
                          {formatDate(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate leading-relaxed">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-border flex items-center gap-4 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm">
                <div className="relative">
                  <Avatar className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-border/20">
                    <img 
                      src={selectedConversation.chefImage} 
                      alt={selectedConversation.chefName}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedConversation.chefName}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-muted-foreground">Online • Private Chef</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCall}
                    className="rounded-2xl hover:bg-accent/50"
                  >
                    <Phone className="w-5 h-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-accent/50">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl">
                      <DropdownMenuItem className="rounded-xl">
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="rounded-xl text-destructive"
                        onClick={handleReportChat}
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-background/30 to-background/10">
                <div className="space-y-6">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-end gap-3 ${message.isFromUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {!message.isFromUser && (
                        <Avatar className="w-8 h-8 rounded-2xl overflow-hidden flex-shrink-0">
                          <img 
                            src={selectedConversation.chefImage} 
                            alt={selectedConversation.chefName}
                            className="w-full h-full object-cover"
                          />
                        </Avatar>
                      )}
                      <div
                        className={`max-w-xs lg:max-w-md rounded-3xl shadow-sm border ${
                          message.isFromUser
                            ? 'bg-gradient-to-br from-white to-gray-50 text-black border-white/20 rounded-br-xl'
                            : 'bg-gradient-to-br from-accent to-accent/80 text-accent-foreground border-accent/20 rounded-bl-xl'
                        }`}
                      >
                        {/* Text Message */}
                        {message.type === 'text' && (
                          <div className="px-5 py-3">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-2 ${message.isFromUser ? 'text-gray-500' : 'text-muted-foreground/70'}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        )}

                        {/* Voice Message */}
                        {message.type === 'voice' && (
                          <div className="px-4 py-3 flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVoicePlayback(message.id)}
                              className="w-8 h-8 rounded-full p-0"
                            >
                              {playingVoiceId === message.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Volume2 className="w-3 h-3" />
                                <div className="flex-1 h-1 bg-muted rounded-full">
                                  <div className="h-1 bg-current rounded-full w-1/3"></div>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs">{formatVoiceDuration(message.duration || 0)}</span>
                            <p className={`text-xs ${message.isFromUser ? 'text-gray-500' : 'text-muted-foreground/70'}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        )}

                        {/* Image Message */}
                        {message.type === 'image' && (
                          <div className="overflow-hidden">
                            <img 
                              src={message.mediaUrl} 
                              alt="Shared image"
                              className="w-full h-48 object-cover rounded-t-3xl"
                            />
                            {message.content && (
                              <div className="px-5 py-3">
                                <p className="text-sm leading-relaxed">{message.content}</p>
                              </div>
                            )}
                            <div className="px-5 py-2">
                              <p className={`text-xs ${message.isFromUser ? 'text-gray-500' : 'text-muted-foreground/70'}`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* File Message */}
                        {message.type === 'file' && (
                          <div className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{message.fileName}</p>
                                <p className="text-xs text-muted-foreground">{message.fileSize}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="rounded-full">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className={`text-xs mt-2 ${message.isFromUser ? 'text-gray-500' : 'text-muted-foreground/70'}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Customer Reviews Section */}
              <div className="border-t border-border bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm p-4">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground">See what customers are saying</h4>
                </div>
                <ScrollArea className="h-24">
                  <div className="space-y-2 pr-4">
                    {selectedConversation.reviews && selectedConversation.reviews.length > 0 ? (
                      selectedConversation.reviews.map((review) => (
                        <div 
                          key={review.id}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-accent/20 hover:bg-accent/30 transition-all duration-200 border border-border/30"
                        >
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs font-medium">{review.stars}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs">
                              <span className="font-medium">{review.customerName}:</span>{' '}
                              <span className="text-muted-foreground">{review.comment}</span>
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground italic">No reviews yet</p>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-border bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm">
                {/* Voice Recording Overlay */}
                {isRecording && (
                  <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 animate-pulse">
                        <MicIcon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-lg font-medium mb-2">Recording...</p>
                      <p className="text-2xl font-mono">{formatVoiceDuration(recordingTime)}</p>
                      <div className="flex gap-4 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsRecording(false);
                            setRecordingTime(0);
                            if (recordingIntervalRef.current) {
                              clearInterval(recordingIntervalRef.current);
                            }
                          }}
                          className="rounded-2xl"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={stopVoiceRecording}
                          className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attachment Options */}
                {showAttachments && (
                  <div className="mb-4 flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-2xl gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Camera
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-2xl gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Gallery
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-2xl gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Document
                    </Button>
                  </div>
                )}

                <div className="flex gap-3 items-end">
                  {/* Attachment Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAttachments(!showAttachments)}
                    className="rounded-2xl hover:bg-accent/50 w-10 h-10 p-0"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>

                  <div className="flex-1 relative">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="rounded-3xl bg-accent/30 border-accent/40 py-4 px-5 text-sm focus:bg-accent/50 focus:border-accent/60 transition-all duration-200 pr-12"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    {newMessage.trim() && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          size="sm"
                          className="rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-200 w-8 h-8 p-0 shadow-lg"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Voice Record/Send Button */}
                  {!newMessage.trim() ? (
                    <Button
                      onMouseDown={startVoiceRecording}
                      onMouseUp={stopVoiceRecording}
                      onTouchStart={startVoiceRecording}
                      onTouchEnd={stopVoiceRecording}
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-accent/50 w-10 h-10 p-0"
                    >
                      <MicIcon className="w-5 h-5" />
                    </Button>
                  ) : null}
                </div>

                <p className="text-xs text-muted-foreground mt-2 px-2">
                  Hold to record voice message • Press Enter to send
                </p>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*,application/*"
                  onChange={handleFileUpload}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a chef from your messages to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}