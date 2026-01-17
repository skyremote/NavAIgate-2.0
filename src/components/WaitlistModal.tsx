import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase, getWaitlistCount } from '../lib/supabase';

const WAITLIST_LIMIT = 500;

interface WaitlistModalProps {
  isOpen?: boolean;
}

const WaitlistModal: React.FC<WaitlistModalProps> = (initialProps) => {
  const [isOpen, setIsOpen] = useState(initialProps?.isOpen ?? false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    problem: '',
    expectations: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);
  const [userPosition, setUserPosition] = useState<number | null>(null);

  const fetchWaitlistCount = async () => {
    try {
      const { count } = await getWaitlistCount();
      setSpotsRemaining(WAITLIST_LIMIT - count);
    } catch (err) {
      console.error('Error fetching waitlist count:', err);
      setSpotsRemaining(WAITLIST_LIMIT);
    }
  };

  useEffect(() => {
    fetchWaitlistCount();

    // Expose the modal control functions to window for access from other components
    (window as any).openWaitlist = () => setIsOpen(true);
    (window as any).closeWaitlist = () => setIsOpen(false);

    return () => {
      delete (window as any).openWaitlist;
      delete (window as any).closeWaitlist;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchWaitlistCount();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError('Waitlist is not configured. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            email: formData.email,
            name: formData.name,
            company: formData.company || null,
            role: formData.role || null,
            problem: formData.problem || null,
            expectations: formData.expectations || null,
            source: 'navaigate',
          }
        ]);

      if (insertError) {
        if (insertError.code === '23505') {
          throw new Error('This email is already on the waitlist!');
        }
        throw insertError;
      }

      // Get the user's position in the waitlist
      const { count } = await getWaitlistCount();
      const position = count || 1;

      setSubmitted(true);
      setUserPosition(position);

      if (spotsRemaining !== null) {
        setSpotsRemaining(spotsRemaining - 1);
      }

      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setUserPosition(null);
        setFormData({ name: '', email: '', company: '', role: '', problem: '', expectations: '' });
      }, 4000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleClose = () => setIsOpen(false);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-purple-400/30 rounded-2xl p-8 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <p className="text-purple-400 text-sm font-semibold mb-2">Limited to {WAITLIST_LIMIT} early adopters</p>
              <h2 className="text-3xl font-bold text-white mb-4">Join the Ente-prise Waitlist</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Be among the first to experience AI that navigates decisions, not just generates text.
              </p>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-600/10 border border-purple-400/20 rounded-lg p-4 text-left">
                <p className="text-purple-400 font-semibold text-sm mb-2">Early Adopter Benefits:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>White glove service with personalized onboarding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>4 hours of dedicated setup support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>1 month FREE access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>50% off your first year</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Spots Remaining */}
            <div className="bg-gray-800/50 border border-purple-400/20 rounded-lg p-3 mb-6 text-center">
              <p className="text-purple-400 font-semibold">
                {spotsRemaining !== null ? `${spotsRemaining} spots remaining` : 'Loading...'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-center">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Your name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Work email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              <textarea
                name="problem"
                placeholder="What problem are you trying to solve? *"
                value={formData.problem}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />

              <textarea
                name="expectations"
                placeholder="What do you expect from Ente-prise? *"
                value={formData.expectations}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (spotsRemaining !== null && spotsRemaining <= 0)}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : spotsRemaining !== null && spotsRemaining <= 0 ? (
                  'Waitlist Full'
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>

            {/* Disclaimer */}
            <p className="text-gray-500 text-xs text-center">
              By joining, you agree to receive updates about Ente-prise. No spam, ever.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
            {userPosition && (
              <div className="bg-gray-800/50 border border-purple-400/20 rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm mb-1">Your position</p>
                <p className="text-purple-400 text-3xl font-bold">#{userPosition}</p>
              </div>
            )}
            <p className="text-gray-400 text-sm">
              We'll be in touch soon with early access details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
