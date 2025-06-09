import { forwardRef } from "react";
const LockedBubble = forwardRef<HTMLDivElement, { message: string }>(
  ({ message }, ref) => (
    <div ref={ref} className="absolute top-[110%] left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
      <div className="bg-gray-200 text-gray-700 rounded-xl px-6 py-4 shadow-lg relative w-[230px]">
        <div className="absolute left-1/2 -top-2 -translate-x-1/2">
          <div className="w-4 h-4 bg-gray-200 rotate-45" />
        </div>
        <div className="mb-2 font-semibold text-base">{message}</div>
      </div>
    </div>
  )
);
export default LockedBubble;
