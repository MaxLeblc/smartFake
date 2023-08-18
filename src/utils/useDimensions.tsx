import { useEffect, useRef } from "react"

export default function useDimensions(ref: { current: { offsetWigth: number; offsetHeight: number } }) {
    const dimensions = useRef({ width: 0, height: 0 })

    useEffect(() => {
        dimensions.current.width = ref.current.offsetWigth
        dimensions.current.height = ref.current.offsetHeight
    })

    return dimensions.current
}
