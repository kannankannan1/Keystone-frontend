package com.fieldservicemanagement.field_service_management.service;

import com.fieldservicemanagement.field_service_management.entity.PartUsage;
import com.fieldservicemanagement.field_service_management.repository.PartUsageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PartUsageService {

    private final PartUsageRepository partUsageRepository;

    public PartUsageService(PartUsageRepository partUsageRepository) {
        this.partUsageRepository = partUsageRepository;
    }

    public List<PartUsage> getByWorkOrderId(Long workOrderId) {
        return partUsageRepository.findByWorkOrderId(workOrderId);
    }

    public PartUsage getById(Long id) {
        return partUsageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("PartUsage not found with id: " + id));
    }

    public PartUsage create(PartUsage partUsage) {
        return partUsageRepository.save(partUsage);
    }

    public PartUsage update(Long id, PartUsage partUsageDetails) {
        PartUsage partUsage = getById(id);
        partUsage.setQuantity(partUsageDetails.getQuantity());
        partUsage.setUnitCost(partUsageDetails.getUnitCost());
        partUsage.setNotes(partUsageDetails.getNotes());
        partUsage.setWorkOrder(partUsageDetails.getWorkOrder());
        partUsage.setPart(partUsageDetails.getPart());
        return partUsageRepository.save(partUsage);
    }

    public void delete(Long id) {
        partUsageRepository.deleteById(id);
    }
}