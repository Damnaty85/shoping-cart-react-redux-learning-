import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {createPortal} from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components'

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const ModalBackDrop = styled.div`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: -1;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled.div`
    border: 2px solid #000;
    padding: 16px 32px 24px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.20), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    position: relative;
`;

const CloseModal = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const Modal = forwardRef((props, ref) => {
        const [display, setDisplay] = useState(false);

        useImperativeHandle(ref, () => {
            return {
                displayingModal: () => setDisplayModal()
            }
        });

        const setDisplayModal = () => {
            setDisplay(!display);
        };

        if (display) {
            return createPortal(
                <ModalWrapper>
                    <ModalBackDrop onClick={setDisplayModal}/>
                    <ModalContent>
                        <CloseModal onClick={setDisplayModal}>
                            <CloseIcon/>
                        </CloseModal>
                        {props.children}
                    </ModalContent>
                </ModalWrapper>, document.getElementById('portal')
            )
        }

        return null;
    }
);

export default Modal;