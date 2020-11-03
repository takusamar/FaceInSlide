import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@material-ui/core"

interface OwnProps {
  sources: Source[]
  open: boolean
  onSelect(id: string): void
  onClose(): void
}
export type Source = {
  id: string
  url: string
  name: string
}
export const SelectWindowDialog: React.FC<OwnProps> = (props) => {
  const { open } = props
  return (
    <div>
      <Dialog
        open={open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"画面選択"}</DialogTitle>
        <DialogContent>
          {props.sources &&
            props.sources.map((source, index) => {
              return (
                <Box key={index}>
                  <Button
                    onClick={() => {
                      props.onSelect(source.id)
                    }}
                  >
                    {source.name}
                  </Button>
                </Box>
              )
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
