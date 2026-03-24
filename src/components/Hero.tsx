import { Sparkles, ChevronRight, ChevronDown } from 'lucide-react';
import Section from './Section';
import FloatingElements from './FloatingElements';
import Badge from './Badge';
import ShinyText from './ShinyText';
import RotatingText from './RotatingText';
import GradientText from './GradientText';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <Section background="gradient" fullHeight centered className="relative">
      <FloatingElements variant="hero" />

      <div className="max-w-6xl mx-auto text-center relative z-20 px-4">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="glass">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <ShinyText text="AI Consultancy" speed={6} className="text-sm text-gray-300" />
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
          NavAIgate Your AI{' '}
          <RotatingText
            texts={['Future', 'Strategy', 'Success', 'Growth']}
            mainClassName="inline-block"
            staggerFrom="last"
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            rotationInterval={2500}
          />
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Custom AI tools and strategic consulting for organisations ready to{' '}
          <GradientText gradient="default">transform their workflows</GradientText>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button
            variant="primary"
            size="lg"
            shimmer
            icon={<ChevronRight className="w-5 h-5" />}
            onClick={() => window.location.href = '/aios'}
          >
            AIOS Programme
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get in Contact
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span>Custom AI Solutions</span>
          <span className="hidden sm:inline">•</span>
          <span>Enterprise Consulting</span>
          <span className="hidden sm:inline">•</span>
          <span>AI Operating Systems</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </Section>
  );
};

export default Hero;
