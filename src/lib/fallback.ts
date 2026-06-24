import type {
  FaqItem,
  FeaturedProject,
  Leader,
  Achievement,
  Facility,
  Work,
  Testimonial,
  PartnerSector,
  ProcessCard,
  Resource,
  Blog,
  HomePageData,
  FirmPageData,
  CsrPageData,
  ProcessPageData,
  ResourcesPageData,
  ReachUsPageData,
} from "./wordpress";

export const fallbackFaqs: FaqItem[] = [
  { question: "Do you manufacture retail fixtures in-house?", answer: "Yes. JMS operates its own dedicated manufacturing facilities for retail fixtures, modular furniture, signage, facade systems, and branding solutions. All fabrication, joinery, metalwork, printing, and assembly are completed in-house under strict quality control, ensuring consistency and faster turnaround across projects." },
  { question: "Can JMS handle multi-city retail rollouts?", answer: "Absolutely. JMS specializes in coordinated multi-city and multi-location retail rollouts. With centralized project management, standardized manufacturing processes, and a pan-India installation network, we ensure brand consistency and timely execution across all locations simultaneously." },
  { question: "What is the typical project execution timeline?", answer: "Timelines vary based on scope and scale. A standard single-store rollout typically takes 4-6 weeks from design finalization to installation. Large-scale multi-location projects are planned in phases with detailed milestone schedules. We provide a clear timeline during the proposal stage." },
  { question: "Do you provide facade and signage solutions?", answer: "Yes. JMS offers comprehensive facade systems including architectural cladding, glazing, storefronts, and external brand expressions, along with complete signage solutions such as illuminated signs, wayfinding systems, digital signage, and custom branding for both interior and exterior applications." },
  { question: "Which industries does JMS work with?", answer: "JMS serves retail brands, automotive showrooms, corporate offices, healthcare facilities, commercial spaces, hospitality, and any business requiring branded physical environments and standardized store rollouts." },
  { question: "Can JMS support nationwide installations?", answer: "Yes. JMS has a robust pan-India execution network that enables project delivery, installation, and on-site support across all major cities and regional markets. Our teams are equipped to handle projects anywhere in the country." },
  { question: "How do I submit an RFQ?", answer: "You can submit a Request for Quotation directly through our website via the RFQ Desk section, or contact our team through the Contact Us page. We typically respond within 24-48 hours with a detailed proposal covering scope, timeline, and pricing." },
  { question: "What makes JMS different from other retail execution companies?", answer: "JMS stands apart through our fully integrated in-house manufacturing capabilities, single-window execution model, pan-India reach, centralized quality control, and deep expertise across fixtures, furniture, facades, signage, and turnkey rollouts. We deliver brand consistency at scale without compromising on quality or timelines." },
];

export const fallbackFeaturedProjects: FeaturedProject[] = [
  { label: "Retail Outlets", img: "/HOME/FEATURED PROJECTS/RETAIL OUTLETS/Westside.jpg" },
  { label: "Automobile Showrooms", img: "/HOME/FEATURED PROJECTS/AUTOMOBILE SHOWROOMS/Kia.jpg" },
  { label: "Hospitality", img: "/HOME/FEATURED PROJECTS/HOSPITALITY/Ginger.jpg" },
  { label: "Corporate Spaces", img: "/HOME/FEATURED PROJECTS/CORPORATE SPACES/Voltas.jpg" },
  { label: "Gas Stations", img: "/HOME/FEATURED PROJECTS/GAS STATIONS/IOCL.jpg" },
];

export const fallbackHomePageData: HomePageData = {
  hero_video_url: "https://res.cloudinary.com/dckcszto5/video/upload/v1779765258/bg-1_s1xxb8.mp4",
  home_hero_feature_image: { url: "/HOME/FEATURED PROJECTS/RETAIL OUTLETS/Westside.png", alt: "" },
  home_hero_title: "We build retail environments that scale.",
  home_hero_subtitle: "Turnkey retail fabrication, fixtures, facade systems, and brand execution solutions across India.",
  home_hero_badge_line1: "In-house precision",
  home_hero_badge_line2: "Design. Engineer. Install.",
  home_process_steps: "Consultation\nDesign\nEngineering\nManufacturing\nDelivery\nInstallation",
  home_why_items: "Pan India Network\nSingle Window Execution\nExperienced Team\nIn-House Manufacturing\nFast Rollouts\nPremium Quality",
  stats: "1,00,000+|Sq. Ft Facility\n200+|Corporate Artisans\n100%|In-House Production\nPan India|Delivery",
  capabilities: "Corporate Identity|Consistent brand systems, signage, and retail identity programs built for scale.\nRetail Fixtures|Precision fixtures, displays, counters, and rollouts for high-traffic retail spaces.\nFacade Systems|Architectural storefronts, cladding, glazing, and external brand expressions.\nFurniture Manufacturing|Commercial furniture programs engineered for durability and brand fit.\nSignage Solutions|Digital, static, illuminated, and wayfinding signage fabricated in-house.\nTurnkey Rollouts|Single-window delivery from site study to installation and handover.",
};

export const fallbackLeaders: Leader[] = [
  { name: "Mr. Manmohan Singh Toor", role: "Managing Director", photo: "/FIRM/LEADERSHIP/Manmohan Singh Toor.jpg" },
  { name: "Mr. Subramanian Venkata", role: "CEO", photo: "/FIRM/LEADERSHIP/Subramanian Venata.jpg" },
  { name: "Mr. Jigar Kothari", role: "Country Head", photo: "/FIRM/LEADERSHIP/Jiggar Kothari.png" },
  { name: "Mr. Jatin Malhotra", role: "Finance Controller", photo: "/FIRM/LEADERSHIP/Jatin Malhotra.jpeg" },
  { name: "Mr. Jatin Sharof", role: "Head - Business Development", photo: "/FIRM/LEADERSHIP/Jatin Sharof.jpeg" },
  { name: "Mr. Anil Nigam", role: "VP - Production", photo: null },
  { name: "Mr. Manoj", role: "DGM - Productions", photo: "/FIRM/LEADERSHIP/Manoj Aneja.jpeg" },
];

export const fallbackAchievements: Achievement[] = [
  { value: "5,000+", label: "Retail Showrooms" },
  { value: "1,500+", label: "Gas Stations" },
  { value: "4,000+", label: "Automobile Showrooms" },
  { value: "50,000+", label: "Sq. Mt. Facade Works" },
];

export const fallbackFacilities: Facility[] = [
  { name: "Project Management", description: "End-to-end project coordination from site study to installation handover.", image: "/FIRM/Our Facilities/Project Management/project-management.jpg" },
  { name: "In-House Design Teams", description: "Creative teams specializing in retail branding, identity design, and spatial planning.", image: "/FIRM/Our Facilities/In-House Design Teams/in-house.jpg" },
  { name: "Creative Joinery Unit", description: "Precision joinery for custom fixtures, furniture, and display systems.", image: "/FIRM/Our Facilities/Creative Joinery Unit/creative-joinery.png" },
  { name: "Metal Fabrication", description: "Advanced metal fabrication for structural components and retail infrastructure.", image: "/FIRM/Our Facilities/Metal Fabrication/metal-fabrication.png" },
  { name: "100% In-House Sign Fabrication", description: "Complete in-house sign fabrication capability for all signage requirements.", image: "/FIRM/Our Facilities/100 In-House Sign Fabrication/in-house-sign.jpg" },
  { name: "Digital Printing Facility", description: "State-of-the-art digital printing for large-format graphics and branding elements.", image: "/FIRM/Our Facilities/Digital Printing Facility/digital-printing.jpg" },
  { name: "Glass & Aluminum Fabrication", description: "Specialized glass and aluminum fabrication for storefronts and facade systems.", image: "/FIRM/Our Facilities/Glass & Aluminum Fabrication/glass-aluminum.jpg" },
  { name: "Digital & Static Signage", description: "Comprehensive digital and static signage solutions for retail environments.", image: "/FIRM/Our Facilities/Digital & Static Signage/Digital & Static Signage.jpg" },
  { name: "Fixtures Manufacturing", description: "Dedicated fixtures manufacturing line for retail displays and merchandising units.", image: "/FIRM/Our Facilities/Fixtures Manufacturing/fixtures-manufacturing.jpg" },
];

export const fallbackWorks: Work[] = [
  { name: "Automobile Furniture", category: "Automobile", image: "/FIRM/Our Works/Automobile Furniture/MP700004.jpg" },
  { name: "Automobile Showroom Signs & Fit Outs", category: "Automobile", image: "/FIRM/Our Works/Automobile Showroom Signs & Fit Outs/Lexus.jpeg" },
  { name: "Banks Furniture Branding & Facades", category: "Bank", image: "/FIRM/Our Works/Banks Furniture Branding & Facades/axis-5.jpg" },
  { name: "Gas Station RVIs", category: "Gas Station", image: "/FIRM/Our Works/Gas Station RVIs/IOCL.jpg" },
  { name: "Healthcare Furniture Branding & Facades", category: "Healthcare", image: "/FIRM/Our Works/Healthcare Furniture Branding & Facades/Fortis.jpg" },
  { name: "Hospitality Furniture Branding & Facades", category: "Hospitality", image: "/FIRM/Our Works/Hospitality Furniture Branding & Facades/Ginger.jpg" },
  { name: "Retail Outlet Facades", category: "Retail", image: "/FIRM/Our Works/Retail Outlet Facades/Westside.jfif" },
  { name: "Retail Outlet Fixtures", category: "Retail", image: "/FIRM/Our Works/Retail Outlet Fixtures/Zudio.jpg" },
  { name: "Retail Outlet Furniture", category: "Retail", image: "/FIRM/Our Works/Retail Outlet Furniture/Picture1.jpg" },
  { name: "Retail Outlet Signage", category: "Retail", image: "/FIRM/Our Works/Retail Outlet Signage/1Q2A8102.jpg.jpeg" },
];

export const fallbackFirmPageData: FirmPageData = {
  firm_hero_title: "Who we are",
  firm_hero_text: "Over a decade of turnkey retail execution and fabrication excellence.",
  firm_hero_image: { url: "/HOME/FEATURED PROJECTS/CORPORATE SPACES/Corporate office Internal.jpg", alt: "" },
  firm_journey_image: { url: "/HOME/FEATURED PROJECTS/AUTOMOBILE SHOWROOMS/Renault.jpg", alt: "" },
  firm_journey_paragraphs: "Founded in 2012, JMS Universal Technologies Pvt. Ltd. began with a clear vision: to support brands in creating strong, consistent, and impactful retail identities. What started as a small venture has grown into a trusted name in Corporate Identity, Modular Furniture, Store Fixtures, and Facade Systems.\n\nOver the past decade, we have evolved with the changing landscape of retail, adapting to new technologies, expanding our capabilities, and deepening our understanding of brand environments.\n\nEvery milestone reflects our belief that a brand's physical presence should be as powerful as its promise. With each project, we deliver turnkey solutions and build long-term relationships grounded in trust, performance, and shared success.",
  firm_leadership_title: "Driven by vision, led by experts.",
  firm_leadership_text: "At JMS, our strength lies in our people. Visionary leadership and experienced teams turn ideas into impactful realities.",
  capacity_items: "Corporate Identity Execution|Consistent brand systems, signage, and retail identity programs built for scale.\nRetail & Commercial Furniture|Commercial furniture programs engineered for durability and brand fit across retail and office environments.\nRetail Fixtures & Displays|Precision fixtures, displays, counters, and rollouts designed for high-traffic retail spaces.\nFacade & Storefront Design|Architectural storefronts, cladding, glazing, and external brand expressions for premium retail facades.",
  core_values: "Transparency\nDedication\nRespect\nResponsibility\nIntegrity\nLegacy",
  people_programs: "Training|Structured programs that strengthen capability, confidence, and workplace culture.\nMotivation sessions|Structured programs that strengthen capability, confidence, and workplace culture.\nSafety training|Structured programs that strengthen capability, confidence, and workplace culture.\nCommunication skills|Structured programs that strengthen capability, confidence, and workplace culture.\nProduct updates|Structured programs that strengthen capability, confidence, and workplace culture.\nMental strength counseling|Structured programs that strengthen capability, confidence, and workplace culture.\nSports activities|Structured programs that strengthen capability, confidence, and workplace culture.\nFamily engagement programs|Structured programs that strengthen capability, confidence, and workplace culture.\nField study trips|Structured programs that strengthen capability, confidence, and workplace culture.",
  insights_jms: "Data analytics in internal Audit ensures improved decision-making through quality analytics\nQuality policy in Procurement\nProduction Protocols\nHappiness center\nI am responsible: A dedicated responsibility undertaking process by every management staff.\nEquipment safety audit",
};

export const fallbackGreenCommitments: string[] = [
  "Tree Plantation Drives",
  "Water Recycling Systems",
  "Reduce Reuse Recycle",
  "Sustainability Policy",
  "Emission & Environmental Policy",
];

export const fallbackTestimonials: Testimonial[] = [
  { quote: "Beautiful swanky office", author: "Melwyn Dsouza" },
  { quote: "Best company jms work for the best", author: "Mohd Arham" },
  { quote: "Very good work", author: "Krrishanpushpa Chaurasiya" },
];

export const fallbackWorkflowSteps: string[] = [
  "Techno Sales & Site Study",
  "Engineering Estimation",
  "Dedicated Project Management Team",
  "Creative Design Team & Calculations",
  "Value Engineering Study",
  "Eye On Detail Production Team",
  "Systematic Quality Control",
  "Safety Team",
  "Packing and Logistic Team",
  "Installation Team",
];

export const fallbackPartnerSectors: PartnerSector[] = [
  { label: "Retail Clothing", img: "/COMMUNITY/RETAIL CLOTHING/Westside 1.png" },
  { label: "Automobile", img: "/COMMUNITY/AUTOMOBILE/Lexus.jpeg" },
  { label: "Hospitality", img: "/COMMUNITY/HOSPITALITY/Ginger.jpg" },
];


export const fallbackCsrPageData: CsrPageData = {
  csr_hero_title: "Responsibility beyond production.",
  csr_hero_text: "CSR at JMS focuses on people, safety, skills, community, and environmental responsibility.",
  csr_hero_image: { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80", alt: "" },
  section_eyebrow: "Focus Areas",
  section_title: "Built around welfare, safety, and sustainability.",
  focus_areas: "Sustainability\nWorkforce welfare\nCommunity initiatives\nSafety\nSkill development\nEnvironmental responsibility",
};

export const fallbackProcessCards: ProcessCard[] = [
  {
    title: "Design",
    image: "/FIRM/Our Facilities/In-House Design Teams/in-house.jpg",
    text: "The result of balanced collaboration and closer integration between the engineering, production, and installation team members is our design and engineering capability. We set a high bar for perfection for every procedure that supports it up front. Superior goods, cutting-edge technology, and tried-and-true production techniques enable clients' ideas on canvas to become reality.",
  },
  {
    title: "Manufacturing",
    image: "/FIRM/Our Facilities/Metal Fabrication/metal-fabrication.png",
    text: "Our manufacturing facility, which spans over 100,000 square feet, is one of the biggest and most integrated in the sector. utilising highly skilled technicians and engineers who meticulously monitor the necessary output to ensure that it satisfies the highest standards of quality. Take it for granted that JMS will give your corporate IDs a fresh review and will guarantee on-time delivery.",
  },
  {
    title: "Turnkey",
    image: "/FIRM/Our Works/Gas Station RVIs/IOCL.jpg",
    text: "By providing full turnkey services that include consultation, design, production, installation, and maintenance, we enable each customer to focus on their area of expertise. The business consistently guarantees to provide comprehensive services for every single project that calls for Architectural signage, Corporate outfitting, Light metal structures, Digital Displays, and Facade.",
  },
  {
    title: "Maintenance",
    image: "/FIRM/Our Works/Automobile Showroom Signs & Fit Outs/Harley Davidson.png",
    text: "JMS's deliverables don't end with the transfer of ownership. We accompany our customers on annual maintenance contracts and post-sale services, relieving them of the worry that all facilities will continue to function flawlessly. Our hardworking maintenance crew makes sure that every customer call is handled as quickly as possible.",
  },
];

export const fallbackProcessPageData: ProcessPageData = {
  process_hero_title: "How we deliver excellence.",
  process_hero_text: "A fully integrated approach — from first brief to final handover.",
  process_hero_image: { url: "/FIRM/Our Works/Retail Outlet Signage/1Q2A8102.jpg.jpeg", alt: "" },
};

export const fallbackResources = {
  brochures: [
    { title: "Company Brochure", description: "Full overview of JMS Universal Technologies — capabilities, sectors, and reach.", pdf: "/Company-Brochure.pdf" },
    { title: "Factory Licence", description: "Certified factory licence authorising in-house manufacturing operations.", pdf: "/FACTORY-LICENCE_2024.pdf" },
    { title: "Product Catalogue", description: "Complete product catalogue across signage, fixtures, furniture, and facades.", pdf: "/Product-Catalogue.pdf" },
    { title: "Automobile Brochure", description: "Leaders in automotive showroom solutions — fit-outs, signage, and fixtures.", pdf: "/JMS-Automobile-Brochure-.pdf" },
    { title: "Facade Brochure", description: "Leaders in facade solutions — architectural cladding, glazing, and storefronts.", pdf: "/JMS-Facade-Brochure.pdf" },
  ] as Resource[],
  certificates: [
    { title: "GST Certificate", description: "Goods & Services Tax registration certificate issued by the Government of India.", pdf: "/GST-CERTIFICATE.pdf" },
    { title: "Incorporation Certificate", description: "Certificate of Incorporation confirming legal registration of JMS Universal Technologies.", pdf: "/Incorporation-Certificate.pdf" },
    { title: "JMS – ISO Certificate", description: "ISO 9001:2015 certification affirming our quality management standards.", pdf: "/JMS-ISO-Certificate.pdf" },
  ] as Resource[],
};

export const fallbackResourcesPageData: ResourcesPageData = {
  resources_hero_title: "Official documents and credentials.",
  resources_hero_text: "Access company documents, brochures, and official certifications.",
  resources_hero_image: { url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1400&q=80", alt: "" },
};

export const fallbackReachUsPageData: ReachUsPageData = {
  reach_hero_title: "Start an RFQ conversation.",
  reach_hero_text: "Connect with JMS for turnkey retail execution, facade, furniture, signage, and rollout programs.",
  reach_hero_image: { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80", alt: "" },
  contact_email: "jatinshroff@jmsuniversal.com",
  contact_address: "Suite No. 1207–1208, Hubtown Solaris One, Andheri East, Opp. Telli Gully, Mumbai – 400069",
  factory_description: "60,000 sq.ft production area with in-house fabrication and logistics",
};

export const fallbackBlogs: Blog[] = [
  {
    slug: "jms-facade-works",
    category: "Facade Works",
    title: "JMS Facade Works: Shaping Architectural Identities That Inspire",
    excerpt: "A building's facade is its identity. It's the first thing people see — and the last impression they carry. JMS brings precision engineering and brand thinking together to create facades that define spaces.",
    author: "admin",
    date: "August 4, 2025",
    image: "/FIRM/Our Works/Retail Outlet Facades/Westside 1.png",
    sections: [
      { type: "paragraph", text: "A building's facade is its identity. It's the first thing people see, setting expectations long before they step inside." },
      { type: "heading", text: "Why Facades Matter" },
      { type: "bullets", items: ["It reflects the brand personality of the business inside.", "It improves functionality, offering weather protection and energy efficiency.", "It creates a lasting impression, transforming ordinary structures into architectural landmarks."] },
      { type: "heading", text: "Our Expertise" },
      { type: "bullets", items: ["Aluminum & Glass Facades: Sleek, modern designs for commercial and corporate spaces.", "Cladding Systems: Durable, weather-resistant materials for long-lasting aesthetics.", "Integrated Branding: Facades that seamlessly incorporate your corporate identity."] },
      { type: "heading", text: "Why JMS for Facade Works?" },
      { type: "bullets", items: ["13+ years of industry expertise in architectural and corporate projects.", "In-house design & manufacturing, ensuring consistent quality control.", "Pan-India network for execution and service support."] },
    ],
  },
  {
    slug: "jms-corporate-signage",
    category: "Corporate Signage",
    title: "JMS Corporate Signage: Building Brands That Speak Without Words",
    excerpt: "In today's fast-paced corporate world, your signage is more than a nameplate — it's your brand's voice. JMS designs and fabricates corporate signage that commands attention and communicates credibility.",
    author: "admin",
    date: "August 3, 2025",
    image: "/FIRM/Our Works/Retail Outlet Signage/1Q2A8102.jpg.jpeg",
    sections: [
      { type: "paragraph", text: "In today's fast-paced corporate world, your signage is more than a nameplate — it's your brand's first impression." },
      { type: "heading", text: "Why Corporate Signage Matters" },
      { type: "paragraph", text: "Corporate signage is your silent brand ambassador. It tells visitors who you are before they even step inside." },
      { type: "heading", text: "Our Expertise" },
      { type: "bullets", items: ["External Facade Signage: High-impact, weather-resistant designs for corporate buildings.", "Internal Branding & Wayfinding: Elegant reception signs, directional systems, and safety signage.", "3D & Illuminated Signs: For brands that need to stand out — day and night."] },
    ],
  },
  {
    slug: "jms-retail-furniture",
    category: "Retail Furniture",
    title: "Transforming Retail Spaces: The JMS Approach to Retail Furniture",
    excerpt: "In today's competitive retail landscape, customer experience is everything. A well-designed retail environment, built with the right furniture, drives engagement, dwell time, and conversions.",
    author: "admin",
    date: "August 2, 2025",
    image: "/FIRM/Our Works/Retail Outlet Furniture/Picture1.jpg",
    sections: [
      { type: "paragraph", text: "In today's competitive retail landscape, customer experience is everything. A well-designed store does more than display products — it creates an atmosphere that inspires customers." },
      { type: "heading", text: "Why Retail Furniture Matters" },
      { type: "paragraph", text: "Retail furniture is more than fixtures and fittings; it's about storytelling through design." },
      { type: "heading", text: "Our Expertise" },
      { type: "bullets", items: ["Display Fixtures & Shelving: Tailored for maximum product visibility.", "Cash Counters & Kiosks: Designed for ease of use and smooth transactions.", "Modular Furniture Systems: Flexible designs for evolving retail needs."] },
    ],
  },
  {
    slug: "jms-retail-store-fixtures",
    category: "Retail Store Fixtures",
    title: "JMS Retail Store Fixtures: Creating Spaces That Sell",
    excerpt: "In retail, your store isn't just a place — it's an experience. JMS engineers fixtures that are built for high-traffic environments, designed to showcase products and reinforce your brand identity.",
    author: "admin",
    date: "August 1, 2025",
    image: "/FIRM/Our Works/Retail Outlet Fixtures/Zudio.jpg",
    sections: [
      { type: "paragraph", text: "In retail, your store isn't just a place — it's an experience. Every fixture, display, and layout decision influences how customers interact with your brand and products." },
      { type: "heading", text: "Why Store Fixtures Matter" },
      { type: "bullets", items: ["Enhance product visibility and accessibility.", "Improve customer flow through strategic placement.", "Reflect brand personality, making the store feel truly unique."] },
      { type: "heading", text: "Our Expertise" },
      { type: "bullets", items: ["Modular Display Fixtures: Flexible, scalable, and easy to adapt for seasonal needs.", "Custom Counters & Check-out Units: Designed for efficiency and visual appeal.", "Branded Fixtures: Created to align seamlessly with your corporate guidelines."] },
    ],
  },
];
