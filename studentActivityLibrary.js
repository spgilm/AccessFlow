import { createId } from "../utils/formatters.js";

function makeStep(label, emoji, altText = label) {
  return {
    id: createId("step"),
    label,
    visual: { type: "emoji", value: emoji, altText },
    completed: false,
  };
}

export const starterActivities = [
  {
    id: createId("activity"),
    label: "BREAKFAST",
    sourceText: "eat breakfast",
    summary: "Eat the morning meal.",
    visual: {
      type: "emoji",
      value: "🥣",
      altText: "Bowl representing breakfast",
    },
    completed: false,
    steps: [
      makeStep("Sit at table", "🪑", "Chair"),
      makeStep("Get food", "🥣", "Bowl"),
      makeStep("Use spoon or fork", "🥄", "Spoon"),
      makeStep("Take bites", "😋", "Eating face"),
      makeStep("Clean up", "🧽", "Sponge"),
    ],
  },
  {
    id: createId("activity"),
    label: "TOOTH BRUSHING",
    sourceText: "brush teeth",
    summary: "Use a toothbrush and toothpaste to clean teeth.",
    visual: {
      type: "emoji",
      value: "🪥",
      altText: "Toothbrush representing tooth brushing",
    },
    completed: false,
    steps: [
      makeStep("Get toothbrush", "🪥", "Toothbrush"),
      makeStep("Add toothpaste", "🧴", "Tube"),
      makeStep("Brush top teeth", "⬆️", "Up arrow"),
      makeStep("Brush bottom teeth", "⬇️", "Down arrow"),
      makeStep("Rinse", "🚰", "Faucet"),
    ],
  },
];
