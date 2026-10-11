import React, { useState, useEffect, useRef } from "react";

export interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  isVeg?: boolean;
  isPork?: boolean;
  isBeef?: boolean;
  highlight?: boolean;
}

interface MenuSection {
  id: string;
  title: string;
  category: string;
  pageNumber: number;
  foodImage: string;
  foodAlt: string;
  extraFoodImage?: string;
  extraFoodAlt?: string;
  heroText?: string;
  callout?: {
    title: string;
    desc: string;
    price: string;
    tag?: string;
    isBeef?: boolean;
    isPork?: boolean;
  };
  items: MenuItem[];
  itemsCol2?: MenuItem[];
  footnote?: string;
}

export const MENU_PAGES_DATA: MenuSection[] = [
  {
    id: "sec-mocktails",
    title: "Mocktail",
    category: "Mocktails & Refreshers",
    pageNumber: 1,
    foodImage: "/food/mocktail.jpg",
    foodAlt: "Handcrafted Iced Botanical Mocktail",
    heroText: "All natural fruit purees, aromatic botanical extractions & chilled bubbles.",
    callout: {
      title: "Mango Sticky Rice Mocktail",
      desc: "Velvety mango nectar, sweet pandan infusion, coconut cream swirl",
      price: "300",
      tag: "SIGNATURE SIP"
    },
    items: [
      { name: "Dune", price: "200", desc: "Still; Cranberry, Tea" },
      { name: "Mint Mojito", price: "200", desc: "Soda; Lime, Mint" },
      { name: "Japanese Moon", price: "200", desc: "Soda; Green Melon" },
      { name: "Summer Crush", price: "220", desc: "Soda; Elderflower, Cucumber" },
      { name: "Lychee Iced Tea", price: "200", desc: "Still; Lychee, Tea" },
      { name: "Pink Lagoon", price: "250", desc: "Still; Lychee, Pink Lime" }
    ],
    itemsCol2: [
      { name: "Sparkling Apple", price: "220", desc: "Soda; Red Apple" },
      { name: "Sunrise", price: "250", desc: "Fresh; Pineapple, Coconut" },
      { name: "Cherry Blossom", price: "250", desc: "Soda; Cherry Blossom, Hibiscus" },
      { name: "Green Orchid", price: "280", desc: "Fresh; Pineapple, Apple, Cucumber" },
      { name: "Evening Dew", price: "220", desc: "Soda; Cranberry, Coke" }
    ],
    footnote: "All prices are exclusive of GST. Prepared fresh to order."
  },
  {
    id: "sec-teas",
    title: "Teas & Matcha",
    category: "Matcha, Teas & Sips",
    pageNumber: 2,
    foodImage: "/food/matcha.jpg",
    foodAlt: "Fresh Stone-Ground Ceremonial Uji Matcha Bowl",
    heroText: "Stone-ground Uji ceremonial matcha & comforting artisanal milk teas.",
    callout: {
      title: "Velvet Dreams",
      desc: "Thick iced chocolate elixir crowned with decadent chocolate cake",
      price: "450",
      tag: "CHEF HIGHLIGHT"
    },
    items: [
      { name: "Matcha Latte (Hot / Iced)", price: "300", desc: "The classic whisked Matcha with velvety milk" },
      { name: "Usucha (Hot / Iced)", price: "300", desc: "Matcha with pure mountain water. The authentic tea ceremony way" },
      { name: "In the Mood for Love", price: "400", desc: "Ceremonial matcha with spiced iced ginger ale" },
      { name: "Vanilla Milk Tea", price: "250", desc: "Hong Kong style milk tea crowned with fragrant vanilla foam" }
    ],
    itemsCol2: [
      { name: "Green Tea", price: "120", desc: "Pure loose leaf infusion" },
      { name: "Masala Tea", price: "180", desc: "Fresh whole spices steeped in full-cream milk" },
      { name: "Hong Kong Milk Tea", price: "250", desc: "A hot tea-pot served with tea for two!" },
      { name: "Milo Dino", price: "300", desc: "An iced Milo volcano. Ani Approved!" },
      { name: "Nutty Praline Milkshake", price: "320", desc: "Peanut milkshake swirled with house-made crunchy toffee" },
      { name: "Hot Chocolate", price: "300", desc: "A luscious, thick hot chocolate served with cream (+50 for marshmallow)" }
    ],
    footnote: "Prices exclusive of GST. Oat milk / almond milk substitutes available."
  },
  {
    id: "sec-coffee",
    title: "Coffee",
    category: "Artisanal Coffee & Roasts",
    pageNumber: 3,
    foodImage: "/food/coffee.jpg",
    foodAlt: "Specialty Roasted Espresso and Latte",
    heroText: "Specialty beans roasted for slow mornings and unhurried dusk conversations.",
    callout: {
      title: "Piccolo Basket (Shareable)",
      desc: "4 or 6 artisanal piccolos curated in a vintage carrier to share across the table",
      price: "350 | 500",
      tag: "COURTYARD FAVORITE"
    },
    items: [
      { name: "Espresso", price: "120", desc: "A pure double shot without milk" },
      { name: "Americano", price: "150", desc: "Double shot diluted with water (Hot / Iced)" },
      { name: "Piccolo", price: "160", desc: "Small ristretto shot with silky steamed milk" },
      { name: "Cappuccino", price: "220", desc: "Velvety espresso with dense textured hot milk foam" },
      { name: "Iced Latte", price: "220", desc: "Espresso over chilled milk (+30 for Vanilla or Toffee)" },
      { name: "Classic Cold Coffee", price: "250", desc: "Signature blend spun with rich dairy ice cream" }
    ],
    itemsCol2: [
      { name: "House-Made Baileys", price: "250", desc: "Inspired by Irish whiskey cream (Non-alcoholic)" },
      { name: "5 Spice Mocha", price: "250", desc: "Dark chocolate coffee dusted with warm 5-spice blend" },
      { name: "Neat, No Ice", price: "280", desc: "Clarified slow-drip coffee with burnt caramel notes" },
      { name: "Birthday Cake", price: "300", desc: "Celebratory iced coffee with rich vanilla aroma & rainbow crunch" },
      { name: "Frosted Toffee", price: "300", desc: "Cold brew blended with buttery toffee sauce" },
      { name: "Nutella Latte", price: "300", desc: "Espresso with thick hazelnut chocolate swirl" }
    ],
    footnote: "All espresso extracted on double-walled commercial brass group-heads."
  },
  {
    id: "sec-soups",
    title: "Soups & Salads",
    category: "Soups & Crisp Greens",
    pageNumber: 4,
    foodImage: "/food/soup-salad.jpg",
    foodAlt: "Artisanal Soup and Garden Fresh Salad",
    heroText: "Slow-simmered broths paired with crusty sourdough and fresh garden salads.",
    callout: {
      title: "Add House Garlic Bread?",
      desc: "Toasted garlic baguette or focaccia to dip into hot soup bowls",
      price: "250/- onwards",
      tag: "PAIRING"
    },
    items: [
      { name: "Clear Soup (Veg)", price: "200", desc: "Clear garden broth with julienned vegetables", isVeg: true },
      { name: "Clear Soup (Chicken)", price: "230", desc: "Delicate simmered broth with tender chicken strips" },
      { name: "Mushroom Truffle Soup", price: "250", desc: "Creamy wild mushroom purée with aromatic truffle oil & breadsticks", isVeg: true },
      { name: "Creamy Chicken Soup", price: "300", desc: "Rich chicken velouté finished with extra virgin olive oil & focaccia" }
    ],
    itemsCol2: [
      { name: "Grilled Salad", price: "250", desc: "Charred lettuce, bell peppers, zucchini, broccoli, sweet corn & olives in mustard dressing, topped with feta and parm", isVeg: true },
      { name: "Chicken Caesar Salad", price: "350", desc: "Crisp romaine tossed in garlic parmesan dressing, topped with grilled chicken fillet & golden focaccia croutons" }
    ],
    footnote: "All soups prepared in-house daily without artificial thickening agents."
  },
  {
    id: "sec-starters",
    title: "To Start",
    category: "Small Plates & Starters",
    pageNumber: 5,
    foodImage: "/food/kfc.png",
    foodAlt: "Crispy Korean Fried Chicken Bites",
    extraFoodImage: "/food/shrimp.png",
    extraFoodAlt: "Garlic Butter Grilled Prawns",
    heroText: "Sharing bites, crunch bowls, spicy lacquers & street-side inspirations.",
    callout: {
      title: "Beef Kebab with Garlic Confit",
      desc: "Mutton-beef skewers served with roasted garlic confit, flatbread & garlic aioli",
      price: "400",
      isBeef: true,
      tag: "HOUSE PRIDE"
    },
    items: [
      { name: "Potato Fries (Plain Salted)", price: "170", desc: "Crisp hand-cut fries seasoned with sea salt", isVeg: true },
      { name: "Potato Fries (Peri-Peri)", price: "200", desc: "Tossed in fiery house peri-peri spice dust", isVeg: true },
      { name: "Dirty Fries (Veg / Chicken / Bacon)", price: "280 / 300 / 320", desc: "Topped with house cheddar cheese sauce & choice of crisp protein", isPork: true },
      { name: "Pan-Fried Dumplings (Veg)", price: "250", desc: "Crisp bottom dumplings served with soy chilli lacquer", isVeg: true },
      { name: "Pan-Fried Dumplings (Chicken)", price: "280", desc: "Minced herb chicken dumplings pan-seared with soy dipping sauce" },
      { name: "Garlic Bread (Plain / With Cheese)", price: "250 / 280", desc: "House-made artisanal loaf toasted with whipped garlic herb butter", isVeg: true },
      { name: "Tomato & Cheese Toasties", price: "300", desc: "Caprese-style fresh mozzarella, ripe tomatoes & sweet basil on grilled focaccia", isVeg: true }
    ],
    itemsCol2: [
      { name: "Corn Ribs", price: "190", desc: "Fried curly corn combs tossed in chilli-lime spice mix", isVeg: true },
      { name: "Jalapeño Cheese Balls", price: "300", desc: "Molten cheddar & mozzarella stuffed croquettes served with house red sauce", isVeg: true },
      { name: "Baked 4-Cheese Mushrooms", price: "320", desc: "Oven-baked portobello cups in garlic cream, served with focaccia & salad", isVeg: true },
      { name: "Chicken Bites", price: "280", desc: "Tender fried chicken nuggets served with spicy sriracha mayo" },
      { name: "Korean Fried Chicken", price: "300", desc: "Double-crunch chicken bites tossed in sweet fermented gochujang glaze" },
      { name: "Peri Peri Chicken Skewers", price: "350", desc: "Charred marinated chicken skewers served with pickled chilli peppers" },
      { name: "Pork Belly", price: "350", desc: "Thai-style slow pork belly tossed with yard-long beans and crushed peanuts", isPork: true },
      { name: "Crispy Calamari", price: "380", desc: "Golden fried squid rings served with herb tartar sauce" }
    ],
    footnote: "Exclusive of GST. Items marked with (P) contain Pork; (B) contain Beef."
  },
  {
    id: "sec-pasta",
    title: "Pasta",
    category: "Handmade Pasta & Noodles",
    pageNumber: 6,
    foodImage: "/food/pasta2.png",
    foodAlt: "Handcrafted Creamy Fettuccine Pasta",
    heroText: "Hand-rolled parcels, creamy emulsions & comforting slow-cooked sauces.",
    callout: {
      title: "Creamy Steak Fettuccine",
      desc: "Simmered mushroom cream fettuccine served with tender seared beef steak medallion",
      price: "500",
      isBeef: true,
      tag: "CHEF SPECIAL"
    },
    items: [
      { name: "White Penne Pasta", price: "Veg 280 | Chicken 380", desc: "Penne tossed in silky parmesan cream sauce with roasted garlic", isVeg: true },
      { name: "Red Penne Pasta", price: "Veg 280 | Chicken 380", desc: "Penne coated in tangy San Marzano tomato marinara and herbs", isVeg: true },
      { name: "Pink Penne Pasta", price: "Veg 320 | Chicken 400", desc: "Creamy blush tomato & mascarpone sauce with fresh basil", isVeg: true },
      { name: "Pink Ravioli (Spinach & Feta)", price: "380", desc: "Hand-made pink dough parcels filled with spinach & feta, tossed in tomato cream", isVeg: true },
      { name: "Pink Ravioli (Minced Chicken)", price: "450", desc: "Artisanal ravioli stuffed with seasoned minced chicken in rich blush cream" }
    ],
    itemsCol2: [
      { name: "Creamy Mushroom Fettuccine", price: "Veg 380 | Chicken 450", desc: "Fettuccine ribbon pasta in a slow-simmered rich creamy forest mushroom sauce", isVeg: true },
      { name: "Chicken Parm on Red Fettuccine", price: "480", desc: "Panko-crusted chicken parmigiana smothered in melted mozzarella over tangy tomato fettuccine" }
    ],
    footnote: "All pasta rolled fresh in our kitchen with imported durum semolina."
  },
  {
    id: "sec-sandwiches",
    title: "Sandwich & Rice",
    category: "Sandos, Toasties & Rice Bowls",
    pageNumber: 7,
    foodImage: "/food/sandwich.png",
    foodAlt: "Gourmet Toasted Brioche Sando",
    extraFoodImage: "/food/sandwich2.png",
    extraFoodAlt: "Crisp Double Melt Sandwich",
    heroText: "Japanese milk bread sandos, fluffy focaccias and fragrant rice curries.",
    callout: {
      title: "Beef & Cheese Sando",
      desc: "Our iconic tender beef patty & molten cheddar lacquer inside toasted Japanese milk bread",
      price: "400",
      isBeef: true,
      tag: "BESTSELLER"
    },
    items: [
      { name: "Focc Bocc Sandwich", price: "280", desc: "House focaccia sandwich with creamy bocconcini cheese, basil pesto and ripe tomatoes", isVeg: true },
      { name: "Cottage Cheese Sando", price: "320", desc: "Peri-peri marinated grilled paneer, lettuce, spicy mayo between soft milk bread", isVeg: true },
      { name: "Chicken Focc Sandwich", price: "300", desc: "Toasted focaccia loaded with spicy peri-peri chicken breast & herb cream" },
      { name: "Korean Fried Chicken Sando", price: "350", desc: "Crispy gochujang glazed chicken, molten cheese sauce, shredded lettuce on milk bread" },
      { name: "Roasted Chicken & Bacon Sando", price: "380", desc: "Pulled roasted chicken, garlic mayo, crisp streaky bacon & charred tomatoes", isPork: true }
    ],
    itemsCol2: [
      { name: "Thai Green Curry Bowl", price: "Veg 350 | Chicken 400", desc: "Fragrant coconut-lemongrass broth served with steamed jasmine rice bowl", isVeg: true },
      { name: "Fried Rice with Veggie Stir-Fry", price: "350", desc: "Wok-tossed garlic fried rice accompanied by a Chinese vegetable stir-fry", isVeg: true },
      { name: "Fried Rice with KFC", price: "400", desc: "Savory fried rice served with Korean fried chicken tenders and chilli sauce" },
      { name: "Chilli Pork Curry Bowl", price: "420", desc: "Tender sliced pork belly in a spicy aromatic broth served with jasmine rice", isPork: true }
    ],
    footnote: "Bread loaves baked daily in our morning oven."
  },
  {
    id: "sec-mains",
    title: "Big Plates & Pizza",
    category: "Mains & Wood-Style Pizzas",
    pageNumber: 8,
    foodImage: "/food/pizza.png",
    foodAlt: "Woodfired Thin Crust Pizza with Bocconcini Mozzarella",
    extraFoodImage: "/food/steak.png",
    extraFoodAlt: "Charred Tender Beef Steak with Pepper Sauce",
    heroText: "Hearty dinner mains and artisanal thin-crust pizzas (Pizzas available from 6 PM to 10 PM).",
    callout: {
      title: "PIZZAS AVAILABLE 6PM - 10PM",
      desc: "Fermented slow dough, Italian bocconcini cheese & blistered thin crust.",
      price: "From ₹400",
      tag: "EVENING EDIT"
    },
    items: [
      { name: "Eggplant Parmigiana", price: "400", desc: "Layers of roasted eggplant, slow-simmered tomato sugo, basil and melted mozzarella", isVeg: true },
      { name: "Chicken Piccata", price: "450", desc: "Flour-dredged chicken cutlet in a zesty lemon-caper reduction, served with mashed potato & grilled veggies" },
      { name: "Beef Steak", price: "500", desc: "Charred beef steak medallion with black peppercorn sauce, butter potato mash & grilled veggies", isBeef: true }
    ],
    itemsCol2: [
      { name: "Margarita Pizza", price: "400", desc: "San Marzano tomato base, fresh bocconcini mozzarella, sweet basil", isVeg: true },
      { name: "Four Cheese Pizza", price: "500", desc: "Tomato base, bocconcini, mozzarella, yellow cheddar & mascarpone", isVeg: true },
      { name: "Farmhouse Pizza", price: "450", desc: "Zucchini, bell peppers, sweet corn, onion, olives & pickled jalapeño", isVeg: true },
      { name: "Corny Jalapeño Pizza", price: "480", desc: "Bocconcini, grilled pineapple, sweet corn & fiery jalapeños", isVeg: true },
      { name: "Mediterranean Garden", price: "500", desc: "Artichokes, roasted eggplant, zucchini & melted bocconcini", isVeg: true },
      { name: "Polo Pizza", price: "450", desc: "Bocconcini, chicken salami, grilled chicken breast & chicken sausage" },
      { name: "May 1 Pizza", price: "450", desc: "Peri-peri chicken, sweet pineapple, chilli oil & blossom honey" },
      { name: "Gochujang Chicken Pizza", price: "500", desc: "Gochujang marinated chicken, forest mushrooms, chilli drizzle" },
      { name: "Pepperoni Pizza", price: "500", desc: "Rich tomato base, bocconcini mozzarella, crispy pork pepperoni", isPork: true },
      { name: "Chimichurri Steak Pizza", price: "550", desc: "Sliced steak fillet, bell peppers, fresh herbal chimichurri lacquer", isBeef: true }
    ],
    footnote: "Pizza dough cold-fermented for 48 hours for blistered airy edges."
  },
  {
    id: "sec-desserts",
    title: "Sweet Endings",
    category: "Desserts & Delicacies",
    pageNumber: 9,
    foodImage: "/food/cheesecake.png",
    foodAlt: "Molten Burnt Basque Cheesecake",
    heroText: "Warm custard cakes, traditional treats & delicate European pastries.",
    callout: {
      title: "Sticky Toffee Pudding Cake",
      desc: "Warm date sponge drenched in rich buttery toffee sauce with vanilla ice cream",
      price: "350",
      tag: "COURTYARD CLASSIC"
    },
    items: [
      { name: "Stuffed Berliner Donut", price: "100 / 120", desc: "Puffy golden brioche doughnut filled with White Chocolate or Hot Chocolate & Marshmallow" },
      { name: "Pandan Payasam", price: "250", desc: "Velvety coconut payasam scented with house-made aromatic pandan jelly gems" },
      { name: "Brioche French Toast", price: "320", desc: "Custard-seared sweet brioche loaf topped with seasonal fresh fruits & cream" },
      { name: "Fig Cheesecake", price: "250", desc: "Silky baked vanilla cheesecake topped with artisanal spiced fig jam compote" }
    ],
    itemsCol2: [
      { name: "Caramel Pudding", price: "200", desc: "Melt-in-mouth egg custard bathed in amber caramelized sugar syrup" },
      { name: "Chocolate Cake", price: "320", desc: "Rich moist sponge layered with silky chocolate mousse cream" },
      { name: "Classic Tiramisu", price: "320", desc: "Espresso-soaked ladyfingers folded into whipped mascarpone cheese cream" }
    ],
    footnote: "All desserts crafted in our daily bakehouse in limited batches."
  }
];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-mocktails");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle scroll position to update active pill
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerTop = container.scrollTop;

    for (let i = MENU_PAGES_DATA.length - 1; i >= 0; i--) {
      const sec = MENU_PAGES_DATA[i];
      const el = document.getElementById(sec.id);
      if (el) {
        const offsetTop = el.offsetTop - container.offsetTop - 140;
        if (containerTop >= offsetTop) {
          setActiveSectionId(sec.id);
          break;
        }
      }
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (el && container) {
      const top = el.offsetTop - container.offsetTop - 110;
      container.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#f8f7f3] text-[#111111] border-4 border-[#111111] w-full max-w-6xl h-[92vh] flex flex-col shadow-[16px_16px_0px_rgba(0,0,0,1)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP EDITORIAL MASTHEAD BAR (Sticky) */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b-2 border-[#111111] bg-white">
          <div className="flex items-center gap-4">
            <div className="border border-black px-2.5 py-1 font-mono-code text-[11px] font-black tracking-widest bg-black text-white">
              BUNS N’ ROSES
            </div>
            <div>
              <span className="font-mono-code text-[10px] text-neutral-500 uppercase tracking-widest block">
                AUTHENTIC EDITORIAL MENU · 2025
              </span>
              <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold leading-none mt-0.5">
                The Café Menu
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block font-mono-code text-xs text-neutral-500 mr-2">
              SCROLL THROUGH ALL SECTIONS ↓
            </span>
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 border-2 border-black flex items-center justify-center font-mono-code font-bold text-lg bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
              aria-label="Close menu modal"
            >
              ✕
            </button>
          </div>
        </header>

        {/* STICKY CATEGORY NAV PILLS (Jump directly or scroll freely) */}
        <nav
          className="sticky top-[69px] z-20 flex items-center gap-2 px-6 py-3 bg-[#f0ede6]/95 backdrop-blur-md border-b-2 border-black overflow-x-auto no-scrollbar font-mono-code text-[10px] uppercase tracking-wider shadow-sm"
          aria-label="Menu Categories"
        >
          {MENU_PAGES_DATA.map((sec, idx) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 border-2 transition-all cursor-pointer ${
                activeSectionId === sec.id
                  ? "bg-black text-white border-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.3)] scale-[1.02]"
                  : "bg-white text-neutral-800 border-black/40 hover:border-black hover:bg-neutral-100"
              }`}
            >
              <span className="opacity-50 mr-1.5">0{idx + 1}</span>
              <span>{sec.title}</span>
            </button>
          ))}
        </nav>

        {/* CONTINUOUS SCROLLABLE MENU BODY */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto scroll-smooth p-4 sm:p-8 bg-[#f8f7f3] space-y-16"
        >
          {MENU_PAGES_DATA.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="max-w-5xl mx-auto flex flex-col gap-6 pt-2 scroll-mt-24"
            >
              {/* Category Banner & Authentic Food Photograph Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 border-2 border-black bg-white overflow-hidden shadow-[8px_8px_0px_rgba(17,17,17,1)]">
                {/* 100% Real Food Photograph */}
                <div className="lg:col-span-5 relative h-64 lg:h-auto border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-neutral-900 overflow-hidden group">
                  <img
                    src={section.foodImage}
                    alt={section.foodAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white font-mono-code text-[10px]">
                    <span className="bg-black/90 px-2.5 py-1 border border-white/30 uppercase tracking-widest font-bold">
                      SECTION 0{section.pageNumber} · {section.category}
                    </span>
                  </div>
                </div>

                {/* Section Introduction & Headline */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-black/20 pb-3 mb-4">
                      <span className="font-mono-code text-[11px] font-bold tracking-widest text-neutral-500 uppercase">
                        PAGE 0{section.pageNumber} OF 09
                      </span>
                      <span className="font-mono-code text-[11px] font-semibold bg-neutral-100 border border-black/30 px-2 py-0.5">
                        SEMBAKKAM · CHENNAI
                      </span>
                    </div>

                    <h2 className="font-editorial-serif text-4xl sm:text-5xl font-black uppercase tracking-tight text-black mb-3">
                      {section.title}
                    </h2>
                    <p className="font-classical-serif text-lg text-neutral-700 italic leading-snug max-w-lg mb-6">
                      “{section.heroText}”
                    </p>
                  </div>

                  {/* Highlight Callout Box if any */}
                  {section.callout && (
                    <div className="border-2 border-black p-4 bg-[#fbf9f4] shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex justify-between items-center gap-4">
                      <div>
                        {section.callout.tag && (
                          <span className="font-mono-code text-[9px] bg-black text-white px-1.5 py-0.5 uppercase tracking-widest block w-fit mb-1 font-bold">
                            {section.callout.tag}
                          </span>
                        )}
                        <h4 className="font-editorial-serif text-lg font-bold">
                          {section.callout.title}
                        </h4>
                        <p className="font-mono-code text-[11px] text-neutral-600">
                          {section.callout.desc}
                        </p>
                      </div>
                      <div className="font-mono-code text-xl font-black text-black shrink-0 border-l-2 border-black/20 pl-4">
                        ₹{section.callout.price}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Real Food Spotlight Card (if section has multiple food shots) */}
              {section.extraFoodImage && (
                <div className="border-2 border-black bg-white p-4 flex flex-col sm:flex-row items-center gap-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <div className="w-24 h-24 shrink-0 border border-black overflow-hidden bg-neutral-100">
                    <img
                      src={section.extraFoodImage}
                      alt={section.extraFoodAlt || "Featured dish"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-mono-code text-[10px] uppercase font-bold text-neutral-500">
                      KITCHEN SIGNATURE DISH
                    </span>
                    <h4 className="font-editorial-serif text-lg font-bold">
                      {section.extraFoodAlt}
                    </h4>
                    <p className="font-mono-code text-xs text-neutral-600">
                      Crafted fresh to order in our open kitchen. Ask your table server for pairing recommendations.
                    </p>
                  </div>
                  <div className="font-mono-code text-xs font-bold border border-black px-3 py-1 bg-[#f0ede6]">
                    FRESHLY PLATED
                  </div>
                </div>
              )}

              {/* 2-COLUMN EMBEDDED EDITORIAL DISHES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-white border-2 border-black p-6 sm:p-10 shadow-[8px_8px_0px_rgba(17,17,17,1)]">
                {/* Column 1 */}
                <div className="space-y-6">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="group border-b border-black/15 pb-4 last:border-none transition-all hover:pl-1.5"
                    >
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="flex items-center gap-2">
                          {item.isVeg && (
                            <span className="w-3.5 h-3.5 border border-green-700 flex items-center justify-center shrink-0" title="Vegetarian">
                              <span className="w-1.5 h-1.5 bg-green-700 rounded-full" />
                            </span>
                          )}
                          {item.isPork && (
                            <span className="font-mono-code text-[9px] text-purple-700 font-bold border border-purple-400 px-1" title="Contains Pork">
                              P
                            </span>
                          )}
                          {item.isBeef && (
                            <span className="font-mono-code text-[9px] text-red-700 font-bold border border-red-400 px-1" title="Contains Beef">
                              B
                            </span>
                          )}
                          <h4 className="font-editorial-serif text-lg font-bold text-neutral-900 group-hover:text-black">
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-mono-code text-base font-black text-black shrink-0">
                          {item.price.startsWith("₹") || item.price.includes("Veg") ? item.price : `₹${item.price}`}
                        </span>
                      </div>
                      {item.desc && (
                        <p className="font-mono-code text-xs text-neutral-600 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {(section.itemsCol2 || []).map((item, i) => (
                    <div
                      key={i}
                      className="group border-b border-black/15 pb-4 last:border-none transition-all hover:pl-1.5"
                    >
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="flex items-center gap-2">
                          {item.isVeg && (
                            <span className="w-3.5 h-3.5 border border-green-700 flex items-center justify-center shrink-0" title="Vegetarian">
                              <span className="w-1.5 h-1.5 bg-green-700 rounded-full" />
                            </span>
                          )}
                          {item.isPork && (
                            <span className="font-mono-code text-[9px] text-purple-700 font-bold border border-purple-400 px-1" title="Contains Pork">
                              P
                            </span>
                          )}
                          {item.isBeef && (
                            <span className="font-mono-code text-[9px] text-red-700 font-bold border border-red-400 px-1" title="Contains Beef">
                              B
                            </span>
                          )}
                          <h4 className="font-editorial-serif text-lg font-bold text-neutral-900 group-hover:text-black">
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-mono-code text-base font-black text-black shrink-0">
                          {item.price.startsWith("₹") || item.price.includes("Veg") ? item.price : `₹${item.price}`}
                        </span>
                      </div>
                      {item.desc && (
                        <p className="font-mono-code text-xs text-neutral-600 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footnote Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono-code text-[11px] text-neutral-600 border-t-2 border-black pt-3 pb-6">
                <div>
                  <span className="font-bold text-black">NOTE:</span> {section.footnote}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 border border-green-700 flex items-center justify-center"><span className="w-1 h-1 bg-green-700 rounded-full" /></span>
                    Veg
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-purple-700">
                    [P] Pork
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-red-700">
                    [B] Beef
                  </span>
                </div>
              </div>
            </section>
          ))}

          {/* END OF MENU SIGN-OFF & BACK TO TOP BUTTON */}
          <div className="max-w-5xl mx-auto border-2 border-black bg-white p-8 text-center shadow-[8px_8px_0px_rgba(0,0,0,1)] my-8">
            <h3 className="font-editorial-serif text-3xl font-black mb-2">END OF EDITORIAL MENU</h3>
            <p className="font-mono-code text-xs text-neutral-600 max-w-md mx-auto mb-6">
              BUNS N’ ROSES · SEMBAKKAM, CHENNAI · FOR RESERVATIONS & SPECIAL CANDLELIGHT DINNERS CALL 8778479045
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="font-mono-code text-xs font-bold uppercase px-6 py-2.5 bg-black text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
              >
                ↑ BACK TO TOP OF MENU
              </button>
              <button
                type="button"
                onClick={onClose}
                className="font-mono-code text-xs font-bold uppercase px-6 py-2.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              >
                CLOSE MENU [✕]
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM STICKY FLOATING CONTROL BAR */}
        <footer className="px-6 py-3 bg-white border-t-2 border-black flex items-center justify-between z-30">
          <div className="font-mono-code text-xs text-neutral-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span className="font-bold text-black uppercase">CONTINUOUS MENU VIEW</span>
            <span className="hidden sm:inline text-neutral-500">· 9 CATEGORIES · TAP ANY TOP TAB TO JUMP</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              className="font-mono-code text-xs font-bold uppercase px-3 py-1.5 border border-black hover:bg-black hover:text-white transition-all cursor-pointer"
            >
              TOP ↑
            </button>
            <button
              type="button"
              onClick={onClose}
              className="font-mono-code text-xs font-bold uppercase px-4 py-1.5 bg-black text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.4)]"
            >
              CLOSE
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
