import LineAroundText from "../learning-path/LineAroundText";
import StarIcon from '../../assets/star.png';
import EarIcon from '../../assets/ear.png';
import SoundwaveIcon from '../../assets/soundwave.png';
import ChestIcon from '../../assets/chest.png';
import LessonHeader from "../learning-path/LessonHeader";
import VerticalStep from "../learning-path/VerticalStep";

const steps = [
  {icon: <img src={StarIcon} alt="" className="h-9 w-9" />,active: true},
  {icon: <img src={EarIcon} alt="" className="h-9 w-9" />,active: false},
  {icon: <img src={SoundwaveIcon} alt="" className="h-9 w-9" />,active: false},
  {icon: <img src={ChestIcon} alt="" className="h-9 w-9" />,active: false},
];

export default function MainContent() {
  return (
    <div className="flex-1 relative flex justify-center overflow-auto h-full custom-scroll px-4 mx-auto max-w-3xl">
      <div className="w-full max-w-3xl px-4 mx-auto py-8">

        <LessonHeader title="ä, ö, ü sound" subtitle="Lesson 2, Unit 2" />
        <VerticalStep steps={steps} />
        <LineAroundText label="compound sound" />
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
  );
}
