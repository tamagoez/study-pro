import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function ProgressCircle(percentage: number) {
  return <CircularProgressbar value={percentage} text={`${percentage}%`} />;
}
