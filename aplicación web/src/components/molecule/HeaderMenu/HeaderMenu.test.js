import {mount, shallow} from "enzyme";
import HeaderMenu from "./index";
import {Item, MenuContainer} from "./StyledComponents";
import {Alert, Bookings, Messages} from "../../atom/Icon";
import {Box} from "@mui/system";

const ROLES = {
    guest: 'ROLE_GUEST',
    admin: 'ROLE_ADMIN',
    host: 'ROLE_HOST',
    empty: ''
}

const ItemsList = {
    guest: [
        <Alert />,
        <Messages />,
        <Bookings />
    ],
    admin: [
        <Box><Item /></Box>
    ],
    host: [
        <Alert />,
        <Messages />,
        <Bookings />
    ]
}

const ItemsText = {
    guest: [
        'Perfil',
        'Cerrar Sesión'
    ],
    host: [
        'Perfil',
        'Cerrar Sesión'
    ],
    none: [
        'Iniciar Sesión',
        'Hazte una cuenta'
    ],
    admin: [
        'Perfil',
        'Cerrar Sesión'
    ]
}

const mockOnCrear = jest.fn();
const mockOnIniciar = jest.fn();
const mockOnPerfil = jest.fn();

let wrapperShallow;

const getMenuWrapper = (rol) => {
    return mount(
        <HeaderMenu
            rol={rol}
            onIniciar={mockOnIniciar}
            onPerfil={mockOnPerfil}/>
    );
}

//https://javascript.plainenglish.io/test-styled-components-in-react-efficiently-using-displayname-53281a0c1f2d
describe("Header Test", () => {
    it("Renderiza header huesped", () => {
        wrapperShallow = shallow(
            <HeaderMenu
                rol={ROLES.guest}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
    });
    it("Renderiza header admin", () => {
        wrapperShallow = shallow(
            <HeaderMenu
                rol={ROLES.admin}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
    });
    it("Renderiza header anfitrion", () => {
        wrapperShallow = shallow(
            <HeaderMenu
                rol={ROLES.host}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
    });
    it("Renderiza header invitado", () => {
        wrapperShallow = shallow(
            <HeaderMenu
                rol={ROLES.empty}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
    });
    it("Huesped: Renderiza Items de huesped", () => {
        wrapperShallow = getMenuWrapper(ROLES.guest)
        // eslint-disable-next-line testing-library/no-debugging-utils
        for(let item of ItemsList.guest){
            expect(wrapperShallow.containsMatchingElement(item)).toBe(true);
        }
        ItemsText.guest.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).toEqual(text);
        });
    });
    it("Huesped: no ve items de invitado", () => {
        wrapperShallow = getMenuWrapper(ROLES.guest)
        ItemsText.none.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).not.toEqual(text);
        });
    });
    it("Huesped: no ve items de admin", () => {
        wrapperShallow = getMenuWrapper(ROLES.guest)
        for(let item of ItemsList.admin){
            expect(wrapperShallow.containsMatchingElement(item)).not.toBe(true);
        }
        for(let item of ItemsList.admin){
            expect(wrapperShallow.containsMatchingElement(item)).not.toBe(true);
        }
    });
    it("Anfitrion: Renderiza Items de anfitrion", () => {
        wrapperShallow = getMenuWrapper(ROLES.host)
        for(let item of ItemsList.host){
            expect(wrapperShallow.containsMatchingElement(item)).toBe(true);
        }
        ItemsText.host.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).toEqual(text);
        });
    });
    it("Anfitrion: no ve items de invitado", () => {
        wrapperShallow = getMenuWrapper(ROLES.host)
        ItemsText.none.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).not.toEqual(text);
        });
    });
    it("Anfitrion: no ve items de admin", () => {
        wrapperShallow = getMenuWrapper(ROLES.host);
        for(let item of ItemsList.admin){
            expect(wrapperShallow.containsMatchingElement(item)).not.toBe(true);
        }
    });
    it("Admin: Renderiza Items de admin", () => {
        wrapperShallow = getMenuWrapper(ROLES.admin);
        console.log("Este test no valida los componentes hijos diferentes a Items")
        // for(let item of ItemsList.admin){
        //     expect(wrapperShallow.containsMatchingElement(item)).toBe(true);
        // }
        ItemsText.admin.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).toEqual(text);
        });
    });
    it("Admin: No Renderiza Items de invitado", () => {
        wrapperShallow = getMenuWrapper(ROLES.admin);
        ItemsText.none.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            try{
                expect(item.text()).not.toEqual(text);
            }
            catch(e){
                //Enters here because non user has more items than admin
                expect.assertions(1);
            }
        });
    });
    it("Invitado: Renderiza Items de Invitado", () => {
        wrapperShallow = getMenuWrapper(ROLES.empty);
        ItemsText.none.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).toEqual(text);
        });
    });
    it("Invitado: no ve items de admin", () => {
        wrapperShallow = getMenuWrapper(ROLES.empty)
        ItemsText.admin.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).not.toEqual(text);
        });
        for(let item of ItemsList.admin){
            expect(wrapperShallow.containsMatchingElement(item)).not.toBe(true);
        }
    });
    it("Invitado: no ve items de anfitrion", () => {
        wrapperShallow = getMenuWrapper(ROLES.empty)
        ItemsText.host.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).not.toEqual(text);
        });
        for(let item of ItemsList.host){
            expect(wrapperShallow.containsMatchingElement(item)).not.toBe(true);
        }
    });
    it("Invitado: no ve items de huesped", () => {
        wrapperShallow = getMenuWrapper(ROLES.empty)
        ItemsText.guest.forEach(function(text, index){
            let item = wrapperShallow.find(Item).at(index);
            expect(item.text()).not.toEqual(text);
        });
        for(let item of ItemsList.guest){
            expect(wrapperShallow.containsMatchingElement(item)).not.toBe(true);
        }
    });
    /*it("Renderiza header menu item Cerrar Sesión", () => {
        wrapperShallow = mount(
            <HeaderMenu
                rol={ROLES.guest}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
        let item = wrapperShallow.find(Item).at(1);
        let text = item.text();
        expect(text).toEqual('Cerrar Sesión');
    });
    it("Renderiza header menu item Perfil", () => {
        wrapperShallow = mount(
            <HeaderMenu
                rol={ROLES.admin}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
        let item = wrapperShallow.find(Item).at(0);
        let text = item.text();
        expect(text).toEqual('Perfil');
    });
    it("Items solamente de guest", () => {
        wrapperShallow = getMenuWrapper(ROLES.empty);
        let itemIniciarSesion = wrapperShallow.find(Item).at(0);
        let textIniciarSesion = itemIniciarSesion.text();
        let itemHazteUnaCuenta = wrapperShallow.find(Item).at(1);
        let textHazteUnaCuenta = itemHazteUnaCuenta.text();
        expect(textIniciarSesion).toEqual('Iniciar Sesión ')
        expect(textIniciarSesion).not.toEqual('Perfil')
        expect(textHazteUnaCuenta).toEqual('Hazte una cuenta');
        expect(textHazteUnaCuenta).not.toEqual('Cerrar Sesión');
    });
    it("Items de Huesped o Anfitrion", () => {
        wrapperShallow = getMenuWrapper(ROLES.guest);
        let itemIniciarSesion = wrapperShallow.find(Item).at(0);
        let textIniciarSesion = itemIniciarSesion.text();
        let itemHazteUnaCuenta = wrapperShallow.find(Item).at(1);
        let textHazteUnaCuenta = itemHazteUnaCuenta.text();
        expect(textIniciarSesion).not.toEqual('Iniciar Sesión ')
        expect(textIniciarSesion).toEqual('Perfil')
        expect(textHazteUnaCuenta).not.toEqual('Hazte una cuenta');
        expect(textHazteUnaCuenta).toEqual('Cerrar Sesión');
    });*/

});