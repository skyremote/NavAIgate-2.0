import { Calendar, Mail, ExternalLink, Sparkles } from 'lucide-react';
import Section from './Section';
import Badge from './Badge';
import Card from './Card';
import GradientText from './GradientText';

interface App {
  title: string;
  description: string;
  icon: typeof Calendar;
  color: string;
  href: string;
  tag: string;
  internal?: boolean;
}

const apps: App[] = [
  {
    title: 'Weekly Check-in',
    description: 'AI-powered team check-in tool. Track progress, blockers, and wins across your team with smart summaries.',
    icon: Calendar,
    color: '#3B82F6',
    href: 'https://weeklycheckin.navaigate.dev/dashboard',
    tag: 'Team Tool',
  },
  {
    title: 'Email Builder',
    description: 'Generate professional emails in seconds. Perfect for sales outreach, follow-ups, and client communication.',
    icon: Mail,
    color: '#8B5CF6',
    href: '/tools/email-builder',
    tag: 'Productivity',
    internal: true,
  },
];

const AppsSection: React.FC = () => {
  return (
    <Section id="apps" className="bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="glass" className="mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">Free Tools</span>
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Try Our{' '}
            <GradientText gradient="rainbow">Free Apps</GradientText>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience AI in action. These tools are free to use — no sign-up required.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <a
                key={app.title}
                href={app.href}
                {...(!app.internal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block group"
              >
                <Card variant="glass" hover padding="lg" className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${app.color}20` }}
                    >
                      <Icon size={28} color={app.color} />
                    </div>
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${app.color}20`, color: app.color }}
                    >
                      {app.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                    {app.title}
                    {!app.internal && (
                      <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </h3>

                  <p className="text-gray-400 mb-4">{app.description}</p>

                  <div className="pt-4 border-t border-gray-700">
                    <span className="text-cyan-400 text-sm font-medium group-hover:underline">
                      Try it now →
                    </span>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default AppsSection;
