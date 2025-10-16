import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, IsNull } from 'typeorm';
import { AttendanceRecord, AttendanceStatus } from '../entities/attendance.entity';
import { UpdateAttendanceDto } from '../dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
  ) {}

  async registerCheckIn(employeeId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingRecord = await this.attendanceRepository.findOne({
      where: { 
        employee: { id: employeeId }, 
        date: Between(today, tomorrow)
      },
    });

    if (existingRecord) {
      throw new BadRequestException('Check-in already registered for today');
    }

    const record = this.attendanceRepository.create({
      employee: { id: employeeId },
      checkIn: new Date(),
      date: today,
    });

    return await this.attendanceRepository.save(record);
  }

  async registerCheckOut(employeeId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const record = await this.attendanceRepository.findOne({
      where: { 
        employee: { id: employeeId }, 
        checkOut: IsNull(),
        date: Between(today, tomorrow)
      },
    });

    if (!record) {
      throw new NotFoundException('No check-in found for today');
    }

    record.checkOut = new Date();
    const diff = (record.checkOut.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60);
    record.workedHours = parseFloat(diff.toFixed(2));

    // Determinar status basado en horas trabajadas
    if (record.workedHours > 8) {
      record.status = AttendanceStatus.EXTRA_HOURS;
    } else if (record.workedHours < 8) {
      record.status = AttendanceStatus.LATE;
    } else {
      record.status = AttendanceStatus.ON_TIME;
    }

    return await this.attendanceRepository.save(record);
  }

  async getAttendanceByEmployee(employeeId: string, startDate?: Date, endDate?: Date) {
    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee')
      .where('attendance.employee.id = :employeeId', { employeeId });

    if (startDate && endDate) {
      query.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    return await query
      .orderBy('attendance.date', 'DESC')
      .getMany();
  }

  async getAllAttendance(startDate?: Date, endDate?: Date) {
    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee');

    if (startDate && endDate) {
      query.where('attendance.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    return await query
      .orderBy('attendance.date', 'DESC')
      .getMany();
  }

  async getAttendanceById(id: string) {
    const record = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!record) {
      throw new NotFoundException('Attendance record not found');
    }

    return record;
  }

  async updateAttendance(id: string, updateDto: UpdateAttendanceDto) {
    const record = await this.getAttendanceById(id);

    if (updateDto.checkIn) {
      record.checkIn = new Date(updateDto.checkIn);
    }

    if (updateDto.checkOut) {
      record.checkOut = new Date(updateDto.checkOut);
    }

    if (updateDto.status) {
      record.status = updateDto.status;
    }

    if (updateDto.notes !== undefined) {
      record.notes = updateDto.notes;
    }

    // Recalcular horas trabajadas si se actualizaron checkIn o checkOut
    if (updateDto.checkIn || updateDto.checkOut) {
      if (record.checkIn && record.checkOut) {
        const diff = (record.checkOut.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60);
        record.workedHours = parseFloat(diff.toFixed(2));
      }
    }

    return await this.attendanceRepository.save(record);
  }

  async deleteAttendance(id: string) {
    const record = await this.getAttendanceById(id);
    await this.attendanceRepository.remove(record);
    return { message: 'Attendance record deleted successfully' };
  }

  async getAttendanceStats(employeeId?: string, startDate?: Date, endDate?: Date) {
    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee');

    if (employeeId) {
      query.where('attendance.employee.id = :employeeId', { employeeId });
    }

    if (startDate && endDate) {
      query.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const records = await query.getMany();

    const stats = {
      totalRecords: records.length,
      totalHours: records.reduce((sum, record) => sum + (record.workedHours || 0), 0),
      onTime: records.filter(r => r.status === AttendanceStatus.ON_TIME).length,
      late: records.filter(r => r.status === AttendanceStatus.LATE).length,
      absent: records.filter(r => r.status === AttendanceStatus.ABSENT).length,
      extraHours: records.filter(r => r.status === AttendanceStatus.EXTRA_HOURS).length,
    };

    return stats;
  }
}
