import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="138" cy="113" r="109" />
        <rect x="0" y="243" rx="10" ry="10" width="280" height="20" />
        <rect x="-2" y="278" rx="10" ry="10" width="280" height="80" />
        <rect x="5" y="372" rx="10" ry="10" width="90" height="45" />
        <rect x="123" y="372" rx="10" ry="10" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton