import { faker } from '@faker-js/faker';

export const generateUserData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 12, pattern: /[A-Z0-9!@#$&*]/ }),
        phone: faker.phone.number({ style: 'national' }),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
    };
};