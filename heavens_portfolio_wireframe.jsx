import { useState } from "react";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "properties", label: "Properties" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
  { id: "careers", label: "Careers" },
];

const s = {
  sec: { border: "0.5px dashed var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px", marginBottom: "5px", background: "var(--color-background-secondary)" },
  secLabel: { fontSize: "10px", fontWeight: 500, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  secNote: { fontStyle: "italic", textTransform: "none", letterSpacing: 0, fontWeight: 400 },
  blk: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "4px", padding: "6px 10px", fontSize: "11px", color: "var(--color-text-secondary)" },
  img: { background: "var(--color-background-tertiary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "var(--color-text-tertiary)" },
  g3: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "5px", marginTop: "6px" },
  g4: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "5px", marginTop: "6px" },
  g2: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "5px", marginTop: "6px" },
  row: { display: "flex", gap: "5px", alignItems: "stretch" },
  btnP: { display: "inline-block", fontSize: "10px", background: "var(--color-background-info)", color: "var(--color-text-info)", borderRadius: "3px", padding: "3px 8px", marginRight: "4px", marginTop: "3px", border: "0.5px solid var(--color-border-info)", cursor: "default" },
  btnS: { display: "inline-block", fontSize: "10px", color: "var(--color-text-secondary)", borderRadius: "3px", padding: "3px 8px", marginRight: "4px", marginTop: "3px", border: "0.5px solid var(--color-border-secondary)", cursor: "default" },
  tag: { fontSize: "9px", background: "var(--color-background-success)", color: "var(--color-text-success)", borderRadius: "3px", padding: "2px 5px", display: "inline-block" },
  tagI: { fontSize: "9px", background: "var(--color-background-info)", color: "var(--color-text-info)", borderRadius: "3px", padding: "2px 5px", display: "inline-block" },
  field: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "3px", padding: "5px 8px", fontSize: "11px", color: "var(--color-text-tertiary)", marginBottom: "4px" },
  h: { fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)", margin: "3px 0" },
  sub: { fontSize: "11px", color: "var(--color-text-secondary)", margin: "2px 0 5px" },
};

const Sec = ({ label, note, children }) => (
  <div style={s.sec}>
    <div style={s.secLabel}><span>{label}</span>{note && <span style={s.secNote}>{note}</span>}</div>
    {children}
  </div>
);

const Blk = ({ children, style = {} }) => <div style={{ ...s.blk, ...style }}>{children}</div>;
const Img = ({ children, style = {} }) => <div style={{ ...s.img, ...style }}>{children}</div>;
const BtnP = ({ children, style = {} }) => <span style={{ ...s.btnP, ...style }}>{children}</span>;
const BtnS = ({ children }) => <span style={s.btnS}>{children}</span>;
const Tag = ({ children, info }) => <span style={info ? s.tagI : s.tag}>{children}</span>;
const Field = ({ p }) => <div style={s.field}>{p}</div>;

const NavBar = () => (
  <Sec label="Navigation bar" note="Sticks to top while scrolling">
    <div style={{ ...s.row, alignItems: "center" }}>
      <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)", background: "var(--color-background-tertiary)", border: "0.5px solid var(--color-border-tertiary)", padding: "4px 8px", borderRadius: "4px", whiteSpace: "nowrap" }}>Heaven's Portfolio</div>
      <div style={{ flex: 1, display: "flex", gap: "5px", justifyContent: "center", flexWrap: "wrap" }}>
        {["Home", "About Us", "Properties ▾", "Blog", "Careers"].map(l => (
          <span key={l} style={{ fontSize: "10px", color: "var(--color-text-secondary)", padding: "3px 6px", borderRadius: "3px", background: "var(--color-background-tertiary)" }}>{l}</span>
        ))}
      </div>
      <BtnP style={{ marginTop: 0 }}>Contact Us</BtnP>
    </div>
  </Sec>
);

const SameNav = () => (
  <Sec label="Navigation bar" note="Same across all pages">
    <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Logo + nav links + Contact CTA (identical to homepage)</div>
  </Sec>
);

const SameFooter = () => (
  <Sec label="Footer" note="Same across all pages">
    <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>4-column footer: Logo & tagline · Quick Links · Services · Contact Details & Social Media</div>
  </Sec>
);

const PageHero = ({ title, sub }) => (
  <Sec label="Page hero banner">
    <Img style={{ minHeight: "65px", flexDirection: "column", gap: "4px", textAlign: "center", padding: "12px" }}>
      <div style={s.h}>{title}</div>
      {sub && <div style={s.sub}>{sub}</div>}
    </Img>
  </Sec>
);

const PropCard = ({ type = "Residential" }) => (
  <Blk style={{ padding: 0, overflow: "hidden" }}>
    <Img style={{ height: "55px", borderRadius: "4px 4px 0 0", border: "none" }}>Property Photo</Img>
    <div style={{ padding: "7px" }}>
      <Tag>{type}</Tag>
      <div style={{ fontSize: "11px", fontWeight: 500, margin: "3px 0", color: "var(--color-text-primary)" }}>Property Name</div>
      <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", marginBottom: "4px" }}>📍 Sector XX, Gurgaon</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>₹X.XX Cr</span>
        <BtnP style={{ marginTop: 0 }}>View →</BtnP>
      </div>
    </div>
  </Blk>
);

const BlogCard = () => (
  <Blk style={{ padding: "8px" }}>
    <Img style={{ height: "42px", marginBottom: "6px" }}>Image</Img>
    <Tag info>Market Update</Tag>
    <div style={{ fontSize: "11px", fontWeight: 500, margin: "4px 0", color: "var(--color-text-primary)" }}>Blog post title here</div>
    <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>Jun 2026 · 4 min read</div>
  </Blk>
);

function HomePage() {
  return (
    <div>
      <NavBar />

      <Sec label="Hero section — full width" note="Background: high-quality city / property photo or looping video">
        <Img style={{ minHeight: "110px", flexDirection: "column", gap: "6px", textAlign: "center", padding: "20px" }}>
          <div style={s.h}>Your Dream Property in Delhi NCR</div>
          <div style={s.sub}>RERA Verified · Residential & Commercial · Expert Advisory</div>
          <div><BtnP>View Properties</BtnP><BtnS>Book Free Consultation</BtnS></div>
        </Img>
      </Sec>

      <Sec label="Stats bar" note="Animated numbers that count up when user scrolls to them">
        <div style={s.g4}>
          {[["15+", "Years of Experience"], ["500+", "Properties Listed"], ["₹2000Cr+", "Value Transacted"], ["1000+", "Happy Clients"]].map(([n, l]) => (
            <Blk key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "2px" }}>{n}</div>
              <div style={{ fontSize: "10px" }}>{l}</div>
            </Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Our services" note="3 cards with icon, title, description, and link">
        <div style={s.g3}>
          {[["ti-building", "Residential Properties", "Apartments, villas, independent floors"], ["ti-briefcase", "Commercial Properties", "Offices, retail, co-working spaces"], ["ti-chart-line", "Investment Advisory", "ROI analysis, portfolio building"]].map(([icon, title, desc]) => (
            <Blk key={title} style={{ textAlign: "center", padding: "12px 8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--color-background-info)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                <i className={`ti ${icon}`} style={{ fontSize: "14px", color: "var(--color-text-info)" }} aria-hidden="true"></i>
              </div>
              <div style={{ fontWeight: 500, fontSize: "11px", marginBottom: "3px", color: "var(--color-text-primary)" }}>{title}</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>{desc}</div>
            </Blk>
          ))}
        </div>
      </Sec>

      <Sec label="About us preview" note="Brief company intro with CTA linking to full About page">
        <div style={s.row}>
          <div style={{ flex: 2 }}>
            <Blk style={{ minHeight: "90px" }}>
              <div style={{ fontWeight: 500, fontSize: "12px", marginBottom: "4px", color: "var(--color-text-primary)" }}>About Heaven's Portfolio</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", lineHeight: 1.7 }}>3–4 sentences about the company — founding year, RERA number, areas covered, team size, and total value transacted. Keep the tone warm and professional.</div>
              <div style={{ marginTop: "8px" }}><BtnP>Know More About Us</BtnP></div>
            </Blk>
          </div>
          <div style={{ flex: 1 }}>
            <Img style={{ minHeight: "90px" }}>Office / Founder Photo</Img>
          </div>
        </div>
      </Sec>

      <Sec label="Featured properties" note="Show 6 curated listings. 'View All' links to Properties page">
        <div style={s.g3}>
          {Array(6).fill(null).map((_, i) => <PropCard key={i} type={i % 2 === 0 ? "Residential" : "Commercial"} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "8px" }}><BtnS>View All Properties →</BtnS></div>
      </Sec>

      <Sec label="Why choose us" note="4 USP points — things that set the company apart from competitors">
        <div style={s.g4}>
          {["RERA Verified Listings", "Expert Negotiation", "End-to-End Support", "NRI Services Available"].map(text => (
            <Blk key={text} style={{ textAlign: "center", padding: "10px 6px" }}>
              <i className="ti ti-circle-check" style={{ fontSize: "20px", color: "var(--color-text-success)", marginBottom: "4px", display: "block" }} aria-hidden="true"></i>
              <div style={{ fontSize: "10px", fontWeight: 500, color: "var(--color-text-primary)" }}>{text}</div>
            </Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Client testimonials" note="3 review cards — can be a sliding carousel on mobile">
        <div style={s.g3}>
          {Array(3).fill(null).map((_, i) => (
            <Blk key={i} style={{ padding: "10px" }}>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "8px" }}>"Short quote from a satisfied client about their experience finding a property..."</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--color-background-info)", flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 500, color: "var(--color-text-primary)" }}>Client Name</div>
                  <div style={{ fontSize: "9px", color: "var(--color-text-tertiary)" }}>Homebuyer / Investor</div>
                </div>
              </div>
            </Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Blog / market insights preview" note="3 most recent posts — auto-updates when new blog is published">
        <div style={s.g3}>{Array(3).fill(null).map((_, i) => <BlogCard key={i} />)}</div>
        <div style={{ textAlign: "center", marginTop: "8px" }}><BtnS>View All Insights →</BtnS></div>
      </Sec>

      <Sec label="Call-to-action banner" note="Full-width colored strip near the bottom of homepage">
        <Img style={{ minHeight: "60px", flexDirection: "column", textAlign: "center", gap: "6px", padding: "12px", background: "var(--color-background-info)", border: "0.5px dashed var(--color-border-info)" }}>
          <div style={s.h}>Ready to Find Your Ideal Property?</div>
          <div><BtnP>Talk to an Expert</BtnP></div>
        </Img>
      </Sec>

      <Sec label="Footer">
        <div style={s.g4}>
          {[
            { t: "Heaven's Portfolio", c: "Logo · Tagline · RERA No. · GST No.\nSocial: Instagram · LinkedIn · YouTube" },
            { t: "Quick Links", c: "Home · About Us · Properties\nBlog · Careers · Contact" },
            { t: "Our Services", c: "Residential Properties\nCommercial Properties\nInvestment Advisory · NRI Services" },
            { t: "Get in Touch", c: "+91 XXXXX XXXXX\ninfo@heavensportfolio.com\nOffice address · Newsletter signup" },
          ].map(({ t, c }) => (
            <div key={t} style={{ background: "var(--color-background-tertiary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "4px", padding: "8px 10px", fontSize: "10px", color: "var(--color-text-secondary)", minHeight: "60px", whiteSpace: "pre-line" }}>
              <div style={{ fontWeight: 500, marginBottom: "4px", fontSize: "11px", color: "var(--color-text-primary)" }}>{t}</div>
              {c}
            </div>
          ))}
        </div>
        <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", marginTop: "8px", textAlign: "center" }}>
          © 2026 Heaven's Portfolio Real Estate Solutions Pvt. Ltd. · Privacy Policy · Terms of Service
        </div>
      </Sec>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <SameNav />
      <PageHero title="About Heaven's Portfolio" sub="Building trust in Delhi NCR real estate since [Founding Year]" />

      <Sec label="Our story" note="Left: text. Right: founder or director photo">
        <div style={s.row}>
          <div style={{ flex: 2 }}>
            <Blk style={{ minHeight: "95px" }}>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", lineHeight: 1.8 }}>
                Founding story, experience, and key milestones. RERA registration number prominently displayed. 3–5 paragraphs total. End with an inspiring quote from the founder or director about their vision for the company.
              </div>
            </Blk>
          </div>
          <div style={{ flex: 1 }}>
            <Img style={{ minHeight: "95px" }}>Founder / Director Photo</Img>
          </div>
        </div>
      </Sec>

      <Sec label="Stats bar" note="Same numbers as homepage — consistency builds trust">
        <div style={s.g4}>
          {["Years of Experience", "Properties Listed", "Value Transacted", "Happy Clients"].map(t => (
            <Blk key={t} style={{ textAlign: "center", fontSize: "10px", padding: "8px" }}>{t}</Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Our team" note="4–8 team member cards with photo, name, and designation">
        <div style={s.g4}>
          {Array(4).fill(null).map((_, i) => (
            <Blk key={i} style={{ textAlign: "center", padding: "10px 6px" }}>
              <Img style={{ width: "40px", height: "40px", borderRadius: "50%", margin: "0 auto 6px" }}></Img>
              <div style={{ fontSize: "10px", fontWeight: 500, color: "var(--color-text-primary)" }}>Team Member Name</div>
              <div style={{ fontSize: "9px", color: "var(--color-text-tertiary)" }}>Designation</div>
            </Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Mission · Vision · Values">
        <div style={s.g3}>
          {["Our Mission", "Our Vision", "Our Values"].map(t => (
            <Blk key={t} style={{ padding: "10px", minHeight: "65px" }}>
              <div style={{ fontSize: "11px", fontWeight: 500, marginBottom: "4px", color: "var(--color-text-primary)" }}>{t}</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>2–3 sentences describing the {t.split(" ").pop().toLowerCase()} in clear, client-friendly language.</div>
            </Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Call-to-action banner">
        <div style={{ textAlign: "center", padding: "8px" }}>
          <BtnP>Explore Our Properties</BtnP>
          <BtnS>Contact Us</BtnS>
        </div>
      </Sec>

      <SameFooter />
    </div>
  );
}

function PropertiesPage() {
  return (
    <div>
      <SameNav />
      <PageHero title="Our Properties" sub="Verified residential & commercial properties across Delhi NCR" />

      <Sec label="Filter bar" note="Clicking a filter updates the grid below without reloading the page">
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["All", "Residential", "Commercial", "📍 Location ▾", "₹ Price Range ▾", "Status ▾"].map(f => (
            <Blk key={f} style={{ fontSize: "10px", padding: "5px 10px" }}>{f}</Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Property grid" note="12 cards per page. Each card opens an individual property detail page">
        <div style={s.g3}>
          {Array(6).fill(null).map((_, i) => <PropCard key={i} type={i % 3 === 2 ? "Commercial" : "Residential"} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11px", color: "var(--color-text-tertiary)" }}>← Page 1 of N →</div>
      </Sec>

      <Sec label="Individual property detail page" note="Reached when clicking 'View →' on any property card">
        <Blk style={{ fontSize: "10px", color: "var(--color-text-tertiary)", lineHeight: 1.7 }}>
          Each property gets its own page with: large photo gallery · price & configuration details · location on map · developer info · floor plan image · enquiry form on the side. This is a separate page/template — all properties share the same layout.
        </Blk>
      </Sec>

      <SameFooter />
    </div>
  );
}

function BlogPage() {
  return (
    <div>
      <SameNav />
      <PageHero title="Market Insights & Real Estate News" />

      <Sec label="Featured post" note="Most recent or manually pinned article — larger card at top">
        <div style={s.row}>
          <div style={{ flex: 2 }}>
            <Img style={{ minHeight: "85px" }}>Featured Post Image</Img>
          </div>
          <div style={{ flex: 2 }}>
            <Blk style={{ minHeight: "85px" }}>
              <Tag info>Market Update</Tag>
              <div style={{ fontSize: "13px", fontWeight: 500, margin: "4px 0", color: "var(--color-text-primary)" }}>Featured Blog Post Title Goes Here</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>Short excerpt — 2 sentences that hook the reader into clicking through to the full article.</div>
              <div style={{ marginTop: "6px" }}><BtnS>Read More →</BtnS></div>
            </Blk>
          </div>
        </div>
      </Sec>

      <Sec label="All blog posts" note="3-column grid, paginated — categories: Market Update, Investment, Legal, Guides">
        <div style={s.g3}>{Array(6).fill(null).map((_, i) => <BlogCard key={i} />)}</div>
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11px", color: "var(--color-text-tertiary)" }}>← Page 1 of N →</div>
      </Sec>

      <SameFooter />
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <SameNav />
      <PageHero title="Let's Talk" sub="Our team responds within 2 hours on business days" />

      <Sec label="Contact form + office details" note="Left: enquiry form. Right: address, phone, and map">
        <div style={s.row}>
          <div style={{ flex: 2 }}>
            <Blk>
              <div style={{ fontSize: "11px", fontWeight: 500, marginBottom: "8px", color: "var(--color-text-primary)" }}>Send us a message</div>
              <Field p="Full Name" />
              <Field p="Phone Number" />
              <Field p="Email Address" />
              <div style={{ ...s.field, height: "50px" }}>Your message / property requirement</div>
              <Field p="I'm interested in: Residential / Commercial / Investment ▾" />
              <BtnP>Submit Enquiry</BtnP>
            </Blk>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
            <Blk>
              <div style={{ fontSize: "10px", fontWeight: 500, marginBottom: "4px", color: "var(--color-text-primary)" }}>Office Address</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>Full address with floor no. and nearest landmark</div>
            </Blk>
            <Blk>
              <div style={{ fontSize: "10px", fontWeight: 500, marginBottom: "4px", color: "var(--color-text-primary)" }}>Phone & Email</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>+91 XXXXX XXXXX<br />info@heavensportfolio.com</div>
            </Blk>
            <Img style={{ flex: 1, minHeight: "75px" }}>Google Maps Embed</Img>
          </div>
        </div>
      </Sec>

      <SameFooter />
    </div>
  );
}

function CareersPage() {
  return (
    <div>
      <SameNav />
      <PageHero title="Join Heaven's Portfolio" sub="Build your career in Delhi NCR's growing real estate firm" />

      <Sec label="Why join us" note="3 benefit cards with icon, title, and description">
        <div style={s.g3}>
          {[["ti-coin", "High Earning Potential", "Attractive commission structure and performance incentives"], ["ti-school", "Training & Mentorship", "Learn from experienced real estate professionals from day one"], ["ti-trending-up", "Fast Career Growth", "Merit-based, rapid progression in a high-growth environment"]].map(([icon, title, desc]) => (
            <Blk key={title} style={{ textAlign: "center", padding: "12px 8px" }}>
              <i className={`ti ${icon}`} style={{ fontSize: "22px", color: "var(--color-text-warning)", marginBottom: "5px", display: "block" }} aria-hidden="true"></i>
              <div style={{ fontSize: "11px", fontWeight: 500, marginBottom: "3px", color: "var(--color-text-primary)" }}>{title}</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>{desc}</div>
            </Blk>
          ))}
        </div>
      </Sec>

      <Sec label="Open positions" note="List current openings — update whenever a new role opens up">
        {["Sales Manager", "Real Estate Consultant", "Marketing Executive", "Telecaller / Lead Generation"].map(role => (
          <div key={role} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...s.blk, marginBottom: "5px", padding: "8px 12px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>{role}</div>
              <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>Gurgaon / Delhi NCR · Full-time</div>
            </div>
            <BtnP style={{ marginTop: 0 }}>Apply →</BtnP>
          </div>
        ))}
      </Sec>

      <Sec label="General application form" note="For people who want to apply even if no current opening matches">
        <Blk>
          <div style={s.g2}><Field p="Full Name" /><Field p="Phone Number" /></div>
          <Field p="Email Address" />
          <Field p="Position Applying For ▾" />
          <Field p="Upload Resume (PDF, max 5MB)" />
          <BtnP>Submit Application</BtnP>
        </Blk>
      </Sec>

      <SameFooter />
    </div>
  );
}

const PAGE_MAP = { home: HomePage, about: AboutPage, properties: PropertiesPage, blog: BlogPage, contact: ContactPage, careers: CareersPage };

export default function Wireframe() {
  const [active, setActive] = useState("home");
  const PageComp = PAGE_MAP[active];

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: "680px", padding: "1rem 0" }}>
      <h2 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", margin: "-1px" }}>
        Website wireframe for Heaven's Portfolio Real Estate Solutions Pvt. Ltd.
      </h2>

      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "2px" }}>Heaven's Portfolio Real Estate Solutions Pvt. Ltd.</div>
        <div style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>Website wireframe · 6 pages · Select a page to view its layout</div>
      </div>

      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "14px", paddingBottom: "12px", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
        {PAGES.map(p => (
          <button key={p.id} onClick={() => setActive(p.id)} style={{ padding: "5px 12px", fontSize: "12px", borderRadius: "var(--border-radius-md)", border: active === p.id ? "0.5px solid var(--color-border-primary)" : "0.5px solid var(--color-border-secondary)", background: active === p.id ? "var(--color-background-primary)" : "transparent", color: active === p.id ? "var(--color-text-primary)" : "var(--color-text-secondary)", cursor: "pointer", fontWeight: active === p.id ? 500 : 400 }}>
            {p.label}
          </button>
        ))}
      </div>

      <PageComp />
    </div>
  );
}
