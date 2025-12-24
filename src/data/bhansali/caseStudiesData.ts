export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  image?: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: 1,
    title: "Splay Marks / Silver Streaks",
    category: "Moulding Defects",
    description: "Understanding and resolving splay marks in injection molded ABS parts.",
    challenge: "Customer experienced silver streaks on the surface of molded parts, affecting aesthetics and quality acceptance. The defect was inconsistent and difficult to reproduce.",
    solution: "Root cause analysis revealed moisture content in material exceeding acceptable limits. Implemented proper drying protocols (80°C for 4 hours) and monitored material handling practices. Also optimized injection speed and barrel temperature profile.",
    result: "Complete elimination of splay marks. Established standard operating procedures for material drying and handling, improving overall production quality by 25%.",
  },
  {
    id: 4,
    title: "Short Shot / Incomplete Fill",
    category: "Moulding Defects",
    description: "Resolving incomplete filling issues in complex automotive components.",
    challenge: "Complex automotive component with thin walls was experiencing short shots in certain areas, leading to high rejection rates of up to 15%.",
    solution: "Conducted mold flow analysis and identified problem areas. Recommended gate relocation and venting improvements. Optimized processing parameters including injection pressure, speed profile, and melt temperature. Suggested grade with higher flow characteristics.",
    result: "Rejection rate reduced from 15% to less than 2%. Cycle time improved by 8% with optimized parameters.",
  },
  {
    id: 5,
    title: "Warpage & Dimensional Issues",
    category: "Moulding Defects",
    description: "Addressing warpage in flat panel components for appliance industry.",
    challenge: "Large flat panels for refrigerator doors were experiencing warpage beyond acceptable tolerances, causing assembly issues.",
    solution: "Analyzed cooling system design and recommended modifications for uniform cooling. Optimized packing pressure and time. Suggested glass-filled grade for improved dimensional stability. Implemented in-mold pressure sensors for process monitoring.",
    result: "Warpage reduced by 60%. Parts now consistently meet dimensional specifications. Production efficiency improved with reduced secondary operations.",
  },
];

export const rdProjects = [
  {
    id: 3,
    title: "High Performance PC-ABS for EV Applications",
    status: "In Progress",
    description: "Developing specialized PC-ABS grades for electric vehicle components with enhanced thermal management properties.",
    timeline: "2024-2025",
  },
  {
    id: 4,
    title: "Recycled Content ABS",
    status: "In Progress",
    description: "Creating ABS grades with post-consumer recycled content while maintaining performance characteristics.",
    timeline: "2024-2025",
  },
  {
    id: 5,
    title: "Bio-based ASA Development",
    status: "Research Phase",
    description: "Exploring bio-based alternatives for ASA production to reduce carbon footprint.",
    timeline: "2025-2026",
  },
  {
    id: 6,
    title: "Antimicrobial ABS",
    status: "Completed",
    description: "Successfully developed antimicrobial ABS grades for healthcare and consumer applications.",
    timeline: "2023-2024",
  },
  {
    id: 7,
    title: "Low VOC Interior Grades",
    status: "Completed",
    description: "Ultra-low emission grades meeting stringent automotive interior requirements.",
    timeline: "2023-2024",
  },
];

export const technologies = [
  {
    title: "Polymerization Technology",
    description: "Advanced emulsion and mass polymerization processes for consistent polymer production.",
    icon: "FlaskConical",
  },
  {
    title: "Compounding Expertise",
    description: "State-of-the-art twin-screw compounding lines for precise material formulation.",
    icon: "Cog",
  },
  {
    title: "Testing & Analysis",
    description: "Comprehensive testing facilities including rheology, thermal analysis, and mechanical testing.",
    icon: "Microscope",
  },
  {
    title: "Application Development",
    description: "Dedicated team for customer application support and problem solving.",
    icon: "Settings",
  },
];
