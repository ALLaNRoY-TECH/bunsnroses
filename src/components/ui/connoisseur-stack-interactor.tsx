import { cn } from "@/lib/utils";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

export interface MenuItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
  subtitle?: string;
  price?: string;
}

export const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "Truffle Brioche Melt",
    subtitle: "Caramelized brioche, golden cheddar fondue, savory beef tenderloin",
    price: "₹380",
    clipId: "clip-original",
    image: "/dishes/melt-toast.png"
  },
  {
    num: "02",
    name: "Classic Steak Mash",
    subtitle: "Sear steak fillet, roasted autumn vegetables, pepper gravy & velvet potato",
    price: "₹520",
    clipId: "clip-hexagons",
    image: "/dishes/steak-gravy.png"
  },
  {
    num: "03",
    name: "Rosemary Cream Pasta",
    subtitle: "Silky parmesan emulsion, herb grilled cutlet & fresh rosemary aroma",
    price: "₹440",
    clipId: "clip-pixels",
    image: "/dishes/creamy-pasta.png"
  }
];

export const Component = ({
  items = defaultItems,
  className,
  onOpenFullMenu
}: {
  items?: MenuItem[];
  className?: string;
  onOpenFullMenu?: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const item = items[index];
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);
    
    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. IN (Expo Out)
    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
    // 2. IDLE (Sine Breath)
    .to(selector, {
      scale: 1.05,
      duration: 1.5,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
      stagger: { amount: 0.2, from: "center" }
    })
    // 3. OUT (Expo In)
    .to(selector, {
      scale: 0,
      duration: 0.6,
      stagger: { amount: 0.3, from: "edges" },
      ease: "expo.in",
    });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  const activeItem = items[activeIndex];

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "flex flex-col md:flex-row items-center justify-between w-full p-8 md:p-20 overflow-hidden transition-colors duration-500",
        "bg-[#f8f7f3] text-[#111111]", 
        className
      )}
    >
      
      {/* LEFT SIDE: HIGH CONTRAST MENU */}
      <div className="z-20 w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <span className="font-mono-code text-[11px] text-neutral-500 tracking-widest block mb-6">
            SIGNATURE PLATES / CONNOISSEUR INTERACTOR
          </span>

          <nav>
            <ul className="flex flex-col gap-10 md:gap-12">
              {items.map((item, index) => {
                const parts = item.name.split(" ");
                const firstPart = parts[0];
                const restPart = parts.slice(1).join(" ");

                return (
                  <li
                    key={item.num}
                    onMouseEnter={() => handleItemHover(index)}
                    onClick={() => handleItemHover(index)}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-start gap-6">
                      {/* Numbers: Editorial aesthetic badge */}
                      <span className={cn(
                        "font-mono-code text-2xl md:text-3xl font-bold transition-all duration-500 mt-1",
                        activeIndex === index 
                          ? "text-black scale-110 font-black border-b-2 border-black" 
                          : "text-neutral-400 group-hover:text-neutral-700" 
                      )}>
                        {item.num}
                      </span>
                      
                      {/* Main Text */}
                      <div className="flex-1">
                        <h2 className={cn(
                          "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.88] transition-all duration-500",
                          activeIndex === index 
                            ? "text-neutral-950 translate-x-3 opacity-100" 
                            : "opacity-40 text-neutral-500 translate-x-0 group-hover:opacity-75 group-hover:text-black"
                        )}>
                          {firstPart}<br />
                          {restPart}
                        </h2>

                        {item.subtitle && activeIndex === index && (
                          <div className="mt-3 text-xs text-neutral-600 font-mono-code max-w-md animate-fadeIn">
                            <span>{item.subtitle}</span>
                            {item.price && (
                              <span className="ml-3 font-bold text-black bg-neutral-200 px-2 py-0.5">
                                {item.price}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* View Full Menu in aesthetic way at bottom */}
        {onOpenFullMenu && (
          <div className="mt-14 pt-8 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono-code text-[10px] text-neutral-500 block">
                FULL EDITORIAL CATALOGUE · ISSUE 04
              </span>
              <p className="font-editorial-serif italic text-sm text-neutral-800">
                Explore handcrafted sourdough buns, pastas, sips & desserts.
              </p>
            </div>
            
            <button
              type="button"
              onClick={onOpenFullMenu}
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-black text-white hover:bg-neutral-800 transition-all font-mono-code text-xs uppercase tracking-widest border border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span>VIEW FULL EDITORIAL MENU</span>
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: SQUARE GRID (Pure SVG Clip Animations without outer frame) */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
        <div className="absolute w-[120%] h-[120%] bg-orange-500/10 dark:bg-orange-600/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000" />
        
        <svg viewBox="0 0 500 500" className="w-[100%] max-w-[500px] h-auto z-10 block drop-shadow-2xl">
          <defs>
            <clipPath id="clip-original">
              <path className="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
              <path className="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
              <path className="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
              <path className="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
              <path className="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
            </clipPath>

            <clipPath id="clip-hexagons">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>

            {/* Grid Squares with rx="4" as requested */}
            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  className="path"
                  x={(i % 3) * 160 + 20}
                  y={Math.floor(i / 3) * 160 + 20}
                  width="140"
                  height="140"
                  rx="4" 
                />
              ))}
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath={`url(#${items[0].clipId})`}>
            <image
              ref={imageRef}
              href={items[0].image}
              width="500"
              height="500"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Component;
