import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Phone, Mail, User, MapPin, Upload, Image as ImageIcon, X, Star, Award, Utensils, PackageCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChefSignupFlowProps {
  onComplete: (chefData: any) => void;
  onClose: () => void;
}

export function ChefSignupFlow({ onComplete, onClose }: ChefSignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [chefData, setChefData] = useState({
    email: '',
    mobile: '',
    otp: '',
    firstName: '',
    lastName: '',
    city: '',
    mainImage: null as File | null,
    mainImagePreview: '',
    galleryImages: [] as File[],
    galleryPreviews: [] as string[],
    bio: '',
    specialties: [] as string[],
    experience: '',
    priceRangeMin: '',
    priceRangeMax: '',
    certifications: [] as string[],
    canBringEquipment: false
  });

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryImagesInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 5;

  const specialtyOptions = [
    'Italian',
    'French',
    'Japanese',
    'Chinese',
    'Indian',
    'Thai',
    'Mediterranean',
    'African Fusion',
    'South African',
    'Spanish',
    'Mexican',
    'Vegan',
    'Vegetarian',
    'Fine Dining',
    'BBQ & Braai',
    'Seafood',
    'Pastry & Desserts',
    'Wine Pairing'
  ];

  const certificationOptions = [
    'Culinary Arts Degree',
    'Professional Chef Certificate',
    'Food Safety & Hygiene',
    'Wine Sommelier',
    'Pastry Specialist',
    'Michelin Experience',
    'International Training'
  ];

  const updateChefData = (field: string, value: any) => {
    setChefData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleMainImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChefData(prev => ({
          ...prev,
          mainImage: file,
          mainImagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = 15 - chefData.galleryImages.length;
    const filesToAdd = files.slice(0, remainingSlots);

    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChefData(prev => ({
          ...prev,
          galleryImages: [...prev.galleryImages, file],
          galleryPreviews: [...prev.galleryPreviews, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setChefData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
      galleryPreviews: prev.galleryPreviews.filter((_, i) => i !== index)
    }));
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      updateChefData('specialties', [...chefData.specialties, specialty]);
    } else {
      updateChefData('specialties', chefData.specialties.filter(s => s !== specialty));
    }
  };

  const handleCertificationChange = (certification: string, checked: boolean) => {
    if (checked) {
      updateChefData('certifications', [...chefData.certifications, certification]);
    } else {
      updateChefData('certifications', chefData.certifications.filter(c => c !== certification));
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return chefData.email && chefData.mobile;
      case 2:
        return chefData.otp.length === 6;
      case 3:
        return chefData.firstName && chefData.lastName && chefData.city && chefData.bio;
      case 4:
        return chefData.mainImage && chefData.galleryImages.length >= 5;
      case 5:
        return chefData.specialties.length > 0 && chefData.experience && chefData.priceRangeMin && chefData.priceRangeMax;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    onComplete(chefData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl">Join Table & Plate as a Chef</h2>
              <p className="text-muted-foreground">Start your journey and connect with discerning clients</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="chef-email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email address
                </Label>
                <Input
                  id="chef-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={chefData.email}
                  onChange={(e) => updateChefData('email', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              
              <div>
                <Label htmlFor="chef-mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile number
                </Label>
                <Input
                  id="chef-mobile"
                  type="tel"
                  placeholder="+27 XX XXX XXXX"
                  value={chefData.mobile}
                  onChange={(e) => updateChefData('mobile', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Verify your number</h2>
              <p className="text-muted-foreground">
                We've sent a 6-digit code to {chefData.mobile}
              </p>
            </div>
            
            <div>
              <Label htmlFor="chef-otp">Verification code</Label>
              <Input
                id="chef-otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={chefData.otp}
                onChange={(e) => updateChefData('otp', e.target.value)}
                className="rounded-2xl text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>
            
            <Button variant="ghost" className="w-full rounded-2xl text-muted-foreground">
              Didn't receive the code? Resend
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Tell us about yourself</h2>
              <p className="text-muted-foreground">Build your professional chef profile</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="chef-firstName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  First name
                </Label>
                <Input
                  id="chef-firstName"
                  placeholder="John"
                  value={chefData.firstName}
                  onChange={(e) => updateChefData('firstName', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              
              <div>
                <Label htmlFor="chef-lastName">Last name</Label>
                <Input
                  id="chef-lastName"
                  placeholder="Smith"
                  value={chefData.lastName}
                  onChange={(e) => updateChefData('lastName', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              
              <div>
                <Label htmlFor="chef-city" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Primary location
                </Label>
                <Select value={chefData.city} onValueChange={(value) => updateChefData('city', value)}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cape-town">Cape Town</SelectItem>
                    <SelectItem value="johannesburg">Johannesburg</SelectItem>
                    <SelectItem value="durban">Durban</SelectItem>
                    <SelectItem value="pretoria">Pretoria</SelectItem>
                    <SelectItem value="port-elizabeth">Port Elizabeth</SelectItem>
                    <SelectItem value="bloemfontein">Bloemfontein</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="chef-bio">Professional bio</Label>
                <Textarea
                  id="chef-bio"
                  placeholder="Tell potential clients about your culinary journey, training, and passion for cooking..."
                  value={chefData.bio}
                  onChange={(e) => updateChefData('bio', e.target.value)}
                  className="rounded-2xl min-h-[120px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {chefData.bio.length}/500 characters
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Showcase your work</h2>
              <p className="text-muted-foreground">Add a profile photo and gallery images of your dishes</p>
            </div>
            
            <div className="space-y-6">
              {/* Main Profile Image */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4" />
                  Main profile photo
                </Label>
                <div className="relative">
                  {chefData.mainImagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-border">
                      <ImageWithFallback
                        src={chefData.mainImagePreview}
                        alt="Profile preview"
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                        onClick={() => {
                          setChefData(prev => ({ ...prev, mainImage: null, mainImagePreview: '' }));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => mainImageInputRef.current?.click()}
                      className="w-full h-48 rounded-2xl border-2 border-dashed border-border hover:border-white/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm">Click to upload your profile photo</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </button>
                  )}
                  <input
                    ref={mainImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4" />
                  Gallery images ({chefData.galleryImages.length}/15)
                </Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Add 5-15 images showcasing your culinary creations (minimum 5 required)
                </p>

                <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
                  {chefData.galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden border border-border">
                      <ImageWithFallback
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 rounded-full w-6 h-6 p-0"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {chefData.galleryImages.length < 15 && (
                    <button
                      onClick={() => galleryImagesInputRef.current?.click()}
                      className="h-24 rounded-xl border-2 border-dashed border-border hover:border-white/50 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Add</span>
                    </button>
                  )}
                </div>
                <input
                  ref={galleryImagesInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Your expertise</h2>
              <p className="text-muted-foreground">Help clients understand your culinary skills</p>
            </div>
            
            <div className="space-y-6">
              {/* Specialties */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Utensils className="w-4 h-4" />
                  Culinary specialties
                </Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Select all cuisines you specialise in
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2 p-2 rounded-xl border border-border hover:bg-accent/50 transition-colors">
                      <Checkbox
                        id={`specialty-${specialty}`}
                        checked={chefData.specialties.includes(specialty)}
                        onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                      />
                      <Label htmlFor={`specialty-${specialty}`} className="flex-1 cursor-pointer text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
                {chefData.specialties.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {chefData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="rounded-xl text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="chef-experience" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Years of experience
                </Label>
                <Select value={chefData.experience} onValueChange={(value) => updateChefData('experience', value)}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="4-7">4-7 years</SelectItem>
                    <SelectItem value="8-12">8-12 years</SelectItem>
                    <SelectItem value="13-20">13-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full border border-current text-xs">R</span>
                  Price range per person
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      type="number"
                      placeholder="Min (R)"
                      value={chefData.priceRangeMin}
                      onChange={(e) => updateChefData('priceRangeMin', e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Max (R)"
                      value={chefData.priceRangeMax}
                      onChange={(e) => updateChefData('priceRangeMax', e.target.value)}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Can Bring Equipment */}
              <div className="p-4 rounded-2xl border border-border bg-accent/20">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="bring-equipment"
                    checked={chefData.canBringEquipment}
                    onCheckedChange={(checked) => updateChefData('canBringEquipment', checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="bring-equipment" className="flex items-center gap-2 cursor-pointer">
                      <PackageCheck className="w-4 h-4" />
                      Can bring own supply/equipment at extra cost
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tick this if you can provide your own cooking equipment and supplies for an additional fee
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4" />
                  Certifications (optional)
                </Label>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  {certificationOptions.map((certification) => (
                    <div key={certification} className="flex items-center space-x-2 p-2 rounded-xl border border-border hover:bg-accent/50 transition-colors">
                      <Checkbox
                        id={`cert-${certification}`}
                        checked={chefData.certifications.includes(certification)}
                        onCheckedChange={(checked) => handleCertificationChange(certification, checked as boolean)}
                      />
                      <Label htmlFor={`cert-${certification}`} className="flex-1 cursor-pointer text-sm">
                        {certification}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto p-6 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-2xl">
              ×
            </Button>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep} className="flex-1 rounded-2xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={nextStep} 
              disabled={!canProceed()}
              className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete} 
              disabled={!canProceed()}
              className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
            >
              <Check className="w-4 h-4 mr-2" />
              Complete signup
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
