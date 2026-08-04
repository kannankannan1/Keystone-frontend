package com.fieldservicemanagement.field_service_management.service;

import com.fieldservicemanagement.field_service_management.entity.Customer;
import com.fieldservicemanagement.field_service_management.entity.Site;
import com.fieldservicemanagement.field_service_management.repository.CustomerRepository;
import com.fieldservicemanagement.field_service_management.repository.SiteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SiteService {

    private final SiteRepository siteRepository;
    private final CustomerRepository customerRepository;

    public SiteService(SiteRepository siteRepository, CustomerRepository customerRepository) {
        this.siteRepository = siteRepository;
        this.customerRepository = customerRepository;
    }

    public List<Site> getAll() {
        return siteRepository.findAll();
    }

    public Site getById(Long id) {
        return siteRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Site not found with id: " + id));
    }

    public List<Site> getByCustomerId(Long customerId) {
        return siteRepository.findByCustomerId(customerId);
    }

    public Site create(Site site) {
        return siteRepository.save(site);
    }

    public Site update(Long id, Site siteDetails) {
        Site site = getById(id);
        site.setName(siteDetails.getName());
        site.setAddress(siteDetails.getAddress());
        site.setCustomer(siteDetails.getCustomer());
        return siteRepository.save(site);
    }

    public void delete(Long id) {
        siteRepository.deleteById(id);
    }
}