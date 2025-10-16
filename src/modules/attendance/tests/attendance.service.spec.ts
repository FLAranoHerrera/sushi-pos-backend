import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from '../services/attendance.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AttendanceRecord } from '../entities/attendance.entity';

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: getRepositoryToken(AttendanceRecord),
          useValue: { find: jest.fn(), findOne: jest.fn(), save: jest.fn(), create: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
