import * as React from 'react';

import styles from './styles.module.scss';

const Modal = ({ isShow, children }) => {
  return <>{isShow && <div className={styles.container}>{children}</div>}</>;
};

export default Modal;
