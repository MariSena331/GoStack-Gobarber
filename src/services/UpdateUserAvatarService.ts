import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'
import User from '../models/User'

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({user_id, avatarFilename}: Request): Promise<User> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne(user_id)

        if (!user) {
            throw new Error('Only authenticated users can change avatar.')
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            // A função stat traz o status do arquivo caso ele exista
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExists) {
                //Se ele existir unlink: delete a name and possibly the file it refers to
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename

        //Save serve tanto para criar tanto para atualizar
        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService