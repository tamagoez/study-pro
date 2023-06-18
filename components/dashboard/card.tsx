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
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      as={NextLink}
      href={url}
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

        <Box>{description}</Box>
      </Box>
    </Box>
  );
}
