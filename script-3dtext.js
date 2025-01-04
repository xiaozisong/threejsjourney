import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import GUI from "lil-gui";
const canvas = document.querySelector('canvas.webgl');
const gui = new GUI();
const MeshPhysicalMaterial = gui.addFolder('MeshPhysicalMaterial');
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
const texturesLoader = new THREE.TextureLoader();
const textures = texturesLoader.load('./static/textures/matcaps/3.png')

// 设置鼠标的坐标
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = e.clientY / size.height - 0.5;
});

const mesh = new THREE.Mesh();
rgbeLoader.load('./static/textures/environmentMap/2k.hdr', (map) => {
  map.mapping = THREE.EquirectangularReflectionMapping
  scene.background = map;
  scene.environment = map;
})
const fontLoader = new FontLoader();
fontLoader.load('./static/fonts/helvetiker_regular.typeface.json', (font) => {
  const material = new THREE.MeshPhysicalMaterial({ color: '#ffffff' });
MeshPhysicalMaterial.addColor(material, 'color');
MeshPhysicalMaterial.add(material, 'transmission').min(0).max(1).step(0.0001);
MeshPhysicalMaterial.add(material, 'roughness').min(0).max(1).step(0.0001);
MeshPhysicalMaterial.add(material, 'metalness').min(0).max(1).step(0.0001);
MeshPhysicalMaterial.add(material, 'ior').min(0).max(2.333).step(0.0001);
MeshPhysicalMaterial.add(material, 'thickness').min(0).max(1).step(0.0001);


  const textGeometry = new TextGeometry(' Hello Three.js ! ', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 6,
    bevelThickness: 0.5,
    bevelSize: 4,
    bevelSegments: 5
  });
  textGeometry.center();
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
  const boxGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
  for (let i = 0; i < 300; i++) {
    const box = new THREE.Mesh(boxGeometry, material);
    // 随机位置
    box.position.x = (Math.random() - 0.5) * 10;
    box.position.y = (Math.random() - 0.5) * 10;
    box.position.z = (Math.random() - 0.5) * 10;

    box.rotation.x = Math.random() * Math.PI
    box.rotation.y = Math.random() * Math.PI
    box.rotation.z = Math.random() * Math.PI
    scene.add(box)
  }
})

// 场景
const scene = new THREE.Scene();

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

// lights
const ambientLight = new THREE.AmbientLight('#ffffff', 1);
const pointLight = new THREE.PointLight('#ffffff', 30);
pointLight.position.x = 2;
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(ambientLight);
scene.add(pointLight);

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
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate()
