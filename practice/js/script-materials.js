import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
const canvas = document.querySelector('canvas.webgl');
const gui = new GUI();
const rgbeLoader = new RGBELoader();
// 4要素 场景、相机、物体、渲染器
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}
// 控制相机 使物体跟随光标旋转
const cursor = {
  x: 0,
  y: 0,
}
// textures
const textures = new THREE.TextureLoader();
const doorColorTexture = textures.load('./static/textures/door/color.jpg');
const doorAlphaTexture = textures.load('./static/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textures.load('./static/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textures.load('./static/textures/door/height.jpg');
const doorNormalTexture = textures.load('./static/textures/door/normal.jpg');
const doorMetalnessTexture = textures.load('./static/textures/door/metalness.jpg');
const doorRoughnessTexture = textures.load('./static/textures/door/roughness.jpg');
const matcapTexture = textures.load('./static/textures/matcaps/3.png');
const gradientTexture = textures.load('./static/textures/gradients/3.jpg');

// 设置鼠标的坐标
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = e.clientY / size.height - 0.5;
});

const mesh = new THREE.Mesh();
// const material = new THREE.MeshBasicMaterial();
// material.transparent = true
// material.map = doorAlphaTexture
// material.opacity = 0.3
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// const material = new THREE.MeshDepthMaterial();
// material.
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true;
// material.alphaMap = doorAlphaTexture
// transmission
material.transmission = 1;
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);
gui.add(material, 'transmission').min(0).max(1).step(0.001);
gui.add(material, 'ior').min(0).max(10).step(0.001);
gui.add(material, 'thickness').min(0).max(1).step(0.001);
// gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.001);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
);
plane.position.x = -1.5
const tours = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material,
);
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
);
sphere.position.x = 1.5
// 场景
const scene = new THREE.Scene();

mesh.add(plane, tours, sphere)

// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);
scene.add(mesh);

// 控制器
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
// gui

// lights
const ambientLight = new THREE.AmbientLight('#ffffff', 1);
const pointLight = new THREE.PointLight('#ffffff', 30);
pointLight.position.x = 2;
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(ambientLight);
scene.add(pointLight);

rgbeLoader.load('./static/textures/environmentMap/2k.hdr', (environmentMap) => {
  console.log(environmentMap);
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})

// 实时调整canvas尺寸与相机和渲染器
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
});
// 键盘按下事件
// window.addEventListener('keypress', (e) => {
//   if (e.key === 'h') {
//     gui.show(gui._hidden)
//   }
// })
// 双击进入全屏
// window.addEventListener("dblclick", () => {
//   const fullscreenElement = document.fullscreenElement || document.webkitFullscreenEelement;
//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen()
//     } else if (canvas.webkitRequestFullscreen) {
//       canvas.webkitRequestFullscreen();
//     }
//   } else {
//     if ((document.exitFullscreen)) {
//       document.exitFullscreen()
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     }
//   }
// })
const clock = new THREE.Clock();
const animate = () => {

  controls.update();

  // update geometry
  plane.rotation.y = 0.15 * clock.getElapsedTime();
  sphere.rotation.y = 0.15 * clock.getElapsedTime();
  tours.rotation.y = 0.15 * clock.getElapsedTime();
  plane.rotation.x = -0.15 * clock.getElapsedTime();
  sphere.rotation.x = -0.15 * clock.getElapsedTime();
  tours.rotation.x = -0.15 * clock.getElapsedTime();

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate()
