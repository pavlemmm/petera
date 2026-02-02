import { randomUUID } from "crypto";
import { db } from "@/db/db";
import { user } from "@/db/schema";

async function main() {
    const result = await db
        .insert(user)
        .values({
            id: randomUUID(),
            email: "test233@example.com",
            name: "Test23 User",
            role: "OWNER",
        })
        .returning();

    console.log("Inserted:", result);
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
