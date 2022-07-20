import {shallow} from "enzyme";

import {HeaderContainer} from "./StyledComponents";
import Logo from "../../atom/Logo";
import Busqueda from "../../atom/Busqueda";
import HeaderMenu from "../../molecule/HeaderMenu";

let wrapperShallow;

describe("Header Test", () => {
    it("Renderiza header", () => {
        wrapperShallow = shallow(
            <HeaderContainer/>
        );
    });
    it("Renderiza Logo", () => {
        wrapperShallow.containsMatchingElement(<Logo />);
    });
    it("Renderiza Busqueda", () => {
        wrapperShallow.containsMatchingElement(<Busqueda />);
    })
    it("Renderiza Header Menu", () => {
        wrapperShallow.containsMatchingElement(<HeaderMenu />);
    })
});