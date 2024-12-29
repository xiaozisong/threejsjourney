import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const canvas = document.querySelector('canvas.webgl');
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

// 设置鼠标的坐标
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = e.clientY / size.height - 0.5;
})

// 场景
const scene = new THREE.Scene();

// buffer grometry
const geometry = new THREE.BufferGeometry();
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random() * 10;
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

// 为物体添加材质
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
// 网格
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
 
// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 15;
scene.add(camera);

// 控制器
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);

// 实时调整canvas尺寸与相机和渲染器
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
});

// 双击进入全屏
window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenEelement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if ((document.exitFullscreen)) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
})

const animate = () => {

  controls.update()

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate()
