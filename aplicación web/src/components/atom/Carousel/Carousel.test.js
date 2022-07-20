import Carousel from "./index";
import {mount, shallow} from "enzyme";

describe("Testing Atom Carousel", () => {
    it("Renders the component", () => {
        let photos = [];
        let wrapper = shallow(<Carousel
            style={{ height: "500px" }}
            fotos={photos}/>);
    });
});