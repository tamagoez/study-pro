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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export function SectionEditTable({ sectionid }: { sectionid: string }) {
  // 設定可能変数
  const [tableViewSize, setTableViewSize] = useState<
    "sm" | "md" | "lg" | string
  >("md");
  const [lastid, setLastid] = useState(1);

  const [qItems, setQItems] = useState([
    { id: 0, question: "", answer: "", explanation: "" },
  ]);
  useEffect(() => {
    const lastdata = qItems[qItems.length - 1];
    if (lastdata.question || lastdata.answer || lastdata.explanation) {
      setLastid(lastid + 1);
      setQItems([
        ...qItems,
        { id: lastid, question: "", answer: "", explanation: "" },
      ]);
    }
  }, [qItems]);

  const handleChange = (event, id, key) => {
    const updatedData = qItems.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: event.target.value };
      }
      return item;
    });
    setQItems(updatedData);
  };
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
                id={x.id}
                question={x.question}
                answer={x.answer}
                explanation={x.explanation}
                handleChange={(event, id, key) => handleChange(event, id, key)}
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
          width="auto"
          height="auto"
          variant="unstyled"
        />
      </Td>
      <Td>
        <Input
          type="text"
          value={answer}
          onChange={(event) => handleChange(event, id, "answer")}
          width="auto"
          height="auto"
          variant="unstyled"
        />
      </Td>
      <Td>
        <Input
          type="text"
          value={explanation}
          onChange={(event) => handleChange(event, id, "explanation")}
          width="auto"
          height="auto"
          variant="unstyled"
        />
      </Td>
    </Tr>
  );
}
