import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  ArrowUpRight,
  ArrowRight,
  Leaf,
  Truck,
  ShieldCheck,
  Heart,
  Star,
  Plus,
  Minus,
  Phone,
  MapPin,
  ChevronRight,
  Snowflake,
} from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Header from "../../globalComponents/header";
import { Footer } from "antd/es/layout/layout";
import sweetbitwithme from "../../assets/My_img_with_Gur/Festive Kurta Sweet Bite.png";
import BannerImage from "../../assets/Banner/Khejurer gach village vibe.png";
import ঝোলাগুড় from "../../assets/Gurer_Img/Date palm jaggery01.png";
import পাটালিগুড় from "../../assets/Gurer_Img/Date palm jaggery02.png";
import দানাদারগুড় from "../../assets/Gurer_Img/Date palm jaggery03.png";
import villageVibewithme from "../../assets/My_img_with_Gur/Village Vibes and Sweet Moments.png";
const products = [
  {
    id: 1,
    name: "খাঁটি ঝোলা খেজুরের গুড়",
    englishName: "Liquid Date Palm Jaggery",
    price: 280,
    unit: "৫০০ গ্রাম",
    tag: "জনপ্রিয়",
    image: ঝোলাগুড়,
    description: "মিষ্টি ঘ্রাণ ও ঐতিহ্যবাহী স্বাদের ঝোলা গুড়।",
  },
  {
    id: 2,
    name: "খেজুরের পাটালি গুড়",
    englishName: "Patali Date Palm Jaggery",
    price: 350,
    unit: "১ কেজি",
    tag: "ঐতিহ্যের স্বাদ",
    image: পাটালিগুড়,
    description: "শীতের পিঠাপুলির জন্য মানানসই পাটালি গুড়।",
  },
  {
    id: 3,
    name: "দানাদার খেজুরের গুড়",
    englishName: "Granular Jaggery",
    price: 320,
    unit: "১ কেজি",
    tag: "বিশেষ সংগ্রহ",
    image: দানাদারগুড়,
    description: "পায়েস, পিঠা ও মিষ্টান্ন তৈরিতে ব্যবহারযোগ্য।",
  },
];

const categories = [
  {
    title: "ঝোলা গুড়",
    subtitle: "Liquid Jaggery",
    image: ঝোলাগুড়,
  },
  {
    title: "পাটালি গুড়",
    subtitle: "Patali Jaggery",
    image: পাটালিগুড়,
  },
  {
    title: "দানাদার গুড়",
    subtitle: "Granular Jaggery",
    image: দানাদারগুড়,
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl px-1 text-center sm:mb-12">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9c5a0] bg-[#f5eddf] px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#876037]">
        <Leaf size={14} />
        {eyebrow}
      </span>
      <h2 className="font-bengali text-2xl font-bold leading-snug text-[#422c1d] min-[380px]:text-3xl sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#786958] sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState("");

  const addToCart = (product) => {
    setCart((previous) => [...previous, product]);
    setNotice(`${product.name} কার্টে যোগ হয়েছে`);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  const goToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#fffaf1] text-[#422c1d]">
      {/* Announcement bar */}
      <div className="bg-[#29432d] px-4 py-2.5 text-center text-xs text-[#f8ead0] sm:text-sm">
        <span className="mr-2 inline-block">❄</span>
        শীতের ঐতিহ্য, বাংলার খাঁটি স্বাদ
        <span className="mx-2 text-[#d6ac60]">•</span>
        ঘরে বসেই অর্ডার করুন
      </div>

      {/* Header */}
      <Header
        cart={cart}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goToProducts={goToProducts}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[560px] items-center  bg-[#263c2b] sm:min-h-[650px] lg:min-h-[700px]">
        <img
          src={BannerImage}
          alt="সবুজ প্রকৃতি ও কুয়াশাময় বন"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#172c20]/95 via-[#1e3425]/80 to-[#1e3425]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1d3022]/50 via-transparent to-[#1d3022]/10" />
        <div className="pointer-events-none absolute inset-0 -z-5 bg-gradient-to-b from-black/25 via-black/12 to-black/6 blur-[4px]" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10 lg:py-20">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-[11px] font-medium text-[#f8e7c4] backdrop-blur-sm sm:mb-7 sm:px-4 sm:py-2.5 sm:text-sm">
              <Snowflake size={15} />
              শীতের সকাল • বাংলার ঐতিহ্য
            </div>

            <p className="mb-3 font-bengali text-lg text-[#e5c48b] sm:text-xl">
              মাটির ঘ্রাণে, শীতের পরশে
            </p>

            <h2 className="font-bengali text-4xl font-extrabold leading-[1.2] tracking-tight min-[380px]:text-5xl sm:text-6xl md:text-7xl">
              বাংলার শীত,
              <br />
              <span className="text-[#e8bd70]">গুড়ের মিষ্টি</span>
              <br />
              ঐতিহ্য।
            </h2>

            <p className="mt-5 max-w-lg font-bengali text-sm leading-7 text-white/80 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              খেজুরের রসের চিরচেনা ঘ্রাণ আর গ্রামবাংলার স্মৃতি—আপনার পরিবারের
              জন্য নিয়ে আসুন শীতের প্রিয় স্বাদ।
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row sm:mt-9">
              <button
                onClick={goToProducts}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#e4b86b] px-6 py-3.5 font-bengali text-sm font-bold text-[#392617] transition hover:bg-[#f0ca89] min-[420px]:w-auto sm:px-7 sm:py-4"
              >
                গুড় কিনুন
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </button>
              <a
                href="#story"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-bengali text-sm font-semibold text-white transition hover:bg-white/10 min-[420px]:w-auto sm:px-7 sm:py-4"
              >
                আমাদের গল্প
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/20 pt-5 sm:mt-12 sm:gap-x-7 sm:pt-7">
              <div className="flex items-center gap-2 text-sm text-white/85">
                <Leaf className="text-[#e8bd70]" size={19} />
                দেশি ঐতিহ্য
              </div>
              <div className="flex items-center gap-2 text-sm text-white/85">
                <Heart className="text-[#e8bd70]" size={19} />
                যত্নে বাছাই
              </div>
              <div className="flex items-center gap-2 text-sm text-white/85">
                <Truck className="text-[#e8bd70]" size={19} />
                হোম ডেলিভারি
              </div>
            </div>
          </div>

          {/* Decorative product card */}
          <div className="relative mx-auto w-full max-w-md max-h-[320px] md:max-h-[480px]">
            <div className="absolute -left-6 -top-7 h-24 w-24 rounded-full border border-[#e4b86b]/50 md:-left-8 md:-top-10 md:h-32 md:w-32" />
            <div className="absolute -bottom-6 -right-5 h-36 w-36 rounded-full border border-white/25 md:-bottom-8 md:-right-8 md:h-48 md:w-48" />

            <div className="relative overflow-hidden rounded-[220px_220px_24px_24px] border border-white/30 bg-[#e8d5ae]/20 p-3 shadow-2xl backdrop-blur-sm md:rounded-[280px_280px_32px_32px] md:p-4">
              <img
                src={sweetbitwithme}
                alt="মিষ্টি ও গুড়ের অনুপ্রেরণায় সাজানো খাবার"
                className="relative z-10 h-[280px] w-full object-cover md:h-[480px] rounded-[210px_210px_18px_18px]"
              />
              <div className="pointer-events-none absolute inset-0 z-20 rounded-[210px_210px_18px_18px] bg-gradient-to-b from-black/25 via-black/15 to-black/8 blur-[4px]" />

              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/50 bg-[#fffaf1]/95 p-4 shadow-xl backdrop-blur-md md:inset-x-8 md:bottom-8 md:rounded-2xl md:p-5">
                <p className="font-bengali text-xs font-bold text-[#99713d] sm:text-sm">
                  শীতের বিশেষ সংগ্রহ
                </p>
                <h3 className="mt-1 font-bengali text-xl font-extrabold text-[#422c1d] sm:text-2xl">
                  খেজুরের গুড়
                </h3>
                <p className="mt-1 text-xs text-[#786958] sm:text-sm">
                  A little sweetness of Bengal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-[#fffaf1] to-transparent" />
      </section>

      {/* Trust strip */}
      <section className="relative z-10 -mt-1 bg-[#fffaf1] py-7 sm:py-9">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-4 sm:gap-6 sm:px-6 md:px-8 sm:grid-cols-4 lg:px-10">
          {[
            {
              icon: Leaf,
              title: "দেশি ঐতিহ্য",
              subtitle: "বাংলার পরিচিত স্বাদ",
            },
            {
              icon: ShieldCheck,
              title: "যত্নে বাছাই",
              subtitle: "পণ্যের মানকে গুরুত্ব",
            },
            {
              icon: Heart,
              title: "ভালোবাসার উপহার",
              subtitle: "পরিবারের জন্য",
            },
            {
              icon: Truck,
              title: "ডেলিভারি সুবিধা",
              subtitle: "অর্ডার অনুযায়ী",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9e0ce] text-[#426044]">
                <item.icon size={21} strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-bengali text-sm font-bold text-[#422c1d] sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] text-[#8c7c68] sm:text-xs">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="আমাদের সংগ্রহ"
            title="আপনার পছন্দের গুড়"
            description="গ্রামবাংলার শীতের স্বাদ থেকে বেছে নিন আপনার পছন্দের ধরন।"
          />

          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {categories.map((category, index) => (
              <button
                key={category.title}
                onClick={goToProducts}
                className="group relative h-[280px] overflow-hidden rounded-2xl text-left min-[420px]:h-[320px] sm:h-[400px] sm:rounded-[24px]"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#251a10]/90 via-[#251a10]/10 to-transparent" />
                <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/15 text-sm text-white backdrop-blur-md">
                  0{index + 1}
                </span>
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                  <div>
                    <h3 className="font-bengali text-3xl font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-xs tracking-wider text-white/70">
                      {category.subtitle}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4b86b] text-[#392617] transition group-hover:rotate-[-45deg]">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section id="story" className="bg-[#eae2d1]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-20 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[28px] border border-[#b89b6a]" />
            <img
              src={villageVibewithme}
              alt="প্রাকৃতিক সবুজ বন ও গ্রামের পরিবেশ"
              className="relative z-10 h-[280px] w-full rounded-2xl object-cover min-[420px]:h-[340px] sm:h-[440px] sm:rounded-[24px] lg:h-[540px]"
            />
            <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/20 via-black/10 to-transparent blur-[4px]" />
            <div className="absolute -bottom-5 right-4 rounded-2xl bg-[#29432d] px-6 py-5 text-white shadow-xl sm:right-8">
              <p className="font-bengali text-xl font-bold">বাংলার ঐতিহ্য</p>
              <p className="mt-1 text-xs text-white/70">
                Rooted in our culture
              </p>
            </div>
          </div>

          <div className="pt-5 lg:pt-0">
            <span className="mb-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#8a6634]">
              <span className="h-px w-8 bg-[#a27b41]" />
              আমাদের গল্প
            </span>
            <h2 className="font-bengali text-3xl font-extrabold leading-tight text-[#422c1d] min-[380px]:text-4xl sm:text-5xl">
              একটুখানি শীত,
              <br />
              এক চামচ <span className="text-[#9c692b]">নস্টালজিয়া।</span>
            </h2>
            <p className="mt-6 font-bengali text-base leading-8 text-[#6d5a47]">
              শীতের সকালে গাছের ডালে ঝুলে থাকা মাটির হাঁড়ি, শিশিরভেজা মাঠ আর
              টাটকা খেজুরের রস—এসব শুধু স্মৃতি নয়, আমাদের সংস্কৃতির অংশ।
            </p>
            <p className="mt-4 font-bengali text-base leading-8 text-[#6d5a47]">
              গুড়ের হাটের লক্ষ্য হলো খেজুরের গুড়ের এই চিরচেনা ঐতিহ্যকে আপনার
              ঘরে পৌঁছে দেওয়া। আমরা চাই, প্রতিটি অর্ডারের সঙ্গে আপনি বাংলার
              শীতের একটু মিষ্টি অনুভূতিও পান।
            </p>
            <a
              href="#products"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#29432d] px-7 py-4 font-bengali text-sm font-semibold text-white transition hover:bg-[#1f3523]"
            >
              আমাদের গুড় দেখুন <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="শীতের বিশেষ"
            title="মিষ্টি হোক প্রতিটি মুহূর্ত"
            description="আপনার পছন্দের গুড় বেছে নিন। পণ্যের দাম ও বিবরণ পরে তোমার প্রকৃত পণ্যের তথ্য অনুযায়ী পরিবর্তন করতে পারবে।"
          />

          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[24px] border border-[#e8ddca] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6e4a22]/10"
              >
                <div className="relative h-[220px] overflow-hidden bg-[#f2e8d6] min-[420px]:h-[260px] sm:h-[280px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-[#fffaf1]/95 px-3 py-2 font-bengali text-xs font-bold text-[#6c4a27]">
                    {product.tag}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`${product.name} কার্টে যোগ করুন`}
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#29432d] text-white shadow-lg transition hover:bg-[#a16c27]"
                  >
                    <Plus size={21} />
                  </button>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-2 flex items-center gap-1 text-[#b88b45]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} fill="currentColor" />
                    ))}
                    <span className="ml-1 text-[10px] text-[#958675]">
                      নতুন সংগ্রহ
                    </span>
                  </div>

                  <h3 className="font-bengali text-xl font-bold text-[#422c1d]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#a18c74]">
                    {product.englishName}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#887766]">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#eee4d5] pt-5">
                    <div>
                      <span className="text-2xl font-extrabold text-[#29432d]">
                        ৳{product.price}
                      </span>
                      <span className="ml-2 text-xs text-[#998875]">
                        / {product.unit}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="font-bengali text-sm font-bold text-[#8b5c26] hover:text-[#29432d]"
                    >
                      কার্টে যোগ করুন
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-xs leading-6 text-[#988773]">
            দ্রষ্টব্য: এখানে দেখানো পণ্যের ছবি ও দাম ডেমো হিসেবে দেওয়া। বিক্রির
            আগে সঠিক ছবি, ওজন ও দাম বসিয়ে নিও।
          </p>
        </div>
      </section>

      {/* Editorial banner */}
      <section className="relative isolate overflow-hidden bg-[#29432d]">
        <img
          src={BannerImage}
          alt="প্রাকৃতিক সবুজ বন"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#203724]/85" />
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-20 md:px-8 md:py-28">
          <p className="font-bengali text-sm font-semibold tracking-widest text-[#e4b86b]">
            শীতের মিষ্টি আমন্ত্রণ
          </p>
          <h2 className="mt-5 max-w-3xl font-bengali text-3xl font-extrabold leading-tight text-white min-[380px]:text-4xl sm:text-5xl md:text-6xl">
            পিঠাপুলির আয়োজনে
            <br />
            <span className="text-[#e4b86b]">খেজুরের গুড় চাই।</span>
          </h2>
          <p className="mt-5 max-w-xl font-bengali text-sm leading-7 text-white/75 sm:text-base">
            পরিবারের সঙ্গে ভাগ করে নিন বাংলার চিরচেনা শীতের স্বাদ।
          </p>
          <button
            onClick={goToProducts}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#e4b86b] px-8 py-4 font-bengali text-sm font-bold text-[#392617] transition hover:bg-[#f1ce91]"
          >
            পছন্দের গুড় বেছে নিন <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* Cart demo */}
      <section
        id="cart"
        className="px-4 py-14 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#e6d8c2] bg-white p-4 sm:rounded-[28px] sm:p-6 md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#9b713c]">
                YOUR SELECTION
              </p>
              <h2 className="mt-2 font-bengali text-3xl font-extrabold">
                তোমার শপিং ব্যাগ
              </h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9e0ce] text-[#29432d]">
              <ShoppingBag size={24} />
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="mt-7 rounded-2xl bg-[#f8f3e9] px-5 py-10 text-center">
              <ShoppingBag className="mx-auto mb-4 text-[#9b713c]" size={32} />
              <p className="font-bengali text-base font-semibold">
                তোমার ব্যাগ এখনো খালি।
              </p>
              <p className="mt-2 text-sm text-[#8b7967]">
                পছন্দের গুড় যোগ করে অর্ডার শুরু করো।
              </p>
              <button
                onClick={goToProducts}
                className="mt-5 rounded-full bg-[#29432d] px-6 py-3 font-bengali text-sm font-semibold text-white"
              >
                গুড় দেখুন
              </button>
            </div>
          ) : (
            <div className="mt-7">
              <div className="space-y-3">
                {cart.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f8f3e9] p-3 min-[420px]:p-4"
                  >
                    <div>
                      <p className="font-bengali text-sm font-bold">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-[#8b7967]">
                        {product.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">৳{product.price}</span>
                      <button
                        onClick={() =>
                          setCart((previous) =>
                            previous.filter((_, i) => i !== index),
                          )
                        }
                        aria-label="পণ্য সরান"
                        className="rounded-full p-2 text-[#956b4a] hover:bg-[#eee2ce]"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#e6d8c2] pt-6">
                <span className="font-bengali font-semibold">মোট</span>
                <span className="text-2xl font-extrabold text-[#29432d]">
                  ৳{total}
                </span>
              </div>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম, গুড়ের হাট থেকে অর্ডার করতে চাই:\n${cart
                    .map(
                      (product) =>
                        `${product.name} (${product.unit}) — ৳${product.price}`,
                    )
                    .join("\n")}\nমোট: ৳${total}\nআমার ঠিকানা: `,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#29432d] px-6 py-4 font-bengali text-sm font-bold text-white transition hover:bg-[#1f3523]"
              >
                WhatsApp-এ অর্ডার করুন <ArrowRight size={17} />
              </a>
              <p className="mt-3 text-center text-xs leading-6 text-[#8b7967]">
                এটি একটি ডেমো কার্ট। WhatsApp অর্ডার চালু করার আগে নিজের ব্যবসার
                WhatsApp নম্বর যোগ করতে হবে।
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Toast */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] flex max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-full bg-[#29432d] px-5 py-3 text-sm text-white shadow-2xl"
        >
          <ShoppingBag size={17} className="text-[#e4b86b]" />
          {notice}
        </div>
      )}
      </div>
  );
}

export default Home;
