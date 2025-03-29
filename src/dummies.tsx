const dummyProducer: Producer = {
    id: 1,
    email: "producer@example.com",
    businessName: "Fresh Farm Goods",
    location: "New York, USA",
    address: "123 Greenway Road, NY 10001",
    description: "Stonk land lorem ipsum"
};

const dummyProducer2: Producer = {
    id: 2,
    email: "producer2@example.com",
    businessName: "Tonkas Lokas",
    location: "CABA, BSAS",
    address: "123 Ituzaingo, UA 10001",
};

export const dummyProducers = [ dummyProducer, dummyProducer2 ]

export const dummyPosts: Post[] = [
    {
        id: 101,
        producerId: dummyProducer.id,
        title: "Organic Apples",
        description: "Freshly picked organic apples from our farm.",
        price: 4.99,
        tag: "Fruits",
        stock: 50,
        start_time: new Date("2024-07-01T08:00:00Z"),
        end_time: new Date("2024-07-10T18:00:00Z"),
    },
    {
        id: 102,
        producerId: dummyProducer.id,
        title: "Raw Honey",
        description: "Pure, unfiltered honey from our beehives.",
        price: 9.99,
        tag: "Honey",
        stock: 20,
        start_time: new Date("2024-07-05T09:00:00Z"),
        end_time: new Date("2024-07-15T17:00:00Z"),
    },    
    {
        id: 103,
        producerId: dummyProducer2.id,
        title: "Posti loca",
        description: "Locreisi, coca",
        price: 4.99,
        tag: "Polo",
        stock: 4,
        start_time: new Date("2024-07-05T09:00:00Z"),
        end_time: new Date("2024-07-15T17:00:00Z"),
    },
];

export const dummyConsumer: Consumer = {
    id: 301,
    firstName: "John",
    lastName: "Juan",
    email: "JohnJuan@mail.com"
}

export const dummyOrder: Order = {
    id: 201,
    producer: dummyProducer,
    consumer: dummyConsumer,
    quantity: 5,
    received: false
}