import React, { useState, useMemo, useRef, useEffect } from "react";
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
  ChevronDown,
  X,
  Check,
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
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const stateRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const stateSearchInputRef = useRef<HTMLInputElement>(null);
  const citySearchInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stateRef.current && !stateRef.current.contains(event.target as Node)) {
        setIsStateOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-focus search inputs when opened
  useEffect(() => {
    if (isStateOpen) {
      setTimeout(() => stateSearchInputRef.current?.focus(), 50);
    }
  }, [isStateOpen]);

  useEffect(() => {
    if (isCityOpen) {
      setTimeout(() => citySearchInputRef.current?.focus(), 50);
    }
  }, [isCityOpen]);

  // Update prefilled service if changed externally
  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  // Selected state object
  const selectedStateObj = useMemo(() => {
    return US_STATES.find((s) => s.name === formData.state || s.code === formData.state);
  }, [formData.state]);

  // Filtered list of states based on search query
  const filteredStates = useMemo(() => {
    if (!stateSearch.trim()) return US_STATES;
    const query = stateSearch.toLowerCase().trim();
    return US_STATES.filter(
      (s) => s.name.toLowerCase().includes(query) || s.code.toLowerCase().includes(query)
    );
  }, [stateSearch]);

  // Filtered list of cities based on chosen state
  const availableCities = useMemo(() => {
    if (!selectedStateObj) return [];
    if (!citySearch.trim()) return selectedStateObj.cities;
    const query = citySearch.toLowerCase().trim();
    return selectedStateObj.cities.filter((c) =>
      c.toLowerCase().includes(query)
    );
  }, [selectedStateObj, citySearch]);

  const handleStateChange = (stateName: string) => {
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      city: "", // reset city when state changes
    }));
    setStateSearch("");
    setCitySearch("");
    setIsStateOpen(false);
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

    if (!formData.name || !formData.email || !formData.phone || !formData.state || !formData.city) {
      setStatus("error");
      setFeedbackMessage("Please enter your Name, Email, Phone Number, State, and City.");
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setStatus("error");
      setFeedbackMessage("Please enter a valid 10-digit phone number.");
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
      setStateSearch("");
      setCitySearch("");
      setIsStateOpen(false);
      setIsCityOpen(false);
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
            <div className="p-5 rounded-2xl bg-blue-600 text-white shadow-md flex items-center gap-3.5">
              <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
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

                {/* Row 2: USA State & City Dropdowns with type-to-find input boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* USA State Dropdown */}
                  <div ref={stateRef} className="relative">
                    <label
                      htmlFor="contact-state"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      State (USA) <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      id="contact-state"
                      onClick={() => {
                        setIsStateOpen((prev) => !prev);
                        setIsCityOpen(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border text-left text-sm flex items-center justify-between transition-colors ${
                        isStateOpen
                          ? "border-blue-500 ring-2 ring-blue-500/20"
                          : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                      }`}
                    >
                      <span
                        className={`truncate font-bold ${
                          formData.state
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {formData.state
                          ? `${formData.state} (${selectedStateObj?.code || ""})`
                          : "-- Select or type to find state --"}
                      </span>
                      <div className="flex items-center gap-1.5 ml-2 shrink-0">
                        {formData.state && (
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStateChange("");
                            }}
                            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title="Clear selection"
                          >
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isStateOpen ? "rotate-180 text-blue-500" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* State Search & Select Popover */}
                    {isStateOpen && (
                      <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                        {/* Search Input Box */}
                        <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                          <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              ref={stateSearchInputRef}
                              type="text"
                              id="state-search-input"
                              value={stateSearch}
                              onChange={(e) => setStateSearch(e.target.value)}
                              placeholder="Type to find state (e.g. CA or Texas)..."
                              className="w-full pl-9 pr-8 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {stateSearch && (
                              <button
                                type="button"
                                onClick={() => setStateSearch("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* States List */}
                        <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
                          {filteredStates.length > 0 ? (
                            filteredStates.map((state) => {
                              const isSelected = formData.state === state.name;
                              return (
                                <button
                                  key={state.code}
                                  type="button"
                                  onClick={() => {
                                    handleStateChange(state.name);
                                    setIsStateOpen(false);
                                    setStateSearch("");
                                  }}
                                  className={`w-full px-3 py-2 text-left rounded-lg text-sm font-bold flex items-center justify-between transition-colors ${
                                    isSelected
                                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400"
                                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                  }`}
                                >
                                  <span className="font-bold">{state.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                      {state.code}
                                    </span>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                                    )}
                                  </div>
                                </button>
                              );
                            })
                          ) : (
                            <div className="p-4 text-center text-sm font-semibold text-slate-400">
                              No state matching "{stateSearch}"
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* USA City Dropdown */}
                  <div ref={cityRef} className="relative">
                    <label
                      htmlFor="contact-city"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      id="contact-city"
                      disabled={!formData.state}
                      onClick={() => {
                        if (!formData.state) return;
                        setIsCityOpen((prev) => !prev);
                        setIsStateOpen(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border text-left text-sm flex items-center justify-between transition-colors ${
                        !formData.state
                          ? "opacity-60 bg-slate-100 dark:bg-slate-800 cursor-not-allowed border-slate-300 dark:border-slate-700"
                          : isCityOpen
                          ? "border-blue-500 ring-2 ring-blue-500/20 cursor-pointer"
                          : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer"
                      }`}
                    >
                      <span
                        className={`truncate font-bold ${
                          formData.city
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {formData.city
                          ? formData.city
                          : formData.state
                          ? `-- Select or type to find city in ${formData.state} --`
                          : "First choose a state above"}
                      </span>
                      <div className="flex items-center gap-1.5 ml-2 shrink-0">
                        {formData.city && (
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData((prev) => ({ ...prev, city: "" }));
                            }}
                            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title="Clear city"
                          >
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isCityOpen ? "rotate-180 text-blue-500" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* City Search & Select Popover */}
                    {isCityOpen && formData.state && (
                      <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                        {/* Search Input Box */}
                        <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                          <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              ref={citySearchInputRef}
                              type="text"
                              id="city-search-input"
                              value={citySearch}
                              onChange={(e) => setCitySearch(e.target.value)}
                              placeholder={`Type to find city in ${formData.state}...`}
                              className="w-full pl-9 pr-8 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {citySearch && (
                              <button
                                type="button"
                                onClick={() => setCitySearch("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Cities List */}
                        <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
                          {/* Option to select the typed input as custom city */}
                          {citySearch.trim() && (
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, city: citySearch.trim() }));
                                setIsCityOpen(false);
                                setCitySearch("");
                              }}
                              className="w-full px-3 py-2 text-left rounded-lg text-sm font-bold text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center justify-between"
                            >
                              <span className="font-bold">Use "{citySearch.trim()}"</span>
                              <span className="text-xs uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                                Custom
                              </span>
                            </button>
                          )}

                          {availableCities.length > 0 ? (
                            availableCities.map((city, idx) => {
                              const isSelected = formData.city === city;
                              return (
                                <button
                                  key={`${city}-${idx}`}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, city }));
                                    setIsCityOpen(false);
                                    setCitySearch("");
                                  }}
                                  className={`w-full px-3 py-2 text-left rounded-lg text-sm font-bold flex items-center justify-between transition-colors ${
                                    isSelected
                                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400"
                                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                  }`}
                                >
                                  <span className="font-bold">{city}</span>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                                  )}
                                </button>
                              );
                            })
                          ) : !citySearch.trim() ? (
                            <div className="p-4 text-center text-sm font-semibold text-slate-400">
                              No cities listed. Type your city in the search box above.
                            </div>
                          ) : null}
                        </div>
                      </div>
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
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      required
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
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.99] text-white font-bold text-base shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
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
