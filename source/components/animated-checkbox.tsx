import React, { useEffect } from 'react'
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming, interpolateColor } from 'react-native-reanimated'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'
import AnimatedStroke from './animated-stroke'

const margin = 10
const vWidth = 68 + margin
const vHeight = 64 + margin

const AnimatedPath = Animated.createAnimatedComponent(Path)
const checkmarkPath = 'M12 31.9411C14.7253 32.1682 21.811 36.1653 28.3516 50.3367M28.8784 50.3367C36.2957 34.6664 55.7041 3.46199 74 4.00705'
const outlineBoxPath = 'M50 1H16C7.71573 1 1 7.71573 1 16V50C1 58.2843 7.71573 65 16 65H50C58.2843 65 65 58.2843 65 50V16C65 7.71573 58.2843 1 50 1Z'


interface Props {
  checked?: boolean
  highlightColor: string
  checkmarkColor: string
  boxOutlineColor: string
}

const AnimatedCheckbox = (props: Props) => {
  const {
    checked,
    checkmarkColor,
    highlightColor,
    boxOutlineColor
  } = props 

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear,
    })
  }, [checked])

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
        [0,1],
        [boxOutlineColor, highlightColor],
        'RGB'
      ),
      fill: interpolateColor(
        Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
        [0,1],
        ['#0000000', highlightColor],
        'RGB'
      )
  }), [highlightColor, boxOutlineColor])

  return (
    <Svg viewBox={[-margin, -margin, vWidth + margin, vHeight + margin].join(' ')}>
      <Defs>
        <ClipPath id="clipPath">
          <Path
            fill="white"
            stroke="gray"
            strokeLinejoin="round"
            strokeLinecap="round"
            d={outlineBoxPath}
          />
        </ClipPath>
      </Defs>
      <AnimatedStroke
        progress={progress}
        d={checkmarkPath}
        stroke={highlightColor}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={checked ?? false ? 1 : 0}
      />
      <AnimatedPath
        d={outlineBoxPath}
        strokeWidth={6}
        stroke="black"
        strokeLinejoin="round" 
        strokeLinecap="round" 
        animatedProps={animatedBoxProps}
      />
      <G clipPath="url(#clipPath)">
        <AnimatedStroke
          progress={progress}
          d={checkmarkPath}
          stroke={checkmarkColor}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={checked ?? false ? 1 : 0}
        />
      </G>
    </Svg>
  )
}

export default AnimatedCheckbox
