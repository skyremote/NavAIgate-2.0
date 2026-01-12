import { Sparkles, CheckCircle, Clock, Target, Workflow } from 'lucide-react';
import Section from './Section';
import FloatingElements from './FloatingElements';
import Badge from './Badge';
import Card from './Card';
import GradientText from './GradientText';
import WaitlistForm from './WaitlistForm';

const features = [
  {
    icon: Target,
    title: 'Decision Navigation',
    description: 'AI that navigates decisions rather than just generating text. Built on real frameworks and GTM processes.',
  },
  {
    icon: Workflow,
    title: 'Workflow Integration',
    description: 'Connects with your existing tools and captures decisions for consistency across teams.',
  },
  {
    icon: Clock,
    title: 'Time Savings',
    description: 'Reduces prep time 25-40% and admin time 20-30%. Save 2-3 hours per week immediately.',
  },
];

const capabilities = [
  'Email Proposals',
  'Account Workflows',
  'Consumption Patterns',
  'Decision Capture',
  'Framework Enforcement',
  'Reusable Templates',
];

const EntepriseSection: React.FC = () => {
  return (
    <Section id="enteprise" background="gradient">
      <FloatingElements variant="section" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="glass" className="mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">Introducing</span>
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            <a href="https://www.ente-prise.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              <GradientText gradient="purple-teal">Ente-prise</GradientText>
            </a>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-2">
            Enterprise AI that navigates decisions, not just generates text.
          </p>
          <p className="text-gray-500">
            Named after Ente (German for duck) — representing migration from ineffective AI to structured adoption.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} variant="glass" hover padding="lg">
              <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Capabilities */}
        <Card variant="solid" padding="lg" className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Tuned For Enterprise Workflows
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {capabilities.map((capability) => (
              <div key={capability} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">{capability}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="max-w-xl mx-auto">
          <div className="p-1 rounded-2xl bg-gradient-to-r from-purple-500 to-teal-500">
            <div className="bg-gray-900 rounded-xl p-8">
              <p className="text-yellow-400 font-medium mb-2 text-center">Limited to 500 early adopters</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                Join the Ente-prise Waitlist
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-center">
                Be among the first to transform your organization's AI workflows.
                Early access includes dedicated onboarding and priority support.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EntepriseSection;
