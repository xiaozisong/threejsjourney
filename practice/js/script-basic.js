import * as THREE from "three";
const canvas = document.querySelector('canvas.webgl');
// 4要素 场景、相机、物体、渲染器
const size = {
  width: 800,
  height: 600,
}
// 场景
const scene = new THREE.Scene();
scene
// 物体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 为物体添加材质
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
// 网格
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 2;
scene.add(camera);

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height)

renderer.render(scene, camera);