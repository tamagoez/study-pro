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
import {
  changeCLockTaskStatus,
  getIncompleteAndTodayTasks,
} from "../../scripts/clock";

export function IndexClockTable() {
  const [taskItems, setTaskItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIncompleteAndTodayTasks();
      setTaskItems(data);
    };
    fetchData();
  }, []);

  const handleChange = (id, key, data) => {
    const updatedData = taskItems.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: data };
      }
      return item;
    });
    setTaskItems(updatedData);
  };
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
                id={x.id}
                handleChange={(event, id, key) => handleChange(event, id, key)}
                status={x.status}
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
  handleChange,
  id,
  status,
  name,
  taketime,
  date,
}: {
  handleChange: any;
  id: number | string;
  status: boolean;
  name: string;
  taketime: string;
  date: number;
}) {
  const datestring = date.toString();
  async function changeTaskStatus(status: boolean) {
    const returndata = await changeCLockTaskStatus(id, status);
    if (returndata) handleChange(id, "status", status);
  }
  return (
    <Tr>
      <td>
        <Checkbox
          checked={status}
          onClick={(e) => {
            changeTaskStatus(e.target.checked);
          }}
        />
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
