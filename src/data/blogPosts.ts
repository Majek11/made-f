import focusJournalism from "@/assets/focus-journalism.jpg";
import focusCommunity from "@/assets/focus-community.jpg";
import focusData from "@/assets/focus-data.jpg";
import focusMedia from "@/assets/focus-media.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
  content: string; // HTML-free markdown-style string rendered as paragraphs
  sections: { heading: string; body: string }[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "community-journalism-reshaping-accountability",
    title: "How Community Journalism is Reshaping Accountability in Rural Nigeria",
    excerpt:
      "Across Nigeria's rural heartland, a new generation of community journalists trained through MADE-F's fellowship programme is holding local governments accountable — one story at a time.",
    author: "MADE-F Editorial Team",
    authorRole: "Editorial",
    date: "February 10, 2025",
    readTime: "6 min read",
    tag: "Journalism",
    image: focusJournalism,
    featured: true,
    content:
      "In many parts of rural Nigeria, the closest a community gets to journalism is a rumour passed between neighbours at the market, or a brief mention on a radio station broadcasting from a distant state capital. Local government councils spend public funds with little scrutiny. Health workers abandon their posts with no consequences. Infrastructure projects stall indefinitely — and nobody writes about it.",
    sections: [
      {
        heading: "A Fellowship Built on Community Roots",
        body: "Since 2018, MADE Foundation's Community Journalism Fellowship has been quietly changing that reality. By training journalists who are themselves embedded in the communities they cover, the programme ensures that accountability reporting is not an external imposition but a community-owned enterprise. Each fellow is selected from the local government area they will report on — meaning they understand the politics, the culture and the unspoken pressures that shape what gets covered and what gets buried.",
      },
      {
        heading: "Real Stories, Real Impact",
        body: "In Kogi State, a 2024 fellow uncovered a primary healthcare centre that had been reporting full operations to the state government while its equipment lay broken and its staff were absent. Her story, published through MADE-F's Newsroom and picked up by Premium Times, triggered an emergency audit and the eventual redeployment of the facility's manager. In Bauchi, another fellow's reporting on a failed school building project led to a full review of the contractor's licences across three local government areas. These are not isolated cases. They represent a pattern — community journalists, armed with basic skills in data verification, source protection and ethical reporting, producing accountability stories that larger media organisations consistently overlook.",
      },
      {
        heading: "The Skills That Make the Difference",
        body: "What separates a MADE-F fellow from an untrained citizen journalist? The fellowship emphasises three core competencies: verification, protection and persistence. Fellows learn to verify claims using Freedom of Information requests, government budget documents and primary source interviews. They learn to protect their sources — a critical skill in communities where retaliation against whistleblowers is common. And they learn to persist through the silence, denial and obstruction that often greets accountability reporting. The programme also trains fellows in safety protocols, ensuring they understand how to manage threats and when to escalate concerns to the MADE-F team.",
      },
      {
        heading: "Building a Permanent Infrastructure",
        body: "Beyond individual fellows, the programme is building infrastructure. MADE-F now operates a community newsroom network with 36 active contributors across 12 states. Story packages are formatted for radio, digital and print distribution, ensuring that accountability journalism reaches audiences regardless of connectivity or literacy levels. In 2025, MADE-F will expand the fellowship to include a dedicated radio journalism track, recognising that in many rural communities, the FM radio remains the primary information channel. Applications for the 2025 cohort are currently open.",
      },
      {
        heading: "What's Next",
        body: "MADE-F is also exploring how AI-assisted translation tools can help fellows produce content in multiple local languages simultaneously — expanding reach without requiring additional reporting resources. The goal is simple: every community in Nigeria deserves journalism that holds power accountable. And increasingly, that journalism is being produced by people who call that community home.",
      },
    ],
  },
  {
    slug: "media-gender-equity-nigeria",
    title: "The Role of Media in Advancing Gender Equity in Nigeria",
    excerpt: "Media framing shapes public perception. We examine how Nigerian newsrooms can do better on gender coverage.",
    author: "Amina Bello",
    authorRole: "Gender & Inclusion Specialist",
    date: "January 28, 2025",
    readTime: "5 min read",
    tag: "Gender",
    image: focusCommunity,
    content:
      "The way Nigerian media covers women — and gender more broadly — is not neutral. Every editorial decision about whose voice to include, which stories to pursue and how to frame a narrative carries gendered consequences. Research consistently shows that when media frames gender-based violence as a domestic matter, public tolerance for it rises. When media centres women only as victims, survivors, or wives, it narrows the public imagination of what women can be.",
    sections: [
      {
        heading: "The Numbers Tell a Story",
        body: "A 2024 content analysis conducted by MADE Foundation across 15 Nigerian newspapers and 8 television stations found that women make up fewer than 22% of all quoted expert sources in news coverage. In political reporting, that figure drops to 11%. Development stories fare better — but even there, women are more often positioned as beneficiaries of programmes than as architects of change. These are not just statistics. They are a mirror held up to a media industry that consistently underestimates, underrepresents and underserves half the population.",
      },
      {
        heading: "Why It Matters for Development",
        body: "The link between media representation and development outcomes is well-established. Communities that see women in leadership roles in media are more likely to support women's political participation. Girls who see women as expert voices are more likely to aspire to technical and professional careers. Conversely, media that traffics in stereotypes of women as passive or subordinate normalises those roles — and makes it harder to challenge them. In Nigeria, where gender-based violence, child marriage and women's economic exclusion remain urgent development challenges, media framing is not a peripheral concern. It is a front-line issue.",
      },
      {
        heading: "What Good Gender-Responsive Reporting Looks Like",
        body: "MADE-F's Gender-Responsive Journalism Guidelines, launched in July 2024, provide a practical framework for Nigerian newsrooms. The guidelines encourage editors to audit their source lists for gender balance, require journalists to ask how a story affects women and men differently before filing, and recommend that stories involving gender-based violence be approached with trauma-informed reporting techniques. The guidelines also address the particular challenges of covering gender in conservative communities — how to report on issues like female genital mutilation or child marriage without sensationalising or stigmatising the community, while still holding duty-bearers accountable.",
      },
      {
        heading: "Building Newsroom Culture",
        body: "Technical guidelines alone are not enough. Gender-responsive journalism requires newsroom cultures that genuinely value diverse perspectives — and that means addressing the conditions faced by female journalists themselves. In our 2024 survey of Nigerian media practitioners, 68% of female respondents reported experiencing gender-based harassment in their newsroom, and 54% said they had been assigned to 'soft' beats against their preference. Changing those dynamics is inseparable from changing coverage. MADE-F's newsroom capacity-building programme includes a dedicated track on building gender-inclusive editorial environments — because the journalists we train need to be able to work safely and equitably themselves.",
      },
    ],
  },
  {
    slug: "data-journalism-evidence-newsroom",
    title: "Data Journalism: Building an Evidence-Based Newsroom",
    excerpt: "A practical guide to integrating data storytelling into Nigerian development journalism practice.",
    author: "Chidi Okeke",
    authorRole: "Data Journalism Trainer",
    date: "January 15, 2025",
    readTime: "7 min read",
    tag: "Data",
    image: focusData,
    content:
      "The conversation about data journalism in Nigeria has too often focused on the exotic end of the craft — interactive visualisations, machine-learning-powered investigations, satellite imagery analysis. All of that is valuable. But it obscures a simpler truth: most Nigerian newsrooms would be transformed by mastering the basics. Reading a government budget. Cross-checking official statistics against primary records. Knowing how to file a Freedom of Information request and follow up when it is ignored.",
    sections: [
      {
        heading: "Start With What You Have",
        body: "Nigeria's data landscape is more accessible than most journalists realise. The National Bureau of Statistics publishes granular datasets on everything from household income to crop yields. The Budget Office publishes annual and supplementary budgets. The Central Bank publishes monetary policy reports. State governments increasingly maintain online portals with procurement records. None of this data is perfect — but all of it is usable, and most of it is underused. The first step in building a data-driven newsroom is not buying software. It is building the habit of asking: is there a dataset that could verify, enrich or challenge this story?",
      },
      {
        heading: "Core Skills Every Reporter Needs",
        body: "MADE-F's data journalism curriculum centres on four core skills: data literacy (understanding what a dataset represents, its limitations and how to read it), spreadsheet analysis (basic operations in Excel or Google Sheets that allow a reporter to find patterns), data verification (cross-checking figures against multiple sources), and data storytelling (turning numbers into narratives that resonate with audiences). These are not advanced technical skills. A motivated reporter can develop basic competency in all four within a week of structured training. The barrier is not aptitude — it is exposure and institutional support.",
      },
      {
        heading: "The Newsroom Structure That Supports Data Journalism",
        body: "Individual skills matter, but they are most effective when embedded in newsroom systems. Our capacity-building work with media organisations has found that the newsrooms producing the best data-driven journalism share three structural features: a dedicated data editor (even part-time) who sets standards and supports reporters; a shared library of verified datasets that reporters can draw on; and editorial processes that require evidence to be sourced and logged before publication. These are achievable even in resource-constrained environments — they require institutional commitment, not large budgets.",
      },
      {
        heading: "Common Pitfalls to Avoid",
        body: "Data journalism done badly can be as misleading as anecdote-driven reporting. The most common pitfalls we see in Nigerian newsrooms are: using percentage changes without context (a 200% increase from 2 to 6 is very different from the same percentage increase in a larger dataset); treating official statistics as ground truth without verification; and visualising data in ways that mislead (cherry-picked timeframes, manipulated axes). Training journalists to ask 'what could make this number wrong?' is as important as training them to find the number in the first place.",
      },
    ],
  },
  {
    slug: "youth-digital-advocacy-social-media",
    title: "Youth Voices: Digital Advocacy in the Age of Social Media",
    excerpt: "How young Nigerians are leveraging digital platforms to drive policy change and amplify community issues.",
    author: "Fatima Usman",
    authorRole: "Youth Programme Coordinator",
    date: "December 20, 2024",
    readTime: "4 min read",
    tag: "Youth",
    image: focusMedia,
    content:
      "In October 2020, young Nigerians used Twitter to organise, document and amplify the #EndSARS protests — demonstrating, in real time, the mobilising power of digital platforms in a country where traditional media was slow to respond and state media actively hostile. Four years later, the generation that led that movement is maturing into a cohort of digitally literate civic actors who understand, better than any previous generation, how to use social media as a tool for accountability.",
    sections: [
      {
        heading: "From Protest to Programme",
        body: "MADE-F's Youth Digital and Leadership Programme was designed with that reality in mind. We work with young Nigerians aged 18–35 to develop not just social media skills but the strategic thinking that makes digital advocacy effective. It is easy to post. It is harder to build a sustained campaign that changes a policy, holds a public official accountable, or shifts community attitudes on an issue like early marriage or open defecation. Our programme focuses on the harder task.",
      },
      {
        heading: "What Digital Advocacy Actually Requires",
        body: "Effective digital advocacy requires three things that are often underestimated. First, a clear theory of change: who is your target audience, what behaviour change do you want to achieve, and how will digital content drive that change? Second, content discipline: consistent messaging, a defined visual identity, and the ability to repurpose content across platforms without losing its core message. Third, coalition building: digital campaigns gain power through amplification, and amplification comes from relationships — with allied organisations, with journalists, with community leaders who can translate digital reach into on-the-ground action.",
      },
      {
        heading: "Case Study: The Kano Water Access Campaign",
        body: "A 2024 cohort participant from Kano State built a three-month digital campaign exposing the failure of a local water scheme that had received government funding but delivered no infrastructure. Using WhatsApp community groups, Twitter threads and YouTube video diaries shot on a smartphone, she built a following of over 8,000 engaged community members, attracted coverage from two national newspapers, and eventually secured a meeting with the state commissioner for water resources. The scheme was subsequently audited. None of this required expensive equipment or a large team. It required a clear message, consistent execution, and the skills to navigate each platform's algorithm.",
      },
      {
        heading: "The Disinformation Challenge",
        body: "Digital advocacy does not operate in a neutral environment. Nigeria's online information ecosystem is heavily polluted with disinformation — including state-sponsored content designed to discredit civil society voices. Our programme includes dedicated sessions on disinformation resilience: how to verify information before sharing it, how to respond when your campaign is targeted by coordinated inauthentic behaviour, and how to maintain credibility in an environment where trust is fragile. These are not optional extras. They are foundational skills for any young person who wants to use digital platforms as a force for positive change.",
      },
    ],
  },
  {
    slug: "policy-dialogues-conversation-to-action",
    title: "Policy Dialogues: From Conversation to Action",
    excerpt: "Reflections on MADE-F's Dialogue and Policy Series — what works, what doesn't, and what's next.",
    author: "MADE-F Editorial Team",
    authorRole: "Editorial",
    date: "December 5, 2024",
    readTime: "8 min read",
    tag: "Policy",
    image: focusData,
    content:
      "Anyone who has spent time in the development sector knows the joke: conferences produce reports, reports produce recommendations, recommendations produce conferences. The cycle of dialogue without action is one of the most stubborn pathologies in Nigerian development practice — and it is one that MADE-F set out to disrupt when it launched the Dialogue and Policy Series in 2019.",
    sections: [
      {
        heading: "Designing for Action, Not Applause",
        body: "The core design principle of the Dialogue and Policy Series is simple: every session must produce a document, and every document must be owned by someone. This sounds obvious, but it runs against the grain of most policy events, which prioritise the quality of the conversation over the durability of its outputs. MADE-F's approach begins before the event. We work with conveners to identify three to five policy questions that participants will actually have the authority to address — not aspirational goals for a future government, but specific decisions within the reach of the people in the room.",
      },
      {
        heading: "The Multi-Stakeholder Imperative",
        body: "Good policy conversations require the right people at the table. Government officials who can make decisions. Researchers who can provide evidence. Civil society organisations who represent affected communities. Journalists who will hold everyone accountable for the commitments they make. Getting this mix right is harder than it sounds. Government officials are often reluctant to share a platform with critics. Researchers are wary of being co-opted into advocacy. Journalists worry about being managed. Our facilitation approach is designed to navigate these tensions — creating enough trust for genuine exchange while maintaining the independence of each actor.",
      },
      {
        heading: "What Has Worked",
        body: "In six years of the series, we have convened 48 policy dialogues across 14 states, producing 48 communiques and 31 policy briefs. Of the recommendations contained in those documents, we track implementation rates annually. In our most recent review (2024), 38% of recommendations had been fully implemented, 29% partially implemented, and 33% remained unimplemented. Those are not perfect numbers — but they compare favourably with the near-zero implementation rates that characterise most conference outputs. The dialogues that produce the highest implementation rates share common features: a small, empowered participant group; specific, time-bound recommendations; and a named follow-up process that assigns responsibility for each action point.",
      },
      {
        heading: "What Has Not Worked",
        body: "We have also learned what does not work. Large, prestige-driven events with senior officials who attend to be seen rather than to decide. Sessions where the agenda is controlled by a single powerful stakeholder who uses the dialogue to validate decisions already made. Follow-up processes that depend entirely on the goodwill of government counterparts with no civil society monitoring. These are not failures of the dialogue format — they are failures of convening discipline. The lesson we draw is that a well-designed small dialogue will always outperform a poorly-designed large one.",
      },
    ],
  },
];

export const getFeaturedPost = (): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.featured);

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const getRelatedPosts = (currentSlug: string, count = 3): BlogPost[] =>
  BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
