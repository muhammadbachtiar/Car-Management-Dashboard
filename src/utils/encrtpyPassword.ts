import bcrypt from "bcrypt";

function encryptPassword(password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = encryptPassword;