import { useState } from 'react';
import { X, Star, AlertTriangle, MessageSquare, ChefHat, Calendar, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface BookedChef {
  id: string;
  name: string;
  surname: string;
  image: string;
  bookingDate: Date;
  status: 'completed' | 'upcoming' | 'cancelled';
}

interface Incident {
  id: string;
  chefName: string;
  date: Date;
  status: 'open' | 'investigating' | 'resolved';
  description: string;
}

interface ReviewExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookedChefs?: BookedChef[];
  incidents?: Incident[];
}

// Mock data for demonstration
const mockBookedChefs: BookedChef[] = [
  {
    id: '1',
    name: 'Marco',
    surname: 'Pellegrini',
    image: 'https://images.unsplash.com/photo-1622001635931-3874528bd099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwY29va2luZyUyMGdvdXJtZXQlMjBmb29kfGVufDF8fHx8MTc1ODQxMzU1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bookingDate: new Date('2024-01-10'),
    status: 'completed'
  },
  {
    id: '2',
    name: 'Amara',
    surname: 'Johnson',
    image: 'https://images.unsplash.com/photo-1719329466199-f18fb7f6972e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTg0MTM2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bookingDate: new Date('2024-01-05'),
    status: 'completed'
  }
];

const mockIncidents: Incident[] = [
  {
    id: 'inc1',
    chefName: 'Sofia Rodriguez',
    date: new Date('2024-01-08'),
    status: 'investigating',
    description: 'Chef arrived 30 minutes late'
  }
];

export function ReviewExperienceModal({ 
  isOpen, 
  onClose, 
  bookedChefs = mockBookedChefs,
  incidents = mockIncidents 
}: ReviewExperienceModalProps) {
  const [activeTab, setActiveTab] = useState<'review' | 'incident'>('review');
  const [selectedChef, setSelectedChef] = useState<BookedChef | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [incidentMessage, setIncidentMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitReview = () => {
    if (!selectedChef || rating === 0) return;
    
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      console.log('Review submitted:', {
        chefId: selectedChef.id,
        rating,
        comment: reviewText
      });
      setIsSubmitting(false);
      setSelectedChef(null);
      setRating(0);
      setReviewText('');
      // Show success message or close modal
      alert('Thank you for your review!');
    }, 1000);
  };

  const handleSubmitIncident = () => {
    if (!incidentMessage.trim()) return;
    
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      console.log('Incident follow-up submitted:', {
        incidentId: selectedIncident?.id,
        message: incidentMessage
      });
      setIsSubmitting(false);
      setIncidentMessage('');
      // Show success message
      alert('Your message has been sent to our support team.');
    }, 1000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'investigating':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'resolved':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-3xl bg-card border-border rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Review your Experience</h2>
                <p className="text-sm text-muted-foreground">Help us maintain quality service</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full w-10 h-10 p-0 hover:bg-accent/80"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            <Button
              variant={activeTab === 'review' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('review')}
              className={`rounded-2xl flex-1 ${
                activeTab === 'review'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                  : 'hover:bg-accent/50'
              }`}
            >
              <Star className="w-4 h-4 mr-2" />
              Leave a Review
            </Button>
            <Button
              variant={activeTab === 'incident' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('incident')}
              className={`rounded-2xl flex-1 ${
                activeTab === 'incident'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                  : 'hover:bg-accent/50'
              }`}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Follow up Incident
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[60vh]">
          <div className="p-6">
            {activeTab === 'review' ? (
              <div className="space-y-6">
                {/* Chef Selection */}
                {!selectedChef ? (
                  <div>
                    <h3 className="font-semibold mb-4">Select a chef to review</h3>
                    {bookedChefs.filter(chef => chef.status === 'completed').length === 0 ? (
                      <Card className="p-8 text-center rounded-2xl bg-accent/20">
                        <ChefHat className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          You haven't had any completed bookings yet.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Book a chef to leave a review after your experience.
                        </p>
                      </Card>
                    ) : (
                      <div className="space-y-3">
                        {bookedChefs.filter(chef => chef.status === 'completed').map((chef) => (
                          <button
                            key={chef.id}
                            onClick={() => setSelectedChef(chef)}
                            className="w-full p-4 rounded-2xl border border-border hover:border-accent hover:bg-accent/20 transition-all duration-200 text-left group"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={chef.image}
                                alt={`${chef.name} ${chef.surname}`}
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-border group-hover:border-accent transition-colors"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{chef.name} {chef.surname}</h4>
                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>Booked on {formatDate(chef.bookingDate)}</span>
                                </div>
                              </div>
                              <ChefHat className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {/* Selected Chef Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedChef.image}
                          alt={`${selectedChef.name} ${selectedChef.surname}`}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-border"
                        />
                        <div>
                          <h4 className="font-semibold">{selectedChef.name} {selectedChef.surname}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(selectedChef.bookingDate)}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedChef(null)}
                        className="rounded-2xl"
                      >
                        Change
                      </Button>
                    </div>

                    <Separator className="mb-6" />

                    {/* Rating */}
                    <div className="space-y-3">
                      <Label>How would you rate your experience?</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-10 h-10 ${
                                star <= (hoverRating || rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {rating === 1 && 'Poor'}
                          {rating === 2 && 'Fair'}
                          {rating === 3 && 'Good'}
                          {rating === 4 && 'Very Good'}
                          {rating === 5 && 'Excellent'}
                        </p>
                      )}
                    </div>

                    {/* Review Text */}
                    <div className="space-y-3 mt-6">
                      <Label>Share your experience (optional)</Label>
                      <Textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Tell us about your experience with this chef..."
                        className="rounded-2xl min-h-[120px] resize-none"
                        maxLength={500}
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {reviewText.length}/500 characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmitReview}
                      disabled={rating === 0 || isSubmitting}
                      className="w-full mt-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Incident Selection */}
                <div>
                  <h3 className="font-semibold mb-4">Your incidents</h3>
                  {incidents.length === 0 ? (
                    <Card className="p-8 text-center rounded-2xl bg-accent/20">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        You have no active incidents.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        We're glad everything has been smooth!
                      </p>
                    </Card>
                  ) : (
                    <RadioGroup
                      value={selectedIncident?.id}
                      onValueChange={(value) => {
                        const incident = incidents.find(inc => inc.id === value);
                        setSelectedIncident(incident || null);
                      }}
                    >
                      <div className="space-y-3">
                        {incidents.map((incident) => (
                          <label
                            key={incident.id}
                            htmlFor={incident.id}
                            className="flex items-start p-4 rounded-2xl border border-border hover:border-accent hover:bg-accent/20 transition-all duration-200 cursor-pointer"
                          >
                            <RadioGroupItem
                              value={incident.id}
                              id={incident.id}
                              className="mt-1 mr-3"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">Incident with {incident.chefName}</h4>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs border ${getStatusBadgeColor(
                                    incident.status
                                  )}`}
                                >
                                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {incident.description}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>Reported on {formatDate(incident.date)}</span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  )}
                </div>

                {/* Follow-up Message */}
                {selectedIncident && (
                  <div className="space-y-3">
                    <Label>Add a message to your incident</Label>
                    <Textarea
                      value={incidentMessage}
                      onChange={(e) => setIncidentMessage(e.target.value)}
                      placeholder="Provide additional information or ask for an update..."
                      className="rounded-2xl min-h-[120px] resize-none"
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {incidentMessage.length}/500 characters
                    </p>

                    <Button
                      onClick={handleSubmitIncident}
                      disabled={!incidentMessage.trim() || isSubmitting}
                      className="w-full rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                )}

                <Separator />

                {/* Help Text */}
                <Card className="p-4 rounded-2xl bg-accent/20 border-border/50">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Need immediate assistance?</p>
                      <p className="text-sm text-muted-foreground">
                        For urgent matters, please contact our helpdesk at{' '}
                        <a
                          href="mailto:helpdesk@tableandplate.co.za"
                          className="text-pink-500 hover:text-pink-400 underline"
                        >
                          helpdesk@tableandplate.co.za
                        </a>{' '}
                        or call us at{' '}
                        <a
                          href="tel:+27123456789"
                          className="text-pink-500 hover:text-pink-400 underline"
                        >
                          +27 12 345 6789
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
