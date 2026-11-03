import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, HelpCircle, Building } from 'lucide-react';
import { EnquirySubmission, submitEnquiryToEmail } from '../services/formService';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEnquiryType?: 'General' | 'Bulk Order' | 'Egg Supply' | 'Produce' | 'Seedlings & Soil' | 'Impact / One Egg';
  defaultProductName?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultEnquiryType = 'General',
  defaultProductName = '',
}) => {
  const [enquiryType, setEnquiryType] = useState(defaultEnquiryType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState(defaultProductName ? `Hello Kerd Farms, I am interested in ordering/inquiring about ${defaultProductName}. Please provide pricing and supply details.` : '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (defaultEnquiryType) setEnquiryType(defaultEnquiryType);
    if (defaultProductName) {
      setMessage(`Hello Kerd Farms, I am interested in inquiring about bulk supply of ${defaultProductName}. Please provide current pricing and delivery timelines.`);
    }
  }, [defaultEnquiryType, defaultProductName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Phone, and Message)');
      return;
    }

    setIsSubmitting(true);

    const submission: EnquirySubmission = {
      enquiryType,
      fullName: fullName.trim(),
      email: email.trim() || 'kerdfarms@gmail.com',
      phone: phone.trim(),
      organization: organization.trim(),
      location: location.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString()
    };

    const res = await submitEnquiryToEmail(submission);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMessage('Form error. Please contact Kerd Farms via phone/WhatsApp +233 24 013 5545.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-8">
        
        {/* Header */}
        <div className="p-5 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-base font-bold">Kerd Farms Enquiry & Supply Request</h2>
              <p className="text-[11px] text-emerald-200">Direct Message to kerdfarms@gmail.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-300">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enquiry Submitted!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Your message has been sent directly to <strong>kerdfarms@gmail.com</strong>. Our agricultural supply team will get back to you shortly.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors"
              >
                Close Window
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Request Type
                </label>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="General">General Enquiry / Question</option>
                  <option value="Bulk Order">Wholesale / Commercial Bulk Order</option>
                  <option value="Egg Supply">Egg Supply Contract (Crates / Recurring)</option>
                  <option value="Produce">Fresh Produce (Fruits & Vegetables)</option>
                  <option value="Seedlings & Soil">Seedlings & Organic Manure</option>
                  <option value="Impact / One Egg">One Egg Project / School Nutrition Partnership</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ama Boateng"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Organization / Hotel / Market (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Golden Tulip Hotel / Individual"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location / City in Ghana
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kumasi, Adum / Accra Central"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message / Specific Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the quantities, frequency, or information you need..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting to kerdfarms@gmail.com...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Send Enquiry to kerdfarms@gmail.com</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
