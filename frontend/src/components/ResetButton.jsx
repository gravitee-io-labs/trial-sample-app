import { useOutletContext } from "react-router-dom";

export default function ResetButton() {
  const { setKafkaData } = useOutletContext();

  return (
    <button
      className="h-12 w-20 rounded-md bg-accent-cyan/80 font-bold tracking-wider text-black shadow-md shadow-accent-cyan/30 hover:opacity-70"
      onClick={() => setKafkaData([])}
    >
      Clear
    </button>
  );
}
