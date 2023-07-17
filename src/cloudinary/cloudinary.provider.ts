import { v2 } from 'cloudinary';
import configuration from '../config/config'
import { CLOUDINARY } from 'src/utils/constants';

const config = configuration()

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: () => {
        return v2.config({
            cloud_name: config.cloudinary.cloud_name,
            api_key: config.cloudinary.api_key,
            api_secret: config.cloudinary.api_secret,
        });
    },
};