package com.fieldservicemanagement.field_service_management.controller;

import com.fieldservicemanagement.field_service_management.entity.WorkOrder;
import com.fieldservicemanagement.field_service_management.service.WorkOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/work-orders")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    @GetMapping
    public ResponseEntity<List<WorkOrder>> getAll() {
        return ResponseEntity.ok(workOrderService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkOrder> getById(@PathVariable Long id) {
        return ResponseEntity.ok(workOrderService.getById(id));
    }

    @GetMapping("/technician/{technicianId}")
    public ResponseEntity<List<WorkOrder>> getByTechnician(@PathVariable Long technicianId) {
        return ResponseEntity.ok(workOrderService.getByTechnicianId(technicianId));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<WorkOrder>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(workOrderService.getByCustomerId(customerId));
    }

    @PostMapping
    public ResponseEntity<WorkOrder> create(@RequestBody WorkOrder workOrder) {
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(workOrderService.create(workOrder));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkOrder> update(@PathVariable Long id, @RequestBody WorkOrder workOrder) {
        return ResponseEntity.ok(workOrderService.update(id, workOrder));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<WorkOrder> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ResponseEntity.ok(workOrderService.updateStatus(id, status));
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<WorkOrder> assign(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        Long technicianId = body.get("technicianId");
        return ResponseEntity.ok(workOrderService.assignTechnician(id, technicianId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workOrderService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<WorkOrder> addComment(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String content = body.get("content");
        return ResponseEntity.ok(workOrderService.addComment(id, content));
    }

    @GetMapping("/kanban")
    public ResponseEntity<Map<String, List<WorkOrder>>> getKanban() {
        return ResponseEntity.ok(workOrderService.getKanban());
    }

    @PutMapping("/kanban")
    public ResponseEntity<Void> reorderKanban(@RequestBody Map<String, List<Long>> body) {
        List<Long> columns = body.get("columns");
        workOrderService.reorderKanban(columns);
        return ResponseEntity.ok().build();
    }
}