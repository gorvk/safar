import { Titlebar } from "../components/Titlebar/Titlebar";

export const Legal = () => {
  const points = [
    {
      title: "User-Generated Content",
      detail:
        "Users retain ownership of the data they upload to the app. Toorist does not claim any rights over user-generated content and is not responsible for its accuracy, legality, or appropriateness.",
    },
    {
      title: "NSFW & Inappropriate Content",
      detail:
        "Toorist strives to prevent the presence of NSFW (Not Safe for Work) or inappropriate content by implementing moderation measures. However, we do not guarantee the complete removal of such content and disclaim any liability for its presence.",
    },
    {
      title: "Account Security",
      detail:
        "All user logins are managed through Google authentication services. Toorist does not store or handle passwords directly and relies on Google’s security protocols to protect user accounts.",
    },
    {
      title: "Prohibited Activities",
      detail:
        "Users are strictly prohibited from engaging in any illegal, unethical, or harmful activities on the app. Toorist does not endorse or support such activities and makes efforts to remove related content. However, we are not liable if such activities go undetected.",
    },
    {
      title: "User Responsibility for Misuse",
      detail:
        "Users found misusing the app for unethical, illegal, or harmful purposes bear sole responsibility for their actions. Toorist disclaims any liability for consequences arising from such misuse.",
    },
    {
      title: "Privacy & Data Usage",
      detail:
        "Toorist does not use user data for marketing purposes, nor do we sell or share personal data with third parties. Any data collected is solely used for improving app functionality and user experience, in compliance with applicable privacy laws.",
    },
    {
      title: "Policy Enforcement & Updates",
      detail:
        "Toorist reserves the right to update, modify, or enforce these terms at its discretion. Continued use of the app signifies acceptance of any revised terms.",
    },
  ];
  return (
    <>
      <Titlebar />
      <h2 className="text-center m-10 uppercase underline font-bold">
        By using this application, the user agrees to comply with the following
        terms and conditions.
      </h2>
      <ol className="m-10 list-decimal font-bold flex flex-col gap-4 marker:text-app-secondary-color">
        {points.map((point) => (
          <li>
            <h2 className="text-app-color underline">{point.title}</h2>
            <h3 className="text-app-color-light font-medium">{point.detail}</h3>
          </li>
        ))}
      </ol>
    </>
  );
};
