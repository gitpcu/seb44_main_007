import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { targetExpend } from '../account_reducer';
import Modal from 'react-modal';

const TargetAmountModal = () => {

  //목표 지출 금액 리듀서
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputTarget, setInputTarget] = useState(0);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTarget = () => {
    dispatch(targetExpend(inputTarget));
    closeModal();
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    const numerValue = number.replace(/\D/g, '');
    setInputTarget(parseInt(numerValue));
  };

  return (
    <div>
      <button onClick={openModal}>설정</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Number Modal"
      >
        <h2>Enter a Number</h2>
        <input
          type="text"
          value={inputTarget}
          onChange={handleNumberChange}
        />
        <button onClick={handleTarget}>저장</button>
      </Modal>
    </div>
  );
}

export default TargetAmountModal;