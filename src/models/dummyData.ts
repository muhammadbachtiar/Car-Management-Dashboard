interface Car {
    id: number;
    name: string;
    type: string;
    rentPerDay: number;
    timeUpdate: Date;
    image: string;
}

function getRandomDate(): Date {
    const start = new Date(2022, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const carListData: Car[] = [
    {
        id: 1,
        name: "Mobil Jenis Satu", 
        type: "Minibus", 
        rentPerDay: 250000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    },
    {
        id: 2,
        name: "Mobil Jenis Dua", 
        type: "Sedan", 
        rentPerDay: 200000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    },
    {
        id: 3,
        name: "Mobil Jenis Tiga", 
        type: "SUV", 
        rentPerDay: 300000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    },
    {
        id: 4,
        name: "Mobil Jenis Empat", 
        type: "Pickup", 
        rentPerDay: 350000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    },
    {
        id: 5,
        name: "Mobil Jenis Lima", 
        type: "MPV", 
        rentPerDay: 280000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    },
    {
        id: 6,
        name: "Mobil Jenis Enam", 
        type: "Hatchback", 
        rentPerDay: 180000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    },
    {
        id: 7,
        name: "Mobil Jenis Tujuh", 
        type: "Convertible", 
        rentPerDay: 400000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    },
    {
        id: 8,
        name: "Mobil Jenis Delapan", 
        type: "Sportscar", 
        rentPerDay: 500000, 
        timeUpdate: getRandomDate(),
        image: "http://res.cloudinary.com/dwprvigp0/image/upload/v1699586529/qniyhxei1eae9npaybb1.jpg"
    }
]



export default carListData;