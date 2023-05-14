import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../components/Layout";

interface TodoInterface {
  title: string;
  description: string;
  done: boolean;
}

export default function TodoPage() {
  const [tododata, setTododata] = useState<TodoInterface[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout titleprop="Todo">
      <p>Todoリスト</p>
      <AddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      {tododata.map((x) => (
        <CheckComponent checked={x.done} title={x.title} />
      ))}
    </Layout>
  );
}

const CheckComponent = ({
  checked,
  title,
}: {
  checked: boolean;
  title: string;
}) => (
  <>
    <Checkbox checked={checked}>{title}</Checkbox>
  </>
);

function AddModal({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
}) {
  return (
    <>
      <Button onClick={onOpen}>タスクを追加する</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>あ</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
