import NextLink from "next/link";
import { Badge, Box, Text } from "@chakra-ui/react";

export function DashboardCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Box maxW="sm" overflow="hidden" as={NextLink} href={url}>
      <Box p="4" borderColor="gray.200" borderWidth="1px" borderRadius="lg">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>
        <Box>{description}</Box>
      </Box>
    </Box>
  );
}
