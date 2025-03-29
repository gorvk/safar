export const Option = (props: { label: string; handler: () => void }) => {
  const { label, handler } = props;
  return (
    <div
      onClick={handler}
      className="text-sm px-4 py-2 bg-app-color text-white font-medium cursor-pointer"
    >
      {label}
    </div>
  );
};
