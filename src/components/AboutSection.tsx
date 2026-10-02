import aboutImg from "@/assets/about-img.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="pt-40 pb-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative animate-fade-up">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-accent opacity-30" />
            <img
              src={aboutImg}
              alt="Community engagement session"
              className="relative rounded-3xl object-cover w-full h-[480px] shadow-hover"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 bg-primary text-primary-foreground rounded-2xl px-6 py-4 shadow-hover animate-float">
              <p className="font-display text-3xl font-bold">Prof.</p>
              <p className="font-body text-xs text-primary-foreground/80 mt-1">Founded by<br />Abigail Ogwezzy-Ndisika</p>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in-delay">
            <span className="section-tag mb-4">Who We Are</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Practice beyond <em className="text-italic-accent">classroom</em>
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-5">
              Media Action & Development Foundation (MADE-F) is a social enterprise and brainchild of
              Professor Abigail Ogwezzy-Ndisika, founded to mark her golden jubilee. It is a platform
              dedicated to practising development beyond the classroom.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
              MADE-F deploys data-driven insights, media action, strategic communication, Social and
              Behavioural Change Communication (SBCC) and Risk Communication & Community Engagement
              (RC&CE) to promote sustainable development — while serving as a laboratory for growing
              budding journalism and communication professionals.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Data-Driven", "SBCC", "RC&CE", "Journalism Lab", "Strategic Comms"].map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
