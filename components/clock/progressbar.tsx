"use client";

import Progress from "react-circle-progress-bar";

export default function Progress() {
  return (
    <Progress
      progress={75}
      gradient={[
        { stop: 0.0, color: "#00bc9b" },
        { stop: 1, color: "#5eaefd" },
      ]}
      hideBall={true}
    />
  );
}
