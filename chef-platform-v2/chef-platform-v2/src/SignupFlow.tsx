import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Phone, Mail, User, MapPin, Calendar, Users, Utensils, ChevronLeft, ChevronRight, Ticket } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface SignupFlowProps {
  onComplete: (userData: any) => void;
  onClose: () => void;
}

export function SignupFlow({ onComplete, onClose }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [userData, setUserData] = useState({
    email: '',
    mobile: '',
    otp: '',
    firstName: '',
    lastName: '',
    city: '',
    couponCode: '',
    dietaryRequirements: [] as string[],
    selectedDates: [] as string[],
    mealTypes: [] as string[],
    coursePreference: '',
    drinkPairings: false,
    guestCount: 1,
    guestAges: [{ ageGroup: 'above21', count: 1 }] as Array<{ ageGroup: string; count: number }>
  });

  const totalSteps = 6;

  const dietaryOptions = [
    'Halaal',
    'Kosher',
    'Vegetarian',
    'Vegan',
    'Lactose-free',
    'Gluten-free',
    'Nut-free'
  ];

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
  const courseOptions = [
    'Starters, mains & desserts',
    'Starters & mains', 
    'Mains & desserts', 
    'Mains only'
  ];
  const ageGroups = [
    { value: 'above21', label: 'Above 21' },
    { value: '12to20', label: '12 - 20 years' },
    { value: 'under12', label: 'Under 12' }
  ];

  // Generate years from 2025 onwards
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 5; year++) {
      years.push(year);
    }
    return years;
  };

  // Generate months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calendar helper functions
  const generateCalendarDays = () => {
    const year = currentYear;
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = currentDate.getMonth() === month;
      const isPast = currentDate < today.setHours(0, 0, 0, 0);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelected = userData.selectedDates.some(selectedDate => 
        new Date(selectedDate).toDateString() === currentDate.toDateString()
      );
      
      days.push({
        date: currentDate,
        day: currentDate.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isSelected
      });
    }
    
    return days;
  };

  const handleDateSelect = (day: any) => {
    if (day.isPast || !day.isCurrentMonth) return;
    
    const dateString = day.date.toISOString().split('T')[0];
    const isSelected = userData.selectedDates.includes(dateString);
    
    if (isSelected) {
      updateUserData('selectedDates', userData.selectedDates.filter(date => date !== dateString));
    } else {
      updateUserData('selectedDates', [...userData.selectedDates, dateString]);
    }
  };

  const updateUserData = (field: string, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
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

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    if (checked) {
      updateUserData('dietaryRequirements', [...userData.dietaryRequirements, dietary]);
    } else {
      updateUserData('dietaryRequirements', userData.dietaryRequirements.filter(d => d !== dietary));
    }
  };

  const handleMealTypeChange = (mealType: string, checked: boolean) => {
    if (checked) {
      updateUserData('mealTypes', [...userData.mealTypes, mealType]);
    } else {
      updateUserData('mealTypes', userData.mealTypes.filter(m => m !== mealType));
    }
  };

  const handleGuestAgeChange = (ageGroup: string, count: number) => {
    const existingAges = userData.guestAges.filter(ag => ag.ageGroup !== ageGroup);
    if (count > 0) {
      updateUserData('guestAges', [...existingAges, { ageGroup, count }]);
    } else {
      updateUserData('guestAges', existingAges);
    }
  };

  const getTotalGuests = () => {
    return userData.guestAges.reduce((total, ag) => total + ag.count, 0);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return userData.email && userData.mobile;
      case 2:
        return userData.otp.length === 6;
      case 3:
        return userData.firstName && userData.lastName && userData.city;
      case 4:
        return true; // Coupon code is optional
      case 5:
        return userData.dietaryRequirements.length > 0;
      case 6:
        return userData.selectedDates.length > 0 && userData.mealTypes.length > 0 && userData.coursePreference;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    onComplete(userData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Welcome to Table & Plate</h2>
              <p className="text-muted-foreground">Let's start with your contact details</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={userData.email}
                  onChange={(e) => updateUserData('email', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              
              <div>
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+27 XX XXX XXXX"
                  value={userData.mobile}
                  onChange={(e) => updateUserData('mobile', e.target.value)}
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
                We've sent a 6-digit code to {userData.mobile}
              </p>
            </div>
            
            <div>
              <Label htmlFor="otp">Verification code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={userData.otp}
                onChange={(e) => updateUserData('otp', e.target.value)}
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
              <p className="text-muted-foreground">We'll use this to personalise your experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  First name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={userData.firstName}
                  onChange={(e) => updateUserData('firstName', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Smith"
                  value={userData.lastName}
                  onChange={(e) => updateUserData('lastName', e.target.value)}
                  className="rounded-2xl"
                />
              </div>
              
              <div>
                <Label htmlFor="city" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  City
                </Label>
                <Select value={userData.city} onValueChange={(value) => updateUserData('city', value)}>
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
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Coupon code</h2>
              <p className="text-muted-foreground">Have a promo code? Enter it below (optional)</p>
            </div>
            
            <div>
              <Label htmlFor="couponCode" className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Promo code
              </Label>
              <Input
                id="couponCode"
                type="text"
                placeholder="Enter your promo code"
                value={userData.couponCode}
                onChange={(e) => updateUserData('couponCode', e.target.value.toUpperCase())}
                className="rounded-2xl"
              />
              {userData.couponCode && (
                <p className="text-xs text-muted-foreground mt-2">
                  We'll validate your code when you complete your first booking
                </p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Dietary requirements</h2>
              <p className="text-muted-foreground">Select all that apply to ensure we match you with the right chefs</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((dietary) => (
                <div key={dietary} className="flex items-center space-x-3 p-3 rounded-2xl border border-border hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id={dietary}
                    checked={userData.dietaryRequirements.includes(dietary)}
                    onCheckedChange={(checked) => handleDietaryChange(dietary, checked as boolean)}
                  />
                  <Label htmlFor={dietary} className="flex-1 cursor-pointer">{dietary}</Label>
                </div>
              ))}
            </div>
            
            {userData.dietaryRequirements.length > 0 && (
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Selected requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {userData.dietaryRequirements.map((dietary) => (
                    <Badge key={dietary} variant="secondary" className="rounded-xl">
                      {dietary}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl">Booking preferences</h2>
              <p className="text-muted-foreground">Help us understand your dining requirements</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4" />
                  Preferred dates
                </Label>
                
                {/* Calendar Controls */}
                <div className="flex items-center justify-between mb-4">
                  <Select value={months[currentMonth.getMonth()]} onValueChange={(month) => {
                    const monthIndex = months.indexOf(month);
                    setCurrentMonth(new Date(currentYear, monthIndex, 1));
                  }}>
                    <SelectTrigger className="rounded-2xl w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={currentYear.toString()} onValueChange={(year) => {
                    setCurrentYear(parseInt(year));
                    setCurrentMonth(new Date(parseInt(year), currentMonth.getMonth(), 1));
                  }}>
                    <SelectTrigger className="rounded-2xl w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {generateYears().map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Calendar Grid */}
                <div className="bg-card rounded-2xl p-3 border border-border">
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="p-1 text-xs text-muted-foreground font-medium">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(day)}
                        disabled={day.isPast || !day.isCurrentMonth}
                        className={`
                          h-8 w-8 text-xs rounded-xl transition-all duration-200 font-medium
                          ${!day.isCurrentMonth ? 'text-muted-foreground/30' : ''}
                          ${day.isPast ? 'text-muted-foreground/40 cursor-not-allowed' : ''}
                          ${day.isCurrentMonth && !day.isPast ? 'hover:bg-accent text-foreground' : ''}
                          ${day.isToday ? 'bg-accent/60 font-semibold' : ''}
                          ${day.isSelected ? 'bg-white text-black shadow-sm' : ''}
                        `}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>

                {userData.selectedDates.length > 0 && (
                  <div className="mt-3 p-3 bg-white/5 rounded-2xl">
                    <p className="text-sm text-muted-foreground mb-2">Selected dates:</p>
                    <div className="flex flex-wrap gap-2">
                      {userData.selectedDates.map((dateString) => {
                        const date = new Date(dateString);
                        return (
                          <Badge key={dateString} variant="secondary" className="rounded-xl text-xs">
                            {date.toLocaleDateString('en-GB', { 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Utensils className="w-4 h-4" />
                  Meal types
                </Label>
                <div className="flex flex-wrap gap-3">
                  {mealTypes.map((mealType) => (
                    <div key={mealType} className="flex items-center space-x-2">
                      <Checkbox
                        id={mealType}
                        checked={userData.mealTypes.includes(mealType)}
                        onCheckedChange={(checked) => handleMealTypeChange(mealType, checked as boolean)}
                      />
                      <Label htmlFor={mealType}>{mealType}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Course preference</Label>
                <Select value={userData.coursePreference} onValueChange={(value) => updateUserData('coursePreference', value)}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Select course preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-2xl border border-border">
                <Checkbox
                  id="drinkPairings"
                  checked={userData.drinkPairings}
                  onCheckedChange={(checked) => updateUserData('drinkPairings', checked)}
                />
                <Label htmlFor="drinkPairings" className="flex-1">
                  Include drink pairings with meals
                </Label>
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4" />
                  Guest information
                </Label>
                <div className="space-y-3">
                  {ageGroups.map((ageGroup) => {
                    const currentCount = userData.guestAges.find(ag => ag.ageGroup === ageGroup.value)?.count || 0;
                    return (
                      <div key={ageGroup.value} className="flex items-center justify-between p-3 rounded-2xl border border-border">
                        <Label>{ageGroup.label}</Label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 rounded-full p-0"
                            onClick={() => handleGuestAgeChange(ageGroup.value, Math.max(0, currentCount - 1))}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={currentCount}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              handleGuestAgeChange(ageGroup.value, Math.max(0, value));
                            }}
                            className="w-16 h-8 text-center rounded-xl border-border bg-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="0"
                            max="999"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 rounded-full p-0"
                            onClick={() => handleGuestAgeChange(ageGroup.value, currentCount + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Total guests: {getTotalGuests()}
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
              className="bg-white h-2 rounded-full transition-all duration-300"
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
              className="flex-1 rounded-2xl bg-white text-black hover:bg-white/90"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete} 
              disabled={!canProceed()}
              className="flex-1 rounded-2xl bg-white text-black hover:bg-white/90"
            >
              <Check className="w-4 h-4 mr-2" />
              Complete setup
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}