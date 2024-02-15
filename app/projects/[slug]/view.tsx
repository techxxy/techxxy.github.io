import { useEffect } from "react";

const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  useEffect(() => {
    const incrementPageView = async () => {
      try {
        await fetch("/api/incr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });
      } catch (error) {
        console.error("Error incrementing page view:", error);
      }
    };

    incrementPageView();
  }, [slug]);

  return null;
};

export default ReportView;