import { ExternalLink } from 'lucide-react';
import Section from './Section';
import Card from './Card';
import GradientText from './GradientText';

interface Product {
  name: string;
  description: string;
  logo: string;
  url: string;
  gradient: 'default' | 'purple-teal';
}

const products: Product[] = [
  {
    name: 'bluplai',
    description: 'AI-powered platform for intelligent automation',
    logo: '/logos/Softwares/bluplai.png',
    url: 'https://bluplai.com/',
    gradient: 'default',
  },
  {
    name: 'Still Me',
    description: 'Personal identity and digital presence tools',
    logo: '/logos/Softwares/Still%20Me.png',
    url: 'https://stillme.navaigate.dev/',
    gradient: 'purple-teal',
  },
  {
    name: 'Ente-prise',
    description: 'Enterprise AI that navigates decisions',
    logo: '/logos/Softwares/ente-prise.png',
    url: 'https://www.ente-prise.com',
    gradient: 'default',
  },
];

const ProductsSection: React.FC = () => {
  return (
    <Section id="products" background="gradient">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built by <GradientText gradient="default">NavAIgate</GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our suite of AI-powered products designed to transform how you work
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card
                variant="glass"
                padding="lg"
                hover
                className="h-full flex flex-col items-center text-center border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-300"
              >
                {/* Logo */}
                <div className="mb-6 h-20 md:h-24 flex items-center justify-center">
                  <img
                    src={product.logo}
                    alt={product.name}
                    className="max-h-full w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  <GradientText gradient={product.gradient}>{product.name}</GradientText>
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {product.description}
                </p>

                {/* Visit Link */}
                <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors text-sm font-medium">
                  <span>Visit</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProductsSection;
