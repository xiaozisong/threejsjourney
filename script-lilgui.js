import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";
const canvas = document.querySelector('canvas.webgl');
let val = 2;
const debugObject = {
  color: '#351c1c',
  visible: true,
  wireframe: false,
  subdvision: 2,
  myFunc: () => {
    gsap.to(mesh.rotation, { duration: 1, x: Math.PI * val })
  }
};
const gui = new GUI({
  closeFolders: true,
  title: 'my basic lilgui',
});
const folder1 = gui.addFolder('cube settings');
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

const geometry = new THREE.BoxGeometry(1, 1, 1, 2,2,2);
// 场景
const scene = new THREE.Scene();

// 为物体添加材质
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: debugObject.wireframe });
// 网格
const mesh = new THREE.Mesh(geometry, material);

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
folder1.add(mesh.position, 'y').min(-3).max(3).step(0.01);
folder1.addColor(debugObject, 'color').onChange(() => {
  material.color.set(debugObject.color);
})

folder1.add(mesh, 'visible')

folder1.add(debugObject, 'myFunc').onChange(() => val++);
folder1.add(debugObject, 'subdvision').min(1).max(3).step(1);
folder1.add(debugObject, 'wireframe').onChange((value) => {
  material.wireframe = value
})
folder1.add(debugObject, 'subdvision').min(1).max(20).step(1).onFinishChange(() => {
  geometry.dispose();
  mesh.geometry = new THREE.BoxGeometry(1,1,1,debugObject.subdvision,debugObject.subdvision,debugObject.subdvision)
});

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
window.addEventListener('keypress', (e) => {
  if (e.key === 'h') {
    gui.show(gui._hidden)
  }
})
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

const animate = () => {

  controls.update()

  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate()
