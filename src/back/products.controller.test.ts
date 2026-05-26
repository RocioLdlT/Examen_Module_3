import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { ProductsController } from './products.controller';
import type { Request, Response, NextFunction } from 'express';

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
        // Instancia controller mockeado abajo
        controller = new ProductsController(mockRepo);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
    describe('When we instantiatte it', () => {
        test('then it should be defined', () => {
            expect(controller).toBeDefined();
        });
        test('Then it should be an instance of ProductsController', () => {
            expect(controller).toBeInstanceOf(ProductsController);
        });
    });
});
// GetAll
describe('When method getAll is called', () => {
    describe('And repo returns valid data', () => {
        test('Then it should call json with a list of products', async () => {
            // Arrange
            const mockProducts = [{ id: '1', name: 'Product 1' }];

            mockRepo.read = vi.fn().mockResolvedValueOnce(mockProducts);

            // Act
            await controller.getAll(req, res, next);

            // Assert

            expect(mockRepo.read).toHaveBeenCalled();
    
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    results: mockProducts,
                    error: '',
                }),
            );
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('And repo throws an Error', () => {
        test('Then it should call next with the error', async () => {
            // Arrange

            mockRepo.read = vi
                .fn()
                .mockRejectedValueOnce(new Error('Failed to fetch products'));

            // Act
            await controller.getAll(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({} as Error),
            );
        });
    });
});
// GetById
describe('When method getById is called', () => {
    describe('And repo returns valid data', () => {
        test('Then it should call json with a single product', async () => {
            // Arrange
            const mockProduct = { id: '1', name: 'Product 1' };

            req.params = { id: '1' };
            mockRepo.readById = vi.fn().mockResolvedValueOnce(mockProduct);

            // Act
            await controller.getById(req, res, next);

            // Assert

            expect(mockRepo.readById).toHaveBeenCalledWith('1');
          
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    results: [mockProduct],
                    error: '',
                }),
            );
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('And repo throws an Error', () => {
        test('Then it should call next with the error', async () => {
            // Arrange
            req.params = { id: '999' };
            mockRepo.readById = vi
                .fn()
                .mockRejectedValueOnce(new Error('Product not found'));

            // Act
            await controller.getById(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({} as Error),
            );
        });
    });
});

// Create

 describe('When method create is called', () => {
        describe('And repo returns valid data', () => {
            test('Then it should call status 201 and json with the new product', async () => {
                // Arrange
                const mockProduct = { id: '2', name: 'New Product' };
                req.body = { name: 'New Product' };
                mockRepo.create = vi.fn().mockResolvedValueOnce(mockProduct);

                // Act
                await controller.create(req, res, next);

                // Assert
                
                expect(mockRepo.create).toHaveBeenCalledWith(req.body);
                // create es el único método que devuelve status 201 (recurso creado)
                expect(res.status).toHaveBeenCalledWith(201);
                expect(res.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        results: [mockProduct],
                        error: '',
                    }),
                );
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throws an Error', () => {
            test('Then it should call next with the error', async () => {
                // Arrange
                req.body = { name: 'New Product' };
                mockRepo.create = vi
                    .fn()
                    .mockRejectedValueOnce(
                        new Error('Failed to create product'),
                    );

                // Act
                await controller.create(req, res, next);

                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });