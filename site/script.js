

document.addEventListener('DOMContentLoaded', function() {
  /* Appelle les fonctions d'initialisation pour chaque visualisation */
  initMorphism();
  initDeming();
  initHolling();
  initLorenz();
  initLotka();
});

/* Initialise la visualisation pour le morphisme */
function initMorphism() {
  
  const morphismContainer = document.getElementById('morphism'); // Sélectionne le conteneur

  const width = morphismContainer.clientWidth;
  const height = morphismContainer.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  morphismContainer.appendChild(renderer.domElement);

  const pointsDeming = [];
  const pointsHolling = [];
  const mixedPoints = [];
  const rmin = 0.001, rmax = 0.4;
  const numPoints = 1000;

  for (let i = 0; i < numPoints; i++) {
    const r = (1 - i / numPoints) * rmax + i / numPoints * rmin;
    pointsDeming.push(new THREE.Vector3(r * Math.cos(i * 2 * Math.PI / 50), r * Math.sin(i * 2 * Math.PI / 50), i / numPoints));
  }

  for (let i = 0; i < numPoints; i++) {
    const r = (1 - i / numPoints) * rmin + i / numPoints * rmax;
    pointsHolling.push(new THREE.Vector3(r * Math.cos(i * 2 * Math.PI / 50), r * Math.sin(i * 4 * Math.PI / 50), i / numPoints));
  }

  for (let i = 0; i < numPoints; i++) {
    mixedPoints.push(new THREE.Vector3());
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(mixedPoints);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  const axesHelper = new THREE.AxesHelper(1);
  scene.add(axesHelper);
  camera.position.z = 4;

  let mixFactor = 0.5;

  function interpolatePoints(factor) {
    for (let i = 0; i < numPoints; i++) {
      mixedPoints[i].lerpVectors(pointsDeming[i], pointsHolling[i], factor);
    }
    geometry.setFromPoints(mixedPoints);
  }

  function animate() {
    requestAnimationFrame(animate);
    interpolatePoints(mixFactor);
    line.rotation.x += 0.01;
    line.rotation.y += 0.005;
    axesHelper.rotation.x += 0.01;
    axesHelper.rotation.y += 0.005;
    renderer.render(scene, camera);
  }

  animate();
}

function initDeming() {
  const demingContainer = document.getElementById('deming');

  const width = demingContainer.clientWidth;
  const height = demingContainer.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  demingContainer.appendChild(renderer.domElement);


  const points = []; 
  const r = 0.4; 
  for (let i = 0; i < 100; i++) {
      points.push(new THREE.Vector3((r * Math.cos(i * 2 * Math.PI / 50)), (r * Math.sin(i * 2 * Math.PI / 50)), i / 100));
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
      
      line.rotation.x += 0.01;
      line.rotation.y += 0.005;
      
      axesHelper.rotation.x += 0.01;
      axesHelper.rotation.y += 0.005;

      renderer.render(scene, camera);
  }

  animate();
}

function initHolling() {
  const hollingContainer = document.getElementById('holling');

  const width = hollingContainer.clientWidth;
  const height = hollingContainer.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  hollingContainer.appendChild(renderer.domElement);

  const points = [];
  const r = 0.4;
  for (let i = 0; i < 100; i++) {
      points.push(new THREE.Vector3((r * Math.cos(i * 2 * Math.PI / 50)), (r * Math.sin(i * 4 * Math.PI / 50)), i / 100));
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

      line.rotation.x += 0.01;
      line.rotation.y += 0.005;

      axesHelper.rotation.x += 0.01;
      axesHelper.rotation.y += 0.005;

      renderer.render(scene, camera);
  }

  animate();
}


function initLorenz() {
  const LorenzContainer = document.getElementById('lorenz');
  const width = LorenzContainer.clientWidth;
  const height = LorenzContainer.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  LorenzContainer.appendChild(renderer.domElement); 

  const points = [];


  const sigma = 10;
  const rho = 28;
  const beta = 8 / 3;
  
 
  let x = 0.1;
  let y = 0;
  let z = 0;
  let t = 0;
  
  
  const dt = 0.01;
  const step=1500;
  const scale = 1/50;
  

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
    line.rotation.x += 0.01;
    line.rotation.y += 0.005;
    axesHelper.rotation.x += 0.01;
    axesHelper.rotation.y += 0.005;
    renderer.render(scene, camera);
  }

  animate();
}

function initLotka() {
    const LotkaContainer = document.getElementById('lotka');
    const width = LotkaContainer.clientWidth;
    const height = LotkaContainer.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    LotkaContainer.appendChild(renderer.domElement);
  
    const points = [];


    
    const alpha = 0.1;
    const beta = 0.02;
    const gamma = 0.1;
    const delta = 0.02;

  
    let prey = 40;
    let predator = 9;

 
    const dt = 0.2;
    const steps = 2000;
    const scale=1/250;
    

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
      line.rotation.x += 0.01;
      line.rotation.y += 0.005;
      axesHelper.rotation.x += 0.01;
      axesHelper.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
  
    animate();
  }
  
  /* Fonction pour naviguer vers une présentation spécifique en chargeant des données depuis un fichier JSON */
  function goToPresentation(visualizationName) {
    fetch('presentation.json')
      .then(response => response.json())
      .then(allData => {
        const visualizationData = allData.presentations[visualizationName];
        /* Charge les données de présentation et navigue vers la page appropriée */
        if (visualizationData) {
          sessionStorage.setItem('choixPresentation', JSON.stringify(visualizationData));
          window.location.href = 'presentation.html';
        } else {
          console.error('Données introuvables pour', visualizationName);
        }
      })
      .catch(error => {
        console.error('Impossible de charger la présentation pour', visualizationName, error);
      });
}

/* Ajoute des écouteurs d'événements pour les boutons, déclenchant la navigation vers des visualisations spécifiques */
document.getElementById('deming-clique').addEventListener('click', function() {
    goToPresentation('Deming');
});

document.getElementById('holling-clique').addEventListener('click', function() {
    goToPresentation('Holling');
});

document.getElementById('lorenz-clique').addEventListener('click', function() {
    goToPresentation('Lorenz');
});

document.getElementById('lotka-clique').addEventListener('click', function() {
    goToPresentation('Lotka-Volterra');
});


