import { Box } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import * as THREE from "three"

interface OwnProps {
  keyPoints: Array<Array<Number>>
  id: string
  width: number
  height: number
}
export const FacePose: React.FC<OwnProps> = (props) => {
  const initQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(40, 0, 20),
    new THREE.Vector3(0, 20, 5)
  )

  const [q, setQ] = useState(initQuaternion)

  const facePose = (props: OwnProps) => {
    const keyPoints = props.keyPoints
    const canvasId = props.id
    const width = props.width
    const height = props.height

    const ax1 = keyPoints[101] as Array<number>
    const ax2 = keyPoints[352] as Array<number>
    const ay1 = keyPoints[338] as Array<number>
    const ay2 = keyPoints[428] as Array<number>

    const x1 = new THREE.Vector3().fromArray(ax1)
    const x2 = new THREE.Vector3().fromArray(ax2)
    const y1 = new THREE.Vector3().fromArray(ay1)
    const y2 = new THREE.Vector3().fromArray(ay2)

    const xAxis = x2.sub(x1).normalize()
    const yAxis = y2.sub(y1).normalize()
    const zAxis = new THREE.Vector3().crossVectors(xAxis, yAxis)

    const mat = new THREE.Matrix4()
      .makeBasis(xAxis, yAxis, zAxis)
      .premultiply(new THREE.Matrix4().makeRotationZ(Math.PI))

    const quaternion = new THREE.Quaternion().setFromRotationMatrix(
      mat
    ) as THREE.Quaternion

    setQ(quaternion)
    console.log(q)

    /////////////////////////////// createbox //////////////////////////////

    // サイズを指定
    // const width = 640
    // const height = 480
    const boxLen = Math.min(width, height)
    // レンダラを作成
    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.getElementById(canvasId) as HTMLCanvasElement,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    // シーンを作成
    const scene = new THREE.Scene()
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height)
    camera.position.set(0, 0, -1000)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    // 箱を作成
    const geometry = new THREE.BoxGeometry(boxLen, boxLen, boxLen)
    const material = new THREE.MeshNormalMaterial()
    const box = new THREE.Mesh(geometry, material)

    scene.add(box)
    box.rotation.setFromQuaternion(quaternion)
    // console.log(quaternion);
    renderer.render(scene, camera)
  }

  useEffect(() => {
    console.log(initQuaternion)
  }, [])

  useEffect(() => {
    if (props.keyPoints.length > 0) {
      facePose(props)
    }
  }, [props])

  return (
    <Box>
      <canvas id={props.id} width={props.width} height={props.height}></canvas>
    </Box>
  )
}
