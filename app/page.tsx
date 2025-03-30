"use client"
import { useEffect } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FeatureCard } from "@/components/feature-card"
import { StepCard } from "@/components/step-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { FAQCard } from "@/components/faq-card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  content: string
}

function FeatureCard_old({ icon, title, description, content }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  )
}

export default function LandingPage() {
  useEffect(() => {
    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
      // Get the target element
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)

      // If the element exists, scroll to it
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 md:flex">
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Features
              </button>
              <button
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Pricing
              </button>
              <button
                onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Testimonials
              </button>
              <button
                onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                FAQ
              </button>
            </nav>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/admin/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <button
                onClick={() => document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="safari-pattern absolute inset-0 z-0"></div>
        <div className="container relative z-10 flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
          <Badge className="mb-4" variant="outline">
            Now Available Worldwide
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Connect Your Guests with <span className="text-safari-leaf">Wildlife</span>
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
            AI-powered wildlife notifications delivered directly to your guests' phones. Enhance their safari experience
            with real-time alerts when animals visit your watering holes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 gap-2"
            >
              Start Your Free Trial
            </button>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-b bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">94%</h3>
              <p className="text-sm text-muted-foreground">Guest Satisfaction</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">85%</h3>
              <p className="text-sm text-muted-foreground">Opt-in Rate</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">12+</h3>
              <p className="text-sm text-muted-foreground">Animal Species</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[58rem] text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Enhance Your Lodge Experience
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our AI-powered system monitors your watering holes and sends real-time notifications to your guests when
            their favorite animals appear.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z" />
              </svg>
            }
            title="AI-Powered Detection"
            description="Our advanced AI recognizes over 12 different animal species with 98% accuracy."
            content="Connect your existing cameras or use our specialized wildlife cameras to automatically detect and
            identify animals at your watering holes, day or night."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
            title="WhatsApp Notifications"
            description="Instant alerts delivered directly to your guests' phones."
            content="Guests receive personalized WhatsApp notifications when their selected animals are spotted, complete
            with images and location information."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            }
            title="Easy Guest Onboarding"
            description="Simple setup process for your guests with no app downloads required."
            content="Lodge staff can quickly invite guests via WhatsApp, allowing them to select their animal preferences and
            notification settings in seconds."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-t bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="mx-auto mb-16 max-w-[58rem] text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">How It Works</h2>
            <p className="mt-4 text-muted-foreground">Get up and running in minutes with our simple setup process.</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <StepCard
              number={1}
              title="Connect Your Cameras"
              description="Link your existing wildlife cameras or install our specialized cameras at your watering holes."
            />
            <StepCard
              number={2}
              title="Add Your Guests"
              description="Easily add guests through our dashboard and send them personalized invitation links."
            />
            <StepCard
              number={3}
              title="Guests Receive Alerts"
              description="Guests select their preferred animals and receive real-time WhatsApp notifications when they're spotted."
              isLast
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[58rem] text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-muted-foreground">Choose the plan that works best for your lodge.</p>
        </div>

        <Tabs defaultValue="monthly" className="mx-auto max-w-5xl">
          <div className="mb-8 flex justify-center">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
              <TabsTrigger value="annually">Annual Billing (Save 20%)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Standard</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $49
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/camera/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    Perfect for smaller lodges with 1-3 watering holes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>$2 per guest per day</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Up to 5 cameras</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>8 animal species detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Basic analytics dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card className="relative flex flex-col border-primary">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $79
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/camera/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    Ideal for larger lodges with multiple viewing areas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>$1.50 per guest per day</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Unlimited cameras</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>12+ animal species detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>24/7 priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Custom branding options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>API access for custom integrations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="annually">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Standard</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $39
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/camera/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    Perfect for smaller lodges with 1-3 watering holes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>$1.80 per guest per day</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Up to 5 cameras</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>8 animal species detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Basic analytics dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card className="relative flex flex-col border-primary">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $63
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/camera/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    Ideal for larger lodges with multiple viewing areas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>$1.20 per guest per day</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Unlimited cameras</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>12+ animal species detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>24/7 priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Custom branding options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>API access for custom integrations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="border-t bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="mx-auto mb-12 max-w-[58rem] text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Trusted by Safari Lodges Worldwide
            </h2>
            <p className="mt-4 text-muted-foreground">
              See what lodge owners and managers are saying about our service.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              name="Sarah Thompson"
              role="Manager, Elephant Plains Lodge"
              avatarUrl="/placeholder.svg?height=56&width=56"
              quote="Our guests absolutely love the wildlife notifications. It's become one of our most talked-about amenities, and we've seen a 30% increase in positive reviews mentioning the service."
              delay={0.1}
            />
            <TestimonialCard
              name="Michael Okonjo"
              role="Owner, Serengeti View Safari Lodge"
              avatarUrl="/placeholder.svg?height=56&width=56"
              quote="The system was incredibly easy to set up with our existing cameras. Now our guests never miss a sighting, even when they're relaxing in their rooms. It's been a game-changer for our guest experience."
              delay={0.2}
            />
            <TestimonialCard
              name="Emma Chen"
              role="Director, Kruger Luxury Safaris"
              avatarUrl="/placeholder.svg?height=56&width=56"
              quote="The analytics dashboard has given us valuable insights into wildlife patterns at our watering holes. We've been able to better plan game drives based on this data, improving the overall safari experience."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-[58rem] text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">
            Find answers to common questions about our wildlife notification service.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4">
          <FAQCard
            question="What kind of cameras do I need?"
            answer="Our system works with most IP cameras that can provide a video stream. We recommend weatherproof cameras with night vision capabilities for 24/7 monitoring. We can also provide specialized wildlife cameras if needed."
            index={0}
          />
          <FAQCard
            question="How accurate is the animal detection?"
            answer="Our AI detection system has a 98% accuracy rate for common safari animals like elephants, lions, giraffes, and rhinos. The system continuously improves through machine learning as it processes more footage from your specific location."
            index={1}
          />
          <FAQCard
            question="How do guests receive notifications?"
            answer="Guests receive notifications via WhatsApp. Lodge staff send invitation links to guests, who can then select which animals they want to be notified about and during what times of day. No app download is required."
            index={2}
          />
          <FAQCard
            question="Is there a limit to how many guests I can add?"
            answer="There is no limit to the number of guests you can add to the system. You are only charged for active guests (those who have opted in and are currently staying at your lodge)."
            index={3}
          />
          <FAQCard
            question="Do I need special internet connectivity?"
            answer="A stable internet connection is required for the cameras to transmit footage to our AI processing servers. We recommend at least 5 Mbps upload speed per camera. Our system is optimized to work with limited bandwidth and can adjust quality based on available connectivity."
            index={4}
          />
          <FAQCard
            question="Can I customize the notification messages?"
            answer="Yes, Premium plan subscribers can customize notification messages with their lodge branding, custom text, and even include promotional information. Standard plan users have access to basic customization options."
            index={5}
          />
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="border-t bg-primary text-primary-foreground">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-[58rem] text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Ready to Enhance Your Guests' Safari Experience?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Get started with a 14-day free trial. No credit card required.
            </p>

            <div className="mt-8">
              <Card className="mx-auto max-w-md">
                <CardHeader>
                  <CardTitle>Start Your Free Trial</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll contact you to set up your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          First Name
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Last Name
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="lodge-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Lodge Name
                      </label>
                      <input
                        id="lodge-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Safari Lodge"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="cameras"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Number of Cameras
                      </label>
                      <select
                        id="cameras"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select number of cameras</option>
                        <option value="1-3">1-3 cameras</option>
                        <option value="4-10">4-10 cameras</option>
                        <option value="11+">11+ cameras</option>
                      </select>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo />
              <p className="mt-4 text-sm text-muted-foreground">
                Connecting safari guests with wildlife through AI-powered notifications.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button className="text-muted-foreground hover:text-foreground">Case Studies</button>
                </li>
                <li>
                  <button className="text-muted-foreground hover:text-foreground">Documentation</button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} WildWatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  )
}

