import * as React from 'react';
import { K8sResourceKind } from '@odf/shared/types';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from '@patternfly/react-core';


export const ApplyDRPolicyModal: React.FC<DisasterRecoveryModalProps>= ({application}) =>  {
    const { t } = useTranslation('plugin__odf-console');
    const [isModalOpen, setIsModalOpen]= React.useState(false);

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    return (
        <Modal
          aria-label={t("Apply DR policy")}
          title={t("Apply DR policy")}
          isOpen={isModalOpen}
          onClose={handleModalToggle}
          description={t('Please select a DR policy you wish to apply to {{appName}}', {
            appName: application?.metadata?.name,
          })}
          actions={[
            <Button key="confirm" variant="primary" onClick={handleModalToggle}>
              {t('Confirm')}
            </Button>,
            <Button key="cancel" variant="link" onClick={handleModalToggle}>
              {t('Cancel')}
            </Button>
          ]}
        >
        </Modal>
    );
};

type DisasterRecoveryModalProps = {
    application?: K8sResourceKind;
}