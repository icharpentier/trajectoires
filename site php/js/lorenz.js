function initLorenzPre() {
    const LorenzContainer = document.getElementById('animation');
    const width = LorenzContainer.clientWidth;
    const height = LorenzContainer.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    LorenzContainer.appendChild(renderer.domElement); // Correction ici

    let speed = 0;
    const points = []; // Array to hold points for the line plot
  
    // Lorenz system parameters
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    
    // Initial conditions
    let x = 0.1;
    let y = 0;
    let z = 0;
    let t = 0;
    
    // Time step
    const dt = 0.01;
    const step=1500;
    const scale = 1/50;
    
    // Creating random points for the line
    for (let i = 0; i < step; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
    
      x += dx;
      y += dy;
      z += dz;
      t += dt;
        
      points.push(new THREE.Vector3(x*scale,z*scale,t*scale*5));
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