import { Box, SimpleGrid, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, IconButton } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Textarea value={note.content} isReadOnly p={2} h="100px" />
      <Box mt={2} textAlign="right">
        <IconButton icon={<FaEdit />} onClick={() => onEdit(note)} aria-label="Edit note" size="sm" m={1} />
        <IconButton icon={<FaTrash />} onClick={() => onDelete(note.id)} aria-label="Delete note" size="sm" m={1} />
      </Box>
    </Box>
  );
};

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const handleSave = () => {
    if (currentNote.id) {
      const updatedNotes = notes.map(note => note.id === currentNote.id ? currentNote : note);
      setNotes(updatedNotes);
    } else {
      const newNote = { ...currentNote, id: Date.now() };
      setNotes([...notes, newNote]);
    }
    onClose();
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    onOpen();
  };

  const handleNewNote = () => {
    setCurrentNote({ content: '' });
    onOpen();
  };

  return (
    <Box p={5}>
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleNewNote}>New Note</Button>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentNote?.id ? 'Edit Note' : 'New Note'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder="Type here..." value={currentNote?.content} onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;