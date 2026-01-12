import { Building2 } from 'lucide-react';
import Section from './Section';
import Badge from './Badge';
import Card from './Card';
import GradientText from './GradientText';

interface Client {
  name: string;
  logo: string;
  href: string;
  description: string;
  bgColor?: string;
}

const clients: Client[] = [
  {
    name: 'Katana Studio',
    logo: '/logos/katana.svg',
    href: 'https://www.katanaus.com',
    description: 'XR solutions and immersive experiences',
    bgColor: 'bg-gray-800',
  },
  {
    name: 'ComXo',
    logo: '/logos/ComXo-Mastered-Logo.svg',
    href: 'https://comxo.com',
    description: 'Enterprise communication solutions',
    bgColor: 'bg-white',
  },
  {
    name: 'Matroschkasch',
    logo: '/logos/matroschkasch.png',
    href: 'https://www.matroschkasch.de',
    description: 'Banya & wellness experiences',
    bgColor: 'bg-gray-800',
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
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-2">
              <img src="/logos/autodesk.svg" alt="Autodesk" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Autodesk</h3>
              <p className="text-gray-300">
                Partnering with Autodesk to build <a href="https://www.ente-prise.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Ente-prise</a> — an AI chatbot that helps
                sales teams navigate CTV, technical proposals, and account workflows.
                Reducing prep time by 25-40% and capturing decisions for consistency.
              </p>
            </div>
          </div>
        </Card>

        {/* Other Clients Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card variant="solid" hover padding="md">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${client.bgColor || 'bg-gray-800'} flex items-center justify-center flex-shrink-0 p-2`}>
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{client.name}</h4>
                    <p className="text-sm text-gray-400">{client.description}</p>
                  </div>
                </div>
              </Card>
            </a>
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
