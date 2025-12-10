import siteData from "../Constants/siteData";
import Star from "./Common/Star";

// Reviews Section - Tailwind v4.1 Ready

const Reviews = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-olive-800 mb-4">
            Client Reviews
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            What our clients say about us
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {siteData.reviews.map((review) => (
            <div
              key={review.id}
              className="
                rounded-2xl border border-olive-100 
                bg-gradient-to-br from-olive-50 to-white
                p-8 shadow-lg transition-all duration-300
                hover:shadow-2xl hover:-translate-y-2
              "
            >
              {/* User + Company */}
              <div className="flex items-center mb-6">
                <img
                  src={review.logo}
                  alt={review.company}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-olive-800">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Reviews;
