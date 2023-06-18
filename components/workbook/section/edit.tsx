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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function SectionEditTable({ sectionid }: { sectionid: string }) {
  const [qItems, setQItems] = useState([]);
  useEffect(() => {
    return;
  }, []);
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
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
              <Td>{x.question}</Td>
              <Td>{x.answer}</Td>
              <Td>{x.explanation}</Td>
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
