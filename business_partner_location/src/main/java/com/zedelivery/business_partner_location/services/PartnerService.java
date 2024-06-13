package com.zedelivery.business_partner_location.services;

import com.zedelivery.business_partner_location.model.Partner;
import com.zedelivery.business_partner_location.repositories.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class PartnerService {

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    public Partner createPartner(Partner partner) {
        if (partnerRepository.findByDocument(partner.getDocument()) != null) {
            throw new IllegalArgumentException("Document already exists");
        }
        return partnerRepository.save(partner);
    }

    public Partner getPartnerById(String id) {
        return partnerRepository.findById(id).orElse(null);
    }

    public List<Partner> getAllPartners(){
        return partnerRepository.findAll();
    }

    public Partner searchPartner(double lon, double lat) {
        GeoJsonPoint userLocation = new GeoJsonPoint(lon, lat);

        NearQuery nearQuery = NearQuery.near(userLocation).spherical(true);

        AggregationOperation geoNear = Aggregation.geoNear(nearQuery, "distance");

        Aggregation aggregation = newAggregation(
                match(Criteria.where("coverageArea").intersects(userLocation)),
                geoNear,
                limit(1)
        );

        AggregationResults<Partner> results = mongoTemplate.aggregate(aggregation, "partner", Partner.class);
        return results.getUniqueMappedResult();
    }
}

