import { useOutletContext } from "react-router-dom";

export function ResetButton() {
  const { setKafkaData, setDelayedKafkaData } = useOutletContext();
  return (
    <BaseButton
      text="Clear Graphs"
      handleClick={() => {
        setKafkaData([]);
        setDelayedKafkaData([]);
      }}
    ></BaseButton>
  );
}

export function SaveFormButton({ formModified }) {
  return (
    <BaseButton
      text="Save Changes"
      type="submit"
      id="submitForm"
      disabled={!formModified}
      extraClasses={
        !formModified &&
        "cursor-not-allowed !bg-dove-neutral-300 border-none !text-black"
      }
    ></BaseButton>
  );
}

export function BaseButton({
  text,
  extraClasses = "",
  handleClick = null,
  type = null,
  id = null,
  disabled = null,
}) {
  return (
    <button
      className={`h-14 w-28 rounded-md border-2 border-primary-600 bg-primary-200 font-bold tracking-wider text-primary-800 enabled:hover:opacity-70 enabled:group-hover:opacity-70 ${extraClasses}`}
      onClick={handleClick}
      type={type}
      id={id}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
