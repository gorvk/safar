export const Option = (props: { label: string; handler: () => void }) => {
  const { label, handler } = props;
  return (
    <div
      onClick={handler}
      className="text-sm px-4 py-2 bg-app-color rounded-md text-white cursor-pointer"
    >
      {label}
    </div>
  );
};
