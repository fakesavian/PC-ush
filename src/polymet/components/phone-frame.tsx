import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto h-[844px] w-[390px] overflow-hidden rounded-[60px] border-[14px] border-[#1A1A1C] bg-white shadow-xl">
      {/* Notch */}
      <div className="absolute left-1/2 top-0 z-50 h-[30px] w-[180px] -translate-x-1/2 rounded-b-[14px] bg-[#1A1A1C]"></div>

      {/* Status Bar */}
      <div className="relative z-10 flex h-[48px] w-full items-center justify-between px-6 pt-2">
        <div className="text-xs font-medium text-gray-900">9:41</div>
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5 12.75V16.5C18.5 16.8978 18.342 17.2794 18.0607 17.5607C17.7794 17.842 17.3978 18 17 18H7C6.60218 18 6.22064 17.842 5.93934 17.5607C5.65804 17.2794 5.5 16.8978 5.5 16.5V12.75C5.5 12.3522 5.65804 11.9706 5.93934 11.6893C6.22064 11.408 6.60218 11.25 7 11.25H17C17.3978 11.25 17.7794 11.408 18.0607 11.6893C18.342 11.9706 18.5 12.3522 18.5 12.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M7.75 11.25V8.25C7.75 6.86929 8.30312 5.54472 9.28769 4.56015C10.2723 3.57559 11.5968 3.02246 13 3.02246C14.4032 3.02246 15.7277 3.57559 16.7123 4.56015C17.6969 5.54472 18.25 6.86929 18.25 8.25V11.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="h-3 w-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 6.5C1.5 6.10218 1.65804 5.72064 1.93934 5.43934C2.22064 5.15804 2.60218 5 3 5H21C21.3978 5 21.7794 5.15804 22.0607 5.43934C22.342 5.72064 22.5 6.10218 22.5 6.5V18.5C22.5 18.8978 22.342 19.2794 22.0607 19.5607C21.7794 19.842 21.3978 20 21 20H3C2.60218 20 2.22064 19.842 1.93934 19.5607C1.65804 19.2794 1.5 18.8978 1.5 18.5V6.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M1.5 9.5H22.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="h-3 w-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.25V4.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M12 18.25V20.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M4.75 12H2.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M21.75 12H19.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M18.894 5.106L17.127 6.874"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M6.87305 17.127L5.10605 18.894"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M18.894 18.894L17.127 17.127"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M6.87305 6.873L5.10605 5.106"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="h-3 w-6">
            <div className="h-full w-full rounded-sm bg-black">
              <div className="h-full w-[70%] rounded-sm bg-black"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}
