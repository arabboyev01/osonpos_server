import { MeasurementService } from '../services/measurement.service';
import { CreateMeasurementDto, UpdateMeasurementDto } from '../dto/measurement.dto';
export declare class MeasurementController {
    private readonly measurementService;
    constructor(measurementService: MeasurementService);
    createMeasurement(req: any, dto: CreateMeasurementDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    findAllMeasurements(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }[]>;
    updateMeasurement(req: any, id: string, dto: UpdateMeasurementDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    removeMeasurement(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
}
