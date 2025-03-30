import React from "react";
import { Section } from "../components/Landing/Section";
import { Titlebar } from "../components/Titlebar/Titlebar";
import { TSectionData } from "../types";
import { ConclusionSection } from "../components/Landing/ConclusionSection";
import { Footer } from "../components/Landing/Footer";

export const About = () => {
  const sectionsData: TSectionData[] = [
    {
      title: "Sharable itineraries for your next trip",
      subTitles: [
        "Next trip plans shared by people just like you",
        "Save memories & moments in one place",
        "Get time and dates visited",
      ],
      thumbnailUrl: "landing/feed.png",
      isReversed: false,
      isThumbnailScrollable: true,
    },
    {
      title: "Get all the checkpoints & places to visit of a trip",
      subTitles: [
        "Detailed path from one destination to another.",
        "Beautiful clicks from the trip",
        "Share your trip to world",
      ],
      thumbnailUrl: "landing/view.png",
      isReversed: true,
      isThumbnailScrollable: false,
    },
    {
      title: "Details about each places visited",
      subTitles: [
        "Location URLs",
        "Things to try at each checkpoint",
        "Sharable checkpoint links",
      ],
      thumbnailUrl: "landing/checkpoint.png",
      isReversed: false,
      isThumbnailScrollable: false,
    },
  ];

  return (
    <>
      <div className="fixed w-full z-20">
        <Titlebar />
      </div>
      <div className="absolute w-full h-fit pt-20 flex flex-col gap-10 items-center">
        {sectionsData.map((data, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <hr className="text-app-seperator w-4/5" />}
            <Section sectionData={data} />
          </React.Fragment>
        ))}
        <hr className="text-app-seperator w-4/5" />
        <ConclusionSection />
        <Footer />
      </div>
    </>
  );
};
