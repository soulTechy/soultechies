// Contact Details Section — Tailwind v4.1 Ready
const ContactDetails = () => {
  return (
    <section className="py-20 md:py-28 bg-olive-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-olive-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            We'd love to hear from you
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* EMAIL */}
          <div
            className="
            bg-white p-8 rounded-2xl text-center shadow-lg 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
          "
          >
            <div className="h-16 w-16 rounded-full bg-olive-600 flex items-center justify-center mx-auto mb-6">
              <Mail size={24} className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-olive-800 mb-2">Email</h3>

            <a
              href={`mailto:${siteData.contact.email}`}
              className="text-gray-600 hover:text-olive-700 transition-colors"
            >
              {siteData.contact.email}
            </a>
          </div>

          {/* PHONE */}
          <div
            className="
            bg-white p-8 rounded-2xl text-center shadow-lg 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
          "
          >
            <div className="h-16 w-16 rounded-full bg-olive-600 flex items-center justify-center mx-auto mb-6">
              <Phone size={24} className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-olive-800 mb-2">Phone</h3>

            <a
              href={`tel:${siteData.contact.phone}`}
              className="text-gray-600 hover:text-olive-700 transition-colors"
            >
              {siteData.contact.phone}
            </a>
          </div>

          {/* ADDRESS */}
          <div
            className="
            bg-white p-8 rounded-2xl text-center shadow-lg 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
          "
          >
            <div className="h-16 w-16 rounded-full bg-olive-600 flex items-center justify-center mx-auto mb-6">
              <MapPin size={24} className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-olive-800 mb-2">Address</h3>

            <p className="text-gray-600">{siteData.contact.address}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-14">
          <a
            href={siteData.contact.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              h-12 w-12 rounded-full bg-olive-600 flex items-center justify-center 
              transition-all duration-300 hover:bg-olive-700 hover:scale-110
            "
          >
            <Github className="text-white" size={24} />
          </a>

          <a
            href={siteData.contact.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              h-12 w-12 rounded-full bg-olive-600 flex items-center justify-center 
              transition-all duration-300 hover:bg-olive-700 hover:scale-110
            "
          >
            <Linkedin className="text-white" size={24} />
          </a>

          <a
            href={siteData.contact.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="
              h-12 w-12 rounded-full bg-olive-600 flex items-center justify-center 
              transition-all duration-300 hover:bg-olive-700 hover:scale-110
            "
          >
            <Twitter className="text-white" size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};
export default ContactDetails;