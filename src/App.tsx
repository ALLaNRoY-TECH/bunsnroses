import { useEffect, useRef, useState } from "react";
import MenuModal from "./MenuModal";
import ConnoisseurStackInteractor, { MenuItem } from "./components/ui/connoisseur-stack-interactor";

// Curated high-fidelity editorial imagery (replacing local assets with aesthetic online imagery)
const IMAGES = {
  // Hero: Atmospheric twilight café with hanging lights & lush garden greenery
  hero: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=85",
  
  // Real Café Space Imagery (Courtyard Lanterns, Lion Fountain, Order Counter)
  cafeLanternCourtyard: "/plates/garden-lantern.png",
  cafeLionFountain: "/plates/lion-fountain.png",
  cafeOrderCounter: "/plates/order-counter.png",

  // Vintage Classical Oil Paintings & Artworks (matching Instagram art aesthetic)
  vintageArt1: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85", // Classical still life with fruit & goblet
  vintageArt2: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85", // Baroque museum fine art
  vintageArt3: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1000&q=85", // Still life flowers & oil brushwork
  vintageArt4: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1000&q=85", // Classical romantic painting

  // Food & Drinks Highlights
  koreanChicken: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=85",
  blushRavioli: "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=1000&q=85",
  glazedPorkBelly: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
  briocheToast: "https://images.unsplash.com/photo-1484723091791-c0e7e1471d69?auto=format&fit=crop&w=1000&q=85",
  ceremonialMatcha: "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?auto=format&fit=crop&w=1000&q=85",
  burntCheesecake: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=85",
  truffleBun: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85",
  botanicalMocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85",

  // Candlelight Dinner (Real intimate garden table, candlelit tableware & reel video)
  candlelightVideo: "/candlelight-reel.mp4",
  candlelightReal1: "/candlelight_1.jpg",
  candlelightReal2: "/candlelight_2.jpg",
  candlelightHero: "/candlelight_1.jpg",
  candlelightGarden: "/candlelight_2.jpg",
  candlelightTableware: "/candlelight_1.jpg",
  candlelightIntimate: "/candlelight_2.jpg",

  // The Café Experience & Real Venue Imagery
  lushPatio: "/experience_courtyard_dusk.png",
  warmOrangeNight: "/experience_garden_nooks.png",
  coffeeBarVibe: "/experience_order_counter.png",
  listeningVinyl: "/experience_neon_sign.jpg",

  // Our World (Moments, gigs, art)
  acousticLive: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=85",
  espressoArt: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85",
  artCorner: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85",
  matchaPour: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85",
  lateGarden: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=85",
};

// Weekly Bulletin Instagram Events (Editable Placeholders)
const BULLETIN_EVENTS = [
  {
    day: "MON",
    date: "16",
    title: "CLOSED FOR MISCHIEF",
    note: "Kitchen rest & fermentation experiments. Back tomorrow at 11:30 AM.",
    type: "dark",
  },
  {
    day: "TUE",
    date: "17",
    title: "STUDENT SOCIAL & SIPS",
    note: "15% off with university ID from 3 PM. Grab a booth & sketch.",
    type: "image",
    bg: IMAGES.coffeeBarVibe,
  },
  {
    day: "WED",
    date: "18",
    title: "MIDWEEK MATCHA & ART",
    note: "Ceremonial whisking demo & zine swap in the courtyard.",
    type: "plain",
  },
  {
    day: "THU",
    date: "19",
    title: "THE LISTENING TABLE",
    note: "Analog vinyl evening. Bring your favorite LP to spin on the turntable.",
    type: "image",
    bg: IMAGES.listeningVinyl,
  },
  {
    day: "FRI",
    date: "20",
    title: "AFTER DARK ACOUSTIC",
    note: "Courtyard candlelit music session from 7:30 PM. Reservations advised.",
    type: "dark",
  },
  {
    day: "SAT",
    date: "21",
    title: "BRUNCH, BABY",
    note: "All day brioche, natural garden light, cold brew & unhurried laughs.",
    type: "image",
    bg: IMAGES.briocheToast,
  },
  {
    day: "SUN",
    date: "22",
    title: "SLOW SUNDAY SUPPER",
    note: "Sunset 5-course pairings & intimate outdoor garden tables.",
    type: "plain",
  },
];

// Food Highlights Data with Categories
const FOOD_HIGHLIGHTS = [
  {
    id: "chicken",
    category: "savoury",
    badge: "01 / CRUNCH HIGHLIGHT",
    name: "Korean Fried Chicken",
    subtitle: "Gochujang glaze, toasted sesame, scallion curls",
    description: "Double-fried for extreme crispness, tossed in a sticky homemade fermented chilli glaze balanced with honey and sesame oil.",
    tastingNotes: "Fiery, Sweet, Crispy, Umami",
    pairing: "Pairs with Iced Ceremonial Matcha",
    image: IMAGES.koreanChicken,
  },
  {
    id: "ravioli",
    category: "pasta",
    badge: "02 / HANDMADE PASTA",
    name: "Blush Pink Ravioli",
    subtitle: "Hand-rolled beetroot pasta, whipped ricotta, brown butter",
    description: "Artisanal parcels filled with herb-whipped ricotta and Parmigiano-Reggiano, tossed in browned sage butter and toasted pine nuts.",
    tastingNotes: "Nutty, Velvety, Herbal, Decadent",
    pairing: "Pairs with Sparkling Citrus Tonic",
    image: IMAGES.blushRavioli,
  },
  {
    id: "pork",
    category: "savoury",
    badge: "03 / SLOW COMFORT",
    name: "Sticky Pork Belly",
    subtitle: "Slow-braised 8 hours, chilli caramel lacquer, house pickles",
    description: "Tender, melt-in-mouth pork belly glazed with star-anise spiced chilli caramel, served with crisp daikon slaw and herbs.",
    tastingNotes: "Rich, Sticky, Tangy, Spiced",
    pairing: "Pairs with Cold Brew Tonic",
    image: IMAGES.glazedPorkBelly,
  },
  {
    id: "toast",
    category: "sweet",
    badge: "04 / MORNING & NIGHT",
    name: "Brioche French Toast",
    subtitle: "Caramelized thick brioche, berry compote, double vanilla cream",
    description: "Custard-soaked golden brioche seared in butter, topped with tart seasonal macerated berries, maple drizzle, and mascarpone whip.",
    tastingNotes: "Fluffy, Caramelized, Tart, Creamy",
    pairing: "Pairs with Flat White or Cortado",
    image: IMAGES.briocheToast,
  },
  {
    id: "matcha",
    category: "sips",
    badge: "05 / SIGNATURE SIPS",
    name: "Ceremonial Matcha Cloud",
    subtitle: "Uji ceremonial grade, whipped strawberry cold foam, oat milk",
    description: "Stone-ground ceremonial green tea whisked fresh to order, served over velvety oat milk with a delicate cloud of strawberry foam.",
    tastingNotes: "Earthy, Grassy, Silky, Berry-sweet",
    pairing: "Pairs with Burnt Basque Cheesecake",
    image: IMAGES.ceremonialMatcha,
  },
  {
    id: "cheesecake",
    category: "sweet",
    badge: "06 / THE FINALE",
    name: "Burnt Basque Slice",
    subtitle: "Charred mahogany exterior, molten custard core, Maldon sea salt",
    description: "Baked at high heat for that signature caramelised bitter-sweet crust while keeping the inner center gooey and impossibly creamy.",
    tastingNotes: "Smoky, Caramel, Rich, Salty",
    pairing: "Pairs with Single-Origin Espresso",
    image: IMAGES.burntCheesecake,
  },
];


function IntroSplash() {
  const [show, setShow] = useState(() => !localStorage.getItem("bnr_intro_shown"));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) return;
    const fadeTimer = setTimeout(() => setFading(true), 2800);
    const closeTimer = setTimeout(() => dismiss(), 3200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [show]);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => {
      localStorage.setItem("bnr_intro_shown", "true");
      setShow(false);
    }, 350);
  };

  if (!show) return null;

  return (
    <div className={`intro-overlay ${fading ? "intro-fade" : ""}`} onClick={dismiss}>
      <div className="intro-logo-box">
        <hr />
        <span>BUNS N’ ROSES</span>
        <hr />
      </div>
      <p className="font-mono-code text-xs tracking-widest text-neutral-300">
        COME FOR THE PLOT. STAY FOR THE FOOD.
      </p>
      <span className="font-mono-code text-[10px] opacity-40 mt-3">(CLICK ANYWHERE TO ENTER)</span>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fullMenuModalOpen, setFullMenuModalOpen] = useState(false);
  const [candlelightModalOpen, setCandlelightModalOpen] = useState(false);
  const [activeFoodTab, setActiveFoodTab] = useState("all");

  // Hero video mute/unmute state & ref
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Form state for Candlelight booking
  const [candleDate, setCandleDate] = useState("");
  const [candleGuests, setCandleGuests] = useState("2");
  const [candleNote, setCandleNote] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Generate WhatsApp message for Candlelight Dinner
  const handleWhatsAppBooking = () => {
    const text = `Hi Buns n' Roses Chennai! I'd like to book a special Candlelight Dinner.
Date: ${candleDate || "Preferred Date"}
Guests: ${candleGuests}
Occasion / Note: ${candleNote || "Romantic evening"}
Please let me know how to proceed!`;
    const url = `https://wa.me/918778479045?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const filteredDishes = activeFoodTab === "all"
    ? FOOD_HIGHLIGHTS
    : FOOD_HIGHLIGHTS.filter((dish) => dish.category === activeFoodTab);

  return (
    <main className="relative bg-[var(--paper)] text-[var(--ink)] selection:bg-black selection:text-white">
      {/* Film Grain Subtle Overlay */}
      <div className="film-grain" />

      {/* Intro Animation */}
      <IntroSplash />

      {/* Full Editorial Menu Modal */}
      <MenuModal
        isOpen={fullMenuModalOpen}
        onClose={() => setFullMenuModalOpen(false)}
      />

      {/* CANDLELIGHT BOOKING MODAL */}
      {candlelightModalOpen && (
        <div
          className="booking-modal-overlay"
          onClick={() => setCandlelightModalOpen(false)}
        >
          <div
            className="booking-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="booking-modal-close"
              onClick={() => setCandlelightModalOpen(false)}
              aria-label="Close booking modal"
            >
              ✕
            </button>
            <div className="border-b-2 border-black pb-4 mb-6">
              <span className="font-mono-code text-[11px] text-neutral-500">
                SPECIAL CANDLELIGHT DINNER RESERVATION
              </span>
              <h2 className="font-editorial-serif text-3xl font-bold mt-1">
                Book a Special Dinner
              </h2>
              <p className="font-mono-code text-xs text-neutral-600 mt-1">
                with @buns.n.roses.chennai
              </p>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="bg-neutral-100 p-4 border border-black/20">
                <p className="font-semibold text-neutral-900 mb-2">What the evening includes:</p>
                <p className="text-neutral-700 mb-1">🕯️ A decorated table that will make you look flattering as ever.</p>
                <p className="text-neutral-700">🍝 A very elegant 5-course meal that you get to choose!</p>
              </div>

              <div>
                <label className="block font-mono-code text-xs mb-1 font-semibold">PREFERRED DATE</label>
                <input
                  type="date"
                  value={candleDate}
                  onChange={(e) => setCandleDate(e.target.value)}
                  className="w-full border-2 border-black p-3 bg-white font-mono-code text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono-code text-xs mb-1 font-semibold">NUMBER OF GUESTS</label>
                <select
                  value={candleGuests}
                  onChange={(e) => setCandleGuests(e.target.value)}
                  className="w-full border-2 border-black p-3 bg-white font-mono-code text-xs focus:outline-none"
                >
                  <option value="2">2 Persons (Couple Dining)</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons (Double Date / Small Gathering)</option>
                  <option value="5+">5+ Persons (Private Group)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono-code text-xs mb-1 font-semibold">OCCASION OR SPECIAL REQUESTS</label>
                <input
                  type="text"
                  placeholder="Anniversary, Birthday, Proposal, Date Night..."
                  value={candleNote}
                  onChange={(e) => setCandleNote(e.target.value)}
                  className="w-full border-2 border-black p-3 bg-white font-mono-code text-xs focus:outline-none"
                />
              </div>

              <p className="font-editorial-serif italic text-neutral-600 text-sm">
                “We cannot guarantee what happens after dessert, but we always recommend starting with dinner :)”
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="btn-candle-whatsapp w-full"
              >
                <span>BOOK VIA WHATSAPP (INSTANT CONFIRMATION)</span>
                <span>↗</span>
              </button>

              <a
                href="tel:8778479045"
                className="btn-candle-primary w-full text-center"
              >
                <span>CALL 8778479045 DIRECTLY</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}


      {/* ---------------------------------------------------- */}
      {/* EDITORIAL NAVIGATION */}
      {/* ---------------------------------------------------- */}
      <nav
        className={`nav-masthead ${scrolled ? "nav-scrolled" : ""}`}
        aria-label="Main Editorial Navigation"
      >
        <a href="#top" className="nav-brand" onClick={closeMobileMenu}>
          <span>BUNS N’ ROSES</span>
          <span className="nav-brand-badge">CHENNAI</span>
        </a>

        <div className="nav-center-links">
          <a href="#masthead">Bulletin</a>
          <a href="#food">Food & Drinks</a>
          <a href="#experience">The Experience</a>
          <a href="#candlelight">Candlelight Dinner</a>
          <a href="#calendar">Weekly Calendar</a>
          <a href="#visit">Visit</a>
        </div>

        <div className="nav-right-actions">
          <button
            type="button"
            onClick={() => setCandlelightModalOpen(true)}
            className="nav-cta-btn bg-black text-white hover:bg-neutral-800"
          >
            <span>BOOK A SPECIAL DINNER</span>
            <span>↗</span>
          </button>

          <button
            type="button"
            className="menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? "CLOSE [✕]" : "MENU [☰]"}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#masthead" onClick={closeMobileMenu}>
            <span>01 / THE BULLETIN</span> <span>↗</span>
          </a>
          <a href="#food" onClick={closeMobileMenu}>
            <span>02 / FOOD & DRINKS</span> <span>↗</span>
          </a>
          <a href="#experience" onClick={closeMobileMenu}>
            <span>03 / THE CAFÉ EXPERIENCE</span> <span>↗</span>
          </a>
          <a href="#candlelight" onClick={closeMobileMenu}>
            <span>04 / CANDLELIGHT DINNER</span> <span>↗</span>
          </a>
          <a href="#calendar" onClick={closeMobileMenu}>
            <span>05 / WEEKLY CALENDAR</span> <span>↗</span>
          </a>
          <a href="#visit" onClick={closeMobileMenu}>
            <span>06 / VISIT US</span> <span>↗</span>
          </a>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                setCandlelightModalOpen(true);
              }}
              className="btn-candle-primary w-full text-center"
            >
              <span>BOOK CANDLELIGHT DINNER</span>
              <span>↗</span>
            </button>
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                setFullMenuModalOpen(true);
              }}
              className="btn-editorial-light w-full justify-center border-black"
            >
              <span>VIEW FULL EDITORIAL MENU</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ---------------------------------------------------- */}
      {/* 1. IMMERSIVE HERO WITH AMBIENT VIDEO */}
      {/* ---------------------------------------------------- */}
      <section className="hero-section" id="top">
        <div className="hero-bg-wrapper">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={IMAGES.hero}
            className="hero-bg-img"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay-gradient" />
        </div>

        {/* Small aesthetic Mute / Unmute Button in Right Corner */}
        <div className="hero-audio-corner">
          <button
            type="button"
            onClick={toggleMute}
            className="hero-audio-btn"
            title={isMuted ? "Click to unmute sound" : "Click to mute sound"}
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          >
            <span className="audio-icon-wrap">
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </span>
            <span className="font-mono-code text-[10px] tracking-widest font-semibold">
              {isMuted ? "MUTED [UNMUTE]" : "AUDIO ON [MUTE]"}
            </span>
          </button>
        </div>

        {/* Vertical Coordinates Meta */}
        <div className="hero-meta-vertical">
          <span>12.9184° N, 80.1472° E</span>
          <span>·</span>
          <span>SEMBAKKAM, CHENNAI</span>
          <span>·</span>
          <span>ISSUE NO. 04</span>
        </div>

        <h1 className="sr-only">Buns n’ Roses — Independent Editorial Café Chennai</h1>

        <div className="hero-content">
          <div className="hero-footer-bar">
            <div className="hero-buttons-row">
              <button
                type="button"
                onClick={() => setFullMenuModalOpen(true)}
                className="btn-editorial-light"
              >
                <span>EXPLORE MENU</span>
                <span>↗</span>
              </button>
              <a href="#experience" className="btn-editorial-outline">
                <span>THE CAFÉ EXPERIENCE</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER TAPE */}
      <div className="editorial-ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>COME FOR THE PLOT. STAY FOR THE FOOD</span>
          <span className="symbol">✳</span>
          <span>SEMBAKKAM CHENNAI</span>
          <span className="symbol">✳</span>
          <span>HANDMADE BLUSH RAVIOLI</span>
          <span className="symbol">✳</span>
          <span>SPECIAL CANDLELIGHT DINNERS</span>
          <span className="symbol">✳</span>
          <span>CEREMONIAL MATCHA CLOUD</span>
          <span className="symbol">✳</span>
          <span>ANALOG VINYL NIGHTS</span>
          <span className="symbol">✳</span>
          <span>NO LAPTOPS AFTER 8 PM</span>
          <span className="symbol">✳</span>
          <span>PET FRIENDLY GARDEN</span>
          <span className="symbol">✳</span>
          <span>CALL 8778479045</span>
          <span className="symbol">✳</span>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. EDITORIAL MASTHEAD */}
      {/* ---------------------------------------------------- */}
      <section className="masthead-section" id="masthead">
        <div className="masthead-meta-header">
          <span>VOL. 04 / CHENNAI EDITION</span>
          <span className="center-edition">INDEPENDENT CAFÉ CULTURE & ART CHRONICLE</span>
          <span className="right-date">ESTABLISHED IN SEMBAKKAM</span>
        </div>

        <h2 className="masthead-main-headline">
          BUNS N’
          <br />
          <span className="ml-[8%]">ROSES</span>
        </h2>

        <div className="masthead-sub-banner">
          <span>THE OFFICIAL BULLETIN</span>
          <span>·</span>
          <span>FOOD · ART · VINTAGE PRINTS · NIGHT SOUNDS</span>
          <span>·</span>
          <span>CHENNAI 600073</span>
        </div>

        <div className="masthead-editorial-grid">
          <div className="manifesto-callout">
            <span className="font-mono-code text-[11px] text-neutral-500 block mb-3">
              EDITORIAL MANIFESTO / ISSUE 04
            </span>
            <h3>
              Not your quiet corner café.
              <br />
              <span className="font-classical-serif italic font-normal">
                A canvas for food, art, and unexpected company.
              </span>
            </h3>
            <p>
              Buns n’ Roses was created as an antidote to corporate coffee chains and sanitized restaurant
              templates. We believe that good food deserves high drama: handmade pasta inspired by Italian
              still-lifes, crispy twice-fried chicken glazed in sweet gochujang, and candlelit tables that make
              every conversation feel like the climax of an indie film.
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="#visit"
                className="font-mono-code text-xs font-bold underline uppercase tracking-wider"
              >
                MEET US IN SEMBAKKAM ↗
              </a>
              <span className="text-neutral-300">|</span>
              <a
                href="https://www.instagram.com/buns.n.roses.chennai"
                target="_blank"
                rel="noreferrer"
                className="font-mono-code text-xs text-neutral-600 hover:text-black uppercase tracking-wider"
              >
                @BUNS.N.ROSES.CHENNAI ↗
              </a>
            </div>
          </div>

          <div className="border-2 border-black p-6 bg-white flex flex-col justify-between">
            <div>
              <span className="font-mono-code text-[10px] bg-black text-white px-2 py-1 uppercase inline-block mb-4">
                THE FOUNDING MOTTO
              </span>
              <h4 className="font-editorial-serif text-3xl font-bold leading-tight mb-4">
                “Start with the dinner. Let the evening take care of the plot.”
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-mono-code">
                Every corner of our space—from the antique oil painting prints to the hanging bougainvillea and
                warm orange incandescent lighting—is designed to slow down the clock.
              </p>
            </div>
            <div className="pt-6 border-t border-black/20 flex justify-between items-center font-mono-code text-[11px]">
              <span>CURATED DISHES</span>
              <span className="font-bold">5-COURSE EXPERIENCES</span>
            </div>
          </div>
        </div>

        {/* Real Café Atmosphere Triptych (Garden Lanterns, Lion Fountain, Order Counter) */}
        <div className="vintage-art-triptych">
          <div className="art-card">
            <div className="art-img-box">
              <img
                src={IMAGES.cafeLanternCourtyard}
                alt="Lush green garden courtyard with candlelit dinner tables and warm ambient lanterns"
              />
            </div>
            <div className="art-card-footer">
              <span>PLATE 01 / COURTYARD & LANTERNS</span>
              <span>FIG. A</span>
            </div>
          </div>

          <div className="art-card">
            <div className="art-img-box">
              <img
                src={IMAGES.cafeLionFountain}
                alt="Stone sculpted lion head fountain framed by potted tropical palms"
              />
            </div>
            <div className="art-card-footer">
              <span>PLATE 02 / THE LION FOUNTAIN</span>
              <span>FIG. B</span>
            </div>
          </div>

          <div className="art-card">
            <div className="art-img-box">
              <img
                src={IMAGES.cafeOrderCounter}
                alt="Order and Pay counter with illuminated typography and crimson velvet drapery"
              />
            </div>
            <div className="art-card-footer">
              <span>PLATE 03 / ORDER & PAY COUNTER</span>
              <span>FIG. C</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. FOOD & DRINKS (CONNOISSEUR STACK INTERACTOR) */}
      {/* ---------------------------------------------------- */}
      <section className="food-section" id="food">
        <div className="food-header-row border-b-2 border-black pb-8 mb-4">
          <div>
            <span className="font-mono-code text-xs text-neutral-500 block mb-2">
              THE CULINARY EDIT / AUTUMN & WINTER REPERTOIRE
            </span>
            <h2>
              WHAT’S
              <br />
              GOOD HERE?
            </h2>
          </div>
          <div>
            <p className="food-header-desc">
              We commit to zero dogmas and maximum indulgence. Rich comforting textures, handmade brioche melts,
              charred steaks in peppercorn lacquer, and velvety herb pastas that celebrate café comfort.
            </p>
          </div>
        </div>

        {/* Dynamic GSAP SVG Connoisseur Stack Component with the 3 real café photos */}
        <ConnoisseurStackInteractor
          onOpenFullMenu={() => setFullMenuModalOpen(true)}
          items={[
            {
              num: "01",
              name: "Truffle Brioche Melt",
              subtitle: "Toasted brioche, golden cheddar fondue, savory beef tenderloin & chives",
              price: "₹380",
              clipId: "clip-original",
              image: "/dishes/melt-toast.png"
            },
            {
              num: "02",
              name: "Classic Steak Mash",
              subtitle: "Seared steak fillet, roasted autumn vegetables, pepper jus & velvet potato mash",
              price: "₹520",
              clipId: "clip-hexagons",
              image: "/dishes/steak-gravy.png"
            },
            {
              num: "03",
              name: "Rosemary Cream Pasta",
              subtitle: "Silky parmesan emulsion, herb seared chicken cutlet & fresh garden rosemary aroma",
              price: "₹440",
              clipId: "clip-pixels",
              image: "/dishes/creamy-pasta.png"
            }
          ]}
        />
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. THE CAFÉ EXPERIENCE */}
      {/* ---------------------------------------------------- */}
      <section className="experience-section" id="experience">
        <div className="experience-title-bar">
          <div>
            <span className="font-mono-code text-xs text-neutral-500 block mb-2">
              ATMOSPHERE & ARCHITECTURE
            </span>
            <h2>THE CAFÉ EXPERIENCE</h2>
          </div>
          <div className="border-l-2 border-black pl-8 ml-auto max-w-lg">
            <p className="text-sm text-neutral-700 leading-relaxed m-0">
              Immerse yourself in lush greenery, outdoor garden tables, warm incandescent amber lighting,
              and relaxed soul music. A deliberate escape built for long conversations, unhurried reading,
              and lingering past dessert.
            </p>
          </div>
        </div>

        {/* Magazine Style Photographic Collage of Real Café Atmosphere */}
        <div className="experience-mosaic">
          <figure className="mosaic-item-wide">
            <img
              src={IMAGES.lushPatio}
              alt="Outdoor courtyard dining patio illuminated by glowing red ambient kitchen lights and outdoor tables"
            />
            <figcaption className="mosaic-caption">
              <span>01 / COURTYARD AFTER DUSK</span>
              <span>OUTDOOR DINING & AMBIENT LANTERNS</span>
            </figcaption>
          </figure>

          <figure className="mosaic-item-tall">
            <img
              src={IMAGES.warmOrangeNight}
              alt="Lush tropical greenery garden with glowing golden table lamp in the night"
            />
            <figcaption className="mosaic-caption">
              <span>02 / THE BOTANICAL GARDEN NOOK</span>
              <span>LUSH LEAVES & TUNGSTEN GLOW</span>
            </figcaption>
          </figure>

          <figure className="mosaic-item-square1">
            <img
              src={IMAGES.listeningVinyl}
              alt="Warm neon wall sign reading Dining at Buns n Roses on rustic brick wall"
            />
            <figcaption className="mosaic-caption">
              <span>03 / THE ICONIC SIGN</span>
              <span>DINING AT BUNS N’ ROSES</span>
            </figcaption>
          </figure>

          <figure className="mosaic-item-square2">
            <img
              src={IMAGES.coffeeBarVibe}
              alt="Order & Pay Here counter with red drapery backdrop and foliage"
            />
            <figcaption className="mosaic-caption">
              <span>04 / THE ORDER & BAKEHOUSE COUNTER</span>
              <span>PET FRIENDLY · BRING YOUR FAVORITE PERSON</span>
            </figcaption>
          </figure>
        </div>


      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. CANDLELIGHT DINNER — MUST-HAVE FEATURE */}
      {/* ---------------------------------------------------- */}
      <section className="candlelight-section" id="candlelight">
        <div className="candlelight-header-grid">
          <div>
            <span className="font-mono-code text-xs text-[#f7a868] tracking-widest block mb-3">
              THE SIGNATURE EVENING EXPERIENCE
            </span>
            <h2>
              BOOK A
              <br />
              <em>SPECIAL DINNER</em>
            </h2>
          </div>
          <div className="candlelight-subhead-box">
            <p>
              An intimate garden table beneath the night sky, bathed in glowing candles, flowers, and fine tableware.
              Cinematic, romantic, and crafted to make time stand completely still.
            </p>
            <span className="font-mono-code text-xs text-[#f7d8ba]">
              LIMITED PRIVATE TABLES PER EVENING · ADVANCE RESERVATIONS RECOMMENDED
            </span>
          </div>
        </div>

        {/* Real Candlelight Atmosphere Gallery (Two Balanced Editorial Photos) */}
        <div className="candlelight-visual-gallery">
          {/* Card 1: Real Candlelit Dinner Table - Tableware & Glow */}
          <div className="candle-frame group">
            <img
              src={IMAGES.candlelightReal1}
              alt="Intimate candlelit dinner table with glowing amber candles, wine glass, baby's breath florals & dining plates"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="candle-badge-overlay">01 / TABLEWARE & GLOW</div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-[#f7d8ba] font-mono-code text-[11px] bg-black/60 backdrop-blur-sm p-3 border border-white/10">
              <span className="font-bold uppercase tracking-wider">THE TABLE SETTING</span>
              <span className="text-white/70">WINE · FLORALS · CANDLES</span>
            </div>
          </div>

          {/* Card 2: Real Candlelit Dinner Table - Intimate Evening */}
          <div className="candle-frame group">
            <img
              src={IMAGES.candlelightReal2}
              alt="Atmospheric twilight dinner setting with candle lanterns and private dining table"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="candle-badge-overlay">02 / INTIMATE COURSES</div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-[#f7d8ba] font-mono-code text-[11px] bg-black/60 backdrop-blur-sm p-3 border border-white/10">
              <span className="font-bold uppercase tracking-wider">PRIVATE GARDEN NOOK</span>
              <span className="text-white/70">NIGHTS ONLY · 5-COURSE MENU</span>
            </div>
          </div>
        </div>

        {/* The Exact Copy Mandated Container with Gen Z Editorial Aesthetic */}
        <div className="candlelight-invitation-container">
          <div className="candlelight-copy-card">
            {/* Top Tape & Handle Pill */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono-code text-[10px] tracking-[0.2em] px-3 py-1 bg-white/10 text-[#f7d8ba] border border-white/20 backdrop-blur-md">
                @BUNS.N.ROSES.CHENNAI
              </span>
              <span className="font-mono-code text-[9px] tracking-widest text-neutral-400 uppercase">
                PRIVATE RESERVATIONS · NIGHTS ONLY
              </span>
            </div>

            {/* Aesthetic Heading */}
            <h3 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.08] tracking-tight mb-8">
              Book a special dinner with{" "}
              <span className="font-script text-[#f7d8ba] text-4xl sm:text-5xl font-normal lowercase tracking-normal inline-block hover:scale-105 transition-transform">
                @buns.n.roses.chennai
              </span>
            </h3>

            {/* Inclusions with Custom SVG Icons & Clean Micro-interactions */}
            <div className="evening-inclusions-list">
              <span className="font-mono-code text-[11px] text-[#f7a868] uppercase tracking-[0.18em] block">
                WHAT THE EVENING INCLUDES —
              </span>

              {/* Inclusion 1: Candle table */}
              <div className="inclusion-row group">
                <div className="icon-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#f7a868]">
                    <path d="M12 2c-.5 1-1.5 2-1.5 3.5 0 1.1.9 2 2 2s2-.9 2-2C14.5 4 13.5 3 13 2z" fill="#f7a868" fillOpacity="0.4" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <rect x="9" y="8" width="6" height="13" rx="1" />
                    <line x1="7" y1="21" x2="17" y2="21" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="text-white text-base sm:text-lg font-medium tracking-tight block">
                    A decorated table that will make you look flattering as ever.
                  </span>
                  <span className="font-mono-code text-[10px] text-neutral-400 mt-0.5 block tracking-wider">
                    ambient taper candles · fresh florals · warm tungsten lighting
                  </span>
                </div>
              </div>

              {/* Inclusion 2: 5-course meal */}
              <div className="inclusion-row group">
                <div className="icon-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#f7a868]">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                    <path d="M8 12h.01M16 12h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="text-white text-base sm:text-lg font-medium tracking-tight block">
                    A very elegant 5-course meal that you get to choose!
                  </span>
                  <span className="font-mono-code text-[10px] text-neutral-400 mt-0.5 block tracking-wider">
                    appetizers · handmade pasta · comfort plates · artisanal desserts
                  </span>
                </div>
              </div>
            </div>

            {/* Aesthetic Quote */}
            <div className="dessert-quote-box">
              <p className="dessert-quote">
                “We cannot guarantee what happens after dessert, but we always recommend starting with dinner :)”
              </p>
            </div>
          </div>

          {/* Prominent Action & Call Display */}
          <div className="candlelight-action-box">
            <div>
              <span className="action-title">DIRECT RESERVATION LINE</span>
              <a href="tel:8778479045" className="action-phone-display">
                Call 8778479045
              </a>
              <p className="text-xs text-neutral-600 font-mono-code leading-relaxed mb-6">
                Reserve your candlelit table directly with our hospitality host. Inquire about customized menu courses,
                dates, and special anniversary arrangements.
              </p>
            </div>

            <div className="candlelight-buttons">
              <button
                type="button"
                onClick={() => setCandlelightModalOpen(true)}
                className="btn-candle-primary"
              >
                <span>BOOK YOUR CANDLELIGHT DINNER</span>
                <span>↗</span>
              </button>

              <a
                href="https://wa.me/918778479045?text=Hi%20Buns%20n'%20Roses%20Chennai!%20I'd%20love%20to%20reserve%20a%20special%20Candlelight%20Dinner."
                target="_blank"
                rel="noreferrer"
                className="btn-candle-whatsapp"
              >
                <span>BOOK VIA WHATSAPP CHAT</span>
                <span>↗</span>
              </a>

              <a
                href="tel:8778479045"
                className="font-mono-code text-[11px] text-center font-bold underline mt-2 block"
              >
                CLICK TO CALL: 8778479045
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. THE BUNS N’ ROSES BULLETIN (OCT 9 TO 18 REAL CALENDAR) */}
      {/* ---------------------------------------------------- */}
      <section className="bulletin-section" id="calendar">
        {/* Real Bulletin Header */}
        <div className="border-b-4 border-black pb-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs mb-3">
            <span className="bg-black text-white px-3 py-1 font-bold tracking-widest text-[11px]">
              OCT 9 TO 18
            </span>
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">
              SEMBAKKAM, CHENNAI · SOUTH INDIA
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-black pb-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black m-0">
              BUNS N’ ROSES <span className="font-editorial-serif italic font-normal tracking-normal">BULLETIN</span>
            </h2>
            <span className="font-mono-code text-xs text-neutral-600 tracking-widest">
              SAVE IT. SEND IT. SHOW UP HUNGRY.
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h3 className="font-editorial-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-1">
                What’s happening this week?
              </h3>
              <p className="font-mono-code text-xs text-neutral-600 font-semibold uppercase tracking-wider">
                5 Reasons to get out of your house this month!
              </p>
            </div>
            <a
              href="https://www.instagram.com/buns.n.roses.chennai"
              target="_blank"
              rel="noreferrer"
              className="font-mono-code text-xs font-bold underline uppercase hover:text-neutral-600"
            >
              VIEW ON INSTAGRAM @BUNS.N.ROSES.CHENNAI ↗
            </a>
          </div>
        </div>

        {/* 10-DAY EDITORIAL GRID (OCT 9 TO 18) */}
        <div className="border-4 border-black bg-white shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden mb-8">
          {/* Row 1: OCT 9 - OCT 13 (5 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-5 border-b-2 border-black">
            {/* OCT 9 FRI */}
            <div className="p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[140px] flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-500">OCT 9</span>
                <span className="font-mono-code text-sm font-black text-black">FRI</span>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-black/30">
                <span className="font-mono-code text-[10px] text-neutral-500 block">WEEKEND KICKOFF</span>
              </div>
            </div>

            {/* OCT 10 SAT */}
            <div className="p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[140px] flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-500">OCT 10</span>
                <span className="font-mono-code text-sm font-black text-black">SAT</span>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-black/30">
                <span className="font-mono-code text-[10px] text-neutral-500 block">ALL-DAY BRUNCH</span>
              </div>
            </div>

            {/* OCT 11 SUN */}
            <div className="p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[140px] flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-500">OCT 11</span>
                <span className="font-mono-code text-sm font-black text-black">SUN</span>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-black/30">
                <span className="font-mono-code text-[10px] text-neutral-500 block">SLOW SUPPER</span>
              </div>
            </div>

            {/* OCT 12 MON */}
            <div className="p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[140px] flex flex-col justify-between bg-[#111111] text-white">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-400">OCT 12</span>
                <span className="font-mono-code text-sm font-black text-white">MON</span>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-white/30">
                <span className="font-mono-code text-[10px] text-[#f7a868] block">CLOSED FOR MISCHIEF</span>
              </div>
            </div>

            {/* OCT 13 TUE */}
            <div className="p-4 min-h-[140px] flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-500">OCT 13</span>
                <span className="font-mono-code text-sm font-black text-black">TUE</span>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-black/30">
                <span className="font-mono-code text-[10px] text-neutral-500 block">COMMUNITY SIPS</span>
              </div>
            </div>
          </div>

          {/* Special Collaboration Offer Ribbon Across Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#6b2c1a] text-white font-mono-code text-xs border-b-2 border-black">
            <div className="p-3 border-b md:border-b-0 md:border-r border-black/40 flex items-center gap-3">
              <span className="bg-[#f7a868] text-black font-black px-2 py-0.5 text-[10px]">PERK 01</span>
              <span className="font-bold tracking-wide">10% OFF your Dining Bill when you shop from Sakyaa</span>
            </div>
            <div className="p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-white text-black font-black px-2 py-0.5 text-[10px]">PERK 02</span>
                <span>20% OFF on NEW planters at Green Orchids</span>
              </div>
              <span className="text-[#f7d8ba] text-[11px]">· 15% OFF Sarees at THIA DESIGNS</span>
            </div>
          </div>

          {/* Row 2: OCT 14 - OCT 18 (5 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-5">
            {/* OCT 14 WED */}
            <div className="p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[160px] flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-500">OCT 14</span>
                <span className="font-mono-code text-sm font-black text-black">WED</span>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-black/30">
                <span className="font-mono-code text-[10px] text-neutral-500 block">STUDENT DISCOUNTS</span>
              </div>
            </div>

            {/* OCT 15 THU */}
            <div className="p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[160px] flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-500">OCT 15</span>
                <span className="font-mono-code text-sm font-black text-black">THU</span>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-black/30">
                <span className="font-mono-code text-[10px] text-neutral-500 block">ANALOG VINYL NIGHT</span>
              </div>
            </div>

            {/* OCT 16 FRI: YETI COFFEE ROASTS COLLAB */}
            <div className="relative p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[160px] flex flex-col justify-between bg-[#191410] text-white overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80')"
                }}
              />
              <div className="relative z-10">
                <span className="font-mono-code text-xs font-bold block text-neutral-400">OCT 16</span>
                <span className="font-mono-code text-sm font-black text-white">FRI</span>
              </div>
              <div className="relative z-10 text-center my-auto py-2">
                <span className="inline-block font-black text-2xl tracking-widest px-3 py-1 bg-white text-black border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  YETI
                </span>
                <span className="font-mono-code text-[9px] text-[#f7d8ba] block mt-1 tracking-wider">
                  COFFEE COLLABORATION
                </span>
              </div>
            </div>

            {/* OCT 17 SAT: MATCHA DAY */}
            <div className="p-4 border-b sm:border-b-0 sm:border-r-2 border-black min-h-[160px] flex flex-col justify-between bg-[#eef4ea]">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-600">OCT 17</span>
                <span className="font-mono-code text-sm font-black text-black">SAT</span>
              </div>
              <div className="my-auto text-center py-2">
                <span className="font-editorial-serif text-2xl font-black uppercase text-[#476a38] tracking-wider block">
                  MATCHA DAY
                </span>
                <span className="font-mono-code text-[9px] text-neutral-600 block mt-0.5">
                  Uji Ceremonial Whisking & Clouds
                </span>
              </div>
            </div>

            {/* OCT 18 SUN: MATCHA DAY CONT. */}
            <div className="p-4 min-h-[160px] flex flex-col justify-between bg-[#eef4ea]">
              <div>
                <span className="font-mono-code text-xs font-bold block text-neutral-600">OCT 18</span>
                <span className="font-mono-code text-sm font-black text-black">SUN</span>
              </div>
              <div className="my-auto text-center py-2">
                <span className="font-editorial-serif text-2xl font-black uppercase text-[#476a38] tracking-wider block">
                  MATCHA DAY
                </span>
                <span className="font-mono-code text-[9px] text-neutral-600 block mt-0.5">
                  Weekend Special Matcha Flights
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Strip */}
        <div className="bulletin-promo-strip">
          <span className="font-mono-code text-xs text-[#f7a868] uppercase font-bold tracking-wider">
            OCT 9 — OCT 18 DROP
          </span>
          <strong>NEW PARTNERSHIPS. MATCHA DAYS. YETI COFFEE SESSIONS.</strong>
          <a
            href="https://www.instagram.com/buns.n.roses.chennai"
            target="_blank"
            rel="noreferrer"
            className="font-mono-code text-xs font-bold underline uppercase"
          >
            FOLLOW LIVE STORIES @BUNS.N.ROSES.CHENNAI ↗
          </a>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* 8. VISIT US */}
      {/* ---------------------------------------------------- */}
      <section className="visit-section" id="visit">
        <div className="visit-left-headline">
          <div>
            <span className="font-mono-code text-xs text-neutral-500 block mb-2">
              FIND YOUR CORNER
            </span>
            <h2>
              SEE YOU
              <br />
              AT THE
              <br />
              <em>CAFÉ?</em>
            </h2>
          </div>

          <div className="mt-12 font-mono-code text-xs text-neutral-600">
            <span>SEMBAKKAM · CHENNAI · SOUTH INDIA</span>
            <br />
            <span>PET FRIENDLY · OUTDOOR COURTYARD · CANDLELIGHT DINING</span>
          </div>
        </div>

        <div className="visit-right-details">
          <div className="visit-info-tile">
            <div>
              <span className="font-mono-code text-[10px] text-neutral-500 tracking-wider">
                01 / LOCATION
              </span>
              <h4>Buns n’ Roses</h4>
              <p>Sembakkam, Chennai, Tamil Nadu</p>
              <small className="font-mono-code text-[10px] text-neutral-500 mt-1 block">
                Near Velachery Main Road corridor
              </small>
            </div>
            <a
              href="https://maps.app.goo.gl/YsbkSk9wEvoJoQ7DA"
              target="_blank"
              rel="noreferrer"
              className="font-mono-code text-xs font-bold underline uppercase tracking-wider"
            >
              GET DIRECTIONS ON GOOGLE MAPS ↗
            </a>
          </div>

          <div className="visit-info-tile">
            <div>
              <span className="font-mono-code text-[10px] text-neutral-500 tracking-wider">
                02 / HOURS
              </span>
              <h4>Tuesday – Sunday</h4>
              <p>11:30 AM — 11:00 PM</p>
              <small className="font-mono-code text-[10px] text-neutral-500 mt-1 block">
                Monday: Closed for Mischief
              </small>
            </div>
            <span className="font-mono-code text-xs text-neutral-500">
              KITCHEN OPEN LATE
            </span>
          </div>

          <div className="visit-info-tile full-width">
            <div>
              <span className="font-mono-code text-[10px] text-neutral-500 tracking-wider">
                03 / CONTACT & RESERVATIONS
              </span>
              <h4 className="text-2xl">Call 8778479045</h4>
              <p className="max-w-md">
                Walk-ins are warmly welcomed throughout the day. For special Candlelight Dinners, romantic
                anniversary setups, or large celebrations, kindly reach out in advance.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center pt-4">
              <a
                href="tel:8778479045"
                className="btn-editorial-light border-black"
              >
                <span>CALL 8778479045</span>
                <span>↗</span>
              </a>
              <a
                href="https://wa.me/918778479045"
                target="_blank"
                rel="noreferrer"
                className="btn-editorial-outline border-black text-black hover:bg-black hover:text-white"
              >
                <span>CHAT ON WHATSAPP</span>
                <span>↗</span>
              </a>
              <button
                type="button"
                onClick={() => setFullMenuModalOpen(true)}
                className="font-mono-code text-xs font-bold underline uppercase ml-auto"
              >
                VIEW FULL MENU ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* EDITORIAL FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer className="editorial-footer">
        <div>
          <div className="footer-top-logo">BUNS N’ ROSES</div>
          <div className="footer-manifesto">
            GOOD FOOD. BETTER VIBES. A LITTLE WILD. SEE YOU SOON.
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>
            <span>SEMBAKKAM / CHENNAI</span>
            <span className="mx-3">·</span>
            <span>ISSUE NO. 04</span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/buns.n.roses.chennai"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              INSTAGRAM: @BUNS.N.ROSES.CHENNAI
            </a>
            <a href="tel:8778479045" className="hover:underline">
              PHONE: 8778479045
            </a>
          </div>
          <div>
            <a href="#top" className="hover:underline font-bold">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </footer>

      {/* ---------------------------------------------------- */}
      {/* RIGHT MOST CORNER DOWN: TWO INSTAGRAM SYMBOLS */}
      {/* ---------------------------------------------------- */}
      <aside
        className="floating-instagram-dock"
        aria-label="Instagram Links"
      >
        <span className="ig-dock-label font-mono-code text-[10px] tracking-wider text-neutral-300 pr-1 hidden sm:inline-block">
          @buns.n.roses.chennai
        </span>

        {/* Symbol 1: Official Instagram Camera Glyph */}
        <a
          href="https://www.instagram.com/buns.n.roses.chennai?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noreferrer"
          className="ig-symbol-link"
          title="Open @buns.n.roses.chennai on Instagram"
          aria-label="Instagram camera profile"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        {/* Symbol 2: Diagonal Arrow Link Glyph */}
        <a
          href="https://www.instagram.com/buns.n.roses.chennai?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noreferrer"
          className="ig-symbol-link"
          title="Visit Instagram Page ↗"
          aria-label="Instagram link arrow"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </aside>
    </main>
  );
}
