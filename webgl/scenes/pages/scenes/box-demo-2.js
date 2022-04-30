/**
 * Extending scenes/box-demo:
 * - rotate camera
 * - randomly create a bunch of boxes
 */

import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Camera(props) {
  const ref = useRef()
  const setState = useThree((state) => state.set)
  // Update it every frame
  useFrame(() => ref.current.rotation.y += 0.001)
  useEffect(() => {
    setState({ camera: ref.current })
  }, [])
  return <perspectiveCamera ref={ref} {...props} />
}

export default function Scene() {
  let boxes = [];
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    const z = Math.random() * 100 - 50;
    boxes.push(<Box position={[x, y, z]}/>);
  }
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes}
      <Camera position={[0, 0, 10]} />
      <style global jsx>{`
        html,
        body,
        div#__next,
        div#__next > div {
          height: 100%;
          margin: 0;
        }
      `}</style>
    </Canvas>
  );
};
