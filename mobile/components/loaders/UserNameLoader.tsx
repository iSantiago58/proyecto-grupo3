import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import colors from "../../constants/colors";


const UserNameLoader = () => (
    <ContentLoader
        speed={2}
        width={326}
        height={56}
        viewBox="0 0 326 56"
        backgroundColor={colors.grey}
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="5" ry="5" width="250" height="25" />
        <Rect x="0" y="30" rx="5" ry="5" width="180" height="20" />
    </ContentLoader>
)



export default UserNameLoader