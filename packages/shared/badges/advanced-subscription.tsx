import * as React from 'react';
import InfoCircleIcon from '@patternfly/react-icons/dist/js/icons/info-circle-icon';
import { useTranslation } from 'react-i18next';
import { Label, Tooltip } from '@patternfly/react-core';
import './Badge.scss';

export const AdvancedSubscription: React.FC<AdvancedSubscriptionProps> = ({ prefix }) => {
  const { t } = useTranslation('plugin__odf-console');
  return (
    <>
      {prefix}{' '}
      <Tooltip
        content={t(
          'This is an Advanced subscription feature. It requires Advanced Edition subscription. Please contact the account team for more information.',
        )}
      >
        <Label
          icon={<InfoCircleIcon />}
          color="purple"
          variant="filled"
          className="odf-advanced-subscription"
        >
          {t('Advanced Subscription')}
        </Label>
      </Tooltip>
    </>
  );
};

type AdvancedSubscriptionProps = {
  prefix?: string;
};
