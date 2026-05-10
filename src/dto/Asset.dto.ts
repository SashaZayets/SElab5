import { IsString, IsNumber, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsOptional()
  website: string;
}

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}

export class CreateBondDto {
  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsNumber()
  @Min(1)
  investmentTerm: number;

  @IsNumber()
  @Min(0)
  annualProfitPercent: number;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}