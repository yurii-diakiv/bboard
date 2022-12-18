import { v4 as uuidv4 } from 'uuid';

const getRandomId = (): string => {
  return uuidv4();
};

export { getRandomId };
