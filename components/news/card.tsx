import NextLink from "next/link";
import { Badge, Box, Text } from "@chakra-ui/react";

export function NewsCard({
  title,
  created_at,
  id,
}: {
  title: string;
  created_at: string;
  id: string;
}) {
  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      as={NextLink}
      href={`/news/${id}`}
    >
      <Box p="6">
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

        <Box>{created_at}</Box>
      </Box>
    </Box>
  );
}
