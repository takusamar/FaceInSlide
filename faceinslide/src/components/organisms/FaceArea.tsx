import { Box } from "@material-ui/core"
import React from "react"
import { FaceMesh } from "./FaceMesh"
import { SelectWindow } from "./SelectWindow"

export const FaceArea: React.FC = () => {
  const faceAreaId = "faceArea"
  const windowSize = {
    width: 400,
    height: 300,
  }

  return (
    <Box>
      <SelectWindow
        id={faceAreaId}
        width={windowSize.width}
        height={windowSize.height}
        onSelected={() => {}}
      />
      <FaceMesh videoId={faceAreaId} windowSize={windowSize} />
    </Box>
  )
}
