// Threejs example: threejs.org/examples/?q=asc#webgl_effects_ascii

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useCursor } from '@react-three/drei'
import { AsciiEffect } from 'three-stdlib'

export default function App() {
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model />
      <OrbitControls />
      <AsciiRenderer invert />
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
  )
}

function Model(props) {
  const ref = useRef()
  const [clicked, click] = useState(false)
  const [hovered, hover] = useState(false)

  useCursor(hovered)
  useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta / 2))
  const radius = 1;
  const tubeRadius = 0.5;
  const radialSegments = 10;
  const tubeSegments = 16;
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1.25}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <torusGeometry args={[radius, tubeRadius, radialSegments, tubeSegments]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function AsciiRenderer({ renderIndex = 1, characters = ' .:-+*=%@#', ...options }) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, options)
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.color = 'white'
    effect.domElement.style.backgroundColor = 'black'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  }, [characters, options.invert])

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.parentNode.appendChild(effect.domElement)
    return () => gl.domElement.parentNode.removeChild(effect.domElement)
  }, [effect])

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera)
  }, renderIndex)

  // This component returns nothing, it has no view, it is a purely logical
}
