import useBillboard from '@/hooks/useBillboard';
import { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai'

const Billboard = () => {
  const { data } = useBillboard();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  // This useEffect will only run once, during the first render
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);
  // initialRenderComplete will be false on the first render and true on all following renders
  if (!initialRenderComplete) {
    // Returning null will prevent the component from rendering, so the content will simply be missing from
    // the server HTML and also wont render during the first client-side render.
    return null;
  } else {
    const date = new Date();
    return (
      <main className="relative h-[56.25vw]">
        <video
          className="w-full h-[56.25vw]
        object-cover brightness-[60%]"
          autoPlay
          muted
          loop
          poster={data?.thumbnailUrl}
          src={data?.videoUrl}
        ></video>
        <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
          <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
            {data?.title}
          </p>
          <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
            {data?.description}
          </p>
          <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
            <button
              className='
              bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs
              lg:text-lg font-semibold flex items-center hover:bg-opacity-20 transition'
            >
            <AiOutlineInfoCircle className="mr-1 " />
              More Info</button>
          </div>
        </div>
      </main>
    );
  }
};
export default Billboard;