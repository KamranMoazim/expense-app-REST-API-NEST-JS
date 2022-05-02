import { Injectable } from '@nestjs/common';
import { ReportTypes } from 'src/report/report';

import { ReportService } from 'src/report/report.service';


@Injectable()
export class SummaryService {

    constructor(private readonly reportService:ReportService){}

    calculateSummary():{}{

        const totalIncome:number = this.reportService.getAllReports(ReportTypes.INCOME).reduce((sum,report)=>sum + report.amount, 0);
        const totalExpense:number = this.reportService.getAllReports(ReportTypes.EXPENSE).reduce((sum,report)=>sum + report.amount, 0);

        return {
            totalIncome,
            totalExpense,
            netIncome:totalIncome-totalExpense
        }
    }
}
