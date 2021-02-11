import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersDayAvailabilityService from './ListProvidersDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProvidersDayAvailabilityService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProvidersDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the availability of providers over the day', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 14, 0, 0),
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 15, 0, 0),
      user_id: 'user_id',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 11).getTime();
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, availability: false },
        { hour: 9, availability: false },
        { hour: 10, availability: false },
        { hour: 13, availability: true },
        { hour: 14, availability: false },
        { hour: 15, availability: false },
        { hour: 16, availability: true },
      ]),
    );
  });
});
