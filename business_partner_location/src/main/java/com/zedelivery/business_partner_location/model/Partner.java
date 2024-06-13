package com.zedelivery.business_partner_location.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPolygon;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@Getter
@Setter
@Document(collection = "partners")
public class Partner {
    @Id
    private String id;

    @Field("tradingName")
    private String tradingName;

    @Field("ownerName")
    private String ownerName;

    @Field("document")
    private String document;

    @Field("coverageArea")
    private GeoJsonMultiPolygon coverageArea;

    @Field("address")
    private GeoJsonPoint address;
}