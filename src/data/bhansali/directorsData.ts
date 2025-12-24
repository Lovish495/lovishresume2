export interface Director {
  id: string;
  name: string;
  designation: string;
  type: "founder" | "executive" | "independent" | "nominee";
  bio: string;
  qualifications?: string[];
  experience?: string;
  image?: string;
  featured?: boolean;
}

export const directorsData: Director[] = [
  {
    id: "founder",
    name: "Late Shri Ghisulal P. Bhansali",
    designation: "Founder",
    type: "founder",
    bio: "Late Shri Ghisulal P. Bhansali was the visionary founder of Bhansali Engineering Polymers Limited. His entrepreneurial spirit and commitment to quality laid the foundation for what would become one of India's leading ABS manufacturers. Under his guidance, the company grew from a modest beginning to a nationally recognized enterprise. His values of integrity, innovation, and customer focus continue to guide the company's operations today.",
    experience: "Pioneer in Indian polymer industry",
    featured: true,
  },
  {
    id: "bpl-bhansali",
    name: "Shri B.P.L. Bhansali",
    designation: "Chairman & Managing Director",
    type: "executive",
    bio: "Shri B.P.L. Bhansali has been instrumental in driving the company's growth strategy and expansion. With extensive experience in the polymer industry, he leads the company's vision for sustainable growth and market leadership.",
    qualifications: ["B.Com", "MBA"],
    experience: "35+ years in polymer industry",
    featured: true,
  },
  {
    id: "rajesh-bhansali",
    name: "Shri Rajesh Bhansali",
    designation: "Joint Managing Director",
    type: "executive",
    bio: "Shri Rajesh Bhansali oversees operations and business development, bringing strategic insights and operational excellence to the company's manufacturing and commercial activities.",
    qualifications: ["B.E. (Chemical)", "MBA"],
    experience: "25+ years in manufacturing",
  },
  {
    id: "independent-1",
    name: "Shri Vijay Kumar Sharma",
    designation: "Independent Director",
    type: "independent",
    bio: "Brings extensive experience in corporate governance and strategic management from various leadership positions in the industry.",
    qualifications: ["CA", "CS"],
    experience: "30+ years in corporate sector",
  },
  {
    id: "independent-2",
    name: "Smt. Rekha Jain",
    designation: "Independent Director",
    type: "independent",
    bio: "An accomplished professional with expertise in finance and compliance, contributing valuable insights to board deliberations.",
    qualifications: ["CA", "LLB"],
    experience: "25+ years in finance",
  },
  {
    id: "nominee",
    name: "Mr. Takeshi Yamamoto",
    designation: "Nominee Director (Nippon A&L)",
    type: "nominee",
    bio: "Represents Nippon A&L Inc., Japan and brings global perspective and technical expertise in ABS manufacturing to the board.",
    qualifications: ["B.Sc. (Chemistry)", "MBA"],
    experience: "20+ years with Nippon A&L",
  },
];

export const managementTeam = [
  {
    name: "Shri B.P.L. Bhansali",
    designation: "Chairman & Managing Director",
  },
  {
    name: "Shri Rajesh Bhansali",
    designation: "Joint Managing Director",
  },
  {
    name: "Shruti Jain",
    designation: "Company Secretary & Compliance Officer",
  },
  {
    name: "Shri Arun Kumar",
    designation: "Chief Financial Officer",
  },
  {
    name: "Shri Prakash Mehta",
    designation: "VP - Manufacturing",
  },
  {
    name: "Dr. Suresh Patil",
    designation: "Head - R&D",
  },
  {
    name: "Shri Ramesh Gupta",
    designation: "VP - Sales & Marketing",
  },
];
