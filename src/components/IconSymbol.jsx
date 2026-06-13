/**
 * IconSymbol
 *
 * Renders the chosen visual support without replacing the communication label.
 * The icon/emoji/image is decorative; labels remain visible and are used for
 * read-aloud, screen-reader naming, event logs, and exports.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIconDefinition } from "../data/iconLibrary.js";

export default function IconSymbol({ item, icon, emoji, imageUrl, label, className = "icon-symbol" }) {
  const itemVisual = item?.visual;
  const iconName =
    icon ??
    item?.icon ??
    (itemVisual?.type === "fontawesome" ? itemVisual.value : null);
  const emojiValue =
    emoji ??
    item?.emoji ??
    (itemVisual?.type === "emoji" ? itemVisual.value : null);
  const imageValue =
    imageUrl ??
    item?.imageUrl ??
    (itemVisual?.type === "image" ? itemVisual.value : null);
  const labelValue = label ?? item?.label ?? "visual";
  const iconDefinition = iconName ? getIconDefinition(iconName) : null;

  if (imageValue) {
    return <img className={className} src={imageValue} alt="" aria-hidden="true" />;
  }

  if (iconDefinition) {
    return <FontAwesomeIcon className={className} icon={iconDefinition} aria-hidden="true" />;
  }

  if (emojiValue) {
    return <span className={className} aria-hidden="true">{emojiValue}</span>;
  }

  return <span className={className} aria-hidden="true">{labelValue.slice(0, 1).toUpperCase()}</span>;
}
