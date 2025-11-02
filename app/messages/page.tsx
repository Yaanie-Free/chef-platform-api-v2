import EnhancedMessaging from '@/components/messaging/EnhancedMessaging';
import React from 'react';

// Mock data for demonstration
const mockConversations = [
  {
    id: '1',
    participantId: 'chef1',
    participantName: 'Chef Sarah Johnson',
    participantAvatar: '/api/placeholder/40/40',
    lastMessage: 'Thank you for the booking! I\'ll prepare something special for your dinner party.',
    lastMessageTime: new Date('2024-03-15T14:30:00'),
    unreadCount: 2,
    isOnline: true,
    isTyping: false,
    isPinned: true,
    isArchived: false,
    isMuted: false,
    tags: ['Italian', 'Fine Dining'],
    messages: [
      {
        id: '1',
        senderId: 'chef1',
        senderName: 'Chef Sarah Johnson',
        content: 'Hello! I\'m excited to cook for your dinner party next week.',
        timestamp: new Date('2024-03-15T10:00:00'),
        isFromUser: false,
        type: 'text',
        isRead: true,
        reactions: []
      },
      {
        id: '2',
        senderId: 'user',
        senderName: 'You',
        content: 'Hi Sarah! We\'re really looking forward to it. Any dietary restrictions we should know about?',
        timestamp: new Date('2024-03-15T10:05:00'),
        isFromUser: true,
        type: 'text',
        isRead: true,
        reactions: []
      },
      {
        id: '3',
        senderId: 'chef1',
        senderName: 'Chef Sarah Johnson',
        content: 'Thank you for the booking! I\'ll prepare something special for your dinner party.',
        timestamp: new Date('2024-03-15T14:30:00'),
        isFromUser: false,
        type: 'text',
        isRead: false,
        reactions: []
      }
    ]
  },
  {
    id: '2',
    participantId: 'chef2',
    participantName: 'Chef Michael Chen',
    participantAvatar: '/api/placeholder/40/40',
    lastMessage: 'Can we discuss the menu options for your corporate event?',
    lastMessageTime: new Date('2024-03-14T16:45:00'),
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
    isPinned: false,
    isArchived: false,
    isMuted: false,
    tags: ['Asian', 'Corporate'],
    messages: [
      {
        id: '1',
        senderId: 'chef2',
        senderName: 'Chef Michael Chen',
        content: 'Can we discuss the menu options for your corporate event?',
        timestamp: new Date('2024-03-14T16:45:00'),
        isFromUser: false,
        type: 'text',
        isRead: true,
        reactions: []
      }
    ]
  }
];

export default function MessagesPage() {
  const handleSendMessage = (conversationId: string, message: any) => {
    console.log('Sending message to conversation:', conversationId, message);
    // In a real app, this would send the message to the backend
  };

  const handleStartCall = (conversationId: string, type: 'voice' | 'video') => {
    console.log('Starting call:', type, 'with conversation:', conversationId);
    // In a real app, this would initiate a call
  };

  const handleArchiveConversation = (conversationId: string) => {
    console.log('Archiving conversation:', conversationId);
    // In a real app, this would archive the conversation
  };

  const handlePinConversation = (conversationId: string) => {
    console.log('Pinning conversation:', conversationId);
    // In a real app, this would pin the conversation
  };

  const handleMuteConversation = (conversationId: string) => {
    console.log('Muting conversation:', conversationId);
    // In a real app, this would mute the conversation
  };

  return (
    <div className="min-h-screen bg-background">
      <EnhancedMessaging
        currentUserId="user123"
        conversations={mockConversations}
        onSendMessage={handleSendMessage}
        onStartCall={handleStartCall}
        onArchiveConversation={handleArchiveConversation}
        onPinConversation={handlePinConversation}
        onMuteConversation={handleMuteConversation}
      />
    </div>
  );
}
