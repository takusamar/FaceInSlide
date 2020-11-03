import React, { useEffect, useState } from "react"
import { copyCanvasToCanvas, drawVideoToCanvas } from "../atoms/CanvasUtil"
import { Box } from "@material-ui/core"
import * as facemesh from "@tensorflow-models/facemesh"
import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-backend-wasm"
import * as bodyPix from "@tensorflow-models/body-pix"
import { PersonInferenceConfig } from "@tensorflow-models/body-pix/dist/body_pix_model"
import { Vector2D } from "@tensorflow-models/body-pix/dist/types"
import { FacePose } from "./FacePose"

interface OwnProps {
  videoId: string
  windowSize: { width: number; height: number }
}

export const FaceMesh: React.FC<OwnProps> = (props) => {
  const [keyPoints, setKeyPoints] = useState<Array<Array<Number>>>([])

  const { videoId, windowSize } = props

  const inputId = "faceCanvas"
  const outputId = "outputFaceMesh"
  const cubeCanvasId = "cubeCanvas"
  const outputRatio = 1.0

  const drawOutputFaces = async (
    input: HTMLCanvasElement,
    faces: facemesh.AnnotatedPrediction[]
  ) => {
    const ctx = input.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#0f0"
      faces.forEach((face) => {
        const array = face.scaledMesh as []
        array.forEach((xy) => {
          ctx.beginPath()
          ctx.fillStyle = "#0f0"
          ctx.arc(xy[0], xy[1], 1, 0, 1 * Math.PI)
          ctx.fill()
        })
        setKeyPoints(array)
      })
    }
  }

  const drawOutputBodies = async (
    input: HTMLCanvasElement,
    bodies: bodyPix.SemanticPersonSegmentation
  ) => {
    const ctx = input.getContext("2d")
    if (ctx) {
      let leftShoulder = { x: 0, y: 0 }
      let leftElbow = { x: 0, y: 0 }
      let leftWrist = { x: 0, y: 0 }

      let rightShoulder = { x: 0, y: 0 }
      let rightElbow = { x: 0, y: 0 }
      let rightWrist = { x: 0, y: 0 }

      bodies.allPoses.forEach((pose) => {
        const keyPoints = pose.keypoints
        keyPoints.forEach((xy) => {
          if (xy.score > 0.5) {
            if (xy.part === "leftShoulder") leftShoulder = xy.position
            if (xy.part === "leftElbow") leftElbow = xy.position
            if (xy.part === "leftWrist") leftWrist = xy.position

            if (xy.part === "rightShoulder") rightShoulder = xy.position
            if (xy.part === "rightElbow") rightElbow = xy.position
            if (xy.part === "rightWrist") rightWrist = xy.position

            ctx.beginPath()
            ctx.fillStyle = "#f00"
            ctx.arc(xy.position.x, xy.position.y, 1, 0, 1 * Math.PI)
            ctx.fill()
          }
        })
      })
      drawBodyLine(ctx, leftShoulder, rightShoulder)
      drawBodyLine(ctx, leftShoulder, leftElbow)
      drawBodyLine(ctx, leftElbow, leftWrist)
      drawBodyLine(ctx, rightShoulder, rightElbow)
      drawBodyLine(ctx, rightElbow, rightWrist)
    }
  }

  const drawBodyLine = (
    ctx: CanvasRenderingContext2D,
    begin: Vector2D,
    end: Vector2D
  ) => {
    if (begin.x !== 0 && end.x !== 0) {
      ctx!.lineWidth = 2
      ctx!.strokeStyle = "#f00"
      ctx?.beginPath()
      ctx?.moveTo(begin.x, begin.y)
      ctx?.lineTo(end.x, end.y)
      ctx?.stroke()
    }
  }

  const main = async () => {
    console.log("facemesh main is called")
    tf.setBackend("webgl")
    console.log(tf.getBackend)

    // Load the MediaPipe facemesh model assets.
    const model = await facemesh.load()
    const modelBody = await bodyPix.load()

    const bodyPixOption = {
      flipHorizontal: false,
      internalResolution: "medium",
      segmentationThreshold: 0.7,
      maxDetections: 4,
      scoreThreshold: 0.5,
      nmsRadius: 20,
      minKeypointScore: 0.3,
      refineSteps: 10,
    } as PersonInferenceConfig

    setInterval(async () => {
      drawVideoToCanvas(videoId, inputId, windowSize.width, windowSize.height)

      const input = document.getElementById(inputId) as HTMLCanvasElement
      if (!input) {
        return
      }
      const faces = await model.estimateFaces(input)
      const bodies = await modelBody.segmentPerson(input, bodyPixOption)

      // Facemesh & BodyPix 検出状況を描画
      await drawOutputFaces(input, faces)
      await drawOutputBodies(input, bodies)
      await copyCanvasToCanvas(inputId, outputId, outputRatio)
    }, 1000 / 30)
  }

  useEffect(() => {
    if (windowSize.width > 0 && windowSize.height > 0) {
      main()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize])
  return (
    <Box>
      <canvas
        id={inputId}
        width={windowSize.width}
        height={windowSize.height}
        hidden
      ></canvas>
      <canvas
        id={outputId}
        width={windowSize.width * outputRatio}
        height={windowSize.height * outputRatio}
      ></canvas>
      <FacePose
        keyPoints={keyPoints}
        id={cubeCanvasId}
        width={windowSize.width * outputRatio}
        height={windowSize.height * outputRatio}
      />
    </Box>
  )
}
