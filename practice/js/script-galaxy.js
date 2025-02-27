import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Galaxy
const parameters = {
    count: 1000,
    size: 0.02,
    branches: 3,
    radius: 5,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
}
let geometry = null;
let material = null;
let points = null;
const galaxyGeneration = () => {
    if (points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }
  
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const insideColor = new THREE.Color(parameters.insideColor);
    const outsideColor = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;
        const radius = parameters.radius * Math.random();
        const branchesAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
        const spinAngle = radius * parameters.spin;

        const randomX = Math.pow(Math.random(), parameters.randomness) * (Math.random() - 0.5);
        const randomY = Math.pow(Math.random(), parameters.randomness) * (Math.random() - 0.5);
        const randomZ = Math.pow(Math.random(), parameters.randomness) * (Math.random() - 0.5);
        positions[i3 + 0] = Math.cos(branchesAngle + spinAngle) * radius + randomX; // x
        positions[i3 + 1] = randomY; // y
        positions[i3 + 2] = Math.sin(branchesAngle + spinAngle) * radius + randomZ; // z
        // color
        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor, radius / parameters.radius)
        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
        3
    );
    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3),
    )
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })
    points = new THREE.Points(geometry, material);
    scene.add(points);
}
gui.add(parameters, 'count').min(1000).max(100000).step(1000).onFinishChange(galaxyGeneration);
gui.add(parameters, 'size').min(0.01).max(1).step(0.01).onFinishChange(galaxyGeneration);
gui.add(parameters, 'radius').min(1).max(20).step(0.01).onFinishChange(galaxyGeneration);
gui.add(parameters, 'branches').min(1).max(20).step(1).onFinishChange(galaxyGeneration);
gui.add(parameters, 'spin').min(1).max(3).step(1).onFinishChange(galaxyGeneration);
gui.add(parameters, 'randomness').min(0.02).max(3).step(0.01).onFinishChange(galaxyGeneration);
galaxyGeneration();


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()