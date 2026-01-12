import { User, Briefcase, Sparkles, Code } from 'lucide-react';
import Section from './Section';
import FloatingElements from './FloatingElements';
import Badge from './Badge';
import Card from './Card';
import GradientText from './GradientText';

const stats = [
  { icon: Briefcase, label: 'Enterprise Clients', value: '10+' },
  { icon: Code, label: 'Custom Solutions', value: '25+' },
  { icon: Sparkles, label: 'AI Implementations', value: '50+' },
];

const AboutSection: React.FC = () => {
  return (
    <Section id="about" className="bg-gray-900/30">
      <FloatingElements variant="section" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <Badge variant="glass" className="mb-6">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300">Meet the Founder</span>
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Your AI{' '}
              <GradientText gradient="default">Navigation Partner</GradientText>
            </h2>

            <div className="space-y-4 text-gray-300 mb-8">
              <p className="text-lg">
                I'm Daniel, founder of NavAIgate. I help organizations cut through
                the noise of AI hype and implement solutions that actually work.
              </p>
              <p>
                After years of building custom AI tools for enterprise clients,
                I've seen what separates successful AI adoption from expensive
                failures. It's not about having the fanciest models—it's about
                having the right frameworks, workflows, and decision-making processes.
              </p>
              <p>
                That's why I created <span className="text-purple-400 font-medium">Ente-prise</span>—an
                AI that navigates decisions rather than just generating text.
                It's built on real-world patterns from helping organizations like
                Autodesk transform their workflows.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              In partnership with{' '}
              <a
                href="https://bluplai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                bluplai
              </a>
              , building the future of intelligent work.
            </p>
          </div>

          {/* Image & Stats */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Daniel's Photo */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 relative group">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
              <img
                src="/images/daniel.png"
                alt="Daniel - Founder of NavAIgate"
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <Card key={stat.label} variant="glass" padding="sm" className="text-center">
                  <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
