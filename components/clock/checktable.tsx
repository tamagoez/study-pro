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
                time={x.time}
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
  time,
  date,
}: {
  checked: boolean;
  name: string;
  time: string;
  date: number;
}) {
  return (
    <Tr>
      <td>
        <Checkbox checked={checked} />
      </td>
      <td>{name}</td>
      <td>{time}</td>
      <td>{date}</td>
    </Tr>
  );
}
