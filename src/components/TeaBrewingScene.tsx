import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const TeaBrewingScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    leaves?: THREE.Group;
    teapot?: THREE.Mesh;
    cup?: THREE.Mesh;
    steam?: THREE.Points;
    water?: THREE.Mesh;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffd700, 0.5);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);

    // Create tea leaves (Stage 1)
    const leavesGroup = new THREE.Group();
    const leafGeometry = new THREE.PlaneGeometry(0.3, 0.5);
    const leafMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2d5016,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });

    for (let i = 0; i < 20; i++) {
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(
        (Math.random() - 0.5) * 3,
        Math.random() * 2 + 3,
        (Math.random() - 0.5) * 3
      );
      leaf.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      leavesGroup.add(leaf);
    }
    scene.add(leavesGroup);

    // Create teapot (Stage 2)
    const teapotGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    teapotGeometry.scale(1, 0.8, 1);
    const teapotMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8b7355,
      shininess: 30
    });
    const teapot = new THREE.Mesh(teapotGeometry, teapotMaterial);
    teapot.position.set(-2, -1, 0);
    teapot.scale.set(0, 0, 0);
    scene.add(teapot);

    // Create spout
    const spoutGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.6, 16);
    const spout = new THREE.Mesh(spoutGeometry, teapotMaterial);
    spout.rotation.z = Math.PI / 4;
    spout.position.set(0.6, -0.1, 0);
    teapot.add(spout);

    // Create handle
    const handleGeometry = new THREE.TorusGeometry(0.35, 0.08, 16, 32, Math.PI);
    const handle = new THREE.Mesh(handleGeometry, teapotMaterial);
    handle.rotation.y = Math.PI / 2;
    handle.position.set(-0.6, 0, 0);
    teapot.add(handle);

    // Create cup (Stage 3)
    const cupGeometry = new THREE.CylinderGeometry(0.4, 0.3, 0.8, 32);
    const cupMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf5f5dc,
      shininess: 50
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.set(2, -1.5, 0);
    cup.scale.set(0, 0, 0);
    scene.add(cup);

    // Create tea water in cup
    const waterGeometry = new THREE.CylinderGeometry(0.38, 0.28, 0.6, 32);
    const waterMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8b6914,
      transparent: true,
      opacity: 0.7,
      shininess: 100
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.position.y = -0.1;
    water.scale.set(1, 0, 1);
    cup.add(water);

    // Create steam particles (Stage 4)
    const steamGeometry = new THREE.BufferGeometry();
    const steamPositions = [];
    const steamCount = 50;

    for (let i = 0; i < steamCount; i++) {
      steamPositions.push(
        (Math.random() - 0.5) * 0.3,
        Math.random() * 2,
        (Math.random() - 0.5) * 0.3
      );
    }

    steamGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(steamPositions, 3)
    );

    const steamMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const steam = new THREE.Points(steamGeometry, steamMaterial);
    steam.position.set(2, -0.7, 0);
    steam.visible = false;
    scene.add(steam);

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      leaves: leavesGroup,
      teapot,
      cup,
      steam,
      water
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Stage 1: Falling leaves
      if (stage >= 0) {
        leavesGroup.children.forEach((leaf, index) => {
          leaf.position.y -= 0.02;
          leaf.rotation.x += 0.02;
          leaf.rotation.y += 0.02;
          
          if (leaf.position.y < -2) {
            leaf.position.y = 5;
          }
        });
      }

      // Stage 2: Teapot appears and rotates
      if (stage >= 1) {
        teapot.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        teapot.rotation.y = Math.sin(time * 0.5) * 0.2;
      }

      // Stage 3: Cup appears and fills with tea
      if (stage >= 2) {
        cup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        if (water.scale.y < 1) {
          water.scale.y += 0.01;
        }
      }

      // Stage 4: Steam rises
      if (stage >= 3) {
        steam.visible = true;
        const positions = steam.geometry.attributes.position.array as Float32Array;
        
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.02;
          
          if (positions[i] > 2) {
            positions[i] = 0;
            positions[i - 1] = (Math.random() - 0.5) * 0.3;
            positions[i + 1] = (Math.random() - 0.5) * 0.3;
          }
        }
        
        steam.geometry.attributes.position.needsUpdate = true;
      }

      // Gentle camera sway
      camera.position.x = Math.sin(time * 0.2) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Auto-advance stages
    const stageInterval = setInterval(() => {
      setStage(prev => (prev + 1) % 4);
    }, 4000);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearInterval(stageInterval);
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [stage]);

  const stageLabels = [
    "Harvest: Fresh tea leaves from the garden",
    "Processing: Traditional orthodox method",
    "Brewing: Hot water meets dried leaves",
    "Enjoying: The perfect cup of tea"
  ];

  return (
    <div className="relative w-full h-full">
      <div 
        ref={containerRef} 
        className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl"
      />
      
      {/* Stage indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-full border border-tea-gold/20 shadow-lg">
        <p className="text-sm font-medium text-foreground text-center">
          {stageLabels[stage]}
        </p>
      </div>

      {/* Interactive dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {stageLabels.map((_, index) => (
          <button
            key={index}
            onClick={() => setStage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              stage === index 
                ? 'bg-tea-gold w-6' 
                : 'bg-tea-gold/30 hover:bg-tea-gold/50'
            }`}
            aria-label={`Go to stage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
