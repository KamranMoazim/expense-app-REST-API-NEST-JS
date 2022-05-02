import { Injectable } from '@nestjs/common';
import {v4 as uuid} from "uuid"

import { ReportResponsDto } from '../dtos/report.dto';
import { data, Report, ReportTypes, ReportCreate, ReportUpdate } from './report';


@Injectable()
export class ReportService {

    getAllReports(reportType:ReportTypes) :ReportResponsDto[] {
        return data.report
                    .filter((report)=>report.type===reportType)
                    .map((report)=>new ReportResponsDto(report));
    }

    getReportById(reportType:ReportTypes, id:string) :ReportResponsDto {

        const report = data.report
                    .filter((report)=>report.type===reportType)
                    .find((report)=>report.id===id);

        if(!report)return;

        return new ReportResponsDto(report)
    }

    createReport(reportType:ReportTypes, body:ReportCreate) :ReportResponsDto {
        
        const newReport:Report = {
            id:uuid(),
            ...body,
            created_at:new Date(),
            updated_at:new Date(),
            type:reportType
        };
        data.report.push(newReport);
        
        return new ReportResponsDto(newReport);
    }

    updateReport(reportType:ReportTypes, body:ReportUpdate, id:string) :ReportResponsDto {

        const updateReport = data.report
                    .filter((report)=>report.type===reportType)
                    .find((report)=>report.id===id);

        if (!updateReport) return;

        const updateReportIndex = data.report.findIndex((report)=>report.id===id);
        
        data.report[updateReportIndex] = {
            ...data.report[updateReportIndex],
            ...body,
            updated_at:new Date()
        }

        return new ReportResponsDto(data.report[updateReportIndex])
    }

    deleteReport(id:string) :void {

        const deleteReportIndex = data.report.findIndex((report)=>report.id===id);

        if(deleteReportIndex == -1) return;

        data.report.splice(deleteReportIndex, 1);

    }

}
