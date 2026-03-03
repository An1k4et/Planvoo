"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface PlaceImageProps {
    placeName: string;
    className?: string;
    fallback?: string;
}

const PlaceImage = ({ placeName, className, fallback }: PlaceImageProps) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!placeName) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post("/api/get-image", {
                    placeName: placeName
                });

                if (response.data?.photoUrl) {
                    setPhotoUrl(response.data.photoUrl);
                }
            } catch (error) {
                console.error("Error fetching place image:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhoto();
    }, [placeName]);

    return (
        <img
            src={photoUrl || fallback || "https://placehold.co/800x600/e2e2e2/e2e2e2"}
            alt={placeName}
            className={`${className} ${loading ? 'animate-pulse bg-zinc-200 dark:bg-zinc-800' : ''}`}
            onError={(e) => {
                (e.target as HTMLImageElement).src = fallback || "https://placehold.co/800x600/e2e2e2/e2e2e2";
            }}
        />
    );
};

export default PlaceImage;
