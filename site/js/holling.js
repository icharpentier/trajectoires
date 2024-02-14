function initHollingPre() {
    const hollingContainer = document.getElementById('animation');

    const width = hollingContainer.clientWidth;
    const height = hollingContainer.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    hollingContainer.appendChild(renderer.domElement);

    let speed = 0;
    let amplitude = 0.4;
    let frequency = 50; // Adjust this if you want a different initial frequency for Holling
    const points = [];

    function generatePoints() {
        points.length = 0;
        for (let i = 0; i < 100; i++) {
            points.push(new THREE.Vector3(
                amplitude * Math.cos(i * 2 * Math.PI / frequency),
                amplitude * Math.sin(i * 2 * Math.PI / (frequency / 2)), // Adjusted for Holling's unique pattern
                i / 100
            ));
        }
    }

    generatePoints();

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

    const amplitudeSlider = document.getElementById('amplitudeSlider');
    const frequencySlider = document.getElementById('frequencySlider');
    const speedSlider = document.getElementById('speedSlider');

    amplitudeSlider.oninput = function() {
        amplitude = parseFloat(this.value);
        document.getElementById('amplitudeValue').innerText = this.value;
        generatePoints();
        line.geometry.setFromPoints(points);
    };

    frequencySlider.oninput = function() {
        frequency = parseFloat(this.value);
        document.getElementById('frequencyValue').innerText = this.value;
        generatePoints();
        line.geometry.setFromPoints(points);
    };
    speedSlider.oninput = function() {
        speed = parseFloat(this.value);
        document.getElementById('speedValue').innerText = this.value;
    };

    animate();
}
