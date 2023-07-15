import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getIncompleteAndTodayTasks } from "../../scripts/clock";

export function IndexClockTable() {
  const [taskItems, setTaskItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIncompleteAndTodayTasks();
      setTaskItems(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>タスク</Th>
              <Th>予定時間</Th>
              <Th>予定日</Th>
            </Tr>
          </Thead>
          <Tbody>
            {taskItems.map((x) => (
              <ClockTaskContainer
                key={x.id}
                checked={x.checked}
                name={x.name}
                taketime={x.taketime}
                date={x.date}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

function ClockTaskContainer({
  checked,
  name,
  taketime,
  date,
}: {
  checked: boolean;
  name: string;
  taketime: string;
  date: number;
}) {
  const datestring = date.toString();
  return (
    <Tr>
      <td>
        <Checkbox checked={checked} />
      </td>
      <td>{name}</td>
      <td>{taketime}分</td>
      <td>
        {datestring.substring(0, 4)}/{datestring.substring(4, 6)}/
        {datestring.substring(6, 8)}
      </td>
    </Tr>
  );
}
