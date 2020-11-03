import { Box } from "@material-ui/core"
import React from "react"
import { SelectWindow } from "./SelectWindow"

export const FaceArea: React.FC = () => {
  const faceAreaId = "faceArea"

  return (
    <Box>
      <SelectWindow
        id={faceAreaId}
        width={400}
        height={300}
        onSelected={() => {}}
      />
    </Box>
  )
}
