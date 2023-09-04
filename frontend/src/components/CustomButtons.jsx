import { useOutletContext } from "react-router-dom";

export function ResetButton({ disabledButton }) {
  const { setKafkaData, setDelayedKafkaData } = useOutletContext();
  return (
    <BaseButton
      text="Clear Graphs"
      disabled={disabledButton}
      extraClasses={
        disabledButton &&
        "cursor-not-allowed !bg-dove-neutral-300 border-none p-[1px] !text-black"
      }
      handleClick={() => {
        setKafkaData([]);
        setDelayedKafkaData([]);
      }}
    ></BaseButton>
  );
}

export function SaveFormButton({ disabledButton }) {
  return (
    <BaseButton
      text="Save Changes"
      type="submit"
      id="submitForm"
      disabled={disabledButton}
      extraClasses={
        disabledButton &&
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
