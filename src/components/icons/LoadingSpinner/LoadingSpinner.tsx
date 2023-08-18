import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const LoadingSpinner = () => {
  const { t } = useTranslation()

  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="mr-2"
      />
      <span className="mx-2">{t('Loading')}...</span>
    </>
  );
};
