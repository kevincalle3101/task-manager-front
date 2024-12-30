export interface ITask {
    _id         : string;
    title      : string;
    state      : boolean;
    description: string;
    createdAt  : string;
    updatedAt  : string;
}

export interface ITaskToEdit {
    id          : string;
    title       : string;
    description?: string;
}

export interface ITaskCreateFormField {
    title       : string;
    description?: string | undefined;
}

export interface ITaskEditFormField {
    title?      : string;
    description?: string | undefined;
    state?      : boolean;
}

export interface ITaskFormField {
    title: string;
    description?: string | undefined;
}

