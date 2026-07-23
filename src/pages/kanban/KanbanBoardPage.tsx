import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { Breadcrumb, Button } from '@/components/common';
import { STATUS_LABELS, PRIORITY_DOTS, KANBAN_COLUMNS } from '@/constants';
import type { WorkOrderStatus, WorkOrder } from '@/types';

interface KanbanCard {
  id: string;
  title: string;
  woId: string;
  priority: string;
  customer: string;
  technician?: string;
}

const initialData: Record<string, KanbanCard[]> = {
  new: [
    { id: 'c1', title: 'Electrical Panel Upgrade', woId: 'WO-1002', priority: 'critical', customer: 'TechStart Inc' },
    { id: 'c2', title: 'Roof Leak Repair', woId: 'WO-1006', priority: 'high', customer: 'Acme Corp' },
  ],
  assigned: [
    { id: 'c3', title: 'Plumbing Inspection', woId: 'WO-1003', priority: 'medium', customer: 'GreenLife Co', technician: 'Mike Chen' },
    { id: 'c4', title: 'Generator Servicing', woId: 'WO-1007', priority: 'low', customer: 'Metro Buildings', technician: 'John Smith' },
  ],
  in_progress: [
    { id: 'c5', title: 'HVAC System Maintenance', woId: 'WO-1001', priority: 'high', customer: 'Acme Corp', technician: 'John Smith' },
    { id: 'c6', title: 'CCTV Installation', woId: 'WO-1008', priority: 'medium', customer: 'TechStart Inc', technician: 'Mike Chen' },
  ],
  on_hold: [
    { id: 'c7', title: 'Elevator Inspection', woId: 'WO-1005', priority: 'medium', customer: 'Metro Buildings', technician: 'Emily Davis' },
  ],
  completed: [
    { id: 'c8', title: 'Fire Alarm Testing', woId: 'WO-1004', priority: 'high', customer: 'SecureNet', technician: 'Sarah Johnson' },
  ],
};

const columnColors: Record<string, string> = {
  new: 'border-blue-500',
  assigned: 'border-indigo-500',
  in_progress: 'border-amber-500',
  on_hold: 'border-orange-500',
  completed: 'border-emerald-500',
};

export function KanbanBoardPage() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const srcCol = [...columns[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId ? srcCol : [...columns[destination.droppableId]];
    const [moved] = srcCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [source.droppableId]: srcCol,
      [destination.droppableId]: destCol,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Kanban Board' }]} />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Kanban Board</h1>
          <Button leftIcon={<FiPlus />} onClick={() => navigate('/work-orders/create')}>New Work Order</Button>
        </div>
      </motion.div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map((col) => (
            <div key={col} className="min-w-[280px] flex-1">
              <div className={`mb-3 flex items-center gap-2 rounded-xl border-t-2 bg-white px-4 py-3 dark:bg-slate-800 ${columnColors[col] || 'border-slate-500'}`}>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{STATUS_LABELS[col]}</h3>
                <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-100 px-1.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                  {columns[col]?.length || 0}
                </span>
              </div>
              <Droppable droppableId={col}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] space-y-2 rounded-xl p-2 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-slate-50 dark:bg-slate-800/50'
                    }`}
                  >
                    {(columns[col] || []).map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => navigate(`/work-orders/${card.woId}`)}
                            className={`cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800 ${
                              snapshot.isDragging ? 'rotate-2 shadow-xl' : ''
                            }`}
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{card.woId}</span>
                              <span className={`h-2 w-2 rounded-full ${PRIORITY_DOTS[card.priority as keyof typeof PRIORITY_DOTS]}`} />
                            </div>
                            <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-white">{card.title}</h4>
                            <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">{card.customer}</p>
                            {card.technician && (
                              <div className="flex items-center gap-1.5">
                                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-[10px] font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                                  {card.technician.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-xs text-slate-600 dark:text-slate-400">{card.technician}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
