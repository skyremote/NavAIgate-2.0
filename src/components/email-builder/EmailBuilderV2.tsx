import { useState } from 'react';
import {
  Mail,
  Sparkles,
  Layers,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import Badge from '../Badge';
import GradientText from '../GradientText';
import { ModulePalette } from './ModulePalette';
import { EmailCanvas } from './EmailCanvas';
import {
  moduleRegistry,
  exportEmailToHTML,
  type EmailModule,
} from './modules';

type Tab = 'ai' | 'builder';
type EmailType = 'sales-outreach' | 'follow-up' | 'introduction' | 'thank-you' | 'meeting-request' | 'proposal';
type Tone = 'professional' | 'friendly' | 'formal' | 'casual';

const emailTypes = [
  { value: 'sales-outreach', label: 'Sales Outreach' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'introduction', label: 'Introduction' },
  { value: 'thank-you', label: 'Thank You' },
  { value: 'meeting-request', label: 'Meeting Request' },
  { value: 'proposal', label: 'Proposal' },
];

const tones: { value: Tone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
];

export function EmailBuilderV2() {
  // Tab state
  const [activeTab, setActiveTab] = useState<Tab>('ai');

  // AI Form state
  const [emailType, setEmailType] = useState<EmailType>('sales-outreach');
  const [tone, setTone] = useState<Tone>('professional');
  const [recipientName, setRecipientName] = useState('');
  const [recipientCompany, setRecipientCompany] = useState('');
  const [senderName, setSenderName] = useState('');
  const [context, setContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSubject, setAiSubject] = useState('');
  const [aiBody, setAiBody] = useState('');
  const [aiError, setAiError] = useState('');

  // Builder state
  const [modules, setModules] = useState<EmailModule[]>([]);
  const [copied, setCopied] = useState(false);

  // Generate email with AI
  const generateWithAI = async () => {
    setIsGenerating(true);
    setAiError('');
    setAiSubject('');
    setAiBody('');

    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailType,
          tone,
          recipientName,
          recipientCompany,
          context,
          senderName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate email');
      }

      const data = await response.json();
      setAiSubject(data.subject || 'Generated Email');
      setAiBody(data.body || '');
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Failed to generate email');
    } finally {
      setIsGenerating(false);
    }
  };

  // Module management
  const addModule = (type: string, atIndex?: number) => {
    const moduleConfig = moduleRegistry.find((m) => m.type === type);
    if (!moduleConfig) return;

    const newModule: EmailModule = {
      id: `${type}-${Date.now()}`,
      type,
      data: { ...moduleConfig.defaultData },
    };

    if (atIndex !== undefined) {
      const newModules = [...modules];
      newModules.splice(atIndex, 0, newModule);
      setModules(newModules);
    } else {
      setModules([...modules, newModule]);
    }
  };

  const updateModule = (id: string, data: Record<string, unknown>) => {
    setModules(modules.map((m) => (m.id === id ? { ...m, data } : m)));
  };

  const deleteModule = (id: string) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  // Export functions
  const getBuilderHTML = () => exportEmailToHTML(modules, 'Email from NavAIgate');

  const getAIEmailHTML = () => {
    const htmlBody = aiBody.split('\n').map((line) =>
      line.trim() ? `<p style="margin: 0 0 15px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #334155;">${line}</p>` : '<br>'
    ).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${aiSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <center style="width: 100%; background-color: #f4f4f4;">
    <table align="center" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <tr>
        <td style="padding: 40px 30px;">
          ${htmlBody}
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
  };

  const openInNewTab = () => {
    const html = activeTab === 'ai' ? getAIEmailHTML() : getBuilderHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const copyHTML = async () => {
    const html = activeTab === 'ai' ? getAIEmailHTML() : getBuilderHTML();
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasContent = activeTab === 'ai' ? !!aiBody : modules.length > 0;

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
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

          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Create professional HTML emails with AI or build them manually with drag-and-drop modules.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-gray-800 rounded-xl">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles size={18} />
              AI Generate
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'builder'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers size={18} />
              Build Manually
            </button>
          </div>
        </div>

        {/* AI Tab */}
        {activeTab === 'ai' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card variant="glass" padding="lg">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Email Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Type
                  </label>
                  <select
                    value={emailType}
                    onChange={(e) => setEmailType(e.target.value as EmailType)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:border-purple-500 focus:outline-none"
                  >
                    {emailTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTone(t.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          tone === t.value
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={recipientCompany}
                      onChange={(e) => setRecipientCompany(e.target.value)}
                      placeholder="Acme Inc"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Context / Key Points
                  </label>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="What you want to communicate..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                <Button
                  variant="primary"
                  shimmer
                  className="w-full"
                  onClick={generateWithAI}
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
                      Generate with AI
                    </>
                  )}
                </Button>

                {aiError && (
                  <p className="text-red-400 text-sm">{aiError}</p>
                )}
              </div>
            </Card>

            <Card variant="glass" padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  Generated Email
                </h2>
                {aiBody && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyHTML}
                      className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      title="Copy HTML"
                    >
                      {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                    <button
                      onClick={openInNewTab}
                      className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>
                )}
              </div>

              {aiBody ? (
                <div className="space-y-4">
                  {aiSubject && (
                    <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                      <span className="text-xs text-gray-500 uppercase">Subject</span>
                      <p className="text-white font-medium">{aiSubject}</p>
                    </div>
                  )}
                  <div className="bg-white rounded-xl p-6">
                    <pre className="whitespace-pre-wrap text-gray-800 font-sans text-sm leading-relaxed">
                      {aiBody}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700 border-dashed text-center">
                  <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Fill in the details and click "Generate with AI" to create your email.
                  </p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            <Card variant="glass" padding="md" className="h-fit sticky top-24">
              <ModulePalette onAddModule={addModule} />
            </Card>

            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Email Preview
                </h2>
                {modules.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModules([])}
                      className="px-3 py-2 text-sm rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={copyHTML}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                      Copy HTML
                    </button>
                    <button
                      onClick={openInNewTab}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Export
                    </button>
                  </div>
                )}
              </div>

              {/* Canvas */}
              <div className="pl-12">
                <EmailCanvas
                  modules={modules}
                  onUpdateModule={updateModule}
                  onDeleteModule={deleteModule}
                  onReorderModules={setModules}
                  onDropNewModule={addModule}
                />
              </div>
            </div>
          </div>
        )}

        {/* Export Info */}
        {hasContent && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Click "Export" to open the HTML in a new tab. Then select all (Ctrl/Cmd+A), copy, and paste into Outlook or your email client.
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Powered by <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">NavAIgate</a>
        </p>
      </div>
    </div>
  );
}

export default EmailBuilderV2;
