export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
}

export const jobsData: Job[] = [
  {
    id: "job-001",
    title: "DGM Accounts & Finance",
    department: "Finance",
    location: "Mumbai",
    type: "Full-time",
    experience: "15+ years",
    postedDate: "2024-12-15",
    description: "We are looking for an experienced DGM Accounts & Finance to lead our financial operations and strategic planning.",
    responsibilities: [
      "Lead financial planning and analysis",
      "Oversee accounting operations and reporting",
      "Manage treasury and working capital",
      "Ensure compliance with statutory requirements",
      "Support strategic decision-making with financial insights",
    ],
    requirements: [
      "CA/CMA with 15+ years of experience",
      "Experience in manufacturing industry preferred",
      "Strong leadership and team management skills",
      "Excellent knowledge of Indian accounting standards",
    ],
    qualifications: ["CA", "CMA", "MBA Finance"],
  },
  {
    id: "job-002",
    title: "Deputy Manager – Electrical",
    department: "Engineering",
    location: "Abu Road Plant",
    type: "Full-time",
    experience: "8-12 years",
    postedDate: "2024-12-10",
    description: "Seeking a Deputy Manager to oversee electrical maintenance and projects at our Abu Road manufacturing facility.",
    responsibilities: [
      "Manage electrical maintenance operations",
      "Plan and execute electrical projects",
      "Ensure safety compliance",
      "Lead team of electrical technicians",
      "Optimize energy consumption",
    ],
    requirements: [
      "B.E./B.Tech in Electrical Engineering",
      "8-12 years of experience in manufacturing",
      "Knowledge of PLC, SCADA systems",
      "Experience with HT/LT systems",
    ],
    qualifications: ["B.E. Electrical", "B.Tech Electrical"],
  },
  {
    id: "job-003",
    title: "Deputy Manager – Project",
    department: "Projects",
    location: "Satnoor Plant",
    type: "Full-time",
    experience: "8-12 years",
    postedDate: "2024-12-08",
    description: "Looking for a project manager to handle capital projects and plant expansion activities.",
    responsibilities: [
      "Plan and execute capital projects",
      "Coordinate with contractors and vendors",
      "Manage project budgets and timelines",
      "Ensure quality and safety standards",
      "Report project progress to management",
    ],
    requirements: [
      "B.E./B.Tech in Mechanical/Chemical Engineering",
      "8-12 years of project management experience",
      "PMP certification preferred",
      "Experience in chemical/polymer industry",
    ],
    qualifications: ["B.E. Mechanical", "B.E. Chemical", "PMP"],
  },
  {
    id: "job-004",
    title: "Sr. Executive / Asst. Manager Marketing",
    department: "Marketing",
    location: "Mumbai",
    type: "Full-time",
    experience: "5-8 years",
    postedDate: "2024-12-05",
    description: "Join our marketing team to drive brand visibility and customer engagement in the polymer industry.",
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage digital marketing campaigns",
      "Coordinate trade shows and exhibitions",
      "Create marketing collaterals",
      "Analyze market trends and competition",
    ],
    requirements: [
      "MBA in Marketing",
      "5-8 years of B2B marketing experience",
      "Experience in chemical/manufacturing industry",
      "Strong digital marketing skills",
    ],
    qualifications: ["MBA Marketing", "PGDM Marketing"],
  },
  {
    id: "job-005",
    title: "Dy Manager / Manager – Material Planning & Scheduling",
    department: "Supply Chain",
    location: "Satnoor Plant",
    type: "Full-time",
    experience: "10-15 years",
    postedDate: "2024-12-01",
    description: "Lead material planning and production scheduling to optimize manufacturing operations.",
    responsibilities: [
      "Develop material requirement plans",
      "Optimize inventory levels",
      "Coordinate with production and procurement",
      "Implement lean manufacturing practices",
      "Manage ERP system for planning",
    ],
    requirements: [
      "B.E./B.Tech with MBA preferred",
      "10-15 years of experience in planning",
      "Strong SAP/ERP knowledge",
      "Experience in continuous process industry",
    ],
    qualifications: ["B.E.", "MBA Operations"],
  },
  {
    id: "job-006",
    title: "Production Engineer",
    department: "Production",
    location: "Abu Road Plant",
    type: "Full-time",
    experience: "3-5 years",
    postedDate: "2024-11-28",
    description: "Production Engineer role for our polymer manufacturing operations.",
    responsibilities: [
      "Monitor and optimize production processes",
      "Ensure quality and safety standards",
      "Troubleshoot production issues",
      "Implement process improvements",
      "Maintain production records",
    ],
    requirements: [
      "B.E./B.Tech in Chemical/Polymer Engineering",
      "3-5 years of experience in polymer manufacturing",
      "Knowledge of extrusion and compounding",
      "Strong analytical skills",
    ],
    qualifications: ["B.E. Chemical", "B.Tech Polymer"],
  },
  {
    id: "job-007",
    title: "Quality Control Executive",
    department: "Quality",
    location: "Satnoor Plant",
    type: "Full-time",
    experience: "2-4 years",
    postedDate: "2024-11-25",
    description: "QC Executive for testing and quality assurance of polymer products.",
    responsibilities: [
      "Conduct physical and chemical tests",
      "Maintain testing equipment",
      "Prepare quality reports",
      "Implement quality procedures",
      "Handle customer complaints",
    ],
    requirements: [
      "B.Sc./M.Sc. in Chemistry or Polymer Science",
      "2-4 years of experience in polymer testing",
      "Knowledge of ASTM/ISO testing methods",
      "Good documentation skills",
    ],
    qualifications: ["B.Sc. Chemistry", "M.Sc. Polymer Science"],
  },
  {
    id: "job-008",
    title: "R&D Scientist",
    department: "Research & Development",
    location: "Satnoor Plant",
    type: "Full-time",
    experience: "5-8 years",
    postedDate: "2024-11-20",
    description: "R&D Scientist to develop new polymer grades and applications.",
    responsibilities: [
      "Develop new polymer formulations",
      "Conduct pilot plant trials",
      "Collaborate with customers on custom solutions",
      "Write technical papers and patents",
      "Support technical sales activities",
    ],
    requirements: [
      "Ph.D./M.Tech in Polymer Science",
      "5-8 years of R&D experience",
      "Experience with ABS/PC-ABS preferred",
      "Strong publication record",
    ],
    qualifications: ["Ph.D. Polymer Science", "M.Tech Polymer Engineering"],
  },
];

export const departments = [
  "All Departments",
  "Finance",
  "Engineering",
  "Projects",
  "Marketing",
  "Supply Chain",
  "Production",
  "Quality",
  "Research & Development",
  "HR",
  "IT",
];

export const locations = [
  "All Locations",
  "Mumbai",
  "Satnoor Plant",
  "Abu Road Plant",
];

export const careerHighlights = [
  {
    icon: "GraduationCap",
    title: "Learn",
    description: "Continuous learning opportunities with training programs and skill development initiatives.",
  },
  {
    icon: "Users",
    title: "Lead",
    description: "Take ownership and lead projects that make a real impact on the business.",
  },
  {
    icon: "Lightbulb",
    title: "Innovate",
    description: "Be part of cutting-edge R&D and contribute to product innovation.",
  },
];
