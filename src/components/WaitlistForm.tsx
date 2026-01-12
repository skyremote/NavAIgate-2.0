import { useState, useEffect } from 'react';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Button from './Button';
import { joinWaitlist, getWaitlistCount } from '../lib/supabase';

interface WaitlistFormProps {
  onSuccess?: () => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const { count } = await getWaitlistCount();
      setSpotsLeft(500 - count);
    }
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { data, error } = await joinWaitlist({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        role: formData.role || undefined,
      });

      if (error) {
        setStatus('error');
        setErrorMessage(error.message || 'Failed to join waitlist');
        return;
      }

      setStatus('success');
      setSpotsLeft((prev) => (prev !== null ? prev - 1 : null));
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
        <p className="text-gray-400">
          Thanks for joining. We'll be in touch soon with early access details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {spotsLeft !== null && (
        <div className="text-center mb-4">
          <span className="text-yellow-400 font-medium">
            {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Waitlist is full'}
          </span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-colors"
        />
        <input
          type="email"
          placeholder="Work email *"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-colors"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-colors"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition-colors"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {errorMessage}
        </div>
      )}

      <div className="text-center pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          shimmer
          disabled={status === 'loading' || spotsLeft === 0}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Joining...
            </>
          ) : spotsLeft === 0 ? (
            'Waitlist Full'
          ) : (
            'Join Waitlist'
          )}
        </Button>
      </div>

      <p className="text-gray-500 text-xs text-center">
        By joining, you agree to receive updates about Ente-prise. No spam, ever.
      </p>
    </form>
  );
};

export default WaitlistForm;
