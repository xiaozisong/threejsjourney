import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const canvas = document.querySelector('canvas.webgl');
// 4要素 场景、相机、物体、渲染器
const size = {
  width: 800,
  height: 600,
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
scene
// 物体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 为物体添加材质
const material = new THREE.MeshBasicMaterial({ color: 'red' });
// 网格
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

// 控制器
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);

const animate = () => {

  // 控制相机
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = -cursor.y * 10;
  // camera.position.z = Math.cos(cursor.y * Math.PI * 4) * 3;
  // camera.lookAt(mesh.position)

  controls.update()

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate()
