import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, TrendingUp, Award, BookOpen, Target, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";

const skills = [
  "Taxation (Direct & Indirect)",
  "Financial Planning",
  "Investment Analysis",
  "Bond Markets",
  "Mutual Funds",
  "Accounting Standards",
];

const values = [
  {
    icon: BookOpen,
    title: "Education First",
    description: "I believe financial literacy is the foundation of financial freedom. My content focuses on education over selling.",
  },
  {
    icon: Target,
    title: "Simplicity",
    description: "Complex financial concepts become simple when explained right. I break down jargon into everyday language.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Learning together is more effective. I'm building a community of learners who support each other's financial journey.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Lovish Singhal - CA Student & Finance Educator</title>
        <meta
          name="description"
          content="Learn about Lovish Singhal, a CA student passionate about decoding finance, taxation, and investing for everyday people."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                About Me
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80">
                CA student, finance learner, and passionate educator on a mission to make financial literacy accessible.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-background py-16 md:py-24">
          <div className="container">
            <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Profile Card */}
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-2xl bg-muted p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary">
                      <span className="font-heading text-5xl font-bold text-primary-foreground">L</span>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">Lovish Singhal</h2>
                    <p className="mt-1 text-muted-foreground">CA Aspirant | Finance Educator</p>
                    
                    <div className="mt-6 flex gap-3">
                      <div className="rounded-lg bg-background px-4 py-2 text-center">
                        <div className="font-heading text-2xl font-bold text-secondary">50+</div>
                        <div className="text-xs text-muted-foreground">Articles</div>
                      </div>
                      <div className="rounded-lg bg-background px-4 py-2 text-center">
                        <div className="font-heading text-2xl font-bold text-secondary">5K+</div>
                        <div className="text-xs text-muted-foreground">Readers</div>
                      </div>
                      <div className="rounded-lg bg-background px-4 py-2 text-center">
                        <div className="font-heading text-2xl font-bold text-secondary">1K+</div>
                        <div className="text-xs text-muted-foreground">Subscribers</div>
                      </div>
                    </div>

                    <div className="mt-6 w-full">
                      <h4 className="mb-3 text-sm font-medium text-foreground">Expertise</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-secondary/10 px-3 py-1 text-xs text-secondary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="hero" className="mt-6 w-full" asChild>
                      <Link to="/contact">
                        Get in Touch
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div>
                <span className="text-sm font-medium uppercase tracking-wider text-secondary">My Story</span>
                <h3 className="mt-2 font-heading text-3xl font-bold text-foreground">
                  From Learner to Educator
                </h3>
                
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    My journey into finance started with a simple question: "Why is money management so complicated?" 
                    As I pursued my Chartered Accountancy, I realized that most people struggle with finances not 
                    because they're not smart, but because financial concepts are often explained in unnecessarily 
                    complex ways.
                  </p>
                  <p>
                    That's when I decided to start this blog. My mission is simple: take complex financial concepts 
                    and break them down into digestible, actionable insights that anyone can understand and apply.
                  </p>
                  <p>
                    Whether it's understanding TDS deductions, comparing bonds vs fixed deposits, or building an 
                    emergency fund, I believe everyone deserves access to quality financial education without the 
                    jargon and intimidation.
                  </p>
                </div>

                <h3 className="mt-12 font-heading text-2xl font-bold text-foreground">
                  What I Stand For
                </h3>
                <div className="mt-6 space-y-6">
                  {values.map((value) => (
                    <div key={value.title} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                        <value.icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{value.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="mt-12 font-heading text-2xl font-bold text-foreground">
                  Let's Connect
                </h3>
                <p className="mt-4 text-muted-foreground">
                  I'm always excited to connect with fellow learners and finance enthusiasts. Whether you have 
                  a question, want to collaborate, or just want to say hi – feel free to reach out!
                </p>
                <div className="mt-6 flex gap-4">
                  <Button variant="default" asChild>
                    <Link to="/blog">
                      Read My Blog
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Me</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
