import NextLink from "next/link";
import { Badge, Box, Text } from "@chakra-ui/react";

export function SectionCard({
  title,
  subtitle,
  id,
  url,
  own,
  subject,
  editmode,
  workbookid,
}: {
  title: string;
  subtitle: string;
  id: string;
  url: string;
  own: boolean;
  subject: number;
  editmode: boolean;
  workbookid: number;
}) {
  const urlargs = editmode ? "edit" : "edit";
  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      as={NextLink}
      href={`/workbook/${workbookid}/${id}/${urlargs}`}
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {own ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              Own
            </Badge>
          ) : null}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          ml="2"
        >
          #{id}
        </Box>

        <Box>{subtitle}</Box>
      </Box>
    </Box>
  );
}
