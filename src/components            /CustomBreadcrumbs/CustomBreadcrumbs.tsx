import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon } from '@mui/icons-material';

export const CustomBreadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label={t('breadcrumb.label')} sx={{ padding: '10px 0 20px' }}>
      <Link component={RouterLink} sx={{ display: 'flex', color: 'rgba(75, 70, 224, 1)', alignItems: 'center', cursor: 'pointer', textDecoration: 'none', fontSize: '0.875rem' }} to="/">
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {t('breadcrumb.home')}
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography sx={{ fontSize: '0.875rem' }} color="textPrimary" key={to}>
            {t(`breadcrumb.${value}`, value.charAt(0).toUpperCase() + value.slice(1))}
          </Typography>
        ) : (
          <Link sx={{ fontSize: '0.875rem' }} component={RouterLink} to={to} key={to}>
            {t(`breadcrumb.${value}`, value.charAt(0).toUpperCase() + value.slice(1))}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
