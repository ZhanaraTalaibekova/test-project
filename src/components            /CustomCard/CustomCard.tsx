import { Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import styles from './CustomCard.module.scss';
import { FC } from 'react';
import { Users } from "../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HeartBrokenRoundedIcon from '@mui/icons-material/HeartBrokenRounded';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from "react-i18next";

interface CustomCardProps {
  user: Users;
  onClick: (id: number) => void;
  showFavoriteIcon: boolean;
}

export const CustomCard: FC<CustomCardProps> = ({ user, onClick, showFavoriteIcon }) => {
  const { t } = useTranslation();
  const { data: users } = useSelector((state: RootState) => state.users);

  const isFavorite = users.some(fav => fav.id === user.id && fav.isFavorite);

  return (
    <Card className={styles.cardContainer}>
      <CardMedia
        component="img"
        className={styles.cardMedia}
        image={typeof user.userImage === 'string' ? user.userImage : ''}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {t('newUser.country')}: {user.country}
        </Typography>
      </CardContent>
      <IconButton
        aria-label="delete"
        className={styles.deleteButton}
        onClick={() => onClick(user.id)}
      >
        {showFavoriteIcon ? (
          isFavorite ? (
            <FavoriteRoundedIcon sx={{ color: 'red' }} />
          ) : (
            <HeartBrokenRoundedIcon />
          )
        ) : (
          <DeleteIcon />
        )}
      </IconButton>
    </Card>
  );
};

export default CustomCard;

