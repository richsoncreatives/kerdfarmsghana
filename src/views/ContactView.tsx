import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { MOMO_CONFIG } from '../data/products';
import { EnquirySubmission, submitEnquiryToEmail } from '../services/formService';

export const ContactView: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    setIsSubmitting(true);

    const submission: EnquirySubmission = {
      enquiryType: subject as any,
      fullName: fullName.trim(),
      email: email.trim() || 'info@kerdfarms.com',
      phone: phone.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString()
    };

    const res = await submitEnquiryToEmail(submission);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      setErrorMessage('Communication error. Please call or WhatsApp us on ' + MOMO_CONFIG.primaryPhone);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>DIRECT CONTACT & ENQUIRY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Talk to the Kerd Farms Team.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Whether you need fresh eggs, fruits and vegetables, seedlings, or organic manure, we route every enquiry directly to our team at <strong>info@kerdfarms.com</strong> and <strong>kerdfarms@gmail.com</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT CONTACT INFO CARDS */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Direct Contact Details
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Official Email Inquiries</div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                    <a href="mailto:info@kerdfarms.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">info@kerdfarms.com</a>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    <a href="mailto:kerdfarms@gmail.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">kerdfarms@gmail.com</a>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Checked daily by farm operations</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Telephone & WhatsApp</div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{MOMO_CONFIG.primaryPhone}</div>
                  <div className="text-[11px] text-slate-500">Mon - Sat: 7:00 AM - 6:00 PM</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Locations in Ghana</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{MOMO_CONFIG.location}</div>
                  <div className="text-[11px] text-slate-500">Delivery service available across Greater Accra, Ashanti, Volta & Nationwide</div>
                </div>
              </div>
            </div>
          </div>

          {/* MOMO CARD */}
          <div className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 rounded-3xl shadow-md space-y-3">
            <div className="text-xs font-black uppercase tracking-wider bg-slate-950 text-white inline-block px-2.5 py-0.5 rounded">
              MOBILE MONEY (MoMo) PAYMENTS
            </div>
            <div className="text-sm font-bold">Official MoMo Accounts:</div>
            <div className="bg-slate-950/90 text-white p-3.5 rounded-2xl space-y-1 font-mono text-xs">
              <div>MTN MoMo: <strong className="text-amber-300">{MOMO_CONFIG.mtnNumber}</strong></div>
              <div>Telecel Cash: <strong className="text-amber-300">{MOMO_CONFIG.telecelNumber}</strong></div>
              <div className="text-[11px] text-slate-400">Account Name: <strong>{MOMO_CONFIG.accountName}</strong></div>
            </div>
          </div>

        </div>

        {/* RIGHT CONTACT FORM */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Send us an Enquiry
            </h2>
            <p className="text-xs text-slate-500">
              Fill out the form below. Your message will be sent directly to <strong>info@kerdfarms.com</strong> &amp; <strong>kerdfarms@gmail.com</strong>.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                Thank you! Your message has been sent directly to <strong>info@kerdfarms.com</strong> and <strong>kerdfarms@gmail.com</strong>. We will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Samuel Kojo"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="024 XXX XXXX"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Enquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Egg Wholesale">Fresh Egg Wholesale Supply</option>
                    <option value="Vegetable Supply">Fresh Produce Supply</option>
                    <option value="Seedlings & Manure">Seedlings & Organic Fertilizer</option>
                    <option value="Order Support">Order & Delivery Follow-up</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need or ask any questions..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting to info@kerdfarms.com...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Send Message to Kerd Farms</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
