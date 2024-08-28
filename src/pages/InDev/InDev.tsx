import { useTranslation } from "react-i18next";
import { Result } from "../../components            ";

export const InDev = () => {
  const { t } = useTranslation();
  return (
    <Result
      title={t('inDev.title')}
      subTitle={t('inDev.subTitle')}
    />
  );
};