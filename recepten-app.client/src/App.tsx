import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box>
        <ColorModeSwitcher />
    </Box>
  </ChakraProvider>
)
