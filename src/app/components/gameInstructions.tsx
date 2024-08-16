"use client";

import React from 'react';

import { FaRegQuestionCircle  } from "react-icons/fa";

import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";

import { Button } from "@nextui-org/button";
import { FaCircleQuestion } from 'react-icons/fa6';

const Instructions: React.FC = () => {
  const instructions = useDisclosure();

  return (
    <div>
      <Button isIconOnly className='bg-transparent my-4 text-xl' onClick={instructions.onOpen}><FaRegQuestionCircle /></Button>
      {/* Instructions Modal */}
      <Modal 
          isDismissable={false} 
          isKeyboardDismissDisabled={true}  
          backdrop="opaque" 
          isOpen={instructions.isOpen}
          onOpenChange={instructions.onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className="flex flex-col text-3xl font-bold text-left mt-8 mx-6">
                  How To Play
                  <span className="text-xl text-left font-semibold text-gray-600 mt-3">Guess 8 secret words in 20 hints.</span>
                </ModalHeader>
                <ModalBody className='font-xl flex flex-col text-left mx-6 mb-6'>
                  <ul className='list-disc mx-4 mb-4'>
                    <li>All words follow a theme.</li>
                    <li>Incorrect guesses reveal additional hints.</li>
                    <li>Skip a word if you are stuck.</li>
                  </ul>
                  <hr/>
                  New puzzles daily. Good luck!
                </ModalBody>
              </div>
            )}
          </ModalContent>
        </Modal>
    </div>
  );
};

export default Instructions;
