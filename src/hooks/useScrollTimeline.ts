import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { coreGroup } from "../three/objects"
import { camera } from "../three/camera"
import { scene } from "../three/scene"

gsap.registerPlugin(ScrollTrigger)

export default function useScrollTimeline() {
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())

    // 🔍 Find neural field safely from scene
    const neuralField = scene.getObjectByName("neural-field")

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#page",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    })

    /* =========================
       🔁 CONTINUOUS ROTATION
    ========================= */

    // Brain rotation
    tl.to(
      coreGroup.rotation,
      {
        y: Math.PI * 3,
        ease: "none",
      },
      0
    )

    // Neural field rotation (only if it exists)
    if (neuralField) {
      tl.to(
        neuralField.rotation,
        {
          y: Math.PI * 2,
          x: Math.PI * 0.15,
          ease: "none",
        },
        0
      )
    }

    /* =========================
       CAMERA MOTION
    ========================= */

    tl.to(camera.position, { z: 7, ease: "none" }, 0)
    tl.to(camera.position, { z: 6.2, ease: "none" }, 0.33)
    tl.to(camera.position, { z: 5, ease: "none" }, 0.66)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
}
