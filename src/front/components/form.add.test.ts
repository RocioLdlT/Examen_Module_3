import { createFormAdd } from "./form.add";

describe('Given createFormAdd function', () => {

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('When createFormAdd is called ', () => {
        //Arrange
        beforeEach(() => {
            createFormAdd();
        });

        test('Then the form is in the document', () => {
            //Act
            //Assert
           
        });

        test('Then the form can be filled and submitted', () => {
            //Act
            //Assert

        });
    });
});
