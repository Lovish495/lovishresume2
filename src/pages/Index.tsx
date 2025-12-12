import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { AboutSection } from "@/components/home/AboutSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { CTASection } from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Lovish Singhal | Finance, Learning & Growth</title>
        <meta
          name="description"
          content="CA student and finance educator. Learn about taxation, bonds, and investing for everyday people. From earnings to investments — design the life you deserve."
        />
        <meta property="og:title" content="Lovish Singhal | Finance, Learning & Growth" />
        <meta
          property="og:description"
          content="CA student and finance educator. Learn about taxation, bonds, and investing for everyday people."
        />
        <link rel="canonical" href="https://www.lovishsinghal.in/" />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturedArticles />
        <AboutSection />
        <ToolsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
