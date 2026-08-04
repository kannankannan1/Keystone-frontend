package com.fieldservicemanagement.field_service_management.service;

import com.fieldservicemanagement.field_service_management.entity.WorkOrderStatusHistory;
import com.fieldservicemanagement.field_service_management.repository.WorkOrderStatusHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WorkOrderStatusHistoryService {

    private final WorkOrderStatusHistoryRepository statusHistoryRepository;

    public WorkOrderStatusHistoryService(WorkOrderStatusHistoryRepository statusHistoryRepository) {
        this.statusHistoryRepository = statusHistoryRepository;
    }

    public List<WorkOrderStatusHistory> getByWorkOrderId(Long workOrderId) {
        return statusHistoryRepository.findByWorkOrderId(workOrderId);
    }

    public WorkOrderStatusHistory getById(Long id) {
        return statusHistoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("StatusHistory not found with id: " + id));
    }

    public WorkOrderStatusHistory create(WorkOrderStatusHistory history) {
        return statusHistoryRepository.save(history);
    }

    public void delete(Long id) {
        statusHistoryRepository.deleteById(id);
    }
}