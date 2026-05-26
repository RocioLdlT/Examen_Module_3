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
        // Instancia controller mockeado abajo
        controller = new ProductsController(mockRepo);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
    describe('When we instantiatte it', () => {
        test('then it should be defined', () => {
            expect(controller).toBeDefined()
        });
        test('Then it should be an instance of ProductsController', () => {
            expect(controller).toBeInstanceOf(ProductsController);
        });
    });
    });
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
                // objectContaining verifica que el objeto contiene AL MENOS estas propiedades
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
                    .mockRejectedValueOnce(
                        new Error('Failed to fetch products'),
                    );

                // Act
                await controller.getAll(req, res, next);

                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
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
