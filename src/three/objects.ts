import * as THREE from "three"
import { scene } from "./scene"

/* =========================
   MakerZ Digital Brain
========================= */

export const coreGroup = new THREE.Group()
coreGroup.name = "makerz-core"

/* =========================
   RESPONSIVE LAYOUT CONFIG
========================= */

function getLayoutConfig() {
  const w = window.innerWidth

  // Mobile
  if (w < 640) {
    return {
      brainPos: new THREE.Vector3(0, 0, 0),
      brainScale: 0.65,
      neuralRadius: 3.4,
      neuralPos: new THREE.Vector3(0, 0, -2),
      nodeCount: 18,
    }
  }

  // Tablet
  if (w < 1024) {
    return {
      brainPos: new THREE.Vector3(1.4, 0, 0),
      brainScale: 0.8,
      neuralRadius: 4.4,
      neuralPos: new THREE.Vector3(1.2, 0, -2.4),
      nodeCount: 24,
    }
  }

  // Desktop
  return {
    brainPos: new THREE.Vector3(3.0, 0, 0),
    brainScale: 0.95,
    neuralRadius: 5.6,
    neuralPos: new THREE.Vector3(2.2, 0.3, -2.6),
    nodeCount: 30,
  }
}

/* ---------- SHARED ---------- */

const SPHERE = new THREE.SphereGeometry(1, 96, 96)

const createNode = (
  color: string,
  position: [number, number, number],
  scale: number
) => {
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.25,
    metalness: 0.08,
    transparent: true,
    opacity: 0.95,
  })

  const mesh = new THREE.Mesh(SPHERE, material)
  mesh.position.set(...position)
  mesh.scale.set(scale, scale, scale)
  return mesh
}

/* ---------- STACKED BRAIN LAYERS ---------- */

const blue = createNode("#2F80ED", [-1.05, -0.55, 0.05], 0.8)
const orange = createNode("#F2994A", [0.20, 0.95, 0.05], 1.05)
const red = createNode("#2F80ED", [-0.85, 0.45, 0.05], 0.9)
const yellow = createNode("#F2C94C", [1.5, 0.25, 0.05], 1.25)
const blackCore = createNode("#111827", [0.30, -0.35, 0.05], 0.65)
const blackLower = createNode("#1F2937", [0.0, -1.05, 0.05], 0.5)

/* ---------- CURVED NERVE PIPES ---------- */

const createCurvedPipe = (
  color: string,
  curveStrength: number,
  depthOffset: number
) => {
  const start = blackLower.position.clone()
  const end = new THREE.Vector3(
    start.x - 1.1,
    start.y - 1.2,
    start.z + depthOffset
  )

  const mid = start.clone().lerp(end, 0.5)
  mid.y -= 0.2
  mid.x -= curveStrength

  const curve = new THREE.CatmullRomCurve3([start, mid, end])
  const geometry = new THREE.TubeGeometry(curve, 32, 0.1, 16, false)

  return new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
  )
}

const pipeBlack  = createCurvedPipe("#111827", 0.15, 0.05)
const pipeRed    = createCurvedPipe("#EB5757", 0.10, 0.07)
const pipeYellow = createCurvedPipe("#F2C94C", 0.03, 0.05)

/* ---------- ASSEMBLE CORE ---------- */

coreGroup.add(
  blue,
  orange,
  red,
  yellow,
  blackCore,
  blackLower,
  pipeBlack,
  pipeRed,
  pipeYellow
)

coreGroup.rotation.set(0.2, 0.4, 0)

const existing = scene.getObjectByName("makerz-core")
if (existing) scene.remove(existing)
scene.add(coreGroup)

/* ======================================================
   NEURAL NETWORK FIELD
====================================================== */

const neuralField = new THREE.Group()
neuralField.name = "neural-field"
scene.add(neuralField)

const neuralNodeGeometry = new THREE.SphereGeometry(0.07, 16, 16)
const neuralNodes: {
  mesh: THREE.Mesh
  phase: number
  speed: number
}[] = []

const BRAIN_RADIUS = 2.0

/* ---------- CLEAN & REBUILD ---------- */

function rebuildNeuralField() {
  neuralField.clear()
  neuralNodes.length = 0

  const layout = getLayoutConfig()
  const HALF = Math.floor(layout.nodeCount / 2)

  const createNeuralNode = (side: "left" | "right") => {
    const mesh = new THREE.Mesh(
      neuralNodeGeometry,
      new THREE.MeshStandardMaterial({
        color: "#2F80ED",
        transparent: true,
        opacity: 0.35,
        roughness: 0.2,
        metalness: 0.1,
        emissive: "#2F80ED",
        emissiveIntensity: 0.25,
      })
    )

    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = layout.neuralRadius + Math.random() * 0.4

    let x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.cos(phi) * 0.6
    const z = r * Math.sin(phi) * Math.sin(theta)

    if (side === "left") x = -Math.abs(x)
    if (side === "right") x = Math.abs(x)

    mesh.position.set(x, y, z)

    neuralNodes.push({
      mesh,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.6,
    })

    neuralField.add(mesh)
  }

  for (let i = 0; i < HALF; i++) createNeuralNode("left")
  for (let i = 0; i < HALF; i++) createNeuralNode("right")

  // connection lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "#2F80ED",
    transparent: true,
    opacity: 0.12,
  })

  const intersectsBrain = (a: THREE.Vector3, b: THREE.Vector3) => {
    const ab = b.clone().sub(a)
    const t = -a.dot(ab) / ab.lengthSq()
    const closest = a.clone().add(ab.multiplyScalar(THREE.MathUtils.clamp(t, 0, 1)))
    return closest.length() < BRAIN_RADIUS
  }

  for (let i = 0; i < neuralNodes.length; i++) {
    for (let j = i + 1; j < neuralNodes.length; j++) {
      if (
        Math.random() > 0.82 &&
        !intersectsBrain(neuralNodes[i].mesh.position, neuralNodes[j].mesh.position)
      ) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          neuralNodes[i].mesh.position,
          neuralNodes[j].mesh.position,
        ])
        neuralField.add(new THREE.Line(geo, lineMaterial))
      }
    }
  }

  // apply layout
  coreGroup.position.copy(layout.brainPos)
  coreGroup.scale.setScalar(layout.brainScale)
  neuralField.position.copy(layout.neuralPos)
}

/* ---------- INITIAL BUILD ---------- */

rebuildNeuralField()

window.addEventListener("resize", rebuildNeuralField)

/* ======================================================
   PULSE ANIMATION
====================================================== */

const clock = new THREE.Clock()

function animateNeuralPulse() {
  const t = clock.getElapsedTime()
  neuralNodes.forEach(({ mesh, phase, speed }) => {
    const p = Math.sin(t * speed + phase)
    mesh.scale.setScalar(1 + p * 0.25)
    ;(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.25 + p * 0.35
  })
  requestAnimationFrame(animateNeuralPulse)
}

animateNeuralPulse()
