// 🧩 EmptyPanel Component
// ------------------------------------------------------
// This React component displays an empty state panel, typically used
// when there are no items, events, or data to show. It visually informs
// users with a friendly illustration and a customizable message.
//
// Props:
// - title (string): Optional text to display below the image. Defaults to
//   "No Upcoming Events" if not provided.
//
// Usage Example:
// <EmptyPanel title="No Tasks Available" />
//
// Styling:
// - Uses Tailwind CSS classes for layout, spacing, and typography.
// - Centers content vertically and horizontally within its container.
//
import emptyImage from "@/assets/no-events.svg";

const EmptyPanel = (props: { title: string }) => {
  const { title = "No Upcoming Events" } = props;
  return (
    <div
      className="flex flex-col items-center justify-center
     h-full p-[50px_0_50px_0] text-center"
    >
      <img src={emptyImage} alt={title} className="w-[120px] h-[120px] mb-1" />
      <h3 className="text-xl mb-[12px] font-bold opacity-90 text-[#476788]">
        {title}
      </h3>
    </div>
  );
};

export default EmptyPanel;
