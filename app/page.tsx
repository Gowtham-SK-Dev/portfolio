"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Code, Database, Github, Globe, Linkedin, Mail, Phone, Server } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { ContactForm } from "@/components/contact-form"
import { ExperienceCard } from "@/components/experience-card"
import { AnimatedText } from "@/components/animated-text"
import { ParallaxSection } from "@/components/parallax-section"
import { AnimateInView } from "@/components/animate-in-view"
import { ColorfulBackground } from "@/components/colorful-background"
import { calculateExperience } from "@/lib/utils"

export default function Home() {
  // Calculate experience dynamically
  const experienceYears = calculateExperience(new Date("2021-04-01"))

  // State for theme colors
  // Professional color scheme
  const colors = {
    primary: "from-gray-700 to-gray-900",
    secondary: "from-gray-800 to-black",
    accent: "from-gray-600 to-gray-800",
  }

  // Refs for scroll navigation
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Handle smooth scrolling for navigation
  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      })
    }
  }

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }, 100)
    }
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // For floating animation
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -50])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])
  const y3 = useTransform(scrollY, [0, 1000], [0, -150])

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <ColorfulBackground />

      <motion.header
        className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="font-bold text-xl">
              <span className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>Gowtham</span>K
            </Link>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <button
                onClick={() => scrollToSection(skillsRef)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Skills
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <button
                onClick={() => scrollToSection(experienceRef)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Experience
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Projects
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </button>
            </motion.div>
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-gray-700 to-gray-900 hover:shadow-lg hover:shadow-gray-900/20"
            >
              <button onClick={() => scrollToSection(contactRef)}>Hire Me</button>
            </Button>
          </motion.div>
        </div>
      </motion.header>
      <main className="flex-1">
        {/* Hero Section */}
        <ParallaxSection className="container py-24 md:py-32 space-y-8 relative">
          {/* Floating elements */}
          <motion.div
            className="absolute top-20 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 opacity-20 blur-xl"
            style={{ y: y1 }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 opacity-20 blur-xl"
            style={{ y: y2 }}
          />
          <motion.div
            className="absolute top-40 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 opacity-20 blur-xl"
            style={{ y: y3 }}
          />

          <motion.div
            className="flex flex-col items-center text-center space-y-4 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1 text-sm text-white shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Software Engineer with {experienceYears} Years Experience
            </motion.div>
            <AnimatedText
              text="Building Scalable Solutions for Real Problems"
              highlightText="Scalable Solutions"
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              highlightClassName={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
            />
            <motion.p
              className="max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I specialize in PHP (Laravel) and Node.js, with expertise in secure API integrations and efficient
              database management.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeIn}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>9787304714</span>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>gowtham3cse@gmail.com</span>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                <span>LinkedIn Profile</span>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-gray-700 to-gray-900 hover:shadow-lg hover:shadow-gray-900/20"
                >
                  <button onClick={() => scrollToSection(projectsRef)}>
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 hover:border-primary transition-all duration-300"
                >
                  <button onClick={() => scrollToSection(contactRef)}>Contact Me</button>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </ParallaxSection>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background opacity-80"></div>
          <AnimateInView>
            <div className="container space-y-12 relative z-10">
              <div className="space-y-4 text-center">
                <motion.h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
                  variants={fadeIn}
                >
                  About Me
                </motion.h2>
                <motion.p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl" variants={fadeIn}>
                  Backend developer focused on building and optimizing scalable, high-performance systems.
                </motion.p>
              </div>
              <motion.div
                className="mx-auto max-w-3xl space-y-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.p variants={fadeIn} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  I'm a backend developer with {experienceYears} years of experience building and optimizing scalable,
                  high-performance systems. Proficient in PHP (Laravel) and Node.js, with expertise in secure API
                  integrations and efficient database management. Known for a collaborative approach and commitment to
                  delivering reliable, innovative solutions.
                </motion.p>
                <motion.p variants={fadeIn} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  Throughout my career, I've spearheaded end-to-end backend development for projects like TVS-FIT,
                  Partsmart, and Olabi, managing requirement analysis, testing, and deployment. I've designed and
                  developed RESTful APIs and database structures, ensuring seamless system integration and scalability.
                </motion.p>
                <motion.p variants={fadeIn} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  My work has resulted in significant improvements to application reliability and functionality,
                  achieving a 30% reduction in system issues through proactive code optimizations.
                </motion.p>
                <motion.div variants={fadeIn} className="pt-4 bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">Education</h3>
                  <p>
                    <span className="font-medium">B.E. in Computer Science Engineering</span>
                    <br />
                    Anna University, Tamil Nadu, India
                    <br />
                    August 2016 – May 2020
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </AnimateInView>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} id="skills" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
          <AnimateInView>
            <div className="container space-y-12 relative z-10">
              <div className="space-y-4 text-center">
                <motion.h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
                  variants={fadeIn}
                >
                  My Skills
                </motion.h2>
                <motion.p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl" variants={fadeIn}>
                  A comprehensive set of technologies I've mastered over the years.
                </motion.p>
              </div>
              <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="rounded-lg border bg-white/5 backdrop-blur-sm p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${colors.primary} transition-all duration-1000`}>
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Languages & Frameworks</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="PHP" color={colors.primary} />
                    <SkillBadge name="Laravel" color={colors.primary} />
                    <SkillBadge name="Node.js" color={colors.primary} />
                    <SkillBadge name="AngularJS" color={colors.primary} />
                    <SkillBadge name="JavaScript" color={colors.primary} />
                    <SkillBadge name="HTML/CSS" color={colors.primary} />
                    <SkillBadge name="Zend" color={colors.primary} />
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="rounded-lg border bg-white/5 backdrop-blur-sm p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-2 rounded-full bg-gradient-to-r ${colors.secondary} transition-all duration-1000`}
                    >
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Database & Storage</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="MySQL" color={colors.secondary} />
                    <SkillBadge name="Database Optimization" color={colors.secondary} />
                    <SkillBadge name="Oracle ERP" color={colors.secondary} />
                    <SkillBadge name="Cloud Storage" color={colors.secondary} />
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="rounded-lg border bg-white/5 backdrop-blur-sm p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${colors.primary} transition-all duration-1000`}>
                      <Server className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Tools & Libraries</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="JWT" color={colors.primary} />
                    <SkillBadge name="Crypt" color={colors.primary} />
                    <SkillBadge name="Curl" color={colors.primary} />
                    <SkillBadge name="Guzzle" color={colors.primary} />
                    <SkillBadge name="Postman" color={colors.primary} />
                    <SkillBadge name="Git" color={colors.primary} />
                    <SkillBadge name="FileZilla" color={colors.primary} />
                    <SkillBadge name="PM2" color={colors.primary} />
                    <SkillBadge name="Kendo" color={colors.primary} />
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="rounded-lg border bg-white/5 backdrop-blur-sm p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-2 rounded-full bg-gradient-to-r ${colors.secondary} transition-all duration-1000`}
                    >
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Architecture & Integration</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="MVC" color={colors.secondary} />
                    <SkillBadge name="Microservices" color={colors.secondary} />
                    <SkillBadge name="API Development" color={colors.secondary} />
                    <SkillBadge name="RESTful APIs" color={colors.secondary} />
                    <SkillBadge name="Razorpay" color={colors.secondary} />
                    <SkillBadge name="Front-End Integration" color={colors.secondary} />
                    <SkillBadge name="ERP Integration" color={colors.secondary} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimateInView>
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} id="experience" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background opacity-80"></div>
          <AnimateInView>
            <div className="container space-y-12 relative z-10">
              <div className="space-y-4 text-center">
                <motion.h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
                  variants={fadeIn}
                >
                  Work Experience
                </motion.h2>
                <motion.p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl" variants={fadeIn}>
                  My professional journey as a Software ENgineer.
                </motion.p>
              </div>
              <motion.div
                className="space-y-8 max-w-4xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div variants={fadeIn}>
                  <ExperienceCard
                    title="Software Engineer"
                    company="Mindscape Computing"
                    location="Bangalore"
                    period="February 2025 – Present"
                    description="Working on Olabi, a SAAS product integrated with ERP systems."
                    responsibilities={[
                      "Developing and maintaining the Olabi SAAS platform using Node.js, Zend, and Kendo.",
                      "Implementing ERP system integrations for seamless data flow.",
                      "Optimizing application performance and scalability.",
                      "Collaborating with cross-functional teams to deliver high-quality software solutions.",
                      "Upgrading skills in Node.js, Zend, and Kendo frameworks.",
                    ]}
                    color={colors.primary}
                  />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <ExperienceCard
                    title="Back-end Developer"
                    company="UITOUX SOLUTION"
                    location="Coimbatore"
                    period="January 2022 – February 2025"
                    description="Spearheaded end-to-end backend development for projects like TVS-FIT and Partsmart, managing requirement analysis, testing, and deployment."
                    responsibilities={[
                      "Advanced Framework Expertise: Extensive experience with Laravel and Node.js, delivering scalable, secure, and high-performance web applications.",
                      "Designed and developed RESTful APIs and database structures, ensuring seamless system integration and scalability.",
                      "Collaborated closely with UI/UX teams to implement designs, ensuring a cohesive user experience.",
                      "Optimized backend processes for secure, high-performance web applications.",
                      "Improved application reliability and functionality, achieving a 30% reduction in system issues through proactive code optimizations.",
                    ]}
                    color={colors.secondary}
                  />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <ExperienceCard
                    title="Junior Back-end Developer"
                    company="UITOUX SOLUTION"
                    location="Coimbatore"
                    period="April 2021 – January 2022"
                    description="Worked on Laravel-based projects, collaborating with the team to deliver robust solutions."
                    responsibilities={[
                      "Expertise in Frameworks: Proficient in Laravel for developing back-end systems, ensuring scalability and efficiency in web applications.",
                      "Database Management: Skilled in designing, optimizing, and managing MySQL databases to handle complex data structures and improve query performance.",
                      "Front-End Integration: Experience with AngularJS for creating seamless, responsive user interfaces and ensuring smooth interaction with APIs.",
                      "API Development: Developed and integrated RESTful APIs for various applications, ensuring secure and efficient communication between systems.",
                      "Project Highlights: Delivered full-stack solutions, collaborated with cross-functional teams, and ensured smooth deployment and post-production support.",
                    ]}
                    color={colors.primary}
                  />
                </motion.div>
              </motion.div>
            </div>
          </AnimateInView>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} id="projects" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
          <AnimateInView>
            <div className="container space-y-12 relative z-10">
              <div className="space-y-4 text-center">
                <motion.h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
                  variants={fadeIn}
                >
                  Featured Projects
                </motion.h2>
                <motion.p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl" variants={fadeIn}>
                  A selection of my most impactful work over the past {experienceYears} years.
                </motion.p>
              </div>
              <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={fadeIn}>
                  <ProjectCard
                    title="Olabi"
                    description="A SAAS software integrated with ERP systems, providing comprehensive business solutions with real-time data synchronization."
                    tags={["Node.js", "Zend", "Kendo", "ERP Integration"]}
                    image="/placeholder.svg?height=400&width=600"
                    period="February 2025 – Present"
                    highlights={[
                      "Seamless integration with multiple ERP systems",
                      "Real-time data synchronization and reporting",
                      "Scalable architecture supporting multiple tenants",
                      "Comprehensive user management and access control",
                    ]}
                    color={colors.primary}
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <ProjectCard
                    title="TVS Partsmart"
                    description="E-commerce platform for vehicle parts integrated with Oracle ERP for real-time data synchronization. Allows users to browse parts, add items to a cart, and complete purchases online."
                    tags={["Laravel", "AngularJS", "Oracle ERP", "Razorpay", "MySQL"]}
                    image="/placeholder.svg?height=400&width=600"
                    period="April 2021 – February 2025"
                    highlights={[
                      "Integrated with Razorpay payment gateway for secure and reliable transactions",
                      "Syncs stock levels, item details, and pricing data in real-time from Oracle ERP",
                      "Automates order processing by pushing all order data directly to the ERP system",
                      "Developed both mobile and web applications",
                    ]}
                    color={colors.secondary}
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <ProjectCard
                    title="FIT Valuation"
                    description="End-to-end vehicle inspection system generating detailed condition reports. Streamlined the inspection process, capturing photos, videos, and condition details, all securely stored in the cloud."
                    tags={["Node.js", "PHP", "MySQL", "Cloud Storage"]}
                    image="/placeholder.svg?height=400&width=600"
                    period="September 2024 – February 2025"
                    highlights={[
                      "Implemented a multi-stage verification (pre-QC and QC) to ensure report accuracy",
                      "Integrated the VAHAN API for automatic vehicle detail retrieval",
                      "Delivered automated, comprehensive PDF reports, documenting all inspection stages",
                      "Developed both mobile and web applications",
                    ]}
                    color={colors.primary}
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <ProjectCard
                    title="TravelXMRC"
                    description="All-encompassing solution for managing employee trips efficiently across multiple tenants. Designed a seamless workflow from trip initiation to claim requests and processing."
                    tags={["Laravel", "MySQL", "Employee Management"]}
                    image="/placeholder.svg?height=400&width=600"
                    period="March 2023 – July 2023"
                    highlights={[
                      "Introduced adaptive claim calculations based on individual user data",
                      "Set up dedicated accounts for the finance team to handle claims efficiently",
                      "Delivered automated user data synchronization process with comprehensive reporting",
                      "Enhanced visibility through confirmation emails for all workflows",
                    ]}
                    color={colors.secondary}
                  />
                </motion.div>
              </motion.div>
            </div>
          </AnimateInView>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background opacity-80"></div>
          <AnimateInView>
            <div className="container space-y-12 relative z-10">
              <div className="space-y-4 text-center">
                <motion.h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
                  variants={fadeIn}
                >
                  Get In Touch
                </motion.h2>
                <motion.p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl" variants={fadeIn}>
                  Interested in working together? Let's discuss your project.
                </motion.p>
              </div>
              <motion.div className="mx-auto max-w-2xl" variants={fadeIn}>
                <ContactForm colors={colors} />
              </motion.div>
            </div>
          </AnimateInView>
        </section>
      </main>
      <motion.footer
        className="border-t py-6 md:py-8 relative z-10 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Gowtham K. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ y: -5, scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-gray-700 to-gray-900 p-2 rounded-full text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -5, scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`bg-gradient-to-r ${colors.secondary} p-2 rounded-full text-white transition-all duration-1000`}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -5, scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="mailto:gowtham3cse@gmail.com"
                className="bg-gradient-to-r from-gray-700 to-gray-900 p-2 rounded-full text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

