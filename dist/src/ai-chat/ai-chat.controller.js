"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiChatController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ai_chat_service_1 = require("./ai-chat.service");
const express = __importStar(require("express"));
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AiChatController = class AiChatController {
    aiChatService;
    constructor(aiChatService) {
        this.aiChatService = aiChatService;
    }
    async createSession(req, body) {
        return this.aiChatService.createSession(req.user.dbName, body.name);
    }
    async getSessions(req) {
        return this.aiChatService.getSessions(req.user.dbName);
    }
    async getHistory(req, sessionId) {
        return this.aiChatService.getHistory(req.user.dbName, sessionId);
    }
    async updateSession(req, id, body) {
        return this.aiChatService.updateSession(req.user.dbName, id, body.name);
    }
    async deleteSession(req, id) {
        return this.aiChatService.deleteSession(req.user.dbName, id);
    }
    async updateHistory(req, id, body) {
        return this.aiChatService.updateHistory(req.user.dbName, id, body.message);
    }
    async deleteHistory(req, id) {
        return this.aiChatService.deleteHistory(req.user.dbName, id);
    }
    async sendMessage(req, body, res) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        try {
            const stream = this.aiChatService.generateStreamResponse(req.user.dbName, body.session_id, body.message);
            for await (const chunk of stream) {
                res.write(chunk);
            }
            res.end();
        }
        catch (error) {
            console.error('Chat error:', error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
};
exports.AiChatController = AiChatController;
__decorate([
    (0, common_1.Post)('session'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)('sessions'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Get)('history/:session_id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('session_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Patch)('session/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "updateSession", null);
__decorate([
    (0, common_1.Delete)('session/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.Patch)('history/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "updateHistory", null);
__decorate([
    (0, common_1.Delete)('history/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "deleteHistory", null);
__decorate([
    (0, common_1.Post)('message'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AiChatController.prototype, "sendMessage", null);
exports.AiChatController = AiChatController = __decorate([
    (0, common_1.Controller)('ai-chat'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ai_chat_service_1.AiChatService])
], AiChatController);
//# sourceMappingURL=ai-chat.controller.js.map