// Hero Section - Tailwind v4.1 Ready
const Hero = ({ onContactClick, onQuoteClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-olive-50 to-white pt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12 md:py-20 text-center">
        {/* Smooth fade-in animation */}
        <div className="animate-fade-in opacity-0 animate-duration-700 animate-ease-out">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-olive-800 mb-4 md:mb-6">
            {siteData.brand.name}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-2xl lg:text-3xl text-olive-600 mb-4 md:mb-6 font-medium">
            {siteData.brand.tagline}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 mx-auto max-w-3xl mb-8 md:mb-12 px-4">
            {siteData.brand.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={onContactClick}
              className="px-8 py-4 bg-olive-600 text-white rounded-xl shadow-lg font-medium text-lg 
                         transition-all duration-300 hover:bg-olive-700 hover:scale-105"
            >
              Contact Us
            </button>

            <button
              onClick={onQuoteClick}
              className="px-8 py-4 border-2 border-olive-600 text-olive-700 rounded-xl font-medium text-lg 
                         transition-all duration-300 hover:bg-olive-50 hover:scale-105"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;