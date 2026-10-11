import React from 'react';

export const ImageAutoSlider = ({ images }: { images: string[] }) => {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 30s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
        }
      `}</style>
      
      <div className="w-full relative overflow-hidden flex items-center justify-center bg-white border-y border-[var(--ink)] py-12 mt-12 mb-8">
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="scroll-container w-full max-w-[100vw]">
            <div className="infinite-scroll flex gap-6 w-max px-6">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 border-2 border-[var(--ink)] overflow-hidden shadow-[4px_4px_0_0_var(--ink)]"
                >
                  <img
                    src={image}
                    alt={`Menu feature ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
