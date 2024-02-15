"use client"; // Marking the component as a client component

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  useEffect(() => {
    const incrPageviews = async () => {
      try {
        const response = await fetch("/handlers/incr", { // Adjusted endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
          console.error("Failed to increment pageviews");
        } else {
          console.log("Pageviews incremented successfully");
        }
      } catch (error) {
        console.error("Error while incrementing pageviews:", error);
      }
    };

    incrPageviews();
  }, [slug]);

  return null;
};
