export interface TimesheetEntry {
  start: string;
  end: string;
}

export interface Timesheet {
  employeeId: string;
  entries: TimesheetEntry[];
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  type: "FULL_TIME" | "PART_TIME" | "CASUAL";
  baseHourlyRate: number;
  hourlyRate?: number;
  superRate?: number;
}

export interface Payslip {
  employeeId: string;
  gross: number;
  tax: number;
  net: number;
  normalHours: number;
  overtimeHours: number;
  super: number;
}
