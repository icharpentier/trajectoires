function initMorph1Pre() { 
    const Morph1Container = document.getElementById('animation');  // Sélectionne l'élément HTML pour contenir l'animation

    /* Création de la scène */
    const width = Morph1Container.clientWidth;
    const height = Morph1Container.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    Morph1Container.appendChild(renderer.domElement);
    
    
    let speed = 0;  // Initialise la vitesse de rotation à 0

    /* Crée des tableaux pour stocker les points de morphing */
    const pointsDeming = [];
    const pointsHolling = [];
    const mixedPoints = [];

    const rmin = 0.001; rmax=0.4; // Définit les valeurs minimale et maximale pour le rayon des points
    const numPoints = 1000; // Nombre de points à générer

    /* Génération des points pour Deming */
    for (let i = 0; i < numPoints; i++) {
      const r= (1-i/numPoints)*rmax + i/numPoints*rmin;
      pointsDeming.push(new THREE.Vector3((r * Math.cos(i*2*Math.PI/50)), (r * Math.sin(i*2*Math.PI/50)), i/numPoints));
    }

    /* Génération des points pour Holling */
    for (let i = 0; i < numPoints; i++) {
      const r= (1-i/numPoints)*rmin + i/numPoints*rmax;
      pointsHolling.push(new THREE.Vector3((r * Math.cos(i*2*Math.PI/50)), (r * Math.sin(i*4*Math.PI/50)), i/numPoints)); 
    }

    /* Préparation de l'ensemble de points mixtes */
    for (let i = 0; i < numPoints; i++) {
      mixedPoints.push(new THREE.Vector3());
    }

    /* création de la trajectoire */
    const geometry = new THREE.BufferGeometry().setFromPoints(mixedPoints);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    /* ajout des axes d'aide */
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);
    camera.position.z = 4;

    let mixFactor = 0.5; // Facteur de mixage initial

    /* Fonction pour interpoler entre les points de Deming et Holling en fonction du facteur de mixage */
    function interpolatePoints(factor) {
      for (let i = 0; i < numPoints; i++) {
        mixedPoints[i].lerpVectors(pointsDeming[i], pointsHolling[i], factor);
      }
      geometry.setFromPoints(mixedPoints);
    }

    /* Fonction d'animation pour faire tourner les cycles et les axes */
    function animate() {
      requestAnimationFrame(animate);
      interpolatePoints(mixFactor); // Mise à jour des points mixtes
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

    /* Gestion du slider pour ajuster le facteur de mixage et afficher sa valeur */
    const mixSlider = document.getElementById('mixSlider');
    const mixValue = document.getElementById('mixValue');

    mixSlider.addEventListener('input', () => {
      mixFactor = parseFloat(mixSlider.value); // parseFloat permet de transformer une chaîne de caractères en un nombre flottant.
      mixValue.textContent = mixFactor.toFixed(2); // limité à deux décimales pour une meilleure lisibilité. 
    });
}
