export const getImageFromCanvas = async (id: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const canvas = document.getElementById(id) as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext("2d")
      image.onload = () => resolve(image)
      image.onerror = (e) => reject(e)
      image.src = ctx!.canvas.toDataURL()
    }
  })
}

export const drawVideoToCanvas = (
  videoId: string,
  canvasId: string,
  width: number,
  height: number
) => {
  const video = document.getElementById(videoId) as HTMLVideoElement
  if (!video) {
    return
  }
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement
  if (!canvas) {
    return
  }
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    return
  }
  ctx.drawImage(video, 0, 0)
}

export const copyCanvasToCanvas = async (
  inputId: string,
  outputId: string,
  ratio: number
) => {
  const inputImage = (await getImageFromCanvas(inputId)) as HTMLImageElement
  if (!inputImage) {
    return
  }
  const output = document.getElementById(outputId) as HTMLCanvasElement
  if (!output) {
    return
  }
  const ctx = output.getContext("2d")
  if (!ctx) {
    return
  }
  ctx.save()
  ctx.scale(ratio, ratio)
  ctx?.drawImage(inputImage, 0, 0)
  ctx?.restore()
}
