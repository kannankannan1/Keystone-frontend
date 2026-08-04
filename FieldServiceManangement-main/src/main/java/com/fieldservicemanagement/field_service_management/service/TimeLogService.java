package com.fieldservicemanagement.field_service_management.service;

import com.fieldservicemanagement.field_service_management.entity.TimeLog;
import com.fieldservicemanagement.field_service_management.repository.TimeLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TimeLogService {

    private final TimeLogRepository timeLogRepository;

    public TimeLogService(TimeLogRepository timeLogRepository) {
        this.timeLogRepository = timeLogRepository;
    }

    public List<TimeLog> getByWorkOrderId(Long workOrderId) {
        return timeLogRepository.findByWorkOrderId(workOrderId);
    }

    public TimeLog getById(Long id) {
        return timeLogRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("TimeLog not found with id: " + id));
    }

    public TimeLog create(TimeLog timeLog) {
        return timeLogRepository.save(timeLog);
    }

    public TimeLog stopTimeLog(Long id) {
        TimeLog timeLog = getById(id);
        if (timeLog.getEndTime() != null) {
            return timeLog;
        }
        timeLog.setEndTime(java.time.LocalDateTime.now());
        if (timeLog.getStartTime() != null) {
            long minutes = java.time.Duration.between(timeLog.getStartTime(), timeLog.getEndTime()).toMinutes();
            timeLog.setMinutes((int) minutes);
        }
        return timeLogRepository.save(timeLog);
    }

    public void delete(Long id) {
        timeLogRepository.deleteById(id);
    }
}