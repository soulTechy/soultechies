// Services Section - Tailwind v4.1 Ready
const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-olive-800 mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Comprehensive solutions for your digital needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {siteData.services.map((service) => {
            const Icon = IconMap[service.icon];

            return (
              <div
                key={service.id}
                className="
                  rounded-2xl border border-olive-100
                  bg-gradient-to-br from-olive-50 to-white
                  p-8 shadow-lg transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl
                "
              >
                {/* Icon Box */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-olive-600">
                  <Icon className="text-white" size={28} />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold text-olive-800">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Services;