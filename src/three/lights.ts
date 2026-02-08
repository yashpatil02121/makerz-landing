import * as THREE from "three"
import { scene } from "./scene"

const ambient = new THREE.AmbientLight(0xffffff, 0.4)

const key = new THREE.DirectionalLight(0xffffff, 1)
key.position.set(5, 6, 5)

const rim = new THREE.DirectionalLight("#0AFF9D", 1.2)
rim.position.set(-6, 2, -4)

// lights.ts
const keyLight = new THREE.DirectionalLight(0xffffff, 1.1)
keyLight.position.set(2, 3, 4)

const fillLight = new THREE.AmbientLight(0xffffff, 0.6)

scene.add(keyLight, fillLight)

scene.add(ambient, key, rim)
