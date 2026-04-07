import { QueryService } from '../services/query.service';
import { RawQueryDto } from '../dto/query.dto';
export declare class QueryController {
    private readonly queryService;
    constructor(queryService: QueryService);
    execute(req: any, dto: RawQueryDto): Promise<any>;
}
