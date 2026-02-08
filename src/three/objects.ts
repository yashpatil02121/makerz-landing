import * as THREE from "three"
import { scene } from "./scene"

/* =========================
   MakerZ Digital Brain
========================= */

export const coreGroup = new THREE.Group()
coreGroup.name = "makerz-core"

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

  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.6,
  })

  return new THREE.Mesh(geometry, material)
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

coreGroup.position.set(3.0, 0, 0)
coreGroup.rotation.set(0.2, 0.4, 0)
coreGroup.scale.set(0.95, 0.95, 0.95)

const existing = scene.getObjectByName("makerz-core")
if (existing) scene.remove(existing)
scene.add(coreGroup)

/* ======================================================
   NEURAL NETWORK FIELD (BALANCED AROUND BRAIN)
====================================================== */

const neuralField = new THREE.Group()
neuralField.name = "neural-field"

const BRAIN_RADIUS = 2.0
const NEURAL_SHELL_RADIUS = 5.6

const NODE_COUNT = 30
const HALF = NODE_COUNT / 2

const neuralNodeGeometry = new THREE.SphereGeometry(0.07, 16, 16)

const neuralNodes: {
  mesh: THREE.Mesh
  phase: number
  speed: number
}[] = []

/* ---------- HELPER: CREATE NODE ON SPECIFIC SIDE ---------- */

const createNeuralNode = (side: "left" | "right") => {
  const material = new THREE.MeshStandardMaterial({
    color: "#2F80ED",
    transparent: true,
    opacity: 0.35,
    roughness: 0.2,
    metalness: 0.1,
    emissive: "#2F80ED",
    emissiveIntensity: 0.25,
  })

  const mesh = new THREE.Mesh(neuralNodeGeometry, material)

  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)

  const radius = NEURAL_SHELL_RADIUS + Math.random() * 0.4

  let x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi) * 0.6
  const z = radius * Math.sin(phi) * Math.sin(theta)

  // Force hemisphere
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

/* ---------- CREATE BALANCED NODES ---------- */

for (let i = 0; i < HALF; i++) createNeuralNode("left")
for (let i = 0; i < HALF; i++) createNeuralNode("right")

/* ---------- LINE INTERSECTION CHECK ---------- */

const intersectsBrain = (
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number
) => {
  const center = new THREE.Vector3(0, 0, 0)
  const ab = b.clone().sub(a)
  const ac = center.clone().sub(a)

  const t = ac.dot(ab) / ab.lengthSq()
  const closest = a.clone().add(
    ab.multiplyScalar(THREE.MathUtils.clamp(t, 0, 1))
  )

  return closest.length() < radius
}

/* ---------- CONNECTION LINES ---------- */

const lineMaterial = new THREE.LineBasicMaterial({
  color: "#2F80ED",
  transparent: true,
  opacity: 0.12,
})

for (let i = 0; i < neuralNodes.length; i++) {
  for (let j = i + 1; j < neuralNodes.length; j++) {
    const a = neuralNodes[i].mesh.position
    const b = neuralNodes[j].mesh.position

    if (
      Math.random() > 0.82 &&
      !intersectsBrain(a, b, BRAIN_RADIUS)
    ) {
      const geometry = new THREE.BufferGeometry().setFromPoints([a, b])
      neuralField.add(new THREE.Line(geometry, lineMaterial))
    }
  }
}

neuralField.position.set(2.2, 0.3, -2.6)
scene.add(neuralField)

/* ======================================================
   PULSE ANIMATION
====================================================== */

const clock = new THREE.Clock()

const animateNeuralPulse = () => {
  const time = clock.getElapsedTime()

  neuralNodes.forEach(({ mesh, phase, speed }) => {
    const pulse = Math.sin(time * speed + phase)

    mesh.scale.setScalar(1 + pulse * 0.25)

    const mat = mesh.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.25 + pulse * 0.35
  })

  requestAnimationFrame(animateNeuralPulse)
}

animateNeuralPulse()
