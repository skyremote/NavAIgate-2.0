import LogoLoop from './LogoLoop';

const clientLogos = [
  {
    src: '/logos/autodesk.svg',
    alt: 'Autodesk',
    href: 'https://www.autodesk.com',
    scale: 0.7,
  },
  {
    src: '/logos/katana.svg',
    alt: 'Katana Studio',
    href: 'https://www.katanaus.com',
    scale: 1.8,
  },
  {
    src: '/logos/matroschkasch.png',
    alt: 'Matroschkasch Banya & More',
    href: 'https://www.matroschkasch.de',
    scale: 1.0,
  },
  {
    src: '/logos/ComXo-Mastered-Logo.svg',
    alt: 'ComXo',
    href: 'https://comxo.com',
    scale: 0.8,
  },
];

const ClientLogos: React.FC = () => {
  return (
    <section className="py-12 bg-gray-900 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">
          Trusted by innovative companies
        </p>
        <LogoLoop
          logos={clientLogos}
          speed={25}
          logoHeight={48}
          gap={120}
          fadeOut={true}
          scaleOnHover={true}
          pauseOnHover={true}
        />
      </div>
    </section>
  );
};

export default ClientLogos;
