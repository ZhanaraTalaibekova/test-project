import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useMemo, useState } from "react";
import { getUsers, updateUser } from "../../store";
import { Box, Button, CircularProgress, Grid, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { NewUserModel } from '../components/NewUserModel';
import { Status, Users } from "../../types";
import { Search } from "@mui/icons-material";
import { CustomPaper, CustomCard, Result } from "../../components            ";
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users } = useSelector((state: RootState) => state.users);

  useMemo(() => {
    dispatch(getUsers());
  }, [dispatch]);


  const handleAddFavoriteUsers = (user: Users) => {
    dispatch(updateUser({
      ...user,
      id: user.id,
      isFavorite: true,
    }));
    dispatch(getUsers());
  };
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (status === Status.LOADING) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleOpenModel = () => setOpen(true);
  const handleCloseModel = () => setOpen(false);

  return (
    <div className='container'>
      <Box mt={-3} className={styles.createBtnContainer} mb={3}>
        <Button className={styles.createBtn} onClick={handleOpenModel} variant="contained">{t('create')}</Button>
      </Box>
      {users.length === 0 ? (
        <Result
          title={t('noUsers')}
          subTitle={t('noUsersSubtitle')}
        />
      ) : (
        <CustomPaper>
          <Box sx={{ display: 'flex', justifyContent: 'start', mb: 6 }}>
            <Grid width={{ xs: '100%', md: '30%' }} >
              <TextField
                type="search"
                label={t('search')}
                variant="outlined"
                fullWidth
                placeholder={t('searchUser')}
                value={searchTerm}
                sx={{ height: '40px' }}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Box>
          <Grid container spacing={4}>
            {filteredUsers.map((user) => {
              return (
                <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                  <CustomCard
                    user={user}
                    onClick={() => handleAddFavoriteUsers(user)}
                    showFavoriteIcon={true}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CustomPaper>
      )}
      <NewUserModel open={open} onClose={handleCloseModel} />
    </div >
  );
};
