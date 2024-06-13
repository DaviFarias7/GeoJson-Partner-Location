package com.zedelivery.business_partner_location.repositories;

import com.zedelivery.business_partner_location.model.Partner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepository extends MongoRepository<Partner, String> {
    Partner findByDocument(String document);
}
