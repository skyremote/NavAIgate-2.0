import { Mail, MessageCircle, Send } from 'lucide-react';
import Section from './Section';
import Badge from './Badge';
import Card from './Card';
import GradientText from './GradientText';
import Button from './Button';

const ContactSection: React.FC = () => {
  const emailSubject = encodeURIComponent('Inquiry from NavAIgate Website');
  const emailBody = encodeURIComponent('Hi Daniel,\n\nI would like to learn more about NavAIgate.\n\nBest regards');

  const whatsappMessage = encodeURIComponent('Hi! I found you through NavAIgate and would like to discuss AI consulting.');

  return (
    <Section id="contact" className="bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="glass" className="mb-6">
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Get In Touch</span>
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Let's{' '}
            <GradientText gradient="default">Connect</GradientText>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            Whether you're interested in custom AI solutions, consulting, or the Ente-prise waitlist —
            I'd love to hear from you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Email */}
          <Card variant="glass" padding="lg" hover className="text-center">
            <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-400 mb-4">
              Best for detailed inquiries and project discussions
            </p>
            <a
              href={`mailto:dw@navaigate.dev?subject=${emailSubject}&body=${emailBody}`}
              className="inline-block"
            >
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                dw@navaigate.dev
              </Button>
            </a>
          </Card>

          {/* WhatsApp */}
          <Card variant="glass" padding="lg" hover className="text-center">
            <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
            <p className="text-gray-400 mb-4">
              Quick questions and real-time conversations
            </p>
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message on WhatsApp
              </Button>
            </a>
          </Card>
        </div>

        {/* Quick Message Form (placeholder) */}
        <Card variant="solid" padding="lg">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            Send a Quick Message
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>
            <textarea
              placeholder="Tell me about your project or question..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            />
            <div className="text-center">
              <Button variant="primary" shimmer icon={<Send className="w-4 h-4" />}>
                Send Message
              </Button>
            </div>
          </form>
          <p className="text-gray-500 text-sm text-center mt-4">
            Form coming soon — for now, use email or WhatsApp above
          </p>
        </Card>
      </div>
    </Section>
  );
};

export default ContactSection;
