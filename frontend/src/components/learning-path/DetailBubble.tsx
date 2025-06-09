import { forwardRef } from "react";

const DetailBubble = forwardRef<HTMLDivElement, {
  title: string;
  subtitle: string;
  buttonLabel: string;
  xp?: string;
  ref?: React.RefObject<HTMLDivElement>;
}>(({ title, subtitle, buttonLabel, xp }, ref) => (
  <div ref={ref} className="absolute top-[120%] left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
    <div className="bg-[#fbb124] text-white rounded-xl px-6 py-4 shadow-lg relative w-[230px]">
      <div className="absolute left-1/2 -top-2 -translate-x-1/2">
        <div className="w-4 h-4 bg-[#fbb124] rotate-45" />
      </div>
      <div className="mb-2"><span className="font-bold text-base">{title}</span></div>
      <div className="mb-3 text-sm">{subtitle}</div>
      <button className="bg-white text-[#fbb124] font-bold rounded-full px-6 py-1 text-base w-full text-center">
        {buttonLabel} {xp}
      </button>
    </div>
  </div>
));
export default DetailBubble;
