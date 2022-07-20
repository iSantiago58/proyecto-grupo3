import ContentLoader, { Circle, Rect, } from "react-content-loader/native"
import React from "react"

const SearchLoader = () => (
            <ContentLoader
                speed={2}
                width={450}
                height={700}
                viewBox="0 0 470 700"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"

            >
                <Rect x="90" y="0" rx="2" ry="2" width="200" height="20" />
                <Rect x="24" y="60" rx="2" ry="2" width="330" height="200" />
                <Rect x="310" y="270" rx="2" ry="2" width="40" height="20" />
                <Rect x="28" y="270" rx="2" ry="2" width="70" height="20" />
                <Rect x="28" y="300" rx="2" ry="2" width="150" height="15" />
                <Rect x="28" y="318" rx="2" ry="2" width="150" height="15" />
                <Rect x="28" y="340" rx="2" ry="2" width="70" height="10" />
                <Rect x="24" y="259" rx="2" ry="2" width="3" height="105" />
                <Rect x="351" y="259" rx="2" ry="2" width="3" height="105" />
                <Rect x="27" y="360" rx="2" ry="2" width="325" height="3" />

            </ContentLoader>
)

export default SearchLoader