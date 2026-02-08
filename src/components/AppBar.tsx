// components/AppBar.tsx
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const trigger = ScrollTrigger.getAll()[0]
  if (!trigger) return

  const totalScroll = trigger.end
  const targetScroll =
    (el.offsetTop / (document.body.scrollHeight - window.innerHeight)) *
    totalScroll

  gsap.to(trigger, {
    scroll: targetScroll,
    duration: 1.2,
    ease: "power3.inOut",
  })
}

export default function AppBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur ">
      <div className="flex items-center justify-between px-12 md:px-24 h-16">

        <div className="font-semibold text-xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          MakerZ.Network
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-gray-600">
          <button onClick={() => scrollToSection("how")}>How it works</button>
          <button onClick={() => scrollToSection("roles")}>Roles</button>
          <button onClick={() => scrollToSection("learn-do")}>Learn ↔ Do</button>
        </nav>

        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded-md">Sign in</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md">
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
