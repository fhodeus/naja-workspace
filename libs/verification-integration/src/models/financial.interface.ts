export interface Financial {
    id: string;

    month: string;

    startTime: string;

    endTime: string;
    status:string;
}

export interface FinancialResponse extends Financial {
    newPetsCount: number;
    consultationsCount: number;
}
