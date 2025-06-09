export default function StartBubble() {
    return (
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 animate-bounce">
        {/* Bubble */}
        <div className="bg-white border-2 border-[#fbb124] rounded-xl px-3 py-3 text-[#fbb124] font-bold shadow text- relative">
          START
          {/* Pointer/Notch */}
          <div className="absolute left-1/2 -bottom-1/5 -translate-x-1/2 -rotate-90">
            <div className="w-5 h-5 bg-white border-l-2 border-b-2 border-[#fbb124] rotate-45" style={{ borderRadius: "1px" }} />
          </div>
        </div>
      </div>
    );
  }
  