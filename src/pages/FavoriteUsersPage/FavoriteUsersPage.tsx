import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, getUsers, RootState, updateUser } from "../../store";
import { Box, CircularProgress, Grid } from "@mui/material";
import { CustomCard, CustomPaper, Result } from "../../components            ";
import { Status, Users } from "../../types";
import { useTranslation } from "react-i18next";

export const FavoriteUsersPage = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { data: users, status } = useSelector((state: RootState) => state.users);

  const handleDeleteFavoriteUser = (user: Users) => {
    dispatch(updateUser({
      ...user,
      id: user.id,
      isFavorite: false,
    }));
    dispatch(getUsers());
  };

  if (status === Status.LOADING) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const favoriteUsers = users.filter(user => user.isFavorite === true);

  return (
    <div>
      {favoriteUsers.length === 0 ? (
        <Result
          title={t('noFavoriteData')}
          subTitle={t('noFavoriteDataSubtitle')}
        />
      ) : (
        <CustomPaper>
          <Grid container spacing={4}>
            {favoriteUsers.map((favorite) => (
              <Grid item key={favorite.id} xs={12} sm={6} md={4} lg={3}>
                <CustomCard
                  user={favorite}
                  onClick={() => handleDeleteFavoriteUser(favorite)}
                  showFavoriteIcon={false}
                />
              </Grid>
            ))}
          </Grid>
        </CustomPaper>
      )}
    </div>
  )
};