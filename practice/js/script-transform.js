import * as THREE from "three";
// Transfor objects 
const canvas = document.querySelector('canvas.webgl');
// 4要素 场景、相机、物体、渲染器
const size = {
  width: 800,
  height: 600,
}
// 场景
const scene = new THREE.Scene();
// group
const group = new THREE.Group();
// 物体
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // 为物体添加材质
// const material = new THREE.MeshBasicMaterial({ color: 'red' });
// 网格
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: '#00ff00' })
);
cube2.position.x = -2;
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: '#0000ff' })
);
cube3.position.x = 2;
group.add(cube1);
group.add(cube2);
group.add(cube3);
group.rotation.set(0, Math.PI * 0.25, 0)
scene.add(group);
// 直接创建物体与mesh

// scale
// mesh.scale.set(2, 0.5, 0.5);
// // rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0);

// // positions
// mesh.position.set(0.7, -0.6, 1);
// scene.add(mesh);

// 添加轴坐标助手
const axes = new THREE.AxesHelper();
axes.position.set(-0.2, -0.2, 0);
scene.add(axes);
// 相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
// camera.lookAt(mesh.position);
scene.add(camera);

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height)

renderer.render(scene, camera);