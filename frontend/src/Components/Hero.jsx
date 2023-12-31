import images from "../constants/images";
import { FiSearch } from "react-icons/fi";

function Hero() {
  return (
    <section className="bg-[#edf3fc] flex flex-col px-5 pt-1 pb-1 lg:flex-row mx-auto">
      <div className="mt-10 ml-5 lg:mt-[28px] xl:mt-[66px] lg:w-1/2">
        <h1 className="font-roboto text-3xl font-bold text-dark-soft text-center md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most interesting articles
        </h1>
        <p className=" text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Explore captivating stories on our blog! Dive into thought-provoking
          articles covering diverse topics. Check out our latest posts,
          handpicked editor's favorites, and popular reader choices. Discover a
          world of interesting reads below. Happy reading!
        </p>
        <div className="flex flex-col gap-y-9 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FiSearch className="w-6 h-6 absolute left-3 top-1/2 text-[#959EAD] -translate-y-1/2" />
            <input
              className="placeholder:font-bold placeholder:text-[#959EAD] text-[#122744] font-semibold italic focus:outline-none rounded-lg w-full pl-12 pr-3 py-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              type="text"
              placeholder="Search Article"
            />
          </div>

          <button className="w-full text-white bg-[#3B82F6] font-semibold rounded-lg px-5 py-3 md:absolute md:w-fit md:right-2 -translate-y-1/2 md:top-1/2 md:py-2 ">
            Search
          </button>
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-nowrap lg:items-start lg:gap-x-4 mt-4 lg:mt-7 ">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags :
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg  bg-[#3a6ec0] bg-opacity-10 text-black font-semibold px-3 py-1.5">
              Design
            </li>
            <li className="rounded-lg bg-[#3B82F6] bg-opacity-10 text-black font-semibold px-3 py-1.5">
              User Experience
            </li>
            <li className="rounded-lg bg-[#3B82F6] bg-opacity-10 text-black font-semibold px-3 py-1.5">
              User Interface
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 ml-12 ">
        <img
          className="w-full  "
          src={images.HeroImage}
          alt="user reading article"
        />
      </div>
    </section>
  );
}

export default Hero;
