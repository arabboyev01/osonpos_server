import { Injectable, BadRequestException } from '@nestjs/common';
import { TenantService } from '../tenant.service';

function serializeBigInt(value: any): any {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  if (Array.isArray(value)) {
    return value.map(serializeBigInt);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, serializeBigInt(v)]),
    );
  }
  return value;
}

@Injectable()
export class QueryService {
  constructor(private tenantService: TenantService) { }

  async executeQuery(dbName: string, sql: string) {
    const normalized = sql.trim().toLowerCase();

    if (!normalized.startsWith('select')) {
      throw new BadRequestException('Only SELECT statements are allowed.');
    }

    // Use word-boundary regex so "is_deleted" doesn't falsely match "delete",
    // "executor" doesn't match "exec", etc.
    const blockedKeywords = [
      'insert',
      'update',
      'delete',
      'drop',
      'truncate',
      'alter',
      'create',
      'grant',
      'revoke',
      'exec',
      'execute',
      'pg_',
      'information_schema',
    ];

    for (const keyword of blockedKeywords) {
      const pattern = new RegExp(`\\b${keyword.replace('_', '_')}\\b`, 'i');
      if (pattern.test(normalized)) {
        throw new BadRequestException(
          `Blocked keyword detected: "${keyword}". Only simple SELECT queries are allowed.`,
        );
      }
    }

    const client = await this.tenantService.getClient(dbName);

    try {
      const result = await client.$queryRawUnsafe(sql);
      return serializeBigInt(result);
    } catch (error) {
      throw new BadRequestException(`Query failed: ${error.message}`);
    }
  }
}
