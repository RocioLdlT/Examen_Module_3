import { vi } from 'vitest';
import { ProductsController } from './products.controller';
import { Request, Response, NextFunction } from 'express';

const mockRepo = {
    read: vi.fn().mockResolvedValue([]),
    readById: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue([]),
};

//Variables par que puedan acceder

let controller: ProductsController;
let req: Request;
let res: Response;
let next: NextFunction;

describe('Given an instantiated ProductsController', () => {
    beforeEach(() => {
        req = {} as Request;
        res = {
            status: vi.fn().mockReturnValue(res),
            json: vi.fn(),
        } as unknown as Response;

        next = vi.fn() as NextFunction;
        // Instancia controller mockeado
        controller = new ProductsController(mockRepo);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
    describe('', () => {
        test('', () => {});
    });
    describe('', () => {
        test('', () => {});
    });
    describe('', () => {
        test('', () => {});
    });
    describe('', () => {
        test('', () => {});
    });
    describe('', () => {
        test('', () => {});
    });
});
