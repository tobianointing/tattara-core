import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workflow } from '.';
import { WorkflowField } from './workflow-field.entity';

@Entity('field_mappings')
export class FieldMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Workflow, workflow => workflow.fieldMappings)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @ManyToOne(() => WorkflowField, workflowField => workflowField.fieldMappings)
  @JoinColumn({ name: 'workflow_field_id' })
  workflowField: WorkflowField;

  @Column()
  targetType: string;

  @Column({ type: 'jsonb' })
  target: string;

  @CreateDateColumn()
  createdAt: Date;
}
