export type HumanizeResult = {
    value: number;
    unit: string;
    string: string;
};

export type RowFunctionArgs<T = any, C = any> = {
    obj: T;
    columns: any[];
    customData?: C;
};

export type K8sResourceCondition = {
    type: string;
    status: keyof typeof K8sResourceConditionStatus;
    lastTransitionTime?: string;
    reason?: string;
    message?: string;
};

export enum K8sResourceConditionStatus {
    True = 'True',
    False = 'False',
    Unknown = 'Unknown',
}
