"use client";

interface GoToWebsiteProps {
  website: string;
}

const GoToWebsite: React.FC<GoToWebsiteProps> = ({ website }) => {
  return (
    <div
      onClick={() => window.open(website, "_blank")}
      className="hidden md:flex hover:underline cursor-pointer text-[#ff6154] ml-2"
    >
      Visit Website
    </div>
  );
};

export default GoToWebsite;
