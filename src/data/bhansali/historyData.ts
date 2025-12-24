export interface Milestone {
  year: number;
  title: string;
  description: string;
  highlight?: boolean;
}

export const historyData: Milestone[] = [
  {
    year: 1984,
    title: "Company Incorporated",
    description: "Bhansali Engineering Polymers Limited was incorporated with a vision to manufacture world-class engineering polymers.",
    highlight: true,
  },
  {
    year: 1989,
    title: "Commercial Production Begins",
    description: "Started commercial production of ABS Resins at Satnoor Plant, Chhindwara, Madhya Pradesh.",
    highlight: true,
  },
  {
    year: 1993,
    title: "First Exports",
    description: "Commenced exports to international markets, marking the beginning of global presence.",
  },
  {
    year: 1996,
    title: "Capacity Expansion",
    description: "First major capacity expansion at Satnoor plant to meet growing domestic demand.",
  },
  {
    year: 1999,
    title: "ISO 9001 Certification",
    description: "Achieved ISO 9001 certification, demonstrating commitment to quality management systems.",
    highlight: true,
  },
  {
    year: 2002,
    title: "New Product Lines",
    description: "Introduced ASA and specialty grades to diversify product portfolio.",
  },
  {
    year: 2005,
    title: "Abu Road Plant",
    description: "Commissioned second manufacturing facility at Abu Road, Rajasthan to expand production capacity.",
    highlight: true,
  },
  {
    year: 2008,
    title: "JV with Nippon A&L",
    description: "Entered into Joint Venture with Nippon A&L Inc., Japan for technology collaboration.",
    highlight: true,
  },
  {
    year: 2010,
    title: "PC-ABS Launch",
    description: "Launched PC-ABS grades for automotive applications, expanding into high-performance segment.",
  },
  {
    year: 2012,
    title: "R&D Center Inauguration",
    description: "Established state-of-the-art R&D center for product development and innovation.",
    highlight: true,
  },
  {
    year: 2014,
    title: "IATF 16949 Certification",
    description: "Achieved IATF 16949 certification for automotive quality management system.",
  },
  {
    year: 2016,
    title: "Capacity Enhancement",
    description: "Major capacity enhancement project completed, doubling production capabilities.",
  },
  {
    year: 2017,
    title: "Specialty Products Division",
    description: "Launched dedicated Specialty Products Division for customized solutions.",
  },
  {
    year: 2018,
    title: "Environmental Certification",
    description: "Achieved ISO 14001:2015 certification for environmental management system.",
  },
  {
    year: 2019,
    title: "Digital Transformation",
    description: "Initiated digital transformation journey with ERP implementation and process automation.",
    highlight: true,
  },
  {
    year: 2021,
    title: "Sustainability Initiatives",
    description: "Launched comprehensive sustainability program focusing on renewable energy and waste reduction.",
  },
  {
    year: 2023,
    title: "Global Expansion",
    description: "Expanded exports to over 25 countries, strengthening global market presence.",
    highlight: true,
  },
  {
    year: 2024,
    title: "40 Years of Excellence",
    description: "Celebrating four decades of manufacturing excellence and customer trust.",
    highlight: true,
  },
];

export const growthHighlights = [
  {
    title: "Manufacturing Excellence",
    description: "Two state-of-the-art manufacturing plants equipped with latest technology and automated systems.",
    icon: "Factory",
  },
  {
    title: "Technology Partnership",
    description: "Strategic JV with Nippon A&L Inc., Japan brings six decades of ABS expertise to our operations.",
    icon: "Handshake",
  },
  {
    title: "Innovation Focus",
    description: "Dedicated R&D center continuously develops new grades and applications for emerging markets.",
    icon: "Lightbulb",
  },
  {
    title: "Quality Commitment",
    description: "Multiple certifications including ISO 9001, ISO 14001, and IATF 16949 ensure consistent quality.",
    icon: "Award",
  },
];
