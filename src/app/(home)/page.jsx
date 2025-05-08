import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div
        className="w-full flex flex-col items-center justify-center bg-[#1B1D24] text-[#1B1D24]"
        style={{ height: `calc(100vh - 60px)` }}
      >
        <div className="w-[95%] max-w-[500px] h-1/2 p-3 bg-[#5D9D0B] rounded-2xl shadow-2xl flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Welcome To My Quiz App</h1>
          <p className="text-lg mt-5 text-center">
            In this quiz app, you can practice your skills in JavaScript, HTML,
            CSS, and React.
          </p>
          <p className="text-lg mt-2 text-center">
            To Start Reading The Docs, Click The Button Below.
          </p>

          <Link
            href={"/quiz"}
            className="bg-[#1B1D24] text-[#72EB3A] font-bold py-2 px-4 rounded-full mt-7 hover:scale-105 transition-all duration-300"
          >
            Documentation
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
