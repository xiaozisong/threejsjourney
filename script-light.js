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
const material = new THREE.MeshStandardMaterial();
// box
const boxGeometry = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  material
);
// tours
const tours = new THREE.Mesh(
  new THREE.TorusGeometry(0.5,0.2,16,100),
  material
)
tours.position.x = 1.5;
// sphere
const sphereGeometry = new THREE.Mesh(
  new THREE.SphereGeometry(0.7,16,16),
  material
)
sphereGeometry.position.x = -1.5;
// plane
const planeGeometry = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 5),
  new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
)
planeGeometry.position.y = -2;
planeGeometry.rotateX(1.45)


// 设置鼠标的坐标
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = e.clientY / size.height - 0.5;
});


// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
scene.add(boxGeometry)
scene.add(sphereGeometry)
scene.add(planeGeometry)
scene.add(tours)

scene.add(camera);

// 控制器
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);

// lights
const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(2).step(0.001)
const pointLight = new THREE.PointLight(0xff0000, 1, 4, 1);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper)
pointLight.position.y = 2.5
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight('blue', 0.5);
const directionLightHelper = new THREE.DirectionalLightHelper(directionalLight);
directionalLight.position.z = 2
directionalLight.position.y = -1
directionalLight.rotation.x = 2
scene.add(directionLightHelper)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight('#f1203f', 0x080820, 0.2)
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight)
scene.add(hemisphereLight)
scene.add(hemisphereLightHelper)

const rectAreaLight = new THREE.RectAreaLight('purple', 2, 2, 2)
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight('blue')
spotLight.position.set( 1, 1, 1 );
spotLight.map = new THREE.TextureLoader().load( './static/textures/gradients/3.jpg' );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight)

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

  tours.rotation.x = clock.getElapsedTime() * 0.25
  boxGeometry.rotation.x = clock.getElapsedTime() * 0.25
  sphereGeometry.rotation.x = clock.getElapsedTime() * 0.25

  tours.rotation.y = clock.getElapsedTime() * 0.25
  boxGeometry.rotation.y = clock.getElapsedTime() * 0.25
  sphereGeometry.rotation.y = clock.getElapsedTime() * 0.25

  // update geometry
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate()
