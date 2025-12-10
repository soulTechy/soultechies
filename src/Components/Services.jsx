import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaUsers } from "react-icons/fa";
import siteData from "../Constants/siteData";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <motion.div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-2xl border-2 border-violet-200 bg-white shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
      customClass ?? ""
    } ${rest.className ?? ""}`.trim()}
    transition={{ duration: 0.2 }}
  />
));
Card.displayName = "Card";

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  onCardClick,
  skewAmount = 6,
  children,
  currentIndex,
}) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const [order, setOrder] = useState(
    Array.from({ length: childArr.length }, (_, i) => i)
  );
  const container = useRef(null);

  // Update order when currentIndex changes
  useEffect(() => {
    const newOrder = [];
    for (let i = 0; i < childArr.length; i++) {
      newOrder.push((currentIndex + i) % childArr.length);
    }
    setOrder(newOrder);
  }, [currentIndex, childArr.length]);

  const getCardStyle = (index) => {
    const position = order.indexOf(index);
    const total = childArr.length;

    return {
      transform: `translate(-50%, -50%) 
                 translateX(${position * cardDistance}px) 
                 translateY(-${position * verticalDistance}px) 
                 translateZ(-${position * cardDistance * 1.5}px) 
                 skewY(${skewAmount}deg)`,
      zIndex: total - position,
      transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      pointerEvents: position === 0 ? "auto" : "none",
    };
  };

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          style: {
            width,
            height,
            ...getCardStyle(i),
            ...(child.props.style ?? {}),
          },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

// Icon mapping
const iconMap = {
  code: FaCode,
  rocket: FaRocket,
  users: FaUsers,
};

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-switch every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % siteData.services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [siteData.services.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100 flex items-center justify-center p-8 md:p-20 relative overflow-hidden">
      {/* Decorative background elements with smooth animations */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Additional animated blobs for more depth */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-violet-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 to-violet-300 rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              We transform ideas into exceptional digital experiences. Our
              comprehensive services cover everything from development to
              deployment.
            </motion.p>

            {/* Service list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              {siteData.services.map((service, index) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-5 rounded-xl bg-white/50 backdrop-blur-sm border border-violet-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-violet-400 flex items-center justify-center shadow-lg"
                    >
                      <IconComponent className="text-white text-xl" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Card Stack (auto-switching) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden md:block relative h-[600px] "
          >
            <CardSwap
              width={450}
              height={350}
              cardDistance={50}
              verticalDistance={60}
              currentIndex={currentIndex}
            >
              {siteData.services.map((service) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <Card key={service.id}>
                    <div className="w-full h-full p-8 flex flex-col justify-center items-center text-center space-y-6 bg-gradient-to-br from-white to-violet-50">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-400 flex items-center justify-center shadow-xl"
                      >
                        <IconComponent className="text-white text-4xl" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {service.description}
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-1 bg-gradient-to-r from-violet-500 to-violet-300 rounded-full"
                      />
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
