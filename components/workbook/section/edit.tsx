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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function SectionEditTable({ sectionid }: { sectionid: string }) {
  // 設定可能変数
  const [tableViewSize, setTableViewSize] = useState<"sm" | "md" | "lg">("md");

  const [qItems, setQItems] = useState([
    { question: "", answer: "", explanation: "" },
  ]);
  useEffect(() => {
    const lastdata = qItems[qItems.length - 1];
    if (lastdata.question || lastdata.answer || lastdata.explanation) {
      setQItems([...qItems, { question: "", answer: "", explanation: "" }]);
    }
  }, [qItems]);
  return (
    <>
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
                question={x.question}
                answer={x.answer}
                explanation={x.explanation}
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
  question,
  answer,
  explanation,
}: {
  question: string;
  answer: string;
  explanation: string;
}) {
  return (
    <Tr>
      <Td>
        <Input value={question} />
      </Td>
      <Td>
        <Input value={answer} />
      </Td>
      <Td>
        <Input value={explanation} />
      </Td>
    </Tr>
  );
}
