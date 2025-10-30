"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputOTP } from "@/components/ui/input-otp";
import { ArrowLeft, ArrowRight, Check, Upload, X } from "lucide-react";

type Props = { modal?: boolean; onClose?: () => void };

export default function ChefSignupFlow({ modal = false, onClose }: Props) {
  const TOTAL_STEPS = 5;
  const [step, setStep] = useState(1);

  // Step 1
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Step 2
  const [otp, setOtp] = useState("");
  const [resendIn, setResendIn] = useState(0);

  // Step 3
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  // Step 4
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);

  // Step 5
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);

  const progress = useMemo(() => (step / TOTAL_STEPS) * 100, [step]);

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);
  };

  const handleFiles = (files: FileList | null, single = false) => {
    if (!files?.length) return;
    const readers = Array.from(files).slice(0, single ? 1 : 15).map(
      (file) =>
        new Promise<string>((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result));
          r.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((urls) => {
      if (single) setProfilePhoto(urls[0] || null);
      else setGallery((g) => [...g, ...urls].slice(0, 15));
    });
  };

  const canNext = () => {
    if (step === 1) return !!email && !!mobile;
    if (step === 2) return otp.length === 6;
    if (step === 3) return !!firstName && !!lastName && !!city;
    if (step === 4) return !!profilePhoto && gallery.length >= 1; // relax to 1 for now
    return specialties.length > 0 && !!experience && !!priceMin && !!priceMax;
  };

  const CardBody = (
      <Card className="w-full max-w-[640px] bg-neutral-900 text-white rounded-[24px] md:rounded-[28px] shadow-2xl border border-white/10 overflow-hidden relative">
        {modal && (
          <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/70 hover:bg-muted flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        )}
        {/* Top bar */}
        <div className="p-6 md:p-8 border-b border-border/60">
          <div className="text-xs md:text-sm mb-3 md:mb-4">Step {step} of {TOTAL_STEPS}</div>
          <div className="h-[6px] w-full rounded-full bg-muted">
            <div className="h-[6px] rounded-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {step === 1 && (
            <div>
              <div className="text-center mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pink-500 text-white mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl">⚕︎</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold">Join Table & Plate as a Chef</h2>
                <p className="text-base md:text-lg text-muted-foreground">Start your journey and connect with discerning clients</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Email address</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="rounded-2xl" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Mobile number</label>
                  <Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+27 XX XXX XXXX" className="rounded-2xl" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Verify your number</h2>
              <p className="text-center text-muted-foreground mb-6 md:mb-8">We've sent a 6-digit code to {mobile || "your mobile"}</p>
              <div>
                <label className="block text-sm mb-1">Verification code</label>
                <InputOTP value={otp} onValueChange={setOtp} placeholder="Enter 6-digit code" className="rounded-2xl" />
                <div className="text-sm text-muted-foreground mt-4 text-center">
                  Didn't receive the code? {resendIn > 0 ? `Resend in ${resendIn}s` : <button className="underline" onClick={() => setResendIn(30)}>Resend</button>}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Tell us about yourself</h2>
              <p className="text-center text-muted-foreground mb-6 md:mb-8">Build your professional chef profile</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">First name</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-2xl" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last name</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-2xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Primary location</label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Select your city" /></SelectTrigger>
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
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Professional bio</label>
                  <Textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={500} placeholder="Tell potential clients about your culinary journey, training, and passion for cooking..." className="rounded-2xl min-h-[140px]" />
                  <div className="text-xs text-muted-foreground mt-1">{bio.length}/500 characters</div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Showcase your work</h2>
              <p className="text-center text-muted-foreground mb-6 md:mb-8">Add a profile photo and gallery images of your dishes</p>

              {/* Profile photo */}
              <div className="space-y-2 mb-6">
                <label className="block text-sm mb-1">Main profile photo</label>
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-4">
                  <div className="aspect-[3/1.3] w-full rounded-2xl flex items-center justify-center">
                    {profilePhoto ? (
                      <div className="relative w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center" onClick={() => setProfilePhoto(null)}><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-full gap-2 cursor-pointer">
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">Click to upload your profile photo</div>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files, true)} />
                      </label>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">PNG, JPG up to 10MB</div>
                </div>
              </div>

              {/* Gallery */}
              <div className="space-y-2">
                <label className="block text-sm mb-1">Gallery images ({gallery.length}/15)</label>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {gallery.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover" />
                      <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center" onClick={() => setGallery((g) => g.filter((_, idx) => idx !== i))}><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-border/60 bg-muted/20 flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                  </label>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Add 5-15 images showcasing your culinary creations</div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Your expertise</h2>
              <p className="text-center text-muted-foreground mb-6 md:mb-8">Help clients understand your culinary skills</p>

              <div className="space-y-6">
                {/* Specialties */}
                <div>
                  <label className="block text-sm md:text-base mb-2">Culinary specialties</label>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {[
                      "Italian","French","Japanese","Chinese","Indian","Thai","Mediterranean","African Fusion","South African","Spanish","Mexican","Vegan","Vegetarian","BBQ & Braai","Seafood","Pastry & Desserts","Wine Pairing"
                    ].map((sp) => (
                      <button key={sp} onClick={() => toggle(specialties, setSpecialties, sp)} className={`px-3 py-2 rounded-2xl border text-sm md:text-base ${specialties.includes(sp) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:border-foreground/40'}`}>{sp}</button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm mb-1">Years of experience</label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="rounded-2xl"><SelectValue placeholder="Select your experience level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="4-7">4-7 years</SelectItem>
                      <SelectItem value="8-12">8-12 years</SelectItem>
                      <SelectItem value="13-20">13-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price range */}
                <div>
                  <label className="block text-sm mb-2">Price range per person</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="number" placeholder="Min (R)" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="rounded-2xl" />
                    <Input type="number" placeholder="Max (R)" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="rounded-2xl" />
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-sm mb-2">Certifications (optional)</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Culinary Arts Degree","Professional Chef Certificate","Food Safety & Hygiene","Wine Sommelier","Pastry Specialist"].map((c) => (
                      <label key={c} className="flex items-center gap-3 p-3 rounded-2xl border border-border">
                        <input type="checkbox" checked={certifications.includes(c)} onChange={() => toggle(certifications, setCertifications, c)} className="rounded-full" />
                        <span className="text-sm">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 border-t border-border/60 flex items-center justify-between">
          {step > 1 ? (
            <Button variant="outline" className="rounded-2xl" onClick={() => setStep((s) => Math.max(1, s - 1))}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <Button disabled={!canNext()} className="rounded-2xl px-6 md:px-8 bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600" onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button disabled={!canNext()} className="rounded-2xl px-6 md:px-8 bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600">
              <Check className="w-4 h-4 mr-2" /> Complete signup
            </Button>
          )}
        </div>
      </Card>
  );

  if (modal) {
    return CardBody;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-black/40 backdrop-blur-sm">{CardBody}</div>
  );
}
