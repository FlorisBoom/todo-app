import React, { useCallback, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  Text,
  Box,
  VStack,
  useColorModeValue,
  Fab,
  Icon, 
} from 'native-base'
import ThemeToggle from '../components/theme-toggle';
import AnimatedColorBox from '../components/animated-color-box';
import TaskList from '../components/task-list';
import shortid from 'shortid';
import Masthead from '../components/masthead';
import Navbar from '../components/navbar';

const initialData = [{
  id: shortid.generate(),
  subject: 'Purchase new monitor',
  isDone: false,
}, {
  id: shortid.generate(),
  subject: 'Buy new keyboard',
  isDone: false,
}]

export default function MainScreen() {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        isDone: !item.isDone
      }
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    }) 
  }, [])
  const handleFinishEditingTaskItem = useCallback(_item => {
    setEditingItemId(null);
  }, [])
  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id);
  }, [])
  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      return prevData.filter(i => i !== item)
    })
  }, [])
  return (
    <AnimatedColorBox 
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead title="How's your day, Floris?" resizeMode="cover" image={require('../assets/masthead.png')}><Navbar/></Masthead>
      <VStack
        flex={1}
        space={1}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <TaskList 
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishedEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate();
          setData([{
            id,
            subject: 'New Task',
            isDone: false
          }, ...data])
        }}
      />
    </AnimatedColorBox>
  )
}
