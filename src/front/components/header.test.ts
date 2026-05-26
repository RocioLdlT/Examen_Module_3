import { createHeader } from './header';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom'


describe('Given createHeader function', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });
    describe('When createHeader is called', () => {
        //Arrange
        beforeEach(() => {
            createHeader();
        });
        test('Then the title "Productos" is in the document', () => {
            //Act
            const title = screen.getByRole('heading');
            //Assert
            expect(title).toBeInTheDocument();
        });

        test('Then the logo is in the document', () => {});
    });
    test('Then the "Add" button is in the document', () => {});
});
