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
  Button,
  Textarea,
  IconButton,
  Switch,
  FormControl,
  FormLabel,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import {
  deleteQuestionFromId,
  getQuestionFromPageId,
  upsertQuestionFromPageId,
} from "../../../../scripts/workbook/section/page/page";
import { toastSuccess } from "../../../toast/toast";
import { MdDeleteOutline } from "react-icons/md";
import ResizeTextarea from "react-textarea-autosize";

export function PageEditTable({ pageid }: { pageid: number | undefined }) {
  if (pageid === undefined) return;
  // 設定可能変数
  const [tableViewSize, setTableViewSize] = useState<
    "sm" | "md" | "lg" | string
  >("md");
  const [lastid, setLastid] = useState(1);
  const [autosave, setAutosave] = useState(true);

  // 内部的設定可能変数
  const [loading, setLoading] = useState(false);
  const [skipAutosave, setSkipAutosave] = useState(true);
  const [autosaveStatus, setAutosaveStatus] = useState(false);

  // 簡略化用定数
  const dataInputed = (data) =>
    data.question || data.answer || data.explanation;

  const [qItems, setQItems] = useState([]);
  useEffect(() => {
    let matchfilter = false;
    if (qItems.length == 0) {
      matchfilter = true;
    } else {
      const lastdata = qItems[qItems.length - 1];
      if (dataInputed(lastdata)) {
        matchfilter = true;
      }
    }
    if (matchfilter) {
      setLastid(lastid + 1);
      setQItems([
        ...qItems,
        { internalid: lastid, question: "", answer: "", explanation: "" },
      ]);
    }
    if (!autosaveStatus && autosave && !skipAutosave) {
      setAutosaveStatus(true);
      const timer = setTimeout(() => {
        console.log("[NOTIFY] AutoSave");
        saveTable(true);
        setAutosaveStatus(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
    setSkipAutosave(false);
  }, [qItems]);

  const handleChange = (event, id, key) => {
    const updatedData = qItems.map((item) => {
      if (item.internalid === id) {
        return { ...item, [key]: event.target.value };
      }
      return item;
    });
    setQItems(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getQuestionFromPageId(pageid, 500, 1);
      setQItems(data);
      setLastid(data[data.length - 1].internalid + 1);
      setLoading(false);
      console.log(qItems);
      setSkipAutosave(false);
    };
    fetchData();
  }, []);

  async function saveTable(auto: boolean) {
    const newdata = await upsertQuestionFromPageId(pageid, qItems);
    setSkipAutosave(true);
    setQItems(newdata);
    toastSuccess(auto ? "自動保存されました" : "保存されました");
  }

  function deleteItem(internalid: number) {
    const foundObjects = qItems.filter((obj) => obj.internalid === internalid);
    const filteredArray = qItems.filter((obj) => obj.internalid !== internalid);
    setQItems(filteredArray);
    if (foundObjects[0].id) {
      deleteQuestionFromId(foundObjects[0].id);
    }
    toastSuccess("削除しました");
  }

  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="edit-mode" mb="0">
          自動保存
        </FormLabel>
        <Switch
          id="autosave"
          checked={autosave}
          onChange={(e) => setAutosave(e.target.checked)}
        />
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
      </FormControl>
      <TableContainer>
        <Table size={tableViewSize} variant="simple">
          <Thead>
            <Tr>
              <Th>質問 (改行可)</Th>
              <Th>解答</Th>
              <Th>解説 (改行可)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {qItems.map((x) => (
              <QuestionItem
                id={x.id}
                internalid={x.internalid}
                question={x.question}
                answer={x.answer}
                explanation={x.explanation}
                handleChange={(event, id, key) => handleChange(event, id, key)}
                handleDelete={(internalid) => {
                  deleteItem(internalid);
                }}
                key={x.internalid}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>質問 (改行可)</Th>
              <Th>解答</Th>
              <Th>解説 (改行可)</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Button colorScheme="teal" onClick={() => saveTable(false)}>
        保存する
      </Button>
    </>
  );
}

function QuestionItem({
  id,
  internalid,
  question,
  answer,
  explanation,
  handleChange,
  handleDelete,
}: {
  id: number | null;
  internalid: number;
  question: string;
  answer: string;
  explanation: string;
  handleChange: any;
  handleDelete: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <Tr>
        <Td>
          <Textarea
            value={question}
            onChange={(event) => handleChange(event, internalid, "question")}
            width="100%"
            variant="flushed"
            resize="none"
            minRows={1}
            minH="unset"
            overflow="hidden"
            as={ResizeTextarea}
          />
        </Td>
        <Td>
          <Input
            type="text"
            value={answer}
            onChange={(event) => handleChange(event, internalid, "answer")}
            width="100%"
            height="auto"
            variant="flushed"
          />
        </Td>
        <Td>
          <Textarea
            value={explanation}
            onChange={(event) => handleChange(event, internalid, "explanation")}
            width="100%"
            variant="flushed"
            resize="none"
            minRows={1}
            minH="unset"
            overflow="hidden"
            as={ResizeTextarea}
          />
        </Td>
        <Td>
          <IconButton
            aria-label="Delete this line"
            variant="ghost"
            icon={<MdDeleteOutline />}
            onClick={onOpen}
          />
        </Td>
      </Tr>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              問題の削除
            </AlertDialogHeader>

            <AlertDialogBody>
              この操作は取り消せません。
              <br />
              問題: {question}
              <br />
              解答: {answer}
              <br />
              解説: {explanation}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  handleDelete(internalid);
                }}
                ml={3}
              >
                削除する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
