import {IsOptional, IsNotEmpty, IsString, IsPositive, IsNumber} from "class-validator";
import {Exclude, Expose} from "class-transformer"

import { ReportTypes } from "src/report/report";



export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsString()
    @IsNotEmpty()
    source:string;
}



export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source:string;
}


export class ReportResponsDto {
    id:string;
    source:string;
    amount:number;
    type:ReportTypes;

    @Expose({name:"createdAt"})
    transformCreatedAt(){
        return this.created_at;
    }

    @Exclude()
    created_at:Date;
    
    @Exclude()
    updated_at:Date;

    constructor(partial: Partial<ReportResponsDto>){
        Object.assign(this, partial);
    }
}