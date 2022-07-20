import {shallow} from "enzyme";
import {Button} from "./index";
import userEvent from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";

/*
https://testing-library.com/docs/queries/about/#example
https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/exists.html
https://www.ordermygear.com/greenfield/testing-ui-components-part-1-atoms-molecules/
https://assist-software.net/blog/how-write-tests-using-jest-and-enzyme-react-js-testing-utilities-used-facebook-and-airbnb
https://dev.to/duxtech/workspace-recomendado-para-testing-en-react-17-jest-enzyme-4ih9
https://www.toptal.com/react/tdd-react-unit-testing-enzyme-jest
https://syntaxfix.com/question/1282/simulate-a-button-click-in-jest
 */

const BtnSettings = {
    text: "Text",
    click: jest.fn(),
    width: 50
}

describe("The components are rendered", () => {
    it("renders Button component without crashing", () => {
        const wrapper = shallow(<Button/>);
    });
    it("renders Button component and click it", async () => {
        render(<Button onClick={BtnSettings.click}/>);
        await userEvent.click(screen.getByText('Default'))
        expect(BtnSettings.click).toHaveBeenCalledTimes(1)
    });
    it("renders Button component and check the text", async () => {
        const wrapper = shallow(<Button children={BtnSettings.text}/>);
        expect(wrapper.text()).toEqual(BtnSettings.text)
    });
    it("renders Button component and check the width", async () => {
        const wrapper = shallow(<Button width={BtnSettings.width}/>);
        expect(wrapper.props().width).toBe(BtnSettings.width);
    });
});

// describe("<SearchButton />", () => {
//     test("it should render button with other name", async () => {
//         render(<SearchButton name="Here it is" />)
//         const input = screen.getByText('Here it is');
//     });
// });