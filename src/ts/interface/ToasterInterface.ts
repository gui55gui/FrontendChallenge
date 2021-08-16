export interface IToaster {
    pop: (popObj: popObj) => void;
}

export const enum EToasterType {
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error"
}

interface popObj {
    type: EToasterType;
    body: string;
    title?: string;
    timeout?: number;
}