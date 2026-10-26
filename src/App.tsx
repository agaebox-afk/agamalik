import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const sections = ['intro', 'work', 'about', 'background', 'references', 'contact']
const sectionLabels: Record<string, string> = {
  work: 'Recent projects',
  about: 'Beyond skills',
  background: 'Lifetime milestones',
}
const audiences = ['Video', 'For everyone', 'Recruiters', 'Designers', 'Product managers', 'Engineers']
const themeDotCount = 12

const audienceCopy: Record<string, string[]> = {
  'For everyone': [
    'Product designer with 7 years of experience. Curious and direct, I like turning broken things into good ones and building the kind of team atmosphere where people do their best work.',
  ],
  Recruiters: [
    'I’m a product designer with 7 years of experience. Curious, quick to learn and reliable: when I say I’ll do it, it gets done. I use AI thoughtfully and like setting the standards for how a team works with it. I’m looking for a product that needs improving, where I can shape decisions and move metrics. Warsaw-based, open to hybrid, remote or on-site.',
  ],
  Designers: [
    'I believe the best teams are built on complementary strengths, not uniformity. I focus on creating a space where every voice is heard, ensuring we look at problems from all angles before committing to a direction.',
  ],
  'Product managers': [
    'I like connecting the dots with product managers: you get sharper user insight, I get the business context, and together we make better decisions. I’m happy to step in where the team needs me, and I care more about outcomes than output.',
  ],
  Engineers: [
    'I’m technical, pragmatic and endlessly curious about how things work. I’ll ask “what’s actually possible?” before assuming something can’t be done, and I’d rather solve problems with you early than hand over a finished deck.',
  ],
  Video: [],
}

const workProjects = [
  {
    slug: 'ai-painter-assistant',
    year: '2026',
    eyebrow: 'AI Painter Assistant',
    displayTitle: 'Building a technical co-pilot for contractors',
    title: 'AI Painter Assistant: Building a Technical Co-pilot for Contractors',
    category: 'SaaS Platform',
    undisclosed: true,
    clientDisplay: 'Global paint manufacturer',
    tags: ['AI Assistant', 'User interview', 'Strategy workshop', 'RAG'],
    description: 'Professional painters were trapped in manual, error-prone workflows consuming up to 20% of their billable time; I led the discovery, UX research, requirements translation, and PoC validation for an AI co-pilot that automates quoting and delivers instant technical documentation.',
    image: '/ai-painter-assistant-cover.jpg',
    imageAlt: 'Painter measuring a wall and preparing a quote on a tablet',
    icons: ['sparkle', 'palette', 'phone'],
    detail: 'A technical co-pilot designed to give painting contractors reliable, product-specific guidance while they work. The discovery focused on understanding where manual processes create delays and risk, then translating verified technical information into a more useful on-site tool.',
    detailImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1503387762-592ded58ef4e?auto=format&fit=crop&w=1800&q=85',
    ],
  },
  {
    slug: 'retail-speed-logistics',
    year: '2025',
    eyebrow: 'q-commerce',
    displayTitle: 'Designing for retail speed and complex logistics',
    title: 'Designing for retail speed and complex logistics',
    category: 'Case study',
    undisclosed: true,
    clientDisplay: 'Largest discount retail network in Poland',
    tags: ['q-commerce', "biggest Poland’s retailer", 'complex ecosystem', 'mobile app'],
    description: 'An in-house q-commerce mobile application built for the largest discount retail network in Poland to transition away from a third-party platform, establish full control over user data and promotions, and support high-frequency grocery delivery.',
    image: '/retail-speed-logistics-cover.jpeg',
    imageAlt: 'Courier delivering groceries on a scooter in the city',
    icons: ['store', 'bolt', 'phone'],
    detail: 'We designed a customer-facing mobile application tailored for high-frequency retail, establishing full control over the user shopping journey and setting the foundation for future international geographic expansion.',
    detailImages: [
      'https://images.unsplash.com/photo-1603905179139-d6d7b88b2e4a?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85',
    ],
  },
  {
    slug: 'lufthansa-live-activities',
    year: '2024',
    eyebrow: 'Lufthansa',
    displayTitle: 'Reducing travel anxiety with real-time flight status updates on the Lock Screen',
    title: 'Reducing travel anxiety with real-time flight status updates on the Lock Screen',
    category: 'Case study',
    undisclosed: false,
    clientDisplay: 'Lufthansa',
    tags: ['Live Activity', 'iOS & Android', 'user interview', 'usability testing'],
    description: 'Reducing travel anxiety with real-time flight status updates on the Lock Screen.',
    image: '/lufthansa-live-activities-cover.jpg',
    imageAlt: 'Traveler checking flight updates on a phone in a Lufthansa airport lounge',
    icons: ['plane', 'suitcase', 'phone'],
    detail: 'A real-time travel companion bringing useful flight updates to the Lock Screen. By testing realistic journeys and airport conditions, the work explored how to provide timely gate and boarding information without asking travelers to repeatedly open the app.',
    detailImages: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1529079875474-ab2a2c4f4f5e?auto=format&fit=crop&w=1800&q=85',
    ],
  },
  {
    slug: 'lufthansa-baggage-reporting',
    year: '2024',
    eyebrow: 'Lufthansa',
    displayTitle: 'Redesigning the baggage reporting flow to reduce travel stress',
    title: 'Redesigning the baggage reporting flow to reduce travel stress',
    category: 'Case study',
    undisclosed: false,
    clientDisplay: 'Lufthansa',
    tags: ['Lufthansa', 'complex system', 'UX research', 'usability testing'],
    description: 'Redesigning the baggage reporting flow to reduce travel stress.',
    image: '/lufthansa-baggage-reporting-cover.jpg',
    imageAlt: 'Family traveling through an airport with their luggage',
    icons: ['plane', 'suitcase', 'phone'],
    detail: 'A clearer baggage recovery experience for passengers dealing with lost luggage. User journey mapping and usability testing informed a redesigned reporting flow, making the process easier to follow and its status updates more transparent.',
    detailImages: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1800&q=85',
    ],
  },
  {
    slug: 'macronutrient-tracker',
    year: '2019–2021',
    eyebrow: 'Macronutrient Tracker',
    displayTitle: 'Building a product from zero to learning lab',
    title: 'Macronutrient tracker: Building a product from zero to learning lab',
    category: 'Case study',
    undisclosed: false,
    clientDisplay: 'MakroMapa',
    tags: ['mobile app', 'UX/UI design', 'user research', 'promotion'],
    description: 'A nutrition-tracking app born from a personal frustration with estimating macros while eating out. I worked on UX/UI design, research, and promoting MakroMapa, gaining hands-on experience with interface patterns, component systems, and product validation.',
    image: '/macronutrient-tracker-cover.jpg',
    imageAlt: 'Two people reviewing a meal together at a restaurant',
    icons: ['phone', 'leaf', 'community'],
    detail: 'My husband and I built a restaurant macro tracker for the Polish market. He led Flutter development while I worked as a UX/UI designer, focusing on research, interface design, and promoting the app. Our promotional efforts grew an organic community of nearly 1,000 followers.',
    detailImages: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1800&q=85',
    ],
  },
]

type WorkProject = (typeof workProjects)[number]

function ProjectIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    sparkle: <path d="M12 2.8 14.3 9l6.2 3-6.2 2.2L12 20.5 9.7 14.2 3.5 12l6.2-3L12 2.8Z" />,
    palette: <><path d="M12 3a9 9 0 1 0 0 18h1.1a2 2 0 0 0 1.5-3.3 1.8 1.8 0 0 1 1.4-3h1A4 4 0 0 0 21 10.6C21 6.4 17 3 12 3Z" /><path d="M7.5 10h.01M10 6.8h.01M14 6.8h.01M17 9h.01" /></>,
    phone: <><rect x="6.5" y="2.5" width="11" height="19" rx="2" /><path d="M10 18.5h4" /></>,
    store: <><path d="M3 9h18l-1.5-6h-15L3 9Z" /><path d="M5 9v12h14V9M9 21v-7h6v7M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /></>,
    bolt: <path d="m13.5 2.5-9 11h7l-1 8 9-12h-7l1-7Z" />,
    plane: <path d="m3 11 18-8-8 18-2.5-7.5L3 11Zm7.5 2.5L21 3" />,
    suitcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M7 21v-3m10 3v-3M3 12h18" /></>,
    leaf: <><path d="M20.5 3.5c-9 0-15 3-15 9a5 5 0 0 0 5 5c6 0 9-6 10-14Z" /><path d="M3.5 21c2.5-5.5 6-8.5 12-12" /></>,
    community: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1H3Zm13-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1h-3" /></>,
  }

  return (
    <svg className="project-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  )
}

function CaseStudyAccordion({ id, label, title, children, className = '', open, onToggle }: { id: string; label: string; title: string; children: React.ReactNode; className?: string; open: boolean; onToggle: (id: string) => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const animationFrame = useRef<number | null>(null)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const inner = innerRef.current
    if (!panel || !inner) return

    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current)
    }

    const startHeight = panel.getBoundingClientRect().height
    panel.style.overflow = 'hidden'
    panel.style.height = `${startHeight}px`
    panel.style.transition = 'none'
    panel.offsetHeight
    panel.style.transition = ''
    animationFrame.current = requestAnimationFrame(() => {
      panel.style.height = open ? `${inner.scrollHeight}px` : '0px'
      animationFrame.current = null
    })

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
        animationFrame.current = null
      }
    }
  }, [open])

  const handlePanelTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'height') return
    const panel = event.currentTarget
    if (open) {
      panel.style.height = 'auto'
      panel.style.overflow = 'visible'
    }
  }

  return (
    <div className={`ai-accordion ${className}`}>
      <button className="ai-accordion-trigger" type="button" aria-expanded={open} aria-controls={`panel-${id}`} onClick={() => onToggle(id)}>
        <span className="ui-label">{label}</span>
        <span className="ai-accordion-title" role="heading" aria-level={2}>{title}</span>
        <span className="ai-accordion-indicator" aria-hidden="true" />
      </button>
      <div id={`panel-${id}`} ref={panelRef} className="ai-accordion-panel" role="region" aria-label={title} aria-hidden={!open} inert={!open} onTransitionEnd={handlePanelTransitionEnd}>
        <div ref={innerRef} className="ai-accordion-panel-inner">
          <div className="ai-accordion-content">{children}</div>
        </div>
      </div>
    </div>
  )
}

function AIPainterCaseStudy() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const toggleSection = (id: string) => setOpenSection((current) => current === id ? null : id)

  const approachSteps: [string, React.ReactNode][] = [
    ['Strategic Alignment Workshop', 'Defined the project anchor and Desired Outcome with stakeholders.'],
    ['Qualitative Discovery (9 IDIs)', <>Conducted <strong>60–90 minute in-depth interviews</strong> with active contractors to map the complete job lifecycle and uncover operational pain points.</>],
    ['Quantitative Survey Validation (186 Surveys)', <>Deployed a survey completed by <strong>186 active contractors</strong> visiting company trade centers to quantify time loss and feature demand. The survey averaged <strong>27 minutes</strong> to complete.</>],
    ['Opportunity Solution Tree (OST) Synthesis', 'Mapped user opportunities directly to strategic business impact.'],
    ['Micro-PoCs & Scope Definition', 'Prioritized features and tested RAG data extraction models and calculation engines prior to full UI assembly.'],
    ['Controlled In-Store PoC Validation (42 Testers)', <>Deployed the functional PoC to store-owned iPads for scenario testing with <strong>42 professional contractors</strong> across trade store locations.</>],
  ]

  return (
    <div className="ai-case-study">
      <div className="ai-case-facts">
        <div><span className="ui-label">Client</span><p>A global paint manufacturer (Undisclosed)</p></div>
        <div><span className="ui-label">Team</span><p>Myself (Lead Product Designer), 2 client project managers, and 2 AI developers</p></div>
        <div><span className="ui-label">Timeline</span><p>2025 Q4–2026 Q1</p></div>
        <div><span className="ui-label">My role</span><p>Product Strategy, UX Research, Discovery, Research Synthesis, Opportunity Solution Tree (OST) Management, UX/UI Alignment, &amp; PoC Validation</p></div>
        <div><span className="ui-label">Outcome</span><p>Validated an AI assistant PoC tested by 42 contractors across active trade stores, confirming massive demand for automated quoting (82%) and 24/7 product selection (84%).</p></div>
      </div>

      <CaseStudyAccordion id="project-overview" open={openSection === 'project-overview'} onToggle={toggleSection} label="01 / Project overview" title="What was this project about, and who was it for?">
        <div className="ai-case-copy">
          <p className="ai-case-lead">Professional painters were trapped in manual, error-prone workflows consuming <strong>up to 20% of their billable time</strong>; I led the discovery, UX research, requirements translation, and PoC validation for an AI co-pilot that automates quoting and delivers instant technical documentation.</p>
          <p>This project explored how artificial intelligence could transform passive B2B loyalty programs into daily operational partnerships for a global building materials manufacturer. Rather than rushing into full-scale software production, we designed, implemented, and validated a proof of concept (PoC) for an AI assistant tailored to professional painting contractors.</p>
          <p>The primary target users were independent contractors and small-to-medium painting crews operating in highly mobile, time-sensitive environments. The solution automated price estimation, simplified product selection, and provided rapid, documentation-backed technical advice to turn administrative friction into project efficiency.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="problem" open={openSection === 'problem'} onToggle={toggleSection} label="02 / Problem" title="What problem needed solving, and why did it matter to the business and users?">
        <div className="ai-case-copy">
          <p>Traditional B2B loyalty programs often struggle with passive engagement, serving primarily as transactional cashback engines rather than tools that add daily value. Our core hypothesis was that contractor loyalty increases when a manufacturer provides tools that reduce administrative friction, save time, and improve decision accuracy during job preparation.</p>
          <p>Qualitative discovery revealed that the bidding process was entirely manual, taking <strong>3 to 6 hours per estimate</strong>:</p>
          <ul>
            <li><strong>61% of contractors spend 15 to over 30 minutes</strong> gathering data sheets per estimate, lacking a single central repository.</li>
            <li><strong>67% frequently rely on sales representatives</strong> to select products or substitutes, and <strong>62% reported that advisor unavailability significantly delays their estimates.</strong></li>
          </ul>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="role" open={openSection === 'role'} onToggle={toggleSection} label="03 / My role" title="What was my role, and what did I own?">
        <div className="ai-case-copy">
          <p>Working within a cross-functional team consisting of <strong>myself, 2 client project managers, and 2 AI developers</strong>, I owned the end-to-end product design and research execution.</p>
          <p>My direct responsibilities included <strong>offer preparation, roadmap definition, workshop facilitation, research design and execution (IDIs and surveys), result analysis, improvement recommendations, UX/UI alignment with developers, metric alignment with the client, final reporting, translating client needs into functional requirements, and creating and maintaining the Opportunity Solution Tree (OST)</strong>. The AI developers focused on building and testing the assistant.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="constraints" open={openSection === 'constraints'} onToggle={toggleSection} label="04 / Constraints" title="What constraints and challenges shaped the work?">
        <div className="ai-case-copy">
          <p>The primary challenge was mitigating technical and behavioral risk before committing to heavy engineering investments. Contractors operate under tight time constraints and have low tolerance for digital tools that introduce friction, hallucinate product specifications, or fail in retail environments.</p>
          <p>We had to design an experience simple enough for use on-site in active trade stores, while ensuring that the underlying AI reasoning engine relied strictly on verified manufacturer data.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="approach" open={openSection === 'approach'} onToggle={toggleSection} label="05 / Approach" title="How did I approach the problem?">
        <div className="ai-case-copy">
          <p>I structured the discovery and validation process into sequential, evidence-driven stages:</p>
          <ol className="ai-case-list">
            {approachSteps.map(([stage, description]) => <li key={stage}><strong>{stage}:</strong> {description}</li>)}
          </ol>
        </div>
        <div className="ai-discovery-gallery">
          <figure>
            <img src="/ai-painter-contractor-interview-research.avif" alt="Contractor interview research plan, participant schedule, and synthesis" loading="lazy" />
            <figcaption>Contractor interviews: research plan and synthesis</figcaption>
          </figure>
          <figure>
            <img src="/ai-painter-micro-poc-workshop-agenda.avif" alt="Micro-PoC workshop agenda, activities, and synthesis" loading="lazy" />
            <figcaption>Micro-PoC workshop: agenda, activities, and outputs</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="design-decisions" open={openSection === 'design-decisions'} onToggle={toggleSection} label="06 / Design decisions" title="Which key design decisions did I make, and why?">
        <div className="ai-case-copy">
          <p>Based on research findings, we made explicit scope and architecture decisions:</p>
          <ul className="ai-case-list">
            <li><strong>Focused PoC Scope:</strong> Prioritized a conversational quote generator backed by a calculation engine, <strong>24/7 rule-backed product selection</strong>, room/zone quote structuring, custom labor/margin additions, and offer revision management.</li>
            <li><strong>Deferred Legacy Integration:</strong> Excluded unfiltered access to deep legacy backend systems from the initial PoC phase to avoid unnecessary upfront integration expense.</li>
          </ul>
        </div>
        <div className="ai-discovery-gallery">
          <figure>
            <img src="/ai-painter-opportunity-solution-tree.png" alt="Opportunity Solution Tree mapping contractor opportunities and proof-of-concept solutions" loading="lazy" />
            <figcaption>Opportunity Solution Tree — PoC phase</figcaption>
          </figure>
          <figure>
            <img src="/ai-painter-micro-poc-workshop.png" alt="Workshop agenda and activity map for defining Micro-PoC scope" loading="lazy" />
            <figcaption>Micro-PoC scope-setting workshop</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="ai-use" open={openSection === 'ai-use'} onToggle={toggleSection} label="07 / AI" title="How did I use AI in this project?">
        <div className="ai-case-copy">
          <p>While the AI developers built and tested the system, <strong>I actively shaped the AI’s functional logic and behavior</strong> by:</p>
          <ul className="ai-case-list">
            <li>Preparing <strong>sample questions and answers</strong> to train and test the model.</li>
            <li>Gathering requirements from client interactions and user interviews to write <strong>ideal responses</strong> that ensured the model understood domain-specific terminology.</li>
            <li>Collaborating with the team to jointly establish operational rules for the AI reasoning engine.</li>
          </ul>
        </div>
        <figure className="ai-product-path-figure">
          <img className="ai-product-path" src="/ai-painter-product-path.avif" alt="Product path diagram for the AI Painter Assistant" loading="lazy" />
          <figcaption>Product path</figcaption>
        </figure>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="quality-standards" open={openSection === 'quality-standards'} onToggle={toggleSection} label="08 / Quality standards" title="How did I set quality standards for the solution?">
        <div className="ai-case-copy">
          <p>To ensure reliability in a fast-changing AI environment, we established quantitative performance and engagement metrics to track user interaction and widget data reliability post-launch, alongside output accuracy validation during store-level testing with 42 contractors.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="team" open={openSection === 'team'} onToggle={toggleSection} label="09 / Collaboration" title="How did I work with the team and stakeholders?">
        <div className="ai-case-copy">
          <p>I partnered continuously with the <strong>2 client project managers and 2 AI developers</strong>. I translated raw research data into actionable requirements for the developers, aligned metrics with the client, and facilitated stakeholder buy-in for phased scoping decisions.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="results" open={openSection === 'results'} onToggle={toggleSection} label="10 / Results" title="What was the result?">
        <div className="ai-case-copy">
          <p>The validation phase yielded critical performance insights and strong demand signals:</p>
          <ul className="ai-case-list">
            <li><strong>High Demand:</strong> <strong>82% demanded automated quote preparation</strong>, and <strong>84% rated a 24/7 product selector as highly valuable</strong>.</li>
            <li><strong>PoC Testing Segmentation:</strong> Testing with 42 contractors revealed that <strong>36% were Enthusiasts</strong> (ready for adoption) and <strong>48% were Skeptics</strong> (rejecting the tool due to trust and performance errors), while <strong>13% abandoned the test</strong> due to critical crashes.</li>
            <li><strong>Core Insights:</strong> Users praised the professional appearance of final PDF proposals and the promise of speed, but critical trust issues—including mismatched recommendations, missing product lines like Sigma, and performance crashes—must be fixed before scaling.</li>
          </ul>
        </div>
        <figure className="ai-business-value-figure">
          <img src="/ai-painter-business-value.avif" alt="Strategic dual value for contractors and the manufacturer" loading="lazy" />
          <figcaption>Business value and strategic ROI</figcaption>
        </figure>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="learnings" open={openSection === 'learnings'} onToggle={toggleSection} label="11 / Learnings" title="What did I learn, and what would I do differently?">
        <div className="ai-case-copy">
          <p>This project reinforced that technical co-pilots in traditional industries succeed only when they remove administrative friction without introducing new learning curves. Early testing with PoCs was crucial for uncovering reliability issues. Moving forward, <strong>fixing recommendation engine stability and eliminating system crashes</strong> must precede any new feature development.</p>
        </div>
      </CaseStudyAccordion>
    </div>
  )
}

function QCommerceCaseStudy() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const toggleSection = (id: string) => setOpenSection((current) => current === id ? null : id)

  return (
    <div className="ai-case-study">
      <div className="ai-case-facts">
        <div><span className="ui-label">Role</span><p>Founding Product Designer, leading end-to-end product discovery and UX/UI design; building app components from a component library created by a second Product Designer</p></div>
        <div><span className="ui-label">Team</span><p>Product Manager, 2 iOS developers, 2 Android developers, QA engineers, client stakeholders, and a second Product Designer who joined as the project scaled</p></div>
        <div><span className="ui-label">Timeline</span><p>Q4 2024 – Q3 2025</p></div>
        <div><span className="ui-label">Outcome</span><p>Established a proprietary, scalable q-commerce mobile ecosystem with full control over the shopping journey, ready for future geographic expansion.</p></div>
      </div>

      <CaseStudyAccordion id="qcommerce-overview" open={openSection === 'qcommerce-overview'} onToggle={toggleSection} label="01 / Project overview" title="What was this project about, and who was it for?">
        <div className="ai-case-copy">
          <p className="ai-case-lead">As the founding Product Designer, I led end-to-end product discovery and UX/UI design for a high-performance q-commerce mobile application built for the largest discount retail network in Poland.</p>
          <p>The goal was to transition away from a third-party platform and create a frictionless, intuitive mobile shopping experience from the ground up—bridging physical retail efficiency with rapid digital delivery.</p>
          <p>Operating in a fast-paced cross-functional environment, I collaborated closely with a Product Manager, 2 iOS developers, 2 Android developers, QA engineers, and key client stakeholders. As the project scaled, a second Product Designer joined to support the expanding scope.</p>
          <figure className="ai-case-figure">
            <img src="/qcommerce-project-team.png" alt="Q-commerce project team outside the retail location" loading="lazy" />
            <figcaption>The project team at the retail location.</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="qcommerce-problem" open={openSection === 'qcommerce-problem'} onToggle={toggleSection} label="02 / Problem" title="What problem needed solving, and why did it matter?">
        <div className="ai-case-copy">
          <p>The objective was to design a frictionless, intuitive mobile shopping experience from the ground up. Key challenges included structuring a comprehensive information architecture and designing intuitive user flows for onboarding, catalog browsing, advanced search, barcode scanning, cart management, transparent promotion conditions, and real-time order status tracking with interactive maps.</p>
          <p>Relying on an external vendor restricted access to granular user behavior data, limited assortment management efficiency, and prevented the business from launching custom promotional mechanisms and tailored loyalty programs. An in-house platform would restore ownership and enable a high-frequency experience that could scale.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="qcommerce-role" open={openSection === 'qcommerce-role'} onToggle={toggleSection} label="03 / My role" title="What was my role, and what did I own?">
        <div className="ai-case-copy">
          <p>As the founding Product Designer, I led the end-to-end design strategy from day zero (Q4 2024 – Q3 2025), owning product discovery and UX/UI design through UAT and Friends &amp; Family release preparation. A second Product Designer later created the component library; I built app components using that library. With the project timeline, there was no time to establish a full design system.</p>
          <ul className="ai-case-list">
            <li><strong>0-to-1 product strategy and architecture:</strong> Led early discovery, information architecture, low-fidelity prototyping, complete user flow mapping, and the core visual language for the mobile application.</li>
            <li><strong>Baseline evaluations:</strong> Conducted stakeholder alignment sessions and evaluated other speed-delivery apps to translate logistics and business requirements into intuitive UX patterns.</li>
            <li><strong>Quality alignment and testing preparation:</strong> Worked closely with QA to establish scope, test scenarios, and operational criteria for UAT and Friends &amp; Family release preparation.</li>
          </ul>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="qcommerce-constraints" open={openSection === 'qcommerce-constraints'} onToggle={toggleSection} label="04 / Constraints" title="What constraints and challenges shaped the work?">
        <div className="ai-case-copy">
          <p>The project aimed to bridge physical retail efficiency with rapid digital delivery, while designing clear flows for onboarding, catalog browsing, advanced search, barcode scanning, cart management, promotion conditions, and real-time order tracking.</p>
          <p>The experience needed to support consistent cross-platform execution on iOS and Android while coordinating product, engineering, QA, and client stakeholder needs under a fast-paced delivery schedule.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="qcommerce-approach" open={openSection === 'qcommerce-approach'} onToggle={toggleSection} label="05 / Approach" title="How did I approach the problem?">
        <div className="ai-case-copy">
          <ul className="ai-case-list">
            <li><strong>End-to-end discovery and flow mapping:</strong> Mapped the complete user journey—from initial app launch and geo-location address verification to multi-step registration (Google/Apple SSO), dynamic cart views, checkout, and live order tracking.</li>
            <li><strong>Component-based UI craft:</strong> Built app components using the component library created by a second Product Designer, including snackbars, interactive banners, and Product Detail Page (PDP) layouts for consistent iOS and Android execution. The project timeline did not allow for a full design system.</li>
            <li><strong>Quality alignment:</strong> Worked with QA to establish scope, test scenarios, and operational criteria for UAT and Friends &amp; Family release preparation.</li>
          </ul>
          <figure className="ai-case-figure ai-case-figure-map">
            <img src="/qcommerce-application-map.png" alt="Application map prepared at the start of the q-commerce project based on its requirements" loading="lazy" />
            <figcaption>Application map prepared at the start of the project from its requirements.</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="qcommerce-ai" open={openSection === 'qcommerce-ai'} onToggle={toggleSection} label="06 / AI collaboration" title="How did I use AI during the project?">
        <div className="ai-case-copy">
          <p>Throughout discovery and execution, I integrated AI tools as a strategic co-pilot to brainstorm and challenge design hypotheses, structure backlog tasks, organize work distribution, and accelerate visual inspiration gathering.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="qcommerce-impact" open={openSection === 'qcommerce-impact'} onToggle={toggleSection} label="07 / Impact &amp; handover" title="What did I deliver, and how was the project handed over?">
        <div className="ai-case-copy">
          <p>I owned and shaped the product design from initial concept through comprehensive wireframing and high-fidelity UI design. I built app components using the component library created by a second Product Designer, then iterated and refined the core experience through User Acceptance Testing (UAT) and Friends &amp; Family (F&amp;F) release phases.</p>
          <p>At this milestone, I handed over subsequent product phases to a fellow designer to lead the rollout.</p>
        </div>
      </CaseStudyAccordion>
    </div>
  )
}

function LufthansaLiveActivitiesCaseStudy() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const toggleSection = (id: string) => setOpenSection((current) => current === id ? null : id)

  return (
    <div className="ai-case-study">
      <div className="ai-case-facts">
        <div><span className="ui-label">Role</span><p>Lead Product Designer &amp; UX Researcher</p></div>
        <div><span className="ui-label">Team</span><p>iOS and Android developers, Product Owner, Product Manager, and UX researcher</p></div>
        <div><span className="ui-label">Timeline</span><p>2024</p></div>
        <div><span className="ui-label">Scope</span><p>Cross-platform flight updates for iOS Live Activities, Android Widgets, and Apple Watch</p></div>
        <div><span className="ui-label">Outcome</span><p>Established a cross-platform UX foundation and pre-launch tracking framework. Post-launch performance metrics are unavailable because I transitioned to another project before rollout.</p></div>
      </div>

      <CaseStudyAccordion id="lufthansa-problem" open={openSection === 'lufthansa-problem'} onToggle={toggleSection} label="01 / Problem" title="What was the core problem?">
        <div className="ai-case-copy">
          <p className="ai-case-lead">Uncertainty during air travel—especially around gate changes, delays, and tight connections—is a major trigger for passenger anxiety.</p>
          <p>Passengers often have to unlock their phones, refresh an app, or search flight information display boards in crowded terminals. The goal was to deliver real-time, glanceable flight updates directly to the Lock Screen. While iOS natively supports Live Activities via Dynamic Island and Lock Screens, Android required custom-built widgets to provide a comparable experience.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="lufthansa-role" open={openSection === 'lufthansa-role'} onToggle={toggleSection} label="02 / My role" title="How did I approach team collaboration and define my scope?">
        <div className="ai-case-copy">
          <p>As the Lead Product Designer &amp; UX Researcher, I managed the product process in close collaboration with iOS developers, Android developers, a Product Owner (PO), a Product Manager (PM), and a UX researcher.</p>
          <p>My responsibilities included aligning cross-functional teams through structured workshops, orchestrating quantitative and qualitative research, using AI to synthesize user feedback, navigating strict operating-system limitations, and bridging platform differences to deliver a unified cross-platform UX.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="lufthansa-research" open={openSection === 'lufthansa-research'} onToggle={toggleSection} label="03 / Research" title="What did our research uncover?">
        <div className="ai-case-copy">
          <p>We began with a quantitative survey (<strong>N = 177</strong>, delivering <strong>708 answers</strong>) to understand which information passengers prioritize at different stages of their journey.</p>
          <ul className="ai-case-list">
            <li><strong>High usefulness of real-time updates:</strong> Continuous updates before boarding received an average usefulness rating of <strong>4.61 out of 5</strong>.</li>
            <li><strong>Information hierarchy:</strong> Passengers prioritized a boarding-start countdown, gate location, and seat information over general departure times.</li>
            <li><strong>Visual and copy misunderstandings:</strong> The early three-segment progress line caused confusion. Brand yellow was read as a warning state, while “m” was understood as meters rather than minutes.</li>
            <li><strong>Privacy concerns:</strong> Users were apprehensive about full passenger names appearing on public Lock Screens.</li>
            <li><strong>Irregular situations:</strong> During delays, passengers urgently wanted to know how long the delay was and whether they would make their connection.</li>
          </ul>
          <figure className="ai-case-figure">
            <img src="/lufthansa-live-activities-journey-outcomes.webp" alt="Research outcomes and information priorities across pre-boarding, boarding, and in-flight stages" loading="lazy" />
            <figcaption>Passenger needs and information priorities across key phases of the journey.</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="lufthansa-process" open={openSection === 'lufthansa-process'} onToggle={toggleSection} label="04 / Process" title="How did we structure the design process and prototype validation?">
        <div className="ai-case-copy">
          <p>To balance fast value validation with a longer-term UX vision, I structured the work into four phases:</p>
          <ol className="ai-case-list">
            <li><strong>AI-powered research synthesis:</strong> Synthesized survey data and qualitative transcripts into functional requirements for Pre-Boarding, Boarding, and In-Flight/Transfer journey stages.</li>
            <li><strong>Strategic ideation and workshops:</strong> Developed parallel directions—Low-Hanging Fruits and Major Rework—and facilitated alignment workshops with developers, POs, and PMs to assess technical feasibility and implementation probability.</li>
            <li><strong>Usability testing and validation:</strong> Planned and conducted moderated qualitative testing to compare both prototypes, assess real-world usability, validate layout choices, and identify edge cases such as offline states and OS-specific entry points.</li>
            <li><strong>Pains vs. Needs matrix:</strong> Translated testing feedback into structured matrices, turning user frustrations into actionable UI design guidelines.</li>
          </ol>
          <figure className="ai-case-figure">
            <img src="/lufthansa-live-activities-research-process.png" alt="Iterative research and validation process mapping passenger pain points to technical solutions" loading="lazy" />
            <figcaption>Iterative research and validation: mapping passenger pain points to technical solutions.</figcaption>
          </figure>
          <figure className="ai-case-figure">
            <img src="/lufthansa-live-activities-test-scenario.png" alt="Moderated test scenario with questions for evaluating flight status information and Live Activities prototypes" loading="lazy" />
            <figcaption>Moderated test scenarios used to evaluate clarity, usefulness, and passenger needs.</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="lufthansa-decisions" open={openSection === 'lufthansa-decisions'} onToggle={toggleSection} label="05 / Design decisions" title="What were the key design decisions and cross-platform considerations?">
        <div className="ai-case-copy">
          <ul className="ai-case-list">
            <li><strong>UI design overhaul:</strong> Refined the final interface to work within the strict vertical height limits of Lock Screen containers.</li>
            <li><strong>Cross-platform parity:</strong> Created a consistent experience across iOS Live Activities and custom Android Widgets, and extended the system to Apple Watch displays.</li>
            <li><strong>Clarity in irregular cases:</strong> Refined layouts to provide immediate answers during flight cancellations and delays, including the impact on onward connections.</li>
          </ul>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="lufthansa-impact" open={openSection === 'lufthansa-impact'} onToggle={toggleSection} label="06 / Impact &amp; learning" title="What was the impact, and what did I learn?">
        <div className="ai-case-copy">
          <p>Post-launch performance metrics are not available because I moved to a new project before rollout. In collaboration with PMs and engineering leads, we established foundational tracking frameworks for user interaction, expansion rates, and widget data reliability.</p>
          <p>The research, AI-assisted synthesis, and prototype validation established a scalable cross-platform foundation for reducing passenger uncertainty and travel anxiety.</p>
          <figure className="ai-case-figure ai-case-figure-phone">
            <img src="/lufthansa-live-activities-update.png" alt="Lufthansa app update announcement introducing the Live Activities feature" loading="lazy" />
            <figcaption>The Lufthansa app update introducing Live Activities and real-time flight updates.</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>
    </div>
  )
}

function PortfolioScrollNote() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const endingHeading = document.querySelector('.work-showcase-item:nth-child(2) .work-project-link h3')
    if (!endingHeading) return

    let frame = 0
    const updateVisibility = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const { top, height } = stage.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const endingHeadingTop = endingHeading.getBoundingClientRect().top
        const fadeIn = Math.min(1, Math.max(0, (viewportHeight - (top + height)) / (viewportHeight * 0.15)))
        const fadeOut = Math.min(1, Math.max(0, (endingHeadingTop - viewportHeight * 0.85) / (viewportHeight * 0.15)))
        const visibility = Math.min(fadeIn, fadeOut)
        stage.style.setProperty('--scroll-note-visibility', visibility.toFixed(3))
      })
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <div ref={stageRef} className="portfolio-scroll-note-stage">
      <p className="portfolio-scroll-note">Make yourself comfy and enjoy</p>
    </div>
  )
}

function LufthansaBaggageReportingCaseStudy() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const toggleSection = (id: string) => setOpenSection((current) => current === id ? null : id)

  return (
    <div className="ai-case-study">
      <div className="ai-case-facts">
        <div><span className="ui-label">Role</span><p>Lead Product Designer</p></div>
        <div><span className="ui-label">Team</span><p>iOS and Android developers, Product Owner, Product Manager, and UX researcher</p></div>
        <div><span className="ui-label">Timeline</span><p>2024</p></div>
        <div><span className="ui-label">Scope</span><p>UX research, information architecture, prototyping, and UI design for delayed baggage reporting</p></div>
        <div><span className="ui-label">Outcome</span><p>Established a self-service reporting flow informed by passenger research and usability validation. The project focused on experience quality rather than post-launch metrics.</p></div>
      </div>

      <CaseStudyAccordion id="baggage-problem" open={openSection === 'baggage-problem'} onToggle={toggleSection} label="01 / Problem" title="What was the core problem and context?">
        <div className="ai-case-copy">
          <p className="ai-case-lead">Lost or delayed luggage can trigger immediate panic, uncertainty, and long queues at airport help desks.</p>
          <p>According to the <strong>2023 SITA Baggage IT Insights report</strong>, 41% of baggage complaints stem from a lack of status information and difficulty reporting delays. At the same time, 69% of passengers strongly prefer reporting missing bags directly through a mobile app rather than dealing with desk agents.</p>
          <p>The goal was to redesign the delayed baggage flow in the mobile app, giving passengers a clear way to report and track missing luggage after landing while reducing operational overhead for airline customer support.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="baggage-role" open={openSection === 'baggage-role'} onToggle={toggleSection} label="02 / My role" title="What was my role, and how did I collaborate with the team?">
        <div className="ai-case-copy">
          <p>As Lead Product Designer, I was responsible for UX research, information architecture, prototyping, and UI design.</p>
          <p>I worked closely with iOS developers, Android developers, a Product Owner (PO), a Product Manager (PM), and a UX researcher to align on technical feasibility and contextual interface states, including the differences between mid-flight and post-landing situations.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="baggage-research" open={openSection === 'baggage-research'} onToggle={toggleSection} label="03 / Research &amp; testing" title="How did I approach user research and usability testing?">
        <div className="ai-case-copy">
          <p>I formulated research hypotheses, set testing objectives, and ran qualitative usability sessions with passengers to uncover key behaviors and friction in the reporting flow.</p>
          <ul className="ai-case-list">
            <li><strong>Friction in expanded states:</strong> Expanding a passenger information tab caused the main reporting call to action (CTA) to disappear from view.</li>
            <li><strong>Need for automatic data mapping:</strong> Manual entry felt stressful. Showing bag numbers and weights beneath each passenger’s name reduced cognitive load.</li>
            <li><strong>Clear next steps:</strong> Explicit descriptions, icons, and real-time status guidance reassured passengers that their report had been submitted correctly.</li>
          </ul>
          <figure className="ai-baggage-figure">
            <img src="/lufthansa-baggage-testing-assumptions.webp" alt="Testing assumptions for the Lufthansa baggage reporting flow" loading="lazy" />
            <figcaption>Testing assumptions: validating the reporting flow and passenger details.</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="baggage-ai" open={openSection === 'baggage-ai'} onToggle={toggleSection} label="04 / AI in research" title="How did we use AI in the workflow?">
        <div className="ai-case-copy">
          <p>AI was used during qualitative research to help synthesize findings and generate structured diagnostic reports from user sessions. It supported research analysis only; it was not part of the app experience or used to generate code.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="baggage-decisions" open={openSection === 'baggage-decisions'} onToggle={toggleSection} label="05 / Design decisions" title="What were the key information architecture and design solutions?">
        <div className="ai-case-copy">
          <p>I restructured the flow so reporting options and baggage allowance details were intuitive and easy to access.</p>
          <ul className="ai-case-list">
            <li><strong>Persistent reporting action:</strong> Kept reporting options sticky and visible, including when information tabs are expanded.</li>
            <li><strong>Less manual input:</strong> Used passenger context to automatically populate baggage details and simplify reporting.</li>
            <li><strong>Reassuring status feedback:</strong> Added contextual status indicators to confirm what happens after a report is submitted.</li>
          </ul>
          <figure className="ai-baggage-figure">
            <img src="/lufthansa-baggage-overview-redesign.png" alt="Redesigned Lufthansa baggage overview with expanded passenger baggage details and a persistent report button" loading="lazy" />
            <figcaption>Redesigned baggage overview with passenger details and a reporting action that stays visible.</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="baggage-impact" open={openSection === 'baggage-impact'} onToggle={toggleSection} label="06 / Impact &amp; learning" title="What was the impact, and what did I learn?">
        <div className="ai-case-copy">
          <p>The project focused on information architecture, UX research, usability validation, and self-service flow design rather than post-launch metrics tracking. The redesign established a clear digital mechanism for reporting and tracking delayed baggage.</p>
          <p>In high-anxiety travel situations, removing cognitive friction and automating data entry can turn a stressful bureaucratic process into a more seamless, empowering self-service experience.</p>
        </div>
      </CaseStudyAccordion>
    </div>
  )
}

function MacronutrientTrackerCaseStudy() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const toggleSection = (id: string) => setOpenSection((current) => current === id ? null : id)

  return (
    <div className="ai-case-study">
      <div className="ai-case-facts">
        <div><span className="ui-label">Role</span><p>UX/UI Designer, research, and app promotion</p></div>
        <div><span className="ui-label">Team</span><p>Two co-founders: myself (UX/UI Designer) and my husband (Flutter developer)</p></div>
        <div><span className="ui-label">Timeline</span><p>2019–2021</p></div>
        <div><span className="ui-label">Scope</span><p>UX/UI design, research, interface patterns, component systems, and app promotion</p></div>
        <div><span className="ui-label">Outcome</span><p>Grew an organic community to nearly 1,000 followers and gained practical UX/UI design experience. The app did not achieve a validated business model.</p></div>
      </div>

      <CaseStudyAccordion id="makromapa-genesis" open={openSection === 'makromapa-genesis'} onToggle={toggleSection} label="01 / Project genesis" title="What was the core problem, and how did the project start?">
        <div className="ai-case-copy">
          <p className="ai-case-lead">In 2019, tracking daily macros while eating out felt like a guessing game. Seeing a gap in the Polish market for a restaurant macro tracker, my husband and I decided to build MakroMapa.</p>
          <p>My husband led Flutter development while I worked as a UX/UI designer, carried out research, and promoted the app. Our promotion grew an organic community of nearly <strong>1,000 followers</strong>. After maintaining the app for three years without a validated business model, we recognized that we had been building feature-driven UI based on personal assumptions rather than a real product strategy.</p>
          <figure className="ai-case-figure">
            <img src="/makromapa-add-dish-flow.png" alt="MakroMapa flow for adding a restaurant dish, from choosing a place to submitting its nutritional information" loading="lazy" />
            <figcaption>Adding a dish in MakroMapa: from selecting a place to submitting its nutritional details (2019).</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="makromapa-role" open={openSection === 'makromapa-role'} onToggle={toggleSection} label="02 / My role" title="What was my role, and how was the team structured?">
        <div className="ai-case-copy">
          <p>The team consisted of two co-founders: my husband, who led Flutter development, and me as UX/UI designer.</p>
          <p>I was responsible for research, UX/UI design, component systems, interface patterns, and promoting the app.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="makromapa-validation" open={openSection === 'makromapa-validation'} onToggle={toggleSection} label="03 / Research &amp; validation" title="How did we handle research, testing, and validation?">
        <div className="ai-case-copy">
          <p>Initially, the project was my practical learning sandbox. I learned to work with iOS and Android UI patterns and built component systems while developing the app.</p>
          <p>Looking back, we skipped foundational product validation. We did not conduct early qualitative interviews, market sizing, or structured usability testing before committing engineering effort. We continued adding features in a linear vacuum, relying on our own intuition rather than evidence from users or the market.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="makromapa-ai" open={openSection === 'makromapa-ai'} onToggle={toggleSection} label="04 / AI" title="Was AI used during the project?">
        <div className="ai-case-copy">
          <p>No. Artificial intelligence tools were not used during MakroMapa’s design or development between 2019 and 2021; they were not yet commonly integrated into these workflows.</p>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="makromapa-learnings" open={openSection === 'makromapa-learnings'} onToggle={toggleSection} label="05 / Critical learnings" title="What were the critical mistakes and product learnings?">
        <div className="ai-case-copy">
          <ul className="ai-case-list">
            <li><strong>Feature creep and technical debt:</strong> Continuously adding unverified features increased app size and maintenance overhead without proving user value.</li>
            <li><strong>No monetization or financial planning:</strong> We paid recurring app store maintenance fees for 1.5 years without first calculating operating costs or testing subscription conversion paths.</li>
            <li><strong>Output over outcomes:</strong> We shipped updates without monitoring post-launch retention, usage metrics, or business viability.</li>
          </ul>
        </div>
      </CaseStudyAccordion>

      <CaseStudyAccordion id="makromapa-impact" open={openSection === 'makromapa-impact'} onToggle={toggleSection} label="06 / Impact &amp; reflection" title="What was the ultimate impact, and what did I learn?">
        <div className="ai-case-copy">
          <p>MakroMapa did not become a commercial success, but it became my most important professional learning lab. The project reshaped my design practice: a polished interface is not enough without validated problem-solution fit, meaningful metrics, and alignment frameworks such as Opportunity Solution Trees (OST).</p>
          <p>This hands-on experience strengthened my UX/UI design practice and taught me to pair design and research with thoughtful app promotion and early validation.</p>
          <p>We did not track detailed financial or retention metrics. The figures we can substantiate are the organic community growth to nearly 1,000 followers and app store maintenance fees paid for 1.5 years.</p>
          <figure className="ai-case-figure ai-case-figure-phone">
            <img src="/makromapa-google-play-early-access.jpg" alt="MakroMapa listed in Google Play early access on a phone in 2019" loading="lazy" />
            <figcaption>MakroMapa in Google Play early access (2019).</figcaption>
          </figure>
          <figure className="ai-case-figure">
            <img src="/makromapa-app-store-presentation.png" alt="Promotional presentation of an early MakroMapa app version for the App Store in 2019" loading="lazy" />
            <figcaption>Promotional presentation of an early MakroMapa app version for the App Store (2019).</figcaption>
          </figure>
        </div>
      </CaseStudyAccordion>
    </div>
  )
}

const milestones = [
  {
    years: '2025 — 2026',
    place: 'Warsaw / Remote',
    title: 'Mastering the q-commerce area & AI innovation',
    achievements: [
      'Intensive AI capability growth.',
      'Designing full-cycle AI agent flows, including AI Painter Assistant.',
      'Leading workshops for Sektor 3.0.',
      'Solving ultra-fast grocery delivery architecture at SYZYGY Warsaw.',
    ],
  },
  {
    years: '2024 — 2025',
    place: 'Global Recognition',
    title: 'Peak achievements & new challenges',
    achievements: [
      'Lufthansa digital experience crowned World’s Best Airline App 2024.',
      'Completed Web Accessibility certification from W3Cx edX.',
      'Completed the Product Challenge Program, deepening cross-functional acumen.',
    ],
  },
  {
    years: '2022 — 2024',
    place: 'Lufthansa Group Digital Hangar',
    title: 'Deep growth and key Lufthansa projects',
    achievements: [
      'Led high-visibility flight day initiatives.',
      'Aligned a multi-carrier white-label design system.',
      'Designed the iOS Live Activities integration.',
      'Created end-to-end self-service baggage reporting recovery flows.',
    ],
  },
  {
    years: '2021 — 2022',
    place: 'SYZYGY Warsaw',
    title: 'Formalizing the transition to tech',
    achievements: [
      'Stepped decisively into dedicated Product Design.',
      'Applied architectural rigor and systemic design language to enterprise digital web and mobile ecosystems.',
    ],
  },
  {
    years: '2018 — 2021',
    place: 'Architecture & Entrepreneurship',
    title: 'Industry recognition and first pivot',
    achievements: [
      'Won 1st place in the national Mazda Design 2018 competition.',
      'Earned formal Architectural Licensure.',
      'Co-founded MakroMapa—sparking my obsession with scalable consumer software.',
    ],
  },
]

const beyondSkills = [
  {
    title: 'I start with the question, not the screen',
    summary: <>I take products from <strong>discovery to post-launch</strong>, and I like <strong>getting everyone in the room on day one</strong>. My workshops include <strong>developers, sales and support</strong>, because the best insight often sits in people, not only in research. I’m <strong>curious by default</strong>, and <strong>I follow through on what I promise</strong>.</>,
    details: [],
    links: [{ label: 'AI assistant case', href: '/work/ai-painter-assistant' }],
  },
  {
    title: 'I let evidence lead, and I look in unexpected places',
    summary: <>For Lufthansa, I ran <strong>13 Jobs-to-be-Done interviews</strong> with business travelers and used them to align the product trio around a <strong>5% app adoption goal</strong>. In another project, a survey of 186 contractors showed that <strong>33% faced serious delays</strong> waiting for technical advice. <strong>That single number defined what we built.</strong> After launch, I keep measuring: usability scores, task completion, click-through.</>,
    details: [],
    links: [
      { label: 'Lufthansa case', href: '/work/lufthansa-live-activities' },
      { label: 'AI assistant case', href: '/work/ai-painter-assistant' },
    ],
  },
  {
    title: 'I use AI with judgment',
    summary: <><strong>AI is only as good as the problem it solves.</strong> I’ve led discovery for an AI assistant from scratch, grounded in <strong>verified expert data instead of generic chat</strong>, and it cut waiting for answers <strong>from days to under a minute</strong>. I use AI to move faster, but I still <strong>note key quotes by hand</strong>, because one well-chosen sentence beats a smooth summary. I enjoy <strong>setting the standards for how a team works with AI</strong>.</>,
    details: [],
    links: [
      { label: 'Podcast episode', href: 'https://youtu.be/1bpnGlDjW2o' },
      { label: 'My first agent', href: 'https://www.linkedin.com/posts/agnieszka-malik_m%C3%B3j-pierwszy-agent-jestem-w-jednym-z-activity-7376503202109710336-i_HH' },
    ],
  },
]

const quotes = [
  [
    `Aga, I have truly enjoyed working with you. You were a reliable partner and your professionalism and expertise helped us doing the great projects we did in the last couple of months. I love how you turned our insights into action with a series of very structured workshops. I saw how you iterated on what you have learned through this. You leave behind a very valuable tool and outcome for the teams you've worked with that will have ongoing impact. Your way of working is very transparent and structured. Every team you will work with in the future will highly benefit from it—so had we. It is sad that our collaboration is coming to an end. I am excited to see what you will be up to next.`,
    'Rebecca Beranek',
    'User Researcher @ Lufthansa Group Digital Hangar',
  ],
  [
    `Agnieszka, a talented UX designer at Lufthansa, collaborated closely with me on developing the best airline mobile app. Her exceptional talent lies in translating complex requirements into intuitive and visually appealing designs. Her meticulous attention to detail ensures every screen and interaction is polished and purposeful. Beyond design expertise, Agnieszka is an exceptional collaborator, always seeking developers’ input and providing valuable UX/UI advice. Her experience in various fields makes her an outstanding choice for both simple and complex projects. Agnieszka’s deep understanding of user needs and ability to combine them with platforms and project-specific requirements inspire our team to consistently strive for excellence. Her positive attitude, curiosity, and empathy for users and colleagues contribute to a positive and collaborative work environment. Agnieszka is a delightful individual to work with, and I wholeheartedly recommend her to any team seeking a talented and collaborative UX designer.`,
    'Marcin Klisz',
    'iOS Developer, Lufthansa Systems',
  ],
  [
    `Working with Agnieszka was one of the highlights of my time at Lufthansa. Her talent in UI/UX design is unparalleled, and her ability to translate complex requirements into intuitive and visually compelling designs is nothing short of remarkable. We collaborated on the Live Activities feature, and from the very start, Agnieszka demonstrated an extraordinary understanding of user needs and iOS design principles.\n\nWhat stood out to me was her commitment to creating a seamless user experience while never compromising on aesthetics. Agnieszka is not only a creative force but also a true team player. She was always open to discussing different approaches, and her feedback was instrumental in refining the technical aspects of our work. Her passion for design is infectious, and her meticulous attention to detail ensures that every project she touches is executed to the highest standards.`,
    'Farid Shabonov',
    'Senior iOS Engineer at Lufthansa Systems',
  ],
  [
    `I had the pleasure of working with Agnieszka, and I can confidently say she is one of the best UX/UI designers I've collaborated with. Her deep knowledge of UX principles and keen attention to detail consistently resulted in user-friendly, beautifully designed app features. Agnieszka is not only highly skilled in her craft but also an excellent communicator and team player. She is always responsive, receptive to feedback, and brings a positive, collaborative attitude to every project. Agnieszka has a talent for owning features end-to-end, delivering high-quality results on time, and ensuring the design aligns perfectly with both user needs and business goals. Without a doubt, I would love to work with Agnieszka again in the future and highly recommend her to any team looking for a top-notch UX/UI designer.`,
    'Andrzej Sitek',
    'Senior Android Developer',
  ],
  [
    `I had the pleasure of working closely with Agnieszka on the Lufthansa mobile app project, and her impact was outstanding. From the outset, she led the UX/UI design process with exceptional attention to detail, from gathering business needs and translating them into user-friendly designs to collaborating seamlessly with developers to ensure a smooth implementation. Her ability to stay in close contact with both customers and engineers throughout the project was key to its success. Agnieszka consistently delivered high-quality work, making complex processes intuitive and user-centric. I highly recommend her for any design-driven project!`,
    'Kamil Radzimowski',
    'Software Engineer, Turnitin',
  ],
  [
    `I had the privilege of working with Agnieszka, who stands out as one of the best, if not the best, UI/UX designers I’ve ever collaborated with. Her design expertise was truly remarkable, consistently delivering user experiences that were not only visually stunning but also highly functional and intuitive.\n\nAgnieszka’s exceptional communication skills made her an invaluable member of our team. She always fostered a collaborative, open atmosphere and wasn’t afraid to make tough decisions when needed, balancing user needs and project goals with confidence and precision.\n\nOne of Agnieszka’s greatest strengths was her empathy. She genuinely understood user perspectives and always went beyond relying on her own instincts by gathering, analyzing, and applying user insights. This ensured that her designs resonated well with the target audience and drove meaningful outcomes. On top of her professional excellence, Agnieszka was incredibly easy to like—her warm and approachable nature made working with her a genuine pleasure.\n\nI wholeheartedly recommend Agnieszka to any team in need of a top-tier UI/UX designer. She’s a true asset, combining creativity, strategic thinking, and a deep understanding of user needs to elevate every project she works on.`,
    'Bartosz Olszewski',
    'Senior iOS Developer',
  ],
]

const stops = [
  { p: 0, bg: '#FFFFFF', text: '#1A1A1A', muted: '#716D66', accent: '#E6552F' },
  { p: 20, bg: '#F6D9C8', text: '#221815', muted: '#79635A', accent: '#C64A32' },
  { p: 40, bg: '#F2B8B0', text: '#271719', muted: '#765B5D', accent: '#9E3044' },
  { p: 60, bg: '#C9B8F0', text: '#201A31', muted: '#6D6482', accent: '#5945BE' },
  { p: (7 / (themeDotCount - 1)) * 100, bg: '#B7A9E0', text: '#000000', muted: '#000000', accent: '#5945BE' },
  { p: (8 / (themeDotCount - 1)) * 100, bg: '#4B55A8', text: '#F7F2E9', muted: '#DDE1FF', accent: '#FFD36E' },
  { p: 80, bg: '#3B4DD8', text: '#F7F2E9', muted: '#B7BEF3', accent: '#FFD36E' },
  { p: 100, bg: '#0E0E10', text: '#F4EFE6', muted: '#95928C', accent: '#C9B8F0' },
]

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return [n >> 16, (n >> 8) & 255, n & 255]
}

function mix(a: string, b: string, t: number) {
  const x = hexToRgb(a), y = hexToRgb(b)
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`
}

function themeAt(value: number) {
  const upper = stops.findIndex((stop) => stop.p >= value)
  if (upper <= 0) return stops[0]
  const a = stops[upper - 1], b = stops[upper]
  const t = (value - a.p) / (b.p - a.p)
  return { bg: mix(a.bg, b.bg, t), text: mix(a.text, b.text, t), muted: mix(a.muted, b.muted, t), accent: mix(a.accent, b.accent, t) }
}

function ThemeIcon({ value }: { value: number }) {
  const stage = value < 100 / 3 ? 'sun' : value < 200 / 3 ? 'plain' : 'moon'

  if (stage === 'moon') {
    return (
      <svg className="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    )
  }

  return (
    <span className="sun-icon" aria-hidden="true">
      {stage === 'sun' && (
        <span className="sun-dots">
          {Array.from({ length: 8 }, (_, index) => (
            <i key={index} style={{ '--dot-index': index } as React.CSSProperties} />
          ))}
        </span>
      )}
    </span>
  )
}

function ThemeControl({ value, onChange, gridMode, onToggleGrid }: { value: number; onChange: (n: number) => void; gridMode: boolean; onToggleGrid: () => void }) {
  const sliderValue = Math.round((value / 100) * (themeDotCount - 1))
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowHint(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div
      className="theme-control"
      style={{
        '--theme-position': `${36 + value * 2.88}px`,
      } as React.CSSProperties}
    >
      <div className="theme-slider-control">
        <button className="theme-trigger" aria-label="Pokaż ustawienia motywu">
          <ThemeIcon value={value} />
        </button>
        <div className="theme-popover" aria-label="Skala kolorystyki">
          <div className="theme-dots" aria-hidden="true">
            {Array.from({ length: themeDotCount }, (_, index) => (
              <span className={index === 0 || index === 6 || index === themeDotCount - 1 ? 'major' : ''} key={index} />
            ))}
          </div>
          <span className="theme-sun" aria-hidden="true"><ThemeIcon value={value} /></span>
          <input
            aria-label="Color theme"
            type="range"
            min="0"
            max={themeDotCount - 1}
            step="1"
            value={sliderValue}
            onChange={(event) => onChange((Number(event.target.value) / (themeDotCount - 1)) * 100)}
          />
        </div>
      </div>
      <button className={`grid-trigger ${gridMode ? 'active' : ''}`} type="button" aria-label="Przełącz linie podziału" aria-pressed={gridMode} onClick={onToggleGrid}>
        <span className="grid-icon" aria-hidden="true" />
      </button>
      {showHint && <span className="control-hint">change the look</span>}
    </div>
  )
}

function ReferenceCard({ quote, name, title }: { quote: string; name: string; title: string }) {
  const [expanded, setExpanded] = useState(false)
  const [textHeight, setTextHeight] = useState<string>('6.1em')
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    const updateHeight = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(text).lineHeight)
      const target = expanded ? text.scrollHeight : lineHeight * 5
      setTextHeight(`${target}px`)
    }

    const frame = requestAnimationFrame(updateHeight)
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(text)
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [expanded])

  return (
    <blockquote className="quote">
      <p ref={textRef} style={{ maxHeight: textHeight }}>“{quote}”</p>
      <button className="quote-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : 'Read more'}
      </button>
      <footer>
        <span className="quote-author">{name}</span>
        <span>{title}</span>
      </footer>
    </blockquote>
  )
}

function VideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) await video.play()
    else video.pause()
  }

  return (
    <div className="video-module">
      <video
        ref={videoRef}
        muted={muted}
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          if (event.currentTarget.currentTime >= 3) event.currentTarget.currentTime = 0
        }}
        aria-label="Three-second black and white sample video"
      >
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      </video>
      <div className="video-controls">
        <button type="button" onClick={togglePlayback}>
          <span className={`control-icon ${playing ? 'pause' : 'play'}`} aria-hidden="true" />
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" onClick={() => setMuted(!muted)}>
          <svg className="speaker-icon" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2.5 7h3L9 4v10l-3.5-3h-3z" />
            {!muted && <path d="M11.5 6.2c1.5 1.5 1.5 4.1 0 5.6M13.7 4c2.8 2.8 2.8 7.2 0 10" />}
            {muted && <path d="m12 7 4 4m0-4-4 4" />}
          </svg>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [audience, setAudience] = useState('For everyone')
  const [active, setActive] = useState('intro')
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null)
  const [theme, setTheme] = useState(0)
  const [gridMode, setGridMode] = useState(false)
  const [loaderKey, setLoaderKey] = useState(0)
  const [activeProject, setActiveProject] = useState<WorkProject | null>(() => (
    workProjects.find((project) => window.location.pathname === `/work/${project.slug}`) ?? null
  ))
  const audienceRowRef = useRef<HTMLDivElement>(null)
  const audienceButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicatorPosition, setIndicatorPosition] = useState<{ left: number; top: number } | null>(null)
  const palette = useMemo(() => themeAt(theme), [theme])

  useLayoutEffect(() => {
    if (activeProject) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeProject])

  useEffect(() => {
    if (!isLoading) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('is-loading')
    const timeout = window.setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove('is-loading')
    }, reduceMotion ? 100 : 2350)

    return () => {
      window.clearTimeout(timeout)
      document.body.classList.remove('is-loading')
    }
  }, [isLoading, loaderKey])

  useEffect(() => {
    document.documentElement.style.backgroundColor = palette.bg
    document.body.style.backgroundColor = palette.bg
  }, [palette.bg])

  useLayoutEffect(() => {
    const row = audienceRowRef.current
    const button = audienceButtonRefs.current[audience]
    if (!row || !button) return

    const positionIndicator = () => {
      setIndicatorPosition({
        left: button.offsetLeft + button.offsetWidth / 2,
        top: button.offsetTop - 9,
      })
    }

    positionIndicator()
    const resizeObserver = new ResizeObserver(positionIndicator)
    resizeObserver.observe(row)
    return () => resizeObserver.disconnect()
  }, [audience, activeProject])

  useEffect(() => {
    const syncProjectRoute = () => {
      setActiveProject(workProjects.find((project) => window.location.pathname === `/work/${project.slug}`) ?? null)
    }
    window.addEventListener('popstate', syncProjectRoute)
    return () => window.removeEventListener('popstate', syncProjectRoute)
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal')
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.08 })
    items.forEach((item) => revealObserver.observe(item))
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e) => setActive(e.target.id))
    }, { rootMargin: '-35% 0px -55% 0px' })
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })
    return () => { revealObserver.disconnect(); sectionObserver.disconnect() }
  }, [activeProject])

  const openProject = (project: WorkProject) => {
    window.history.pushState({}, '', `/work/${project.slug}`)
    setActiveProject(project)
    setMenuOpen(false)
    setLoaderKey((key) => key + 1)
    setIsLoading(true)
  }

  const goTo = (id: string) => {
    if (id === 'intro') {
      if (activeProject) {
        window.history.pushState({}, '', '/')
        setAudience('For everyone')
        setActiveProject(null)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const nextProject = activeProject
    ? workProjects[(workProjects.findIndex((project) => project.slug === activeProject.slug) + 1) % workProjects.length]
    : null

  return (
    <div className={`site ${gridMode ? 'grid-mode' : ''}`} style={{ '--bg': palette.bg, '--text': palette.text, '--muted': palette.muted, '--accent': palette.accent } as React.CSSProperties}>
      {isLoading && (
        <div key={loaderKey} className="page-loader" role="status" aria-label="Loading portfolio" style={{ backgroundColor: palette.bg }} />
      )}
      <header className="mobile-bar">
        <button className="wordmark" aria-label="Aga Malik — przejdź do początku" onClick={() => goTo('intro')}>
          <span className="wordmark-mark">A</span>
          <span className="wordmark-dot" aria-hidden="true" />
          <span className="wordmark-full" aria-hidden="true">ga Mal<span className="dotless-i">ı</span>k</span>
        </button>
        <button className={`menu-button ${menuOpen ? 'open' : ''}`} aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      </header>

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <button className="wordmark desktop-wordmark" aria-label="Aga Malik — przejdź do początku" onClick={() => goTo('intro')}>
          <span className="wordmark-mark">A</span>
          <span className="wordmark-dot" aria-hidden="true" />
          <span className="wordmark-full" aria-hidden="true">ga Mal<span className="dotless-i">ı</span>k</span>
        </button>
        <nav aria-label="Main navigation">
          {activeProject
            ? <button className="back-to-main" onClick={() => goTo('intro')}><span aria-hidden="true">←</span> Back to main page</button>
            : sections.map((id) => <button key={id} className={active === id ? 'active' : ''} onClick={() => goTo(id)}>{sectionLabels[id] ?? id[0].toUpperCase() + id.slice(1)}</button>)}
        </nav>
        <ThemeControl value={theme} onChange={setTheme} gridMode={gridMode} onToggleGrid={() => setGridMode(!gridMode)} />
      </aside>

      <main className={activeProject ? 'project-main' : ''}>
        {activeProject ? (
          <section className="project-detail reveal visible">
            <div className="project-detail-heading">
              <span className="ui-label">{activeProject.year} · {activeProject.clientDisplay}</span>
              {activeProject.undisclosed && <span className="undisclosed-label">Undisclosed</span>}
              <h1>{activeProject.title}</h1>
              <div className="project-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <figure className="project-hero-image">
              <img src={activeProject.image} alt={activeProject.imageAlt} />
            </figure>
            {activeProject.slug === 'ai-painter-assistant' ? <AIPainterCaseStudy /> : activeProject.slug === 'retail-speed-logistics' ? <QCommerceCaseStudy /> : activeProject.slug === 'lufthansa-live-activities' ? <LufthansaLiveActivitiesCaseStudy /> : activeProject.slug === 'lufthansa-baggage-reporting' ? <LufthansaBaggageReportingCaseStudy /> : activeProject.slug === 'macronutrient-tracker' ? <MacronutrientTrackerCaseStudy /> : (
              <>
                <div className="project-story">
                  <p className="project-story-lead">{activeProject.description}</p>
                  <div className="project-story-copy">
                    <span className="ui-label">About the project</span>
                    <p>{activeProject.detail}</p>
                  </div>
                </div>
                <div className="project-gallery">
                  {activeProject.detailImages.map((image, index) => (
                    <figure key={image}>
                      <img src={image} alt={`${activeProject.title} — project visual ${index + 1}`} loading="lazy" />
                    </figure>
                  ))}
                </div>
              </>
            )}
            {nextProject && (
              <div className="project-next">
                <a href={`/work/${nextProject.slug}`} aria-label={`Next project: ${nextProject.title}`} onClick={(event) => { event.preventDefault(); openProject(nextProject) }}>
                  Next project <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </section>
        ) : (
        <>
        <section id="intro" className="intro reveal">
          <div className="intro-audience" ref={audienceRowRef} role="group" aria-label="Wybierz odbiorcę">
            {audiences.map((item) => (
              <button
                key={item}
                ref={(node) => { audienceButtonRefs.current[item] = node }}
                className={audience === item ? 'active' : ''}
                aria-pressed={audience === item}
                onClick={() => setAudience(item)}
              >
                {item}
                {item === 'Video' && <span className="video-option-icon" aria-hidden="true" />}
              </button>
            ))}
            {indicatorPosition && (
              <span
                className="audience-indicator"
                style={{ left: indicatorPosition.left, top: indicatorPosition.top }}
                aria-hidden="true"
              >
                <span className="audience-indicator-dot" key={audience} />
              </span>
            )}
          </div>
          <div className="audience-copy" key={audience}>
            {audienceCopy[audience].map((p, i) => <p key={i}>{p}</p>)}
            {audience === 'Video' && <VideoPanel />}
          </div>
        </section>

        <PortfolioScrollNote />

        <section id="work" className="reveal">
          <div className="work-list">
            {workProjects.map((project) => (
              <article className="work-row work-showcase-item" key={project.slug}>
                <div className="work-project-title-column">
                  <button className="work-project-link" type="button" onClick={() => openProject(project)}>
                    <h3>{project.displayTitle}<span aria-hidden="true"> ↗</span></h3>
                  </button>
                </div>
                <div className="work-project-info-column">
                  <div className="work-project-meta">
                    <span>{project.year}</span>
                    <span>{project.clientDisplay}</span>
                    {project.undisclosed && <span className="work-undisclosed">Undisclosed</span>}
                  </div>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="reveal">
          <h2 className="section-title beyond-title"><span className="beyond-title-word">Beyond</span> skills</h2>
          <p className="beyond-intro"><strong>My superpower?</strong> I take responsibility for the entire process. I am not afraid to lead projects or facilitate workshops, and I enjoy doing so in engaging, unconventional ways that deliver better results.</p>
          <div className="beyond-skills">
            {beyondSkills.map((skill, index) => (
              <article className="beyond-skill" key={skill.title}>
                <div className="beyond-skill-heading">
                  <span className="ui-label">0{index + 1}</span>
                  <h3>{skill.title}</h3>
                </div>
                <div className="beyond-skill-body">
                  <p className="beyond-summary">{skill.summary}</p>
                  {skill.details.length > 0 && (
                    <div className="beyond-details">
                      {skill.details.map((detail) => <p key={detail}>{detail}</p>)}
                    </div>
                  )}
                  {skill.links.length > 0 && (
                    <div className="beyond-links">
                      {skill.links.map((link) => (
                        <a
                          href={link.href}
                          key={link.label}
                          onClick={(event) => {
                            const project = workProjects.find((item) => link.href === `/work/${item.slug}`)
                            if (project) {
                              event.preventDefault()
                              openProject(project)
                            }
                          }}
                        >
                          {link.label}<span aria-hidden="true"> ↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="background" className="reveal">
          <div className="background-heading">
            <h2>Lifetime milestones</h2>
          </div>
          <div className="milestone-list">
            {milestones.map((milestone, index) => {
              const isOpen = expandedMilestone === index
              return (
                <article className={`milestone ${isOpen ? 'open' : ''}`} key={milestone.years}>
                  <button
                    className="milestone-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpandedMilestone(isOpen ? null : index)}
                  >
                    <span className="milestone-years">{milestone.years}</span>
                    <span className="milestone-title">{milestone.title}</span>
                    <span className="milestone-symbol" aria-hidden="true" />
                  </button>
                  <div className="milestone-content">
                    <ul>
                      {milestone.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="references" className="reveal">
          <h2 className="section-title">References</h2>
          <div className="quote-grid">
            {quotes.map(([quote, name, title]) => <ReferenceCard key={name} quote={quote} name={name} title={title} />)}
          </div>
        </section>

        <section id="contact" className="contact reveal">
          <div className="contact-grid">
            <div>
              <p className="availability"><span aria-hidden="true" />Open to new opportunities</p>
              <a className="big-link" href="mailto:agnieszka.w.malik@gmail.com">agnieszka.w.malik@gmail.com</a>
              <p className="remote-note">I love working with the team offline, but I'm also available for remote-friendly work.</p>
              <div className="contact-actions">
                <a className="social-link" href="https://www.linkedin.com/in/agnieszka-malik/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a className="cv-link" href="/agnieszka-malik-cv.pdf" download="agnieszka-malik-cv.pdf">Download CV ↓</a>
              </div>
            </div>
            <figure>
              <img
                className={theme < (7 / (themeDotCount - 1)) * 100 ? 'theme-tinted' : ''}
                src="/aga-malik-contact-portrait.png"
                alt="Aga Malik"
              />
            </figure>
          </div>
        </section>
        </>
        )}
      </main>
    </div>
  )
}
