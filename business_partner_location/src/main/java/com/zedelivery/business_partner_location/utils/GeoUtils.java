package com.zedelivery.business_partner_location.utils;

import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

public class GeoUtils {
    public static double distance(GeoJsonPoint point1, GeoJsonPoint point2) {
        double lat1 = point1.getCoordinates().get(1);
        double lon1 = point1.getCoordinates().get(0);
        double lat2 = point2.getCoordinates().get(1);
        double lon2 = point2.getCoordinates().get(0);

        final int R = 6371; // Radius of the Earth in kilometers

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Convert to kilometers
    }
}
