import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const emailSubject = encodeURIComponent('Interested in NavAIgate');
  const emailBody = encodeURIComponent('Hi,\n\nI would like to learn more about NavAIgate and Ente-prise.\n\nBest regards');

  return (
    <footer className="py-12 md:py-16 px-4 sm:px-6 border-t border-gray-800 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Brand */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-white font-semibold text-3xl md:text-4xl">NavAIgate</span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed">
              AI consultancy helping organizations navigate from where they are to where they need to be.
              Custom tools, strategic consulting, and the Ente-prise platform.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="max-w-md mx-auto mb-8">
            <a
              href={`mailto:hello@navaigate.dev?subject=${emailSubject}&body=${emailBody}`}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-medium">Get in touch</span>
            </a>
          </div>

          {/* Partnership */}
          <p className="text-gray-500 text-sm mb-8">
            In partnership with{' '}
            <a
              href="https://bluplai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              bluplai
            </a>
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 NavAIgate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
