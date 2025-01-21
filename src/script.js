import './style.css';
import Experience from './Experience/Experience';

// Canvas
const canvas = document.querySelector('canvas.webgl')
const experience = new Experience(canvas);
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import GUI from 'lil-gui'

// /**
//  * Base
//  */
// // Debug
// const gui = new GUI()
// const debugObject = {}

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () => {
//     scene.traverse((child) => {
//         if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
//             // child.material.envMap = environmentMap
//             child.material.needsUpdate = true;
//             child.material.envMapIntensity = debugObject.envMapIntensity;
//             child.castShadow = true
//             child.receiveShadow = true;
//         }
//     })
// }

// /**
//  * loaders
//  */
// const gltfLoader = new GLTFLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()


// let mixer = null

// /**
//  * Environment Map
//  */
// const environmentMap = cubeTextureLoader.load([
//     './static/environmentMaps/0/px.png',
//     './static/environmentMaps/0/nx.png',
//     './static/environmentMaps/0/py.png',
//     './static/environmentMaps/0/ny.png',
//     './static/environmentMaps/0/pz.png',
//     './static/environmentMaps/0/nz.png',
// ])
// scene.background = environmentMap
// scene.environment = environmentMap

// debugObject.envMapIntensity = 5;
// gui.add(debugObject, 'envMapIntensity', 0, 10, 0.001).onChange(updateAllMaterials)

// /**
//  * Models
//  */
// gltfLoader.load(
//     '/models/hamburger.glb',
//     (gltf) =>
//     {  
//         gltf.scene.scale.set(10, 10, 10);
//         gltf.scene.position.set(0, -4, 0)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)
//         gui.add(gltf.scene.rotation, 'y', -Math.PI, Math.PI, 0.001).name('rotation')
//         updateAllMaterials()
//     }
// )

// /**
//  * Floor
//  */
// // const floor = new THREE.Mesh(
// //     new THREE.PlaneGeometry(50, 50),
// //     new THREE.MeshStandardMaterial({
// //         color: '#444444',
// //         metalness: 0,
// //         roughness: 0.5
// //     })
// // )
// // floor.receiveShadow = true
// // floor.rotation.x = - Math.PI * 0.5
// // scene.add(floor)

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
// directionalLight.position.set(0.25, 3, -2.25)
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
// scene.add(directionalLight)

// // const directionalLightCamearHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// // scene.add(directionalLightCamearHelper)


// gui.add(directionalLight, 'intensity', 0, 10, 0.001).name('lightintensity');
// gui.add(directionalLight.position, 'x', -5, 5, 0.001).name('lightX');
// gui.add(directionalLight.position, 'y', -5, 5, 0.001).name('lightY');
// gui.add(directionalLight.position, 'z', -5, 5, 0.001).name('lightZ');


// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(- 8, 4, 8)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.target.set(0, 1, 0)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFShadowMap
// gui.add(renderer, 'toneMapping', {
//     NO: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping
// })
// gui.add(renderer, 'toneMappingExposure', 0, 10, 0.001)
// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime

//     if(mixer)
//     {
//         mixer.update(deltaTime)
//     }

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()