import {shallow} from "enzyme";
import Logo from "./index";
import {BrowserRouter} from "react-router-dom";

describe("Testing Atom CardCategorias", () => {
    it("Renders the component", () => {
        let wrapper = shallow(
            <BrowserRouter>
                <Logo/>
            </BrowserRouter>);
    });
});