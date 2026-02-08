import * as THREE from "three"

/* =========================
   RESPONSIVE CAMERA
========================= */

export const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

/* ---------- LAYOUT LOGIC ---------- */

function applyCameraLayout() {
  const w = window.innerWidth
  const h = window.innerHeight
  const aspect = w / h

  // 📱 Mobile
  if (w < 640) {
    camera.fov = 68
    camera.position.set(0, 0.6, 7.5)
  }

  // 📟 Tablet
  else if (w < 1024) {
    camera.fov = 62
    camera.position.set(1.2, 0.8, 7.8)
  }

  // 🖥 Desktop
  else {
    camera.fov = 60
    camera.position.set(2.5, 1.2, 8)
  }

  camera.aspect = aspect
  camera.updateProjectionMatrix()
  camera.lookAt(0, 0, 0)
}

/* ---------- INIT ---------- */

applyCameraLayout()

/* ---------- RESIZE HANDLER ---------- */

window.addEventListener("resize", applyCameraLayout)
