export type CredentialOptionId =
  | "vr-walkthrough"
  | "video-walkthrough"
  | "renders"
  | "brochures";

export interface CredentialOption {
  id: CredentialOptionId;
  label: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  primaryImage: string;
  secondaryImage?: string;
  videoUrl?: string;
  videoUrls?: string[];
  brochureUrl?: string;
  deliverables: {
    title: string;
    description: string;
    format: string;
    resolution: string;
  }[];
}

export const CREDENTIAL_OPTIONS: CredentialOption[] = [
  {
    id: "vr-walkthrough",
    label: "VR Walkthrough",
    tagline: "Interactive 1:1 Scale Immersive Spatial Exploration",
    description:
      "Fully interactive spatial digital twins allowing prospective home buyers, real estate investors, and architects to walk through unbuilt spaces in real-time 3D, customize interior materials on the fly, and experience spatial proportions with true-to-life depth.",
    badge: "Interactive Spatial 3D",
    iconName: "Glasses",
    videoUrl: "https://www.youtube.com/embed/yOveJiPjfQ4",
    primaryImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "1:1 scale millimeter blueprint accuracy verified against architectural CAD/BIM drawings",
      "Interactive material and finishes switcher (flooring, cabinetry, countertops, wall finishes)",
      "Zero-install WebXR browser streaming alongside native Meta Quest & Apple Vision Pro support",
      "Multi-user synchronized cloud walkthroughs for remote client and architect design reviews",
      "Integrated spatial measurement tape tool and architectural daylight simulation",
    ],
    specs: [
      { label: "Hardware Support", value: "Meta Quest 2/3/Pro, Apple Vision Pro, PCVR" },
      { label: "Web Streaming", value: "Zero-install WebGL & WebXR 60+ FPS" },
      { label: "Interactive Tools", value: "Material Switcher, Tape Measure, Hotspots" },
      { label: "Collaboration", value: "Multi-user Voice & Cursor Sync" },
    ],
    deliverables: [
      {
        title: "Standalone WebXR Interactive Walkthrough",
        description: "Cloud-hosted 3D tour accessible on any modern web browser or tablet without software installation.",
        format: "WebXR / WebGL Cloud URL",
        resolution: "Native Display (Up to 4K)",
      },
      {
        title: "Meta Quest & Vision Pro Native Applet",
        description: "Compiled headset package for immersive sales center kiosks and showroom presentations.",
        format: "Android APK / VisionOS Package",
        resolution: "Stereoscopic 90 FPS",
      },
      {
        title: "Kiosk Touchscreen Build",
        description: "Large-format interactive touchscreen application designed for pre-sales design galleries.",
        format: "Windows / macOS Executable",
        resolution: "3840 x 2160 UHD",
      },
    ],
  },
  {
    id: "video-walkthrough",
    label: "Video Walkthrough",
    tagline: "Cinematic 4K Architectural Fly-Throughs & Video Tours",
    description:
      "Studio-grade 4K architectural fly-throughs, interior walkthroughs, and marketing showreels featuring dynamic camera choreography, physically accurate natural lighting, custom ambient audio, and dimension callouts.",
    badge: "Cinematic 4K UHD",
    iconName: "Video",
    videoUrl: "https://www.youtube.com/embed/IGGbHCslId0",
    videoUrls: [
      "https://www.youtube.com/embed/IGGbHCslId0",
      "https://www.youtube.com/embed/dclbhoDgKdY",
    ],
    primaryImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Smooth cinematic camera trajectories engineered by architectural visualization directors",
      "Physically accurate solar path and time-of-day illumination (Sunrise, Midday, Golden Hour, Twilight)",
      "High-end motion graphic overlays highlighting room dimensions, premium finishes, and floor plans",
      "Dolby-calibrated ambient spatial soundscapes and royalty-free marketing music track licensing",
      "Multi-format delivery tailored for YouTube 4K, MLS listings, website hero backgrounds, and Instagram/TikTok Reels",
    ],
    specs: [
      { label: "Resolution", value: "4K UHD (3840 x 2160) & 1080p FHD" },
      { label: "Frame Rate", value: "60 FPS Smooth Architectural Pan" },
      { label: "Color Grading", value: "HDR10 & Rec. 709 Mastered" },
      { label: "Aspect Ratios", value: "16:9 Landscape & 9:16 Vertical Reel" },
    ],
    deliverables: [
      {
        title: "Full-Length 4K Architectural Feature Tour",
        description: "Comprehensive 2 to 3-minute video tour covering exterior facade, entry, living areas, and master suites.",
        format: "ProRes 422 & H.265 MP4",
        resolution: "3840 x 2160 (4K 60fps)",
      },
      {
        title: "Social Media Teaser Cutdowns",
        description: "Fast-paced 15-second and 30-second vertical reels optimized for Instagram, TikTok, and YouTube Shorts.",
        format: "Vertical 9:16 MP4",
        resolution: "1080 x 1920 (FHD)",
      },
      {
        title: "Seamless Looping Website Hero Clip",
        description: "Distraction-free ambient looping background video optimized for landing page visual impact.",
        format: "WebM & MP4 Web-Optimized",
        resolution: "1920 x 1080 (Lightweight)",
      },
    ],
  },
  {
    id: "renders",
    label: "3D Renders",
    tagline: "Sub-Millimeter Photorealistic Interior & Exterior 3D Visualizations",
    description:
      "High-resolution architectural still renderings crafted with physically based materials (PBR), precise ray-tracing, authentic furniture placement, and true manufacturer specifications to market properties before groundbreaking.",
    badge: "Ultra-High Resolution 8K",
    iconName: "Image",
    primaryImage:
      "https://lh3.googleusercontent.com/d/1UedSm-xJlTffPnZBI7aart40ioi7mEbW",
    secondaryImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Ultra-photorealistic daylighting and artificial lighting simulation matching actual fixtures",
      "Accurate material textures: Italian porcelain tile, engineered hardwood grain, marble veining, and metal patinas",
      "Multi-angle coverage: wide-angle room perspectives, architectural vignettes, and drone aerial elevations",
      "Full compliance with MLS, LoopNet, Zillow, and print advertising dimensional standards",
      "Optional day-to-night lighting variants showcasing sunset and interior evening ambiance",
    ],
    specs: [
      { label: "Master Resolution", value: "Up to 8K (7680 x 4320)" },
      { label: "Render Engine", value: "Unreal Engine 5 Lumen / Path Tracer" },
      { label: "Material Accuracy", value: "Manufacturer PBR Calibrated" },
      { label: "File Formats", value: "Lossless TIFF, PNG & Web-ready JPEG" },
    ],
    deliverables: [
      {
        title: "Hero Exterior Perspective (Day & Twilight)",
        description: "Front elevation, outdoor living terrace, and architectural landscape lighting renders.",
        format: "Lossless TIFF / PNG",
        resolution: "Up to 8192 x 4608 (8K)",
      },
      {
        title: "Interior Key Living Spaces Suite",
        description: "Open-concept living room, designer kitchen, primary bedroom, and spa-inspired ensuite bathroom.",
        format: "High-Res JPEG / TIFF",
        resolution: "6000 x 3375 (300 DPI)",
      },
      {
        title: "Material & Detail Architectural Vignettes",
        description: "Close-up hero shots highlighting custom cabinetry, stone slab edges, and bespoke hardware.",
        format: "High-Res JPEG / PNG",
        resolution: "4000 x 4000 (Square / 1:1)",
      },
    ],
  },
  {
    id: "brochures",
    label: "Brochures",
    tagline: "Marketing Collateral, Floor Plan Sheets & Investor Presentation Decks",
    description:
      "Complete print-ready and digital marketing brochures, floor plan specification sheets, investor pitch decks, and custom finish schedules compiled directly from your digital twin models.",
    badge: "Print & Digital Ready",
    iconName: "FileSpreadsheet",
    brochureUrl: "https://drive.google.com/file/d/1VyImKdDRYw6X-IWGyf745ByxKt5vEoja/preview",
    primaryImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Custom branded layouts featuring developer/brokerage logos, color palettes, and typography",
      "Accurate 2D/3D colored floor plan schematics with dimension callouts and square footage breakdown",
      "Builder spec sheets with comprehensive finish palettes, appliance schedules, and electrical layouts",
      "Interactive digital PDF with clickable jump links, embedded video links, and VR tour QR codes",
      "Pre-flighted CMYK print-ready files formatted with bleeds and crop marks for commercial printing",
    ],
    specs: [
      { label: "Page Formats", value: "US Letter, Tabloid 11x17, A4, Custom Gatefold" },
      { label: "Color Space", value: "CMYK (Commercial Print) & sRGB (Digital)" },
      { label: "Digital Interactivity", value: "Embedded QR Codes & Clickable URLs" },
      { label: "Turnaround", value: "Bundled alongside 3D render delivery" },
    ],
    deliverables: [
      {
        title: "Multi-Page Project Marketing Brochure",
        description: "8 to 16-page high-end booklet detailing property vision, neighborhood context, floor plans, and renders.",
        format: "Interactive PDF & Print PDF",
        resolution: "300 DPI Print Ready",
      },
      {
        title: "Individual Floor Plan One-Sheets",
        description: "Clean single-page floor plan handouts with room dimensions, key features, and unit elevations.",
        format: "PDF & Web-ready PNG",
        resolution: "Standard US Letter",
      },
      {
        title: "Finishes & Selections Catalog",
        description: "Curated guide displaying flooring options, cabinetry styles, fixtures, and buyer upgrade packages.",
        format: "Digital PDF & InDesign Package",
        resolution: "High-Res Vector + Raster",
      },
    ],
  },
];

export interface RenderGalleryItem {
  id: string;
  title: string;
  category: "Exterior Architecture" | "Interior Design" | "Amenities & Clubhouse";
  section: "credentials" | "renders";
  tag: string;
  badge: string;
  description: string;
  imageUrl: string;
  altText: string;
}

export const CREDENTIAL_RENDER_GALLERY: RenderGalleryItem[] = [
  {
    id: "tower-front",
    title: "Residential Tower Front Elevation",
    category: "Exterior Architecture",
    section: "credentials",
    tag: "High-Rise Elevation",
    badge: "Architectural Still",
    description: "Tower arrival facade, structural glass curtain walls, and architectural canopy design.",
    imageUrl: "https://lh3.googleusercontent.com/d/12tw_cXGyOJlaEu_cvi-4IG3N6flJ797j",
    altText: "Residential tower front elevation 3D architectural render",
  },
  {
    id: "rowhouse",
    title: "Luxury Rowhouse & Streetscape",
    category: "Exterior Architecture",
    section: "credentials",
    tag: "Townhome Masterplan",
    badge: "Exterior 3D",
    description: "Contemporary townhome row facade displaying calibrated brickwork, fenestration, and landscaping.",
    imageUrl: "https://lh3.googleusercontent.com/d/1An5yYD5IS86pGtHKfuci6pk8IcjReuF1",
    altText: "Luxury rowhouse exterior elevation 3D architectural render",
  },
  {
    id: "club-entrance",
    title: "Clubhouse Grand Entrance & Canopy",
    category: "Amenities & Clubhouse",
    section: "credentials",
    tag: "Hospitality Architecture",
    badge: "Clubhouse Elevation",
    description: "Grand entrance porte-cochère with warm architectural uplighting and welcoming interior visibility.",
    imageUrl: "https://lh3.googleusercontent.com/d/1eeRJ6O62nwsc65VW1KGTmck6KvID7To0",
    altText: "Clubhouse grand entrance architectural rendering",
  },
  {
    id: "club-swimming-pool",
    title: "Resort-Style Swimming Pool & Deck",
    category: "Amenities & Clubhouse",
    section: "credentials",
    tag: "Resort Amenity",
    badge: "Landscape & Pool",
    description: "Expansive resort pool visualization with in-water loungers and surrounding tropical landscape.",
    imageUrl: "https://lh3.googleusercontent.com/d/1XKjcROd4JmYVE88xi2GzqOKnNBbgs2he",
    altText: "Club resort swimming pool deck 3D visualization",
  },
  {
    id: "club-back-pool",
    title: "Poolside Terrace & Sun Loungers",
    category: "Amenities & Clubhouse",
    section: "credentials",
    tag: "Outdoor Living",
    badge: "Waterscape 3D",
    description: "Serene poolside cabana and reflection pool setting with realistic water refractions and surface caustics.",
    imageUrl: "https://lh3.googleusercontent.com/d/1h1v3B7js5VqNUE4jUTlnDdTpqAYhfDdS",
    altText: "Club back pool and outdoor lounge 3D architectural render",
  },
  {
    id: "club-museum-opening",
    title: "Cultural Pavilion & Museum Atrium",
    category: "Amenities & Clubhouse",
    section: "credentials",
    tag: "Civic Architecture",
    badge: "Exhibition Atrium",
    description: "Volumetric double-height atrium with architectural skylights and curated exhibition zones.",
    imageUrl: "https://lh3.googleusercontent.com/d/1AthBUKMwy7UbaIs5JsQ0jxqpk9tdBc_b",
    altText: "Club museum opening and cultural gallery 3D architectural rendering",
  },
  {
    id: "living-room",
    title: "Open-Concept Living Suite",
    category: "Interior Design",
    section: "renders",
    tag: "Residential Interior",
    badge: "8K Interior Ray-Trace",
    description: "Photorealistic living space featuring designer sectional furnishings, cove lighting, and natural daylight.",
    imageUrl: "https://lh3.googleusercontent.com/d/1rLjibMUZoVq1uiUFJ9rpFsE_TZD8C39k",
    altText: "Photorealistic modern living room interior 3D render",
  },
  {
    id: "dining-room",
    title: "Contemporary Dining & Entertaining",
    category: "Interior Design",
    section: "renders",
    tag: "Spatial Styling",
    badge: "Material Precision",
    description: "Bespoke dining suite rendering with physical marble tabletop reflection and sculptural chandelier illumination.",
    imageUrl: "https://lh3.googleusercontent.com/d/1qeOvIPKXEV_azgzChS-nOotOCOVT2hSi",
    altText: "Contemporary dining area interior visualization",
  },
  {
    id: "sitout-terrace",
    title: "Covered Alfresco Sitout & Patio",
    category: "Interior Design",
    section: "renders",
    tag: "Terrace Architecture",
    badge: "Indoor-Outdoor",
    description: "Indoor-outdoor lounge vignette highlighting weather-resistant materials, slatted screens, and cozy evening lighting.",
    imageUrl: "https://lh3.googleusercontent.com/d/1rLRxokl7FUUSWSLPyrvN7MiJ7UIzt66P",
    altText: "Covered patio and outdoor sitout 3D architectural visualization",
  },
];

