
import * as React from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleResize)
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  return isMobile
}
