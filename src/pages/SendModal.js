import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';

const SendModal = (props) => {
  const {
    buttonLabel,
    className,
    handleSend,
    handleMessage
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
      setModal(!modal);
  }

  const onSend = () =>{
      handleSend();
      toggle();
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Message</ModalHeader>
        <ModalBody>
          <Input type="textarea" placeholder="Enter Message" onChange={handleMessage}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSend}>Send</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SendModal;