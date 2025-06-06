import LearningStep from "../learning-path/LearningStep";
import CompoundLine from "../learning-path/CompoundLine";
import StarIcon from '../../assets/star.png';
import EarIcon from '../../assets/ear.png';
import SoundwaveIcon from '../../assets/soundwave.png';
import ChestIcon from '../../assets/chest.png';

const steps = [
  {
    icon: <img src={StarIcon} alt="Star" className="h-9 w-9" />,
    active: true,
  },
  {
    icon: <img src={EarIcon} alt="Ear" className="h-9 w-9" />,
  },
  {
    icon: <img src={SoundwaveIcon} alt="Soundwave" className="h-9 w-9" />,
  },
  {
    icon: <img src={ChestIcon} alt="Chest" className="h-9 w-9" />,
  },
];

export default function MainContent() {
  return (
    <div className="flex-1 relative flex justify-center overflow-auto h-full custom-scroll px-4 mx-auto max-w-3xl">
      <div className="w-full max-w-3xl px-4 mx-auto py-8">

        {/* Lesson Header */}
        <div className="bg-[#fbb124] text-white font-bold rounded-2xl shadow px-8 py-8 mb-12 w-full">
          <div className="text-sm font-medium">Lesson 2, Unit 2</div>
          <div className="text-xl font-bold">ä, ö, ü sound</div>
        </div>

        {/* Vertical Stepper */}
        <div className="flex flex-col items-center relative gap-10 min-h-[400px]">
          {steps.map((step, i) => (
            <LearningStep
              key={i}
              {...step}
              first={i === 0}
              last={i === steps.length - 1}
            />
          ))}
        </div>
        
        {/* Compound line under the steps */}
        <CompoundLine label="compound sound" />
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
