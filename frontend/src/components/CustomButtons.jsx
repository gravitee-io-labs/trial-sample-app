import { useOutletContext } from "react-router-dom";

export function ResetButton() {
  const { setKafkaData } = useOutletContext();
  return <BaseButton text="Clear" handleClick={() => setKafkaData([])}></BaseButton>;
}

export function SaveFormButton({ formModified }) {
  return (
    <BaseButton
      text="Save Changes"
      type="submit"
      id="submitForm"
      disabled={!formModified}
      extraClasses={
        !formModified && "cursor-not-allowed bg-gray-300 shadow-gray-300/30"
      }
    ></BaseButton>
  );
}

function BaseButton({
  text,
  extraClasses = "",
  handleClick = null,
  type = null,
  id = null,
  disabled = null,
}) {
  return (
    <button
      className={`h-14 w-28 rounded-md bg-accent-cyan/80 font-bold tracking-wider text-black shadow-md shadow-accent-cyan/30 enabled:hover:opacity-70 ${extraClasses}`}
      onClick={handleClick}
      type={type}
      id={id}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
