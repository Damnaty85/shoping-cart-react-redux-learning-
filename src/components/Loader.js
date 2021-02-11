import React from "react"
import ContentLoader from "react-content-loader"

const LoadingItem = (props) => (
    <ContentLoader
        speed={2}
        width={250}
        height={448}
        viewBox="0 0 250 448"
        backgroundColor="#c9c9c9"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="0" ry="0" width="250" height="335" />
        <rect x="0" y="345" rx="0" ry="0" width="250" height="18" />
        <rect x="55" y="375" rx="0" ry="0" width="200" height="30" />
        <rect x="0" y="413" rx="0" ry="0" width="56" height="35" />
        <rect x="120" y="413" rx="0" ry="0" width="130" height="35" />
    </ContentLoader>
);

export default LoadingItem;
