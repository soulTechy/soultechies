// Footer — Tailwind v4.1 Ready
const Footer = () => {
  return (
    <footer className="bg-olive-800 text-white py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
        {/* Brand Name */}
        <p className="text-xl font-semibold mb-2 tracking-wide">
          {siteData.brand.name}
        </p>

        {/* Copyright */}
        <p className="text-olive-200 text-sm">
          &copy; {new Date().getFullYear()} SoulTech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;