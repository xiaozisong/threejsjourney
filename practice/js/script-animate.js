import * as THREE from "three";
import gsap from "gsap";
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
const material = new THREE.MeshBasicMaterial({ color: 'red' });
// 网格
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(1, 0, 0)
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


// Clock
const clock = new THREE.Clock();

// gsap创造动画
// gsap.to(mesh.position, { x: 1, delay: 1, duration: 1 });
// gsap.to(mesh.position, { x: 0, delay: 2, duration: 1 });
// gsap.to(mesh.position, { x: -1, delay: 3, duration: 1 });

// 动画
const animate = () => {

  // 可以移动mesh 也可以改变camera
  // 改变位置
  // mesh.position.x = clock.getElapsedTime();
  // mesh.position.y = -clock.getElapsedTime();
  // mesh.rotation.x = Math.sin(clock.getElapsedTime());
  // mesh.rotation.y = Math.sin(clock.getElapsedTime());
  // 改变camera
  camera.position.y = Math.sin(clock.getElapsedTime());
  camera.position.x = Math.cos(clock.getElapsedTime());
  console.log(mesh.position)
  camera.lookAt(mesh.position)
  // camera.rotation.x = Math.sin(clock.getElapsedTime());

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);

};

// animate();