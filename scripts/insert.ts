import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";

async function main() {
    const result = await db
        .insert(users)
        .values({
            email: "test233@example.com",
            passwordHash: "haashed-pass",
            name: "Test23 User",
            role: "OWNER",
            city: "Beograd"
        })
        .returning();

    console.log("Inserted:", result);
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
