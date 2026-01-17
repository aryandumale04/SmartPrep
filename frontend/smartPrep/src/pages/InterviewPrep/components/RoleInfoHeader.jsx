import React from "react";

const RoleInfoHeader = ({
  isDrawerOpen = false,
  role,
  topicsToFocus,
  experience,
  questions,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative">
      {/* ✅ match InterviewPrep container spacing */}
      <div className="container mx-auto px-4 md:px-0 relative">
        {/* ✅ use SAME grid rules as your questions section */}
        <div className="grid grid-cols-12 gap-4">
          <div
            className={`
              col-span-12
              ${isDrawerOpen
  ? "md:col-span-6 md:col-start-2"
  : "md:col-span-10 md:col-start-2"
}

              relative z-10 h-[200px] flex flex-col justify-center
              transition-all duration-300
            `}
          >
            <h2 className="text-3xl font-bold text-black">{role}</h2>

            <p className="text-[15px] font-semibold text-gray-900 mt-1">
              {topicsToFocus}
            </p>

            <div className="flex items-center gap-2.5 mt-4 flex-wrap">
              <div className="text-[12px] font-semibold text-white bg-black px-3.5 py-1.5 rounded-full">
                Experience : {experience} {experience == 1 ? "Year" : "Years"}
              </div>

              <div className="text-[12px] font-semibold text-white bg-black px-3.5 py-1.5 rounded-full">
                {questions} - Q&A
              </div>

              <div className="text-[12px] font-semibold text-white bg-black px-3.5 py-1.5 rounded-full">
                Last Updated : {lastUpdated}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ background blob */}
        <div className="pointer-events-none w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center overflow-hidden absolute top-0 right-0">
          <div className="w-16 h-16 bg-rose-300 blur-[65px] animate-blob1"></div>
          <div className="w-16 h-16 bg-orange-200 blur-[65px] animate-blob2"></div>
          <div className="w-16 h-16 bg-amber-200 blur-[45px] animate-blob3"></div>
          <div className="w-16 h-16 bg-rose-200 blur-[45px] animate-blob1"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
