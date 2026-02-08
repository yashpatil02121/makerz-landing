import * as THREE from "three"

/* SCENE */
export const scene = new THREE.Scene()

/* CAMERA */
export const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.set(0, 0, 6)

/* LIGHT */
scene.add(new THREE.AmbientLight(0xffffff, 1))

/* OBJECT */
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
const material = new THREE.MeshStandardMaterial({ color: "green" })

export const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
