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
    const sId = splitUrl(url, 3);
    setSectionId(sId);
    const readyQuestions = async () => {
      const data = await getAllQuestion(sId);
      setQItems(shuffle(data));
    };
    readyQuestions();
  }, []);

  return <>{qItems}</>;
}
