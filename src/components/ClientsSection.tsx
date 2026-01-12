import { Building2, Quote } from 'lucide-react';
import Section from './Section';
import Badge from './Badge';
import Card from './Card';
import GradientText from './GradientText';

interface Client {
  name: string;
  logo: string;
  description: string;
  testimonial?: string;
}

const clients: Client[] = [
  {
    name: 'Autodesk',
    logo: 'A',
    description: 'Enterprise AI workflows for sales enablement',
    testimonial: 'NavAIgate helped us transform our account management with AI that actually follows our frameworks.',
  },
  {
    name: 'Enterprise Client',
    logo: 'E',
    description: 'Custom AI solutions for decision-making',
  },
  {
    name: 'Growth Partner',
    logo: 'G',
    description: 'AI-powered workflow automation',
  },
];

const ClientsSection: React.FC = () => {
  return (
    <Section id="clients" className="bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="glass" className="mb-6">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Trusted By</span>
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Enterprise{' '}
            <GradientText gradient="blue-purple">Clients</GradientText>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Organizations using NavAIgate to navigate their AI transformation
          </p>
        </div>

        {/* Featured Client - Autodesk */}
        <Card variant="glass" padding="lg" className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Autodesk</h3>
              <p className="text-gray-300 mb-4">
                Partnering with Autodesk to build Ente-prise — an AI chatbot that helps
                sales teams navigate CTV, technical proposals, and account workflows.
                Reducing prep time by 25-40% and capturing decisions for consistency.
              </p>
              <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                <Quote className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <p className="text-gray-400 italic">
                  "An AI that works like an engineered Python script — follows rules,
                  frameworks, and GTM processes. Not just text generation."
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Other Clients Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {clients.slice(1).map((client) => (
            <Card key={client.name} variant="solid" hover padding="md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold">{client.logo}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{client.name}</h4>
                  <p className="text-sm text-gray-400">{client.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Want to join these organizations?{' '}
            <a href="#contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ClientsSection;
