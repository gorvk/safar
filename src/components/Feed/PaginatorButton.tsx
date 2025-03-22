export const PaginatorButton = (props: {
  label: "Next" | "Previous";
  clickHandler: () => void;
  isDisabled: boolean;
}) => {
  const { clickHandler, isDisabled, label } = props;
  const theme = `${
    isDisabled ? "bg-gray-500" : "bg-app-color"
  } py-2 rounded-lg font-bold w-21 cursor-pointer`;
  return (
    <button onClick={clickHandler} disabled={isDisabled} className={theme}>
      {label}
    </button>
  );
};
