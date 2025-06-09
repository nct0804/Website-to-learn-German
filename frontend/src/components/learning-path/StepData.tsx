import StarIcon from '../../assets/star.png';
import EarIcon from '../../assets/ear.png';
import SoundwaveIcon from '../../assets/soundwave.png';
import ChestIcon from '../../assets/chest.png';

// TODO: Connect and get the data from the backend
const steps = [
  {
    icon: <img src={StarIcon} alt="" className="h-9 w-9" />,
    active: false,
    title: "ö sound",
    subtitle: "How to pronounce ö sound as a native",
    actionLabel: "START +10 XP",
    learned: true,
    onAction: () => alert("Start lesson!")
  },
  {
    icon: <img src={EarIcon} alt="" className="h-9 w-9" />,
    active: true,
    title: "ö sound",
    subtitle: "How to pronounce ö sound as a native",
    actionLabel: "START +10 XP",
    learned: false,
    onAction: () => alert("Start lesson!")
  },
  {
    icon: <img src={SoundwaveIcon} alt="" className="h-9 w-9" />,
    active: false,
    title: "ö sound",
    subtitle: "How to pronounce ö sound as a native",
    actionLabel: "START +10 XP",
    learned: false,
    onAction: () => alert("Start lesson!")
  },
  {
    icon: <img src={ChestIcon} alt="" className="h-9 w-9" />,
    active: false,
    title: "ö sound",
    subtitle: "How to pronounce ö sound as a native",
    actionLabel: "START +10 XP",
    learned: false,
    onAction: () => alert("Start lesson!")
  },
];

export default steps;
