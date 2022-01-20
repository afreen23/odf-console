import * as React from 'react';
import {  referenceForGroupVersionKind, referenceForModel } from '@odf/shared/utils';
import { useK8sModel, Action } from '@openshift-console/dynamic-plugin-sdk';
import { K8sResourceKind } from 'packages/shared/types';
import { useHistory } from 'react-router';
import { ApplicationModel, ApplyDRPolicyAction } from './apply-dr-policy-action';

  

export const useDRActionProvider: UseDRActionProvider = (resource) => {
  const [group, version] = resource?.apiVersion?.split('/');
  console.log("ODF resource", resource);
  const [kindObj, inFlight] = useK8sModel(referenceForGroupVersionKind(group)(version)(resource.kind));
  const history = useHistory();

  const actions = React.useMemo(
    () => [
      ...(referenceForModel(kindObj) === referenceForModel(ApplicationModel)
        ? [ApplyDRPolicyAction(kindObj, resource, history)]
        : []),
    ],
    [history, kindObj, resource],
  );

  return React.useMemo(() => [actions, !inFlight, undefined], [actions, inFlight]);
};

type UseDRActionProvider = (
    resource: K8sResourceKind
) => [Action[], boolean, Error];