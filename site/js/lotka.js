function initLotkaPre() {
  const LotkaContainer = document.getElementById('animation');
  const width = LotkaContainer.clientWidth;
  const height = LotkaContainer.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  LotkaContainer.appendChild(renderer.domElement);

  let speed = 0;
  const points = []; // Array to hold points for the line plot


  // Lotka-Volterra parameters
  const alpha = 0.1;
  const beta = 0.02;
  const gamma = 0.1;
  const delta = 0.02;

  // Initial populations
  let prey = 40;
  let predator = 9;

  // Simulation parameters
  const dt = 0.2;
  const steps = 2000;
  const scale=1/250;
  
  // Creating random points for the line
  for (let i = 0; i < steps; i++) {
    const dx = (alpha * prey - beta * prey * predator) * dt;
    const dy = (delta * prey * predator - gamma * predator) * dt;
    
    prey += dx;
      predator += dy;
      
    points.push(new THREE.Vector3(prey*scale, predator*scale, i*dt*scale));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  const axesHelper = new THREE.AxesHelper(1);
  scene.add(axesHelper);

  camera.position.z = 4;

  function animate() {
    requestAnimationFrame(animate);
    line.rotation.x += 0.01*(1+speed);
    line.rotation.y += 0.005*(1+speed);
    
    axesHelper.rotation.x += 0.01*(1+speed);  
    axesHelper.rotation.y += 0.005*(1+speed);
    renderer.render(scene, camera);
  }

  const speedSlider = document.getElementById('speedSlider');

  speedSlider.oninput = function() {
    speed = parseFloat(this.value);
    document.getElementById('speedValue').innerText = this.value;
};

  animate();
}
