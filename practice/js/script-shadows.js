import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
const canvas = document.querySelector('canvas.webgl');
const gui = new GUI();
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

// 场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
});
// 控制器
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const material = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.2 });
// textures
const texturesLoader = new THREE.TextureLoader();
const textures = texturesLoader.load('./static/textures/simpleShadow.jpg');

// sphere
const sphereGeometry = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),
  material
)
sphereGeometry.castShadow = true;
sphereGeometry.receiveShadow = false
// plane
const planeGeometry = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
)
const shadowGeometry = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: textures, transparent: true })
)
shadowGeometry.rotation.x = -(Math.PI * 0.5)
shadowGeometry.position.y = -0.49
planeGeometry.receiveShadow = true;
planeGeometry.position.y = -0.5;
planeGeometry.rotateX(-(Math.PI * 0.5))

// 设置鼠标的坐标
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = e.clientY / size.height - 0.5;
});


scene.add(shadowGeometry)

scene.add(sphereGeometry)
scene.add(planeGeometry)
scene.add(camera);

renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// light
const ambientLight = new THREE.AmbientLight(0x404040, 10)
// ambientLight.castShadow = true;
// const pointLight = new THREE.PointLight(0xffffff, 10)
// pointLight.position.y = 2
// pointLight.position.x = 1
// scene.add(pointLight)
const directionLight = new THREE.DirectionalLight(0xffffff, 1)
const directionLightHelper = new THREE.DirectionalLightHelper(directionLight);
scene.add(directionLightHelper)
scene.add(directionLight)
scene.add(ambientLight)

directionLight.castShadow = true
directionLight.position.set(2, 2, - 1)
directionLight.shadow.mapSize.width = 1024;
directionLight.shadow.mapSize.height = 1024;

directionLight.shadow.camera.near = 1

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
  const time = clock.getElapsedTime()
  sphereGeometry.position.x = Math.cos(time)
  sphereGeometry.position.z = Math.sin(time)
  sphereGeometry.position.y = Math.abs(Math.sin(time) * 0.5)

  shadowGeometry.position.x = sphereGeometry.position.x
  shadowGeometry.position.z = sphereGeometry.position.z
  shadowGeometry.material.opacity = sphereGeometry.position.y
  
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate()
