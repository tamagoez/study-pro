import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import {
  getQuestionFromSectionId,
  upsertQuestionFromSectionId,
} from "../../../scripts/workbook/section/section";

export function SectionEditTable({
  sectionid,
}: {
  sectionid: number | undefined;
}) {
  if (sectionid === undefined) return;
  // 設定可能変数
  const [tableViewSize, setTableViewSize] = useState<
    "sm" | "md" | "lg" | string
  >("md");
  const [lastid, setLastid] = useState(1);

  // 内部的設定可能変数
  const [loading, setLoading] = useState(false);

  // 簡略化用定数
  const dataInputed = (data) =>
    data.question || data.answer || data.explanation;

  const [qItems, setQItems] = useState([]);
  useEffect(() => {
    let matchfilter = false;
    if (qItems.length == 0) {
      matchfilter = true;
    } else {
      const lastdata = qItems[qItems.length - 1];
      if (dataInputed(lastdata)) {
        matchfilter = true;
      }
    }
    if (matchfilter) {
      setLastid(lastid + 1);
      setQItems([
        ...qItems,
        { internalid: lastid, question: "", answer: "", explanation: "" },
      ]);
    }
  }, [qItems]);

  const handleChange = (event, id, key) => {
    const updatedData = qItems.map((item) => {
      if (item.internalid === id) {
        return { ...item, [key]: event.target.value };
      }
      return item;
    });
    setQItems(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getQuestionFromSectionId(sectionid, 50, 1);
      setQItems(data);
      setLastid(data[data.length - 1].internalid + 1);
      setLoading(false);
      console.log(qItems);
    };
    fetchData();
  }, []);
  return (
    <>
      <Select
        size="sm"
        placeholder="表示サイズ"
        icon={<BsChevronDown />}
        onChange={(event) => setTableViewSize(event.target.value)}
      >
        <option value="sm">小</option>
        <option value="md">中</option>
        <option value="lg">大</option>
      </Select>
      <TableContainer>
        <Table size={tableViewSize} variant="simple">
          <Thead>
            <Tr>
              <Th>質問</Th>
              <Th>解答</Th>
              <Th>解説</Th>
            </Tr>
          </Thead>
          <Tbody>
            {qItems.map((x) => (
              <QuestionItem
                id={x.internalid}
                question={x.question}
                answer={x.answer}
                explanation={x.explanation}
                handleChange={(event, id, key) => handleChange(event, id, key)}
                key={x.internalid}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>質問</Th>
              <Th>解答</Th>
              <Th>解説</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Button
        colorScheme="teal"
        onClick={() => upsertQuestionFromSectionId(sectionid, qItems)}
      >
        保存する
      </Button>
    </>
  );
}

function QuestionItem({
  id,
  question,
  answer,
  explanation,
  handleChange,
}: {
  id: number;
  question: string;
  answer: string;
  explanation: string;
  handleChange: any;
}) {
  return (
    <Tr>
      <Td>
        <Input
          type="text"
          value={question}
          onChange={(event) => handleChange(event, id, "question")}
          width="100%"
          height="auto"
          variant="flushed"
        />
      </Td>
      <Td>
        <Input
          type="text"
          value={answer}
          onChange={(event) => handleChange(event, id, "answer")}
          width="100%"
          height="auto"
          variant="flushed"
        />
      </Td>
      <Td>
        <Input
          type="text"
          value={explanation}
          onChange={(event) => handleChange(event, id, "explanation")}
          width="100%"
          height="auto"
          variant="flushed"
        />
      </Td>
    </Tr>
  );
}
