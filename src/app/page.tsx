import { Box, Button, Container } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Container maxW="container.md">
      <Box w="250px" my={10}>
        <Link href="/dashboard">
          <Button variant="primary">Go to Dashboard</Button>
        </Link>
      </Box>
    </Container>
  );
}
