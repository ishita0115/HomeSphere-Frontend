"use client";
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import HomeProperty from './components/WithoutLogin/Homeshowproperty/HomeProperty';
import GetStarted from './components/WithoutLogin/Getstart/getstart';
import Mapall from './components/Alllistingmap/Mapall';
import Value from './components/WithoutLogin/OurValue/detail';
import About from './components/WithoutLogin/about/aboutus';

export default function Home() {
  const searchParams = useSearchParams();
  const search1 = searchParams.get('lat');
  const search2 = searchParams.get('lng');
  const uid = useSelector((state:any) => state.auth.token.uid);

  console.log(search1, search2);

  return (
    <>
      <HomeProperty />
      {!uid && <GetStarted />}
      <About />
      <Value />
      <main className="max-w-[1500px] mx-auto px-6 sticky">
        {uid && <Mapall search1={search1} search2={search2}/>}
      </main>
    </>
  );
}
