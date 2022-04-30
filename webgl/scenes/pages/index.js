import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Link href="/scenes/box-demo"><a>Box Demo Scene</a></Link>
      <br/>
      <Link href="/scenes/box-demo-2"><a>Box Demo Scene 2: Camera</a></Link>
      <br/>
      <Link href="/scenes/box-demo-3"><a>Box Demo Scene 3: OrbitControls, Keyboard</a></Link>
      <br/>
      <Link href="/scenes/ascii-donut"><a>A donut rendered in ascii</a></Link>
    </div>
  );
};
