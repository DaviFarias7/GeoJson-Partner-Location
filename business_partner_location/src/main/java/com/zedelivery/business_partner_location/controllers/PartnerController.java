package com.zedelivery.business_partner_location.controllers;

import com.zedelivery.business_partner_location.model.Partner;
import com.zedelivery.business_partner_location.services.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/partners")
public class PartnerController {

    @Autowired
    private PartnerService partnerService;

    @PostMapping
    public Partner createPartner(@RequestBody Partner partner) {
        return partnerService.createPartner(partner);
    }

    @GetMapping("/{id}")
    public Partner getPartnerById(@PathVariable String id) {
        return partnerService.getPartnerById(id);
    }

    @GetMapping("/getAll")
    public List<Partner> getAllPartners() {
        return partnerService.getAllPartners();
    }

    @GetMapping("/search")
    public Partner searchPartner(@RequestParam double lon, @RequestParam double lat) {
        return partnerService.searchPartner(lon, lat);
    }
}
