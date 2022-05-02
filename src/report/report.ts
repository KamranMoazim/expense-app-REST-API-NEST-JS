export enum ReportTypes {
    INCOME = "income",
    EXPENSE = "expense"
}


export interface Report {
    id:string;
    source:string;
    amount:number;
    created_at:Date;
    updated_at:Date;
    type:ReportTypes.EXPENSE | ReportTypes.INCOME
}

export interface ReportCreate {
    source:string;
    amount:number;
}


export interface ReportUpdate {
    source?:string;  // means it is optional
    amount?:number;  // means it is optional
}

interface Data {
    report:Report[]
}

export const data:Data = {
    report:[]
};