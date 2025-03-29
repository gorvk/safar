export const Spinner = () => {
  return (
    <div
      role="status"
      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
    >
      <div>
        <img
          src="/spinner.svg"
          className="max-w-none w-30 m-auto outline-none animate-spin"
        />
      </div>
    </div>
  );
};
