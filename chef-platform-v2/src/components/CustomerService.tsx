'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Star,
  FileText,
  Users,
  CreditCard,
  ChefHat,
  Calendar
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdated: string;
  category: string;
}

export default function CustomerService() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('faq');

  const faqCategories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'booking', label: 'Bookings', icon: Calendar },
    { id: 'payment', label: 'Payments', icon: CreditCard },
    { id: 'chef', label: 'Chef Services', icon: ChefHat },
    { id: 'account', label: 'Account', icon: Users },
    { id: 'technical', label: 'Technical', icon: FileText }
  ];

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I book a chef?',
      answer: 'To book a chef, simply browse our chef profiles, select your preferred chef, choose your date and time, and complete the booking process. You can filter by cuisine, location, price range, and availability.',
      category: 'booking',
      helpful: 45
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets like Apple Pay and Google Pay. All payments are processed securely through Stripe.',
      category: 'payment',
      helpful: 38
    },
    {
      id: '3',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking up to 24 hours before the scheduled service. Cancellations made within 24 hours may be subject to a cancellation fee. You can manage your bookings in your dashboard.',
      category: 'booking',
      helpful: 52
    },
    {
      id: '4',
      question: 'How are chefs vetted and verified?',
      answer: 'All our chefs undergo a rigorous verification process including background checks, culinary certification verification, and customer review validation. We also conduct regular quality assessments.',
      category: 'chef',
      helpful: 41
    },
    {
      id: '5',
      question: 'What if I have dietary restrictions?',
      answer: 'You can specify your dietary requirements during the booking process. Our chefs are experienced in accommodating various dietary needs including allergies, religious requirements, and lifestyle choices.',
      category: 'chef',
      helpful: 67
    },
    {
      id: '6',
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team through the live chat feature, email at support@tableandplate.com, or phone at +27 21 123 4567. We typically respond within 2 hours during business hours.',
      category: 'account',
      helpful: 29
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-001',
      subject: 'Payment not processed',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-03-10',
      lastUpdated: '2024-03-10',
      category: 'payment'
    },
    {
      id: 'TKT-002',
      subject: 'Chef arrived late',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-03-08',
      lastUpdated: '2024-03-09',
      category: 'booking'
    },
    {
      id: 'TKT-003',
      subject: 'Account verification',
      status: 'open',
      priority: 'low',
      createdAt: '2024-03-12',
      lastUpdated: '2024-03-12',
      category: 'account'
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Customer Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Live Chat</h3>
            <p className="text-muted-foreground mb-4">Get instant help from our support team</p>
            <Button className="w-full">Start Chat</Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Phone Support</h3>
            <p className="text-muted-foreground mb-4">Call us at +27 21 123 4567</p>
            <Button variant="outline" className="w-full">Call Now</Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4">Send us an email anytime</p>
            <Button variant="outline" className="w-full">Send Email</Button>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="p-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  {expandedFAQ === faq.id && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-muted-foreground mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {faqCategories.find(cat => cat.id === faq.category)?.label}
                        </Badge>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>Was this helpful?</span>
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4 mr-1" />
                            {faq.helpful}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">Support Tickets</h2>
              <Button>Create New Ticket</Button>
            </div>

            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <Card key={ticket.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{ticket.subject}</h3>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>#{ticket.id}</span>
                        <span>Created: {ticket.createdAt}</span>
                        <span>Updated: {ticket.lastUpdated}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Us Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <Input placeholder="What can we help you with?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea 
                    placeholder="Please describe your issue or question in detail..."
                    rows={6}
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
