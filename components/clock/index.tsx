import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Input,
  Button,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { addClockTask } from "../../scripts/clock";

export function AddModal({}: {}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState<string | undefined>("");
  const [taketime, setTaketime] = useState<number | undefined>();
  const [date, setDate] = useState<string | undefined>("");

  const initState = () => {
    setName(undefined);
    setTaketime(undefined);
    setDate(undefined);
  };
  const handleAdd = async () => {
    const returndata = await addClockTask(name, taketime, date);
    if (Object.keys(returndata).length === 0) { {
      initState();
      onClose();
    }
  };
  return (
    <>
      <IconButton
        aria-label="タスクを追加する"
        onClick={() => {
          initState();
          onOpen();
        }}
        icon={<MdFormatListBulletedAdd />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規タスクの追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>タスク名</FormLabel>
              <Input
                type="text"
                variant="flushed"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>予定時間</FormLabel>
              <Input
                type="number"
                variant="flushed"
                onChange={(e) => setTaketime(Number(e.target.value))}
                value={taketime}
              />
            </FormControl>
            <FormControl>
              <FormLabel>予定実行日</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                variant="flushed"
                type="datetime-local"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleAdd();
              }}
            >
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
