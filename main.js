import './style.css'
import * as THREE from 'three';
// import { AmbientLight, PointLight, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347})
const torus = new THREE.Mesh(geometry, material)

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(15, 15, 15)

const ambientLight = new THREE.AmbientLight(0xffffff)
// scene.add(pointLight, ambientLight)
scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xff6347})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => {
    return THREE.MathUtils.randFloatSpread(100)
  })
  // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  console.log('[x,y,z]', x,y,z)
  star.position.set(x, y, z)
  scene.add(star)
}
addStar()
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('gradient.old.png')
scene.background = spaceTexture

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 33),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)
scene.add(moon)

moon.position.z = 16;
moon.position.setX(-18)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top

  moon.rotation.x += 0.005;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.005;

  camera.position.z = t * 1.001;
  camera.position.z = t * -1.1002;
  camera.position.z = t * -.0102;

}
document.body.onscroll = moveCamera


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.1;

  controls.update()

  renderer.render(scene, camera)
}

animate()

camera.position.setZ(30)

renderer.render(scene, camera)

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
