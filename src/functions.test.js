import { createEvent } from './functions'

beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2021-12-07T10:20:30Z').getTime())
});

test('Validation a event title and content basic', () => {
    //Preparar el escenario
    const weekday = "mon";
    const week = 1;
    const openHour = 8;
    const closeHour = 14;

    //Actuar sobre él u obtengo sus datos
    const result = createEvent(weekday, week, openHour, closeHour);

    //Verificar
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6, 'hour']);
});

test('Validation start date', () => {

    //Preparar el escenario para el dia de hoy, 7 de diciembre 2021
    const weekday = "tue";
    const week = 1;
    const openHour = 8;
    const closeHour = 14;

    //Actuar sobre él u obtengo sus datos
    const startDate = new Date();
    const result = createEvent(weekday, week, openHour, closeHour);
    

    //verificar
    expect(result.start).toEqual(startDate);

});

test('Validation date', () => {
    //Preparar el escenario para el dia de hoy, 7 de diciembre 2021
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const startDate = new Date();

    const weekday = "tue";
    const week = 1;
    const openHour = 8;
    const closeHour = 14;

    //Actuar sobre él 
    const result = createEvent(weekday, week, openHour, closeHour);
    const actualDate = startDate.toLocaleDateString('es-ES', options);

    //verificar
    expect(result.date).toBe(actualDate);

});


test('Validation illegal arguments', () => {

    const weekday = "tue";
    const week = 1;
    const openHour = 8;
    const closeHour = 14;
    
    //Actuar sobre él 
    const result = createEvent(weekday, week, openHour, closeHour);

    //Verificar
    expect(typeof result.title).toBe("string")
    expect(typeof result.description).toBe("string");
    expect(result.start).toBeInstanceOf(Date)
    expect(typeof result.date).toBe("string")
    expect(Array.isArray(result.duration)).toBe(true)
    expect()

});


test('create an event list of at least 10 events', () => {
    //Preparar el escenario 
    let week_days = { 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu' , 5: 'fri', 6: 'sat', 7: 'sun'};
    let listOfEvents = [];

    //Actuar sobre él
    let numberOfEvent = Math.floor(Math.random() * (100 - 10 + 10)) + 10; // Rango: 10-100
    for (let i = 0; i < numberOfEvent; i++) {
        //genero numero aleatorios enteros
        let week = Math.floor(Math.random() * (4 - 1 + 1)) + 1; //Rango: 1-4
        let weekDay = week_days[Math.floor(Math.random() * (7 - 1 + 1)) + 1]; //Rango: 1-7
        let openHour = Math.floor(Math.random() * (24 - 8 + 1)) + 8; //Rango: 8-24
        let closeEvent = Math.floor(Math.random() * (24 - 8 + 1)) + 8; //Rango: 8-24
        let closehour =  openHour > closeEvent ? openHour + 2 : close; 

        listOfEvents.push(createEvent(weekDay, week, openHour, closehour))
        
    }
    //Verificar
    expect(listOfEvents.length).toBeGreaterThanOrEqual(10); 
    expect(listOfEvents.length).toBeLessThan(101);



});