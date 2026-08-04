package com.fieldservicemanagement.field_service_management.service;

import com.fieldservicemanagement.field_service_management.entity.Part;
import com.fieldservicemanagement.field_service_management.repository.PartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PartService {

    private final PartRepository partRepository;

    public PartService(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    public List<Part> getAll() {
        return partRepository.findAll();
    }

    public Part getById(Long id) {
        return partRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Part not found with id: " + id));
    }

    public Optional<Part> getBySku(String sku) {
        return partRepository.findBySku(sku);
    }

    public Part create(Part part) {
        return partRepository.save(part);
    }

    public Part update(Long id, Part partDetails) {
        Part part = getById(id);
        part.setName(partDetails.getName());
        part.setSku(partDetails.getSku());
        part.setUnitCost(partDetails.getUnitCost());
        part.setStock(partDetails.getStock());
        return partRepository.save(part);
    }

    public void delete(Long id) {
        partRepository.deleteById(id);
    }
}