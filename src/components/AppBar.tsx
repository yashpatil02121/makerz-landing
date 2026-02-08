// components/AppBar.tsx
import { useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ComingSoonDialog from "./ComingSoonDialog"

gsap.registerPlugin(ScrollTrigger)

/* ================= SCROLL HANDLER ================= */

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

/* ================= APP BAR ================= */

export default function AppBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleNav = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <header className="
        fixed top-0 left-0 right-0 z-50
        bg-white/60 backdrop-blur
        border-b border-gray-200/60
      ">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-8 md:px-24">

          {/* Logo */}
          <div
            className="
              font-semibold text-lg sm:text-xl
              bg-gradient-to-r from-green-500 to-emerald-600
              bg-clip-text text-transparent
              cursor-pointer
            "
            onClick={() => handleNav("top")}
          >
            MakerZ.Network
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <button onClick={() => handleNav("how")} className="hover:text-black">
              How it works
            </button>
            <button onClick={() => handleNav("roles")} className="hover:text-black">
              Roles
            </button>
            <button onClick={() => handleNav("learn-do")} className="hover:text-black">
              Learn ↔ Do
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setDialogOpen(true)}
              className="px-4 py-2 text-sm border rounded-md hover:border-black transition"
            >
              Sign in
            </button>
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:shadow-lg hover:shadow-green-600/30 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-[2px] bg-black mb-1" />
            <div className="w-6 h-[2px] bg-black mb-1" />
            <div className="w-6 h-[2px] bg-black" />
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="
            md:hidden
            absolute top-16 left-0 right-0
            bg-white/90 backdrop-blur
            border-t border-gray-200
            shadow-xl
          ">
            <nav className="flex flex-col px-6 py-6 gap-4 text-gray-700 text-base">
              <button onClick={() => handleNav("how")} className="text-left">
                How it works
              </button>
              <button onClick={() => handleNav("roles")} className="text-left">
                Roles
              </button>
              <button onClick={() => handleNav("learn-do")} className="text-left">
                Learn ↔ Do
              </button>

              <div className="h-px bg-gray-200 my-3" />

              <button
                onClick={() => {
                  setMenuOpen(false)
                  setDialogOpen(true)
                }}
                className="py-2 border rounded-md"
              >
                Sign in
              </button>

              <button className="py-2 bg-green-600 text-white rounded-md">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* ================= COMING SOON DIALOG ================= */}
      <ComingSoonDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
