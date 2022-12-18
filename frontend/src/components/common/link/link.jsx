import * as React from 'react';
import { NavLink as AppLink } from 'react-router-dom';
import styles from './link.module.scss';

const Link = ({ children, to }) => (
    <AppLink to={to} className={({ isActive }) => isActive ? styles.active : styles.link}>
        {children}
    </AppLink>
);

export default Link;
