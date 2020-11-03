import React from "react"
import { SelectWindow } from "./SelectWindow"

export const SlideArea: React.FC = () => {
  const slideAreaId = "slideArea"
  const onSelected = () => {}
  return (
    <SelectWindow
      id={slideAreaId}
      width={1200}
      height={900}
      onSelected={onSelected}
    />
  )
}
