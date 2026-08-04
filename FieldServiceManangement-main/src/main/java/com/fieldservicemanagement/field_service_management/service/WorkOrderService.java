package com.fieldservicemanagement.field_service_management.service;

import com.fieldservicemanagement.field_service_management.entity.Customer;
import com.fieldservicemanagement.field_service_management.entity.FileAttachment;
import com.fieldservicemanagement.field_service_management.entity.PartUsage;
import com.fieldservicemanagement.field_service_management.entity.Site;
import com.fieldservicemanagement.field_service_management.entity.Users;
import com.fieldservicemanagement.field_service_management.entity.WorkOrder;
import com.fieldservicemanagement.field_service_management.entity.WorkOrderStatusHistory;
import com.fieldservicemanagement.field_service_management.repository.CustomerRepository;
import com.fieldservicemanagement.field_service_management.repository.FileRepository;
import com.fieldservicemanagement.field_service_management.repository.PartUsageRepository;
import com.fieldservicemanagement.field_service_management.repository.SiteRepository;
import com.fieldservicemanagement.field_service_management.repository.UserRepository;
import com.fieldservicemanagement.field_service_management.repository.WorkOrderRepository;
import com.fieldservicemanagement.field_service_management.repository.WorkOrderStatusHistoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final UserRepository userRepository;
    private final PartUsageRepository partUsageRepository;
    private final WorkOrderStatusHistoryRepository statusHistoryRepository;
    private final FileRepository fileRepository;

    public WorkOrderService(WorkOrderRepository workOrderRepository, CustomerRepository customerRepository, SiteRepository siteRepository, UserRepository userRepository, PartUsageRepository partUsageRepository, WorkOrderStatusHistoryRepository statusHistoryRepository, FileRepository fileRepository) {
        this.workOrderRepository = workOrderRepository;
        this.customerRepository = customerRepository;
        this.siteRepository = siteRepository;
        this.userRepository = userRepository;
        this.partUsageRepository = partUsageRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.fileRepository = fileRepository;
    }

    public List<WorkOrder> getAll() {
        return workOrderRepository.findAll();
    }

    public WorkOrder getById(Long id) {
        return workOrderRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("WorkOrder not found with id: " + id));
    }

    public List<WorkOrder> getByTechnicianId(Long technicianId) {
        return workOrderRepository.findAll().stream()
                .filter(wo -> wo.getAssignedTo() != null && wo.getAssignedTo().getId().equals(technicianId))
                .toList();
    }

    public List<WorkOrder> getByCustomerId(Long customerId) {
        return workOrderRepository.findAll().stream()
                .filter(wo -> wo.getCustomer() != null && wo.getCustomer().getId().equals(customerId))
                .toList();
    }

    public WorkOrder create(WorkOrder workOrder) {
        if (workOrder.getCustomer() != null && workOrder.getCustomer().getId() != null) {
            Customer customer = customerRepository.findById(workOrder.getCustomer().getId())
                    .orElseThrow(() -> new NoSuchElementException("Customer not found"));
            workOrder.setCustomer(customer);
        }
        if (workOrder.getSite() != null && workOrder.getSite().getId() != null) {
            Site site = siteRepository.findById(workOrder.getSite().getId())
                    .orElseThrow(() -> new NoSuchElementException("Site not found"));
            workOrder.setSite(site);
        }
        if (workOrder.getAssignedTo() != null && workOrder.getAssignedTo().getId() != null) {
            Users technician = userRepository.findById(workOrder.getAssignedTo().getId())
                    .orElseThrow(() -> new NoSuchElementException("Technician not found"));
            workOrder.setAssignedTo(technician);
        }
        WorkOrder saved = workOrderRepository.save(workOrder);
        addStatusHistory(saved, "new");
        return saved;
    }

    public WorkOrder update(Long id, WorkOrder workOrderDetails) {
        WorkOrder workOrder = getById(id);
        workOrder.setTitle(workOrderDetails.getTitle());
        workOrder.setDescription(workOrderDetails.getDescription());
        workOrder.setPriority(workOrderDetails.getPriority());
        workOrder.setStatus(workOrderDetails.getStatus());
        workOrder.setSlaDueAt(workOrderDetails.getSlaDueAt());
        if (workOrderDetails.getCustomer() != null && workOrderDetails.getCustomer().getId() != null) {
            Customer customer = customerRepository.findById(workOrderDetails.getCustomer().getId())
                    .orElseThrow(() -> new NoSuchElementException("Customer not found"));
            workOrder.setCustomer(customer);
        }
        if (workOrderDetails.getSite() != null && workOrderDetails.getSite().getId() != null) {
            Site site = siteRepository.findById(workOrderDetails.getSite().getId())
                    .orElseThrow(() -> new NoSuchElementException("Site not found"));
            workOrder.setSite(site);
        }
        if (workOrderDetails.getAssignedTo() != null && workOrderDetails.getAssignedTo().getId() != null) {
            Users technician = userRepository.findById(workOrderDetails.getAssignedTo().getId())
                    .orElseThrow(() -> new NoSuchElementException("Technician not found"));
            workOrder.setAssignedTo(technician);
        }
        WorkOrder saved = workOrderRepository.save(workOrder);
        if (workOrderDetails.getStatus() != null) {
            addStatusHistory(saved, workOrderDetails.getStatus());
        }
        return saved;
    }

    public WorkOrder updateStatus(Long id, String status) {
        WorkOrder workOrder = getById(id);
        workOrder.setStatus(status);
        WorkOrder saved = workOrderRepository.save(workOrder);
        addStatusHistory(saved, status);
        return saved;
    }

    public WorkOrder assignTechnician(Long id, Long technicianId) {
        WorkOrder workOrder = getById(id);
        Users technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new NoSuchElementException("Technician not found"));
        workOrder.setAssignedTo(technician);
        return workOrderRepository.save(workOrder);
    }

    public void delete(Long id) {
        fileRepository.deleteByWorkOrderId(id);
        workOrderRepository.deleteById(id);
    }

    public WorkOrder addComment(Long id, String content) {
        WorkOrder workOrder = getById(id);
        return workOrderRepository.save(workOrder);
    }

    public Map<String, List<WorkOrder>> getKanban() {
        List<WorkOrder> all = workOrderRepository.findAll();
        return all.stream().collect(Collectors.groupingBy(WorkOrder::getStatus));
    }

    public void reorderKanban(List<Long> columnIds) {
    }

    private void addStatusHistory(WorkOrder workOrder, String status) {
        WorkOrderStatusHistory history = WorkOrderStatusHistory.builder()
                .fromStatus(workOrder.getStatus())
                .toStatus(status)
                .changedAt(LocalDateTime.now())
                .workOrder(workOrder)
                .build();
        statusHistoryRepository.save(history);
    }
}