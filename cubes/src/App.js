
import React, {useRef, useState} from "react";

import './App.css';

import { Canvas, useFrame } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";

import { useSpring, animated } from '@react-spring/three'



const SpinningMesh = ({position, args, color} ) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });


  return(
    <animated.mesh  
      onClick={() => setExpand(!expand)} 
      scale={props.scale} 
      castShadow 
      position={position} 
      ref={mesh}>
    <boxBufferGeometry attach='geometry' args={args} />
    <meshStandardMaterial attach='material' color={color} />

    </animated.mesh>

  )
}


function App() {

  return (
    <> 
    <Canvas shadows colorManagement camera={{position: [-5,2,10], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <directionalLight 
        castShadow
        position={[0,10,0]} 
        intensity={1.5} 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
        shadow-camera-far={50} 
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}/>
      <pointLight position={[-10,0,-20]} intensity={0.5}/>
      <pointLight position={[0,-10,0]} intensity={0.9}/>

      <group>

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0,-3, 0]}>

          <planeBufferGeometry attche='geometry' args={[100,100]}/>
          <shadowMaterial attach='material' opacity={0.1}/>

        </mesh>


        <SpinningMesh position={[0,1,0]} args={[2,2,2]} color="lightblue"/>
        <SpinningMesh position={[-2,1,-5]} color="pink"/>
        <SpinningMesh position={[5,1,-2]} color="lightgreen"/>
        <SpinningMesh position={[-5,1,4]} args={[1.5,1.5,1.5]} color="lightred"/>
        <SpinningMesh position={[4,1,4]} args={[1.1,1.1,1.1]} color="violet"/>
        <SpinningMesh position={[9,1,2]} args={[1.1,1.1,1.1]} color="orange"/>
        <SpinningMesh position={[-7,1,-2]} args={[1,1,1]} color="yellow"/>
        

      </group>
      
      <OrbitControls/>
    </Canvas>
    </>
  );

}


export default App;
