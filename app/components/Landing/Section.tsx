import { TSectionData } from "../../types";

export const Section = (props: { sectionData: TSectionData }) => {
  const { sectionData: data } = props;
  return (
    <div
      className={`flex not-lg:flex-col items-center gap-8 lg:gap-16 m-auto ${
        data.isReversed && "flex-row-reverse"
      }`}
    >
      <div className="text-3xl font-medium m-auto text-app-secondary-color text-center lg:text-left">
        {data.title}
        <ul className="text-xl font-medium text-app-color-light flex flex-col gap-2 lg:gap-6 my-6">
          {data.subTitles.map((subTitle, index) => (
            <li key={index} className="lg:border-l-2 lg:pl-6">
              {subTitle}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative m-auto p-1 border-1 border-app-seperator rounded-xl shadow-md w-4/6 md:w-2/5 lg:w-100">
        <img src={data.thumbnailUrl} />
      </div>
    </div>
  );
};
