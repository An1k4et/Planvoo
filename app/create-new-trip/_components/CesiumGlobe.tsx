"use client";
import React, { useEffect, useState } from "react";
import { Viewer } from "resium";
import "cesium/Build/Cesium/Widgets/widgets.css";

const CesiumGlobe = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set the base URL for Cesium assets
        if (typeof window !== "undefined") {
            (window as any).CESIUM_BASE_URL = "/cesium";
        }
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-full bg-zinc-900" />;

    return (
        <div className="w-full h-full relative overflow-hidden">
            {/* Hide credit container if desired or style it */}
            <Viewer
                full
                className="cesium-viewer-container"
                timeline={false}
                animation={false}
                navigationHelpButton={false}
                homeButton={false}
                sceneModePicker={false}
                geocoder={false}
                baseLayerPicker={true} // Allow user to choose different maps
            />
        </div>
    );
};

export default CesiumGlobe;
