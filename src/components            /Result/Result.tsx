import { CheckCircleOutline } from '@mui/icons-material';
import { CardContent, Typography } from '@mui/material';
import { FC } from 'react';
import { CustomPaper } from '../CustomPaper';
import styles from './Result.module.scss';

interface IResultProps {
  title: string;
  subTitle: string;
}

export const Result: FC<IResultProps> = ({ title, subTitle }) => {
  return (
    <CustomPaper className={styles.customPaper}>
      <CheckCircleOutline className={styles.icon} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">
          {subTitle}
        </Typography>
      </CardContent>
    </CustomPaper>
  );
};
