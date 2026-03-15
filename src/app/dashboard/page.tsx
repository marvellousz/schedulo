"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Globe, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Video,
  Calendar,
  Loader2,
  LogOut,
  User,
  Plus
} from "lucide-react";
import { signOut } from "next-auth/react";

// Form validation schema for email
const emailFormSchema = z.object({
  to: z.string().refine((val) => {
    // Allow a single email or comma-separated list of emails
    const emails = val.split(',').map(email => email.trim());
    return emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, { 
    message: "Please enter valid email addresses (separate multiple emails with commas)" 
  }),
  cc: z.string().refine((val) => {
    // Empty string or valid emails
    if (val === "") return true;
    const emails = val.split(',').map(email => email.trim());
    return emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, { 
    message: "Please enter valid email addresses (separate multiple emails with commas)" 
  }).optional().or(z.literal("")),
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z.string().min(1, { message: "Email body is required" }),
  includeMeet: z.boolean().default(false),
  meetDate: z.string().optional(),
  meetTime: z.string().optional(),
  meetDuration: z.string().optional(),
  meetTimeZone: z.string().default("Etc/UTC"),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

// Helper function to get tomorrow's date
const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

// Common time zones with friendly names
const commonTimeZones = [
  { value: "Etc/UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (US & Canada)" },
  { value: "America/Chicago", label: "Central Time (US & Canada)" },
  { value: "America/Denver", label: "Mountain Time (US & Canada)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
  { value: "America/Anchorage", label: "Alaska (US)" },
  { value: "Pacific/Honolulu", label: "Hawaii (US)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Central European Time (Paris, Berlin)" },
  { value: "Europe/Helsinki", label: "Eastern European Time (Helsinki, Athens)" },
  { value: "Asia/Dubai", label: "Dubai" },
  { value: "Asia/Kolkata", label: "India (Mumbai, New Delhi)" },
  { value: "Asia/Singapore", label: "Singapore" },
  { value: "Asia/Tokyo", label: "Japan (Tokyo)" },
  { value: "Australia/Sydney", label: "Australia Eastern (Sydney, Melbourne)" },
  { value: "Pacific/Auckland", label: "New Zealand (Auckland)" },
];

// Helper function to get local time zone
const getLocalTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Etc/UTC";
  } catch {
    return "Etc/UTC";
  }
};

// Helper to format date and time with time zone
const formatDateTimeWithZone = (dateStr: string, timeStr: string, timeZone: string) => {
  try {
    const date = new Date(`${dateStr}T${timeStr}`);
    
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      timeZone: timeZone
    }).format(date);
  } catch (e) {
    console.error("Error formatting date with timezone:", e);
    return `${dateStr} ${timeStr}`;
  }
};

// Fix the getTimeZoneDisplay function to handle undefined values
const getTimeZoneDisplay = (timeZoneValue: string | undefined) => {
  if (!timeZoneValue) return "UTC (Coordinated Universal Time)";
  const tz = commonTimeZones.find(tz => tz.value === timeZoneValue);
  return tz ? tz.label : timeZoneValue;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  // Enhanced state for date picker UI
  const [selectedDay, setSelectedDay] = useState<Date>(new Date(getTomorrowDate()));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date()); // Track current month view

  // Find the local timezone
  const localTimeZone = getLocalTimeZone();
  const defaultTimeZone = commonTimeZones.find(tz => tz.value === localTimeZone) 
    ? localTimeZone 
    : "Etc/UTC";

  // For searching time zones
  // Remove unused query state

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      to: "",
      cc: "",
      subject: "",
      body: "",
      includeMeet: false,
      meetDate: getTomorrowDate(),
      meetTime: "10:00",
      meetDuration: "60",
      meetTimeZone: defaultTimeZone,
    },
  });

  const includeMeet = watch("includeMeet");
  const meetTime = watch("meetTime");
  const meetDuration = watch("meetDuration");
  const meetTimeZone = watch("meetTimeZone");

  // Handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDay(date);
    setValue("meetDate", date.toISOString().split('T')[0]);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Removed unused functions

  // Function to handle form submission
  async function onSubmit(data: EmailFormValues) {
    setIsLoading(true);
    setMeetLink(null); // Clear any previous meeting link
    try {
      // First, create a Google Meet if requested
      if (data.includeMeet) {
        if (!data.meetDate || !data.meetTime || !data.meetDuration) {
          toast.error("Please complete all meeting fields");
          setIsLoading(false);
          return;
        }

        // Parse recipients for attendees
        const toEmails = data.to.split(',').map(email => email.trim());
        const ccEmails = data.cc ? data.cc.split(',').map(email => email.trim()).filter(email => email !== "") : [];
        const attendees = [...toEmails, ...ccEmails];

        // Create Google Meet
        const meetResponse = await fetch("/api/meet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary: data.subject,
            description: data.body,
            startDateTime: `${data.meetDate}T${data.meetTime}:00`,
            durationMinutes: parseInt(data.meetDuration),
            attendees: attendees, // Send all recipients as attendees
            timeZone: data.meetTimeZone, // Include the time zone
          }),
        });

        if (!meetResponse.ok) {
          const errorData = await meetResponse.json().catch(() => ({}));
          
          if (meetResponse.status === 429) {
            toast.error(`Google Calendar rate limit exceeded. ${errorData.details || 'Please try again in a few minutes.'}`);
            setIsLoading(false);
            return;
          }
          
          throw new Error(errorData.details || "Failed to create Google Meet");
        }

        const meetData = await meetResponse.json();
        setMeetLink(meetData.meetLink);
        
        // Update email body to include Meet link and meeting details with time zone
        const formattedDate = formatDateTimeWithZone(
          data.meetDate,
          data.meetTime,
          data.meetTimeZone
        );
        
        // Create properly formatted HTML meeting details
        const meetingDetailsHTML = `
<div style="margin-top: 30px; padding: 30px; background-color: #FFFFFF; border: 1px solid #E5E5E5; font-family: sans-serif;">
  <div style="font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #EE5336; margin-bottom: 20px;">
    Meeting Confirmed
  </div>
  
  <div style="margin-bottom: 25px;">
    <div style="display: table; width: 100%; border-bottom: 1px solid #F2F2F2; padding-bottom: 12px; margin-bottom: 12px;">
      <div style="display: table-cell; width: 100px; font-family: monospace; font-size: 9px; text-transform: uppercase; color: #666666;">Time</div>
      <div style="display: table-cell; font-weight: bold; font-size: 14px; color: #1A1A1A;">${formattedDate}</div>
    </div>
    
    <div style="display: table; width: 100%; border-bottom: 1px solid #F2F2F2; padding-bottom: 12px; margin-bottom: 12px;">
      <div style="display: table-cell; width: 100px; font-family: monospace; font-size: 9px; text-transform: uppercase; color: #666666;">Time Zone</div>
      <div style="display: table-cell; font-size: 14px; color: #1A1A1A;">${getTimeZoneDisplay(data.meetTimeZone)}</div>
    </div>

    <div style="display: table; width: 100%; padding-bottom: 12px;">
      <div style="display: table-cell; width: 100px; font-family: monospace; font-size: 9px; text-transform: uppercase; color: #666666;">Duration</div>
      <div style="display: table-cell; font-size: 14px; color: #1A1A1A;">${data.meetDuration} Minutes</div>
    </div>
  </div>

  <a href="${meetData.meetLink}" style="display: block; text-align: center; background-color: #EE5336; color: #FFFFFF; text-decoration: none; padding: 18px; font-family: monospace; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em;">
    Join Meeting →
  </a>
  
  <div style="margin-top: 20px; font-family: monospace; font-size: 9px; color: #999999; text-transform: uppercase; text-align: center;">
    * A calendar invitation has been sent to all recipients.
  </div>
</div>`;
        
        data.body = data.body + meetingDetailsHTML;
      }

      // Send the email
      const emailResponse = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json().catch(() => ({}));
        
        if (emailResponse.status === 429) {
          toast.error(`Gmail rate limit exceeded. ${errorData.details || 'Please try again in a few minutes.'}`);
          setIsLoading(false);
          return;
        }
        
        throw new Error(errorData.details || "Failed to send email");
      }

      // Show appropriate success message based on whether a meeting was scheduled
      if (data.includeMeet) {
        toast.success("Email sent and calendar invitations delivered to all recipients!");
      } else {
        toast.success("Email sent successfully!");
      }
      
      // We only reset the form fields but preserve the meetLink state
      // so the user can copy the physical meeting link
      reset();
      // INTENTIONALLY NOT CLEARING MEET LINK: setMeetLink(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate time options for time picker
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const time = `${formattedHour}:${formattedMinute}`;
        options.push(time);
      }
    }
    return options;
  };

  // generateDaysOfWeek removed (unused)

  // Generate dates for the full month view
  const generateMonthDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0-6 (Sunday-Saturday)
    
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    const lastDate = lastDay.getDate();
    
    const datesArray = [];
    
    // Add empty spaces for days before the 1st of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      datesArray.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDate; i++) {
      datesArray.push(new Date(year, month, i));
    }
    
    return datesArray;
  };

  // Get name of the month and year for display
  const getMonthYearDisplay = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Check if a date is selected
  const isDateSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDay.toDateString();
  };

  // Check if a date is in the past
  const isPastDate = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-offwhite py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-brand-primary selection:text-white"
    >
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Technical Grid */}
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        
        {/* Dot Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>

        {/* Dynamic Blobs */}
        <div className="bg-blob bg-blob-primary w-[500px] h-[500px] -top-48 -left-48"></div>
        <div className="bg-blob bg-blob-primary w-[400px] h-[400px] top-1/2 -right-24 delay-1000"></div>
        <div className="bg-blob bg-blob-secondary w-[600px] h-[600px] -bottom-48 left-1/4"></div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      </div>
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10 pb-20">
        {/* Top Navigation */}
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-6 h-6 bg-brand-primary flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-sm font-mono uppercase tracking-[0.2em] font-bold">Schedulo</span>
          </Link>

          <div className="flex items-center space-x-6">
            {session?.user && (
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 border border-brand-gray bg-white">
                {session.user.image ? (
                  <Image src={session.user.image} alt="" className="w-4 h-4 rounded-none" width={16} height={16} />
                ) : (
                  <User className="w-4 h-4 text-muted" />
                )}
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  {session.user.name}
                </span>
              </div>
            )}
            
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-muted hover:text-brand-primary transition-colors group"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="border border-brand-gray bg-white p-8 md:p-16 shadow-sm relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-offwhite -translate-y-32 translate-x-32 rotate-45 pointer-events-none opacity-50"></div>
          <div className="absolute top-0 right-0 p-4"><Plus className="w-4 h-4 text-brand-gray opacity-20" /></div>
          
          <div className="relative z-10 space-y-8">
            <h1 className="cypher-heading text-5xl md:text-8xl tracking-tighter leading-none max-w-4xl">
              Meeting <span className="text-brand-primary">Terminal</span>
            </h1>
            <p className="text-muted font-sans text-xs max-w-xl leading-relaxed">
              Schedule meetings and send professional invitations in seconds.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="border border-brand-gray bg-white relative shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Form Section Header */}
            <div className="bg-brand-offwhite border-b border-brand-gray p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-brand-primary" />
                <h2 className="text-[10px] font-bold font-mono tracking-widest uppercase text-muted">Message Details</h2>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12 bg-white">
              {/* Recipients Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label htmlFor="to" className="text-[9px] font-mono font-bold text-muted uppercase tracking-widest block">
                    Recipient Email
                  </Label>
                  <Input
                    id="to"
                    placeholder="example@domain.com"
                    {...register("to")}
                    className="h-14 bg-brand-offwhite border-brand-gray rounded-none border focus:border-brand-primary focus:ring-0 px-6 font-mono text-xs transition-all placeholder:text-muted/30"
                  />
                  {errors.to && (
                    <p className="text-brand-primary text-[9px] font-mono uppercase mt-2 tracking-tighter">!! {errors.to.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label htmlFor="cc" className="text-[9px] font-mono font-bold text-muted uppercase tracking-widest block">
                    CC (Optional)
                  </Label>
                  <Input
                    id="cc"
                    placeholder="cc@domain.com"
                    {...register("cc")}
                    className="h-14 bg-brand-offwhite border-brand-gray rounded-none border focus:border-brand-primary focus:ring-0 px-6 font-mono text-xs transition-all placeholder:text-muted/30"
                  />
                </div>
              </div>

              {/* Subject & Body */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <Label htmlFor="subject" className="text-[9px] font-mono font-bold text-muted uppercase tracking-widest block">
                    Email Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Enter subject here..."
                    {...register("subject")}
                    className="h-14 bg-brand-offwhite border-brand-gray rounded-none border focus:border-brand-primary focus:ring-0 px-6 font-mono text-xs transition-all placeholder:text-muted/30"
                  />
                  {errors.subject && (
                    <p className="text-brand-primary text-[9px] font-mono uppercase mt-2 tracking-tighter">!! {errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label htmlFor="body" className="text-[9px] font-mono font-bold text-muted uppercase tracking-widest block">
                    Message Body
                  </Label>
                  <Textarea
                    id="body"
                    placeholder="Write your email content here..."
                    {...register("body")}
                    className="min-h-[200px] bg-brand-offwhite border border-brand-gray rounded-none focus:border-brand-primary focus:ring-0 p-8 font-mono text-xs leading-relaxed resize-none placeholder:text-muted/30"
                  />
                </div>
              </div>

              {/* Toggle Section */}
              <div 
                className={`border p-8 flex items-center justify-between cursor-pointer transition-all ${
                  includeMeet ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/10' : 'bg-brand-offwhite border-brand-gray grayscale hover:grayscale-0'
                }`}
                onClick={() => setValue("includeMeet", !includeMeet)}
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-12 h-12 flex items-center justify-center border transition-colors ${
                    includeMeet ? 'bg-white text-brand-primary border-white' : 'bg-white text-muted border-brand-gray'
                  }`}>
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-black uppercase tracking-widest">Google Meet</h3>
                    <p className={`text-[9px] font-mono uppercase tracking-widest ${includeMeet ? 'text-white/70' : 'text-muted'}`}>Enable Video Integration</p>
                  </div>
                </div>
                <div className={`w-5 h-5 border flex items-center justify-center transition-all ${
                  includeMeet ? 'bg-white border-white' : 'border-brand-gray'
                }`}>
                  {includeMeet && <CheckCircle2 className="w-3 h-3 text-brand-primary" />}
                </div>
              </div>

              {/* Google Meet Advanced Options */}
              <AnimatePresence>
                {includeMeet && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-8 md:p-12 space-y-12 bg-white border border-brand-primary/30"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Date Selection */}
                      <div className="space-y-6">
                        <Label className="text-[9px] font-mono font-bold text-brand-primary uppercase tracking-widest block">
                          Meeting Date
                        </Label>
                        <div className="bg-brand-offwhite border border-brand-gray p-8">
                          <div className="flex justify-between items-center mb-8 font-mono">
                            <Button type="button" variant="ghost" size="icon" onClick={goToPreviousMonth} className="hover:text-brand-primary text-muted h-8 w-8">
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{getMonthYearDisplay(currentMonth)}</span>
                            <Button type="button" variant="ghost" size="icon" onClick={goToNextMonth} className="hover:text-brand-primary text-muted h-8 w-8">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-7 gap-1">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                              <div key={`${d}-${idx}`} className="h-8 flex items-center justify-center text-[10px] font-black text-muted/30">{d}</div>
                            ))}
                            {generateMonthDates().map((date, i) => (
                              <div
                                key={i}
                                onClick={() => date && !isPastDate(date) && handleDateChange(date)}
                                className={`
                                  h-10 flex items-center justify-center font-mono text-[10px] transition-all cursor-pointer
                                  ${!date ? 'invisible' : ''}
                                  ${date && isDateSelected(date) ? 'bg-brand-primary text-white font-black' : ''}
                                  ${date && !isDateSelected(date) && !isPastDate(date) ? 'text-muted hover:text-brand-primary hover:bg-white' : ''}
                                  ${date && isPastDate(date) ? 'text-muted/20 cursor-not-allowed' : ''}
                                `}
                              >
                                {date?.getDate().toString().padStart(2, '0')}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Configuration */}
                      <div className="space-y-12">
                        <div className="space-y-6">
                          <Label className="text-[9px] font-mono font-bold text-brand-primary uppercase tracking-widest block">
                            Start Time
                          </Label>
                          <div className="grid grid-cols-4 gap-2 max-h-[168px] overflow-y-auto pr-2">
                            {generateTimeOptions().map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setValue("meetTime", time)}
                                className={`
                                  py-2 px-1 border font-mono text-[9px] transition-all
                                  ${meetTime === time ? 'bg-brand-primary border-brand-primary text-white font-black' : 'bg-white border-brand-gray text-muted hover:border-brand-primary hover:text-brand-primary'}
                                `}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <Label className="text-[9px] font-mono font-bold text-brand-primary uppercase tracking-widest block">
                            Duration
                          </Label>
                          <div className="flex gap-2">
                            {['15', '30', '60', '90'].map(d => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setValue("meetDuration", d)}
                                className={`
                                  flex-1 py-3 border font-mono text-[9px] uppercase font-bold transition-all
                                  ${meetDuration === d ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white border-brand-gray text-muted hover:border-brand-primary'}
                                `}
                              >
                                {d}m
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <Label className="text-[9px] font-mono font-bold text-brand-primary uppercase tracking-widest block">
                            Time Zone
                          </Label>
                          <select
                            {...register("meetTimeZone")}
                            className="w-full h-12 bg-brand-offwhite border border-brand-gray rounded-none px-4 font-mono text-[10px] uppercase tracking-widest focus:border-brand-primary focus:ring-0 outline-none transition-all cursor-pointer"
                          >
                            {commonTimeZones.map((tz) => (
                              <option key={tz.value} value={tz.value} className="bg-white text-black py-2">
                                {tz.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Footer Details */}
                    <div className="pt-10 border-t border-brand-gray flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center font-mono text-[10px] text-muted uppercase tracking-widest">
                        <Globe className="mr-3 h-3 w-3 text-brand-primary" />
                        Zone: <span className="text-black ml-2">{getTimeZoneDisplay(meetTimeZone)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="pt-12">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-24 bg-brand-primary text-white font-mono uppercase text-xl tracking-[0.4em] shadow-xl shadow-brand-primary/10 transition-all hover:brightness-110 active:scale-[0.99] flex items-center justify-center group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-8 h-8 animate-spin mr-8 text-white" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-8 h-8 group-hover:translate-x-2 transition-transform mr-8" />
                        <span>Send</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Success Result */}
              <AnimatePresence>
                {meetLink && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-brand-primary bg-brand-primary/5 p-12 space-y-10"
                  >
                    <div className="flex items-center text-brand-primary font-mono text-xs font-black uppercase tracking-widest">
                      <CheckCircle2 className="h-5 w-5 mr-4" />
                      Email Sent Successfully
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="bg-white border border-brand-gray p-6 flex-grow font-mono text-[10px] text-muted break-all shadow-inner">
                        {meetLink}
                      </div>
                      <button 
                        onClick={() => window.open(meetLink, '_blank')}
                        className="h-16 px-12 bg-white border border-brand-primary text-brand-primary font-mono font-black uppercase text-[10px] tracking-widest transition-all hover:bg-brand-primary hover:text-white"
                      >
                        Join Meeting
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>

      <footer className="mt-2 text-center pb-20">
        <div className="container mx-auto px-6">
          <div className="tech-divider mb-8 opacity-20"></div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted flex items-center justify-center space-x-2">
            <span>© {new Date().getFullYear()} / Developed by</span>
            <Link 
              href="https://github.com/marvlock" 
              target="_blank" 
              className="font-black italic hover:text-brand-primary transition-colors lowercase tracking-normal"
            >
              marvlock
            </Link>
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
