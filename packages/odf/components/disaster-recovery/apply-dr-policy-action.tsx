import {  Action } from '@openshift-console/dynamic-plugin-sdk';
import { K8sKind } from '@openshift-console/dynamic-plugin-sdk/lib/api/common-types';
import i18next from 'i18next';
import { K8sResourceKind } from 'packages/shared/types';

export const ApplicationModel: K8sKind = {
    apiVersion: 'v1beta1',
    apiGroup: 'app.k8s.io',
    kind: 'Application',
    abbr: '',
    label: 'Application',
    labelPlural: 'Applications',
    plural: 'applications'
}

export const applyDRPolicyModal = (props) =>
  import('./apply-dr-policy-modal' /* webpackChunkName: "apply-dr-policy-modal" */).then((m) =>
    m.ApplyDRPolicyModal(props),
  );

 export const ApplyDRPolicyAction = (kindObj: K8sKind, application: K8sResourceKind, history): Action => ({
    id: 'odf-application-action',
    label: i18next.t('plugin__odf-console~Apply DR policy'),
    cta: () => { history.push('/odf/edit/dr/policy')},
    insertAfter: 'edit-application',
    accessReview: {
      group: kindObj.apiGroup,
      resource: kindObj.plural,
      name: application.metadata.name,
      namespace: application.metadata.namespace,
      verb: 'update',
    },
  });
  