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
    default: WorkflowStatus.INACTIVE,
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

  @ManyToOne(() => Program, program => program.workflows)
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 1 })
  version: number;

  @OneToMany(() => WorkflowField, workflowField => workflowField.workflow)
  workflowFields: WorkflowField[];

  @OneToMany(() => FieldMapping, fieldMapping => fieldMapping.workflow)
  fieldMappings: FieldMapping[];
}
