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
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>質問</Th>
            <Th>解答</Th>
            <Th>解説</Th>
          </Tr>
        </Thead>
        <Tbody>
          {qItems.map((x) => (
            <Tr>
              <Input value={x.question} />
              <Input value={x.answer} />
              <Input value={x.explanation} />
            </Tr>
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
  );
}
