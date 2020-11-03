import React from "react"
import { Box } from "@material-ui/core"
import { theme } from "../../theme"
import { SlideArea } from "../organisms/SlideArea"
import { FaceArea } from "../organisms/FaceArea"

export const MainPage: React.FC = () => {
  console.log("MainPage")
  return (
    <Box display="flex" bgcolor={theme.palette.background.default}>
      <Box border={1} width={1200} height={900}>
        <SlideArea />
      </Box>
      <Box width={400}>
        <Box border={1} height={300}>
          <FaceArea />
        </Box>
        <Box border={1} height={600}>
          Memo
        </Box>
      </Box>
    </Box>
  )
}
