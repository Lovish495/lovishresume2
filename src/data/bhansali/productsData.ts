export interface ProductGrade {
  name: string;
  description: string;
  applications: string[];
  properties?: string[];
  mfi?: string;
  izod?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  fullName: string;
  description: string;
  image: string;
  features: string[];
  grades: ProductGrade[];
  applications: string[];
}

export const productsData: ProductCategory[] = [
  {
    id: "ABS",
    name: "ABS",
    fullName: "Acrylonitrile Butadiene Styrene",
    description: "ABS is a terpolymer made by polymerizing styrene and acrylonitrile in the presence of polybutadiene. It combines the strength and rigidity of acrylonitrile and styrene polymers with the toughness of polybutadiene rubber.",
    image: "/products/abs.jpg",
    features: [
      "High Impact Strength",
      "Excellent Surface Finish",
      "Good Chemical Resistance",
      "Easy Processing",
      "Dimensional Stability",
      "Heat Resistance Options",
    ],
    grades: [
      {
        name: "High Impact ABS",
        description: "Designed for applications requiring superior impact resistance and toughness.",
        applications: ["Automotive parts", "Electronic housings", "Power tools"],
        properties: ["High impact strength", "Good flow", "Excellent surface finish"],
      },
      {
        name: "Paintable/Electroplatable ABS",
        description: "Specially formulated for excellent paint and chrome adhesion.",
        applications: ["Automotive trim", "Consumer electronics", "Bathroom fittings"],
        properties: ["Superior adhesion", "Smooth surface", "Consistent plating"],
      },
      {
        name: "Extrusion Grade ABS",
        description: "Optimized for sheet and profile extrusion applications.",
        applications: ["Refrigerator liners", "Automotive interior", "Luggage shells"],
        properties: ["Excellent melt strength", "Good thermoforming", "Uniform thickness"],
      },
      {
        name: "Heat Resistant ABS",
        description: "Enhanced thermal properties for high-temperature applications.",
        applications: ["Under-hood parts", "Electrical components", "Appliance parts"],
        properties: ["High HDT", "Thermal stability", "Retained impact at elevated temperatures"],
      },
      {
        name: "Flame Retardant ABS",
        description: "UL94 rated materials for applications requiring fire safety.",
        applications: ["TV housings", "Electrical enclosures", "Office equipment"],
        properties: ["V-0 rated", "Low smoke", "Non-dripping"],
      },
      {
        name: "General Purpose ABS",
        description: "Balanced properties for a wide range of applications.",
        applications: ["Toys", "Household items", "General molding"],
        properties: ["Good balance of properties", "Easy processing", "Cost effective"],
      },
    ],
    applications: ["Automotive", "Electronics", "Appliances", "Consumer Goods"],
  },
  {
    id: "ASA",
    name: "ASA",
    fullName: "Acrylonitrile Styrene Acrylate",
    description: "ASA is a specialty polymer with excellent weatherability and UV resistance. It maintains its color and properties even after prolonged outdoor exposure, making it ideal for exterior applications.",
    image: "/products/asa.jpg",
    features: [
      "Outstanding UV Resistance",
      "Excellent Weatherability",
      "Color Stability",
      "Impact Resistance",
      "Chemical Resistance",
      "Thermal Stability",
    ],
    grades: [
      {
        name: "UA-1300 General Purpose",
        description: "Standard ASA grade with balanced properties for general outdoor applications.",
        applications: ["Outdoor furniture", "Garden equipment", "Building materials"],
        properties: ["Good weatherability", "Balanced impact", "Easy processing"],
      },
      {
        name: "UA-1800 Heat Resistant",
        description: "Enhanced heat resistance for demanding outdoor applications.",
        applications: ["Automotive exterior", "Solar equipment", "Outdoor lighting"],
        properties: ["High HDT", "Excellent weathering", "Retained impact"],
      },
      {
        name: "UA-1200 Direct Metalizing",
        description: "Specially formulated for direct metalizing without base coat.",
        applications: ["Automotive grilles", "Decorative trim", "Outdoor fixtures"],
        properties: ["Superior adhesion", "Weather resistant finish", "Chrome-like appearance"],
      },
    ],
    applications: ["Automotive Exterior", "Building & Construction", "Outdoor Furniture", "Sports Equipment"],
  },
  {
    id: "PC-ABS",
    name: "PC-ABS",
    fullName: "Polycarbonate Acrylonitrile Butadiene Styrene",
    description: "PC-ABS blends combine the excellent heat resistance and impact strength of polycarbonate with the processability and chemical resistance of ABS, offering superior performance for demanding applications.",
    image: "/products/pc-abs.jpg",
    features: [
      "High Heat Resistance",
      "Superior Impact Strength",
      "Excellent Dimensional Stability",
      "Good Chemical Resistance",
      "Easy Processing",
      "Wide Operating Temperature",
    ],
    grades: [
      {
        name: "High Heat Resistant PC-ABS",
        description: "Premium grade for applications requiring elevated thermal performance.",
        applications: ["Dashboard components", "Engine covers", "Under-hood parts"],
        properties: ["HDT > 110°C", "High impact", "Excellent flow"],
      },
      {
        name: "High Impact PC-ABS",
        description: "Enhanced impact resistance for safety-critical applications.",
        applications: ["Airbag covers", "Door panels", "Safety components"],
        properties: ["Superior toughness", "Good aesthetics", "Consistent performance"],
      },
      {
        name: "Direct Metalizing PC-ABS",
        description: "Optimized for chrome plating and metalizing applications.",
        applications: ["Door handles", "Wheel caps", "Decorative bezels"],
        properties: ["Excellent adhesion", "Uniform plating", "Durability"],
      },
      {
        name: "Automotive Interior PC-ABS",
        description: "Low emission grade for automotive interior applications.",
        applications: ["Center fascia", "Instrument panels", "Console parts"],
        properties: ["Low VOC", "Scratch resistance", "UV stable"],
      },
    ],
    applications: ["Automotive Interior", "Automotive Exterior", "Electronics", "Industrial"],
  },
  {
    id: "Specialities",
    name: "Specialities",
    fullName: "Specialty & Custom Compounds",
    description: "Our specialty products range includes unique aesthetic and functional grades designed for specific applications requiring distinctive visual effects or enhanced performance characteristics.",
    image: "/products/specialties.jpg",
    features: [
      "Unique Visual Effects",
      "Custom Formulations",
      "Enhanced Properties",
      "Application-Specific Solutions",
      "Premium Aesthetics",
      "Technical Support",
    ],
    grades: [
      {
        name: "Metallic Effect Grades",
        description: "Premium metallic appearance without secondary operations.",
        applications: ["Consumer electronics", "Automotive trim", "Premium packaging"],
        properties: ["Metallic luster", "Scratch resistance", "Color consistency"],
      },
      {
        name: "Pearl Effect Grades",
        description: "Unique pearlescent appearance with depth and shimmer.",
        applications: ["Cosmetic packaging", "Consumer products", "Decorative items"],
        properties: ["Iridescent effect", "High gloss", "Color shift"],
      },
      {
        name: "Low Gloss / Matte Grades",
        description: "Controlled low gloss surface for premium matte finish.",
        applications: ["Automotive interior", "Electronics", "Appliances"],
        properties: ["Uniform matte finish", "Anti-fingerprint", "Scratch hiding"],
      },
      {
        name: "High Gloss Grades",
        description: "Piano black and high gloss finishes without painting.",
        applications: ["TV bezels", "Premium appliances", "Automotive interior"],
        properties: ["Mirror-like finish", "Scratch resistance", "UV stable"],
      },
      {
        name: "ABS/PMMA Alloys",
        description: "Enhanced surface quality and scratch resistance.",
        applications: ["Display covers", "Cosmetic cases", "Premium housings"],
        properties: ["Superior clarity", "Scratch resistance", "Chemical resistance"],
      },
      {
        name: "ASA/PMMA Alloys",
        description: "Weather resistant with enhanced aesthetics.",
        applications: ["Outdoor signage", "Automotive exterior", "Sports equipment"],
        properties: ["Weatherability", "Surface quality", "Color retention"],
      },
    ],
    applications: ["Automotive", "Consumer Electronics", "Cosmetics", "Premium Consumer Goods"],
  },
  {
    id: "SAN",
    name: "SAN",
    fullName: "Styrene Acrylonitrile",
    description: "SAN is a transparent copolymer offering excellent clarity, chemical resistance, and rigidity. It is ideal for applications requiring transparency with good mechanical properties.",
    image: "/products/san.jpg",
    features: [
      "Crystal Clear Transparency",
      "High Rigidity",
      "Chemical Resistance",
      "Good Thermal Stability",
      "Easy Processing",
      "Food Contact Approved",
    ],
    grades: [
      {
        name: "General Purpose SAN",
        description: "Standard transparent grade for general applications.",
        applications: ["Kitchenware", "Cosmetic packaging", "Display items"],
        properties: ["High clarity", "Good stiffness", "Easy molding"],
      },
      {
        name: "High Flow SAN",
        description: "Enhanced flow for thin-wall and complex parts.",
        applications: ["Disposable items", "Packaging", "Thin-wall containers"],
        properties: ["Excellent flow", "Fast cycling", "Good transparency"],
      },
    ],
    applications: ["Packaging", "Housewares", "Cosmetics", "Medical Devices"],
  },
];

export const productFinderData = [
  // ABS Grades
  { code: "ABS-HI-100", name: "High Impact ABS", category: "ABS", type: "High Impact", mfi: "18", applications: "Automotive, Electronics" },
  { code: "ABS-HI-200", name: "High Impact ABS (High Flow)", category: "ABS", type: "High Impact", mfi: "25", applications: "Complex parts, Thin wall" },
  { code: "ABS-PE-100", name: "Plating Grade ABS", category: "ABS", type: "Paintable/Electroplatable", mfi: "20", applications: "Chrome plating, Automotive trim" },
  { code: "ABS-EX-100", name: "Extrusion ABS", category: "ABS", type: "Extrusion", mfi: "3", applications: "Sheets, Profiles" },
  { code: "ABS-HR-100", name: "Heat Resistant ABS", category: "ABS", type: "Heat Resistant", mfi: "15", applications: "Under-hood, Appliances" },
  { code: "ABS-FR-100", name: "Flame Retardant ABS (V-0)", category: "ABS", type: "Flame Retardant", mfi: "22", applications: "Electronics, Enclosures" },
  { code: "ABS-GP-100", name: "General Purpose ABS", category: "ABS", type: "General Purpose", mfi: "20", applications: "General molding" },
  // ASA Grades
  { code: "ASA-1300", name: "UA-1300 General Purpose", category: "ASA", type: "General Purpose", mfi: "12", applications: "Outdoor, Building" },
  { code: "ASA-1800", name: "UA-1800 Heat Resistant", category: "ASA", type: "Heat Resistant", mfi: "10", applications: "Automotive exterior" },
  { code: "ASA-1200", name: "UA-1200 Direct Metalizing", category: "ASA", type: "Direct Metalizing", mfi: "15", applications: "Chrome parts" },
  // PC-ABS Grades
  { code: "PCABS-HH-100", name: "High Heat PC-ABS", category: "PC-ABS", type: "High Heat Resistant", mfi: "12", applications: "Dashboard, Engine parts" },
  { code: "PCABS-HI-100", name: "High Impact PC-ABS", category: "PC-ABS", type: "High Impact", mfi: "15", applications: "Safety parts" },
  { code: "PCABS-DM-100", name: "Direct Metalizing PC-ABS", category: "PC-ABS", type: "Direct Metalizing", mfi: "18", applications: "Wheel caps, Handles" },
  // Speciality Grades
  { code: "SPL-MET-100", name: "Metallic Silver ABS", category: "Specialities", type: "Metallic", mfi: "20", applications: "Premium parts" },
  { code: "SPL-PRL-100", name: "Pearl White ABS", category: "Specialities", type: "Pearl", mfi: "18", applications: "Cosmetics, Consumer" },
  { code: "SPL-LG-100", name: "Low Gloss ABS", category: "Specialities", type: "Low Gloss", mfi: "22", applications: "Automotive interior" },
];

export const applicationCategories = [
  {
    id: "appliances",
    name: "Appliances",
    description: "Engineering polymers for home and commercial appliances",
    applications: [
      { name: "Refrigerator Components", products: ["ABS", "ASA"] },
      { name: "Washing Machine Parts", products: ["ABS", "PC-ABS"] },
      { name: "Air Conditioner Components", products: ["ABS", "ASA"] },
      { name: "Kitchen Appliances", products: ["ABS", "SAN"] },
      { name: "Vacuum Cleaner Parts", products: ["ABS"] },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "High-performance solutions for automotive industry",
    applications: [
      { name: "Dashboard Components", products: ["PC-ABS", "ABS"] },
      { name: "Door Panels & Trim", products: ["ABS", "PC-ABS"] },
      { name: "Grilles & Bezels", products: ["ASA", "PC-ABS"] },
      { name: "Wheel Caps", products: ["PC-ABS"] },
      { name: "Mirror Housings", products: ["ASA"] },
      { name: "Exterior Trim", products: ["ASA", "ABS"] },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Materials for electronic and electrical applications",
    applications: [
      { name: "TV Housings", products: ["ABS", "PC-ABS"] },
      { name: "Computer Peripherals", products: ["ABS"] },
      { name: "Mobile Phone Parts", products: ["PC-ABS"] },
      { name: "Power Tool Housings", products: ["ABS", "PC-ABS"] },
    ],
  },
];
