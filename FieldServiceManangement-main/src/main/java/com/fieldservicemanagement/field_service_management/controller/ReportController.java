package com.fieldservicemanagement.field_service_management.controller;

import com.fieldservicemanagement.field_service_management.entity.WorkOrder;
import com.fieldservicemanagement.field_service_management.service.WorkOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final WorkOrderService workOrderService;

    public ReportController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        List<WorkOrder> all = workOrderService.getAll();
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalWorkOrders", all.size());
        stats.put("openJobs", all.stream().filter(w -> !"completed".equals(w.getStatus()) && !"closed".equals(w.getStatus()) && !"cancelled".equals(w.getStatus())).count());
        stats.put("closedJobs", all.stream().filter(w -> "closed".equals(w.getStatus())).count());
        stats.put("totalCustomers", 0);
        stats.put("totalTechnicians", 0);
        stats.put("slaBreached", all.stream().filter(w -> "cancelled".equals(w.getStatus())).count());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/status-breakdown")
    public ResponseEntity<List<Map<String, Object>>> getStatusBreakdown() {
        List<WorkOrder> all = workOrderService.getAll();
        Map<String, Long> counts = all.stream().collect(Collectors.groupingBy(WorkOrder::getStatus, Collectors.counting()));
        List<Map<String, Object>> result = new ArrayList<>();
        counts.forEach((status, count) -> {
            Map<String, Object> item = new HashMap<>();
            item.put("name", status);
            item.put("value", count);
            result.add(item);
        });
        return ResponseEntity.ok(result);
    }

    @GetMapping("/monthly-trends")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyTrends() {
        List<WorkOrder> all = workOrderService.getAll();
        Map<String, Map<String, Long>> monthly = new LinkedHashMap<>();
        for (int i = 1; i <= 12; i++) {
            String month = String.format("%02d", i);
            monthly.put(month, new HashMap<>());
            monthly.get(month).put("completed", 0L);
            monthly.get(month).put("created", 0L);
        }
        all.forEach(wo -> {
            if (wo.getCreatedAt() != null) {
                String month = String.format("%02d", wo.getCreatedAt().getMonthValue());
                if (monthly.containsKey(month)) {
                    monthly.get(month).put("created", monthly.get(month).get("created") + 1);
                }
            }
            if ("completed".equals(wo.getStatus()) && wo.getCompletedDate() != null) {
                String month = String.format("%02d", wo.getCompletedDate().getMonthValue());
                if (monthly.containsKey(month)) {
                    monthly.get(month).put("completed", monthly.get(month).get("completed") + 1);
                }
            }
        });
        List<Map<String, Object>> result = new ArrayList<>();
        monthly.forEach((month, counts) -> {
            Map<String, Object> item = new HashMap<>();
            item.put("month", month);
            item.put("completed", counts.get("completed"));
            item.put("created", counts.get("created"));
            result.add(item);
        });
        return ResponseEntity.ok(result);
    }

    @GetMapping("/technician-performance")
    public ResponseEntity<List<Map<String, Object>>> getTechnicianPerformance() {
        List<WorkOrder> all = workOrderService.getAll();
        Map<String, Map<String, Object>> perf = new HashMap<>();
        all.forEach(wo -> {
            if (wo.getAssignedTo() != null) {
                String name = wo.getAssignedTo().getName();
                perf.putIfAbsent(name, new HashMap<>());
                Map<String, Object> p = perf.get(name);
                p.put("name", name);
                p.put("jobsCompleted", ((Long) p.getOrDefault("jobsCompleted", 0L)) + ("completed".equals(wo.getStatus()) ? 1 : 0));
            }
        });
        return ResponseEntity.ok(new ArrayList<>(perf.values()));
    }
}