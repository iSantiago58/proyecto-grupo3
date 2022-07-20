import React from "react"
import {ScrollView} from "react-native";
import Body from "../components/body/Body";
import H1 from "../components/headline/H1";
import VerticalSeparator from "../components/VerticalSeparator";
import colors from "../constants/colors";


const TermAndConditionsScreen = () => {
    return (
        <ScrollView style={{backgroundColor: colors.white, paddingHorizontal: 24 }}>
            <H1 bold={true} textAlign={"center"} fontSize={20} lineHeight={24}>Términos y Condiciones de Uso</H1>
            <VerticalSeparator height={20}/>

            <Body fontSize={16}>Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todas los productos  que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña.

                El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. go-and-rent no asume la responsabilidad en caso de que entregue dicha clave a terceros.

                Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.

                Los precios de los productos ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en este sitio web.
            </Body>
        </ScrollView>

    )

}
export default TermAndConditionsScreen