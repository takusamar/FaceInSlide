import React, { useState } from "react"
import { Button, Box, Typography } from "@material-ui/core"
import { SelectWindowDialog, Source } from "./SelectWindowDialog"

interface OwnProps {
  id: string
  width: number
  height: number
  onSelected(isSelected: boolean): void
}

export const SelectWindow: React.FC<OwnProps> = (props) => {
  const [sources, setSources] = useState<Source[]>([])
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isSourceSelected, setIsSourceSelected] = useState(false)

  const handleOnClick = () => {
    setIsOpenDialog(true)
    const electron = window.require("electron")
    const desktopCapturer = electron.desktopCapturer
    desktopCapturer
      .getSources({ types: ["window"] })
      .then(async (sources: any) => {
        // console.log(sources)
        const s: Source[] = sources.map((source: any) => {
          // source.thumbnail.image
          return {
            id: source.id,
            url: source.thumbnail.toDataURL(),
            name: source.name,
          }
        })
        setSources(s)
      })
  }

  const handleOnSelect = async (id: string) => {
    const videoConstraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: id,
          minWidth: props.width,
          maxWidth: props.width,
          minHeight: props.height,
          maxHeight: props.height,
        },
      },
    } as MediaStreamConstraints
    const stream = await navigator.mediaDevices.getUserMedia(videoConstraints)
    const video = document.getElementById(props.id) as HTMLVideoElement
    if (video) {
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    }
    setIsSourceSelected(true)
    props.onSelected(true)
  }
  const handleOnCloseVideo = () => {
    const video = document.getElementById(props.id) as HTMLVideoElement
    if (video) {
      video.srcObject = null
      video.onloadedmetadata = null
    }
    setIsSourceSelected(false)
    props.onSelected(false)
  }

  return (
    <Box>
      <video id={props.id} autoPlay />
      <Box pt={2}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {!isSourceSelected && (
            <Button variant="outlined" onClick={handleOnClick}>
              <Typography style={{ fontSize: 10 }}>画面選択</Typography>
            </Button>
          )}
          {isSourceSelected && (
            <Button variant="outlined" onClick={handleOnCloseVideo}>
              <Typography style={{ fontSize: 10 }}>選択解除</Typography>
            </Button>
          )}
        </Box>
      </Box>
      <SelectWindowDialog
        sources={sources}
        open={isOpenDialog}
        onSelect={(id) => {
          handleOnSelect(id)
          setIsOpenDialog(false)
        }}
        onClose={() => setIsOpenDialog(false)}
      />
    </Box>
  )
}
