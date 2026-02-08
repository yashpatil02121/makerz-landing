import AppBar from "./AppBar"

export default function ScrollSections() {
  return (
    <>
    <AppBar />
    <div className="relative z-10 text-black overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center px-12 md:px-24 overflow-hidden">
        <SectionBackground
          // gradient="
          //   radial-gradient(circle at 30% 40%,
          //     rgba(236,253,245,0.9),
          //     rgba(220,252,231,0.5),
          //     rgba(255,255,255,0)
          //   )
          // "
          gradient="
            radial-gradient(circle at 50% 50%,
              rgba(16,185,129,0.25),
              rgba(255,255,255,0)
            )
          "
        />

        <div className="relative z-10 max-w-2xl space-y-6">
          {/* <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-200 text-sm text-gray-500 bg-white/60 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            MakerZ.Network
          </span> */}

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Learning meets{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              execution
            </span>
          </h1>

          <p className="text-xl text-gray-500">
            Learn the right way. Build the right way.
          </p>

          <p className="text-lg text-gray-500">
            A structured platform where learning turns into real execution
            through guided artifacts and process governance.
          </p>

          <div className="pt-6 flex gap-6">
            <button className="group px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-600/30 transition-all duration-300">
              Start Learning
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            <button className="px-8 py-4 border border-gray-300 rounded-lg hover:border-black transition bg-white/60 backdrop-blur">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="relative h-screen flex items-center px-12 md:px-24 overflow-hidden">
        <SectionBackground
          gradient="
            radial-gradient(circle at 70% 30%,
              rgba(254,242,242,0.7),
              rgba(255,255,255,0)
            )
          "
        />

        <div className="relative z-10 max-w-3xl space-y-10">
          <h2 className="text-5xl font-bold">
            Why teams struggle to deliver
          </h2>

          <p className="text-xl text-gray-500">
            Traditional learning platforms teach concepts but fail to bridge the
            gap between knowledge and execution.
          </p>

          <div className="grid gap-6">
            <ProblemCard
              title="Learning without execution"
              text="Teams invest in training, but theory never turns into real work."
            />
            <ProblemCard
              title="Inconsistent artifacts"
              text="Everyone documents differently. No structure. No quality control."
            />
            <ProblemCard
              title="No process enforcement"
              text="Critical steps get skipped. Projects drift."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="relative h-screen flex items-center px-12 md:px-24 overflow-hidden">
        <SectionBackground
          gradient="
            radial-gradient(circle at 50% 40%,
              rgba(239,246,255,0.7),
              rgba(255,255,255,0)
            )
          "
        />

        <div className="relative z-10 max-w-4xl">
          <h2 className="text-5xl font-bold mb-12">
            From learning to execution in 5 steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Step n="01" title="Join a Portfolio">
              Get onboarded into a structured learning environment with your team.
            </Step>
            <Step n="02" title="Learn Through Bootcamps">
              Role-specific training for Product Owners, Designers, and Engineers.
            </Step>
            <Step n="03" title="Create Guided Artifacts">
              Apply learning using section-based templates.
            </Step>
            <Step n="04" title="Get AI + Human Validation">
              Instant AI feedback plus expert human review.
            </Step>
            <Step n="05" title="Progress Through Workflow">
              Governed stages with sequencing and approvals.
            </Step>
          </div>
        </div>
      </section>

      {/* ================= LEARN ↔ DO ================= */}
      <section id="learn-do" className="relative h-screen flex items-center px-12 md:px-24 overflow-hidden">
        <SectionBackground
          gradient="
            radial-gradient(circle at 50% 50%,
              rgba(236,253,245,0.6),
              rgba(255,255,255,0)
            )
          "
        />

        <div className="relative z-10 max-w-4xl">
          <h2 className="text-5xl font-bold mb-12">
            Learn ↔ Do: Intentional Mode Switching
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ModeCard title="Learn Mode">
              <li>Read-only guided experience</li>
              <li>Structured curriculum by role</li>
              <li>Examples & references</li>
              <li>Focus on understanding</li>
            </ModeCard>

            <ModeCard title="Do Mode">
              <li>Guided execution</li>
              <li>Real-time AI assistance</li>
              <li>Progress validation</li>
              <li>Professional output</li>
            </ModeCard>
          </div>
        </div>
      </section>

      {/* ================= WHO IT’S FOR ================= */}
      <section id="roles" className="relative h-screen flex items-center px-12 md:px-24 overflow-hidden">
        <SectionBackground
          gradient="
            radial-gradient(circle at 50% 30%,
              rgba(250,250,250,1),
              rgba(255,255,255,0)
            )
          "
        />

        <div className="relative z-10 max-w-5xl">
          <h2 className="text-5xl font-bold mb-12">
            Designed for every product role
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Role title="Product Owners">
              Requirements, user stories, roadmaps, PRDs.
            </Role>
            <Role title="Designers">
              UI specs, design systems, prototypes.
            </Role>
            <Role title="Engineers">
              Tech specs, architecture, APIs.
            </Role>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative h-screen flex items-center px-12 md:px-24 overflow-hidden">
        <SectionBackground
          gradient="
            radial-gradient(circle at 50% 50%,
              rgba(16,185,129,0.25),
              rgba(255,255,255,0)
            )
          "
        />

        <div className="relative z-10 max-w-3xl space-y-8">
          <h2 className="text-6xl font-bold">
            Build with clarity.
            <br />
            Execute with confidence.
          </h2>

          <p className="text-xl text-gray-500">
            Join teams who transformed how they learn and deliver.
          </p>

          <button className="px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-xl hover:scale-[1.03] transition-transform">
            Join the Network
          </button>
        </div>
      </section>
    </div>
    </>
  )
}

/* ================= BACKGROUND LAYER ================= */

function SectionBackground({ gradient }: { gradient: string }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="absolute inset-0 backdrop-blur-[1.5px]" />
      <div className="
        absolute inset-0 opacity-[0.04]
        bg-[radial-gradient(#000_1px,transparent_1px)]
        bg-[length:12px_12px]
      " />
    </div>
  )
}

function GlassCard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="
      p-6 rounded-2xl
      bg-white/70 backdrop-blur
      border border-gray-200
      hover:shadow-xl hover:border-green-500/40
      transition-all duration-300
    ">
      {children}
    </div>
  )
}

/* ================= COMPONENTS ================= */

function ProblemCard({ title, text }: { title: string; text: string }) {
  return (
    <GlassCard>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-500">{text}</p>
    </GlassCard>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <GlassCard>
      <p className="text-green-600 font-bold mb-2">{n}</p>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-500">{children}</p>
    </GlassCard>
  )
}

function ModeCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <GlassCard>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-500">{children}</ul>
    </GlassCard>
  )
}

function Role({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <GlassCard>
      <h4 className="text-2xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-500">{children}</p>
    </GlassCard>
  )
}
