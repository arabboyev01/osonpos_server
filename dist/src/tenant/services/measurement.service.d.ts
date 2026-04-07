import { TenantService } from '../tenant.service';
import { CreateMeasurementDto, UpdateMeasurementDto } from '../dto/measurement.dto';
export declare class MeasurementService {
    private tenantService;
    constructor(tenantService: TenantService);
    createMeasurement(dbName: string, dto: CreateMeasurementDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    findAllMeasurements(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }[]>;
    findOneMeasurement(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    } | null>;
    updateMeasurement(dbName: string, id: string, dto: UpdateMeasurementDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    removeMeasurement(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
}
