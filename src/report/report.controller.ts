import { ReportService } from './report.service';
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from "@nestjs/common";


import { ReportTypes } from './report';
import { CreateReportDto, UpdateReportDto, ReportResponsDto } from '../dtos/report.dto';


@Controller('report/:type')
export class ReportController {

    constructor(private readonly reportService:ReportService){}

    @Get()
    getAllReports(
      @Param("type", new ParseEnumPipe(ReportTypes)) type:string,
    ) :ReportResponsDto[] {
  
      const reportType = type === "income" ? ReportTypes.INCOME : ReportTypes.EXPENSE;
      return this.reportService.getAllReports(reportType);
    }
  
    @Get("/:id")
    getReportById(
      @Param("type", new ParseEnumPipe(ReportTypes)) type:string,
      @Param("id", ParseUUIDPipe) id:string,
    ) :ReportResponsDto {
  
      const reportType = type === "income" ? ReportTypes.INCOME : ReportTypes.EXPENSE;
      return this.reportService.getReportById(reportType, id);
    }
  
    @Post()
    createReport(
      @Param("type", new ParseEnumPipe(ReportTypes)) type:string,
      @Body() body:CreateReportDto
    ) :ReportResponsDto {
      
      const reportType = type === "income" ? ReportTypes.INCOME : ReportTypes.EXPENSE;
      return this.reportService.createReport(reportType, body);
    }
  
    @Put("/:id")
    updateReport(
      @Param("type", new ParseEnumPipe(ReportTypes)) type:string,
      @Param("id", ParseUUIDPipe) id:string,
      @Body() body:UpdateReportDto
    ) :ReportResponsDto {
  
      const reportType = type === "income" ? ReportTypes.INCOME : ReportTypes.EXPENSE;
      return this.reportService.updateReport(reportType, body, id);
    }
  
    @Delete("/:id")
    @HttpCode(204)
    deleteReport(
      @Param("id", ParseUUIDPipe) id:string,
    ) :void {
  
      return this.reportService.deleteReport(id);
  
    }

}
