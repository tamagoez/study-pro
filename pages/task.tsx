import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import {
  Button,
  Checkbox,
  LinkBox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { selectTask } from "../scripts/app/task";
import { TodoInterface } from "../interfaces/todo";

export default function TodoPage() {
  const [tododata, setTododata] = useState<TodoInterface[]>([]);

  async function fetchTasks() {
    const data = await selectTask();
    setTododata([...data]);
  }
  useEffect(() => {
    fetchTasks();
  }, []);
  function setDone(value: boolean, index: number) {
    const newArray = [...tododata]; // 新しい配列を作成
    newArray[index].done = value; // 指定した要素の値を変更
    setTododata(newArray);
  }

  // モーダル関連のやつ
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 以下コンポーネント
  return (
    <Layout titleprop="Todo">
      <TaskAddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <div>
        <LinkBox
          as="article"
          maxW="sm"
          p="1"
          borderWidth="1px"
          rounded="md"
          onClick={onOpen}
          style={{ cursor: "pointer" }}
        >
          タスクを追加する
        </LinkBox>
      </div>
      <div>
        {tododata.map((x, index) => (
          <TodoComponent
            title={x.title}
            description={x.description}
            done={x.done}
            setDone={(value: boolean) => setDone(value, index)}
          />
        ))}
      </div>
    </Layout>
  );
}

function TodoComponent({
  title,
  description,
  done,
  setDone,
}: {
  title: string;
  description: string;
  done: boolean;
  setDone: any;
}) {
  return (
    <Stack>
      <Checkbox isChecked={done} onChange={(e) => setDone(e.target.checked)}>
        {title}
        <Text fontSize="md">{description}</Text>
      </Checkbox>
    </Stack>
  );
}

function TaskAddModal({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクを追加する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>色々</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              追加
            </Button>
            <Button variant="ghost">キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
