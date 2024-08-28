import { Paper } from '@mui/material';
import { FC, ReactNode } from 'react';
import styles from './CustomPaper.module.scss';

interface ICustomPaperProps {
  children: ReactNode;
  className?: string;
}

export const CustomPaper: FC<ICustomPaperProps> = ({ children, className }) => {
  return (
    <Paper elevation={23} className={`${styles.customPaper} ${className || ''}`}>
      {children}
    </Paper>
  );
};
