export type Blog = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  sections: Array<
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "bullets"; items: string[] }
  >;
};

export const blogs: Blog[] = [
  {
    slug: "jms-facade-works",
    category: "Facade Works",
    title: "JMS Facade Works: Shaping Architectural Identities That Inspire",
    excerpt:
      "A building's facade is its identity. It's the first thing people see - and the last impression they carry. JMS brings precision engineering and brand thinking together to create facades that define spaces.",
    author: "admin",
    date: "August 4, 2025",
    image: "/FIRM/Our Works/Retail Outlet Facades/Westside 1.png",
    sections: [
      {
        type: "paragraph",
        text: "A building's facade is its identity. It's the first thing people see, setting expectations long before they step inside. In today's world of modern architecture, facades are more than just protective shells - they are statements of style, innovation, and brand identity. At JMS Universal Technologies, we specialize in creating bespoke facade solutions that blend aesthetics with engineering excellence.",
      },
      { type: "heading", text: "Why Facades Matter" },
      { type: "paragraph", text: "A well-designed facade does more than enhance the visual appeal of a building:" },
      {
        type: "bullets",
        items: [
          "It reflects the brand personality of the business inside.",
          "It improves functionality, offering weather protection and energy efficiency.",
          "It creates a lasting impression, transforming ordinary structures into architectural landmarks.",
        ],
      },
      { type: "paragraph", text: "Whether it's a commercial complex, corporate headquarters, or retail space, the facade communicates your vision." },
      { type: "heading", text: "Our Expertise" },
      { type: "paragraph", text: "At JMS, we bring together design, technology, and craftsmanship to deliver cutting-edge facade solutions, including:" },
      {
        type: "bullets",
        items: [
          "Aluminum & Glass Facades: Sleek, modern designs for commercial and corporate spaces.",
          "Cladding Systems: Durable, weather-resistant materials for long-lasting aesthetics.",
          "Custom Architectural Features: Tailor-made elements that complement your building's design.",
          "Integrated Branding: Facades that seamlessly incorporate your corporate identity.",
        ],
      },
      { type: "paragraph", text: "Each project is custom-engineered at our advanced fabrication unit and installed by a team of experts to meet the highest industry standards." },
      { type: "heading", text: "Turnkey Solutions, Simplified" },
      { type: "paragraph", text: "Our strength lies in end-to-end execution:" },
      {
        type: "bullets",
        items: [
          "Concept & Design: Collaborating with architects and clients to bring visions to life.",
          "Engineering & Fabrication: Precision-built solutions using premium materials.",
          "Installation & After-Sales Support: Pan-India execution with reliable maintenance services.",
        ],
      },
      { type: "paragraph", text: "This integrated approach ensures timely delivery, cost efficiency, and superior quality." },
      { type: "heading", text: "Why JMS for Facade Works?" },
      {
        type: "bullets",
        items: [
          "13+ years of industry expertise in architectural and corporate projects.",
          "In-house design & manufacturing, ensuring consistent quality control.",
          "Pan-India network for execution and service support.",
          "Commitment to sustainability with eco-friendly and energy-efficient solutions.",
        ],
      },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "Your building deserves more than a facade - it deserves an identity. At JMS Universal Technologies, we transform structures into landmarks that inspire and endure." },
      { type: "paragraph", text: "Looking to redefine your building's presence? Reach out to us and let's design a facade that stands the test of time." },
    ],
  },
  {
    slug: "jms-corporate-signage",
    category: "Corporate Signage",
    title: "JMS Corporate Signage: Building Brands That Speak Without Words",
    excerpt:
      "In today's fast-paced corporate world, your signage is more than a nameplate - it's your brand's voice. JMS designs and fabricates corporate signage that commands attention and communicates credibility.",
    author: "admin",
    date: "August 3, 2025",
    image: "/FIRM/Our Works/Retail Outlet Signage/1Q2A8102.jpg.jpeg",
    sections: [
      {
        type: "paragraph",
        text: "In today's fast-paced corporate world, your signage is more than a nameplate - it's your brand's first impression. From office lobbies to high-rise facades, well-designed signage communicates professionalism, trust, and identity. At JMS Universal Technologies, we've spent over a decade crafting corporate signage solutions that do exactly that.",
      },
      { type: "heading", text: "Why Corporate Signage Matters" },
      { type: "paragraph", text: "Corporate signage is your silent brand ambassador. It tells visitors who you are before they even step inside. Whether it's a striking outdoor facade sign, wayfinding system, or illuminated logo in a reception area, signage reflects your company's values and attention to detail. In many ways, it's the most visible extension of your brand identity." },
      { type: "heading", text: "Our Expertise" },
      { type: "paragraph", text: "At JMS, we specialize in end-to-end corporate signage solutions, including:" },
      {
        type: "bullets",
        items: [
          "External Facade Signage: High-impact, weather-resistant designs for corporate buildings.",
          "Internal Branding & Wayfinding: Elegant reception signs, directional systems, and safety signage.",
          "3D & Illuminated Signs: For brands that need to stand out - day and night.",
          "Custom Sign Systems: Tailored solutions to meet brand guidelines and architectural requirements.",
        ],
      },
      { type: "paragraph", text: "Every sign is designed with aesthetic precision, brand alignment, and durability in mind." },
      { type: "heading", text: "Our Turnkey Approach" },
      { type: "paragraph", text: "We believe in making the signage process hassle-free for our clients:" },
      {
        type: "bullets",
        items: [
          "Consultation & Design: We work closely with your team to create concepts aligned with brand guidelines.",
          "Fabrication: All signs are manufactured at our state-of-the-art facility with stringent quality checks.",
          "Installation & Support: Pan-India execution ensures seamless delivery and reliable maintenance.",
        ],
      },
      { type: "heading", text: "Why JMS?" },
      {
        type: "bullets",
        items: [
          "13+ years of industry expertise in corporate branding.",
          "Trusted by leading MNCs and premium Indian enterprises.",
          "Pan-India network for execution and after-sales support.",
          "No-compromise policy on quality, safety, and compliance.",
        ],
      },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "Your brand deserves to be seen - and remembered. At JMS Universal Technologies, we ensure your signage not only meets your needs but elevates your brand's presence." },
      { type: "paragraph", text: "Ready to transform your corporate identity? Connect with us and let's design signage that makes a lasting impression." },
    ],
  },
  {
    slug: "jms-retail-furniture",
    category: "Retail Furniture",
    title: "Transforming Retail Spaces: The JMS Approach to Retail Furniture",
    excerpt:
      "In today's competitive retail landscape, customer experience is everything. A well-designed retail environment, built with the right furniture, drives engagement, dwell time, and conversions.",
    author: "admin",
    date: "August 2, 2025",
    image: "/FIRM/Our Works/Retail Outlet Furniture/Picture1.jpg",
    sections: [
      {
        type: "paragraph",
        text: "In today's competitive retail landscape, customer experience is everything. A well-designed store does more than display products - it creates an atmosphere that inspires customers, reflects the brand's identity, and ultimately drives sales. At JMS Universal Technologies, we understand this connection and have been delivering turnkey retail furniture solutions for over a decade.",
      },
      { type: "heading", text: "Why Retail Furniture Matters" },
      { type: "paragraph", text: "Retail furniture is more than fixtures and fittings; it's about storytelling through design. Every shelf, counter, and display unit influences how customers perceive your brand. Strategic layouts and ergonomically designed furniture guide customers through your store effortlessly, encouraging engagement and boosting purchase decisions." },
      { type: "heading", text: "Our Expertise" },
      { type: "paragraph", text: "At JMS, we specialize in custom-designed retail furniture that blends functionality, aesthetics, and durability. Our solutions include:" },
      {
        type: "bullets",
        items: [
          "Display Fixtures & Shelving: Tailored for maximum product visibility.",
          "Cash Counters & Kiosks: Designed for ease of use and smooth transactions.",
          "Modular Furniture Systems: Flexible designs for evolving retail needs.",
          "Brand-Specific Fixtures: Crafted to align with your corporate identity.",
        ],
      },
      { type: "paragraph", text: "Each piece is meticulously engineered at our state-of-the-art production facility and undergoes strict quality checks to meet both brand guidelines and international standards." },
      { type: "heading", text: "End-to-End Turnkey Solutions" },
      { type: "paragraph", text: "Our approach is comprehensive. From conceptual design to manufacturing, installation, and after-sales support, we handle every stage of the process. This means you get a seamless execution and a store that is truly 'retail-ready' without the hassle of coordinating multiple vendors." },
      { type: "heading", text: "Why Choose JMS?" },
      {
        type: "bullets",
        items: [
          "13+ years of industry experience in corporate retail solutions.",
          "A pan-India network for execution and maintenance.",
          "In-house design and production for uncompromised quality.",
          "A track record of delivering projects for top national and international brands.",
        ],
      },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "Retail is evolving - and so should your store. Whether you're launching a new outlet or refreshing an existing one, JMS Universal Technologies can help you create a retail environment that delights customers, enhances brand presence, and drives growth." },
      { type: "paragraph", text: "Ready to reimagine your retail space? Get in touch with our team at +91 9167490480 / inquiry@jmsuniversal.com and let's build something extraordinary together." },
    ],
  },
  {
    slug: "jms-retail-store-fixtures",
    category: "Retail Store Fixtures",
    title: "JMS Retail Store Fixtures: Creating Spaces That Sell",
    excerpt:
      "In retail, your store isn't just a place - it's an experience. JMS engineers fixtures that are built for high-traffic environments, designed to showcase products and reinforce your brand identity.",
    author: "admin",
    date: "August 1, 2025",
    image: "/FIRM/Our Works/Retail Outlet Fixtures/Zudio.jpg",
    sections: [
      {
        type: "paragraph",
        text: "In retail, your store isn't just a place - it's an experience. Every fixture, display, and layout decision influences how customers interact with your brand and products. At JMS Universal Technologies, we understand that great store fixtures do more than hold merchandise - they tell a story, guide the customer journey, and drive sales.",
      },
      { type: "heading", text: "Why Store Fixtures Matter" },
      { type: "paragraph", text: "Store fixtures are silent salespeople. They shape how customers explore your products, create focal points for promotions, and help reinforce brand identity. Well-designed fixtures:" },
      {
        type: "bullets",
        items: [
          "Enhance product visibility and accessibility.",
          "Improve customer flow through strategic placement.",
          "Reflect brand personality, making the store feel truly unique.",
          "Maximize floor space, balancing aesthetics and functionality.",
        ],
      },
      { type: "heading", text: "Our Expertise" },
      { type: "paragraph", text: "For over a decade, JMS has been delivering custom retail store fixtures for some of the most recognized brands. Our solutions include:" },
      {
        type: "bullets",
        items: [
          "Modular Display Fixtures: Flexible, scalable, and easy to adapt for seasonal needs.",
          "Custom Counters & Check-out Units: Designed for efficiency and visual appeal.",
          "Product-Specific Displays: Tailored for apparel, electronics, cosmetics, or any niche.",
          "Branded Fixtures: Created to align seamlessly with your corporate guidelines.",
        ],
      },
      { type: "paragraph", text: "Every fixture is crafted at our state-of-the-art production facility, combining durability, premium finishes, and ergonomic design." },
      { type: "heading", text: "Turnkey Retail Solutions" },
      { type: "paragraph", text: "We make it simple for our clients:" },
      {
        type: "bullets",
        items: [
          "Concept & Design: Our in-house design team creates layouts that blend creativity with practicality.",
          "Fabrication & Quality Control: Fixtures are manufactured using premium materials and stringent checks.",
          "Installation & Support: A pan-India network ensures timely delivery and reliable after-sales service.",
        ],
      },
      { type: "heading", text: "Why Choose JMS?" },
      {
        type: "bullets",
        items: [
          "13+ years of experience in retail furniture & fixture solutions.",
          "Expertise across industries: Fashion, lifestyle, electronics, corporate, and more.",
          "Pan-India execution with consistent quality control.",
          "Cost-effective solutions without compromising on aesthetics or durability.",
        ],
      },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "A great retail store isn't built by chance - it's built with strategy, precision, and creativity. At JMS Universal Technologies, we help brands create functional, beautiful, and sales-driven retail environments." },
      { type: "paragraph", text: "Ready to transform your retail space? Get in touch and let's design fixtures that sell." },
    ],
  },
];
