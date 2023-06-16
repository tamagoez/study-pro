import { Badge, Box, Text } from "@chakra-ui/react";
export function WorkbookCard({
  title,
  subtitle,
  ownerid,
  id,
  own,
  subject,
}: {
  title: string;
  subtitle: string;
  ownerid: string;
  id: number;
  own: boolean;
  subject: number;
}) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {own ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              Own
            </Badge>
          ) : null}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            ml="2"
          >
            Made by @{ownerid}
          </Box>
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

        <Box>{subtitle}</Box>
      </Box>
    </Box>
  );
}
