import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Box, Icon, ScrollView, useColorModeValue, VStack } from 'native-base'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'
import LinkButton from '../components/link-button'

const AboutScreen = () => {
  return (
    <AnimatedColorBox flex={1} bg={useColorModeValue('warmGray.50', 'warmGray.900')}>
      <Masthead title="About this app" resizeMode="contain" image={require('../assets/avatar.png')}><Navbar /></Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <LinkButton
              colorScheme="gray"
              size="lg"
              borderRadius="full"
              href="github.com/florisboom"
              leftIcon={
                <Icon as={Feather} name="github" size="sm" />
              }
            >
              Github
            </LinkButton>
          </Box>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
