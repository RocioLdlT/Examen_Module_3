import { createHeader } from './header';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

 
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
            expect(title).toHaveTextContent('Productos')
        });
 
        test('Then the logo is in the document', () => {
            //Act
            const logo = screen.getByAltText(/logo de la empresa/i);
            //Assert
            expect(logo).toBeInTheDocument();
            expect(logo).toHaveAttribute('src', 'favicon.png')
        });
 
    test('Then the "Add" button is in the document', async () => {
        //Act
    const btnElement = screen.getByRole('button');
    await userEvent.click(btnElement);
     //Assert
    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveAttribute('aria-controls', "add")
    expect(btnElement).toHaveAttribute('aria-expanded', "false")

    
});
    });
});