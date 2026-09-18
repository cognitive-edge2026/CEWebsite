import touchKioskImg from "../assets/images/touch_kiosk_display_1789055717373.jpg";
import tabletMobileImg from "../assets/images/tablet_mobile_spatial_1789055738910.jpg";
import constructionBimImg from "../assets/images/construction_bim_vis_1789322528856.jpg";

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  category: string;
  badge: string;
}

export interface MetricItem {
  id: string;
  stat: string;
  label: string;
  subtext: string;
  iconName: string;
  impactCategory: "speed" | "cost" | "approval" | "quality";
}

export interface ApproachStep {
  title: string;
  tagline: string;
  description: string;
}

export const WEBSITE_CONTENT = {
  brand: {
    name: "Cognitive Edge LTD",
    tagline: "Transform Your Vision Into Interactive Reality",
    slogan: "Intelligence Beyond Reality",
    enquiryEmail: "info@cognitive-edge.us",
    altEmail: "avya@cognitive-edge.us",
    salesEmail: "sales@cognitive-edge.us",
    phone: "+1 (214) 899-1997",
    phoneRaw: "2148991997",
    hours: "9a – 5p CST",
    copyright: "© 2026 Cognitive Edge LTD. All rights reserved.",
  },

  about: {
    heading: "About Cognitive Edge LTD",
    paragraph1:
      "Cognitive Edge LTD specializes in creating immersive digital twins and virtual reality experiences that revolutionize how real estate and interior design projects are visualized and executed. We transform raw building plans into interactive virtual models, enabling clients to explore, customize, and visualize their future spaces in stunning detail before construction begins. Our innovative approach reduces costs, minimizes risks, and ensures customer satisfaction by providing a comprehensive preview of completed projects.",
    paragraph2:
      "With our cutting-edge VR and digital twin technology, we empower architects, developers, and property owners to make informed decisions with confidence. By bridging the gap between imagination and reality, we help stakeholders experience spaces as if they already exist, leading to better design choices, faster approvals, and ultimately, more successful projects that exceed expectations.",
  },

  approach: [
    {
      title: "Design-forward thinking",
      description:
        "We treat every project as a design problem first: clarity, usability, and aesthetics guide technical choices so the final product delights users and performs reliably.",
    },
    {
      title: "Visualization-first process",
      description:
        "We create realistic previews and interactive prototypes that show form, function, and context. When stakeholders can explore the end result, feedback becomes specific and actionable.",
    },
    {
      title: "Cost-conscious engineering",
      description:
        "Early visualization uncovers costly customizations before construction or development begins. That means fewer surprises, fewer reworks, and measurable savings for our clients.",
    },
  ],

  whyItWorks: [
    {
      title: "Faster approvals",
      description: "Stakeholders understand and sign off sooner.",
    },
    {
      title: "Fewer change orders",
      description: "Design issues are resolved in the prototype phase.",
    },
    {
      title: "Lower total cost",
      description: "Early refinements avoid expensive late-stage customization.",
    },
    {
      title: "Better user outcomes",
      description: "Realistic previews reveal usability improvements before launch.",
    },
  ],

  collaborationSteps: [
    {
      step: 1,
      title: "Discover",
      description: "We map goals, constraints, and user needs.",
    },
    {
      step: 2,
      title: "Visualize",
      description: "We build high-fidelity previews and interactive mockups.",
    },
    {
      step: 3,
      title: "Refine",
      description: "Clients iterate on the visual model until it’s right.",
    },
    {
      step: 4,
      title: "Deliver",
      description: "We translate the approved design into efficient, cost-effective product.",
    },
  ],

  services: [
    {
      id: "digital-twins",
      title: "Digital Twin Creation",
      category: "Architectural Modeling",
      badge: "High Precision 3D",
      subtitle: "Transform building plans into interactive 3D digital models",
      description:
        "Transform building plans into interactive 3D digital models. Our digital twins provide accurate, detailed representations of real estate projects, allowing clients to explore every aspect of their future spaces with precision and clarity.",
      highlights: [
        "1:1 scale blueprint to 3D translation",
        "Interactive spatial navigation & measurements",
        "Accurate physical materiality & lighting simulations",
      ],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "vr-experiences",
      title: "Virtual Reality Experiences",
      category: "Immersive Simulation",
      badge: "Full Scale Immersion",
      subtitle: "Immerse yourself in stunning VR environments",
      description:
        "Immerse yourself in stunning VR environments that bring your projects to life. Walk through spaces, customize layouts, and experience designs in full scale before construction begins, enabling better decision-making and client satisfaction.",
      highlights: [
        "Photorealistic lighting & materiality",
        "Real-time finish & layout switching",
        "Cross-platform headset & browser support",
      ],
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "interior-design",
      title: "Interior & Exterior Visuallization",
      category: "Spatial Styling",
      badge: "Interactive Customization",
      subtitle: "Visualize interior design concepts in interactive 3D",
      description:
        "Visualize interior design concepts in interactive 3D environments. From furniture placement to color schemes and material selections, our VR solutions allow you to experiment with design options and see the final result before implementation.",
      highlights: [
        "Dynamic custom finishes & material palettes",
        "Furniture placement & spatial flow testing",
        "Try-before-you-buy spatial visualization",
      ],
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "interactive-touch-kiosks",
      title: "Interactive Touch Kiosks",
      category: "Showroom & Sales Center",
      badge: "Multi-Touch Display",
      subtitle: "Engaging large-format touch displays for sales galleries and leasing centers",
      description:
        "Transform your sales gallery or showroom into an interactive experience center. Large-format multi-touch kiosks empower prospective buyers to explore development masterplans, navigate unit floor plates, and inspect sunlight orientation in real time.",
      highlights: [
        "Ultra-responsive 4K multi-touch displays",
        "Real-time unit availability & inventory sync",
        "Interactive masterplan & unit selector",
      ],
      image: touchKioskImg,
    },
    {
      id: "tablet-mobile-experience",
      title: "Tablet & Mobile Experience",
      category: "Portable Presentation",
      badge: "Cross-Platform Access",
      subtitle: "High-performance spatial presentation tools for brokers, agents, and buyers",
      description:
        "Empower brokers, sales teams, and buyers with seamless tablet and mobile spatial apps. Showcase your entire development portfolio on iPads and smartphones with smooth 60 FPS real-time rendering, offline synchronization, and instant sharing.",
      highlights: [
        "Optimized for iPad Pro, iOS & Android devices",
        "Offline presentation mode for client pitches",
        "Interactive presentation made for the remote client",
      ],
      image: tabletMobileImg,
    },
    {
      id: "360-virtual-tours",
      title: "360 Degree virtual tours",
      category: "Web & Mobile Immersion",
      badge: "Frictionless WebXR",
      subtitle: "Browser-accessible panoramic tours with zero app installation",
      description:
        "Deliver frictionless, high-resolution panoramic walkthroughs that load instantly on any web browser or mobile device without apps or plugins. Features interactive hotspots, floor plan minimaps, embedded audio narration, and lead capture forms.",
      highlights: [
        "Zero-installation WebGL/WebXR streaming",
        "Interactive hotspot tags & callouts",
      ],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "architectural-visuallization",
      title: "Architectural Visuallization",
      category: "CGI Stills & Elevations",
      badge: "Ultra 8K Stills",
      subtitle: "Photorealistic exterior and interior architectural CGI renderings",
      description:
        "Produce breathtaking architectural CGI stills that communicate design intent with pristine clarity. We simulate exact geographical sun angles, atmospheric lighting conditions, physical material properties, and landscaping to captivate buyers.",
      highlights: [
        "Accurate sun studies & twilight lighting",
        "Ultra 8K resolution for billboard & print",
        "Physically based shaders matching vendor specs",
      ],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "construction-design-visuallization",
      title: "Construction & Design visuallization",
      category: "BIM & Phasing Simulation",
      badge: "4D Construction Phasing",
      subtitle: "Bridge architectural schematics, construction sequencing, and MEP coordination",
      description:
        "Translate complex BIM data, structural schematics, and construction milestone schedules into dynamic 4D visual simulations. Eliminate on-site clash errors, align contractor trades, and present clear progress milestones to project stakeholders.",
      highlights: [
        "4D timeline sequencing to final handover",
        "BIM & MEP clash detection visual overlays",
        "Investor milestone presentations & fly-throughs",
      ],
      image: constructionBimImg,
    },
  ] as ServiceItem[],

  // Three Primary Metrics requested from flyer + extra builder & customer metrics from flyer
  whyCognitiveEdgeMetrics: [
    {
      id: "sales-speed",
      stat: "30%",
      label: "Faster Sales",
      subtext: "Reducing the lead-to-close cycle through instant interactive spatial previews.",
      iconName: "Zap",
      impactCategory: "speed",
    },
    {
      id: "cost-savings",
      stat: "25%",
      label: "Cost Savings",
      subtext: "Increasing operational efficiency by catching design revisions prior to ground-breaking.",
      iconName: "TrendingDown",
      impactCategory: "cost",
    },
    {
      id: "approvals-speed",
      stat: "45%",
      label: "Faster Approvals",
      subtext: "Faster decision making cycles that lead directly to earlier delivery of the project.",
      iconName: "CheckCircle2",
      impactCategory: "approval",
    },
  ] as MetricItem[],

  additionalFlyerMetrics: {
    kpis: [
      {
        stat: "45%",
        label: "Faster Decision Making Cycles",
        desc: "Stakeholders visualize identical parameters simultaneously.",
      },
      {
        stat: "15%",
        label: "Reduction in Revision Time",
        desc: "Instant iterative updates replace weeks of drafting reworks.",
      },
      {
        stat: "Upto 30%",
        label: "Custom Flooring & Finishes",
        desc: "Accurate material visualization reduces waste and change orders.",
      },
    ],
    customerExperience: [
      {
        title: "“TRY BEFORE YOU BUY” Confidence",
        desc: "Increases customer confidence and customer satisfaction by letting buyers step inside their future home.",
      },
      {
        title: "Personalize Spaces with High Certainty",
        desc: "Explore bespoke configurations with zero build risk or speculative costs.",
      },
      {
        title: "Modern Buying Experience",
        desc: "Intuitive interactive touchscreen and headset visualization that captivates prospective buyers.",
      },
    ],
  },

  credentials: {
    heading: "Our Credentials",
    tagline: "Proven Technical Rigor, Industry Standards & Architectural Fidelity",
    description:
      "Every digital twin and virtual reality experience engineered by Cognitive Edge LTD is built on rigorous architectural standards, advanced spatial computing engines, and enterprise security compliance.",
    trustBadges: [
      { label: "BIM & CAD Certified Pipeline", iconName: "Layers" },
      { label: "Unreal Engine 5 & WebXR", iconName: "Cpu" },
      { label: "1:1 Millimeter Scale Precision", iconName: "Ruler" },
      { label: "Strict Enterprise NDA & IP Protection", iconName: "ShieldCheck" },
      { label: "Multi-Platform Headset & Web Delivery", iconName: "MonitorCheck" },
      { label: "Dedicated US-Based Account Lead", iconName: "Award" },
    ],
    pillars: [
      {
        id: "architectural-precision",
        title: "Architectural & BIM Precision",
        category: "Drafting & Schematics",
        badge: "BIM & CAD",
        iconName: "FileCheck",
        description:
          "Seamless integration with industry-standard architectural software, ensuring full dimensional fidelity and structural accuracy.",
        points: [
          "Direct import & synchronization with Autodesk Revit, AutoCAD, IFC, ArchiCAD, and SketchUp",
          "1:1 physical millimeter tolerance to ensure structural and layout compliance before construction",
          "True-to-life solar and daylight studies accurately calculated from geolocated project coordinates",
          "Physically Based Rendering (PBR) matched to authentic manufacturer specifications for materials and finishes",
        ],
        specs: [
          { label: "Geometric Tolerance", value: "1:1 Millimeter Scale" },
          { label: "Supported Formats", value: "Revit, IFC, DWG, FBX, OBJ" },
          { label: "Sun Study Fidelity", value: "GPS-Calibrated Solar Tracking" },
        ],
      },
      {
        id: "spatial-simulation",
        title: "Spatial Simulation & Game Engines",
        category: "Real-Time Computing",
        badge: "Spatial Engine",
        iconName: "Cpu",
        description:
          "Harnessing real-time 3D simulation engines to provide smooth, high-fidelity spatial exploration across headsets, browsers, and mobile devices.",
        points: [
          "Production pipeline utilizing Unreal Engine 5 with dynamic Lumen global illumination and Nanite geometry",
          "Optimized WebGL and WebXR workflows allowing instant browser-based 3D walkthroughs without software installs",
          "Hardware-agnostic deployment optimized for Meta Quest 2/3/Pro, Apple Vision Pro, and PCVR setups",
          "Multi-user synchronized cloud sessions for remote developer, client, and architect walk-throughs",
        ],
        specs: [
          { label: "Core Graphics Engine", value: "Unreal Engine 5 / WebXR" },
          { label: "Rendering Performance", value: "High-FPS Real-Time Immersion" },
          { label: "Display Ecosystem", value: "VR Headset, Mobile AR, 4K Kiosk" },
        ],
      },
      {
        id: "security-ip",
        title: "Security, Compliance & IP Protection",
        category: "Enterprise Trust",
        badge: "IP Safeguard",
        iconName: "ShieldCheck",
        description:
          "Comprehensive confidentiality protocols and secure digital infrastructure protecting your architectural plans and proprietary commercial data.",
        points: [
          "Strict corporate non-disclosure agreements (NDAs) enforced across all project assets and communications",
          "Encrypted cloud repositories and secure transfer protocols (AES-256 / TLS 1.3) for all project deliverables",
          "Granular role-based access control (RBAC) ensuring private stakeholder previews and controlled distribution",
          "100% client intellectual property ownership for all final digital twin files, renders, and interactive assets",
        ],
        specs: [
          { label: "Confidentiality Policy", value: "Mandatory Corporate NDAs" },
          { label: "Asset Ownership", value: "100% Client Intellectual Property" },
          { label: "Cloud Security", value: "AES-256 / TLS 1.3 Encryption" },
        ],
      },
      {
        id: "team-expertise",
        title: "Multi-Disciplinary Team & QA",
        category: "Domain Expertise",
        badge: "Expert Team",
        iconName: "Award",
        description:
          "A multidisciplinary team blending architectural technology, real-time 3D visualization, and real estate pre-sales strategy.",
        points: [
          "Specialized personnel spanning certified 3D spatial artists, architectural computational experts, and VR developers",
          "Proven domain experience supporting general contractors, real estate developers, and design firms nationwide",
          "Multi-tier quality assurance review ensuring architectural alignment and zero artifacting before client sign-off",
          "Direct US Central Time business hours (9a – 5p CST) with dedicated account management and rapid iteration cycles",
        ],
        specs: [
          { label: "Operating Base", value: "United States (Central Time)" },
          { label: "Quality Audit", value: "Multi-Tier Pre-Delivery QA" },
          { label: "Direct Support", value: "Dedicated Project Coordinator" },
        ],
      },
    ],
  },
};
