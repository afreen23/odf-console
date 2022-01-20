import * as React from 'react';
import { K8sResourceKind } from '@odf/shared/types';
// import { useK8sWatchResource, K8sResourceCommon, useResolvedExtensions, ActionProvider, isActionProvider, Action } from '@openshift-console/dynamic-plugin-sdk';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from '@patternfly/react-core';


export const ApplyDRPolicyModal: React.FC<DisasterRecoveryModalProps>= ({application = {}}) =>  {
    const { t } = useTranslation('plugin__odf-console');
    const [isModalOpen, setIsModalOpen]= React.useState(true);

  //   const [applications = []] = useK8sWatchResource<K8sResourceCommon[]>({
  //     groupVersionKind: {
  //         group: 'app.k8s.io',
  //         version: 'v1beta1',
  //         kind: 'Application',
  //     },
  //     isList: true,
  //     name: 'applications',
  // });

  // const [extensions] = useResolvedExtensions<ActionProvider>(isActionProvider);
  // const acmExtension = extensions.find(e => e.properties.contextId === 'odf-application-actions');
  // const [extensionAction] = acmExtension?.properties?.provider(applications) as Action[];


  // console.log("APPLICATIONS", extensionAction);

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
    application: K8sResourceKind;
}


