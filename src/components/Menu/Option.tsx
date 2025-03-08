export const Option = (props: { label: string; handler: () => void }) => {
  const { label, handler } = props;
  return (
    <div
      onClick={handler}
      className="block px-4 py-2 bg-app-color rounded-lg text-white cursor-pointer"
    >
      {label}
    </div>
  );
};
