import { Outlet } from "react-router-dom";

export default function MainContent() {
    return (
      <div
        className="flex-1
          relative
          flex
          justify-center
          overflow-auto
          h-full
          custom-scroll
          px-4 mx-auto
          max-w-3xl">
        <div className="w-full max-w-3xl px-4 mx-auto">
          <Outlet />
        </div>
        <style>
          {`
            .custom-scroll::-webkit-scrollbar {
              display: none;
            }
            .custom-scroll {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
          `}
        </style>
      </div>
    )
}