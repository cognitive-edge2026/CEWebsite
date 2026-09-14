import React, { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Sparkles,
  Search,
} from "lucide-react";
import { US_STATES, StateInfo } from "../data/usLocations";
import { WEBSITE_CONTENT } from "../data/websiteContent";
import { formatPhoneNumber } from "../utils/phoneFormatter";

interface ContactSectionProps {
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledService = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    profile: "",
    state: "",
    city: "",
    email: "",
    phone: "",
    service: prefilledService || "Digital Twin Creation",
    message: "",
  });

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [customCityInput, setCustomCityInput] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Update prefilled service if changed externally
  React.useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  // Selected state object
  const selectedStateObj = useMemo(() => {
    return US_STATES.find((s) => s.name === formData.state || s.code === formData.state);
  }, [formData.state]);

  // Filtered list of cities based on chosen state
  const availableCities = useMemo(() => {
    if (!selectedStateObj) return [];
    if (!citySearch) return selectedStateObj.cities;
    return selectedStateObj.cities.filter((c) =>
      c.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [selectedStateObj, citySearch]);

  const handleStateChange = (stateName: string) => {
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      city: "", // reset city when state changes
    }));
    setCitySearch("");
    setCustomCityInput(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.state || !formData.city) {
      setStatus("error");
      setFeedbackMessage("Please enter your Name, Email, State, and City.");
      return;
    }

    setStatus("submitting");
    setFeedbackMessage("");

    const payload = {
      name: formData.name,
      company: formData.companyName,
      state: formData.state,
      city: formData.city,
      email: formData.email,
      phone: formData.phone,
      profile: formData.profile,
      service: formData.service,
      details: formData.message,
    };

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxNckCKH2KFZnT6nmMpNGZ20GaCx5mpzAReIx9gdn7tWm5ZNbdRqGvVueQuTElHbUAd/exec";

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setStatus("success");
      setFeedbackMessage("Thank you! Your enquiry has been received.");
      setFormData({
        name: "",
        companyName: "",
        profile: "",
        state: "",
        city: "",
        email: "",
        phone: "",
        service: prefilledService || "Digital Twin Creation",
        message: "",
      });
      setCitySearch("");
      setCustomCityInput(false);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setFeedbackMessage(
        "There was an error submitting your enquiry. Please try again or email us directly."
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-2">
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Contact Cognitive Edge
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Ready to experience your building plans in interactive 3D virtual reality? Connect with our spatial computing team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info Cards */}
          <div
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Let's Build Something Extraordinary
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Whether you have an upcoming multi-family development, custom luxury home, or commercial complex, our team provides 1:1 blueprint conversion into photorealistic digital twins and VR walkthroughs.
              </p>

              <div className="space-y-4">
                {/* Phone Card */}
                <a
                  href={`tel:${WEBSITE_CONTENT.brand.phoneRaw}`}
                  id="contact-phone-card"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Phone</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {WEBSITE_CONTENT.brand.phone}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Direct line for project inquiries</p>
                  </div>
                </a>

                {/* Sales Email Card */}
                <a
                  href={`mailto:${WEBSITE_CONTENT.brand.salesEmail}`}
                  id="contact-sales-email-card"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sales Inquiries</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5 uppercase">
                      {WEBSITE_CONTENT.brand.salesEmail}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Custom proposals & project scopes</p>
                  </div>
                </a>

                {/* General Info Email Card */}
                <a
                  href={`mailto:${WEBSITE_CONTENT.brand.enquiryEmail}`}
                  id="contact-info-email-card"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">General Information</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5 uppercase">
                      {WEBSITE_CONTENT.brand.enquiryEmail}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Alternative:{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300 lowercase">
                        {WEBSITE_CONTENT.brand.altEmail}
                      </span>
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Brand Motto */}
            <div className="p-5 rounded-2xl bg-black text-white border border-neutral-800 flex items-center gap-3.5 shadow-md">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Across all 50 states, we turn every experience into your competitive advantage
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form with Name, Company Name, State, City dropdowns */}
          <div
            className="lg:col-span-7"
          >
            <div className="bg-slate-50 dark:bg-slate-950/80 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6" id="cognitive-edge-contact-form">
                {/* Row 1: Name and Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Company Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="contact-company"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Real Estate / Vertex Architects"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: USA State & City Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* USA State Dropdown */}
                  <div>
                    <label
                      htmlFor="contact-state"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      State (USA) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-state"
                        required
                        value={formData.state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                      >
                        <option value="">-- Select a US State --</option>
                        {US_STATES.map((state) => (
                          <option key={state.code} value={state.name}>
                            {state.name} ({state.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* USA City Dropdown */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-city"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      {formData.state && (
                        <button
                          type="button"
                          onClick={() => setCustomCityInput(!customCityInput)}
                          className="text-[11px] text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                        >
                          {customCityInput ? "Select from list" : "Type custom city"}
                        </button>
                      )}
                    </div>

                    {!customCityInput ? (
                      <select
                        id="contact-city"
                        required
                        disabled={!formData.state}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:opacity-60"
                      >
                        <option value="">
                          {formData.state
                            ? `-- Select city in ${formData.state} --`
                            : "First choose a state above"}
                        </option>
                        {availableCities.map((city, idx) => (
                          <option key={`${city}-${idx}`} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id="contact-city-custom"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder={`Enter your city in ${formData.state}`}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Row 3: Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Row 4: Profile & Service Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Profile Selection */}
                  <div>
                    <label
                      htmlFor="contact-profile"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Profile
                    </label>
                    <div className="relative">
                      <select
                        id="contact-profile"
                        value={formData.profile}
                        onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                      >
                        <option value="">-- Select Your Profile --</option>
                        <option value="Developer">Developer</option>
                        <option value="Agent">Agent</option>
                        <option value="Developer & Agent">Developer & Agent</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Service of Interest */}
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Primary Service of Interest
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                    >
                      <option value="Digital Twin Creation">Digital Twin Creation (Architectural 3D)</option>
                      <option value="Virtual Reality Experiences">Virtual Reality Experiences (Full Scale VR Walkthrough)</option>
                      <option value="Interior & Exterior Visuallization">Interior & Exterior Visuallization (Interactive Customization)</option>
                      <option value="Interactive Touch Kiosks">Interactive Touch Kiosks (Showroom & Sales Center)</option>
                      <option value="Tablet & Mobile Experience">Tablet & Mobile Experience (Portable Presentation)</option>
                      <option value="360 Degree virtual tours">360 Degree virtual tours (Web & Mobile Immersion)</option>
                      <option value="Architectural Visuallization">Architectural Visuallization (CGI Stills & Elevations)</option>
                      <option value="Construction & Design visuallization">Construction & Design visuallization (BIM & 4D Phasing)</option>
                      <option value="Complete Spatial Package">Complete Spatial Package (Full Suite Solution)</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Project Details or Inquiries
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your blueprints, square footage, expected timeline, or any specific VR requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Status Message */}
                {feedbackMessage && (
                  <div
                    id="contact-status-feedback"
                    className={`p-4 rounded-2xl text-sm flex items-center gap-3 ${
                      status === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800"
                        : "bg-red-50 dark:bg-red-950/80 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-800"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={status === "submitting"}
                  className="w-full py-4 px-6 rounded-2xl bg-black hover:bg-neutral-900 active:bg-black active:scale-[0.99] text-white font-bold text-base shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 border border-neutral-800"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
