import { Link } from 'react-router-dom';
import { Routes } from '../../enums/routerEnums';
import styles from './Header.module.scss';
import { Button, Select, MenuItem, SelectChangeEvent, Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomBreadcrumbs } from '../CustomBreadcrumbs';

export const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <div>
      <header className={styles.header}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6} className={styles.navLinks}>
            <Link to={Routes.Home}>{t('navigation.home')}</Link>
            <Link to={Routes.Favorites}>{t('navigation.favorites')}</Link>
          </Grid>
          <Grid item xs={12} sm={6} className={styles.rightSection}>
            <Select
              value={i18n.language}
              onChange={changeLanguage}
              className={styles.languageSelect}
              variant="outlined"
              size="small"
              sx={{ minWidth: 50 }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="ru">RU</MenuItem>
            </Select>
            <Button
              className={styles.logoutButton}
              variant="contained"
              sx={{ minWidth: 120 }}
              color="primary"
              // onClick={logOut}
              disabled
            >
              {t('navigation.logout')}
            </Button>
          </Grid>
        </Grid>
      </header>
      <Divider />
      <>
        <CustomBreadcrumbs />
      </>
    </div>
  );
};
