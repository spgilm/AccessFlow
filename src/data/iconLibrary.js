/**
 * Curated Font Awesome Free icon registry for AccessFlow.
 *
 * The icon is a visual support. The visible text label remains the
 * communication message, read-aloud phrase, event-log value, and screen
 * reader name.
 */
import * as solidIcons from "@fortawesome/free-solid-svg-icons";

export const iconMap = {
  "arrow-right": solidIcons.faArrowRight,
  bell: solidIcons.faBell,
  book: solidIcons.faBookOpen,
  briefcase: solidIcons.faBriefcase,
  bus: solidIcons.faBus,
  calendar: solidIcons.faCalendarDay,
  check: solidIcons.faCheck,
  "circle-exclamation": solidIcons.faCircleExclamation,
  info: solidIcons.faCircleInfo,
  pause: solidIcons.faCirclePause,
  play: solidIcons.faCirclePlay,
  question: solidIcons.faCircleQuestion,
  clock: solidIcons.faClock,
  comment: solidIcons.faCommentDots,
  listen: solidIcons.faEarListen,
  eye: solidIcons.faEye,
  angry: solidIcons.faFaceAngry,
  dizzy: solidIcons.faFaceDizzy,
  sad: solidIcons.faFaceFrown,
  excited: solidIcons.faFaceGrinStars,
  okay: solidIcons.faFaceMeh,
  happy: solidIcons.faFaceSmile,
  tired: solidIcons.faFaceTired,
  hand: solidIcons.faHand,
  care: solidIcons.faHandHoldingHeart,
  stop: solidIcons.faHand,
  help: solidIcons.faHandsHelping || solidIcons.faHandshakeAngle || solidIcons.faHandHolding,
  headphones: solidIcons.faHeadphones,
  heart: solidIcons.faHeart,
  home: solidIcons.faHome || solidIcons.faHouse,
  nurse: solidIcons.faHouseMedical || solidIcons.faHospital,
  idea: solidIcons.faLightbulb,
  location: solidIcons.faLocationDot,
  drink: solidIcons.faMugSaucer,
  walk: solidIcons.faPersonWalking,
  phone: solidIcons.faPhone,
  "question-mark": solidIcons.faQuestion,
  repeat: solidIcons.faRotateLeft,
  safety: solidIcons.faShieldHeart || solidIcons.faShield,
  clothes: solidIcons.faShirt,
  "stop-sign": solidIcons.faStop,
  toilet: solidIcons.faToilet,
  trash: solidIcons.faTrash,
  food: solidIcons.faUtensils,
  loud: solidIcons.faVolumeHigh,
  quiet: solidIcons.faVolumeXmark,
  xmark: solidIcons.faXmark,
};

export const curatedIconLibrary = [
  {
    category: "Help / support",
    icons: [
      { name: "hand", label: "Help", recommendedUse: "Help request, raise hand" },
      { name: "help", label: "Support", recommendedUse: "Staff support or do it with me" },
      { name: "question", label: "Question", recommendedUse: "I have a question" },
      { name: "comment", label: "Message", recommendedUse: "Communication / say something" },
      { name: "repeat", label: "Try again", recommendedUse: "Repeat or repair communication" },
      { name: "info", label: "Information", recommendedUse: "Tell me more" },
    ],
  },
  {
    category: "Yes / no / choices",
    icons: [
      { name: "check", label: "Yes", recommendedUse: "Yes / done / correct" },
      { name: "xmark", label: "No", recommendedUse: "No / reject / not that" },
      { name: "question-mark", label: "Not sure", recommendedUse: "Maybe / I do not know" },
      { name: "stop", label: "Stop", recommendedUse: "Stop / please stop" },
      { name: "arrow-right", label: "Next", recommendedUse: "Next / go forward" },
    ],
  },
  {
    category: "Feelings",
    icons: [
      { name: "happy", label: "Happy", recommendedUse: "Happy / okay" },
      { name: "sad", label: "Sad", recommendedUse: "Sad / upset" },
      { name: "angry", label: "Mad", recommendedUse: "Angry / frustrated" },
      { name: "okay", label: "Okay", recommendedUse: "Neutral / okay" },
      { name: "tired", label: "Tired", recommendedUse: "Tired / low energy" },
      { name: "excited", label: "Excited", recommendedUse: "Excited / very happy" },
      { name: "heart", label: "Feeling", recommendedUse: "Feelings board" },
    ],
  },
  {
    category: "Sensory / regulation",
    icons: [
      { name: "headphones", label: "Headphones", recommendedUse: "Noise support" },
      { name: "loud", label: "Too loud", recommendedUse: "Loud place or sound" },
      { name: "quiet", label: "Quiet", recommendedUse: "Quiet / lower volume" },
      { name: "walk", label: "Walk", recommendedUse: "Movement break" },
      { name: "pause", label: "Break", recommendedUse: "Pause or break" },
      { name: "clock", label: "Wait", recommendedUse: "Waiting or timer" },
    ],
  },
  {
    category: "Health / body",
    icons: [
      { name: "nurse", label: "Nurse", recommendedUse: "Health center / nurse" },
      { name: "dizzy", label: "Sick", recommendedUse: "I feel sick" },
      { name: "toilet", label: "Bathroom", recommendedUse: "Bathroom / hygiene" },
      { name: "drink", label: "Drink", recommendedUse: "Water / drink" },
      { name: "food", label: "Food", recommendedUse: "Food / meal" },
    ],
  },
  {
    category: "Schedule / daily living",
    icons: [
      { name: "calendar", label: "Schedule", recommendedUse: "Calendar / schedule" },
      { name: "play", label: "Start", recommendedUse: "Start task" },
      { name: "pause", label: "Pause", recommendedUse: "Pause / wait" },
      { name: "home", label: "Home", recommendedUse: "Home / residential" },
      { name: "clothes", label: "Clothes", recommendedUse: "Laundry / dressing" },
      { name: "trash", label: "Clean up", recommendedUse: "Clean up / trash" },
    ],
  },
  {
    category: "Community / vocational",
    icons: [
      { name: "briefcase", label: "Work", recommendedUse: "Job / vocational" },
      { name: "bus", label: "Transportation", recommendedUse: "Bus / transport" },
      { name: "location", label: "Place", recommendedUse: "Location / destination" },
      { name: "safety", label: "Safe person", recommendedUse: "Safety / trusted helper" },
      { name: "phone", label: "Call", recommendedUse: "Call support person" },
      { name: "book", label: "School", recommendedUse: "School / class" },
    ],
  },
  {
    category: "Social",
    icons: [
      { name: "hand", label: "Hello", recommendedUse: "Greeting" },
      { name: "listen", label: "Listen", recommendedUse: "Listen / I hear you" },
      { name: "eye", label: "Look", recommendedUse: "Look / show me" },
      { name: "care", label: "Kind", recommendedUse: "Care / thank you / support" },
      { name: "bell", label: "Attention", recommendedUse: "Get attention" },
    ],
  },
];

export function getIconDefinition(iconName) {
  return iconMap[iconName] ?? null;
}

export function getFlatIconLibrary() {
  return curatedIconLibrary.flatMap((group) =>
    group.icons.map((icon) => ({
      ...icon,
      category: group.category,
    }))
  );
}
