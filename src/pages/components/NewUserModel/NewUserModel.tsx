import { Dialog, FormControl, InputLabel, MenuItem, Select, Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { CustomPaper } from "../../../components            /CustomPaper";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, createUser } from "../../../store";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Users } from "../../../types";
import { FC } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from './NewUserModel.module.scss';
import { COUNTRY_OPTIONS } from "../../../enums";

interface ICustomModelProps {
  open: boolean;
  onClose: () => void;
}

export const NewUserModel: FC<ICustomModelProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, reset } = useForm<Users>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      userImage: '',
    },
  });

  const onSubmit: SubmitHandler<Users> = async (data) => {
    try {
      await dispatch(createUser(data)).unwrap();
      reset({
        firstName: '',
        lastName: '',
        country: '',
        userImage: '',
      });
      onClose();
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <CustomPaper className={styles.modelContainer}>
        <Box className={styles.customPaperBox}>
          <Typography variant="h4">{t('newUser.title')}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: t('newUser.firstNameRequired') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={t('newUser.firstName')}
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: t('newUser.lastNameRequired') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={t('newUser.lastName')}
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{ required: t('newUser.countryRequired') }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth variant="outlined" error={!!error}>
                    <InputLabel>{t('newUser.country')}</InputLabel>
                    <Select {...field} label={t('newUser.country')}>
                      {COUNTRY_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {t(`country.${option.value}`)}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <Typography variant="caption" color="error">{error.message}</Typography>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="userImage"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label={t('newUser.imageURL')} variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ height: "50px" }} color="primary" type="submit" fullWidth>
                {t('newUser.submit')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CustomPaper>
    </Dialog>
  );
};
