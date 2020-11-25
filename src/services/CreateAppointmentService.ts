import Appointment from '../models/Appointment'
import {startOfHour} from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository
    }

    public execute({date, provider}: Request): Appointment {
        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        return this.appointmentsRepository.create({provider, date: appointmentDate})
    }
}

export default CreateAppointmentService
