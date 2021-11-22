import React from 'react'
import { ImageResizeMode, ImageSourcePropType } from 'react-native'
import { Box, VStack, Heading, Image } from 'native-base'

interface Props {
  title: string
  image: ImageSourcePropType
  resizeMode: ImageResizeMode
  children: React.ReactNode
}

const Masthead = ({ title, image, resizeMode, children }: Props) => {
  return (
    <VStack height="300px" pb={5}>
      <Image
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        w="full"
        height="300px"
        resizeMode={resizeMode}
        source={image}
        alt="masthead image"
      />
      {children}
      <Box flex={1} />
      <Heading color="white" p={6} size="xl">
        {title}
      </Heading>
    </VStack>
  )
}

export default Masthead
