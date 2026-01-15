import { useState } from 'react';
import { Mail, Copy, Check, Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import GradientText from './GradientText';
import Badge from './Badge';

type EmailType = 'sales-outreach' | 'follow-up' | 'introduction' | 'thank-you' | 'meeting-request' | 'proposal';
type Tone = 'professional' | 'friendly' | 'formal' | 'casual';

interface EmailTemplate {
  label: string;
  description: string;
}

const emailTypes: Record<EmailType, EmailTemplate> = {
  'sales-outreach': { label: 'Sales Outreach', description: 'Cold outreach to potential clients' },
  'follow-up': { label: 'Follow-up', description: 'Follow up after a meeting or call' },
  'introduction': { label: 'Introduction', description: 'Introduce yourself or your company' },
  'thank-you': { label: 'Thank You', description: 'Express gratitude after a meeting' },
  'meeting-request': { label: 'Meeting Request', description: 'Request a meeting or call' },
  'proposal': { label: 'Proposal', description: 'Send a business proposal' },
};

const tones: Record<Tone, string> = {
  professional: 'Professional',
  friendly: 'Friendly',
  formal: 'Formal',
  casual: 'Casual',
};

const EmailBuilder: React.FC = () => {
  const [emailType, setEmailType] = useState<EmailType>('sales-outreach');
  const [recipientName, setRecipientName] = useState('');
  const [recipientCompany, setRecipientCompany] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [senderName, setSenderName] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmail = () => {
    setIsGenerating(true);

    // Simulate generation delay for better UX
    setTimeout(() => {
      const email = buildEmail();
      setGeneratedEmail(email);
      setIsGenerating(false);
    }, 800);
  };

  const buildEmail = (): string => {
    const recipient = recipientName || '[Recipient Name]';
    const company = recipientCompany || '[Company]';
    const sender = senderName || '[Your Name]';
    const contextInfo = context || '[Your specific context]';

    const greetings: Record<Tone, string> = {
      professional: `Dear ${recipient},`,
      friendly: `Hi ${recipient},`,
      formal: `Dear Mr./Ms. ${recipient},`,
      casual: `Hey ${recipient}!`,
    };

    const closings: Record<Tone, string> = {
      professional: 'Best regards,',
      friendly: 'Cheers,',
      formal: 'Sincerely,',
      casual: 'Talk soon,',
    };

    const greeting = greetings[tone];
    const closing = closings[tone];

    const templates: Record<EmailType, string> = {
      'sales-outreach': `${greeting}

I hope this message finds you well. I'm reaching out because I believe ${company} could benefit from our solutions.

${contextInfo}

I'd love to schedule a brief call to discuss how we can help ${company} achieve its goals. Would you have 15-20 minutes available this week or next?

Looking forward to connecting.

${closing}
${sender}`,

      'follow-up': `${greeting}

Thank you for taking the time to speak with me recently. I wanted to follow up on our conversation.

${contextInfo}

Please let me know if you have any questions or if there's anything else I can provide. I'm happy to schedule another call at your convenience.

${closing}
${sender}`,

      'introduction': `${greeting}

I wanted to take a moment to introduce myself. My name is ${sender}, and I specialize in helping companies like ${company} succeed.

${contextInfo}

I'd welcome the opportunity to learn more about your current initiatives and explore potential synergies. Would you be open to a brief introductory call?

${closing}
${sender}`,

      'thank-you': `${greeting}

I wanted to express my sincere gratitude for our meeting today. Your insights about ${company}'s vision were truly valuable.

${contextInfo}

Thank you again for your time and consideration. I look forward to the possibility of working together.

${closing}
${sender}`,

      'meeting-request': `${greeting}

I hope you're doing well. I'm reaching out to request a meeting to discuss potential collaboration opportunities between our organizations.

${contextInfo}

Would you have availability for a 30-minute call sometime this week? I'm flexible and happy to work around your schedule.

${closing}
${sender}`,

      'proposal': `${greeting}

Following our recent discussions, I'm pleased to present a proposal for your consideration.

${contextInfo}

I believe this approach aligns well with ${company}'s objectives. I'd be happy to walk you through the details and answer any questions you may have.

Please let me know your thoughts, and we can schedule a call to discuss next steps.

${closing}
${sender}`,
    };

    return templates[emailType];
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setGeneratedEmail('');
    setRecipientName('');
    setRecipientCompany('');
    setContext('');
    setSenderName('');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to NavAIgate</span>
          </a>

          <Badge variant="glass" className="mb-6">
            <Mail className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">Free Tool</span>
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            <GradientText gradient="purple-teal">Email Builder</GradientText>
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto">
            Generate professional emails in seconds. Perfect for sales outreach, follow-ups, and client communication.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card variant="glass" padding="lg">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Email Details
            </h2>

            <div className="space-y-5">
              {/* Email Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Type
                </label>
                <select
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value as EmailType)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                >
                  {Object.entries(emailTypes).map(([key, { label, description }]) => (
                    <option key={key} value={key}>
                      {label} - {description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tone
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(tones).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setTone(key as Tone)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        tone === key
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              {/* Recipient Company */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipient Company
                </label>
                <input
                  type="text"
                  value={recipientCompany}
                  onChange={(e) => setRecipientCompany(e.target.value)}
                  placeholder="Acme Inc"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              {/* Your Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              {/* Context */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Context / Key Points
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Describe what you want to communicate, any specific details, products, or services to mention..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                />
              </div>

              {/* Generate Button */}
              <Button
                variant="primary"
                shimmer
                className="w-full"
                onClick={generateEmail}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Email
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Output */}
          <Card variant="glass" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" />
                Generated Email
              </h2>
              {generatedEmail && (
                <div className="flex gap-2">
                  <button
                    onClick={resetForm}
                    className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    title="Reset"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>
              )}
            </div>

            {generatedEmail ? (
              <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                <pre className="whitespace-pre-wrap text-gray-200 font-sans text-sm leading-relaxed">
                  {generatedEmail}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700 border-dashed text-center">
                <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">
                  Fill in the details and click "Generate Email" to create your professional email.
                </p>
              </div>
            )}

            {generatedEmail && (
              <p className="text-gray-500 text-sm mt-4 text-center">
                Tip: Edit the generated email to add your personal touch before sending.
              </p>
            )}
          </Card>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Powered by <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">NavAIgate</a>
        </p>
      </div>
    </div>
  );
};

export default EmailBuilder;
