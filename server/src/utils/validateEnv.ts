import { cleanEnv } from 'envalid';
import { port, str, num, email, url } from 'envalid/dist/validators';

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
})