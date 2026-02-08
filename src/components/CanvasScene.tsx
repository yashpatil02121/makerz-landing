import { useEffect, useRef } from "react"
import * as THREE from "three"
import { scene } from "../three/scene"
import { camera } from "../three/camera"
import "../three/lights"
import "../three/objects" // 🔴 IMPORTANT: side-effect import
import useScrollTimeline from "../hooks/useScrollTimeline"

export default function CanvasScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameId = useRef<number | null>(null)

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    mountRef.current!.appendChild(renderer.domElement)

    const render = () => {
      renderer.render(scene, camera)
      frameId.current = requestAnimationFrame(render)
    }

    render()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", onResize)

    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  useScrollTimeline()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  )
}
