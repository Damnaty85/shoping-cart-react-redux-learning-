import React, {useState, forwardRef, useImperativeHandle} from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';

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
                <div className={`modal-wrapper`}>
                    <div onClick={setDisplayModal} className={`modal-backdrop`}/>
                    <div className={`modal-box`}>
                        <div className={'modal-close'} onClick={setDisplayModal}>
                            <CloseIcon/>
                        </div>
                        {props.children}
                    </div>
                </div>, document.getElementById('portal')
            )
        }

        return null;
    }
);

export default Modal;
