const app = require("../app");
const request = require("supertest")

test("get all routeOptions", async () => {
    const response = await request(app)
        .get("/api/v1/routeOption")
        .expect(200)

    expect(response.body).toHaveLength(5)

    expect(response.body[0].id).toBe(1)
    expect(response.body[0].name).toBe("NO_AUTH")

    expect(response.body[1].id).toBe(2)
    expect(response.body[1].name).toBe("AUTH")

    expect(response.body[2].id).toBe(3)
    expect(response.body[2].name).toBe("ONLY_TOKEN_AUTH")

    expect(response.body[3].id).toBe(4)
    expect(response.body[3].name).toBe("RBAC")

    expect(response.body[4].id).toBe(5)
    expect(response.body[4].name).toBe("AUTH_OPTIONAL")
})