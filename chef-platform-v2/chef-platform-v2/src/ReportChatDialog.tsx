import { useState } from 'react';
import { AlertTriangle, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface ReportChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  chefName: string;
  chefId: string;
}

const reportReasons = [
  { value: 'harassment', label: 'Harassment or inappropriate behaviour' },
  { value: 'spam', label: 'Spam or scam attempts' },
  { value: 'offensive', label: 'Offensive language or content' },
  { value: 'safety', label: 'Safety concerns' },
  { value: 'other', label: 'Other reason' }
];

export function ReportChatDialog({ isOpen, onClose, chefName, chefId }: ReportChatDialogProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      console.log('Chat report submitted:', {
        chefId,
        chefName,
        reason: selectedReason,
        description
      });
      setIsSubmitting(false);
      setSelectedReason('');
      setDescription('');
      alert('Thank you for your report. Our safety team will review this matter.');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-card border-border rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Report Chat</h2>
                <p className="text-sm text-muted-foreground">With {chefName}</p>
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
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Reason Selection */}
          <div className="space-y-3">
            <Label>Why are you reporting this chat?</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              <div className="space-y-2">
                {reportReasons.map((reason) => (
                  <label
                    key={reason.value}
                    htmlFor={reason.value}
                    className="flex items-center p-3 rounded-2xl border border-border hover:border-accent hover:bg-accent/20 transition-all duration-200 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={reason.value}
                      id={reason.value}
                      className="mr-3"
                    />
                    <span className="text-sm">{reason.label}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label>Additional details (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide any additional information that might help us investigate..."
              className="rounded-2xl min-h-[100px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/500 characters
            </p>
          </div>

          {/* Safety Notice */}
          <Card className="p-4 rounded-2xl bg-accent/20 border-border/50">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Your safety is our priority</p>
                <p className="text-xs text-muted-foreground">
                  All reports are reviewed by our safety team. For immediate assistance, please contact{' '}
                  <a
                    href="mailto:helpdesk@tableandplate.co.za"
                    className="text-pink-500 hover:text-pink-400 underline"
                  >
                    helpdesk@tableandplate.co.za
                  </a>
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedReason || isSubmitting}
              className="flex-1 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
