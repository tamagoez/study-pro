import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function WorkbookCreate() {
  const [workbookName, setWorkbookName] = useState("");
  const [workbookSubtitle, setWorkbookSubtitle] = useState("");
  return (
    <>
      <Text>ワークブックを作成</Text>
      <Text>ワークブック名</Text>
      <Input></Input>
      <Text>サブタイトル</Text>
      <Input></Input>
      <Button>作成する</Button>
    </>
  );
}
