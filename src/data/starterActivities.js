import { createId } from "../utils/formatters.js";

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
      {
        id: createId("step"),
        label: "Sit at table",
        visual: { type: "emoji", value: "🪑", altText: "Chair" },
        completed: false,
      },
      {
        id: createId("step"),
        label: "Get food",
        visual: { type: "emoji", value: "🥣", altText: "Bowl" },
        completed: false,
      },
      {
        id: createId("step"),
        label: "Take bites",
        visual: { type: "emoji", value: "😋", altText: "Eating face" },
        completed: false,
      },
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
      {
        id: createId("step"),
        label: "Get toothbrush",
        visual: { type: "emoji", value: "🪥", altText: "Toothbrush" },
        completed: false,
      },
      {
        id: createId("step"),
        label: "Add toothpaste",
        visual: { type: "emoji", value: "🧴", altText: "Tube" },
        completed: false,
      },
      {
        id: createId("step"),
        label: "Brush top teeth",
        visual: { type: "emoji", value: "⬆️", altText: "Up arrow" },
        completed: false,
      },
      {
        id: createId("step"),
        label: "Brush bottom teeth",
        visual: { type: "emoji", value: "⬇️", altText: "Down arrow" },
        completed: false,
      },
      {
        id: createId("step"),
        label: "Rinse",
        visual: { type: "emoji", value: "🚰", altText: "Faucet" },
        completed: false,
      },
    ],
  },
];
