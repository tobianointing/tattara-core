import { Mode, WorkflowStatus } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Program } from './program.entity';
import { WorkflowField } from './workflow-field.entity';
import { FieldMapping } from './field-mapping.entity';
import { WorkflowConfiguration } from './workflow-configuration.entity';

@Entity('workflows')
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: WorkflowStatus,
    default: WorkflowStatus.ACTIVE,
  })
  status: WorkflowStatus;

  @Column({ type: 'text', array: true, default: '{}' })
  supportedLanguages: string[];

  @Column({
    type: 'enum',
    enum: Mode,
    array: true,
    default: [Mode.TEXT],
  })
  enabledModes: Mode[];

  @ManyToOne(() => Program, program => program.workflows, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @OneToMany(() => WorkflowField, workflowField => workflowField.workflow, {
    cascade: true,
    eager: true,
  })
  workflowFields: WorkflowField[];

  @OneToMany(() => FieldMapping, fieldMapping => fieldMapping.workflow, {
    cascade: true,
    eager: true,
  })
  fieldMappings: FieldMapping[];

  @OneToMany(
    () => WorkflowConfiguration,
    workflowConfiguration => workflowConfiguration.workflow,
    { cascade: true, eager: true },
  )
  workflowConfigurations: WorkflowConfiguration[];

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
