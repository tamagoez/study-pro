import NextLink from "next/link";
import { Badge, Box, Text } from "@chakra-ui/react";

export function PageCard({
  title,
  subtitle,
  id,
  url,
  own,
  subject,
  editmode,
  workbookid,
  sectionid,
}: {
  title: string;
  subtitle: string;
  id: string;
  url: string;
  own: boolean;
  subject: number;
  editmode: boolean;
  workbookid: number;
  sectionid: number;
}) {
  const urlargs = editmode ? "edit" : "";
  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      as={NextLink}
      href={`/workbook/${workbookid}/${sectionid}/${id}/${urlargs}`}
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
