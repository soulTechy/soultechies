// Clients Section - Tailwind v4.1 Ready
const Clients = () => {
  return (
    <section className="py-20 md:py-28 bg-olive-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-olive-800 mb-12 md:mb-20">
          Worked With
        </h2>

        {/* Logo Grid */}
        <div
          className="
          grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 
          gap-6 md:gap-10 items-center
        "
        >
          {siteData.clients.map((client) => (
            <div
              key={client.id}
              className="
                flex items-center justify-center
                rounded-xl bg-white p-6 shadow-md
                transition-all duration-300
                hover:shadow-xl hover:scale-105
              "
            >
              <img
                src={client.logo}
                alt={client.name}
                className="
                  max-w-full h-auto opacity-70 
                  transition-opacity duration-300 
                  hover:opacity-100
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Clients;