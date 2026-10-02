import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusCommunity from "@/assets/focus-community.jpg";
import focusJournalism from "@/assets/focus-journalism.jpg";
import focusData from "@/assets/focus-data.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import { Camera, MapPin, Calendar } from "lucide-react";

const GALLERIES = [
  {
    title: "Community Journalism Fellowship — Cohort 3 Graduation",
    location: "Abuja, Nigeria",
    date: "November 2024",
    count: 24,
    cover: focusCommunity,
  },
  {
    title: "Dialogue & Policy Series — Health Sector Forum",
    location: "Lagos, Nigeria",
    date: "October 2024",
    count: 18,
    cover: focusData,
  },
  {
    title: "Youth Digital Leadership Summit 2024",
    location: "Kano, Nigeria",
    date: "September 2024",
    count: 31,
    cover: focusCommunity,
  },
  {
    title: "MADE-F Annual Conference 2024",
    location: "Abuja, Nigeria",
    date: "August 2024",
    count: 47,
    cover: focusMedia,
  },
  {
    title: "Gender & Social Inclusion Campaign — Kogi State",
    location: "Lokoja, Nigeria",
    date: "July 2024",
    count: 22,
    cover: focusCommunity,
  },
  {
    title: "JAC Academic-Industry Roundtable",
    location: "Ibadan, Nigeria",
    date: "June 2024",
    count: 15,
    cover: focusJournalism,
  },
];

const HIGHLIGHTS = [
  focusCommunity,
  focusJournalism,
  focusData,
  focusMedia,
  focusCommunity,
  focusJournalism,
  focusData,
  focusMedia,
];

const PhotoNews = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusCommunity})` }} />
      <div className="container mx-auto text-center relative">
        <span className="section-tag mb-6 inline-block">Newsroom</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
          Photo <em className="text-italic-accent">News</em>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
          A visual record of MADE-F's programmes, events and community engagements across Nigeria.
        </p>
      </div>
    </section>

    {/* Highlight grid */}
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="section-tag">Gallery</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-4">Latest <em className="text-italic-accent">Moments</em></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HIGHLIGHTS.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2 h-80" : "h-36"} group cursor-pointer`}
            >
              <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center">
                <Camera size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Event galleries */}
    <section className="py-16 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="section-tag">Events</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-4">Event <em className="text-italic-accent">Galleries</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERIES.map((gallery) => (
            <div key={gallery.title} className="bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={gallery.cover} alt={gallery.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/40 flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full px-3 py-1.5 font-body">
                    <Camera size={12} /> {gallery.count} photos
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-foreground leading-snug mb-3">{gallery.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><MapPin size={11} />{gallery.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{gallery.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default PhotoNews;
