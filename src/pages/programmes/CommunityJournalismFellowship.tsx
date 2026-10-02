import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusCommunity from "@/assets/focus-community.jpg";
import focusJournalism from "@/assets/focus-journalism.jpg";
import { ArrowRight, Users, BookOpen, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: Users, title: "Cohort-Based Learning", desc: "Fellows learn together in structured cohorts, building a lifelong peer network of community journalists." },
  { icon: BookOpen, title: "Hands-On Training", desc: "Practical field assignments, story pitching workshops, and mentorship from seasoned journalists." },
  { icon: Award, title: "Certification", desc: "Graduates receive a MADE-F Community Journalism Fellowship certificate recognised by partner institutions." },
  { icon: Calendar, title: "6-Month Programme", desc: "An intensive six-month fellowship combining residential sessions with community immersion." },
];

const CommunityJournalismFellowship = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusCommunity})` }} />
      <div className="container mx-auto text-center relative">
        <span className="section-tag mb-6 inline-block">Programmes</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
          Community Journalism <em className="text-italic-accent">Fellowship</em>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
          Training a new generation of community-rooted journalists to tell local stories with accuracy, depth and impact.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/contact" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>

    {/* Overview */}
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag mb-4">About the Fellowship</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Journalism that <em className="text-italic-accent">serves communities</em>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              The Community Journalism Fellowship is a flagship MADE-F programme designed to equip passionate individuals
              with the skills to report on local governance, public health, climate and social issues in their communities.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Fellows are embedded within underserved communities across Nigeria, producing stories that hold power to
              account and amplify marginalised voices. The programme combines rigorous training with real-world reporting assignments.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              On completion, fellows join the MADE-F alumni network and receive ongoing mentorship, pitch support and
              publication opportunities through our Newsroom.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-accent opacity-20" />
            <img src={focusCommunity} alt="Community Journalism" className="relative rounded-3xl object-cover w-full h-[450px] shadow-hover" />
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag">What You Get</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-4">Programme <em className="text-italic-accent">highlights</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-card rounded-3xl p-8 border border-border shadow-card hover-lift flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-background">
      <div className="container mx-auto text-center">
        <div className="bg-primary rounded-3xl p-14 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusJournalism})` }} />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">Ready to apply?</h2>
            <p className="font-body text-primary-foreground/70 mb-8">Applications are open for the next cohort. Join us and tell the stories that matter.</p>
            <Link to="/contact" className="btn-gold">Get in Touch <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default CommunityJournalismFellowship;
