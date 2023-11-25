import { Knex } from "knex";
import bcrypt from "bcrypt";

const TABLE_NAME = "users";

export async function seed(knex: Knex): Promise<void> {
    // Hashing password
    const hashedPassword = await bcrypt.hash("superadmin123321", 10);

    // Deletes ALL existing entries
    await knex(TABLE_NAME).del();

    // Inserts seed entry for superadmin
    await knex(TABLE_NAME).insert([
        {
            id: 1,
            username: "superadmin",
            email: "superadmin@gmail.com",
            password: hashedPassword,
            role: "superadmin",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        }
    ]);
};
