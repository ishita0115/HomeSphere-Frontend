import Image from "next/image";
import Listing from "../../app/components/Listing/Listing";
import Mapall from "../components/Alllistingmap/Mapall";

export default function DetailHome() {
  return (
    <>
    <main className="max-w-[1500px] mx-auto px-6">
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

    <Listing />
  
    </div>
  
    </main >
    </>
  );
}
