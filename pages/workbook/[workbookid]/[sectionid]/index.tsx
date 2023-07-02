import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { splitUrl } from "../../../../scripts/common/url";
import { getAllQuestion } from "../../../../scripts/workbook/section/section";
import shuffle from "just-shuffle";

export default function WorkbookSectionTest() {
  const router = useRouter();
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);

  // 変数
  const [qItems, setQItems] = useState([]);

  useEffect(() => {
    const url = location.pathname;
    setSectionId(splitUrl(url, 3));
    const readyQuestions = async () => {
      const data = await getAllQuestion(sectionId);
      setQItems(shuffle(data));
    };
  }, []);

  return <>{qItems}</>;
}
