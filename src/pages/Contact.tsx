import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Youtube, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "lovishsinghal2003@gmail.com",
    href: "mailto:lovishsinghal2003@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 85048 99720",
    href: "tel:+918504899720",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
  },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/calovishsinghal/", label: "LinkedIn", color: "hover:bg-blue-600" },
  { icon: Instagram, href: "https://www.instagram.com/lovishsinghal0/", label: "Instagram", color: "hover:bg-pink-600" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact | Lovish Singhal</title>
        <meta
          name="description"
          content="Get in touch with Lovish Singhal. Have questions about finance, taxation, or investing? Reach out for collaborations or queries."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container text-center">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Have a question or want to collaborate? I'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">Contact Information</h2>
                  <p className="mt-2 text-muted-foreground">
                    Feel free to reach out through any of the following channels.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <Card key={info.label} variant="flat" className="bg-background">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                          <info.icon className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{info.label}</div>
                          {info.href ? (
                            <a href={info.href} className="font-medium text-foreground hover:text-secondary">
                              {info.value}
                            </a>
                          ) : (
                            <div className="font-medium text-foreground">{info.value}</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="mb-4 font-semibold text-foreground">Follow Me</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-12 w-12 items-center justify-center rounded-lg bg-background transition-colors ${social.color} hover:text-primary-foreground`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card variant="elevated">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-heading text-2xl font-bold text-foreground">Send a Message</h2>
                    <p className="mt-2 text-muted-foreground">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="w-full resize-none rounded-lg border bg-background px-4 py-2.5 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                          placeholder="Your message..."
                        />
                      </div>

                      <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
