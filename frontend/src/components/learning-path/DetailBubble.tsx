import { forwardRef } from "react";

const DetailBubble = forwardRef<HTMLDivElement, {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  xp?: string;
  style?: React.CSSProperties;
  blockedStyle?: React.CSSProperties;
  onClick?: () => void;
  ref?: React.RefObject<HTMLDivElement>;
}>(({ title, subtitle, buttonLabel, xp, style, blockedStyle, onClick }, ref) => (
  <div ref={ref} 
    className={"absolute top-[120%] left-1/2 -translate-x-1/2 flex flex-col items-center z-30"}
  >
    <div className="bg-[#fbb124] text-white rounded-xl px-5 py-2 shadow-lg relative w-[300px]" style={blockedStyle}>
      <div className="absolute left-1/2 -top-2 -translate-x-1/2">
        <div className="w-4 h-4 bg-[#fbb124] rotate-45" style={blockedStyle}/>
      </div>
      <div className="mb-2"><span className="font-bold text-base">{title}</span></div>
      <div className="mb-3 text-sm">{subtitle}</div>
      <button
        className="flex rounded-full px-14 py-2 gap-1.5 text-base w-full text-center justify-center transition hover:bg-[#fff3d1] active:scale-95"
        style={style}
        onClick={onClick}
      >
        <span>{buttonLabel}</span>
        <span className="font-bold">{xp}</span>
      </button>
    </div>
  </div>
));
export default DetailBubble;
